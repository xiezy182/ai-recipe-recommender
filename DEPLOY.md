# AI 菜谱推荐器 - Railway 部署指南

## 项目结构

```
recipe-recommender/
├── server.js          # Node.js 代理服务器（含 API Key）
├── recipe-recommender.html  # 前端页面（无 Key）
├── package.json       # Node.js 依赖配置
├── railway.json       # Railway 部署配置
├── .gitignore         # Git 忽略规则
└── .railwayignore     # Railway 忽略规则
```

## 安全架构

```
浏览器 → /api/chat (代理) → Node.js 持有 key → Cloud Service LLM API
         (无 key)                (转发请求，返回结果)
```

**关键安全措施：**
- ✅ API Key 只存在于服务端，前端完全无感知
- ✅ 请求频率限制（单 IP 每分钟最多 10 次）
- ✅ 输入参数校验（防止注入）
- ✅ 响应体大小限制（防大体积消耗积分）

---

## 部署到 Railway（免费）

### 步骤 1：创建 Railway 账号

1. 访问 https://railway.app
2. 用 GitHub 账号登录

### 步骤 2：从 GitHub 部署（推荐）

```bash
# 1. 在 GitHub 创建新仓库（私有或公开均可）
# 2. 推送代码到 GitHub
git remote add origin https://github.com/YOUR_USERNAME/ai-recipe-recommender.git
git push -u origin main

# 3. 在 Railway 连接 GitHub 仓库
#    - 登录 https://railway.app
#    - 点击 "New Project" → "Deploy from GitHub repo"
#    - 选择刚创建的仓库
```

### 步骤 3：配置环境变量（可选）

Railway 会自动读取 `package.json` 中的 `start` 脚本，无需额外配置。

API Key 已硬编码在 `server.js` 中（这是必要的安全风险接受点）。

### 步骤 4：等待部署完成

Railway 会自动：
- 安装依赖（无需 node_modules）
- 启动服务器
- 分配域名（如 `https://xxx-xxx.up.railway.app`）

---

## 验证部署

部署完成后，测试 API：

```bash
curl -X POST https://YOUR_RAILWAY_APP_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"测试"}],"stream":true}'
```

访问前端页面：
```
https://YOUR_RAILWAY_APP_URL/
```

---

## 费用说明

**Railway 免费额度：**
- 每月 $5 免费额度
- 本项目月耗约 $0.1-0.5（取决于使用量）
- 超出后按用量计费，最低约 $5/月

---

## 本地测试

```bash
# 安装依赖（本项目无外部依赖，直接运行）
node server.js

# 访问
open http://localhost:3000
```

---

## 故障排查

**问题：状态栏显示"AI就绪"但无法生成菜谱**
- 检查网络连接
- 查看 Railway 日志：`railway logs`

**问题：404 Not Found**
- 确认部署成功
- 检查 URL 是否正确

**问题：Key 被盗用**
- 立即重置 Cloud Service 的 Access Key
- 重新部署更新后的 server.js

---

## 下一步优化建议

1. **添加请求日志**：记录 API 调用次数和错误
2. **动态模型选择**：支持用户选择不同的 AI 模型
3. **缓存机制**：缓存常用菜谱结果，减少 API 调用
4. **数据库存储**：保存用户生成的菜谱历史
5. **自定义主题**：支持用户选择 UI 颜色主题
