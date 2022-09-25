const {
  elementOpen,
  text,
  elementEnd,
  currentInfo,
} = require('../vdom/vnode.js');

describe('idom', () => {
  test('校验idom结构', async () => {
    elementOpen('div');
    elementOpen('p');
    text('1');
    elementEnd('p');
    text('2');
    elementEnd('div');
    var currentNode = currentInfo.currentNode;
    expect(JSON.stringify(currentNode)).toBe(
      '{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}'
    );
  });
});

describe('idom2', () => {
  test('重复调用的时候，生成结果独立互不影响', async () => {
    elementOpen('div');
    elementOpen('p');
    text('1');
    elementEnd('p');
    text('2');
    elementEnd('div');
    var currentNode = currentInfo.currentNode;
    elementOpen('div');
    elementOpen('p');
    text('3');
    elementEnd('p');
    text('4');
    elementEnd('div');
    var currentNode2 = currentInfo.currentNode;
    expect(JSON.stringify(currentNode)).toBe(
      '{"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}'
    );
    expect(JSON.stringify(currentNode2)).toBe(
      '{"tagName":"div","children":[{"tagName":"p","text":"3"}],"text":"4"}'
    );
  });
});
