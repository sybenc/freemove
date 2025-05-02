var ve = Object.defineProperty;
var Me = (t, e, n) => e in t ? ve(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var y = (t, e, n) => Me(t, typeof e != "symbol" ? e + "" : e, n);
var bt = "http://www.w3.org/1999/xhtml";
const Dt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: bt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ee(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Dt.hasOwnProperty(e) ? { space: Dt[e], local: t } : t;
}
function ke(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === bt && e.documentElement.namespaceURI === bt ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Ae(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Rt(t) {
  var e = ee(t);
  return (e.local ? Ae : ke)(e);
}
function Ne() {
}
function ne(t) {
  return t == null ? Ne : function() {
    return this.querySelector(t);
  };
}
function $e(t) {
  typeof t != "function" && (t = ne(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = new Array(o), l, u, f = 0; f < o; ++f)
      (l = s[f]) && (u = t.call(l, l.__data__, f, s)) && ("__data__" in l && (u.__data__ = l.__data__), a[f] = u);
  return new L(r, this._parents);
}
function re(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Se() {
  return [];
}
function Re(t) {
  return t == null ? Se : function() {
    return this.querySelectorAll(t);
  };
}
function Ee(t) {
  return function() {
    return re(t.apply(this, arguments));
  };
}
function Le(t) {
  typeof t == "function" ? t = Ee(t) : t = Re(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], a = o.length, l, u = 0; u < a; ++u)
      (l = o[u]) && (r.push(t.call(l, l.__data__, u, o)), i.push(l));
  return new L(r, i);
}
function Ce(t) {
  return function() {
    return this.matches(t);
  };
}
function ie(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Xe = Array.prototype.find;
function Te(t) {
  return function() {
    return Xe.call(this.children, t);
  };
}
function De() {
  return this.firstElementChild;
}
function Pe(t) {
  return this.select(t == null ? De : Te(typeof t == "function" ? t : ie(t)));
}
var Fe = Array.prototype.filter;
function Oe() {
  return Array.from(this.children);
}
function ze(t) {
  return function() {
    return Fe.call(this.children, t);
  };
}
function He(t) {
  return this.selectAll(t == null ? Oe : ze(typeof t == "function" ? t : ie(t)));
}
function qe(t) {
  typeof t != "function" && (t = Ce(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], l, u = 0; u < o; ++u)
      (l = s[u]) && t.call(l, l.__data__, u, s) && a.push(l);
  return new L(r, this._parents);
}
function se(t) {
  return new Array(t.length);
}
function Ie() {
  return new L(this._enter || this._groups.map(se), this._parents);
}
function lt(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
lt.prototype = {
  constructor: lt,
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
function Ve(t) {
  return function() {
    return t;
  };
}
function Be(t, e, n, r, i, s) {
  for (var o = 0, a, l = e.length, u = s.length; o < u; ++o)
    (a = e[o]) ? (a.__data__ = s[o], r[o] = a) : n[o] = new lt(t, s[o]);
  for (; o < l; ++o)
    (a = e[o]) && (i[o] = a);
}
function Ue(t, e, n, r, i, s, o) {
  var a, l, u = /* @__PURE__ */ new Map(), f = e.length, d = s.length, c = new Array(f), g;
  for (a = 0; a < f; ++a)
    (l = e[a]) && (c[a] = g = o.call(l, l.__data__, a, e) + "", u.has(g) ? i[a] = l : u.set(g, l));
  for (a = 0; a < d; ++a)
    g = o.call(t, s[a], a, s) + "", (l = u.get(g)) ? (r[a] = l, l.__data__ = s[a], u.delete(g)) : n[a] = new lt(t, s[a]);
  for (a = 0; a < f; ++a)
    (l = e[a]) && u.get(c[a]) === l && (i[a] = l);
}
function Ye(t) {
  return t.__data__;
}
function Ge(t, e) {
  if (!arguments.length) return Array.from(this, Ye);
  var n = e ? Ue : Be, r = this._parents, i = this._groups;
  typeof t != "function" && (t = Ve(t));
  for (var s = i.length, o = new Array(s), a = new Array(s), l = new Array(s), u = 0; u < s; ++u) {
    var f = r[u], d = i[u], c = d.length, g = Ke(t.call(f, f && f.__data__, u, r)), w = g.length, X = a[u] = new Array(w), R = o[u] = new Array(w), C = l[u] = new Array(c);
    n(f, d, X, R, C, g, e);
    for (var N = 0, v = 0, h, p; N < w; ++N)
      if (h = X[N]) {
        for (N >= v && (v = N + 1); !(p = R[v]) && ++v < w; ) ;
        h._next = p || null;
      }
  }
  return o = new L(o, r), o._enter = a, o._exit = l, o;
}
function Ke(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ze() {
  return new L(this._exit || this._groups.map(se), this._parents);
}
function Je(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Qe(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), a = new Array(i), l = 0; l < o; ++l)
    for (var u = n[l], f = r[l], d = u.length, c = a[l] = new Array(d), g, w = 0; w < d; ++w)
      (g = u[w] || f[w]) && (c[w] = g);
  for (; l < i; ++l)
    a[l] = n[l];
  return new L(a, this._parents);
}
function We() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function je(t) {
  t || (t = tn);
  function e(d, c) {
    return d && c ? t(d.__data__, c.__data__) : !d - !c;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], a = o.length, l = i[s] = new Array(a), u, f = 0; f < a; ++f)
      (u = o[f]) && (l[f] = u);
    l.sort(e);
  }
  return new L(i, this._parents).order();
}
function tn(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function en() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function nn() {
  return Array.from(this);
}
function rn() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o) return o;
    }
  return null;
}
function sn() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function on() {
  return !this.node();
}
function an(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, a; s < o; ++s)
      (a = i[s]) && t.call(a, a.__data__, s, i);
  return this;
}
function un(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ln(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function cn(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function fn(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function hn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function dn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function gn(t, e) {
  var n = ee(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? ln : un : typeof e == "function" ? n.local ? dn : hn : n.local ? fn : cn)(n, e));
}
function oe(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function mn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function pn(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function yn(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function xn(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? mn : typeof e == "function" ? yn : pn)(t, e, n ?? "")) : _n(this.node(), t);
}
function _n(t, e) {
  return t.style.getPropertyValue(e) || oe(t).getComputedStyle(t, null).getPropertyValue(e);
}
function wn(t) {
  return function() {
    delete this[t];
  };
}
function bn(t, e) {
  return function() {
    this[t] = e;
  };
}
function vn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Mn(t, e) {
  return arguments.length > 1 ? this.each((e == null ? wn : typeof e == "function" ? vn : bn)(t, e)) : this.node()[t];
}
function ae(t) {
  return t.trim().split(/^|\s+/);
}
function Et(t) {
  return t.classList || new ue(t);
}
function ue(t) {
  this._node = t, this._names = ae(t.getAttribute("class") || "");
}
ue.prototype = {
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
function le(t, e) {
  for (var n = Et(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function ce(t, e) {
  for (var n = Et(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function kn(t) {
  return function() {
    le(this, t);
  };
}
function An(t) {
  return function() {
    ce(this, t);
  };
}
function Nn(t, e) {
  return function() {
    (e.apply(this, arguments) ? le : ce)(this, t);
  };
}
function $n(t, e) {
  var n = ae(t + "");
  if (arguments.length < 2) {
    for (var r = Et(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Nn : e ? kn : An)(n, e));
}
function Sn() {
  this.textContent = "";
}
function Rn(t) {
  return function() {
    this.textContent = t;
  };
}
function En(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ln(t) {
  return arguments.length ? this.each(t == null ? Sn : (typeof t == "function" ? En : Rn)(t)) : this.node().textContent;
}
function Cn() {
  this.innerHTML = "";
}
function Xn(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Tn(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Dn(t) {
  return arguments.length ? this.each(t == null ? Cn : (typeof t == "function" ? Tn : Xn)(t)) : this.node().innerHTML;
}
function Pn() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Fn() {
  return this.each(Pn);
}
function On() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function zn() {
  return this.each(On);
}
function Hn(t) {
  var e = typeof t == "function" ? t : Rt(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function qn() {
  return null;
}
function In(t, e) {
  var n = typeof t == "function" ? t : Rt(t), r = e == null ? qn : typeof e == "function" ? e : ne(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Vn() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Bn() {
  return this.each(Vn);
}
function Un() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Yn() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Gn(t) {
  return this.select(t ? Yn : Un);
}
function Kn(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Zn(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Jn(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Qn(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Wn(t, e, n) {
  return function() {
    var r = this.__on, i, s = Zn(e);
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
function jn(t, e, n) {
  var r = Jn(t + ""), i, s = r.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, u = a.length, f; l < u; ++l)
        for (i = 0, f = a[l]; i < s; ++i)
          if ((o = r[i]).type === f.type && o.name === f.name)
            return f.value;
    }
    return;
  }
  for (a = e ? Wn : Qn, i = 0; i < s; ++i) this.each(a(r[i], e, n));
  return this;
}
function fe(t, e, n) {
  var r = oe(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function tr(t, e) {
  return function() {
    return fe(this, t, e);
  };
}
function er(t, e) {
  return function() {
    return fe(this, t, e.apply(this, arguments));
  };
}
function nr(t, e) {
  return this.each((typeof e == "function" ? er : tr)(t, e));
}
function* rr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var he = [null];
function L(t, e) {
  this._groups = t, this._parents = e;
}
function ir() {
  return this;
}
L.prototype = {
  constructor: L,
  select: $e,
  selectAll: Le,
  selectChild: Pe,
  selectChildren: He,
  filter: qe,
  data: Ge,
  enter: Ie,
  exit: Ze,
  join: Je,
  merge: Qe,
  selection: ir,
  order: We,
  sort: je,
  call: en,
  nodes: nn,
  node: rn,
  size: sn,
  empty: on,
  each: an,
  attr: gn,
  style: xn,
  property: Mn,
  classed: $n,
  text: Ln,
  html: Dn,
  raise: Fn,
  lower: zn,
  append: Hn,
  insert: In,
  remove: Bn,
  clone: Gn,
  datum: Kn,
  on: jn,
  dispatch: nr,
  [Symbol.iterator]: rr
};
function Y(t) {
  return typeof t == "string" ? new L([[document.querySelector(t)]], [document.documentElement]) : new L([[t]], he);
}
function sr(t) {
  return Y(Rt(t).call(document.documentElement));
}
function or(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function vt(t, e) {
  if (t = or(t), e === void 0 && (e = t.currentTarget), e) {
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
function ar(t) {
  return typeof t == "string" ? new L([document.querySelectorAll(t)], [document.documentElement]) : new L([re(t)], he);
}
var ur = { value: () => {
} };
function de() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new st(n);
}
function st(t) {
  this._ = t;
}
function lr(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
st.prototype = de.prototype = {
  constructor: st,
  on: function(t, e) {
    var n = this._, r = lr(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((i = (t = r[s]).type) && (i = cr(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (i = (t = r[s]).type) n[i] = Pt(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Pt(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new st(t);
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
function cr(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Pt(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = ur, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const fr = { passive: !1 }, Z = { capture: !0, passive: !1 };
function xt(t) {
  t.stopImmediatePropagation();
}
function B(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function hr(t) {
  var e = t.document.documentElement, n = Y(t).on("dragstart.drag", B, Z);
  "onselectstart" in e ? n.on("selectstart.drag", B, Z) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function dr(t, e) {
  var n = t.document.documentElement, r = Y(t).on("dragstart.drag", null);
  e && (r.on("click.drag", B, Z), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const et = (t) => () => t;
function Mt(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: i,
  active: s,
  x: o,
  y: a,
  dx: l,
  dy: u,
  dispatch: f
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
    dx: { value: l, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: f }
  });
}
Mt.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function gr(t) {
  return !t.ctrlKey && !t.button;
}
function mr() {
  return this.parentNode;
}
function pr(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function yr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function xr() {
  var t = gr, e = mr, n = pr, r = yr, i = {}, s = de("start", "drag", "end"), o = 0, a, l, u, f, d = 0;
  function c(h) {
    h.on("mousedown.drag", g).filter(r).on("touchstart.drag", R).on("touchmove.drag", C, fr).on("touchend.drag touchcancel.drag", N).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function g(h, p) {
    if (!(f || !t.call(this, h, p))) {
      var _ = v(this, e.call(this, h, p), h, p, "mouse");
      _ && (Y(h.view).on("mousemove.drag", w, Z).on("mouseup.drag", X, Z), hr(h.view), xt(h), u = !1, a = h.clientX, l = h.clientY, _("start", h));
    }
  }
  function w(h) {
    if (B(h), !u) {
      var p = h.clientX - a, _ = h.clientY - l;
      u = p * p + _ * _ > d;
    }
    i.mouse("drag", h);
  }
  function X(h) {
    Y(h.view).on("mousemove.drag mouseup.drag", null), dr(h.view, u), B(h), i.mouse("end", h);
  }
  function R(h, p) {
    if (t.call(this, h, p)) {
      var _ = h.changedTouches, x = e.call(this, h, p), k = _.length, $, S;
      for ($ = 0; $ < k; ++$)
        (S = v(this, x, h, p, _[$].identifier, _[$])) && (xt(h), S("start", h, _[$]));
    }
  }
  function C(h) {
    var p = h.changedTouches, _ = p.length, x, k;
    for (x = 0; x < _; ++x)
      (k = i[p[x].identifier]) && (B(h), k("drag", h, p[x]));
  }
  function N(h) {
    var p = h.changedTouches, _ = p.length, x, k;
    for (f && clearTimeout(f), f = setTimeout(function() {
      f = null;
    }, 500), x = 0; x < _; ++x)
      (k = i[p[x].identifier]) && (xt(h), k("end", h, p[x]));
  }
  function v(h, p, _, x, k, $) {
    var S = s.copy(), m = vt($ || _, p), A, M, D;
    if ((D = n.call(h, new Mt("beforestart", {
      sourceEvent: _,
      target: c,
      identifier: k,
      active: o,
      x: m[0],
      y: m[1],
      dx: 0,
      dy: 0,
      dispatch: S
    }), x)) != null)
      return A = D.x - m[0] || 0, M = D.y - m[1] || 0, function tt(O, z, I) {
        var T = m, yt;
        switch (O) {
          case "start":
            i[k] = tt, yt = o++;
            break;
          case "end":
            delete i[k], --o;
          // falls through
          case "drag":
            m = vt(I || z, p), yt = o;
            break;
        }
        S.call(
          O,
          h,
          new Mt(O, {
            sourceEvent: z,
            subject: D,
            target: c,
            identifier: k,
            active: yt,
            x: m[0] + A,
            y: m[1] + M,
            dx: m[0] - T[0],
            dy: m[1] - T[1],
            dispatch: S
          }),
          x
        );
      };
  }
  return c.filter = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : et(!!h), c) : t;
  }, c.container = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : et(h), c) : e;
  }, c.subject = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : et(h), c) : n;
  }, c.touchable = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : et(!!h), c) : r;
  }, c.on = function() {
    var h = s.on.apply(s, arguments);
    return h === s ? c : h;
  }, c.clickDistance = function(h) {
    return arguments.length ? (d = (h = +h) * h, c) : Math.sqrt(d);
  }, c;
}
function _r(t) {
  return t;
}
var ot = 1, at = 2, kt = 3, K = 4, Ft = 1e-6;
function wr(t) {
  return "translate(" + t + ",0)";
}
function br(t) {
  return "translate(0," + t + ")";
}
function vr(t) {
  return (e) => +t(e);
}
function Mr(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function kr() {
  return !this.__axis;
}
function pt(t, e) {
  var n = [], r = null, i = null, s = 6, o = 6, a = 3, l = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, u = t === ot || t === K ? -1 : 1, f = t === K || t === at ? "x" : "y", d = t === ot || t === kt ? wr : br;
  function c(g) {
    var w = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), X = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : _r), R = Math.max(s, 0) + a, C = e.range(), N = +C[0] + l, v = +C[C.length - 1] + l, h = (e.bandwidth ? Mr : vr)(e.copy(), l), p = g.selection ? g.selection() : g, _ = p.selectAll(".domain").data([null]), x = p.selectAll(".tick").data(w, e).order(), k = x.exit(), $ = x.enter().append("g").attr("class", "tick"), S = x.select("line"), m = x.select("text");
    _ = _.merge(_.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), x = x.merge($), S = S.merge($.append("line").attr("stroke", "currentColor").attr(f + "2", u * s)), m = m.merge($.append("text").attr("fill", "currentColor").attr(f, u * R).attr("dy", t === ot ? "0em" : t === kt ? "0.71em" : "0.32em")), g !== p && (_ = _.transition(g), x = x.transition(g), S = S.transition(g), m = m.transition(g), k = k.transition(g).attr("opacity", Ft).attr("transform", function(A) {
      return isFinite(A = h(A)) ? d(A + l) : this.getAttribute("transform");
    }), $.attr("opacity", Ft).attr("transform", function(A) {
      var M = this.parentNode.__axis;
      return d((M && isFinite(M = M(A)) ? M : h(A)) + l);
    })), k.remove(), _.attr("d", t === K || t === at ? o ? "M" + u * o + "," + N + "H" + l + "V" + v + "H" + u * o : "M" + l + "," + N + "V" + v : o ? "M" + N + "," + u * o + "V" + l + "H" + v + "V" + u * o : "M" + N + "," + l + "H" + v), x.attr("opacity", 1).attr("transform", function(A) {
      return d(h(A) + l);
    }), S.attr(f + "2", u * s), m.attr(f, u * R).text(X), p.filter(kr).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === at ? "start" : t === K ? "end" : "middle"), p.each(function() {
      this.__axis = h;
    });
  }
  return c.scale = function(g) {
    return arguments.length ? (e = g, c) : e;
  }, c.ticks = function() {
    return n = Array.from(arguments), c;
  }, c.tickArguments = function(g) {
    return arguments.length ? (n = g == null ? [] : Array.from(g), c) : n.slice();
  }, c.tickValues = function(g) {
    return arguments.length ? (r = g == null ? null : Array.from(g), c) : r && r.slice();
  }, c.tickFormat = function(g) {
    return arguments.length ? (i = g, c) : i;
  }, c.tickSize = function(g) {
    return arguments.length ? (s = o = +g, c) : s;
  }, c.tickSizeInner = function(g) {
    return arguments.length ? (s = +g, c) : s;
  }, c.tickSizeOuter = function(g) {
    return arguments.length ? (o = +g, c) : o;
  }, c.tickPadding = function(g) {
    return arguments.length ? (a = +g, c) : a;
  }, c.offset = function(g) {
    return arguments.length ? (l = +g, c) : l;
  }, c;
}
function Ar(t) {
  return pt(ot, t);
}
function Nr(t) {
  return pt(at, t);
}
function $r(t) {
  return pt(kt, t);
}
function Sr(t) {
  return pt(K, t);
}
function ut(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Rr(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ge(t) {
  let e, n, r;
  t.length !== 2 ? (e = ut, n = (a, l) => ut(t(a), l), r = (a, l) => t(a) - l) : (e = t === ut || t === Rr ? t : Er, n = t, r = t);
  function i(a, l, u = 0, f = a.length) {
    if (u < f) {
      if (e(l, l) !== 0) return f;
      do {
        const d = u + f >>> 1;
        n(a[d], l) < 0 ? u = d + 1 : f = d;
      } while (u < f);
    }
    return u;
  }
  function s(a, l, u = 0, f = a.length) {
    if (u < f) {
      if (e(l, l) !== 0) return f;
      do {
        const d = u + f >>> 1;
        n(a[d], l) <= 0 ? u = d + 1 : f = d;
      } while (u < f);
    }
    return u;
  }
  function o(a, l, u = 0, f = a.length) {
    const d = i(a, l, u, f - 1);
    return d > u && r(a[d - 1], l) > -r(a[d], l) ? d - 1 : d;
  }
  return { left: i, center: o, right: s };
}
function Er() {
  return 0;
}
function Lr(t) {
  return t === null ? NaN : +t;
}
const Cr = ge(ut), Xr = Cr.right;
ge(Lr).center;
const Tr = Math.sqrt(50), Dr = Math.sqrt(10), Pr = Math.sqrt(2);
function ct(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), s = r / Math.pow(10, i), o = s >= Tr ? 10 : s >= Dr ? 5 : s >= Pr ? 2 : 1;
  let a, l, u;
  return i < 0 ? (u = Math.pow(10, -i) / o, a = Math.round(t * u), l = Math.round(e * u), a / u < t && ++a, l / u > e && --l, u = -u) : (u = Math.pow(10, i) * o, a = Math.round(t / u), l = Math.round(e / u), a * u < t && ++a, l * u > e && --l), l < a && 0.5 <= n && n < 2 ? ct(t, e, n * 2) : [a, l, u];
}
function Fr(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, s, o] = r ? ct(e, t, n) : ct(t, e, n);
  if (!(s >= i)) return [];
  const a = s - i + 1, l = new Array(a);
  if (r)
    if (o < 0) for (let u = 0; u < a; ++u) l[u] = (s - u) / -o;
    else for (let u = 0; u < a; ++u) l[u] = (s - u) * o;
  else if (o < 0) for (let u = 0; u < a; ++u) l[u] = (i + u) / -o;
  else for (let u = 0; u < a; ++u) l[u] = (i + u) * o;
  return l;
}
function At(t, e, n) {
  return e = +e, t = +t, n = +n, ct(t, e, n)[2];
}
function Or(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? At(e, t, n) : At(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function zr(t, e) {
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
function Lt(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function me(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function j() {
}
var J = 0.7, ft = 1 / J, U = "\\s*([+-]?\\d+)\\s*", Q = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", F = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Hr = /^#([0-9a-f]{3,8})$/, qr = new RegExp(`^rgb\\(${U},${U},${U}\\)$`), Ir = new RegExp(`^rgb\\(${F},${F},${F}\\)$`), Vr = new RegExp(`^rgba\\(${U},${U},${U},${Q}\\)$`), Br = new RegExp(`^rgba\\(${F},${F},${F},${Q}\\)$`), Ur = new RegExp(`^hsl\\(${Q},${F},${F}\\)$`), Yr = new RegExp(`^hsla\\(${Q},${F},${F},${Q}\\)$`), Ot = {
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
Lt(j, W, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: zt,
  // Deprecated! Use color.formatHex.
  formatHex: zt,
  formatHex8: Gr,
  formatHsl: Kr,
  formatRgb: Ht,
  toString: Ht
});
function zt() {
  return this.rgb().formatHex();
}
function Gr() {
  return this.rgb().formatHex8();
}
function Kr() {
  return pe(this).formatHsl();
}
function Ht() {
  return this.rgb().formatRgb();
}
function W(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Hr.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? qt(e) : n === 3 ? new E(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? nt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? nt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = qr.exec(t)) ? new E(e[1], e[2], e[3], 1) : (e = Ir.exec(t)) ? new E(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Vr.exec(t)) ? nt(e[1], e[2], e[3], e[4]) : (e = Br.exec(t)) ? nt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Ur.exec(t)) ? Bt(e[1], e[2] / 100, e[3] / 100, 1) : (e = Yr.exec(t)) ? Bt(e[1], e[2] / 100, e[3] / 100, e[4]) : Ot.hasOwnProperty(t) ? qt(Ot[t]) : t === "transparent" ? new E(NaN, NaN, NaN, 0) : null;
}
function qt(t) {
  return new E(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function nt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new E(t, e, n, r);
}
function Zr(t) {
  return t instanceof j || (t = W(t)), t ? (t = t.rgb(), new E(t.r, t.g, t.b, t.opacity)) : new E();
}
function Nt(t, e, n, r) {
  return arguments.length === 1 ? Zr(t) : new E(t, e, n, r ?? 1);
}
function E(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Lt(E, Nt, me(j, {
  brighter(t) {
    return t = t == null ? ft : Math.pow(ft, t), new E(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? J : Math.pow(J, t), new E(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new E(q(this.r), q(this.g), q(this.b), ht(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: It,
  // Deprecated! Use color.formatHex.
  formatHex: It,
  formatHex8: Jr,
  formatRgb: Vt,
  toString: Vt
}));
function It() {
  return `#${H(this.r)}${H(this.g)}${H(this.b)}`;
}
function Jr() {
  return `#${H(this.r)}${H(this.g)}${H(this.b)}${H((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Vt() {
  const t = ht(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${q(this.r)}, ${q(this.g)}, ${q(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ht(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function q(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function H(t) {
  return t = q(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Bt(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new P(t, e, n, r);
}
function pe(t) {
  if (t instanceof P) return new P(t.h, t.s, t.l, t.opacity);
  if (t instanceof j || (t = W(t)), !t) return new P();
  if (t instanceof P) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, a = s - i, l = (s + i) / 2;
  return a ? (e === s ? o = (n - r) / a + (n < r) * 6 : n === s ? o = (r - e) / a + 2 : o = (e - n) / a + 4, a /= l < 0.5 ? s + i : 2 - s - i, o *= 60) : a = l > 0 && l < 1 ? 0 : o, new P(o, a, l, t.opacity);
}
function Qr(t, e, n, r) {
  return arguments.length === 1 ? pe(t) : new P(t, e, n, r ?? 1);
}
function P(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Lt(P, Qr, me(j, {
  brighter(t) {
    return t = t == null ? ft : Math.pow(ft, t), new P(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? J : Math.pow(J, t), new P(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new E(
      _t(t >= 240 ? t - 240 : t + 120, i, r),
      _t(t, i, r),
      _t(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new P(Ut(this.h), rt(this.s), rt(this.l), ht(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ht(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Ut(this.h)}, ${rt(this.s) * 100}%, ${rt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Ut(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function rt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function _t(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Ct = (t) => () => t;
function Wr(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function jr(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function ti(t) {
  return (t = +t) == 1 ? ye : function(e, n) {
    return n - e ? jr(e, n, t) : Ct(isNaN(e) ? n : e);
  };
}
function ye(t, e) {
  var n = e - t;
  return n ? Wr(t, n) : Ct(isNaN(t) ? e : t);
}
const Yt = function t(e) {
  var n = ti(e);
  function r(i, s) {
    var o = n((i = Nt(i)).r, (s = Nt(s)).r), a = n(i.g, s.g), l = n(i.b, s.b), u = ye(i.opacity, s.opacity);
    return function(f) {
      return i.r = o(f), i.g = a(f), i.b = l(f), i.opacity = u(f), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function ei(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function ni(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function ri(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o) i[o] = Xt(t[o], e[o]);
  for (; o < n; ++o) s[o] = e[o];
  return function(a) {
    for (o = 0; o < r; ++o) s[o] = i[o](a);
    return s;
  };
}
function ii(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function dt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function si(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Xt(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var $t = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, wt = new RegExp($t.source, "g");
function oi(t) {
  return function() {
    return t;
  };
}
function ai(t) {
  return function(e) {
    return t(e) + "";
  };
}
function ui(t, e) {
  var n = $t.lastIndex = wt.lastIndex = 0, r, i, s, o = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = $t.exec(t)) && (i = wt.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), a[o] ? a[o] += s : a[++o] = s), (r = r[0]) === (i = i[0]) ? a[o] ? a[o] += i : a[++o] = i : (a[++o] = null, l.push({ i: o, x: dt(r, i) })), n = wt.lastIndex;
  return n < e.length && (s = e.slice(n), a[o] ? a[o] += s : a[++o] = s), a.length < 2 ? l[0] ? ai(l[0].x) : oi(e) : (e = l.length, function(u) {
    for (var f = 0, d; f < e; ++f) a[(d = l[f]).i] = d.x(u);
    return a.join("");
  });
}
function Xt(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Ct(e) : (n === "number" ? dt : n === "string" ? (r = W(e)) ? (e = r, Yt) : ui : e instanceof W ? Yt : e instanceof Date ? ii : ni(e) ? ei : Array.isArray(e) ? ri : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? si : dt)(t, e);
}
function li(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
function ci(t) {
  return function() {
    return t;
  };
}
function fi(t) {
  return +t;
}
var Gt = [0, 1];
function V(t) {
  return t;
}
function St(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : ci(isNaN(e) ? NaN : 0.5);
}
function hi(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function di(t, e, n) {
  var r = t[0], i = t[1], s = e[0], o = e[1];
  return i < r ? (r = St(i, r), s = n(o, s)) : (r = St(r, i), s = n(s, o)), function(a) {
    return s(r(a));
  };
}
function gi(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), s = new Array(r), o = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++o < r; )
    i[o] = St(t[o], t[o + 1]), s[o] = n(e[o], e[o + 1]);
  return function(a) {
    var l = Xr(t, a, 1, r) - 1;
    return s[l](i[l](a));
  };
}
function mi(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function pi() {
  var t = Gt, e = Gt, n = Xt, r, i, s, o = V, a, l, u;
  function f() {
    var c = Math.min(t.length, e.length);
    return o !== V && (o = hi(t[0], t[c - 1])), a = c > 2 ? gi : di, l = u = null, d;
  }
  function d(c) {
    return c == null || isNaN(c = +c) ? s : (l || (l = a(t.map(r), e, n)))(r(o(c)));
  }
  return d.invert = function(c) {
    return o(i((u || (u = a(e, t.map(r), dt)))(c)));
  }, d.domain = function(c) {
    return arguments.length ? (t = Array.from(c, fi), f()) : t.slice();
  }, d.range = function(c) {
    return arguments.length ? (e = Array.from(c), f()) : e.slice();
  }, d.rangeRound = function(c) {
    return e = Array.from(c), n = li, f();
  }, d.clamp = function(c) {
    return arguments.length ? (o = c ? !0 : V, f()) : o !== V;
  }, d.interpolate = function(c) {
    return arguments.length ? (n = c, f()) : n;
  }, d.unknown = function(c) {
    return arguments.length ? (s = c, d) : s;
  }, function(c, g) {
    return r = c, i = g, f();
  };
}
function yi() {
  return pi()(V, V);
}
function xi(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function gt(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function G(t) {
  return t = gt(Math.abs(t)), t ? t[1] : NaN;
}
function _i(t, e) {
  return function(n, r) {
    for (var i = n.length, s = [], o = 0, a = t[0], l = 0; i > 0 && a > 0 && (l + a + 1 > r && (a = Math.max(1, r - l)), s.push(n.substring(i -= a, i + a)), !((l += a + 1) > r)); )
      a = t[o = (o + 1) % t.length];
    return s.reverse().join(e);
  };
}
function wi(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var bi = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function mt(t) {
  if (!(e = bi.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Tt({
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
mt.prototype = Tt.prototype;
function Tt(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Tt.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function vi(t) {
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
var xe;
function Mi(t, e) {
  var n = gt(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], s = i - (xe = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
  return s === o ? r : s > o ? r + new Array(s - o + 1).join("0") : s > 0 ? r.slice(0, s) + "." + r.slice(s) : "0." + new Array(1 - s).join("0") + gt(t, Math.max(0, e + s - 1))[0];
}
function Kt(t, e) {
  var n = gt(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Zt = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: xi,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Kt(t * 100, e),
  r: Kt,
  s: Mi,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Jt(t) {
  return t;
}
var Qt = Array.prototype.map, Wt = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function ki(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Jt : _i(Qt.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", s = t.numerals === void 0 ? Jt : wi(Qt.call(t.numerals, String)), o = t.percent === void 0 ? "%" : t.percent + "", a = t.minus === void 0 ? "−" : t.minus + "", l = t.nan === void 0 ? "NaN" : t.nan + "";
  function u(d) {
    d = mt(d);
    var c = d.fill, g = d.align, w = d.sign, X = d.symbol, R = d.zero, C = d.width, N = d.comma, v = d.precision, h = d.trim, p = d.type;
    p === "n" ? (N = !0, p = "g") : Zt[p] || (v === void 0 && (v = 12), h = !0, p = "g"), (R || c === "0" && g === "=") && (R = !0, c = "0", g = "=");
    var _ = X === "$" ? n : X === "#" && /[boxX]/.test(p) ? "0" + p.toLowerCase() : "", x = X === "$" ? r : /[%p]/.test(p) ? o : "", k = Zt[p], $ = /[defgprs%]/.test(p);
    v = v === void 0 ? 6 : /[gprs]/.test(p) ? Math.max(1, Math.min(21, v)) : Math.max(0, Math.min(20, v));
    function S(m) {
      var A = _, M = x, D, tt, O;
      if (p === "c")
        M = k(m) + M, m = "";
      else {
        m = +m;
        var z = m < 0 || 1 / m < 0;
        if (m = isNaN(m) ? l : k(Math.abs(m), v), h && (m = vi(m)), z && +m == 0 && w !== "+" && (z = !1), A = (z ? w === "(" ? w : a : w === "-" || w === "(" ? "" : w) + A, M = (p === "s" ? Wt[8 + xe / 3] : "") + M + (z && w === "(" ? ")" : ""), $) {
          for (D = -1, tt = m.length; ++D < tt; )
            if (O = m.charCodeAt(D), 48 > O || O > 57) {
              M = (O === 46 ? i + m.slice(D + 1) : m.slice(D)) + M, m = m.slice(0, D);
              break;
            }
        }
      }
      N && !R && (m = e(m, 1 / 0));
      var I = A.length + m.length + M.length, T = I < C ? new Array(C - I + 1).join(c) : "";
      switch (N && R && (m = e(T + m, T.length ? C - M.length : 1 / 0), T = ""), g) {
        case "<":
          m = A + m + M + T;
          break;
        case "=":
          m = A + T + m + M;
          break;
        case "^":
          m = T.slice(0, I = T.length >> 1) + A + m + M + T.slice(I);
          break;
        default:
          m = T + A + m + M;
          break;
      }
      return s(m);
    }
    return S.toString = function() {
      return d + "";
    }, S;
  }
  function f(d, c) {
    var g = u((d = mt(d), d.type = "f", d)), w = Math.max(-8, Math.min(8, Math.floor(G(c) / 3))) * 3, X = Math.pow(10, -w), R = Wt[8 + w / 3];
    return function(C) {
      return g(X * C) + R;
    };
  }
  return {
    format: u,
    formatPrefix: f
  };
}
var it, _e, we;
Ai({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Ai(t) {
  return it = ki(t), _e = it.format, we = it.formatPrefix, it;
}
function Ni(t) {
  return Math.max(0, -G(Math.abs(t)));
}
function $i(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(G(e) / 3))) * 3 - G(Math.abs(t)));
}
function Si(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, G(e) - G(t)) + 1;
}
function Ri(t, e, n, r) {
  var i = Or(t, e, n), s;
  switch (r = mt(r ?? ",f"), r.type) {
    case "s": {
      var o = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(s = $i(i, o)) && (r.precision = s), we(r, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(s = Si(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = s - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(s = Ni(i)) && (r.precision = s - (r.type === "%") * 2);
      break;
    }
  }
  return _e(r);
}
function Ei(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return Fr(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return Ri(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, s = r.length - 1, o = r[i], a = r[s], l, u, f = 10;
    for (a < o && (u = o, o = a, a = u, u = i, i = s, s = u); f-- > 0; ) {
      if (u = At(o, a, n), u === l)
        return r[i] = o, r[s] = a, e(r);
      if (u > 0)
        o = Math.floor(o / u) * u, a = Math.ceil(a / u) * u;
      else if (u < 0)
        o = Math.ceil(o * u) / u, a = Math.floor(a * u) / u;
      else
        break;
      l = u;
    }
    return t;
  }, t;
}
function be() {
  var t = yi();
  return t.copy = function() {
    return mi(t, be());
  }, zr.apply(t, arguments), Ei(t);
}
class b {
}
y(b, "create", sr), y(b, "select", Y), y(b, "selectAll", ar), y(b, "pointer", vt), y(b, "drag", xr), y(b, "scaleLinear", be), y(b, "axisTop", Ar), y(b, "axisBottom", $r), y(b, "axisRight", Nr), y(b, "axisLeft", Sr);
function Li() {
  return this.svg.selectAll("text").nodes().map((t) => {
    if (!t) return 0;
    const e = t.textContent.replace(/,/g, "").replace(/−/g, "-");
    return Number(e) || 0;
  });
}
function Ci() {
  const t = this.getMainTicks(), e = this.svg.selectAll(".tick").nodes().map((i) => {
    const s = i.getAttribute("transform"), o = this.__isX ? s.match(/translate\(([^,]+),/) : s.match(/translate\(0,([^,]+)/);
    return parseFloat(o[1]) || 0;
  }), n = (i) => {
    const s = [];
    let o = e[0], a = e[e.length - 1];
    const l = Math.abs(a - o) / (i * (e.length - 1));
    for (; o - l > 0; ) o -= l;
    for (; a + l < this.width; ) a += l;
    for (let u = o; u <= a; u += l) s.push(u);
    return s;
  }, r = Math.abs(t[0] - t[1]);
  return r >= 10 ? n(10) : r === 5 ? n(5) : r > 1 && r < 5 ? n(2) : n(1);
}
function Xi(t) {
  this.lines.add(Math.round(this.scaleLinear.invert(t))), this.lineRender();
}
function Ti(t) {
  this.lines.delete(t), this.lineRender();
}
function Di(t, e, n) {
  const r = this.__isX ? e : n, i = Math.max(this.width, this.height), s = 0, o = (this.lower - r) / t, a = (this.upper - r) / t;
  this.scaleLinear = b.scaleLinear([o, a], [s, i]), this.axis.scale(this.scaleLinear), this.svg.call(this.axis);
  const l = this.getSecondaryTicks();
  this.svg.selectAll(".ruler-secondary-tick").remove(), this.svg.append("svg:g").lower().classed("ruler-secondary-tick", !0).selectAll("line").data(l).join("svg:line").attr("x1", (u) => this.__isX ? u : 0).attr("y1", (u) => this.__isX ? 0 : u).attr("x2", (u) => this.__isX ? u : 5).attr("y2", (u) => this.__isX ? 5 : u).attr("stroke", "#5EA090").attr("stroke-width", "1").style("pointer-events", "none"), this.svg.selectAll(".tick").style("pointer-events", "none"), this.svg.selectAll(".tick text").attr("text-anchor", "start").attr("transform", this.__isX ? "translate(4,-6)" : "rotate(90) translate(-10, -12)"), this.lineRender(), this.meshRender(), this.svg.select(".domain").remove();
}
function Pi() {
  const t = b.drag().on("start", (n) => {
    this.__draggingLine = b.select(n.sourceEvent.target), document.body.style.cursor = "col-resize";
  }).on("drag", (n) => {
    if (!this.__draggingLine) return;
    const r = n.x, i = n.y, s = this.__draggingLine.datum(), o = Math.round(this.scaleLinear.invert(this.__isX ? r : i));
    this.lines.delete(s), this.__draggingLine.style(this.__isX ? "left" : "top", `${this.scaleLinear(o) - 0.4}px`).datum(o), this.lines.add(this.__draggingLine.datum()), this.tooltip.show().fixed(r + 8, i + 8).html(
      `${((this.scaleLinear(this.__draggingLine.datum()) - this.scaleLinear(0)) * 100 / (this.__isX ? this.observer.boardDOMRect.width : this.observer.boardDOMRect.width)).toFixed(2)}%`
    );
  }).on("end", (n) => {
    if (!this.__draggingLine) return;
    document.body.style.cursor = "default", this.tooltip.hidden();
    const [r, i] = b.pointer(n, this.observer.root);
    (this.__isX ? r : i) < 20 && (this.lineRemove(this.__draggingLine.datum()), console.log(this.lines)), this.__draggingLine = null;
  }), e = b.select(this.observer.root);
  e.selectAll(`.ruler-line-${this.type}`).remove(), e.selectAll(`div[class=ruler-line-${this.type}]`).data(Array.from(this.lines)).join("div").classed(`ruler-line-${this.type}`, !0).style("position", "absolute").style("width", this.__isX ? "5px" : "auto").style("height", this.__isX ? "auto" : "5px").style("display", "flex").style("justify-content", "center").style("flex-direction", this.__isX ? "row" : "column").style("left", (n) => this.__isX ? `${this.scaleLinear(n) - 0.4}px` : "20px").style("top", (n) => this.__isX ? "20px" : `${this.scaleLinear(n) - 0.4}px`).style("transform", this.__isX ? "translate(-50%, 0)" : "translate(0, -50%)").style("cursor", this.__isX ? "col-resize" : "row-resize").call(t).append("div").style("width", this.__isX ? "1px" : `${this.observer.rootDOMRect.width}px`).style("height", this.__isX ? `${this.observer.rootDOMRect.height}px` : "1px").style("background", "red").style("pointer-events", "none");
}
function jt() {
  this.observer.root.append(this.svg.node()), this.tooltip.mount();
}
class Fi {
  constructor() {
    y(this, "container", b.create("div").style("position", "fixed").style("background", "#333").style("color", "#FFF").style("padding", "3px 5px").style("border-radius", "4px").style("pointer-events", "none").style("font-size", "12px").style("display", "none"));
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
function Oi() {
  this.observer.root.append(this.mesh.node()), this.mesh.lower();
}
function zi() {
  this.mesh.remove();
}
function Hi() {
  const t = this.getMainTicks();
  if (Math.abs(t[0] - t[1]) <= 10) {
    this.meshMount();
    const e = this.__isX ? this.observer.rootDOMRect.height : this.observer.rootDOMRect.width, n = this.getSecondaryTicks();
    this.mesh.selectAll("line").data(n).join("svg:line").attr("x1", (r) => this.__isX ? r : 0).attr("y1", (r) => this.__isX ? 0 : r).attr("x2", (r) => this.__isX ? r : e).attr("y2", (r) => this.__isX ? e : r).attr("stroke", "#4DA5C9").attr("stroke-width", 1);
  } else
    this.meshUnmount();
}
class te {
  constructor(e, n) {
    y(this, "type");
    y(this, "svg");
    y(this, "mesh");
    y(this, "width");
    y(this, "height");
    y(this, "lower");
    y(this, "upper");
    y(this, "scaleLinear");
    y(this, "axis");
    y(this, "lines", /* @__PURE__ */ new Set());
    y(this, "tooltip", new Fi());
    y(this, "observer");
    y(this, "__draggingLine", null);
    y(this, "getMainTicks", Li);
    y(this, "getSecondaryTicks", Ci);
    y(this, "lineAdd", Xi);
    y(this, "lineRemove", Ti);
    y(this, "lineRender", Pi);
    y(this, "applyTransform", Di);
    y(this, "mount", jt);
    y(this, "unmount", jt);
    y(this, "meshMount", Oi);
    y(this, "meshUnmount", zi);
    y(this, "meshRender", Hi);
    this.observer = n;
    const r = n.boardCoord, i = Math.max(this.observer.rootDOMRect.width, this.observer.rootDOMRect.height), s = 0;
    this.type = e, this.width = this.__isX ? i : 20, this.height = this.__isX ? 20 : i, this.lower = -r[e], this.upper = i - r[e], this.scaleLinear = b.scaleLinear([this.lower, this.upper], [s, i]), this.axis = (this.__isX ? b.axisBottom(this.scaleLinear) : b.axisRight(this.scaleLinear)).ticks(20).tickSize(10).tickPadding(4), this.svg = b.create("svg:svg").attr("viewbox", [0, 0, this.width, this.height]).attr("width", this.width).attr("height", this.height).style("background", "#DCDCAF").style("position", "absolute").style("left", 0).style("top", 0).call(this.axis), this.svg.on("mousemove", (o) => {
      const [a, l] = b.pointer(o, this.svg);
      this.tooltip.show().fixed(this.__isX ? a + 4 : 24, this.__isX ? 24 : l + 4).html(
        `${(this.__isX ? Math.round(this.scaleLinear.invert(a)) * 100 / this.observer.boardDOMRect.width : Math.round(this.scaleLinear.invert(l)) * 100 / this.observer.boardDOMRect.height).toFixed(2)}%`
      );
    }).on("mouseout", () => {
      this.tooltip.hidden();
    }).on("click", (o) => {
      const [a, l] = b.pointer(o, this.svg);
      this.lineAdd(this.__isX ? a : l);
    }), this.mesh = b.create("svg").style("position", "absolute").style("left", 0).style("top", 0).attr("viewbox", [0, 0, this.observer.rootDOMRect.width, this.observer.rootDOMRect.height]).attr("width", this.observer.rootDOMRect.width).attr("height", this.observer.rootDOMRect.height).style("pointer-events", "none"), this.__isX && this.svg.append("rect").attr("x", 0).attr("y", 0).attr("width", 20).attr("height", 20).attr("fill", "#DCDCB4");
  }
  get __isX() {
    return this.type === "x";
  }
}
class Ii {
  constructor(e) {
    y(this, "x");
    y(this, "y");
    this.x = new te("x", e), this.y = new te("y", e), this.y.mount(), this.x.mount(), this.x.applyTransform(1, 0, 0), this.y.applyTransform(1, 0, 0);
  }
}
export {
  Ii as default
};
