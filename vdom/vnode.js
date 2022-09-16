/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

var currentInfo = {
	currentNode: null,
	currentParent: null,
}
let fragment = null;
function elementOpen(tagName) {
	const tagNode = { tagName, text: '' };
	// currentInfo.currentNode = curNode;
	if (!fragment) {
		currentInfo.currentNode = tagNode;
		fragment = tagNode;
	}
	if (!currentInfo.currentParent || currentInfo.currentParent.length <= 0) {
		currentInfo.currentParent = [tagNode];
	} else {
		const parentLength = currentInfo.currentParent.length;
		if (parentLength > 0) {
			const tagParent = currentInfo.currentParent[parentLength - 1];
			if (!tagParent.children) {
				tagParent['children'] = [tagNode];
			} else {
				tagParent.children.push(tagNode);
			}
			currentInfo.currentParent.push(tagNode);
			currentInfo.currentNode = tagNode;
		}
	}
}

function text(textContent) {
	currentInfo.currentNode.text = textContent;
}

function elementEnd(tagName) {
	if (currentInfo.currentNode.tagName !== tagName) {
		throw new Error('tag is not match');
	}
	currentInfo.currentParent.pop();
	if (currentInfo.currentParent.length <= 0) {
		currentInfo.currentNode = fragment;
		fragment = null;
		return;
	}
	currentInfo.currentNode = currentInfo.currentParent[currentInfo.currentParent.length - 1];
}
module.exports = {
	elementOpen,
	text,
	elementEnd,
	currentInfo
};