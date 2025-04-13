var k = Object.defineProperty;
var $ = (n, t, i) => t in n ? k(n, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : n[t] = i;
var A = (n, t, i) => $(n, typeof t != "symbol" ? t + "" : t, i);
const y = "__freemove";
class S {
  constructor({ x: t, y: i, h: o, w: c, node: e }) {
    A(this, "x");
    A(this, "y");
    A(this, "w");
    A(this, "h");
    A(this, "node");
    this.x = t, this.y = i, this.h = o, this.w = c, this.node = e;
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
    const i = this.x + 3, o = this.y + 3, c = this.x + this.w - 3, e = this.y + this.h - 3, a = t.x, s = t.y, l = t.x + t.w, h = t.y + t.h;
    return !(c < a || i > l || e < s || o > h);
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
    return new S({
      x: t.offsetLeft,
      y: t.offsetTop,
      w: t.offsetWidth,
      h: t.offsetHeight,
      node: t
    });
  }
}
function g(n) {
  return typeof n == "number" ? `${n}px` : String(n);
}
const T = 1.5, D = "#EA3", L = ["vl", "vc", "vr", "ht", "hc", "hb"];
function N(n) {
  const t = [];
  return L.forEach((i) => {
    const o = document.createElementNS("http://www.w3.org/2000/svg", "line");
    o.setAttribute("class", `${y}-alignLine-${i}`), o.setAttribute("stroke", D), o.setAttribute("stroke-width", String(T)), o.style.display = "none", t.push(o);
  }), t;
}
function I(n) {
  const t = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  function i() {
    let e = S.from(n.selected);
    t.hb = [], t.hc = [], t.ht = [], t.vc = [], t.vl = [], t.vr = [], n.nodes.forEach((a) => {
      const s = S.from(a);
      if (e.isIntersect(s)) return;
      const l = e.getAlignLinePostion();
      L.forEach((h) => {
        let u = 1e4, r = 1e4, b;
        /^h/.test(h) && (e.x > s.x + s.w ? (u = e.x + e.w, r = s.x) : e.x + e.w < s.x ? (u = e.x, r = s.x + s.w) : (u = Math.min(e.x, s.x), r = Math.max(e.x + e.w, s.x + s.w)), [s.y, s.y + s.h / 2, s.y + s.h].forEach((x) => {
          b = Math.abs(l[h] - x), b <= 3 && t[h].push({
            type: h,
            source: u,
            target: r,
            absorbDistance: b,
            absorbPosition: x,
            nodeRects: [s]
          });
        })), /^v/.test(h) && (e.y > s.y + s.h ? (u = e.y + e.h, r = s.y) : e.y + e.h < s.y ? (u = e.y, r = s.y + s.h) : (u = Math.min(e.y, s.y), r = Math.max(e.y + e.h, s.y + s.h)), [s.x, s.x + s.w / 2, s.x + s.w].forEach((x) => {
          b = Math.abs(l[h] - x), b <= 3 && t[h].push({
            type: h,
            source: u,
            target: r,
            absorbDistance: b,
            absorbPosition: x,
            nodeRects: [s]
          });
        }));
      });
    });
  }
  function o(e) {
    if (!n.selected || !e) return;
    const { absorbPosition: a, type: s } = e;
    switch (s) {
      case "ht":
        n.selected.style.top = g(a);
        break;
      case "hc":
        n.selected.style.top = g(a - parseFloat(n.selected.style.height) / 2);
        break;
      case "hb":
        n.selected.style.top = g(a - parseFloat(n.selected.style.height));
        break;
      case "vl":
        n.selected.style.left = g(a);
        break;
      case "vc":
        n.selected.style.left = g(a - parseFloat(n.selected.style.width) / 2);
        break;
      case "vr":
        n.selected.style.left = g(a - parseFloat(n.selected.style.width));
        break;
    }
    i();
  }
  function c() {
    if (!n.selected) return;
    const e = S.from(n.selected);
    Object.values(t).flat().forEach((s) => {
      const { source: l, target: h, type: u } = s, r = n.alignLine.g.getElementsByClassName(`${y}-alignLine-${u}`)[0];
      if (/^h/.test(u))
        switch (r == null || r.setAttribute("x1", String(l)), r == null || r.setAttribute("x2", String(h)), u) {
          case "ht":
            r.setAttribute("y1", String(e.y)), r.setAttribute("y2", String(e.y));
            break;
          case "hc":
            r.setAttribute("y1", String(e.y + e.h / 2)), r.setAttribute("y2", String(e.y + e.h / 2));
            break;
          case "hb":
            r.setAttribute("y1", String(e.y + e.h)), r.setAttribute("y2", String(e.y + e.h));
            break;
        }
      if (/^v/.test(u))
        switch (r == null || r.setAttribute("y1", String(l)), r == null || r.setAttribute("y2", String(h)), u) {
          case "vl":
            r.setAttribute("x1", String(e.x)), r.setAttribute("x2", String(e.x));
            break;
          case "vc":
            r.setAttribute("x1", String(e.x + e.w / 2)), r.setAttribute("x2", String(e.x + e.w / 2));
            break;
          case "vr":
            r.setAttribute("x1", String(e.x + e.w)), r.setAttribute("x2", String(e.x + e.w));
            break;
        }
      r == null || r.setAttribute("style", "display: 'block");
    });
  }
  i(), [...t.ht, ...t.hc, ...t.hb].forEach((e) => {
    o(e);
  }), [...t.vl, ...t.vc, ...t.vr].forEach((e) => {
    o(e);
  }), c();
}
class M {
  constructor(t) {
    A(this, "g");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g"), this.g.setAttribute("class", `${y}-alignLine`), t.append(this.g);
  }
  // 清除分组内所有对齐线
  clear() {
    this.g.innerHTML = "";
  }
  reRender(t) {
    t.selected && (this.clear(), this.g.append(...N()), I(t));
  }
}
const f = 1.5, F = "#000", _ = ["left", "top", "right", "bottom"], m = ["ew-resize", "ns-resize", "ew-resize", "ns-resize"];
function E(n) {
  const t = S.from(n.selected), i = [];
  return _.forEach((o, c) => {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "line");
    e.setAttribute("class", `${y}-selected-border-line-${o}`), e.setAttribute("stroke", F), e.setAttribute("stroke-width", g(f)), e.setAttribute("style", `cursor: ${m[c]}`);
    const a = document.createElementNS("http://www.w3.org/2000/svg", "line");
    a.setAttribute("class", `${y}-selected-border-line-action-${o}`), a.setAttribute("stroke", "transparent"), a.setAttribute("stroke-width", "5px"), a.setAttribute("style", `cursor: ${m[c]}`);
    const s = [e, a];
    switch (o) {
      case "left":
        s.forEach((l) => {
          l.setAttribute("x1", String(t.x)), l.setAttribute("y1", String(t.y - f / 2)), l.setAttribute("x2", String(t.x)), l.setAttribute("y2", String(t.y + t.h + f / 2));
        });
        break;
      case "right":
        s.forEach((l) => {
          l.setAttribute("x1", String(t.x + t.w)), l.setAttribute("y1", String(t.y - f / 2)), l.setAttribute("x2", String(t.x + t.w)), l.setAttribute("y2", String(t.y + t.h + f / 2));
        });
        break;
      case "top":
        s.forEach((l) => {
          l.setAttribute("x1", String(t.x - f / 2)), l.setAttribute("y1", String(t.y)), l.setAttribute("x2", String(t.x + t.w + f / 2)), l.setAttribute("y2", String(t.y));
        });
        break;
      case "bottom":
        s.forEach((l) => {
          l.setAttribute("x1", String(t.x - f / 2)), l.setAttribute("y1", String(t.y + t.h)), l.setAttribute("x2", String(t.x + t.w + f / 2)), l.setAttribute("y2", String(t.y + t.h));
        });
        break;
    }
    i.push(e, a);
  }), i;
}
class C {
  constructor(t) {
    A(this, "g");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g"), this.g.setAttribute("class", `${y}-seleted-border`), t.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(t) {
    t.selected && (this.clear(), this.g.append(...E(t)), E(t));
  }
}
const O = (n, t) => {
  const i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.setAttribute("class", `${y}-svg`);
  const o = n.getBoundingClientRect();
  return i.setAttribute("width", g(o.width)), i.setAttribute("height", g(o.height)), i.style = "position: absolute; inset: 0;", n.className += ` ${y}-container`, t.forEach((c) => {
    c.className += ` ${y}-movable-node`, /%$/.test(c.style.x) && (c.style.x = g(o.width * parseInt(c.style.x) / 100)), /%$/.test(c.style.y) && (c.style.y = g(o.height * parseInt(c.style.y) / 100)), /%$/.test(c.style.width) && (c.style.width = g(o.width * parseInt(c.style.width) / 100)), /%$/.test(c.style.height) && (c.style.height = g(o.height * parseInt(c.style.height) / 100));
  }), {
    container: n,
    nodes: t,
    svg: i,
    selected: null,
    alignLine: new M(i),
    seletedBorder: new C(i),
    moveDelta: [0, 0],
    setSelected(c) {
      if (this.selected = c, !c) {
        this.seletedBorder.clear();
        return;
      }
      this.seletedBorder.reRender(this), console.log(this.seletedBorder);
    }
  };
};
let d;
function H(n, t) {
  return d = O(n, t), d.svg.addEventListener("pointerdown", (i) => {
    const o = d.container.getBoundingClientRect();
    i.preventDefault();
    let c = null;
    for (const p of d.nodes) {
      const w = S.from(p);
      if (w.isInSide({ x: i.offsetX, y: i.offsetY })) {
        c = w;
        break;
      }
    }
    if (!c) return;
    const e = c.node;
    if (d.setSelected(c.node), d.alignLine.reRender(d), e.classList.contains(`${y}-container`) || !e.classList.contains(`${y}-movable-node`)) return;
    const a = e.getBoundingClientRect();
    let s = i.clientX - a.left, l = i.clientY - a.top, h = null, u = null, r = null;
    function b(p) {
      h || (h = requestAnimationFrame(() => {
        let w = p.clientX - o.left - s, v = p.clientY - o.top - l;
        const R = d.container.clientWidth - e.offsetWidth, B = d.container.clientHeight - e.offsetHeight;
        w = Math.max(0, Math.min(w, R)), v = Math.max(0, Math.min(v, B)), d.moveDelta = [u !== null ? w - u : 0, r !== null ? v - r : 0], e.style.left = g(w), e.style.top = g(v), d.alignLine.reRender(d), d.seletedBorder.reRender(d), u = w, r = v, h = null;
      }));
    }
    function x() {
      document.removeEventListener("pointermove", b), document.removeEventListener("pointerup", x), d.alignLine.clear(), h !== null && (cancelAnimationFrame(h), h = null);
    }
    document.addEventListener("pointermove", b), document.addEventListener("pointerup", x);
  }), d.svg;
}
export {
  H as default
};
