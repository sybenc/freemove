var E = Object.defineProperty;
var _ = (i, t, r) => t in i ? E(i, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[t] = r;
var x = (i, t, r) => _(i, typeof t != "symbol" ? t + "" : t, r);
class v {
  constructor({ x: t, y: r, h: c, w: a, node: e }) {
    x(this, "x");
    x(this, "y");
    x(this, "w");
    x(this, "h");
    x(this, "node");
    this.x = t, this.y = r, this.h = c, this.w = a, this.node = e;
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
    const r = this.x + 3, c = this.y + 3, a = this.x + this.w - 3, e = this.y + this.h - 3, u = t.x, s = t.y, f = t.x + t.w, l = t.y + t.h;
    return !(a < u || r > f || e < s || c > l);
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
    return new v({
      x: parseFloat(t.style.left),
      y: parseFloat(t.style.top),
      w: parseFloat(t.style.width),
      h: parseFloat(t.style.height),
      node: t
    });
  }
}
const A = 3;
function d(i) {
  return typeof i == "number" ? `${i}px` : String(i);
}
const k = 1.5, R = "#EA3", p = ["vl", "vc", "vr", "ht", "hc", "hb"];
function F(i) {
  const t = [];
  return p.forEach((r) => {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "line");
    c.setAttribute("class", `__freemove-alignLine-${r}`), c.setAttribute("stroke", R), c.setAttribute("stroke-width", String(k)), c.style.display = "none", t.push(c);
  }), t;
}
function N(i) {
  const t = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  function r() {
    let e = v.from(i.selected);
    t.hb = [], t.hc = [], t.ht = [], t.vc = [], t.vl = [], t.vr = [], i.nodes.forEach((u) => {
      const s = v.from(u);
      if (e.isIntersect(s)) return;
      const f = e.getAlignLinePostion();
      p.forEach((l) => {
        let o = 1e4, n = 1e4, g;
        /^h/.test(l) && (e.x > s.x + s.w ? (o = e.x + e.w, n = s.x) : e.x + e.w < s.x ? (o = e.x, n = s.x + s.w) : (o = Math.min(e.x, s.x), n = Math.max(e.x + e.w, s.x + s.w)), [s.y, s.y + s.h / 2, s.y + s.h].forEach((y) => {
          g = Math.abs(f[l] - y), g <= A && t[l].push({
            type: l,
            source: o,
            target: n,
            absorbDistance: g,
            absorbPosition: y,
            nodeRects: [s]
          });
        })), /^v/.test(l) && (e.y > s.y + s.h ? (o = e.y + e.h, n = s.y) : e.y + e.h < s.y ? (o = e.y, n = s.y + s.h) : (o = Math.min(e.y, s.y), n = Math.max(e.y + e.h, s.y + s.h)), [s.x, s.x + s.w / 2, s.x + s.w].forEach((y) => {
          g = Math.abs(f[l] - y), g <= A && t[l].push({
            type: l,
            source: o,
            target: n,
            absorbDistance: g,
            absorbPosition: y,
            nodeRects: [s]
          });
        }));
      });
    }), t.hb.length && t.hc.length && t.ht.length;
  }
  function c(e) {
    if (!i.selected || !e) return;
    const { absorbPosition: u, type: s } = e;
    switch (s) {
      case "ht":
        i.selected.style.top = d(u);
        break;
      case "hc":
        i.selected.style.top = d(u - parseFloat(i.selected.style.height) / 2);
        break;
      case "hb":
        i.selected.style.top = d(u - parseFloat(i.selected.style.height));
        break;
      case "vl":
        i.selected.style.left = d(u);
        break;
      case "vc":
        i.selected.style.left = d(u - parseFloat(i.selected.style.width) / 2);
        break;
      case "vr":
        i.selected.style.left = d(u - parseFloat(i.selected.style.width));
        break;
    }
    r();
  }
  function a() {
    if (!i.selected) return;
    const e = v.from(i.selected);
    Object.values(t).flat().forEach((s) => {
      const { source: f, target: l, type: o } = s, n = i.alignLine.g.getElementsByClassName(`__freemove-alignLine-${o}`)[0];
      if (/^h/.test(o))
        switch (n == null || n.setAttribute("x1", String(f)), n == null || n.setAttribute("x2", String(l)), o) {
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
      if (/^v/.test(o))
        switch (n == null || n.setAttribute("y1", String(f)), n == null || n.setAttribute("y2", String(l)), o) {
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
  r(), [...t.ht, ...t.hc, ...t.hb].forEach((e) => {
    c(e);
  }), [...t.vl, ...t.vc, ...t.vr].forEach((e) => {
    c(e);
  }), a();
}
class M {
  constructor(t) {
    x(this, "g");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g"), this.g.setAttribute("class", "__freemove-alignLine"), t.append(this.g);
  }
  get nodes() {
    return this.g;
  }
  // 清除分组内所有对齐线
  clear() {
    this.g.innerHTML = "";
  }
  reRender(t) {
    t.selected && (this.clear(), this.g.append(...F()), N(t));
  }
}
const B = (i, t) => {
  const r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  r.setAttribute("class", "__freemove-svg");
  const c = i.getBoundingClientRect();
  return r.setAttribute("width", d(c.width)), r.setAttribute("height", d(c.height)), r.style = "position: absolute; inset: 0;", i.className += " __freemove-container", t.forEach((a) => a.className += " __freemove-movable-node"), {
    container: i,
    nodes: t,
    svg: r,
    selected: null,
    alignLine: new M(r),
    moveDelta: [0, 0],
    setSelected(a) {
      this.selected = a;
    }
  };
};
let h;
function T(i, t) {
  return h = B(i, t), h.svg.addEventListener("pointerdown", (r) => {
    const c = h.container.getBoundingClientRect();
    r.preventDefault();
    let a = null;
    for (const w of h.nodes) {
      const b = v.from(w);
      if (b.isInSide({ x: r.offsetX, y: r.offsetY })) {
        a = b;
        break;
      }
    }
    if (!a) return;
    const e = a.node;
    if (h.setSelected(a.node), h.alignLine.reRender(h), e.classList.contains("__freemove-container") || !e.classList.contains("__freemove-movable-node")) return;
    const u = e.getBoundingClientRect();
    let s = r.clientX - u.left, f = r.clientY - u.top, l = null, o = null, n = null;
    function g(w) {
      l || (l = requestAnimationFrame(() => {
        let b = w.clientX - c.left - s, m = w.clientY - c.top - f;
        const L = h.container.clientWidth - e.offsetWidth, S = h.container.clientHeight - e.offsetHeight;
        b = Math.max(0, Math.min(b, L)), m = Math.max(0, Math.min(m, S)), h.moveDelta = [o !== null ? b - o : 0, n !== null ? m - n : 0], e.style.left = d(b), e.style.top = d(m), h.alignLine.reRender(h), o = b, n = m, l = null;
      }));
    }
    function y() {
      document.removeEventListener("pointermove", g), document.removeEventListener("pointerup", y), h.alignLine.clear(), h.setSelected(null), l !== null && (cancelAnimationFrame(l), l = null);
    }
    document.addEventListener("pointermove", g), document.addEventListener("pointerup", y);
  }), h.svg;
}
export {
  T as default
};
