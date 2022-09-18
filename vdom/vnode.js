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
	// 父节点为空代表在顶层则直接设置当前节点，否则加入其子节点列表
	if (currentParent === null) {
		currentInfo.currentNode = { tagName };
		currentInfo.currentParent = { isTop: true }
		return;
	}
	if (!currentNode.children) {
		currentNode.children = [];
	}
	const nextNode = { tagName };
	currentNode.children.push(nextNode);
	// 更新父节点
	currentInfo.currentParent = {
		currentNode,
		currentParent,
	};
	// 指向当前节点
	currentInfo.currentNode = nextNode;
}

function text(textContent) {
	if (!currentInfo.currentNode) {
		throw new Error('Text 节点必须在其他节点内使用');
	}
	currentInfo.currentNode.text = textContent;
}

function elementEnd(tagName) {
	const { currentParent, currentNode } = currentInfo;
	if (!currentNode || currentNode.tagName !== tagName) {
		throw new Error('非法使用闭合节点');
	}
	if (!currentParent.isTop) {
		// 非顶层节点需要将当前节点指向父节点
		currentInfo.currentNode = currentParent.currentNode;
		currentInfo.currentParent = currentParent.currentParent;
	} else {
		// 否则标记父节点为null，标记已到顶层节点
		currentInfo.currentParent = null;
	}
}
module.exports = {
	elementOpen,
	text,
	elementEnd,
	currentInfo
};