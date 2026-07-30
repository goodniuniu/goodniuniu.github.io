# goodniuniu 博客 · Hexo 源码工程

本仓库采用 **单仓库双分支** 结构：

- `source` 分支：Hexo 博客源码（Markdown 文章 + 配置 + 主题依赖），即你日常编辑的内容。
- `gh-pages` 分支：由 GitHub Actions 自动构建并发布的静态站点（GitHub Pages 实际访问的内容，在仓库 Settings → Pages 中将 Source 设为 gh-pages 分支）。

> ⚠️ 不要手动修改 `gh-pages` 分支，它由工作流自动维护（每次发布为孤立提交，不保留历史）。

## 本地写作（Typora）

本仓库的本地工作副本已在 `source` 分支。直接用 Typora 打开并编辑：

```
source/_posts/YYYY-MM-DD-标题.md
```

注意事项：
- 保留文件顶部 `---` 之间的 front-matter（`title` / `slug` / `date` / `categories` / `tags`）。
  - `slug` 用于锁定文章 URL，请勿删除，否则旧链接会失效。
- Typoara 默认会原样保留 front-matter，正常保存即可。

## 发布流程

改完文章后，用 Git 提交并推送（命令行 / GitHub Desktop / VS Code 源控件均可）：

```bash
git add source/_posts
git commit -m "修订：xxx"
git push
```

推送 `source` 分支会**自动触发** GitHub Actions：
`npm install` → `hexo generate` → 部署到 `gh-pages` 分支（GitHub Pages 从这里取内容）。
因此你**无需在本地安装 Node.js / Hexo** 即可发布。

## 本地预览（可选）

若想在推送前先看渲染效果（Typora 只渲染通用 Markdown，看不到主题、代码高亮等真实样式）：

```bash
npm install              # 安装 hexo 与主题（只需执行一次）
npx hexo server          # 启动本地预览，访问 http://localhost:4000
```

> 本地预览只是辅助手段，发布仍由云端自动完成。

## 目录结构

```
_config.yml                    # 站点 + NexT 5.1.4(Gemini) 配置
package.json                   # 依赖（hexo 6 + hexo-theme-next@5.1.4 + git 部署器）
scaffolds/post.md              # 新文章模板（hexo new 时使用，含 slug/categories/tags）
source/_posts/*.md             # 已发布的文章
source/_drafts/*.md            # 草稿（不会被发布；本地 hexo server --draft 可预览）
source/<静态资源>               # CNAME / favicon / images 等（构建时复制到站点根目录）
.github/workflows/deploy.yml   # 自动部署工作流
```

## 找回历史

`source` 分支保留完整源码历史，回退源码后重新推送即可恢复线上站点。
注意：`gh-pages` 分支每次发布都是孤立提交（force_orphan），不保留历史，不要依赖它回滚。
