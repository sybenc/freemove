var M = Object.defineProperty;
var T = (e, t, i) => t in e ? M(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var y = (e, t, i) => T(e, typeof t != "symbol" ? t + "" : t, i);
const b = "__freemove";
class A {
  constructor({ x: t, y: i, h: n, w: s, node: c }) {
    y(this, "x");
    y(this, "y");
    y(this, "w");
    y(this, "h");
    y(this, "node");
    this.x = t, this.y = i, this.h = n, this.w = s, this.node = c;
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
    const i = this.x + 3, n = this.y + 3, s = this.x + this.w - 3, c = this.y + this.h - 3, l = t.x, g = t.y, r = t.x + t.w, h = t.y + t.h;
    return !(s < l || i > r || c < g || n > h);
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
    return new A({
      x: t.offsetLeft,
      y: t.offsetTop,
      w: t.offsetWidth,
      h: t.offsetHeight,
      node: t
    });
  }
}
function f(e) {
  return typeof e == "number" ? `${e}px` : String(e);
}
function _(e, t, i = 0.1) {
  return Math.abs(e - t) <= i;
}
function $(e, t) {
  if (!e.selected) return;
  const i = e.container.getBoundingClientRect();
  e.alignLine.reRender(e);
  const n = e.selected.getBoundingClientRect();
  let s = t.clientX - n.left, c = t.clientY - n.top, l = null, g = null, r = null;
  function h(o) {
    l || (l = requestAnimationFrame(() => {
      if (!e.selected) return;
      let a = o.clientX - i.left - s, d = o.clientY - i.top - c;
      const w = e.container.clientWidth - e.selected.offsetWidth, E = e.container.clientHeight - e.selected.offsetHeight;
      a = Math.max(0, Math.min(a, w)), d = Math.max(0, Math.min(d, E)), e.moveDelta = [g !== null ? a - g : 0, r !== null ? d - r : 0], e.selected.style.left = f(a), e.selected.style.top = f(d), e.alignLine.reRender(e), e.seletedBorder.reRender(e), g = a, r = d, l = null;
    }));
  }
  function u() {
    document.removeEventListener("pointermove", h), document.removeEventListener("pointerup", u), e.alignLine.hidden(), l !== null && (cancelAnimationFrame(l), l = null);
  }
  document.addEventListener("pointermove", h), document.addEventListener("pointerup", u);
}
function O(e, t) {
  if (!e.selected) return;
  const i = e.container.getBoundingClientRect(), s = t.target.dataset.direction;
  if (!s) return;
  const c = e.selected.getBoundingClientRect();
  let l = t.clientX, g = t.clientY, r = c.width, h = c.height, u = c.left - i.left, o = c.top - i.top;
  function a(w) {
    let E = w.clientX - l, v = w.clientY - g, p = r, S = h, B = u, D = o;
    s.includes("right") && (p = Math.max(10, r + E)), s.includes("left") && (p = Math.max(10, r - E), B = u + E), s.includes("bottom") && (S = Math.max(10, h + v)), s.includes("top") && (S = Math.max(10, h - v), D = o + v), S > 10 && (e.selected.style.height = f(S), e.selected.style.top = f(D)), p > 10 && (e.selected.style.width = f(p), e.selected.style.left = f(B)), e.seletedBorder.reRender(e);
  }
  function d() {
    document.removeEventListener("pointermove", a), document.removeEventListener("pointerup", d);
  }
  document.addEventListener("pointermove", a), document.addEventListener("pointerup", d);
}
function C(e) {
  e.svg.addEventListener("pointerdown", (t) => {
    t.preventDefault();
    const i = t.target;
    if (i.classList[0].includes(`${b}-selected-border-point-`)) {
      const n = i.dataset.ownerId;
      for (let s = 0; s < e.nodes.length; s++)
        n === e.nodes[s].dataset.ownerId && e.setSelected(e.nodes[s]);
      e.selected && O(e, t);
      return;
    }
    if (console.log(1111), i.classList.contains(`${b}-svg`)) {
      let n = null;
      for (const s of e.nodes) {
        const c = A.from(s);
        if (c.isInSide({ x: t.offsetX, y: t.offsetY })) {
          n = c;
          break;
        }
      }
      n && n.node.classList.contains(`${b}-movable-node`) && (e.setSelected(n.node), $(e, t));
    }
  });
}
const H = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let P = (e = 21) => {
  let t = "", i = crypto.getRandomValues(new Uint8Array(e |= 0));
  for (; e--; )
    t += H[i[e] & 63];
  return t;
};
const X = 1, Y = "#EA3", m = ["vl", "vc", "vr", "ht", "hc", "hb"];
function z(e, t) {
  const i = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  function n() {
    const l = A.from(e.selected), g = e.nodes.filter((r) => r !== e.selected).map((r) => A.from(r));
    m.forEach((r) => i[r] = []), g.forEach((r) => {
      if (l.isIntersect(r)) return;
      const h = l.getAlignLinePostion();
      m.forEach((u) => {
        let o = 1e4, a = 1e4, d;
        /^h/.test(u) && (l.x > r.x + r.w ? (o = l.x + l.w, a = r.x) : l.x + l.w < r.x ? (o = l.x, a = r.x + r.w) : (o = Math.min(l.x, r.x), a = Math.max(l.x + l.w, r.x + r.w)), [r.y, r.y + r.h / 2, r.y + r.h].forEach((w) => {
          d = Math.abs(h[u] - w), d <= 3 && i[u].push({
            type: u,
            source: o,
            target: a,
            absorbDistance: d,
            absorbPosition: w,
            nodeRects: [r]
          });
        })), /^v/.test(u) && (l.y > r.y + r.h ? (o = l.y + l.h, a = r.y) : l.y + l.h < r.y ? (o = l.y, a = r.y + r.h) : (o = Math.min(l.y, r.y), a = Math.max(l.y + l.h, r.y + r.h)), [r.x, r.x + r.w / 2, r.x + r.w].forEach((w) => {
          d = Math.abs(h[u] - w), d <= 3 && i[u].push({
            type: u,
            source: o,
            target: a,
            absorbDistance: d,
            absorbPosition: w,
            nodeRects: [r]
          });
        }));
      });
    }), m.forEach((r) => {
      const h = /* @__PURE__ */ new Map();
      i[r].forEach((a) => {
        const d = h.get(a.absorbDistance) || [];
        d.push(a), h.set(a.absorbDistance, d);
      });
      let u = 1 / 0, o = 0;
      h.forEach((a) => {
        a.forEach((d) => {
          u = Math.min(u, d.source, d.target), o = Math.max(o, d.source, d.target);
        });
      }), h.forEach((a) => {
        a.forEach((d) => {
          d.source = u, d.target = o;
        });
      }), i[r] = Array.from(h.values()).flat();
    });
  }
  function s(l) {
    const { absorbPosition: g, type: r } = l, h = e.selected;
    switch (r) {
      case "ht":
        h.style.top = f(g);
        break;
      case "hc":
        h.style.top = f(g - parseFloat(h.style.height) / 2);
        break;
      case "hb":
        h.style.top = f(g - parseFloat(h.style.height));
        break;
      case "vl":
        h.style.left = f(g);
        break;
      case "vc":
        h.style.left = f(g - parseFloat(h.style.width) / 2);
        break;
      case "vr":
        h.style.left = f(g - parseFloat(h.style.width));
        break;
    }
    n(), e.seletedBorder.reRender(e);
    let u = 1 / 0;
    m.forEach((o) => {
      i[o].forEach((a) => {
        a.absorbDistance < u && (u = a.absorbDistance);
      });
    }), m.forEach((o) => {
      i[o] = i[o].filter((a) => _(a.absorbDistance, u, 0.1));
    });
  }
  function c() {
    const l = A.from(e.selected);
    Object.values(i).flat().forEach(({ source: r, target: h, type: u }) => {
      const o = t[u];
      if (o) {
        if (/^h/.test(u)) {
          o.setAttribute("x1", String(r)), o.setAttribute("x2", String(h));
          const a = u === "ht" ? l.y : u === "hc" ? l.y + l.h / 2 : l.y + l.h;
          o.setAttribute("y1", String(a)), o.setAttribute("y2", String(a));
        }
        if (/^v/.test(u)) {
          o.setAttribute("y1", String(r)), o.setAttribute("y2", String(h));
          const a = u === "vl" ? l.x : u === "vc" ? l.x + l.w / 2 : l.x + l.w;
          o.setAttribute("x1", String(a)), o.setAttribute("x2", String(a));
        }
        o.style.display = "block";
      }
    });
  }
  n(), Object.values(i).flat().forEach((l) => s(l)), c();
}
class F {
  constructor(t) {
    y(this, "g");
    y(this, "lines");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g"), this.g.setAttribute("class", `${b}-alignLine`), t.append(this.g), this.lines = {}, m.forEach((i) => {
      const n = document.createElementNS("http://www.w3.org/2000/svg", "line");
      n.setAttribute("class", `${b}-alignLine-${i}`), n.setAttribute("stroke", Y), n.setAttribute("stroke-width", String(X)), n.style.display = "none", this.g.append(n), this.lines[i] = n;
    });
  }
  hidden() {
    Object.values(this.lines).forEach((t) => {
      t.style.display = "none";
    });
  }
  reRender(t) {
    t.selected && (this.hidden(), z(t, this.lines));
  }
}
const x = 1, I = "#000", L = 6, N = ["left", "top", "right", "bottom"], k = [
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
function R() {
  const e = [], t = [];
  return N.forEach((i) => {
    const n = document.createElementNS("http://www.w3.org/2000/svg", "line");
    n.setAttribute("class", `${b}-selected-border-line-${i}`), n.setAttribute("stroke", I), n.setAttribute("stroke-width", f(x)), t.push(n);
  }), k.forEach((i, n) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    s.setAttribute("class", `${b}-selected-border-point-${i}`), s.setAttribute("fill", "white"), s.setAttribute("stroke", I), s.setAttribute("stroke-width", f(x)), s.setAttribute("width", f(L)), s.setAttribute("height", f(L)), s.setAttribute("style", `cursor: ${W[n]}`), s.setAttribute("data-direction", i), e.push(s);
  }), [e, t];
}
function G(e) {
  const t = A.from(e.selected);
  N.forEach((i) => {
    const n = e.seletedBorder.g.getElementsByClassName(`${b}-selected-border-line-${i}`)[0];
    switch (i) {
      case "left":
        n.setAttribute("x1", String(t.x)), n.setAttribute("y1", String(t.y - x / 2)), n.setAttribute("x2", String(t.x)), n.setAttribute("y2", String(t.y + t.h + x / 2));
        break;
      case "right":
        n.setAttribute("x1", String(t.x + t.w)), n.setAttribute("y1", String(t.y - x / 2)), n.setAttribute("x2", String(t.x + t.w)), n.setAttribute("y2", String(t.y + t.h + x / 2));
        break;
      case "top":
        n.setAttribute("x1", String(t.x - x / 2)), n.setAttribute("y1", String(t.y)), n.setAttribute("x2", String(t.x + t.w + x / 2)), n.setAttribute("y2", String(t.y));
        break;
      case "bottom":
        n.setAttribute("x1", String(t.x - x / 2)), n.setAttribute("y1", String(t.y + t.h)), n.setAttribute("x2", String(t.x + t.w + x / 2)), n.setAttribute("y2", String(t.y + t.h));
        break;
    }
  }), k.forEach((i, n) => {
    const s = e.seletedBorder.g.getElementsByClassName(`${b}-selected-border-point-${i}`)[0];
    s.setAttribute("data-owner-id", e.selected.dataset.id);
    const c = L / 2;
    switch (i) {
      case "left-top":
        s.setAttribute("x", String(t.x - c)), s.setAttribute("y", String(t.y - c));
        break;
      case "top":
        s.setAttribute("x", String(t.x + t.w / 2 - c)), s.setAttribute("y", String(t.y - c));
        break;
      case "right-top":
        s.setAttribute("x", String(t.x + t.w - c)), s.setAttribute("y", String(t.y - c));
        break;
      case "right":
        s.setAttribute("x", String(t.x + t.w - c)), s.setAttribute("y", String(t.y + t.h / 2 - c));
        break;
      case "right-bottom":
        s.setAttribute("x", String(t.x + t.w - c)), s.setAttribute("y", String(t.y + t.h - c));
        break;
      case "bottom":
        s.setAttribute("x", String(t.x + t.w / 2 - c)), s.setAttribute("y", String(t.y + t.h - c));
        break;
      case "left-bottom":
        s.setAttribute("x", String(t.x - c)), s.setAttribute("y", String(t.y + t.h - c));
        break;
      case "left":
        s.setAttribute("x", String(t.x - c)), s.setAttribute("y", String(t.y + t.h / 2 - c));
        break;
    }
  });
}
class j {
  constructor(t) {
    y(this, "g");
    y(this, "points");
    y(this, "lines");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g"), this.g.setAttribute("class", `${b}-seleted-border`), t.append(this.g);
    const [i, n] = R();
    this.points = i, this.lines = n, this.g.append(...n, ...i);
  }
  hidden() {
    this.g.style.display = "none";
  }
  reRender(t) {
    t.selected && (this.g.style.display = "block", G(t));
  }
}
const q = (e, t) => {
  const i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.setAttribute("class", `${b}-svg`);
  const n = e.getBoundingClientRect();
  return i.setAttribute("width", f(n.width)), i.setAttribute("height", f(n.height)), i.style = "position: absolute; inset: 0;", e.className += ` ${b}-container`, t.forEach((s) => {
    s.className += ` ${b}-movable-node`, s.setAttribute("data-id", P()), /%$/.test(s.style.x) && (s.style.x = f(n.width * parseInt(s.style.x) / 100)), /%$/.test(s.style.y) && (s.style.y = f(n.height * parseInt(s.style.y) / 100)), /%$/.test(s.style.width) && (s.style.width = f(n.width * parseInt(s.style.width) / 100)), /%$/.test(s.style.height) && (s.style.height = f(n.height * parseInt(s.style.height) / 100));
  }), {
    container: e,
    nodes: t,
    svg: i,
    selected: null,
    alignLine: new F(i),
    seletedBorder: new j(i),
    moveDelta: [0, 0],
    setSelected(s) {
      if (this.selected = s, !s) {
        this.seletedBorder.hidden();
        return;
      }
      this.seletedBorder.reRender(this);
    }
  };
};
function V(e, t) {
  const i = q(e, t);
  return C(i), i.svg;
}
export {
  V as default
};
