var J = Object.defineProperty;
var V = (n, s, t) => s in n ? J(n, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[s] = t;
var E = (n, s, t) => V(n, typeof s != "symbol" ? s + "" : s, t);
const d = "__freemove";
class k {
  constructor({ x: s, y: t, h: e, w: r, node: l }) {
    E(this, "x");
    E(this, "y");
    E(this, "w");
    E(this, "h");
    E(this, "id");
    E(this, "node");
    this.x = s, this.y = t, this.h = e, this.w = r, this.node = l, this.id = l.dataset.id;
  }
  // 判断一个点是否在矩形里面
  isInSide(s) {
    return s.x >= this.x && s.x <= this.x + this.w && s.y >= this.y && s.y <= this.y + this.h;
  }
  isIntersect(s) {
    const t = this.x + 3, e = this.y + 3, r = this.x + this.w - 3, l = this.y + this.h - 3, u = s.x, g = s.y, o = s.x + s.w, a = s.y + s.h;
    return !(r < u || t > o || l < g || e > a);
  }
  getAlignLinePostion() {
    return {
      vl: this.x,
      vc: this.x + this.w / 2,
      vr: this.x + this.w,
      ht: this.y,
      hc: this.y + this.h / 2,
      hb: this.y + this.h
    };
  }
  // 从dom元素的style构建Rect对象
  static from(s) {
    return new k({
      x: parseFloat(s.style.left),
      y: parseFloat(s.style.top),
      w: parseFloat(s.style.width),
      h: parseFloat(s.style.height),
      node: s
    });
  }
  static error(s, t) {
  }
}
function m(n) {
  return typeof n == "number" ? `${n}px` : String(n);
}
function K(n, s, t = 0.1) {
  return Math.abs(n - s) <= t;
}
function S(n, s) {
  return n.getElementsByClassName(s)[0];
}
function w(n) {
  return document.createElementNS("http://www.w3.org/2000/svg", n);
}
function H(n) {
  return Number.isInteger(n) ? n.toFixed(0) : n.toFixed(1);
}
function tt(n, s) {
  if (!n.selected) return;
  const t = n.container.getBoundingClientRect();
  n.align.reRender(n), n.border.reRender(n), n.gap.reRender(n), n.distance.reRender(n);
  const e = n.selected.getBoundingClientRect();
  let r = s.clientX - e.left, l = s.clientY - e.top, u = null;
  function g(a) {
    u || (u = requestAnimationFrame(() => {
      if (!n.selected) return;
      let h = a.clientX - t.left - r, i = a.clientY - t.top - l;
      const c = n.container.clientWidth - n.selected.offsetWidth, y = n.container.clientHeight - n.selected.offsetHeight;
      h = Math.max(0, Math.min(h, c)), i = Math.max(0, Math.min(i, y)), n.selected.style.left = m(h), n.selected.style.top = m(i), n.align.reRender(n), n.border.reRender(n), n.gap.reRender(n), n.distance.reRender(n), u = null;
    }));
  }
  function o() {
    document.removeEventListener("pointermove", g), document.removeEventListener("pointerup", o), n.align.hidden(), n.distance.hidden(), u !== null && (cancelAnimationFrame(u), u = null);
  }
  document.addEventListener("pointermove", g), document.addEventListener("pointerup", o);
}
function et(n, s) {
  if (!n.selected) return;
  const t = n.container.getBoundingClientRect(), r = s.target.dataset.direction;
  if (!r) return;
  const l = k.from(n.selected);
  let u = s.clientX, g = s.clientY, o = l.w, a = l.h, h = l.x, i = l.y;
  const c = t.width, y = t.height;
  function f(b) {
    let p = b.clientX - u, v = b.clientY - g, A = o, L = a, F = h, C = i;
    r.includes("right") && (A = o + p), r.includes("left") && (A = o - p, F = h + p), r.includes("bottom") && (L = a + v), r.includes("top") && (L = a - v, C = i + v), F < 0 && (A += F, F = 0), C < 0 && (L += C, C = 0), F + A > c && (A = c - F), C + L > y && (L = y - C), A = Math.max(A, 10), L = Math.max(L, 10), n.resize.reRender(n, A, L, r, h, i, o, a), n.border.reRender(n);
  }
  function x() {
    n.resize.hidden(), document.removeEventListener("pointermove", f), document.removeEventListener("pointerup", x);
  }
  document.addEventListener("pointermove", f), document.addEventListener("pointerup", x);
}
function it(n, s) {
  const t = n.container.getBoundingClientRect(), e = s.clientX - t.left, r = s.clientY - t.top;
  function l(g) {
    const o = g.clientX - t.left, a = g.clientY - t.top;
    n.selector.reRender(n, e, r, o, a);
  }
  function u() {
    n.selector.hiddenSelector(), n.selector.showPreview(), document.removeEventListener("pointermove", l), document.removeEventListener("pointerup", u);
  }
  document.addEventListener("pointermove", l), document.addEventListener("pointerup", u);
}
function st(n) {
  n.svg.addEventListener("pointerdown", (s) => {
    s.preventDefault();
    const t = s.target;
    if (t.classList[0].includes(`${d}-border-point-`)) {
      const e = t.dataset.ownerId;
      for (let r = 0; r < n.nodes.length; r++)
        e === n.nodes[r].dataset.ownerId && n.setSelected(n.nodes[r]);
      n.selected && et(n, s);
      return;
    }
    if (t.classList.contains(`${d}-svg`)) {
      let e = null;
      for (const r of n.nodes) {
        const l = k.from(r);
        if (l.isInSide({ x: s.offsetX, y: s.offsetY })) {
          e = l;
          break;
        }
      }
      e && e.node.classList.contains(`${d}-movable-node`) && (n.selector.hiddenPreview(), n.setSelected(e.node), tt(n, s)), e || (n.border.hidden(), it(n, s));
    }
  });
}
function rt(n) {
  const s = /* @__PURE__ */ new Map();
  function t(o) {
    var h;
    const a = [];
    o.toSorted((i, c) => i.x - c.x).forEach((i) => {
      a.push({ value: i.x, type: "min", nodeRect: i }), a.push({ value: i.x + i.w, type: "max", nodeRect: i });
    }), a.sort((i, c) => i.value - c.value);
    for (let i = 0; i < a.length - 1; i++) {
      const c = [], y = [];
      if (a[i].type === "max" && a[i + 1].type === "min") {
        for (let b = 0; b <= i && a[i].value === a[i - b].value; b++)
          c.push(a[i - b]);
        for (let b = i + 1; b <= a.length && a[i + 1].value === a[b].value; b++)
          y.push(a[b]);
        const f = y[0].value - c[0].value, x = c[0].nodeRect.x;
        if (f > 0) {
          const b = Math.min(...c.map((A) => A.nodeRect.y), ...y.map((A) => A.nodeRect.y)), p = Math.max(
            ...c.map((A) => A.nodeRect.y + A.nodeRect.h),
            ...y.map((A) => A.nodeRect.y + A.nodeRect.h)
          ), v = {
            x,
            y: b,
            w: f,
            h: p - b,
            rect1: c.map((A) => A.nodeRect),
            rect2: y.map((A) => A.nodeRect)
          };
          s.has(f) ? (h = s.get(f)) == null || h.push(v) : s.set(f, [v]);
        }
      }
    }
  }
  function e() {
    s.forEach((o, a) => {
      const h = /* @__PURE__ */ new Map();
      o.forEach((i) => {
        h.has(i.x) ? h.get(i.x).push(i) : h.set(i.x, [i]);
      }), h.forEach((i, c) => {
        const y = [], f = [], x = /* @__PURE__ */ new Set(), b = /* @__PURE__ */ new Set();
        i == null || i.forEach((A) => {
          y.push(A.y), f.push(A.y + A.h), A.rect1.forEach((L) => x.add(L)), A.rect2.forEach((L) => b.add(L));
        });
        const p = Math.min(...y), v = Math.max(...f);
        h.set(c, [
          {
            x: c,
            y: p,
            h: v - p,
            w: a,
            rect1: Array.from(x),
            rect2: Array.from(b)
          }
        ]);
      }), s.set(a, Array.from(h.values()).flat());
    });
  }
  const r = [], l = k.from(n.selected);
  n.nodes.forEach((o) => {
    const a = k.from(o);
    r.push(a);
  }), r.sort((o, a) => o.x - a.x);
  const u = [], g = [];
  return r.forEach((o) => {
    o.y <= l.y && o.y + o.h >= l.y || o.y <= l.y + l.h / 2 && o.y + o.h >= l.y + l.h / 2 || o.y <= l.y + l.h && o.y + o.h >= l.y + l.h ? u.push(o) : g.push(o);
  }), t(u), g.forEach((o) => {
    u.push(o), t(u);
  }), e(), s;
}
function nt(n) {
  const s = /* @__PURE__ */ new Map();
  function t(o) {
    var h;
    const a = [];
    o.toSorted((i, c) => i.y - c.y).forEach((i) => {
      a.push({ value: i.y, type: "min", nodeRect: i }), a.push({ value: i.y + i.h, type: "max", nodeRect: i });
    }), a.sort((i, c) => i.value - c.value);
    for (let i = 0; i < a.length - 1; i++) {
      const c = [], y = [];
      if (a[i].type === "max" && a[i + 1].type === "min") {
        for (let b = 0; b <= i && a[i].value === a[i - b].value; b++)
          c.push(a[i - b]);
        for (let b = i + 1; b <= a.length && a[i + 1].value === a[b].value; b++)
          y.push(a[b]);
        const f = y[0].value - c[0].value, x = c[0].nodeRect.y;
        if (f > 0) {
          const b = Math.min(...c.map((A) => A.nodeRect.x), ...y.map((A) => A.nodeRect.x)), p = Math.max(
            ...c.map((A) => A.nodeRect.x + A.nodeRect.w),
            ...y.map((A) => A.nodeRect.x + A.nodeRect.w)
          ), v = {
            x: b,
            y: x,
            w: p - b,
            h: f,
            rect1: c.map((A) => A.nodeRect),
            rect2: y.map((A) => A.nodeRect)
          };
          s.has(f) ? (h = s.get(f)) == null || h.push(v) : s.set(f, [v]);
        }
      }
    }
  }
  function e() {
    s.forEach((o, a) => {
      const h = /* @__PURE__ */ new Map();
      o.forEach((i) => {
        h.has(i.y) ? h.get(i.y).push(i) : h.set(i.y, [i]);
      }), h.forEach((i, c) => {
        const y = [], f = [], x = /* @__PURE__ */ new Set(), b = /* @__PURE__ */ new Set();
        i == null || i.forEach((A) => {
          y.push(A.x), f.push(A.x + A.w), A.rect1.forEach((L) => x.add(L)), A.rect2.forEach((L) => b.add(L));
        });
        const p = Math.min(...y), v = Math.max(...f);
        h.set(c, [
          {
            x: p,
            y: c,
            h: a,
            w: v - p,
            rect1: Array.from(x),
            rect2: Array.from(b)
          }
        ]);
      }), s.set(a, Array.from(h.values()).flat());
    });
  }
  const r = [], l = k.from(n.selected);
  n.nodes.forEach((o) => {
    const a = k.from(o);
    r.push(a);
  }), r.sort((o, a) => o.y - a.y);
  const u = [], g = [];
  return r.forEach((o) => {
    o.x <= l.x && o.x + o.w >= l.x || o.x <= l.x + l.w / 2 && o.x + o.w >= l.x + l.w / 2 || o.x <= l.x + l.w && o.x + o.w >= l.x + l.w ? u.push(o) : g.push(o);
  }), t(u), g.forEach((o) => {
    u.push(o), t(u);
  }), e(), s;
}
class lt {
  constructor(s) {
    E(this, "g");
    this.g = w("g"), this.g.setAttribute("class", `${d}-gap`), s.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(s) {
    rt(s), nt(s);
  }
}
const ht = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let ct = (n = 21) => {
  let s = "", t = crypto.getRandomValues(new Uint8Array(n |= 0));
  for (; n--; )
    s += ht[t[n] & 63];
  return s;
};
const at = 1, ot = "red", R = ["vl", "vc", "vr", "ht", "hc", "hb"];
function ut(n, s) {
  const t = n.container.getBoundingClientRect(), e = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  let r = !1;
  function l() {
    const h = k.from(n.selected), i = n.nodes.filter((c) => c !== n.selected).map((c) => k.from(c));
    R.forEach((c) => e[c] = []), i.forEach((c) => {
      if (h.isIntersect(c)) return;
      const y = h.getAlignLinePostion();
      R.forEach((f) => {
        let x = 1e4, b = 1e4, p;
        /^h/.test(f) && (h.x > c.x + c.w ? (x = h.x + h.w, b = c.x) : h.x + h.w < c.x ? (x = h.x, b = c.x + c.w) : (x = Math.min(h.x, c.x), b = Math.max(h.x + h.w, c.x + c.w)), [c.y, c.y + c.h / 2, c.y + c.h].forEach((v) => {
          p = Math.abs(y[f] - v), p <= 3 && e[f].push({
            type: f,
            source: x,
            target: b,
            absorbDistance: p,
            absorbPosition: v,
            nodeRects: [c]
          });
        })), /^v/.test(f) && (h.y > c.y + c.h ? (x = h.y + h.h, b = c.y) : h.y + h.h < c.y ? (x = h.y, b = c.y + c.h) : (x = Math.min(h.y, c.y), b = Math.max(h.y + h.h, c.y + c.h)), [c.x, c.x + c.w / 2, c.x + c.w].forEach((v) => {
          p = Math.abs(y[f] - v), p <= 3 && e[f].push({
            type: f,
            source: x,
            target: b,
            absorbDistance: p,
            absorbPosition: v,
            nodeRects: [c]
          });
        }));
      });
    }), R.forEach((c) => {
      const y = /* @__PURE__ */ new Map();
      e[c].forEach((b) => {
        const p = y.get(b.absorbDistance) || [];
        p.push(b), y.set(b.absorbDistance, p);
      });
      let f = 1 / 0, x = 0;
      y.forEach((b) => {
        b.forEach((p) => {
          f = Math.min(f, p.source, p.target), x = Math.max(x, p.source, p.target);
        });
      }), y.forEach((b) => {
        b.forEach((p) => {
          p.source = f, p.target = x;
        });
      }), e[c] = Array.from(y.values()).flat();
    });
  }
  function u(h) {
    const { absorbPosition: i, type: c } = h, y = n.selected;
    switch (c) {
      case "ht":
        y.style.top = m(i);
        break;
      case "hc":
        y.style.top = m(i - parseFloat(y.style.height) / 2);
        break;
      case "hb":
        y.style.top = m(i - parseFloat(y.style.height));
        break;
      case "vl":
        y.style.left = m(i);
        break;
      case "vc":
        y.style.left = m(i - parseFloat(y.style.width) / 2);
        break;
      case "vr":
        y.style.left = m(i - parseFloat(y.style.width));
        break;
    }
    l(), n.border.reRender(n);
  }
  function g() {
    if (!n.selected) return;
    const h = k.from(n.selected), i = t.width / 2;
    Math.abs(h.x + h.w / 2 - i) <= 3 && (n.selected.style.left = m(i - h.w / 2), r = !0), l(), n.border.reRender(n);
  }
  function o() {
    if (!n.selected) return;
    const h = k.from(n.selected), i = Object.values(e).flat();
    if ([...e.hb, ...e.hc, ...e.ht].length === 0 ? s.isHAlign = !1 : s.isHAlign = !0, [...e.vc, ...e.vl, ...e.vr].length === 0 ? s.isVAlign = !1 : s.isVAlign = !0, i.forEach((c) => {
      const { source: y, target: f, type: x } = c, b = s.lines[x];
      if (/^h/.test(x))
        switch (b == null || b.setAttribute("x1", String(y)), b == null || b.setAttribute("x2", String(f)), x) {
          case "ht":
            b.setAttribute("y1", String(h.y)), b.setAttribute("y2", String(h.y));
            break;
          case "hc":
            b.setAttribute("y1", String(h.y + h.h / 2)), b.setAttribute("y2", String(h.y + h.h / 2));
            break;
          case "hb":
            b.setAttribute("y1", String(h.y + h.h)), b.setAttribute("y2", String(h.y + h.h));
            break;
        }
      if (/^v/.test(x))
        switch (b == null || b.setAttribute("y1", String(y)), b == null || b.setAttribute("y2", String(f)), x) {
          case "vl":
            b.setAttribute("x1", String(h.x)), b.setAttribute("x2", String(h.x));
            break;
          case "vc":
            b.setAttribute("x1", String(h.x + h.w / 2)), b.setAttribute("x2", String(h.x + h.w / 2));
            break;
          case "vr":
            b.setAttribute("x1", String(h.x + h.w)), b.setAttribute("x2", String(h.x + h.w));
            break;
        }
      b == null || b.setAttribute("style", "display: 'block");
    }), r) {
      const c = s.lines.vertical;
      c.setAttribute("x1", String(t.width / 2)), c.setAttribute("y1", String(0)), c.setAttribute("x2", String(t.width / 2)), c.setAttribute("y2", String(t.height)), c == null || c.setAttribute("style", "display: 'block");
    }
  }
  l(), Object.values(e).flat().forEach((h) => {
    u(h);
  }), g();
  let a = 1 / 0;
  R.forEach((h) => {
    e[h].forEach((i) => {
      i.absorbDistance < a && (a = i.absorbDistance);
    });
  }), R.forEach((h) => {
    e[h] = e[h].filter((i) => K(i.absorbDistance, a, 0.01));
  }), o();
}
class bt {
  constructor(s) {
    E(this, "g");
    E(this, "lines");
    E(this, "isHAlign", !1);
    E(this, "isVAlign", !1);
    this.g = w("g"), this.g.setAttribute("class", `${d}-align`), this.lines = {}, [...R, "vertical"].forEach((t) => {
      const e = w("line");
      e.setAttribute("class", `${d}-align-${t}`), e.setAttribute("stroke", ot), e.setAttribute("stroke-width", String(at)), e.style.display = "none", this.g.append(e), this.lines[t] = e;
    }), s.append(this.g);
  }
  hidden() {
    Object.values(this.lines).forEach((s) => {
      s.style.display = "none";
    });
  }
  reRender(s) {
    s.selected && (this.hidden(), ut(s, this));
  }
}
const T = 1, j = "#000", W = 6, Z = ["left", "top", "right", "bottom"], U = [
  "left-top",
  "top",
  "right-top",
  "right",
  "right-bottom",
  "bottom",
  "left-bottom",
  "left"
], dt = [
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize",
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize"
];
function gt() {
  const n = [], s = [];
  return Z.forEach((t) => {
    const e = w("line");
    e.setAttribute("class", `${d}-border-line-${t}`), e.setAttribute("stroke", j), e.setAttribute("stroke-width", m(T)), s.push(e);
  }), U.forEach((t, e) => {
    const r = w("rect");
    r.setAttribute("class", `${d}-border-point-${t}`), r.setAttribute("fill", "white"), r.setAttribute("stroke", j), r.setAttribute("stroke-width", m(T)), r.setAttribute("width", m(W)), r.setAttribute("height", m(W)), r.setAttribute("style", `cursor: ${dt[e]}`), r.setAttribute("data-direction", t), n.push(r);
  }), [n, s];
}
function yt(n, s) {
  const t = k.from(s);
  Z.forEach((e) => {
    const r = S(n, `${d}-border-line-${e}`);
    switch (e) {
      case "left":
        r.setAttribute("x1", String(t.x)), r.setAttribute("y1", String(t.y - T / 2)), r.setAttribute("x2", String(t.x)), r.setAttribute("y2", String(t.y + t.h + T / 2));
        break;
      case "right":
        r.setAttribute("x1", String(t.x + t.w)), r.setAttribute("y1", String(t.y - T / 2)), r.setAttribute("x2", String(t.x + t.w)), r.setAttribute("y2", String(t.y + t.h + T / 2));
        break;
      case "top":
        r.setAttribute("x1", String(t.x - T / 2)), r.setAttribute("y1", String(t.y)), r.setAttribute("x2", String(t.x + t.w + T / 2)), r.setAttribute("y2", String(t.y));
        break;
      case "bottom":
        r.setAttribute("x1", String(t.x - T / 2)), r.setAttribute("y1", String(t.y + t.h)), r.setAttribute("x2", String(t.x + t.w + T / 2)), r.setAttribute("y2", String(t.y + t.h));
        break;
    }
  }), U.forEach((e, r) => {
    const l = S(n, `${d}-border-point-${e}`);
    l.setAttribute("data-owner-id", s.dataset.id);
    const u = W / 2;
    switch (e) {
      case "left-top":
        l.setAttribute("x", String(t.x - u)), l.setAttribute("y", String(t.y - u));
        break;
      case "top":
        l.setAttribute("x", String(t.x + t.w / 2 - u)), l.setAttribute("y", String(t.y - u));
        break;
      case "right-top":
        l.setAttribute("x", String(t.x + t.w - u)), l.setAttribute("y", String(t.y - u));
        break;
      case "right":
        l.setAttribute("x", String(t.x + t.w - u)), l.setAttribute("y", String(t.y + t.h / 2 - u));
        break;
      case "right-bottom":
        l.setAttribute("x", String(t.x + t.w - u)), l.setAttribute("y", String(t.y + t.h - u));
        break;
      case "bottom":
        l.setAttribute("x", String(t.x + t.w / 2 - u)), l.setAttribute("y", String(t.y + t.h - u));
        break;
      case "left-bottom":
        l.setAttribute("x", String(t.x - u)), l.setAttribute("y", String(t.y + t.h - u));
        break;
      case "left":
        l.setAttribute("x", String(t.x - u)), l.setAttribute("y", String(t.y + t.h / 2 - u));
        break;
    }
  });
}
class At {
  constructor(s) {
    E(this, "g");
    E(this, "points");
    E(this, "lines");
    this.g = w("g"), this.g.setAttribute("class", `${d}-border`), s.append(this.g);
    const [t, e] = gt();
    this.points = t, this.lines = e, this.g.append(...e, ...t), this.g.style.display = "none";
  }
  hidden() {
    this.g.style.display = "none";
  }
  reRender(s) {
    s.selected && (this.g.style.display = "block", yt(this.g, s.selected));
  }
}
const _ = 1, O = "#2A63F4", I = 8, B = 10, Y = 10;
function q(n) {
  const s = n.nodes.map((r) => k.from(r)), t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
  return s.forEach((r) => {
    var g, o;
    const l = {
      type: "width",
      nodeRect: r
    }, u = {
      type: "height",
      nodeRect: r
    };
    t.has(r.w) ? (g = t.get(r.w)) == null || g.push(l) : t.set(r.w, [l]), e.has(r.h) ? (o = e.get(r.h)) == null || o.push(u) : e.set(r.h, [u]);
  }), {
    widthMap: t,
    heightMap: e
  };
}
function ft(n) {
  n.nodes.forEach((s) => {
    const t = k.from(s), e = n.resize.g.querySelector(`[data-ower-id="${t.id}"]`), r = S(e, `${d}-resize-line-group-width-line`), l = S(e, `${d}-resize-line-group-width-line-start`), u = S(e, `${d}-resize-line-group-width-line-end`), g = S(e, `${d}-resize-line-group-width-text`), o = S(e, `${d}-resize-line-group-height-line`), a = S(e, `${d}-resize-line-group-height-text`), h = S(e, `${d}-resize-line-group-height-line-start`), i = S(e, `${d}-resize-line-group-height-line-end`);
    r.setAttribute("x1", String(t.x)), r.setAttribute("y1", String(t.y - I)), r.setAttribute("x2", String(t.x + t.w)), r.setAttribute("y2", String(t.y - I)), l.setAttribute("x", String(t.x - _ / 2)), l.setAttribute("y", String(t.y - I - B / 2)), l.setAttribute("width", String(_)), l.setAttribute("height", String(B)), l.setAttribute("fill", String(O)), u.setAttribute("x", String(t.x + t.w - _ / 2)), u.setAttribute("y", String(t.y - I - B / 2)), u.setAttribute("width", String(_)), u.setAttribute("height", String(B)), u.setAttribute("fill", String(O)), g.textContent = `${H(t.w)}`, g.setAttribute("x", String(t.x + t.w / 2)), g.setAttribute("y", String(t.y - I - 8)), g.setAttribute("fill", String(O)), g.setAttribute("font-size", String(Y)), g.setAttribute("text-anchor", "middle"), g.setAttribute("alignment-baseline", "middle"), o.setAttribute("x1", String(t.x - I)), o.setAttribute("y1", String(t.y)), o.setAttribute("x2", String(t.x - I)), o.setAttribute("y2", String(t.y + t.h)), h.setAttribute("x", String(t.x - I - B / 2)), h.setAttribute("y", String(t.y - _ / 2)), h.setAttribute("width", String(B)), h.setAttribute("height", String(_)), h.setAttribute("fill", String(O)), i.setAttribute("x", String(t.x - I - B / 2)), i.setAttribute("y", String(t.y + t.h - _ / 2)), i.setAttribute("width", String(B)), i.setAttribute("height", String(_)), i.setAttribute("fill", String(O)), a.textContent = `${H(t.h)}`, a.setAttribute("x", String(t.x - I - 8)), a.setAttribute("y", String(t.y + t.h / 2)), a.setAttribute("fill", String(O)), a.setAttribute("font-size", String(Y)), a.setAttribute("text-anchor", "middle"), a.setAttribute("alignment-baseline", "middle"), a.setAttribute(
      "transform",
      `rotate(-90 ${t.x - I - 8} ${t.y + t.h / 2})`
    ), [r, o].forEach((c) => {
      c.setAttribute("stroke", O), c.setAttribute("stroke-width", String(_));
    });
  });
}
class xt {
  constructor(s, t) {
    E(this, "g");
    E(this, "lines");
    this.g = w("g"), this.g.setAttribute("class", `${d}-resize`);
    const e = [];
    t.forEach((r) => {
      const l = k.from(r), u = w("g");
      u.setAttribute("class", `${d}-resize-line`), u.setAttribute("data-ower-id", l.id);
      const g = w("g");
      g.setAttribute("class", `${d}-resize-line-group-width`);
      const o = w("line");
      o.setAttribute("class", `${d}-resize-line-group-width-line`);
      const a = w("text");
      a.setAttribute("class", `${d}-resize-line-group-width-text`);
      const h = w("rect");
      h.setAttribute("class", `${d}-resize-line-group-width-line-start`);
      const i = w("rect");
      i.setAttribute("class", `${d}-resize-line-group-width-line-end`), g.append(o, a, h, i);
      const c = w("g");
      c.setAttribute("class", `${d}-resize-line-group-height`);
      const y = w("line");
      y.setAttribute("class", `${d}-resize-line-group-height-line`);
      const f = w("text");
      f.setAttribute("class", `${d}-resize-line-group-height-text`);
      const x = w("rect");
      x.setAttribute("class", `${d}-resize-line-group-height-line-start`);
      const b = w("rect");
      b.setAttribute("class", `${d}-resize-line-group-height-line-end`), c.append(y, f, x, b), u.append(g, c), e.push(u);
    }), this.lines = e, this.g.append(...this.lines), s.append(this.g), this.hidden();
  }
  hidden() {
    this.lines.forEach((s) => {
      Array.from(s.children).forEach((t) => {
        t.style.display = "none";
      });
    });
  }
  reRender(s, t, e, r, l, u, g, o) {
    var P, X;
    if (!s.selected) return;
    this.hidden();
    const { widthMap: a, heightMap: h } = q(s), i = [], c = [];
    a.forEach((M, z) => {
      var N;
      M.length === 1 && M[0].nodeRect.id === ((N = s.selected) == null ? void 0 : N.dataset.id) || Math.abs(t - z) <= 3 && i.push(z);
    }), h.forEach((M, z) => {
      var N;
      M.length === 1 && M[0].nodeRect.id === ((N = s.selected) == null ? void 0 : N.dataset.id) || Math.abs(e - z) <= 3 && c.push(z);
    });
    const y = i.length === 0 ? t : Math.max(...i), f = c.length === 0 ? e : Math.max(...c), x = Math.max(y, 10), b = Math.max(f, 10);
    if (r.includes("left")) {
      const M = l + g;
      s.selected.style.left = m(M - x);
    } else
      s.selected.style.left = m(l);
    if (s.selected.style.width = m(x), r.includes("top")) {
      const M = u + o;
      s.selected.style.top = m(M - b);
    } else
      s.selected.style.top = m(u);
    s.selected.style.height = m(b);
    const p = parseFloat(s.selected.style.width), v = parseFloat(s.selected.style.height), { widthMap: A, heightMap: L } = q(s);
    (P = A.get(p)) == null || P.forEach((M) => {
      const z = this.g.querySelector(`[data-ower-id="${M.nodeRect.id}"]`), N = S(z, `${d}-resize-line-group-width`);
      N.style.display = "block";
    }), (X = L.get(v)) == null || X.forEach((M) => {
      const z = this.g.querySelector(`[data-ower-id="${M.nodeRect.id}"]`), N = S(z, `${d}-resize-line-group-height`);
      N.style.display = "block";
    });
    const F = this.g.querySelector(`[data-ower-id="${s.selected.dataset.id}"]`), C = S(F, `${d}-resize-line-group-width`), Q = S(F, `${d}-resize-line-group-height`);
    Q.style.display = "block", C.style.display = "block", ft(s), s.border.reRender(s);
  }
}
function pt(n, s, t, e) {
  return t - n > 0 && e - s > 0 ? "4" : t - n < 0 && e - s > 0 ? "3" : t - n < 0 && e - s < 0 ? "2" : t - n > 0 && e - s < 0 ? "1" : "0";
}
class St {
  constructor(s) {
    E(this, "g");
    // 选择框矩形
    E(this, "selectorRect");
    E(this, "previewRect");
    E(this, "selectedGroup", []);
    this.g = w("g"), this.g.setAttribute("class", `${d}-selector`), this.selectorRect = w("rect"), this.selectorRect.setAttribute("class", `${d}-selector-rect`), this.selectorRect.setAttribute("stroke", "#919191"), this.selectorRect.setAttribute("stroke-width", "1px"), this.selectorRect.setAttribute("fill", "rgba(255,255,255,0.3)"), this.selectorRect.style.display = "none", this.previewRect = w("rect"), this.previewRect.setAttribute("class", `${d}-selector-preview`), this.previewRect.setAttribute("stroke", "#000"), this.previewRect.setAttribute("stroke-width", "1px"), this.previewRect.setAttribute("fill", "transparent"), this.previewRect.style.display = "none", this.g.append(this.selectorRect, this.previewRect), s.append(this.g);
  }
  hiddenSelector() {
    this.selectorRect.style.display = "none";
  }
  showSelector() {
    this.selectorRect.style.display = "block";
  }
  hiddenPreview() {
    this.previewRect.style.display = "none";
  }
  showPreview() {
    this.previewRect.style.display = "block";
  }
  reRender(s, t, e, r, l) {
    this.showSelector(), this.hiddenPreview(), this.selectedGroup = [];
    const u = pt(t, e, r, l), g = Math.abs(t - r), o = Math.abs(e - l);
    this.selectorRect.setAttribute("width", String(g)), this.selectorRect.setAttribute("height", String(o));
    let a = t, h = e;
    switch (u) {
      case "3": {
        a = a - g;
        break;
      }
      case "2": {
        a = a - g, h = h - o;
        break;
      }
      case "1": {
        h = h - o;
        break;
      }
    }
    this.selectorRect.setAttribute("x", String(a)), this.selectorRect.setAttribute("y", String(h)), s.nodes.forEach((p) => {
      k.from(p).isIntersect({
        x: a,
        y: h,
        w: g,
        h: o
      }) && this.selectedGroup.push(p);
    });
    const i = [], c = [], y = [], f = [];
    this.selectedGroup.forEach((p) => {
      const { x: v, y: A, w: L, h: F } = k.from(p);
      i.push(v), c.push(A), y.push(v + L), f.push(A + F);
    });
    const x = Math.min(...i), b = Math.min(...c);
    this.previewRect.setAttribute("x", String(i.length ? x : 0)), this.previewRect.setAttribute("y", String(c.length ? b : 0)), this.previewRect.setAttribute("width", String(y.length ? Math.max(...y) - x : 0)), this.previewRect.setAttribute("height", String(f.length ? Math.max(...f) - b : 0));
  }
}
const $ = "#3875F6", G = 1, D = 10, wt = ["left", "right", "top", "bottom"];
function mt(n) {
  const s = [], t = k.from(n.selected);
  n.nodes.forEach((e) => {
    const r = k.from(e);
    s.push(r);
  }), s.forEach((e) => {
    if (e.y <= t.y && e.y + e.h >= t.y || e.y <= t.y + t.h / 2 && e.y + e.h >= t.y + t.h / 2 || e.y <= t.y + t.h && e.y + e.h >= t.y + t.h) {
      if (t.x + t.w < e.x) {
        const l = Math.abs(t.x + t.w - e.x);
        n.distance.x.length > l && (n.distance.x.length = l, n.distance.x.type = "right", n.distance.x.node = e.node);
      }
      if (t.x > e.x + e.w) {
        const l = Math.abs(t.x - e.x - e.w);
        n.distance.x.length > l && (n.distance.x.length = l, n.distance.x.type = "left", n.distance.x.node = e.node);
      }
    }
  }), s.forEach((e) => {
    if (e.x <= t.x && e.x + e.w >= t.x || e.x <= t.x + t.w / 2 && e.x + e.w >= t.x + t.w / 2 || e.x <= t.x + t.w && e.x + e.w >= t.x + t.w) {
      if (t.y + t.h < e.y) {
        const l = Math.abs(t.y + t.h - e.y);
        n.distance.y.length > l && (n.distance.y.length = l, n.distance.y.type = "bottom", n.distance.y.node = e.node);
      }
      if (t.y > e.y + e.h) {
        const l = Math.abs(t.y - e.y - e.h);
        n.distance.y.length > l && (n.distance.y.length = l, n.distance.y.type = "top", n.distance.y.node = e.node);
      }
    }
  });
}
class Et {
  constructor(s) {
    E(this, "g");
    E(this, "lines");
    E(this, "x");
    E(this, "y");
    this.g = w("g"), this.g.setAttribute("class", `${d}-distance`), this.lines = {};
    const t = (e) => {
      const r = w("g");
      r.setAttribute("class", `${d}-distance-${e}`);
      const l = w("line");
      l.setAttribute("class", `${d}-distance-${e}-line`);
      const u = w("line");
      u.setAttribute("class", `${d}-distance-${e}-dash-line`);
      const g = w("text");
      g.setAttribute("class", `${d}-distance-${e}-text`);
      const o = w("rect");
      o.setAttribute("class", `${d}-distance-${e}-text-bg`);
      const a = w("rect");
      a.setAttribute("class", `${d}-distance-${e}-line-start`);
      const h = w("rect");
      return h.setAttribute("class", `${d}-distance-${e}-line-end`), r.appendChild(l), r.appendChild(u), r.appendChild(o), r.appendChild(g), r.appendChild(a), r.appendChild(h), r;
    };
    this.x = {
      type: "left",
      length: 1 / 0,
      node: null
    }, this.y = {
      type: "top",
      length: 1 / 0,
      node: null
    }, wt.forEach((e) => {
      const r = t(e);
      this.lines[e] = r;
    }), this.g.append(...Object.values(this.lines)), s.append(this.g);
  }
  hidden() {
    Object.values(this.lines).forEach((s) => {
      s.setAttribute("style", "display: none;");
    }), this.x = {
      type: "left",
      length: 1 / 0,
      node: null
    }, this.y = {
      type: "top",
      length: 1 / 0,
      node: null
    };
  }
  reRender(s) {
    if (s.selected) {
      if (this.hidden(), mt(s), this.x.node && this.x.node.id !== s.selected.dataset.id) {
        const t = k.from(this.x.node), e = k.from(s.selected);
        if (this.x.type === "left") {
          const r = S(this.lines.left, `${d}-distance-left-line`);
          r.setAttribute("x1", String(t.x + t.w)), r.setAttribute("x2", String(e.x)), r.setAttribute("y1", String(e.y + e.h / 2)), r.setAttribute("y2", String(e.y + e.h / 2)), r.setAttribute("stroke", $), r.setAttribute("stroke-width", String(G));
          const l = S(this.lines.left, `${d}-distance-left-text`);
          l.textContent = `${H(this.x.length)}`, l.setAttribute("x", String((t.x + t.w + e.x) / 2)), l.setAttribute("y", String(e.y + e.h / 2 - 9)), l.setAttribute("fill", "#FFFFFF"), l.setAttribute("font-size", String(D)), l.setAttribute("text-anchor", "middle"), l.setAttribute("alignment-baseline", "middle");
          const u = S(this.lines.left, `${d}-distance-left-text-bg`);
          u.setAttribute(
            "x",
            String((t.x + t.w + e.x) / 2 - (l.getComputedTextLength() + 10) / 2)
          ), u.setAttribute("y", String(e.y + e.h / 2 - D / 2 - 12)), u.setAttribute("width", String(l.getComputedTextLength() + 10)), u.setAttribute("height", String(D + 4)), u.setAttribute("fill", $), u.setAttribute("rx", "4"), u.setAttribute("ry", "4");
          const g = 1, o = 8, a = S(this.lines.left, `${d}-distance-left-line-start`);
          a.setAttribute("x", String(t.x + t.w - g / 2)), a.setAttribute("y", String(e.y + e.h / 2 - o / 2)), a.setAttribute("width", String(g)), a.setAttribute("height", String(o)), a.setAttribute("fill", $);
          const h = S(this.lines.left, `${d}-distance-left-line-end`);
          h.setAttribute("x", String(e.x - g / 2)), h.setAttribute("y", String(e.y + e.h / 2 - o / 2)), h.setAttribute("width", String(g)), h.setAttribute("height", String(o)), h.setAttribute("fill", $);
          const i = S(this.lines.left, `${d}-distance-left-dash-line`);
          e.y < t.y ? (i.setAttribute("x1", String(t.x + t.w)), i.setAttribute("x2", String(t.x + t.w)), i.setAttribute("y1", String(e.y)), i.setAttribute("y2", String(t.y)), i.setAttribute("stroke", $), i.setAttribute("stroke-width", "1"), i.setAttribute("stroke-dasharray", "4 4"), i.setAttribute("style", "display: block;")) : e.y + e.h > t.y + t.h ? (i.setAttribute("x1", String(t.x + t.w)), i.setAttribute("x2", String(t.x + t.w)), i.setAttribute("y1", String(t.y + t.h)), i.setAttribute("y2", String(e.y + e.h)), i.setAttribute("stroke", $), i.setAttribute("stroke-width", "1"), i.setAttribute("stroke-dasharray", "4 4"), i.setAttribute("style", "display: block;")) : i.setAttribute("style", "display: none;"), s.align.isHAlign && this.lines.left.setAttribute("style", "display: block;");
        } else if (this.x.type === "right") {
          const r = S(this.lines.right, `${d}-distance-right-line`);
          r.setAttribute("x1", String(e.x + e.w)), r.setAttribute("x2", String(t.x)), r.setAttribute("y1", String(e.y + e.h / 2)), r.setAttribute("y2", String(e.y + e.h / 2)), r.setAttribute("stroke", $), r.setAttribute("stroke-width", String(G));
          const l = S(this.lines.right, `${d}-distance-right-text`);
          l.textContent = `${H(this.x.length)}`, l.setAttribute("x", String((e.x + e.w + t.x) / 2)), l.setAttribute("y", String(e.y + e.h / 2 - 9)), l.setAttribute("fill", "#FFFFFF"), l.setAttribute("font-size", String(D)), l.setAttribute("text-anchor", "middle"), l.setAttribute("alignment-baseline", "middle");
          const u = S(this.lines.right, `${d}-distance-right-text-bg`);
          u.setAttribute(
            "x",
            String((e.x + e.w + t.x) / 2 - (l.getComputedTextLength() + 10) / 2)
          ), u.setAttribute("y", String(e.y + e.h / 2 - D / 2 - 12)), u.setAttribute("width", String(l.getComputedTextLength() + 10)), u.setAttribute("height", String(D + 4)), u.setAttribute("fill", $), u.setAttribute("rx", "4"), u.setAttribute("ry", "4");
          const g = 1, o = 8, a = S(this.lines.left, `${d}-distance-left-line-start`);
          a.setAttribute("x", String(e.x + e.w - g / 2)), a.setAttribute("y", String(e.y + e.h / 2 - o / 2)), a.setAttribute("width", String(g)), a.setAttribute("height", String(o)), a.setAttribute("fill", $);
          const h = S(this.lines.left, `${d}-distance-left-line-end`);
          h.setAttribute("x", String(t.x - g / 2)), h.setAttribute("y", String(e.y + e.h / 2 - o / 2)), h.setAttribute("width", String(g)), h.setAttribute("height", String(o)), h.setAttribute("fill", $);
          const i = S(this.lines.right, `${d}-distance-right-dash-line`);
          e.y < t.y ? (i.setAttribute("x1", String(t.x)), i.setAttribute("x2", String(t.x)), i.setAttribute("y1", String(e.y)), i.setAttribute("y2", String(t.y)), i.setAttribute("stroke", $), i.setAttribute("stroke-width", "1"), i.setAttribute("stroke-dasharray", "4 4"), i.setAttribute("style", "display: block;")) : e.y + e.h > t.y + t.h ? (i.setAttribute("x1", String(t.x)), i.setAttribute("x2", String(t.x)), i.setAttribute("y1", String(t.y + t.h)), i.setAttribute("y2", String(e.y + e.h)), i.setAttribute("stroke", $), i.setAttribute("stroke-width", "1"), i.setAttribute("stroke-dasharray", "4 4"), i.setAttribute("style", "display: block;")) : i.setAttribute("style", "display: none;"), s.align.isHAlign && this.lines.right.setAttribute("style", "display: block;");
        }
      }
      if (this.y.node && this.y.node.id !== s.selected.dataset.id) {
        const t = k.from(this.y.node), e = k.from(s.selected);
        if (this.y.type === "top") {
          const r = S(this.lines.top, `${d}-distance-top-line`);
          r.setAttribute("x1", String(e.x + e.w / 2)), r.setAttribute("x2", String(e.x + e.w / 2)), r.setAttribute("y1", String(e.y)), r.setAttribute("y2", String(t.y + t.h)), r.setAttribute("stroke", $), r.setAttribute("stroke-width", String(G));
          const l = S(this.lines.top, `${d}-distance-top-text`);
          l.textContent = `${H(this.y.length)}`, l.setAttribute("x", String(e.x + e.w / 2 + (l.getComputedTextLength() + 10) / 2 + 3)), l.setAttribute("y", String((e.y + t.y + t.h) / 2 + 1)), l.setAttribute("fill", "#FFFFFF"), l.setAttribute("font-size", String(D)), l.setAttribute("text-anchor", "middle"), l.setAttribute("alignment-baseline", "middle");
          const u = S(this.lines.top, `${d}-distance-top-text-bg`);
          u.setAttribute("x", String(e.x + e.w / 2 + 3)), u.setAttribute("y", String((e.y + t.y + t.h) / 2 - (D + 4) / 2)), u.setAttribute("width", String(l.getComputedTextLength() + 10)), u.setAttribute("height", String(D + 4)), u.setAttribute("fill", $), u.setAttribute("rx", "4"), u.setAttribute("ry", "4");
          const g = 8, o = 1, a = S(this.lines.top, `${d}-distance-top-line-start`);
          a.setAttribute("x", String(e.x + e.w / 2 - g / 2)), a.setAttribute("y", String(t.y + t.h - o / 2)), a.setAttribute("width", String(g)), a.setAttribute("height", String(o)), a.setAttribute("fill", $);
          const h = S(this.lines.top, `${d}-distance-top-line-end`);
          h.setAttribute("x", String(e.x + e.w / 2 - g / 2)), h.setAttribute("y", String(e.y - o / 2)), h.setAttribute("width", String(g)), h.setAttribute("height", String(o)), h.setAttribute("fill", $);
          const i = S(this.lines.top, `${d}-distance-top-dash-line`);
          e.x < t.x ? (i.setAttribute("x1", String(e.x)), i.setAttribute("x2", String(t.x)), i.setAttribute("y1", String(t.y + t.h)), i.setAttribute("y2", String(t.y + t.h)), i.setAttribute("stroke", $), i.setAttribute("stroke-width", "1"), i.setAttribute("stroke-dasharray", "4 4"), i.setAttribute("style", "display: block;")) : e.x + e.w > t.x + t.w ? (i.setAttribute("x1", String(t.x + t.w)), i.setAttribute("x2", String(e.x + e.w)), i.setAttribute("y1", String(t.y + t.h)), i.setAttribute("y2", String(t.y + t.h)), i.setAttribute("stroke", $), i.setAttribute("stroke", $), i.setAttribute("stroke-width", "1"), i.setAttribute("stroke-dasharray", "4 4"), i.setAttribute("style", "display: block;")) : i.setAttribute("style", "display: none;"), s.align.isVAlign && this.lines.top.setAttribute("style", "display: block;");
        } else if (this.y.type === "bottom") {
          const r = S(this.lines.bottom, `${d}-distance-bottom-line`);
          r.setAttribute("x1", String(e.x + e.w / 2)), r.setAttribute("x2", String(e.x + e.w / 2)), r.setAttribute("y1", String(e.y + e.h)), r.setAttribute("y2", String(t.y)), r.setAttribute("stroke", $), r.setAttribute("stroke-width", String(G));
          const l = S(this.lines.bottom, `${d}-distance-bottom-text`);
          l.textContent = `${H(this.y.length)}`;
          const u = e.x + e.w / 2 + (l.getComputedTextLength() + 10) / 2 + 3;
          l.setAttribute("x", String(u)), l.setAttribute("y", String((e.y + e.h + t.y) / 2 + 1)), l.setAttribute("fill", "#FFFFFF"), l.setAttribute("font-size", String(D)), l.setAttribute("text-anchor", "middle"), l.setAttribute("alignment-baseline", "middle");
          const g = S(this.lines.bottom, `${d}-distance-bottom-text-bg`);
          g.setAttribute("x", String(e.x + e.w / 2 + 3)), g.setAttribute(
            "y",
            String((e.y + e.h + t.y) / 2 - (D + 4) / 2)
          ), g.setAttribute("width", String(l.getComputedTextLength() + 10)), g.setAttribute("height", String(D + 4)), g.setAttribute("fill", $), g.setAttribute("rx", "4"), g.setAttribute("ry", "4");
          const o = 8, a = 1, h = S(
            this.lines.bottom,
            `${d}-distance-bottom-line-start`
          );
          h.setAttribute("x", String(e.x + e.w / 2 - o / 2)), h.setAttribute("y", String(e.y + e.h - a / 2)), h.setAttribute("width", String(o)), h.setAttribute("height", String(a)), h.setAttribute("fill", $);
          const i = S(this.lines.bottom, `${d}-distance-bottom-line-end`);
          i.setAttribute("x", String(e.x + e.w / 2 - o / 2)), i.setAttribute("y", String(t.y - a / 2)), i.setAttribute("width", String(o)), i.setAttribute("height", String(a)), i.setAttribute("fill", $);
          const c = S(
            this.lines.bottom,
            `${d}-distance-bottom-dash-line`
          );
          e.x < t.x ? (c.setAttribute("x1", String(e.x)), c.setAttribute("x2", String(t.x)), c.setAttribute("y1", String(t.y)), c.setAttribute("y2", String(t.y)), c.setAttribute("stroke", $), c.setAttribute("stroke-width", "1"), c.setAttribute("stroke-dasharray", "4 4"), c.setAttribute("style", "display: block;")) : e.x + e.w > t.x + t.w ? (c.setAttribute("x1", String(t.x + t.w)), c.setAttribute("x2", String(e.x + e.w)), c.setAttribute("y1", String(t.y)), c.setAttribute("y2", String(t.y)), c.setAttribute("stroke", $), c.setAttribute("stroke-width", "1"), c.setAttribute("stroke-dasharray", "4 4"), c.setAttribute("style", "display: block;")) : c.setAttribute("style", "display: none;"), s.align.isVAlign && this.lines.bottom.setAttribute("style", "display: block;");
        }
      }
    }
  }
}
const vt = (n, s) => {
  const t = w("svg");
  t.setAttribute("class", `${d}-svg`);
  const e = n.getBoundingClientRect();
  return t.setAttribute("width", m(e.width)), t.setAttribute("height", m(e.height)), t.style = "position: absolute; inset: 0;", n.className += ` ${d}-container`, s.forEach((r) => {
    r.className += ` ${d}-movable-node`, r.setAttribute("data-id", ct()), /%$/.test(r.style.top) && (r.style.top = m(e.width * parseFloat(r.style.top) / 100)), /%$/.test(r.style.left) && (r.style.left = m(e.height * parseFloat(r.style.left) / 100)), /%$/.test(r.style.width) && (r.style.width = m(e.width * parseFloat(r.style.width) / 100)), /%$/.test(r.style.height) && (r.style.height = m(e.height * parseFloat(r.style.height) / 100));
  }), {
    container: n,
    nodes: s,
    svg: t,
    selected: null,
    setSelected(r) {
      if (this.selected = r, !r) {
        this.border.hidden();
        return;
      }
      this.border.reRender(this);
    },
    align: new bt(t),
    distance: new Et(t),
    border: new At(t),
    resize: new xt(t, s),
    selector: new St(t),
    gap: new lt(t)
  };
};
class kt {
  constructor(s, t) {
    E(this, "store");
    this.store = vt(s, t), st(this.store);
  }
  mount() {
    this.store.container.append(this.store.svg);
  }
  unmount() {
    this.store.svg.remove();
  }
  align(s) {
    const { selected: t, container: e } = this.store;
    if (!t) return;
    const r = e.getBoundingClientRect(), l = k.from(t);
    switch (s) {
      case "start":
        t.style.left = m(0);
        break;
      case "center":
        t.style.left = m(r.width / 2 - l.w / 2);
        break;
      case "end":
        t.style.left = m(r.width - l.w);
        break;
    }
  }
}
export {
  kt as default
};
