# AI 菜谱推荐器 - 部署状态：GitHub 已推送 ✅

## 📦 当前状态

| 步骤 | 状态 |
|------|------|
| GitHub 仓库创建 | ✅ 已完成 |
| 代码推送 | ✅ 已完成 |
| Railway 部署 | ⏳ 等待手动操作 |

**GitHub 仓库**: https://github.com/xiezy182/ai-recipe-recommender

---

## 🚀 一键部署到 Railway（只需 1 分钟）

### 方式一：一键部署链接

点击以下链接，自动完成部署：

**👉 [点击这里一键部署到 Railway](https://railway.app/new/template?template=https://github.com/xiezy182/ai-recipe-recommender)**

1. 点击链接
2. 用 GitHub 账号登录（如果未登录）
3. 点击 **Deploy Now**
4. 等待 1-2 分钟
5. 获得访问地址如 `https://ai-recipe-recommender-xxx.up.railway.app`

### 方式二：手动部署

1. 打开 https://railway.app
2. 用 GitHub 账号登录
3. 点击 **New Project** → **Deploy from GitHub repo**
4. 搜索并选择 `ai-recipe-recommender`
5. Railway 会自动检测 Node.js 并部署
6. 等待完成，复制生成的 URL

---

## 🔗 部署后访问

部署成功后，访问地址格式：
```
https://ai-recipe-recommender-xxx.up.railway.app
```

---

## 🔒 安全说明

- ✅ **API Key 只在服务器端**（server.js 中）
- ✅ **前端页面无法看到 Key**
- ✅ **任何人都可以访问，但无法盗用 Key**
- ✅ **频率限制**：单 IP 每分钟最多 10 次请求

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
- 免费额度用完后如需继续使用，需绑定信用卡

---

## 🆘 故障排查

**问题：无法访问或 502 错误**
- 等待 2-3 分钟让服务启动
- 检查 Railway 项目日志

**问题：状态栏显示"AI就绪"但无法生成菜谱**
- 检查 Railway 日志是否有错误
- 确认 Cloud Service 积分充足

**问题：404 Not Found**
- 确认 URL 正确（应该是 `/api/chat` 不是 `/.cloud/llm/`）
