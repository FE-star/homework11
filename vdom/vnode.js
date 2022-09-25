/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

var currentInfo = {
  currentNode: null,
  currentParent: null
}

// 用Stack记录所有open的元素
// 元素为open状态，表示可以向其中插入新元素或文本
// 每次插入操作的元素都是栈顶元素
// Stack同时也记录了栈顶元素的所有父级
let openElements = [
  // Stack中永远保留一个虚拟的根元素
  // 找不到父级的时候，新元素都默认插入到根元素中
  // 根元素不对外暴露
  {
    tagName: 'root',
    children: []
  }
]

function elementOpen(tagName) {
  // TODO
  // 创建一个新元素
  let node = { tagName }

  // 拿到当前要操作的的元素
  const topElement = openElements[openElements.length - 1]

  // 如果topElement没有children，则创建
  if (!topElement.children) {
    topElement.children = []
  }

  // 将新元素插入到topElement
  topElement.children.push(node)

  // 记录current元素为新元素
  currentInfo.currentNode = node
  // 将currentNode插入openElements
  openElements.push(currentInfo.currentNode)
}

function text(textContent) {
  // TODO
  if (openElements.length <= 1) {
    throw new Error('根元素不能插入文本')
  }

  // 每次插入操作的都是栈顶元素
  openElements[openElements.length - 1].text = textContent
}

function addText(textContent) {
  // TODO
  if (openElements.length <= 1) {
    throw new Error('根元素不能插入文本')
  }

  // 每次插入操作的都是栈顶元素
  openElements[openElements.length - 1].text += textContent
}

function elementEnd(tagName) {
  // TODO
  // 判断当前关闭的标签名是是否为栈顶元素的标签名，防止关闭错误
  if (tagName !== openElements[openElements.length - 1].tagName) {
    throw new Error('关闭了错误的标签')
  }

  if (openElements.length > 1) {
    // 从openElements中pop一个元素，表示关闭了一个元素
    // 但是currentNode还是指向关闭的元素
    currentInfo.currentNode = openElements.pop()

    if (openElements.length > 1) {
      // 由于除根元素外还有其他父级，就将其指定为currentParent
      currentInfo.currentParent = openElements[openElements.length - 1]
    } else {
      // 如果openElements中只剩根元素，currentParent就设置为null
      currentInfo.currentParent = null
    }
  } else {
    // 如果openElements只剩根元素，不再pop
    // currentNode和currentParent都为null
    currentInfo.currentNode = null
    currentInfo.currentParent = null
  }
}

module.exports = {
  elementOpen,
  text,
  addText,
  elementEnd,
  currentInfo
}
