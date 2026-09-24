# AI 菜谱推荐器 - 部署状态：GitHub 已推送 ✅

## 📦 当前状态

| 步骤 | 状态 |
|------|------|
| GitHub 仓库创建 | ✅ 已完成 |
| 代码推送 | ✅ 已完成 |
| Railway 部署 | ⏳ 等待手动操作 |

**GitHub 仓库**: https://github.com/xiezy182/ai-recipe-recommender

---

## 🚀 下一步：部署到 Railway

Railway CLI 未安装，请手动完成部署：

### Railway 部署步骤

1. 打开 https://railway.app
2. 用 GitHub 账号登录（`xiezy182`）
3. 点击 **New Project** → **Deploy from GitHub repo**
4. 选择 `ai-recipe-recommender` 仓库
5. Railway 会自动检测 Node.js 并部署
6. 等待部署完成，获得域名如 `https://ai-recipe-recommender-xxx.up.railway.app`

### 设置环境变量

部署成功后，在 Railway 项目设置中添加：
- 无需额外环境变量（API Key 已硬编码在 server.js 中）

---

## 🚀 方式二：Render 部署

1. 注册 https://render.com
2. 点击 **New** → **Public Website**
3. 连接 GitHub 仓库
4. 配置：
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. 点击 **Create Service**

---

## 🚀 方式三：本地运行测试

```bash
# 在项目目录运行
cd C:\Users\Administrator\WorkBuddy\2026-09-15-14-36-30
node server.js

# 浏览器访问
http://localhost:3000
```

---

## 🔒 安全说明

部署后：
- ✅ **API Key 只在服务器端**（server.js 中）
- ✅ **前端页面无法看到 Key**
- ✅ **任何人都可以访问，但无法盗用 Key**
- ✅ **频率限制**：单 IP 每分钟最多 10 次请求

---

## ✅ 验证部署

部署成功后，测试 API：

```bash
curl -X POST https://YOUR_DEPLOYED_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"请推荐一道家常菜"}],"stream":true}'
```

访问前端页面：
```
https://YOUR_DEPLOYED_URL/
```

---

## 📝 更新部署

修改代码后，推送新提交即可自动重新部署：

```bash
git add -A
git commit -m "更新说明"
git push origin master
```

---

## 💰 费用

- **Railway**: 每月 $5 免费额度（足够个人使用）
- **Render**: 免费 tier（有休眠，首次访问慢 30 秒）
- **本地运行**: 免费

---

## 🆘 故障排查

**问题：状态栏显示"AI就绪"但无法生成菜谱**
- 检查 Railway/Render 日志
- 确认 Cloud Service 积分充足

**问题：404 Not Found**
- 确认 URL 正确（应该是 `/api/chat` 不是 `/.cloud/llm/`）

**问题：Key 泄露风险**
- 立即重置 Cloud Service 的 Access Key
- 重新部署更新后的 server.js
