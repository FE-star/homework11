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
	// TODO
	const tempNode = {
		tagName: tagName,
	};

	currentInfo.currentNode = tempNode;

	currentInfo.currentNode.parent = currentInfo.currentParent;

	if (currentInfo.currentNode.parent !== null) {
		if (Array.isArray(currentInfo.currentNode.parent.children)) {
			currentInfo.currentNode.parent.children.push(currentInfo.currentNode);
		} else {
			currentInfo.currentNode.parent.children = [currentInfo.currentNode];
		}
	}

	currentInfo.currentParent = currentInfo.currentNode;
}

function text(textContent) {
	// TODO
	if (currentInfo.currentNode !== null) {
		currentInfo.currentNode.text = textContent;
	}
}

function elementEnd(tagName) {
	// TODO
	if (currentInfo.currentNode.tagName === tagName) {
		const parent = currentInfo.currentNode.parent;

		delete currentInfo.currentNode.parent;

		if (parent !== null) {
			currentInfo.currentNode = parent;
		}

		currentInfo.currentParent = parent;
	}
}
module.exports = {
	elementOpen,
	text,
	elementEnd,
	currentInfo
};