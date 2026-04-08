var A11yToolkit=(()=>{var B="a11y-ux-widget",m=["default","lg","xl"],F={default:"Default",lg:"Large",xl:"XL"},k=["off","deuteranopia","protanopia","tritanopia"],H={off:"Off",deuteranopia:"Red-Green",protanopia:"Red-Weak",tritanopia:"Blue-Yellow"},C=[{id:"underline-links",cls:"a11y-underline-links",label:"Underline Links",desc:"Adds underlines to all links",type:"toggle",icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" y1="20" x2="20" y2="20"/>
    </svg>`},{id:"high-contrast",cls:"a11y-high-contrast",label:"High Contrast",desc:"Boosts text and background contrast",type:"toggle",icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor" stroke="none"/>
    </svg>`},{id:"colorblind",cls:null,label:"Color Vision",desc:"Cycles: Off \u2192 Red-Green \u2192 Red-Weak \u2192 Blue-Yellow",type:"cycle-cb",icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M9 12a3 3 0 0 1 6 0"/>
      <circle cx="9.5" cy="10" r="1" fill="currentColor" stroke="none"/>
      <circle cx="14.5" cy="10" r="1" fill="currentColor" stroke="none"/>
    </svg>`},{id:"dyslexia-font",cls:"a11y-dyslexia-font",label:"Dyslexia Friendly Font",desc:"Switches to Lexend for readability",type:"toggle",icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
    </svg>`},{id:"font-size",cls:null,label:"Increase Font Size",desc:"Cycles: Default \u2192 Large \u2192 XL",type:"cycle",icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <text x="8.5" y="16" font-size="10" fill="currentColor" stroke="none" font-weight="600">A</text>
      <text x="13" y="15.5" font-size="7.5" fill="currentColor" stroke="none" font-weight="600">a</text>
    </svg>`},{id:"focus-highlight",cls:"a11y-focus-highlight",label:"Highlight Focus",desc:"Visible outlines on focused elements",type:"toggle",icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke-dasharray="4 2"/><circle cx="12" cy="12" r="3"/>
    </svg>`},{id:"reduce-motion",cls:"a11y-reduce-motion",label:"Reduce Motion",desc:"Stops animations and transitions",type:"toggle",icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>`},{id:"letter-spacing",cls:"a11y-letter-spacing",label:"Letter Spacing",desc:"Increases space between characters",type:"toggle",icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 8h10"/><path d="M5 12h14"/><path d="M7 16h10"/>
      <line x1="3" y1="8" x2="3" y2="16"/><line x1="21" y1="8" x2="21" y2="16"/>
    </svg>`},{id:"reading-guide",cls:"a11y-reading-guide",label:"Reading Guide",desc:"Horizontal line follows your cursor",type:"toggle",icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><polyline points="8 8 12 4 16 8"/>
    </svg>`},{id:"big-cursor",cls:"a11y-big-cursor",label:"Big Cursor",desc:"Enlarges the mouse pointer",type:"toggle",icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 4l7 18 2.5-7.5L21 12z" fill="currentColor" stroke="none"/>
      <path d="M4 4l7 18 2.5-7.5L21 12z"/>
    </svg>`}],f=!1,i=null,e=null,g=null,E=B,o={},y=!1,d=null,v=!1,u=null;function _(){try{return JSON.parse(localStorage.getItem(E)||"{}")}catch{return{}}}function T(n){try{localStorage.setItem(E,JSON.stringify(n))}catch{}}function z(n){let t=document.documentElement;t.classList.remove("a11y-font-lg","a11y-font-xl"),n==="lg"&&t.classList.add("a11y-font-lg"),n==="xl"&&t.classList.add("a11y-font-xl")}function M(n){let t=document.documentElement;t.classList.remove("a11y-cb-deuteranopia","a11y-cb-protanopia","a11y-cb-tritanopia"),n&&n!=="off"&&t.classList.add("a11y-cb-"+n)}function R(n){C.forEach(t=>{t.type==="toggle"&&t.cls&&document.documentElement.classList.toggle(t.cls,!!n[t.id])}),z(n["font-size"]||"default"),M(n.colorblind||"off"),n["dyslexia-font"]&&O(),L(!!n["reading-guide"])}function O(){if(v||typeof document>"u")return;v=!0;let n=document.createElement("link");n.rel="stylesheet",n.href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&display=swap",document.head.appendChild(n)}function A(n){d&&(d.style.top=n.clientY+"px")}function L(n){n&&!d?(d=document.createElement("div"),d.id="a11y-reading-guide",d.setAttribute("aria-hidden","true"),document.body.appendChild(d),document.addEventListener("mousemove",A)):!n&&d&&(document.removeEventListener("mousemove",A),d.remove(),d=null)}function D(){if(document.getElementById("a11y-svg-filter-defs"))return;let n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("id","a11y-svg-filter-defs"),n.setAttribute("aria-hidden","true"),n.classList.add("a11y-svg-filters"),n.innerHTML=`
    <defs>
      <filter id="a11y-deuteranopia-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
        <feColorMatrix type="matrix" values="
          0.367 0.861 -0.228 0 0
          0.280 0.673  0.047 0 0
         -0.012 0.043  0.969 0 0
          0     0      0     1 0
        "/>
      </filter>
      <filter id="a11y-protanopia-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
        <feColorMatrix type="matrix" values="
          0.152 1.053 -0.205 0 0
          0.115 0.786  0.099 0 0
         -0.004 -0.048  1.052 0 0
          0     0      0     1 0
        "/>
      </filter>
      <filter id="a11y-tritanopia-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
        <feColorMatrix type="matrix" values="
          1.256 -0.077 -0.179 0 0
         -0.078  0.931  0.148 0 0
          0.005  0.691  0.304 0 0
          0      0      0     1 0
        "/>
      </filter>
    </defs>
  `,(g||document.body).appendChild(n)}function h(n){let t=`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="12" cy="7.5" r="1.6" fill="currentColor" stroke="none"/>
    <line x1="7" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="12" y1="11" x2="12" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="19" x2="12" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="15" y1="19" x2="12" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,p=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`,r="";return C.forEach(a=>{let l;a.type==="cycle"?l=(n["font-size"]||"default")!=="default":a.type==="cycle-cb"?l=(n.colorblind||"off")!=="off":l=!!n[a.id];let c=l?"true":"false",s;if(a.type==="cycle"){let x=n["font-size"]||"default";s=`<span class="a11y-font-badge" data-font-badge>${F[x]}</span>`}else if(a.type==="cycle-cb"){let x=n.colorblind||"off";s=`<span class="a11y-font-badge" data-cb-badge>${H[x]}</span>`}else s='<span class="a11y-toggle-pill" aria-hidden="true"></span>';r+=`
      <button
        class="a11y-toggle"
        data-feature="${a.id}"
        aria-pressed="${c}"
        title="${a.label}"
        type="button"
      >
        <span class="a11y-toggle-icon" aria-hidden="true">${a.icon}</span>
        <span class="a11y-toggle-label">
          <span class="a11y-toggle-name">${a.label}</span>
          <span class="a11y-toggle-desc">${a.desc}</span>
        </span>
        ${s}
      </button>
    `}),`
    <div class="a11y-panel-header">
      <div>
        <div class="a11y-panel-title">
          ${t}
          Accessibility
        </div>
        <div class="a11y-panel-subtitle">Customise your experience</div>
      </div>
      <button class="a11y-close-btn" data-ux-widget-close aria-label="Close accessibility panel" type="button">
        ${p}
      </button>
    </div>
    <div class="a11y-panel-body" role="group" aria-label="Accessibility options">
      ${r}
    </div>
    <div class="a11y-panel-footer">
      <button class="a11y-reset-btn" data-ux-widget-reset type="button">\u21BA Reset All</button>
    </div>
  `}function P(n){let t=document.documentElement;if(n.type==="toggle")o[n.id]=!o[n.id],t.classList.toggle(n.cls,o[n.id]),n.id==="dyslexia-font"&&o[n.id]&&O(),n.id==="reading-guide"&&L(o[n.id]);else if(n.type==="cycle"){let l=o["font-size"]||"default",c=m.indexOf(l),s=m[(c+1)%m.length];o["font-size"]=s,z(s)}else if(n.type==="cycle-cb"){let l=o.colorblind||"off",c=k.indexOf(l),s=k[(c+1)%k.length];o.colorblind=s,M(s)}T(o);let p=e.querySelector(".a11y-panel-body"),r=p?p.scrollTop:0;e.innerHTML=h(o),b();let a=e.querySelector(".a11y-panel-body");a&&(a.scrollTop=r)}function G(){o={},T(o),R(o),e.innerHTML=h(o),b()}function b(){let n=e.querySelector("[data-ux-widget-close]");n&&n.addEventListener("click",r=>{r.stopPropagation(),w()});let t=e.querySelector("[data-ux-widget-reset]");t&&t.addEventListener("click",r=>{r.stopPropagation(),G()}),e.querySelectorAll(".a11y-toggle").forEach(r=>{let a=r.dataset.feature,l=C.find(c=>c.id===a);l&&r.addEventListener("click",c=>{c.stopPropagation(),P(l)})})}function U(){y=!0,e.classList.add("a11y-panel-open"),i.setAttribute("aria-expanded","true"),e.innerHTML=h(o),b(),requestAnimationFrame(()=>{if(e){let n=e.querySelector("[data-ux-widget-close]");n&&n.focus()}})}function w(){y=!1,e.classList.remove("a11y-panel-open"),i.setAttribute("aria-expanded","false"),i.focus()}function S(n={}){f||(f=!0,g=n.container||document.body,E=n.storageKey||B,o=_(),R(o),D(),i=document.createElement("button"),i.setAttribute("data-ux-widget-btn",""),i.setAttribute("aria-label","Open accessibility settings"),i.setAttribute("aria-haspopup","dialog"),i.setAttribute("aria-expanded","false"),i.setAttribute("type","button"),i.className="a11y-widget-btn",i.innerHTML=`
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="#0b0e11">
      <circle cx="50" cy="50" r="47" fill="none" stroke="#0b0e11" stroke-width="6"/>
      <circle cx="50" cy="22" r="9" fill="#0b0e11"/>
      <line x1="14" y1="42" x2="86" y2="42" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
      <line x1="50" y1="42" x2="50" y2="63" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
      <line x1="50" y1="63" x2="30" y2="85" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
      <line x1="50" y1="63" x2="70" y2="85" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
    </svg>
  `,e=document.createElement("div"),e.setAttribute("data-ux-widget-panel",""),e.setAttribute("role","dialog"),e.setAttribute("aria-label","Accessibility settings"),e.setAttribute("aria-modal","false"),e.className="a11y-widget-panel",e.innerHTML=h(o),g.appendChild(i),g.appendChild(e),i.addEventListener("click",()=>{y?w():U()}),u=t=>{t.key==="Escape"&&y&&w()},document.addEventListener("keydown",u),b())}function I(){if(!f)return;u&&(document.removeEventListener("keydown",u),u=null),L(!1);let n=document.getElementById("a11y-svg-filter-defs");n&&n.remove(),i&&(i.remove(),i=null),e&&(e.remove(),e=null),g=null,o={},y=!1,f=!1,v=!1}var j=`/* ============================================================
   HERMES DASHBOARD \u2014 Accessibility Widget Styles
   a11y-widget.css
   ============================================================ */

/* ------------------------------------------------------------
   1. WIDGET CHROME \u2014 Button & Panel
   ------------------------------------------------------------ */

#a11y-widget-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #5de4d4;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 16px rgba(93, 228, 212, 0.35),
    0 2px 6px rgba(0, 0, 0, 0.5);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
  outline: none;
  padding: 0;
}

#a11y-widget-btn:hover {
  filter: brightness(1.12);
  transform: scale(1.06);
  box-shadow:
    0 6px 22px rgba(93, 228, 212, 0.50),
    0 2px 8px rgba(0, 0, 0, 0.55);
}

#a11y-widget-btn:focus-visible {
  outline: 2px solid #5de4d4;
  outline-offset: 3px;
}

