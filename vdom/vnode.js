/*
简单实现incremental-dom中的关键api。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

let currentNode = null;
let currentParent = null;
function elementOpen(tagName) {
  // TODO
}

function text(textContent) {
  // TODO
}

function elementEnd(tagName) {
  // TODO
}

function parsent() {
  elementOpen('div')
  elementOpen('p')
  text('1')
  elementEnd('p')
  text('2')
  elementEnd('div')
  return currentNode
}

module.exports = parsent;