var tt = Object.defineProperty;
var et = (r, i, t) => i in r ? tt(r, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[i] = t;
var f = (r, i, t) => et(r, typeof i != "symbol" ? i + "" : i, t);
const d = "__freemove";
class y {
  constructor({ x: i, y: t, h: e, w: s, node: n }) {
    f(this, "x");
    f(this, "y");
    f(this, "w");
    f(this, "h");
    f(this, "id");
    f(this, "node");
    this.x = i, this.y = t, this.h = e, this.w = s, this.node = n, this.id = n.dataset.id;
  }
  // 将rect的几何信息和node节点同步
  sync() {
    this.x = parseFloat(this.node.style.left), this.y = parseFloat(this.node.style.top), this.w = parseFloat(this.node.style.width), this.h = parseFloat(this.node.style.height);
  }
  set error(i) {
    this.node.setAttribute("data-error", String(i));
  }
  get error() {
    return !!this.node.getAttribute("data-error");
  }
  // 判断一个点是否在矩形里面
  isInSide(i) {
    return i.x >= this.x && i.x <= this.x + this.w && i.y >= this.y && i.y <= this.y + this.h;
  }
  // 判断两个矩形是否相交
  isIntersect(i) {
    const t = this.x + 0.01, e = this.y + 0.01, s = this.x + this.w - 0.01, n = this.y + this.h - 0.01, h = i.x, a = i.y, o = i.x + i.w, l = i.y + i.h;
    return !(s < h || t > o || n < a || e > l);
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
  static from(i) {
    return new y({
      x: parseFloat(i.style.left),
      y: parseFloat(i.style.top),
      w: parseFloat(i.style.width),
      h: parseFloat(i.style.height),
      node: i
    });
  }
}
function A(r) {
  return typeof r == "number" ? `${r}px` : String(r);
}
function G(r, i, t = 0.1) {
  return Math.abs(r - i) <= t;
}
function b(r, i) {
  return r.getElementsByClassName(i)[0];
}
function x(r) {
  return document.createElementNS("http://www.w3.org/2000/svg", r);
}
function C(r, i = !1) {
  return i ? Math.round(parseFloat(r.toFixed(1))) : Number.isInteger(r) ? r.toFixed(0) : r.toFixed(1);
}
function it(r, i) {
  if (!r.selected) return;
  const t = r.container.getBoundingClientRect();
  r.selected.dataset.error === "false" && (r.align.reRender(r), r.distance.reRender(r), r.gap.reRender(r)), r.border.reRender(r);
  const e = r.selected.getBoundingClientRect();
  let s = i.clientX - e.left, n = i.clientY - e.top, h = null;
  function a(l) {
    h || (h = requestAnimationFrame(() => {
      if (!r.selected) return;
      let u = l.clientX - t.left - s, c = l.clientY - t.top - n;
      const g = r.container.clientWidth - r.selected.offsetWidth, S = r.container.clientHeight - r.selected.offsetHeight;
      u = Math.max(0, Math.min(u, g)), c = Math.max(0, Math.min(c, S)), r.selected.style.left = A(u), r.selected.style.top = A(c), r.searchError(), r.selected.dataset.error === "false" && (r.align.reRender(r), r.distance.reRender(r), r.gap.reRender(r)), r.border.reRender(r), h = null;
    }));
  }
  function o() {
    document.removeEventListener("pointermove", a), document.removeEventListener("pointerup", o), r.align.hidden(), r.distance.hidden(), r.gap.clear(), h !== null && (cancelAnimationFrame(h), h = null);
  }
  document.addEventListener("pointermove", a), document.addEventListener("pointerup", o);
}
function st(r, i) {
  if (!r.selected) return;
  const t = r.container.getBoundingClientRect(), s = i.target.dataset.direction;
  if (!s) return;
  const n = y.from(r.selected);
  let h = i.clientX, a = i.clientY, o = n.w, l = n.h, u = n.x, c = n.y;
  const g = t.width, S = t.height;
  function k(v) {
    let N = v.clientX - h, I = v.clientY - a, w = o, E = l, R = u, z = c;
    s.includes("right") && (w = o + N), s.includes("left") && (w = o - N, R = u + N), s.includes("bottom") && (E = l + I), s.includes("top") && (E = l - I, z = c + I), R < 0 && (w += R, R = 0), z < 0 && (E += z, z = 0), R + w > g && (w = g - R), z + E > S && (E = S - z), w = Math.max(w, 10), E = Math.max(E, 10), r.resize.reRender(r, w, E, s, u, c, o, l), r.border.reRender(r);
  }
  function L() {
    r.resize.hidden(), document.removeEventListener("pointermove", k), document.removeEventListener("pointerup", L);
  }
  document.addEventListener("pointermove", k), document.addEventListener("pointerup", L);
}
function rt(r, i) {
  const t = r.container.getBoundingClientRect(), e = i.clientX - t.left, s = i.clientY - t.top;
  function n(a) {
    const o = a.clientX - t.left, l = a.clientY - t.top;
    r.selector.reRender(r, e, s, o, l);
  }
  function h() {
    r.selector.hiddenSelector(), r.selector.showPreview(), document.removeEventListener("pointermove", n), document.removeEventListener("pointerup", h);
  }
  document.addEventListener("pointermove", n), document.addEventListener("pointerup", h);
}
function nt(r) {
  r.svg.addEventListener("pointerdown", (i) => {
    i.preventDefault();
    const t = i.target;
    if (t.classList[0].includes(`${d}-border-point-`)) {
      const e = t.dataset.ownerId;
      for (let s = 0; s < r.nodes.length; s++)
        e === r.nodes[s].dataset.ownerId && r.setSelected(r.nodes[s]);
      r.selected && st(r, i);
      return;
    }
    if (t.classList.contains(`${d}-svg`)) {
      let e = null;
      for (const s of r.nodes) {
        const n = y.from(s);
        if (n.isInSide({ x: i.offsetX, y: i.offsetY })) {
          e = n;
          break;
        }
      }
      e && e.node.classList.contains(`${d}-movable-node`) && (r.selector.hiddenPreview(), r.setSelected(e.node), r.searchError(), it(r, i)), e || (r.border.hidden(), rt(r, i));
    }
  });
}
const lt = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let ht = (r = 21) => {
  let i = "", t = crypto.getRandomValues(new Uint8Array(r |= 0));
  for (; r--; )
    i += lt[t[r] & 63];
  return i;
};
const ot = 1, ct = "red", H = ["vl", "vc", "vr", "ht", "hc", "hb"];
function q(r, i) {
  const t = y.from(r.selected), e = r.nodes.filter((s) => s !== r.selected).map((s) => y.from(s));
  H.forEach((s) => i.alternateNodes[s] = []), e.forEach((s) => {
    if (t.isIntersect(s)) return;
    const n = t.getAlignLinePostion();
    H.forEach((h) => {
      let a = 1e4, o = 1e4, l;
      /^h/.test(h) && (t.x > s.x + s.w ? (a = t.x + t.w, o = s.x) : t.x + t.w < s.x ? (a = t.x, o = s.x + s.w) : (a = Math.min(t.x, s.x), o = Math.max(t.x + t.w, s.x + s.w)), [s.y, s.y + s.h / 2, s.y + s.h].forEach((u) => {
        l = Math.abs(n[h] - u), l <= 3 && i.alternateNodes[h].push({
          type: h,
          source: a,
          target: o,
          absorbDistance: l,
          absorbPosition: u,
          nodeRects: [s]
        });
      })), /^v/.test(h) && (t.y > s.y + s.h ? (a = t.y + t.h, o = s.y) : t.y + t.h < s.y ? (a = t.y, o = s.y + s.h) : (a = Math.min(t.y, s.y), o = Math.max(t.y + t.h, s.y + s.h)), [s.x, s.x + s.w / 2, s.x + s.w].forEach((u) => {
        l = Math.abs(n[h] - u), l <= 3 && i.alternateNodes[h].push({
          type: h,
          source: a,
          target: o,
          absorbDistance: l,
          absorbPosition: u,
          nodeRects: [s]
        });
      }));
    });
  }), H.forEach((s) => {
    const n = /* @__PURE__ */ new Map();
    i.alternateNodes[s].forEach((o) => {
      const l = n.get(o.absorbDistance) || [];
      l.push(o), n.set(o.absorbDistance, l);
    });
    let h = 1 / 0, a = 0;
    n.forEach((o) => {
      o.forEach((l) => {
        h = Math.min(h, l.source, l.target), a = Math.max(a, l.source, l.target);
      });
    }), n.forEach((o) => {
      o.forEach((l) => {
        l.source = h, l.target = a;
      });
    }), i.alternateNodes[s] = Array.from(n.values()).flat();
  });
}
function at(r, i, t) {
  const { absorbPosition: e, type: s } = t, n = r.selected;
  switch (s) {
    case "ht":
      n.style.top = A(e);
      break;
    case "hc":
      n.style.top = A(e - parseFloat(n.style.height) / 2);
      break;
    case "hb":
      n.style.top = A(e - parseFloat(n.style.height));
      break;
    case "vl":
      n.style.left = A(e);
      break;
    case "vc":
      n.style.left = A(e - parseFloat(n.style.width) / 2);
      break;
    case "vr":
      n.style.left = A(e - parseFloat(n.style.width));
      break;
  }
  q(r, i), r.border.reRender(r);
}
function dt(r, i) {
  if (!r.selected) return;
  const t = r.container.getBoundingClientRect(), e = y.from(r.selected), s = t.width / 2;
  Math.abs(e.x + e.w / 2 - s) <= 3 && (r.selected.style.left = A(s - e.w / 2), i.showContainerAlignLine = !0), q(r, i), r.border.reRender(r);
}
function ut(r, i) {
  if (!r.selected) return;
  const t = r.container.getBoundingClientRect(), e = y.from(r.selected), s = Object.values(i.alternateNodes).flat();
  if ([...i.alternateNodes.hb, ...i.alternateNodes.hc, ...i.alternateNodes.ht].length === 0 ? i.isHAlign = !1 : i.isHAlign = !0, [...i.alternateNodes.vc, ...i.alternateNodes.vl, ...i.alternateNodes.vr].length === 0 ? i.isVAlign = !1 : i.isVAlign = !0, s.forEach((n) => {
    const { source: h, target: a, type: o } = n, l = i.lines[o];
    if (/^h/.test(o))
      switch (l == null || l.setAttribute("x1", String(h)), l == null || l.setAttribute("x2", String(a)), o) {
        case "ht":
          l.setAttribute("y1", String(e.y)), l.setAttribute("y2", String(e.y));
          break;
        case "hc":
          l.setAttribute("y1", String(e.y + e.h / 2)), l.setAttribute("y2", String(e.y + e.h / 2));
          break;
        case "hb":
          l.setAttribute("y1", String(e.y + e.h)), l.setAttribute("y2", String(e.y + e.h));
          break;
      }
    if (/^v/.test(o))
      switch (l == null || l.setAttribute("y1", String(h)), l == null || l.setAttribute("y2", String(a)), o) {
        case "vl":
          l.setAttribute("x1", String(e.x)), l.setAttribute("x2", String(e.x));
          break;
        case "vc":
          l.setAttribute("x1", String(e.x + e.w / 2)), l.setAttribute("x2", String(e.x + e.w / 2));
          break;
        case "vr":
          l.setAttribute("x1", String(e.x + e.w)), l.setAttribute("x2", String(e.x + e.w));
          break;
      }
    l == null || l.setAttribute("style", "display: 'block");
  }), i.showContainerAlignLine) {
    const n = i.lines.vertical;
    n.setAttribute("x1", String(t.width / 2)), n.setAttribute("y1", String(0)), n.setAttribute("x2", String(t.width / 2)), n.setAttribute("y2", String(t.height)), n == null || n.setAttribute("style", "display: 'block");
  }
}
class gt {
  constructor(i) {
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
    this.g = x("g"), this.g.setAttribute("class", `${d}-align`), this.lines = {}, [...H, "vertical"].forEach((t) => {
      const e = x("line");
      e.setAttribute("class", `${d}-align-${t}`), e.setAttribute("stroke", ct), e.setAttribute("stroke-width", String(ot)), e.style.display = "none", this.g.append(e), this.lines[t] = e;
    }), i.append(this.g);
  }
  hidden() {
    Object.values(this.lines).forEach((i) => {
      i.style.display = "none";
    });
  }
  reRender(i) {
    if (!i.selected) return;
    this.hidden(), this.alternateNodes = {
      ht: [],
      hc: [],
      hb: [],
      vl: [],
      vc: [],
      vr: []
    }, this.showContainerAlignLine = !1, q(i, this), Object.values(this.alternateNodes).flat().forEach((e) => {
      at(i, this, e);
    }), dt(i, this);
    let t = 1 / 0;
    H.forEach((e) => {
      this.alternateNodes[e].forEach((s) => {
        s.absorbDistance < t && (t = s.absorbDistance);
      });
    }), H.forEach((e) => {
      this.alternateNodes[e] = this.alternateNodes[e].filter(
        (s) => G(s.absorbDistance, t, 0.01)
      );
    }), ut(i, this);
  }
}
const F = 1, Y = "#000", X = 6, Q = ["left", "top", "right", "bottom"], J = [
  "left-top",
  "top",
  "right-top",
  "right",
  "right-bottom",
  "bottom",
  "left-bottom",
  "left"
], bt = [
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
  const r = [], i = [];
  return Q.forEach((t) => {
    const e = x("line");
    e.setAttribute("class", `${d}-border-line-${t}`), e.setAttribute("stroke", Y), e.setAttribute("stroke-width", A(F)), i.push(e);
  }), J.forEach((t, e) => {
    const s = x("rect");
    s.setAttribute("class", `${d}-border-point-${t}`), s.setAttribute("fill", "white"), s.setAttribute("stroke", Y), s.setAttribute("stroke-width", A(F)), s.setAttribute("width", A(X)), s.setAttribute("height", A(X)), s.setAttribute("style", `cursor: ${bt[e]}`), s.setAttribute("data-direction", t), r.push(s);
  }), [r, i];
}
function yt(r, i) {
  const t = y.from(i);
  Q.forEach((e) => {
    const s = b(r, `${d}-border-line-${e}`);
    switch (e) {
      case "left":
        s.setAttribute("x1", String(t.x)), s.setAttribute("y1", String(t.y - F / 2)), s.setAttribute("x2", String(t.x)), s.setAttribute("y2", String(t.y + t.h + F / 2));
        break;
      case "right":
        s.setAttribute("x1", String(t.x + t.w)), s.setAttribute("y1", String(t.y - F / 2)), s.setAttribute("x2", String(t.x + t.w)), s.setAttribute("y2", String(t.y + t.h + F / 2));
        break;
      case "top":
        s.setAttribute("x1", String(t.x - F / 2)), s.setAttribute("y1", String(t.y)), s.setAttribute("x2", String(t.x + t.w + F / 2)), s.setAttribute("y2", String(t.y));
        break;
      case "bottom":
        s.setAttribute("x1", String(t.x - F / 2)), s.setAttribute("y1", String(t.y + t.h)), s.setAttribute("x2", String(t.x + t.w + F / 2)), s.setAttribute("y2", String(t.y + t.h));
        break;
    }
  }), J.forEach((e, s) => {
    const n = b(r, `${d}-border-point-${e}`);
    n.setAttribute("data-owner-id", i.dataset.id);
    const h = X / 2;
    switch (e) {
      case "left-top":
        n.setAttribute("x", String(t.x - h)), n.setAttribute("y", String(t.y - h));
        break;
      case "top":
        n.setAttribute("x", String(t.x + t.w / 2 - h)), n.setAttribute("y", String(t.y - h));
        break;
      case "right-top":
        n.setAttribute("x", String(t.x + t.w - h)), n.setAttribute("y", String(t.y - h));
        break;
      case "right":
        n.setAttribute("x", String(t.x + t.w - h)), n.setAttribute("y", String(t.y + t.h / 2 - h));
        break;
      case "right-bottom":
        n.setAttribute("x", String(t.x + t.w - h)), n.setAttribute("y", String(t.y + t.h - h));
        break;
      case "bottom":
        n.setAttribute("x", String(t.x + t.w / 2 - h)), n.setAttribute("y", String(t.y + t.h - h));
        break;
      case "left-bottom":
        n.setAttribute("x", String(t.x - h)), n.setAttribute("y", String(t.y + t.h - h));
        break;
      case "left":
        n.setAttribute("x", String(t.x - h)), n.setAttribute("y", String(t.y + t.h / 2 - h));
        break;
    }
  });
}
class ft {
  constructor(i) {
    f(this, "g");
    f(this, "points");
    f(this, "lines");
    this.g = x("g"), this.g.setAttribute("class", `${d}-border`), i.append(this.g);
    const [t, e] = At();
    this.points = t, this.lines = e, this.g.append(...e, ...t), this.g.style.display = "none";
  }
  hidden() {
    this.g.style.display = "none";
  }
  reRender(i) {
    i.selected && (this.g.style.display = "block", yt(this.g, i.selected));
  }
}
const _ = 1, O = "#2A63F4", D = 8, B = 10, j = 10;
function U(r) {
  const i = r.nodes.map((s) => y.from(s)), t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
  return i.forEach((s) => {
    var a, o;
    const n = {
      type: "width",
      nodeRect: s
    }, h = {
      type: "height",
      nodeRect: s
    };
    t.has(s.w) ? (a = t.get(s.w)) == null || a.push(n) : t.set(s.w, [n]), e.has(s.h) ? (o = e.get(s.h)) == null || o.push(h) : e.set(s.h, [h]);
  }), {
    widthMap: t,
    heightMap: e
  };
}
function xt(r) {
  r.nodes.forEach((i) => {
    const t = y.from(i), e = r.resize.g.querySelector(`[data-ower-id="${t.id}"]`), s = b(e, `${d}-resize-line-group-width-line`), n = b(e, `${d}-resize-line-group-width-line-start`), h = b(e, `${d}-resize-line-group-width-line-end`), a = b(e, `${d}-resize-line-group-width-text`), o = b(e, `${d}-resize-line-group-height-line`), l = b(e, `${d}-resize-line-group-height-text`), u = b(e, `${d}-resize-line-group-height-line-start`), c = b(e, `${d}-resize-line-group-height-line-end`);
    s.setAttribute("x1", String(t.x)), s.setAttribute("y1", String(t.y - D)), s.setAttribute("x2", String(t.x + t.w)), s.setAttribute("y2", String(t.y - D)), n.setAttribute("x", String(t.x - _ / 2)), n.setAttribute("y", String(t.y - D - B / 2)), n.setAttribute("width", String(_)), n.setAttribute("height", String(B)), n.setAttribute("fill", String(O)), h.setAttribute("x", String(t.x + t.w - _ / 2)), h.setAttribute("y", String(t.y - D - B / 2)), h.setAttribute("width", String(_)), h.setAttribute("height", String(B)), h.setAttribute("fill", String(O)), a.textContent = `${C(t.w)}`, a.setAttribute("x", String(t.x + t.w / 2)), a.setAttribute("y", String(t.y - D - 8)), a.setAttribute("fill", String(O)), a.setAttribute("font-size", String(j)), a.setAttribute("text-anchor", "middle"), a.setAttribute("alignment-baseline", "middle"), o.setAttribute("x1", String(t.x - D)), o.setAttribute("y1", String(t.y)), o.setAttribute("x2", String(t.x - D)), o.setAttribute("y2", String(t.y + t.h)), u.setAttribute("x", String(t.x - D - B / 2)), u.setAttribute("y", String(t.y - _ / 2)), u.setAttribute("width", String(B)), u.setAttribute("height", String(_)), u.setAttribute("fill", String(O)), c.setAttribute("x", String(t.x - D - B / 2)), c.setAttribute("y", String(t.y + t.h - _ / 2)), c.setAttribute("width", String(B)), c.setAttribute("height", String(_)), c.setAttribute("fill", String(O)), l.textContent = `${C(t.h)}`, l.setAttribute("x", String(t.x - D - 8)), l.setAttribute("y", String(t.y + t.h / 2)), l.setAttribute("fill", String(O)), l.setAttribute("font-size", String(j)), l.setAttribute("text-anchor", "middle"), l.setAttribute("alignment-baseline", "middle"), l.setAttribute(
      "transform",
      `rotate(-90 ${t.x - D - 8} ${t.y + t.h / 2})`
    ), [s, o].forEach((g) => {
      g.setAttribute("stroke", O), g.setAttribute("stroke-width", String(_));
    });
  });
}
class pt {
  constructor(i, t) {
    f(this, "g");
    f(this, "lines");
    this.g = x("g"), this.g.setAttribute("class", `${d}-resize`);
    const e = [];
    t.forEach((s) => {
      const n = y.from(s), h = x("g");
      h.setAttribute("class", `${d}-resize-line`), h.setAttribute("data-ower-id", n.id);
      const a = x("g");
      a.setAttribute("class", `${d}-resize-line-group-width`);
      const o = x("line");
      o.setAttribute("class", `${d}-resize-line-group-width-line`);
      const l = x("text");
      l.setAttribute("class", `${d}-resize-line-group-width-text`);
      const u = x("rect");
      u.setAttribute("class", `${d}-resize-line-group-width-line-start`);
      const c = x("rect");
      c.setAttribute("class", `${d}-resize-line-group-width-line-end`), a.append(o, l, u, c);
      const g = x("g");
      g.setAttribute("class", `${d}-resize-line-group-height`);
      const S = x("line");
      S.setAttribute("class", `${d}-resize-line-group-height-line`);
      const k = x("text");
      k.setAttribute("class", `${d}-resize-line-group-height-text`);
      const L = x("rect");
      L.setAttribute("class", `${d}-resize-line-group-height-line-start`);
      const v = x("rect");
      v.setAttribute("class", `${d}-resize-line-group-height-line-end`), g.append(S, k, L, v), h.append(a, g), e.push(h);
    }), this.lines = e, this.g.append(...this.lines), i.append(this.g), this.hidden();
  }
  hidden() {
    this.lines.forEach((i) => {
      Array.from(i.children).forEach((t) => {
        t.style.display = "none";
      });
    });
  }
  reRender(i, t, e, s, n, h, a, o) {
    var V, Z;
    if (!i.selected) return;
    this.hidden();
    const { widthMap: l, heightMap: u } = U(i), c = [], g = [];
    l.forEach((m, M) => {
      var T;
      m.length === 1 && m[0].nodeRect.id === ((T = i.selected) == null ? void 0 : T.dataset.id) || Math.abs(t - M) <= 3 && c.push(M);
    }), u.forEach((m, M) => {
      var T;
      m.length === 1 && m[0].nodeRect.id === ((T = i.selected) == null ? void 0 : T.dataset.id) || Math.abs(e - M) <= 3 && g.push(M);
    });
    const S = c.length === 0 ? t : Math.max(...c), k = g.length === 0 ? e : Math.max(...g), L = Math.max(S, 10), v = Math.max(k, 10);
    if (s.includes("left")) {
      const m = n + a;
      i.selected.style.left = A(m - L);
    } else
      i.selected.style.left = A(n);
    if (i.selected.style.width = A(L), s.includes("top")) {
      const m = h + o;
      i.selected.style.top = A(m - v);
    } else
      i.selected.style.top = A(h);
    i.selected.style.height = A(v);
    const N = parseFloat(i.selected.style.width), I = parseFloat(i.selected.style.height), { widthMap: w, heightMap: E } = U(i);
    (V = w.get(N)) == null || V.forEach((m) => {
      const M = this.g.querySelector(`[data-ower-id="${m.nodeRect.id}"]`), T = b(M, `${d}-resize-line-group-width`);
      T.style.display = "block";
    }), (Z = E.get(I)) == null || Z.forEach((m) => {
      const M = this.g.querySelector(`[data-ower-id="${m.nodeRect.id}"]`), T = b(M, `${d}-resize-line-group-height`);
      T.style.display = "block";
    });
    const R = this.g.querySelector(`[data-ower-id="${i.selected.dataset.id}"]`), z = b(R, `${d}-resize-line-group-width`), K = b(R, `${d}-resize-line-group-height`);
    K.style.display = "block", z.style.display = "block", xt(i), i.border.reRender(i);
  }
}
function St(r, i, t, e) {
  return t - r > 0 && e - i > 0 ? "4" : t - r < 0 && e - i > 0 ? "3" : t - r < 0 && e - i < 0 ? "2" : t - r > 0 && e - i < 0 ? "1" : "0";
}
class wt {
  constructor(i) {
    f(this, "g");
    // 选择框矩形
    f(this, "selectorRect");
    f(this, "previewRect");
    f(this, "selectedGroup", []);
    this.g = x("g"), this.g.setAttribute("class", `${d}-selector`), this.selectorRect = x("rect"), this.selectorRect.setAttribute("class", `${d}-selector-rect`), this.selectorRect.setAttribute("stroke", "#919191"), this.selectorRect.setAttribute("stroke-width", "1px"), this.selectorRect.setAttribute("fill", "rgba(255,255,255,0.3)"), this.selectorRect.style.display = "none", this.previewRect = x("rect"), this.previewRect.setAttribute("class", `${d}-selector-preview`), this.previewRect.setAttribute("stroke", "#000"), this.previewRect.setAttribute("stroke-width", "1px"), this.previewRect.setAttribute("fill", "transparent"), this.previewRect.style.display = "none", this.g.append(this.selectorRect, this.previewRect), i.append(this.g);
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
  reRender(i, t, e, s, n) {
    this.showSelector(), this.hiddenPreview(), this.selectedGroup = [];
    const h = St(t, e, s, n), a = Math.abs(t - s), o = Math.abs(e - n);
    this.selectorRect.setAttribute("width", String(a)), this.selectorRect.setAttribute("height", String(o));
    let l = t, u = e;
    switch (h) {
      case "3": {
        l = l - a;
        break;
      }
      case "2": {
        l = l - a, u = u - o;
        break;
      }
      case "1": {
        u = u - o;
        break;
      }
    }
    this.selectorRect.setAttribute("x", String(l)), this.selectorRect.setAttribute("y", String(u)), i.nodes.forEach((N) => {
      y.from(N).isIntersect({
        x: l,
        y: u,
        w: a,
        h: o
      }) && this.selectedGroup.push(N);
    });
    const c = [], g = [], S = [], k = [];
    this.selectedGroup.forEach((N) => {
      const { x: I, y: w, w: E, h: R } = y.from(N);
      c.push(I), g.push(w), S.push(I + E), k.push(w + R);
    });
    const L = Math.min(...c), v = Math.min(...g);
    this.previewRect.setAttribute("x", String(c.length ? L : 0)), this.previewRect.setAttribute("y", String(g.length ? v : 0)), this.previewRect.setAttribute("width", String(S.length ? Math.max(...S) - L : 0)), this.previewRect.setAttribute("height", String(k.length ? Math.max(...k) - v : 0));
  }
}
const p = "#3875F6", W = 1, $ = 10, mt = ["left", "right", "top", "bottom"];
function Et(r) {
  const i = [], t = y.from(r.selected);
  r.nodes.forEach((e) => {
    if (t.node === e) return;
    const s = y.from(e);
    i.push(s);
  }), i.forEach((e) => {
    if (e.isIntersect(t)) return;
    if (e.y <= t.y && e.y + e.h >= t.y || e.y <= t.y + t.h / 2 && e.y + e.h >= t.y + t.h / 2 || e.y <= t.y + t.h && e.y + e.h >= t.y + t.h) {
      if (t.x + t.w < e.x) {
        const n = Math.abs(t.x + t.w - e.x);
        r.distance.right.length > n && (r.distance.right.length = n, r.distance.right.node = e.node);
      }
      if (t.x > e.x + e.w) {
        const n = Math.abs(t.x - e.x - e.w);
        r.distance.left.length > n && (r.distance.left.length = n, r.distance.left.node = e.node);
      }
    }
  }), i.forEach((e) => {
    if (e.isIntersect(t)) return;
    if (e.x <= t.x && e.x + e.w >= t.x || e.x <= t.x + t.w / 2 && e.x + e.w >= t.x + t.w / 2 || e.x <= t.x + t.w && e.x + e.w >= t.x + t.w) {
      if (t.y + t.h < e.y) {
        const n = Math.abs(t.y + t.h - e.y);
        r.distance.bottom.length > n && (r.distance.bottom.length = n, r.distance.bottom.node = e.node);
      }
      if (t.y > e.y + e.h) {
        const n = Math.abs(t.y - e.y - e.h);
        r.distance.top.length > n && (r.distance.top.length = n, r.distance.top.node = e.node);
      }
    }
  });
}
function P(r) {
  const i = [0, 4, 8, 12, 16];
  for (const t of i)
    if (t - 2 <= r && t + 2 >= r) return t;
  return r;
}
class $t {
  constructor(i) {
    f(this, "g");
    f(this, "lines");
    f(this, "left");
    f(this, "right");
    f(this, "top");
    f(this, "bottom");
    this.g = x("g"), this.g.setAttribute("class", `${d}-distance`), this.lines = {};
    const t = (e) => {
      const s = x("g");
      s.setAttribute("class", `${d}-distance-${e}`);
      const n = x("line");
      n.setAttribute("class", `${d}-distance-${e}-line`);
      const h = x("line");
      h.setAttribute("class", `${d}-distance-${e}-dash-line`);
      const a = x("text");
      a.setAttribute("class", `${d}-distance-${e}-text`);
      const o = x("rect");
      o.setAttribute("class", `${d}-distance-${e}-text-bg`);
      const l = x("rect");
      l.setAttribute("class", `${d}-distance-${e}-line-start`);
      const u = x("rect");
      return u.setAttribute("class", `${d}-distance-${e}-line-end`), s.appendChild(n), s.appendChild(h), s.appendChild(o), s.appendChild(a), s.appendChild(l), s.appendChild(u), s;
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
    }, mt.forEach((e) => {
      const s = t(e);
      this.lines[e] = s;
    }), this.g.append(...Object.values(this.lines)), i.append(this.g);
  }
  hidden() {
    Object.values(this.lines).forEach((i) => {
      i.setAttribute("style", "display: none;");
    }), this.left = {
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
    };
  }
  reRender(i) {
    if (i.selected) {
      if (this.hidden(), Et(i), this.left.node && this.left.node.id !== i.selected.dataset.id) {
        if (i.align.isHAlign) {
          const g = P(this.left.length);
          g !== this.left.length && (i.selected.style.left = A(parseFloat(i.selected.style.left) - this.left.length + g), this.left.length = g, i.align.reRender(i), i.border.reRender(i));
        }
        const t = y.from(this.left.node), e = y.from(i.selected), s = b(this.lines.left, `${d}-distance-left-line`);
        s.setAttribute("x1", String(t.x + t.w)), s.setAttribute("x2", String(e.x)), s.setAttribute("y1", String(e.y + e.h / 2)), s.setAttribute("y2", String(e.y + e.h / 2)), s.setAttribute("stroke", p), s.setAttribute("stroke-width", String(W));
        const n = b(this.lines.left, `${d}-distance-left-text`);
        n.textContent = `${C(this.left.length, !0)}`, n.setAttribute("x", String((t.x + t.w + e.x) / 2)), n.setAttribute("y", String(e.y + e.h / 2 - 9)), n.setAttribute("fill", "#FFFFFF"), n.setAttribute("font-size", String($)), n.setAttribute("text-anchor", "middle"), n.setAttribute("alignment-baseline", "middle");
        const h = b(this.lines.left, `${d}-distance-left-text-bg`);
        h.setAttribute(
          "x",
          String((t.x + t.w + e.x) / 2 - (n.getComputedTextLength() + 10) / 2)
        ), h.setAttribute("y", String(e.y + e.h / 2 - $ / 2 - 12)), h.setAttribute("width", String(n.getComputedTextLength() + 10)), h.setAttribute("height", String($ + 4)), h.setAttribute("fill", p), h.setAttribute("rx", "4"), h.setAttribute("ry", "4");
        const a = 1, o = 8, l = b(this.lines.left, `${d}-distance-left-line-start`);
        l.setAttribute("x", String(t.x + t.w - a / 2)), l.setAttribute("y", String(e.y + e.h / 2 - o / 2)), l.setAttribute("width", String(a)), l.setAttribute("height", String(o)), l.setAttribute("fill", p);
        const u = b(this.lines.left, `${d}-distance-left-line-end`);
        u.setAttribute("x", String(e.x - a / 2)), u.setAttribute("y", String(e.y + e.h / 2 - o / 2)), u.setAttribute("width", String(a)), u.setAttribute("height", String(o)), u.setAttribute("fill", p);
        const c = b(this.lines.left, `${d}-distance-left-dash-line`);
        e.y < t.y ? (c.setAttribute("x1", String(t.x + t.w)), c.setAttribute("x2", String(t.x + t.w)), c.setAttribute("y1", String(e.y)), c.setAttribute("y2", String(t.y)), c.setAttribute("stroke", p), c.setAttribute("stroke-width", "1"), c.setAttribute("stroke-dasharray", "4 4"), c.setAttribute("style", "display: block;")) : e.y + e.h > t.y + t.h ? (c.setAttribute("x1", String(t.x + t.w)), c.setAttribute("x2", String(t.x + t.w)), c.setAttribute("y1", String(t.y + t.h)), c.setAttribute("y2", String(e.y + e.h)), c.setAttribute("stroke", p), c.setAttribute("stroke-width", "1"), c.setAttribute("stroke-dasharray", "4 4"), c.setAttribute("style", "display: block;")) : c.setAttribute("style", "display: none;");
      }
      if (this.right.node && this.right.node.id !== i.selected.dataset.id) {
        if (i.align.isHAlign) {
          const g = P(this.right.length);
          g !== this.right.length && (i.selected.style.left = A(parseFloat(i.selected.style.left) + this.right.length - g), this.right.length = g, i.align.reRender(i), i.border.reRender(i));
        }
        const t = y.from(this.right.node), e = y.from(i.selected), s = b(this.lines.right, `${d}-distance-right-line`);
        s.setAttribute("x1", String(e.x + e.w)), s.setAttribute("x2", String(t.x)), s.setAttribute("y1", String(e.y + e.h / 2)), s.setAttribute("y2", String(e.y + e.h / 2)), s.setAttribute("stroke", p), s.setAttribute("stroke-width", String(W));
        const n = b(this.lines.right, `${d}-distance-right-text`);
        n.textContent = `${C(this.right.length, !0)}`, n.setAttribute("x", String((e.x + e.w + t.x) / 2)), n.setAttribute("y", String(e.y + e.h / 2 - 9)), n.setAttribute("fill", "#FFFFFF"), n.setAttribute("font-size", String($)), n.setAttribute("text-anchor", "middle"), n.setAttribute("alignment-baseline", "middle");
        const h = b(this.lines.right, `${d}-distance-right-text-bg`);
        h.setAttribute(
          "x",
          String((e.x + e.w + t.x) / 2 - (n.getComputedTextLength() + 10) / 2)
        ), h.setAttribute("y", String(e.y + e.h / 2 - $ / 2 - 12)), h.setAttribute("width", String(n.getComputedTextLength() + 10)), h.setAttribute("height", String($ + 4)), h.setAttribute("fill", p), h.setAttribute("rx", "4"), h.setAttribute("ry", "4");
        const a = 1, o = 8, l = b(this.lines.right, `${d}-distance-right-line-start`);
        l.setAttribute("x", String(e.x + e.w - a / 2)), l.setAttribute("y", String(e.y + e.h / 2 - o / 2)), l.setAttribute("width", String(a)), l.setAttribute("height", String(o)), l.setAttribute("fill", p);
        const u = b(this.lines.right, `${d}-distance-right-line-end`);
        u.setAttribute("x", String(t.x - a / 2)), u.setAttribute("y", String(e.y + e.h / 2 - o / 2)), u.setAttribute("width", String(a)), u.setAttribute("height", String(o)), u.setAttribute("fill", p);
        const c = b(this.lines.right, `${d}-distance-right-dash-line`);
        e.y < t.y ? (c.setAttribute("x1", String(t.x)), c.setAttribute("x2", String(t.x)), c.setAttribute("y1", String(e.y)), c.setAttribute("y2", String(t.y)), c.setAttribute("stroke", p), c.setAttribute("stroke-width", "1"), c.setAttribute("stroke-dasharray", "4 4"), c.setAttribute("style", "display: block;")) : e.y + e.h > t.y + t.h ? (c.setAttribute("x1", String(t.x)), c.setAttribute("x2", String(t.x)), c.setAttribute("y1", String(t.y + t.h)), c.setAttribute("y2", String(e.y + e.h)), c.setAttribute("stroke", p), c.setAttribute("stroke-width", "1"), c.setAttribute("stroke-dasharray", "4 4"), c.setAttribute("style", "display: block;")) : c.setAttribute("style", "display: none;");
      }
      if (this.top.node && this.top.node.id !== i.selected.dataset.id) {
        if (i.align.isVAlign) {
          const g = P(this.top.length);
          g !== this.top.length && (i.selected.style.top = A(parseFloat(i.selected.style.top) - this.top.length + g), this.top.length = g, i.align.reRender(i), i.border.reRender(i));
        }
        const t = y.from(this.top.node), e = y.from(i.selected), s = b(this.lines.top, `${d}-distance-top-line`);
        s.setAttribute("x1", String(e.x + e.w / 2)), s.setAttribute("x2", String(e.x + e.w / 2)), s.setAttribute("y1", String(e.y)), s.setAttribute("y2", String(t.y + t.h)), s.setAttribute("stroke", p), s.setAttribute("stroke-width", String(W));
        const n = b(this.lines.top, `${d}-distance-top-text`);
        n.textContent = `${C(this.top.length, !0)}`, n.setAttribute("x", String(e.x + e.w / 2 + (n.getComputedTextLength() + 10) / 2 + 3)), n.setAttribute("y", String((e.y + t.y + t.h) / 2 + 1)), n.setAttribute("fill", "#FFFFFF"), n.setAttribute("font-size", String($)), n.setAttribute("text-anchor", "middle"), n.setAttribute("alignment-baseline", "middle");
        const h = b(this.lines.top, `${d}-distance-top-text-bg`);
        h.setAttribute("x", String(e.x + e.w / 2 + 3)), h.setAttribute("y", String((e.y + t.y + t.h) / 2 - ($ + 4) / 2)), h.setAttribute("width", String(n.getComputedTextLength() + 10)), h.setAttribute("height", String($ + 4)), h.setAttribute("fill", p), h.setAttribute("rx", "4"), h.setAttribute("ry", "4");
        const a = 8, o = 1, l = b(this.lines.top, `${d}-distance-top-line-start`);
        l.setAttribute("x", String(e.x + e.w / 2 - a / 2)), l.setAttribute("y", String(t.y + t.h - o / 2)), l.setAttribute("width", String(a)), l.setAttribute("height", String(o)), l.setAttribute("fill", p);
        const u = b(this.lines.top, `${d}-distance-top-line-end`);
        u.setAttribute("x", String(e.x + e.w / 2 - a / 2)), u.setAttribute("y", String(e.y - o / 2)), u.setAttribute("width", String(a)), u.setAttribute("height", String(o)), u.setAttribute("fill", p);
        const c = b(this.lines.top, `${d}-distance-top-dash-line`);
        e.x < t.x ? (c.setAttribute("x1", String(e.x)), c.setAttribute("x2", String(t.x)), c.setAttribute("y1", String(t.y + t.h)), c.setAttribute("y2", String(t.y + t.h)), c.setAttribute("stroke", p), c.setAttribute("stroke-width", "1"), c.setAttribute("stroke-dasharray", "4 4"), c.setAttribute("style", "display: block;")) : e.x + e.w > t.x + t.w ? (c.setAttribute("x1", String(t.x + t.w)), c.setAttribute("x2", String(e.x + e.w)), c.setAttribute("y1", String(t.y + t.h)), c.setAttribute("y2", String(t.y + t.h)), c.setAttribute("stroke", p), c.setAttribute("stroke-width", "1"), c.setAttribute("stroke-dasharray", "4 4"), c.setAttribute("style", "display: block;")) : c.setAttribute("style", "display: none;");
      }
      if (this.bottom.node && this.bottom.node.id !== i.selected.dataset.id) {
        if (i.align.isVAlign) {
          const S = P(this.bottom.length);
          S !== this.bottom.length && (i.selected.style.top = A(parseFloat(i.selected.style.top) + this.bottom.length - S), this.bottom.length = S, i.align.reRender(i), i.border.reRender(i));
        }
        const t = y.from(this.bottom.node), e = y.from(i.selected), s = b(this.lines.bottom, `${d}-distance-bottom-line`);
        s.setAttribute("x1", String(e.x + e.w / 2)), s.setAttribute("x2", String(e.x + e.w / 2)), s.setAttribute("y1", String(e.y + e.h)), s.setAttribute("y2", String(t.y)), s.setAttribute("stroke", p), s.setAttribute("stroke-width", String(W));
        const n = b(this.lines.bottom, `${d}-distance-bottom-text`);
        n.textContent = `${C(this.bottom.length, !0)}`;
        const h = e.x + e.w / 2 + (n.getComputedTextLength() + 10) / 2 + 3;
        n.setAttribute("x", String(h)), n.setAttribute("y", String((e.y + e.h + t.y) / 2 + 1)), n.setAttribute("fill", "#FFFFFF"), n.setAttribute("font-size", String($)), n.setAttribute("text-anchor", "middle"), n.setAttribute("alignment-baseline", "middle");
        const a = b(this.lines.bottom, `${d}-distance-bottom-text-bg`);
        a.setAttribute("x", String(e.x + e.w / 2 + 3)), a.setAttribute("y", String((e.y + e.h + t.y) / 2 - ($ + 4) / 2)), a.setAttribute("width", String(n.getComputedTextLength() + 10)), a.setAttribute("height", String($ + 4)), a.setAttribute("fill", p), a.setAttribute("rx", "4"), a.setAttribute("ry", "4");
        const o = 8, l = 1, u = b(
          this.lines.bottom,
          `${d}-distance-bottom-line-start`
        );
        u.setAttribute("x", String(e.x + e.w / 2 - o / 2)), u.setAttribute("y", String(e.y + e.h - l / 2)), u.setAttribute("width", String(o)), u.setAttribute("height", String(l)), u.setAttribute("fill", p);
        const c = b(this.lines.bottom, `${d}-distance-bottom-line-end`);
        c.setAttribute("x", String(e.x + e.w / 2 - o / 2)), c.setAttribute("y", String(t.y - l / 2)), c.setAttribute("width", String(o)), c.setAttribute("height", String(l)), c.setAttribute("fill", p);
        const g = b(this.lines.bottom, `${d}-distance-bottom-dash-line`);
        e.x < t.x ? (g.setAttribute("x1", String(e.x)), g.setAttribute("x2", String(t.x)), g.setAttribute("y1", String(t.y)), g.setAttribute("y2", String(t.y)), g.setAttribute("stroke", p), g.setAttribute("stroke-width", "1"), g.setAttribute("stroke-dasharray", "4 4"), g.setAttribute("style", "display: block;")) : e.x + e.w > t.x + t.w ? (g.setAttribute("x1", String(t.x + t.w)), g.setAttribute("x2", String(e.x + e.w)), g.setAttribute("y1", String(t.y)), g.setAttribute("y2", String(t.y)), g.setAttribute("stroke", p), g.setAttribute("stroke-width", "1"), g.setAttribute("stroke-dasharray", "4 4"), g.setAttribute("style", "display: block;")) : g.setAttribute("style", "display: none;");
      }
      i.align.isHAlign && (G(this.left.length, this.right.length) ? (this.lines.left.style = "display: block;", this.lines.right.style = "display: block;") : this.left.length > this.right.length ? this.lines.right.style = "display: block;" : this.lines.left.style = "display: block;"), i.align.isVAlign && (G(this.top.length, this.bottom.length) ? (this.lines.top.style = "display: block;", this.lines.bottom.style = "display: block;") : this.top.length > this.bottom.length ? this.lines.bottom.style = "display: block;" : this.lines.top.style = "display: block;");
    }
  }
}
class kt {
  constructor(i) {
    f(this, "g");
    this.g = x("g"), this.g.setAttribute("class", `${d}-gap`), i.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(i) {
    if (!i.selected) return;
    this.clear();
    const { left: t, right: e, top: s, bottom: n } = i.distance, h = y.from(i.selected);
    if (t.node && e.node) {
      const a = y.from(e.node), o = y.from(t.node), l = (a.x - o.x - o.w - h.w) / 2;
      Math.abs(h.x - o.x - o.w - l) <= 3 && (i.selected.style.left = A(o.x + o.w + l), h.sync());
    }
    if (s.node && n.node) {
      const a = y.from(n.node), o = y.from(s.node), l = (a.y - o.y - o.h - h.h) / 2;
      Math.abs(h.y - o.y - o.h - l) <= 3 && (i.selected.style.top = A(o.y + o.h + l), h.sync());
    }
    i.align.reRender(i), i.distance.reRender(i), i.border.reRender(i);
  }
}
const Lt = (r, i) => {
  const t = x("svg");
  t.setAttribute("class", `${d}-svg`);
  const e = r.getBoundingClientRect();
  return t.setAttribute("width", A(e.width)), t.setAttribute("height", A(e.height)), t.style = "position: absolute; inset: 0;", r.className += ` ${d}-container`, i.forEach((s) => {
    s.className += ` ${d}-movable-node`, s.setAttribute("data-id", ht()), /%$/.test(s.style.top) && (s.style.top = A(e.width * parseFloat(s.style.top) / 100)), /%$/.test(s.style.left) && (s.style.left = A(e.height * parseFloat(s.style.left) / 100)), /%$/.test(s.style.width) && (s.style.width = A(e.width * parseFloat(s.style.width) / 100)), /%$/.test(s.style.height) && (s.style.height = A(e.height * parseFloat(s.style.height) / 100));
  }), {
    container: r,
    nodes: i,
    svg: t,
    selected: null,
    setSelected(s) {
      if (this.selected = s, !s) {
        this.border.hidden();
        return;
      }
      this.border.reRender(this), this.searchError();
    },
    searchError() {
      if (!this.selected) return;
      const s = y.from(this.selected);
      s.error = !1;
      for (let n = 0; n < this.nodes.length; n++) {
        const h = this.nodes[n];
        if (h === this.selected) continue;
        const a = y.from(h);
        s.isIntersect(a) ? (s.error = !0, a.error = !0, this.align.hidden(), this.distance.hidden()) : a.error = !1;
      }
    },
    gap: new kt(t),
    align: new gt(t),
    distance: new $t(t),
    border: new ft(t),
    resize: new pt(t, i),
    selector: new wt(t)
  };
};
class Rt {
  constructor(i, t) {
    f(this, "store");
    this.store = Lt(i, t), nt(this.store);
  }
  mount() {
    this.store.container.append(this.store.svg);
  }
  unmount() {
    this.store.svg.remove();
  }
  align(i) {
    const { selected: t, container: e } = this.store;
    if (!t) return;
    const s = e.getBoundingClientRect(), n = y.from(t);
    switch (i) {
      case "start":
        t.style.left = A(0);
        break;
      case "center":
        t.style.left = A(s.width / 2 - n.w / 2);
        break;
      case "end":
        t.style.left = A(s.width - n.w);
        break;
    }
  }
}
export {
  Rt as default
};
