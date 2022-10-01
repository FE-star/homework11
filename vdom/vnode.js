/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

var currentInfo = {
  currentNode: null,
  currentParent: null
};
var stack = [];

function createNode(tagName) {
  var newNode = {
    tagName
  };

  if (tagName === "div") {
    return {
      ...newNode,
      children: []
    };
  }

  return newNode;
}

function elementOpen(tagName) {
  var newNode = createNode(tagName);

  if (!stack.length) {
    currentInfo.currentNode = newNode;
    stack.push(newNode);
  } else {
    // peek last element
    var current = stack[stack.length - 1];

    if ("children" in current) {
      current.children.push(newNode);
    }

    stack.push(newNode);
  }
}

function text(textContent) {
  var current = stack[stack.length - 1];
  current.text = textContent;
}

function elementEnd(tagName) {
  var last = stack[stack.length - 1];
  if (tagName === last.tagName) stack.pop();
}
module.exports = {
  elementOpen,
  text,
  elementEnd,
  currentInfo
};
