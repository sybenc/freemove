var ur = Object.defineProperty;
var Ve = (t) => {
  throw TypeError(t);
};
var cr = (t, e, n) => e in t ? ur(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var m = (t, e, n) => cr(t, typeof e != "symbol" ? e + "" : e, n), He = (t, e, n) => e.has(t) || Ve("Cannot " + n);
var ct = (t, e, n) => (He(t, e, "read from private field"), n ? n.call(t) : e.get(t)), lt = (t, e, n) => e.has(t) ? Ve("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), U = (t, e, n, r) => (He(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n);
var we = "http://www.w3.org/1999/xhtml";
const Ue = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: we,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function le(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ue.hasOwnProperty(e) ? { space: Ue[e], local: t } : t;
}
function lr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === we && e.documentElement.namespaceURI === we ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function hr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ce(t) {
  var e = le(t);
  return (e.local ? hr : lr)(e);
}
function fr() {
}
function Xe(t) {
  return t == null ? fr : function() {
    return this.querySelector(t);
  };
}
function dr(t) {
  typeof t != "function" && (t = Xe(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = new Array(o), c, u, l = 0; l < o; ++l)
      (c = s[l]) && (u = t.call(c, c.__data__, l, s)) && ("__data__" in c && (u.__data__ = c.__data__), a[l] = u);
  return new q(r, this._parents);
}
function bn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function mr() {
  return [];
}
function Mn(t) {
  return t == null ? mr : function() {
    return this.querySelectorAll(t);
  };
}
function gr(t) {
  return function() {
    return bn(t.apply(this, arguments));
  };
}
function pr(t) {
  typeof t == "function" ? t = gr(t) : t = Mn(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], a = o.length, c, u = 0; u < a; ++u)
      (c = o[u]) && (r.push(t.call(c, c.__data__, u, o)), i.push(c));
  return new q(r, i);
}
function kn(t) {
  return function() {
    return this.matches(t);
  };
}
function An(t) {
  return function(e) {
    return e.matches(t);
  };
}
var yr = Array.prototype.find;
function _r(t) {
  return function() {
    return yr.call(this.children, t);
  };
}
function xr() {
  return this.firstElementChild;
}
function wr(t) {
  return this.select(t == null ? xr : _r(typeof t == "function" ? t : An(t)));
}
var vr = Array.prototype.filter;
function br() {
  return Array.from(this.children);
}
function Mr(t) {
  return function() {
    return vr.call(this.children, t);
  };
}
function kr(t) {
  return this.selectAll(t == null ? br : Mr(typeof t == "function" ? t : An(t)));
}
function Ar(t) {
  typeof t != "function" && (t = kn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], c, u = 0; u < o; ++u)
      (c = s[u]) && t.call(c, c.__data__, u, s) && a.push(c);
  return new q(r, this._parents);
}
function Sn(t) {
  return new Array(t.length);
}
function Sr() {
  return new q(this._enter || this._groups.map(Sn), this._parents);
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
function Rr(t) {
  return function() {
    return t;
  };
}
function Nr(t, e, n, r, i, s) {
  for (var o = 0, a, c = e.length, u = s.length; o < u; ++o)
    (a = e[o]) ? (a.__data__ = s[o], r[o] = a) : n[o] = new te(t, s[o]);
  for (; o < c; ++o)
    (a = e[o]) && (i[o] = a);
}
function $r(t, e, n, r, i, s, o) {
  var a, c, u = /* @__PURE__ */ new Map(), l = e.length, d = s.length, f = new Array(l), g;
  for (a = 0; a < l; ++a)
    (c = e[a]) && (f[a] = g = o.call(c, c.__data__, a, e) + "", u.has(g) ? i[a] = c : u.set(g, c));
  for (a = 0; a < d; ++a)
    g = o.call(t, s[a], a, s) + "", (c = u.get(g)) ? (r[a] = c, c.__data__ = s[a], u.delete(g)) : n[a] = new te(t, s[a]);
  for (a = 0; a < l; ++a)
    (c = e[a]) && u.get(f[a]) === c && (i[a] = c);
}
function Tr(t) {
  return t.__data__;
}
function Er(t, e) {
  if (!arguments.length) return Array.from(this, Tr);
  var n = e ? $r : Nr, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Rr(t));
  for (var s = i.length, o = new Array(s), a = new Array(s), c = new Array(s), u = 0; u < s; ++u) {
    var l = r[u], d = i[u], f = d.length, g = Cr(t.call(l, l && l.__data__, u, r)), A = g.length, $ = a[u] = new Array(A), E = o[u] = new Array(A), w = c[u] = new Array(f);
    n(l, d, $, E, w, g, e);
    for (var X = 0, T = 0, y, v; X < A; ++X)
      if (y = $[X]) {
        for (X >= T && (T = X + 1); !(v = E[T]) && ++T < A; ) ;
        y._next = v || null;
      }
  }
  return o = new q(o, r), o._enter = a, o._exit = c, o;
}
function Cr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Xr() {
  return new q(this._exit || this._groups.map(Sn), this._parents);
}
function zr(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Dr(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), a = new Array(i), c = 0; c < o; ++c)
    for (var u = n[c], l = r[c], d = u.length, f = a[c] = new Array(d), g, A = 0; A < d; ++A)
      (g = u[A] || l[A]) && (f[A] = g);
  for (; c < i; ++c)
    a[c] = n[c];
  return new q(a, this._parents);
}
function Lr() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function Ir(t) {
  t || (t = Fr);
  function e(d, f) {
    return d && f ? t(d.__data__, f.__data__) : !d - !f;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], a = o.length, c = i[s] = new Array(a), u, l = 0; l < a; ++l)
      (u = o[l]) && (c[l] = u);
    c.sort(e);
  }
  return new q(i, this._parents).order();
}
function Fr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Or() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Pr() {
  return Array.from(this);
}
function Br() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function Yr() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function qr() {
  return !this.node();
}
function Vr(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, a; s < o; ++s)
      (a = i[s]) && t.call(a, a.__data__, s, i);
  return this;
}
function Hr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ur(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Gr(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Kr(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Zr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Wr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Qr(t, e) {
  var n = le(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ur : Hr : typeof e == "function" ? n.local ? Wr : Zr : n.local ? Kr : Gr)(n, e));
}
function Rn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Jr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function jr(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function ti(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function ei(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Jr : typeof e == "function" ? ti : jr)(t, e, n ?? "")) : kt(this.node(), t);
}
function kt(t, e) {
  return t.style.getPropertyValue(e) || Rn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ni(t) {
  return function() {
    delete this[t];
  };
}
function ri(t, e) {
  return function() {
    this[t] = e;
  };
}
function ii(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function oi(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ni : typeof e == "function" ? ii : ri)(t, e)) : this.node()[t];
}
function Nn(t) {
  return t.trim().split(/^|\s+/);
}
function ze(t) {
  return t.classList || new $n(t);
}
function $n(t) {
  this._node = t, this._names = Nn(t.getAttribute("class") || "");
}
$n.prototype = {
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
function Tn(t, e) {
  for (var n = ze(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function En(t, e) {
  for (var n = ze(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function si(t) {
  return function() {
    Tn(this, t);
  };
}
function ai(t) {
  return function() {
    En(this, t);
  };
}
function ui(t, e) {
  return function() {
    (e.apply(this, arguments) ? Tn : En)(this, t);
  };
}
function ci(t, e) {
  var n = Nn(t + "");
  if (arguments.length < 2) {
    for (var r = ze(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? ui : e ? si : ai)(n, e));
}
function li() {
  this.textContent = "";
}
function hi(t) {
  return function() {
    this.textContent = t;
  };
}
function fi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function di(t) {
  return arguments.length ? this.each(t == null ? li : (typeof t == "function" ? fi : hi)(t)) : this.node().textContent;
}
function mi() {
  this.innerHTML = "";
}
function gi(t) {
  return function() {
    this.innerHTML = t;
  };
}
function pi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function yi(t) {
  return arguments.length ? this.each(t == null ? mi : (typeof t == "function" ? pi : gi)(t)) : this.node().innerHTML;
}
function _i() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function xi() {
  return this.each(_i);
}
function wi() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function vi() {
  return this.each(wi);
}
function bi(t) {
  var e = typeof t == "function" ? t : Ce(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Mi() {
  return null;
}
function ki(t, e) {
  var n = typeof t == "function" ? t : Ce(t), r = e == null ? Mi : typeof e == "function" ? e : Xe(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Ai() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Si() {
  return this.each(Ai);
}
function Ri() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ni() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function $i(t) {
  return this.select(t ? Ni : Ri);
}
function Ti(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ei(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ci(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Xi(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function zi(t, e, n) {
  return function() {
    var r = this.__on, i, s = Ei(e);
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
function Di(t, e, n) {
  var r = Ci(t + ""), i, s = r.length, o;
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
  for (a = e ? zi : Xi, i = 0; i < s; ++i) this.each(a(r[i], e, n));
  return this;
}
function Cn(t, e, n) {
  var r = Rn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Li(t, e) {
  return function() {
    return Cn(this, t, e);
  };
}
function Ii(t, e) {
  return function() {
    return Cn(this, t, e.apply(this, arguments));
  };
}
function Fi(t, e) {
  return this.each((typeof e == "function" ? Ii : Li)(t, e));
}
function* Oi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var De = [null];
function q(t, e) {
  this._groups = t, this._parents = e;
}
function Ot() {
  return new q([[document.documentElement]], De);
}
function Pi() {
  return this;
}
q.prototype = Ot.prototype = {
  constructor: q,
  select: dr,
  selectAll: pr,
  selectChild: wr,
  selectChildren: kr,
  filter: Ar,
  data: Er,
  enter: Sr,
  exit: Xr,
  join: zr,
  merge: Dr,
  selection: Pi,
  order: Lr,
  sort: Ir,
  call: Or,
  nodes: Pr,
  node: Br,
  size: Yr,
  empty: qr,
  each: Vr,
  attr: Qr,
  style: ei,
  property: oi,
  classed: ci,
  text: di,
  html: yi,
  raise: xi,
  lower: vi,
  append: bi,
  insert: ki,
  remove: Si,
  clone: $i,
  datum: Ti,
  on: Di,
  dispatch: Fi,
  [Symbol.iterator]: Oi
};
function G(t) {
  return typeof t == "string" ? new q([[document.querySelector(t)]], [document.documentElement]) : new q([[t]], De);
}
function Xn(t) {
  return G(Ce(t).call(document.documentElement));
}
function Bi(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function W(t, e) {
  if (t = Bi(t), e === void 0 && (e = t.currentTarget), e) {
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
function zn(t) {
  return typeof t == "string" ? new q([document.querySelectorAll(t)], [document.documentElement]) : new q([bn(t)], De);
}
var Yi = { value: () => {
} };
function he() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Gt(n);
}
function Gt(t) {
  this._ = t;
}
function qi(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Gt.prototype = he.prototype = {
  constructor: Gt,
  on: function(t, e) {
    var n = this._, r = qi(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (t = r[s]).type) && (i = Vi(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (i = (t = r[s]).type) n[i] = Ge(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Ge(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Gt(t);
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
function Vi(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Ge(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Yi, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const Hi = { passive: !1 }, zt = { capture: !0, passive: !1 };
function pe(t) {
  t.stopImmediatePropagation();
}
function yt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Dn(t) {
  var e = t.document.documentElement, n = G(t).on("dragstart.drag", yt, zt);
  "onselectstart" in e ? n.on("selectstart.drag", yt, zt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Ln(t, e) {
  var n = t.document.documentElement, r = G(t).on("dragstart.drag", null);
  e && (r.on("click.drag", yt, zt), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Bt = (t) => () => t;
function ve(t, {
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
ve.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Ui(t) {
  return !t.ctrlKey && !t.button;
}
function Gi() {
  return this.parentNode;
}
function Ki(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Zi() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function In() {
  var t = Ui, e = Gi, n = Ki, r = Zi, i = {}, s = he("start", "drag", "end"), o = 0, a, c, u, l, d = 0;
  function f(y) {
    y.on("mousedown.drag", g).filter(r).on("touchstart.drag", E).on("touchmove.drag", w, Hi).on("touchend.drag touchcancel.drag", X).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function g(y, v) {
    if (!(l || !t.call(this, y, v))) {
      var R = T(this, e.call(this, y, v), y, v, "mouse");
      R && (G(y.view).on("mousemove.drag", A, zt).on("mouseup.drag", $, zt), Dn(y.view), pe(y), u = !1, a = y.clientX, c = y.clientY, R("start", y));
    }
  }
  function A(y) {
    if (yt(y), !u) {
      var v = y.clientX - a, R = y.clientY - c;
      u = v * v + R * R > d;
    }
    i.mouse("drag", y);
  }
  function $(y) {
    G(y.view).on("mousemove.drag mouseup.drag", null), Ln(y.view, u), yt(y), i.mouse("end", y);
  }
  function E(y, v) {
    if (t.call(this, y, v)) {
      var R = y.changedTouches, N = e.call(this, y, v), z = R.length, O, P;
      for (O = 0; O < z; ++O)
        (P = T(this, N, y, v, R[O].identifier, R[O])) && (pe(y), P("start", y, R[O]));
    }
  }
  function w(y) {
    var v = y.changedTouches, R = v.length, N, z;
    for (N = 0; N < R; ++N)
      (z = i[v[N].identifier]) && (yt(y), z("drag", y, v[N]));
  }
  function X(y) {
    var v = y.changedTouches, R = v.length, N, z;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), N = 0; N < R; ++N)
      (z = i[v[N].identifier]) && (pe(y), z("end", y, v[N]));
  }
  function T(y, v, R, N, z, O) {
    var P = s.copy(), b = W(O || R, v), I, L, h;
    if ((h = n.call(y, new ve("beforestart", {
      sourceEvent: R,
      target: f,
      identifier: z,
      active: o,
      x: b[0],
      y: b[1],
      dx: 0,
      dy: 0,
      dispatch: P
    }), N)) != null)
      return I = h.x - b[0] || 0, L = h.y - b[1] || 0, function _(p, x, k) {
        var M = b, S;
        switch (p) {
          case "start":
            i[z] = _, S = o++;
            break;
          case "end":
            delete i[z], --o;
          // falls through
          case "drag":
            b = W(k || x, v), S = o;
            break;
        }
        P.call(
          p,
          y,
          new ve(p, {
            sourceEvent: x,
            subject: h,
            target: f,
            identifier: z,
            active: S,
            x: b[0] + I,
            y: b[1] + L,
            dx: b[0] - M[0],
            dy: b[1] - M[1],
            dispatch: P
          }),
          N
        );
      };
  }
  return f.filter = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : Bt(!!y), f) : t;
  }, f.container = function(y) {
    return arguments.length ? (e = typeof y == "function" ? y : Bt(y), f) : e;
  }, f.subject = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : Bt(y), f) : n;
  }, f.touchable = function(y) {
    return arguments.length ? (r = typeof y == "function" ? y : Bt(!!y), f) : r;
  }, f.on = function() {
    var y = s.on.apply(s, arguments);
    return y === s ? f : y;
  }, f.clickDistance = function(y) {
    return arguments.length ? (d = (y = +y) * y, f) : Math.sqrt(d);
  }, f;
}
function Wi(t) {
  return t;
}
var Kt = 1, Zt = 2, be = 3, Tt = 4, Ke = 1e-6;
function Qi(t) {
  return "translate(" + t + ",0)";
}
function Ji(t) {
  return "translate(0," + t + ")";
}
function ji(t) {
  return (e) => +t(e);
}
function to(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function eo() {
  return !this.__axis;
}
function fe(t, e) {
  var n = [], r = null, i = null, s = 6, o = 6, a = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, u = t === Kt || t === Tt ? -1 : 1, l = t === Tt || t === Zt ? "x" : "y", d = t === Kt || t === be ? Qi : Ji;
  function f(g) {
    var A = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), $ = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Wi), E = Math.max(s, 0) + a, w = e.range(), X = +w[0] + c, T = +w[w.length - 1] + c, y = (e.bandwidth ? to : ji)(e.copy(), c), v = g.selection ? g.selection() : g, R = v.selectAll(".domain").data([null]), N = v.selectAll(".tick").data(A, e).order(), z = N.exit(), O = N.enter().append("g").attr("class", "tick"), P = N.select("line"), b = N.select("text");
    R = R.merge(R.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), N = N.merge(O), P = P.merge(O.append("line").attr("stroke", "currentColor").attr(l + "2", u * s)), b = b.merge(O.append("text").attr("fill", "currentColor").attr(l, u * E).attr("dy", t === Kt ? "0em" : t === be ? "0.71em" : "0.32em")), g !== v && (R = R.transition(g), N = N.transition(g), P = P.transition(g), b = b.transition(g), z = z.transition(g).attr("opacity", Ke).attr("transform", function(I) {
      return isFinite(I = y(I)) ? d(I + c) : this.getAttribute("transform");
    }), O.attr("opacity", Ke).attr("transform", function(I) {
      var L = this.parentNode.__axis;
      return d((L && isFinite(L = L(I)) ? L : y(I)) + c);
    })), z.remove(), R.attr("d", t === Tt || t === Zt ? o ? "M" + u * o + "," + X + "H" + c + "V" + T + "H" + u * o : "M" + c + "," + X + "V" + T : o ? "M" + X + "," + u * o + "V" + c + "H" + T + "V" + u * o : "M" + X + "," + c + "H" + T), N.attr("opacity", 1).attr("transform", function(I) {
      return d(y(I) + c);
    }), P.attr(l + "2", u * s), b.attr(l, u * E).text($), v.filter(eo).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Zt ? "start" : t === Tt ? "end" : "middle"), v.each(function() {
      this.__axis = y;
    });
  }
  return f.scale = function(g) {
    return arguments.length ? (e = g, f) : e;
  }, f.ticks = function() {
    return n = Array.from(arguments), f;
  }, f.tickArguments = function(g) {
    return arguments.length ? (n = g == null ? [] : Array.from(g), f) : n.slice();
  }, f.tickValues = function(g) {
    return arguments.length ? (r = g == null ? null : Array.from(g), f) : r && r.slice();
  }, f.tickFormat = function(g) {
    return arguments.length ? (i = g, f) : i;
  }, f.tickSize = function(g) {
    return arguments.length ? (s = o = +g, f) : s;
  }, f.tickSizeInner = function(g) {
    return arguments.length ? (s = +g, f) : s;
  }, f.tickSizeOuter = function(g) {
    return arguments.length ? (o = +g, f) : o;
  }, f.tickPadding = function(g) {
    return arguments.length ? (a = +g, f) : a;
  }, f.offset = function(g) {
    return arguments.length ? (c = +g, f) : c;
  }, f;
}
function Fn(t) {
  return fe(Kt, t);
}
function On(t) {
  return fe(Zt, t);
}
function Pn(t) {
  return fe(be, t);
}
function Bn(t) {
  return fe(Tt, t);
}
function Le(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Yn(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Pt() {
}
var Dt = 0.7, ee = 1 / Dt, _t = "\\s*([+-]?\\d+)\\s*", Lt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", no = /^#([0-9a-f]{3,8})$/, ro = new RegExp(`^rgb\\(${_t},${_t},${_t}\\)$`), io = new RegExp(`^rgb\\(${et},${et},${et}\\)$`), oo = new RegExp(`^rgba\\(${_t},${_t},${_t},${Lt}\\)$`), so = new RegExp(`^rgba\\(${et},${et},${et},${Lt}\\)$`), ao = new RegExp(`^hsl\\(${Lt},${et},${et}\\)$`), uo = new RegExp(`^hsla\\(${Lt},${et},${et},${Lt}\\)$`), Ze = {
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
Le(Pt, dt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: We,
  // Deprecated! Use color.formatHex.
  formatHex: We,
  formatHex8: co,
  formatHsl: lo,
  formatRgb: Qe,
  toString: Qe
});
function We() {
  return this.rgb().formatHex();
}
function co() {
  return this.rgb().formatHex8();
}
function lo() {
  return qn(this).formatHsl();
}
function Qe() {
  return this.rgb().formatRgb();
}
function dt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = no.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Je(e) : n === 3 ? new V(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Yt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Yt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = ro.exec(t)) ? new V(e[1], e[2], e[3], 1) : (e = io.exec(t)) ? new V(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = oo.exec(t)) ? Yt(e[1], e[2], e[3], e[4]) : (e = so.exec(t)) ? Yt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = ao.exec(t)) ? en(e[1], e[2] / 100, e[3] / 100, 1) : (e = uo.exec(t)) ? en(e[1], e[2] / 100, e[3] / 100, e[4]) : Ze.hasOwnProperty(t) ? Je(Ze[t]) : t === "transparent" ? new V(NaN, NaN, NaN, 0) : null;
}
function Je(t) {
  return new V(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Yt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new V(t, e, n, r);
}
function ho(t) {
  return t instanceof Pt || (t = dt(t)), t ? (t = t.rgb(), new V(t.r, t.g, t.b, t.opacity)) : new V();
}
function Me(t, e, n, r) {
  return arguments.length === 1 ? ho(t) : new V(t, e, n, r ?? 1);
}
function V(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Le(V, Me, Yn(Pt, {
  brighter(t) {
    return t = t == null ? ee : Math.pow(ee, t), new V(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Dt : Math.pow(Dt, t), new V(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new V(ft(this.r), ft(this.g), ft(this.b), ne(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: je,
  // Deprecated! Use color.formatHex.
  formatHex: je,
  formatHex8: fo,
  formatRgb: tn,
  toString: tn
}));
function je() {
  return `#${ht(this.r)}${ht(this.g)}${ht(this.b)}`;
}
function fo() {
  return `#${ht(this.r)}${ht(this.g)}${ht(this.b)}${ht((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function tn() {
  const t = ne(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ft(this.r)}, ${ft(this.g)}, ${ft(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ne(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ft(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ht(t) {
  return t = ft(t), (t < 16 ? "0" : "") + t.toString(16);
}
function en(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new J(t, e, n, r);
}
function qn(t) {
  if (t instanceof J) return new J(t.h, t.s, t.l, t.opacity);
  if (t instanceof Pt || (t = dt(t)), !t) return new J();
  if (t instanceof J) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, a = s - i, c = (s + i) / 2;
  return a ? (e === s ? o = (n - r) / a + (n < r) * 6 : n === s ? o = (r - e) / a + 2 : o = (e - n) / a + 4, a /= c < 0.5 ? s + i : 2 - s - i, o *= 60) : a = c > 0 && c < 1 ? 0 : o, new J(o, a, c, t.opacity);
}
function mo(t, e, n, r) {
  return arguments.length === 1 ? qn(t) : new J(t, e, n, r ?? 1);
}
function J(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Le(J, mo, Yn(Pt, {
  brighter(t) {
    return t = t == null ? ee : Math.pow(ee, t), new J(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Dt : Math.pow(Dt, t), new J(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new V(
      ye(t >= 240 ? t - 240 : t + 120, i, r),
      ye(t, i, r),
      ye(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new J(nn(this.h), qt(this.s), qt(this.l), ne(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ne(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${nn(this.h)}, ${qt(this.s) * 100}%, ${qt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function nn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function qt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ye(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Ie = (t) => () => t;
function go(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function po(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function yo(t) {
  return (t = +t) == 1 ? Vn : function(e, n) {
    return n - e ? po(e, n, t) : Ie(isNaN(e) ? n : e);
  };
}
function Vn(t, e) {
  var n = e - t;
  return n ? go(t, n) : Ie(isNaN(t) ? e : t);
}
const re = function t(e) {
  var n = yo(e);
  function r(i, s) {
    var o = n((i = Me(i)).r, (s = Me(s)).r), a = n(i.g, s.g), c = n(i.b, s.b), u = Vn(i.opacity, s.opacity);
    return function(l) {
      return i.r = o(l), i.g = a(l), i.b = c(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function _o(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function xo(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function wo(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = Fe(t[o], e[o]);
  for (; o < n; ++o) s[o] = e[o];
  return function(a) {
    for (o = 0; o < r; ++o) s[o] = i[o](a);
    return s;
  };
}
function vo(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function Q(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function bo(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Fe(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var ke = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, _e = new RegExp(ke.source, "g");
function Mo(t) {
  return function() {
    return t;
  };
}
function ko(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Hn(t, e) {
  var n = ke.lastIndex = _e.lastIndex = 0, r, i, s, o = -1, a = [], c = [];
  for (t = t + "", e = e + ""; (r = ke.exec(t)) && (i = _e.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), a[o] ? a[o] += s : a[++o] = s), (r = r[0]) === (i = i[0]) ? a[o] ? a[o] += i : a[++o] = i : (a[++o] = null, c.push({ i: o, x: Q(r, i) })), n = _e.lastIndex;
  return n < e.length && (s = e.slice(n), a[o] ? a[o] += s : a[++o] = s), a.length < 2 ? c[0] ? ko(c[0].x) : Mo(e) : (e = c.length, function(u) {
    for (var l = 0, d; l < e; ++l) a[(d = c[l]).i] = d.x(u);
    return a.join("");
  });
}
function Fe(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Ie(e) : (n === "number" ? Q : n === "string" ? (r = dt(e)) ? (e = r, re) : Hn : e instanceof dt ? re : e instanceof Date ? vo : xo(e) ? _o : Array.isArray(e) ? wo : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? bo : Q)(t, e);
}
function Ao(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var rn = 180 / Math.PI, Ae = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Un(t, e, n, r, i, s) {
  var o, a, c;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (c = t * n + e * r) && (n -= t * c, r -= e * c), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, c /= a), t * r < e * n && (t = -t, e = -e, c = -c, o = -o), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * rn,
    skewX: Math.atan(c) * rn,
    scaleX: o,
    scaleY: a
  };
}
var Vt;
function So(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ae : Un(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Ro(t) {
  return t == null || (Vt || (Vt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Vt.setAttribute("transform", t), !(t = Vt.transform.baseVal.consolidate())) ? Ae : (t = t.matrix, Un(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Gn(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function s(u, l, d, f, g, A) {
    if (u !== d || l !== f) {
      var $ = g.push("translate(", null, e, null, n);
      A.push({ i: $ - 4, x: Q(u, d) }, { i: $ - 2, x: Q(l, f) });
    } else (d || f) && g.push("translate(" + d + e + f + n);
  }
  function o(u, l, d, f) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), f.push({ i: d.push(i(d) + "rotate(", null, r) - 2, x: Q(u, l) })) : l && d.push(i(d) + "rotate(" + l + r);
  }
  function a(u, l, d, f) {
    u !== l ? f.push({ i: d.push(i(d) + "skewX(", null, r) - 2, x: Q(u, l) }) : l && d.push(i(d) + "skewX(" + l + r);
  }
  function c(u, l, d, f, g, A) {
    if (u !== d || l !== f) {
      var $ = g.push(i(g) + "scale(", null, ",", null, ")");
      A.push({ i: $ - 4, x: Q(u, d) }, { i: $ - 2, x: Q(l, f) });
    } else (d !== 1 || f !== 1) && g.push(i(g) + "scale(" + d + "," + f + ")");
  }
  return function(u, l) {
    var d = [], f = [];
    return u = t(u), l = t(l), s(u.translateX, u.translateY, l.translateX, l.translateY, d, f), o(u.rotate, l.rotate, d, f), a(u.skewX, l.skewX, d, f), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, d, f), u = l = null, function(g) {
      for (var A = -1, $ = f.length, E; ++A < $; ) d[(E = f[A]).i] = E.x(g);
      return d.join("");
    };
  };
}
var No = Gn(So, "px, ", "px)", "deg)"), $o = Gn(Ro, ", ", ")", ")"), To = 1e-12;
function on(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Eo(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Co(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Xo = function t(e, n, r) {
  function i(s, o) {
    var a = s[0], c = s[1], u = s[2], l = o[0], d = o[1], f = o[2], g = l - a, A = d - c, $ = g * g + A * A, E, w;
    if ($ < To)
      w = Math.log(f / u) / e, E = function(N) {
        return [
          a + N * g,
          c + N * A,
          u * Math.exp(e * N * w)
        ];
      };
    else {
      var X = Math.sqrt($), T = (f * f - u * u + r * $) / (2 * u * n * X), y = (f * f - u * u - r * $) / (2 * f * n * X), v = Math.log(Math.sqrt(T * T + 1) - T), R = Math.log(Math.sqrt(y * y + 1) - y);
      w = (R - v) / e, E = function(N) {
        var z = N * w, O = on(v), P = u / (n * X) * (O * Co(e * z + v) - Eo(v));
        return [
          a + P * g,
          c + P * A,
          u * O / on(e * z + v)
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
var At = 0, Et = 0, Nt = 0, Kn = 1e3, ie, Ct, oe = 0, mt = 0, de = 0, It = typeof performance == "object" && performance.now ? performance : Date, Zn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Oe() {
  return mt || (Zn(zo), mt = It.now() + de);
}
function zo() {
  mt = 0;
}
function se() {
  this._call = this._time = this._next = null;
}
se.prototype = Wn.prototype = {
  constructor: se,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Oe() : +n) + (e == null ? 0 : +e), !this._next && Ct !== this && (Ct ? Ct._next = this : ie = this, Ct = this), this._call = t, this._time = n, Se();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Se());
  }
};
function Wn(t, e, n) {
  var r = new se();
  return r.restart(t, e, n), r;
}
function Do() {
  Oe(), ++At;
  for (var t = ie, e; t; )
    (e = mt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --At;
}
function sn() {
  mt = (oe = It.now()) + de, At = Et = 0;
  try {
    Do();
  } finally {
    At = 0, Io(), mt = 0;
  }
}
function Lo() {
  var t = It.now(), e = t - oe;
  e > Kn && (de -= e, oe = t);
}
function Io() {
  for (var t, e = ie, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ie = n);
  Ct = t, Se(r);
}
function Se(t) {
  if (!At) {
    Et && (Et = clearTimeout(Et));
    var e = t - mt;
    e > 24 ? (t < 1 / 0 && (Et = setTimeout(sn, t - It.now() - de)), Nt && (Nt = clearInterval(Nt))) : (Nt || (oe = It.now(), Nt = setInterval(Lo, Kn)), At = 1, Zn(sn));
  }
}
function an(t, e, n) {
  var r = new se();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Fo = he("start", "end", "cancel", "interrupt"), Oo = [], Qn = 0, un = 1, Re = 2, Wt = 3, cn = 4, Ne = 5, Qt = 6;
function me(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  Po(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Fo,
    tween: Oo,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Qn
  });
}
function Pe(t, e) {
  var n = j(t, e);
  if (n.state > Qn) throw new Error("too late; already scheduled");
  return n;
}
function nt(t, e) {
  var n = j(t, e);
  if (n.state > Wt) throw new Error("too late; already running");
  return n;
}
function j(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Po(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Wn(s, 0, n.time);
  function s(u) {
    n.state = un, n.timer.restart(o, n.delay, n.time), n.delay <= u && o(u - n.delay);
  }
  function o(u) {
    var l, d, f, g;
    if (n.state !== un) return c();
    for (l in r)
      if (g = r[l], g.name === n.name) {
        if (g.state === Wt) return an(o);
        g.state === cn ? (g.state = Qt, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[l]) : +l < e && (g.state = Qt, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[l]);
      }
    if (an(function() {
      n.state === Wt && (n.state = cn, n.timer.restart(a, n.delay, n.time), a(u));
    }), n.state = Re, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Re) {
      for (n.state = Wt, i = new Array(f = n.tween.length), l = 0, d = -1; l < f; ++l)
        (g = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++d] = g);
      i.length = d + 1;
    }
  }
  function a(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = Ne, 1), d = -1, f = i.length; ++d < f; )
      i[d].call(t, l);
    n.state === Ne && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = Qt, n.timer.stop(), delete r[e];
    for (var u in r) return;
    delete t.__transition;
  }
}
function Jt(t, e) {
  var n = t.__transition, r, i, s = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > Re && r.state < Ne, r.state = Qt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function Bo(t) {
  return this.each(function() {
    Jt(this, t);
  });
}
function Yo(t, e) {
  var n, r;
  return function() {
    var i = nt(this, t), s = i.tween;
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
function qo(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = nt(this, t), o = s.tween;
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
function Vo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = j(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Yo : qo)(n, t, e));
}
function Be(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = nt(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return j(i, r).value[e];
  };
}
function Jn(t, e) {
  var n;
  return (typeof e == "number" ? Q : e instanceof dt ? re : (n = dt(e)) ? (e = n, re) : Hn)(t, e);
}
function Ho(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Uo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Go(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Ko(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Zo(t, e, n) {
  var r, i, s;
  return function() {
    var o, a = n(this), c;
    return a == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), c = a + "", o === c ? null : o === r && c === i ? s : (i = c, s = e(r = o, a)));
  };
}
function Wo(t, e, n) {
  var r, i, s;
  return function() {
    var o, a = n(this), c;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), c = a + "", o === c ? null : o === r && c === i ? s : (i = c, s = e(r = o, a)));
  };
}
function Qo(t, e) {
  var n = le(t), r = n === "transform" ? $o : Jn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Wo : Zo)(n, r, Be(this, "attr." + t, e)) : e == null ? (n.local ? Uo : Ho)(n) : (n.local ? Ko : Go)(n, r, e));
}
function Jo(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function jo(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function ts(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && jo(t, s)), n;
  }
  return i._value = e, i;
}
function es(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Jo(t, s)), n;
  }
  return i._value = e, i;
}
function ns(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = le(t);
  return this.tween(n, (r.local ? ts : es)(r, e));
}
function rs(t, e) {
  return function() {
    Pe(this, t).delay = +e.apply(this, arguments);
  };
}
function is(t, e) {
  return e = +e, function() {
    Pe(this, t).delay = e;
  };
}
function os(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? rs : is)(e, t)) : j(this.node(), e).delay;
}
function ss(t, e) {
  return function() {
    nt(this, t).duration = +e.apply(this, arguments);
  };
}
function as(t, e) {
  return e = +e, function() {
    nt(this, t).duration = e;
  };
}
function us(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ss : as)(e, t)) : j(this.node(), e).duration;
}
function cs(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    nt(this, t).ease = e;
  };
}
function ls(t) {
  var e = this._id;
  return arguments.length ? this.each(cs(e, t)) : j(this.node(), e).ease;
}
function hs(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    nt(this, t).ease = n;
  };
}
function fs(t) {
  if (typeof t != "function") throw new Error();
  return this.each(hs(this._id, t));
}
function ds(t) {
  typeof t != "function" && (t = kn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], c, u = 0; u < o; ++u)
      (c = s[u]) && t.call(c, c.__data__, u, s) && a.push(c);
  return new at(r, this._parents, this._name, this._id);
}
function ms(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), a = 0; a < s; ++a)
    for (var c = e[a], u = n[a], l = c.length, d = o[a] = new Array(l), f, g = 0; g < l; ++g)
      (f = c[g] || u[g]) && (d[g] = f);
  for (; a < r; ++a)
    o[a] = e[a];
  return new at(o, this._parents, this._name, this._id);
}
function gs(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function ps(t, e, n) {
  var r, i, s = gs(e) ? Pe : nt;
  return function() {
    var o = s(this, t), a = o.on;
    a !== r && (i = (r = a).copy()).on(e, n), o.on = i;
  };
}
function ys(t, e) {
  var n = this._id;
  return arguments.length < 2 ? j(this.node(), n).on.on(t) : this.each(ps(n, t, e));
}
function _s(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function xs() {
  return this.on("end.remove", _s(this._id));
}
function ws(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Xe(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = r[o], c = a.length, u = s[o] = new Array(c), l, d, f = 0; f < c; ++f)
      (l = a[f]) && (d = t.call(l, l.__data__, f, a)) && ("__data__" in l && (d.__data__ = l.__data__), u[f] = d, me(u[f], e, n, f, u, j(l, n)));
  return new at(s, this._parents, e, n);
}
function vs(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Mn(t));
  for (var r = this._groups, i = r.length, s = [], o = [], a = 0; a < i; ++a)
    for (var c = r[a], u = c.length, l, d = 0; d < u; ++d)
      if (l = c[d]) {
        for (var f = t.call(l, l.__data__, d, c), g, A = j(l, n), $ = 0, E = f.length; $ < E; ++$)
          (g = f[$]) && me(g, e, n, $, f, A);
        s.push(f), o.push(l);
      }
  return new at(s, o, e, n);
}
var bs = Ot.prototype.constructor;
function Ms() {
  return new bs(this._groups, this._parents);
}
function ks(t, e) {
  var n, r, i;
  return function() {
    var s = kt(this, t), o = (this.style.removeProperty(t), kt(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function jn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function As(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = kt(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Ss(t, e, n) {
  var r, i, s;
  return function() {
    var o = kt(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), kt(this, t))), o === c ? null : o === r && c === i ? s : (i = c, s = e(r = o, a));
  };
}
function Rs(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, a;
  return function() {
    var c = nt(this, t), u = c.on, l = c.value[s] == null ? a || (a = jn(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(o, i = l), c.on = r;
  };
}
function Ns(t, e, n) {
  var r = (t += "") == "transform" ? No : Jn;
  return e == null ? this.styleTween(t, ks(t, r)).on("end.style." + t, jn(t)) : typeof e == "function" ? this.styleTween(t, Ss(t, r, Be(this, "style." + t, e))).each(Rs(this._id, t)) : this.styleTween(t, As(t, r, e), n).on("end.style." + t, null);
}
function $s(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ts(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && $s(t, o, n)), r;
  }
  return s._value = e, s;
}
function Es(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Ts(t, e, n ?? ""));
}
function Cs(t) {
  return function() {
    this.textContent = t;
  };
}
function Xs(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function zs(t) {
  return this.tween("text", typeof t == "function" ? Xs(Be(this, "text", t)) : Cs(t == null ? "" : t + ""));
}
function Ds(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Ls(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Ds(i)), e;
  }
  return r._value = t, r;
}
function Is(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Ls(t));
}
function Fs() {
  for (var t = this._name, e = this._id, n = tr(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], a = o.length, c, u = 0; u < a; ++u)
      if (c = o[u]) {
        var l = j(c, e);
        me(c, t, n, u, o, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new at(r, this._parents, t, n);
}
function Os() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var a = { value: o }, c = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var u = nt(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(c)), u.on = e;
    }), i === 0 && s();
  });
}
var Ps = 0;
function at(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function tr() {
  return ++Ps;
}
var ot = Ot.prototype;
at.prototype = {
  constructor: at,
  select: ws,
  selectAll: vs,
  selectChild: ot.selectChild,
  selectChildren: ot.selectChildren,
  filter: ds,
  merge: ms,
  selection: Ms,
  transition: Fs,
  call: ot.call,
  nodes: ot.nodes,
  node: ot.node,
  size: ot.size,
  empty: ot.empty,
  each: ot.each,
  on: ys,
  attr: Qo,
  attrTween: ns,
  style: Ns,
  styleTween: Es,
  text: zs,
  textTween: Is,
  remove: xs,
  tween: Vo,
  delay: os,
  duration: us,
  ease: ls,
  easeVarying: fs,
  end: Os,
  [Symbol.iterator]: ot[Symbol.iterator]
};
function Bs(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ys = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Bs
};
function qs(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Vs(t) {
  var e, n;
  t instanceof at ? (e = t._id, t = t._name) : (e = tr(), (n = Ys).time = Oe(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], a = o.length, c, u = 0; u < a; ++u)
      (c = o[u]) && me(c, t, e, u, o, n || qs(c, e));
  return new at(r, this._parents, t, e);
}
Ot.prototype.interrupt = Bo;
Ot.prototype.transition = Vs;
const Ht = (t) => () => t;
function Hs(t, {
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
function st(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
st.prototype = {
  constructor: st,
  scale: function(t) {
    return t === 1 ? this : new st(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new st(this.k, this.x + this.k * t, this.y + this.k * e);
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
var er = new st(1, 0, 0);
st.prototype;
function xe(t) {
  t.stopImmediatePropagation();
}
function $t(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Us(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Gs() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function ln() {
  return this.__zoom || er;
}
function Ks(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Zs() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ws(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function Qs() {
  var t = Us, e = Gs, n = Ws, r = Ks, i = Zs, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, c = Xo, u = he("start", "zoom", "end"), l, d, f, g = 500, A = 150, $ = 0, E = 10;
  function w(h) {
    h.property("__zoom", ln).on("wheel.zoom", z, { passive: !1 }).on("mousedown.zoom", O).on("dblclick.zoom", P).filter(i).on("touchstart.zoom", b).on("touchmove.zoom", I).on("touchend.zoom touchcancel.zoom", L).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  w.transform = function(h, _, p, x) {
    var k = h.selection ? h.selection() : h;
    k.property("__zoom", ln), h !== k ? v(h, _, p, x) : k.interrupt().each(function() {
      R(this, arguments).event(x).start().zoom(null, typeof _ == "function" ? _.apply(this, arguments) : _).end();
    });
  }, w.scaleBy = function(h, _, p, x) {
    w.scaleTo(h, function() {
      var k = this.__zoom.k, M = typeof _ == "function" ? _.apply(this, arguments) : _;
      return k * M;
    }, p, x);
  }, w.scaleTo = function(h, _, p, x) {
    w.transform(h, function() {
      var k = e.apply(this, arguments), M = this.__zoom, S = p == null ? y(k) : typeof p == "function" ? p.apply(this, arguments) : p, C = M.invert(S), F = typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(T(X(M, F), S, C), k, o);
    }, p, x);
  }, w.translateBy = function(h, _, p, x) {
    w.transform(h, function() {
      return n(this.__zoom.translate(
        typeof _ == "function" ? _.apply(this, arguments) : _,
        typeof p == "function" ? p.apply(this, arguments) : p
      ), e.apply(this, arguments), o);
    }, null, x);
  }, w.translateTo = function(h, _, p, x, k) {
    w.transform(h, function() {
      var M = e.apply(this, arguments), S = this.__zoom, C = x == null ? y(M) : typeof x == "function" ? x.apply(this, arguments) : x;
      return n(er.translate(C[0], C[1]).scale(S.k).translate(
        typeof _ == "function" ? -_.apply(this, arguments) : -_,
        typeof p == "function" ? -p.apply(this, arguments) : -p
      ), M, o);
    }, x, k);
  };
  function X(h, _) {
    return _ = Math.max(s[0], Math.min(s[1], _)), _ === h.k ? h : new st(_, h.x, h.y);
  }
  function T(h, _, p) {
    var x = _[0] - p[0] * h.k, k = _[1] - p[1] * h.k;
    return x === h.x && k === h.y ? h : new st(h.k, x, k);
  }
  function y(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function v(h, _, p, x) {
    h.on("start.zoom", function() {
      R(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var k = this, M = arguments, S = R(k, M).event(x), C = e.apply(k, M), F = p == null ? y(C) : typeof p == "function" ? p.apply(k, M) : p, tt = Math.max(C[1][0] - C[0][0], C[1][1] - C[0][1]), B = k.__zoom, K = typeof _ == "function" ? _.apply(k, M) : _, rt = c(B.invert(F).concat(tt / B.k), K.invert(F).concat(tt / K.k));
      return function(Z) {
        if (Z === 1) Z = K;
        else {
          var it = rt(Z), ge = tt / it[2];
          Z = new st(ge, F[0] - it[0] * ge, F[1] - it[1] * ge);
        }
        S.zoom(null, Z);
      };
    });
  }
  function R(h, _, p) {
    return !p && h.__zooming || new N(h, _);
  }
  function N(h, _) {
    this.that = h, this.args = _, this.active = 0, this.sourceEvent = null, this.extent = e.apply(h, _), this.taps = 0;
  }
  N.prototype = {
    event: function(h) {
      return h && (this.sourceEvent = h), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(h, _) {
      return this.mouse && h !== "mouse" && (this.mouse[1] = _.invert(this.mouse[0])), this.touch0 && h !== "touch" && (this.touch0[1] = _.invert(this.touch0[0])), this.touch1 && h !== "touch" && (this.touch1[1] = _.invert(this.touch1[0])), this.that.__zoom = _, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(h) {
      var _ = G(this.that).datum();
      u.call(
        h,
        this.that,
        new Hs(h, {
          sourceEvent: this.sourceEvent,
          target: w,
          transform: this.that.__zoom,
          dispatch: u
        }),
        _
      );
    }
  };
  function z(h, ..._) {
    if (!t.apply(this, arguments)) return;
    var p = R(this, _).event(h), x = this.__zoom, k = Math.max(s[0], Math.min(s[1], x.k * Math.pow(2, r.apply(this, arguments)))), M = W(h);
    if (p.wheel)
      (p.mouse[0][0] !== M[0] || p.mouse[0][1] !== M[1]) && (p.mouse[1] = x.invert(p.mouse[0] = M)), clearTimeout(p.wheel);
    else {
      if (x.k === k) return;
      p.mouse = [M, x.invert(M)], Jt(this), p.start();
    }
    $t(h), p.wheel = setTimeout(S, A), p.zoom("mouse", n(T(X(x, k), p.mouse[0], p.mouse[1]), p.extent, o));
    function S() {
      p.wheel = null, p.end();
    }
  }
  function O(h, ..._) {
    if (f || !t.apply(this, arguments)) return;
    var p = h.currentTarget, x = R(this, _, !0).event(h), k = G(h.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", tt, !0), M = W(h, p), S = h.clientX, C = h.clientY;
    Dn(h.view), xe(h), x.mouse = [M, this.__zoom.invert(M)], Jt(this), x.start();
    function F(B) {
      if ($t(B), !x.moved) {
        var K = B.clientX - S, rt = B.clientY - C;
        x.moved = K * K + rt * rt > $;
      }
      x.event(B).zoom("mouse", n(T(x.that.__zoom, x.mouse[0] = W(B, p), x.mouse[1]), x.extent, o));
    }
    function tt(B) {
      k.on("mousemove.zoom mouseup.zoom", null), Ln(B.view, x.moved), $t(B), x.event(B).end();
    }
  }
  function P(h, ..._) {
    if (t.apply(this, arguments)) {
      var p = this.__zoom, x = W(h.changedTouches ? h.changedTouches[0] : h, this), k = p.invert(x), M = p.k * (h.shiftKey ? 0.5 : 2), S = n(T(X(p, M), x, k), e.apply(this, _), o);
      $t(h), a > 0 ? G(this).transition().duration(a).call(v, S, x, h) : G(this).call(w.transform, S, x, h);
    }
  }
  function b(h, ..._) {
    if (t.apply(this, arguments)) {
      var p = h.touches, x = p.length, k = R(this, _, h.changedTouches.length === x).event(h), M, S, C, F;
      for (xe(h), S = 0; S < x; ++S)
        C = p[S], F = W(C, this), F = [F, this.__zoom.invert(F), C.identifier], k.touch0 ? !k.touch1 && k.touch0[2] !== F[2] && (k.touch1 = F, k.taps = 0) : (k.touch0 = F, M = !0, k.taps = 1 + !!l);
      l && (l = clearTimeout(l)), M && (k.taps < 2 && (d = F[0], l = setTimeout(function() {
        l = null;
      }, g)), Jt(this), k.start());
    }
  }
  function I(h, ..._) {
    if (this.__zooming) {
      var p = R(this, _).event(h), x = h.changedTouches, k = x.length, M, S, C, F;
      for ($t(h), M = 0; M < k; ++M)
        S = x[M], C = W(S, this), p.touch0 && p.touch0[2] === S.identifier ? p.touch0[0] = C : p.touch1 && p.touch1[2] === S.identifier && (p.touch1[0] = C);
      if (S = p.that.__zoom, p.touch1) {
        var tt = p.touch0[0], B = p.touch0[1], K = p.touch1[0], rt = p.touch1[1], Z = (Z = K[0] - tt[0]) * Z + (Z = K[1] - tt[1]) * Z, it = (it = rt[0] - B[0]) * it + (it = rt[1] - B[1]) * it;
        S = X(S, Math.sqrt(Z / it)), C = [(tt[0] + K[0]) / 2, (tt[1] + K[1]) / 2], F = [(B[0] + rt[0]) / 2, (B[1] + rt[1]) / 2];
      } else if (p.touch0) C = p.touch0[0], F = p.touch0[1];
      else return;
      p.zoom("touch", n(T(S, C, F), p.extent, o));
    }
  }
  function L(h, ..._) {
    if (this.__zooming) {
      var p = R(this, _).event(h), x = h.changedTouches, k = x.length, M, S;
      for (xe(h), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, g), M = 0; M < k; ++M)
        S = x[M], p.touch0 && p.touch0[2] === S.identifier ? delete p.touch0 : p.touch1 && p.touch1[2] === S.identifier && delete p.touch1;
      if (p.touch1 && !p.touch0 && (p.touch0 = p.touch1, delete p.touch1), p.touch0) p.touch0[1] = this.__zoom.invert(p.touch0[0]);
      else if (p.end(), p.taps === 2 && (S = W(S, this), Math.hypot(d[0] - S[0], d[1] - S[1]) < E)) {
        var C = G(this).on("dblclick.zoom");
        C && C.apply(this, arguments);
      }
    }
  }
  return w.wheelDelta = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : Ht(+h), w) : r;
  }, w.filter = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : Ht(!!h), w) : t;
  }, w.touchable = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : Ht(!!h), w) : i;
  }, w.extent = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : Ht([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), w) : e;
  }, w.scaleExtent = function(h) {
    return arguments.length ? (s[0] = +h[0], s[1] = +h[1], w) : [s[0], s[1]];
  }, w.translateExtent = function(h) {
    return arguments.length ? (o[0][0] = +h[0][0], o[1][0] = +h[1][0], o[0][1] = +h[0][1], o[1][1] = +h[1][1], w) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, w.constrain = function(h) {
    return arguments.length ? (n = h, w) : n;
  }, w.duration = function(h) {
    return arguments.length ? (a = +h, w) : a;
  }, w.interpolate = function(h) {
    return arguments.length ? (c = h, w) : c;
  }, w.on = function() {
    var h = u.on.apply(u, arguments);
    return h === u ? w : h;
  }, w.clickDistance = function(h) {
    return arguments.length ? ($ = (h = +h) * h, w) : Math.sqrt($);
  }, w.tapDistance = function(h) {
    return arguments.length ? (E = +h, w) : E;
  }, w;
}
function jt(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Js(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function nr(t) {
  let e, n, r;
  t.length !== 2 ? (e = jt, n = (a, c) => jt(t(a), c), r = (a, c) => t(a) - c) : (e = t === jt || t === Js ? t : js, n = t, r = t);
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
function js() {
  return 0;
}
function ta(t) {
  return t === null ? NaN : +t;
}
const ea = nr(jt), na = ea.right;
nr(ta).center;
const ra = Math.sqrt(50), ia = Math.sqrt(10), oa = Math.sqrt(2);
function ae(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), s = r / Math.pow(10, i), o = s >= ra ? 10 : s >= ia ? 5 : s >= oa ? 2 : 1;
  let a, c, u;
  return i < 0 ? (u = Math.pow(10, -i) / o, a = Math.round(t * u), c = Math.round(e * u), a / u < t && ++a, c / u > e && --c, u = -u) : (u = Math.pow(10, i) * o, a = Math.round(t / u), c = Math.round(e / u), a * u < t && ++a, c * u > e && --c), c < a && 0.5 <= n && n < 2 ? ae(t, e, n * 2) : [a, c, u];
}
function sa(t, e, n) {
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
function $e(t, e, n) {
  return e = +e, t = +t, n = +n, ae(t, e, n)[2];
}
function aa(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? $e(e, t, n) : $e(t, e, n);
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
var hn = [0, 1];
function pt(t) {
  return t;
}
function Te(t, e) {
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
  return i < r ? (r = Te(i, r), s = n(o, s)) : (r = Te(r, i), s = n(s, o)), function(a) {
    return s(r(a));
  };
}
function da(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), s = new Array(r), o = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++o < r; )
    i[o] = Te(t[o], t[o + 1]), s[o] = n(e[o], e[o + 1]);
  return function(a) {
    var c = na(t, a, 1, r) - 1;
    return s[c](i[c](a));
  };
}
function ma(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function ga() {
  var t = hn, e = hn, n = Fe, r, i, s, o = pt, a, c, u;
  function l() {
    var f = Math.min(t.length, e.length);
    return o !== pt && (o = ha(t[0], t[f - 1])), a = f > 2 ? da : fa, c = u = null, d;
  }
  function d(f) {
    return f == null || isNaN(f = +f) ? s : (c || (c = a(t.map(r), e, n)))(r(o(f)));
  }
  return d.invert = function(f) {
    return o(i((u || (u = a(e, t.map(r), Q)))(f)));
  }, d.domain = function(f) {
    return arguments.length ? (t = Array.from(f, la), l()) : t.slice();
  }, d.range = function(f) {
    return arguments.length ? (e = Array.from(f), l()) : e.slice();
  }, d.rangeRound = function(f) {
    return e = Array.from(f), n = Ao, l();
  }, d.clamp = function(f) {
    return arguments.length ? (o = f ? !0 : pt, l()) : o !== pt;
  }, d.interpolate = function(f) {
    return arguments.length ? (n = f, l()) : n;
  }, d.unknown = function(f) {
    return arguments.length ? (s = f, d) : s;
  }, function(f, g) {
    return r = f, i = g, l();
  };
}
function pa() {
  return ga()(pt, pt);
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
function St(t) {
  return t = ue(Math.abs(t)), t ? t[1] : NaN;
}
function _a(t, e) {
  return function(n, r) {
    for (var i = n.length, s = [], o = 0, a = t[0], c = 0; i > 0 && a > 0 && (c + a + 1 > r && (a = Math.max(1, r - c)), s.push(n.substring(i -= a, i + a)), !((c += a + 1) > r)); )
      a = t[o = (o + 1) % t.length];
    return s.reverse().join(e);
  };
}
function xa(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var wa = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ce(t) {
  if (!(e = wa.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Ye({
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
ce.prototype = Ye.prototype;
function Ye(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Ye.prototype.toString = function() {
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
var rr;
function ba(t, e) {
  var n = ue(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], s = i - (rr = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
  return s === o ? r : s > o ? r + new Array(s - o + 1).join("0") : s > 0 ? r.slice(0, s) + "." + r.slice(s) : "0." + new Array(1 - s).join("0") + ue(t, Math.max(0, e + s - 1))[0];
}
function fn(t, e) {
  var n = ue(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const dn = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: ya,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => fn(t * 100, e),
  r: fn,
  s: ba,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function mn(t) {
  return t;
}
var gn = Array.prototype.map, pn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Ma(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? mn : _a(gn.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", s = t.numerals === void 0 ? mn : xa(gn.call(t.numerals, String)), o = t.percent === void 0 ? "%" : t.percent + "", a = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function u(d) {
    d = ce(d);
    var f = d.fill, g = d.align, A = d.sign, $ = d.symbol, E = d.zero, w = d.width, X = d.comma, T = d.precision, y = d.trim, v = d.type;
    v === "n" ? (X = !0, v = "g") : dn[v] || (T === void 0 && (T = 12), y = !0, v = "g"), (E || f === "0" && g === "=") && (E = !0, f = "0", g = "=");
    var R = $ === "$" ? n : $ === "#" && /[boxX]/.test(v) ? "0" + v.toLowerCase() : "", N = $ === "$" ? r : /[%p]/.test(v) ? o : "", z = dn[v], O = /[defgprs%]/.test(v);
    T = T === void 0 ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, T)) : Math.max(0, Math.min(20, T));
    function P(b) {
      var I = R, L = N, h, _, p;
      if (v === "c")
        L = z(b) + L, b = "";
      else {
        b = +b;
        var x = b < 0 || 1 / b < 0;
        if (b = isNaN(b) ? c : z(Math.abs(b), T), y && (b = va(b)), x && +b == 0 && A !== "+" && (x = !1), I = (x ? A === "(" ? A : a : A === "-" || A === "(" ? "" : A) + I, L = (v === "s" ? pn[8 + rr / 3] : "") + L + (x && A === "(" ? ")" : ""), O) {
          for (h = -1, _ = b.length; ++h < _; )
            if (p = b.charCodeAt(h), 48 > p || p > 57) {
              L = (p === 46 ? i + b.slice(h + 1) : b.slice(h)) + L, b = b.slice(0, h);
              break;
            }
        }
      }
      X && !E && (b = e(b, 1 / 0));
      var k = I.length + b.length + L.length, M = k < w ? new Array(w - k + 1).join(f) : "";
      switch (X && E && (b = e(M + b, M.length ? w - L.length : 1 / 0), M = ""), g) {
        case "<":
          b = I + b + L + M;
          break;
        case "=":
          b = I + M + b + L;
          break;
        case "^":
          b = M.slice(0, k = M.length >> 1) + I + b + L + M.slice(k);
          break;
        default:
          b = M + I + b + L;
          break;
      }
      return s(b);
    }
    return P.toString = function() {
      return d + "";
    }, P;
  }
  function l(d, f) {
    var g = u((d = ce(d), d.type = "f", d)), A = Math.max(-8, Math.min(8, Math.floor(St(f) / 3))) * 3, $ = Math.pow(10, -A), E = pn[8 + A / 3];
    return function(w) {
      return g($ * w) + E;
    };
  }
  return {
    format: u,
    formatPrefix: l
  };
}
var Ut, ir, or;
ka({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function ka(t) {
  return Ut = Ma(t), ir = Ut.format, or = Ut.formatPrefix, Ut;
}
function Aa(t) {
  return Math.max(0, -St(Math.abs(t)));
}
function Sa(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(St(e) / 3))) * 3 - St(Math.abs(t)));
}
function Ra(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, St(e) - St(t)) + 1;
}
function Na(t, e, n, r) {
  var i = aa(t, e, n), s;
  switch (r = ce(r ?? ",f"), r.type) {
    case "s": {
      var o = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(s = Sa(i, o)) && (r.precision = s), or(r, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(s = Ra(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = s - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(s = Aa(i)) && (r.precision = s - (r.type === "%") * 2);
      break;
    }
  }
  return ir(r);
}
function $a(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return sa(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return Na(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, s = r.length - 1, o = r[i], a = r[s], c, u, l = 10;
    for (a < o && (u = o, o = a, a = u, u = i, i = s, s = u); l-- > 0; ) {
      if (u = $e(o, a, n), u === c)
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
function qe() {
  var t = pa();
  return t.copy = function() {
    return ma(t, qe());
  }, ua.apply(t, arguments), $a(t);
}
var H;
let Xt = (H = class {
}, m(H, "create", Xn), m(H, "select", G), m(H, "selectAll", zn), m(H, "pointer", W), m(H, "drag", In), m(H, "scaleLinear", qe), m(H, "axisTop", Fn), m(H, "axisBottom", Pn), m(H, "axisRight", On), m(H, "axisLeft", Bn), m(H, "zoom", Qs), H);
class D {
}
m(D, "create", Xn), m(D, "select", G), m(D, "selectAll", zn), m(D, "pointer", W), m(D, "drag", In), m(D, "scaleLinear", qe), m(D, "axisTop", Fn), m(D, "axisBottom", Pn), m(D, "axisRight", On), m(D, "axisLeft", Bn);
function sr(t) {
  const e = getComputedStyle(t), n = new Y({
    x: parseInt(e.left) || 0,
    y: parseInt(e.top) || 0,
    w: parseInt(e.width) || 0,
    h: parseInt(e.height) || 0,
    node: t
  });
  return Y.isBoard(n.node) && (n.parent = null), Array.from(t.children).forEach((r) => {
    const i = sr(r);
    i.parent = n, n.children.push(i);
  }), n;
}
function Ta(t) {
  return t.x >= this.x && t.x <= this.x + this.w && t.y >= this.y && t.y <= this.y + this.h;
}
function Ea(t) {
  if (!this.parent) return;
  const e = this.parent;
  switch (t) {
    case "h-start":
      this.x = 0;
      break;
    case "h-center":
      this.x = e.w / 2 - this.w / 2;
      break;
    case "h-end":
      this.x = e.w - this.w;
      break;
    case "v-top":
      this.y = 0;
      break;
    case "v-center":
      this.y = e.h / 2 - this.h / 2;
      break;
    case "v-bottom":
      this.x = e.h - this.h;
      break;
  }
}
function Ca(t) {
  const e = this.x + 0.01, n = this.y + 0.01, r = this.x + this.w - 0.01, i = this.y + this.h - 0.01, s = t.x, o = t.y, a = t.x + t.w, c = t.y + t.h;
  return !(r < s || e > a || i < o || n > c);
}
function Xa(t) {
  return t.attr("data-type") === Rt.Movable;
}
function za(t) {
  return t.attr("data-type") === Rt.Container;
}
function Da(t) {
  return t.attr("data-type") === Rt.Board;
}
function La() {
  if (Y.isBoard(this.node) || !this.parent) return;
  this.node.remove();
  const t = this.parent, e = t.children.findIndex((n) => n.id === this.id);
  e !== -1 && delete t.children[e];
}
function Ia(t) {
  this.children.push(t), this.node.append(t.node.node());
}
function Fa(t, e = "dfs") {
  if (e === "dfs") {
    if (t(this)) return this;
    for (const n of this.children) {
      const r = n.find(t, "dfs");
      if (r) return r;
    }
    return null;
  } else {
    const n = new Array();
    for (n.unshift(this); !n.length; ) {
      const r = n.shift();
      if (t(r))
        return r;
      n.unshift(...r.children);
    }
    return null;
  }
}
function ar(t, e, n = "dfs", r = 0) {
  if (n === "dfs") {
    e(t, r);
    for (const i of t.children)
      ar(i, e, "dfs", r + 1);
  }
  if (n === "bfs") {
    const i = new Array();
    for (i.unshift({ rect: t, depth: r }); !i.length; ) {
      const { rect: s, depth: o } = i.shift();
      e(s, o);
      for (const a of s.children)
        i.unshift({ rect: a, depth: o + 1 });
    }
  }
}
const Oa = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Pa = (t = 21) => {
  let e = "", n = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += Oa[n[t] & 63];
  return e;
};
function Ba() {
  const t = this.node.clone();
  return t.attr("data-id", Pa()), Y.from(t.node());
}
function Ya(t) {
  return t.attr("data-type") === Rt.Assist;
}
function qa(t) {
  return t.attr("data-type") === Rt.Root;
}
var xt, wt, vt, bt, Ft;
class Y {
  constructor({ x: e, y: n, h: r, w: i, node: s }) {
    lt(this, xt);
    lt(this, wt);
    lt(this, vt);
    lt(this, bt);
    lt(this, Ft);
    m(this, "node");
    m(this, "parent", null);
    m(this, "children", []);
    m(this, "isInside", Ta);
    m(this, "isIntersect", Ca);
    m(this, "align", Ea);
    m(this, "remove", La);
    m(this, "addChild", Ia);
    m(this, "find", Fa);
    m(this, "clone", Ba);
    U(this, xt, e), U(this, wt, n), U(this, bt, r), U(this, vt, i), this.node = D.select(s), U(this, Ft, String(s.dataset.id));
  }
  get id() {
    return ct(this, Ft);
  }
  get x() {
    return ct(this, xt);
  }
  set x(e) {
    U(this, xt, e), this.node.style("left", `${e}px`);
  }
  get y() {
    return ct(this, wt);
  }
  set y(e) {
    U(this, wt, e), this.node.style("top", `${e}px`);
  }
  get w() {
    return ct(this, vt);
  }
  set w(e) {
    U(this, vt, e), this.node.style("width", `${e}px`);
  }
  get h() {
    return ct(this, bt);
  }
  set h(e) {
    U(this, bt, e), this.node.style("height", `${e}px`);
  }
  set error(e) {
    this.node.attr("data-error", e);
  }
  get error() {
    return !!this.node.attr("data-error");
  }
}
xt = new WeakMap(), wt = new WeakMap(), vt = new WeakMap(), bt = new WeakMap(), Ft = new WeakMap(), m(Y, "from", sr), m(Y, "traverse", ar), m(Y, "isMovable", Xa), m(Y, "isContainer", za), m(Y, "isBoard", Da), m(Y, "isAssist", Ya), m(Y, "isRoot", qa);
var Rt = /* @__PURE__ */ ((t) => (t.Movable = "movable", t.Container = "container", t.Board = "board", t.Assist = "assist", t.Root = "root", t))(Rt || {});
class Va {
  constructor(e, n, r) {
    m(this, "scale");
    m(this, "translateX");
    m(this, "translateY");
    m(this, "scaleExtent", [0.4, 50]);
    this.scale = e, this.translateX = n, this.translateY = r;
  }
  toString() {
    return `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
  }
}
function Ha() {
  if (!this.selectedRect || !this.selectedRect.parent) return;
  const t = this.selectedRect.parent.children;
  this.selectedRect.error = !1;
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    if (n.id === this.selectedRect.id) continue;
    this.selectedRect.isIntersect(n) ? (this.selectedRect.error = !0, n.error = !0) : n.error = !1;
  }
}
var gt = /* @__PURE__ */ ((t) => (t.onAfterTransform = "onAfterTransform", t.onBeforeMount = "onBeforeMount", t.onAfterMount = "onAfterMount", t))(gt || {});
function Ua(t) {
  this[ut].add(gt.onAfterTransform, t);
}
function Ga(t) {
  this[ut].add(gt.onBeforeMount, t);
}
function Ka(t) {
  this[ut].add(gt.onAfterMount, t);
}
class Za {
  constructor() {
    m(this, "storage", /* @__PURE__ */ new Map());
  }
  add(e, n) {
    var r;
    this.storage.has(e) ? (r = this.storage.get(e)) == null || r.add(n) : this.storage.set(e, (/* @__PURE__ */ new Set()).add(n));
  }
  execute(e, n, ...r) {
    var i;
    this.storage.has(n) && ((i = this.storage.get(n)) == null || i.forEach((s) => {
      s.apply(e, r);
    }));
  }
}
function Wa() {
  this.board.style("transform", this.transform.toString()), this.assist.style("transform", this.transform.toString()), this.observer.update(), this[ut].execute(this, gt.onAfterTransform);
}
class Qa {
  constructor() {
    m(this, "undoStack", []);
    m(this, "redoStack", []);
    m(this, "maximum", 150);
  }
  execute(e) {
    e.exec(), e.record && (this.undoStack.length === this.maximum && this.undoStack.shift(), this.undoStack.push(e), this.redoStack = []);
  }
  undo() {
    const e = this.undoStack.pop();
    e && (e.undo(), this.redoStack.length === this.maximum && this.redoStack.shift(), this.redoStack.push(e));
  }
  redo() {
    const e = this.redoStack.pop();
    e && (e.exec(), this.undoStack.length === this.maximum && this.undoStack.shift(), this.undoStack.push(e));
  }
}
class xu {
  constructor(e) {
    m(this, "commands");
    m(this, "record", !0);
    this.commands = e;
  }
  exec() {
    for (const e of this.commands)
      e.exec();
  }
  undo() {
    for (let e = this.commands.length - 1; e >= 0; e--)
      this.commands[e].undo();
  }
}
class yn {
  constructor(e, n, r) {
    m(this, "selectedRect");
    m(this, "value");
    m(this, "snapshot");
    m(this, "record", !0);
    this.selectedRect = e, this.value = n, this.snapshot = r;
  }
  undo() {
    this.selectedRect.x = this.snapshot.x, this.selectedRect.y = this.snapshot.y;
  }
  exec() {
    this.selectedRect.x = this.value.x, this.selectedRect.y = this.value.y;
  }
}
class wu {
  constructor(e, n) {
    m(this, "parent");
    m(this, "rect");
    m(this, "record", !0);
    this.parent = e, this.rect = n;
  }
  undo() {
    this.parent.addChild(this.rect);
  }
  exec() {
    this.rect.remove();
  }
}
class vu {
  constructor(e, n) {
    m(this, "parent");
    m(this, "rect");
    m(this, "record", !0);
    this.parent = e, this.rect = n;
  }
  undo() {
    this.rect.remove();
  }
  exec() {
    this.parent.addChild(this.rect);
  }
}
function Ja(t, e) {
  t.install.call(this, e), this[Ee].add(t.name, t);
}
class ja {
  constructor() {
    m(this, "storage", /* @__PURE__ */ new Map());
  }
  add(e, n) {
    if (this.storage.has(e)) throw Error(`Freemove: 插件${e}已经存在`);
    this.storage.set(e, n);
  }
  get() {
    return this.storage;
  }
}
function tu(t, e) {
  const n = t.observer.boardDOMRect, r = t.selectedRect.node.node().getBoundingClientRect(), i = t.transform.scale, s = {
    x: (e.clientX - r.left) / i,
    y: (e.clientY - r.top) / i
  }, o = {
    x: t.selectedRect.x,
    y: t.selectedRect.y
  }, a = Object.assign({}, o);
  function c(l) {
    if (!t.selectedRect) return;
    a.x = Math.round((l.clientX - n.left) / i - s.x), a.y = Math.round((l.clientY - n.top) / i - s.y);
    const d = n.width - t.selectedRect.w, f = n.height - t.selectedRect.h;
    a.x = Math.max(0, Math.min(a.x, d)), a.y = Math.max(0, Math.min(a.y, f));
    const g = new yn(t.selectedRect, a, o);
    g.record = !1, t.manager.execute(g);
  }
  function u() {
    const l = new yn(t.selectedRect, a, o);
    t.manager.execute(l), document.removeEventListener("pointermove", c), document.removeEventListener("pointerup", u);
  }
  document.addEventListener("pointermove", c), document.addEventListener("pointerup", u);
}
function eu(t) {
  t.assist.on("pointerdown", (e) => {
    e.preventDefault();
    const n = Xt.select(e.target), [r, i] = Xt.pointer(e, t.assist.node());
    if (Y.isAssist(n)) {
      console.log("target", r, i);
      let s = null;
      Y.traverse(t.rect, (o) => {
        o.isInside({ x: r, y: i }) && Y.isMovable(o.node) && (s = o);
      }), console.log("target", s), s && (t.selectedRect = s, tu(t, e));
    }
  });
}
function nu(t) {
  t.root.node().addEventListener("wheel", (e) => {
    e.preventDefault();
    const [n, r] = t.transform.scaleExtent;
    if (e.ctrlKey) {
      const i = t.board.node().getBoundingClientRect(), s = e.clientX - i.left, o = e.clientY - i.top, a = t.transform.scale, c = e.deltaY * -0.01;
      let u = a * (1 + c);
      u = Math.max(n, Math.min(r, u)), t.transform.translateX -= (s / a - s / u) * u, t.transform.translateY -= (o / a - o / u) * u, t.transform.scale = u, t.applyTransform();
    } else
      t.transform.translateX -= e.deltaX, t.transform.translateY -= e.deltaY, t.applyTransform();
  });
}
class ru {
  constructor(e, n) {
    m(this, "root");
    m(this, "board");
    m(this, "rootDOMRect");
    m(this, "boardDOMRect");
    this.board = n, this.root = e, this.update();
  }
  // 主动更新 DOMRect
  update() {
    this.rootDOMRect = this.root.getBoundingClientRect(), this.boardDOMRect = this.board.getBoundingClientRect();
  }
  get boardCoord() {
    return {
      x: Math.round(this.boardDOMRect.x - this.rootDOMRect.x),
      y: Math.round(this.boardDOMRect.y - this.rootDOMRect.y)
    };
  }
}
function iu() {
  this[ut].execute(this, gt.onBeforeMount);
  const t = this.root.node(), e = this.board.node(), n = this.assist.node();
  t.append(n);
  const r = e.getBoundingClientRect(), i = t.getBoundingClientRect();
  this.root.attr("data-nodeType", "root").style("position", "relative"), this.board.attr("data-type", "board").style("position", "absolute").style("left", `${(i.width - r.width) / 2}px`).style("top", `${(i.height - r.height) / 2}px`).style("transform-origin", "0 0"), this.assist.attr("data-type", "assist").attr("width", r.width).attr("height", r.height).attr("viewbox", [0, 0, r.width, r.height]).style("position", "absolute").style("left", `${(i.width - r.width) / 2}px`).style("top", `${(i.height - r.height) / 2}px`).style("transform-origin", "0 0"), this.observer = new ru(t, e), nu(this), eu(this), this[ut].execute(this, gt.onAfterMount);
}
function ou() {
  return this.svg.selectAll("text").nodes().map((t) => {
    if (!t)
      return 0;
    const e = t.textContent.replace(/,/g, "").replace(/−/g, "-");
    return Number(e) || 0;
  });
}
function su() {
  const t = this.getMainTicks(), e = this.svg.selectAll(".tick").nodes().map((i) => {
    const s = i.getAttribute("transform"), o = this.__isX ? s.match(/translate\(([^,]+),/) : s.match(/translate\(0,([^,]+)/);
    return parseFloat(o[1]) || 0;
  }), n = (i) => {
    const s = [];
    let o = e[0], a = e[e.length - 1];
    const c = Math.abs(a - o) / (i * (e.length - 1));
    for (; o - c > 0; )
      o -= c;
    for (; a + c < this.width; )
      a += c;
    for (let u = o; u <= a; u += c)
      s.push(u);
    return s;
  }, r = Math.abs(t[0] - t[1]);
  return r >= 10 ? n(10) : r === 5 ? n(5) : r > 1 && r < 5 ? n(2) : n(1);
}
function au(t) {
  this.lines.add(Math.round(this.scaleLinear.invert(t))), this.lineRender();
}
function uu(t) {
  this.lines.delete(t), this.lineRender();
}
function cu({ scale: t, translateX: e, translateY: n }) {
  const r = this.__isX ? e : n, i = Math.max(this.width, this.height), s = 0, o = (this.lower - r) / t, a = (this.upper - r) / t;
  this.scaleLinear = D.scaleLinear([o, a], [s, i]), this.axis.scale(this.scaleLinear), this.svg.call(this.axis);
  const c = this.getSecondaryTicks();
  this.svg.selectAll(".ruler-secondary-tick").remove(), this.svg.append("svg:g").lower().classed("ruler-secondary-tick", !0).selectAll("line").data(c).join("svg:line").attr("x1", (u) => this.__isX ? u : 0).attr("y1", (u) => this.__isX ? 0 : u).attr("x2", (u) => this.__isX ? u : 5).attr("y2", (u) => this.__isX ? 5 : u).attr("stroke", "#5EA090").attr("stroke-width", "1").style("pointer-events", "none"), this.svg.selectAll(".tick").style("pointer-events", "none"), this.svg.selectAll(".tick text").attr("text-anchor", "start").attr("transform", this.__isX ? "translate(4,-6)" : "rotate(90) translate(-10, -12)"), this.lineRender(), this.meshRender(), this.svg.select(".domain").remove();
}
function lu() {
  const t = D.drag().on("start", (n) => {
    this.__draggingLine = D.select(n.sourceEvent.target), document.body.style.cursor = "col-resize";
  }).on("drag", (n) => {
    if (!this.__draggingLine)
      return;
    const r = n.x, i = n.y, s = this.__draggingLine.datum(), o = Math.round(this.scaleLinear.invert(this.__isX ? r : i));
    this.lines.delete(s), this.__draggingLine.style(this.__isX ? "left" : "top", `${this.scaleLinear(o) - 0.4}px`).datum(o), this.lines.add(this.__draggingLine.datum()), this.tooltip.show().fixed(r + 8, i + 8).html(`${((this.scaleLinear(this.__draggingLine.datum()) - this.scaleLinear(0)) * 100 / (this.__isX ? this.observer.boardDOMRect.width : this.observer.boardDOMRect.width)).toFixed(2)}%`);
  }).on("end", (n) => {
    if (!this.__draggingLine)
      return;
    document.body.style.cursor = "default", this.tooltip.hidden();
    const [r, i] = D.pointer(n, this.observer.root);
    (this.__isX ? r : i) < 20 && (this.lineRemove(this.__draggingLine.datum()), console.log(this.lines)), this.__draggingLine = null;
  }), e = D.select(this.observer.root);
  e.selectAll(`.ruler-line-${this.type}`).remove(), e.selectAll(`div[class=ruler-line-${this.type}]`).data(Array.from(this.lines)).join("div").classed(`ruler-line-${this.type}`, !0).style("position", "absolute").style("width", this.__isX ? "5px" : "auto").style("height", this.__isX ? "auto" : "5px").style("display", "flex").style("justify-content", "center").style("flex-direction", this.__isX ? "row" : "column").style("left", (n) => this.__isX ? `${this.scaleLinear(n) - 0.4}px` : "20px").style("top", (n) => this.__isX ? "20px" : `${this.scaleLinear(n) - 0.4}px`).style("transform", this.__isX ? "translate(-50%, 0)" : "translate(0, -50%)").style("cursor", this.__isX ? "col-resize" : "row-resize").call(t).append("div").style("width", this.__isX ? "1px" : `${this.observer.rootDOMRect.width}px`).style("height", this.__isX ? `${this.observer.rootDOMRect.height}px` : "1px").style("background", "red").style("pointer-events", "none");
}
function _n() {
  this.observer.root.append(this.svg.node()), this.tooltip.mount();
}
class hu {
  constructor() {
    m(this, "container", D.create("div").style("position", "fixed").style("background", "#333").style("color", "#FFF").style("padding", "3px 5px").style("border-radius", "4px").style("pointer-events", "none").style("font-size", "12px").style("display", "none"));
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
    return this.container.style("top", `${n}px`).style("left", `${e}px`), this;
  }
}
function fu() {
  this.observer.root.append(this.mesh.node()), this.mesh.lower();
}
function du() {
  this.mesh.remove();
}
function mu() {
  const t = this.getMainTicks();
  if (Math.abs(t[0] - t[1]) <= 10) {
    this.meshMount();
    const e = this.__isX ? this.observer.rootDOMRect.height : this.observer.rootDOMRect.width, n = this.getSecondaryTicks();
    this.mesh.selectAll("line").data(n).join("svg:line").attr("x1", (r) => this.__isX ? r : 0).attr("y1", (r) => this.__isX ? 0 : r).attr("x2", (r) => this.__isX ? r : e).attr("y2", (r) => this.__isX ? e : r).attr("stroke", "#4DA5C9").attr("stroke-width", 1);
  } else
    this.meshUnmount();
}
class xn {
  constructor(e, n) {
    m(this, "type");
    m(this, "svg");
    m(this, "mesh");
    m(this, "width");
    m(this, "height");
    m(this, "lower");
    m(this, "upper");
    m(this, "scaleLinear");
    m(this, "axis");
    m(this, "lines", /* @__PURE__ */ new Set());
    m(this, "tooltip", new hu());
    m(this, "observer");
    m(this, "__draggingLine", null);
    m(this, "getMainTicks", ou);
    m(this, "getSecondaryTicks", su);
    m(this, "lineAdd", au);
    m(this, "lineRemove", uu);
    m(this, "lineRender", lu);
    m(this, "applyTransform", cu);
    m(this, "mount", _n);
    m(this, "unmount", _n);
    m(this, "meshMount", fu);
    m(this, "meshUnmount", du);
    m(this, "meshRender", mu);
    this.observer = n;
    const r = n.boardCoord, i = Math.max(this.observer.rootDOMRect.width, this.observer.rootDOMRect.height), s = 0;
    this.type = e, this.width = this.__isX ? i : 20, this.height = this.__isX ? 20 : i, this.lower = -r[e], this.upper = i - r[e], this.scaleLinear = D.scaleLinear([this.lower, this.upper], [s, i]), this.axis = (this.__isX ? D.axisBottom(this.scaleLinear) : D.axisRight(this.scaleLinear)).ticks(20).tickSize(10).tickPadding(4), this.svg = D.create("svg:svg").attr("viewbox", [0, 0, this.width, this.height]).attr("width", this.width).attr("height", this.height).style("background", "#DCDCAF").style("position", "absolute").style("left", 0).style("top", 0).call(this.axis), this.svg.on("mousemove", (o) => {
      const [a, c] = D.pointer(o, this.svg);
      this.tooltip.show().fixed(this.__isX ? a + 4 : 24, this.__isX ? 24 : c + 4).html(`${(this.__isX ? Math.round(this.scaleLinear.invert(a)) * 100 / this.observer.boardDOMRect.width : Math.round(this.scaleLinear.invert(c)) * 100 / this.observer.boardDOMRect.height).toFixed(2)}%`);
    }).on("mouseout", () => {
      this.tooltip.hidden();
    }).on("click", (o) => {
      const [a, c] = D.pointer(o, this.svg);
      this.lineAdd(this.__isX ? a : c);
    }), this.mesh = D.create("svg").style("position", "absolute").style("left", 0).style("top", 0).attr("viewbox", [0, 0, this.observer.rootDOMRect.width, this.observer.rootDOMRect.height]).attr("width", this.observer.rootDOMRect.width).attr("height", this.observer.rootDOMRect.height).style("pointer-events", "none"), this.__isX && this.svg.append("rect").attr("x", 0).attr("y", 0).attr("width", 20).attr("height", 20).attr("fill", "#DCDCB4");
  }
  get __isX() {
    return this.type === "x";
  }
}
class gu {
  constructor(e) {
    m(this, "x");
    m(this, "y");
    this.x = new xn("x", e), this.y = new xn("y", e), this.y.mount(), this.x.mount(), this.x.applyTransform({ scale: 1, translateX: 0, translateY: 0 }), this.y.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
  }
}
const pu = {
  name: "ruler",
  install() {
    this.onAfterMount(function() {
      const t = this.observer;
      this.ruler = new gu(t), this.ruler.x.meshUnmount(), this.ruler.y.meshUnmount();
    }), this.onAfterTransform(function() {
      this.ruler.x.applyTransform(this.transform), this.ruler.y.applyTransform(this.transform);
    });
  },
  uninstall() {
    this.ruler.x.unmount(), this.ruler.y.unmount();
  }
}, ut = Symbol("hooks"), Ee = Symbol("plugin");
var wn, vn, Mt;
vn = ut, wn = Ee;
class bu {
  constructor(e, n) {
    m(this, "root");
    m(this, "board");
    m(this, "assist");
    m(this, "transform");
    m(this, "observer");
    m(this, "rect");
    m(this, "manager");
    m(this, "ruler");
    lt(this, Mt);
    m(this, vn);
    m(this, wn);
    m(this, "searchError", Ha);
    m(this, "applyTransform", Wa);
    m(this, "plugin", Ja);
    m(this, "mount", iu);
    m(this, "onAfterTransform", Ua);
    m(this, "onBeforeMount", Ga);
    m(this, "onAfterMount", Ka);
    this.root = Xt.select(e), this.board = Xt.select(n), this.assist = Xt.create("svg:svg"), this.rect = Y.from(n), U(this, Mt, this.rect), this[ut] = new Za(), this[Ee] = new ja(), this.transform = new Va(1, 0, 0), this.manager = new Qa(), this.plugin(pu);
  }
  get selectedRect() {
    return ct(this, Mt);
  }
  set selectedRect(e) {
    U(this, Mt, e), this.searchError();
  }
}
Mt = new WeakMap();
export {
  vu as CommandAddRect,
  yn as CommandMoveRect,
  wu as CommandRemoveRect,
  xu as CompositeCommand,
  Za as Hook,
  gt as HookNames,
  Qa as Manager,
  ru as Observer,
  ja as Plugins,
  Y as Rect,
  Rt as RectType,
  bu as Store,
  Va as Transform,
  Ka as hook_on_after_init,
  Ua as hook_on_after_transform,
  Ga as hook_on_before_init,
  ut as hooks,
  Ee as plugin
};
