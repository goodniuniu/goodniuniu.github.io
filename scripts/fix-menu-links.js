// NexT 5.1.4 菜单模板与 Hexo 6 的兼容性问题补丁：
// 主题菜单值使用 "路径 || 图标" 格式，模板 header.swig 先 split 再 url_for，
// 但 sidebar.swig 中的归档入口是先 url_for 再 split —— Hexo 6 的 url_for 会把
// 空格和竖线百分号编码（%20、%7C），导致 split 失效，生成形如
// /archives/%20 和 /archives/%7C%7Carchive 的坏链接（Cannot GET 404）。
// 这里在渲染完成后统一修复：href 中截掉编码后的 "|| 图标" 部分及尾部 %20。
hexo.extend.filter.register('after_render:html', function (str) {
  return str
    .replace(/href="([^"]*?)%20%7C%7C[^"]*"/g, 'href="$1"')
    .replace(/href="([^"]*?)%7C%7C[^"]*"/g, 'href="$1"')
    .replace(/href="([^"]*?)%20"/g, 'href="$1"');
});
