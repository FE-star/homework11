/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

var currentInfo = {
    currentNode: null,
    currentParent: null
}
function elementOpen (tagName) {
    const { currentNode, currentParent } = currentInfo;
    // 第一次进来 
    // {
    //    currentNode: { tagName: 'div' },
    //    currentParent: { isRoot: true }
    // }
    // 第二次进来
    // {
    //    currentNode: { tagName: 'p' },
    //    currentParent: { 
    //       currentNode: { tagName: 'div', children: [{ tagName: 'p' }] },
    //       currentParent: { isRoot: true }
    //    }
    // }
    // 老师，是这种数据吗？
    if (!currentParent) {
        currentInfo.currentParent = { isRoot: true };
        currentInfo.currentNode = { tagName };
        return ;
    } 
    if (!currentNode.children) {
        currentInfo.currentNode.children = []
    }
        const thisTimeNode = { tagName };
        currentNode.children.push(thisTimeNode);
        currentInfo.currentParent = {
            currentNode,
            currentParent
        }
        currentInfo.currentNode = thisTimeNode
    
}

function text (textContent) {
    // TODO
    const { currentNode } = currentInfo;
    if (!currentNode) {
        throw Error('text 必须在标签内部');
    }
    currentNode.text = textContent
}


function elementEnd (tagName) {
    const { currentParent, currentNode } = currentInfo;
    if (currentNode && currentNode.tagName === tagName) {
        if (!currentParent.isRoot) {
            currentInfo.currentNode = currentParent.currentNode;
            currentInfo.currentParent = currentParent.currentParent;
        } else {
            // root节点
            currentInfo.currentParent = null;
        }
    } else {
        throw new Error('标签闭合不对')
    }
}
module.exports = {
    elementOpen,
    text,
    elementEnd,
    currentInfo
};