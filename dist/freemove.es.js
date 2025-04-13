var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const Tolerance = 3;
class Rect {
  constructor({ x, y, h, w, node }) {
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "w");
    __publicField(this, "h");
    __publicField(this, "node");
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.node = node;
  }
  // 判断一个点是否在矩形里面
  isInSide(position) {
    if (position.x >= this.x && position.x <= this.x + this.w && position.y >= this.y && position.y <= this.y + this.h) {
      return true;
    }
    return false;
  }
  isEquel(rect) {
    if (this.h === rect.h && this.w === rect.w && this.x === rect.x && this.y === rect.y && this.node === rect.node) return true;
    return false;
  }
  // 判断两个矩形是否相交，Tolerance为容差
  isIntersect(rect) {
    const x1A = this.x + Tolerance;
    const y1A = this.y + Tolerance;
    const x2A = this.x + this.w - Tolerance;
    const y2A = this.y + this.h - Tolerance;
    const x1B = rect.x;
    const y1B = rect.y;
    const x2B = rect.x + rect.w;
    const y2B = rect.y + rect.h;
    if (x2A < x1B || x1A > x2B || y2A < y1B || y1A > y2B) {
      return false;
    }
    return true;
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
  static from(node) {
    return new Rect({
      x: parseFloat(node.style.left),
      y: parseFloat(node.style.top),
      w: parseFloat(node.style.width),
      h: parseFloat(node.style.height),
      node
    });
  }
}
const ABSORB_DELTA = 3;
function toPx(value) {
  if (typeof value === "number") return `${value}px`;
  return String(value);
}
const ALIGNLINE_WIDTH = 1;
const ALIGNLINE_COLOR = "#EA3323";
const alignLineTypes = ["vl", "vc", "vr", "ht", "hc", "hb"];
function createAlignLineDom(store2) {
  const nodes = [];
  alignLineTypes.forEach((type) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", `__freemove-alignLine-${type}`);
    line.setAttribute("stroke", ALIGNLINE_COLOR);
    line.setAttribute("stroke-width", String(ALIGNLINE_WIDTH));
    line.style.display = "none";
    nodes.push(line);
  });
  return nodes;
}
function renderAlignLine(store2) {
  const seletedRect = Rect.from(store2.selected);
  const alternateNodes = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  function handleSearchAlternateNodes() {
    alternateNodes.hb = [];
    alternateNodes.hc = [];
    alternateNodes.ht = [];
    alternateNodes.vc = [];
    alternateNodes.vl = [];
    alternateNodes.vr = [];
    store2.nodes.forEach((item) => {
      const nodeRect = Rect.from(item);
      if (seletedRect.isIntersect(nodeRect)) return;
      const seletedAlignLinePosition = seletedRect.getAlignLinePostion();
      alignLineTypes.forEach((type) => {
        let source = 1e4, target = 1e4, absorbDistance;
        if (/^h/.test(type)) {
          if (seletedRect.x > nodeRect.x + nodeRect.w) {
            source = seletedRect.x + seletedRect.w;
            target = nodeRect.x;
          } else if (seletedRect.x + seletedRect.w < nodeRect.x) {
            source = seletedRect.x;
            target = nodeRect.x + nodeRect.w;
          } else {
            source = Math.min(seletedRect.x, nodeRect.x);
            target = Math.max(seletedRect.x + seletedRect.w, nodeRect.x + nodeRect.w);
          }
          [nodeRect.y, nodeRect.y + nodeRect.h / 2, nodeRect.y + nodeRect.h].forEach((item2) => {
            absorbDistance = Math.abs(seletedAlignLinePosition[type] - item2);
            if (absorbDistance <= ABSORB_DELTA) {
              alternateNodes[type].push({
                type,
                source,
                target,
                absorbDistance,
                absorbPosition: item2
              });
            }
          });
        }
        if (/^v/.test(type)) {
          if (seletedRect.y > nodeRect.y + nodeRect.h) {
            source = seletedRect.y + seletedRect.h;
            target = nodeRect.y;
          } else if (seletedRect.y + seletedRect.h > nodeRect.y) {
            source = seletedRect.y;
            target = nodeRect.y + nodeRect.h;
          } else {
            source = Math.min(seletedRect.y, nodeRect.y);
            target = Math.max(seletedRect.y + seletedRect.h, nodeRect.y + nodeRect.h);
          }
          [nodeRect.x, nodeRect.x + nodeRect.w / 2, nodeRect.x + nodeRect.w].forEach((position) => {
            absorbDistance = Math.abs(seletedAlignLinePosition[type] - position);
            if (absorbDistance <= ABSORB_DELTA) {
              alternateNodes[type].push({
                type,
                source,
                target,
                absorbDistance,
                absorbPosition: position
              });
            }
          });
        }
      });
    });
    alignLineTypes.forEach((type) => {
      if (!alternateNodes[type].length) return;
      let minAbsorbDistance = Infinity;
      let absorbPosition = Infinity;
      alternateNodes[type].forEach((item) => {
        if (item.absorbDistance < minAbsorbDistance) minAbsorbDistance = item.absorbDistance;
        absorbPosition = item.absorbPosition;
      });
      let min = Infinity, max = 0;
      alternateNodes[type].filter((item) => item.absorbDistance === minAbsorbDistance).forEach((item) => {
        if (item.source < min) min = item.source;
        if (item.source > max) max = item.source;
        if (item.target < min) min = item.target;
        if (item.target > max) max = item.target;
      });
      alternateNodes[type] = [
        {
          type,
          source: min,
          target: max,
          absorbDistance: minAbsorbDistance,
          absorbPosition
        }
      ];
    });
  }
  function handleAbsorb(data) {
    if (!store2.selected || !data) return;
    const { absorbPosition, type } = data;
    switch (type) {
      case "ht":
        store2.selected.style.top = toPx(absorbPosition);
        break;
      case "hc":
        store2.selected.style.top = toPx(absorbPosition - parseFloat(store2.selected.style.height) / 2);
        break;
      case "hb":
        store2.selected.style.top = toPx(absorbPosition - parseFloat(store2.selected.style.height));
        break;
      case "vl":
        store2.selected.style.left = toPx(absorbPosition);
        break;
      case "vc":
        store2.selected.style.left = toPx(absorbPosition - parseFloat(store2.selected.style.width) / 2);
        break;
      case "vr":
        store2.selected.style.left = toPx(absorbPosition - parseFloat(store2.selected.style.width));
        break;
    }
    handleSearchAlternateNodes();
  }
  function handleDraw() {
    if (!store2.selected) return;
    const selectedRect = Rect.from(store2.selected);
    const alternateNodesFlat = Object.values(alternateNodes).flat();
    alternateNodesFlat.forEach((item) => {
      const { source, target, type } = item;
      const line = store2.alignLine.g.getElementsByClassName(`__freemove-alignLine-${type}`)[0];
      if (/^h/.test(type)) {
        line == null ? void 0 : line.setAttribute("x1", String(source));
        line == null ? void 0 : line.setAttribute("x2", String(target));
        switch (type) {
          case "ht":
            line.setAttribute("y1", String(selectedRect.y));
            line.setAttribute("y2", String(selectedRect.y));
            break;
          case "hc":
            line.setAttribute("y1", String(selectedRect.y + selectedRect.h / 2));
            line.setAttribute("y2", String(selectedRect.y + selectedRect.h / 2));
            break;
          case "hb":
            line.setAttribute("y1", String(selectedRect.y + selectedRect.h));
            line.setAttribute("y2", String(selectedRect.y + selectedRect.h));
            break;
        }
      }
      if (/^v/.test(type)) {
        line == null ? void 0 : line.setAttribute("y1", String(source));
        line == null ? void 0 : line.setAttribute("y2", String(target));
        switch (type) {
          case "vl":
            line.setAttribute("x1", String(selectedRect.x));
            line.setAttribute("x2", String(selectedRect.x));
            break;
          case "vc":
            line.setAttribute("x1", String(selectedRect.x + selectedRect.w / 2));
            line.setAttribute("x2", String(selectedRect.x + selectedRect.w / 2));
            break;
          case "vr":
            line.setAttribute("x1", String(selectedRect.x + selectedRect.w));
            line.setAttribute("x2", String(selectedRect.x + selectedRect.w));
            break;
        }
      }
      line == null ? void 0 : line.setAttribute("style", "display: 'block");
    });
  }
  handleSearchAlternateNodes();
  [...alternateNodes["ht"], ...alternateNodes["hc"], ...alternateNodes["hb"]].forEach((item) => {
    handleAbsorb(item);
  });
  [...alternateNodes["vl"], ...alternateNodes["vc"], ...alternateNodes["vr"]].forEach((item) => {
    handleAbsorb(item);
  });
  handleDraw();
}
class AlignLine {
  constructor(svg) {
    __publicField(this, "g");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", "__freemove-alignLine");
    svg.append(this.g);
  }
  get nodes() {
    return this.g;
  }
  // 清除分组内所有对齐线
  clear() {
    this.g.innerHTML = "";
  }
  reRender(store2) {
    if (!store2.selected) return;
    this.clear();
    this.g.append(...createAlignLineDom());
    renderAlignLine(store2);
  }
}
const initStore = (container, nodes) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "__freemove-svg");
  const containerRect = container.getBoundingClientRect();
  svg.setAttribute("width", toPx(containerRect.width));
  svg.setAttribute("height", toPx(containerRect.height));
  svg.style = "position: absolute; inset: 0;";
  container.className += " __freemove-container";
  nodes.forEach((node) => node.className += " __freemove-movable-node");
  return {
    container,
    nodes,
    svg,
    selected: null,
    alignLine: new AlignLine(svg),
    setSelected(target) {
      this.selected = target;
      if (!target) return;
    }
  };
};
let store;
function createFreeMove(container, nodes) {
  store = initStore(container, nodes);
  store.svg.addEventListener("pointerdown", (e) => {
    const containerRect = store.container.getBoundingClientRect();
    e.preventDefault();
    let seleted = null;
    for (const node of store.nodes) {
      const nodeRect = Rect.from(node);
      if (nodeRect.isInSide({ x: e.offsetX, y: e.offsetY })) {
        seleted = nodeRect;
        break;
      }
    }
    if (!seleted) return;
    const selectedDom = seleted.node;
    store.setSelected(seleted.node);
    store.alignLine.reRender(store);
    if (selectedDom.classList.contains("__freemove-container") || !selectedDom.classList.contains("__freemove-movable-node"))
      return;
    const rect = selectedDom.getBoundingClientRect();
    let startX = e.clientX - rect.left;
    let startY = e.clientY - rect.top;
    let animationFrameId = null;
    function handlePointerMove(ev) {
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(() => {
        let newX = ev.clientX - containerRect.left - startX;
        let newY = ev.clientY - containerRect.top - startY;
        const maxLeft = store.container.clientWidth - selectedDom.offsetWidth;
        const maxTop = store.container.clientHeight - selectedDom.offsetHeight;
        newX = Math.max(0, Math.min(newX, maxLeft));
        newY = Math.max(0, Math.min(newY, maxTop));
        selectedDom.style.left = toPx(newX);
        selectedDom.style.top = toPx(newY);
        store.alignLine.reRender(store);
        animationFrameId = null;
      });
    }
    function handlePointerUp() {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      store.alignLine.clear();
      store.setSelected(null);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  });
  return store.svg;
}
export {
  createFreeMove as default
};
