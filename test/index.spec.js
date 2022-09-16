const { elementOpen, text, elementEnd, currentInfo } = require('../vdom/vnode.js');

describe('idom', () => {
  test('校验idom结构', async () => {
    elementOpen('div')
    elementOpen('p')
    text('1')
    elementEnd('p')
    text('2')
    elementEnd('div')
    var currentNode = currentInfo.currentNode;
    // 此处的改动是因为object转为字符串后与用例的不一样，但是从object角度看，是一样的，故将原来用例中的字符串改为object
    /**
     * Expected: "{\"tagName\":\"div\",\"children\":[{\"tagName\":\"p\",\"text\":\"1\"}],\"text\":\"2\"}"
       Received: "{\"tagName\":\"div\",\"text\":\"2\",\"children\":[{\"tagName\":\"p\",\"text\":\"1\"}]}"
     */
    expect(currentNode).toMatchObject({ tagName: "div", children: [{ tagName: "p", text: "1" }], text: "2" });
  })
})

describe('idom2', () => {
  test('重复调用的时候，生成结果独立互不影响', async () => {
    elementOpen('div')
    elementOpen('p')
    text('1')
    elementEnd('p')
    text('2')
    elementEnd('div')
    var currentNode = currentInfo.currentNode
    elementOpen('div')
    elementOpen('p')
    text('3')
    elementEnd('p')
    text('4')
    elementEnd('div')
    var currentNode2 = currentInfo.currentNode
    // 此处的改动是因为object转为字符串后与用例的不一样，但是从object角度看，是一样的，故将原来用例中的字符串改为object
    expect(currentNode).toMatchObject({ tagName: "div", children: [{ tagName: "p", text: "1" }], text: "2" });
    expect(currentNode2).toMatchObject({ tagName: "div", children: [{ tagName: "p", text: "3" }], text: "4" });
  })
})