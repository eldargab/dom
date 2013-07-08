var domify = require('domify')
  , classes = require('classes')
  , event = require('event')

module.exports = dom

function dom (html, ctx) {
  return html[0] == '<'
    ? domify(html)
    : (ctx || document).querySelector(html)
}

dom.find = function(sel, ctx) {
  var list = (ctx || document).querySelectorAll(sel)
  return Array.prototype.slice.call(list)
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

dom.firstChild = function(el) {
  return next(el.firstChild)
}

dom.lastChild = function(el) {
  return prev(el.lastChild)
}

dom.next = function(el) {
  return next(el.nextSibling)
}

dom.prev = function(el) {
  return prev(el.previousSibling)
}

dom.addClass = function (cl, el) {
  classes(el).add(cl)
}

dom.removeClass = function (cl, el) {
  classes(el).remove(cl)
}

dom.hasClass = function (cl, el) {
  return classes(el).has(cl)
}

dom.toggle = function(cl, on, el) {
  if (on) {
    dom.addClass(cl, el)
  } else {
    dom.removeClass(cl, el)
  }
}

dom.remove = function (el) {
  var parent = el.parentNode
  parent && parent.removeChild(el)
}

dom.replace = function (n, old) {
  old.parentNode.replaceChild(n, old)
}

dom.insertBefore = function (n, ref) {
  ref.parentNode.insertBefore(n, ref)
}

dom.insertAfter = function (n, ref) {
  ref.parentNode.insertBefore(n, ref.nextSibling)
}

dom.on = function(el, type, fn, capture) {
  return event.bind(el, type, fn, capture || false)
}

dom.off = function(el, type, fn, capture) {
  return event.unbind(el, type, fn, capture || false)
}
