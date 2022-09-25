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
	const { currentNode, currentParent } = currentInfo;
	if (currentParent === null) {
		currentInfo.currentNode = { tagName };
		currentInfo.currentParent = { isRoot: true }
	} else {
		if (!currentNode.children) {
			currentNode.children = [];
		}
		const thisNode = { tagName };
		currentNode.children.push(thisNode);
		currentInfo.currentParent = {
			currentNode,
			currentParent,
		};
		currentInfo.currentNode = thisNode;
	}
}

function text(textContent) {
	const { currentNode } = currentInfo;
	if (currentNode) {
		currentNode.text = textContent;
	}
}

function elementEnd(tagName) {
	const { currentParent, currentNode } = currentInfo;
	if (currentNode && currentNode.tagName === tagName) {
		if (!currentParent.isRoot) {
			currentInfo.currentNode = currentParent.currentNode;
			currentInfo.currentParent = currentParent.currentParent;
		} else {
			currentInfo.currentParent = null;
		}
	}
}
module.exports = {
	elementOpen,
	text,
	elementEnd,
	currentInfo
};