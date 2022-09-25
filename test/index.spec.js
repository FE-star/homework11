const { elementOpen, text, addText, elementEnd, currentInfo } = require('../vdom/vnode.js');

describe('idom', () => {
  test('校验idom结构', async () => {
    elementOpen('div')
    elementOpen('p')
    text('1')
    elementEnd('p')
    // p的父级应为div
    expect(JSON.stringify(currentInfo.currentParent)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"1"}]}')
    text('2')
    elementEnd('div')
    // div的父级应为null
    expect(currentInfo.currentParent).toBe(null)
    var currentNode = currentInfo.currentNode
    expect(JSON.stringify(currentNode)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}')
  })
})

describe('idom2', () => {
  test('重复调用的时候，生成结果独立互不影响', async () => {
    elementOpen('div')
    elementOpen('p')
    text('1')
    elementEnd('p')
    // p的父级应为div
    expect(JSON.stringify(currentInfo.currentParent)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"1"}]}')
    text('2')
    elementEnd('div')
    var currentNode = currentInfo.currentNode
    // div的父级应为null
    expect(currentInfo.currentParent).toBe(null)
    elementOpen('div')
    elementOpen('p')
    text('3')
    elementEnd('p')
    // p的父级应为div
    expect(JSON.stringify(currentInfo.currentParent)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"3"}]}')
    text('4')
    elementEnd('div')
    // div的父级应为null
    expect(currentInfo.currentParent).toBe(null)
    var currentNode2 = currentInfo.currentNode
    expect(JSON.stringify(currentNode)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}')
    expect(JSON.stringify(currentNode2)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"3"}],"text":"4"}')
  })
});

describe('idom3', () => {
  test('文本是可以添加的', async () => {
    elementOpen('div')
    elementOpen('p')
    text('1')
    addText('+1=2')
    elementEnd('p')
    // p的父级应为div
    expect(JSON.stringify(currentInfo.currentParent)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"1+1=2"}]}')
    text('2')
    elementEnd('div')
    // div的父级应为null
    expect(currentInfo.currentParent).toBe(null)
    var currentNode = currentInfo.currentNode
    expect(JSON.stringify(currentNode)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"1+1=2"}],"text":"2"}')
  })
})

describe('idom4', () => {
  test('可以在div下重复添加p', async () => {
    elementOpen('div')
    elementOpen('p')
    text('1')
    addText('+1=2')
    elementEnd('p')
    // p的父级应为div
    expect(JSON.stringify(currentInfo.currentParent)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"1+1=2"}]}')
    // 可以在div下重复添加元素
    elementOpen('p')
    text('2')
    addText('+2=4')
    elementEnd('p')
    // p的父级应为div
    expect(JSON.stringify(currentInfo.currentParent)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"1+1=2"},{"tagName":"p","text":"2+2=4"}]}')
    text('2')
    elementEnd('div')
    // div的父级应为null
    expect(currentInfo.currentParent).toBe(null)
    var currentNode = currentInfo.currentNode
    expect(JSON.stringify(currentNode)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"1+1=2"},{"tagName":"p","text":"2+2=4"}],"text":"2"}')
  })
})

describe('idom5', () => {
  test('根元素不能插入文本', async () => {
    expect(() => {
      text('1')
    }).toThrowError('根元素不能插入文本')
  })
})

describe('idom6', () => {
  test('关闭了错误的元素', async () => {
    expect(() => {
      elementOpen('div')
      elementOpen('p')
      text('1')
      elementEnd('b')
      text('2')
      elementEnd('div')
    }).toThrowError('关闭了错误的标签')
  })
})
