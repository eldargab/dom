var dom = require('dom')
var assert = require('component-assert')

describe('dom()', function () {
  describe('with html', function () {
    it('should convert html to element', function () {
      var el = dom('<div>Hello</div>')
      assert(el.textContent == 'Hello')
    })
  })

  describe('with selector', function () {
    it('should return matched element', function () {
      var foo = dom('#foo')
      assert(foo.nodeType == 1)
      var bar = dom('.bar', foo)
      assert(bar.textContent == 'Hello')
    })
  })
})

describe('.firstChild()', function () {
  it('should return first element child', function () {
    var el = dom('#foo')
    var child = dom.firstChild(el)
    assert(child.nodeType == 1)
  })
})
