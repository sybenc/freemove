var et = Object.defineProperty;
var it = (s, e, t) => e in s ? et(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var p = (s, e, t) => it(s, typeof e != "symbol" ? e + "" : e, t);
const g = "__freemove";
class f {
  constructor({ x: e, y: t, h: i, w: n, node: l }) {
    p(this, "x");
    p(this, "y");
    p(this, "w");
    p(this, "h");
    p(this, "id");
    p(this, "node");
    this.x = e, this.y = t, this.h = i, this.w = n, this.node = l, this.id = l.dataset.id;
  }
  // 将rect的几何信息和node节点同步
  sync() {
    this.x = parseFloat(this.node.style.left), this.y = parseFloat(this.node.style.top), this.w = parseFloat(this.node.style.width), this.h = parseFloat(this.node.style.height);
  }
  set error(e) {
    this.node.setAttribute("data-error", String(e));
  }
  get error() {
    return !!this.node.getAttribute("data-error");
  }
  // 判断一个点是否在矩形里面
  isInSide(e) {
    return e.x >= this.x && e.x <= this.x + this.w && e.y >= this.y && e.y <= this.y + this.h;
  }
  // 判断两个矩形是否相交
  isIntersect(e) {
    const t = this.x + 0, i = this.y + 0, n = this.x + this.w - 0, l = this.y + this.h - 0, a = e.x, c = e.y, o = e.x + e.w, r = e.y + e.h;
    return !(n < a || t > o || l < c || i > r);
  }
  // 从dom元素的style构建Rect对象
  static from(e) {
    return new f({
      x: parseFloat(e.style.left),
      y: parseFloat(e.style.top),
      w: parseFloat(e.style.width),
      h: parseFloat(e.style.height),
      node: e
    });
  }
}
function A(s) {
  return typeof s == "number" ? `${s}px` : String(s);
}
function V(s, e, t = 0.1) {
  return Math.abs(s - e) <= t;
}
function b(s, e) {
  return s.getElementsByClassName(e)[0];
}
function x(s) {
  return document.createElementNS("http://www.w3.org/2000/svg", s);
}
function W(s, e = !1) {
  return e ? Math.round(parseFloat(s.toFixed(1))) : Number.isInteger(s) ? s.toFixed(0) : s.toFixed(1);
}
function st(s, e) {
  if (!s.selected) return;
  const t = s.container.getBoundingClientRect();
  s.selected.dataset.error === "false" && (s.align.reRender(s), s.distance.reRender(s), s.gap.reRender(s)), s.border.reRender(s);
  const i = s.selected.getBoundingClientRect();
  let n = (e.clientX - i.left) / s.scale, l = (e.clientY - i.top) / s.scale, a = null;
  function c(r) {
    a || (a = requestAnimationFrame(() => {
      if (!s.selected) return;
      let d = (r.clientX - t.left) / s.scale - n, h = (r.clientY - t.top) / s.scale - l;
      const u = s.container.clientWidth - s.selected.offsetWidth, y = s.container.clientHeight - s.selected.offsetHeight;
      d = Math.max(0, Math.min(d, u)), h = Math.max(0, Math.min(h, y)), s.selected.style.left = A(d), s.selected.style.top = A(h), s.searchError(), s.selected.dataset.error === "false" && (s.align.reRender(s), s.distance.reRender(s), s.gap.reRender(s)), s.border.reRender(s), a = null;
    }));
  }
  function o() {
    document.removeEventListener("pointermove", c), document.removeEventListener("pointerup", o), s.align.hidden(), s.distance.hidden(), s.gap.clear(), a !== null && (cancelAnimationFrame(a), a = null);
  }
  document.addEventListener("pointermove", c), document.addEventListener("pointerup", o);
}
function nt(s, e) {
  if (!s.selected) return;
  const t = s.container.getBoundingClientRect(), n = e.target.dataset.direction;
  if (!n) return;
  const l = f.from(s.selected);
  let a = e.clientX, c = e.clientY, o = l.w, r = l.h, d = l.x, h = l.y;
  const u = t.width, y = t.height;
  function w(k) {
    let S = (k.clientX - a) / s.scale, N = (k.clientY - c) / s.scale, v = o, L = r, M = d, B = h;
    n.includes("right") && (v = o + S), n.includes("left") && (v = o - S, M = d + S), n.includes("bottom") && (L = r + N), n.includes("top") && (L = r - N, B = h + N), M < 0 && (v += M, M = 0), B < 0 && (L += B, B = 0), M + v > u / s.scale && (v = u / s.scale - M), B + L > y / s.scale && (L = y / s.scale - B), v = Math.max(v, 10), L = Math.max(L, 10), s.resize.reRender(s, v, L, n, d, h, o, r), s.border.reRender(s);
  }
  function $() {
    s.resize.hidden(), document.removeEventListener("pointermove", w), document.removeEventListener("pointerup", $);
  }
  document.addEventListener("pointermove", w), document.addEventListener("pointerup", $);
}
function rt(s, e) {
  const t = s.container.getBoundingClientRect(), i = (e.clientX - t.left) / s.scale, n = (e.clientY - t.top) / s.scale;
  function l(c) {
    const o = (c.clientX - t.left) / s.scale, r = (c.clientY - t.top) / s.scale;
    s.selector.reRender(s, i, n, o, r), s.selector.showPreview();
  }
  function a() {
    s.selector.hiddenSelector(), document.removeEventListener("pointermove", l), document.removeEventListener("pointerup", a);
  }
  document.addEventListener("pointermove", l), document.addEventListener("pointerup", a);
}
function lt(s) {
  s.svg.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    const t = e.target;
    if (t.classList[0].includes(`${g}-border-point-`)) {
      const i = t.dataset.ownerId;
      for (let n = 0; n < s.nodes.length; n++)
        i === s.nodes[n].dataset.ownerId && s.setSelected(s.nodes[n]);
      s.selected && nt(s, e);
      return;
    }
    if (t.classList.contains(`${g}-svg`)) {
      let i = null;
      for (const n of s.nodes) {
        const l = f.from(n);
        if (l.isInSide({ x: e.offsetX, y: e.offsetY })) {
          i = l;
          break;
        }
      }
      i && i.node.classList.contains(`${g}-movable-node`) && (s.selector.hiddenPreview(), s.setSelected(i.node), s.searchError(), st(s, e)), i || (s.border.hidden(), rt(s, e));
    }
  }), document.body.addEventListener("wheel", (e) => {
    const [t, i] = s.scaleRange;
    e.preventDefault();
    const n = s.container.getBoundingClientRect(), l = e.clientX - n.left, a = e.clientY - n.top;
    function c() {
      s.container.style.transform = `translate(${s.translateX}px, ${s.translateY}px) scale(${s.scale})`, s.container.style.transformOrigin = "0 0", s.border.reRender(s);
    }
    if (e.ctrlKey) {
      let o = e.deltaY * -1e-3 * 5, r = s.scale + o;
      r = Math.max(t, Math.min(i, r));
      const d = r / s.scale;
      s.translateX = l - (l - s.translateX) * d, s.translateY = a - (a - s.translateY) * d, s.scale = r, c();
    } else
      s.translateX -= e.deltaX, s.translateY -= e.deltaY, c();
  });
}
const at = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let ct = (s = 21) => {
  let e = "", t = crypto.getRandomValues(new Uint8Array(s |= 0));
  for (; s--; )
    e += at[t[s] & 63];
  return e;
};
const U = 1, ht = "red", P = ["vl", "vc", "vr", "ht", "hc", "hb"];
function ot(s) {
  return {
    vl: s.x,
    vc: s.x + s.w / 2,
    vr: s.x + s.w,
    ht: s.y,
    hc: s.y + s.h / 2,
    hb: s.y + s.h
  };
}
function j(s, e) {
  const t = f.from(s.selected), i = s.nodes.filter((n) => n !== s.selected).map((n) => f.from(n));
  P.forEach((n) => e.alternateNodes[n] = []), i.forEach((n) => {
    if (t.isIntersect(n)) return;
    const l = ot(t);
    P.forEach((a) => {
      let c = 1e4, o = 1e4, r;
      /^h/.test(a) && (t.x > n.x + n.w ? (c = t.x + t.w, o = n.x) : t.x + t.w < n.x ? (c = t.x, o = n.x + n.w) : (c = Math.min(t.x, n.x), o = Math.max(t.x + t.w, n.x + n.w)), [n.y, n.y + n.h / 2, n.y + n.h].forEach((d) => {
        r = Math.abs(l[a] - d), r <= 3 && e.alternateNodes[a].push({
          type: a,
          source: c,
          target: o,
          absorbDistance: r,
          absorbPosition: d,
          nodeRects: [n]
        });
      })), /^v/.test(a) && (t.y > n.y + n.h ? (c = t.y + t.h, o = n.y) : t.y + t.h < n.y ? (c = t.y, o = n.y + n.h) : (c = Math.min(t.y, n.y), o = Math.max(t.y + t.h, n.y + n.h)), [n.x, n.x + n.w / 2, n.x + n.w].forEach((d) => {
        r = Math.abs(l[a] - d), r <= 3 && e.alternateNodes[a].push({
          type: a,
          source: c,
          target: o,
          absorbDistance: r,
          absorbPosition: d,
          nodeRects: [n]
        });
      }));
    });
  }), P.forEach((n) => {
    const l = /* @__PURE__ */ new Map();
    e.alternateNodes[n].forEach((o) => {
      const r = l.get(o.absorbDistance) || [];
      r.push(o), l.set(o.absorbDistance, r);
    });
    let a = 1 / 0, c = 0;
    l.forEach((o) => {
      o.forEach((r) => {
        a = Math.min(a, r.source, r.target), c = Math.max(c, r.source, r.target);
      });
    }), l.forEach((o) => {
      o.forEach((r) => {
        r.source = a, r.target = c;
      });
    }), e.alternateNodes[n] = Array.from(l.values()).flat();
  });
}
function dt(s, e, t) {
  const { absorbPosition: i, type: n } = t, l = s.selected;
  switch (n) {
    case "ht":
      l.style.top = A(i);
      break;
    case "hc":
      l.style.top = A(i - parseFloat(l.style.height) / 2);
      break;
    case "hb":
      l.style.top = A(i - parseFloat(l.style.height));
      break;
    case "vl":
      l.style.left = A(i);
      break;
    case "vc":
      l.style.left = A(i - parseFloat(l.style.width) / 2);
      break;
    case "vr":
      l.style.left = A(i - parseFloat(l.style.width));
      break;
  }
  j(s, e), s.border.reRender(s);
}
function gt(s, e) {
  if (!s.selected) return;
  const t = s.container.getBoundingClientRect(), i = f.from(s.selected), n = t.width / s.scale / 2;
  Math.abs(i.x + i.w / 2 - n) <= 3 && (s.selected.style.left = A(n - i.w / 2), e.showContainerAlignLine = !0), j(s, e), s.border.reRender(s);
}
function ut(s, e) {
  if (!s.selected) return;
  const t = s.container.getBoundingClientRect(), i = f.from(s.selected), n = Object.values(e.alternateNodes).flat();
  if ([...e.alternateNodes.hb, ...e.alternateNodes.hc, ...e.alternateNodes.ht].length === 0 ? e.isHAlign = !1 : e.isHAlign = !0, [...e.alternateNodes.vc, ...e.alternateNodes.vl, ...e.alternateNodes.vr].length === 0 ? e.isVAlign = !1 : e.isVAlign = !0, n.forEach((l) => {
    const { source: a, target: c, type: o } = l, r = e.lines[o];
    if (/^h/.test(o))
      switch (r == null || r.setAttribute("x1", String(a)), r == null || r.setAttribute("x2", String(c)), o) {
        case "ht":
          r.setAttribute("y1", String(i.y)), r.setAttribute("y2", String(i.y));
          break;
        case "hc":
          r.setAttribute("y1", String(i.y + i.h / 2)), r.setAttribute("y2", String(i.y + i.h / 2));
          break;
        case "hb":
          r.setAttribute("y1", String(i.y + i.h)), r.setAttribute("y2", String(i.y + i.h));
          break;
      }
    if (/^v/.test(o))
      switch (r == null || r.setAttribute("y1", String(a)), r == null || r.setAttribute("y2", String(c)), o) {
        case "vl":
          r.setAttribute("x1", String(i.x)), r.setAttribute("x2", String(i.x));
          break;
        case "vc":
          r.setAttribute("x1", String(i.x + i.w / 2)), r.setAttribute("x2", String(i.x + i.w / 2));
          break;
        case "vr":
          r.setAttribute("x1", String(i.x + i.w)), r.setAttribute("x2", String(i.x + i.w));
          break;
      }
    r.setAttribute("stroke-width", String(U / s.scale)), r == null || r.setAttribute("style", "display: 'block");
  }), e.showContainerAlignLine) {
    const l = e.lines.vertical;
    l.setAttribute("x1", String(t.width / s.scale / 2)), l.setAttribute("y1", String(0)), l.setAttribute("x2", String(t.width / s.scale / 2)), l.setAttribute("y2", String(t.height / s.scale)), l.setAttribute("stroke-width", String(U / s.scale)), l == null || l.setAttribute("style", "display: 'block");
  }
}
class bt {
  constructor(e) {
    p(this, "g");
    p(this, "lines");
    p(this, "isHAlign", !1);
    p(this, "isVAlign", !1);
    p(this, "alternateNodes", {
      ht: [],
      hc: [],
      hb: [],
      vl: [],
      vc: [],
      vr: []
    });
    p(this, "showContainerAlignLine", !1);
    this.g = x("g"), this.g.setAttribute("class", `${g}-align`), this.lines = {}, [...P, "vertical"].forEach((t) => {
      const i = x("line");
      i.setAttribute("class", `${g}-align-${t}`), i.setAttribute("stroke", ht), i.style.display = "none", this.g.append(i), this.lines[t] = i;
    }), e.append(this.g);
  }
  hidden() {
    Object.values(this.lines).forEach((e) => {
      e.style.display = "none";
    });
  }
  reRender(e) {
    if (!e.selected) return;
    this.hidden(), this.alternateNodes = {
      ht: [],
      hc: [],
      hb: [],
      vl: [],
      vc: [],
      vr: []
    }, this.showContainerAlignLine = !1, j(e, this), Object.values(this.alternateNodes).flat().forEach((i) => {
      dt(e, this, i);
    }), gt(e, this);
    let t = 1 / 0;
    P.forEach((i) => {
      this.alternateNodes[i].forEach((n) => {
        n.absorbDistance < t && (t = n.absorbDistance);
      });
    }), P.forEach((i) => {
      this.alternateNodes[i] = this.alternateNodes[i].filter(
        (n) => V(n.absorbDistance, t, 0.01)
      );
    }), ut(e, this);
  }
}
const z = 1, K = "#000", G = 6, J = ["left", "top", "right", "bottom"], Z = [
  "left-top",
  "top",
  "right-top",
  "right",
  "right-bottom",
  "bottom",
  "left-bottom",
  "left"
], yt = [
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize",
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize"
];
function At() {
  const s = [], e = [];
  return J.forEach((t) => {
    const i = x("line");
    i.setAttribute("class", `${g}-border-line-${t}`), i.setAttribute("stroke", K), e.push(i);
  }), Z.forEach((t, i) => {
    const n = x("rect");
    n.setAttribute("class", `${g}-border-point-${t}`), n.setAttribute("fill", "white"), n.setAttribute("stroke", K), n.setAttribute("style", `cursor: ${yt[i]}`), n.setAttribute("data-direction", t), s.push(n);
  }), [s, e];
}
function ft(s, e) {
  const t = f.from(e.selected);
  J.forEach((i) => {
    const n = b(s, `${g}-border-line-${i}`);
    switch (n.setAttribute("stroke-width", A(z / e.scale)), i) {
      case "left":
        n.setAttribute("x1", String(t.x)), n.setAttribute("y1", String(t.y - z / e.scale / 2)), n.setAttribute("x2", String(t.x)), n.setAttribute("y2", String(t.y + t.h + z / e.scale / 2));
        break;
      case "right":
        n.setAttribute("x1", String(t.x + t.w)), n.setAttribute("y1", String(t.y - z / e.scale / 2)), n.setAttribute("x2", String(t.x + t.w)), n.setAttribute("y2", String(t.y + t.h + z / e.scale / 2));
        break;
      case "top":
        n.setAttribute("x1", String(t.x - z / e.scale / 2)), n.setAttribute("y1", String(t.y)), n.setAttribute("x2", String(t.x + t.w + z / e.scale / 2)), n.setAttribute("y2", String(t.y));
        break;
      case "bottom":
        n.setAttribute("x1", String(t.x - z / e.scale / 2)), n.setAttribute("y1", String(t.y + t.h)), n.setAttribute("x2", String(t.x + t.w + z / e.scale / 2)), n.setAttribute("y2", String(t.y + t.h));
        break;
    }
  }), Z.forEach((i, n) => {
    const l = b(s, `${g}-border-point-${i}`);
    l.setAttribute("data-owner-id", e.selected.dataset.id), l.setAttribute("stroke-width", A(z / e.scale)), l.setAttribute("width", A(G / e.scale)), l.setAttribute("height", A(G / e.scale));
    const a = G / e.scale / 2;
    switch (i) {
      case "left-top":
        l.setAttribute("x", String(t.x - a)), l.setAttribute("y", String(t.y - a));
        break;
      case "top":
        l.setAttribute("x", String(t.x + t.w / 2 - a)), l.setAttribute("y", String(t.y - a));
        break;
      case "right-top":
        l.setAttribute("x", String(t.x + t.w - a)), l.setAttribute("y", String(t.y - a));
        break;
      case "right":
        l.setAttribute("x", String(t.x + t.w - a)), l.setAttribute("y", String(t.y + t.h / 2 - a));
        break;
      case "right-bottom":
        l.setAttribute("x", String(t.x + t.w - a)), l.setAttribute("y", String(t.y + t.h - a));
        break;
      case "bottom":
        l.setAttribute("x", String(t.x + t.w / 2 - a)), l.setAttribute("y", String(t.y + t.h - a));
        break;
      case "left-bottom":
        l.setAttribute("x", String(t.x - a)), l.setAttribute("y", String(t.y + t.h - a));
        break;
      case "left":
        l.setAttribute("x", String(t.x - a)), l.setAttribute("y", String(t.y + t.h / 2 - a));
        break;
    }
  });
}
class xt {
  constructor(e) {
    p(this, "g");
    p(this, "points");
    p(this, "lines");
    this.g = x("g"), this.g.setAttribute("class", `${g}-border`), e.append(this.g);
    const [t, i] = At();
    this.points = t, this.lines = i, this.g.append(...i, ...t), this.g.style.display = "none";
  }
  hidden() {
    this.g.style.display = "none";
  }
  reRender(e) {
    e.selected && (this.g.style.display = "block", ft(this.g, e));
  }
}
const H = 1, T = "#2A63F4", F = 8, I = 10, Q = 10;
function _(s) {
  const e = s.nodes.map((n) => f.from(n)), t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  return e.forEach((n) => {
    var c, o;
    const l = {
      type: "width",
      nodeRect: n
    }, a = {
      type: "height",
      nodeRect: n
    };
    t.has(n.w) ? (c = t.get(n.w)) == null || c.push(l) : t.set(n.w, [l]), i.has(n.h) ? (o = i.get(n.h)) == null || o.push(a) : i.set(n.h, [a]);
  }), {
    widthMap: t,
    heightMap: i
  };
}
function pt(s) {
  s.nodes.forEach((e) => {
    const t = f.from(e), i = s.resize.g.querySelector(`[data-ower-id="${t.id}"]`), n = b(i, `${g}-resize-line-group-width-line`), l = b(i, `${g}-resize-line-group-width-line-start`), a = b(i, `${g}-resize-line-group-width-line-end`), c = b(i, `${g}-resize-line-group-width-text`), o = b(i, `${g}-resize-line-group-height-line`), r = b(i, `${g}-resize-line-group-height-text`), d = b(i, `${g}-resize-line-group-height-line-start`), h = b(i, `${g}-resize-line-group-height-line-end`);
    n.setAttribute("x1", String(t.x)), n.setAttribute("y1", String(t.y - F)), n.setAttribute("x2", String(t.x + t.w)), n.setAttribute("y2", String(t.y - F)), l.setAttribute("x", String(t.x - H / s.scale / 2)), l.setAttribute("y", String(t.y - F - I / s.scale / 2)), l.setAttribute("width", String(H / s.scale)), l.setAttribute("height", String(I)), l.setAttribute("fill", String(T)), a.setAttribute("x", String(t.x + t.w - H / s.scale / 2)), a.setAttribute("y", String(t.y - F - I / s.scale / 2)), a.setAttribute("width", String(H / s.scale)), a.setAttribute("height", String(I)), a.setAttribute("fill", String(T)), c.textContent = `${W(t.w)}`, c.setAttribute("x", String(t.x + t.w / 2)), c.setAttribute("y", String(t.y - F - 8)), c.setAttribute("fill", String(T)), c.setAttribute("font-size", String(Q / s.scale)), c.setAttribute("text-anchor", "middle"), c.setAttribute("alignment-baseline", "middle"), o.setAttribute("x1", String(t.x - F)), o.setAttribute("y1", String(t.y)), o.setAttribute("x2", String(t.x - F)), o.setAttribute("y2", String(t.y + t.h)), d.setAttribute("x", String(t.x - F - I / s.scale / 2)), d.setAttribute("y", String(t.y - H / s.scale / 2)), d.setAttribute("width", String(I)), d.setAttribute("height", String(H / s.scale)), d.setAttribute("fill", String(T)), h.setAttribute("x", String(t.x - F - I / s.scale / 2)), h.setAttribute("y", String(t.y + t.h - H / s.scale / 2)), h.setAttribute("width", String(I)), h.setAttribute("height", String(H / s.scale)), h.setAttribute("fill", String(T)), r.textContent = `${W(t.h)}`, r.setAttribute("x", String(t.x - F - 8)), r.setAttribute("y", String(t.y + t.h / 2)), r.setAttribute("fill", String(T)), r.setAttribute("font-size", String(Q / s.scale)), r.setAttribute("text-anchor", "middle"), r.setAttribute("alignment-baseline", "middle"), r.setAttribute(
      "transform",
      `rotate(-90 ${t.x - F - 8} ${t.y + t.h / 2})`
    ), [n, o].forEach((u) => {
      u.setAttribute("stroke", T), u.setAttribute("stroke-width", String(H / s.scale));
    });
  });
}
class wt {
  constructor(e, t) {
    p(this, "g");
    p(this, "lines");
    this.g = x("g"), this.g.setAttribute("class", `${g}-resize`);
    const i = [];
    t.forEach((n) => {
      const l = f.from(n), a = x("g");
      a.setAttribute("class", `${g}-resize-line`), a.setAttribute("data-ower-id", l.id);
      const c = x("g");
      c.setAttribute("class", `${g}-resize-line-group-width`);
      const o = x("line");
      o.setAttribute("class", `${g}-resize-line-group-width-line`);
      const r = x("text");
      r.setAttribute("class", `${g}-resize-line-group-width-text`);
      const d = x("rect");
      d.setAttribute("class", `${g}-resize-line-group-width-line-start`);
      const h = x("rect");
      h.setAttribute("class", `${g}-resize-line-group-width-line-end`), c.append(o, r, d, h);
      const u = x("g");
      u.setAttribute("class", `${g}-resize-line-group-height`);
      const y = x("line");
      y.setAttribute("class", `${g}-resize-line-group-height-line`);
      const w = x("text");
      w.setAttribute("class", `${g}-resize-line-group-height-text`);
      const $ = x("rect");
      $.setAttribute("class", `${g}-resize-line-group-height-line-start`);
      const k = x("rect");
      k.setAttribute("class", `${g}-resize-line-group-height-line-end`), u.append(y, w, $, k), a.append(c, u), i.push(a);
    }), this.lines = i, this.g.append(...this.lines), e.append(this.g), this.hidden();
  }
  hidden() {
    this.lines.forEach((e) => {
      Array.from(e.children).forEach((t) => {
        t.style.display = "none";
      });
    });
  }
  reRender(e, t, i, n, l, a, c, o) {
    var q, O;
    if (!e.selected) return;
    this.hidden();
    const { widthMap: r, heightMap: d } = _(e), h = [], u = [];
    r.forEach((R, D) => {
      var C;
      R.length === 1 && R[0].nodeRect.id === ((C = e.selected) == null ? void 0 : C.dataset.id) || Math.abs(t - D) <= 3 && h.push(D);
    }), d.forEach((R, D) => {
      var C;
      R.length === 1 && R[0].nodeRect.id === ((C = e.selected) == null ? void 0 : C.dataset.id) || Math.abs(i - D) <= 3 && u.push(D);
    });
    const y = h.length === 0 ? t : Math.max(...h), w = u.length === 0 ? i : Math.max(...u), $ = Math.max(y, 10), k = Math.max(w, 10);
    if (n.includes("left")) {
      const R = l + c;
      e.selected.style.left = A(R - $);
    } else
      e.selected.style.left = A(l);
    if (e.selected.style.width = A($), n.includes("top")) {
      const R = a + o;
      e.selected.style.top = A(R - k);
    } else
      e.selected.style.top = A(a);
    e.selected.style.height = A(k);
    const S = parseFloat(e.selected.style.width), N = parseFloat(e.selected.style.height), { widthMap: v, heightMap: L } = _(e);
    (q = v.get(S)) == null || q.forEach((R) => {
      const D = this.g.querySelector(`[data-ower-id="${R.nodeRect.id}"]`), C = b(D, `${g}-resize-line-group-width`);
      C.style.display = "block";
    }), (O = L.get(N)) == null || O.forEach((R) => {
      const D = this.g.querySelector(`[data-ower-id="${R.nodeRect.id}"]`), C = b(D, `${g}-resize-line-group-height`);
      C.style.display = "block";
    });
    const M = this.g.querySelector(`[data-ower-id="${e.selected.dataset.id}"]`), B = b(M, `${g}-resize-line-group-width`), tt = b(M, `${g}-resize-line-group-height`);
    tt.style.display = "block", B.style.display = "block", pt(e), e.border.reRender(e);
  }
}
function St(s, e, t, i) {
  return t - s > 0 && i - e > 0 ? "4" : t - s < 0 && i - e > 0 ? "3" : t - s < 0 && i - e < 0 ? "2" : t - s > 0 && i - e < 0 ? "1" : "0";
}
class mt {
  constructor(e) {
    p(this, "g");
    // 选择框矩形
    p(this, "selectorRect");
    p(this, "previewRect");
    p(this, "selectedGroup", []);
    this.g = x("g"), this.g.setAttribute("class", `${g}-selector`), this.selectorRect = x("rect"), this.selectorRect.setAttribute("class", `${g}-selector-rect`), this.selectorRect.setAttribute("stroke", "#919191"), this.selectorRect.setAttribute("stroke-width", "1px"), this.selectorRect.setAttribute("fill", "rgba(255,255,255,0.3)"), this.selectorRect.style.display = "none", this.previewRect = x("rect"), this.previewRect.setAttribute("class", `${g}-selector-preview`), this.previewRect.setAttribute("stroke", "#000"), this.previewRect.setAttribute("stroke-width", "1px"), this.previewRect.setAttribute("fill", "transparent"), this.previewRect.style.display = "none", this.g.append(this.selectorRect, this.previewRect), e.append(this.g);
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
  reRender(e, t, i, n, l) {
    this.showSelector(), this.hiddenPreview(), this.selectedGroup = [];
    const a = St(t, i, n, l), c = Math.abs(t - n), o = Math.abs(i - l);
    this.selectorRect.setAttribute("width", String(c)), this.selectorRect.setAttribute("height", String(o));
    let r = t, d = i;
    switch (a) {
      case "3": {
        r = r - c;
        break;
      }
      case "2": {
        r = r - c, d = d - o;
        break;
      }
      case "1": {
        d = d - o;
        break;
      }
    }
    this.selectorRect.setAttribute("x", String(r)), this.selectorRect.setAttribute("y", String(d)), e.nodes.forEach((S) => {
      f.from(S).isIntersect({
        x: r,
        y: d,
        w: c,
        h: o
      }) && this.selectedGroup.push(S);
    });
    const h = [], u = [], y = [], w = [];
    this.selectedGroup.forEach((S) => {
      const { x: N, y: v, w: L, h: M } = f.from(S);
      h.push(N), u.push(v), y.push(N + L), w.push(v + M);
    });
    const $ = Math.min(...h), k = Math.min(...u);
    this.previewRect.setAttribute("x", String(h.length ? $ : 0)), this.previewRect.setAttribute("y", String(u.length ? k : 0)), this.previewRect.setAttribute("width", String(y.length ? Math.max(...y) - $ : 0)), this.previewRect.setAttribute("height", String(w.length ? Math.max(...w) - k : 0));
  }
}
const m = "#3875F6", X = 1, E = 10, $t = ["left", "right", "top", "bottom"];
function kt(s) {
  if (!s.selected || !s.nodes || s.nodes.length === 0)
    return;
  s.distance.left = {
    length: 1 / 0,
    node: null
  }, s.distance.right = {
    length: 1 / 0,
    node: null
  }, s.distance.top = {
    length: 1 / 0,
    node: null
  }, s.distance.bottom = {
    length: 1 / 0,
    node: null
  };
  const e = [], t = f.from(s.selected);
  s.nodes.forEach((i) => {
    if (t.node === i) return;
    const n = f.from(i);
    e.push(n);
  }), e.forEach((i) => {
    if (i.isIntersect(t)) return;
    if (i.y <= t.y + t.h && i.y + i.h >= t.y) {
      if (t.x + t.w < i.x) {
        const a = Math.abs(t.x + t.w - i.x);
        s.distance.right.length > a && (s.distance.right.length = a, s.distance.right.node = i.node);
      }
      if (t.x > i.x + i.w) {
        const a = Math.abs(t.x - i.x - i.w);
        s.distance.left.length > a && (s.distance.left.length = a, s.distance.left.node = i.node);
      }
    }
    if (i.x <= t.x + t.w && i.x + i.w >= t.x) {
      if (t.y + t.h < i.y) {
        const a = Math.abs(t.y + t.h - i.y);
        s.distance.bottom.length > a && (s.distance.bottom.length = a, s.distance.bottom.node = i.node);
      }
      if (t.y > i.y + i.h) {
        const a = Math.abs(t.y - i.y - i.h);
        s.distance.top.length > a && (s.distance.top.length = a, s.distance.top.node = i.node);
      }
    }
  });
}
function Y(s) {
  const e = [4, 8, 12, 16];
  for (const t of e)
    if (t - 2 <= s && t + 2 >= s) return t;
  return s;
}
class Et {
  constructor(e) {
    p(this, "g");
    p(this, "lines");
    p(this, "left");
    p(this, "right");
    p(this, "top");
    p(this, "bottom");
    this.g = x("g"), this.g.setAttribute("class", `${g}-distance`), this.lines = {};
    const t = (i) => {
      const n = x("g");
      n.setAttribute("class", `${g}-distance-${i}`);
      const l = x("line");
      l.setAttribute("class", `${g}-distance-${i}-line`);
      const a = x("line");
      a.setAttribute("class", `${g}-distance-${i}-dash-line`);
      const c = x("text");
      c.setAttribute("class", `${g}-distance-${i}-text`);
      const o = x("rect");
      o.setAttribute("class", `${g}-distance-${i}-text-bg`);
      const r = x("rect");
      r.setAttribute("class", `${g}-distance-${i}-line-start`);
      const d = x("rect");
      return d.setAttribute("class", `${g}-distance-${i}-line-end`), n.appendChild(l), n.appendChild(a), n.appendChild(o), n.appendChild(c), n.appendChild(r), n.appendChild(d), n;
    };
    this.left = {
      length: 1 / 0,
      node: null
    }, this.right = {
      length: 1 / 0,
      node: null
    }, this.top = {
      length: 1 / 0,
      node: null
    }, this.bottom = {
      length: 1 / 0,
      node: null
    }, $t.forEach((i) => {
      const n = t(i);
      this.lines[i] = n;
    }), this.g.append(...Object.values(this.lines)), e.append(this.g);
  }
  hidden() {
    Object.values(this.lines).forEach((e) => {
      e.setAttribute("style", "display: none;");
    });
  }
  reRender(e) {
    if (e.selected) {
      if (this.hidden(), kt(e), this.left.node && this.left.node.id !== e.selected.dataset.id) {
        if (e.align.isHAlign && !e.align.isVAlign) {
          const u = Y(this.left.length);
          u !== this.left.length && (e.selected.style.left = A(parseFloat(e.selected.style.left) - this.left.length + u), this.left.length = u, e.align.reRender(e), e.border.reRender(e));
        }
        const t = f.from(this.left.node), i = f.from(e.selected), n = b(this.lines.left, `${g}-distance-left-line`);
        n.setAttribute("x1", String(t.x + t.w)), n.setAttribute("x2", String(i.x)), n.setAttribute("y1", String(i.y + i.h / 2)), n.setAttribute("y2", String(i.y + i.h / 2)), n.setAttribute("stroke", m), n.setAttribute("stroke-width", String(X / e.scale));
        const l = b(this.lines.left, `${g}-distance-left-text`);
        l.textContent = `${W(i.x - t.x - t.w, !0)}`, l.setAttribute("x", String((t.x + t.w + i.x) / 2)), l.setAttribute(
          "y",
          String(i.y + i.h / 2 - (E + 4) / 2 / e.scale - 2 / e.scale)
        ), l.setAttribute("fill", "#FFFFFF"), l.setAttribute("font-size", String(E / e.scale)), l.setAttribute("text-anchor", "middle"), l.setAttribute("alignment-baseline", "middle");
        const a = b(this.lines.left, `${g}-distance-left-text-bg`);
        a.setAttribute(
          "x",
          String((t.x + t.w + i.x) / 2 - (l.getComputedTextLength() + 10) / 2)
        ), a.setAttribute(
          "y",
          String(i.y + i.h / 2 - E / e.scale / 2 - 12 / e.scale)
        ), a.setAttribute("width", String(l.getComputedTextLength() + 10)), a.setAttribute("height", String((E + 4) / e.scale)), a.setAttribute("fill", m), a.setAttribute("rx", "4"), a.setAttribute("ry", "4");
        const c = 1, o = 8, r = b(this.lines.left, `${g}-distance-left-line-start`);
        r.setAttribute("x", String(t.x + t.w - c / 2)), r.setAttribute("y", String(i.y + i.h / 2 - o / 2)), r.setAttribute("width", String(c)), r.setAttribute("height", String(o)), r.setAttribute("fill", m);
        const d = b(this.lines.left, `${g}-distance-left-line-end`);
        d.setAttribute("x", String(i.x - c / 2)), d.setAttribute("y", String(i.y + i.h / 2 - o / 2)), d.setAttribute("width", String(c)), d.setAttribute("height", String(o)), d.setAttribute("fill", m);
        const h = b(this.lines.left, `${g}-distance-left-dash-line`);
        i.y < t.y ? (h.setAttribute("x1", String(t.x + t.w)), h.setAttribute("x2", String(t.x + t.w)), h.setAttribute("y1", String(i.y)), h.setAttribute("y2", String(t.y)), h.setAttribute("stroke", m), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : i.y + i.h > t.y + t.h ? (h.setAttribute("x1", String(t.x + t.w)), h.setAttribute("x2", String(t.x + t.w)), h.setAttribute("y1", String(t.y + t.h)), h.setAttribute("y2", String(i.y + i.h)), h.setAttribute("stroke", m), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : h.setAttribute("style", "display: none;");
      }
      if (this.right.node && this.right.node.id !== e.selected.dataset.id) {
        if (e.align.isHAlign && !e.align.isVAlign) {
          const u = Y(this.right.length);
          u !== this.right.length && (e.selected.style.left = A(parseFloat(e.selected.style.left) + this.right.length - u), this.right.length = u, e.align.reRender(e), e.border.reRender(e));
        }
        const t = f.from(this.right.node), i = f.from(e.selected), n = b(this.lines.right, `${g}-distance-right-line`);
        n.setAttribute("x1", String(i.x + i.w)), n.setAttribute("x2", String(t.x)), n.setAttribute("y1", String(i.y + i.h / 2)), n.setAttribute("y2", String(i.y + i.h / 2)), n.setAttribute("stroke", m), n.setAttribute("stroke-width", String(X / e.scale));
        const l = b(this.lines.right, `${g}-distance-right-text`);
        l.textContent = `${W(t.x - i.x - i.w, !0)}`, l.setAttribute("x", String((i.x + i.w + t.x) / 2)), l.setAttribute("y", String(i.y + i.h / 2 - (E + 4) / 2 / e.scale - 2 / e.scale)), l.setAttribute("fill", "#FFFFFF"), l.setAttribute("font-size", String(E / e.scale)), l.setAttribute("text-anchor", "middle"), l.setAttribute("alignment-baseline", "middle");
        const a = b(this.lines.right, `${g}-distance-right-text-bg`);
        a.setAttribute(
          "x",
          String((i.x + i.w + t.x) / 2 - (l.getComputedTextLength() + 10) / 2)
        ), a.setAttribute(
          "y",
          String(i.y + i.h / 2 - E / e.scale / 2 - 12 / e.scale)
        ), a.setAttribute("width", String(l.getComputedTextLength() + 10)), a.setAttribute("height", String((E + 4) / e.scale)), a.setAttribute("fill", m), a.setAttribute("rx", "4"), a.setAttribute("ry", "4");
        const c = 1, o = 8, r = b(this.lines.right, `${g}-distance-right-line-start`);
        r.setAttribute("x", String(i.x + i.w - c / 2)), r.setAttribute("y", String(i.y + i.h / 2 - o / 2)), r.setAttribute("width", String(c)), r.setAttribute("height", String(o)), r.setAttribute("fill", m);
        const d = b(this.lines.right, `${g}-distance-right-line-end`);
        d.setAttribute("x", String(t.x - c / 2)), d.setAttribute("y", String(i.y + i.h / 2 - o / 2)), d.setAttribute("width", String(c)), d.setAttribute("height", String(o)), d.setAttribute("fill", m);
        const h = b(this.lines.right, `${g}-distance-right-dash-line`);
        i.y < t.y ? (h.setAttribute("x1", String(t.x)), h.setAttribute("x2", String(t.x)), h.setAttribute("y1", String(i.y)), h.setAttribute("y2", String(t.y)), h.setAttribute("stroke", m), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : i.y + i.h > t.y + t.h ? (h.setAttribute("x1", String(t.x)), h.setAttribute("x2", String(t.x)), h.setAttribute("y1", String(t.y + t.h)), h.setAttribute("y2", String(i.y + i.h)), h.setAttribute("stroke", m), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : h.setAttribute("style", "display: none;");
      }
      if (this.top.node && this.top.node.id !== e.selected.dataset.id) {
        if (e.align.isVAlign && !e.align.isHAlign) {
          const u = Y(this.top.length);
          u !== this.top.length && (e.selected.style.top = A(parseFloat(e.selected.style.top) - this.top.length + u), this.top.length = u, e.align.reRender(e), e.border.reRender(e));
        }
        const t = f.from(this.top.node), i = f.from(e.selected), n = b(this.lines.top, `${g}-distance-top-line`);
        n.setAttribute("x1", String(i.x + i.w / 2)), n.setAttribute("x2", String(i.x + i.w / 2)), n.setAttribute("y1", String(i.y)), n.setAttribute("y2", String(t.y + t.h)), n.setAttribute("stroke", m), n.setAttribute("stroke-width", String(X / e.scale));
        const l = b(this.lines.top, `${g}-distance-top-text`);
        l.textContent = `${W(i.y - t.h - t.y, !0)}`, l.setAttribute(
          "x",
          String(i.x + i.w / 2 + (l.getComputedTextLength() + 10) / 2 + 3 / e.scale)
        ), l.setAttribute("y", String((i.y + t.y + t.h) / 2 + 1 / e.scale)), l.setAttribute("fill", "#FFFFFF"), l.setAttribute("font-size", String(E / e.scale)), l.setAttribute("text-anchor", "middle"), l.setAttribute("alignment-baseline", "middle");
        const a = b(this.lines.top, `${g}-distance-top-text-bg`);
        a.setAttribute("x", String(i.x + i.w / 2 + 3 / e.scale)), a.setAttribute(
          "y",
          String((i.y + t.y + t.h) / 2 - (E / e.scale + 4) / 2)
        ), a.setAttribute("width", String(l.getComputedTextLength() + 10)), a.setAttribute("height", String(E / e.scale + 4)), a.setAttribute("fill", m), a.setAttribute("rx", "4"), a.setAttribute("ry", "4");
        const c = 8, o = 1, r = b(this.lines.top, `${g}-distance-top-line-start`);
        r.setAttribute("x", String(i.x + i.w / 2 - c / 2)), r.setAttribute("y", String(t.y + t.h - o / 2)), r.setAttribute("width", String(c)), r.setAttribute("height", String(o)), r.setAttribute("fill", m);
        const d = b(this.lines.top, `${g}-distance-top-line-end`);
        d.setAttribute("x", String(i.x + i.w / 2 - c / 2)), d.setAttribute("y", String(i.y - o / 2)), d.setAttribute("width", String(c)), d.setAttribute("height", String(o)), d.setAttribute("fill", m);
        const h = b(this.lines.top, `${g}-distance-top-dash-line`);
        i.x < t.x ? (h.setAttribute("x1", String(i.x)), h.setAttribute("x2", String(t.x)), h.setAttribute("y1", String(t.y + t.h)), h.setAttribute("y2", String(t.y + t.h)), h.setAttribute("stroke", m), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : i.x + i.w > t.x + t.w ? (h.setAttribute("x1", String(t.x + t.w)), h.setAttribute("x2", String(i.x + i.w)), h.setAttribute("y1", String(t.y + t.h)), h.setAttribute("y2", String(t.y + t.h)), h.setAttribute("stroke", m), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : h.setAttribute("style", "display: none;");
      }
      if (this.bottom.node && this.bottom.node.id !== e.selected.dataset.id) {
        if (e.align.isVAlign && !e.align.isHAlign) {
          const y = Y(this.bottom.length);
          y !== this.bottom.length && (e.selected.style.top = A(parseFloat(e.selected.style.top) + this.bottom.length - y), this.bottom.length = y, e.align.reRender(e), e.border.reRender(e));
        }
        const t = f.from(this.bottom.node), i = f.from(e.selected), n = b(this.lines.bottom, `${g}-distance-bottom-line`);
        n.setAttribute("x1", String(i.x + i.w / 2)), n.setAttribute("x2", String(i.x + i.w / 2)), n.setAttribute("y1", String(i.y + i.h)), n.setAttribute("y2", String(t.y)), n.setAttribute("stroke", m), n.setAttribute("stroke-width", String(X / e.scale));
        const l = b(this.lines.bottom, `${g}-distance-bottom-text`);
        l.textContent = `${W(t.y - i.y - i.h, !0)}`;
        const a = i.x + i.w / 2 + (l.getComputedTextLength() + 10) / 2 + 3 / e.scale;
        l.setAttribute("x", String(a)), l.setAttribute("y", String((i.y + i.h + t.y) / 2 + 1 / e.scale)), l.setAttribute("fill", "#FFFFFF"), l.setAttribute("font-size", String(E / e.scale)), l.setAttribute("text-anchor", "middle"), l.setAttribute("alignment-baseline", "middle");
        const c = b(this.lines.bottom, `${g}-distance-bottom-text-bg`);
        c.setAttribute("x", String(i.x + i.w / 2 + 3 / e.scale)), c.setAttribute(
          "y",
          String((i.y + i.h + t.y) / 2 - (E / e.scale + 4) / 2)
        ), c.setAttribute("width", String(l.getComputedTextLength() + 10)), c.setAttribute("height", String(E / e.scale + 4)), c.setAttribute("fill", m), c.setAttribute("rx", "4"), c.setAttribute("ry", "4");
        const o = 8, r = 1, d = b(this.lines.bottom, `${g}-distance-bottom-line-start`);
        d.setAttribute("x", String(i.x + i.w / 2 - o / 2)), d.setAttribute("y", String(i.y + i.h - r / 2)), d.setAttribute("width", String(o)), d.setAttribute("height", String(r)), d.setAttribute("fill", m);
        const h = b(this.lines.bottom, `${g}-distance-bottom-line-end`);
        h.setAttribute("x", String(i.x + i.w / 2 - o / 2)), h.setAttribute("y", String(t.y - r / 2)), h.setAttribute("width", String(o)), h.setAttribute("height", String(r)), h.setAttribute("fill", m);
        const u = b(this.lines.bottom, `${g}-distance-bottom-dash-line`);
        i.x < t.x ? (u.setAttribute("x1", String(i.x)), u.setAttribute("x2", String(t.x)), u.setAttribute("y1", String(t.y)), u.setAttribute("y2", String(t.y)), u.setAttribute("stroke", m), u.setAttribute("stroke-width", "1"), u.setAttribute("stroke-dasharray", "4 4"), u.setAttribute("style", "display: block;")) : i.x + i.w > t.x + t.w ? (u.setAttribute("x1", String(t.x + t.w)), u.setAttribute("x2", String(i.x + i.w)), u.setAttribute("y1", String(t.y)), u.setAttribute("y2", String(t.y)), u.setAttribute("stroke", m), u.setAttribute("stroke-width", "1"), u.setAttribute("stroke-dasharray", "4 4"), u.setAttribute("style", "display: block;")) : u.setAttribute("style", "display: none;");
      }
      e.align.isHAlign && (V(this.left.length, this.right.length) ? (this.lines.left.style = "display: block;", this.lines.right.style = "display: block;") : this.left.length > this.right.length ? this.lines.right.style = "display: block;" : this.lines.left.style = "display: block;"), e.align.isVAlign && (V(this.top.length, this.bottom.length) ? (this.lines.top.style = "display: block;", this.lines.bottom.style = "display: block;") : this.top.length > this.bottom.length ? this.lines.bottom.style = "display: block;" : this.lines.top.style = "display: block;");
    }
  }
}
function vt(s) {
  const e = /* @__PURE__ */ new Map();
  function t(a) {
    var o;
    const c = [];
    a.toSorted((r, d) => r.x - d.x).forEach((r) => {
      c.push({ value: r.x, type: "min", nodeRect: r }), c.push({ value: r.x + r.w, type: "max", nodeRect: r });
    }), c.sort((r, d) => r.value - d.value);
    for (let r = 0; r < c.length - 1; r++) {
      const d = [], h = [];
      if (c[r].type === "max" && c[r + 1].type === "min") {
        for (let w = 0; w <= r && c[r].value === c[r - w].value; w++)
          d.push(c[r - w]);
        for (let w = r + 1; w <= c.length && c[r + 1].value === c[w].value; w++)
          h.push(c[w]);
        const u = h[0].value - d[0].value, y = d[0].nodeRect.x + d[0].nodeRect.w;
        if (u > 0) {
          const w = Math.min(...d.map((S) => S.nodeRect.y), ...h.map((S) => S.nodeRect.y)), $ = Math.max(
            ...d.map((S) => S.nodeRect.y + S.nodeRect.h),
            ...h.map((S) => S.nodeRect.y + S.nodeRect.h)
          ), k = {
            x: y,
            y: w,
            w: u,
            h: $ - w,
            rect1: d.map((S) => S.nodeRect),
            rect2: h.map((S) => S.nodeRect)
          };
          e.has(u) ? (o = e.get(u)) == null || o.push(k) : e.set(u, [k]);
        }
      }
    }
  }
  const i = [], n = f.from(s.selected);
  s.nodes.forEach((a) => {
    const c = f.from(a);
    i.push(c);
  }), i.sort((a, c) => a.x - c.x);
  const l = [];
  return i.forEach((a) => {
    (a.y <= n.y && a.y + a.h >= n.y || a.y <= n.y + n.h / 2 && a.y + a.h >= n.y + n.h / 2 || a.y <= n.y + n.h && a.y + a.h >= n.y + n.h) && l.push(a);
  }), t(l), e;
}
class Rt {
  constructor(e) {
    p(this, "g");
    this.g = x("g"), this.g.setAttribute("class", `${g}-gap`), e.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(e) {
    if (!e.selected) return;
    this.clear();
    const { left: t, right: i, top: n, bottom: l } = e.distance, a = f.from(e.selected), c = (o) => o < 0 ? 0 : o;
    if (t.node && i.node && e.align.isHAlign && !e.align.isVAlign) {
      const o = f.from(i.node), r = f.from(t.node), d = (o.x - r.x - r.w - a.w) / 2;
      Math.abs(a.x - r.x - r.w - d) <= 3 && (e.selected.style.left = A(r.x + r.w + d), a.sync());
    }
    if (n.node && l.node && !e.align.isHAlign && e.align.isVAlign) {
      const o = f.from(l.node), r = f.from(n.node), d = (o.y - r.y - r.h - a.h) / 2;
      Math.abs(a.y - r.y - r.h - d) <= 3 && (e.selected.style.top = A(r.y + r.h + d), a.sync());
    }
    if (e.align.reRender(e), e.distance.reRender(e), e.border.reRender(e), e.align.isHAlign) {
      const o = [], r = vt(e), d = e.distance.left.length > e.distance.right.length ? i : t;
      if (d.node) {
        const h = f.from(d.node);
        r.forEach((u, y) => {
          if (Math.abs(d.length - y) <= 3 || y <= 20 && Math.abs(d.length - y) <= 4) {
            if ([...u.map(($) => $.rect1.concat($.rect2))].flat().some(($) => {
              var k;
              return $.id === ((k = e.selected) == null ? void 0 : k.dataset.id);
            })) {
              o.push(...u);
              return;
            }
            d.length === i.length ? (e.selected.style.left = A(h.x - y - a.w), e.distance.left.length = y, o.push(...u), a.sync()) : d.length === t.length && (e.selected.style.left = A(h.x + h.w + y), e.distance.right.length = y, o.push(...u), a.sync()), e.align.reRender(e), e.distance.reRender(e), e.border.reRender(e);
          }
        }), o.length > 1 && o.forEach((u) => {
          const y = x("rect");
          y.setAttribute("x", String(u.x)), y.setAttribute("y", String(u.y)), y.setAttribute(
            "width",
            String(
              d.length === i.length ? c(h.x - a.x - a.w) : c(a.x - h.x - h.w)
            )
          ), y.setAttribute("height", String(u.h)), y.setAttribute("fill", "red"), y.setAttribute("opacity", "0.3"), d.length === i.length && y.setAttribute("width", String(c(h.x - a.x - a.w))), d.length === t.length && y.setAttribute("width", String(c(a.x - h.x - h.w))), this.g.append(y);
        });
      }
    }
  }
}
const Lt = (s, e) => {
  const t = x("svg");
  t.setAttribute("class", `${g}-svg`);
  const i = s.getBoundingClientRect();
  return t.setAttribute("width", A(i.width)), t.setAttribute("height", A(i.height)), t.style = "position: absolute; inset: 0;", s.className += ` ${g}-container`, e.forEach((n) => {
    n.className += ` ${g}-movable-node`, n.setAttribute("data-id", ct()), /%$/.test(n.style.top) && (n.style.top = A(i.width * parseFloat(n.style.top) / 100)), /%$/.test(n.style.left) && (n.style.left = A(i.height * parseFloat(n.style.left) / 100)), /%$/.test(n.style.width) && (n.style.width = A(i.width * parseFloat(n.style.width) / 100)), /%$/.test(n.style.height) && (n.style.height = A(i.height * parseFloat(n.style.height) / 100));
  }), {
    container: s,
    nodes: e,
    svg: t,
    selected: null,
    scale: 1,
    scaleRange: [0.5, 2],
    translateX: 0,
    translateY: 0,
    setSelected(n) {
      if (this.selected = n, !n) {
        this.border.hidden();
        return;
      }
      this.border.reRender(this), this.searchError();
    },
    searchError() {
      if (!this.selected) return;
      const n = f.from(this.selected);
      n.error = !1;
      for (let l = 0; l < this.nodes.length; l++) {
        const a = this.nodes[l];
        if (a === this.selected) continue;
        const c = f.from(a);
        n.isIntersect(c) ? (n.error = !0, c.error = !0, this.align.hidden(), this.distance.hidden()) : c.error = !1;
      }
    },
    gap: new Rt(t),
    align: new bt(t),
    distance: new Et(t),
    border: new xt(t),
    resize: new wt(t, e),
    selector: new mt(t)
  };
};
class Ft {
  constructor(e, t) {
    p(this, "store");
    this.store = Lt(e, t), lt(this.store);
  }
  mount() {
    this.store.container.append(this.store.svg);
  }
  unmount() {
    this.store.svg.remove();
  }
  align(e) {
    const { selected: t, container: i } = this.store;
    if (!t) return;
    const n = i.getBoundingClientRect(), l = f.from(t);
    switch (e) {
      case "start":
        t.style.left = A(0);
        break;
      case "center":
        t.style.left = A(n.width / 2 - l.w / 2);
        break;
      case "end":
        t.style.left = A(n.width - l.w);
        break;
    }
  }
}
export {
  Ft as default
};
