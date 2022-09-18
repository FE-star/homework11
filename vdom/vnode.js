/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

// 这里的currentInfo.currentNode 只用作测试用例返回值，其实在我的代码中currentNode代表的是顶层root节点
var currentInfo = {
    currentNode: null,
    currentParent: null
}

// 新开标签入栈，主要用栈检查是否正确关闭。currentNode 代表真正的当期节点。currentParent 代表真正的当期父节点
let stack = [];
let currentNode = null;
let currentParent = null;

function elementOpen(tagName) {
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
    currentNode.text = textContent;
}

function elementEnd(tagName) {
    if (stack[stack.length - 1] !== tagName) {
        console.log('标签闭合错误，请检查~');
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