/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

export const currentInfo = {
  currentNode: null,
  currentParent: null,
};

export function elementOpen(tagName) {
  // TODO
}

export function text(textContent) {
  // TODO
}

export function elementEnd(tagName) {
  // TODO
}
