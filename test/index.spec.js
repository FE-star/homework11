const VNode = require('../vdom/vnode.js');

describe('vdom', () => {
  test('校验vdom结构', async () => {
    var vdom = new VNode("div", {className: 'container'}, [
      new VNode("div", {className: 'container2'}),
      new VNode("div", {className: 'container3'}),
    ]);
    expect(JSON.stringify(vdom)).toBe('{"tagName":"div","props":{"className":"container"},"children":[{"tagName":"div","props":{"className":"container2"},"children":[],"text":""},{"tagName":"div","props":{"className":"container3"},"children":[],"text":""}],"text":""}')
  })
})
