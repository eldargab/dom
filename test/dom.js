var dom = require('dom')
var assert = require('component-assert')

describe('.fromHTML()', function () {
  it('should convert html to element', function () {
    var el = dom.fromHTML('<div>Hello</div>')
    assert(el.textContent == 'Hello')
  })
})

describe('.get(sel, [ctx])', function () {
  it('should return matched element', function () {
    var foo = dom.get('#foo')
    assert(foo.nodeType == 1)
    var bar = dom.get('.bar', foo)
    assert(bar.textContent == 'Hello')
  })
})

describe('.scoped(el)', function() {
  it('should return dom with query API scoped to the given el', function() {
    var root = dom.fromHTML(
      '<div>' +
        '<p>1</p>' +
        '<div class="second">' +
          '<p>2</p>' +
        '</div>' +
      '</div>'
    )
    var p = dom.scoped(dom.get('.second', root)).get('p')
    assert(p.textContent == '2')
    assert(dom.get('p', root).textContent == '1')
  })
})

describe('.firstChild()', function () {
  it('should return first element child', function () {
    var el = dom.get('#foo')
    var child = dom.firstChild(el)
    assert(child.nodeType == 1)
  })
})

describe('.lastChild()', function() {
  it('should return last element child', function () {
    var el = dom.get('#foo')
    var child = dom.lastChild(el)
    assert(child.nodeType == 1)
  })
})

describe('.children(el)', function() {
  it('should return a list of child elements', function() {
    var el = dom.fromHTML(
      '<div id="foo">' +
        '<p>Hello</p>' +
        '<!--comment-->' +
        '<p>World</p>' +
      '</div>'
    )
    var arr = dom.children(el).toArray()
    assert(arr[0].textContent == 'Hello')
    assert(arr[1].textContent == 'World')
    assert(arr.length == 2)
  })
})

describe('.remove()', function () {
  it('should remove element', function () {
    var html = dom.fromHTML('<div><p>Hello</p></div>')
    var el = dom.get('p', html)
    dom.remove(el)
    assert(html.textContent == '')
  })
})

describe('.insertBefore(new, ref)', function () {
  it('should insert new before ref', function () {
    var html = dom.fromHTML('<div><span> world</span></div>')
    var world = dom.get('span', html)
    dom.insertBefore(dom.fromHTML('<span>Hello</span>'), world)
    assert(html.textContent == 'Hello world')
  })
})

describe('.insertAfter()', function () {
  it('should insert new element after ref', function () {
    var html = dom.fromHTML('<div><span>Hello</span></div>')
    var hello = dom.get('span', html)
    dom.insertAfter(dom.fromHTML('<span> world</span>'), hello)
    assert(html.textContent == 'Hello world')
  })
})

describe('.addClass()', function () {
  it('should add class to element', function () {
    var el = dom.fromHTML('<div>')
    dom.addClass('foo', el)
    assert(el.className == 'foo')
  })
})

describe('.removeClass()', function () {
  it('should remove class from element', function () {
    var el = dom.fromHTML('<div class="foo bar baz">')
    dom.removeClass('foo', el)
    assert(el.className == 'bar baz')
  })
})

describe('.hasClass()', function () {
  it('should check for presence of class', function () {
    var el = dom.fromHTML('<div class="foo bar">')
    assert(dom.hasClass('bar', el))
    assert(!dom.hasClass('baz', el))
  })
})

describe('.toggle(cl, on, el)', function() {
  it('when "on" should add class', function() {
    var el = dom.fromHTML('<div class="foo">')
    dom.toggle('hello', true, el)
    dom.toggle('foo', true, el)
    assert(dom.hasClass('hello', el))
    assert(dom.hasClass('foo', el))
  })

  it('when "off" should remove class', function() {
    var el = dom.fromHTML('<div class="foo">')
    dom.toggle('foo', false, el)
    dom.toggle('bar', false, el)
    assert(!dom.hasClass('foo', el))
    assert(!dom.hasClass('bar', el))
  })
})
