var et = Object.defineProperty;
var it = (s, e, t) => e in s ? et(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var f = (s, e, t) => it(s, typeof e != "symbol" ? e + "" : e, t);
const d = "__freemove";
class y {
  constructor({ x: e, y: t, h: i, w: n, node: r }) {
    f(this, "x");
    f(this, "y");
    f(this, "w");
    f(this, "h");
    f(this, "id");
    f(this, "node");
    this.x = e, this.y = t, this.h = i, this.w = n, this.node = r, this.id = r.dataset.id;
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
    const t = this.x + 0, i = this.y + 0, n = this.x + this.w - 0, r = this.y + this.h - 0, l = e.x, o = e.y, c = e.x + e.w, a = e.y + e.h;
    return !(n < l || t > c || r < o || i > a);
  }
  // 从dom元素的style构建Rect对象
  static from(e) {
    return new y({
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
  const t = s.canvas.getBoundingClientRect();
  s.selected.dataset.error === "false" && (s.align.reRender(s), s.distance.reRender(s), s.gap.reRender(s)), s.border.reRender(s);
  const i = s.selected.getBoundingClientRect();
  let n = (e.clientX - i.left) / s.scale, r = (e.clientY - i.top) / s.scale, l = null;
  function o(a) {
    l || (l = requestAnimationFrame(() => {
      if (!s.selected) return;
      let g = (a.clientX - t.left) / s.scale - n, h = (a.clientY - t.top) / s.scale - r;
      const u = s.canvas.clientWidth - s.selected.offsetWidth, S = s.canvas.clientHeight - s.selected.offsetHeight;
      g = Math.max(0, Math.min(g, u)), h = Math.max(0, Math.min(h, S)), s.selected.style.left = A(g), s.selected.style.top = A(h), s.searchError(), s.selected.dataset.error === "false" && (s.align.reRender(s), s.distance.reRender(s), s.gap.reRender(s)), s.border.reRender(s), l = null;
    }));
  }
  function c() {
    document.removeEventListener("pointermove", o), document.removeEventListener("pointerup", c), s.align.hidden(), s.distance.hidden(), s.gap.clear(), l !== null && (cancelAnimationFrame(l), l = null);
  }
  document.addEventListener("pointermove", o), document.addEventListener("pointerup", c);
}
function nt(s, e) {
  if (!s.selected) return;
  const t = s.canvas.getBoundingClientRect(), n = e.target.dataset.direction;
  if (!n) return;
  const r = y.from(s.selected);
  let l = e.clientX, o = e.clientY, c = r.w, a = r.h, g = r.x, h = r.y;
  const u = t.width, S = t.height;
  function m(R) {
    let M = (R.clientX - l) / s.scale, N = (R.clientY - o) / s.scale, k = c, E = a, L = g, H = h;
    n.includes("right") && (k = c + M), n.includes("left") && (k = c - M, L = g + M), n.includes("bottom") && (E = a + N), n.includes("top") && (E = a - N, H = h + N), L < 0 && (k += L, L = 0), H < 0 && (E += H, H = 0), L + k > u / s.scale && (k = u / s.scale - L), H + E > S / s.scale && (E = S / s.scale - H), k = Math.max(k, 10), E = Math.max(E, 10), s.resize.reRender(s, k, E, n, g, h, c, a), s.border.reRender(s);
  }
  function $() {
    s.resize.hidden(), document.removeEventListener("pointermove", m), document.removeEventListener("pointerup", $);
  }
  document.addEventListener("pointermove", m), document.addEventListener("pointerup", $);
}
function rt(s, e) {
  const t = s.canvas.getBoundingClientRect(), i = (e.clientX - t.left) / s.scale, n = (e.clientY - t.top) / s.scale;
  function r(o) {
    const c = (o.clientX - t.left) / s.scale, a = (o.clientY - t.top) / s.scale;
    s.selector.reRender(s, i, n, c, a), s.selector.showPreview();
  }
  function l() {
    s.selector.hiddenSelector(), document.removeEventListener("pointermove", r), document.removeEventListener("pointerup", l);
  }
  document.addEventListener("pointermove", r), document.addEventListener("pointerup", l);
}
function lt(s) {
  s.svg.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    const t = e.target;
    if (t.classList[0].includes(`${d}-border-point-`)) {
      const i = t.dataset.ownerId;
      for (let n = 0; n < s.nodes.length; n++)
        i === s.nodes[n].dataset.ownerId && s.setSelected(s.nodes[n]);
      s.selected && nt(s, e);
      return;
    }
    if (t.classList.contains(`${d}-svg`)) {
      let i = null;
      for (const n of s.nodes) {
        const r = y.from(n);
        if (r.isInSide({ x: e.offsetX, y: e.offsetY })) {
          i = r;
          break;
        }
      }
      i && i.node.classList.contains(`${d}-movable-node`) && (s.selector.hiddenPreview(), s.setSelected(i.node), s.searchError(), st(s, e)), i || (s.border.hidden(), s.selected = null, rt(s, e));
    }
  }), s.board.addEventListener("wheel", (e) => {
    e.preventDefault();
    const [t, i] = s.scaleRange;
    function n() {
      s.canvas.style.transform = `translate(${s.translateX}px, ${s.translateY}px) scale(${s.scale})`, s.canvas.style.transformOrigin = "0 0", s.border.reRender(s);
    }
    if (e.ctrlKey) {
      const r = s.canvas.getBoundingClientRect(), l = e.clientX - r.left, o = e.clientY - r.top, c = l / s.scale, a = o / s.scale;
      let g = e.deltaY * -0.01, h = s.scale + g;
      h = Math.max(t, Math.min(i, h)), s.scale = h;
      const u = l / s.scale, S = o / s.scale, m = (u - c) * s.scale, $ = (S - a) * s.scale;
      s.translateX += m, s.translateY += $, s.scale = h, n();
    } else
      s.translateX -= e.deltaX, s.translateY -= e.deltaY, n();
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
function q(s, e) {
  const t = y.from(s.selected), i = s.nodes.filter((n) => n !== s.selected).map((n) => y.from(n));
  P.forEach((n) => e.alternateNodes[n] = []), i.forEach((n) => {
    if (t.isIntersect(n)) return;
    const r = ot(t);
    P.forEach((l) => {
      let o = 1e4, c = 1e4, a;
      /^h/.test(l) && (t.x > n.x + n.w ? (o = t.x + t.w, c = n.x) : t.x + t.w < n.x ? (o = t.x, c = n.x + n.w) : (o = Math.min(t.x, n.x), c = Math.max(t.x + t.w, n.x + n.w)), [n.y, n.y + n.h / 2, n.y + n.h].forEach((g) => {
        a = Math.abs(r[l] - g), a <= 3 && e.alternateNodes[l].push({
          type: l,
          source: o,
          target: c,
          absorbDistance: a,
          absorbPosition: g,
          nodeRects: [n]
        });
      })), /^v/.test(l) && (t.y > n.y + n.h ? (o = t.y + t.h, c = n.y) : t.y + t.h < n.y ? (o = t.y, c = n.y + n.h) : (o = Math.min(t.y, n.y), c = Math.max(t.y + t.h, n.y + n.h)), [n.x, n.x + n.w / 2, n.x + n.w].forEach((g) => {
        a = Math.abs(r[l] - g), a <= 3 && e.alternateNodes[l].push({
          type: l,
          source: o,
          target: c,
          absorbDistance: a,
          absorbPosition: g,
          nodeRects: [n]
        });
      }));
    });
  }), P.forEach((n) => {
    const r = /* @__PURE__ */ new Map();
    e.alternateNodes[n].forEach((c) => {
      const a = r.get(c.absorbDistance) || [];
      a.push(c), r.set(c.absorbDistance, a);
    });
    let l = 1 / 0, o = 0;
    r.forEach((c) => {
      c.forEach((a) => {
        l = Math.min(l, a.source, a.target), o = Math.max(o, a.source, a.target);
      });
    }), r.forEach((c) => {
      c.forEach((a) => {
        a.source = l, a.target = o;
      });
    }), e.alternateNodes[n] = Array.from(r.values()).flat();
  });
}
function dt(s, e, t) {
  const { absorbPosition: i, type: n } = t, r = s.selected;
  switch (n) {
    case "ht":
      r.style.top = A(i);
      break;
    case "hc":
      r.style.top = A(i - parseFloat(r.style.height) / 2);
      break;
    case "hb":
      r.style.top = A(i - parseFloat(r.style.height));
      break;
    case "vl":
      r.style.left = A(i);
      break;
    case "vc":
      r.style.left = A(i - parseFloat(r.style.width) / 2);
      break;
    case "vr":
      r.style.left = A(i - parseFloat(r.style.width));
      break;
  }
  q(s, e), s.border.reRender(s);
}
function gt(s, e) {
  if (!s.selected) return;
  const t = s.canvas.getBoundingClientRect(), i = y.from(s.selected), n = t.width / s.scale / 2;
  Math.abs(i.x + i.w / 2 - n) <= 3 && (s.selected.style.left = A(n - i.w / 2), e.showContainerAlignLine = !0), q(s, e), s.border.reRender(s);
}
function ut(s, e) {
  if (!s.selected) return;
  const t = s.canvas.getBoundingClientRect(), i = y.from(s.selected), n = Object.values(e.alternateNodes).flat();
  if ([...e.alternateNodes.hb, ...e.alternateNodes.hc, ...e.alternateNodes.ht].length === 0 ? e.isHAlign = !1 : e.isHAlign = !0, [...e.alternateNodes.vc, ...e.alternateNodes.vl, ...e.alternateNodes.vr].length === 0 ? e.isVAlign = !1 : e.isVAlign = !0, n.forEach((r) => {
    const { source: l, target: o, type: c } = r, a = e.lines[c];
    if (/^h/.test(c))
      switch (a == null || a.setAttribute("x1", String(l)), a == null || a.setAttribute("x2", String(o)), c) {
        case "ht":
          a.setAttribute("y1", String(i.y)), a.setAttribute("y2", String(i.y));
          break;
        case "hc":
          a.setAttribute("y1", String(i.y + i.h / 2)), a.setAttribute("y2", String(i.y + i.h / 2));
          break;
        case "hb":
          a.setAttribute("y1", String(i.y + i.h)), a.setAttribute("y2", String(i.y + i.h));
          break;
      }
    if (/^v/.test(c))
      switch (a == null || a.setAttribute("y1", String(l)), a == null || a.setAttribute("y2", String(o)), c) {
        case "vl":
          a.setAttribute("x1", String(i.x)), a.setAttribute("x2", String(i.x));
          break;
        case "vc":
          a.setAttribute("x1", String(i.x + i.w / 2)), a.setAttribute("x2", String(i.x + i.w / 2));
          break;
        case "vr":
          a.setAttribute("x1", String(i.x + i.w)), a.setAttribute("x2", String(i.x + i.w));
          break;
      }
    a.setAttribute("stroke-width", String(U / s.scale)), a == null || a.setAttribute("style", "display: 'block");
  }), e.showContainerAlignLine) {
    const r = e.lines.vertical;
    r.setAttribute("x1", String(t.width / s.scale / 2)), r.setAttribute("y1", String(0)), r.setAttribute("x2", String(t.width / s.scale / 2)), r.setAttribute("y2", String(t.height / s.scale)), r.setAttribute("stroke-width", String(U / s.scale)), r == null || r.setAttribute("style", "display: 'block");
  }
}
class bt {
  constructor(e) {
    f(this, "g");
    f(this, "lines");
    f(this, "isHAlign", !1);
    f(this, "isVAlign", !1);
    f(this, "alternateNodes", {
      ht: [],
      hc: [],
      hb: [],
      vl: [],
      vc: [],
      vr: []
    });
    f(this, "showContainerAlignLine", !1);
    this.g = x("g"), this.g.setAttribute("class", `${d}-align`), this.lines = {}, [...P, "vertical"].forEach((t) => {
      const i = x("line");
      i.setAttribute("class", `${d}-align-${t}`), i.setAttribute("stroke", ht), i.style.display = "none", this.g.append(i), this.lines[t] = i;
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
    }, this.showContainerAlignLine = !1, q(e, this), Object.values(this.alternateNodes).flat().forEach((i) => {
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
], At = [
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
  const s = [], e = [];
  return J.forEach((t) => {
    const i = x("line");
    i.setAttribute("class", `${d}-border-line-${t}`), i.setAttribute("stroke", K), e.push(i);
  }), Z.forEach((t, i) => {
    const n = x("rect");
    n.setAttribute("class", `${d}-border-point-${t}`), n.setAttribute("fill", "white"), n.setAttribute("stroke", K), n.setAttribute("style", `cursor: ${At[i]}`), n.setAttribute("data-direction", t), s.push(n);
  }), [s, e];
}
function ft(s, e) {
  const t = y.from(e.selected);
  J.forEach((i) => {
    const n = b(s, `${d}-border-line-${i}`);
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
    const r = b(s, `${d}-border-point-${i}`);
    r.setAttribute("data-owner-id", e.selected.dataset.id), r.setAttribute("stroke-width", A(z / e.scale)), r.setAttribute("width", A(G / e.scale)), r.setAttribute("height", A(G / e.scale));
    const l = G / e.scale / 2;
    switch (i) {
      case "left-top":
        r.setAttribute("x", String(t.x - l)), r.setAttribute("y", String(t.y - l));
        break;
      case "top":
        r.setAttribute("x", String(t.x + t.w / 2 - l)), r.setAttribute("y", String(t.y - l));
        break;
      case "right-top":
        r.setAttribute("x", String(t.x + t.w - l)), r.setAttribute("y", String(t.y - l));
        break;
      case "right":
        r.setAttribute("x", String(t.x + t.w - l)), r.setAttribute("y", String(t.y + t.h / 2 - l));
        break;
      case "right-bottom":
        r.setAttribute("x", String(t.x + t.w - l)), r.setAttribute("y", String(t.y + t.h - l));
        break;
      case "bottom":
        r.setAttribute("x", String(t.x + t.w / 2 - l)), r.setAttribute("y", String(t.y + t.h - l));
        break;
      case "left-bottom":
        r.setAttribute("x", String(t.x - l)), r.setAttribute("y", String(t.y + t.h - l));
        break;
      case "left":
        r.setAttribute("x", String(t.x - l)), r.setAttribute("y", String(t.y + t.h / 2 - l));
        break;
    }
  });
}
class xt {
  constructor(e) {
    f(this, "g");
    f(this, "points");
    f(this, "lines");
    this.g = x("g"), this.g.setAttribute("class", `${d}-border`), e.append(this.g);
    const [t, i] = yt();
    this.points = t, this.lines = i, this.g.append(...i, ...t), this.g.style.display = "none";
  }
  hidden() {
    this.g.style.display = "none";
  }
  reRender(e) {
    e.selected && (this.g.style.display = "block", ft(this.g, e));
  }
}
const B = 1, T = "#2A63F4", F = 8, I = 10, Q = 10;
function _(s) {
  const e = s.nodes.map((n) => y.from(n)), t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  return e.forEach((n) => {
    var o, c;
    const r = {
      type: "width",
      nodeRect: n
    }, l = {
      type: "height",
      nodeRect: n
    };
    t.has(n.w) ? (o = t.get(n.w)) == null || o.push(r) : t.set(n.w, [r]), i.has(n.h) ? (c = i.get(n.h)) == null || c.push(l) : i.set(n.h, [l]);
  }), {
    widthMap: t,
    heightMap: i
  };
}
function pt(s) {
  s.nodes.forEach((e) => {
    const t = y.from(e), i = s.resize.g.querySelector(`[data-ower-id="${t.id}"]`), n = b(i, `${d}-resize-line-group-width-line`), r = b(i, `${d}-resize-line-group-width-line-start`), l = b(i, `${d}-resize-line-group-width-line-end`), o = b(i, `${d}-resize-line-group-width-text`), c = b(i, `${d}-resize-line-group-height-line`), a = b(i, `${d}-resize-line-group-height-text`), g = b(i, `${d}-resize-line-group-height-line-start`), h = b(i, `${d}-resize-line-group-height-line-end`);
    n.setAttribute("x1", String(t.x)), n.setAttribute("y1", String(t.y - F)), n.setAttribute("x2", String(t.x + t.w)), n.setAttribute("y2", String(t.y - F)), r.setAttribute("x", String(t.x - B / s.scale / 2)), r.setAttribute("y", String(t.y - F - I / s.scale / 2)), r.setAttribute("width", String(B / s.scale)), r.setAttribute("height", String(I)), r.setAttribute("fill", String(T)), l.setAttribute("x", String(t.x + t.w - B / s.scale / 2)), l.setAttribute("y", String(t.y - F - I / s.scale / 2)), l.setAttribute("width", String(B / s.scale)), l.setAttribute("height", String(I)), l.setAttribute("fill", String(T)), o.textContent = `${W(t.w)}`, o.setAttribute("x", String(t.x + t.w / 2)), o.setAttribute("y", String(t.y - F - 8)), o.setAttribute("fill", String(T)), o.setAttribute("font-size", String(Q / s.scale)), o.setAttribute("text-anchor", "middle"), o.setAttribute("alignment-baseline", "middle"), c.setAttribute("x1", String(t.x - F)), c.setAttribute("y1", String(t.y)), c.setAttribute("x2", String(t.x - F)), c.setAttribute("y2", String(t.y + t.h)), g.setAttribute("x", String(t.x - F - I / s.scale / 2)), g.setAttribute("y", String(t.y - B / s.scale / 2)), g.setAttribute("width", String(I)), g.setAttribute("height", String(B / s.scale)), g.setAttribute("fill", String(T)), h.setAttribute("x", String(t.x - F - I / s.scale / 2)), h.setAttribute("y", String(t.y + t.h - B / s.scale / 2)), h.setAttribute("width", String(I)), h.setAttribute("height", String(B / s.scale)), h.setAttribute("fill", String(T)), a.textContent = `${W(t.h)}`, a.setAttribute("x", String(t.x - F - 8)), a.setAttribute("y", String(t.y + t.h / 2)), a.setAttribute("fill", String(T)), a.setAttribute("font-size", String(Q / s.scale)), a.setAttribute("text-anchor", "middle"), a.setAttribute("alignment-baseline", "middle"), a.setAttribute(
      "transform",
      `rotate(-90 ${t.x - F - 8} ${t.y + t.h / 2})`
    ), [n, c].forEach((u) => {
      u.setAttribute("stroke", T), u.setAttribute("stroke-width", String(B / s.scale));
    });
  });
}
class St {
  constructor(e, t) {
    f(this, "g");
    f(this, "lines");
    this.g = x("g"), this.g.setAttribute("class", `${d}-resize`);
    const i = [];
    t.forEach((n) => {
      const r = y.from(n), l = x("g");
      l.setAttribute("class", `${d}-resize-line`), l.setAttribute("data-ower-id", r.id);
      const o = x("g");
      o.setAttribute("class", `${d}-resize-line-group-width`);
      const c = x("line");
      c.setAttribute("class", `${d}-resize-line-group-width-line`);
      const a = x("text");
      a.setAttribute("class", `${d}-resize-line-group-width-text`);
      const g = x("rect");
      g.setAttribute("class", `${d}-resize-line-group-width-line-start`);
      const h = x("rect");
      h.setAttribute("class", `${d}-resize-line-group-width-line-end`), o.append(c, a, g, h);
      const u = x("g");
      u.setAttribute("class", `${d}-resize-line-group-height`);
      const S = x("line");
      S.setAttribute("class", `${d}-resize-line-group-height-line`);
      const m = x("text");
      m.setAttribute("class", `${d}-resize-line-group-height-text`);
      const $ = x("rect");
      $.setAttribute("class", `${d}-resize-line-group-height-line-start`);
      const R = x("rect");
      R.setAttribute("class", `${d}-resize-line-group-height-line-end`), u.append(S, m, $, R), l.append(o, u), i.push(l);
    }), this.lines = i, this.g.append(...this.lines), e.append(this.g), this.hidden();
  }
  hidden() {
    this.lines.forEach((e) => {
      Array.from(e.children).forEach((t) => {
        t.style.display = "none";
      });
    });
  }
  reRender(e, t, i, n, r, l, o, c) {
    var O, j;
    if (!e.selected) return;
    this.hidden();
    const { widthMap: a, heightMap: g } = _(e), h = [], u = [];
    a.forEach((v, C) => {
      var D;
      v.length === 1 && v[0].nodeRect.id === ((D = e.selected) == null ? void 0 : D.dataset.id) || Math.abs(t - C) <= 3 && h.push(C);
    }), g.forEach((v, C) => {
      var D;
      v.length === 1 && v[0].nodeRect.id === ((D = e.selected) == null ? void 0 : D.dataset.id) || Math.abs(i - C) <= 3 && u.push(C);
    });
    const S = h.length === 0 ? t : Math.max(...h), m = u.length === 0 ? i : Math.max(...u), $ = Math.max(S, 10), R = Math.max(m, 10);
    if (n.includes("left")) {
      const v = r + o;
      e.selected.style.left = A(v - $);
    } else
      e.selected.style.left = A(r);
    if (e.selected.style.width = A($), n.includes("top")) {
      const v = l + c;
      e.selected.style.top = A(v - R);
    } else
      e.selected.style.top = A(l);
    e.selected.style.height = A(R);
    const M = parseFloat(e.selected.style.width), N = parseFloat(e.selected.style.height), { widthMap: k, heightMap: E } = _(e);
    (O = k.get(M)) == null || O.forEach((v) => {
      const C = this.g.querySelector(`[data-ower-id="${v.nodeRect.id}"]`), D = b(C, `${d}-resize-line-group-width`);
      D.style.display = "block";
    }), (j = E.get(N)) == null || j.forEach((v) => {
      const C = this.g.querySelector(`[data-ower-id="${v.nodeRect.id}"]`), D = b(C, `${d}-resize-line-group-height`);
      D.style.display = "block";
    });
    const L = this.g.querySelector(`[data-ower-id="${e.selected.dataset.id}"]`), H = b(L, `${d}-resize-line-group-width`), tt = b(L, `${d}-resize-line-group-height`);
    tt.style.display = "block", H.style.display = "block", pt(e), e.border.reRender(e);
  }
}
function wt(s, e, t, i) {
  return t - s > 0 && i - e > 0 ? "4" : t - s < 0 && i - e > 0 ? "3" : t - s < 0 && i - e < 0 ? "2" : t - s > 0 && i - e < 0 ? "1" : "0";
}
class mt {
  constructor(e) {
    f(this, "g");
    // 选择框矩形
    f(this, "selectorRect");
    f(this, "previewRect");
    f(this, "selectedGroup", []);
    this.g = x("g"), this.g.setAttribute("class", `${d}-selector`), this.selectorRect = x("rect"), this.selectorRect.setAttribute("class", `${d}-selector-rect`), this.selectorRect.setAttribute("stroke", "#919191"), this.selectorRect.setAttribute("stroke-width", "1px"), this.selectorRect.setAttribute("fill", "rgba(255,255,255,0.3)"), this.selectorRect.style.display = "none", this.previewRect = x("rect"), this.previewRect.setAttribute("class", `${d}-selector-preview`), this.previewRect.setAttribute("stroke", "#000"), this.previewRect.setAttribute("stroke-width", "1px"), this.previewRect.setAttribute("fill", "transparent"), this.previewRect.style.display = "none", this.g.append(this.selectorRect, this.previewRect), e.append(this.g);
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
  reRender(e, t, i, n, r) {
    this.showSelector(), this.hiddenPreview(), this.selectedGroup = [];
    const l = wt(t, i, n, r), o = Math.abs(t - n), c = Math.abs(i - r);
    this.selectorRect.setAttribute("width", String(o)), this.selectorRect.setAttribute("height", String(c));
    let a = t, g = i;
    switch (l) {
      case "3": {
        a = a - o;
        break;
      }
      case "2": {
        a = a - o, g = g - c;
        break;
      }
      case "1": {
        g = g - c;
        break;
      }
    }
    this.selectorRect.setAttribute("x", String(a)), this.selectorRect.setAttribute("y", String(g)), e.nodes.forEach((M) => {
      y.from(M).isIntersect({
        x: a,
        y: g,
        w: o,
        h: c
      }) && this.selectedGroup.push(M);
    });
    const h = [], u = [], S = [], m = [];
    this.selectedGroup.forEach((M) => {
      const { x: N, y: k, w: E, h: L } = y.from(M);
      h.push(N), u.push(k), S.push(N + E), m.push(k + L);
    });
    const $ = Math.min(...h), R = Math.min(...u);
    this.previewRect.setAttribute("x", String(h.length ? $ : 0)), this.previewRect.setAttribute("y", String(u.length ? R : 0)), this.previewRect.setAttribute("width", String(S.length ? Math.max(...S) - $ : 0)), this.previewRect.setAttribute("height", String(m.length ? Math.max(...m) - R : 0));
  }
}
const p = "#3875F6", X = 1, w = 10, $t = ["left", "right", "top", "bottom"];
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
  const e = [], t = y.from(s.selected);
  s.nodes.forEach((i) => {
    if (t.node === i) return;
    const n = y.from(i);
    e.push(n);
  }), e.forEach((i) => {
    if (i.isIntersect(t)) return;
    if (i.y <= t.y + t.h && i.y + i.h >= t.y) {
      if (t.x + t.w < i.x) {
        const l = Math.abs(t.x + t.w - i.x);
        s.distance.right.length > l && (s.distance.right.length = l, s.distance.right.node = i.node);
      }
      if (t.x > i.x + i.w) {
        const l = Math.abs(t.x - i.x - i.w);
        s.distance.left.length > l && (s.distance.left.length = l, s.distance.left.node = i.node);
      }
    }
    if (i.x <= t.x + t.w && i.x + i.w >= t.x) {
      if (t.y + t.h < i.y) {
        const l = Math.abs(t.y + t.h - i.y);
        s.distance.bottom.length > l && (s.distance.bottom.length = l, s.distance.bottom.node = i.node);
      }
      if (t.y > i.y + i.h) {
        const l = Math.abs(t.y - i.y - i.h);
        s.distance.top.length > l && (s.distance.top.length = l, s.distance.top.node = i.node);
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
class vt {
  constructor(e) {
    f(this, "g");
    f(this, "lines");
    f(this, "left");
    f(this, "right");
    f(this, "top");
    f(this, "bottom");
    this.g = x("g"), this.g.setAttribute("class", `${d}-distance`), this.lines = {};
    const t = (i) => {
      const n = x("g");
      n.setAttribute("class", `${d}-distance-${i}`);
      const r = x("line");
      r.setAttribute("class", `${d}-distance-${i}-line`);
      const l = x("line");
      l.setAttribute("class", `${d}-distance-${i}-dash-line`);
      const o = x("text");
      o.setAttribute("class", `${d}-distance-${i}-text`);
      const c = x("rect");
      c.setAttribute("class", `${d}-distance-${i}-text-bg`);
      const a = x("rect");
      a.setAttribute("class", `${d}-distance-${i}-line-start`);
      const g = x("rect");
      return g.setAttribute("class", `${d}-distance-${i}-line-end`), n.appendChild(r), n.appendChild(l), n.appendChild(c), n.appendChild(o), n.appendChild(a), n.appendChild(g), n;
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
        const t = y.from(this.left.node), i = y.from(e.selected), n = b(this.lines.left, `${d}-distance-left-line`);
        n.setAttribute("x1", String(t.x + t.w)), n.setAttribute("x2", String(i.x)), n.setAttribute("y1", String(i.y + i.h / 2)), n.setAttribute("y2", String(i.y + i.h / 2)), n.setAttribute("stroke", p), n.setAttribute("stroke-width", String(X / e.scale));
        const r = b(this.lines.left, `${d}-distance-left-text`);
        r.textContent = `${W(i.x - t.x - t.w, !0)}`, r.setAttribute("x", String((t.x + t.w + i.x) / 2)), r.setAttribute(
          "y",
          String(i.y + i.h / 2 - (w + 4) / 2 / e.scale - 2 / e.scale)
        ), r.setAttribute("fill", "#FFFFFF"), r.setAttribute("font-size", String(w / e.scale)), r.setAttribute("text-anchor", "middle"), r.setAttribute("alignment-baseline", "middle");
        const l = b(this.lines.left, `${d}-distance-left-text-bg`);
        l.setAttribute(
          "x",
          String((t.x + t.w + i.x) / 2 - (r.getComputedTextLength() + 10) / 2)
        ), l.setAttribute(
          "y",
          String(i.y + i.h / 2 - w / e.scale / 2 - 12 / e.scale)
        ), l.setAttribute("width", String(r.getComputedTextLength() + 10)), l.setAttribute("height", String((w + 4) / e.scale)), l.setAttribute("fill", p), l.setAttribute("rx", "4"), l.setAttribute("ry", "4");
        const o = 1, c = 8, a = b(this.lines.left, `${d}-distance-left-line-start`);
        a.setAttribute("x", String(t.x + t.w - o / 2)), a.setAttribute("y", String(i.y + i.h / 2 - c / 2)), a.setAttribute("width", String(o)), a.setAttribute("height", String(c)), a.setAttribute("fill", p);
        const g = b(this.lines.left, `${d}-distance-left-line-end`);
        g.setAttribute("x", String(i.x - o / 2)), g.setAttribute("y", String(i.y + i.h / 2 - c / 2)), g.setAttribute("width", String(o)), g.setAttribute("height", String(c)), g.setAttribute("fill", p);
        const h = b(this.lines.left, `${d}-distance-left-dash-line`);
        i.y < t.y ? (h.setAttribute("x1", String(t.x + t.w)), h.setAttribute("x2", String(t.x + t.w)), h.setAttribute("y1", String(i.y)), h.setAttribute("y2", String(t.y)), h.setAttribute("stroke", p), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : i.y + i.h > t.y + t.h ? (h.setAttribute("x1", String(t.x + t.w)), h.setAttribute("x2", String(t.x + t.w)), h.setAttribute("y1", String(t.y + t.h)), h.setAttribute("y2", String(i.y + i.h)), h.setAttribute("stroke", p), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : h.setAttribute("style", "display: none;");
      }
      if (this.right.node && this.right.node.id !== e.selected.dataset.id) {
        if (e.align.isHAlign && !e.align.isVAlign) {
          const u = Y(this.right.length);
          u !== this.right.length && (e.selected.style.left = A(parseFloat(e.selected.style.left) + this.right.length - u), this.right.length = u, e.align.reRender(e), e.border.reRender(e));
        }
        const t = y.from(this.right.node), i = y.from(e.selected), n = b(this.lines.right, `${d}-distance-right-line`);
        n.setAttribute("x1", String(i.x + i.w)), n.setAttribute("x2", String(t.x)), n.setAttribute("y1", String(i.y + i.h / 2)), n.setAttribute("y2", String(i.y + i.h / 2)), n.setAttribute("stroke", p), n.setAttribute("stroke-width", String(X / e.scale));
        const r = b(this.lines.right, `${d}-distance-right-text`);
        r.textContent = `${W(t.x - i.x - i.w, !0)}`, r.setAttribute("x", String((i.x + i.w + t.x) / 2)), r.setAttribute("y", String(i.y + i.h / 2 - (w + 4) / 2 / e.scale - 2 / e.scale)), r.setAttribute("fill", "#FFFFFF"), r.setAttribute("font-size", String(w / e.scale)), r.setAttribute("text-anchor", "middle"), r.setAttribute("alignment-baseline", "middle");
        const l = b(this.lines.right, `${d}-distance-right-text-bg`);
        l.setAttribute(
          "x",
          String((i.x + i.w + t.x) / 2 - (r.getComputedTextLength() + 10) / 2)
        ), l.setAttribute(
          "y",
          String(i.y + i.h / 2 - w / e.scale / 2 - 12 / e.scale)
        ), l.setAttribute("width", String(r.getComputedTextLength() + 10)), l.setAttribute("height", String((w + 4) / e.scale)), l.setAttribute("fill", p), l.setAttribute("rx", "4"), l.setAttribute("ry", "4");
        const o = 1, c = 8, a = b(this.lines.right, `${d}-distance-right-line-start`);
        a.setAttribute("x", String(i.x + i.w - o / 2)), a.setAttribute("y", String(i.y + i.h / 2 - c / 2)), a.setAttribute("width", String(o)), a.setAttribute("height", String(c)), a.setAttribute("fill", p);
        const g = b(this.lines.right, `${d}-distance-right-line-end`);
        g.setAttribute("x", String(t.x - o / 2)), g.setAttribute("y", String(i.y + i.h / 2 - c / 2)), g.setAttribute("width", String(o)), g.setAttribute("height", String(c)), g.setAttribute("fill", p);
        const h = b(this.lines.right, `${d}-distance-right-dash-line`);
        i.y < t.y ? (h.setAttribute("x1", String(t.x)), h.setAttribute("x2", String(t.x)), h.setAttribute("y1", String(i.y)), h.setAttribute("y2", String(t.y)), h.setAttribute("stroke", p), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : i.y + i.h > t.y + t.h ? (h.setAttribute("x1", String(t.x)), h.setAttribute("x2", String(t.x)), h.setAttribute("y1", String(t.y + t.h)), h.setAttribute("y2", String(i.y + i.h)), h.setAttribute("stroke", p), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : h.setAttribute("style", "display: none;");
      }
      if (this.top.node && this.top.node.id !== e.selected.dataset.id) {
        if (e.align.isVAlign && !e.align.isHAlign) {
          const u = Y(this.top.length);
          u !== this.top.length && (e.selected.style.top = A(parseFloat(e.selected.style.top) - this.top.length + u), this.top.length = u, e.align.reRender(e), e.border.reRender(e));
        }
        const t = y.from(this.top.node), i = y.from(e.selected), n = b(this.lines.top, `${d}-distance-top-line`);
        n.setAttribute("x1", String(i.x + i.w / 2)), n.setAttribute("x2", String(i.x + i.w / 2)), n.setAttribute("y1", String(i.y)), n.setAttribute("y2", String(t.y + t.h)), n.setAttribute("stroke", p), n.setAttribute("stroke-width", String(X / e.scale));
        const r = b(this.lines.top, `${d}-distance-top-text`);
        r.textContent = `${W(i.y - t.h - t.y, !0)}`, r.setAttribute(
          "x",
          String(i.x + i.w / 2 + (r.getComputedTextLength() + 10) / 2 + 3 / e.scale)
        ), r.setAttribute("y", String((i.y + t.y + t.h) / 2 + 1 / e.scale)), r.setAttribute("fill", "#FFFFFF"), r.setAttribute("font-size", String(w / e.scale)), r.setAttribute("text-anchor", "middle"), r.setAttribute("alignment-baseline", "middle");
        const l = b(this.lines.top, `${d}-distance-top-text-bg`);
        l.setAttribute("x", String(i.x + i.w / 2 + 3 / e.scale)), l.setAttribute(
          "y",
          String((i.y + t.y + t.h) / 2 - (w / e.scale + 4) / 2)
        ), l.setAttribute("width", String(r.getComputedTextLength() + 10)), l.setAttribute("height", String(w / e.scale + 4)), l.setAttribute("fill", p), l.setAttribute("rx", "4"), l.setAttribute("ry", "4");
        const o = 8, c = 1, a = b(this.lines.top, `${d}-distance-top-line-start`);
        a.setAttribute("x", String(i.x + i.w / 2 - o / 2)), a.setAttribute("y", String(t.y + t.h - c / 2)), a.setAttribute("width", String(o)), a.setAttribute("height", String(c)), a.setAttribute("fill", p);
        const g = b(this.lines.top, `${d}-distance-top-line-end`);
        g.setAttribute("x", String(i.x + i.w / 2 - o / 2)), g.setAttribute("y", String(i.y - c / 2)), g.setAttribute("width", String(o)), g.setAttribute("height", String(c)), g.setAttribute("fill", p);
        const h = b(this.lines.top, `${d}-distance-top-dash-line`);
        i.x < t.x ? (h.setAttribute("x1", String(i.x)), h.setAttribute("x2", String(t.x)), h.setAttribute("y1", String(t.y + t.h)), h.setAttribute("y2", String(t.y + t.h)), h.setAttribute("stroke", p), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : i.x + i.w > t.x + t.w ? (h.setAttribute("x1", String(t.x + t.w)), h.setAttribute("x2", String(i.x + i.w)), h.setAttribute("y1", String(t.y + t.h)), h.setAttribute("y2", String(t.y + t.h)), h.setAttribute("stroke", p), h.setAttribute("stroke-width", "1"), h.setAttribute("stroke-dasharray", "4 4"), h.setAttribute("style", "display: block;")) : h.setAttribute("style", "display: none;");
      }
      if (this.bottom.node && this.bottom.node.id !== e.selected.dataset.id) {
        if (e.align.isVAlign && !e.align.isHAlign) {
          const S = Y(this.bottom.length);
          S !== this.bottom.length && (e.selected.style.top = A(parseFloat(e.selected.style.top) + this.bottom.length - S), this.bottom.length = S, e.align.reRender(e), e.border.reRender(e));
        }
        const t = y.from(this.bottom.node), i = y.from(e.selected), n = b(this.lines.bottom, `${d}-distance-bottom-line`);
        n.setAttribute("x1", String(i.x + i.w / 2)), n.setAttribute("x2", String(i.x + i.w / 2)), n.setAttribute("y1", String(i.y + i.h)), n.setAttribute("y2", String(t.y)), n.setAttribute("stroke", p), n.setAttribute("stroke-width", String(X / e.scale));
        const r = b(this.lines.bottom, `${d}-distance-bottom-text`);
        r.textContent = `${W(t.y - i.y - i.h, !0)}`;
        const l = i.x + i.w / 2 + (r.getComputedTextLength() + 10) / 2 + 3 / e.scale;
        r.setAttribute("x", String(l)), r.setAttribute("y", String((i.y + i.h + t.y) / 2 + 1 / e.scale)), r.setAttribute("fill", "#FFFFFF"), r.setAttribute("font-size", String(w / e.scale)), r.setAttribute("text-anchor", "middle"), r.setAttribute("alignment-baseline", "middle");
        const o = b(this.lines.bottom, `${d}-distance-bottom-text-bg`);
        o.setAttribute("x", String(i.x + i.w / 2 + 3 / e.scale)), o.setAttribute(
          "y",
          String((i.y + i.h + t.y) / 2 - (w / e.scale + 4) / 2)
        ), o.setAttribute("width", String(r.getComputedTextLength() + 10)), o.setAttribute("height", String(w / e.scale + 4)), o.setAttribute("fill", p), o.setAttribute("rx", "4"), o.setAttribute("ry", "4");
        const c = 8, a = 1, g = b(this.lines.bottom, `${d}-distance-bottom-line-start`);
        g.setAttribute("x", String(i.x + i.w / 2 - c / 2)), g.setAttribute("y", String(i.y + i.h - a / 2)), g.setAttribute("width", String(c)), g.setAttribute("height", String(a)), g.setAttribute("fill", p);
        const h = b(this.lines.bottom, `${d}-distance-bottom-line-end`);
        h.setAttribute("x", String(i.x + i.w / 2 - c / 2)), h.setAttribute("y", String(t.y - a / 2)), h.setAttribute("width", String(c)), h.setAttribute("height", String(a)), h.setAttribute("fill", p);
        const u = b(this.lines.bottom, `${d}-distance-bottom-dash-line`);
        i.x < t.x ? (u.setAttribute("x1", String(i.x)), u.setAttribute("x2", String(t.x)), u.setAttribute("y1", String(t.y)), u.setAttribute("y2", String(t.y)), u.setAttribute("stroke", p), u.setAttribute("stroke-width", "1"), u.setAttribute("stroke-dasharray", "4 4"), u.setAttribute("style", "display: block;")) : i.x + i.w > t.x + t.w ? (u.setAttribute("x1", String(t.x + t.w)), u.setAttribute("x2", String(i.x + i.w)), u.setAttribute("y1", String(t.y)), u.setAttribute("y2", String(t.y)), u.setAttribute("stroke", p), u.setAttribute("stroke-width", "1"), u.setAttribute("stroke-dasharray", "4 4"), u.setAttribute("style", "display: block;")) : u.setAttribute("style", "display: none;");
      }
      e.align.isHAlign && (V(this.left.length, this.right.length) ? (this.lines.left.style = "display: block;", this.lines.right.style = "display: block;") : this.left.length > this.right.length ? this.lines.right.style = "display: block;" : this.lines.left.style = "display: block;"), e.align.isVAlign && (V(this.top.length, this.bottom.length) ? (this.lines.top.style = "display: block;", this.lines.bottom.style = "display: block;") : this.top.length > this.bottom.length ? this.lines.bottom.style = "display: block;" : this.lines.top.style = "display: block;");
    }
  }
}
class Et {
  constructor(e) {
    f(this, "g");
    this.g = x("g"), this.g.setAttribute("class", `${d}-gap`), e.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(e) {
    if (!e.selected) return;
    this.clear();
    const { left: t, right: i, top: n, bottom: r } = e.distance, l = y.from(e.selected);
    if (t.node && i.node && e.align.isHAlign && !e.align.isVAlign) {
      const o = y.from(i.node), c = y.from(t.node), a = (o.x - c.x - c.w - l.w) / 2;
      Math.abs(l.x - c.x - c.w - a) <= 3 && (e.selected.style.left = A(c.x + c.w + a), l.sync());
    }
    if (n.node && r.node && !e.align.isHAlign && e.align.isVAlign) {
      const o = y.from(r.node), c = y.from(n.node), a = (o.y - c.y - c.h - l.h) / 2;
      Math.abs(l.y - c.y - c.h - a) <= 3 && (e.selected.style.top = A(c.y + c.h + a), l.sync());
    }
    e.align.reRender(e), e.distance.reRender(e), e.border.reRender(e);
  }
}
const Rt = (s, e) => {
  const t = x("svg");
  t.setAttribute("class", `${d}-svg`);
  const i = s.getBoundingClientRect(), n = e.getBoundingClientRect();
  s.className += ` ${d}-board`, e.className += ` ${d}-canvas`, e.style.left = A((i.width - n.width) / 2), e.style.top = A((i.height - n.height) / 2), t.setAttribute("width", A(n.width)), t.setAttribute("height", A(n.height));
  const r = Array.from(e.getElementsByTagName("div"));
  return r.forEach((l) => {
    l.className += ` ${d}-movable-node`, l.setAttribute("data-id", ct()), /%$/.test(l.style.top) && (l.style.top = A(n.width * parseFloat(l.style.top) / 100)), /%$/.test(l.style.left) && (l.style.left = A(n.height * parseFloat(l.style.left) / 100)), /%$/.test(l.style.width) && (l.style.width = A(n.width * parseFloat(l.style.width) / 100)), /%$/.test(l.style.height) && (l.style.height = A(n.height * parseFloat(l.style.height) / 100));
  }), {
    board: s,
    canvas: e,
    nodes: r,
    svg: t,
    selected: null,
    scale: 1,
    scaleRange: [0.5, 2],
    translateX: 0,
    translateY: 0,
    setSelected(l) {
      if (this.selected = l, !l) {
        this.border.hidden();
        return;
      }
      this.border.reRender(this), this.searchError();
    },
    searchError() {
      if (!this.selected) return;
      const l = y.from(this.selected);
      l.error = !1;
      for (let o = 0; o < this.nodes.length; o++) {
        const c = this.nodes[o];
        if (c === this.selected) continue;
        const a = y.from(c);
        l.isIntersect(a) ? (l.error = !0, a.error = !0, this.align.hidden(), this.distance.hidden()) : a.error = !1;
      }
    },
    syncNodes() {
      this.nodes = Array.from(e.getElementsByTagName("div"));
    },
    gap: new Et(t),
    align: new bt(t),
    distance: new vt(t),
    border: new xt(t),
    resize: new St(t, r),
    selector: new mt(t)
  };
};
class Ft {
  constructor(e, t) {
    f(this, "store");
    this.store = Rt(e, t), lt(this.store);
  }
  mount() {
    this.store.canvas.append(this.store.svg);
  }
  unmount() {
    this.store.svg.remove();
  }
  align(e) {
    const { selected: t, canvas: i } = this.store;
    if (!t) return;
    const n = i.getBoundingClientRect(), r = y.from(t);
    switch (e) {
      case "start":
        t.style.left = A(0);
        break;
      case "center":
        t.style.left = A(n.width / 2 - r.w / 2);
        break;
      case "end":
        t.style.left = A(n.width - r.w);
        break;
    }
  }
}
export {
  Ft as default
};
