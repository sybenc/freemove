var V = Object.defineProperty;
var K = (n, s, t) => s in n ? V(n, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[s] = t;
var v = (n, s, t) => K(n, typeof s != "symbol" ? s + "" : s, t);
const b = "__freemove";
class E {
  constructor({ x: s, y: t, h: e, w: i, node: c }) {
    v(this, "x");
    v(this, "y");
    v(this, "w");
    v(this, "h");
    v(this, "id");
    v(this, "node");
    this.x = s, this.y = t, this.h = e, this.w = i, this.node = c, this.id = c.dataset.id;
  }
  // 判断一个点是否在矩形里面
  isInSide(s) {
    return s.x >= this.x && s.x <= this.x + this.w && s.y >= this.y && s.y <= this.y + this.h;
  }
  isIntersect(s) {
    const t = this.x + 3, e = this.y + 3, i = this.x + this.w - 3, c = this.y + this.h - 3, a = s.x, y = s.y, u = s.x + s.w, o = s.y + s.h;
    return !(i < a || t > u || c < y || e > o);
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
    return new E({
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
function w(n) {
  return typeof n == "number" ? `${n}px` : String(n);
}
function tt(n, s, t = 0.1) {
  return Math.abs(n - s) <= t;
}
function S(n, s) {
  return n.getElementsByClassName(s)[0];
}
function m(n) {
  return document.createElementNS("http://www.w3.org/2000/svg", n);
}
function H(n, s = !1) {
  return s ? Math.round(parseFloat(n.toFixed(1))) : Number.isInteger(n) ? n.toFixed(0) : n.toFixed(1);
}
function et(n, s) {
  if (!n.selected) return;
  const t = n.container.getBoundingClientRect();
  n.align.reRender(n), n.border.reRender(n), n.gap.reRender(n), n.distance.reRender(n);
  const e = n.selected.getBoundingClientRect();
  let i = s.clientX - e.left, c = s.clientY - e.top, a = null;
  function y(o) {
    a || (a = requestAnimationFrame(() => {
      if (!n.selected) return;
      let h = o.clientX - t.left - i, l = o.clientY - t.top - c;
      const r = n.container.clientWidth - n.selected.offsetWidth, g = n.container.clientHeight - n.selected.offsetHeight;
      h = Math.max(0, Math.min(h, r)), l = Math.max(0, Math.min(l, g)), n.selected.style.left = w(h), n.selected.style.top = w(l), n.align.reRender(n), n.border.reRender(n), n.gap.reRender(n), n.distance.reRender(n), a = null;
    }));
  }
  function u() {
    document.removeEventListener("pointermove", y), document.removeEventListener("pointerup", u), n.align.hidden(), n.distance.hidden(), a !== null && (cancelAnimationFrame(a), a = null);
  }
  document.addEventListener("pointermove", y), document.addEventListener("pointerup", u);
}
function it(n, s) {
  if (!n.selected) return;
  const t = n.container.getBoundingClientRect(), i = s.target.dataset.direction;
  if (!i) return;
  const c = E.from(n.selected);
  let a = s.clientX, y = s.clientY, u = c.w, o = c.h, h = c.x, l = c.y;
  const r = t.width, g = t.height;
  function f(d) {
    let p = d.clientX - a, $ = d.clientY - y, A = u, L = o, F = h, _ = l;
    i.includes("right") && (A = u + p), i.includes("left") && (A = u - p, F = h + p), i.includes("bottom") && (L = o + $), i.includes("top") && (L = o - $, _ = l + $), F < 0 && (A += F, F = 0), _ < 0 && (L += _, _ = 0), F + A > r && (A = r - F), _ + L > g && (L = g - _), A = Math.max(A, 10), L = Math.max(L, 10), n.resize.reRender(n, A, L, i, h, l, u, o), n.border.reRender(n);
  }
  function x() {
    n.resize.hidden(), document.removeEventListener("pointermove", f), document.removeEventListener("pointerup", x);
  }
  document.addEventListener("pointermove", f), document.addEventListener("pointerup", x);
}
function st(n, s) {
  const t = n.container.getBoundingClientRect(), e = s.clientX - t.left, i = s.clientY - t.top;
  function c(y) {
    const u = y.clientX - t.left, o = y.clientY - t.top;
    n.selector.reRender(n, e, i, u, o);
  }
  function a() {
    n.selector.hiddenSelector(), n.selector.showPreview(), document.removeEventListener("pointermove", c), document.removeEventListener("pointerup", a);
  }
  document.addEventListener("pointermove", c), document.addEventListener("pointerup", a);
}
function rt(n) {
  n.svg.addEventListener("pointerdown", (s) => {
    s.preventDefault();
    const t = s.target;
    if (t.classList[0].includes(`${b}-border-point-`)) {
      const e = t.dataset.ownerId;
      for (let i = 0; i < n.nodes.length; i++)
        e === n.nodes[i].dataset.ownerId && n.setSelected(n.nodes[i]);
      n.selected && it(n, s);
      return;
    }
    if (t.classList.contains(`${b}-svg`)) {
      let e = null;
      for (const i of n.nodes) {
        const c = E.from(i);
        if (c.isInSide({ x: s.offsetX, y: s.offsetY })) {
          e = c;
          break;
        }
      }
      e && e.node.classList.contains(`${b}-movable-node`) && (n.selector.hiddenPreview(), n.setSelected(e.node), et(n, s)), e || (n.border.hidden(), st(n, s));
    }
  });
}
function nt(n) {
  const s = /* @__PURE__ */ new Map();
  function t(u) {
    var h;
    const o = [];
    u.toSorted((l, r) => l.x - r.x).forEach((l) => {
      o.push({ value: l.x, type: "min", nodeRect: l }), o.push({ value: l.x + l.w, type: "max", nodeRect: l });
    }), o.sort((l, r) => l.value - r.value);
    for (let l = 0; l < o.length - 1; l++) {
      const r = [], g = [];
      if (o[l].type === "max" && o[l + 1].type === "min") {
        for (let d = 0; d <= l && o[l].value === o[l - d].value; d++)
          r.push(o[l - d]);
        for (let d = l + 1; d <= o.length && o[l + 1].value === o[d].value; d++)
          g.push(o[d]);
        const f = g[0].value - r[0].value, x = r[0].nodeRect.x;
        if (f > 0) {
          const d = Math.min(...r.map((A) => A.nodeRect.y), ...g.map((A) => A.nodeRect.y)), p = Math.max(
            ...r.map((A) => A.nodeRect.y + A.nodeRect.h),
            ...g.map((A) => A.nodeRect.y + A.nodeRect.h)
          ), $ = {
            x,
            y: d,
            w: f,
            h: p - d,
            rect1: r.map((A) => A.nodeRect),
            rect2: g.map((A) => A.nodeRect)
          };
          s.has(f) ? (h = s.get(f)) == null || h.push($) : s.set(f, [$]);
        }
      }
    }
  }
  function e() {
    s.forEach((u, o) => {
      const h = /* @__PURE__ */ new Map();
      u.forEach((l) => {
        h.has(l.x) ? h.get(l.x).push(l) : h.set(l.x, [l]);
      }), h.forEach((l, r) => {
        const g = [], f = [], x = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
        l == null || l.forEach((A) => {
          g.push(A.y), f.push(A.y + A.h), A.rect1.forEach((L) => x.add(L)), A.rect2.forEach((L) => d.add(L));
        });
        const p = Math.min(...g), $ = Math.max(...f);
        h.set(r, [
          {
            x: r,
            y: p,
            h: $ - p,
            w: o,
            rect1: Array.from(x),
            rect2: Array.from(d)
          }
        ]);
      }), s.set(o, Array.from(h.values()).flat());
    });
  }
  const i = [], c = E.from(n.selected);
  n.nodes.forEach((u) => {
    const o = E.from(u);
    i.push(o);
  }), i.sort((u, o) => u.x - o.x);
  const a = [], y = [];
  return i.forEach((u) => {
    u.y <= c.y && u.y + u.h >= c.y || u.y <= c.y + c.h / 2 && u.y + u.h >= c.y + c.h / 2 || u.y <= c.y + c.h && u.y + u.h >= c.y + c.h ? a.push(u) : y.push(u);
  }), t(a), y.forEach((u) => {
    a.push(u), t(a);
  }), e(), s;
}
function lt(n) {
  const s = /* @__PURE__ */ new Map();
  function t(u) {
    var h;
    const o = [];
    u.toSorted((l, r) => l.y - r.y).forEach((l) => {
      o.push({ value: l.y, type: "min", nodeRect: l }), o.push({ value: l.y + l.h, type: "max", nodeRect: l });
    }), o.sort((l, r) => l.value - r.value);
    for (let l = 0; l < o.length - 1; l++) {
      const r = [], g = [];
      if (o[l].type === "max" && o[l + 1].type === "min") {
        for (let d = 0; d <= l && o[l].value === o[l - d].value; d++)
          r.push(o[l - d]);
        for (let d = l + 1; d <= o.length && o[l + 1].value === o[d].value; d++)
          g.push(o[d]);
        const f = g[0].value - r[0].value, x = r[0].nodeRect.y;
        if (f > 0) {
          const d = Math.min(...r.map((A) => A.nodeRect.x), ...g.map((A) => A.nodeRect.x)), p = Math.max(
            ...r.map((A) => A.nodeRect.x + A.nodeRect.w),
            ...g.map((A) => A.nodeRect.x + A.nodeRect.w)
          ), $ = {
            x: d,
            y: x,
            w: p - d,
            h: f,
            rect1: r.map((A) => A.nodeRect),
            rect2: g.map((A) => A.nodeRect)
          };
          s.has(f) ? (h = s.get(f)) == null || h.push($) : s.set(f, [$]);
        }
      }
    }
  }
  function e() {
    s.forEach((u, o) => {
      const h = /* @__PURE__ */ new Map();
      u.forEach((l) => {
        h.has(l.y) ? h.get(l.y).push(l) : h.set(l.y, [l]);
      }), h.forEach((l, r) => {
        const g = [], f = [], x = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
        l == null || l.forEach((A) => {
          g.push(A.x), f.push(A.x + A.w), A.rect1.forEach((L) => x.add(L)), A.rect2.forEach((L) => d.add(L));
        });
        const p = Math.min(...g), $ = Math.max(...f);
        h.set(r, [
          {
            x: p,
            y: r,
            h: o,
            w: $ - p,
            rect1: Array.from(x),
            rect2: Array.from(d)
          }
        ]);
      }), s.set(o, Array.from(h.values()).flat());
    });
  }
  const i = [], c = E.from(n.selected);
  n.nodes.forEach((u) => {
    const o = E.from(u);
    i.push(o);
  }), i.sort((u, o) => u.y - o.y);
  const a = [], y = [];
  return i.forEach((u) => {
    u.x <= c.x && u.x + u.w >= c.x || u.x <= c.x + c.w / 2 && u.x + u.w >= c.x + c.w / 2 || u.x <= c.x + c.w && u.x + u.w >= c.x + c.w ? a.push(u) : y.push(u);
  }), t(a), y.forEach((u) => {
    a.push(u), t(a);
  }), e(), s;
}
class ht {
  constructor(s) {
    v(this, "g");
    this.g = m("g"), this.g.setAttribute("class", `${b}-gap`), s.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(s) {
    nt(s), lt(s);
  }
}
const ct = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let at = (n = 21) => {
  let s = "", t = crypto.getRandomValues(new Uint8Array(n |= 0));
  for (; n--; )
    s += ct[t[n] & 63];
  return s;
};
const ot = 1, ut = "red", O = ["vl", "vc", "vr", "ht", "hc", "hb"];
function dt(n, s) {
  const t = n.container.getBoundingClientRect(), e = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  let i = !1;
  function c() {
    const h = E.from(n.selected), l = n.nodes.filter((r) => r !== n.selected).map((r) => E.from(r));
    O.forEach((r) => e[r] = []), l.forEach((r) => {
      if (h.isIntersect(r)) return;
      const g = h.getAlignLinePostion();
      O.forEach((f) => {
        let x = 1e4, d = 1e4, p;
        /^h/.test(f) && (h.x > r.x + r.w ? (x = h.x + h.w, d = r.x) : h.x + h.w < r.x ? (x = h.x, d = r.x + r.w) : (x = Math.min(h.x, r.x), d = Math.max(h.x + h.w, r.x + r.w)), [r.y, r.y + r.h / 2, r.y + r.h].forEach(($) => {
          p = Math.abs(g[f] - $), p <= 3 && e[f].push({
            type: f,
            source: x,
            target: d,
            absorbDistance: p,
            absorbPosition: $,
            nodeRects: [r]
          });
        })), /^v/.test(f) && (h.y > r.y + r.h ? (x = h.y + h.h, d = r.y) : h.y + h.h < r.y ? (x = h.y, d = r.y + r.h) : (x = Math.min(h.y, r.y), d = Math.max(h.y + h.h, r.y + r.h)), [r.x, r.x + r.w / 2, r.x + r.w].forEach(($) => {
          p = Math.abs(g[f] - $), p <= 3 && e[f].push({
            type: f,
            source: x,
            target: d,
            absorbDistance: p,
            absorbPosition: $,
            nodeRects: [r]
          });
        }));
      });
    }), O.forEach((r) => {
      const g = /* @__PURE__ */ new Map();
      e[r].forEach((d) => {
        const p = g.get(d.absorbDistance) || [];
        p.push(d), g.set(d.absorbDistance, p);
      });
      let f = 1 / 0, x = 0;
      g.forEach((d) => {
        d.forEach((p) => {
          f = Math.min(f, p.source, p.target), x = Math.max(x, p.source, p.target);
        });
      }), g.forEach((d) => {
        d.forEach((p) => {
          p.source = f, p.target = x;
        });
      }), e[r] = Array.from(g.values()).flat();
    });
  }
  function a(h) {
    const { absorbPosition: l, type: r } = h, g = n.selected;
    switch (r) {
      case "ht":
        g.style.top = w(l);
        break;
      case "hc":
        g.style.top = w(l - parseFloat(g.style.height) / 2);
        break;
      case "hb":
        g.style.top = w(l - parseFloat(g.style.height));
        break;
      case "vl":
        g.style.left = w(l);
        break;
      case "vc":
        g.style.left = w(l - parseFloat(g.style.width) / 2);
        break;
      case "vr":
        g.style.left = w(l - parseFloat(g.style.width));
        break;
    }
    c(), n.border.reRender(n);
  }
  function y() {
    if (!n.selected) return;
    const h = E.from(n.selected), l = t.width / 2;
    Math.abs(h.x + h.w / 2 - l) <= 3 && (n.selected.style.left = w(l - h.w / 2), i = !0), c(), n.border.reRender(n);
  }
  function u() {
    if (!n.selected) return;
    const h = E.from(n.selected), l = Object.values(e).flat();
    if ([...e.hb, ...e.hc, ...e.ht].length === 0 ? s.isHAlign = !1 : s.isHAlign = !0, [...e.vc, ...e.vl, ...e.vr].length === 0 ? s.isVAlign = !1 : s.isVAlign = !0, l.forEach((r) => {
      const { source: g, target: f, type: x } = r, d = s.lines[x];
      if (/^h/.test(x))
        switch (d == null || d.setAttribute("x1", String(g)), d == null || d.setAttribute("x2", String(f)), x) {
          case "ht":
            d.setAttribute("y1", String(h.y)), d.setAttribute("y2", String(h.y));
            break;
          case "hc":
            d.setAttribute("y1", String(h.y + h.h / 2)), d.setAttribute("y2", String(h.y + h.h / 2));
            break;
          case "hb":
            d.setAttribute("y1", String(h.y + h.h)), d.setAttribute("y2", String(h.y + h.h));
            break;
        }
      if (/^v/.test(x))
        switch (d == null || d.setAttribute("y1", String(g)), d == null || d.setAttribute("y2", String(f)), x) {
          case "vl":
            d.setAttribute("x1", String(h.x)), d.setAttribute("x2", String(h.x));
            break;
          case "vc":
            d.setAttribute("x1", String(h.x + h.w / 2)), d.setAttribute("x2", String(h.x + h.w / 2));
            break;
          case "vr":
            d.setAttribute("x1", String(h.x + h.w)), d.setAttribute("x2", String(h.x + h.w));
            break;
        }
      d == null || d.setAttribute("style", "display: 'block");
    }), i) {
      const r = s.lines.vertical;
      r.setAttribute("x1", String(t.width / 2)), r.setAttribute("y1", String(0)), r.setAttribute("x2", String(t.width / 2)), r.setAttribute("y2", String(t.height)), r == null || r.setAttribute("style", "display: 'block");
    }
  }
  c(), Object.values(e).flat().forEach((h) => {
    a(h);
  }), y();
  let o = 1 / 0;
  O.forEach((h) => {
    e[h].forEach((l) => {
      l.absorbDistance < o && (o = l.absorbDistance);
    });
  }), O.forEach((h) => {
    e[h] = e[h].filter((l) => tt(l.absorbDistance, o, 0.01));
  }), u();
}
class bt {
  constructor(s) {
    v(this, "g");
    v(this, "lines");
    v(this, "isHAlign", !1);
    v(this, "isVAlign", !1);
    this.g = m("g"), this.g.setAttribute("class", `${b}-align`), this.lines = {}, [...O, "vertical"].forEach((t) => {
      const e = m("line");
      e.setAttribute("class", `${b}-align-${t}`), e.setAttribute("stroke", ut), e.setAttribute("stroke-width", String(ot)), e.style.display = "none", this.g.append(e), this.lines[t] = e;
    }), s.append(this.g);
  }
  hidden() {
    Object.values(this.lines).forEach((s) => {
      s.style.display = "none";
    });
  }
  reRender(s) {
    s.selected && (this.hidden(), dt(s, this));
  }
}
const R = 1, Y = "#000", P = 6, U = ["left", "top", "right", "bottom"], Q = [
  "left-top",
  "top",
  "right-top",
  "right",
  "right-bottom",
  "bottom",
  "left-bottom",
  "left"
], gt = [
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize",
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize"
];
function yt() {
  const n = [], s = [];
  return U.forEach((t) => {
    const e = m("line");
    e.setAttribute("class", `${b}-border-line-${t}`), e.setAttribute("stroke", Y), e.setAttribute("stroke-width", w(R)), s.push(e);
  }), Q.forEach((t, e) => {
    const i = m("rect");
    i.setAttribute("class", `${b}-border-point-${t}`), i.setAttribute("fill", "white"), i.setAttribute("stroke", Y), i.setAttribute("stroke-width", w(R)), i.setAttribute("width", w(P)), i.setAttribute("height", w(P)), i.setAttribute("style", `cursor: ${gt[e]}`), i.setAttribute("data-direction", t), n.push(i);
  }), [n, s];
}
function At(n, s) {
  const t = E.from(s);
  U.forEach((e) => {
    const i = S(n, `${b}-border-line-${e}`);
    switch (e) {
      case "left":
        i.setAttribute("x1", String(t.x)), i.setAttribute("y1", String(t.y - R / 2)), i.setAttribute("x2", String(t.x)), i.setAttribute("y2", String(t.y + t.h + R / 2));
        break;
      case "right":
        i.setAttribute("x1", String(t.x + t.w)), i.setAttribute("y1", String(t.y - R / 2)), i.setAttribute("x2", String(t.x + t.w)), i.setAttribute("y2", String(t.y + t.h + R / 2));
        break;
      case "top":
        i.setAttribute("x1", String(t.x - R / 2)), i.setAttribute("y1", String(t.y)), i.setAttribute("x2", String(t.x + t.w + R / 2)), i.setAttribute("y2", String(t.y));
        break;
      case "bottom":
        i.setAttribute("x1", String(t.x - R / 2)), i.setAttribute("y1", String(t.y + t.h)), i.setAttribute("x2", String(t.x + t.w + R / 2)), i.setAttribute("y2", String(t.y + t.h));
        break;
    }
  }), Q.forEach((e, i) => {
    const c = S(n, `${b}-border-point-${e}`);
    c.setAttribute("data-owner-id", s.dataset.id);
    const a = P / 2;
    switch (e) {
      case "left-top":
        c.setAttribute("x", String(t.x - a)), c.setAttribute("y", String(t.y - a));
        break;
      case "top":
        c.setAttribute("x", String(t.x + t.w / 2 - a)), c.setAttribute("y", String(t.y - a));
        break;
      case "right-top":
        c.setAttribute("x", String(t.x + t.w - a)), c.setAttribute("y", String(t.y - a));
        break;
      case "right":
        c.setAttribute("x", String(t.x + t.w - a)), c.setAttribute("y", String(t.y + t.h / 2 - a));
        break;
      case "right-bottom":
        c.setAttribute("x", String(t.x + t.w - a)), c.setAttribute("y", String(t.y + t.h - a));
        break;
      case "bottom":
        c.setAttribute("x", String(t.x + t.w / 2 - a)), c.setAttribute("y", String(t.y + t.h - a));
        break;
      case "left-bottom":
        c.setAttribute("x", String(t.x - a)), c.setAttribute("y", String(t.y + t.h - a));
        break;
      case "left":
        c.setAttribute("x", String(t.x - a)), c.setAttribute("y", String(t.y + t.h / 2 - a));
        break;
    }
  });
}
class ft {
  constructor(s) {
    v(this, "g");
    v(this, "points");
    v(this, "lines");
    this.g = m("g"), this.g.setAttribute("class", `${b}-border`), s.append(this.g);
    const [t, e] = yt();
    this.points = t, this.lines = e, this.g.append(...e, ...t), this.g.style.display = "none";
  }
  hidden() {
    this.g.style.display = "none";
  }
  reRender(s) {
    s.selected && (this.g.style.display = "block", At(this.g, s.selected));
  }
}
const N = 1, B = "#2A63F4", I = 8, C = 10, q = 10;
function Z(n) {
  const s = n.nodes.map((i) => E.from(i)), t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
  return s.forEach((i) => {
    var y, u;
    const c = {
      type: "width",
      nodeRect: i
    }, a = {
      type: "height",
      nodeRect: i
    };
    t.has(i.w) ? (y = t.get(i.w)) == null || y.push(c) : t.set(i.w, [c]), e.has(i.h) ? (u = e.get(i.h)) == null || u.push(a) : e.set(i.h, [a]);
  }), {
    widthMap: t,
    heightMap: e
  };
}
function xt(n) {
  n.nodes.forEach((s) => {
    const t = E.from(s), e = n.resize.g.querySelector(`[data-ower-id="${t.id}"]`), i = S(e, `${b}-resize-line-group-width-line`), c = S(e, `${b}-resize-line-group-width-line-start`), a = S(e, `${b}-resize-line-group-width-line-end`), y = S(e, `${b}-resize-line-group-width-text`), u = S(e, `${b}-resize-line-group-height-line`), o = S(e, `${b}-resize-line-group-height-text`), h = S(e, `${b}-resize-line-group-height-line-start`), l = S(e, `${b}-resize-line-group-height-line-end`);
    i.setAttribute("x1", String(t.x)), i.setAttribute("y1", String(t.y - I)), i.setAttribute("x2", String(t.x + t.w)), i.setAttribute("y2", String(t.y - I)), c.setAttribute("x", String(t.x - N / 2)), c.setAttribute("y", String(t.y - I - C / 2)), c.setAttribute("width", String(N)), c.setAttribute("height", String(C)), c.setAttribute("fill", String(B)), a.setAttribute("x", String(t.x + t.w - N / 2)), a.setAttribute("y", String(t.y - I - C / 2)), a.setAttribute("width", String(N)), a.setAttribute("height", String(C)), a.setAttribute("fill", String(B)), y.textContent = `${H(t.w)}`, y.setAttribute("x", String(t.x + t.w / 2)), y.setAttribute("y", String(t.y - I - 8)), y.setAttribute("fill", String(B)), y.setAttribute("font-size", String(q)), y.setAttribute("text-anchor", "middle"), y.setAttribute("alignment-baseline", "middle"), u.setAttribute("x1", String(t.x - I)), u.setAttribute("y1", String(t.y)), u.setAttribute("x2", String(t.x - I)), u.setAttribute("y2", String(t.y + t.h)), h.setAttribute("x", String(t.x - I - C / 2)), h.setAttribute("y", String(t.y - N / 2)), h.setAttribute("width", String(C)), h.setAttribute("height", String(N)), h.setAttribute("fill", String(B)), l.setAttribute("x", String(t.x - I - C / 2)), l.setAttribute("y", String(t.y + t.h - N / 2)), l.setAttribute("width", String(C)), l.setAttribute("height", String(N)), l.setAttribute("fill", String(B)), o.textContent = `${H(t.h)}`, o.setAttribute("x", String(t.x - I - 8)), o.setAttribute("y", String(t.y + t.h / 2)), o.setAttribute("fill", String(B)), o.setAttribute("font-size", String(q)), o.setAttribute("text-anchor", "middle"), o.setAttribute("alignment-baseline", "middle"), o.setAttribute(
      "transform",
      `rotate(-90 ${t.x - I - 8} ${t.y + t.h / 2})`
    ), [i, u].forEach((r) => {
      r.setAttribute("stroke", B), r.setAttribute("stroke-width", String(N));
    });
  });
}
class pt {
  constructor(s, t) {
    v(this, "g");
    v(this, "lines");
    this.g = m("g"), this.g.setAttribute("class", `${b}-resize`);
    const e = [];
    t.forEach((i) => {
      const c = E.from(i), a = m("g");
      a.setAttribute("class", `${b}-resize-line`), a.setAttribute("data-ower-id", c.id);
      const y = m("g");
      y.setAttribute("class", `${b}-resize-line-group-width`);
      const u = m("line");
      u.setAttribute("class", `${b}-resize-line-group-width-line`);
      const o = m("text");
      o.setAttribute("class", `${b}-resize-line-group-width-text`);
      const h = m("rect");
      h.setAttribute("class", `${b}-resize-line-group-width-line-start`);
      const l = m("rect");
      l.setAttribute("class", `${b}-resize-line-group-width-line-end`), y.append(u, o, h, l);
      const r = m("g");
      r.setAttribute("class", `${b}-resize-line-group-height`);
      const g = m("line");
      g.setAttribute("class", `${b}-resize-line-group-height-line`);
      const f = m("text");
      f.setAttribute("class", `${b}-resize-line-group-height-text`);
      const x = m("rect");
      x.setAttribute("class", `${b}-resize-line-group-height-line-start`);
      const d = m("rect");
      d.setAttribute("class", `${b}-resize-line-group-height-line-end`), r.append(g, f, x, d), a.append(y, r), e.push(a);
    }), this.lines = e, this.g.append(...this.lines), s.append(this.g), this.hidden();
  }
  hidden() {
    this.lines.forEach((s) => {
      Array.from(s.children).forEach((t) => {
        t.style.display = "none";
      });
    });
  }
  reRender(s, t, e, i, c, a, y, u) {
    var X, j;
    if (!s.selected) return;
    this.hidden();
    const { widthMap: o, heightMap: h } = Z(s), l = [], r = [];
    o.forEach((M, T) => {
      var z;
      M.length === 1 && M[0].nodeRect.id === ((z = s.selected) == null ? void 0 : z.dataset.id) || Math.abs(t - T) <= 3 && l.push(T);
    }), h.forEach((M, T) => {
      var z;
      M.length === 1 && M[0].nodeRect.id === ((z = s.selected) == null ? void 0 : z.dataset.id) || Math.abs(e - T) <= 3 && r.push(T);
    });
    const g = l.length === 0 ? t : Math.max(...l), f = r.length === 0 ? e : Math.max(...r), x = Math.max(g, 10), d = Math.max(f, 10);
    if (i.includes("left")) {
      const M = c + y;
      s.selected.style.left = w(M - x);
    } else
      s.selected.style.left = w(c);
    if (s.selected.style.width = w(x), i.includes("top")) {
      const M = a + u;
      s.selected.style.top = w(M - d);
    } else
      s.selected.style.top = w(a);
    s.selected.style.height = w(d);
    const p = parseFloat(s.selected.style.width), $ = parseFloat(s.selected.style.height), { widthMap: A, heightMap: L } = Z(s);
    (X = A.get(p)) == null || X.forEach((M) => {
      const T = this.g.querySelector(`[data-ower-id="${M.nodeRect.id}"]`), z = S(T, `${b}-resize-line-group-width`);
      z.style.display = "block";
    }), (j = L.get($)) == null || j.forEach((M) => {
      const T = this.g.querySelector(`[data-ower-id="${M.nodeRect.id}"]`), z = S(T, `${b}-resize-line-group-height`);
      z.style.display = "block";
    });
    const F = this.g.querySelector(`[data-ower-id="${s.selected.dataset.id}"]`), _ = S(F, `${b}-resize-line-group-width`), J = S(F, `${b}-resize-line-group-height`);
    J.style.display = "block", _.style.display = "block", xt(s), s.border.reRender(s);
  }
}
function St(n, s, t, e) {
  return t - n > 0 && e - s > 0 ? "4" : t - n < 0 && e - s > 0 ? "3" : t - n < 0 && e - s < 0 ? "2" : t - n > 0 && e - s < 0 ? "1" : "0";
}
class wt {
  constructor(s) {
    v(this, "g");
    // 选择框矩形
    v(this, "selectorRect");
    v(this, "previewRect");
    v(this, "selectedGroup", []);
    this.g = m("g"), this.g.setAttribute("class", `${b}-selector`), this.selectorRect = m("rect"), this.selectorRect.setAttribute("class", `${b}-selector-rect`), this.selectorRect.setAttribute("stroke", "#919191"), this.selectorRect.setAttribute("stroke-width", "1px"), this.selectorRect.setAttribute("fill", "rgba(255,255,255,0.3)"), this.selectorRect.style.display = "none", this.previewRect = m("rect"), this.previewRect.setAttribute("class", `${b}-selector-preview`), this.previewRect.setAttribute("stroke", "#000"), this.previewRect.setAttribute("stroke-width", "1px"), this.previewRect.setAttribute("fill", "transparent"), this.previewRect.style.display = "none", this.g.append(this.selectorRect, this.previewRect), s.append(this.g);
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
  reRender(s, t, e, i, c) {
    this.showSelector(), this.hiddenPreview(), this.selectedGroup = [];
    const a = St(t, e, i, c), y = Math.abs(t - i), u = Math.abs(e - c);
    this.selectorRect.setAttribute("width", String(y)), this.selectorRect.setAttribute("height", String(u));
    let o = t, h = e;
    switch (a) {
      case "3": {
        o = o - y;
        break;
      }
      case "2": {
        o = o - y, h = h - u;
        break;
      }
      case "1": {
        h = h - u;
        break;
      }
    }
    this.selectorRect.setAttribute("x", String(o)), this.selectorRect.setAttribute("y", String(h)), s.nodes.forEach((p) => {
      E.from(p).isIntersect({
        x: o,
        y: h,
        w: y,
        h: u
      }) && this.selectedGroup.push(p);
    });
    const l = [], r = [], g = [], f = [];
    this.selectedGroup.forEach((p) => {
      const { x: $, y: A, w: L, h: F } = E.from(p);
      l.push($), r.push(A), g.push($ + L), f.push(A + F);
    });
    const x = Math.min(...l), d = Math.min(...r);
    this.previewRect.setAttribute("x", String(l.length ? x : 0)), this.previewRect.setAttribute("y", String(r.length ? d : 0)), this.previewRect.setAttribute("width", String(g.length ? Math.max(...g) - x : 0)), this.previewRect.setAttribute("height", String(f.length ? Math.max(...f) - d : 0));
  }
}
const k = "#3875F6", G = 1, D = 10, mt = ["left", "right", "top", "bottom"];
function Et(n) {
  const s = [], t = E.from(n.selected);
  n.nodes.forEach((e) => {
    const i = E.from(e);
    s.push(i);
  }), s.forEach((e) => {
    if (e.y <= t.y && e.y + e.h >= t.y || e.y <= t.y + t.h / 2 && e.y + e.h >= t.y + t.h / 2 || e.y <= t.y + t.h && e.y + e.h >= t.y + t.h) {
      if (t.x + t.w < e.x) {
        const c = Math.abs(t.x + t.w - e.x);
        n.distance.x.length > c && (n.distance.x.length = c, n.distance.x.type = "right", n.distance.x.node = e.node);
      }
      if (t.x > e.x + e.w) {
        const c = Math.abs(t.x - e.x - e.w);
        n.distance.x.length > c && (n.distance.x.length = c, n.distance.x.type = "left", n.distance.x.node = e.node);
      }
    }
  }), s.forEach((e) => {
    if (e.x <= t.x && e.x + e.w >= t.x || e.x <= t.x + t.w / 2 && e.x + e.w >= t.x + t.w / 2 || e.x <= t.x + t.w && e.x + e.w >= t.x + t.w) {
      if (t.y + t.h < e.y) {
        const c = Math.abs(t.y + t.h - e.y);
        n.distance.y.length > c && (n.distance.y.length = c, n.distance.y.type = "bottom", n.distance.y.node = e.node);
      }
      if (t.y > e.y + e.h) {
        const c = Math.abs(t.y - e.y - e.h);
        n.distance.y.length > c && (n.distance.y.length = c, n.distance.y.type = "top", n.distance.y.node = e.node);
      }
    }
  });
}
function W(n) {
  const s = [0, 4, 8, 12, 16];
  for (const t of s)
    if (t - 2 <= n && t + 2 >= n) return t;
  return n;
}
class vt {
  constructor(s) {
    v(this, "g");
    v(this, "lines");
    v(this, "x");
    v(this, "y");
    this.g = m("g"), this.g.setAttribute("class", `${b}-distance`), this.lines = {};
    const t = (e) => {
      const i = m("g");
      i.setAttribute("class", `${b}-distance-${e}`);
      const c = m("line");
      c.setAttribute("class", `${b}-distance-${e}-line`);
      const a = m("line");
      a.setAttribute("class", `${b}-distance-${e}-dash-line`);
      const y = m("text");
      y.setAttribute("class", `${b}-distance-${e}-text`);
      const u = m("rect");
      u.setAttribute("class", `${b}-distance-${e}-text-bg`);
      const o = m("rect");
      o.setAttribute("class", `${b}-distance-${e}-line-start`);
      const h = m("rect");
      return h.setAttribute("class", `${b}-distance-${e}-line-end`), i.appendChild(c), i.appendChild(a), i.appendChild(u), i.appendChild(y), i.appendChild(o), i.appendChild(h), i;
    };
    this.x = {
      type: "left",
      length: 1 / 0,
      node: null
    }, this.y = {
      type: "top",
      length: 1 / 0,
      node: null
    }, mt.forEach((e) => {
      const i = t(e);
      this.lines[e] = i;
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
      if (this.hidden(), Et(s), this.x.node && this.x.node.id !== s.selected.dataset.id) {
        if (this.x.type === "left") {
          const t = W(this.x.length);
          t !== this.x.length && (s.selected.style.left = w(parseFloat(s.selected.style.left) - this.x.length + t), this.x.length = t, s.align.reRender(s), s.border.reRender(s));
          const e = E.from(this.x.node), i = E.from(s.selected), c = S(this.lines.left, `${b}-distance-left-line`);
          c.setAttribute("x1", String(e.x + e.w)), c.setAttribute("x2", String(i.x)), c.setAttribute("y1", String(i.y + i.h / 2)), c.setAttribute("y2", String(i.y + i.h / 2)), c.setAttribute("stroke", k), c.setAttribute("stroke-width", String(G));
          const a = S(this.lines.left, `${b}-distance-left-text`);
          a.textContent = `${H(this.x.length, !0)}`, a.setAttribute("x", String((e.x + e.w + i.x) / 2)), a.setAttribute("y", String(i.y + i.h / 2 - 9)), a.setAttribute("fill", "#FFFFFF"), a.setAttribute("font-size", String(D)), a.setAttribute("text-anchor", "middle"), a.setAttribute("alignment-baseline", "middle");
          const y = S(this.lines.left, `${b}-distance-left-text-bg`);
          y.setAttribute(
            "x",
            String((e.x + e.w + i.x) / 2 - (a.getComputedTextLength() + 10) / 2)
          ), y.setAttribute("y", String(i.y + i.h / 2 - D / 2 - 12)), y.setAttribute("width", String(a.getComputedTextLength() + 10)), y.setAttribute("height", String(D + 4)), y.setAttribute("fill", k), y.setAttribute("rx", "4"), y.setAttribute("ry", "4");
          const u = 1, o = 8, h = S(this.lines.left, `${b}-distance-left-line-start`);
          h.setAttribute("x", String(e.x + e.w - u / 2)), h.setAttribute("y", String(i.y + i.h / 2 - o / 2)), h.setAttribute("width", String(u)), h.setAttribute("height", String(o)), h.setAttribute("fill", k);
          const l = S(this.lines.left, `${b}-distance-left-line-end`);
          l.setAttribute("x", String(i.x - u / 2)), l.setAttribute("y", String(i.y + i.h / 2 - o / 2)), l.setAttribute("width", String(u)), l.setAttribute("height", String(o)), l.setAttribute("fill", k);
          const r = S(this.lines.left, `${b}-distance-left-dash-line`);
          i.y < e.y ? (r.setAttribute("x1", String(e.x + e.w)), r.setAttribute("x2", String(e.x + e.w)), r.setAttribute("y1", String(i.y)), r.setAttribute("y2", String(e.y)), r.setAttribute("stroke", k), r.setAttribute("stroke-width", "1"), r.setAttribute("stroke-dasharray", "4 4"), r.setAttribute("style", "display: block;")) : i.y + i.h > e.y + e.h ? (r.setAttribute("x1", String(e.x + e.w)), r.setAttribute("x2", String(e.x + e.w)), r.setAttribute("y1", String(e.y + e.h)), r.setAttribute("y2", String(i.y + i.h)), r.setAttribute("stroke", k), r.setAttribute("stroke-width", "1"), r.setAttribute("stroke-dasharray", "4 4"), r.setAttribute("style", "display: block;")) : r.setAttribute("style", "display: none;"), s.align.isHAlign && this.lines.left.setAttribute("style", "display: block;");
        } else if (this.x.type === "right") {
          const t = W(this.x.length);
          t !== this.x.length && (s.selected.style.left = w(parseFloat(s.selected.style.left) + this.x.length - t), this.x.length = t, s.align.reRender(s), s.border.reRender(s));
          const e = E.from(this.x.node), i = E.from(s.selected), c = S(this.lines.right, `${b}-distance-right-line`);
          c.setAttribute("x1", String(i.x + i.w)), c.setAttribute("x2", String(e.x)), c.setAttribute("y1", String(i.y + i.h / 2)), c.setAttribute("y2", String(i.y + i.h / 2)), c.setAttribute("stroke", k), c.setAttribute("stroke-width", String(G));
          const a = S(this.lines.right, `${b}-distance-right-text`);
          a.textContent = `${H(this.x.length, !0)}`, a.setAttribute("x", String((i.x + i.w + e.x) / 2)), a.setAttribute("y", String(i.y + i.h / 2 - 9)), a.setAttribute("fill", "#FFFFFF"), a.setAttribute("font-size", String(D)), a.setAttribute("text-anchor", "middle"), a.setAttribute("alignment-baseline", "middle");
          const y = S(this.lines.right, `${b}-distance-right-text-bg`);
          y.setAttribute(
            "x",
            String((i.x + i.w + e.x) / 2 - (a.getComputedTextLength() + 10) / 2)
          ), y.setAttribute("y", String(i.y + i.h / 2 - D / 2 - 12)), y.setAttribute("width", String(a.getComputedTextLength() + 10)), y.setAttribute("height", String(D + 4)), y.setAttribute("fill", k), y.setAttribute("rx", "4"), y.setAttribute("ry", "4");
          const u = 1, o = 8, h = S(this.lines.left, `${b}-distance-left-line-start`);
          h.setAttribute("x", String(i.x + i.w - u / 2)), h.setAttribute("y", String(i.y + i.h / 2 - o / 2)), h.setAttribute("width", String(u)), h.setAttribute("height", String(o)), h.setAttribute("fill", k);
          const l = S(this.lines.left, `${b}-distance-left-line-end`);
          l.setAttribute("x", String(e.x - u / 2)), l.setAttribute("y", String(i.y + i.h / 2 - o / 2)), l.setAttribute("width", String(u)), l.setAttribute("height", String(o)), l.setAttribute("fill", k);
          const r = S(this.lines.right, `${b}-distance-right-dash-line`);
          i.y < e.y ? (r.setAttribute("x1", String(e.x)), r.setAttribute("x2", String(e.x)), r.setAttribute("y1", String(i.y)), r.setAttribute("y2", String(e.y)), r.setAttribute("stroke", k), r.setAttribute("stroke-width", "1"), r.setAttribute("stroke-dasharray", "4 4"), r.setAttribute("style", "display: block;")) : i.y + i.h > e.y + e.h ? (r.setAttribute("x1", String(e.x)), r.setAttribute("x2", String(e.x)), r.setAttribute("y1", String(e.y + e.h)), r.setAttribute("y2", String(i.y + i.h)), r.setAttribute("stroke", k), r.setAttribute("stroke-width", "1"), r.setAttribute("stroke-dasharray", "4 4"), r.setAttribute("style", "display: block;")) : r.setAttribute("style", "display: none;"), s.align.isHAlign && this.lines.right.setAttribute("style", "display: block;");
        }
      }
      if (this.y.node && this.y.node.id !== s.selected.dataset.id) {
        if (this.y.type === "top") {
          const t = W(this.y.length);
          t !== this.y.length && (s.selected.style.top = w(parseFloat(s.selected.style.top) - this.y.length + t), this.y.length = t, s.border.reRender(s));
          const e = E.from(this.y.node), i = E.from(s.selected), c = S(this.lines.top, `${b}-distance-top-line`);
          c.setAttribute("x1", String(i.x + i.w / 2)), c.setAttribute("x2", String(i.x + i.w / 2)), c.setAttribute("y1", String(i.y)), c.setAttribute("y2", String(e.y + e.h)), c.setAttribute("stroke", k), c.setAttribute("stroke-width", String(G));
          const a = S(this.lines.top, `${b}-distance-top-text`);
          a.textContent = `${H(this.y.length, !0)}`, a.setAttribute("x", String(i.x + i.w / 2 + (a.getComputedTextLength() + 10) / 2 + 3)), a.setAttribute("y", String((i.y + e.y + e.h) / 2 + 1)), a.setAttribute("fill", "#FFFFFF"), a.setAttribute("font-size", String(D)), a.setAttribute("text-anchor", "middle"), a.setAttribute("alignment-baseline", "middle");
          const y = S(this.lines.top, `${b}-distance-top-text-bg`);
          y.setAttribute("x", String(i.x + i.w / 2 + 3)), y.setAttribute("y", String((i.y + e.y + e.h) / 2 - (D + 4) / 2)), y.setAttribute("width", String(a.getComputedTextLength() + 10)), y.setAttribute("height", String(D + 4)), y.setAttribute("fill", k), y.setAttribute("rx", "4"), y.setAttribute("ry", "4");
          const u = 8, o = 1, h = S(this.lines.top, `${b}-distance-top-line-start`);
          h.setAttribute("x", String(i.x + i.w / 2 - u / 2)), h.setAttribute("y", String(e.y + e.h - o / 2)), h.setAttribute("width", String(u)), h.setAttribute("height", String(o)), h.setAttribute("fill", k);
          const l = S(this.lines.top, `${b}-distance-top-line-end`);
          l.setAttribute("x", String(i.x + i.w / 2 - u / 2)), l.setAttribute("y", String(i.y - o / 2)), l.setAttribute("width", String(u)), l.setAttribute("height", String(o)), l.setAttribute("fill", k);
          const r = S(this.lines.top, `${b}-distance-top-dash-line`);
          i.x < e.x ? (r.setAttribute("x1", String(i.x)), r.setAttribute("x2", String(e.x)), r.setAttribute("y1", String(e.y + e.h)), r.setAttribute("y2", String(e.y + e.h)), r.setAttribute("stroke", k), r.setAttribute("stroke-width", "1"), r.setAttribute("stroke-dasharray", "4 4"), r.setAttribute("style", "display: block;")) : i.x + i.w > e.x + e.w ? (r.setAttribute("x1", String(e.x + e.w)), r.setAttribute("x2", String(i.x + i.w)), r.setAttribute("y1", String(e.y + e.h)), r.setAttribute("y2", String(e.y + e.h)), r.setAttribute("stroke", k), r.setAttribute("stroke", k), r.setAttribute("stroke-width", "1"), r.setAttribute("stroke-dasharray", "4 4"), r.setAttribute("style", "display: block;")) : r.setAttribute("style", "display: none;"), s.align.isVAlign && this.lines.top.setAttribute("style", "display: block;");
        } else if (this.y.type === "bottom") {
          const t = W(this.y.length);
          t !== this.y.length && (s.selected.style.top = w(parseFloat(s.selected.style.top) + this.y.length - t), this.y.length = t, s.border.reRender(s));
          const e = E.from(this.y.node), i = E.from(s.selected), c = S(this.lines.bottom, `${b}-distance-bottom-line`);
          c.setAttribute("x1", String(i.x + i.w / 2)), c.setAttribute("x2", String(i.x + i.w / 2)), c.setAttribute("y1", String(i.y + i.h)), c.setAttribute("y2", String(e.y)), c.setAttribute("stroke", k), c.setAttribute("stroke-width", String(G));
          const a = S(this.lines.bottom, `${b}-distance-bottom-text`);
          a.textContent = `${H(this.y.length, !0)}`;
          const y = i.x + i.w / 2 + (a.getComputedTextLength() + 10) / 2 + 3;
          a.setAttribute("x", String(y)), a.setAttribute("y", String((i.y + i.h + e.y) / 2 + 1)), a.setAttribute("fill", "#FFFFFF"), a.setAttribute("font-size", String(D)), a.setAttribute("text-anchor", "middle"), a.setAttribute("alignment-baseline", "middle");
          const u = S(this.lines.bottom, `${b}-distance-bottom-text-bg`);
          u.setAttribute("x", String(i.x + i.w / 2 + 3)), u.setAttribute(
            "y",
            String((i.y + i.h + e.y) / 2 - (D + 4) / 2)
          ), u.setAttribute("width", String(a.getComputedTextLength() + 10)), u.setAttribute("height", String(D + 4)), u.setAttribute("fill", k), u.setAttribute("rx", "4"), u.setAttribute("ry", "4");
          const o = 8, h = 1, l = S(
            this.lines.bottom,
            `${b}-distance-bottom-line-start`
          );
          l.setAttribute("x", String(i.x + i.w / 2 - o / 2)), l.setAttribute("y", String(i.y + i.h - h / 2)), l.setAttribute("width", String(o)), l.setAttribute("height", String(h)), l.setAttribute("fill", k);
          const r = S(this.lines.bottom, `${b}-distance-bottom-line-end`);
          r.setAttribute("x", String(i.x + i.w / 2 - o / 2)), r.setAttribute("y", String(e.y - h / 2)), r.setAttribute("width", String(o)), r.setAttribute("height", String(h)), r.setAttribute("fill", k);
          const g = S(
            this.lines.bottom,
            `${b}-distance-bottom-dash-line`
          );
          i.x < e.x ? (g.setAttribute("x1", String(i.x)), g.setAttribute("x2", String(e.x)), g.setAttribute("y1", String(e.y)), g.setAttribute("y2", String(e.y)), g.setAttribute("stroke", k), g.setAttribute("stroke-width", "1"), g.setAttribute("stroke-dasharray", "4 4"), g.setAttribute("style", "display: block;")) : i.x + i.w > e.x + e.w ? (g.setAttribute("x1", String(e.x + e.w)), g.setAttribute("x2", String(i.x + i.w)), g.setAttribute("y1", String(e.y)), g.setAttribute("y2", String(e.y)), g.setAttribute("stroke", k), g.setAttribute("stroke-width", "1"), g.setAttribute("stroke-dasharray", "4 4"), g.setAttribute("style", "display: block;")) : g.setAttribute("style", "display: none;"), s.align.isVAlign && this.lines.bottom.setAttribute("style", "display: block;");
        }
      }
    }
  }
}
const $t = (n, s) => {
  const t = m("svg");
  t.setAttribute("class", `${b}-svg`);
  const e = n.getBoundingClientRect();
  return t.setAttribute("width", w(e.width)), t.setAttribute("height", w(e.height)), t.style = "position: absolute; inset: 0;", n.className += ` ${b}-container`, s.forEach((i) => {
    i.className += ` ${b}-movable-node`, i.setAttribute("data-id", at()), /%$/.test(i.style.top) && (i.style.top = w(e.width * parseFloat(i.style.top) / 100)), /%$/.test(i.style.left) && (i.style.left = w(e.height * parseFloat(i.style.left) / 100)), /%$/.test(i.style.width) && (i.style.width = w(e.width * parseFloat(i.style.width) / 100)), /%$/.test(i.style.height) && (i.style.height = w(e.height * parseFloat(i.style.height) / 100));
  }), {
    container: n,
    nodes: s,
    svg: t,
    selected: null,
    setSelected(i) {
      if (this.selected = i, !i) {
        this.border.hidden();
        return;
      }
      this.border.reRender(this);
    },
    align: new bt(t),
    distance: new vt(t),
    border: new ft(t),
    resize: new pt(t, s),
    selector: new wt(t),
    gap: new ht(t)
  };
};
class Lt {
  constructor(s, t) {
    v(this, "store");
    this.store = $t(s, t), rt(this.store);
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
    const i = e.getBoundingClientRect(), c = E.from(t);
    switch (s) {
      case "start":
        t.style.left = w(0);
        break;
      case "center":
        t.style.left = w(i.width / 2 - c.w / 2);
        break;
      case "end":
        t.style.left = w(i.width - c.w);
        break;
    }
  }
}
export {
  Lt as default
};
