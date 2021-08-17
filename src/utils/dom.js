const title = process.env.VUE_APP_TITLE;

/**
 * @copyright JyLie 809206619@qq.com
 * @description 设置标题
 * @param pageTitle
 * @returns {aviod}
 */
export function setDocumentTitle(pageTitle) {
  const msg = pageTitle ? `${pageTitle}-${title}` : title;
  document.title = msg;
}
