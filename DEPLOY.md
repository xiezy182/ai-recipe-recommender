# AI 菜谱推荐器 - 手动部署指南

## 📦 部署文件清单

项目目录 `C:\Users\Administrator\WorkBuddy\2026-09-15-14-36-30\` 下已有以下文件：

```
├── server.js          # Node.js 代理服务器（含 API Key）✅
├── recipe-recommender.html  # 前端页面（无 Key）✅
├── package.json       # Node.js 配置 ✅
├── railway.json       # Railway 部署配置 ✅
├── .gitignore         # Git 忽略规则 ✅
└── .railwayignore     # Railway 忽略规则 ✅
```

---

## 🚀 方式一：Railway 部署（推荐）

### 步骤 1：创建 GitHub 仓库

1. 打开 https://github.com/new
2. 仓库名称：`ai-recipe-recommender`
3. 选择 **Public**（公开）
4. 勾选 **Add a README file**
5. 点击 **Create repository**

### 步骤 2：推送代码

在命令行执行：

```bash
cd C:\Users\Administrator\WorkBuddy\2026-09-15-14-36-30

# 添加远程仓库（替换 YOUR_TOKEN 为你的 GitHub Personal Access Token）
git remote add origin https://YOUR_TOKEN@github.com/xiezhiying/ai-recipe-recommender.git

# 推送代码
git push -u origin master
```

**获取 GitHub Personal Access Token：**
1. 打开 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 勾选 `repo` 权限
4. 点击 **Generate token**
5. 复制生成的 token（只显示一次！）

### 步骤 3：部署到 Railway

1. 打开 https://railway.app
2. 用 GitHub 账号登录
3. 点击 **New Project** → **Deploy from GitHub repo**
4. 选择 `xiezhiying/ai-recipe-recommender`
5. Railway 会自动检测并部署（无需任何配置）
6. 等待部署完成，获得域名如 `https://ai-recipe-recommender.up.railway.app`

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