#a11y-widget-btn:active {
  transform: scale(0.97);
}

#a11y-widget-btn svg {
  width: 26px;
  height: 26px;
  display: block;
  flex-shrink: 0;
}

/* Pulse animation \u2014 shown only on first visit */
#a11y-widget-btn.a11y-pulse {
  animation: a11y-pulse-ring 2.4s ease-out infinite;
}

@keyframes a11y-pulse-ring {
  0% {
    box-shadow:
      0 4px 16px rgba(93, 228, 212, 0.35),
      0 2px 6px rgba(0, 0, 0, 0.5),
      0 0 0 0 rgba(93, 228, 212, 0.55);
  }
  60% {
    box-shadow:
      0 4px 16px rgba(93, 228, 212, 0.35),
      0 2px 6px rgba(0, 0, 0, 0.5),
      0 0 0 14px rgba(93, 228, 212, 0);
  }
  100% {
    box-shadow:
      0 4px 16px rgba(93, 228, 212, 0.35),
      0 2px 6px rgba(0, 0, 0, 0.5),
      0 0 0 0 rgba(93, 228, 212, 0);
  }
}

/* ------------------------------------------------------------
   Panel
   ------------------------------------------------------------ */

#a11y-widget-panel {
  position: fixed;
  bottom: 82px;
  right: 24px;
  width: 280px;
  max-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  background: #13171c;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.65),
    0 2px 8px rgba(0, 0, 0, 0.4);
  font-family: 'Inter', system-ui, sans-serif;
  color: #e8eaed;
  overflow: hidden;

  /* Closed state */
  opacity: 0;
  transform: translateY(10px) scale(0.97);
  pointer-events: none;
  transition:
    opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

