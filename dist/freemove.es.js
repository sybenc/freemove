var M = Object.defineProperty;
var T = (s, t, c) => t in s ? M(s, t, { enumerable: !0, configurable: !0, writable: !0, value: c }) : s[t] = c;
var x = (s, t, c) => T(s, typeof t != "symbol" ? t + "" : t, c);
const f = "__freemove";
class w {
  constructor({ x: t, y: c, h: l, w: r, node: e }) {
    x(this, "x");
    x(this, "y");
    x(this, "w");
    x(this, "h");
    x(this, "node");
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
    const c = this.x + 3, l = this.y + 3, r = this.x + this.w - 3, e = this.y + this.h - 3, a = t.x, n = t.y, d = t.x + t.w, h = t.y + t.h;
    return !(r < a || c > d || e < n || l > h);
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
    return new w({
      x: t.offsetLeft,
      y: t.offsetTop,
      w: t.offsetWidth,
      h: t.offsetHeight,
      node: t
    });
  }
}
function u(s) {
  return typeof s == "number" ? `${s}px` : String(s);
}
function I(s, t) {
  if (!s.selected) return;
  const c = s.container.getBoundingClientRect();
  s.alignLine.reRender(s);
  const l = s.selected.getBoundingClientRect();
  let r = t.clientX - l.left, e = t.clientY - l.top, a = null, n = null, d = null;
  function h(i) {
    a || (a = requestAnimationFrame(() => {
      if (!s.selected) return;
      let g = i.clientX - c.left - r, b = i.clientY - c.top - e;
      const S = s.container.clientWidth - s.selected.offsetWidth, A = s.container.clientHeight - s.selected.offsetHeight;
      g = Math.max(0, Math.min(g, S)), b = Math.max(0, Math.min(b, A)), s.moveDelta = [n !== null ? g - n : 0, d !== null ? b - d : 0], s.selected.style.left = u(g), s.selected.style.top = u(b), s.alignLine.reRender(s), s.seletedBorder.reRender(s), n = g, d = b, a = null;
    }));
  }
  function o() {
    document.removeEventListener("pointermove", h), document.removeEventListener("pointerup", o), s.alignLine.clear(), a !== null && (cancelAnimationFrame(a), a = null);
  }
  document.addEventListener("pointermove", h), document.addEventListener("pointerup", o);
}
function N(s, t) {
  if (!s.selected) return;
  const c = s.container.getBoundingClientRect(), r = t.target.dataset.direction;
  if (!r) return;
  const e = s.selected.getBoundingClientRect();
  let a = t.clientX, n = t.clientY, d = e.width, h = e.height, o = e.left - c.left, i = e.top - c.top;
  function g(S) {
    let A = S.clientX - a, p = S.clientY - n, E = d, v = h, R = o, k = i;
    r.includes("right") && (E = Math.max(10, d + A)), r.includes("left") && (E = Math.max(10, d - A), R = o + A), r.includes("bottom") && (v = Math.max(10, h + p)), r.includes("top") && (v = Math.max(10, h - p), k = i + p), s.selected.style.width = u(E), s.selected.style.height = u(v), s.selected.style.left = u(R), s.selected.style.top = u(k), s.seletedBorder.reRender(s);
  }
  function b() {
    document.removeEventListener("pointermove", g), document.removeEventListener("pointerup", b);
  }
  document.addEventListener("pointermove", g), document.addEventListener("pointerup", b);
}
function $(s) {
  s.svg.addEventListener("pointerdown", (t) => {
    t.preventDefault();
    const c = t.target;
    if (c.classList[0].includes(`${f}-selected-border-point-`)) {
      const l = c.dataset.ownerId;
      for (let r = 0; r < s.nodes.length; r++)
        l === s.nodes[r].dataset.ownerId && s.setSelected(s.nodes[r]);
      s.selected && N(s, t);
      return;
    }
    if (console.log(1111), c.classList.contains(`${f}-svg`)) {
      let l = null;
      for (const r of s.nodes) {
        const e = w.from(r);
        if (e.isInSide({ x: t.offsetX, y: t.offsetY })) {
          l = e;
          break;
        }
      }
      l && l.node.classList.contains(`${f}-movable-node`) && (s.setSelected(l.node), I(s, t));
    }
  });
}
const _ = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let C = (s = 21) => {
  let t = "", c = crypto.getRandomValues(new Uint8Array(s |= 0));
  for (; s--; )
    t += _[c[s] & 63];
  return t;
};
const O = 1, P = "#EA3", m = ["vl", "vc", "vr", "ht", "hc", "hb"];
function F(s) {
  const t = [];
  return m.forEach((c) => {
    const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute("class", `${f}-alignLine-${c}`), l.setAttribute("stroke", P), l.setAttribute("stroke-width", String(O)), l.style.display = "none", t.push(l);
  }), t;
}
function X(s) {
  const t = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  function c() {
    let e = w.from(s.selected);
    t.hb = [], t.hc = [], t.ht = [], t.vc = [], t.vl = [], t.vr = [], s.nodes.forEach((a) => {
      const n = w.from(a);
      if (e.isIntersect(n)) return;
      const d = e.getAlignLinePostion();
      m.forEach((h) => {
        let o = 1e4, i = 1e4, g;
        /^h/.test(h) && (e.x > n.x + n.w ? (o = e.x + e.w, i = n.x) : e.x + e.w < n.x ? (o = e.x, i = n.x + n.w) : (o = Math.min(e.x, n.x), i = Math.max(e.x + e.w, n.x + n.w)), [n.y, n.y + n.h / 2, n.y + n.h].forEach((b) => {
          g = Math.abs(d[h] - b), g <= 3 && t[h].push({
            type: h,
            source: o,
            target: i,
            absorbDistance: g,
            absorbPosition: b,
            nodeRects: [n]
          });
        })), /^v/.test(h) && (e.y > n.y + n.h ? (o = e.y + e.h, i = n.y) : e.y + e.h < n.y ? (o = e.y, i = n.y + n.h) : (o = Math.min(e.y, n.y), i = Math.max(e.y + e.h, n.y + n.h)), [n.x, n.x + n.w / 2, n.x + n.w].forEach((b) => {
          g = Math.abs(d[h] - b), g <= 3 && t[h].push({
            type: h,
            source: o,
            target: i,
            absorbDistance: g,
            absorbPosition: b,
            nodeRects: [n]
          });
        }));
      });
    }), m.forEach((a) => {
      const n = /* @__PURE__ */ new Map();
      t[a].forEach((o) => {
        var i;
        n.has(o.absorbDistance) ? (i = n.get(o.absorbDistance)) == null || i.push(o) : n.set(o.absorbDistance, [o]);
      });
      let d = 1 / 0, h = 0;
      n.forEach((o) => {
        o.forEach((i) => {
          d = Math.min(i.source, d), d = Math.min(i.target, d), h = Math.max(i.source, h), h = Math.max(i.target, h);
        });
      }), n.forEach((o) => {
        o.forEach((i) => {
          i.source = d, i.target = h;
        });
      }), t[a] = Array.from(n.values()).flat();
    });
  }
  function l(e) {
    if (!s.selected || !e) return;
    const { absorbPosition: a, type: n } = e;
    switch (n) {
      case "ht":
        s.selected.style.top = u(a);
        break;
      case "hc":
        s.selected.style.top = u(a - parseFloat(s.selected.style.height) / 2);
        break;
      case "hb":
        s.selected.style.top = u(a - parseFloat(s.selected.style.height));
        break;
      case "vl":
        s.selected.style.left = u(a);
        break;
      case "vc":
        s.selected.style.left = u(a - parseFloat(s.selected.style.width) / 2);
        break;
      case "vr":
        s.selected.style.left = u(a - parseFloat(s.selected.style.width));
        break;
    }
    c(), s.seletedBorder.reRender(s);
    let d = 1 / 0;
    m.forEach((h) => {
      t[h].forEach((o) => {
        o.absorbDistance < d && (d = o.absorbDistance);
      });
    }), m.forEach((h) => {
      t[h].forEach((o) => {
        o.absorbDistance - d > 0.1 && (t[h] = []);
      });
    });
  }
  function r() {
    if (!s.selected) return;
    const e = w.from(s.selected);
    Object.values(t).flat().forEach((n) => {
      const { source: d, target: h, type: o } = n, i = s.alignLine.g.getElementsByClassName(`${f}-alignLine-${o}`)[0];
      if (/^h/.test(o))
        switch (i == null || i.setAttribute("x1", String(d)), i == null || i.setAttribute("x2", String(h)), o) {
          case "ht":
            i.setAttribute("y1", String(e.y)), i.setAttribute("y2", String(e.y));
            break;
          case "hc":
            i.setAttribute("y1", String(e.y + e.h / 2)), i.setAttribute("y2", String(e.y + e.h / 2));
            break;
          case "hb":
            i.setAttribute("y1", String(e.y + e.h)), i.setAttribute("y2", String(e.y + e.h));
            break;
        }
      if (/^v/.test(o))
        switch (i == null || i.setAttribute("y1", String(d)), i == null || i.setAttribute("y2", String(h)), o) {
          case "vl":
            i.setAttribute("x1", String(e.x)), i.setAttribute("x2", String(e.x));
            break;
          case "vc":
            i.setAttribute("x1", String(e.x + e.w / 2)), i.setAttribute("x2", String(e.x + e.w / 2));
            break;
          case "vr":
            i.setAttribute("x1", String(e.x + e.w)), i.setAttribute("x2", String(e.x + e.w));
            break;
        }
      i == null || i.setAttribute("style", "display: 'block");
    });
  }
  c(), Object.values(t).flat().forEach((e) => {
    l(e);
  }), r();
}
class H {
  constructor(t) {
    x(this, "g");
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
function D(s) {
  const t = w.from(s.selected), c = [];
  return Y.forEach((l, r) => {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "line");
    switch (e.setAttribute("class", `${f}-selected-border-line-${l}`), e.setAttribute("stroke", B), e.setAttribute("stroke-width", u(y)), l) {
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
    e.setAttribute("class", `${f}-selected-border-point-${l}`), e.setAttribute("fill", "white"), e.setAttribute("stroke", B), e.setAttribute("stroke-width", u(y)), e.setAttribute("width", u(L)), e.setAttribute("height", u(L)), e.setAttribute("style", `cursor: ${W[r]}`), e.setAttribute("data-direction", l), e.setAttribute("data-owner-id", s.selected.dataset.id);
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
    x(this, "g");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g"), this.g.setAttribute("class", `${f}-seleted-border`), t.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(t) {
    t.selected && (this.clear(), this.g.append(...D(t)), D(t));
  }
}
const j = (s, t) => {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  c.setAttribute("class", `${f}-svg`);
  const l = s.getBoundingClientRect();
  return c.setAttribute("width", u(l.width)), c.setAttribute("height", u(l.height)), c.style = "position: absolute; inset: 0;", s.className += ` ${f}-container`, t.forEach((r) => {
    r.className += ` ${f}-movable-node`, r.setAttribute("data-id", C()), /%$/.test(r.style.x) && (r.style.x = u(l.width * parseInt(r.style.x) / 100)), /%$/.test(r.style.y) && (r.style.y = u(l.height * parseInt(r.style.y) / 100)), /%$/.test(r.style.width) && (r.style.width = u(l.width * parseInt(r.style.width) / 100)), /%$/.test(r.style.height) && (r.style.height = u(l.height * parseInt(r.style.height) / 100));
  }), {
    container: s,
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
function U(s, t) {
  const c = j(s, t);
  return $(c), c.svg;
}
export {
  U as default
};
