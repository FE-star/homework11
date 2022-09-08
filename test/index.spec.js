const parsent = require('../vdom/vnode.js');
// const VNode = require('../vdom/vnodeBack.js');
// describe('vdom', () => {
//   test('校验vdom结构', async () => {
//     var vdom = new VNode("div", {className: 'container'}, [
//       new VNode("div", {className: 'container2'}),
//       new VNode("div", {className: 'container3'}),
//     ]);
//     expect(JSON.stringify(vdom)).toBe('{"tagName":"div","props":{"className":"container"},"children":[{"tagName":"div","props":{"className":"container2"},"children":[],"text":""},{"tagName":"div","props":{"className":"container3"},"children":[],"text":""}],"text":""}')
//   })
// })
const res = '{"tagName":"div","children":[{"tagName":"div","text":"1"}],"text":"2"}'
describe('idom', () => {
  test('校验idom结构', async () => {
    const vdom = parsent()
    expect(JSON.stringify(vdom)).toBe('{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}')
  })
})