#a11y-widget-panel.a11y-panel-open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

/* Panel Header */
.a11y-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  gap: 8px;
  flex-shrink: 0;
}

.a11y-panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #e8eaed;
  line-height: 1;
}

.a11y-panel-title svg {
  width: 15px;
  height: 15px;
  color: #5de4d4;
  flex-shrink: 0;
}

.a11y-panel-subtitle {
  font-size: 10.5px;
  color: #9aa0a6;
  font-weight: 400;
  letter-spacing: 0.01em;
  margin-top: 2px;
}

.a11y-close-btn {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #9aa0a6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.15s ease, color 0.15s ease;
  flex-shrink: 0;
}

.a11y-close-btn:hover {
  background: rgba(255, 255, 255, 0.10);
  color: #e8eaed;
}

.a11y-close-btn:focus-visible {
  outline: 2px solid #5de4d4;
  outline-offset: 2px;
}

.a11y-close-btn svg {
  width: 13px;
  height: 13px;
  display: block;
}

/* LOCKED LAYOUT \u2014 compact items, full-height panel, scroll preserved on toggle.
   Approved by Elli 2026-04-05. Do not change item sizing/gaps. */
/* Panel Body */
.a11y-panel-body {
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(93, 228, 212, 0.3) transparent;
}
.a11y-panel-body::-webkit-scrollbar { width: 4px; }
.a11y-panel-body::-webkit-scrollbar-track { background: transparent; }
.a11y-panel-body::-webkit-scrollbar-thumb { background: rgba(93, 228, 212, 0.3); border-radius: 4px; }

