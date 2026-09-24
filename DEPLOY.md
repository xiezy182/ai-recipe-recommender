# AI 菜谱推荐器 - 部署状态

## ✅ GitHub 推送成功

| 项目 | 状态 |
|------|------|
| 仓库地址 | https://github.com/xiezy182/ai-recipe-recommender |
| 最后提交 | 65afe0f - Finalize deployment guide |
| 分支 | master |

---

## 🚀 一键部署到 Railway

**点击这里开始部署：**
👉 [https://railway.app/new/template?template=https://github.com/xiezy182/ai-recipe-recommender](https://railway.app/new/template?template=https://github.com/xiezy182/ai-recipe-recommender)

**步骤：**
1. 点击链接
2. 用 GitHub 账号登录（xiezy182）
3. 点击 **Deploy Now**
4. 等待 1-2 分钟
5. 获得访问地址如 `https://ai-recipe-recommender-xxx.up.railway.app`

---

## 🔒 安全架构

```
用户浏览器 → Railway 服务器 → Cloud Service LLM API
                ↓
            server.js
           持有 API Key
```

- ✅ API Key 只在 server.js 中
- ✅ 前端无法访问 Key
- ✅ 频率限制：单 IP 10次/分钟
- ✅ 任何人都可访问，但无法盗用 Key

---

## 📋 验证部署

测试 API：
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"请推荐一道家常菜"}],"stream":true}'
```

访问前端：
```
https://YOUR_RAILWAY_URL/
```

---

## 📝 更新代码

```bash
git add -A
git commit -m "更新说明"
git push origin master
```

---

## 💰 费用

- Railway: 每月 $5 免费额度
- 足够个人使用
