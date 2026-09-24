# AI 菜谱推荐器 - 部署完成！

## ✅ 部署成功

| 项目 | 状态 |
|------|------|
| GitHub 仓库 | ✅ https://github.com/xiezy182/ai-recipe-recommender |
| **线上访问地址** | ✅ https://recipe-recommender.app.workbuddy.host/ |

---

## 🔗 访问地址

**直接打开**：https://recipe-recommender.app.workbuddy.host/

---

## 🔒 安全架构

```
浏览器 → WorkBuddy 服务器 → Cloud Service LLM API
            ↓
        server.js
       持有 API Key（安全）
```

- ✅ API Key 只在服务端，前端无法看到
- ✅ 频率限制：单 IP 每分钟最多 10 次请求
- ✅ 任何人都可访问，但无法盗用 Key

---

## 📝 后续更新

修改代码后推送即可自动更新：
```bash
git add -A
git commit -m "更新说明"
git push origin master
```
