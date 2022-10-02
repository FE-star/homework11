/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

var currentInfo = {
	currentNode: null,
	currentParent: null
}
let stack = [];
let currentNode = null;
let currentParent = null;

function elementOpen(tagName) {
	// TODO
	let element = {
        'tagName': tagName
    }
    if (stack.length === 0) {
        currentInfo.currentNode = element;
        currentNode = null;
    }

    currentParent = currentNode;
    currentNode = element;

    if (currentParent) {
        !currentParent.children ? currentParent.children = [element] : currentParent.children.push(element);
    }

    stack.push(tagName);
}

function text(textContent) {
	// TODO
	currentNode.text = textContent;
}

function elementEnd(tagName) {
	// TODO
	if (stack[stack.length - 1] !== tagName) {
        console.log('标签闭合错误');
        return;
    }

    stack.pop();

    currentNode = currentParent;

    if (currentInfo.currentNode) {
        // 当期操作节点已经到顶层了，不需要计算父亲节点
        if (currentInfo.currentNode === currentNode) {
            return;
        }

        // 计算父亲节点
        let node = currentInfo.currentNode;
        function findNode(curNode) {
            for(let i = 0; i< curNode.children; i++) {
                if(currentNode === curNode.children[i]) {
                    currentParent = curNode;
                } else {
                    findNode(curNode.children[i])
                }
            }
        }
        findNode(node);
    }
}
module.exports = {
	elementOpen,
	text,
	elementEnd,
	currentInfo
};