var or = Object.defineProperty;
var He = (t) => {
  throw TypeError(t);
};
var ar = (t, e, n) => e in t ? or(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var m = (t, e, n) => ar(t, typeof e != "symbol" ? e + "" : e, n), Ue = (t, e, n) => e.has(t) || He("Cannot " + n);
var lt = (t, e, n) => (Ue(t, e, "read from private field"), n ? n.call(t) : e.get(t)), ht = (t, e, n) => e.has(t) ? He("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), K = (t, e, n, r) => (Ue(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n);
var we = "http://www.w3.org/1999/xhtml";
const Ge = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: we,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function he(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Ge.hasOwnProperty(e) ? { space: Ge[e], local: t } : t;
}
function ur(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === we && e.documentElement.namespaceURI === we ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function cr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Xe(t) {
  var e = he(t);
  return (e.local ? cr : ur)(e);
}
function lr() {
}
function Ce(t) {
  return t == null ? lr : function() {
    return this.querySelector(t);
  };
}
function hr(t) {
  typeof t != "function" && (t = Ce(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = new Array(o), c, u, l = 0; l < o; ++l)
      (c = s[l]) && (u = t.call(c, c.__data__, l, s)) && ("__data__" in c && (u.__data__ = c.__data__), a[l] = u);
  return new H(r, this._parents);
}
function bn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function fr() {
  return [];
}
function Mn(t) {
  return t == null ? fr : function() {
    return this.querySelectorAll(t);
  };
}
function dr(t) {
  return function() {
    return bn(t.apply(this, arguments));
  };
}
function mr(t) {
  typeof t == "function" ? t = dr(t) : t = Mn(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], a = o.length, c, u = 0; u < a; ++u)
      (c = o[u]) && (r.push(t.call(c, c.__data__, u, o)), i.push(c));
  return new H(r, i);
}
function kn(t) {
  return function() {
    return this.matches(t);
  };
}
function Rn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var gr = Array.prototype.find;
function pr(t) {
  return function() {
    return gr.call(this.children, t);
  };
}
function yr() {
  return this.firstElementChild;
}
function _r(t) {
  return this.select(t == null ? yr : pr(typeof t == "function" ? t : Rn(t)));
}
var xr = Array.prototype.filter;
function vr() {
  return Array.from(this.children);
}
function wr(t) {
  return function() {
    return xr.call(this.children, t);
  };
}
function br(t) {
  return this.selectAll(t == null ? vr : wr(typeof t == "function" ? t : Rn(t)));
}
function Mr(t) {
  typeof t != "function" && (t = kn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], c, u = 0; u < o; ++u)
      (c = s[u]) && t.call(c, c.__data__, u, s) && a.push(c);
  return new H(r, this._parents);
}
function An(t) {
  return new Array(t.length);
}
function kr() {
  return new H(this._enter || this._groups.map(An), this._parents);
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
function Ar(t, e, n, r, i, s) {
  for (var o = 0, a, c = e.length, u = s.length; o < u; ++o)
    (a = e[o]) ? (a.__data__ = s[o], r[o] = a) : n[o] = new te(t, s[o]);
  for (; o < c; ++o)
    (a = e[o]) && (i[o] = a);
}
function Sr(t, e, n, r, i, s, o) {
  var a, c, u = /* @__PURE__ */ new Map(), l = e.length, d = s.length, h = new Array(l), g;
  for (a = 0; a < l; ++a)
    (c = e[a]) && (h[a] = g = o.call(c, c.__data__, a, e) + "", u.has(g) ? i[a] = c : u.set(g, c));
  for (a = 0; a < d; ++a)
    g = o.call(t, s[a], a, s) + "", (c = u.get(g)) ? (r[a] = c, c.__data__ = s[a], u.delete(g)) : n[a] = new te(t, s[a]);
  for (a = 0; a < l; ++a)
    (c = e[a]) && u.get(h[a]) === c && (i[a] = c);
}
function Er(t) {
  return t.__data__;
}
function $r(t, e) {
  if (!arguments.length) return Array.from(this, Er);
  var n = e ? Sr : Ar, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Rr(t));
  for (var s = i.length, o = new Array(s), a = new Array(s), c = new Array(s), u = 0; u < s; ++u) {
    var l = r[u], d = i[u], h = d.length, g = Tr(t.call(l, l && l.__data__, u, r)), M = g.length, A = a[u] = new Array(M), T = o[u] = new Array(M), v = c[u] = new Array(h);
    n(l, d, A, T, v, g, e);
    for (var D = 0, N = 0, y, w; D < M; ++D)
      if (y = A[D]) {
        for (D >= N && (N = D + 1); !(w = T[N]) && ++N < M; ) ;
        y._next = w || null;
      }
  }
  return o = new H(o, r), o._enter = a, o._exit = c, o;
}
function Tr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Nr() {
  return new H(this._exit || this._groups.map(An), this._parents);
}
function Dr(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Xr(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), a = new Array(i), c = 0; c < o; ++c)
    for (var u = n[c], l = r[c], d = u.length, h = a[c] = new Array(d), g, M = 0; M < d; ++M)
      (g = u[M] || l[M]) && (h[M] = g);
  for (; c < i; ++c)
    a[c] = n[c];
  return new H(a, this._parents);
}
function Cr() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function zr(t) {
  t || (t = Lr);
  function e(d, h) {
    return d && h ? t(d.__data__, h.__data__) : !d - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], a = o.length, c = i[s] = new Array(a), u, l = 0; l < a; ++l)
      (u = o[l]) && (c[l] = u);
    c.sort(e);
  }
  return new H(i, this._parents).order();
}
function Lr(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Or() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Ir() {
  return Array.from(this);
}
function Pr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function Fr() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Yr() {
  return !this.node();
}
function Br(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, a; s < o; ++s)
      (a = i[s]) && t.call(a, a.__data__, s, i);
  return this;
}
function qr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Vr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Hr(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ur(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Gr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Kr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Wr(t, e) {
  var n = he(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Vr : qr : typeof e == "function" ? n.local ? Kr : Gr : n.local ? Ur : Hr)(n, e));
}
function Sn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Zr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Qr(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Jr(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function jr(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Zr : typeof e == "function" ? Jr : Qr)(t, e, n ?? "")) : kt(this.node(), t);
}
function kt(t, e) {
  return t.style.getPropertyValue(e) || Sn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ti(t) {
  return function() {
    delete this[t];
  };
}
function ei(t, e) {
  return function() {
    this[t] = e;
  };
}
function ni(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ri(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ti : typeof e == "function" ? ni : ei)(t, e)) : this.node()[t];
}
function En(t) {
  return t.trim().split(/^|\s+/);
}
function ze(t) {
  return t.classList || new $n(t);
}
function $n(t) {
  this._node = t, this._names = En(t.getAttribute("class") || "");
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
function Nn(t, e) {
  for (var n = ze(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function ii(t) {
  return function() {
    Tn(this, t);
  };
}
function si(t) {
  return function() {
    Nn(this, t);
  };
}
function oi(t, e) {
  return function() {
    (e.apply(this, arguments) ? Tn : Nn)(this, t);
  };
}
function ai(t, e) {
  var n = En(t + "");
  if (arguments.length < 2) {
    for (var r = ze(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? oi : e ? ii : si)(n, e));
}
function ui() {
  this.textContent = "";
}
function ci(t) {
  return function() {
    this.textContent = t;
  };
}
function li(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function hi(t) {
  return arguments.length ? this.each(t == null ? ui : (typeof t == "function" ? li : ci)(t)) : this.node().textContent;
}
function fi() {
  this.innerHTML = "";
}
function di(t) {
  return function() {
    this.innerHTML = t;
  };
}
function mi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function gi(t) {
  return arguments.length ? this.each(t == null ? fi : (typeof t == "function" ? mi : di)(t)) : this.node().innerHTML;
}
function pi() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function yi() {
  return this.each(pi);
}
function _i() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function xi() {
  return this.each(_i);
}
function vi(t) {
  var e = typeof t == "function" ? t : Xe(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function wi() {
  return null;
}
function bi(t, e) {
  var n = typeof t == "function" ? t : Xe(t), r = e == null ? wi : typeof e == "function" ? e : Ce(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Mi() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ki() {
  return this.each(Mi);
}
function Ri() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ai() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Si(t) {
  return this.select(t ? Ai : Ri);
}
function Ei(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function $i(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ti(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Ni(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Di(t, e, n) {
  return function() {
    var r = this.__on, i, s = $i(e);
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
function Xi(t, e, n) {
  var r = Ti(t + ""), i, s = r.length, o;
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
  for (a = e ? Di : Ni, i = 0; i < s; ++i) this.each(a(r[i], e, n));
  return this;
}
function Dn(t, e, n) {
  var r = Sn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Ci(t, e) {
  return function() {
    return Dn(this, t, e);
  };
}
function zi(t, e) {
  return function() {
    return Dn(this, t, e.apply(this, arguments));
  };
}
function Li(t, e) {
  return this.each((typeof e == "function" ? zi : Ci)(t, e));
}
function* Oi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var Le = [null];
function H(t, e) {
  this._groups = t, this._parents = e;
}
function Pt() {
  return new H([[document.documentElement]], Le);
}
function Ii() {
  return this;
}
H.prototype = Pt.prototype = {
  constructor: H,
  select: hr,
  selectAll: mr,
  selectChild: _r,
  selectChildren: br,
  filter: Mr,
  data: $r,
  enter: kr,
  exit: Nr,
  join: Dr,
  merge: Xr,
  selection: Ii,
  order: Cr,
  sort: zr,
  call: Or,
  nodes: Ir,
  node: Pr,
  size: Fr,
  empty: Yr,
  each: Br,
  attr: Wr,
  style: jr,
  property: ri,
  classed: ai,
  text: hi,
  html: gi,
  raise: yi,
  lower: xi,
  append: vi,
  insert: bi,
  remove: ki,
  clone: Si,
  datum: Ei,
  on: Xi,
  dispatch: Li,
  [Symbol.iterator]: Oi
};
function W(t) {
  return typeof t == "string" ? new H([[document.querySelector(t)]], [document.documentElement]) : new H([[t]], Le);
}
function Xn(t) {
  return W(Xe(t).call(document.documentElement));
}
function Pi(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function J(t, e) {
  if (t = Pi(t), e === void 0 && (e = t.currentTarget), e) {
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
function Fi(t) {
  return typeof t == "string" ? new H([document.querySelectorAll(t)], [document.documentElement]) : new H([bn(t)], Le);
}
var Yi = { value: () => {
} };
function fe() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Gt(n);
}
function Gt(t) {
  this._ = t;
}
function Bi(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Gt.prototype = fe.prototype = {
  constructor: Gt,
  on: function(t, e) {
    var n = this._, r = Bi(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (t = r[s]).type) && (i = qi(n[i], t.name))) return i;
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
function qi(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Ke(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Yi, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const Vi = { passive: !1 }, Ct = { capture: !0, passive: !1 };
function ye(t) {
  t.stopImmediatePropagation();
}
function yt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Cn(t) {
  var e = t.document.documentElement, n = W(t).on("dragstart.drag", yt, Ct);
  "onselectstart" in e ? n.on("selectstart.drag", yt, Ct) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function zn(t, e) {
  var n = t.document.documentElement, r = W(t).on("dragstart.drag", null);
  e && (r.on("click.drag", yt, Ct), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Yt = (t) => () => t;
function be(t, {
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
be.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Hi(t) {
  return !t.ctrlKey && !t.button;
}
function Ui() {
  return this.parentNode;
}
function Gi(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function Ki() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ln() {
  var t = Hi, e = Ui, n = Gi, r = Ki, i = {}, s = fe("start", "drag", "end"), o = 0, a, c, u, l, d = 0;
  function h(y) {
    y.on("mousedown.drag", g).filter(r).on("touchstart.drag", T).on("touchmove.drag", v, Vi).on("touchend.drag touchcancel.drag", D).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function g(y, w) {
    if (!(l || !t.call(this, y, w))) {
      var E = N(this, e.call(this, y, w), y, w, "mouse");
      E && (W(y.view).on("mousemove.drag", M, Ct).on("mouseup.drag", A, Ct), Cn(y.view), ye(y), u = !1, a = y.clientX, c = y.clientY, E("start", y));
    }
  }
  function M(y) {
    if (yt(y), !u) {
      var w = y.clientX - a, E = y.clientY - c;
      u = w * w + E * E > d;
    }
    i.mouse("drag", y);
  }
  function A(y) {
    W(y.view).on("mousemove.drag mouseup.drag", null), zn(y.view, u), yt(y), i.mouse("end", y);
  }
  function T(y, w) {
    if (t.call(this, y, w)) {
      var E = y.changedTouches, $ = e.call(this, y, w), C = E.length, Y, B;
      for (Y = 0; Y < C; ++Y)
        (B = N(this, $, y, w, E[Y].identifier, E[Y])) && (ye(y), B("start", y, E[Y]));
    }
  }
  function v(y) {
    var w = y.changedTouches, E = w.length, $, C;
    for ($ = 0; $ < E; ++$)
      (C = i[w[$].identifier]) && (yt(y), C("drag", y, w[$]));
  }
  function D(y) {
    var w = y.changedTouches, E = w.length, $, C;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), $ = 0; $ < E; ++$)
      (C = i[w[$].identifier]) && (ye(y), C("end", y, w[$]));
  }
  function N(y, w, E, $, C, Y) {
    var B = s.copy(), b = J(Y || E, w), O, z, f;
    if ((f = n.call(y, new be("beforestart", {
      sourceEvent: E,
      target: h,
      identifier: C,
      active: o,
      x: b[0],
      y: b[1],
      dx: 0,
      dy: 0,
      dispatch: B
    }), $)) != null)
      return O = f.x - b[0] || 0, z = f.y - b[1] || 0, function _(p, x, R) {
        var k = b, S;
        switch (p) {
          case "start":
            i[C] = _, S = o++;
            break;
          case "end":
            delete i[C], --o;
          // falls through
          case "drag":
            b = J(R || x, w), S = o;
            break;
        }
        B.call(
          p,
          y,
          new be(p, {
            sourceEvent: x,
            subject: f,
            target: h,
            identifier: C,
            active: S,
            x: b[0] + O,
            y: b[1] + z,
            dx: b[0] - k[0],
            dy: b[1] - k[1],
            dispatch: B
          }),
          $
        );
      };
  }
  return h.filter = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : Yt(!!y), h) : t;
  }, h.container = function(y) {
    return arguments.length ? (e = typeof y == "function" ? y : Yt(y), h) : e;
  }, h.subject = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : Yt(y), h) : n;
  }, h.touchable = function(y) {
    return arguments.length ? (r = typeof y == "function" ? y : Yt(!!y), h) : r;
  }, h.on = function() {
    var y = s.on.apply(s, arguments);
    return y === s ? h : y;
  }, h.clickDistance = function(y) {
    return arguments.length ? (d = (y = +y) * y, h) : Math.sqrt(d);
  }, h;
}
function Wi(t) {
  return t;
}
var Kt = 1, Wt = 2, Me = 3, Tt = 4, We = 1e-6;
function Zi(t) {
  return "translate(" + t + ",0)";
}
function Qi(t) {
  return "translate(0," + t + ")";
}
function Ji(t) {
  return (e) => +t(e);
}
function ji(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function ts() {
  return !this.__axis;
}
function de(t, e) {
  var n = [], r = null, i = null, s = 6, o = 6, a = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, u = t === Kt || t === Tt ? -1 : 1, l = t === Tt || t === Wt ? "x" : "y", d = t === Kt || t === Me ? Zi : Qi;
  function h(g) {
    var M = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), A = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Wi), T = Math.max(s, 0) + a, v = e.range(), D = +v[0] + c, N = +v[v.length - 1] + c, y = (e.bandwidth ? ji : Ji)(e.copy(), c), w = g.selection ? g.selection() : g, E = w.selectAll(".domain").data([null]), $ = w.selectAll(".tick").data(M, e).order(), C = $.exit(), Y = $.enter().append("g").attr("class", "tick"), B = $.select("line"), b = $.select("text");
    E = E.merge(E.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), $ = $.merge(Y), B = B.merge(Y.append("line").attr("stroke", "currentColor").attr(l + "2", u * s)), b = b.merge(Y.append("text").attr("fill", "currentColor").attr(l, u * T).attr("dy", t === Kt ? "0em" : t === Me ? "0.71em" : "0.32em")), g !== w && (E = E.transition(g), $ = $.transition(g), B = B.transition(g), b = b.transition(g), C = C.transition(g).attr("opacity", We).attr("transform", function(O) {
      return isFinite(O = y(O)) ? d(O + c) : this.getAttribute("transform");
    }), Y.attr("opacity", We).attr("transform", function(O) {
      var z = this.parentNode.__axis;
      return d((z && isFinite(z = z(O)) ? z : y(O)) + c);
    })), C.remove(), E.attr("d", t === Tt || t === Wt ? o ? "M" + u * o + "," + D + "H" + c + "V" + N + "H" + u * o : "M" + c + "," + D + "V" + N : o ? "M" + D + "," + u * o + "V" + c + "H" + N + "V" + u * o : "M" + D + "," + c + "H" + N), $.attr("opacity", 1).attr("transform", function(O) {
      return d(y(O) + c);
    }), B.attr(l + "2", u * s), b.attr(l, u * T).text(A), w.filter(ts).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Wt ? "start" : t === Tt ? "end" : "middle"), w.each(function() {
      this.__axis = y;
    });
  }
  return h.scale = function(g) {
    return arguments.length ? (e = g, h) : e;
  }, h.ticks = function() {
    return n = Array.from(arguments), h;
  }, h.tickArguments = function(g) {
    return arguments.length ? (n = g == null ? [] : Array.from(g), h) : n.slice();
  }, h.tickValues = function(g) {
    return arguments.length ? (r = g == null ? null : Array.from(g), h) : r && r.slice();
  }, h.tickFormat = function(g) {
    return arguments.length ? (i = g, h) : i;
  }, h.tickSize = function(g) {
    return arguments.length ? (s = o = +g, h) : s;
  }, h.tickSizeInner = function(g) {
    return arguments.length ? (s = +g, h) : s;
  }, h.tickSizeOuter = function(g) {
    return arguments.length ? (o = +g, h) : o;
  }, h.tickPadding = function(g) {
    return arguments.length ? (a = +g, h) : a;
  }, h.offset = function(g) {
    return arguments.length ? (c = +g, h) : c;
  }, h;
}
function es(t) {
  return de(Kt, t);
}
function On(t) {
  return de(Wt, t);
}
function In(t) {
  return de(Me, t);
}
function ns(t) {
  return de(Tt, t);
}
function Oe(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Pn(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Ft() {
}
var zt = 0.7, ee = 1 / zt, _t = "\\s*([+-]?\\d+)\\s*", Lt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", rt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", rs = /^#([0-9a-f]{3,8})$/, is = new RegExp(`^rgb\\(${_t},${_t},${_t}\\)$`), ss = new RegExp(`^rgb\\(${rt},${rt},${rt}\\)$`), os = new RegExp(`^rgba\\(${_t},${_t},${_t},${Lt}\\)$`), as = new RegExp(`^rgba\\(${rt},${rt},${rt},${Lt}\\)$`), us = new RegExp(`^hsl\\(${Lt},${rt},${rt}\\)$`), cs = new RegExp(`^hsla\\(${Lt},${rt},${rt},${Lt}\\)$`), Ze = {
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
Oe(Ft, mt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Qe,
  // Deprecated! Use color.formatHex.
  formatHex: Qe,
  formatHex8: ls,
  formatHsl: hs,
  formatRgb: Je,
  toString: Je
});
function Qe() {
  return this.rgb().formatHex();
}
function ls() {
  return this.rgb().formatHex8();
}
function hs() {
  return Fn(this).formatHsl();
}
function Je() {
  return this.rgb().formatRgb();
}
function mt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = rs.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? je(e) : n === 3 ? new U(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Bt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Bt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = is.exec(t)) ? new U(e[1], e[2], e[3], 1) : (e = ss.exec(t)) ? new U(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = os.exec(t)) ? Bt(e[1], e[2], e[3], e[4]) : (e = as.exec(t)) ? Bt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = us.exec(t)) ? nn(e[1], e[2] / 100, e[3] / 100, 1) : (e = cs.exec(t)) ? nn(e[1], e[2] / 100, e[3] / 100, e[4]) : Ze.hasOwnProperty(t) ? je(Ze[t]) : t === "transparent" ? new U(NaN, NaN, NaN, 0) : null;
}
function je(t) {
  return new U(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Bt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new U(t, e, n, r);
}
function fs(t) {
  return t instanceof Ft || (t = mt(t)), t ? (t = t.rgb(), new U(t.r, t.g, t.b, t.opacity)) : new U();
}
function ke(t, e, n, r) {
  return arguments.length === 1 ? fs(t) : new U(t, e, n, r ?? 1);
}
function U(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Oe(U, ke, Pn(Ft, {
  brighter(t) {
    return t = t == null ? ee : Math.pow(ee, t), new U(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zt : Math.pow(zt, t), new U(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new U(dt(this.r), dt(this.g), dt(this.b), ne(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: tn,
  // Deprecated! Use color.formatHex.
  formatHex: tn,
  formatHex8: ds,
  formatRgb: en,
  toString: en
}));
function tn() {
  return `#${ft(this.r)}${ft(this.g)}${ft(this.b)}`;
}
function ds() {
  return `#${ft(this.r)}${ft(this.g)}${ft(this.b)}${ft((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
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
function ft(t) {
  return t = dt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function nn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new tt(t, e, n, r);
}
function Fn(t) {
  if (t instanceof tt) return new tt(t.h, t.s, t.l, t.opacity);
  if (t instanceof Ft || (t = mt(t)), !t) return new tt();
  if (t instanceof tt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, a = s - i, c = (s + i) / 2;
  return a ? (e === s ? o = (n - r) / a + (n < r) * 6 : n === s ? o = (r - e) / a + 2 : o = (e - n) / a + 4, a /= c < 0.5 ? s + i : 2 - s - i, o *= 60) : a = c > 0 && c < 1 ? 0 : o, new tt(o, a, c, t.opacity);
}
function ms(t, e, n, r) {
  return arguments.length === 1 ? Fn(t) : new tt(t, e, n, r ?? 1);
}
function tt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Oe(tt, ms, Pn(Ft, {
  brighter(t) {
    return t = t == null ? ee : Math.pow(ee, t), new tt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zt : Math.pow(zt, t), new tt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new U(
      _e(t >= 240 ? t - 240 : t + 120, i, r),
      _e(t, i, r),
      _e(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new tt(rn(this.h), qt(this.s), qt(this.l), ne(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ne(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${rn(this.h)}, ${qt(this.s) * 100}%, ${qt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function rn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function qt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function _e(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Ie = (t) => () => t;
function gs(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function ps(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function ys(t) {
  return (t = +t) == 1 ? Yn : function(e, n) {
    return n - e ? ps(e, n, t) : Ie(isNaN(e) ? n : e);
  };
}
function Yn(t, e) {
  var n = e - t;
  return n ? gs(t, n) : Ie(isNaN(t) ? e : t);
}
const re = function t(e) {
  var n = ys(e);
  function r(i, s) {
    var o = n((i = ke(i)).r, (s = ke(s)).r), a = n(i.g, s.g), c = n(i.b, s.b), u = Yn(i.opacity, s.opacity);
    return function(l) {
      return i.r = o(l), i.g = a(l), i.b = c(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function _s(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function xs(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function vs(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = Pe(t[o], e[o]);
  for (; o < n; ++o) s[o] = e[o];
  return function(a) {
    for (o = 0; o < r; ++o) s[o] = i[o](a);
    return s;
  };
}
function ws(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function j(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function bs(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Pe(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var Re = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, xe = new RegExp(Re.source, "g");
function Ms(t) {
  return function() {
    return t;
  };
}
function ks(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Bn(t, e) {
  var n = Re.lastIndex = xe.lastIndex = 0, r, i, s, o = -1, a = [], c = [];
  for (t = t + "", e = e + ""; (r = Re.exec(t)) && (i = xe.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), a[o] ? a[o] += s : a[++o] = s), (r = r[0]) === (i = i[0]) ? a[o] ? a[o] += i : a[++o] = i : (a[++o] = null, c.push({ i: o, x: j(r, i) })), n = xe.lastIndex;
  return n < e.length && (s = e.slice(n), a[o] ? a[o] += s : a[++o] = s), a.length < 2 ? c[0] ? ks(c[0].x) : Ms(e) : (e = c.length, function(u) {
    for (var l = 0, d; l < e; ++l) a[(d = c[l]).i] = d.x(u);
    return a.join("");
  });
}
function Pe(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Ie(e) : (n === "number" ? j : n === "string" ? (r = mt(e)) ? (e = r, re) : Bn : e instanceof mt ? re : e instanceof Date ? ws : xs(e) ? _s : Array.isArray(e) ? vs : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? bs : j)(t, e);
}
function Rs(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var sn = 180 / Math.PI, Ae = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function qn(t, e, n, r, i, s) {
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
var Vt;
function As(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ae : qn(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Ss(t) {
  return t == null || (Vt || (Vt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Vt.setAttribute("transform", t), !(t = Vt.transform.baseVal.consolidate())) ? Ae : (t = t.matrix, qn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Vn(t, e, n, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function s(u, l, d, h, g, M) {
    if (u !== d || l !== h) {
      var A = g.push("translate(", null, e, null, n);
      M.push({ i: A - 4, x: j(u, d) }, { i: A - 2, x: j(l, h) });
    } else (d || h) && g.push("translate(" + d + e + h + n);
  }
  function o(u, l, d, h) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), h.push({ i: d.push(i(d) + "rotate(", null, r) - 2, x: j(u, l) })) : l && d.push(i(d) + "rotate(" + l + r);
  }
  function a(u, l, d, h) {
    u !== l ? h.push({ i: d.push(i(d) + "skewX(", null, r) - 2, x: j(u, l) }) : l && d.push(i(d) + "skewX(" + l + r);
  }
  function c(u, l, d, h, g, M) {
    if (u !== d || l !== h) {
      var A = g.push(i(g) + "scale(", null, ",", null, ")");
      M.push({ i: A - 4, x: j(u, d) }, { i: A - 2, x: j(l, h) });
    } else (d !== 1 || h !== 1) && g.push(i(g) + "scale(" + d + "," + h + ")");
  }
  return function(u, l) {
    var d = [], h = [];
    return u = t(u), l = t(l), s(u.translateX, u.translateY, l.translateX, l.translateY, d, h), o(u.rotate, l.rotate, d, h), a(u.skewX, l.skewX, d, h), c(u.scaleX, u.scaleY, l.scaleX, l.scaleY, d, h), u = l = null, function(g) {
      for (var M = -1, A = h.length, T; ++M < A; ) d[(T = h[M]).i] = T.x(g);
      return d.join("");
    };
  };
}
var Es = Vn(As, "px, ", "px)", "deg)"), $s = Vn(Ss, ", ", ")", ")"), Ts = 1e-12;
function on(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Ns(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Ds(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Xs = function t(e, n, r) {
  function i(s, o) {
    var a = s[0], c = s[1], u = s[2], l = o[0], d = o[1], h = o[2], g = l - a, M = d - c, A = g * g + M * M, T, v;
    if (A < Ts)
      v = Math.log(h / u) / e, T = function($) {
        return [
          a + $ * g,
          c + $ * M,
          u * Math.exp(e * $ * v)
        ];
      };
    else {
      var D = Math.sqrt(A), N = (h * h - u * u + r * A) / (2 * u * n * D), y = (h * h - u * u - r * A) / (2 * h * n * D), w = Math.log(Math.sqrt(N * N + 1) - N), E = Math.log(Math.sqrt(y * y + 1) - y);
      v = (E - w) / e, T = function($) {
        var C = $ * v, Y = on(w), B = u / (n * D) * (Y * Ds(e * C + w) - Ns(w));
        return [
          a + B * g,
          c + B * M,
          u * Y / on(e * C + w)
        ];
      };
    }
    return T.duration = v * 1e3 * e / Math.SQRT2, T;
  }
  return i.rho = function(s) {
    var o = Math.max(1e-3, +s), a = o * o, c = a * a;
    return t(o, a, c);
  }, i;
}(Math.SQRT2, 2, 4);
var Rt = 0, Nt = 0, Et = 0, Hn = 1e3, ie, Dt, se = 0, gt = 0, me = 0, Ot = typeof performance == "object" && performance.now ? performance : Date, Un = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Fe() {
  return gt || (Un(Cs), gt = Ot.now() + me);
}
function Cs() {
  gt = 0;
}
function oe() {
  this._call = this._time = this._next = null;
}
oe.prototype = Gn.prototype = {
  constructor: oe,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Fe() : +n) + (e == null ? 0 : +e), !this._next && Dt !== this && (Dt ? Dt._next = this : ie = this, Dt = this), this._call = t, this._time = n, Se();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Se());
  }
};
function Gn(t, e, n) {
  var r = new oe();
  return r.restart(t, e, n), r;
}
function zs() {
  Fe(), ++Rt;
  for (var t = ie, e; t; )
    (e = gt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Rt;
}
function an() {
  gt = (se = Ot.now()) + me, Rt = Nt = 0;
  try {
    zs();
  } finally {
    Rt = 0, Os(), gt = 0;
  }
}
function Ls() {
  var t = Ot.now(), e = t - se;
  e > Hn && (me -= e, se = t);
}
function Os() {
  for (var t, e = ie, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ie = n);
  Dt = t, Se(r);
}
function Se(t) {
  if (!Rt) {
    Nt && (Nt = clearTimeout(Nt));
    var e = t - gt;
    e > 24 ? (t < 1 / 0 && (Nt = setTimeout(an, t - Ot.now() - me)), Et && (Et = clearInterval(Et))) : (Et || (se = Ot.now(), Et = setInterval(Ls, Hn)), Rt = 1, Un(an));
  }
}
function un(t, e, n) {
  var r = new oe();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Is = fe("start", "end", "cancel", "interrupt"), Ps = [], Kn = 0, cn = 1, Ee = 2, Zt = 3, ln = 4, $e = 5, Qt = 6;
function ge(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  Fs(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Is,
    tween: Ps,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Kn
  });
}
function Ye(t, e) {
  var n = et(t, e);
  if (n.state > Kn) throw new Error("too late; already scheduled");
  return n;
}
function it(t, e) {
  var n = et(t, e);
  if (n.state > Zt) throw new Error("too late; already running");
  return n;
}
function et(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Fs(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Gn(s, 0, n.time);
  function s(u) {
    n.state = cn, n.timer.restart(o, n.delay, n.time), n.delay <= u && o(u - n.delay);
  }
  function o(u) {
    var l, d, h, g;
    if (n.state !== cn) return c();
    for (l in r)
      if (g = r[l], g.name === n.name) {
        if (g.state === Zt) return un(o);
        g.state === ln ? (g.state = Qt, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[l]) : +l < e && (g.state = Qt, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[l]);
      }
    if (un(function() {
      n.state === Zt && (n.state = ln, n.timer.restart(a, n.delay, n.time), a(u));
    }), n.state = Ee, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Ee) {
      for (n.state = Zt, i = new Array(h = n.tween.length), l = 0, d = -1; l < h; ++l)
        (g = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++d] = g);
      i.length = d + 1;
    }
  }
  function a(u) {
    for (var l = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = $e, 1), d = -1, h = i.length; ++d < h; )
      i[d].call(t, l);
    n.state === $e && (n.on.call("end", t, t.__data__, n.index, n.group), c());
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
      i = r.state > Ee && r.state < $e, r.state = Qt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function Ys(t) {
  return this.each(function() {
    Jt(this, t);
  });
}
function Bs(t, e) {
  var n, r;
  return function() {
    var i = it(this, t), s = i.tween;
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
function qs(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = it(this, t), o = s.tween;
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
function Vs(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = et(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Bs : qs)(n, t, e));
}
function Be(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = it(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return et(i, r).value[e];
  };
}
function Wn(t, e) {
  var n;
  return (typeof e == "number" ? j : e instanceof mt ? re : (n = mt(e)) ? (e = n, re) : Bn)(t, e);
}
function Hs(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Us(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Gs(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Ks(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Ws(t, e, n) {
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
function Qs(t, e) {
  var n = he(t), r = n === "transform" ? $s : Wn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Zs : Ws)(n, r, Be(this, "attr." + t, e)) : e == null ? (n.local ? Us : Hs)(n) : (n.local ? Ks : Gs)(n, r, e));
}
function Js(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function js(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function to(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && js(t, s)), n;
  }
  return i._value = e, i;
}
function eo(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Js(t, s)), n;
  }
  return i._value = e, i;
}
function no(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = he(t);
  return this.tween(n, (r.local ? to : eo)(r, e));
}
function ro(t, e) {
  return function() {
    Ye(this, t).delay = +e.apply(this, arguments);
  };
}
function io(t, e) {
  return e = +e, function() {
    Ye(this, t).delay = e;
  };
}
function so(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ro : io)(e, t)) : et(this.node(), e).delay;
}
function oo(t, e) {
  return function() {
    it(this, t).duration = +e.apply(this, arguments);
  };
}
function ao(t, e) {
  return e = +e, function() {
    it(this, t).duration = e;
  };
}
function uo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? oo : ao)(e, t)) : et(this.node(), e).duration;
}
function co(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    it(this, t).ease = e;
  };
}
function lo(t) {
  var e = this._id;
  return arguments.length ? this.each(co(e, t)) : et(this.node(), e).ease;
}
function ho(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    it(this, t).ease = n;
  };
}
function fo(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ho(this._id, t));
}
function mo(t) {
  typeof t != "function" && (t = kn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], c, u = 0; u < o; ++u)
      (c = s[u]) && t.call(c, c.__data__, u, s) && a.push(c);
  return new ct(r, this._parents, this._name, this._id);
}
function go(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), a = 0; a < s; ++a)
    for (var c = e[a], u = n[a], l = c.length, d = o[a] = new Array(l), h, g = 0; g < l; ++g)
      (h = c[g] || u[g]) && (d[g] = h);
  for (; a < r; ++a)
    o[a] = e[a];
  return new ct(o, this._parents, this._name, this._id);
}
function po(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function yo(t, e, n) {
  var r, i, s = po(e) ? Ye : it;
  return function() {
    var o = s(this, t), a = o.on;
    a !== r && (i = (r = a).copy()).on(e, n), o.on = i;
  };
}
function _o(t, e) {
  var n = this._id;
  return arguments.length < 2 ? et(this.node(), n).on.on(t) : this.each(yo(n, t, e));
}
function xo(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function vo() {
  return this.on("end.remove", xo(this._id));
}
function wo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ce(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = r[o], c = a.length, u = s[o] = new Array(c), l, d, h = 0; h < c; ++h)
      (l = a[h]) && (d = t.call(l, l.__data__, h, a)) && ("__data__" in l && (d.__data__ = l.__data__), u[h] = d, ge(u[h], e, n, h, u, et(l, n)));
  return new ct(s, this._parents, e, n);
}
function bo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Mn(t));
  for (var r = this._groups, i = r.length, s = [], o = [], a = 0; a < i; ++a)
    for (var c = r[a], u = c.length, l, d = 0; d < u; ++d)
      if (l = c[d]) {
        for (var h = t.call(l, l.__data__, d, c), g, M = et(l, n), A = 0, T = h.length; A < T; ++A)
          (g = h[A]) && ge(g, e, n, A, h, M);
        s.push(h), o.push(l);
      }
  return new ct(s, o, e, n);
}
var Mo = Pt.prototype.constructor;
function ko() {
  return new Mo(this._groups, this._parents);
}
function Ro(t, e) {
  var n, r, i;
  return function() {
    var s = kt(this, t), o = (this.style.removeProperty(t), kt(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function Zn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ao(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = kt(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function So(t, e, n) {
  var r, i, s;
  return function() {
    var o = kt(this, t), a = n(this), c = a + "";
    return a == null && (c = a = (this.style.removeProperty(t), kt(this, t))), o === c ? null : o === r && c === i ? s : (i = c, s = e(r = o, a));
  };
}
function Eo(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, a;
  return function() {
    var c = it(this, t), u = c.on, l = c.value[s] == null ? a || (a = Zn(e)) : void 0;
    (u !== n || i !== l) && (r = (n = u).copy()).on(o, i = l), c.on = r;
  };
}
function $o(t, e, n) {
  var r = (t += "") == "transform" ? Es : Wn;
  return e == null ? this.styleTween(t, Ro(t, r)).on("end.style." + t, Zn(t)) : typeof e == "function" ? this.styleTween(t, So(t, r, Be(this, "style." + t, e))).each(Eo(this._id, t)) : this.styleTween(t, Ao(t, r, e), n).on("end.style." + t, null);
}
function To(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function No(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && To(t, o, n)), r;
  }
  return s._value = e, s;
}
function Do(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, No(t, e, n ?? ""));
}
function Xo(t) {
  return function() {
    this.textContent = t;
  };
}
function Co(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function zo(t) {
  return this.tween("text", typeof t == "function" ? Co(Be(this, "text", t)) : Xo(t == null ? "" : t + ""));
}
function Lo(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Oo(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Lo(i)), e;
  }
  return r._value = t, r;
}
function Io(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Oo(t));
}
function Po() {
  for (var t = this._name, e = this._id, n = Qn(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], a = o.length, c, u = 0; u < a; ++u)
      if (c = o[u]) {
        var l = et(c, e);
        ge(c, t, n, u, o, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new ct(r, this._parents, t, n);
}
function Fo() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var a = { value: o }, c = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var u = it(this, r), l = u.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(c)), u.on = e;
    }), i === 0 && s();
  });
}
var Yo = 0;
function ct(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Qn() {
  return ++Yo;
}
var at = Pt.prototype;
ct.prototype = {
  constructor: ct,
  select: wo,
  selectAll: bo,
  selectChild: at.selectChild,
  selectChildren: at.selectChildren,
  filter: mo,
  merge: go,
  selection: ko,
  transition: Po,
  call: at.call,
  nodes: at.nodes,
  node: at.node,
  size: at.size,
  empty: at.empty,
  each: at.each,
  on: _o,
  attr: Qs,
  attrTween: no,
  style: $o,
  styleTween: Do,
  text: zo,
  textTween: Io,
  remove: vo,
  tween: Vs,
  delay: so,
  duration: uo,
  ease: lo,
  easeVarying: fo,
  end: Fo,
  [Symbol.iterator]: at[Symbol.iterator]
};
function Bo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var qo = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Bo
};
function Vo(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Ho(t) {
  var e, n;
  t instanceof ct ? (e = t._id, t = t._name) : (e = Qn(), (n = qo).time = Fe(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], a = o.length, c, u = 0; u < a; ++u)
      (c = o[u]) && ge(c, t, e, u, o, n || Vo(c, e));
  return new ct(r, this._parents, t, e);
}
Pt.prototype.interrupt = Ys;
Pt.prototype.transition = Ho;
const Ht = (t) => () => t;
function Uo(t, {
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
function ut(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
ut.prototype = {
  constructor: ut,
  scale: function(t) {
    return t === 1 ? this : new ut(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new ut(this.k, this.x + this.k * t, this.y + this.k * e);
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
var Jn = new ut(1, 0, 0);
ut.prototype;
function ve(t) {
  t.stopImmediatePropagation();
}
function $t(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Go(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function Ko() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function hn() {
  return this.__zoom || Jn;
}
function Wo(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function Zo() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Qo(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], s = t.invertY(e[0][1]) - n[0][1], o = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function Jo() {
  var t = Go, e = Ko, n = Qo, r = Wo, i = Zo, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, c = Xs, u = fe("start", "zoom", "end"), l, d, h, g = 500, M = 150, A = 0, T = 10;
  function v(f) {
    f.property("__zoom", hn).on("wheel.zoom", C, { passive: !1 }).on("mousedown.zoom", Y).on("dblclick.zoom", B).filter(i).on("touchstart.zoom", b).on("touchmove.zoom", O).on("touchend.zoom touchcancel.zoom", z).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  v.transform = function(f, _, p, x) {
    var R = f.selection ? f.selection() : f;
    R.property("__zoom", hn), f !== R ? w(f, _, p, x) : R.interrupt().each(function() {
      E(this, arguments).event(x).start().zoom(null, typeof _ == "function" ? _.apply(this, arguments) : _).end();
    });
  }, v.scaleBy = function(f, _, p, x) {
    v.scaleTo(f, function() {
      var R = this.__zoom.k, k = typeof _ == "function" ? _.apply(this, arguments) : _;
      return R * k;
    }, p, x);
  }, v.scaleTo = function(f, _, p, x) {
    v.transform(f, function() {
      var R = e.apply(this, arguments), k = this.__zoom, S = p == null ? y(R) : typeof p == "function" ? p.apply(this, arguments) : p, X = k.invert(S), I = typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(N(D(k, I), S, X), R, o);
    }, p, x);
  }, v.translateBy = function(f, _, p, x) {
    v.transform(f, function() {
      return n(this.__zoom.translate(
        typeof _ == "function" ? _.apply(this, arguments) : _,
        typeof p == "function" ? p.apply(this, arguments) : p
      ), e.apply(this, arguments), o);
    }, null, x);
  }, v.translateTo = function(f, _, p, x, R) {
    v.transform(f, function() {
      var k = e.apply(this, arguments), S = this.__zoom, X = x == null ? y(k) : typeof x == "function" ? x.apply(this, arguments) : x;
      return n(Jn.translate(X[0], X[1]).scale(S.k).translate(
        typeof _ == "function" ? -_.apply(this, arguments) : -_,
        typeof p == "function" ? -p.apply(this, arguments) : -p
      ), k, o);
    }, x, R);
  };
  function D(f, _) {
    return _ = Math.max(s[0], Math.min(s[1], _)), _ === f.k ? f : new ut(_, f.x, f.y);
  }
  function N(f, _, p) {
    var x = _[0] - p[0] * f.k, R = _[1] - p[1] * f.k;
    return x === f.x && R === f.y ? f : new ut(f.k, x, R);
  }
  function y(f) {
    return [(+f[0][0] + +f[1][0]) / 2, (+f[0][1] + +f[1][1]) / 2];
  }
  function w(f, _, p, x) {
    f.on("start.zoom", function() {
      E(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var R = this, k = arguments, S = E(R, k).event(x), X = e.apply(R, k), I = p == null ? y(X) : typeof p == "function" ? p.apply(R, k) : p, nt = Math.max(X[1][0] - X[0][0], X[1][1] - X[0][1]), q = R.__zoom, Z = typeof _ == "function" ? _.apply(R, k) : _, st = c(q.invert(I).concat(nt / q.k), Z.invert(I).concat(nt / Z.k));
      return function(Q) {
        if (Q === 1) Q = Z;
        else {
          var ot = st(Q), pe = nt / ot[2];
          Q = new ut(pe, I[0] - ot[0] * pe, I[1] - ot[1] * pe);
        }
        S.zoom(null, Q);
      };
    });
  }
  function E(f, _, p) {
    return !p && f.__zooming || new $(f, _);
  }
  function $(f, _) {
    this.that = f, this.args = _, this.active = 0, this.sourceEvent = null, this.extent = e.apply(f, _), this.taps = 0;
  }
  $.prototype = {
    event: function(f) {
      return f && (this.sourceEvent = f), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(f, _) {
      return this.mouse && f !== "mouse" && (this.mouse[1] = _.invert(this.mouse[0])), this.touch0 && f !== "touch" && (this.touch0[1] = _.invert(this.touch0[0])), this.touch1 && f !== "touch" && (this.touch1[1] = _.invert(this.touch1[0])), this.that.__zoom = _, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(f) {
      var _ = W(this.that).datum();
      u.call(
        f,
        this.that,
        new Uo(f, {
          sourceEvent: this.sourceEvent,
          target: v,
          transform: this.that.__zoom,
          dispatch: u
        }),
        _
      );
    }
  };
  function C(f, ..._) {
    if (!t.apply(this, arguments)) return;
    var p = E(this, _).event(f), x = this.__zoom, R = Math.max(s[0], Math.min(s[1], x.k * Math.pow(2, r.apply(this, arguments)))), k = J(f);
    if (p.wheel)
      (p.mouse[0][0] !== k[0] || p.mouse[0][1] !== k[1]) && (p.mouse[1] = x.invert(p.mouse[0] = k)), clearTimeout(p.wheel);
    else {
      if (x.k === R) return;
      p.mouse = [k, x.invert(k)], Jt(this), p.start();
    }
    $t(f), p.wheel = setTimeout(S, M), p.zoom("mouse", n(N(D(x, R), p.mouse[0], p.mouse[1]), p.extent, o));
    function S() {
      p.wheel = null, p.end();
    }
  }
  function Y(f, ..._) {
    if (h || !t.apply(this, arguments)) return;
    var p = f.currentTarget, x = E(this, _, !0).event(f), R = W(f.view).on("mousemove.zoom", I, !0).on("mouseup.zoom", nt, !0), k = J(f, p), S = f.clientX, X = f.clientY;
    Cn(f.view), ve(f), x.mouse = [k, this.__zoom.invert(k)], Jt(this), x.start();
    function I(q) {
      if ($t(q), !x.moved) {
        var Z = q.clientX - S, st = q.clientY - X;
        x.moved = Z * Z + st * st > A;
      }
      x.event(q).zoom("mouse", n(N(x.that.__zoom, x.mouse[0] = J(q, p), x.mouse[1]), x.extent, o));
    }
    function nt(q) {
      R.on("mousemove.zoom mouseup.zoom", null), zn(q.view, x.moved), $t(q), x.event(q).end();
    }
  }
  function B(f, ..._) {
    if (t.apply(this, arguments)) {
      var p = this.__zoom, x = J(f.changedTouches ? f.changedTouches[0] : f, this), R = p.invert(x), k = p.k * (f.shiftKey ? 0.5 : 2), S = n(N(D(p, k), x, R), e.apply(this, _), o);
      $t(f), a > 0 ? W(this).transition().duration(a).call(w, S, x, f) : W(this).call(v.transform, S, x, f);
    }
  }
  function b(f, ..._) {
    if (t.apply(this, arguments)) {
      var p = f.touches, x = p.length, R = E(this, _, f.changedTouches.length === x).event(f), k, S, X, I;
      for (ve(f), S = 0; S < x; ++S)
        X = p[S], I = J(X, this), I = [I, this.__zoom.invert(I), X.identifier], R.touch0 ? !R.touch1 && R.touch0[2] !== I[2] && (R.touch1 = I, R.taps = 0) : (R.touch0 = I, k = !0, R.taps = 1 + !!l);
      l && (l = clearTimeout(l)), k && (R.taps < 2 && (d = I[0], l = setTimeout(function() {
        l = null;
      }, g)), Jt(this), R.start());
    }
  }
  function O(f, ..._) {
    if (this.__zooming) {
      var p = E(this, _).event(f), x = f.changedTouches, R = x.length, k, S, X, I;
      for ($t(f), k = 0; k < R; ++k)
        S = x[k], X = J(S, this), p.touch0 && p.touch0[2] === S.identifier ? p.touch0[0] = X : p.touch1 && p.touch1[2] === S.identifier && (p.touch1[0] = X);
      if (S = p.that.__zoom, p.touch1) {
        var nt = p.touch0[0], q = p.touch0[1], Z = p.touch1[0], st = p.touch1[1], Q = (Q = Z[0] - nt[0]) * Q + (Q = Z[1] - nt[1]) * Q, ot = (ot = st[0] - q[0]) * ot + (ot = st[1] - q[1]) * ot;
        S = D(S, Math.sqrt(Q / ot)), X = [(nt[0] + Z[0]) / 2, (nt[1] + Z[1]) / 2], I = [(q[0] + st[0]) / 2, (q[1] + st[1]) / 2];
      } else if (p.touch0) X = p.touch0[0], I = p.touch0[1];
      else return;
      p.zoom("touch", n(N(S, X, I), p.extent, o));
    }
  }
  function z(f, ..._) {
    if (this.__zooming) {
      var p = E(this, _).event(f), x = f.changedTouches, R = x.length, k, S;
      for (ve(f), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, g), k = 0; k < R; ++k)
        S = x[k], p.touch0 && p.touch0[2] === S.identifier ? delete p.touch0 : p.touch1 && p.touch1[2] === S.identifier && delete p.touch1;
      if (p.touch1 && !p.touch0 && (p.touch0 = p.touch1, delete p.touch1), p.touch0) p.touch0[1] = this.__zoom.invert(p.touch0[0]);
      else if (p.end(), p.taps === 2 && (S = J(S, this), Math.hypot(d[0] - S[0], d[1] - S[1]) < T)) {
        var X = W(this).on("dblclick.zoom");
        X && X.apply(this, arguments);
      }
    }
  }
  return v.wheelDelta = function(f) {
    return arguments.length ? (r = typeof f == "function" ? f : Ht(+f), v) : r;
  }, v.filter = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : Ht(!!f), v) : t;
  }, v.touchable = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : Ht(!!f), v) : i;
  }, v.extent = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : Ht([[+f[0][0], +f[0][1]], [+f[1][0], +f[1][1]]]), v) : e;
  }, v.scaleExtent = function(f) {
    return arguments.length ? (s[0] = +f[0], s[1] = +f[1], v) : [s[0], s[1]];
  }, v.translateExtent = function(f) {
    return arguments.length ? (o[0][0] = +f[0][0], o[1][0] = +f[1][0], o[0][1] = +f[0][1], o[1][1] = +f[1][1], v) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, v.constrain = function(f) {
    return arguments.length ? (n = f, v) : n;
  }, v.duration = function(f) {
    return arguments.length ? (a = +f, v) : a;
  }, v.interpolate = function(f) {
    return arguments.length ? (c = f, v) : c;
  }, v.on = function() {
    var f = u.on.apply(u, arguments);
    return f === u ? v : f;
  }, v.clickDistance = function(f) {
    return arguments.length ? (A = (f = +f) * f, v) : Math.sqrt(A);
  }, v.tapDistance = function(f) {
    return arguments.length ? (T = +f, v) : T;
  }, v;
}
function jt(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function jo(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function jn(t) {
  let e, n, r;
  t.length !== 2 ? (e = jt, n = (a, c) => jt(t(a), c), r = (a, c) => t(a) - c) : (e = t === jt || t === jo ? t : ta, n = t, r = t);
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
function ta() {
  return 0;
}
function ea(t) {
  return t === null ? NaN : +t;
}
const na = jn(jt), ra = na.right;
jn(ea).center;
const ia = Math.sqrt(50), sa = Math.sqrt(10), oa = Math.sqrt(2);
function ae(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), s = r / Math.pow(10, i), o = s >= ia ? 10 : s >= sa ? 5 : s >= oa ? 2 : 1;
  let a, c, u;
  return i < 0 ? (u = Math.pow(10, -i) / o, a = Math.round(t * u), c = Math.round(e * u), a / u < t && ++a, c / u > e && --c, u = -u) : (u = Math.pow(10, i) * o, a = Math.round(t / u), c = Math.round(e / u), a * u < t && ++a, c * u > e && --c), c < a && 0.5 <= n && n < 2 ? ae(t, e, n * 2) : [a, c, u];
}
function aa(t, e, n) {
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
function Te(t, e, n) {
  return e = +e, t = +t, n = +n, ae(t, e, n)[2];
}
function ua(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? Te(e, t, n) : Te(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function ca(t, e) {
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
function la(t) {
  return function() {
    return t;
  };
}
function ha(t) {
  return +t;
}
var fn = [0, 1];
function pt(t) {
  return t;
}
function Ne(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : la(isNaN(e) ? NaN : 0.5);
}
function fa(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function da(t, e, n) {
  var r = t[0], i = t[1], s = e[0], o = e[1];
  return i < r ? (r = Ne(i, r), s = n(o, s)) : (r = Ne(r, i), s = n(s, o)), function(a) {
    return s(r(a));
  };
}
function ma(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), s = new Array(r), o = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++o < r; )
    i[o] = Ne(t[o], t[o + 1]), s[o] = n(e[o], e[o + 1]);
  return function(a) {
    var c = ra(t, a, 1, r) - 1;
    return s[c](i[c](a));
  };
}
function ga(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function pa() {
  var t = fn, e = fn, n = Pe, r, i, s, o = pt, a, c, u;
  function l() {
    var h = Math.min(t.length, e.length);
    return o !== pt && (o = fa(t[0], t[h - 1])), a = h > 2 ? ma : da, c = u = null, d;
  }
  function d(h) {
    return h == null || isNaN(h = +h) ? s : (c || (c = a(t.map(r), e, n)))(r(o(h)));
  }
  return d.invert = function(h) {
    return o(i((u || (u = a(e, t.map(r), j)))(h)));
  }, d.domain = function(h) {
    return arguments.length ? (t = Array.from(h, ha), l()) : t.slice();
  }, d.range = function(h) {
    return arguments.length ? (e = Array.from(h), l()) : e.slice();
  }, d.rangeRound = function(h) {
    return e = Array.from(h), n = Rs, l();
  }, d.clamp = function(h) {
    return arguments.length ? (o = h ? !0 : pt, l()) : o !== pt;
  }, d.interpolate = function(h) {
    return arguments.length ? (n = h, l()) : n;
  }, d.unknown = function(h) {
    return arguments.length ? (s = h, d) : s;
  }, function(h, g) {
    return r = h, i = g, l();
  };
}
function ya() {
  return pa()(pt, pt);
}
function _a(t) {
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
function xa(t, e) {
  return function(n, r) {
    for (var i = n.length, s = [], o = 0, a = t[0], c = 0; i > 0 && a > 0 && (c + a + 1 > r && (a = Math.max(1, r - c)), s.push(n.substring(i -= a, i + a)), !((c += a + 1) > r)); )
      a = t[o = (o + 1) % t.length];
    return s.reverse().join(e);
  };
}
function va(t) {
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
  return new qe({
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
ce.prototype = qe.prototype;
function qe(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
qe.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function ba(t) {
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
var tr;
function Ma(t, e) {
  var n = ue(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], s = i - (tr = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
  return s === o ? r : s > o ? r + new Array(s - o + 1).join("0") : s > 0 ? r.slice(0, s) + "." + r.slice(s) : "0." + new Array(1 - s).join("0") + ue(t, Math.max(0, e + s - 1))[0];
}
function dn(t, e) {
  var n = ue(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const mn = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: _a,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => dn(t * 100, e),
  r: dn,
  s: Ma,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function gn(t) {
  return t;
}
var pn = Array.prototype.map, yn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function ka(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? gn : xa(pn.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", s = t.numerals === void 0 ? gn : va(pn.call(t.numerals, String)), o = t.percent === void 0 ? "%" : t.percent + "", a = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function u(d) {
    d = ce(d);
    var h = d.fill, g = d.align, M = d.sign, A = d.symbol, T = d.zero, v = d.width, D = d.comma, N = d.precision, y = d.trim, w = d.type;
    w === "n" ? (D = !0, w = "g") : mn[w] || (N === void 0 && (N = 12), y = !0, w = "g"), (T || h === "0" && g === "=") && (T = !0, h = "0", g = "=");
    var E = A === "$" ? n : A === "#" && /[boxX]/.test(w) ? "0" + w.toLowerCase() : "", $ = A === "$" ? r : /[%p]/.test(w) ? o : "", C = mn[w], Y = /[defgprs%]/.test(w);
    N = N === void 0 ? 6 : /[gprs]/.test(w) ? Math.max(1, Math.min(21, N)) : Math.max(0, Math.min(20, N));
    function B(b) {
      var O = E, z = $, f, _, p;
      if (w === "c")
        z = C(b) + z, b = "";
      else {
        b = +b;
        var x = b < 0 || 1 / b < 0;
        if (b = isNaN(b) ? c : C(Math.abs(b), N), y && (b = ba(b)), x && +b == 0 && M !== "+" && (x = !1), O = (x ? M === "(" ? M : a : M === "-" || M === "(" ? "" : M) + O, z = (w === "s" ? yn[8 + tr / 3] : "") + z + (x && M === "(" ? ")" : ""), Y) {
          for (f = -1, _ = b.length; ++f < _; )
            if (p = b.charCodeAt(f), 48 > p || p > 57) {
              z = (p === 46 ? i + b.slice(f + 1) : b.slice(f)) + z, b = b.slice(0, f);
              break;
            }
        }
      }
      D && !T && (b = e(b, 1 / 0));
      var R = O.length + b.length + z.length, k = R < v ? new Array(v - R + 1).join(h) : "";
      switch (D && T && (b = e(k + b, k.length ? v - z.length : 1 / 0), k = ""), g) {
        case "<":
          b = O + b + z + k;
          break;
        case "=":
          b = O + k + b + z;
          break;
        case "^":
          b = k.slice(0, R = k.length >> 1) + O + b + z + k.slice(R);
          break;
        default:
          b = k + O + b + z;
          break;
      }
      return s(b);
    }
    return B.toString = function() {
      return d + "";
    }, B;
  }
  function l(d, h) {
    var g = u((d = ce(d), d.type = "f", d)), M = Math.max(-8, Math.min(8, Math.floor(At(h) / 3))) * 3, A = Math.pow(10, -M), T = yn[8 + M / 3];
    return function(v) {
      return g(A * v) + T;
    };
  }
  return {
    format: u,
    formatPrefix: l
  };
}
var Ut, er, nr;
Ra({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Ra(t) {
  return Ut = ka(t), er = Ut.format, nr = Ut.formatPrefix, Ut;
}
function Aa(t) {
  return Math.max(0, -At(Math.abs(t)));
}
function Sa(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(At(e) / 3))) * 3 - At(Math.abs(t)));
}
function Ea(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, At(e) - At(t)) + 1;
}
function $a(t, e, n, r) {
  var i = ua(t, e, n), s;
  switch (r = ce(r ?? ",f"), r.type) {
    case "s": {
      var o = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(s = Sa(i, o)) && (r.precision = s), nr(r, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(s = Ea(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = s - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(s = Aa(i)) && (r.precision = s - (r.type === "%") * 2);
      break;
    }
  }
  return er(r);
}
function Ta(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return aa(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return $a(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, s = r.length - 1, o = r[i], a = r[s], c, u, l = 10;
    for (a < o && (u = o, o = a, a = u, u = i, i = s, s = u); l-- > 0; ) {
      if (u = Te(o, a, n), u === c)
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
function Ve() {
  var t = ya();
  return t.copy = function() {
    return ga(t, Ve());
  }, ca.apply(t, arguments), Ta(t);
}
var G;
let Xt = (G = class {
}, m(G, "create", Xn), m(G, "select", W), m(G, "selectAll", Fi), m(G, "pointer", J), m(G, "drag", Ln), m(G, "scaleLinear", Ve), m(G, "axisTop", es), m(G, "axisBottom", In), m(G, "axisRight", On), m(G, "axisLeft", ns), m(G, "zoom", Jo), G);
class Na {
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
class P {
}
m(P, "create", Xn), m(P, "select", W), m(P, "pointer", J), m(P, "drag", Ln), m(P, "scaleLinear", Ve), m(P, "axisBottom", In), m(P, "axisRight", On);
function rr(t) {
  const e = getComputedStyle(t), n = new V({
    x: parseInt(e.left) || 0,
    y: parseInt(e.top) || 0,
    w: parseInt(e.width) || 0,
    h: parseInt(e.height) || 0,
    node: t
  });
  return V.isBoard(n.node) && (n.parent = null), Array.from(t.children).forEach((r) => {
    const i = rr(r);
    i.parent = n, n.children.push(i);
  }), n;
}
function Da(t) {
  return t.x >= this.x && t.x <= this.x + this.w && t.y >= this.y && t.y <= this.y + this.h;
}
function Xa(t) {
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
function za(t) {
  return t.attr("data-type") === St.Movable;
}
function La(t) {
  return t.attr("data-type") === St.Container;
}
function Oa(t) {
  return t.attr("data-type") === St.Board;
}
function Ia() {
  if (V.isBoard(this.node) || !this.parent) return;
  this.node.remove();
  const t = this.parent, e = t.children.findIndex((n) => n.id === this.id);
  e !== -1 && delete t.children[e];
}
function Pa(t) {
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
function ir(t, e, n = "dfs", r = 0) {
  if (n === "dfs") {
    e(t, r);
    for (const i of t.children)
      ir(i, e, "dfs", r + 1);
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
const Ya = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Ba = (t = 21) => {
  let e = "", n = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += Ya[n[t] & 63];
  return e;
};
function qa() {
  const t = this.node.clone();
  return t.attr("data-id", Ba()), V.from(t.node());
}
function Va(t) {
  return t.attr("data-type") === St.Assist;
}
function Ha(t) {
  return t.attr("data-type") === St.Root;
}
var xt, vt, wt, bt, It;
class V {
  constructor({ x: e, y: n, h: r, w: i, node: s }) {
    ht(this, xt);
    ht(this, vt);
    ht(this, wt);
    ht(this, bt);
    ht(this, It);
    m(this, "node");
    m(this, "parent", null);
    m(this, "children", []);
    m(this, "isInside", Da);
    m(this, "isIntersect", Ca);
    m(this, "align", Xa);
    m(this, "remove", Ia);
    m(this, "addChild", Pa);
    m(this, "find", Fa);
    m(this, "clone", qa);
    K(this, xt, e), K(this, vt, n), K(this, bt, r), K(this, wt, i), this.node = P.select(s), K(this, It, String(s.dataset.id));
  }
  get id() {
    return lt(this, It);
  }
  get x() {
    return lt(this, xt);
  }
  set x(e) {
    K(this, xt, e), this.node.style("left", `${e}px`);
  }
  get y() {
    return lt(this, vt);
  }
  set y(e) {
    K(this, vt, e), this.node.style("top", `${e}px`);
  }
  get w() {
    return lt(this, wt);
  }
  set w(e) {
    K(this, wt, e), this.node.style("width", `${e}px`);
  }
  get h() {
    return lt(this, bt);
  }
  set h(e) {
    K(this, bt, e), this.node.style("height", `${e}px`);
  }
  set error(e) {
    this.node.attr("data-error", e);
  }
  get error() {
    return !!this.node.attr("data-error");
  }
}
xt = new WeakMap(), vt = new WeakMap(), wt = new WeakMap(), bt = new WeakMap(), It = new WeakMap(), m(V, "from", rr), m(V, "traverse", ir), m(V, "isMovable", za), m(V, "isContainer", La), m(V, "isBoard", Oa), m(V, "isAssist", Va), m(V, "isRoot", Ha);
var St = /* @__PURE__ */ ((t) => (t.Movable = "movable", t.Container = "container", t.Board = "board", t.Assist = "assist", t.Root = "root", t))(St || {});
class Ua {
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
class Yu {
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
class Ga {
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
class Bu {
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
class qu {
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
var F = /* @__PURE__ */ ((t) => (t.onTransform = "onTransform", t.onMountStart = "onMountStart", t.onMountEnd = "onMountEnd", t.onMoveRect = "onMoveRect", t.onMoveRectEnd = "onMoveRectEnd", t.onMoveRectStart = "onMoveRectStart", t.onSelected = "onSelected", t.onDrop = "onDrop", t.onDragLeave = "onDragLeave", t.onDragOver = "onDragOver", t))(F || {});
class Ka {
  constructor() {
    m(this, "storage", /* @__PURE__ */ new Map());
  }
  add(e, n) {
    var r;
    this.storage.has(e) ? (r = this.storage.get(e)) == null || r.add(n) : this.storage.set(e, (/* @__PURE__ */ new Set()).add(n));
  }
  execute(e, ...n) {
    var r;
    this.storage.has(e) && ((r = this.storage.get(e)) == null || r.forEach((i) => {
      i(...n);
    }));
  }
}
class Wa {
  constructor() {
    m(this, "storage", /* @__PURE__ */ new Map());
  }
  add(e, n) {
    if (this.storage.has(e)) throw Error(`Freemove: 插件${e}已经存在`);
    this.storage.set(e, n);
  }
  getAll() {
    return this.storage;
  }
  get(e) {
    if (this.storage.has(e)) throw Error(`Freemove: 插件${e}不存在`);
    return this.storage.get(e);
  }
}
function Za() {
  if (!this.selectedRect || !this.selectedRect.parent) return;
  const t = this.selectedRect.parent.children;
  this.selectedRect.error = !1;
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    if (n.id === this.selectedRect.id) continue;
    this.selectedRect.isIntersect(n) ? (this.selectedRect.error = !0, n.error = !0) : n.error = !1;
  }
}
function Qa() {
  this.board.style("transform", this.transform.toString()), this.assist.style("transform", this.transform.toString()), this.observer.update(), this[L].execute(F.onTransform);
}
function Ja(t, e) {
  const n = t(this);
  return n.install(e), this[le].add(t.name, n), this;
}
function ja(t, e) {
  const n = t.observer.boardDOMRect, r = t.selectedRect.node.node().getBoundingClientRect(), i = t.transform.scale, s = {
    x: (e.clientX - r.left) / i,
    y: (e.clientY - r.top) / i
  }, o = {
    x: t.selectedRect.x,
    y: t.selectedRect.y
  }, a = Object.assign({}, o), c = Object.assign({}, o);
  t[L].execute(F.onMoveRectStart);
  function u(d) {
    if (!t.selectedRect) return;
    a.x = Math.round((d.clientX - n.left) / i - s.x), a.y = Math.round((d.clientY - n.top) / i - s.y);
    const h = n.width / i - t.selectedRect.w, g = n.height / i - t.selectedRect.h;
    a.x = Math.max(0, Math.min(a.x, h)), a.y = Math.max(0, Math.min(a.y, g)), t.selectedRect.x = a.x, t.selectedRect.y = a.y, t[L].execute(F.onMoveRect, {
      dx: a.x - o.x,
      dy: a.y - o.y
    }), o.x = a.x, o.y = a.y;
  }
  function l() {
    const d = new Ga(t.selectedRect, {
      x: t.selectedRect.x,
      y: t.selectedRect.y
    }, c);
    t.manager.execute(d), t[L].execute(F.onMoveRectEnd), document.removeEventListener("pointermove", u), document.removeEventListener("pointerup", l);
  }
  document.addEventListener("pointermove", u), document.addEventListener("pointerup", l);
}
function tu(t) {
  t.assist.on("pointerdown", (e) => {
    e.preventDefault(), e.stopPropagation();
    const n = Xt.select(e.target), [r, i] = Xt.pointer(e, t.assist.node());
    if (V.isAssist(n)) {
      let s = null;
      V.traverse(t.rect, (o) => {
        o.isInside({ x: r, y: i }) && V.isMovable(o.node) && (s = o);
      }), s && (t.selectedRect = s, ja(t, e));
    }
  });
}
function eu(t) {
  t.root.on("wheel", (e) => {
    e.preventDefault(), e.stopPropagation();
    const [n, r] = t.transform.scaleExtent;
    if (e.ctrlKey) {
      const i = t.board.node().getBoundingClientRect(), s = e.clientX - i.left, o = e.clientY - i.top, a = t.transform.scale, c = e.deltaY * -0.01;
      let u = a * (1 + c);
      u = Math.max(n, Math.min(r, u)), t.transform.translateX -= (s / a - s / u) * u, t.transform.translateY -= (o / a - o / u) * u, t.transform.scale = u, t.applyTransform();
    } else
      t.transform.translateX -= e.deltaX, t.transform.translateY -= e.deltaY, t.applyTransform();
  });
}
class nu {
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
function ru(t) {
  t.assist.on("drop", (e) => {
    t[L].execute(F.onDrop, e);
  });
}
function iu(t) {
  t.assist.on("dragover", (e) => {
    t[L].execute(F.onDragOver, e);
  });
}
function su(t) {
  t.assist.on("dragleave", (e) => {
    t[L].execute(F.onDragLeave, e);
  });
}
function ou(t) {
  ru(t), iu(t), su(t);
}
function au() {
  return this.svg.selectAll("text").nodes().map((t) => {
    if (!t)
      return 0;
    const e = t.textContent.replace(/,/g, "").replace(/−/g, "-");
    return Number(e) || 0;
  });
}
function uu() {
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
function cu(t) {
  this.lines.add(Math.round(this.scaleLinear.invert(t))), this.lineRender();
}
function lu(t) {
  this.lines.delete(t), this.lineRender();
}
function hu({ scale: t, translateX: e, translateY: n }) {
  const r = this.__isX ? e : n, i = Math.max(this.width, this.height), s = 0, o = (this.lower - r) / t, a = (this.upper - r) / t;
  this.scaleLinear = P.scaleLinear([o, a], [s, i]), this.axis.scale(this.scaleLinear), this.svg.call(this.axis);
  const c = this.getSecondaryTicks();
  this.svg.selectAll(".ruler-secondary-tick").remove(), this.svg.append("svg:g").lower().classed("ruler-secondary-tick", !0).selectAll("line").data(c).join("svg:line").attr("x1", (u) => this.__isX ? u : 0).attr("y1", (u) => this.__isX ? 0 : u).attr("x2", (u) => this.__isX ? u : 5).attr("y2", (u) => this.__isX ? 5 : u).attr("stroke", "#5EA090").attr("stroke-width", "1").style("pointer-events", "none"), this.svg.selectAll(".tick").style("pointer-events", "none"), this.svg.selectAll(".tick text").attr("text-anchor", "start").attr("transform", this.__isX ? "translate(4,-6)" : "rotate(90) translate(-10, -12)"), this.lineRender(), this.meshRender(), this.svg.select(".domain").remove();
}
function fu() {
  const t = P.drag().on("start", (n) => {
    this.__draggingLine = P.select(n.sourceEvent.target), document.body.style.cursor = "col-resize";
  }).on("drag", (n) => {
    if (!this.__draggingLine)
      return;
    const r = n.x, i = n.y, s = this.__draggingLine.datum(), o = Math.round(this.scaleLinear.invert(this.__isX ? r : i));
    this.lines.delete(s), this.__draggingLine.style(this.__isX ? "left" : "top", `${this.scaleLinear(o) - 0.4}px`).datum(o), this.lines.add(this.__draggingLine.datum()), this.tooltip.show().fixed(n.sourceEvent.clientX + 8, n.sourceEvent.clientY + 8).html(`${((this.scaleLinear(this.__draggingLine.datum()) - this.scaleLinear(0)) * 100 / (this.__isX ? this.observer.boardDOMRect.width : this.observer.boardDOMRect.width)).toFixed(2)}%`);
  }).on("end", (n) => {
    if (!this.__draggingLine)
      return;
    document.body.style.cursor = "default", this.tooltip.hidden();
    const [r, i] = P.pointer(n, this.observer.root);
    (this.__isX ? r : i) < 20 && (this.lineRemove(this.__draggingLine.datum()), console.log(this.lines)), this.__draggingLine = null;
  }), e = P.select(this.observer.root);
  e.selectAll(`.ruler-line-${this.type}`).remove(), e.selectAll(`div[class=ruler-line-${this.type}]`).data(Array.from(this.lines)).join("div").classed(`ruler-line-${this.type}`, !0).style("position", "absolute").style("width", this.__isX ? "5px" : "auto").style("height", this.__isX ? "auto" : "5px").style("display", "flex").style("justify-content", "center").style("flex-direction", this.__isX ? "row" : "column").style("left", (n) => this.__isX ? `${this.scaleLinear(n) - 0.4}px` : "20px").style("top", (n) => this.__isX ? "20px" : `${this.scaleLinear(n) - 0.4}px`).style("transform", this.__isX ? "translate(-50%, 0)" : "translate(0, -50%)").style("cursor", this.__isX ? "col-resize" : "row-resize").call(t).append("div").style("width", this.__isX ? "1px" : `${this.observer.rootDOMRect.width}px`).style("height", this.__isX ? `${this.observer.rootDOMRect.height}px` : "1px").style("background", "red").style("pointer-events", "none");
}
function _n() {
  this.observer.root.append(this.svg.node()), this.tooltip.mount();
}
class du {
  constructor() {
    m(this, "container", P.create("div").style("position", "fixed").style("background", "#333").style("color", "#FFF").style("padding", "3px 5px").style("border-radius", "4px").style("pointer-events", "none").style("font-size", "12px").style("display", "none"));
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
function mu() {
  this.observer.root.append(this.mesh.node()), this.mesh.lower();
}
function gu() {
  this.mesh.remove();
}
function pu() {
  const t = this.getMainTicks();
  if (Math.abs(t[0] - t[1]) <= 10) {
    this.meshMount();
    const e = this.__isX ? this.observer.rootDOMRect.height : this.observer.rootDOMRect.width, n = this.getSecondaryTicks();
    this.mesh.selectAll("line").data(n).join("svg:line").attr("x1", (r) => this.__isX ? r : 0).attr("y1", (r) => this.__isX ? 0 : r).attr("x2", (r) => this.__isX ? r : e).attr("y2", (r) => this.__isX ? e : r).attr("stroke", "#4DA5C9").attr("stroke-width", 1);
  } else
    this.meshUnmount();
}
function yu() {
  this.slider.style("display", "block");
}
function _u() {
  this.slider.style("display", "none");
}
function xu(t) {
  const e = this.scaleLinear(t.x), n = this.scaleLinear(t.y), r = this.scaleLinear(t.x + t.w) - e, i = this.scaleLinear(t.y + t.h) - n;
  this.slider.attr("x", this.__isX ? e : 0).attr("y", this.__isX ? 0 : n).attr("width", this.__isX ? r : 20).attr("height", this.__isX ? 20 : i).attr("fill", "rgba(59,50,37,0.6)"), this.sliderShow();
}
class xn {
  constructor(e, n) {
    m(this, "type");
    m(this, "svg");
    m(this, "mesh");
    m(this, "slider");
    m(this, "width");
    m(this, "height");
    m(this, "lower");
    m(this, "upper");
    m(this, "scaleLinear");
    m(this, "axis");
    m(this, "lines", /* @__PURE__ */ new Set());
    m(this, "tooltip", new du());
    m(this, "observer");
    m(this, "__draggingLine", null);
    m(this, "getMainTicks", au);
    m(this, "getSecondaryTicks", uu);
    m(this, "lineAdd", cu);
    m(this, "lineRemove", lu);
    m(this, "lineRender", fu);
    m(this, "applyTransform", hu);
    m(this, "mount", _n);
    m(this, "unmount", _n);
    m(this, "meshMount", mu);
    m(this, "meshUnmount", gu);
    m(this, "meshRender", pu);
    m(this, "sliderShow", yu);
    m(this, "sliderHidden", _u);
    m(this, "sliderRender", xu);
    this.observer = n;
    const r = n.boardCoord, i = Math.max(this.observer.rootDOMRect.width, this.observer.rootDOMRect.height), s = 0;
    this.type = e, this.width = this.__isX ? i : 20, this.height = this.__isX ? 20 : i, this.lower = -r[e], this.upper = i - r[e], this.scaleLinear = P.scaleLinear([this.lower, this.upper], [s, i]), this.axis = (this.__isX ? P.axisBottom(this.scaleLinear) : P.axisRight(this.scaleLinear)).ticks(20).tickSize(10).tickPadding(4), this.svg = P.create("svg:svg").attr("viewbox", [0, 0, this.width, this.height]).attr("width", this.width).attr("height", this.height).style("background", "#DCDCAF").style("position", "absolute").style("left", 0).style("top", 0).call(this.axis), this.svg.on("mousemove", (o) => {
      const [a, c] = P.pointer(o, this.svg.node());
      this.tooltip.show().fixed(this.__isX ? o.clientX + 4 : this.observer.rootDOMRect.left + 24, this.__isX ? this.observer.rootDOMRect.top + 24 : o.clientY + 4).html(`${(this.__isX ? Math.round(this.scaleLinear.invert(a)) * 100 / this.observer.boardDOMRect.width : Math.round(this.scaleLinear.invert(c)) * 100 / this.observer.boardDOMRect.height).toFixed(2)}%`);
    }).on("mouseout", () => {
      this.tooltip.hidden();
    }).on("click", (o) => {
      const [a, c] = P.pointer(o, this.svg.node());
      this.lineAdd(this.__isX ? a : c);
    }), this.mesh = P.create("svg").style("position", "absolute").style("left", 0).style("top", 0).attr("viewBox", [0, 0, this.observer.rootDOMRect.width, this.observer.rootDOMRect.height].join(" ")).attr("width", this.observer.rootDOMRect.width).attr("height", this.observer.rootDOMRect.height).style("pointer-events", "none"), this.slider = this.svg.append("rect"), this.__isX && this.svg.append("rect").attr("x", 0).attr("y", 0).attr("width", 20).attr("height", 20).attr("fill", "#DCDCB4");
  }
  get __isX() {
    return this.type === "x";
  }
}
class vu {
  constructor(e) {
    m(this, "x");
    m(this, "y");
    this.x = new xn("x", e), this.y = new xn("y", e), this.y.mount(), this.x.mount(), this.x.applyTransform({ scale: 1, translateX: 0, translateY: 0 }), this.y.applyTransform({ scale: 1, translateX: 0, translateY: 0 });
  }
}
const wu = (t) => {
  const e = new vu(t.observer);
  return {
    name: "ruler",
    data: e,
    install() {
      t.onTransform(() => {
        e.x.applyTransform(t.transform), e.y.applyTransform(t.transform), e.x.meshUnmount(), e.y.meshUnmount();
      }), t.onMountStart(() => {
        e.x.sliderRender(t.selectedRect), e.y.sliderRender(t.selectedRect);
      }), t.onMoveRect(() => {
        e.x.sliderRender(t.selectedRect), e.y.sliderRender(t.selectedRect);
      }), t.onMountEnd(() => {
        e.x.sliderHidden(), e.y.sliderHidden();
      });
    },
    uninstall() {
      e.x.unmount(), e.y.unmount(), e.x.meshUnmount(), e.y.meshUnmount(), e.x.sliderHidden(), e.y.sliderHidden();
    }
  };
}, De = ["vl", "vc", "vr", "ht", "hc", "hb"];
function bu(t) {
  return {
    vl: t.x,
    vc: t.x + t.w / 2,
    vr: t.x + t.w,
    ht: t.y,
    hc: t.y + t.h / 2,
    hb: t.y + t.h
  };
}
function sr() {
  var i;
  const { store: t } = this, e = t.selectedRect, n = (i = e.parent) == null ? void 0 : i.children, r = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  n && n.forEach((s) => {
    if (e.isIntersect(s))
      return;
    const o = bu(e);
    De.forEach((l) => {
      let d, h, g;
      l.startsWith("h") && (e.x > s.x + s.w ? (d = e.x + e.w, h = s.x) : e.x + e.w < s.x ? (d = e.x, h = s.x + s.w) : (d = Math.min(e.x, s.x), h = Math.max(e.x + e.w, s.x + s.w)), [s.y, s.y + s.h / 2, s.y + s.h].forEach((A) => {
        g = Math.abs(o[l] - A), g <= 3 && r[l].push({
          type: l,
          start: d,
          end: h,
          diff: g,
          to: A,
          rects: [s, e]
        });
      })), l.startsWith("v") && (e.y > s.y + s.h ? (d = e.y + e.h, h = s.y) : e.y + e.h < s.y ? (d = e.y, h = s.y + s.h) : (d = Math.min(e.y, s.y), h = Math.max(e.y + e.h, s.y + s.h)), [s.x, s.x + s.w / 2, s.x + s.w].forEach((A) => {
        g = Math.abs(o[l] - A), g <= 3 && r[l].push({
          type: l,
          start: d,
          end: h,
          diff: g,
          to: A,
          rects: [s, e]
        });
      }));
    }), De.forEach((l) => {
      var g;
      const d = /* @__PURE__ */ new Map();
      r[l].forEach((M) => {
        const A = d.get(M.diff) || [];
        A.push(M), d.set(M.diff, A);
      }), d.forEach((M) => {
        const A = M.reduce(({ min: T, max: v }, { start: D, end: N }) => ({
          min: Math.min(T, D, N),
          max: Math.max(v, D, N)
        }), { min: 1 / 0, max: 0 });
        M.forEach((T) => {
          T.start = A.min, T.end = A.max;
        });
      });
      const h = Math.min(...d.keys());
      r[l] = (g = d.get(h)) != null && g[0] ? [d.get(h)[0]] : [];
    });
    const a = [], c = Math.min(...[r.hb, r.hc, r.ht].flat().map((l) => l.diff)), u = Math.min(...[r.vl, r.vr, r.vc].flat().map((l) => l.diff));
    Object.values(r).flat().forEach((l) => {
      [c, u].includes(l.diff) && a.push(l);
    }), this.alternate = a;
  });
}
function Mu() {
  const t = this.store;
  this.alternate.forEach((e) => {
    const { to: n, type: r } = e, i = t.selectedRect;
    switch (r) {
      case "ht":
        i.y = n;
        break;
      case "hc":
        i.y = n - i.h / 2;
        break;
      case "hb":
        i.y = n - i.h;
        break;
      case "vl":
        i.x = n;
        break;
      case "vc":
        i.x = n - i.w / 2;
        break;
      case "vr":
        i.x = n - i.w;
        break;
    }
    sr.call(this);
  });
}
function ku() {
  const t = this.store, e = t.selectedRect;
  e.parent && (e.parent, this.alternate.forEach((n) => {
    const { start: r, end: i, type: s } = n, o = this.lines[s];
    if (/^h/.test(s))
      switch (o.attr("x1", r).attr("x2", i), s) {
        case "ht":
          o.attr("y1", e.y).attr("y2", e.y);
          break;
        case "hc":
          o.attr("y1", e.y + e.h / 2).attr("y2", e.y + e.h / 2);
          break;
        case "hb":
          o.attr("y1", e.y + e.h).attr("y2", e.y + e.h);
          break;
      }
    if (/^v/.test(s))
      switch (o.attr("y1", r).attr("y2", i), s) {
        case "vl":
          o.attr("x1", e.x).attr("x2", e.x);
          break;
        case "vc":
          o.attr("x1", e.x + e.w / 2).attr("x2", e.x + e.w / 2);
          break;
        case "vr":
          o.attr("x1", e.x + e.w).attr("x2", e.x + e.w);
          break;
      }
    o.attr("stroke-width", 1 / t.transform.scale).attr("stroke", "red").style("display", "block");
  }));
}
class Ru {
  constructor(e) {
    m(this, "store");
    m(this, "g");
    m(this, "lines");
    m(this, "alternate", []);
    this.store = e, this.g = e.assist.append("g").attr("data-assist-type", "align").style("display", "block"), this.lines = {}, [...De, "vertical"].forEach((n) => {
      this.lines[n] = this.g.append("line").style("display", "none");
    });
  }
  render() {
    this.hidden(), sr.call(this), Mu.call(this), ku.call(this);
  }
  mount() {
    this.store.assist.node().appendChild(this.g.node());
  }
  unmount() {
    this.g.remove();
  }
  hidden() {
    Object.values(this.lines).forEach((e) => {
      e.style("display", "none");
    });
  }
}
const Au = (t) => {
  const e = new Ru(t);
  return {
    name: "assist-align",
    data: e,
    install() {
      t.onMountEnd(() => e.mount()), t.onMoveRectStart(() => e.render()), t.onMoveRect(({ dx: n, dy: r }) => {
        n < 5 && r < 5 && e.render();
      }), t.onMoveRectEnd(() => e.hidden());
    },
    uninstall() {
      e.unmount();
    }
  };
};
function Su() {
  this[L].execute(F.onMountStart);
  const t = this.root.node(), e = this.board.node(), n = this.assist.node();
  t.append(n);
  const r = e.getBoundingClientRect(), i = t.getBoundingClientRect();
  this.root.attr("data-type", "root").style("position", "relative"), this.board.attr("data-type", "board").style("position", "absolute").style("left", `${(i.width - r.width) / 2}px`).style("top", `${(i.height - r.height) / 2}px`).style("transform-origin", "0 0"), this.assist.attr("data-type", "assist").attr("width", r.width).attr("height", r.height).attr("viewBox", [0, 0, r.width, r.height].join(" ")).style("position", "absolute").style("left", `${(i.width - r.width) / 2}px`).style("top", `${(i.height - r.height) / 2}px`).style("transform-origin", "0 0"), this.observer = new nu(t, e), eu(this), tu(this), ou(this), this.plugin(Au).plugin(wu), this[L].execute(F.onMountEnd);
}
function Eu(t) {
  this[L].add(F.onTransform, t);
}
function $u(t) {
  this[L].add(F.onMountStart, t);
}
function Tu(t) {
  this[L].add(F.onMoveRect, t);
}
function Nu(t) {
  this[L].add(F.onMountEnd, t);
}
function Du(t) {
  this[L].add(F.onMoveRectEnd, t);
}
function Xu(t) {
  this[L].add(F.onMoveRectStart, t);
}
function Cu(t) {
  this[L].add(F.onMoveRect, t);
}
function zu(t) {
  this[L].add(F.onDrop, t);
}
function Lu(t) {
  this[L].add(F.onDragOver, t);
}
function Ou(t) {
  this[L].add(F.onDragLeave, t);
}
function Iu(t) {
  return this[le].get(t).data;
}
const L = Symbol("hooks"), le = Symbol("plugin");
var vn, wn, Mt;
wn = L, vn = le;
class Vu {
  constructor(e, n) {
    m(this, "root");
    m(this, "board");
    m(this, "assist");
    m(this, "transform");
    m(this, "observer");
    m(this, "rect");
    m(this, "manager");
    ht(this, Mt);
    m(this, wn);
    m(this, vn);
    m(this, "searchError", Za);
    m(this, "applyTransform", Qa);
    m(this, "plugin", Ja);
    m(this, "pluginData", Iu);
    m(this, "mount", Su);
    m(this, "onTransform", Eu);
    m(this, "onMountStart", $u);
    m(this, "onMountEnd", Nu);
    m(this, "onMoveRect", Tu);
    m(this, "onMoveRectEnd", Du);
    m(this, "onMoveRectStart", Xu);
    m(this, "onSelected", Cu);
    m(this, "onDrop", zu);
    m(this, "onDragOver", Lu);
    m(this, "onDragLeave", Ou);
    this.root = Xt.select(e), this.board = Xt.select(n), this.assist = Xt.create("svg:svg"), this.rect = V.from(n), K(this, Mt, this.rect), this[L] = new Ka(), this[le] = new Wa(), this.transform = new Na(1, 0, 0), this.manager = new Ua();
  }
  get selectedRect() {
    return lt(this, Mt);
  }
  set selectedRect(e) {
    e.node.raise(), K(this, Mt, e), this[L].execute(F.onSelected), this.searchError();
  }
}
Mt = new WeakMap();
export {
  qu as CommandAddRect,
  Ga as CommandMoveRect,
  Bu as CommandRemoveRect,
  Yu as CompositeCommand,
  Ka as Hook,
  F as HookNames,
  Ua as Manager,
  nu as Observer,
  Wa as Plugins,
  V as Rect,
  St as RectType,
  Vu as Store,
  Na as Transform,
  L as hook,
  le as plugins
};
