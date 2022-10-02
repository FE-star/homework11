/*
简单实现incremental-dom中的关键api, 需要考虑同时存在多个vdom的情况。不考虑element的情况，直接转换为jsonDom
返回结果示例
{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
*/

export const currentInfo = {
  currentNode: null,
  currentParent: null,
};

// 添加 isOpen 状态后，代码可读性大大增强
export function elementOpen(tagName) {
  const { currentNode, currentParent } = currentInfo;

  const newParent = currentNode?.isOpen ? currentNode : currentParent;
  const newNode = { tagName, isOpen: true, parent: newParent };

  if (newParent) {
    newParent.children = [...(newParent?.children || []), newNode];
  }

  currentInfo.currentNode = newNode;
  currentInfo.currentParent = newParent;
}

export function text(textContent) {
  if (!currentInfo.currentNode?.isOpen) {
    return;
  }

  currentInfo.currentNode.text = textContent;
}

export function elementEnd(tagName) {
  const { currentNode, currentParent } = currentInfo;

  if (currentNode.tagName !== tagName || !currentNode?.isOpen) {
    return;
  }

  const nextNode = currentParent ? currentParent : currentNode;
  const nextParent = nextNode.parent;

  currentInfo.currentNode = nextNode;
  currentInfo.currentParent = nextParent;

  // 关闭节点后，节点不必保留父节点状态（可以从currentParent读取）和自身的 open 状态
  delete currentNode.parent;
  delete currentNode.isOpen;
}