/* ------------------------------------------------------------
   Toggle Items
   ------------------------------------------------------------ */

.a11y-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition:
    background 0.16s ease,
    border-color 0.16s ease,
    filter 0.16s ease;
  text-align: left;
  color: #e8eaed;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12.5px;
  font-weight: 400;
}

.a11y-toggle:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.09);
}

.a11y-toggle:focus-visible {
  outline: 2px solid #5de4d4;
  outline-offset: 2px;
}

/* Toggle icon wrapper */
.a11y-toggle-icon {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.16s ease;
}

.a11y-toggle-icon svg {
  width: 14px;
  height: 14px;
  display: block;
  color: #9aa0a6;
  transition: color 0.16s ease;
}

/* Toggle label area */
.a11y-toggle-label {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.a11y-toggle-name {
  font-size: 12px;
  font-weight: 500;
  color: #e8eaed;
  line-height: 1.15;
}

.a11y-toggle-desc {
  font-size: 10px;
  color: #9aa0a6;
  line-height: 1.2;
  margin-top: 0px;
}

/* Toggle pill (on/off indicator) */
.a11y-toggle-pill {
  width: 28px;
  height: 15px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.10);
  position: relative;
  flex-shrink: 0;
  transition: background 0.18s ease;
}

.a11y-toggle-pill::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #9aa0a6;
  transition:
    transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.18s ease;
}

