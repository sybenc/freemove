var D = Object.defineProperty;
var I = (i, t, c) => t in i ? D(i, t, { enumerable: !0, configurable: !0, writable: !0, value: c }) : i[t] = c;
var w = (i, t, c) => I(i, typeof t != "symbol" ? t + "" : t, c);
const f = "__freemove";
class x {
  constructor({ x: t, y: c, h: l, w: r, node: e }) {
    w(this, "x");
    w(this, "y");
    w(this, "w");
    w(this, "h");
    w(this, "node");
    this.x = t, this.y = c, this.h = l, this.w = r, this.node = e;
  }
  // 判断一个点是否在矩形里面
  isInSide(t) {
    return t.x >= this.x && t.x <= this.x + this.w && t.y >= this.y && t.y <= this.y + this.h;
  }
  isEquel(t) {
    return this.h === t.h && this.w === t.w && this.x === t.x && this.y === t.y && this.node === t.node;
  }
  // 判断两个矩形是否相交，Tolerance为容差
  isIntersect(t) {
    const c = this.x + 3, l = this.y + 3, r = this.x + this.w - 3, e = this.y + this.h - 3, a = t.x, s = t.y, u = t.x + t.w, o = t.y + t.h;
    return !(r < a || c > u || e < s || l > o);
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
  static from(t) {
    return new x({
      x: t.offsetLeft,
      y: t.offsetTop,
      w: t.offsetWidth,
      h: t.offsetHeight,
      node: t
    });
  }
}
function d(i) {
  return typeof i == "number" ? `${i}px` : String(i);
}
function N(i, t) {
  if (!i.selected) return;
  const c = i.container.getBoundingClientRect();
  i.alignLine.reRender(i);
  const l = i.selected.getBoundingClientRect();
  let r = t.clientX - l.left, e = t.clientY - l.top, a = null, s = null, u = null;
  function o(n) {
    a || (a = requestAnimationFrame(() => {
      if (!i.selected) return;
      let g = n.clientX - c.left - r, b = n.clientY - c.top - e;
      const m = i.container.clientWidth - i.selected.offsetWidth, A = i.container.clientHeight - i.selected.offsetHeight;
      g = Math.max(0, Math.min(g, m)), b = Math.max(0, Math.min(b, A)), i.moveDelta = [s !== null ? g - s : 0, u !== null ? b - u : 0], i.selected.style.left = d(g), i.selected.style.top = d(b), i.alignLine.reRender(i), i.seletedBorder.reRender(i), s = g, u = b, a = null;
    }));
  }
  function h() {
    document.removeEventListener("pointermove", o), document.removeEventListener("pointerup", h), i.alignLine.clear(), a !== null && (cancelAnimationFrame(a), a = null);
  }
  document.addEventListener("pointermove", o), document.addEventListener("pointerup", h);
}
function $(i, t) {
  if (!i.selected) return;
  const c = i.container.getBoundingClientRect(), r = t.target.dataset.direction;
  if (!r) return;
  const e = i.selected.getBoundingClientRect();
  let a = t.clientX, s = t.clientY, u = e.width, o = e.height, h = e.left - c.left, n = e.top - c.top;
  function g(m) {
    let A = m.clientX - a, p = m.clientY - s, E = u, v = o, R = h, k = n;
    r.includes("right") && (E = Math.max(10, u + A)), r.includes("left") && (E = Math.max(10, u - A), R = h + A), r.includes("bottom") && (v = Math.max(10, o + p)), r.includes("top") && (v = Math.max(10, o - p), k = n + p), i.selected.style.width = d(E), i.selected.style.height = d(v), i.selected.style.left = d(R), i.selected.style.top = d(k), i.seletedBorder.reRender(i);
  }
  function b() {
    document.removeEventListener("pointermove", g), document.removeEventListener("pointerup", b);
  }
  document.addEventListener("pointermove", g), document.addEventListener("pointerup", b);
}
function M(i) {
  i.svg.addEventListener("pointerdown", (t) => {
    t.preventDefault();
    const c = t.target;
    if (c.classList[0].includes(`${f}-selected-border-point-`)) {
      const l = c.dataset.ownerId;
      for (let r = 0; r < i.nodes.length; r++)
        l === i.nodes[r].dataset.ownerId && i.setSelected(i.nodes[r]);
      i.selected && $(i, t);
      return;
    }
    if (console.log(1111), c.classList.contains(`${f}-svg`)) {
      let l = null;
      for (const r of i.nodes) {
        const e = x.from(r);
        if (e.isInSide({ x: t.offsetX, y: t.offsetY })) {
          l = e;
          break;
        }
      }
      l && l.node.classList.contains(`${f}-movable-node`) && (i.setSelected(l.node), N(i, t));
    }
  });
}
const _ = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let C = (i = 21) => {
  let t = "", c = crypto.getRandomValues(new Uint8Array(i |= 0));
  for (; i--; )
    t += _[c[i] & 63];
  return t;
};
const P = 1, O = "#EA3", S = ["vl", "vc", "vr", "ht", "hc", "hb"];
function F(i) {
  const t = [];
  return S.forEach((c) => {
    const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute("class", `${f}-alignLine-${c}`), l.setAttribute("stroke", O), l.setAttribute("stroke-width", String(P)), l.style.display = "none", t.push(l);
  }), t;
}
function X(i) {
  const t = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  function c() {
    let e = x.from(i.selected);
    t.hb = [], t.hc = [], t.ht = [], t.vc = [], t.vl = [], t.vr = [], i.nodes.forEach((a) => {
      const s = x.from(a);
      if (e.isIntersect(s)) return;
      const u = e.getAlignLinePostion();
      S.forEach((o) => {
        let h = 1e4, n = 1e4, g;
        /^h/.test(o) && (e.x > s.x + s.w ? (h = e.x + e.w, n = s.x) : e.x + e.w < s.x ? (h = e.x, n = s.x + s.w) : (h = Math.min(e.x, s.x), n = Math.max(e.x + e.w, s.x + s.w)), [s.y, s.y + s.h / 2, s.y + s.h].forEach((b) => {
          g = Math.abs(u[o] - b), g <= 3 && t[o].push({
            type: o,
            source: h,
            target: n,
            absorbDistance: g,
            absorbPosition: b,
            nodeRects: [s]
          });
        })), /^v/.test(o) && (e.y > s.y + s.h ? (h = e.y + e.h, n = s.y) : e.y + e.h < s.y ? (h = e.y, n = s.y + s.h) : (h = Math.min(e.y, s.y), n = Math.max(e.y + e.h, s.y + s.h)), [s.x, s.x + s.w / 2, s.x + s.w].forEach((b) => {
          g = Math.abs(u[o] - b), g <= 3 && t[o].push({
            type: o,
            source: h,
            target: n,
            absorbDistance: g,
            absorbPosition: b,
            nodeRects: [s]
          });
        }));
      });
    });
  }
  function l(e) {
    if (!i.selected || !e) return;
    const { absorbPosition: a, type: s } = e;
    switch (s) {
      case "ht":
        i.selected.style.top = d(a);
        break;
      case "hc":
        i.selected.style.top = d(a - parseFloat(i.selected.style.height) / 2);
        break;
      case "hb":
        i.selected.style.top = d(a - parseFloat(i.selected.style.height));
        break;
      case "vl":
        i.selected.style.left = d(a);
        break;
      case "vc":
        i.selected.style.left = d(a - parseFloat(i.selected.style.width) / 2);
        break;
      case "vr":
        i.selected.style.left = d(a - parseFloat(i.selected.style.width));
        break;
    }
    c(), i.seletedBorder.reRender(i);
    let u = 1 / 0;
    S.forEach((o) => {
      t[o].forEach((h) => {
        h.absorbDistance < u && (u = h.absorbDistance);
      });
    }), S.forEach((o) => {
      t[o].forEach((h) => {
        h.absorbDistance - u > 0.1 && (t[o] = []);
      });
    });
  }
  function r() {
    if (!i.selected) return;
    const e = x.from(i.selected);
    Object.values(t).flat().forEach((s) => {
      const { source: u, target: o, type: h } = s, n = i.alignLine.g.getElementsByClassName(`${f}-alignLine-${h}`)[0];
      if (/^h/.test(h))
        switch (n == null || n.setAttribute("x1", String(u)), n == null || n.setAttribute("x2", String(o)), h) {
          case "ht":
            n.setAttribute("y1", String(e.y)), n.setAttribute("y2", String(e.y));
            break;
          case "hc":
            n.setAttribute("y1", String(e.y + e.h / 2)), n.setAttribute("y2", String(e.y + e.h / 2));
            break;
          case "hb":
            n.setAttribute("y1", String(e.y + e.h)), n.setAttribute("y2", String(e.y + e.h));
            break;
        }
      if (/^v/.test(h))
        switch (n == null || n.setAttribute("y1", String(u)), n == null || n.setAttribute("y2", String(o)), h) {
          case "vl":
            n.setAttribute("x1", String(e.x)), n.setAttribute("x2", String(e.x));
            break;
          case "vc":
            n.setAttribute("x1", String(e.x + e.w / 2)), n.setAttribute("x2", String(e.x + e.w / 2));
            break;
          case "vr":
            n.setAttribute("x1", String(e.x + e.w)), n.setAttribute("x2", String(e.x + e.w));
            break;
        }
      n == null || n.setAttribute("style", "display: 'block");
    });
  }
  c(), [...t.ht, ...t.hc, ...t.hb].forEach((e) => {
    l(e);
  }), [...t.vl, ...t.vc, ...t.vr].forEach((e) => {
    l(e);
  }), r();
}
class H {
  constructor(t) {
    w(this, "g");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g"), this.g.setAttribute("class", `${f}-alignLine`), t.append(this.g);
  }
  // 清除分组内所有对齐线
  clear() {
    this.g.innerHTML = "";
  }
  reRender(t) {
    t.selected && (this.clear(), this.g.append(...F()), X(t));
  }
}
const y = 1, B = "#000", L = 6, Y = ["left", "top", "right", "bottom"], z = [
  "left-top",
  "top",
  "right-top",
  "right",
  "right-bottom",
  "bottom",
  "left-bottom",
  "left"
], W = [
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize",
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize"
];
function T(i) {
  const t = x.from(i.selected), c = [];
  return Y.forEach((l, r) => {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "line");
    switch (e.setAttribute("class", `${f}-selected-border-line-${l}`), e.setAttribute("stroke", B), e.setAttribute("stroke-width", d(y)), l) {
      case "left":
        e.setAttribute("x1", String(t.x)), e.setAttribute("y1", String(t.y - y / 2)), e.setAttribute("x2", String(t.x)), e.setAttribute("y2", String(t.y + t.h + y / 2));
        break;
      case "right":
        e.setAttribute("x1", String(t.x + t.w)), e.setAttribute("y1", String(t.y - y / 2)), e.setAttribute("x2", String(t.x + t.w)), e.setAttribute("y2", String(t.y + t.h + y / 2));
        break;
      case "top":
        e.setAttribute("x1", String(t.x - y / 2)), e.setAttribute("y1", String(t.y)), e.setAttribute("x2", String(t.x + t.w + y / 2)), e.setAttribute("y2", String(t.y));
        break;
      case "bottom":
        e.setAttribute("x1", String(t.x - y / 2)), e.setAttribute("y1", String(t.y + t.h)), e.setAttribute("x2", String(t.x + t.w + y / 2)), e.setAttribute("y2", String(t.y + t.h));
        break;
    }
    c.push(e);
  }), z.forEach((l, r) => {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    e.setAttribute("class", `${f}-selected-border-point-${l}`), e.setAttribute("fill", "white"), e.setAttribute("stroke", B), e.setAttribute("stroke-width", d(y)), e.setAttribute("width", d(L)), e.setAttribute("height", d(L)), e.setAttribute("style", `cursor: ${W[r]}`), e.setAttribute("data-direction", l), e.setAttribute("data-owner-id", i.selected.dataset.id);
    const a = L / 2;
    switch (l) {
      case "left-top":
        e.setAttribute("x", String(t.x - a)), e.setAttribute("y", String(t.y - a));
        break;
      case "top":
        e.setAttribute("x", String(t.x + t.w / 2 - a)), e.setAttribute("y", String(t.y - a));
        break;
      case "right-top":
        e.setAttribute("x", String(t.x + t.w - a)), e.setAttribute("y", String(t.y - a));
        break;
      case "right":
        e.setAttribute("x", String(t.x + t.w - a)), e.setAttribute("y", String(t.y + t.h / 2 - a));
        break;
      case "right-bottom":
        e.setAttribute("x", String(t.x + t.w - a)), e.setAttribute("y", String(t.y + t.h - a));
        break;
      case "bottom":
        e.setAttribute("x", String(t.x + t.w / 2 - a)), e.setAttribute("y", String(t.y + t.h - a));
        break;
      case "left-bottom":
        e.setAttribute("x", String(t.x - a)), e.setAttribute("y", String(t.y + t.h - a));
        break;
      case "left":
        e.setAttribute("x", String(t.x - a)), e.setAttribute("y", String(t.y + t.h / 2 - a));
        break;
    }
    c.push(e);
  }), c;
}
class G {
  constructor(t) {
    w(this, "g");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g"), this.g.setAttribute("class", `${f}-seleted-border`), t.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(t) {
    t.selected && (this.clear(), this.g.append(...T(t)), T(t));
  }
}
const q = (i, t) => {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  c.setAttribute("class", `${f}-svg`);
  const l = i.getBoundingClientRect();
  return c.setAttribute("width", d(l.width)), c.setAttribute("height", d(l.height)), c.style = "position: absolute; inset: 0;", i.className += ` ${f}-container`, t.forEach((r) => {
    r.className += ` ${f}-movable-node`, r.setAttribute("data-id", C()), /%$/.test(r.style.x) && (r.style.x = d(l.width * parseInt(r.style.x) / 100)), /%$/.test(r.style.y) && (r.style.y = d(l.height * parseInt(r.style.y) / 100)), /%$/.test(r.style.width) && (r.style.width = d(l.width * parseInt(r.style.width) / 100)), /%$/.test(r.style.height) && (r.style.height = d(l.height * parseInt(r.style.height) / 100));
  }), {
    container: i,
    nodes: t,
    svg: c,
    selected: null,
    alignLine: new H(c),
    seletedBorder: new G(c),
    moveDelta: [0, 0],
    setSelected(r) {
      if (this.selected = r, !r) {
        this.seletedBorder.clear();
        return;
      }
      this.seletedBorder.reRender(this);
    }
  };
};
function j(i, t) {
  const c = q(i, t);
  return M(c), c.svg;
}
export {
  j as default
};
