var q = Object.defineProperty;
var Z = (i, e, t) => e in i ? q(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var E = (i, e, t) => Z(i, typeof e != "symbol" ? e + "" : e, t);
const p = "__freemove";
class L {
  constructor({ x: e, y: t, h: c, w: n, node: h }) {
    E(this, "x");
    E(this, "y");
    E(this, "w");
    E(this, "h");
    E(this, "id");
    E(this, "node");
    this.x = e, this.y = t, this.h = c, this.w = n, this.node = h, this.id = h.dataset.id;
  }
  // 判断一个点是否在矩形里面
  isInSide(e) {
    return e.x >= this.x && e.x <= this.x + this.w && e.y >= this.y && e.y <= this.y + this.h;
  }
  isIntersect(e) {
    const t = this.x + 3, c = this.y + 3, n = this.x + this.w - 3, h = this.y + this.h - 3, u = e.x, A = e.y, y = e.x + e.w, a = e.y + e.h;
    return !(n < u || t > y || h < A || c > a);
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
  static from(e) {
    return new L({
      x: e.offsetLeft,
      y: e.offsetTop,
      w: e.offsetWidth,
      h: e.offsetHeight,
      node: e
    });
  }
  static error(e, t) {
  }
}
function S(i) {
  return typeof i == "number" ? `${i}px` : String(i);
}
function U(i, e, t = 0.1) {
  return Math.abs(i - e) <= t;
}
function M(i, e) {
  return i.getElementsByClassName(e)[0];
}
function w(i) {
  return document.createElementNS("http://www.w3.org/2000/svg", i);
}
function Q(i, e) {
  if (!i.selected) return;
  const t = i.container.getBoundingClientRect();
  i.align.reRender(i);
  const c = i.selected.getBoundingClientRect();
  let n = e.clientX - c.left, h = e.clientY - c.top, u = null;
  function A(a) {
    u || (u = requestAnimationFrame(() => {
      if (!i.selected) return;
      let r = a.clientX - t.left - n, o = a.clientY - t.top - h;
      const s = i.container.clientWidth - i.selected.offsetWidth, d = i.container.clientHeight - i.selected.offsetHeight;
      r = Math.max(0, Math.min(r, s)), o = Math.max(0, Math.min(o, d)), i.selected.style.left = S(r), i.selected.style.top = S(o), i.align.reRender(i), i.border.reRender(i), i.gap.reRender(i), u = null;
    }));
  }
  function y() {
    document.removeEventListener("pointermove", A), document.removeEventListener("pointerup", y), i.align.hidden(), u !== null && (cancelAnimationFrame(u), u = null);
  }
  document.addEventListener("pointermove", A), document.addEventListener("pointerup", y);
}
function J(i, e) {
  if (!i.selected) return;
  const t = i.container.getBoundingClientRect(), n = e.target.dataset.direction;
  if (!n) return;
  const h = L.from(i.selected);
  let u = e.clientX, A = e.clientY, y = h.w, a = h.h, r = h.x, o = h.y;
  const s = t.width, d = t.height;
  function x(l) {
    let g = l.clientX - u, m = l.clientY - A, v = y, f = a, $ = r, T = o;
    n.includes("right") && (v = y + g), n.includes("left") && (v = y - g, $ = r + g), n.includes("bottom") && (f = a + m), n.includes("top") && (f = a - m, T = o + m), $ < 0 && (v += $, $ = 0), T < 0 && (f += T, T = 0), $ + v > s && (v = s - $), T + f > d && (f = d - T), v = Math.max(v, 10), f = Math.max(f, 10), i.resize.reRender(i, v, f, n, r, o, y, a), i.border.reRender(i);
  }
  function b() {
    i.resize.hidden(), document.removeEventListener("pointermove", x), document.removeEventListener("pointerup", b);
  }
  document.addEventListener("pointermove", x), document.addEventListener("pointerup", b);
}
function K(i, e) {
  const t = i.container.getBoundingClientRect(), c = e.clientX - t.left, n = e.clientY - t.top;
  function h(A) {
    const y = A.clientX - t.left, a = A.clientY - t.top;
    i.selector.reRender(i, c, n, y, a);
  }
  function u() {
    i.selector.hiddenSelector(), i.selector.showPreview(), document.removeEventListener("pointermove", h), document.removeEventListener("pointerup", u);
  }
  document.addEventListener("pointermove", h), document.addEventListener("pointerup", u);
}
function V(i) {
  i.svg.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    const t = e.target;
    if (t.classList[0].includes(`${p}-border-point-`)) {
      const c = t.dataset.ownerId;
      for (let n = 0; n < i.nodes.length; n++)
        c === i.nodes[n].dataset.ownerId && i.setSelected(i.nodes[n]);
      i.selected && J(i, e);
      return;
    }
    if (t.classList.contains(`${p}-svg`)) {
      let c = null;
      for (const n of i.nodes) {
        const h = L.from(n);
        if (h.isInSide({ x: e.offsetX, y: e.offsetY })) {
          c = h;
          break;
        }
      }
      c && c.node.classList.contains(`${p}-movable-node`) && (i.selector.hiddenPreview(), i.setSelected(c.node), Q(i, e)), c || (i.border.hidden(), K(i, e));
    }
  });
}
function tt(i) {
  const e = /* @__PURE__ */ new Map();
  function t(a) {
    var o;
    const r = [];
    a.toSorted((s, d) => s.x - d.x).forEach((s) => {
      r.push({ value: s.x, type: "min", nodeRect: s }), r.push({ value: s.x + s.w, type: "max", nodeRect: s });
    }), r.sort((s, d) => s.value - d.value);
    for (let s = 0; s < r.length - 1; s++) {
      const d = [], x = [];
      if (r[s].type === "max" && r[s + 1].type === "min") {
        for (let g = 0; g <= s && r[s].value === r[s - g].value; g++)
          d.push(r[s - g]);
        for (let g = s + 1; g <= r.length && r[s + 1].value === r[g].value; g++)
          x.push(r[g]);
        const b = x[0].value - d[0].value, l = d[0].nodeRect.x;
        if (b > 0) {
          const g = Math.min(...d.map((f) => f.nodeRect.y), ...x.map((f) => f.nodeRect.y)), m = Math.max(
            ...d.map((f) => f.nodeRect.y + f.nodeRect.h),
            ...x.map((f) => f.nodeRect.y + f.nodeRect.h)
          ), v = {
            x: l,
            y: g,
            w: b,
            h: m - g,
            rect1: d.map((f) => f.nodeRect),
            rect2: x.map((f) => f.nodeRect)
          };
          e.has(b) ? (o = e.get(b)) == null || o.push(v) : e.set(b, [v]);
        }
      }
    }
  }
  function c() {
    e.forEach((a, r) => {
      const o = /* @__PURE__ */ new Map();
      a.forEach((s) => {
        o.has(s.x) ? o.get(s.x).push(s) : o.set(s.x, [s]);
      }), o.forEach((s, d) => {
        const x = [], b = [], l = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set();
        s == null || s.forEach((f) => {
          x.push(f.y), b.push(f.y + f.h), f.rect1.forEach(($) => l.add($)), f.rect2.forEach(($) => g.add($));
        });
        const m = Math.min(...x), v = Math.max(...b);
        o.set(d, [
          {
            x: d,
            y: m,
            h: v - m,
            w: r,
            rect1: Array.from(l),
            rect2: Array.from(g)
          }
        ]);
      }), e.set(r, Array.from(o.values()).flat());
    });
  }
  const n = [], h = L.from(i.selected);
  i.nodes.forEach((a) => {
    const r = L.from(a);
    n.push(r);
  }), n.sort((a, r) => a.x - r.x);
  const u = [], A = [];
  let y = 1 / 0;
  return n.forEach((a) => {
    if (a.y >= h.y && a.y <= h.y + h.h || a.y + a.h / 2 >= h.y && a.y + a.h / 2 <= h.y + h.h || a.y + a.h >= h.y && a.y + a.h <= h.y + h.h) {
      if (h.x + h.w < a.x) {
        const o = Math.abs(h.x + h.w - a.x);
        y > o && (y = o, i.distance.x.type = "right", i.distance.x.node = a.node);
      }
      if (h.x > a.x + a.w) {
        const o = Math.abs(h.x - a.x - a.w);
        y > o && (y = o, i.distance.x.type = "left", i.distance.x.node = a.node);
      }
      u.push(a);
    } else A.push(a);
  }), t(u), A.forEach((a) => {
    u.push(a), t(u);
  }), c(), e;
}
function et(i) {
  const e = /* @__PURE__ */ new Map();
  function t(a) {
    var o;
    const r = [];
    a.toSorted((s, d) => s.y - d.y).forEach((s) => {
      r.push({ value: s.y, type: "min", nodeRect: s }), r.push({ value: s.y + s.h, type: "max", nodeRect: s });
    }), r.sort((s, d) => s.value - d.value);
    for (let s = 0; s < r.length - 1; s++) {
      const d = [], x = [];
      if (r[s].type === "max" && r[s + 1].type === "min") {
        for (let g = 0; g <= s && r[s].value === r[s - g].value; g++)
          d.push(r[s - g]);
        for (let g = s + 1; g <= r.length && r[s + 1].value === r[g].value; g++)
          x.push(r[g]);
        const b = x[0].value - d[0].value, l = d[0].nodeRect.y;
        if (b > 0) {
          const g = Math.min(...d.map((f) => f.nodeRect.x), ...x.map((f) => f.nodeRect.x)), m = Math.max(
            ...d.map((f) => f.nodeRect.x + f.nodeRect.w),
            ...x.map((f) => f.nodeRect.x + f.nodeRect.w)
          ), v = {
            x: g,
            y: l,
            w: m - g,
            h: b,
            rect1: d.map((f) => f.nodeRect),
            rect2: x.map((f) => f.nodeRect)
          };
          e.has(b) ? (o = e.get(b)) == null || o.push(v) : e.set(b, [v]);
        }
      }
    }
  }
  function c() {
    e.forEach((a, r) => {
      const o = /* @__PURE__ */ new Map();
      a.forEach((s) => {
        o.has(s.y) ? o.get(s.y).push(s) : o.set(s.y, [s]);
      }), o.forEach((s, d) => {
        const x = [], b = [], l = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set();
        s == null || s.forEach((f) => {
          x.push(f.x), b.push(f.x + f.w), f.rect1.forEach(($) => l.add($)), f.rect2.forEach(($) => g.add($));
        });
        const m = Math.min(...x), v = Math.max(...b);
        o.set(d, [
          {
            x: m,
            y: d,
            h: r,
            w: v - m,
            rect1: Array.from(l),
            rect2: Array.from(g)
          }
        ]);
      }), e.set(r, Array.from(o.values()).flat());
    });
  }
  const n = [], h = L.from(i.selected);
  i.nodes.forEach((a) => {
    const r = L.from(a);
    n.push(r);
  }), n.sort((a, r) => a.y - r.y);
  const u = [], A = [];
  let y = 1 / 0;
  return n.forEach((a) => {
    if (a.x >= h.x && a.x <= h.x + h.w || a.x + a.w / 2 >= h.x && a.x + a.w / 2 <= h.x + h.w || a.x + a.w >= h.x && a.x + a.w <= h.x + h.w) {
      if (h.y + h.h < a.y) {
        const o = Math.abs(h.y + h.h - a.y);
        y > o && (y = o, i.distance.y.type = "bottom", i.distance.y.node = a.node);
      }
      if (h.y > a.y + a.h) {
        const o = Math.abs(h.y - a.y - a.h);
        y > o && (y = o, i.distance.y.type = "top", i.distance.y.node = a.node);
      }
      u.push(a);
    } else A.push(a);
  }), t(u), A.forEach((a) => {
    u.push(a), t(u);
  }), c(), e;
}
class st {
  constructor(e) {
    E(this, "g");
    this.g = w("g"), this.g.setAttribute("class", `${p}-gap`), e.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(e) {
    tt(e), et(e);
  }
}
const it = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let rt = (i = 21) => {
  let e = "", t = crypto.getRandomValues(new Uint8Array(i |= 0));
  for (; i--; )
    e += it[t[i] & 63];
  return e;
};
const nt = 1, ct = "#EA3", B = ["vl", "vc", "vr", "ht", "hc", "hb"];
function at(i, e) {
  const t = i.container.getBoundingClientRect(), c = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  let n = !1;
  function h() {
    const r = L.from(i.selected), o = i.nodes.filter((s) => s !== i.selected).map((s) => L.from(s));
    B.forEach((s) => c[s] = []), o.forEach((s) => {
      if (r.isIntersect(s)) return;
      const d = r.getAlignLinePostion();
      B.forEach((x) => {
        let b = 1e4, l = 1e4, g;
        /^h/.test(x) && (r.x > s.x + s.w ? (b = r.x + r.w, l = s.x) : r.x + r.w < s.x ? (b = r.x, l = s.x + s.w) : (b = Math.min(r.x, s.x), l = Math.max(r.x + r.w, s.x + s.w)), [s.y, s.y + s.h / 2, s.y + s.h].forEach((m) => {
          g = Math.abs(d[x] - m), g <= 3 && c[x].push({
            type: x,
            source: b,
            target: l,
            absorbDistance: g,
            absorbPosition: m,
            nodeRects: [s]
          });
        })), /^v/.test(x) && (r.y > s.y + s.h ? (b = r.y + r.h, l = s.y) : r.y + r.h < s.y ? (b = r.y, l = s.y + s.h) : (b = Math.min(r.y, s.y), l = Math.max(r.y + r.h, s.y + s.h)), [s.x, s.x + s.w / 2, s.x + s.w].forEach((m) => {
          g = Math.abs(d[x] - m), g <= 3 && c[x].push({
            type: x,
            source: b,
            target: l,
            absorbDistance: g,
            absorbPosition: m,
            nodeRects: [s]
          });
        }));
      });
    }), B.forEach((s) => {
      const d = /* @__PURE__ */ new Map();
      c[s].forEach((l) => {
        const g = d.get(l.absorbDistance) || [];
        g.push(l), d.set(l.absorbDistance, g);
      });
      let x = 1 / 0, b = 0;
      d.forEach((l) => {
        l.forEach((g) => {
          x = Math.min(x, g.source, g.target), b = Math.max(b, g.source, g.target);
        });
      }), d.forEach((l) => {
        l.forEach((g) => {
          g.source = x, g.target = b;
        });
      }), c[s] = Array.from(d.values()).flat();
    });
  }
  function u(r) {
    const { absorbPosition: o, type: s } = r, d = i.selected;
    switch (s) {
      case "ht":
        d.style.top = S(o);
        break;
      case "hc":
        d.style.top = S(o - parseFloat(d.style.height) / 2);
        break;
      case "hb":
        d.style.top = S(o - parseFloat(d.style.height));
        break;
      case "vl":
        d.style.left = S(o);
        break;
      case "vc":
        d.style.left = S(o - parseFloat(d.style.width) / 2);
        break;
      case "vr":
        d.style.left = S(o - parseFloat(d.style.width));
        break;
    }
    h(), i.border.reRender(i);
  }
  function A() {
    if (!i.selected) return;
    const r = L.from(i.selected), o = t.width / 2;
    Math.abs(r.x + r.w / 2 - o) <= 3 && (i.selected.style.left = S(o - r.w / 2), n = !0), h(), i.border.reRender(i);
  }
  function y() {
    if (!i.selected) return;
    const r = L.from(i.selected);
    if (Object.values(c).flat().forEach((s) => {
      const { source: d, target: x, type: b } = s, l = e[b];
      if (/^h/.test(b))
        switch (l == null || l.setAttribute("x1", String(d)), l == null || l.setAttribute("x2", String(x)), b) {
          case "ht":
            l.setAttribute("y1", String(r.y)), l.setAttribute("y2", String(r.y));
            break;
          case "hc":
            l.setAttribute("y1", String(r.y + r.h / 2)), l.setAttribute("y2", String(r.y + r.h / 2));
            break;
          case "hb":
            l.setAttribute("y1", String(r.y + r.h)), l.setAttribute("y2", String(r.y + r.h));
            break;
        }
      if (/^v/.test(b))
        switch (l == null || l.setAttribute("y1", String(d)), l == null || l.setAttribute("y2", String(x)), b) {
          case "vl":
            l.setAttribute("x1", String(r.x)), l.setAttribute("x2", String(r.x));
            break;
          case "vc":
            l.setAttribute("x1", String(r.x + r.w / 2)), l.setAttribute("x2", String(r.x + r.w / 2));
            break;
          case "vr":
            l.setAttribute("x1", String(r.x + r.w)), l.setAttribute("x2", String(r.x + r.w));
            break;
        }
      l == null || l.setAttribute("style", "display: 'block");
    }), n) {
      const s = e.vertical;
      s.setAttribute("x1", String(t.width / 2)), s.setAttribute("y1", String(0)), s.setAttribute("x2", String(t.width / 2)), s.setAttribute("y2", String(t.height)), s == null || s.setAttribute("style", "display: 'block");
    }
  }
  h(), Object.values(c).flat().forEach((r) => {
    u(r);
  }), A();
  let a = 1 / 0;
  B.forEach((r) => {
    c[r].forEach((o) => {
      o.absorbDistance < a && (a = o.absorbDistance);
    });
  }), B.forEach((r) => {
    c[r] = c[r].filter((o) => U(o.absorbDistance, a, 0.01));
  }), y();
}
class ht {
  constructor(e) {
    E(this, "g");
    E(this, "lines");
    this.g = w("g"), this.g.setAttribute("class", `${p}-align`), this.lines = {}, [...B, "vertical"].forEach((t) => {
      const c = w("line");
      c.setAttribute("class", `${p}-align-${t}`), c.setAttribute("stroke", ct), c.setAttribute("stroke-width", String(nt)), c.style.display = "none", this.g.append(c), this.lines[t] = c;
    }), e.append(this.g);
  }
  hidden() {
    Object.values(this.lines).forEach((e) => {
      e.style.display = "none";
    });
  }
  reRender(e) {
    e.selected && (this.hidden(), at(e, this.lines));
  }
}
const I = 1, P = "#000", G = 6, X = ["left", "top", "right", "bottom"], j = [
  "left-top",
  "top",
  "right-top",
  "right",
  "right-bottom",
  "bottom",
  "left-bottom",
  "left"
], ot = [
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize",
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize"
];
function lt() {
  const i = [], e = [];
  return X.forEach((t) => {
    const c = w("line");
    c.setAttribute("class", `${p}-border-line-${t}`), c.setAttribute("stroke", P), c.setAttribute("stroke-width", S(I)), e.push(c);
  }), j.forEach((t, c) => {
    const n = w("rect");
    n.setAttribute("class", `${p}-border-point-${t}`), n.setAttribute("fill", "white"), n.setAttribute("stroke", P), n.setAttribute("stroke-width", S(I)), n.setAttribute("width", S(G)), n.setAttribute("height", S(G)), n.setAttribute("style", `cursor: ${ot[c]}`), n.setAttribute("data-direction", t), i.push(n);
  }), [i, e];
}
function ut(i, e) {
  const t = L.from(e);
  X.forEach((c) => {
    const n = M(i, `${p}-border-line-${c}`);
    switch (c) {
      case "left":
        n.setAttribute("x1", String(t.x)), n.setAttribute("y1", String(t.y - I / 2)), n.setAttribute("x2", String(t.x)), n.setAttribute("y2", String(t.y + t.h + I / 2));
        break;
      case "right":
        n.setAttribute("x1", String(t.x + t.w)), n.setAttribute("y1", String(t.y - I / 2)), n.setAttribute("x2", String(t.x + t.w)), n.setAttribute("y2", String(t.y + t.h + I / 2));
        break;
      case "top":
        n.setAttribute("x1", String(t.x - I / 2)), n.setAttribute("y1", String(t.y)), n.setAttribute("x2", String(t.x + t.w + I / 2)), n.setAttribute("y2", String(t.y));
        break;
      case "bottom":
        n.setAttribute("x1", String(t.x - I / 2)), n.setAttribute("y1", String(t.y + t.h)), n.setAttribute("x2", String(t.x + t.w + I / 2)), n.setAttribute("y2", String(t.y + t.h));
        break;
    }
  }), j.forEach((c, n) => {
    const h = M(i, `${p}-border-point-${c}`);
    h.setAttribute("data-owner-id", e.dataset.id);
    const u = G / 2;
    switch (c) {
      case "left-top":
        h.setAttribute("x", String(t.x - u)), h.setAttribute("y", String(t.y - u));
        break;
      case "top":
        h.setAttribute("x", String(t.x + t.w / 2 - u)), h.setAttribute("y", String(t.y - u));
        break;
      case "right-top":
        h.setAttribute("x", String(t.x + t.w - u)), h.setAttribute("y", String(t.y - u));
        break;
      case "right":
        h.setAttribute("x", String(t.x + t.w - u)), h.setAttribute("y", String(t.y + t.h / 2 - u));
        break;
      case "right-bottom":
        h.setAttribute("x", String(t.x + t.w - u)), h.setAttribute("y", String(t.y + t.h - u));
        break;
      case "bottom":
        h.setAttribute("x", String(t.x + t.w / 2 - u)), h.setAttribute("y", String(t.y + t.h - u));
        break;
      case "left-bottom":
        h.setAttribute("x", String(t.x - u)), h.setAttribute("y", String(t.y + t.h - u));
        break;
      case "left":
        h.setAttribute("x", String(t.x - u)), h.setAttribute("y", String(t.y + t.h / 2 - u));
        break;
    }
  });
}
class dt {
  constructor(e) {
    E(this, "g");
    E(this, "points");
    E(this, "lines");
    this.g = w("g"), this.g.setAttribute("class", `${p}-border`), e.append(this.g);
    const [t, c] = lt();
    this.points = t, this.lines = c, this.g.append(...c, ...t), this.g.style.display = "none";
  }
  hidden() {
    this.g.style.display = "none";
  }
  reRender(e) {
    e.selected && (this.g.style.display = "block", ut(this.g, e.selected));
  }
}
const R = 1, O = "#2A63F4", D = 8, N = 10, W = 10;
function F(i) {
  const e = i.nodes.map((n) => L.from(n)), t = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  return e.forEach((n) => {
    var A, y;
    const h = {
      type: "width",
      nodeRect: n
    }, u = {
      type: "height",
      nodeRect: n
    };
    t.has(n.w) ? (A = t.get(n.w)) == null || A.push(h) : t.set(n.w, [h]), c.has(n.h) ? (y = c.get(n.h)) == null || y.push(u) : c.set(n.h, [u]);
  }), {
    widthMap: t,
    heightMap: c
  };
}
function gt(i) {
  i.nodes.forEach((e) => {
    const t = L.from(e), c = i.resize.g.querySelector(`[data-ower-id="${t.id}"]`), n = M(c, `${p}-resize-line-group-width-line`), h = M(c, `${p}-resize-line-group-width-line-start`), u = M(c, `${p}-resize-line-group-width-line-end`), A = M(c, `${p}-resize-line-group-width-text`), y = M(c, `${p}-resize-line-group-height-line`), a = M(c, `${p}-resize-line-group-height-text`), r = M(c, `${p}-resize-line-group-height-line-start`), o = M(c, `${p}-resize-line-group-height-line-end`);
    n.setAttribute("x1", String(t.x)), n.setAttribute("y1", String(t.y - D)), n.setAttribute("x2", String(t.x + t.w)), n.setAttribute("y2", String(t.y - D)), h.setAttribute("x", String(t.x - R / 2)), h.setAttribute("y", String(t.y - D - N / 2)), h.setAttribute("width", String(R)), h.setAttribute("height", String(N)), h.setAttribute("fill", String(O)), u.setAttribute("x", String(t.x + t.w - R / 2)), u.setAttribute("y", String(t.y - D - N / 2)), u.setAttribute("width", String(R)), u.setAttribute("height", String(N)), u.setAttribute("fill", String(O)), A.textContent = `${t.w}`, A.setAttribute("x", String(t.x + t.w / 2)), A.setAttribute("y", String(t.y - D - 8)), A.setAttribute("fill", String(O)), A.setAttribute("font-size", String(W)), A.setAttribute("text-anchor", "middle"), A.setAttribute("alignment-baseline", "middle"), y.setAttribute("x1", String(t.x - D)), y.setAttribute("y1", String(t.y)), y.setAttribute("x2", String(t.x - D)), y.setAttribute("y2", String(t.y + t.h)), r.setAttribute("x", String(t.x - D - N / 2)), r.setAttribute("y", String(t.y - R / 2)), r.setAttribute("width", String(N)), r.setAttribute("height", String(R)), r.setAttribute("fill", String(O)), o.setAttribute("x", String(t.x - D - N / 2)), o.setAttribute("y", String(t.y + t.h - R / 2)), o.setAttribute("width", String(N)), o.setAttribute("height", String(R)), o.setAttribute("fill", String(O)), a.textContent = `${t.h}`, a.setAttribute("x", String(t.x - D - 8)), a.setAttribute("y", String(t.y + t.h / 2)), a.setAttribute("fill", String(O)), a.setAttribute("font-size", String(W)), a.setAttribute("text-anchor", "middle"), a.setAttribute("alignment-baseline", "middle"), a.setAttribute(
      "transform",
      `rotate(-90 ${t.x - D - 8} ${t.y + t.h / 2})`
    ), [n, y].forEach((s) => {
      s.setAttribute("stroke", O), s.setAttribute("stroke-width", String(R));
    });
  });
}
class ft {
  constructor(e, t) {
    E(this, "g");
    E(this, "lines");
    this.g = w("g"), this.g.setAttribute("class", `${p}-resize`);
    const c = [];
    t.forEach((n) => {
      const h = L.from(n), u = w("g");
      u.setAttribute("class", `${p}-resize-line`), u.setAttribute("data-ower-id", h.id);
      const A = w("g");
      A.setAttribute("class", `${p}-resize-line-group-width`);
      const y = w("line");
      y.setAttribute("class", `${p}-resize-line-group-width-line`);
      const a = w("text");
      a.setAttribute("class", `${p}-resize-line-group-width-text`);
      const r = w("rect");
      r.setAttribute("class", `${p}-resize-line-group-width-line-start`);
      const o = w("rect");
      o.setAttribute("class", `${p}-resize-line-group-width-line-end`), A.append(y, a, r, o);
      const s = w("g");
      s.setAttribute("class", `${p}-resize-line-group-height`);
      const d = w("line");
      d.setAttribute("class", `${p}-resize-line-group-height-line`);
      const x = w("text");
      x.setAttribute("class", `${p}-resize-line-group-height-text`);
      const b = w("rect");
      b.setAttribute("class", `${p}-resize-line-group-height-line-start`);
      const l = w("rect");
      l.setAttribute("class", `${p}-resize-line-group-height-line-end`), s.append(d, x, b, l), u.append(A, s), c.push(u);
    }), this.lines = c, this.g.append(...this.lines), e.append(this.g), this.hidden();
  }
  hidden() {
    this.lines.forEach((e) => {
      Array.from(e.children).forEach((t) => {
        t.style.display = "none";
      });
    });
  }
  reRender(e, t, c, n, h, u, A, y) {
    var H, C;
    if (!e.selected) return;
    this.hidden();
    const { widthMap: a, heightMap: r } = F(e), o = [], s = [];
    a.forEach((k, z) => {
      var _;
      k.length === 1 && k[0].nodeRect.id === ((_ = e.selected) == null ? void 0 : _.dataset.id) || Math.abs(t - z) <= 3 && o.push(z);
    }), r.forEach((k, z) => {
      var _;
      k.length === 1 && k[0].nodeRect.id === ((_ = e.selected) == null ? void 0 : _.dataset.id) || Math.abs(c - z) <= 3 && s.push(z);
    });
    const d = o.length === 0 ? t : Math.max(...o), x = s.length === 0 ? c : Math.max(...s), b = Math.max(d, 10), l = Math.max(x, 10);
    if (n.includes("left")) {
      const k = h + A;
      e.selected.style.left = S(k - b);
    } else
      e.selected.style.left = S(h);
    if (e.selected.style.width = S(b), n.includes("top")) {
      const k = u + y;
      e.selected.style.top = S(k - l);
    } else
      e.selected.style.top = S(u);
    e.selected.style.height = S(l);
    const g = parseFloat(e.selected.style.width), m = parseFloat(e.selected.style.height), { widthMap: v, heightMap: f } = F(e);
    (H = v.get(g)) == null || H.forEach((k) => {
      const z = this.g.querySelector(`[data-ower-id="${k.nodeRect.id}"]`), _ = M(z, `${p}-resize-line-group-width`);
      _.style.display = "block";
    }), (C = f.get(m)) == null || C.forEach((k) => {
      const z = this.g.querySelector(`[data-ower-id="${k.nodeRect.id}"]`), _ = M(z, `${p}-resize-line-group-height`);
      _.style.display = "block";
    });
    const $ = this.g.querySelector(`[data-ower-id="${e.selected.dataset.id}"]`), T = M($, `${p}-resize-line-group-width`), Y = M($, `${p}-resize-line-group-height`);
    Y.style.display = "block", T.style.display = "block", gt(e), e.border.reRender(e);
  }
}
function bt(i, e, t, c) {
  return t - i > 0 && c - e > 0 ? "4" : t - i < 0 && c - e > 0 ? "3" : t - i < 0 && c - e < 0 ? "2" : t - i > 0 && c - e < 0 ? "1" : "0";
}
class pt {
  constructor(e) {
    E(this, "g");
    // 选择框矩形
    E(this, "selectorRect");
    E(this, "previewRect");
    E(this, "selectedGroup", []);
    this.g = w("g"), this.g.setAttribute("class", `${p}-selector`), this.selectorRect = w("rect"), this.selectorRect.setAttribute("class", `${p}-selector-rect`), this.selectorRect.setAttribute("stroke", "#919191"), this.selectorRect.setAttribute("stroke-width", "1px"), this.selectorRect.setAttribute("fill", "rgba(255,255,255,0.3)"), this.selectorRect.style.display = "none", this.previewRect = w("rect"), this.previewRect.setAttribute("class", `${p}-selector-preview`), this.previewRect.setAttribute("stroke", "#000"), this.previewRect.setAttribute("stroke-width", "1px"), this.previewRect.setAttribute("fill", "transparent"), this.previewRect.style.display = "none", this.g.append(this.selectorRect, this.previewRect), e.append(this.g);
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
  reRender(e, t, c, n, h) {
    this.showSelector(), this.hiddenPreview(), this.selectedGroup = [];
    const u = bt(t, c, n, h), A = Math.abs(t - n), y = Math.abs(c - h);
    this.selectorRect.setAttribute("width", String(A)), this.selectorRect.setAttribute("height", String(y));
    let a = t, r = c;
    switch (u) {
      case "3": {
        a = a - A;
        break;
      }
      case "2": {
        a = a - A, r = r - y;
        break;
      }
      case "1": {
        r = r - y;
        break;
      }
    }
    this.selectorRect.setAttribute("x", String(a)), this.selectorRect.setAttribute("y", String(r)), e.nodes.forEach((g) => {
      L.from(g).isIntersect({
        x: a,
        y: r,
        w: A,
        h: y
      }) && this.selectedGroup.push(g);
    });
    const o = [], s = [], d = [], x = [];
    this.selectedGroup.forEach((g) => {
      const { x: m, y: v, w: f, h: $ } = L.from(g);
      o.push(m), s.push(v), d.push(m + f), x.push(v + $);
    });
    const b = Math.min(...o), l = Math.min(...s);
    this.previewRect.setAttribute("x", String(o.length ? b : 0)), this.previewRect.setAttribute("y", String(s.length ? l : 0)), this.previewRect.setAttribute("width", String(d.length ? Math.max(...d) - b : 0)), this.previewRect.setAttribute("height", String(x.length ? Math.max(...x) - l : 0));
  }
}
const yt = ["left", "right", "top", "bottom"];
class xt {
  constructor(e) {
    E(this, "g");
    E(this, "distanceGroups");
    E(this, "x");
    E(this, "y");
    this.g = w("g"), this.g.setAttribute("class", `${p}-distance`), this.distanceGroups = {};
    const t = (c) => {
      const n = w("g");
      n.setAttribute("class", `${p}-distance-${c}`);
      const h = w("line");
      h.setAttribute("class", `${p}-distance-${c}-line`);
      const u = w("text");
      u.setAttribute("class", `${p}-distance-${c}-text`);
      const A = w("rect");
      A.setAttribute("class", `${p}-distance-${c}-text-bg`);
      const y = w("rect");
      y.setAttribute("class", `${p}-distance-${c}-line-start`);
      const a = w("rect");
      return a.setAttribute("class", `${p}-distance-${c}-line-end`), n.appendChild(h), n.appendChild(u), n.appendChild(A), n.appendChild(y), n.appendChild(a), n;
    };
    this.x = {
      type: "left",
      node: null
    }, this.y = {
      type: "top",
      node: null
    }, yt.forEach((c) => {
      const n = t(c);
      this.distanceGroups[c] = n;
    }), this.g.append(...Object.values(this.distanceGroups)), e.append(this.g);
  }
  hidden() {
    Object.values(this.distanceGroups).forEach((e) => {
      e.style.display = "none";
    });
  }
  reRender(e) {
  }
}
const At = (i, e) => {
  const t = w("svg");
  t.setAttribute("class", `${p}-svg`);
  const c = i.getBoundingClientRect();
  return t.setAttribute("width", S(c.width)), t.setAttribute("height", S(c.height)), t.style = "position: absolute; inset: 0;", i.className += ` ${p}-container`, e.forEach((n) => {
    n.className += ` ${p}-movable-node`, n.setAttribute("data-id", rt()), /%$/.test(n.style.x) && (n.style.x = S(c.width * parseInt(n.style.x) / 100)), /%$/.test(n.style.y) && (n.style.y = S(c.height * parseInt(n.style.y) / 100)), /%$/.test(n.style.width) && (n.style.width = S(c.width * parseInt(n.style.width) / 100)), /%$/.test(n.style.height) && (n.style.height = S(c.height * parseInt(n.style.height) / 100));
  }), {
    container: i,
    nodes: e,
    svg: t,
    selected: null,
    setSelected(n) {
      if (this.selected = n, !n) {
        this.border.hidden();
        return;
      }
      this.border.reRender(this);
    },
    align: new ht(t),
    border: new dt(t),
    resize: new ft(t, e),
    selector: new pt(t),
    gap: new st(t),
    distance: new xt(t)
  };
};
class St {
  constructor(e, t) {
    E(this, "store");
    this.store = At(e, t), V(this.store);
  }
  mount() {
    this.store.container.append(this.store.svg);
  }
  unmount() {
    this.store.svg.remove();
  }
  align(e) {
    const { selected: t, container: c } = this.store;
    if (!t) return;
    const n = c.getBoundingClientRect(), h = L.from(t);
    switch (e) {
      case "start":
        t.style.left = S(0);
        break;
      case "center":
        t.style.left = S(n.width / 2 - h.w / 2);
        break;
      case "end":
        t.style.left = S(n.width - h.w);
        break;
    }
  }
}
export {
  St as default
};
