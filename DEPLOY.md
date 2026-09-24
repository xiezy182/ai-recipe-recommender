# 🚀 AI 菜谱推荐器 - Railway 一键部署

## ✅ 已完成

- [x] GitHub 仓库创建: https://github.com/xiezy182/ai-recipe-recommender
- [x] 代码推送成功

---

## 🎯 一键部署到 Railway

### 方式一：点击链接部署（推荐）

**👉 [点击这里一键部署到 Railway](https://railway.app/new/template?template=https://github.com/xiezy182/ai-recipe-recommender)**

操作步骤：
1. 点击上面的链接
2. 用 GitHub 账号登录（如未登录）
3. 点击 **Deploy Now**
4. 等待 1-2 分钟
5. 获得访问地址如 `https://ai-recipe-recommender-xxx.up.railway.app`

---

### 方式二：手动部署

1. 打开 https://railway.app
2. 点击 **New Project**
3. 选择 **Deploy from GitHub repo**
4. 搜索并选择 `ai-recipe-recommender`
5. 点击 **Deploy**
6. 等待部署完成

---

## 🔗 部署后访问

部署成功后，你会获得一个 Railway 域名：
```
https://ai-recipe-recommender-xxx.up.railway.app
```

直接访问这个地址即可使用 AI 菜谱推荐器。

---

## 🔒 安全说明

- ✅ **API Key 只在服务器端**（server.js 中）
- ✅ **前端页面无法看到 Key**
- ✅ **任何人都可以访问，但无法盗用 Key**
- ✅ **频率限制**：单 IP 每分钟最多 10 次请求

---

## 💰 费用

- **Railway**: 每月 $5 免费额度（足够个人使用）
- 免费额度用完后如需继续使用，需绑定信用卡

---

## 📝 更新代码

修改代码后，推送新提交即可自动重新部署：

```bash
git add -A
git commit -m "更新说明"
git push origin master
```

---

## 🆘 故障排查

**问题：无法访问或 502 错误**
- 等待 2-3 分钟让服务启动
- 检查 Railway 项目日志

**问题：状态栏显示"AI就绪"但无法生成菜谱**
- 检查 Railway 日志是否有错误
- 确认 Cloud Service 积分充足

**问题：Key 泄露风险**
- 立即重置 Cloud Service 的 Access Key
- 重新部署更新后的 server.js
