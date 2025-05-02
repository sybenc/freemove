var jn = Object.defineProperty;
var He = (t) => {
  throw TypeError(t);
};
var tr = (t, e, n) => e in t ? jn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var v = (t, e, n) => tr(t, typeof e != "symbol" ? e + "" : e, n), pe = (t, e, n) => e.has(t) || He("Cannot " + n);
var ot = (t, e, n) => (pe(t, e, "read from private field"), n ? n.call(t) : e.get(t)), ct = (t, e, n) => e.has(t) ? He("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), V = (t, e, n, r) => (pe(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n), ye = (t, e, n) => (pe(t, e, "access private method"), n);
const er = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Ue = (t = 21) => {
  let e = "", n = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += er[n[t] & 63];
  return e;
};
const pt = "__freemove";
var j = ((t) => (t.Board = `${pt}-board`, t.Container = `${pt}-container`, t.MovableNode = `${pt}-movable-node`, t.Svg = `${pt}-svg`, t))(j || {});
function tt(t) {
  return typeof t == "number" ? `${t}px` : String(t);
}
function nr(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
var ht, ft, xt, vt, Ot, Lt, be;
const Et = class Et {
  constructor({ x: e, y: n, h: r, w: i, node: s }) {
    ct(this, Lt);
    ct(this, ht);
    ct(this, ft);
    ct(this, xt);
    ct(this, vt);
    ct(this, Ot);
    v(this, "node");
    v(this, "parent", null);
    v(this, "children", []);
    V(this, ht, e), V(this, ft, n), V(this, vt, r), V(this, xt, i), this.node = s, V(this, Ot, String(s.dataset.id));
  }
  get id() {
    return ot(this, Ot);
  }
  get x() {
    return ot(this, ht);
  }
  set x(e) {
    V(this, ht, e), ye(this, Lt, be).call(this);
  }
  get y() {
    return ot(this, ft);
  }
  set y(e) {
    V(this, ft, e), ye(this, Lt, be).call(this);
  }
  get w() {
    return ot(this, xt);
  }
  set w(e) {
    V(this, xt, e), this.node.style.width = tt(e);
  }
  get h() {
    return ot(this, vt);
  }
  set h(e) {
    V(this, vt, e), this.node.style.height = tt(e);
  }
  set error(e) {
    this.attr("data-error", String(e));
  }
  get error() {
    return this.getAttr("data-error") === "true";
  }
  set lock(e) {
    this.attr("data-lock", String(e));
  }
  get lock() {
    return this.getAttr("data-lock") === "true";
  }
  // 判断一个点是否在矩形里面
  isInSide(e) {
    return e.x >= this.x && e.x <= this.x + this.w && e.y >= this.y && e.y <= this.y + this.h;
  }
  // 判断两个矩形是否相交
  isIntersect(e) {
    const n = this.x + 0.01, r = this.y + 0.01, i = this.x + this.w - 0.01, s = this.y + this.h - 0.01, o = e.x, a = e.y, c = e.x + e.w, u = e.y + e.h;
    return !(i < o || n > c || s < a || r > u);
  }
  isBoard() {
    return this.isClassed(j.Board);
  }
  isNode() {
    return this.isClassed(j.MovableNode);
  }
  isContainer() {
    return this.isClassed(j.Container);
  }
  // 相对于父元素对齐
  align(e) {
    if (!this.parent) return;
    const n = this.parent;
    switch (e) {
      case "h-start":
        this.x = 0;
        break;
      case "h-center":
        this.x = n.w / 2 - this.w / 2;
        break;
      case "h-end":
        this.x = n.w - this.w;
        break;
      case "v-top":
        this.y = 0;
        break;
      case "v-center":
        this.y = n.h / 2 - this.h / 2;
        break;
      case "v-bottom":
        this.x = n.h - this.h;
        break;
    }
  }
  classed(e, n) {
    const r = e.split(" ");
    n ? this.node.classList.add(...r) : this.node.classList.remove(...r);
  }
  isClassed(e) {
    return this.node.classList.contains(e);
  }
  style(e, n) {
    return this.node.style[e] = n, this;
  }
  attr(e, n) {
    return e in this.node ? this.node[e] = n : this.node.setAttribute(e, n), this;
  }
  getAttr(e) {
    return this.node.getAttribute(e);
  }
  // 从dom元素的style构建Rect对象
  static from(e) {
    const n = getComputedStyle(e), r = new Et({
      x: parseInt(n.left) || 0,
      y: parseInt(n.top) || 0,
      w: parseInt(n.width) || 0,
      h: parseInt(n.height) || 0,
      node: e
    });
    return Et.isBoard(e) && (r.parent = null), Array.from(e.children).forEach((i) => {
      const s = Et.from(i);
      s.parent = r, r.children.push(s);
    }), r;
  }
  static isBoard(e) {
    return e.classList.contains(j.Board);
  }
  static isNode(e) {
    return e.classList.contains(j.MovableNode);
  }
  static isContainer(e) {
    return e.classList.contains(j.Container);
  }
};
ht = new WeakMap(), ft = new WeakMap(), xt = new WeakMap(), vt = new WeakMap(), Ot = new WeakMap(), Lt = new WeakSet(), be = function() {
  this.node.style.transform = `translate(${ot(this, ht)}px, ${ot(this, ft)}px)`;
};
let jt = Et;
var Me = "http://www.w3.org/1999/xhtml";
const Ge = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Me,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function le(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ge.hasOwnProperty(e) ? { space: Ge[e], local: t } : t;
}
function rr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Me && e.documentElement.namespaceURI === Me ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function ir(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function De(t) {
  var e = le(t);
  return (e.local ? ir : rr)(e);
}
function sr() {
}
function Xe(t) {
  return t == null ? sr : function() {
    return this.querySelector(t);
  };
}
function or(t) {
  typeof t != "function" && (t = Xe(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = new Array(o), c, u, l = 0; l < o; ++l)
      (c = s[l]) && (u = t.call(c, c.__data__, l, s)) && ("__data__" in c && (u.__data__ = c.__data__), a[l] = u);
  return new Y(r, this._parents);
}
function xn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ar() {
  return [];
}
function vn(t) {
  return t == null ? ar : function() {
    return this.querySelectorAll(t);
  };
}
function ur(t) {
  return function() {
    return xn(t.apply(this, arguments));
  };
}
function cr(t) {
  typeof t == "function" ? t = ur(t) : t = vn(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], a = o.length, c, u = 0; u < a; ++u)
      (c = o[u]) && (r.push(t.call(c, c.__data__, u, o)), i.push(c));
  return new Y(r, i);
}
function bn(t) {
  return function() {
    return this.matches(t);
  };
}
function Mn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var lr = Array.prototype.find;
function hr(t) {
  return function() {
    return lr.call(this.children, t);
  };
}
function fr() {
  return this.firstElementChild;
}
function dr(t) {
  return this.select(t == null ? fr : hr(typeof t == "function" ? t : Mn(t)));
}
var gr = Array.prototype.filter;
function mr() {
  return Array.from(this.children);
}
function pr(t) {
  return function() {
    return gr.call(this.children, t);
  };
}
function yr(t) {
  return this.selectAll(t == null ? mr : pr(typeof t == "function" ? t : Mn(t)));
}
function _r(t) {
  typeof t != "function" && (t = bn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], c, u = 0; u < o; ++u)
      (c = s[u]) && t.call(c, c.__data__, u, s) && a.push(c);
  return new Y(r, this._parents);
}
function kn(t) {
  return new Array(t.length);
}
function wr() {
  return new Y(this._enter || this._groups.map(kn), this._parents);
}
function te(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
te.prototype = {
  constructor: te,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function xr(t) {
  return function() {
    return t;
  };
}
function vr(t, e, n, r, i, s) {
  for (var o = 0, a, c = e.length, u = s.length; o < u; ++o)
    (a = e[o]) ? (a.__data__ = s[o], r[o] = a) : n[o] = new te(t, s[o]);
  for (; o < c; ++o)
    (a = e[o]) && (i[o] = a);
}
function br(t, e, n, r, i, s, o) {
  var a, c, u = /* @__PURE__ */ new Map(), l = e.length, d = s.length, h = new Array(l), m;
  for (a = 0; a < l; ++a)
    (c = e[a]) && (h[a] = m = o.call(c, c.__data__, a, e) + "", u.has(m) ? i[a] = c : u.set(m, c));
  for (a = 0; a < d; ++a)
    m = o.call(t, s[a], a, s) + "", (c = u.get(m)) ? (r[a] = c, c.__data__ = s[a], u.delete(m)) : n[a] = new te(t, s[a]);
  for (a = 0; a < l; ++a)
    (c = e[a]) && u.get(h[a]) === c && (i[a] = c);
}
function Mr(t) {
  return t.__data__;
}
function kr(t, e) {
  if (!arguments.length) return Array.from(this, Mr);
  var n = e ? br : vr, r = this._parents, i = this._groups;
  typeof t != "function" && (t = xr(t));
  for (var s = i.length, o = new Array(s), a = new Array(s), c = new Array(s), u = 0; u < s; ++u) {
    var l = r[u], d = i[u], h = d.length, m = Ar(t.call(l, l && l.__data__, u, r)), A = m.length, S = a[u] = new Array(A), E = o[u] = new Array(A), w = c[u] = new Array(h);
    n(l, d, S, E, w, m, e);
    for (var D = 0, T = 0, p, x; D < A; ++D)
      if (p = S[D]) {
        for (D >= T && (T = D + 1); !(x = E[T]) && ++T < A; ) ;
        p._next = x || null;
      }
  }
  return o = new Y(o, r), o._enter = a, o._exit = c, o;
}
function Ar(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Rr() {
  return new Y(this._exit || this._groups.map(kn), this._parents);
}
function Nr(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function $r(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), a = new Array(i), c = 0; c < o; ++c)
    for (var u = n[c], l = r[c], d = u.length, h = a[c] = new Array(d), m, A = 0; A < d; ++A)
      (m = u[A] || l[A]) && (h[A] = m);
  for (; c < i; ++c)
    a[c] = n[c];
  return new Y(a, this._parents);
}
function Sr() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function Tr(t) {
  t || (t = Er);
  function e(d, h) {
    return d && h ? t(d.__data__, h.__data__) : !d - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], a = o.length, c = i[s] = new Array(a), u, l = 0; l < a; ++l)
      (u = o[l]) && (c[l] = u);
    c.sort(e);
  }
  return new Y(i, this._parents).order();
}
function Er(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Cr() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function zr() {
  return Array.from(this);
}
function Dr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function Xr() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Or() {
  return !this.node();
}
function Lr(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, a; s < o; ++s)
      (a = i[s]) && t.call(a, a.__data__, s, i);
  return this;
}
function Fr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ir(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Pr(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Br(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Yr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function qr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Vr(t, e) {
  var n = le(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ir : Fr : typeof e == "function" ? n.local ? qr : Yr : n.local ? Br : Pr)(n, e));
}
function An(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Hr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ur(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Gr(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Kr(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Hr : typeof e == "function" ? Gr : Ur)(t, e, n ?? "")) : Mt(this.node(), t);
}
function Mt(t, e) {
  return t.style.getPropertyValue(e) || An(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Zr(t) {
  return function() {
    delete this[t];
  };
}
function Wr(t, e) {
  return function() {
    this[t] = e;
  };
}
function Qr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Jr(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Zr : typeof e == "function" ? Qr : Wr)(t, e)) : this.node()[t];
}
function Rn(t) {
  return t.trim().split(/^|\s+/);
}
function Oe(t) {
  return t.classList || new Nn(t);
}
function Nn(t) {
  this._node = t, this._names = Rn(t.getAttribute("class") || "");
}
Nn.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function $n(t, e) {
  for (var n = Oe(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Sn(t, e) {
  for (var n = Oe(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function jr(t) {
  return function() {
    $n(this, t);
  };
}
function ti(t) {
  return function() {
    Sn(this, t);
  };
}
function ei(t, e) {
  return function() {
    (e.apply(this, arguments) ? $n : Sn)(this, t);
  };
}
function ni(t, e) {
  var n = Rn(t + "");
  if (arguments.length < 2) {
    for (var r = Oe(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? ei : e ? jr : ti)(n, e));
}
function ri() {
  this.textContent = "";
}
function ii(t) {
  return function() {
    this.textContent = t;
  };
}
function si(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function oi(t) {
  return arguments.length ? this.each(t == null ? ri : (typeof t == "function" ? si : ii)(t)) : this.node().textContent;
}
function ai() {
  this.innerHTML = "";
}
function ui(t) {
  return function() {
    this.innerHTML = t;
  };
}
function ci(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function li(t) {
  return arguments.length ? this.each(t == null ? ai : (typeof t == "function" ? ci : ui)(t)) : this.node().innerHTML;
}
function hi() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function fi() {
  return this.each(hi);
}
function di() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function gi() {
  return this.each(di);
}
function mi(t) {
  var e = typeof t == "function" ? t : De(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function pi() {
  return null;
}
function yi(t, e) {
  var n = typeof t == "function" ? t : De(t), r = e == null ? pi : typeof e == "function" ? e : Xe(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function _i() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function wi() {
  return this.each(_i);
}
function xi() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function vi() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function bi(t) {
  return this.select(t ? vi : xi);
}
function Mi(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ki(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ai(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Ri(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Ni(t, e, n) {
  return function() {
    var r = this.__on, i, s = ki(e);
    if (r) {
      for (var o = 0, a = r.length; o < a; ++o)
        if ((i = r[o]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, s, n), i = { type: t.type, name: t.name, value: e, listener: s, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function $i(t, e, n) {
  var r = Ai(t + ""), i, s = r.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var c = 0, u = a.length, l; c < u; ++c)
        for (i = 0, l = a[c]; i < s; ++i)
          if ((o = r[i]).type === l.type && o.name === l.name)
            return l.value;
    }
    return;
  }
  for (a = e ? Ni : Ri, i = 0; i < s; ++i) this.each(a(r[i], e, n));
  return this;
}
function Tn(t, e, n) {
  var r = An(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Si(t, e) {
  return function() {
    return Tn(this, t, e);
  };
}
function Ti(t, e) {
  return function() {
    return Tn(this, t, e.apply(this, arguments));
  };
}
function Ei(t, e) {
  return this.each((typeof e == "function" ? Ti : Si)(t, e));
}
function* Ci() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var Le = [null];
function Y(t, e) {
  this._groups = t, this._parents = e;
}
function Ft() {
  return new Y([[document.documentElement]], Le);
}
function zi() {
  return this;
}
Y.prototype = Ft.prototype = {
  constructor: Y,
  select: or,
  selectAll: cr,
  selectChild: dr,
  selectChildren: yr,
  filter: _r,
  data: kr,
  enter: wr,
  exit: Rr,
  join: Nr,
  merge: $r,
  selection: zi,
  order: Sr,
  sort: Tr,
  call: Cr,
  nodes: zr,
  node: Dr,
  size: Xr,
  empty: Or,
  each: Lr,
  attr: Vr,
  style: Kr,
  property: Jr,
  classed: ni,
  text: oi,
  html: li,
  raise: fi,
  lower: gi,
  append: mi,
  insert: yi,
  remove: wi,
  clone: bi,
  datum: Mi,
  on: $i,
  dispatch: Ei,
  [Symbol.iterator]: Ci
};
function Z(t) {
  return typeof t == "string" ? new Y([[document.querySelector(t)]], [document.documentElement]) : new Y([[t]], Le);
}
function Di(t) {
  return Z(De(t).call(document.documentElement));
}
function En(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function G(t, e) {
  if (t = En(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
function Xi(t, e) {
  return t.target && (t = En(t), e === void 0 && (e = t.currentTarget), t = t.touches || [t]), Array.from(t, (n) => G(n, e));
}
function Oi(t) {
  return typeof t == "string" ? new Y([document.querySelectorAll(t)], [document.documentElement]) : new Y([xn(t)], Le);
}
var Li = { value: () => {
} };
function he() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Ut(n);
}
function Ut(t) {
  this._ = t;
}
function Fi(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Ut.prototype = he.prototype = {
  constructor: Ut,
  on: function(t, e) {
    var n = this._, r = Fi(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (t = r[s]).type) && (i = Ii(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (i = (t = r[s]).type) n[i] = Ke(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Ke(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Ut(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, s; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (s = this._[t], r = 0, i = s.length; r < i; ++r) s[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, s = r.length; i < s; ++i) r[i].value.apply(e, n);
  }
};
function Ii(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Ke(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Li, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const Pi = { passive: !1 }, Ct = { capture: !0, passive: !1 };
function _e(t) {
  t.stopImmediatePropagation();
}
function _t(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Cn(t) {
  var e = t.document.documentElement, n = Z(t).on("dragstart.drag", _t, Ct);
  "onselectstart" in e ? n.on("selectstart.drag", _t, Ct) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function zn(t, e) {
  var n = t.document.documentElement, r = Z(t).on("dragstart.drag", null);
  e && (r.on("click.drag", _t, Ct), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Pt = (t) => () => t;
function ke(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: i,
  active: s,
  x: o,
  y: a,
  dx: c,
  dy: u,
  dispatch: l
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: s, enumerable: !0, configurable: !0 },
    x: { value: o, enumerable: !0, configurable: !0 },
    y: { value: a, enumerable: !0, configurable: !0 },
    dx: { value: c, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: l }
  });
}
ke.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Bi(t) {
  return !t.ctrlKey && !t.button;
}
function Yi() {
  return this.parentNode;
}
function qi(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Vi() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Hi() {
  var t = Bi, e = Yi, n = qi, r = Vi, i = {}, s = he("start", "drag", "end"), o = 0, a, c, u, l, d = 0;
  function h(p) {
    p.on("mousedown.drag", m).filter(r).on("touchstart.drag", E).on("touchmove.drag", w, Pi).on("touchend.drag touchcancel.drag", D).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function m(p, x) {
    if (!(l || !t.call(this, p, x))) {
      var N = T(this, e.call(this, p, x), p, x, "mouse");
      N && (Z(p.view).on("mousemove.drag", A, Ct).on("mouseup.drag", S, Ct), Cn(p.view), _e(p), u = !1, a = p.clientX, c = p.clientY, N("start", p));
    }
  }
  function A(p) {
    if (_t(p), !u) {
      var x = p.clientX - a, N = p.clientY - c;
      u = x * x + N * N > d;
    }
    i.mouse("drag", p);
  }
  function S(p) {
    Z(p.view).on("mousemove.drag mouseup.drag", null), zn(p.view, u), _t(p), i.mouse("end", p);
  }
  function E(p, x) {
    if (t.call(this, p, x)) {
      var N = p.changedTouches, $ = e.call(this, p, x), X = N.length, I, P;
      for (I = 0; I < X; ++I)
        (P = T(this, $, p, x, N[I].identifier, N[I])) && (_e(p), P("start", p, N[I]));
    }
  }
  function w(p) {
    var x = p.changedTouches, N = x.length, $, X;
    for ($ = 0; $ < N; ++$)
      (X = i[x[$].identifier]) && (_t(p), X("drag", p, x[$]));
  }
  function D(p) {
    var x = p.changedTouches, N = x.length, $, X;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), $ = 0; $ < N; ++$)
      (X = i[x[$].identifier]) && (_e(p), X("end", p, x[$]));
  }
  function T(p, x, N, $, X, I) {
    var P = s.copy(), b = G(I || N, x), L, O, f;
    if ((f = n.call(p, new ke("beforestart", {
      sourceEvent: N,
      target: h,
      identifier: X,
      active: o,
      x: b[0],
      y: b[1],
      dx: 0,
      dy: 0,
      dispatch: P
    }), $)) != null)
      return L = f.x - b[0] || 0, O = f.y - b[1] || 0, function y(g, _, k) {
        var M = b, R;
        switch (g) {
          case "start":
            i[X] = y, R = o++;
            break;
          case "end":
            delete i[X], --o;
          // falls through
          case "drag":
            b = G(k || _, x), R = o;
            break;
        }
        P.call(
          g,
          p,
          new ke(g, {
            sourceEvent: _,
            subject: f,
            target: h,
            identifier: X,
            active: R,
            x: b[0] + L,
            y: b[1] + O,
            dx: b[0] - M[0],
            dy: b[1] - M[1],
            dispatch: P
          }),
          $
        );
      };
  }
  return h.filter = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : Pt(!!p), h) : t;
  }, h.container = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : Pt(p), h) : e;
  }, h.subject = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : Pt(p), h) : n;
  }, h.touchable = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : Pt(!!p), h) : r;
  }, h.on = function() {
    var p = s.on.apply(s, arguments);
    return p === s ? h : p;
  }, h.clickDistance = function(p) {
    return arguments.length ? (d = (p = +p) * p, h) : Math.sqrt(d);
  }, h;
}
function Ui(t) {
  return t;
}
var Gt = 1, Kt = 2, Ae = 3, $t = 4, Ze = 1e-6;
function Gi(t) {
  return "translate(" + t + ",0)";
}
function Ki(t) {
  return "translate(0," + t + ")";
}
function Zi(t) {
  return (e) => +t(e);
}
function Wi(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Qi() {
  return !this.__axis;
}
function fe(t, e) {
  var n = [], r = null, i = null, s = 6, o = 6, a = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, u = t === Gt || t === $t ? -1 : 1, l = t === $t || t === Kt ? "x" : "y", d = t === Gt || t === Ae ? Gi : Ki;
  function h(m) {
    var A = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), S = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Ui), E = Math.max(s, 0) + a, w = e.range(), D = +w[0] + c, T = +w[w.length - 1] + c, p = (e.bandwidth ? Wi : Zi)(e.copy(), c), x = m.selection ? m.selection() : m, N = x.selectAll(".domain").data([null]), $ = x.selectAll(".tick").data(A, e).order(), X = $.exit(), I = $.enter().append("g").attr("class", "tick"), P = $.select("line"), b = $.select("text");
    N = N.merge(N.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), $ = $.merge(I), P = P.merge(I.append("line").attr("stroke", "currentColor").attr(l + "2", u * s)), b = b.merge(I.append("text").attr("fill", "currentColor").attr(l, u * E).attr("dy", t === Gt ? "0em" : t === Ae ? "0.71em" : "0.32em")), m !== x && (N = N.transition(m), $ = $.transition(m), P = P.transition(m), b = b.transition(m), X = X.transition(m).attr("opacity", Ze).attr("transform", function(L) {
      return isFinite(L = p(L)) ? d(L + c) : this.getAttribute("transform");
    }), I.attr("opacity", Ze).attr("transform", function(L) {
      var O = this.parentNode.__axis;
      return d((O && isFinite(O = O(L)) ? O : p(L)) + c);
    })), X.remove(), N.attr("d", t === $t || t === Kt ? o ? "M" + u * o + "," + D + "H" + c + "V" + T + "H" + u * o : "M" + c + "," + D + "V" + T : o ? "M" + D + "," + u * o + "V" + c + "H" + T + "V" + u * o : "M" + D + "," + c + "H" + T), $.attr("opacity", 1).attr("transform", function(L) {
      return d(p(L) + c);
    }), P.attr(l + "2", u * s), b.attr(l, u * E).text(S), x.filter(Qi).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Kt ? "start" : t === $t ? "end" : "middle"), x.each(function() {
      this.__axis = p;
    });
  }
  return h.scale = function(m) {
    return arguments.length ? (e = m, h) : e;
  }, h.ticks = function() {
    return n = Array.from(arguments), h;
  }, h.tickArguments = function(m) {
    return arguments.length ? (n = m == null ? [] : Array.from(m), h) : n.slice();
  }, h.tickValues = function(m) {
    return arguments.length ? (r = m == null ? null : Array.from(m), h) : r && r.slice();
  }, h.tickFormat = function(m) {
    return arguments.length ? (i = m, h) : i;
  }, h.tickSize = function(m) {
    return arguments.length ? (s = o = +m, h) : s;
  }, h.tickSizeInner = function(m) {
    return arguments.length ? (s = +m, h) : s;
  }, h.tickSizeOuter = function(m) {
    return arguments.length ? (o = +m, h) : o;
  }, h.tickPadding = function(m) {
    return arguments.length ? (a = +m, h) : a;
  }, h.offset = function(m) {
    return arguments.length ? (c = +m, h) : c;
  }, h;
}
function Ji(t) {
  return fe(Gt, t);
}
function ji(t) {
  return fe(Kt, t);
}
function ts(t) {
  return fe(Ae, t);
}
function es(t) {
  return fe($t, t);
}
function Fe(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Dn(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function It() {
}
var zt = 0.7, ee = 1 / zt, wt = "\\s*([+-]?\\d+)\\s*", Dt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", nt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ns = /^#([0-9a-f]{3,8})$/, rs = new RegExp(`^rgb\\(${wt},${wt},${wt}\\)$`), is = new RegExp(`^rgb\\(${nt},${nt},${nt}\\)$`), ss = new RegExp(`^rgba\\(${wt},${wt},${wt},${Dt}\\)$`), os = new RegExp(`^rgba\\(${nt},${nt},${nt},${Dt}\\)$`), as = new RegExp(`^hsl\\(${Dt},${nt},${nt}\\)$`), us = new RegExp(`^hsla\\(${Dt},${nt},${nt},${Dt}\\)$`), We = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Fe(It, gt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Qe,
  // Deprecated! Use color.formatHex.
  formatHex: Qe,
  formatHex8: cs,
  formatHsl: ls,
  formatRgb: Je,
  toString: Je
});
function Qe() {
  return this.rgb().formatHex();
}
function cs() {
  return this.rgb().formatHex8();
}
function ls() {
  return Xn(this).formatHsl();
}
function Je() {
  return this.rgb().formatRgb();
}
function gt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = ns.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? je(e) : n === 3 ? new q(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Bt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Bt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = rs.exec(t)) ? new q(e[1], e[2], e[3], 1) : (e = is.exec(t)) ? new q(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ss.exec(t)) ? Bt(e[1], e[2], e[3], e[4]) : (e = os.exec(t)) ? Bt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = as.exec(t)) ? nn(e[1], e[2] / 100, e[3] / 100, 1) : (e = us.exec(t)) ? nn(e[1], e[2] / 100, e[3] / 100, e[4]) : We.hasOwnProperty(t) ? je(We[t]) : t === "transparent" ? new q(NaN, NaN, NaN, 0) : null;
}
function je(t) {
  return new q(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Bt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new q(t, e, n, r);
}
function hs(t) {
  return t instanceof It || (t = gt(t)), t ? (t = t.rgb(), new q(t.r, t.g, t.b, t.opacity)) : new q();
}
function Re(t, e, n, r) {
  return arguments.length === 1 ? hs(t) : new q(t, e, n, r ?? 1);
}
function q(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Fe(q, Re, Dn(It, {
  brighter(t) {
    return t = t == null ? ee : Math.pow(ee, t), new q(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zt : Math.pow(zt, t), new q(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new q(dt(this.r), dt(this.g), dt(this.b), ne(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: tn,
  // Deprecated! Use color.formatHex.
  formatHex: tn,
  formatHex8: fs,
  formatRgb: en,
  toString: en
}));
function tn() {
  return `#${lt(this.r)}${lt(this.g)}${lt(this.b)}`;
}
function fs() {
  return `#${lt(this.r)}${lt(this.g)}${lt(this.b)}${lt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function en() {
  const t = ne(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${dt(this.r)}, ${dt(this.g)}, ${dt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ne(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function dt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function lt(t) {
  return t = dt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function nn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new W(t, e, n, r);
}
function Xn(t) {
  if (t instanceof W) return new W(t.h, t.s, t.l, t.opacity);
  if (t instanceof It || (t = gt(t)), !t) return new W();
  if (t instanceof W) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, a = s - i, c = (s + i) / 2;
  return a ? (e === s ? o = (n - r) / a + (n < r) * 6 : n === s ? o = (r - e) / a + 2 : o = (e - n) / a + 4, a /= c < 0.5 ? s + i : 2 - s - i, o *= 60) : a = c > 0 && c < 1 ? 0 : o, new W(o, a, c, t.opacity);
}
function ds(t, e, n, r) {
  return arguments.length === 1 ? Xn(t) : new W(t, e, n, r ?? 1);
}
function W(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Fe(W, ds, Dn(It, {
  brighter(t) {
    return t = t == null ? ee : Math.pow(ee, t), new W(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zt : Math.pow(zt, t), new W(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new q(
      we(t >= 240 ? t - 240 : t + 120, i, r),
      we(t, i, r),
      we(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new W(rn(this.h), Yt(this.s), Yt(this.l), ne(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ne(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${rn(this.h)}, ${Yt(this.s) * 100}%, ${Yt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function rn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Yt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function we(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Ie = (t) => () => t;
function gs(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function ms(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function ps(t) {
  return (t = +t) == 1 ? On : function(e, n) {
    return n - e ? ms(e, n, t) : Ie(isNaN(e) ? n : e);
  };
}
function On(t, e) {
  var n = e - t;
  return n ? gs(t, n) : Ie(isNaN(t) ? e : t);
}
const re = function t(e) {
  var n = ps(e);
  function r(i, s) {
    var o = n((i = Re(i)).r, (s = Re(s)).r), a = n(i.g, s.g), c = n(i.b, s.b), u = On(i.opacity, s.opacity);
    return function(l) {
      return i.r = o(l), i.g = a(l), i.b = c(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function ys(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function _s(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function ws(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = Pe(t[o], e[o]);
  for (; o < n; ++o) s[o] = e[o];
  return function(a) {
    for (o = 0; o < r; ++o) s[o] = i[o](a);
    return s;
  };
}
function xs(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function K(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function vs(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Pe(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var Ne = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, xe = new RegExp(Ne.source, "g");
function bs(t) {
  return function() {
    return t;
  };
}
function Ms(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Ln(t, e) {
  var n = Ne.lastIndex = xe.lastIndex = 0, r, i, s, o = -1, a = [], c = [];
  for (t = t + "", e = e + ""; (r = Ne.exec(t)) && (i = xe.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), a[o] ? a[o] += s : a[++o] = s), (r = r[0]) === (i = i[0]) ? a[o] ? a[o] += i : a[++o] = i : (a[++o] = null, c.push({ i: o, x: K(r, i) })), n = xe.lastIndex;
  return n < e.length && (s = e.slice(n), a[o] ? a[o] += s : a[++o] = s), a.length < 2 ? c[0] ? Ms(c[0].x) : bs(e) : (e = c.length, function(u) {
    for (var l = 0, d; l < e; ++l) a[(d = c[l]).i] = d.x(u);
    return a.join("");
  });
}
function Pe(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Ie(e) : (n === "number" ? K : n === "string" ? (r = gt(e)) ? (e = r, re) : Ln : e instanceof gt ? re : e instanceof Date ? xs : _s(e) ? ys : Array.isArray(e) ? ws : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? vs : K)(t, e);
}
function ks(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var sn = 180 / Math.PI, $e = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Fn(t, e, n, r, i, s) {
  var o, a, c;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (c = t * n + e * r) && (n -= t * c, r -= e * c), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, c /= a), t * r < e * n && (t = -t, e = -e, c = -c, o = -o), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * sn,
    skewX: Math.atan(c) * sn,
    scaleX: o,
    scaleY: a
  };
}
var qt;
function As(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? $e : Fn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Rs(t) {
  return t == null || (qt || (qt = document.createElementNS("http://www.w3.org/2000/svg", "g")), qt.setAttribute("transform", t), !(t = qt.transform.baseVal.consolidate())) ? $e : (t = t.matrix, Fn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function In(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function s(u, l, d, h, m, A) {
    if (u !== d || l !== h) {
      var S = m.push("translate(", null, e, null, n);
      A.push({ i: S - 4, x: K(u, d) }, { i: S - 2, x: K(l, h) });
    } else (d || h) && m.push("translate(" + d + e + h + n);
  }
  function o(u, l, d, h) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), h.push({ i: d.push(i(d) + "rotate(", null, r) - 2, x: K(u, l) })) : l && d.push(i(d) + "rotate(" + l + r);
  }
  function a(u, l, d, h) {
    u !== l ? h.push({ i: d.push(i(d) + "skewX(", null, r) - 2, x: K(u, l) }) : l && d.push(i(d) + "skewX(" + l + r);
  }
  function c(u, l, d, h, m, A) {
    if (u !== d || l !== h) {
      var S = m.push(i(m) + "scale(", null, ",", null, ")");
      A.push({ i: S - 4, x: K(u, d) }, { i: S - 2, x: K(l, h) });
    } else (d !== 1 || h !== 1) && m.push(i(m) + "scale(" + d + "," + h + ")");
  }
  return function(u, l) {
    var d = [], h = [];
    return u = t(u), l = t(l), s(u.translateX, u.translateY, l.translateX, l.translateY, d, h), o(u.rotate, l.rotate, d, h), a(u.skewX, l.skewX, d, h), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, d, h), u = l = null, function(m) {
      for (var A = -1, S = h.length, E; ++A < S; ) d[(E = h[A]).i] = E.x(m);
      return d.join("");
    };
  };
}
var Ns = In(As, "px, ", "px)", "deg)"), $s = In(Rs, ", ", ")", ")"), Ss = 1e-12;
function on(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Ts(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Es(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Cs = function t(e, n, r) {
  function i(s, o) {
    var a = s[0], c = s[1], u = s[2], l = o[0], d = o[1], h = o[2], m = l - a, A = d - c, S = m * m + A * A, E, w;
    if (S < Ss)
      w = Math.log(h / u) / e, E = function($) {
        return [
          a + $ * m,
          c + $ * A,
          u * Math.exp(e * $ * w)
        ];
      };
    else {
      var D = Math.sqrt(S), T = (h * h - u * u + r * S) / (2 * u * n * D), p = (h * h - u * u - r * S) / (2 * h * n * D), x = Math.log(Math.sqrt(T * T + 1) - T), N = Math.log(Math.sqrt(p * p + 1) - p);
      w = (N - x) / e, E = function($) {
        var X = $ * w, I = on(x), P = u / (n * D) * (I * Es(e * X + x) - Ts(x));
        return [
          a + P * m,
          c + P * A,
          u * I / on(e * X + x)
        ];
      };
    }
    return E.duration = w * 1e3 * e / Math.SQRT2, E;
  }
  return i.rho = function(s) {
    var o = Math.max(1e-3, +s), a = o * o, c = a * a;
    return t(o, a, c);
  }, i;
}(Math.SQRT2, 2, 4);
var kt = 0, St = 0, Rt = 0, Pn = 1e3, ie, Tt, se = 0, mt = 0, de = 0, Xt = typeof performance == "object" && performance.now ? performance : Date, Bn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Be() {
  return mt || (Bn(zs), mt = Xt.now() + de);
}
function zs() {
  mt = 0;
}
function oe() {
  this._call = this._time = this._next = null;
}
oe.prototype = Yn.prototype = {
  constructor: oe,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Be() : +n) + (e == null ? 0 : +e), !this._next && Tt !== this && (Tt ? Tt._next = this : ie = this, Tt = this), this._call = t, this._time = n, Se();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Se());
  }
};
function Yn(t, e, n) {
  var r = new oe();
  return r.restart(t, e, n), r;
}
function Ds() {
  Be(), ++kt;
  for (var t = ie, e; t; )
    (e = mt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --kt;
}
function an() {
  mt = (se = Xt.now()) + de, kt = St = 0;
  try {
    Ds();
  } finally {
    kt = 0, Os(), mt = 0;
  }
}
function Xs() {
  var t = Xt.now(), e = t - se;
  e > Pn && (de -= e, se = t);
}
function Os() {
  for (var t, e = ie, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ie = n);
  Tt = t, Se(r);
}
function Se(t) {
  if (!kt) {
    St && (St = clearTimeout(St));
    var e = t - mt;
    e > 24 ? (t < 1 / 0 && (St = setTimeout(an, t - Xt.now() - de)), Rt && (Rt = clearInterval(Rt))) : (Rt || (se = Xt.now(), Rt = setInterval(Xs, Pn)), kt = 1, Bn(an));
  }
}
function un(t, e, n) {
  var r = new oe();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Ls = he("start", "end", "cancel", "interrupt"), Fs = [], qn = 0, cn = 1, Te = 2, Zt = 3, ln = 4, Ee = 5, Wt = 6;
function ge(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  Is(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ls,
    tween: Fs,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: qn
  });
}
function Ye(t, e) {
  var n = Q(t, e);
  if (n.state > qn) throw new Error("too late; already scheduled");
  return n;
}
function rt(t, e) {
  var n = Q(t, e);
  if (n.state > Zt) throw new Error("too late; already running");
  return n;
}
function Q(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Is(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Yn(s, 0, n.time);
  function s(u) {
    n.state = cn, n.timer.restart(o, n.delay, n.time), n.delay <= u && o(u - n.delay);
  }
  function o(u) {
    var l, d, h, m;
    if (n.state !== cn) return c();
    for (l in r)
      if (m = r[l], m.name === n.name) {
        if (m.state === Zt) return un(o);
        m.state === ln ? (m.state = Wt, m.timer.stop(), m.on.call("interrupt", t, t.__data__, m.index, m.group), delete r[l]) : +l < e && (m.state = Wt, m.timer.stop(), m.on.call("cancel", t, t.__data__, m.index, m.group), delete r[l]);
      }
    if (un(function() {
      n.state === Zt && (n.state = ln, n.timer.restart(a, n.delay, n.time), a(u));
    }), n.state = Te, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Te) {
      for (n.state = Zt, i = new Array(h = n.tween.length), l = 0, d = -1; l < h; ++l)
        (m = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++d] = m);
      i.length = d + 1;
    }
  }
  function a(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = Ee, 1), d = -1, h = i.length; ++d < h; )
      i[d].call(t, l);
    n.state === Ee && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = Wt, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function Qt(t, e) {
  var n = t.__transition, r, i, s = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > Te && r.state < Ee, r.state = Wt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function Ps(t) {
  return this.each(function() {
    Qt(this, t);
  });
}
function Bs(t, e) {
  var n, r;
  return function() {
    var i = rt(this, t), s = i.tween;
    if (s !== n) {
      r = n = s;
      for (var o = 0, a = r.length; o < a; ++o)
        if (r[o].name === e) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Ys(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = rt(this, t), o = s.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var a = { name: e, value: n }, c = 0, u = i.length; c < u; ++c)
        if (i[c].name === e) {
          i[c] = a;
          break;
        }
      c === u && i.push(a);
    }
    s.tween = i;
  };
}
function qs(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Q(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Bs : Ys)(n, t, e));
}
function qe(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = rt(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Q(i, r).value[e];
  };
}
function Vn(t, e) {
  var n;
  return (typeof e == "number" ? K : e instanceof gt ? re : (n = gt(e)) ? (e = n, re) : Ln)(t, e);
}
function Vs(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Hs(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Us(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Gs(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Ks(t, e, n) {
  var r, i, s;
  return function() {
    var o, a = n(this), c;
    return a == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), c = a + "", o === c ? null : o === r && c === i ? s : (i = c, s = e(r = o, a)));
  };
}
function Zs(t, e, n) {
  var r, i, s;
  return function() {
    var o, a = n(this), c;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), c = a + "", o === c ? null : o === r && c === i ? s : (i = c, s = e(r = o, a)));
  };
}
function Ws(t, e) {
  var n = le(t), r = n === "transform" ? $s : Vn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Zs : Ks)(n, r, qe(this, "attr." + t, e)) : e == null ? (n.local ? Hs : Vs)(n) : (n.local ? Gs : Us)(n, r, e));
}
function Qs(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Js(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function js(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Js(t, s)), n;
  }
  return i._value = e, i;
}
function to(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Qs(t, s)), n;
  }
  return i._value = e, i;
}
function eo(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = le(t);
  return this.tween(n, (r.local ? js : to)(r, e));
}
function no(t, e) {
  return function() {
    Ye(this, t).delay = +e.apply(this, arguments);
  };
}
function ro(t, e) {
  return e = +e, function() {
    Ye(this, t).delay = e;
  };
}
function io(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? no : ro)(e, t)) : Q(this.node(), e).delay;
}
function so(t, e) {
  return function() {
    rt(this, t).duration = +e.apply(this, arguments);
  };
}
function oo(t, e) {
  return e = +e, function() {
    rt(this, t).duration = e;
  };
}
function ao(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? so : oo)(e, t)) : Q(this.node(), e).duration;
}
function uo(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    rt(this, t).ease = e;
  };
}
function co(t) {
  var e = this._id;
  return arguments.length ? this.each(uo(e, t)) : Q(this.node(), e).ease;
}
function lo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    rt(this, t).ease = n;
  };
}
function ho(t) {
  if (typeof t != "function") throw new Error();
  return this.each(lo(this._id, t));
}
function fo(t) {
  typeof t != "function" && (t = bn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], c, u = 0; u < o; ++u)
      (c = s[u]) && t.call(c, c.__data__, u, s) && a.push(c);
  return new ut(r, this._parents, this._name, this._id);
}
function go(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), a = 0; a < s; ++a)
    for (var c = e[a], u = n[a], l = c.length, d = o[a] = new Array(l), h, m = 0; m < l; ++m)
      (h = c[m] || u[m]) && (d[m] = h);
  for (; a < r; ++a)
    o[a] = e[a];
  return new ut(o, this._parents, this._name, this._id);
}
function mo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function po(t, e, n) {
  var r, i, s = mo(e) ? Ye : rt;
  return function() {
    var o = s(this, t), a = o.on;
    a !== r && (i = (r = a).copy()).on(e, n), o.on = i;
  };
}
function yo(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Q(this.node(), n).on.on(t) : this.each(po(n, t, e));
}
function _o(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function wo() {
  return this.on("end.remove", _o(this._id));
}
function xo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Xe(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = r[o], c = a.length, u = s[o] = new Array(c), l, d, h = 0; h < c; ++h)
      (l = a[h]) && (d = t.call(l, l.__data__, h, a)) && ("__data__" in l && (d.__data__ = l.__data__), u[h] = d, ge(u[h], e, n, h, u, Q(l, n)));
  return new ut(s, this._parents, e, n);
}
function vo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = vn(t));
  for (var r = this._groups, i = r.length, s = [], o = [], a = 0; a < i; ++a)
    for (var c = r[a], u = c.length, l, d = 0; d < u; ++d)
      if (l = c[d]) {
        for (var h = t.call(l, l.__data__, d, c), m, A = Q(l, n), S = 0, E = h.length; S < E; ++S)
          (m = h[S]) && ge(m, e, n, S, h, A);
        s.push(h), o.push(l);
      }
  return new ut(s, o, e, n);
}
var bo = Ft.prototype.constructor;
function Mo() {
  return new bo(this._groups, this._parents);
}
function ko(t, e) {
  var n, r, i;
  return function() {
    var s = Mt(this, t), o = (this.style.removeProperty(t), Mt(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function Hn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ao(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = Mt(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Ro(t, e, n) {
  var r, i, s;
  return function() {
    var o = Mt(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), Mt(this, t))), o === c ? null : o === r && c === i ? s : (i = c, s = e(r = o, a));
  };
}
function No(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, a;
  return function() {
    var c = rt(this, t), u = c.on, l = c.value[s] == null ? a || (a = Hn(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(o, i = l), c.on = r;
  };
}
function $o(t, e, n) {
  var r = (t += "") == "transform" ? Ns : Vn;
  return e == null ? this.styleTween(t, ko(t, r)).on("end.style." + t, Hn(t)) : typeof e == "function" ? this.styleTween(t, Ro(t, r, qe(this, "style." + t, e))).each(No(this._id, t)) : this.styleTween(t, Ao(t, r, e), n).on("end.style." + t, null);
}
function So(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function To(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && So(t, o, n)), r;
  }
  return s._value = e, s;
}
function Eo(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, To(t, e, n ?? ""));
}
function Co(t) {
  return function() {
    this.textContent = t;
  };
}
function zo(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Do(t) {
  return this.tween("text", typeof t == "function" ? zo(qe(this, "text", t)) : Co(t == null ? "" : t + ""));
}
function Xo(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Oo(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Xo(i)), e;
  }
  return r._value = t, r;
}
function Lo(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Oo(t));
}
function Fo() {
  for (var t = this._name, e = this._id, n = Un(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], a = o.length, c, u = 0; u < a; ++u)
      if (c = o[u]) {
        var l = Q(c, e);
        ge(c, t, n, u, o, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new ut(r, this._parents, t, n);
}
function Io() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var a = { value: o }, c = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var u = rt(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(c)), u.on = e;
    }), i === 0 && s();
  });
}
var Po = 0;
function ut(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Un() {
  return ++Po;
}
var at = Ft.prototype;
ut.prototype = {
  constructor: ut,
  select: xo,
  selectAll: vo,
  selectChild: at.selectChild,
  selectChildren: at.selectChildren,
  filter: fo,
  merge: go,
  selection: Mo,
  transition: Fo,
  call: at.call,
  nodes: at.nodes,
  node: at.node,
  size: at.size,
  empty: at.empty,
  each: at.each,
  on: yo,
  attr: Ws,
  attrTween: eo,
  style: $o,
  styleTween: Eo,
  text: Do,
  textTween: Lo,
  remove: wo,
  tween: qs,
  delay: io,
  duration: ao,
  ease: co,
  easeVarying: ho,
  end: Io,
  [Symbol.iterator]: at[Symbol.iterator]
};
function Bo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Yo = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Bo
};
function qo(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Vo(t) {
  var e, n;
  t instanceof ut ? (e = t._id, t = t._name) : (e = Un(), (n = Yo).time = Be(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], a = o.length, c, u = 0; u < a; ++u)
      (c = o[u]) && ge(c, t, e, u, o, n || qo(c, e));
  return new ut(r, this._parents, t, e);
}
Ft.prototype.interrupt = Ps;
Ft.prototype.transition = Vo;
const Vt = (t) => () => t;
function Ho(t, {
  sourceEvent: e,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function et(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
et.prototype = {
  constructor: et,
  scale: function(t) {
    return t === 1 ? this : new et(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new et(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Gn = new et(1, 0, 0);
et.prototype;
function ve(t) {
  t.stopImmediatePropagation();
}
function Nt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Uo(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Go() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function hn() {
  return this.__zoom || Gn;
}
function Ko(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Zo() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Wo(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function Qo() {
  var t = Uo, e = Go, n = Wo, r = Ko, i = Zo, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, c = Cs, u = he("start", "zoom", "end"), l, d, h, m = 500, A = 150, S = 0, E = 10;
  function w(f) {
    f.property("__zoom", hn).on("wheel.zoom", X, { passive: !1 }).on("mousedown.zoom", I).on("dblclick.zoom", P).filter(i).on("touchstart.zoom", b).on("touchmove.zoom", L).on("touchend.zoom touchcancel.zoom", O).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(f, y, g, _) {
    var k = f.selection ? f.selection() : f;
    k.property("__zoom", hn), f !== k ? x(f, y, g, _) : k.interrupt().each(function() {
      N(this, arguments).event(_).start().zoom(null, typeof y == "function" ? y.apply(this, arguments) : y).end();
    });
  }, w.scaleBy = function(f, y, g, _) {
    w.scaleTo(f, function() {
      var k = this.__zoom.k, M = typeof y == "function" ? y.apply(this, arguments) : y;
      return k * M;
    }, g, _);
  }, w.scaleTo = function(f, y, g, _) {
    w.transform(f, function() {
      var k = e.apply(this, arguments), M = this.__zoom, R = g == null ? p(k) : typeof g == "function" ? g.apply(this, arguments) : g, C = M.invert(R), F = typeof y == "function" ? y.apply(this, arguments) : y;
      return n(T(D(M, F), R, C), k, o);
    }, g, _);
  }, w.translateBy = function(f, y, g, _) {
    w.transform(f, function() {
      return n(this.__zoom.translate(
        typeof y == "function" ? y.apply(this, arguments) : y,
        typeof g == "function" ? g.apply(this, arguments) : g
      ), e.apply(this, arguments), o);
    }, null, _);
  }, w.translateTo = function(f, y, g, _, k) {
    w.transform(f, function() {
      var M = e.apply(this, arguments), R = this.__zoom, C = _ == null ? p(M) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(Gn.translate(C[0], C[1]).scale(R.k).translate(
        typeof y == "function" ? -y.apply(this, arguments) : -y,
        typeof g == "function" ? -g.apply(this, arguments) : -g
      ), M, o);
    }, _, k);
  };
  function D(f, y) {
    return y = Math.max(s[0], Math.min(s[1], y)), y === f.k ? f : new et(y, f.x, f.y);
  }
  function T(f, y, g) {
    var _ = y[0] - g[0] * f.k, k = y[1] - g[1] * f.k;
    return _ === f.x && k === f.y ? f : new et(f.k, _, k);
  }
  function p(f) {
    return [(+f[0][0] + +f[1][0]) / 2, (+f[0][1] + +f[1][1]) / 2];
  }
  function x(f, y, g, _) {
    f.on("start.zoom", function() {
      N(this, arguments).event(_).start();
    }).on("interrupt.zoom end.zoom", function() {
      N(this, arguments).event(_).end();
    }).tween("zoom", function() {
      var k = this, M = arguments, R = N(k, M).event(_), C = e.apply(k, M), F = g == null ? p(C) : typeof g == "function" ? g.apply(k, M) : g, J = Math.max(C[1][0] - C[0][0], C[1][1] - C[0][1]), B = k.__zoom, H = typeof y == "function" ? y.apply(k, M) : y, it = c(B.invert(F).concat(J / B.k), H.invert(F).concat(J / H.k));
      return function(U) {
        if (U === 1) U = H;
        else {
          var st = it(U), me = J / st[2];
          U = new et(me, F[0] - st[0] * me, F[1] - st[1] * me);
        }
        R.zoom(null, U);
      };
    });
  }
  function N(f, y, g) {
    return !g && f.__zooming || new $(f, y);
  }
  function $(f, y) {
    this.that = f, this.args = y, this.active = 0, this.sourceEvent = null, this.extent = e.apply(f, y), this.taps = 0;
  }
  $.prototype = {
    event: function(f) {
      return f && (this.sourceEvent = f), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(f, y) {
      return this.mouse && f !== "mouse" && (this.mouse[1] = y.invert(this.mouse[0])), this.touch0 && f !== "touch" && (this.touch0[1] = y.invert(this.touch0[0])), this.touch1 && f !== "touch" && (this.touch1[1] = y.invert(this.touch1[0])), this.that.__zoom = y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(f) {
      var y = Z(this.that).datum();
      u.call(
        f,
        this.that,
        new Ho(f, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: u
        }),
        y
      );
    }
  };
  function X(f, ...y) {
    if (!t.apply(this, arguments)) return;
    var g = N(this, y).event(f), _ = this.__zoom, k = Math.max(s[0], Math.min(s[1], _.k * Math.pow(2, r.apply(this, arguments)))), M = G(f);
    if (g.wheel)
      (g.mouse[0][0] !== M[0] || g.mouse[0][1] !== M[1]) && (g.mouse[1] = _.invert(g.mouse[0] = M)), clearTimeout(g.wheel);
    else {
      if (_.k === k) return;
      g.mouse = [M, _.invert(M)], Qt(this), g.start();
    }
    Nt(f), g.wheel = setTimeout(R, A), g.zoom("mouse", n(T(D(_, k), g.mouse[0], g.mouse[1]), g.extent, o));
    function R() {
      g.wheel = null, g.end();
    }
  }
  function I(f, ...y) {
    if (h || !t.apply(this, arguments)) return;
    var g = f.currentTarget, _ = N(this, y, !0).event(f), k = Z(f.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", J, !0), M = G(f, g), R = f.clientX, C = f.clientY;
    Cn(f.view), ve(f), _.mouse = [M, this.__zoom.invert(M)], Qt(this), _.start();
    function F(B) {
      if (Nt(B), !_.moved) {
        var H = B.clientX - R, it = B.clientY - C;
        _.moved = H * H + it * it > S;
      }
      _.event(B).zoom("mouse", n(T(_.that.__zoom, _.mouse[0] = G(B, g), _.mouse[1]), _.extent, o));
    }
    function J(B) {
      k.on("mousemove.zoom mouseup.zoom", null), zn(B.view, _.moved), Nt(B), _.event(B).end();
    }
  }
  function P(f, ...y) {
    if (t.apply(this, arguments)) {
      var g = this.__zoom, _ = G(f.changedTouches ? f.changedTouches[0] : f, this), k = g.invert(_), M = g.k * (f.shiftKey ? 0.5 : 2), R = n(T(D(g, M), _, k), e.apply(this, y), o);
      Nt(f), a > 0 ? Z(this).transition().duration(a).call(x, R, _, f) : Z(this).call(w.transform, R, _, f);
    }
  }
  function b(f, ...y) {
    if (t.apply(this, arguments)) {
      var g = f.touches, _ = g.length, k = N(this, y, f.changedTouches.length === _).event(f), M, R, C, F;
      for (ve(f), R = 0; R < _; ++R)
        C = g[R], F = G(C, this), F = [F, this.__zoom.invert(F), C.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== F[2] && (k.touch1 = F, k.taps = 0) : (k.touch0 = F, M = !0, k.taps = 1 + !!l);
      l && (l = clearTimeout(l)), M && (k.taps < 2 && (d = F[0], l = setTimeout(function() {
        l = null;
      }, m)), Qt(this), k.start());
    }
  }
  function L(f, ...y) {
    if (this.__zooming) {
      var g = N(this, y).event(f), _ = f.changedTouches, k = _.length, M, R, C, F;
      for (Nt(f), M = 0; M < k; ++M)
        R = _[M], C = G(R, this), g.touch0 && g.touch0[2] === R.identifier ? g.touch0[0] = C : g.touch1 && g.touch1[2] === R.identifier && (g.touch1[0] = C);
      if (R = g.that.__zoom, g.touch1) {
        var J = g.touch0[0], B = g.touch0[1], H = g.touch1[0], it = g.touch1[1], U = (U = H[0] - J[0]) * U + (U = H[1] - J[1]) * U, st = (st = it[0] - B[0]) * st + (st = it[1] - B[1]) * st;
        R = D(R, Math.sqrt(U / st)), C = [(J[0] + H[0]) / 2, (J[1] + H[1]) / 2], F = [(B[0] + it[0]) / 2, (B[1] + it[1]) / 2];
      } else if (g.touch0) C = g.touch0[0], F = g.touch0[1];
      else return;
      g.zoom("touch", n(T(R, C, F), g.extent, o));
    }
  }
  function O(f, ...y) {
    if (this.__zooming) {
      var g = N(this, y).event(f), _ = f.changedTouches, k = _.length, M, R;
      for (ve(f), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, m), M = 0; M < k; ++M)
        R = _[M], g.touch0 && g.touch0[2] === R.identifier ? delete g.touch0 : g.touch1 && g.touch1[2] === R.identifier && delete g.touch1;
      if (g.touch1 && !g.touch0 && (g.touch0 = g.touch1, delete g.touch1), g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else if (g.end(), g.taps === 2 && (R = G(R, this), Math.hypot(d[0] - R[0], d[1] - R[1]) < E)) {
        var C = Z(this).on("dblclick.zoom");
        C && C.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(f) {
    return arguments.length ? (r = typeof f == "function" ? f : Vt(+f), w) : r;
  }, w.filter = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : Vt(!!f), w) : t;
  }, w.touchable = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : Vt(!!f), w) : i;
  }, w.extent = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : Vt([[+f[0][0], +f[0][1]], [+f[1][0], +f[1][1]]]), w) : e;
  }, w.scaleExtent = function(f) {
    return arguments.length ? (s[0] = +f[0], s[1] = +f[1], w) : [s[0], s[1]];
  }, w.translateExtent = function(f) {
    return arguments.length ? (o[0][0] = +f[0][0], o[1][0] = +f[1][0], o[0][1] = +f[0][1], o[1][1] = +f[1][1], w) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, w.constrain = function(f) {
    return arguments.length ? (n = f, w) : n;
  }, w.duration = function(f) {
    return arguments.length ? (a = +f, w) : a;
  }, w.interpolate = function(f) {
    return arguments.length ? (c = f, w) : c;
  }, w.on = function() {
    var f = u.on.apply(u, arguments);
    return f === u ? w : f;
  }, w.clickDistance = function(f) {
    return arguments.length ? (S = (f = +f) * f, w) : Math.sqrt(S);
  }, w.tapDistance = function(f) {
    return arguments.length ? (E = +f, w) : E;
  }, w;
}
function Jt(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Jo(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Kn(t) {
  let e, n, r;
  t.length !== 2 ? (e = Jt, n = (a, c) => Jt(t(a), c), r = (a, c) => t(a) - c) : (e = t === Jt || t === Jo ? t : jo, n = t, r = t);
  function i(a, c, u = 0, l = a.length) {
    if (u < l) {
      if (e(c, c) !== 0) return l;
      do {
        const d = u + l >>> 1;
        n(a[d], c) < 0 ? u = d + 1 : l = d;
      } while (u < l);
    }
    return u;
  }
  function s(a, c, u = 0, l = a.length) {
    if (u < l) {
      if (e(c, c) !== 0) return l;
      do {
        const d = u + l >>> 1;
        n(a[d], c) <= 0 ? u = d + 1 : l = d;
      } while (u < l);
    }
    return u;
  }
  function o(a, c, u = 0, l = a.length) {
    const d = i(a, c, u, l - 1);
    return d > u && r(a[d - 1], c) > -r(a[d], c) ? d - 1 : d;
  }
  return { left: i, center: o, right: s };
}
function jo() {
  return 0;
}
function ta(t) {
  return t === null ? NaN : +t;
}
const ea = Kn(Jt), na = ea.right;
Kn(ta).center;
const ra = Math.sqrt(50), ia = Math.sqrt(10), sa = Math.sqrt(2);
function ae(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), s = r / Math.pow(10, i), o = s >= ra ? 10 : s >= ia ? 5 : s >= sa ? 2 : 1;
  let a, c, u;
  return i < 0 ? (u = Math.pow(10, -i) / o, a = Math.round(t * u), c = Math.round(e * u), a / u < t && ++a, c / u > e && --c, u = -u) : (u = Math.pow(10, i) * o, a = Math.round(t / u), c = Math.round(e / u), a * u < t && ++a, c * u > e && --c), c < a && 0.5 <= n && n < 2 ? ae(t, e, n * 2) : [a, c, u];
}
function oa(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, s, o] = r ? ae(e, t, n) : ae(t, e, n);
  if (!(s >= i)) return [];
  const a = s - i + 1, c = new Array(a);
  if (r)
    if (o < 0) for (let u = 0; u < a; ++u) c[u] = (s - u) / -o;
    else for (let u = 0; u < a; ++u) c[u] = (s - u) * o;
  else if (o < 0) for (let u = 0; u < a; ++u) c[u] = (i + u) / -o;
  else for (let u = 0; u < a; ++u) c[u] = (i + u) * o;
  return c;
}
function Ce(t, e, n) {
  return e = +e, t = +t, n = +n, ae(t, e, n)[2];
}
function aa(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? Ce(e, t, n) : Ce(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function ua(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
function ca(t) {
  return function() {
    return t;
  };
}
function la(t) {
  return +t;
}
var fn = [0, 1];
function yt(t) {
  return t;
}
function ze(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : ca(isNaN(e) ? NaN : 0.5);
}
function ha(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function fa(t, e, n) {
  var r = t[0], i = t[1], s = e[0], o = e[1];
  return i < r ? (r = ze(i, r), s = n(o, s)) : (r = ze(r, i), s = n(s, o)), function(a) {
    return s(r(a));
  };
}
function da(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), s = new Array(r), o = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++o < r; )
    i[o] = ze(t[o], t[o + 1]), s[o] = n(e[o], e[o + 1]);
  return function(a) {
    var c = na(t, a, 1, r) - 1;
    return s[c](i[c](a));
  };
}
function ga(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function ma() {
  var t = fn, e = fn, n = Pe, r, i, s, o = yt, a, c, u;
  function l() {
    var h = Math.min(t.length, e.length);
    return o !== yt && (o = ha(t[0], t[h - 1])), a = h > 2 ? da : fa, c = u = null, d;
  }
  function d(h) {
    return h == null || isNaN(h = +h) ? s : (c || (c = a(t.map(r), e, n)))(r(o(h)));
  }
  return d.invert = function(h) {
    return o(i((u || (u = a(e, t.map(r), K)))(h)));
  }, d.domain = function(h) {
    return arguments.length ? (t = Array.from(h, la), l()) : t.slice();
  }, d.range = function(h) {
    return arguments.length ? (e = Array.from(h), l()) : e.slice();
  }, d.rangeRound = function(h) {
    return e = Array.from(h), n = ks, l();
  }, d.clamp = function(h) {
    return arguments.length ? (o = h ? !0 : yt, l()) : o !== yt;
  }, d.interpolate = function(h) {
    return arguments.length ? (n = h, l()) : n;
  }, d.unknown = function(h) {
    return arguments.length ? (s = h, d) : s;
  }, function(h, m) {
    return r = h, i = m, l();
  };
}
function pa() {
  return ma()(yt, yt);
}
function ya(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function ue(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function At(t) {
  return t = ue(Math.abs(t)), t ? t[1] : NaN;
}
function _a(t, e) {
  return function(n, r) {
    for (var i = n.length, s = [], o = 0, a = t[0], c = 0; i > 0 && a > 0 && (c + a + 1 > r && (a = Math.max(1, r - c)), s.push(n.substring(i -= a, i + a)), !((c += a + 1) > r)); )
      a = t[o = (o + 1) % t.length];
    return s.reverse().join(e);
  };
}
function wa(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var xa = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ce(t) {
  if (!(e = xa.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Ve({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
ce.prototype = Ve.prototype;
function Ve(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Ve.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function va(t) {
  t: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
    switch (t[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), i = n;
        break;
      default:
        if (!+t[n]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var Zn;
function ba(t, e) {
  var n = ue(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], s = i - (Zn = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
  return s === o ? r : s > o ? r + new Array(s - o + 1).join("0") : s > 0 ? r.slice(0, s) + "." + r.slice(s) : "0." + new Array(1 - s).join("0") + ue(t, Math.max(0, e + s - 1))[0];
}
function dn(t, e) {
  var n = ue(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const gn = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: ya,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => dn(t * 100, e),
  r: dn,
  s: ba,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function mn(t) {
  return t;
}
var pn = Array.prototype.map, yn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Ma(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? mn : _a(pn.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", s = t.numerals === void 0 ? mn : wa(pn.call(t.numerals, String)), o = t.percent === void 0 ? "%" : t.percent + "", a = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function u(d) {
    d = ce(d);
    var h = d.fill, m = d.align, A = d.sign, S = d.symbol, E = d.zero, w = d.width, D = d.comma, T = d.precision, p = d.trim, x = d.type;
    x === "n" ? (D = !0, x = "g") : gn[x] || (T === void 0 && (T = 12), p = !0, x = "g"), (E || h === "0" && m === "=") && (E = !0, h = "0", m = "=");
    var N = S === "$" ? n : S === "#" && /[boxX]/.test(x) ? "0" + x.toLowerCase() : "", $ = S === "$" ? r : /[%p]/.test(x) ? o : "", X = gn[x], I = /[defgprs%]/.test(x);
    T = T === void 0 ? 6 : /[gprs]/.test(x) ? Math.max(1, Math.min(21, T)) : Math.max(0, Math.min(20, T));
    function P(b) {
      var L = N, O = $, f, y, g;
      if (x === "c")
        O = X(b) + O, b = "";
      else {
        b = +b;
        var _ = b < 0 || 1 / b < 0;
        if (b = isNaN(b) ? c : X(Math.abs(b), T), p && (b = va(b)), _ && +b == 0 && A !== "+" && (_ = !1), L = (_ ? A === "(" ? A : a : A === "-" || A === "(" ? "" : A) + L, O = (x === "s" ? yn[8 + Zn / 3] : "") + O + (_ && A === "(" ? ")" : ""), I) {
          for (f = -1, y = b.length; ++f < y; )
            if (g = b.charCodeAt(f), 48 > g || g > 57) {
              O = (g === 46 ? i + b.slice(f + 1) : b.slice(f)) + O, b = b.slice(0, f);
              break;
            }
        }
      }
      D && !E && (b = e(b, 1 / 0));
      var k = L.length + b.length + O.length, M = k < w ? new Array(w - k + 1).join(h) : "";
      switch (D && E && (b = e(M + b, M.length ? w - O.length : 1 / 0), M = ""), m) {
        case "<":
          b = L + b + O + M;
          break;
        case "=":
          b = L + M + b + O;
          break;
        case "^":
          b = M.slice(0, k = M.length >> 1) + L + b + O + M.slice(k);
          break;
        default:
          b = M + L + b + O;
          break;
      }
      return s(b);
    }
    return P.toString = function() {
      return d + "";
    }, P;
  }
  function l(d, h) {
    var m = u((d = ce(d), d.type = "f", d)), A = Math.max(-8, Math.min(8, Math.floor(At(h) / 3))) * 3, S = Math.pow(10, -A), E = yn[8 + A / 3];
    return function(w) {
      return m(S * w) + E;
    };
  }
  return {
    format: u,
    formatPrefix: l
  };
}
var Ht, Wn, Qn;
ka({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function ka(t) {
  return Ht = Ma(t), Wn = Ht.format, Qn = Ht.formatPrefix, Ht;
}
function Aa(t) {
  return Math.max(0, -At(Math.abs(t)));
}
function Ra(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(At(e) / 3))) * 3 - At(Math.abs(t)));
}
function Na(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, At(e) - At(t)) + 1;
}
function $a(t, e, n, r) {
  var i = aa(t, e, n), s;
  switch (r = ce(r ?? ",f"), r.type) {
    case "s": {
      var o = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(s = Ra(i, o)) && (r.precision = s), Qn(r, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(s = Na(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = s - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(s = Aa(i)) && (r.precision = s - (r.type === "%") * 2);
      break;
    }
  }
  return Wn(r);
}
function Sa(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return oa(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return $a(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, s = r.length - 1, o = r[i], a = r[s], c, u, l = 10;
    for (a < o && (u = o, o = a, a = u, u = i, i = s, s = u); l-- > 0; ) {
      if (u = Ce(o, a, n), u === c)
        return r[i] = o, r[s] = a, e(r);
      if (u > 0)
        o = Math.floor(o / u) * u, a = Math.ceil(a / u) * u;
      else if (u < 0)
        o = Math.ceil(o * u) / u, a = Math.floor(a * u) / u;
      else
        break;
      c = u;
    }
    return t;
  }, t;
}
function Jn() {
  var t = pa();
  return t.copy = function() {
    return ga(t, Jn());
  }, ua.apply(t, arguments), Sa(t);
}
class z {
}
v(z, "ZoomTransform", et), v(z, "create", Di), v(z, "select", Z), v(z, "selectAll", Oi), v(z, "pointer", G), v(z, "pointers", Xi), v(z, "drag", Hi), v(z, "zoom", Qo), v(z, "scaleLinear", Jn), v(z, "axisTop", Ji), v(z, "axisBottom", ts), v(z, "axisRight", ji), v(z, "axisLeft", es);
class Ta {
  constructor() {
    v(this, "container", z.create("div").style("position", "fixed").style("background", "#333").style("color", "#FFF").style("padding", "3px 5px").style("border-radius", "4px").style("pointer-events", "none").style("font-size", "12px").style("display", "none"));
  }
  mount() {
    return document.body.append(this.container.node()), this;
  }
  unmount() {
    this.container.remove();
  }
  show() {
    return this.container.style("display", "block"), this;
  }
  hidden() {
    return this.container.style("display", "none"), this;
  }
  html(e) {
    return this.container.html(e), this;
  }
  fixed(e, n) {
    return this.container.style("top", tt(n)).style("left", tt(e)), this;
  }
}
function Ea() {
  return this.svg.selectAll("text").nodes().map((t) => {
    if (!t) return 0;
    const e = t.textContent.replace(/,/g, "").replace(/−/g, "-");
    return Number(e) || 0;
  });
}
function Ca() {
  const t = this.getMainTicks(), e = this.svg.selectAll(".tick").nodes().map((i) => {
    const s = i.getAttribute("transform"), o = this.__isX ? s.match(/translate\(([^,]+),/) : s.match(/translate\(0,([^,]+)/);
    return parseFloat(o[1]) || 0;
  }), n = (i) => {
    const s = [];
    let o = e[0], a = e[e.length - 1];
    const c = Math.abs(a - o) / (i * (e.length - 1));
    for (; o - c > 0; ) o -= c;
    for (; a + c < this.width; ) a += c;
    for (let u = o; u <= a; u += c) s.push(u);
    return s;
  }, r = Math.abs(t[0] - t[1]);
  return r >= 10 ? n(10) : r === 5 ? n(5) : r > 1 && r < 5 ? n(2) : n(1);
}
function za(t) {
  this.lines.add(Math.round(this.scaleLinear.invert(t))), this.lineRender();
}
function Da(t) {
  this.lines.delete(t), this.lineRender();
}
function Xa(t, e, n) {
  const r = this.__isX ? e : n, i = Math.max(this.width, this.height), s = 0, o = (this.lower - r) / t, a = (this.upper - r) / t;
  this.scaleLinear = z.scaleLinear([o, a], [s, i]), this.axis.scale(this.scaleLinear), this.svg.call(this.axis);
  const c = this.getSecondaryTicks();
  this.svg.selectAll(".ruler-secondary-tick").remove(), this.svg.append("svg:g").lower().classed("ruler-secondary-tick", !0).selectAll("line").data(c).join("svg:line").attr("x1", (u) => this.__isX ? u : 0).attr("y1", (u) => this.__isX ? 0 : u).attr("x2", (u) => this.__isX ? u : 5).attr("y2", (u) => this.__isX ? 5 : u).attr("stroke", "#5EA090").attr("stroke-width", "1").style("pointer-events", "none"), this.svg.selectAll(".tick").style("pointer-events", "none"), this.svg.selectAll(".tick text").attr("text-anchor", "start").attr("transform", this.__isX ? "translate(4,-6)" : "rotate(90) translate(-10, -12)"), this.lineRender(), this.svg.select(".domain").raise();
}
function Oa() {
  const t = z.drag().on("start", (n) => {
    this.__draggingLine = z.select(n.sourceEvent.target), document.body.style.cursor = "col-resize";
  }).on("drag", (n) => {
    if (!this.__draggingLine) return;
    const [r, i] = z.pointer(n, this.svg), s = Math.round(this.scaleLinear.invert(this.__isX ? r : i));
    this.lines.delete(this.__draggingLine.datum()), console.log(this.__draggingLine.node()), this.__draggingLine.style(this.__isX ? "left" : "top", `${this.scaleLinear(s) - 0.4}px`).datum(s), this.lines.add(this.__draggingLine.datum()), this.tooltip.show().fixed(r + 8, i + 8).html(
      `${((this.scaleLinear(this.__draggingLine.datum()) - this.scaleLinear(0)) * 100 / this.observer.boardDOMRect.width).toFixed(2)}%`
    );
  }).on("end", () => {
    this.__draggingLine = null, document.body.style.cursor = "default", this.tooltip.hidden();
  }), e = z.select(this.observer.root);
  e.selectAll(`.ruler-line-${this.type}`).remove(), e.selectAll(`div[class=ruler-line-${this.type}]`).data(Array.from(this.lines)).join("div").classed(`ruler-line-${this.type}`, !0).style("position", "absolute").style("width", this.__isX ? "7px" : "auto").style("height", this.__isX ? "auto" : "7px").style("display", "flex").style("justify-content", "center").style("flex-direction", this.__isX ? "row" : "column").style("left", (n) => this.__isX ? `${this.scaleLinear(n) - 0.4}px` : "20px").style("top", (n) => this.__isX ? "20px" : `${this.scaleLinear(n) - 0.4}px`).style("transform", this.__isX ? "translate(-50%, 0)" : "translate(0, -50%)").style("cursor", this.__isX ? "col-resize" : "row-resize").call(t).append("div").style("width", this.__isX ? "1px" : `${this.observer.rootDOMRect.width}px`).style("height", this.__isX ? `${this.observer.rootDOMRect.height}px` : "1px").style("background", "red").style("pointer-events", "none");
}
function _n() {
  this.observer.root.append(this.svg.node());
}
class wn {
  constructor(e, n) {
    v(this, "type");
    v(this, "svg");
    v(this, "width");
    v(this, "height");
    v(this, "lower");
    v(this, "upper");
    v(this, "scaleLinear");
    v(this, "axis");
    v(this, "lines", /* @__PURE__ */ new Set());
    v(this, "tooltip", new Ta());
    v(this, "__draggingLine", null);
    v(this, "observer");
    v(this, "getMainTicks", Ea);
    v(this, "getSecondaryTicks", Ca);
    v(this, "lineAdd", za);
    v(this, "lineRemove", Da);
    v(this, "lineRender", Oa);
    v(this, "applyTransform", Xa);
    v(this, "mount", _n);
    v(this, "unmount", _n);
    this.observer = n;
    const r = n.boardCoord, i = Math.max(this.observer.rootDOMRect.width, this.observer.rootDOMRect.height), s = 0;
    this.type = e, this.width = this.__isX ? i : 20, this.height = this.__isX ? 20 : i, this.lower = -r[e], this.upper = i - r[e], this.scaleLinear = z.scaleLinear([this.lower, this.upper], [s, i]), this.axis = (this.__isX ? z.axisBottom(this.scaleLinear) : z.axisRight(this.scaleLinear)).ticks(20).tickSize(10).tickPadding(4), this.svg = z.create("svg:svg").attr("viewbox", [0, 0, this.width, this.height]).attr("width", this.width).attr("height", this.height).style("background", "#DCDCAF").style("position", "fixed").style("left", 0).style("top", 0).call(this.axis), this.tooltip.mount().hidden(), this.svg.on("mousemove", (o) => {
      const [a, c] = z.pointer(o, this.svg);
      z.select(o.target).classed(`${pt}-ruler-line`) && this.tooltip.show().fixed(this.__isX ? a + 4 : 24, this.__isX ? 24 : c + 4).html(
        `${(this.__isX ? Math.round(this.scaleLinear.invert(a)) * 100 / this.observer.boardDOMRect.width : Math.round(this.scaleLinear.invert(c)) * 100 / this.observer.boardDOMRect.height).toFixed(2)}%`
      );
    }).on("mouseout", () => {
      this.tooltip.hidden();
    }).on("click", (o) => {
      const [a, c] = z.pointer(o, this.svg);
      this.lineAdd(this.__isX ? a : c);
    });
  }
  get __isX() {
    return this.type === "x";
  }
}
class La {
  constructor(e) {
    v(this, "x");
    v(this, "y");
    this.x = new wn("x", e), this.y = new wn("y", e), this.x.mount(), this.y.mount(), this.x.applyTransform(1, 0, 0), this.y.applyTransform(1, 0, 0);
  }
}
var bt;
class Fa {
  constructor(e, n) {
    v(this, "root");
    v(this, "rootDOMRect");
    v(this, "board");
    v(this, "boardDOMRect");
    v(this, "svg");
    v(this, "svgDOMRect");
    v(this, "nodeRects");
    ct(this, bt);
    v(this, "scaleExtent", [0.4, 50]);
    v(this, "scale", 1);
    v(this, "translateX", 0);
    v(this, "translateY", 0);
    this.svg = nr("svg"), this.svgDOMRect = this.svg.getBoundingClientRect(), this.root = e, this.root.style.position = "relative", this.rootDOMRect = this.root.getBoundingClientRect(), this.board = n, this.boardDOMRect = this.board.getBoundingClientRect(), this.root.style.overflow = "hidden", this.svg.style.transformOrigin = "0 0", this.board.style.transformOrigin = "0 0", Array.from(n.getElementsByTagName("div")).forEach((s) => {
      s.className += ` ${pt}-node`, s.setAttribute("data-id", Ue(10)), /%$/.test(s.style.top) && (s.style.top = tt(this.boardDOMRect.width * parseFloat(s.style.top) / 100)), /%$/.test(s.style.left) && (s.style.left = tt(this.boardDOMRect.height * parseFloat(s.style.left) / 100)), /%$/.test(s.style.width) && (s.style.width = tt(this.boardDOMRect.width * parseFloat(s.style.width) / 100)), /%$/.test(s.style.height) && (s.style.height = tt(this.boardDOMRect.height * parseFloat(s.style.height) / 100));
    }), this.nodeRects = jt.from(this.board), V(this, bt, this.nodeRects), e.classList.add(j.Container), n.classList.add(j.Board, j.Container), n.style.left = tt(Math.round((this.rootDOMRect.width - this.boardDOMRect.width) / 2)), n.style.top = tt(Math.round((this.rootDOMRect.height - this.boardDOMRect.height) / 2)), n.setAttribute("data-id", Ue(10)), this.syncBoardDOMRect(), this.syncSvgDOMRect();
    const i = new La(e, n);
    this.root.addEventListener("wheel", (s) => {
      s.preventDefault();
      const [o, a] = this.scaleExtent;
      if (s.ctrlKey) {
        const c = this.boardDOMRect, u = s.clientX - c.left, l = s.clientY - c.top, d = s.deltaY * -0.01;
        let h = this.scale * (1 + d);
        h = Math.max(o, Math.min(a, h)), console.log(h), this.translateX -= (u / this.scale - u / h) * h, this.translateY -= (l / this.scale - l / h) * h, this.scale = h, this.applyTransform(), i.x.applyTransform(this.scale, this.translateX, this.translateY), i.y.applyTransform(this.scale, this.translateX, this.translateY);
      } else
        this.translateX -= s.deltaX, this.translateY -= s.deltaY, this.applyTransform(), i.x.applyTransform(this.scale, this.translateX, this.translateY), i.y.applyTransform(this.scale, this.translateX, this.translateY);
    });
  }
  get boardCoord() {
    return {
      x: Math.round(this.boardDOMRect.x - this.rootDOMRect.x),
      y: Math.round(this.boardDOMRect.y - this.rootDOMRect.y)
    };
  }
  syncRootDOMRect() {
    this.rootDOMRect = this.root.getBoundingClientRect();
  }
  syncSvgDOMRect() {
    this.svgDOMRect = this.svg.getBoundingClientRect();
  }
  syncBoardDOMRect() {
    this.boardDOMRect = this.board.getBoundingClientRect();
  }
  syncNodeRects() {
    this.nodeRects = jt.from(this.board);
  }
  get selectedRect() {
    return ot(this, bt);
  }
  set selectedRect(e) {
    V(this, bt, e), this.searchError();
  }
  searchError() {
    var n;
    if (!this.selectedRect) return;
    const e = (n = this.selectedRect.parent) == null ? void 0 : n.children;
    if (e) {
      this.selectedRect.error = !1;
      for (let r = 0; r < e.length; r++) {
        const i = e[r];
        if (i.id === this.selectedRect.id) continue;
        this.selectedRect.isIntersect(i) ? (this.selectedRect.error = !0, i.error = !0) : i.error = !1;
      }
    }
  }
  applyTransform() {
    this.board.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`, this.svg.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`, this.syncBoardDOMRect(), this.syncRootDOMRect(), this.syncSvgDOMRect();
  }
}
bt = new WeakMap();
class Pa {
  constructor(e, n) {
    v(this, "store");
    this.store = new Fa(e, n), console.log(this.store);
  }
  mount() {
    this.store.board.append(this.store.svg);
  }
  unmount() {
    this.store.svg.remove();
  }
}
export {
  Pa as default
};
