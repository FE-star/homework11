const {
  elementOpen,
  text,
  elementEnd,
  currentInfo
} = require('./vdom/vnode.js')

const vnode1 = function () {
  elementOpen('div')
  elementOpen('p')
  text('1')
  elementEnd('p')
  text('2')
  elementEnd('div')
  var currentNode = currentInfo.currentNode
  console.log(currentNode)
}

const vnode2 = function () {
  elementOpen('div')
  elementOpen('p')
  text('1')
  elementEnd('p')
  text('2')
  elementEnd('div')
  var currentNode = currentInfo.currentNode
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n')
  elementOpen('div')
  elementOpen('p')
  text('3')
  elementEnd('p')
  text('4')
  elementEnd('div')
  var currentNode2 = currentInfo.currentNode

  console.log(currentNode)
  console.log(currentNode2)
}

// vnode1()
// {"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
vnode2()
// {"tagName":"div","children":[{"tagName":"p","text":"1"}],"text":"2"}
// {"tagName":"div","children":[{"tagName":"p","text":"3"}],"text":"4"}
