var K = Object.defineProperty;
var tt = (h, i, t) => i in h ? K(h, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[i] = t;
var $ = (h, i, t) => tt(h, typeof i != "symbol" ? i + "" : i, t);
const f = "__freemove";
class m {
  constructor({ x: i, y: t, h: e, w: n, node: c }) {
    $(this, "x");
    $(this, "y");
    $(this, "w");
    $(this, "h");
    $(this, "id");
    $(this, "node");
    this.x = i, this.y = t, this.h = e, this.w = n, this.node = c, this.id = c.dataset.id;
  }
  // 将rect的几何信息和node节点同步
  sync() {
    this.x = parseFloat(this.node.style.left), this.y = parseFloat(this.node.style.top), this.w = parseFloat(this.node.style.width), this.h = parseFloat(this.node.style.height);
  }
  // 判断一个点是否在矩形里面
  isInSide(i) {
    return i.x >= this.x && i.x <= this.x + this.w && i.y >= this.y && i.y <= this.y + this.h;
  }
  isIntersect(i) {
    const t = this.x + 3, e = this.y + 3, n = this.x + this.w - 3, c = this.y + this.h - 3, u = i.x, b = i.y, a = i.x + i.w, o = i.y + i.h;
    return !(n < u || t > a || c < b || e > o);
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
    return new m({
      x: parseFloat(i.style.left),
      y: parseFloat(i.style.top),
      w: parseFloat(i.style.width),
      h: parseFloat(i.style.height),
      node: i
    });
  }
  static error(i, t) {
  }
}
function S(h) {
  return typeof h == "number" ? `${h}px` : String(h);
}
function P(h, i, t = 0.1) {
  return Math.abs(h - i) <= t;
}
function w(h, i) {
  return h.getElementsByClassName(i)[0];
}
function E(h) {
  return document.createElementNS("http://www.w3.org/2000/svg", h);
}
function C(h, i = !1) {
  return i ? Math.round(parseFloat(h.toFixed(1))) : Number.isInteger(h) ? h.toFixed(0) : h.toFixed(1);
}
function et(h, i) {
  if (!h.selected) return;
  const t = h.container.getBoundingClientRect();
  h.align.reRender(h), h.border.reRender(h), h.distance.reRender(h);
  const e = h.selected.getBoundingClientRect();
  let n = i.clientX - e.left, c = i.clientY - e.top, u = null;
  function b(o) {
    u || (u = requestAnimationFrame(() => {
      if (!h.selected) return;
      let r = o.clientX - t.left - n, s = o.clientY - t.top - c;
      const l = h.container.clientWidth - h.selected.offsetWidth, d = h.container.clientHeight - h.selected.offsetHeight;
      r = Math.max(0, Math.min(r, l)), s = Math.max(0, Math.min(s, d)), h.selected.style.left = S(r), h.selected.style.top = S(s), h.align.reRender(h), h.border.reRender(h), h.distance.reRender(h), u = null;
    }));
  }
  function a() {
    document.removeEventListener("pointermove", b), document.removeEventListener("pointerup", a), h.align.hidden(), h.distance.hidden(), u !== null && (cancelAnimationFrame(u), u = null);
  }
  document.addEventListener("pointermove", b), document.addEventListener("pointerup", a);
}
function it(h, i) {
  if (!h.selected) return;
  const t = h.container.getBoundingClientRect(), n = i.target.dataset.direction;
  if (!n) return;
  const c = m.from(h.selected);
  let u = i.clientX, b = i.clientY, a = c.w, o = c.h, r = c.x, s = c.y;
  const l = t.width, d = t.height;
  function x(g) {
    let p = g.clientX - u, v = g.clientY - b, y = a, L = o, R = r, N = s;
    n.includes("right") && (y = a + p), n.includes("left") && (y = a - p, R = r + p), n.includes("bottom") && (L = o + v), n.includes("top") && (L = o - v, N = s + v), R < 0 && (y += R, R = 0), N < 0 && (L += N, N = 0), R + y > l && (y = l - R), N + L > d && (L = d - N), y = Math.max(y, 10), L = Math.max(L, 10), h.resize.reRender(h, y, L, n, r, s, a, o), h.border.reRender(h);
  }
  function A() {
    h.resize.hidden(), document.removeEventListener("pointermove", x), document.removeEventListener("pointerup", A);
  }
  document.addEventListener("pointermove", x), document.addEventListener("pointerup", A);
}
function st(h, i) {
  const t = h.container.getBoundingClientRect(), e = i.clientX - t.left, n = i.clientY - t.top;
  function c(b) {
    const a = b.clientX - t.left, o = b.clientY - t.top;
    h.selector.reRender(h, e, n, a, o);
  }
  function u() {
    h.selector.hiddenSelector(), h.selector.showPreview(), document.removeEventListener("pointermove", c), document.removeEventListener("pointerup", u);
  }
  document.addEventListener("pointermove", c), document.addEventListener("pointerup", u);
}
function nt(h) {
  h.svg.addEventListener("pointerdown", (i) => {
    i.preventDefault();
    const t = i.target;
    if (t.classList[0].includes(`${f}-border-point-`)) {
      const e = t.dataset.ownerId;
      for (let n = 0; n < h.nodes.length; n++)
        e === h.nodes[n].dataset.ownerId && h.setSelected(h.nodes[n]);
      h.selected && it(h, i);
      return;
    }
    if (t.classList.contains(`${f}-svg`)) {
      let e = null;
      for (const n of h.nodes) {
        const c = m.from(n);
        if (c.isInSide({ x: i.offsetX, y: i.offsetY })) {
          e = c;
          break;
        }
      }
      e && e.node.classList.contains(`${f}-movable-node`) && (h.selector.hiddenPreview(), h.setSelected(e.node), et(h, i)), e || (h.border.hidden(), st(h, i));
    }
  });
}
function rt(h) {
  const i = /* @__PURE__ */ new Map();
  function t(a) {
    var r;
    const o = [];
    a.toSorted((s, l) => s.x - l.x).forEach((s) => {
      o.push({ value: s.x, type: "min", nodeRect: s }), o.push({ value: s.x + s.w, type: "max", nodeRect: s });
    }), o.sort((s, l) => s.value - l.value);
    for (let s = 0; s < o.length - 1; s++) {
      const l = [], d = [];
      if (o[s].type === "max" && o[s + 1].type === "min") {
        for (let g = 0; g <= s && o[s].value === o[s - g].value; g++)
          l.push(o[s - g]);
        for (let g = s + 1; g <= o.length && o[s + 1].value === o[g].value; g++)
          d.push(o[g]);
        const x = d[0].value - l[0].value, A = l[0].nodeRect.x + l[0].nodeRect.w;
        if (x > 0) {
          const g = Math.min(...l.map((y) => y.nodeRect.y), ...d.map((y) => y.nodeRect.y)), p = Math.max(
            ...l.map((y) => y.nodeRect.y + y.nodeRect.h),
            ...d.map((y) => y.nodeRect.y + y.nodeRect.h)
          ), v = {
            x: A,
            y: g,
            w: x,
            h: p - g,
            rect1: l.map((y) => y.nodeRect),
            rect2: d.map((y) => y.nodeRect)
          };
          i.has(x) ? (r = i.get(x)) == null || r.push(v) : i.set(x, [v]);
        }
      }
    }
  }
  function e() {
    i.forEach((a, o) => {
      const r = /* @__PURE__ */ new Map();
      a.forEach((s) => {
        r.has(s.x) ? r.get(s.x).push(s) : r.set(s.x, [s]);
      }), r.forEach((s, l) => {
        const d = [], x = [], A = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set();
        s == null || s.forEach((y) => {
          d.push(y.y), x.push(y.y + y.h), y.rect1.forEach((L) => A.add(L)), y.rect2.forEach((L) => g.add(L));
        });
        const p = Math.min(...d), v = Math.max(...x);
        r.set(l, [
          {
            x: l,
            y: p,
            h: v - p,
            w: o,
            rect1: Array.from(A),
            rect2: Array.from(g)
          }
        ]);
      }), i.set(o, Array.from(r.values()).flat());
    });
  }
  const n = [], c = m.from(h.selected);
  h.nodes.forEach((a) => {
    const o = m.from(a);
    n.push(o);
  }), n.sort((a, o) => a.x - o.x);
  const u = [], b = [];
  return n.forEach((a) => {
    a.y <= c.y && a.y + a.h >= c.y || a.y <= c.y + c.h / 2 && a.y + a.h >= c.y + c.h / 2 || a.y <= c.y + c.h && a.y + a.h >= c.y + c.h ? u.push(a) : b.push(a);
  }), t(u), b.forEach((a) => {
    u.push(a), t(u);
  }), e(), i;
}
function lt(h) {
  const i = /* @__PURE__ */ new Map();
  function t(a) {
    var r;
    const o = [];
    a.toSorted((s, l) => s.y - l.y).forEach((s) => {
      o.push({ value: s.y, type: "min", nodeRect: s }), o.push({ value: s.y + s.h, type: "max", nodeRect: s });
    }), o.sort((s, l) => s.value - l.value);
    for (let s = 0; s < o.length - 1; s++) {
      const l = [], d = [];
      if (o[s].type === "max" && o[s + 1].type === "min") {
        for (let g = 0; g <= s && o[s].value === o[s - g].value; g++)
          l.push(o[s - g]);
        for (let g = s + 1; g <= o.length && o[s + 1].value === o[g].value; g++)
          d.push(o[g]);
        const x = d[0].value - l[0].value, A = l[0].nodeRect.y + l[0].nodeRect.h;
        if (x > 0) {
          const g = Math.min(...l.map((y) => y.nodeRect.x), ...d.map((y) => y.nodeRect.x)), p = Math.max(
            ...l.map((y) => y.nodeRect.x + y.nodeRect.w),
            ...d.map((y) => y.nodeRect.x + y.nodeRect.w)
          ), v = {
            x: g,
            y: A,
            w: p - g,
            h: x,
            rect1: l.map((y) => y.nodeRect),
            rect2: d.map((y) => y.nodeRect)
          };
          i.has(x) ? (r = i.get(x)) == null || r.push(v) : i.set(x, [v]);
        }
      }
    }
  }
  function e() {
    i.forEach((a, o) => {
      const r = /* @__PURE__ */ new Map();
      a.forEach((s) => {
        r.has(s.y) ? r.get(s.y).push(s) : r.set(s.y, [s]);
      }), r.forEach((s, l) => {
        const d = [], x = [], A = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set();
        s == null || s.forEach((y) => {
          d.push(y.x), x.push(y.x + y.w), y.rect1.forEach((L) => A.add(L)), y.rect2.forEach((L) => g.add(L));
        });
        const p = Math.min(...d), v = Math.max(...x);
        r.set(l, [
          {
            x: p,
            y: l,
            h: o,
            w: v - p,
            rect1: Array.from(A),
            rect2: Array.from(g)
          }
        ]);
      }), i.set(o, Array.from(r.values()).flat());
    });
  }
  const n = [], c = m.from(h.selected);
  h.nodes.forEach((a) => {
    const o = m.from(a);
    n.push(o);
  }), n.sort((a, o) => a.y - o.y);
  const u = [], b = [];
  return n.forEach((a) => {
    a.x <= c.x && a.x + a.w >= c.x || a.x <= c.x + c.w / 2 && a.x + a.w >= c.x + c.w / 2 || a.x <= c.x + c.w && a.x + a.w >= c.x + c.w ? u.push(a) : b.push(a);
  }), t(u), b.forEach((a) => {
    u.push(a), t(u);
  }), e(), i;
}
class ht {
  constructor(i) {
    $(this, "g");
    this.g = E("g"), this.g.setAttribute("class", `${f}-gap`), i.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(i) {
    if (!i.selected) return;
    this.clear();
    const { left: t, right: e, top: n, bottom: c } = i.distance, u = m.from(i.selected), b = (a) => a < 0 ? 0 : a;
    if (t.node && e.node) {
      const a = m.from(e.node), o = m.from(t.node), r = (a.x - o.x - o.w - u.w) / 2;
      Math.abs(u.x - o.x - o.w - r) <= 3 && (i.selected.style.left = S(o.x + o.w + r), u.sync());
    }
    if (n.node && c.node) {
      const a = m.from(c.node), o = m.from(n.node), r = (a.y - o.y - o.h - u.h) / 2;
      Math.abs(u.y - o.y - o.h - r) <= 3 && (i.selected.style.top = S(o.y + o.h + r), u.sync());
    }
    if (i.align.reRender(i), i.distance.reRender(i), i.border.reRender(i), i.align.isHAlign) {
      const a = [], o = rt(i), r = i.distance.left.length > i.distance.right.length ? e : t;
      if (r.node) {
        const s = m.from(r.node);
        o.forEach((l, d) => {
          if (Math.abs(r.length - d) <= 3 || d <= 20 && Math.abs(r.length - d) <= 4) {
            if ([...l.map((A) => A.rect1.concat(A.rect2))].flat().some((A) => {
              var g;
              return A.id === ((g = i.selected) == null ? void 0 : g.dataset.id);
            })) {
              a.push(...l);
              return;
            }
            r.length === e.length ? (i.selected.style.left = S(s.x - d - u.w), i.distance.left.length = d, a.push(...l), u.sync()) : r.length === t.length && (i.selected.style.left = S(s.x + s.w + d), i.distance.right.length = d, a.push(...l), u.sync()), i.align.reRender(i), i.distance.reRender(i), i.border.reRender(i);
          }
        }), a.length > 1 && a.forEach((l) => {
          const d = E("rect");
          d.setAttribute("x", String(l.x)), d.setAttribute("y", String(l.y)), d.setAttribute(
            "width",
            String(
              r.length === e.length ? b(s.x - u.x - u.w) : b(u.x - s.x - s.w)
            )
          ), d.setAttribute("height", String(l.h)), d.setAttribute("fill", "#F5E0E3"), r.length === e.length && d.setAttribute("width", String(b(s.x - u.x - u.w))), r.length === t.length && d.setAttribute("width", String(b(u.x - s.x - s.w))), this.g.append(d);
        });
      }
    }
    if (i.align.isVAlign) {
      const a = [], o = lt(i), r = i.distance.top.length > i.distance.bottom.length ? c : n;
      if (r.node) {
        const s = m.from(r.node);
        o.forEach((l, d) => {
          if (Math.abs(r.length - d) <= 3 || d <= 20 && Math.abs(r.length - d) <= 4) {
            if ([...l.map((A) => A.rect1.concat(A.rect2))].flat().some((A) => {
              var g;
              return A.id === ((g = i.selected) == null ? void 0 : g.dataset.id);
            })) {
              a.push(...l);
              return;
            }
            r.length === c.length ? (i.selected.style.top = S(s.y - d - u.h), i.distance.top.length = d, a.push(...l), u.sync()) : r.length === n.length && (i.selected.style.top = S(s.y + s.h + d), i.distance.bottom.length = d, a.push(...l), u.sync()), i.align.reRender(i), i.distance.reRender(i), i.border.reRender(i);
          }
        }), a.length > 1 && a.forEach((l) => {
          const d = E("rect");
          d.setAttribute("x", String(l.x)), d.setAttribute("y", String(l.y)), d.setAttribute("width", String(l.w)), d.setAttribute(
            "height",
            String(
              r.length === c.length ? b(s.y - u.y - u.h) : b(u.y - s.y - s.h)
            )
          ), d.setAttribute("fill", "#F5E0E3"), r.length === c.length && d.setAttribute("height", String(b(s.y - u.y - u.h))), r.length === n.length && d.setAttribute("height", String(b(u.y - s.y - s.h))), this.g.append(d);
        });
      }
    }
  }
}
const ct = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let ot = (h = 21) => {
  let i = "", t = crypto.getRandomValues(new Uint8Array(h |= 0));
  for (; h--; )
    i += ct[t[h] & 63];
  return i;
};
const at = 1, ut = "red", H = ["vl", "vc", "vr", "ht", "hc", "hb"];
function gt(h, i) {
  const t = h.container.getBoundingClientRect(), e = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  let n = !1;
  function c() {
    const r = m.from(h.selected), s = h.nodes.filter((l) => l !== h.selected).map((l) => m.from(l));
    H.forEach((l) => e[l] = []), s.forEach((l) => {
      if (r.isIntersect(l)) return;
      const d = r.getAlignLinePostion();
      H.forEach((x) => {
        let A = 1e4, g = 1e4, p;
        /^h/.test(x) && (r.x > l.x + l.w ? (A = r.x + r.w, g = l.x) : r.x + r.w < l.x ? (A = r.x, g = l.x + l.w) : (A = Math.min(r.x, l.x), g = Math.max(r.x + r.w, l.x + l.w)), [l.y, l.y + l.h / 2, l.y + l.h].forEach((v) => {
          p = Math.abs(d[x] - v), p <= 3 && e[x].push({
            type: x,
            source: A,
            target: g,
            absorbDistance: p,
            absorbPosition: v,
            nodeRects: [l]
          });
        })), /^v/.test(x) && (r.y > l.y + l.h ? (A = r.y + r.h, g = l.y) : r.y + r.h < l.y ? (A = r.y, g = l.y + l.h) : (A = Math.min(r.y, l.y), g = Math.max(r.y + r.h, l.y + l.h)), [l.x, l.x + l.w / 2, l.x + l.w].forEach((v) => {
          p = Math.abs(d[x] - v), p <= 3 && e[x].push({
            type: x,
            source: A,
            target: g,
            absorbDistance: p,
            absorbPosition: v,
            nodeRects: [l]
          });
        }));
      });
    }), H.forEach((l) => {
      const d = /* @__PURE__ */ new Map();
      e[l].forEach((g) => {
        const p = d.get(g.absorbDistance) || [];
        p.push(g), d.set(g.absorbDistance, p);
      });
      let x = 1 / 0, A = 0;
      d.forEach((g) => {
        g.forEach((p) => {
          x = Math.min(x, p.source, p.target), A = Math.max(A, p.source, p.target);
        });
      }), d.forEach((g) => {
        g.forEach((p) => {
          p.source = x, p.target = A;
        });
      }), e[l] = Array.from(d.values()).flat();
    });
  }
  function u(r) {
    const { absorbPosition: s, type: l } = r, d = h.selected;
    switch (l) {
      case "ht":
        d.style.top = S(s);
        break;
      case "hc":
        d.style.top = S(s - parseFloat(d.style.height) / 2);
        break;
      case "hb":
        d.style.top = S(s - parseFloat(d.style.height));
        break;
      case "vl":
        d.style.left = S(s);
        break;
      case "vc":
        d.style.left = S(s - parseFloat(d.style.width) / 2);
        break;
      case "vr":
        d.style.left = S(s - parseFloat(d.style.width));
        break;
    }
    c(), h.border.reRender(h);
  }
  function b() {
    if (!h.selected) return;
    const r = m.from(h.selected), s = t.width / 2;
    Math.abs(r.x + r.w / 2 - s) <= 3 && (h.selected.style.left = S(s - r.w / 2), n = !0), c(), h.border.reRender(h);
  }
  function a() {
    if (!h.selected) return;
    const r = m.from(h.selected), s = Object.values(e).flat();
    if ([...e.hb, ...e.hc, ...e.ht].length === 0 ? i.isHAlign = !1 : i.isHAlign = !0, [...e.vc, ...e.vl, ...e.vr].length === 0 ? i.isVAlign = !1 : i.isVAlign = !0, s.forEach((l) => {
      const { source: d, target: x, type: A } = l, g = i.lines[A];
      if (/^h/.test(A))
        switch (g == null || g.setAttribute("x1", String(d)), g == null || g.setAttribute("x2", String(x)), A) {
          case "ht":
            g.setAttribute("y1", String(r.y)), g.setAttribute("y2", String(r.y));
            break;
          case "hc":
            g.setAttribute("y1", String(r.y + r.h / 2)), g.setAttribute("y2", String(r.y + r.h / 2));
            break;
          case "hb":
            g.setAttribute("y1", String(r.y + r.h)), g.setAttribute("y2", String(r.y + r.h));
            break;
        }
      if (/^v/.test(A))
        switch (g == null || g.setAttribute("y1", String(d)), g == null || g.setAttribute("y2", String(x)), A) {
          case "vl":
            g.setAttribute("x1", String(r.x)), g.setAttribute("x2", String(r.x));
            break;
          case "vc":
            g.setAttribute("x1", String(r.x + r.w / 2)), g.setAttribute("x2", String(r.x + r.w / 2));
            break;
          case "vr":
            g.setAttribute("x1", String(r.x + r.w)), g.setAttribute("x2", String(r.x + r.w));
            break;
        }
      g == null || g.setAttribute("style", "display: 'block");
    }), n) {
      const l = i.lines.vertical;
      l.setAttribute("x1", String(t.width / 2)), l.setAttribute("y1", String(0)), l.setAttribute("x2", String(t.width / 2)), l.setAttribute("y2", String(t.height)), l == null || l.setAttribute("style", "display: 'block");
    }
  }
  c(), Object.values(e).flat().forEach((r) => {
    u(r);
  }), b();
  let o = 1 / 0;
  H.forEach((r) => {
    e[r].forEach((s) => {
      s.absorbDistance < o && (o = s.absorbDistance);
    });
  }), H.forEach((r) => {
    e[r] = e[r].filter((s) => P(s.absorbDistance, o, 0.01));
  }), a();
}
class dt {
  constructor(i) {
    $(this, "g");
    $(this, "lines");
    $(this, "isHAlign", !1);
    $(this, "isVAlign", !1);
    this.g = E("g"), this.g.setAttribute("class", `${f}-align`), this.lines = {}, [...H, "vertical"].forEach((t) => {
      const e = E("line");
      e.setAttribute("class", `${f}-align-${t}`), e.setAttribute("stroke", ut), e.setAttribute("stroke-width", String(at)), e.style.display = "none", this.g.append(e), this.lines[t] = e;
    }), i.append(this.g);
  }
  hidden() {
    Object.values(this.lines).forEach((i) => {
      i.style.display = "none";
    });
  }
  reRender(i) {
    i.selected && (this.hidden(), gt(i, this));
  }
}
const I = 1, q = "#000", X = 6, U = ["left", "top", "right", "bottom"], Q = [
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
function ft() {
  const h = [], i = [];
  return U.forEach((t) => {
    const e = E("line");
    e.setAttribute("class", `${f}-border-line-${t}`), e.setAttribute("stroke", q), e.setAttribute("stroke-width", S(I)), i.push(e);
  }), Q.forEach((t, e) => {
    const n = E("rect");
    n.setAttribute("class", `${f}-border-point-${t}`), n.setAttribute("fill", "white"), n.setAttribute("stroke", q), n.setAttribute("stroke-width", S(I)), n.setAttribute("width", S(X)), n.setAttribute("height", S(X)), n.setAttribute("style", `cursor: ${bt[e]}`), n.setAttribute("data-direction", t), h.push(n);
  }), [h, i];
}
function yt(h, i) {
  const t = m.from(i);
  U.forEach((e) => {
    const n = w(h, `${f}-border-line-${e}`);
    switch (e) {
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
  }), Q.forEach((e, n) => {
    const c = w(h, `${f}-border-point-${e}`);
    c.setAttribute("data-owner-id", i.dataset.id);
    const u = X / 2;
    switch (e) {
      case "left-top":
        c.setAttribute("x", String(t.x - u)), c.setAttribute("y", String(t.y - u));
        break;
      case "top":
        c.setAttribute("x", String(t.x + t.w / 2 - u)), c.setAttribute("y", String(t.y - u));
        break;
      case "right-top":
        c.setAttribute("x", String(t.x + t.w - u)), c.setAttribute("y", String(t.y - u));
        break;
      case "right":
        c.setAttribute("x", String(t.x + t.w - u)), c.setAttribute("y", String(t.y + t.h / 2 - u));
        break;
      case "right-bottom":
        c.setAttribute("x", String(t.x + t.w - u)), c.setAttribute("y", String(t.y + t.h - u));
        break;
      case "bottom":
        c.setAttribute("x", String(t.x + t.w / 2 - u)), c.setAttribute("y", String(t.y + t.h - u));
        break;
      case "left-bottom":
        c.setAttribute("x", String(t.x - u)), c.setAttribute("y", String(t.y + t.h - u));
        break;
      case "left":
        c.setAttribute("x", String(t.x - u)), c.setAttribute("y", String(t.y + t.h / 2 - u));
        break;
    }
  });
}
class At {
  constructor(i) {
    $(this, "g");
    $(this, "points");
    $(this, "lines");
    this.g = E("g"), this.g.setAttribute("class", `${f}-border`), i.append(this.g);
    const [t, e] = ft();
    this.points = t, this.lines = e, this.g.append(...e, ...t), this.g.style.display = "none";
  }
  hidden() {
    this.g.style.display = "none";
  }
  reRender(i) {
    i.selected && (this.g.style.display = "block", yt(this.g, i.selected));
  }
}
const B = 1, z = "#2A63F4", F = 8, O = 10, Z = 10;
function V(h) {
  const i = h.nodes.map((n) => m.from(n)), t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map();
  return i.forEach((n) => {
    var b, a;
    const c = {
      type: "width",
      nodeRect: n
    }, u = {
      type: "height",
      nodeRect: n
    };
    t.has(n.w) ? (b = t.get(n.w)) == null || b.push(c) : t.set(n.w, [c]), e.has(n.h) ? (a = e.get(n.h)) == null || a.push(u) : e.set(n.h, [u]);
  }), {
    widthMap: t,
    heightMap: e
  };
}
function xt(h) {
  h.nodes.forEach((i) => {
    const t = m.from(i), e = h.resize.g.querySelector(`[data-ower-id="${t.id}"]`), n = w(e, `${f}-resize-line-group-width-line`), c = w(e, `${f}-resize-line-group-width-line-start`), u = w(e, `${f}-resize-line-group-width-line-end`), b = w(e, `${f}-resize-line-group-width-text`), a = w(e, `${f}-resize-line-group-height-line`), o = w(e, `${f}-resize-line-group-height-text`), r = w(e, `${f}-resize-line-group-height-line-start`), s = w(e, `${f}-resize-line-group-height-line-end`);
    n.setAttribute("x1", String(t.x)), n.setAttribute("y1", String(t.y - F)), n.setAttribute("x2", String(t.x + t.w)), n.setAttribute("y2", String(t.y - F)), c.setAttribute("x", String(t.x - B / 2)), c.setAttribute("y", String(t.y - F - O / 2)), c.setAttribute("width", String(B)), c.setAttribute("height", String(O)), c.setAttribute("fill", String(z)), u.setAttribute("x", String(t.x + t.w - B / 2)), u.setAttribute("y", String(t.y - F - O / 2)), u.setAttribute("width", String(B)), u.setAttribute("height", String(O)), u.setAttribute("fill", String(z)), b.textContent = `${C(t.w)}`, b.setAttribute("x", String(t.x + t.w / 2)), b.setAttribute("y", String(t.y - F - 8)), b.setAttribute("fill", String(z)), b.setAttribute("font-size", String(Z)), b.setAttribute("text-anchor", "middle"), b.setAttribute("alignment-baseline", "middle"), a.setAttribute("x1", String(t.x - F)), a.setAttribute("y1", String(t.y)), a.setAttribute("x2", String(t.x - F)), a.setAttribute("y2", String(t.y + t.h)), r.setAttribute("x", String(t.x - F - O / 2)), r.setAttribute("y", String(t.y - B / 2)), r.setAttribute("width", String(O)), r.setAttribute("height", String(B)), r.setAttribute("fill", String(z)), s.setAttribute("x", String(t.x - F - O / 2)), s.setAttribute("y", String(t.y + t.h - B / 2)), s.setAttribute("width", String(O)), s.setAttribute("height", String(B)), s.setAttribute("fill", String(z)), o.textContent = `${C(t.h)}`, o.setAttribute("x", String(t.x - F - 8)), o.setAttribute("y", String(t.y + t.h / 2)), o.setAttribute("fill", String(z)), o.setAttribute("font-size", String(Z)), o.setAttribute("text-anchor", "middle"), o.setAttribute("alignment-baseline", "middle"), o.setAttribute(
      "transform",
      `rotate(-90 ${t.x - F - 8} ${t.y + t.h / 2})`
    ), [n, a].forEach((l) => {
      l.setAttribute("stroke", z), l.setAttribute("stroke-width", String(B));
    });
  });
}
class pt {
  constructor(i, t) {
    $(this, "g");
    $(this, "lines");
    this.g = E("g"), this.g.setAttribute("class", `${f}-resize`);
    const e = [];
    t.forEach((n) => {
      const c = m.from(n), u = E("g");
      u.setAttribute("class", `${f}-resize-line`), u.setAttribute("data-ower-id", c.id);
      const b = E("g");
      b.setAttribute("class", `${f}-resize-line-group-width`);
      const a = E("line");
      a.setAttribute("class", `${f}-resize-line-group-width-line`);
      const o = E("text");
      o.setAttribute("class", `${f}-resize-line-group-width-text`);
      const r = E("rect");
      r.setAttribute("class", `${f}-resize-line-group-width-line-start`);
      const s = E("rect");
      s.setAttribute("class", `${f}-resize-line-group-width-line-end`), b.append(a, o, r, s);
      const l = E("g");
      l.setAttribute("class", `${f}-resize-line-group-height`);
      const d = E("line");
      d.setAttribute("class", `${f}-resize-line-group-height-line`);
      const x = E("text");
      x.setAttribute("class", `${f}-resize-line-group-height-text`);
      const A = E("rect");
      A.setAttribute("class", `${f}-resize-line-group-height-line-start`);
      const g = E("rect");
      g.setAttribute("class", `${f}-resize-line-group-height-line-end`), l.append(d, x, A, g), u.append(b, l), e.push(u);
    }), this.lines = e, this.g.append(...this.lines), i.append(this.g), this.hidden();
  }
  hidden() {
    this.lines.forEach((i) => {
      Array.from(i.children).forEach((t) => {
        t.style.display = "none";
      });
    });
  }
  reRender(i, t, e, n, c, u, b, a) {
    var j, Y;
    if (!i.selected) return;
    this.hidden();
    const { widthMap: o, heightMap: r } = V(i), s = [], l = [];
    o.forEach((D, T) => {
      var _;
      D.length === 1 && D[0].nodeRect.id === ((_ = i.selected) == null ? void 0 : _.dataset.id) || Math.abs(t - T) <= 3 && s.push(T);
    }), r.forEach((D, T) => {
      var _;
      D.length === 1 && D[0].nodeRect.id === ((_ = i.selected) == null ? void 0 : _.dataset.id) || Math.abs(e - T) <= 3 && l.push(T);
    });
    const d = s.length === 0 ? t : Math.max(...s), x = l.length === 0 ? e : Math.max(...l), A = Math.max(d, 10), g = Math.max(x, 10);
    if (n.includes("left")) {
      const D = c + b;
      i.selected.style.left = S(D - A);
    } else
      i.selected.style.left = S(c);
    if (i.selected.style.width = S(A), n.includes("top")) {
      const D = u + a;
      i.selected.style.top = S(D - g);
    } else
      i.selected.style.top = S(u);
    i.selected.style.height = S(g);
    const p = parseFloat(i.selected.style.width), v = parseFloat(i.selected.style.height), { widthMap: y, heightMap: L } = V(i);
    (j = y.get(p)) == null || j.forEach((D) => {
      const T = this.g.querySelector(`[data-ower-id="${D.nodeRect.id}"]`), _ = w(T, `${f}-resize-line-group-width`);
      _.style.display = "block";
    }), (Y = L.get(v)) == null || Y.forEach((D) => {
      const T = this.g.querySelector(`[data-ower-id="${D.nodeRect.id}"]`), _ = w(T, `${f}-resize-line-group-height`);
      _.style.display = "block";
    });
    const R = this.g.querySelector(`[data-ower-id="${i.selected.dataset.id}"]`), N = w(R, `${f}-resize-line-group-width`), J = w(R, `${f}-resize-line-group-height`);
    J.style.display = "block", N.style.display = "block", xt(i), i.border.reRender(i);
  }
}
function wt(h, i, t, e) {
  return t - h > 0 && e - i > 0 ? "4" : t - h < 0 && e - i > 0 ? "3" : t - h < 0 && e - i < 0 ? "2" : t - h > 0 && e - i < 0 ? "1" : "0";
}
class St {
  constructor(i) {
    $(this, "g");
    // 选择框矩形
    $(this, "selectorRect");
    $(this, "previewRect");
    $(this, "selectedGroup", []);
    this.g = E("g"), this.g.setAttribute("class", `${f}-selector`), this.selectorRect = E("rect"), this.selectorRect.setAttribute("class", `${f}-selector-rect`), this.selectorRect.setAttribute("stroke", "#919191"), this.selectorRect.setAttribute("stroke-width", "1px"), this.selectorRect.setAttribute("fill", "rgba(255,255,255,0.3)"), this.selectorRect.style.display = "none", this.previewRect = E("rect"), this.previewRect.setAttribute("class", `${f}-selector-preview`), this.previewRect.setAttribute("stroke", "#000"), this.previewRect.setAttribute("stroke-width", "1px"), this.previewRect.setAttribute("fill", "transparent"), this.previewRect.style.display = "none", this.g.append(this.selectorRect, this.previewRect), i.append(this.g);
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
  reRender(i, t, e, n, c) {
    this.showSelector(), this.hiddenPreview(), this.selectedGroup = [];
    const u = wt(t, e, n, c), b = Math.abs(t - n), a = Math.abs(e - c);
    this.selectorRect.setAttribute("width", String(b)), this.selectorRect.setAttribute("height", String(a));
    let o = t, r = e;
    switch (u) {
      case "3": {
        o = o - b;
        break;
      }
      case "2": {
        o = o - b, r = r - a;
        break;
      }
      case "1": {
        r = r - a;
        break;
      }
    }
    this.selectorRect.setAttribute("x", String(o)), this.selectorRect.setAttribute("y", String(r)), i.nodes.forEach((p) => {
      m.from(p).isIntersect({
        x: o,
        y: r,
        w: b,
        h: a
      }) && this.selectedGroup.push(p);
    });
    const s = [], l = [], d = [], x = [];
    this.selectedGroup.forEach((p) => {
      const { x: v, y, w: L, h: R } = m.from(p);
      s.push(v), l.push(y), d.push(v + L), x.push(y + R);
    });
    const A = Math.min(...s), g = Math.min(...l);
    this.previewRect.setAttribute("x", String(s.length ? A : 0)), this.previewRect.setAttribute("y", String(l.length ? g : 0)), this.previewRect.setAttribute("width", String(d.length ? Math.max(...d) - A : 0)), this.previewRect.setAttribute("height", String(x.length ? Math.max(...x) - g : 0));
  }
}
const k = "#3875F6", G = 1, M = 10, mt = ["left", "right", "top", "bottom"];
function Et(h) {
  const i = [], t = m.from(h.selected);
  h.nodes.forEach((e) => {
    const n = m.from(e);
    i.push(n);
  }), i.forEach((e) => {
    if (e.y <= t.y && e.y + e.h >= t.y || e.y <= t.y + t.h / 2 && e.y + e.h >= t.y + t.h / 2 || e.y <= t.y + t.h && e.y + e.h >= t.y + t.h) {
      if (t.x + t.w < e.x) {
        const c = Math.abs(t.x + t.w - e.x);
        h.distance.right.length > c && (h.distance.right.length = c, h.distance.right.node = e.node);
      }
      if (t.x > e.x + e.w) {
        const c = Math.abs(t.x - e.x - e.w);
        h.distance.left.length > c && (h.distance.left.length = c, h.distance.left.node = e.node);
      }
    }
  }), i.forEach((e) => {
    if (e.x <= t.x && e.x + e.w >= t.x || e.x <= t.x + t.w / 2 && e.x + e.w >= t.x + t.w / 2 || e.x <= t.x + t.w && e.x + e.w >= t.x + t.w) {
      if (t.y + t.h < e.y) {
        const c = Math.abs(t.y + t.h - e.y);
        h.distance.bottom.length > c && (h.distance.bottom.length = c, h.distance.bottom.node = e.node);
      }
      if (t.y > e.y + e.h) {
        const c = Math.abs(t.y - e.y - e.h);
        h.distance.top.length > c && (h.distance.top.length = c, h.distance.top.node = e.node);
      }
    }
  });
}
function W(h) {
  const i = [0, 4, 8, 12, 16];
  for (const t of i)
    if (t - 2 <= h && t + 2 >= h) return t;
  return h;
}
class $t {
  constructor(i) {
    $(this, "g");
    $(this, "lines");
    $(this, "left");
    $(this, "right");
    $(this, "top");
    $(this, "bottom");
    this.g = E("g"), this.g.setAttribute("class", `${f}-distance`), this.lines = {};
    const t = (e) => {
      const n = E("g");
      n.setAttribute("class", `${f}-distance-${e}`);
      const c = E("line");
      c.setAttribute("class", `${f}-distance-${e}-line`);
      const u = E("line");
      u.setAttribute("class", `${f}-distance-${e}-dash-line`);
      const b = E("text");
      b.setAttribute("class", `${f}-distance-${e}-text`);
      const a = E("rect");
      a.setAttribute("class", `${f}-distance-${e}-text-bg`);
      const o = E("rect");
      o.setAttribute("class", `${f}-distance-${e}-line-start`);
      const r = E("rect");
      return r.setAttribute("class", `${f}-distance-${e}-line-end`), n.appendChild(c), n.appendChild(u), n.appendChild(a), n.appendChild(b), n.appendChild(o), n.appendChild(r), n;
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
      const n = t(e);
      this.lines[e] = n;
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
          const l = W(this.left.length);
          l !== this.left.length && (i.selected.style.left = S(parseFloat(i.selected.style.left) - this.left.length + l), this.left.length = l, i.align.reRender(i), i.border.reRender(i));
        }
        const t = m.from(this.left.node), e = m.from(i.selected), n = w(this.lines.left, `${f}-distance-left-line`);
        n.setAttribute("x1", String(t.x + t.w)), n.setAttribute("x2", String(e.x)), n.setAttribute("y1", String(e.y + e.h / 2)), n.setAttribute("y2", String(e.y + e.h / 2)), n.setAttribute("stroke", k), n.setAttribute("stroke-width", String(G));
        const c = w(this.lines.left, `${f}-distance-left-text`);
        c.textContent = `${C(this.left.length, !0)}`, c.setAttribute("x", String((t.x + t.w + e.x) / 2)), c.setAttribute("y", String(e.y + e.h / 2 - 9)), c.setAttribute("fill", "#FFFFFF"), c.setAttribute("font-size", String(M)), c.setAttribute("text-anchor", "middle"), c.setAttribute("alignment-baseline", "middle");
        const u = w(this.lines.left, `${f}-distance-left-text-bg`);
        u.setAttribute(
          "x",
          String((t.x + t.w + e.x) / 2 - (c.getComputedTextLength() + 10) / 2)
        ), u.setAttribute("y", String(e.y + e.h / 2 - M / 2 - 12)), u.setAttribute("width", String(c.getComputedTextLength() + 10)), u.setAttribute("height", String(M + 4)), u.setAttribute("fill", k), u.setAttribute("rx", "4"), u.setAttribute("ry", "4");
        const b = 1, a = 8, o = w(this.lines.left, `${f}-distance-left-line-start`);
        o.setAttribute("x", String(t.x + t.w - b / 2)), o.setAttribute("y", String(e.y + e.h / 2 - a / 2)), o.setAttribute("width", String(b)), o.setAttribute("height", String(a)), o.setAttribute("fill", k);
        const r = w(this.lines.left, `${f}-distance-left-line-end`);
        r.setAttribute("x", String(e.x - b / 2)), r.setAttribute("y", String(e.y + e.h / 2 - a / 2)), r.setAttribute("width", String(b)), r.setAttribute("height", String(a)), r.setAttribute("fill", k);
        const s = w(this.lines.left, `${f}-distance-left-dash-line`);
        e.y < t.y ? (s.setAttribute("x1", String(t.x + t.w)), s.setAttribute("x2", String(t.x + t.w)), s.setAttribute("y1", String(e.y)), s.setAttribute("y2", String(t.y)), s.setAttribute("stroke", k), s.setAttribute("stroke-width", "1"), s.setAttribute("stroke-dasharray", "4 4"), s.setAttribute("style", "display: block;")) : e.y + e.h > t.y + t.h ? (s.setAttribute("x1", String(t.x + t.w)), s.setAttribute("x2", String(t.x + t.w)), s.setAttribute("y1", String(t.y + t.h)), s.setAttribute("y2", String(e.y + e.h)), s.setAttribute("stroke", k), s.setAttribute("stroke-width", "1"), s.setAttribute("stroke-dasharray", "4 4"), s.setAttribute("style", "display: block;")) : s.setAttribute("style", "display: none;");
      }
      if (this.right.node && this.right.node.id !== i.selected.dataset.id) {
        if (i.align.isHAlign) {
          const l = W(this.right.length);
          l !== this.right.length && (i.selected.style.left = S(parseFloat(i.selected.style.left) + this.right.length - l), this.right.length = l, i.align.reRender(i), i.border.reRender(i));
        }
        const t = m.from(this.right.node), e = m.from(i.selected), n = w(this.lines.right, `${f}-distance-right-line`);
        n.setAttribute("x1", String(e.x + e.w)), n.setAttribute("x2", String(t.x)), n.setAttribute("y1", String(e.y + e.h / 2)), n.setAttribute("y2", String(e.y + e.h / 2)), n.setAttribute("stroke", k), n.setAttribute("stroke-width", String(G));
        const c = w(this.lines.right, `${f}-distance-right-text`);
        c.textContent = `${C(this.right.length, !0)}`, c.setAttribute("x", String((e.x + e.w + t.x) / 2)), c.setAttribute("y", String(e.y + e.h / 2 - 9)), c.setAttribute("fill", "#FFFFFF"), c.setAttribute("font-size", String(M)), c.setAttribute("text-anchor", "middle"), c.setAttribute("alignment-baseline", "middle");
        const u = w(this.lines.right, `${f}-distance-right-text-bg`);
        u.setAttribute(
          "x",
          String((e.x + e.w + t.x) / 2 - (c.getComputedTextLength() + 10) / 2)
        ), u.setAttribute("y", String(e.y + e.h / 2 - M / 2 - 12)), u.setAttribute("width", String(c.getComputedTextLength() + 10)), u.setAttribute("height", String(M + 4)), u.setAttribute("fill", k), u.setAttribute("rx", "4"), u.setAttribute("ry", "4");
        const b = 1, a = 8, o = w(this.lines.right, `${f}-distance-right-line-start`);
        o.setAttribute("x", String(e.x + e.w - b / 2)), o.setAttribute("y", String(e.y + e.h / 2 - a / 2)), o.setAttribute("width", String(b)), o.setAttribute("height", String(a)), o.setAttribute("fill", k);
        const r = w(this.lines.right, `${f}-distance-right-line-end`);
        r.setAttribute("x", String(t.x - b / 2)), r.setAttribute("y", String(e.y + e.h / 2 - a / 2)), r.setAttribute("width", String(b)), r.setAttribute("height", String(a)), r.setAttribute("fill", k);
        const s = w(this.lines.right, `${f}-distance-right-dash-line`);
        e.y < t.y ? (s.setAttribute("x1", String(t.x)), s.setAttribute("x2", String(t.x)), s.setAttribute("y1", String(e.y)), s.setAttribute("y2", String(t.y)), s.setAttribute("stroke", k), s.setAttribute("stroke-width", "1"), s.setAttribute("stroke-dasharray", "4 4"), s.setAttribute("style", "display: block;")) : e.y + e.h > t.y + t.h ? (s.setAttribute("x1", String(t.x)), s.setAttribute("x2", String(t.x)), s.setAttribute("y1", String(t.y + t.h)), s.setAttribute("y2", String(e.y + e.h)), s.setAttribute("stroke", k), s.setAttribute("stroke-width", "1"), s.setAttribute("stroke-dasharray", "4 4"), s.setAttribute("style", "display: block;")) : s.setAttribute("style", "display: none;");
      }
      if (this.top.node && this.top.node.id !== i.selected.dataset.id) {
        if (i.align.isVAlign) {
          const l = W(this.top.length);
          l !== this.top.length && (i.selected.style.top = S(parseFloat(i.selected.style.top) - this.top.length + l), this.top.length = l, i.border.reRender(i));
        }
        const t = m.from(this.top.node), e = m.from(i.selected), n = w(this.lines.top, `${f}-distance-top-line`);
        n.setAttribute("x1", String(e.x + e.w / 2)), n.setAttribute("x2", String(e.x + e.w / 2)), n.setAttribute("y1", String(e.y)), n.setAttribute("y2", String(t.y + t.h)), n.setAttribute("stroke", k), n.setAttribute("stroke-width", String(G));
        const c = w(this.lines.top, `${f}-distance-top-text`);
        c.textContent = `${C(this.top.length, !0)}`, c.setAttribute("x", String(e.x + e.w / 2 + (c.getComputedTextLength() + 10) / 2 + 3)), c.setAttribute("y", String((e.y + t.y + t.h) / 2 + 1)), c.setAttribute("fill", "#FFFFFF"), c.setAttribute("font-size", String(M)), c.setAttribute("text-anchor", "middle"), c.setAttribute("alignment-baseline", "middle");
        const u = w(this.lines.top, `${f}-distance-top-text-bg`);
        u.setAttribute("x", String(e.x + e.w / 2 + 3)), u.setAttribute("y", String((e.y + t.y + t.h) / 2 - (M + 4) / 2)), u.setAttribute("width", String(c.getComputedTextLength() + 10)), u.setAttribute("height", String(M + 4)), u.setAttribute("fill", k), u.setAttribute("rx", "4"), u.setAttribute("ry", "4");
        const b = 8, a = 1, o = w(this.lines.top, `${f}-distance-top-line-start`);
        o.setAttribute("x", String(e.x + e.w / 2 - b / 2)), o.setAttribute("y", String(t.y + t.h - a / 2)), o.setAttribute("width", String(b)), o.setAttribute("height", String(a)), o.setAttribute("fill", k);
        const r = w(this.lines.top, `${f}-distance-top-line-end`);
        r.setAttribute("x", String(e.x + e.w / 2 - b / 2)), r.setAttribute("y", String(e.y - a / 2)), r.setAttribute("width", String(b)), r.setAttribute("height", String(a)), r.setAttribute("fill", k);
        const s = w(this.lines.top, `${f}-distance-top-dash-line`);
        e.x < t.x ? (s.setAttribute("x1", String(e.x)), s.setAttribute("x2", String(t.x)), s.setAttribute("y1", String(t.y + t.h)), s.setAttribute("y2", String(t.y + t.h)), s.setAttribute("stroke", k), s.setAttribute("stroke-width", "1"), s.setAttribute("stroke-dasharray", "4 4"), s.setAttribute("style", "display: block;")) : e.x + e.w > t.x + t.w ? (s.setAttribute("x1", String(t.x + t.w)), s.setAttribute("x2", String(e.x + e.w)), s.setAttribute("y1", String(t.y + t.h)), s.setAttribute("y2", String(t.y + t.h)), s.setAttribute("stroke", k), s.setAttribute("stroke-width", "1"), s.setAttribute("stroke-dasharray", "4 4"), s.setAttribute("style", "display: block;")) : s.setAttribute("style", "display: none;");
      }
      if (this.bottom.node && this.bottom.node.id !== i.selected.dataset.id) {
        if (i.align.isVAlign) {
          const d = W(this.bottom.length);
          d !== this.bottom.length && (i.selected.style.top = S(parseFloat(i.selected.style.top) + this.bottom.length - d), this.bottom.length = d, i.border.reRender(i));
        }
        const t = m.from(this.bottom.node), e = m.from(i.selected), n = w(this.lines.bottom, `${f}-distance-bottom-line`);
        n.setAttribute("x1", String(e.x + e.w / 2)), n.setAttribute("x2", String(e.x + e.w / 2)), n.setAttribute("y1", String(e.y + e.h)), n.setAttribute("y2", String(t.y)), n.setAttribute("stroke", k), n.setAttribute("stroke-width", String(G));
        const c = w(this.lines.bottom, `${f}-distance-bottom-text`);
        c.textContent = `${C(this.bottom.length, !0)}`;
        const u = e.x + e.w / 2 + (c.getComputedTextLength() + 10) / 2 + 3;
        c.setAttribute("x", String(u)), c.setAttribute("y", String((e.y + e.h + t.y) / 2 + 1)), c.setAttribute("fill", "#FFFFFF"), c.setAttribute("font-size", String(M)), c.setAttribute("text-anchor", "middle"), c.setAttribute("alignment-baseline", "middle");
        const b = w(this.lines.bottom, `${f}-distance-bottom-text-bg`);
        b.setAttribute("x", String(e.x + e.w / 2 + 3)), b.setAttribute("y", String((e.y + e.h + t.y) / 2 - (M + 4) / 2)), b.setAttribute("width", String(c.getComputedTextLength() + 10)), b.setAttribute("height", String(M + 4)), b.setAttribute("fill", k), b.setAttribute("rx", "4"), b.setAttribute("ry", "4");
        const a = 8, o = 1, r = w(
          this.lines.bottom,
          `${f}-distance-bottom-line-start`
        );
        r.setAttribute("x", String(e.x + e.w / 2 - a / 2)), r.setAttribute("y", String(e.y + e.h - o / 2)), r.setAttribute("width", String(a)), r.setAttribute("height", String(o)), r.setAttribute("fill", k);
        const s = w(this.lines.bottom, `${f}-distance-bottom-line-end`);
        s.setAttribute("x", String(e.x + e.w / 2 - a / 2)), s.setAttribute("y", String(t.y - o / 2)), s.setAttribute("width", String(a)), s.setAttribute("height", String(o)), s.setAttribute("fill", k);
        const l = w(this.lines.bottom, `${f}-distance-bottom-dash-line`);
        e.x < t.x ? (l.setAttribute("x1", String(e.x)), l.setAttribute("x2", String(t.x)), l.setAttribute("y1", String(t.y)), l.setAttribute("y2", String(t.y)), l.setAttribute("stroke", k), l.setAttribute("stroke-width", "1"), l.setAttribute("stroke-dasharray", "4 4"), l.setAttribute("style", "display: block;")) : e.x + e.w > t.x + t.w ? (l.setAttribute("x1", String(t.x + t.w)), l.setAttribute("x2", String(e.x + e.w)), l.setAttribute("y1", String(t.y)), l.setAttribute("y2", String(t.y)), l.setAttribute("stroke", k), l.setAttribute("stroke-width", "1"), l.setAttribute("stroke-dasharray", "4 4"), l.setAttribute("style", "display: block;")) : l.setAttribute("style", "display: none;");
      }
      i.align.isHAlign && (P(this.left.length, this.right.length) ? (this.lines.left.style = "display: block;", this.lines.right.style = "display: block;") : this.left.length > this.right.length ? this.lines.right.style = "display: block;" : this.lines.left.style = "display: block;"), i.align.isVAlign && (P(this.top.length, this.bottom.length) ? (this.lines.top.style = "display: block;", this.lines.bottom.style = "display: block;") : this.top.length > this.bottom.length ? this.lines.bottom.style = "display: block;" : this.lines.top.style = "display: block;");
    }
  }
}
const vt = (h, i) => {
  const t = E("svg");
  t.setAttribute("class", `${f}-svg`);
  const e = h.getBoundingClientRect();
  return t.setAttribute("width", S(e.width)), t.setAttribute("height", S(e.height)), t.style = "position: absolute; inset: 0;", h.className += ` ${f}-container`, i.forEach((n) => {
    n.className += ` ${f}-movable-node`, n.setAttribute("data-id", ot()), /%$/.test(n.style.top) && (n.style.top = S(e.width * parseFloat(n.style.top) / 100)), /%$/.test(n.style.left) && (n.style.left = S(e.height * parseFloat(n.style.left) / 100)), /%$/.test(n.style.width) && (n.style.width = S(e.width * parseFloat(n.style.width) / 100)), /%$/.test(n.style.height) && (n.style.height = S(e.height * parseFloat(n.style.height) / 100));
  }), {
    container: h,
    nodes: i,
    svg: t,
    selected: null,
    setSelected(n) {
      if (this.selected = n, !n) {
        this.border.hidden();
        return;
      }
      this.border.reRender(this);
    },
    gap: new ht(t),
    align: new dt(t),
    distance: new $t(t),
    border: new At(t),
    resize: new pt(t, i),
    selector: new St(t)
  };
};
class Lt {
  constructor(i, t) {
    $(this, "store");
    this.store = vt(i, t), nt(this.store);
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
    const n = e.getBoundingClientRect(), c = m.from(t);
    switch (i) {
      case "start":
        t.style.left = S(0);
        break;
      case "center":
        t.style.left = S(n.width / 2 - c.w / 2);
        break;
      case "end":
        t.style.left = S(n.width - c.w);
        break;
    }
  }
}
export {
  Lt as default
};
