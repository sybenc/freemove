var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const NODE_ABSORB_DELTA = 3;
const NODE_CLASS_PREFIX = "__freemove";
const NODE_MIN_WIDTH = 10;
const NODE_MIN_HEIGHT = 10;
const Tolerance = 3;
class Rect {
  constructor({ x, y, h, w, node }) {
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "w");
    __publicField(this, "h");
    __publicField(this, "id");
    __publicField(this, "node");
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.node = node;
    this.id = node.dataset.id;
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
      x: node.offsetLeft,
      y: node.offsetTop,
      w: node.offsetWidth,
      h: node.offsetHeight,
      node
    });
  }
}
function toPx(value) {
  if (typeof value === "number") return `${value}px`;
  return String(value);
}
function epsilonEqual(a, b, epsilon = 0.1) {
  return Math.abs(a - b) <= epsilon;
}
function getElement(g, className) {
  return g.getElementsByClassName(className)[0];
}
function handleMoveNode(store, event) {
  if (!store.selected) return;
  const containerRect = store.container.getBoundingClientRect();
  store.alignLine.reRender(store);
  const rect = store.selected.getBoundingClientRect();
  let startX = event.clientX - rect.left;
  let startY = event.clientY - rect.top;
  let animationFrameId = null;
  let prevX = null;
  let prevY = null;
  function handlePointerMove(ev) {
    if (animationFrameId) return;
    animationFrameId = requestAnimationFrame(() => {
      if (!store.selected) return;
      let newX = ev.clientX - containerRect.left - startX;
      let newY = ev.clientY - containerRect.top - startY;
      const maxLeft = store.container.clientWidth - store.selected.offsetWidth;
      const maxTop = store.container.clientHeight - store.selected.offsetHeight;
      newX = Math.max(0, Math.min(newX, maxLeft));
      newY = Math.max(0, Math.min(newY, maxTop));
      store.moveDelta = [prevX !== null ? newX - prevX : 0, prevY !== null ? newY - prevY : 0];
      store.selected.style.left = toPx(newX);
      store.selected.style.top = toPx(newY);
      store.alignLine.reRender(store);
      store.seletedBorder.reRender(store);
      prevX = newX;
      prevY = newY;
      animationFrameId = null;
    });
  }
  function handlePointerUp() {
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    store.alignLine.hidden();
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }
  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp);
}
function handleResizeNode(store, event) {
  if (!store.selected) return;
  const containerRect = store.container.getBoundingClientRect();
  const target = event.target;
  const direction = target.dataset.direction;
  if (!direction) return;
  const rect = Rect.from(store.selected);
  let startX = event.clientX;
  let startY = event.clientY;
  let startWidth = rect.w;
  let startHeight = rect.h;
  let startLeft = rect.x;
  let startTop = rect.y;
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;
  function resize(ev) {
    let deltaX = ev.clientX - startX;
    let deltaY = ev.clientY - startY;
    let newWidth = startWidth;
    let newHeight = startHeight;
    let newLeft = startLeft;
    let newTop = startTop;
    if (direction.includes("right")) {
      newWidth = startWidth + deltaX;
    }
    if (direction.includes("left")) {
      newWidth = startWidth - deltaX;
      newLeft = startLeft + deltaX;
    }
    if (direction.includes("bottom")) {
      newHeight = startHeight + deltaY;
    }
    if (direction.includes("top")) {
      newHeight = startHeight - deltaY;
      newTop = startTop + deltaY;
    }
    if (newLeft < 0) {
      newWidth += newLeft;
      newLeft = 0;
    }
    if (newTop < 0) {
      newHeight += newTop;
      newTop = 0;
    }
    if (newLeft + newWidth > containerWidth) {
      newWidth = containerWidth - newLeft;
    }
    if (newTop + newHeight > containerHeight) {
      newHeight = containerHeight - newTop;
    }
    newWidth = Math.max(newWidth, NODE_MIN_WIDTH);
    newHeight = Math.max(newHeight, NODE_MIN_HEIGHT);
    store.resize.reRender(
      store,
      newWidth,
      newHeight,
      direction,
      startLeft,
      startTop,
      startWidth,
      startHeight
    );
    store.seletedBorder.reRender(store);
  }
  function stopResize() {
    store.resize.hidden();
    document.removeEventListener("pointermove", resize);
    document.removeEventListener("pointerup", stopResize);
  }
  document.addEventListener("pointermove", resize);
  document.addEventListener("pointerup", stopResize);
}
function addPointerListener(store) {
  store.svg.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.classList[0].includes(`${NODE_CLASS_PREFIX}-selected-border-point-`)) {
      const ownerId = target.dataset.ownerId;
      for (let i = 0; i < store.nodes.length; i++) {
        if (ownerId === store.nodes[i].dataset.ownerId) {
          store.setSelected(store.nodes[i]);
        }
      }
      if (store.selected) {
        handleResizeNode(store, event);
      }
      return;
    }
    if (target.classList.contains(`${NODE_CLASS_PREFIX}-svg`)) {
      let seleted = null;
      for (const node of store.nodes) {
        const nodeRect = Rect.from(node);
        if (nodeRect.isInSide({ x: event.offsetX, y: event.offsetY })) {
          seleted = nodeRect;
          break;
        }
      }
      if (seleted && seleted.node.classList.contains(`${NODE_CLASS_PREFIX}-movable-node`)) {
        store.setSelected(seleted.node);
        handleMoveNode(store, event);
      }
      if (!seleted) {
        store.seletedBorder.hidden();
      }
    }
  });
}
const urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size |= 0));
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
};
const ALIGNLINE_WIDTH = 1;
const ALIGNLINE_COLOR = "#EA3";
const alignLineTypes = ["vl", "vc", "vr", "ht", "hc", "hb"];
function renderAlignLine(store, lines) {
  const alternateNodes = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  function handleSearchAlternateNodes() {
    const selectedRect = Rect.from(store.selected);
    const nodeRects = store.nodes.filter((n) => n !== store.selected).map((n) => Rect.from(n));
    alignLineTypes.forEach((type) => alternateNodes[type] = []);
    nodeRects.forEach((nodeRect) => {
      if (selectedRect.isIntersect(nodeRect)) return;
      const selectedAlignLinePosition = selectedRect.getAlignLinePostion();
      alignLineTypes.forEach((type) => {
        let source = 1e4, target = 1e4, absorbDistance;
        if (/^h/.test(type)) {
          if (selectedRect.x > nodeRect.x + nodeRect.w) {
            source = selectedRect.x + selectedRect.w;
            target = nodeRect.x;
          } else if (selectedRect.x + selectedRect.w < nodeRect.x) {
            source = selectedRect.x;
            target = nodeRect.x + nodeRect.w;
          } else {
            source = Math.min(selectedRect.x, nodeRect.x);
            target = Math.max(selectedRect.x + selectedRect.w, nodeRect.x + nodeRect.w);
          }
          [nodeRect.y, nodeRect.y + nodeRect.h / 2, nodeRect.y + nodeRect.h].forEach((pos) => {
            absorbDistance = Math.abs(selectedAlignLinePosition[type] - pos);
            if (absorbDistance <= NODE_ABSORB_DELTA) {
              alternateNodes[type].push({
                type,
                source,
                target,
                absorbDistance,
                absorbPosition: pos,
                nodeRects: [nodeRect]
              });
            }
          });
        }
        if (/^v/.test(type)) {
          if (selectedRect.y > nodeRect.y + nodeRect.h) {
            source = selectedRect.y + selectedRect.h;
            target = nodeRect.y;
          } else if (selectedRect.y + selectedRect.h < nodeRect.y) {
            source = selectedRect.y;
            target = nodeRect.y + nodeRect.h;
          } else {
            source = Math.min(selectedRect.y, nodeRect.y);
            target = Math.max(selectedRect.y + selectedRect.h, nodeRect.y + nodeRect.h);
          }
          [nodeRect.x, nodeRect.x + nodeRect.w / 2, nodeRect.x + nodeRect.w].forEach((pos) => {
            absorbDistance = Math.abs(selectedAlignLinePosition[type] - pos);
            if (absorbDistance <= NODE_ABSORB_DELTA) {
              alternateNodes[type].push({
                type,
                source,
                target,
                absorbDistance,
                absorbPosition: pos,
                nodeRects: [nodeRect]
              });
            }
          });
        }
      });
    });
    alignLineTypes.forEach((type) => {
      const map = /* @__PURE__ */ new Map();
      alternateNodes[type].forEach((item) => {
        const arr = map.get(item.absorbDistance) || [];
        arr.push(item);
        map.set(item.absorbDistance, arr);
      });
      let min2 = Infinity, max = 0;
      map.forEach((group) => {
        group.forEach((i) => {
          min2 = Math.min(min2, i.source, i.target);
          max = Math.max(max, i.source, i.target);
        });
      });
      map.forEach((group) => {
        group.forEach((i) => {
          i.source = min2;
          i.target = max;
        });
      });
      alternateNodes[type] = Array.from(map.values()).flat();
    });
  }
  function handleAbsorb(data) {
    const { absorbPosition, type } = data;
    const selected = store.selected;
    switch (type) {
      case "ht":
        selected.style.top = toPx(absorbPosition);
        break;
      case "hc":
        selected.style.top = toPx(absorbPosition - parseFloat(selected.style.height) / 2);
        break;
      case "hb":
        selected.style.top = toPx(absorbPosition - parseFloat(selected.style.height));
        break;
      case "vl":
        selected.style.left = toPx(absorbPosition);
        break;
      case "vc":
        selected.style.left = toPx(absorbPosition - parseFloat(selected.style.width) / 2);
        break;
      case "vr":
        selected.style.left = toPx(absorbPosition - parseFloat(selected.style.width));
        break;
    }
    handleSearchAlternateNodes();
    store.seletedBorder.reRender(store);
  }
  function handleDraw() {
    if (!store.selected) return;
    const selectedRect = Rect.from(store.selected);
    const alternateNodesFlat = Object.values(alternateNodes).flat();
    alternateNodesFlat.forEach((item) => {
      const { source, target, type } = item;
      const line = store.alignLine.g.getElementsByClassName(`${NODE_CLASS_PREFIX}-alignLine-${type}`)[0];
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
  Object.values(alternateNodes).flat().forEach((item) => {
    handleAbsorb(item);
  });
  let min = Infinity;
  alignLineTypes.forEach((type) => {
    alternateNodes[type].forEach((item) => {
      if (item.absorbDistance < min) min = item.absorbDistance;
    });
  });
  alignLineTypes.forEach((type) => {
    alternateNodes[type] = alternateNodes[type].filter((item) => epsilonEqual(item.absorbDistance, min, 0.01));
  });
  handleDraw();
}
class AlignLine {
  constructor(svg) {
    __publicField(this, "g");
    __publicField(this, "lines");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-alignLine`);
    svg.append(this.g);
    this.lines = {};
    alignLineTypes.forEach((type) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("class", `${NODE_CLASS_PREFIX}-alignLine-${type}`);
      line.setAttribute("stroke", ALIGNLINE_COLOR);
      line.setAttribute("stroke-width", String(ALIGNLINE_WIDTH));
      line.style.display = "none";
      this.g.append(line);
      this.lines[type] = line;
    });
  }
  hidden() {
    Object.values(this.lines).forEach((line) => {
      line.style.display = "none";
    });
  }
  reRender(store) {
    if (!store.selected) return;
    this.hidden();
    renderAlignLine(store, this.lines);
  }
}
const SELECTED_BORDER_WIDTH = 1;
const SELECTED_BORDER_COLOR = "#000";
const SELECTED_BORDER_POINTS_SIDELENGTH = 6;
const selectedBorderLineTypes = ["left", "top", "right", "bottom"];
const selectedBorderPointTypes = [
  "left-top",
  "top",
  "right-top",
  "right",
  "right-bottom",
  "bottom",
  "left-bottom",
  "left"
];
const selectedBorderLineCursor = [
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize",
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize"
];
function createSeletedBorderDom() {
  const points = [];
  const lines = [];
  selectedBorderLineTypes.forEach((type) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", `${NODE_CLASS_PREFIX}-selected-border-line-${type}`);
    line.setAttribute("stroke", SELECTED_BORDER_COLOR);
    line.setAttribute("stroke-width", toPx(SELECTED_BORDER_WIDTH));
    lines.push(line);
  });
  selectedBorderPointTypes.forEach((type, index) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("class", `${NODE_CLASS_PREFIX}-selected-border-point-${type}`);
    rect.setAttribute("fill", "white");
    rect.setAttribute("stroke", SELECTED_BORDER_COLOR);
    rect.setAttribute("stroke-width", toPx(SELECTED_BORDER_WIDTH));
    rect.setAttribute("width", toPx(SELECTED_BORDER_POINTS_SIDELENGTH));
    rect.setAttribute("height", toPx(SELECTED_BORDER_POINTS_SIDELENGTH));
    rect.setAttribute("style", `cursor: ${selectedBorderLineCursor[index]}`);
    rect.setAttribute("data-direction", type);
    points.push(rect);
  });
  return [points, lines];
}
function renderSelectedBorder(store) {
  const seletedRect = Rect.from(store.selected);
  selectedBorderLineTypes.forEach((type) => {
    const line = store.seletedBorder.g.getElementsByClassName(`${NODE_CLASS_PREFIX}-selected-border-line-${type}`)[0];
    switch (type) {
      case "left":
        line.setAttribute("x1", String(seletedRect.x));
        line.setAttribute("y1", String(seletedRect.y - SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("x2", String(seletedRect.x));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h + SELECTED_BORDER_WIDTH / 2));
        break;
      case "right":
        line.setAttribute("x1", String(seletedRect.x + seletedRect.w));
        line.setAttribute("y1", String(seletedRect.y - SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h + SELECTED_BORDER_WIDTH / 2));
        break;
      case "top":
        line.setAttribute("x1", String(seletedRect.x - SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("y1", String(seletedRect.y));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w + SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("y2", String(seletedRect.y));
        break;
      case "bottom":
        line.setAttribute("x1", String(seletedRect.x - SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("y1", String(seletedRect.y + seletedRect.h));
        line.setAttribute("x2", String(seletedRect.x + seletedRect.w + SELECTED_BORDER_WIDTH / 2));
        line.setAttribute("y2", String(seletedRect.y + seletedRect.h));
        break;
    }
  });
  selectedBorderPointTypes.forEach((type, index) => {
    const rect = store.seletedBorder.g.getElementsByClassName(`${NODE_CLASS_PREFIX}-selected-border-point-${type}`)[0];
    rect.setAttribute("data-owner-id", store.selected.dataset.id);
    const offset = SELECTED_BORDER_POINTS_SIDELENGTH / 2;
    switch (type) {
      case "left-top":
        rect.setAttribute("x", String(seletedRect.x - offset));
        rect.setAttribute("y", String(seletedRect.y - offset));
        break;
      case "top":
        rect.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 - offset));
        rect.setAttribute("y", String(seletedRect.y - offset));
        break;
      case "right-top":
        rect.setAttribute("x", String(seletedRect.x + seletedRect.w - offset));
        rect.setAttribute("y", String(seletedRect.y - offset));
        break;
      case "right":
        rect.setAttribute("x", String(seletedRect.x + seletedRect.w - offset));
        rect.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - offset));
        break;
      case "right-bottom":
        rect.setAttribute("x", String(seletedRect.x + seletedRect.w - offset));
        rect.setAttribute("y", String(seletedRect.y + seletedRect.h - offset));
        break;
      case "bottom":
        rect.setAttribute("x", String(seletedRect.x + seletedRect.w / 2 - offset));
        rect.setAttribute("y", String(seletedRect.y + seletedRect.h - offset));
        break;
      case "left-bottom":
        rect.setAttribute("x", String(seletedRect.x - offset));
        rect.setAttribute("y", String(seletedRect.y + seletedRect.h - offset));
        break;
      case "left":
        rect.setAttribute("x", String(seletedRect.x - offset));
        rect.setAttribute("y", String(seletedRect.y + seletedRect.h / 2 - offset));
        break;
    }
  });
}
class SeletedBorder {
  constructor(svg) {
    __publicField(this, "g");
    __publicField(this, "points");
    __publicField(this, "lines");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-seleted-border`);
    svg.append(this.g);
    const [points, lines] = createSeletedBorderDom();
    this.points = points;
    this.lines = lines;
    this.g.append(...lines, ...points);
    this.g.style.display = "none";
  }
  hidden() {
    this.g.style.display = "none";
  }
  reRender(store) {
    if (!store.selected) return;
    this.g.style.display = "block";
    renderSelectedBorder(store);
  }
}
const RESIZE_WIDTH = 2;
const RESIZE_COLOR = "#EA3";
const RESIZE_OFFSET = 8;
function searchSameWidthHeight(store) {
  const nodeRects = store.nodes.map((item) => Rect.from(item));
  const widthMap = /* @__PURE__ */ new Map();
  const heightMap = /* @__PURE__ */ new Map();
  nodeRects.forEach((nodeRect) => {
    var _a, _b;
    const resizeWidthData = {
      type: "width",
      nodeRect
    };
    const resizeHeightData = {
      type: "height",
      nodeRect
    };
    if (widthMap.has(nodeRect.w)) {
      (_a = widthMap.get(nodeRect.w)) == null ? void 0 : _a.push(resizeWidthData);
    } else {
      widthMap.set(nodeRect.w, [resizeWidthData]);
    }
    if (heightMap.has(nodeRect.h)) {
      (_b = heightMap.get(nodeRect.h)) == null ? void 0 : _b.push(resizeHeightData);
    } else {
      heightMap.set(nodeRect.h, [resizeHeightData]);
    }
  });
  return {
    widthMap,
    heightMap
  };
}
function renderResizeLine(store) {
  store.nodes.forEach((node) => {
    const nodeRect = Rect.from(node);
    const g = store.resize.g.querySelector(`[data-ower-id="${nodeRect.id}"]`);
    const widthLine = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-width-line`);
    const heightLine = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-height-line`);
    widthLine.setAttribute("x1", String(nodeRect.x));
    widthLine.setAttribute("y1", String(nodeRect.y - RESIZE_OFFSET));
    widthLine.setAttribute("x2", String(nodeRect.x + nodeRect.w));
    widthLine.setAttribute("y2", String(nodeRect.y - RESIZE_OFFSET));
    heightLine.setAttribute("x1", String(nodeRect.x - RESIZE_OFFSET));
    heightLine.setAttribute("y1", String(nodeRect.y));
    heightLine.setAttribute("x2", String(nodeRect.x - RESIZE_OFFSET));
    heightLine.setAttribute("y2", String(nodeRect.y + nodeRect.h));
    [widthLine, heightLine].forEach((line) => {
      line.setAttribute("stroke", RESIZE_COLOR);
      line.setAttribute("stroke-width", String(RESIZE_WIDTH));
    });
  });
}
class Resize {
  constructor(svg, nodes) {
    __publicField(this, "g");
    __publicField(this, "lines");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-resize`);
    const result = [];
    nodes.forEach((node) => {
      const nodeRect = Rect.from(node);
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line`);
      g.setAttribute("data-ower-id", nodeRect.id);
      const widthGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const widthLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      const widthLineText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const heightGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const heightLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      const heightLineText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      widthGroup.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width`);
      widthLine.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width-line`);
      widthLineText.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-width-text`);
      widthGroup.append(widthLine);
      heightGroup.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height`);
      heightLine.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height-line`);
      heightLineText.setAttribute("class", `${NODE_CLASS_PREFIX}-resize-line-group-height-text`);
      heightGroup.append(heightLine);
      g.append(heightGroup, widthGroup);
      result.push(g);
    });
    this.lines = result;
    this.g.append(...this.lines);
    svg.append(this.g);
    this.hidden();
  }
  hidden() {
    this.lines.forEach((lineGroup) => {
      Array.from(lineGroup.children).forEach((item) => {
        item.setAttribute("style", "display: none");
      });
    });
  }
  reRender(store, newWidth, newHeight, direction, startLeft, startTop, startWidth, startHeight) {
    var _a, _b;
    if (!store.selected) return;
    this.hidden();
    const { widthMap, heightMap } = searchSameWidthHeight(store);
    const alternateAbsorbWidth = [];
    const alternateAbsorbHeight = [];
    widthMap.forEach((value, key) => {
      var _a2;
      if (value.length === 1) {
        if (value[0].nodeRect.id === ((_a2 = store.selected) == null ? void 0 : _a2.dataset.id))
          return;
      }
      if (Math.abs(newWidth - key) <= NODE_ABSORB_DELTA) {
        alternateAbsorbWidth.push(key);
      }
    });
    heightMap.forEach((value, key) => {
      var _a2;
      if (value.length === 1) {
        if (value[0].nodeRect.id === ((_a2 = store.selected) == null ? void 0 : _a2.dataset.id))
          return;
      }
      if (Math.abs(newHeight - key) <= NODE_ABSORB_DELTA) {
        alternateAbsorbHeight.push(key);
      }
    });
    const absorbWidth = alternateAbsorbWidth.length === 0 ? newWidth : Math.max(...alternateAbsorbWidth);
    const absorbHeight = alternateAbsorbHeight.length === 0 ? newHeight : Math.max(...alternateAbsorbHeight);
    const finalWidth = Math.max(absorbWidth, NODE_MIN_WIDTH);
    const finalHeight = Math.max(absorbHeight, NODE_MIN_HEIGHT);
    if (direction.includes("left")) {
      const rightEdge = startLeft + startWidth;
      store.selected.style.left = toPx(rightEdge - finalWidth);
    } else {
      store.selected.style.left = toPx(startLeft);
    }
    store.selected.style.width = toPx(finalWidth);
    if (direction.includes("top")) {
      const bottomEdge = startTop + startHeight;
      store.selected.style.top = toPx(bottomEdge - finalHeight);
    } else {
      store.selected.style.top = toPx(startTop);
    }
    store.selected.style.height = toPx(finalHeight);
    const currentWidth = parseFloat(store.selected.style.width);
    const currentHeight = parseFloat(store.selected.style.height);
    console.log(widthMap, finalWidth, newWidth, absorbWidth);
    const { widthMap: newWidthMap, heightMap: newHeightMap } = searchSameWidthHeight(store);
    (_a = newWidthMap.get(currentWidth)) == null ? void 0 : _a.forEach((item) => {
      if (item.nodeRect.id !== store.selected.dataset.ownerId) {
        const lineGroup = this.g.querySelector(`[data-ower-id="${item.nodeRect.id}"]`);
        const widthLine = getElement(lineGroup, `${NODE_CLASS_PREFIX}-resize-line-group-width`);
        widthLine.style.display = "block";
      }
    });
    (_b = newHeightMap.get(currentHeight)) == null ? void 0 : _b.forEach((item) => {
      if (item.nodeRect.id !== store.selected.dataset.ownerId) {
        const lineGroup = this.g.querySelector(`[data-ower-id="${item.nodeRect.id}"]`);
        const heightLine = getElement(lineGroup, `${NODE_CLASS_PREFIX}-resize-line-group-height`);
        heightLine.style.display = "block";
      }
    });
    renderResizeLine(store);
    store.seletedBorder.reRender(store);
  }
}
const initStore = (container, nodes) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", `${NODE_CLASS_PREFIX}-svg`);
  const containerRect = container.getBoundingClientRect();
  svg.setAttribute("width", toPx(containerRect.width));
  svg.setAttribute("height", toPx(containerRect.height));
  svg.style = "position: absolute; inset: 0;";
  container.className += ` ${NODE_CLASS_PREFIX}-container`;
  nodes.forEach((node) => {
    node.className += ` ${NODE_CLASS_PREFIX}-movable-node`;
    node.setAttribute("data-id", nanoid());
    if (/%$/.test(node.style.x)) node.style.x = toPx(containerRect.width * parseInt(node.style.x) / 100);
    if (/%$/.test(node.style.y)) node.style.y = toPx(containerRect.height * parseInt(node.style.y) / 100);
    if (/%$/.test(node.style.width)) node.style.width = toPx(containerRect.width * parseInt(node.style.width) / 100);
    if (/%$/.test(node.style.height)) node.style.height = toPx(containerRect.height * parseInt(node.style.height) / 100);
  });
  return {
    container,
    nodes,
    svg,
    selected: null,
    alignLine: new AlignLine(svg),
    seletedBorder: new SeletedBorder(svg),
    resize: new Resize(svg, nodes),
    moveDelta: [0, 0],
    setSelected(target) {
      this.selected = target;
      if (!target) {
        this.seletedBorder.hidden();
        return;
      }
      this.seletedBorder.reRender(this);
    }
  };
};
function createFreeMove(container, nodes) {
  const store = initStore(container, nodes);
  addPointerListener(store);
  return store.svg;
}
export {
  createFreeMove as default
};
