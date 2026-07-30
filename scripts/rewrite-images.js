// Typora 图片粘贴设置为「复制到 ./../images」，Markdown 中插入的是
// 相对路径 ../images/xxx.png（Typora 与 GitHub 网页预览均可正常解析）。
// 但文章页 URL 形如 /2026/07/30/slug/，相对路径在浏览器中会解析错误，
// 这里在渲染前统一改写为根路径 /images/xxx.png（source/images 会被
// Hexo 原样复制到站点 /images/ 目录）。
hexo.extend.filter.register('before_post_render', function (data) {
  if (data.content) {
    data.content = data.content.replace(/\]\(\.\.\/images\//g, '](/images/');
  }
  return data;
});
