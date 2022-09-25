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
	currentInfo.currentNode = { tagName }
	currentInfo.currentNode.parent = currentInfo.currentParent
	
	// 当前节点没有parent时，说明它时根节点
	if (currentInfo.currentNode.parent === null) {
		currentInfo.currentParent = currentInfo.currentNode
		return
	}
	
	// 有父节点时，看children有没有创建
	if (currentInfo.currentNode.parent.children) {
		currentInfo.currentNode.parent.children.push(currentInfo.currentNode)
	} else {
		currentInfo.currentNode.parent.children = [currentInfo.currentNode]
	}

	// 把当前节点置为父节点
	currentInfo.currentParent = currentInfo.currentNode
}

function text(textContent) {
	if (currentInfo.currentNode) {
		currentInfo.currentNode.text = textContent
	}
}

function elementEnd(tagName) {
	if (currentInfo.currentNode.tagName === tagName) {
		const parent = currentInfo.currentNode.parent
		// 结果里不能有parent属性，要删除
		delete currentInfo.currentNode.parent
		// 父节点不为空，则回到父节点
		if (parent !== null) {
			currentInfo.currentNode = parent
			// 同elementOpen。父节点可能继续elementOpen其它子元素，其它子元素的parent其实就是当前节点
			currentInfo.currentParent = currentInfo.currentNode
		} else {
			// parent为空，说明结束了，为了不影响后一轮，清空
			currentInfo.currentParent = null
		}
	}
}

module.exports = {
	elementOpen,
	text,
	elementEnd,
	currentInfo
};