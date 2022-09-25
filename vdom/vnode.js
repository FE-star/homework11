/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

var currentInfo = {
	currentNode: null,
	currentParent: null
}
function elementOpen(tagName) {
  // 节点开始，当前节点（currentNode）赋值为一个新对象
  currentInfo.currentNode = { tagName }
  // 在当前节点（currentNode）中，通过 parent 属性记录一下它的父节点，父节点若为空，则代表当前节点为根节点
  currentInfo.currentNode.parent = currentInfo.currentParent
  // 父节点若不为空，则需要在父节点的 children 属性中添加上当前节点
  if (currentInfo.currentNode.parent !== null) {
    if (!currentInfo.currentNode.parent.children) {
      currentInfo.currentNode.parent.children = [currentInfo.currentNode]
    } else {
      currentInfo.currentNode.parent.children.push(currentInfo.currentNode)
    }
  }
  // 将当前父节点置为当前节点，方便在遍历当前节点的子元素时使用
  currentInfo.currentParent = currentInfo.currentNode
}

function text(textContent) {
  // 给当前节点加上 text 属性
  if (currentInfo.currentNode) {
    currentInfo.currentNode.text = textContent
  }
}

function elementEnd(tagName) {
  // 当前节点结束
  if (currentInfo.currentNode.tagName === tagName) {
    // 将当前节点的父节点取出来
    const parent = currentInfo.currentNode.parent
    // 删除当前节点的 parent 属性
    delete currentInfo.currentNode.parent
    // 如果当前节点的父节点不为空，则把当前节点（currentNode）的回滚为其父节点
    if (parent !== null) {
      currentInfo.currentNode = parent
    }
    // 当前父节点置为当前节点或为null，方便在遍历当前节点的子元素时使用
    currentInfo.currentParent = parent
  }
}
module.exports = {
	elementOpen,
	text,
	elementEnd,
	currentInfo
};