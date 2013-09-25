var domify = require('domify')
  , classes = require('classes')
  , event = require('event')

var dom = module.exports = new Dom(document)

function Dom(ctx) {
  this.ctx = ctx
}

Dom.prototype.get = function(sel, el) {
  return (el || this.ctx).querySelector(sel)
}

Dom.prototype.fromHTML = function(html) {
  return domify(html)
}

Dom.prototype.find = function(sel, el) {
  return new List((el || this.ctx).querySelectorAll(sel))
}

Dom.prototype.scoped = function(el) {
  return new Dom(el)
}

function next(el) {
  while(el && el.nodeType != 1) {
    el = el.nextSibling
  }
  return el
}

function prev(el) {
  while(el && el.nodeType != 1) {
    el = el.previousSibling
  }
  return el
}

Dom.prototype.firstChild = function(el) {
  return next(el.firstChild)
}

Dom.prototype.lastChild = function(el) {
  return prev(el.lastChild)
}

Dom.prototype.next = function(el) {
  return next(el.nextSibling)
}

Dom.prototype.prev = function(el) {
  return prev(el.previousSibling)
}

Dom.prototype.children = function(el) {
  var arr = []
    , ch = next(el.firstChild)
  while(ch) {
    arr.push(ch)
    ch = next(ch.nextSibling)
  }
  return new List(arr)
}

Dom.prototype.addClass = function (cl, el) {
  classes(el).add(cl)
}

Dom.prototype.removeClass = function (cl, el) {
  classes(el).remove(cl)
}

Dom.prototype.hasClass = function (cl, el) {
  return classes(el).has(cl)
}

Dom.prototype.toggle = function(cl, on, el) {
  if (on) {
    dom.addClass(cl, el)
  } else {
    dom.removeClass(cl, el)
  }
}

Dom.prototype.remove = function (el) {
  var parent = el.parentNode
  parent && parent.removeChild(el)
}

Dom.prototype.replace = function (n, old) {
  old.parentNode.replaceChild(n, old)
}

Dom.prototype.insertBefore = function (n, ref) {
  ref.parentNode.insertBefore(n, ref)
}

Dom.prototype.insertAfter = function (n, ref) {
  ref.parentNode.insertBefore(n, ref.nextSibling)
}

Dom.prototype.on = function(el, type, fn, capture) {
  return event.bind(el, type, fn, capture || false)
}

Dom.prototype.off = function(el, type, fn, capture) {
  return event.unbind(el, type, fn, capture || false)
}

function List(col) {
  this.col = col
}

List.prototype.forEach = function(fn) {
  for(var i = 0; i < this.col.length; i++) {
    fn(this.col[i])
  }
  return this
}

List.prototype.map = function(fn) {
  var ret = new Array(this.col.length)
  for(var i = 0; i < this.col.length; i++) {
    ret[i] = fn(this.col[i])
  }
  return ret
}

List.prototype.toArray = function() {
  return Array.prototype.slice.call(this.col)
}

List.prototype.on = function(type, fn, capture) {
  return this.forEach(function(el) {
    dom.on(el, type, fn, capture)
  })
}

List.prototype.off = function(type, fn, capture) {
  return this.forEach(function(el) {
    dom.off(el, type, fn, capture)
  })
}

List.prototype.addClass = function(cl) {
  return this.forEach(function(el) {
    dom.addClass(cl, el)
  })
}

List.prototype.removeClass = function(cl) {
  return this.forEach(function(el) {
    dom.removeClass(cl, el)
  })
}

List.prototype.toggle = function(cl, on) {
  return this.forEach(function(el) {
    dom.toggle(cl, on, el)
  })
}