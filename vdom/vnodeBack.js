/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

var currentInfo = {
  currentNode: null,
  currentParent: null,
};

var stack = [];

function elementOpen(tagName) {
  // TODO
  var newNode = { tagName };

  // 从头open节点时，清空currentParent指向
  currentInfo.currentParent = stack.length > 0 ? currentInfo.currentNode : null;
  currentInfo.currentNode = newNode;

  if (!currentInfo.currentParent) currentInfo.currentParent = newNode;
  else if (!currentInfo.currentParent.children) {
    currentInfo.currentParent.children = [newNode];
  } else {
    currentInfo.currentParent.children.push(newNode);
  }

  stack.push(newNode);
}

function text(textContent) {
  stack[stack.length - 1]["text"] = textContent;

  currentInfo.currentNode.text = textContent;
}

function elementEnd(tagName) {
  // TODO 闭合节点后将currentNode和currentParent同时指向往上移动
  var temp;
  do {
    temp = stack.pop();
    // console.log(temp, tagName, currentInfo.currentParent, stack.length);
    // currentParent为空时停止移动
    if (temp.tagName === tagName && currentInfo.currentParent) {
      currentInfo.currentNode = currentInfo.currentParent;
      currentInfo.currentParent = stack[stack.length - 2];
      break;
    }
  } while (stack.length);
}
module.exports = {
  elementOpen,
  text,
  elementEnd,
  currentInfo,
};