/* Active / ON state */
.a11y-toggle[aria-pressed="true"] {
  background: rgba(93, 228, 212, 0.10);
  border-color: rgba(93, 228, 212, 0.22);
}

.a11y-toggle[aria-pressed="true"]:hover {
  background: rgba(93, 228, 212, 0.15);
  border-color: rgba(93, 228, 212, 0.30);
}

.a11y-toggle[aria-pressed="true"] .a11y-toggle-icon {
  background: rgba(93, 228, 212, 0.15);
}

.a11y-toggle[aria-pressed="true"] .a11y-toggle-icon svg {
  color: #5de4d4;
}

.a11y-toggle[aria-pressed="true"] .a11y-toggle-pill {
  background: #5de4d4;
}

.a11y-toggle[aria-pressed="true"] .a11y-toggle-pill::after {
  transform: translateX(13px); /* adjusted for 28px width pill */
  background: #0b0e11;
}

/* Font size cycle button variant \u2014 uses a badge instead of a pill */
.a11y-toggle[data-feature="font-size"] .a11y-toggle-pill {
  display: none;
}

.a11y-font-badge {
  font-size: 10px;
  font-weight: 600;
  font-family: 'Inter', system-ui, sans-serif;
  letter-spacing: 0.04em;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #9aa0a6;
  flex-shrink: 0;
  transition: background 0.16s ease, color 0.16s ease;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.a11y-toggle[data-feature="font-size"][aria-pressed="true"] .a11y-font-badge {
  background: rgba(93, 228, 212, 0.15);
  color: #5de4d4;
  border-color: rgba(93, 228, 212, 0.30);
}

/* Panel Footer */
.a11y-panel-footer {
  padding: 6px 12px 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.a11y-reset-btn {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: #9aa0a6;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.16s ease,
    color 0.16s ease,
    border-color 0.16s ease;
  letter-spacing: 0.02em;
}

.a11y-reset-btn:hover {
  background: rgba(255, 80, 80, 0.10);
  border-color: rgba(255, 80, 80, 0.20);
  color: #ff8585;
}

.a11y-reset-btn:focus-visible {
  outline: 2px solid #5de4d4;
  outline-offset: 2px;
}

/* ============================================================
   2. ACCESSIBILITY FEATURE CLASSES
      Applied to <html> element. Use !important to override.
   ============================================================ */

/* ------------------------------------------------------------
   2a. Underline Links
   Skips card-level links (a.card) \u2014 only inline text links.
   ------------------------------------------------------------ */
html.a11y-underline-links a:not(.card):not([class*="card"]):not([class*="bento"]),
html.a11y-underline-links a:not(.card):not([class*="card"]):not([class*="bento"]):visited {
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
}

/* ------------------------------------------------------------
   2b. High Contrast
   Designed for dark-themed dashboards: boost secondary/muted
   text to full white, sharpen borders, brighten accents.
   Does NOT underline links (that's a separate toggle).
   ------------------------------------------------------------ */

/* Boost muted/secondary text \u2014 leave accent (teal) colors untouched */
html.a11y-high-contrast {
  --text-2: #e0e0e0 !important;
  --text-3: #d0d0d0 !important;
  --border: rgba(255, 255, 255, 0.2) !important;
  --border-hover: rgba(255, 255, 255, 0.35) !important;
}

/* Links: brighter accent, no forced underline */
html.a11y-high-contrast a {
  color: #7aeee0 !important;
}

/* Cards & containers: sharper borders */
html.a11y-high-contrast [class*="card"],
html.a11y-high-contrast [class*="bento"],
html.a11y-high-contrast details {
  border-color: rgba(255, 255, 255, 0.2) !important;
}

/* Buttons: clearer borders */
html.a11y-high-contrast button,
html.a11y-high-contrast [role="button"] {
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
}

/* Inputs */
html.a11y-high-contrast input,
html.a11y-high-contrast textarea,
html.a11y-high-contrast select {
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.35) !important;
}

/* Status dots / badges: boost opacity */
html.a11y-high-contrast [class*="status"],
html.a11y-high-contrast [class*="badge"],
html.a11y-high-contrast [class*="tag"] {
  opacity: 1 !important;
}

/* ------------------------------------------------------------
   2c. Color Vision (Colorblind modes)
      Cycles: Off \u2192 Deuteranopia \u2192 Protanopia \u2192 Tritanopia
   ------------------------------------------------------------ */
html.a11y-cb-deuteranopia { filter: url(#a11y-deuteranopia-filter); }
html.a11y-cb-protanopia   { filter: url(#a11y-protanopia-filter); }
html.a11y-cb-tritanopia   { filter: url(#a11y-tritanopia-filter); }

/* SVG filter injected by JS */
.a11y-svg-filters {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}

/* CSS-level colorblind adjustments for all modes */
html[class*="a11y-cb-"] :is(
  .success, .ok, .positive, [class*="green"], [class*="success"]
) {
  --color-success: #1a78c2 !important;
  color: #1a78c2 !important;
}

html[class*="a11y-cb-"] :is(
  .error, .danger, .negative, [class*="red"], [class*="error"], [class*="danger"]
) {
  --color-danger: #e07b00 !important;
  color: #e07b00 !important;
}

/* ------------------------------------------------------------
   2d. Dyslexia Friendly Font (Lexend \u2014 loaded dynamically)
   ------------------------------------------------------------ */
html.a11y-dyslexia-font,
html.a11y-dyslexia-font body,
html.a11y-dyslexia-font p,
html.a11y-dyslexia-font span,
html.a11y-dyslexia-font li,
html.a11y-dyslexia-font a,
html.a11y-dyslexia-font h1,
html.a11y-dyslexia-font h2,
html.a11y-dyslexia-font h3,
html.a11y-dyslexia-font h4,
html.a11y-dyslexia-font h5,
html.a11y-dyslexia-font h6,
html.a11y-dyslexia-font button,
html.a11y-dyslexia-font input,
html.a11y-dyslexia-font label,
html.a11y-dyslexia-font td,
html.a11y-dyslexia-font th {
  font-family: 'Lexend', 'Inter', system-ui, sans-serif !important;
  letter-spacing: 0.02em !important;
  word-spacing: 0.08em !important;
  line-height: 1.65 !important;
}

/* ------------------------------------------------------------
   2e. Increase Font Size
   Override both the root font-size AND the px-based CSS
   variables so all text scales (cards use --fs-* vars).
   ------------------------------------------------------------ */
html.a11y-font-lg {
  font-size: 120% !important;
  --fs-xs:   15.5px !important;
  --fs-sm:   17px !important;
  --fs-base: 18px !important;
  --fs-lg:   20px !important;
  --fs-xl:   24px !important;
  --fs-2xl:  34px !important;
  --fs-3xl:  48px !important;
}

html.a11y-font-xl {
  font-size: 140% !important;
  --fs-xs:   18px !important;
  --fs-sm:   20px !important;
  --fs-base: 21px !important;
  --fs-lg:   24px !important;
  --fs-xl:   28px !important;
  --fs-2xl:  39px !important;
  --fs-3xl:  56px !important;
}

/* ------------------------------------------------------------
   2f. Highlight Focus
   ------------------------------------------------------------ */
html.a11y-focus-highlight *:focus,
html.a11y-focus-highlight *:focus-visible {
  outline: 2.5px solid #5de4d4 !important;
  outline-offset: 3px !important;
  box-shadow: 0 0 0 5px rgba(93, 228, 212, 0.20) !important;
  border-radius: 2px;
}

html.a11y-focus-highlight a:focus,
html.a11y-focus-highlight button:focus,
html.a11y-focus-highlight input:focus,
html.a11y-focus-highlight select:focus,
html.a11y-focus-highlight textarea:focus,
html.a11y-focus-highlight [tabindex]:focus {
  outline: 2.5px solid #5de4d4 !important;
  outline-offset: 3px !important;
  box-shadow: 0 0 0 5px rgba(93, 228, 212, 0.20) !important;
}

/* ------------------------------------------------------------
   2g. Reduce Motion (manual toggle)
   ------------------------------------------------------------ */
html.a11y-reduce-motion,
html.a11y-reduce-motion *,
html.a11y-reduce-motion *::before,
html.a11y-reduce-motion *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}

/* ------------------------------------------------------------
   2h. Letter Spacing
   ------------------------------------------------------------ */
html.a11y-letter-spacing body,
html.a11y-letter-spacing p,
html.a11y-letter-spacing span,
html.a11y-letter-spacing li,
html.a11y-letter-spacing a,
html.a11y-letter-spacing h1,
html.a11y-letter-spacing h2,
html.a11y-letter-spacing h3,
html.a11y-letter-spacing h4,
html.a11y-letter-spacing h5,
html.a11y-letter-spacing h6,
html.a11y-letter-spacing td,
html.a11y-letter-spacing th,
html.a11y-letter-spacing label,
html.a11y-letter-spacing button,
html.a11y-letter-spacing input {
  letter-spacing: 0.12em !important;
  word-spacing: 0.16em !important;
}

/* ------------------------------------------------------------
   2i. Reading Guide
   ------------------------------------------------------------ */
#a11y-reading-guide {
  position: fixed;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(93, 228, 212, 0.65);
  box-shadow: 0 0 12px rgba(93, 228, 212, 0.35);
  pointer-events: none;
  transition: top 0.05s linear;
}

/* ------------------------------------------------------------
   2j. Big Cursor
   ------------------------------------------------------------ */
html.a11y-big-cursor,
html.a11y-big-cursor * {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M4 4l10 24 3.5-10.5L28 14z' fill='white' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E") 4 4, auto !important;
}
html.a11y-big-cursor a,
html.a11y-big-cursor button,
html.a11y-big-cursor [role="button"],
html.a11y-big-cursor input[type="submit"],
html.a11y-big-cursor label {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M10 4C10 4 10 22 10 22C10 22 13 18 15 18C17 18 22 28 22 28L26 26C26 26 21 16 19 16C17 16 20 14 20 14z' fill='white' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E") 10 4, pointer !important;
}

/* Colorblind cycle badge (same style as font badge) */
.a11y-toggle[data-feature="colorblind"] .a11y-toggle-pill { display: none; }
.a11y-toggle[data-feature="colorblind"][aria-pressed="true"] .a11y-font-badge {
  background: rgba(93, 228, 212, 0.15);
  color: #5de4d4;
  border-color: rgba(93, 228, 212, 0.30);
}

/* ============================================================
   3. REDUCED MOTION RESPECT
   ============================================================ */
@media (prefers-reduced-motion: reduce) {
  #a11y-widget-btn,
  #a11y-widget-btn.a11y-pulse,
  #a11y-widget-panel,
  .a11y-toggle,
  .a11y-toggle-pill,
  .a11y-toggle-pill::after {
    animation: none !important;
    transition: none !important;
  }
}
`;if(typeof document<"u"){let n=document.createElement("style");n.textContent=j,document.head.appendChild(n)}globalThis.A11yToolkit=globalThis.A11yToolkit||{};globalThis.A11yToolkit.initUxWidget=S;globalThis.A11yToolkit.destroyUxWidget=I;typeof document<"u"&&S();})();
