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
  static error(svg, nodeRects) {
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
      store.selected.style.left = toPx(newX);
      store.selected.style.top = toPx(newY);
      store.alignLine.reRender(store);
      store.seletedBorder.reRender(store);
      store.gap.reRender(store);
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
    store.resize.reRender(store, newWidth, newHeight, direction, startLeft, startTop, startWidth, startHeight);
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
function handleSelector(store, event) {
  const containerRect = store.container.getBoundingClientRect();
  const startX = event.clientX - containerRect.left;
  const startY = event.clientY - containerRect.top;
  function select(ep) {
    const endX = ep.clientX - containerRect.left;
    const endY = ep.clientY - containerRect.top;
    store.selector.reRender(store, startX, startY, endX, endY);
  }
  function stopSelect() {
    store.selector.hiddenSelector();
    store.selector.showPreview();
    document.removeEventListener("pointermove", select);
    document.removeEventListener("pointerup", stopSelect);
  }
  document.addEventListener("pointermove", select);
  document.addEventListener("pointerup", stopSelect);
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
        store.selector.hiddenPreview();
        store.setSelected(seleted.node);
        handleMoveNode(store, event);
      }
      if (!seleted) {
        store.seletedBorder.hidden();
        handleSelector(store, event);
      }
    }
  });
}
function searchDistanceBlockXData(store) {
  const xGapRegions = /* @__PURE__ */ new Map();
  function getGapRegions(currActiveRects) {
    var _a;
    const xEdgeCoords = [];
    currActiveRects.toSorted((a, b) => a.x - b.x).forEach((nodeRect) => {
      xEdgeCoords.push({ value: nodeRect.x, type: "min", nodeRect });
      xEdgeCoords.push({ value: nodeRect.x + nodeRect.w, type: "max", nodeRect });
    });
    xEdgeCoords.sort((a, b) => a.value - b.value);
    for (let i = 0; i < xEdgeCoords.length - 1; i++) {
      const maxs = [];
      const mins = [];
      if (xEdgeCoords[i].type === "max" && xEdgeCoords[i + 1].type === "min") {
        for (let j = 0; j <= i; j++) {
          if (xEdgeCoords[i].value === xEdgeCoords[i - j].value) maxs.push(xEdgeCoords[i - j]);
          else break;
        }
        for (let j = i + 1; j <= xEdgeCoords.length; j++) {
          if (xEdgeCoords[i + 1].value === xEdgeCoords[j].value) mins.push(xEdgeCoords[j]);
          else break;
        }
        const gap = mins[0].value - maxs[0].value;
        const x = maxs[0].nodeRect.x;
        if (gap > 0) {
          const y = Math.min(...maxs.map((max) => max.nodeRect.y), ...mins.map((min) => min.nodeRect.y));
          const h = Math.max(
            ...maxs.map((max) => max.nodeRect.y + max.nodeRect.h),
            ...mins.map((min) => min.nodeRect.y + min.nodeRect.h)
          );
          const gapRegion = {
            x,
            y,
            w: gap,
            h: h - y,
            rect1: maxs.map((max) => max.nodeRect),
            rect2: mins.map((min) => min.nodeRect)
          };
          if (xGapRegions.has(gap)) (_a = xGapRegions.get(gap)) == null ? void 0 : _a.push(gapRegion);
          else xGapRegions.set(gap, [gapRegion]);
        }
      }
    }
  }
  function mergeGapRegions() {
    xGapRegions.forEach((gapValue, gapKey) => {
      const xMap = /* @__PURE__ */ new Map();
      gapValue.forEach((gapRegion) => {
        if (xMap.has(gapRegion.x)) {
          xMap.get(gapRegion.x).push(gapRegion);
        } else {
          xMap.set(gapRegion.x, [gapRegion]);
        }
      });
      xMap.forEach((xValue, xKey) => {
        const alternateY = [];
        const alternateH = [];
        const rect1 = /* @__PURE__ */ new Set();
        const rect2 = /* @__PURE__ */ new Set();
        xValue == null ? void 0 : xValue.forEach((gapRegion) => {
          alternateY.push(gapRegion.y);
          alternateH.push(gapRegion.y + gapRegion.h);
          gapRegion.rect1.forEach((rect) => rect1.add(rect));
          gapRegion.rect2.forEach((rect) => rect2.add(rect));
        });
        const finalY = Math.min(...alternateY);
        const finalH = Math.max(...alternateH);
        xMap.set(xKey, [
          {
            x: xKey,
            y: finalY,
            h: finalH - finalY,
            w: gapKey,
            rect1: Array.from(rect1),
            rect2: Array.from(rect2)
          }
        ]);
      });
      xGapRegions.set(gapKey, Array.from(xMap.values()).flat());
    });
  }
  const nodeRects = [];
  const seletedRect = Rect.from(store.selected);
  store.nodes.forEach((node) => {
    const nodeRect = Rect.from(node);
    nodeRects.push(nodeRect);
  });
  nodeRects.sort((a, b) => a.x - b.x);
  const activeRects = [];
  const inactiveRects = [];
  nodeRects.forEach((nodeRect) => {
    const isActive = nodeRect.y >= seletedRect.y && nodeRect.y <= seletedRect.y + seletedRect.h || nodeRect.y + nodeRect.h / 2 >= seletedRect.y && nodeRect.y + nodeRect.h / 2 <= seletedRect.y + seletedRect.h || nodeRect.y + nodeRect.h >= seletedRect.y && nodeRect.y + nodeRect.h <= seletedRect.y + seletedRect.h;
    if (isActive) activeRects.push(nodeRect);
    else inactiveRects.push(nodeRect);
  });
  getGapRegions(activeRects);
  inactiveRects.forEach((nodeRect) => {
    activeRects.push(nodeRect);
    getGapRegions(activeRects);
  });
  mergeGapRegions();
  return xGapRegions;
}
function searchDistanceBlockYData(store) {
  const yGapRegions = /* @__PURE__ */ new Map();
  function getGapRegions(currActiveRects) {
    var _a;
    const yEdgeCoords = [];
    currActiveRects.toSorted((a, b) => a.y - b.y).forEach((nodeRect) => {
      yEdgeCoords.push({ value: nodeRect.y, type: "min", nodeRect });
      yEdgeCoords.push({ value: nodeRect.y + nodeRect.h, type: "max", nodeRect });
    });
    yEdgeCoords.sort((a, b) => a.value - b.value);
    for (let i = 0; i < yEdgeCoords.length - 1; i++) {
      const maxs = [];
      const mins = [];
      if (yEdgeCoords[i].type === "max" && yEdgeCoords[i + 1].type === "min") {
        for (let j = 0; j <= i; j++) {
          if (yEdgeCoords[i].value === yEdgeCoords[i - j].value) maxs.push(yEdgeCoords[i - j]);
          else break;
        }
        for (let j = i + 1; j <= yEdgeCoords.length; j++) {
          if (yEdgeCoords[i + 1].value === yEdgeCoords[j].value) mins.push(yEdgeCoords[j]);
          else break;
        }
        const gap = mins[0].value - maxs[0].value;
        const y = maxs[0].nodeRect.y;
        if (gap > 0) {
          const x = Math.min(...maxs.map((max) => max.nodeRect.x), ...mins.map((min) => min.nodeRect.x));
          const w = Math.max(
            ...maxs.map((max) => max.nodeRect.x + max.nodeRect.w),
            ...mins.map((min) => min.nodeRect.x + min.nodeRect.w)
          );
          const gapRegion = {
            x,
            y,
            w: w - x,
            h: gap,
            rect1: maxs.map((max) => max.nodeRect),
            rect2: mins.map((min) => min.nodeRect)
          };
          if (yGapRegions.has(gap)) (_a = yGapRegions.get(gap)) == null ? void 0 : _a.push(gapRegion);
          else yGapRegions.set(gap, [gapRegion]);
        }
      }
    }
  }
  function mergeGapRegions() {
    yGapRegions.forEach((gapValue, gapKey) => {
      const yMap = /* @__PURE__ */ new Map();
      gapValue.forEach((gapRegion) => {
        if (yMap.has(gapRegion.y)) {
          yMap.get(gapRegion.y).push(gapRegion);
        } else {
          yMap.set(gapRegion.y, [gapRegion]);
        }
      });
      yMap.forEach((yValue, yKey) => {
        const alternateX = [];
        const alternateW = [];
        const rect1 = /* @__PURE__ */ new Set();
        const rect2 = /* @__PURE__ */ new Set();
        yValue == null ? void 0 : yValue.forEach((gapRegion) => {
          alternateX.push(gapRegion.x);
          alternateW.push(gapRegion.x + gapRegion.w);
          gapRegion.rect1.forEach((rect) => rect1.add(rect));
          gapRegion.rect2.forEach((rect) => rect2.add(rect));
        });
        const finalX = Math.min(...alternateX);
        const finalW = Math.max(...alternateW);
        yMap.set(yKey, [
          {
            x: finalX,
            y: yKey,
            h: gapKey,
            w: finalW - finalX,
            rect1: Array.from(rect1),
            rect2: Array.from(rect2)
          }
        ]);
      });
      yGapRegions.set(gapKey, Array.from(yMap.values()).flat());
    });
  }
  const nodeRects = [];
  const seletedRect = Rect.from(store.selected);
  store.nodes.forEach((node) => {
    const nodeRect = Rect.from(node);
    nodeRects.push(nodeRect);
  });
  const activeRects = [];
  const inactiveRects = [];
  nodeRects.forEach((nodeRect) => {
    const isActive = nodeRect.y >= seletedRect.y && nodeRect.y <= seletedRect.y + seletedRect.h || nodeRect.y + nodeRect.h / 2 >= seletedRect.y && nodeRect.y + nodeRect.h / 2 <= seletedRect.y + seletedRect.h || nodeRect.y + nodeRect.h >= seletedRect.y && nodeRect.y + nodeRect.h <= seletedRect.y + seletedRect.h;
    if (isActive) activeRects.push(nodeRect);
    else inactiveRects.push(nodeRect);
  });
  getGapRegions(activeRects);
  inactiveRects.forEach((nodeRect) => {
    activeRects.push(nodeRect);
    getGapRegions(activeRects);
  });
  mergeGapRegions();
  return yGapRegions;
}
class Gap {
  constructor(svg) {
    __publicField(this, "g");
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-distance-block`);
    svg.append(this.g);
  }
  clear() {
    this.g.innerHTML = "";
  }
  reRender(store) {
    const blockXData = searchDistanceBlockXData(store);
    const blockYData = searchDistanceBlockYData(store);
    console.log(blockXData, blockYData);
  }
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
  const containerRect = store.container.getBoundingClientRect();
  const alternateNodes = {
    ht: [],
    hc: [],
    hb: [],
    vl: [],
    vc: [],
    vr: []
  };
  let showContainerAlignLine = false;
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
  function handleAlignLineAbsorb(data) {
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
  function handleContainerAlignLineAbsorb() {
    if (!store.selected) return;
    const selectedRect = Rect.from(store.selected);
    const absorbPosition = containerRect.width / 2;
    if (Math.abs(selectedRect.x + selectedRect.w / 2 - absorbPosition) <= NODE_ABSORB_DELTA) {
      store.selected.style.left = toPx(absorbPosition - selectedRect.w / 2);
      showContainerAlignLine = true;
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
      const line = lines[type];
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
    if (showContainerAlignLine) {
      const line = lines["vertical"];
      line.setAttribute("x1", String(containerRect.width / 2));
      line.setAttribute("y1", String(0));
      line.setAttribute("x2", String(containerRect.width / 2));
      line.setAttribute("y2", String(containerRect.height));
      line == null ? void 0 : line.setAttribute("style", "display: 'block");
    }
  }
  handleSearchAlternateNodes();
  Object.values(alternateNodes).flat().forEach((item) => {
    handleAlignLineAbsorb(item);
  });
  handleContainerAlignLineAbsorb();
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
    this.lines = {};
    [...alignLineTypes, "vertical"].forEach((type) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("class", `${NODE_CLASS_PREFIX}-alignLine-${type}`);
      line.setAttribute("stroke", ALIGNLINE_COLOR);
      line.setAttribute("stroke-width", String(ALIGNLINE_WIDTH));
      line.style.display = "none";
      this.g.append(line);
      this.lines[type] = line;
    });
    svg.append(this.g);
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
function renderSelectedBorder(g, selected) {
  const seletedRect = Rect.from(selected);
  selectedBorderLineTypes.forEach((type) => {
    const line = g.getElementsByClassName(`${NODE_CLASS_PREFIX}-selected-border-line-${type}`)[0];
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
    const rect = g.getElementsByClassName(`${NODE_CLASS_PREFIX}-selected-border-point-${type}`)[0];
    rect.setAttribute("data-owner-id", selected.dataset.id);
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
    renderSelectedBorder(this.g, store.selected);
  }
}
const RESIZE_WIDTH = 1;
const RESIZE_COLOR = "#2A63F4";
const RESIZE_OFFSET = 8;
const RESIZE_ENDPOINT_LENGTH = 10;
const RESIZE_FONT_SIZE = 10;
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
    const widthLineStart = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-width-line-start`);
    const widthLineEnd = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-width-line-end`);
    const widthLineText = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-width-text`);
    const heightLine = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-height-line`);
    const heightLineText = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-height-text`);
    const heightLineStart = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-height-line-start`);
    const heightLineEnd = getElement(g, `${NODE_CLASS_PREFIX}-resize-line-group-height-line-end`);
    widthLine.setAttribute("x1", String(nodeRect.x));
    widthLine.setAttribute("y1", String(nodeRect.y - RESIZE_OFFSET));
    widthLine.setAttribute("x2", String(nodeRect.x + nodeRect.w));
    widthLine.setAttribute("y2", String(nodeRect.y - RESIZE_OFFSET));
    widthLineStart.setAttribute("x", String(nodeRect.x - RESIZE_WIDTH / 2));
    widthLineStart.setAttribute("y", String(nodeRect.y - RESIZE_OFFSET - RESIZE_ENDPOINT_LENGTH / 2));
    widthLineStart.setAttribute("width", String(RESIZE_WIDTH));
    widthLineStart.setAttribute("height", String(RESIZE_ENDPOINT_LENGTH));
    widthLineStart.setAttribute("fill", String(RESIZE_COLOR));
    widthLineEnd.setAttribute("x", String(nodeRect.x + nodeRect.w - RESIZE_WIDTH / 2));
    widthLineEnd.setAttribute("y", String(nodeRect.y - RESIZE_OFFSET - RESIZE_ENDPOINT_LENGTH / 2));
    widthLineEnd.setAttribute("width", String(RESIZE_WIDTH));
    widthLineEnd.setAttribute("height", String(RESIZE_ENDPOINT_LENGTH));
    widthLineEnd.setAttribute("fill", String(RESIZE_COLOR));
    widthLineText.textContent = `${nodeRect.w}`;
    widthLineText.setAttribute("x", String(nodeRect.x + nodeRect.w / 2));
    widthLineText.setAttribute("y", String(nodeRect.y - RESIZE_OFFSET - 8));
    widthLineText.setAttribute("fill", String(RESIZE_COLOR));
    widthLineText.setAttribute("font-size", String(RESIZE_FONT_SIZE));
    widthLineText.setAttribute("text-anchor", "middle");
    widthLineText.setAttribute("alignment-baseline", "middle");
    heightLine.setAttribute("x1", String(nodeRect.x - RESIZE_OFFSET));
    heightLine.setAttribute("y1", String(nodeRect.y));
    heightLine.setAttribute("x2", String(nodeRect.x - RESIZE_OFFSET));
    heightLine.setAttribute("y2", String(nodeRect.y + nodeRect.h));
    heightLineStart.setAttribute("x", String(nodeRect.x - RESIZE_OFFSET - RESIZE_ENDPOINT_LENGTH / 2));
    heightLineStart.setAttribute("y", String(nodeRect.y - RESIZE_WIDTH / 2));
    heightLineStart.setAttribute("width", String(RESIZE_ENDPOINT_LENGTH));
    heightLineStart.setAttribute("height", String(RESIZE_WIDTH));
    heightLineStart.setAttribute("fill", String(RESIZE_COLOR));
    heightLineEnd.setAttribute("x", String(nodeRect.x - RESIZE_OFFSET - RESIZE_ENDPOINT_LENGTH / 2));
    heightLineEnd.setAttribute("y", String(nodeRect.y + nodeRect.h - RESIZE_WIDTH / 2));
    heightLineEnd.setAttribute("width", String(RESIZE_ENDPOINT_LENGTH));
    heightLineEnd.setAttribute("height", String(RESIZE_WIDTH));
    heightLineEnd.setAttribute("fill", String(RESIZE_COLOR));
    heightLineText.textContent = `${nodeRect.h}`;
    heightLineText.setAttribute("x", String(nodeRect.x - RESIZE_OFFSET - 8));
    heightLineText.setAttribute("y", String(nodeRect.y + nodeRect.h / 2));
    heightLineText.setAttribute("fill", String(RESIZE_COLOR));
    heightLineText.setAttribute("font-size", String(RESIZE_FONT_SIZE));
    heightLineText.setAttribute("text-anchor", "middle");
    heightLineText.setAttribute("alignment-baseline", "middle");
    heightLineText.setAttribute(
      "transform",
      `rotate(-90 ${nodeRect.x - RESIZE_OFFSET - 8} ${nodeRect.y + nodeRect.h / 2})`
    );
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
      g.innerHTML = `
        <g class="${NODE_CLASS_PREFIX}-resize-line-group-width">
          <line class="${NODE_CLASS_PREFIX}-resize-line-group-width-line"></line>
          <text class="${NODE_CLASS_PREFIX}-resize-line-group-width-text"></text>
          <rect class="${NODE_CLASS_PREFIX}-resize-line-group-width-line-start"></rect>
          <rect class="${NODE_CLASS_PREFIX}-resize-line-group-width-line-end"></rect>
        </g>
        <g class="${NODE_CLASS_PREFIX}-resize-line-group-height">
          <line class="${NODE_CLASS_PREFIX}-resize-line-group-height-line"></line>
          <text class="${NODE_CLASS_PREFIX}-resize-line-group-height-text"></text>
          <rect class="${NODE_CLASS_PREFIX}-resize-line-group-height-line-start"></rect>
          <rect class="${NODE_CLASS_PREFIX}-resize-line-group-height-line-end"></rect>
        </g>
      `;
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
        item.style.display = "none";
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
        if (value[0].nodeRect.id === ((_a2 = store.selected) == null ? void 0 : _a2.dataset.id)) return;
      }
      if (Math.abs(newWidth - key) <= NODE_ABSORB_DELTA) {
        alternateAbsorbWidth.push(key);
      }
    });
    heightMap.forEach((value, key) => {
      var _a2;
      if (value.length === 1) {
        if (value[0].nodeRect.id === ((_a2 = store.selected) == null ? void 0 : _a2.dataset.id)) return;
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
    const { widthMap: newWidthMap, heightMap: newHeightMap } = searchSameWidthHeight(store);
    (_a = newWidthMap.get(currentWidth)) == null ? void 0 : _a.forEach((item) => {
      const lineGroup2 = this.g.querySelector(`[data-ower-id="${item.nodeRect.id}"]`);
      const widthLine2 = getElement(lineGroup2, `${NODE_CLASS_PREFIX}-resize-line-group-width`);
      widthLine2.style.display = "block";
    });
    (_b = newHeightMap.get(currentHeight)) == null ? void 0 : _b.forEach((item) => {
      const lineGroup2 = this.g.querySelector(`[data-ower-id="${item.nodeRect.id}"]`);
      const heightLine2 = getElement(lineGroup2, `${NODE_CLASS_PREFIX}-resize-line-group-height`);
      heightLine2.style.display = "block";
    });
    const lineGroup = this.g.querySelector(`[data-ower-id="${store.selected.dataset.id}"]`);
    const widthLine = getElement(lineGroup, `${NODE_CLASS_PREFIX}-resize-line-group-width`);
    const heightLine = getElement(lineGroup, `${NODE_CLASS_PREFIX}-resize-line-group-height`);
    heightLine.style.display = "block";
    widthLine.style.display = "block";
    renderResizeLine(store);
    store.seletedBorder.reRender(store);
  }
}
function getQuadrant(startX, startY, endX, endY) {
  if (endX - startX > 0 && endY - startY > 0) return "4";
  if (endX - startX < 0 && endY - startY > 0) return "3";
  if (endX - startX < 0 && endY - startY < 0) return "2";
  if (endX - startX > 0 && endY - startY < 0) return "1";
  return "0";
}
class Selector {
  constructor(svg) {
    __publicField(this, "g");
    // 选择框矩形
    __publicField(this, "selectorRect");
    __publicField(this, "previewRect");
    __publicField(this, "selectedGroup", []);
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute("class", `${NODE_CLASS_PREFIX}-selector`);
    this.selectorRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.selectorRect.setAttribute("class", `${NODE_CLASS_PREFIX}-selector-rect`);
    this.selectorRect.setAttribute("stroke", "#919191");
    this.selectorRect.setAttribute("stroke-width", "1px");
    this.selectorRect.setAttribute("fill", "rgba(255,255,255,0.3)");
    this.selectorRect.style.display = "none";
    this.previewRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.previewRect.setAttribute("class", `${NODE_CLASS_PREFIX}-selector-preview`);
    this.previewRect.setAttribute("stroke", "#000");
    this.previewRect.setAttribute("stroke-width", "1px");
    this.previewRect.setAttribute("fill", "transparent");
    this.previewRect.style.display = "none";
    this.g.append(this.selectorRect, this.previewRect);
    svg.append(this.g);
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
  reRender(store, startX, startY, endX, endY) {
    this.showSelector();
    this.hiddenPreview();
    this.selectedGroup = [];
    const quadrant = getQuadrant(startX, startY, endX, endY);
    const width = Math.abs(startX - endX);
    const height = Math.abs(startY - endY);
    this.selectorRect.setAttribute("width", String(width));
    this.selectorRect.setAttribute("height", String(height));
    let x = startX;
    let y = startY;
    switch (quadrant) {
      case "3": {
        x = x - width;
        break;
      }
      case "2": {
        x = x - width;
        y = y - height;
        break;
      }
      case "1": {
        y = y - height;
        break;
      }
    }
    this.selectorRect.setAttribute("x", String(x));
    this.selectorRect.setAttribute("y", String(y));
    store.nodes.forEach((node) => {
      const nodeRect = Rect.from(node);
      if (nodeRect.isIntersect({
        x,
        y,
        w: width,
        h: height
      })) {
        this.selectedGroup.push(node);
      }
    });
    const alternateX1 = [];
    const alternateY1 = [];
    const alternateX2 = [];
    const alternateY2 = [];
    this.selectedGroup.forEach((node) => {
      const { x: x2, y: y2, w, h } = Rect.from(node);
      alternateX1.push(x2);
      alternateY1.push(y2);
      alternateX2.push(x2 + w);
      alternateY2.push(y2 + h);
    });
    const x1 = Math.min(...alternateX1);
    const y1 = Math.min(...alternateY1);
    this.previewRect.setAttribute("x", String(alternateX1.length ? x1 : 0));
    this.previewRect.setAttribute("y", String(alternateY1.length ? y1 : 0));
    this.previewRect.setAttribute("width", String(alternateX2.length ? Math.max(...alternateX2) - x1 : 0));
    this.previewRect.setAttribute("height", String(alternateY2.length ? Math.max(...alternateY2) - y1 : 0));
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
    selector: new Selector(svg),
    gap: new Gap(svg),
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
class FreeMove {
  constructor(container, nodes) {
    __publicField(this, "store");
    this.store = initStore(container, nodes);
    addPointerListener(this.store);
  }
  mount() {
    this.store.container.append(this.store.svg);
  }
  unmount() {
    this.store.svg.remove();
  }
  align(option) {
    const { selected, container } = this.store;
    if (!selected) return;
    const containerRect = container.getBoundingClientRect();
    const selectedRect = Rect.from(selected);
    switch (option) {
      case "start":
        selected.style.left = toPx(0);
        break;
      case "center":
        selected.style.left = toPx(containerRect.width / 2 - selectedRect.w / 2);
        break;
      case "end":
        selected.style.left = toPx(containerRect.width - selectedRect.w);
        break;
    }
  }
}
export {
  FreeMove as default
};
