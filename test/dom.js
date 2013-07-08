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

describe('.lastChild()', function() {
  it('should return last element child', function () {
    var el = dom('#foo')
    var child = dom.lastChild(el)
    assert(child.nodeType == 1)
  })
})

describe('.remove()', function () {
  it('should remove element', function () {
    var html = dom('<div><p>Hello</p></div>')
    var el = dom('p', html)
    dom.remove(el)
    assert(html.textContent == '')
  })
})

describe('.insertBefore(new, ref)', function () {
  it('should insert new before ref', function () {
    var html = dom('<div><span> world</span></div>')
    var world = dom('span', html)
    dom.insertBefore(dom('<span>Hello</span>'), world)
    assert(html.textContent == 'Hello world')
  })
})

describe('.insertAfter()', function () {
  it('should insert new element after ref', function () {
    var html = dom('<div><span>Hello</span></div>')
    var hello = dom('span', html)
    dom.insertAfter(dom('<span> world</span>'), hello)
    assert(html.textContent == 'Hello world')
  })
})

describe('.addClass()', function () {
  it('should add class to element', function () {
    var el = dom('<div>')
    dom.addClass('foo', el)
    assert(el.className == 'foo')
  })
})

describe('.removeClass()', function () {
  it('should remove class from element', function () {
    var el = dom('<div class="foo bar baz">')
    dom.removeClass('foo', el)
    assert(el.className == 'bar baz')
  })
})

describe('.hasClass()', function () {
  it('should check for presence of class', function () {
    var el = dom('<div class="foo bar">')
    assert(dom.hasClass('bar', el))
    assert(!dom.hasClass('baz', el))
  })
})

describe('.toggle(cl, on, el)', function() {
  it('when "on" should add class', function() {
    var el = dom('<div class="foo">')
    dom.toggle('hello', true, el)
    dom.toggle('foo', true, el)
    assert(dom.hasClass('hello', el))
    assert(dom.hasClass('foo', el))
  })

  it('when "off" should remove class', function() {
    var el = dom('<div class="foo">')
    dom.toggle('foo', false, el)
    dom.toggle('bar', false, el)
    assert(!dom.hasClass('foo', el))
    assert(!dom.hasClass('bar', el))
  })
})
