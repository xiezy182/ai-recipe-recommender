# AI 菜谱推荐器 - 部署完成！

## ✅ 部署成功

| 项目 | 状态 |
|------|------|
| GitHub 仓库 | ✅ https://github.com/xiezy182/ai-recipe-recommender |
| WorkBuddy 云服务 | ✅ https://recipe-recommender.app.workbuddy.host/ |

---

## 🔗 访问地址

**线上访问**: https://recipe-recommender.app.workbuddy.host/

直接打开这个链接即可使用 AI 菜谱推荐器。

---

## 🔒 安全架构

```
浏览器 → WorkBuddy 服务器 → Cloud Service LLM API
            ↓
        server.js
       持有 API Key（安全）
```

- ✅ API Key 只在 server.js 中
- ✅ 前端无法看到 Key
- ✅ 频率限制：单 IP 10次/分钟
- ✅ 任何人都可访问，但无法盗用 Key

---

## 📝 更新代码

如需修改代码后重新部署：

```bash
git add -A
git commit -m "更新说明"
git push origin master
```

---

## 💰 费用

- WorkBuddy 云服务：已包含在订阅中
- 每月 Cloud Service LLM 额度：正常消耗
