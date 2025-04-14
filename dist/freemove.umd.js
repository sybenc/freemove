(function(w,f){typeof exports=="object"&&typeof module<"u"?module.exports=f():typeof define=="function"&&define.amd?define(f):(w=typeof globalThis<"u"?globalThis:w||self,w.createFreeMove=f())})(this,function(){"use strict";var V=Object.defineProperty;var J=(w,f,E)=>f in w?V(w,f,{enumerable:!0,configurable:!0,writable:!0,value:E}):w[f]=E;var y=(w,f,E)=>J(w,typeof f!="symbol"?f+"":f,E);const f="__freemove";class m{constructor({x:t,y:n,h:i,w:s,node:c}){y(this,"x");y(this,"y");y(this,"w");y(this,"h");y(this,"node");this.x=t,this.y=n,this.h=i,this.w=s,this.node=c}isInSide(t){return t.x>=this.x&&t.x<=this.x+this.w&&t.y>=this.y&&t.y<=this.y+this.h}isEquel(t){return this.h===t.h&&this.w===t.w&&this.x===t.x&&this.y===t.y&&this.node===t.node}isIntersect(t){const n=this.x+3,i=this.y+3,s=this.x+this.w-3,c=this.y+this.h-3,l=t.x,b=t.y,r=t.x+t.w,h=t.y+t.h;return!(s<l||n>r||c<b||i>h)}getAlignLinePostion(){return{vl:this.x,vc:this.x+this.w/2,vr:this.x+this.w,ht:this.y,hc:this.y+this.h/2,hb:this.y+this.h}}static from(t){return new m({x:t.offsetLeft,y:t.offsetTop,w:t.offsetWidth,h:t.offsetHeight,node:t})}}function g(e){return typeof e=="number"?`${e}px`:String(e)}function _(e,t,n=.1){return Math.abs(e-t)<=n}function $(e,t){if(!e.selected)return;const n=e.container.getBoundingClientRect();e.alignLine.reRender(e);const i=e.selected.getBoundingClientRect();let s=t.clientX-i.left,c=t.clientY-i.top,l=null,b=null,r=null;function h(a){l||(l=requestAnimationFrame(()=>{if(!e.selected)return;let o=a.clientX-n.left-s,u=a.clientY-n.top-c;const A=e.container.clientWidth-e.selected.offsetWidth,S=e.container.clientHeight-e.selected.offsetHeight;o=Math.max(0,Math.min(o,A)),u=Math.max(0,Math.min(u,S)),e.moveDelta=[b!==null?o-b:0,r!==null?u-r:0],e.selected.style.left=g(o),e.selected.style.top=g(u),e.alignLine.reRender(e),e.seletedBorder.reRender(e),b=o,r=u,l=null}))}function d(){document.removeEventListener("pointermove",h),document.removeEventListener("pointerup",d),e.alignLine.hidden(),l!==null&&(cancelAnimationFrame(l),l=null)}document.addEventListener("pointermove",h),document.addEventListener("pointerup",d)}function O(e,t){if(!e.selected)return;const n=e.container.getBoundingClientRect(),s=t.target.dataset.direction;if(!s)return;const c=e.selected.getBoundingClientRect();let l=t.clientX,b=t.clientY,r=c.width,h=c.height,d=c.left-n.left,a=c.top-n.top;function o(A){let S=A.clientX-l,D=A.clientY-b,v=r,L=h,T=d,k=a;s.includes("right")&&(v=Math.max(10,r+S)),s.includes("left")&&(v=Math.max(10,r-S),T=d+S),s.includes("bottom")&&(L=Math.max(10,h+D)),s.includes("top")&&(L=Math.max(10,h-D),k=a+D),L>10&&(e.selected.style.height=g(L),e.selected.style.top=g(k)),v>10&&(e.selected.style.width=g(v),e.selected.style.left=g(T)),e.seletedBorder.reRender(e)}function u(){document.removeEventListener("pointermove",o),document.removeEventListener("pointerup",u)}document.addEventListener("pointermove",o),document.addEventListener("pointerup",u)}function C(e){e.svg.addEventListener("pointerdown",t=>{t.preventDefault();const n=t.target;if(n.classList[0].includes(`${f}-selected-border-point-`)){const i=n.dataset.ownerId;for(let s=0;s<e.nodes.length;s++)i===e.nodes[s].dataset.ownerId&&e.setSelected(e.nodes[s]);e.selected&&O(e,t);return}if(console.log(1111),n.classList.contains(`${f}-svg`)){let i=null;for(const s of e.nodes){const c=m.from(s);if(c.isInSide({x:t.offsetX,y:t.offsetY})){i=c;break}}i&&i.node.classList.contains(`${f}-movable-node`)&&(e.setSelected(i.node),$(e,t))}})}const H="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let P=(e=21)=>{let t="",n=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+=H[n[e]&63];return t};const X=1,F="#EA3",p=["vl","vc","vr","ht","hc","hb"];function Y(e,t){const n={ht:[],hc:[],hb:[],vl:[],vc:[],vr:[]};function i(){const l=m.from(e.selected),b=e.nodes.filter(r=>r!==e.selected).map(r=>m.from(r));p.forEach(r=>n[r]=[]),b.forEach(r=>{if(l.isIntersect(r))return;const h=l.getAlignLinePostion();p.forEach(d=>{let a=1e4,o=1e4,u;/^h/.test(d)&&(l.x>r.x+r.w?(a=l.x+l.w,o=r.x):l.x+l.w<r.x?(a=l.x,o=r.x+r.w):(a=Math.min(l.x,r.x),o=Math.max(l.x+l.w,r.x+r.w)),[r.y,r.y+r.h/2,r.y+r.h].forEach(A=>{u=Math.abs(h[d]-A),u<=3&&n[d].push({type:d,source:a,target:o,absorbDistance:u,absorbPosition:A,nodeRects:[r]})})),/^v/.test(d)&&(l.y>r.y+r.h?(a=l.y+l.h,o=r.y):l.y+l.h<r.y?(a=l.y,o=r.y+r.h):(a=Math.min(l.y,r.y),o=Math.max(l.y+l.h,r.y+r.h)),[r.x,r.x+r.w/2,r.x+r.w].forEach(A=>{u=Math.abs(h[d]-A),u<=3&&n[d].push({type:d,source:a,target:o,absorbDistance:u,absorbPosition:A,nodeRects:[r]})}))})}),p.forEach(r=>{const h=new Map;n[r].forEach(o=>{const u=h.get(o.absorbDistance)||[];u.push(o),h.set(o.absorbDistance,u)});let d=1/0,a=0;h.forEach(o=>{o.forEach(u=>{d=Math.min(d,u.source,u.target),a=Math.max(a,u.source,u.target)})}),h.forEach(o=>{o.forEach(u=>{u.source=d,u.target=a})}),n[r]=Array.from(h.values()).flat()})}function s(l){const{absorbPosition:b,type:r}=l,h=e.selected;switch(r){case"ht":h.style.top=g(b);break;case"hc":h.style.top=g(b-parseFloat(h.style.height)/2);break;case"hb":h.style.top=g(b-parseFloat(h.style.height));break;case"vl":h.style.left=g(b);break;case"vc":h.style.left=g(b-parseFloat(h.style.width)/2);break;case"vr":h.style.left=g(b-parseFloat(h.style.width));break}i(),e.seletedBorder.reRender(e);let d=1/0;p.forEach(a=>{n[a].forEach(o=>{o.absorbDistance<d&&(d=o.absorbDistance)})}),p.forEach(a=>{n[a]=n[a].filter(o=>_(o.absorbDistance,d,.1))})}function c(){const l=m.from(e.selected);Object.values(n).flat().forEach(({source:r,target:h,type:d})=>{const a=t[d];if(a){if(/^h/.test(d)){a.setAttribute("x1",String(r)),a.setAttribute("x2",String(h));const o=d==="ht"?l.y:d==="hc"?l.y+l.h/2:l.y+l.h;a.setAttribute("y1",String(o)),a.setAttribute("y2",String(o))}if(/^v/.test(d)){a.setAttribute("y1",String(r)),a.setAttribute("y2",String(h));const o=d==="vl"?l.x:d==="vc"?l.x+l.w/2:l.x+l.w;a.setAttribute("x1",String(o)),a.setAttribute("x2",String(o))}a.style.display="block"}})}i(),Object.values(n).flat().forEach(l=>s(l)),c()}class z{constructor(t){y(this,"g");y(this,"lines");this.g=document.createElementNS("http://www.w3.org/2000/svg","g"),this.g.setAttribute("class",`${f}-alignLine`),t.append(this.g),this.lines={},p.forEach(n=>{const i=document.createElementNS("http://www.w3.org/2000/svg","line");i.setAttribute("class",`${f}-alignLine-${n}`),i.setAttribute("stroke",F),i.setAttribute("stroke-width",String(X)),i.style.display="none",this.g.append(i),this.lines[n]=i})}hidden(){Object.values(this.lines).forEach(t=>{t.style.display="none"})}reRender(t){t.selected&&(this.hidden(),Y(t,this.lines))}}const x=1,I="#000",B=6,N=["left","top","right","bottom"],M=["left-top","top","right-top","right","right-bottom","bottom","left-bottom","left"],W=["nwse-resize","ns-resize","nesw-resize","ew-resize","nwse-resize","ns-resize","nesw-resize","ew-resize"];function R(){const e=[],t=[];return N.forEach(n=>{const i=document.createElementNS("http://www.w3.org/2000/svg","line");i.setAttribute("class",`${f}-selected-border-line-${n}`),i.setAttribute("stroke",I),i.setAttribute("stroke-width",g(x)),t.push(i)}),M.forEach((n,i)=>{const s=document.createElementNS("http://www.w3.org/2000/svg","rect");s.setAttribute("class",`${f}-selected-border-point-${n}`),s.setAttribute("fill","white"),s.setAttribute("stroke",I),s.setAttribute("stroke-width",g(x)),s.setAttribute("width",g(B)),s.setAttribute("height",g(B)),s.setAttribute("style",`cursor: ${W[i]}`),s.setAttribute("data-direction",n),e.push(s)}),[e,t]}function G(e){const t=m.from(e.selected);N.forEach(n=>{const i=e.seletedBorder.g.getElementsByClassName(`${f}-selected-border-line-${n}`)[0];switch(n){case"left":i.setAttribute("x1",String(t.x)),i.setAttribute("y1",String(t.y-x/2)),i.setAttribute("x2",String(t.x)),i.setAttribute("y2",String(t.y+t.h+x/2));break;case"right":i.setAttribute("x1",String(t.x+t.w)),i.setAttribute("y1",String(t.y-x/2)),i.setAttribute("x2",String(t.x+t.w)),i.setAttribute("y2",String(t.y+t.h+x/2));break;case"top":i.setAttribute("x1",String(t.x-x/2)),i.setAttribute("y1",String(t.y)),i.setAttribute("x2",String(t.x+t.w+x/2)),i.setAttribute("y2",String(t.y));break;case"bottom":i.setAttribute("x1",String(t.x-x/2)),i.setAttribute("y1",String(t.y+t.h)),i.setAttribute("x2",String(t.x+t.w+x/2)),i.setAttribute("y2",String(t.y+t.h));break}}),M.forEach((n,i)=>{const s=e.seletedBorder.g.getElementsByClassName(`${f}-selected-border-point-${n}`)[0];s.setAttribute("data-owner-id",e.selected.dataset.id);const c=B/2;switch(n){case"left-top":s.setAttribute("x",String(t.x-c)),s.setAttribute("y",String(t.y-c));break;case"top":s.setAttribute("x",String(t.x+t.w/2-c)),s.setAttribute("y",String(t.y-c));break;case"right-top":s.setAttribute("x",String(t.x+t.w-c)),s.setAttribute("y",String(t.y-c));break;case"right":s.setAttribute("x",String(t.x+t.w-c)),s.setAttribute("y",String(t.y+t.h/2-c));break;case"right-bottom":s.setAttribute("x",String(t.x+t.w-c)),s.setAttribute("y",String(t.y+t.h-c));break;case"bottom":s.setAttribute("x",String(t.x+t.w/2-c)),s.setAttribute("y",String(t.y+t.h-c));break;case"left-bottom":s.setAttribute("x",String(t.x-c)),s.setAttribute("y",String(t.y+t.h-c));break;case"left":s.setAttribute("x",String(t.x-c)),s.setAttribute("y",String(t.y+t.h/2-c));break}})}class j{constructor(t){y(this,"g");y(this,"points");y(this,"lines");this.g=document.createElementNS("http://www.w3.org/2000/svg","g"),this.g.setAttribute("class",`${f}-seleted-border`),t.append(this.g);const[n,i]=R();this.points=n,this.lines=i,this.g.append(...i,...n)}hidden(){this.g.style.display="none"}reRender(t){t.selected&&(this.g.style.display="block",G(t))}}const q=(e,t)=>{const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("class",`${f}-svg`);const i=e.getBoundingClientRect();return n.setAttribute("width",g(i.width)),n.setAttribute("height",g(i.height)),n.style="position: absolute; inset: 0;",e.className+=` ${f}-container`,t.forEach(s=>{s.className+=` ${f}-movable-node`,s.setAttribute("data-id",P()),/%$/.test(s.style.x)&&(s.style.x=g(i.width*parseInt(s.style.x)/100)),/%$/.test(s.style.y)&&(s.style.y=g(i.height*parseInt(s.style.y)/100)),/%$/.test(s.style.width)&&(s.style.width=g(i.width*parseInt(s.style.width)/100)),/%$/.test(s.style.height)&&(s.style.height=g(i.height*parseInt(s.style.height)/100))}),{container:e,nodes:t,svg:n,selected:null,alignLine:new z(n),seletedBorder:new j(n),moveDelta:[0,0],setSelected(s){if(this.selected=s,!s){this.seletedBorder.hidden();return}this.seletedBorder.reRender(this)}}};function U(e,t){const n=q(e,t);return C(n),n.svg}return U});
