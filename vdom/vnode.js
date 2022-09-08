/** 调用示例：
  var vdom = new VNode("div", {className: 'container'}, [
    new VNode("div", {className: 'container2'}),
    new VNode("div", {className: 'container3'}),
  ]);
*/

 /** 结果示例：
{
	"tagName": "div",
	"props": {
		"className": "container"
	},
	"children": [{
		"tagName": "div",
		"props": {
			"className": "container2"
		},
		"children": [],
		"text": ""
	}, {
		"tagName": "div",
		"props": {
			"className": "container3"
		},
		"children": [],
		"text": ""
	}],
	"text": ""
}
 */
class VNode {
  constructor() {
    // TODO
  };
  render () {
    // TODO
  }
}
module.exports = VNode;
