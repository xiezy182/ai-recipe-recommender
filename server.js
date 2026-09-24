'use strict';

/**
 * AI 菜谱推荐器 - 安全代理服务器
 *
 * 架构：
 *   浏览器 → /api/chat (本服务器) → Cloud Service LLM API (key 只在这里)
 *
 * 安全措施：
 *   1. API Key 只在服务端持有，前端完全无感知
 *   2. 请求频率限制（单 IP 每分钟最多 10 次）
 *   3. 输入参数校验（防止注入）
 *   4. 响应体大小限制（防大体积消耗积分）
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

// ========== 配置 ==========
const PORT = process.env.PORT || 3000;
const ENDPOINT = 'https://recipe-recommender.app.workbuddy.host';
const ACCESS_KEY = 'wbpk_u6WpQ4tBEpHA5RgRh1bjEq_bPtI44EDU7IcV1DlFHzMckS72vScpHTs';

// 单 IP 每分钟最大请求次数
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;
// 单次请求最大输入 token 数（约 8KB）
const MAX_INPUT_BYTES = 8 * 1024;
// 单次响应最大字节数（1MB）
const MAX_RESPONSE_BYTES = 1 * 1024 * 1024;

// ========== 频率限制器 ==========
const rateLimits = new Map(); // ip → [{ timestamp, count }]

function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;

  // 获取或初始化该 IP 的记录
  if (!rateLimits.has(ip)) {
    rateLimits.set(ip, []);
  }
  const records = rateLimits.get(ip);

  // 清理过期记录
  while (records.length > 0 && records[0].timestamp < windowStart) {
    records.shift();
  }

  if (records.length >= RATE_LIMIT) {
    return false;
  }

  records.push({ timestamp: now });
  return true;
}

// ========== 请求体解析 ==========
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_INPUT_BYTES) {
        reject(new Error('请求体过大'));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error('JSON 解析失败'));
      }
    });
    req.on('error', reject);
  });
}

// ========== 转发请求 ==========
function proxyToCloudService(req, res) {
  // 直接转发到 LLM API
  const path = '/chat/completions'; // 固定路径

  // 读取请求体
  parseBody(req).then((body) => {
  // 安全校验
  if (!body.model) {
    sendJson(res, 400, { error: '缺少 model 字段' });
    return;
  }
  if (!Array.isArray(body.messages)) {
    sendJson(res, 400, { error: 'messages 应为数组' });
    return;
  }
  for (const msg of body.messages) {
    if (typeof msg.content !== 'string') {
      sendJson(res, 400, { error: '消息内容应为字符串' });
      return;
    }
  }

  // 强制 stream: true（Cloud Service LLM API 要求）
  body.stream = true;

  const forwardReq = https.request(
    {
      hostname: 'recipe-recommender.app.workbuddy.host',
      port: 443,
      path: '/.cloud/llm' + path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-wb-webapp-access-key': ACCESS_KEY,
      },
    },
    (forwardRes) => {
      // 流式转发（用于 LLM streaming）
      if (forwardRes.statusCode === 200) {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });
        let received = 0;
        forwardRes.on('data', (chunk) => {
          received += chunk.length;
          if (received > MAX_RESPONSE_BYTES) {
            res.end();
            return;
          }
          res.write(chunk);
        });
        forwardRes.on('end', () => res.end());
      } else {
        // 非 200 错误，收集完整响应返回给客户端
        let errBody = '';
        forwardRes.on('data', (chunk) => { errBody += chunk; });
        forwardRes.on('end', () => {
          try {
            const errJson = JSON.parse(errBody);
            sendJson(res, forwardRes.statusCode, errJson);
          } catch {
            sendJson(res, forwardRes.statusCode, { error: errBody.substring(0, 200) });
          }
        });
      }
    }
  );

  forwardReq.on('error', (err) => {
    console.error('[proxy error]', err.message);
    sendJson(res, 502, { error: '上游服务错误：' + err.message });
  });

  forwardReq.write(JSON.stringify(body));
  forwardReq.end();
  }).catch((err) => {
    sendJson(res, 400, { error: err.message });
  });
}

// ========== 静态文件服务 ==========
const STATIC_PATH = require('path').join(__dirname, 'recipe-recommender.html');
const fs = require('fs');

function serveStatic(res) {
  const content = fs.readFileSync(STATIC_PATH);
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'public, max-age=60',
  });
  res.end(content);
}

// ========== 工具函数 ==========
function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(JSON.stringify(data));
}

function getClientIp(req) {
  return req.headers['x-forwarded-for']
    ? req.headers['x-forwarded-for'].split(',')[0].trim()
    : req.socket.remoteAddress || 'unknown';
}

// ========== 主服务器 ==========
const server = http.createServer((req, res) => {
  const ip = getClientIp(req);

  // CORS 预检
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // API 路由：/api/chat
  if (req.method === 'POST' && req.url === '/api/chat') {
    if (!checkRateLimit(ip)) {
      sendJson(res, 429, { error: '请求过于频繁，请稍后重试' });
      return;
    }
    proxyToCloudService(req, res);
    return;
  }

  // 其他所有请求：返回静态 HTML
  if (req.method === 'GET') {
    serveStatic(res);
    return;
  }

  sendJson(res, 404, { error: 'Not Found' });
});

server.listen(PORT, () => {
  console.log(`✅ AI菜谱推荐器已启动：http://localhost:${PORT}`);
  console.log(`   API 代理：POST /api/chat`);
  console.log(`   频率限制：${RATE_LIMIT} 次/分钟/IP`);
});
