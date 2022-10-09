/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

var currentInfo = {
  currentNode: null,
  currentParent: [],
};

function elementOpen(tagName) {
	currentInfo.currentNode = null;
  currentInfo.currentParent.push({
    tagName,
  });
}

function text(textContent) {
  currentInfo.currentParent[currentInfo.currentParent.length - 1].text =
    textContent;
}

function elementEnd(tagName) {
  const { currentParent } = currentInfo;
  let tempNode = currentParent.pop();
	let length = currentInfo.currentParent.length
	let nextParent = currentParent[length - 1]
  if (tempNode.tagName === tagName) {
		if(length) {
			nextParent.children = nextParent.children || []
			nextParent.children.push(
				tempNode
			);
		} else {
			currentInfo.currentNode = tempNode;
		}
  } else {
    // TODO
  }
}

module.exports = {
  elementOpen,
  text,
  elementEnd,
  currentInfo,
};
