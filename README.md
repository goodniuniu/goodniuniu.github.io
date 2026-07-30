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

### Typora 图片粘贴设置（一次性）

偏好设置 → 图像：

- 「插入图片时…」选择 **复制图片到指定路径**，路径填：`./../images`
- 粘贴的图片会保存到 `source/images/`，Markdown 中插入 `../images/xxx.png`。
  Typora 预览、GitHub 网页预览均可正常显示；构建时 `scripts/rewrite-images.js`
  会自动把路径改写为站点根路径 `/images/xxx.png`，线上显示无需操心。
- 图片随文章一起 `git add source` 提交即可。

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

仓库在 WSL 中的本地工作副本为 `~/blog`（已克隆 `source` 分支并装好依赖）：

```bash
cd ~/blog
npx hexo server          # 启动本地预览，访问 http://localhost:4000
```

> 本地预览只是辅助手段，发布仍由云端自动完成。E 盘下的 `/mnt/e/Github/goodniuniu.github.io` 与 `~/blog` 是同一仓库的两个工作副本，任选其一编辑，注意先 `git pull` 再改，避免冲突。

## 目录结构

```
_config.yml                    # 站点 + NexT 8(Gemini) 配置
package.json                   # 依赖（hexo 6 + hexo-theme-next@8）
scaffolds/post.md              # 新文章模板（hexo new 时使用，含 slug/categories/tags）
scripts/rewrite-images.js      # Typora 图片相对路径改写（见上文图片设置）
source/_posts/*.md             # 已发布的文章
source/_drafts/*.md            # 草稿（不会被发布；本地 hexo server --draft 可预览）
source/<静态资源>               # CNAME / favicon / images 等（构建时复制到站点根目录）
.github/workflows/deploy.yml   # 自动部署工作流
```

## 找回历史

`source` 分支保留完整源码历史，回退源码后重新推送即可恢复线上站点。
注意：`gh-pages` 分支每次发布都是孤立提交（force_orphan），不保留历史，不要依赖它回滚。

## CDN 缓存与「发文不更新」问题

站点前面有 CDN 缓存（当前为腾讯 EdgeOne），推送部署后 CDN 节点仍可能
返回旧内容（HTML 缓存约 10 分钟，由 GitHub Pages 源站的 `max-age=600` 决定）。
遇到「已部署但页面没更新」时：

1. 先 `Ctrl + F5` 强制刷新，排除浏览器本地缓存；
2. 仍不更新则到 CDN 控制台手动刷新全站缓存。

### 迁移到 Cloudflare（推荐，可自动刷新缓存）

工作流已内置 Cloudflare 缓存刷新步骤（`deploy.yml` 末尾），迁移后发文即自动
清缓存，1~2 分钟全网可见。迁移步骤（均需在控制台手工操作）：

1. Cloudflare 控制台 → Add site，添加 `goodniuniu.com`（Free 套餐即可）；
2. 按提示到域名注册商处把 NS 记录改为 Cloudflare 分配的两个 nameserver，
   等待生效（最长 24 小时）；
3. Cloudflare DNS 中添加：`CNAME www → goodniuniu.github.io`（开启代理/橙色云朵），
   并删除/停用原来指向 EdgeOne（`*.eo.dnse0.com`）的记录，同时在 EdgeOne 控制台停用加速；
4. SSL/TLS 模式设为 **Full**；Caching → Rules 可加一条「HTML 不缓存或短 TTL」规则；
5. Cloudflare → My Profile → API Tokens，创建仅含 **Zone.Cache Purge** 权限的 Token；
6. 本仓库 Settings → Secrets and variables → Actions，添加：
   - `CF_ZONE_ID`（站点 Overview 页右下角）
   - `CF_API_TOKEN`（上一步的 Token）

此后每次推送自动完成：构建 → 部署 → 刷新 CDN 缓存。
GitHub Pages 的自定义域名保持 `www.goodniuniu.com` 不变，无需改动。
