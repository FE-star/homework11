/*
简单实现incremental-dom中的关键api。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

let currentNode = null;
let currentParent = null;
function elementOpen(tagName) {
  // TODO
  const node = {
    tagName,
  }
  currentParent = {
    parent: currentParent,
    node,
  }
  currentNode = currentParent.node
}

function text(textContent) {
  // TODO
  currentNode.text = textContent
}

function elementEnd(tagName) {
  // TODO
  const node = currentNode;
  if (node.tagName !== tagName) return;

  if (currentParent.parent) {
    currentParent = {
      ...currentParent.parent
    }
    currentNode = currentParent.node
    currentNode.children = currentNode.children ? currentNode.children.concat(node) : [node]
  }
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
