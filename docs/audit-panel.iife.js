var A11yToolkit=(()=>{var F=[{id:"headings",name:"Headings Map",desc:"Show heading hierarchy (H1\u2013H6)",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="m17 12 3-2v8"/></svg>'},{id:"landmarks",name:"Landmarks",desc:"Outline page regions (nav, main, etc.)",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>'},{id:"alt-text",name:"Alt Text",desc:"Check images for alt text",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>'},{id:"labels",name:"Interactive Labels",desc:"Show accessible names of buttons & links",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>'},{id:"hidden",name:"Hidden Elements",desc:"Reveal aria-hidden & visually hidden",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'},{id:"tab-order",name:"Tab Order",desc:"Visualize keyboard tab sequence",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>'},{id:"contrast",name:"Contrast",desc:"Check WCAG color contrast ratios",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor" stroke="none"/></svg>'},{id:"focus",name:"Focus Indicators",desc:"Detect missing focus styles",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>'},{id:"aria",name:"ARIA Validation",desc:"Detect common ARIA mistakes",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'},{id:"forms",name:"Form Labels",desc:"Audit form inputs for labels & ARIA",icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M8 12h8"/><path d="M8 9v6"/></svg>'}],B=!1,S=null,N=null,O=null,L={},M=[];function b(s){let r=document.createElement("div");return r.textContent=s,r.innerHTML}function z(){M.forEach(r=>r.remove()),M=[];let s=["a11y-tester-heading-overlay","a11y-tester-landmark-overlay","a11y-tester-img-overlay","a11y-tester-label-overlay","a11y-tester-hidden-reveal","missing","a11y-tester-taborder-overlay","a11y-tester-contrast-overlay","contrast-fail","a11y-tester-focus-overlay","focus-issue","a11y-tester-aria-overlay","aria-error","a11y-tester-form-overlay","form-error","form-warn"];document.querySelectorAll(s.map(r=>"."+r).join(", ")).forEach(r=>{s.forEach(e=>r.classList.remove(e))})}function w(s,r,e){let a=document.createElement("span");return a.className=e,a.textContent=r,s.style.position=s.style.position||"relative",s.appendChild(a),M.push(a),a}function q(s){if(s.getAttribute("aria-label"))return s.getAttribute("aria-label");let r=s.getAttribute("aria-labelledby");if(r){let i=r.split(/\s+/).map(d=>{let m=document.getElementById(d);return m?m.textContent.trim():""}).filter(Boolean);if(i.length)return i.join(" ")}if(s.id){let i=document.querySelector(`label[for="${s.id}"]`);if(i)return i.textContent.trim()}if(s.title)return s.title;let e=s.textContent.trim();if(e)return e;let a=s.querySelector("img[alt]");return a&&a.alt?a.alt:""}function v(s){return s.closest(".a11y-tester-panel, .a11y-tester-toggle")}function V(){let s=document.querySelectorAll("h1, h2, h3, h4, h5, h6"),r=[],e=0,a=0;s.forEach(d=>{if(v(d))return;let m=parseInt(d.tagName[1]),c=d.textContent.trim()||"(empty)",t=e>0&&m>e+1;t&&a++,d.textContent.trim()||a++,r.push({level:m,text:c,skipped:t,empty:!d.textContent.trim()}),d.classList.add("a11y-tester-heading-overlay"),w(d,d.tagName,"a11y-tester-heading-badge"),e=m});let i="";if(s.length===0||r.length===0)i='<div class="atr-summary fail">No headings found on this page</div>';else{let d=a>0?"warn":"pass",m=a>0?`${r.length} headings, ${a} issue${a>1?"s":""}`:`${r.length} headings \u2014 all good`;i=`<div class="atr-summary ${d}">${m}</div>`,r.forEach(c=>{let t=c.level>1?` atr-indent-${Math.min(c.level-1,5)}`:"",n=c.skipped?" atr-warn":c.empty?" atr-error":"",o=c.skipped?" \u26A0 skipped level":c.empty?" \u26A0 empty":"";i+=`<div class="atr-item${t}"><span class="atr-tag">H${c.level}</span> <span class="atr-text${n}">${b(c.text)}${o}</span></div>`})}return i}function _(){let s={header:"banner",nav:"navigation",main:"main",aside:"complementary",footer:"contentinfo",section:"region",form:"form"},r=["banner","navigation","main","complementary","contentinfo","region","form","search"],e=[];Object.keys(s).forEach(i=>{document.querySelectorAll(i).forEach(d=>{if(v(d))return;let m=d.getAttribute("role")||s[i],c=d.getAttribute("aria-label")||d.getAttribute("aria-labelledby")||"";i==="section"&&!c&&!d.getAttribute("role")||e.push({el:d,role:m,label:c,tag:i})})}),r.forEach(i=>{document.querySelectorAll(`[role="${i}"]`).forEach(d=>{if(v(d)||e.some(c=>c.el===d))return;let m=d.getAttribute("aria-label")||"";e.push({el:d,role:i,label:m,tag:d.tagName.toLowerCase()})})});let a="";if(e.length===0)a='<div class="atr-summary fail">No landmarks found \u2014 page needs semantic structure</div>';else{let i=e.some(c=>c.role==="main"),d=i?"pass":"warn",m=i?`${e.length} landmarks found`:`${e.length} landmarks \u2014 no <main> found`;a=`<div class="atr-summary ${d}">${m}</div>`,e.forEach(c=>{let t=c.label?` "${c.label}"`:"";a+=`<div class="atr-item"><span class="atr-tag">${c.role}</span> <span class="atr-text">&lt;${c.tag}&gt;${b(t)}</span></div>`,c.el.classList.add("a11y-tester-landmark-overlay"),w(c.el,c.role+(c.label?": "+c.label:""),"a11y-tester-landmark-badge")})}return a}function D(){let s=document.querySelectorAll("img");if(s.length===0)return'<div class="atr-summary pass">No images on this page</div>';let r=0,e=0,a=0,i=[];s.forEach(n=>{if(v(n))return;let o=n.getAttribute("alt"),p=n.src.split("/").pop().split("?")[0]||"(inline)",g,y;o===null?(g="error",y="MISSING alt attribute",r++):o===""?(g="ok",y='decorative (alt="")',e++):(g="ok",y=o,a++),i.push({img:n,src:p,status:g,text:y,alt:o}),n.classList.add("a11y-tester-img-overlay"),o===null&&n.classList.add("missing");let l=o===null?"\u26A0 NO ALT":o===""?"decorative":o,u=w(n.parentElement||n,l,"a11y-tester-img-badge");o===null&&u.classList.add("missing")});let d=r+e+a,m=r>0?"fail":"pass",c=r>0?`${d} images \u2014 ${r} missing alt text`:`${d} images \u2014 all have alt text`,t=`<div class="atr-summary ${m}">${c}</div>`;return i.forEach(n=>{let o=n.status==="error"?" atr-error":" atr-ok";t+=`<div class="atr-item"><span class="atr-tag">${b(n.src)}</span><br><span class="${o}">${b(n.text)}</span></div>`}),t}function G(){let s=document.querySelectorAll('a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex]'),r=0,e=0,a=[];if(s.forEach(t=>{if(v(t))return;let n=t.tagName.toLowerCase(),o=t.getAttribute("role")||n,p=q(t);e++,p?a.push({el:t,role:o,name:p,hasName:!0}):(r++,a.push({el:t,role:o,name:"(no accessible name)",hasName:!1})),t.classList.add("a11y-tester-label-overlay");let g=w(t,p||"\u26A0 NO NAME","a11y-tester-label-badge");p||g.classList.add("missing")}),e===0)return'<div class="atr-summary pass">No interactive elements found</div>';let i=r>0?"fail":"pass",d=r>0?`${e} interactive elements \u2014 ${r} missing names`:`${e} interactive elements \u2014 all labeled`,m=`<div class="atr-summary ${i}">${d}</div>`;return[...a.filter(t=>!t.hasName),...a.filter(t=>t.hasName)].forEach(t=>{let n=t.hasName?"atr-ok":"atr-error";m+=`<div class="atr-item"><span class="atr-tag">${t.role}</span> <span class="${n}">${b(t.name)}</span></div>`}),m}function P(){let s=[];if(document.querySelectorAll('[aria-hidden="true"]').forEach(e=>{v(e)||e.tagName==="SVG"||e.tagName==="I"||s.push({el:e,reason:'aria-hidden="true"',tag:e.tagName.toLowerCase()})}),document.querySelectorAll('.sr-only, .visually-hidden, [class*="screen-reader"]').forEach(e=>{v(e)||s.some(a=>a.el===e)||s.push({el:e,reason:"visually hidden (sr-only)",tag:e.tagName.toLowerCase()})}),s.length===0)return'<div class="atr-summary pass">No hidden elements with content found</div>';let r=`<div class="atr-summary warn">${s.length} hidden elements found</div>`;return s.forEach(e=>{let a=e.el.textContent.trim().slice(0,80);r+=`<div class="atr-item"><span class="atr-tag">&lt;${e.tag}&gt;</span> <span class="atr-warn">${b(e.reason)}</span><br><span class="atr-text">${b(a)}${a.length>=80?"...":""}</span></div>`,e.el.classList.add("a11y-tester-hidden-reveal"),w(e.el,e.reason,"a11y-tester-hidden-badge")}),r}function U(){let e=Array.from(document.querySelectorAll("a[href], button, input, select, textarea, [tabindex]")).filter(o=>{if(v(o))return!1;let p=o.getAttribute("tabindex");return!(p!==null&&parseInt(p)<0)}),a=e.filter(o=>{let p=o.getAttribute("tabindex");return p!==null&&parseInt(p)>0}).sort((o,p)=>parseInt(o.getAttribute("tabindex"))-parseInt(p.getAttribute("tabindex"))),i=e.filter(o=>{let p=o.getAttribute("tabindex");return p===null||parseInt(p)===0}),d=[...a,...i],m=a.length>0;if(d.length===0)return'<div class="atr-summary fail">No focusable elements found on this page</div>';let c=m?"warn":"pass",t=m?`${d.length} focusable elements \u2014 tabindex > 0 detected (anti-pattern)`:`${d.length} focusable elements in tab order`,n=`<div class="atr-summary ${c}">${t}</div>`;return d.forEach((o,p)=>{let g=p+1,y=o.tagName.toLowerCase(),l=q(o)||o.getAttribute("placeholder")||o.getAttribute("title")||"(no label)",u=o.getAttribute("tabindex"),f=u!==null&&parseInt(u)>0;o.classList.add("a11y-tester-taborder-overlay"),w(o,String(g),"a11y-tester-taborder-badge");let h=f?` <span class="atr-warn">\u26A0 tabindex=${b(u)}</span>`:"";n+=`<div class="atr-item"><span class="atr-tag">${g}. &lt;${b(y)}&gt;</span> <span class="atr-text">${b(l)}</span>${h}</div>`}),m&&(n+='<div class="atr-item"><span class="atr-warn">\u26A0 Avoid tabindex > 0 \u2014 it disrupts the natural reading order for keyboard users</span></div>'),n}function Y(){function s(l){let u=l.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);return u?{r:parseInt(u[1]),g:parseInt(u[2]),b:parseInt(u[3]),a:u[4]!==void 0?parseFloat(u[4]):1}:null}function r(l){let u=l/255;return u<=.03928?u/12.92:Math.pow((u+.055)/1.055,2.4)}function e(l,u,f){return .2126*r(l)+.7152*r(u)+.0722*r(f)}function a(l,u){let f=e(l.r,l.g,l.b),h=e(u.r,u.g,u.b),A=Math.max(f,h),C=Math.min(f,h);return(A+.05)/(C+.05)}function i(l){let u=l;for(;u&&u.nodeType===1;){let f=getComputedStyle(u).backgroundColor;if(f&&f!=="transparent"&&f!=="rgba(0, 0, 0, 0)"){let h=s(f);if(h&&h.a>0)return h}u=u.parentElement}return{r:255,g:255,b:255,a:1}}let m=Array.from(document.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, a, button, li, td, th, label"));document.querySelectorAll("div").forEach(l=>{Array.from(l.childNodes).some(f=>f.nodeType===3&&f.textContent.trim().length>0)&&m.push(l)});let c=0,t=0,n=[];m.forEach(l=>{if(v(l)||!l.textContent.trim())return;let u=getComputedStyle(l),f=s(u.color);if(!f)return;let h=i(l),A=a(f,h),C=A.toFixed(2),E=parseFloat(u.fontSize),$=u.fontWeight,R=parseInt($)>=700||$==="bold"||$==="bolder",T=E>=18||E>=14&&R,x=T?3:4.5,k=T?4.5:7,I;A>=k?(I="AAA",c++):A>=x?(I="AA",c++):(I="FAIL",t++,n.push({el:l,ratioStr:C,tag:l.tagName.toLowerCase()})),l.classList.add("a11y-tester-contrast-overlay"),I==="FAIL"&&l.classList.add("contrast-fail");let W=w(l,C+":1","a11y-tester-contrast-badge");I==="FAIL"&&W.classList.add("fail")});let o=c+t;if(o===0)return'<div class="atr-summary pass">No text elements found to check</div>';let p=t>0?"fail":"pass",g=t>0?`${o} elements checked \u2014 ${t} failing WCAG AA contrast`:`${o} elements checked \u2014 all pass WCAG AA contrast`,y=`<div class="atr-summary ${p}">${g}</div>`;return n.length>0?n.forEach(l=>{let u=l.el.textContent.trim().slice(0,60);y+=`<div class="atr-item"><span class="atr-tag">&lt;${b(l.tag)}&gt;</span> <span class="atr-error">${b(l.ratioStr)}:1 \u2014 FAIL</span><br><span class="atr-text">${b(u)}${u.length>=60?"\u2026":""}</span></div>`}):y+='<div class="atr-item"><span class="atr-ok">\u2713 All text elements pass WCAG AA requirements</span></div>',y}function Q(){let r=Array.from(document.querySelectorAll("a[href], button, input, select, textarea, [tabindex]")).filter(t=>{if(v(t))return!1;let n=t.getAttribute("tabindex");return n===null||parseInt(n)>=0});if(r.length===0)return'<div class="atr-summary pass">No focusable elements found</div>';let e=0,a=[];r.forEach(t=>{let n=getComputedStyle(t),o=n.outlineStyle,p=parseFloat(n.outlineWidth)||0,g=o==="none"||p===0,y=n.boxShadow&&n.boxShadow!=="none",l=g&&!y;l&&e++;let u=q(t)||t.getAttribute("placeholder")||t.getAttribute("title")||"(unnamed)";a.push({el:t,flagged:l,tag:t.tagName.toLowerCase(),name:u}),t.classList.add("a11y-tester-focus-overlay"),l&&t.classList.add("focus-issue");let f=w(t,l?"\u26A0 focus?":"\u2713 outline","a11y-tester-focus-badge");l&&f.classList.add("issue")});let i=e>0?"warn":"pass",d=e>0?`${r.length} focusable elements \u2014 ${e} may lack visible focus indicators`:`${r.length} focusable elements \u2014 focus styles detected`,m=`<div class="atr-summary ${i}">${d}</div>`;return m+='<div class="atr-item"><span class="atr-text">\u{1F4A1} Tab through the page to visually verify each focus indicator</span></div>',[...a.filter(t=>t.flagged),...a.filter(t=>!t.flagged)].forEach(t=>{let n=t.flagged?"atr-warn":"atr-ok",o=t.flagged?"\u26A0 outline:none \u2014 verify custom :focus style exists":"\u2713 has outline";m+=`<div class="atr-item"><span class="atr-tag">&lt;${b(t.tag)}&gt;</span> <span class="atr-text">${b(t.name)}</span><br><span class="${n}">${o}</span></div>`}),m}function K(){let s=new Set(["alert","alertdialog","application","article","banner","button","cell","checkbox","columnheader","combobox","complementary","contentinfo","definition","dialog","directory","document","feed","figure","form","grid","gridcell","group","heading","img","link","list","listbox","listitem","log","main","marquee","math","menu","menubar","menuitem","menuitemcheckbox","menuitemradio","navigation","none","note","option","presentation","progressbar","radio","radiogroup","region","row","rowgroup","rowheader","scrollbar","search","searchbox","separator","slider","spinbutton","status","switch","tab","table","tablist","tabpanel","term","textbox","timer","toolbar","tooltip","tree","treegrid","treeitem"]),r={button:"button",a:"link",nav:"navigation",main:"main",header:"banner",footer:"contentinfo",article:"article",aside:"complementary"},e=[];if(document.querySelectorAll("[role], [aria-labelledby], [aria-describedby], [aria-hidden], [aria-expanded], [aria-controls]").forEach(n=>{if(v(n))return;let o=n.getAttribute("role"),p=n.tagName.toLowerCase();o==="button"&&p!=="button"&&p!=="input"&&p!=="a"&&n.getAttribute("tabindex")===null&&e.push({el:n,severity:"error",msg:`role="button" on <${p}> without tabindex \u2014 not keyboard accessible`});let g=n.getAttribute("aria-labelledby");g&&g.split(/\s+/).forEach(l=>{l&&!document.getElementById(l)&&e.push({el:n,severity:"error",msg:`aria-labelledby references missing ID: "${l}"`})});let y=n.getAttribute("aria-describedby");if(y&&y.split(/\s+/).forEach(l=>{l&&!document.getElementById(l)&&e.push({el:n,severity:"error",msg:`aria-describedby references missing ID: "${l}"`})}),n.getAttribute("aria-hidden")==="true"&&(n.matches("a[href], button, input, select, textarea")||n.hasAttribute("tabindex")&&parseInt(n.getAttribute("tabindex"))>=0)&&e.push({el:n,severity:"error",msg:`aria-hidden="true" on focusable <${p}> \u2014 creates keyboard trap`}),o&&!s.has(o)&&e.push({el:n,severity:"error",msg:`Invalid ARIA role: "${o}"`}),n.hasAttribute("aria-expanded")){let l=n.getAttribute("aria-controls");(!l||!document.getElementById(l))&&e.push({el:n,severity:"warn",msg:"aria-expanded set but aria-controls target not found"})}o&&r[p]===o&&e.push({el:n,severity:"warn",msg:`Redundant: role="${o}" is implicit on <${p}>`})}),e.length===0)return'<div class="atr-summary pass">No ARIA issues detected</div>';let i=e.filter(n=>n.severity==="error"),d=e.filter(n=>n.severity==="warn"),m=i.length>0?"fail":"warn",c=`${e.length} ARIA issue${e.length!==1?"s":""} \u2014 ${i.length} error${i.length!==1?"s":""}, ${d.length} warning${d.length!==1?"s":""}`,t=`<div class="atr-summary ${m}">${c}</div>`;return[...i,...d].forEach(n=>{let o=n.el.tagName.toLowerCase();n.el.classList.add("a11y-tester-aria-overlay"),n.severity==="error"&&n.el.classList.add("aria-error");let p=w(n.el,n.severity==="error"?"\u26A0 ARIA":"\u24D8 ARIA","a11y-tester-aria-badge");n.severity==="error"&&p.classList.add("error");let g=n.severity==="error"?"atr-error":"atr-warn";t+=`<div class="atr-item"><span class="atr-tag">&lt;${b(o)}&gt;</span><br><span class="${g}">${b(n.msg)}</span></div>`}),t}function X(){let s=Array.from(document.querySelectorAll("input, select, textarea")),r=[],e=0,a=0;if(s.forEach(t=>{if(v(t)||t.type==="hidden")return;let n=t.tagName.toLowerCase(),o=(t.type||"").toLowerCase(),p=[],g=!!t.getAttribute("aria-label"),y=t.getAttribute("aria-labelledby"),l=!!(y&&document.getElementById(y)),u=!!(t.id&&document.querySelector(`label[for="${t.id}"]`)),f=!!t.closest("label"),h=g||l||u||f,A=!!t.getAttribute("placeholder");if(h||(A?(p.push({type:"warn",msg:"Placeholder used as label \u2014 disappears when filled, not read by all screen readers"}),e++):(p.push({type:"error",msg:"No accessible label (no aria-label, aria-labelledby, or <label>)"}),e++,a++)),!t.hasAttribute("autocomplete")){let x=(t.name||t.id||t.getAttribute("placeholder")||"").toLowerCase(),k=null;o==="email"||x.includes("email")?k="email":x.match(/\bname\b/)&&!x.includes("user")?k="name":o==="tel"||x.includes("phone")||x.includes("tel")?k="tel":(x.includes("zip")||x.includes("postal"))&&(k="postal-code"),k&&p.push({type:"warn",msg:`Missing autocomplete \u2014 consider autocomplete="${k}"`})}let C=t.hasAttribute("required")||t.getAttribute("aria-required")==="true";r.push({el:t,tag:n,inputType:o,hasLabel:h,isRequired:C,inputIssues:p});let E=p.some(x=>x.type==="error"),$=p.some(x=>x.type==="warn");t.classList.add("a11y-tester-form-overlay"),E?t.classList.add("form-error"):$&&t.classList.add("form-warn");let T=w(t,E?"\u26A0 no label":$?"\u24D8 warn":"\u2713 ok","a11y-tester-form-badge");E?T.classList.add("error"):$&&T.classList.add("warn")}),r.length===0)return'<div class="atr-summary pass">No form inputs found on this page</div>';let i=a>0?"fail":e>0?"warn":"pass",d=e>0?`${r.length} inputs \u2014 ${a>0?a+" unlabeled":""}${a>0&&e>a?", ":""}${e>a?e-a+" warning"+(e-a!==1?"s":""):""}`:`${r.length} inputs \u2014 all properly labeled`,m=`<div class="atr-summary ${i}">${d}</div>`;return[...r.filter(t=>t.inputIssues.some(n=>n.type==="error")),...r.filter(t=>t.inputIssues.some(n=>n.type==="warn")&&!t.inputIssues.some(n=>n.type==="error")),...r.filter(t=>t.inputIssues.length===0)].forEach(t=>{let n=q(t.el)||t.el.getAttribute("placeholder")||t.el.name||"(unnamed)",o=t.inputType?` type="${b(t.inputType)}"`:"",p=t.isRequired?' <span class="atr-warn">required</span>':"";m+=`<div class="atr-item"><span class="atr-tag">&lt;${b(t.tag)}${o}&gt;</span>${p} <span class="atr-text">${b(n)}</span>`,t.inputIssues.forEach(g=>{let y=g.type==="error"?"atr-error":"atr-warn";m+=`<br><span class="${y}">${b(g.msg)}</span>`}),t.inputIssues.length===0&&(m+='<br><span class="atr-ok">\u2713 properly labeled</span>'),m+="</div>"}),m}var Z={headings:V,landmarks:_,"alt-text":D,labels:G,hidden:P,"tab-order":U,contrast:Y,focus:Q,aria:K,forms:X};function tt(s){let r=s||document.body,e=document.createElement("button");e.className="a11y-tester-toggle",e.setAttribute("aria-label","Toggle accessibility tester"),e.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>',r.appendChild(e);let a=document.createElement("div");a.className="a11y-tester-panel",a.innerHTML=`
    <div class="a11y-tester-header">
      <div class="a11y-tester-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
        A11y Audit
      </div>
      <button class="a11y-tester-close" aria-label="Close tester panel">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="a11y-tester-tools">
      ${F.map(i=>`
        <button class="a11y-tester-tool" data-tool="${i.id}">
          ${i.icon}
          <div class="a11y-tester-tool-info">
            <div class="a11y-tester-tool-name">${i.name}</div>
            <div class="a11y-tester-tool-desc">${i.desc}</div>
          </div>
        </button>
      `).join("")}
    </div>
    <div class="a11y-tester-results"></div>
  `,r.appendChild(a),S=e,N=a,O=r,e.addEventListener("click",()=>{a.classList.toggle("open")}),a.querySelector(".a11y-tester-close").addEventListener("click",()=>{a.classList.remove("open"),Object.keys(L).forEach(i=>{L[i]=!1}),z(),a.querySelectorAll(".a11y-tester-tool").forEach(i=>i.classList.remove("active")),a.querySelector(".a11y-tester-results").classList.remove("show")}),a.querySelectorAll(".a11y-tester-tool").forEach(i=>{i.addEventListener("click",()=>{let d=i.dataset.tool,m=i.classList.contains("active");Object.keys(L).forEach(t=>{L[t]=!1}),z(),a.querySelectorAll(".a11y-tester-tool").forEach(t=>t.classList.remove("active"));let c=a.querySelector(".a11y-tester-results");if(m)c.classList.remove("show"),c.innerHTML="";else{L[d]=!0,i.classList.add("active");let t=Z[d];if(t){let n=t();c.innerHTML=`<div class="a11y-tester-results-title">${F.find(o=>o.id===d).name}</div>${n}`,c.classList.add("show")}}})})}function j(s={}){B||(B=!0,L={},M=[],tt(s.container||null))}function H(){B&&(z(),S&&S.remove(),N&&N.remove(),S=null,N=null,O=null,L={},M=[],B=!1)}var J=`/* ============================================================
   A11y Tester \u2014 Accessibility Testing Toolkit for QAs
   A floating panel with tools to inspect headings, landmarks,
   alt text, labels, and hidden elements on any page.
   ============================================================ */

/* --- Toggle Button (bottom-left, separate from a11y widget) --- */
.a11y-tester-toggle {
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #5de4d4;
  color: #0b0e11;
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
.a11y-tester-toggle:hover {
  filter: brightness(1.12);
  transform: scale(1.06);
  box-shadow:
    0 6px 22px rgba(93, 228, 212, 0.50),
    0 2px 8px rgba(0, 0, 0, 0.55);
}
.a11y-tester-toggle:focus-visible {
  outline: 2px solid #5de4d4;
  outline-offset: 3px;
}
.a11y-tester-toggle:active {
  transform: scale(0.97);
}
.a11y-tester-toggle svg { width: 26px; height: 26px; display: block; flex-shrink: 0; }

/* --- Panel --- */
.a11y-tester-panel {
  position: fixed;
  bottom: 80px;
  left: 24px;
  width: 280px;
  max-height: calc(100vh - 120px);
  background: #13171c;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.65),
    0 2px 8px rgba(0, 0, 0, 0.4);
  flex-direction: column;
  overflow: hidden;
  font-family: 'Inter', system-ui, sans-serif;
  color: #e8eaed;

  /* Closed state \u2014 matches widget animation */
  opacity: 0;
  transform: translateY(10px) scale(0.97);
  pointer-events: none;
  transition:
    opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
}
.a11y-tester-panel.open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.a11y-tester-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  gap: 8px;
  flex-shrink: 0;
}
.a11y-tester-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #e8eaed;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1;
}
.a11y-tester-title svg { width: 15px; height: 15px; color: #5de4d4; flex-shrink: 0; }
.a11y-tester-close {
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
  transition: all 0.15s ease;
}
.a11y-tester-close:hover { color: #e8eaed; background: rgba(255,255,255,0.10); }
.a11y-tester-close svg { width: 14px; height: 14px; }

/* --- Tool Buttons --- */
.a11y-tester-tools {
  padding: 8px;
  overflow-y: auto;
}
.a11y-tester-tool {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: none;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #b0b0b0;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
}
.a11y-tester-tool:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #e0e0e0;
}
.a11y-tester-tool.active {
  background: rgba(93, 228, 212, 0.08);
  border-color: rgba(93, 228, 212, 0.2);
  color: #5de4d4;
}
.a11y-tester-tool svg { width: 16px; height: 16px; flex-shrink: 0; }
.a11y-tester-tool-info {
  flex: 1;
}
.a11y-tester-tool-name {
  font-weight: 500;
}
.a11y-tester-tool-desc {
  font-size: 11px;
  color: #666;
  margin-top: 2px;
}
.a11y-tester-tool.active .a11y-tester-tool-desc { color: rgba(93, 228, 212, 0.5); }

/* --- Results panel (below tools) --- */
.a11y-tester-results {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 12px;
  max-height: 300px;
  overflow-y: auto;
  font-size: 12px;
  line-height: 1.5;
  color: #b0b0b0;
  display: none;
}
.a11y-tester-results.show { display: block; }

.a11y-tester-results-title {
  font-size: 11px;
  font-weight: 600;
  color: #5de4d4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

/* Result items */
.atr-item {
  padding: 6px 8px;
  border-radius: 4px;
  margin-bottom: 4px;
  background: rgba(255, 255, 255, 0.03);
}
.atr-item:hover { background: rgba(255, 255, 255, 0.06); }
.atr-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  color: #5de4d4;
}
.atr-text {
  color: #d0d0d0;
  margin-left: 4px;
}
.atr-warn {
  color: #e0a458;
}
.atr-error {
  color: #e06c75;
}
.atr-ok {
  color: #5de4d4;
}
.atr-indent { padding-left: 12px; }
.atr-indent-2 { padding-left: 24px; }
.atr-indent-3 { padding-left: 36px; }
.atr-indent-4 { padding-left: 48px; }
.atr-indent-5 { padding-left: 60px; }

.atr-summary {
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 12px;
}
.atr-summary.pass { background: rgba(93, 228, 212, 0.08); color: #5de4d4; }
.atr-summary.warn { background: rgba(224, 164, 88, 0.08); color: #e0a458; }
.atr-summary.fail { background: rgba(224, 108, 117, 0.08); color: #e06c75; }

/* --- On-page overlays --- */

/* Headings overlay */
.a11y-tester-heading-overlay {
  outline: 2px solid #e06c75 !important;
  outline-offset: 2px !important;
  position: relative !important;
}
.a11y-tester-heading-badge {
  position: absolute !important;
  top: -2px !important;
  left: -2px !important;
  background: #e06c75 !important;
  color: #fff !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  font-family: 'JetBrains Mono', monospace !important;
  padding: 1px 5px !important;
  border-radius: 3px !important;
  line-height: 1.4 !important;
  pointer-events: none !important;
}

/* Landmarks overlay */
.a11y-tester-landmark-overlay {
  outline: 2px dashed #60a5fa !important;
  outline-offset: 2px !important;
  position: relative !important;
}
.a11y-tester-landmark-badge {
  position: absolute !important;
  top: -2px !important;
  left: -2px !important;
  background: #60a5fa !important;
  color: #fff !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  font-family: 'JetBrains Mono', monospace !important;
  padding: 1px 5px !important;
  border-radius: 3px !important;
  line-height: 1.4 !important;
  pointer-events: none !important;
}

/* Alt text overlay */
.a11y-tester-img-overlay {
  outline: 2px solid #5de4d4 !important;
  outline-offset: 2px !important;
  position: relative !important;
}
.a11y-tester-img-overlay.missing {
  outline-color: #e06c75 !important;
}
.a11y-tester-img-badge {
  position: absolute !important;
  bottom: -2px !important;
  left: -2px !important;
  background: #0d1117 !important;
  color: #5de4d4 !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  font-family: 'JetBrains Mono', monospace !important;
  padding: 2px 6px !important;
  border-radius: 3px !important;
  border: 1px solid rgba(93, 228, 212, 0.3) !important;
  line-height: 1.4 !important;
  max-width: 250px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  pointer-events: none !important;
}
.a11y-tester-img-badge.missing {
  color: #e06c75 !important;
  border-color: rgba(224, 108, 117, 0.3) !important;
}

/* Labels overlay */
.a11y-tester-label-overlay {
  outline: 2px solid #c084fc !important;
  outline-offset: 1px !important;
  position: relative !important;
}
.a11y-tester-label-badge {
  position: absolute !important;
  top: -2px !important;
  right: -2px !important;
  background: #0d1117 !important;
  color: #c084fc !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  font-family: 'JetBrains Mono', monospace !important;
  padding: 2px 6px !important;
  border-radius: 3px !important;
  border: 1px solid rgba(192, 132, 252, 0.3) !important;
  line-height: 1.4 !important;
  max-width: 200px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  pointer-events: none !important;
}
.a11y-tester-label-badge.missing {
  color: #e06c75 !important;
  border-color: rgba(224, 108, 117, 0.3) !important;
}

/* Hidden elements reveal */
.a11y-tester-hidden-reveal {
  display: block !important;
  visibility: visible !important;
  opacity: 0.6 !important;
  outline: 2px dashed #e0a458 !important;
  outline-offset: 2px !important;
  position: relative !important;
}
.a11y-tester-hidden-badge {
  position: absolute !important;
  top: -2px !important;
  left: -2px !important;
  background: #e0a458 !important;
  color: #0d1117 !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  font-family: 'JetBrains Mono', monospace !important;
  padding: 1px 5px !important;
  border-radius: 3px !important;
  line-height: 1.4 !important;
  pointer-events: none !important;
}

/* Tab Order overlay (#34d399 green) */
.a11y-tester-taborder-overlay {
  outline: 2px solid #34d399 !important;
  outline-offset: 2px !important;
  position: relative !important;
}
.a11y-tester-taborder-badge {
  position: absolute !important;
  top: -10px !important;
  left: -2px !important;
  background: #34d399 !important;
  color: #0d1117 !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  font-family: 'JetBrains Mono', monospace !important;
  min-width: 18px !important;
  height: 18px !important;
  padding: 0 4px !important;
  border-radius: 9px !important;
  line-height: 18px !important;
  text-align: center !important;
  pointer-events: none !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4) !important;
}

/* Contrast overlay */
.a11y-tester-contrast-overlay {
  outline: 2px solid #34d399 !important;
  outline-offset: 1px !important;
  position: relative !important;
}
.a11y-tester-contrast-overlay.contrast-fail {
  outline-color: #e06c75 !important;
}
.a11y-tester-contrast-badge {
  position: absolute !important;
  bottom: -2px !important;
  right: -2px !important;
  background: #0d1117 !important;
  color: #34d399 !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  font-family: 'JetBrains Mono', monospace !important;
  padding: 1px 5px !important;
  border-radius: 3px !important;
  border: 1px solid rgba(52, 211, 153, 0.3) !important;
  line-height: 1.4 !important;
  pointer-events: none !important;
}
.a11y-tester-contrast-badge.fail {
  color: #e06c75 !important;
  border-color: rgba(224, 108, 117, 0.3) !important;
}

/* Focus overlay (#f59e0b orange) */
.a11y-tester-focus-overlay {
  outline: 2px solid #f59e0b !important;
  outline-offset: 2px !important;
  position: relative !important;
}
.a11y-tester-focus-overlay.focus-issue {
  outline-style: dashed !important;
  outline-color: #e06c75 !important;
}
.a11y-tester-focus-badge {
  position: absolute !important;
  top: -2px !important;
  left: -2px !important;
  background: #0d1117 !important;
  color: #f59e0b !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  font-family: 'JetBrains Mono', monospace !important;
  padding: 1px 5px !important;
  border-radius: 3px !important;
  border: 1px solid rgba(245, 158, 11, 0.3) !important;
  line-height: 1.4 !important;
  pointer-events: none !important;
}
.a11y-tester-focus-badge.issue {
  color: #e06c75 !important;
  border-color: rgba(224, 108, 117, 0.3) !important;
}

/* ARIA overlay (#f472b6 pink) */
.a11y-tester-aria-overlay {
  outline: 2px dashed #f472b6 !important;
  outline-offset: 2px !important;
  position: relative !important;
}
.a11y-tester-aria-overlay.aria-error {
  outline-style: solid !important;
  outline-color: #e06c75 !important;
}
.a11y-tester-aria-badge {
  position: absolute !important;
  top: -2px !important;
  right: -2px !important;
  background: #0d1117 !important;
  color: #f472b6 !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  font-family: 'JetBrains Mono', monospace !important;
  padding: 1px 5px !important;
  border-radius: 3px !important;
  border: 1px solid rgba(244, 114, 182, 0.3) !important;
  line-height: 1.4 !important;
  pointer-events: none !important;
}
.a11y-tester-aria-badge.error {
  color: #e06c75 !important;
  border-color: rgba(224, 108, 117, 0.3) !important;
}

/* Forms overlay (#22d3ee cyan) */
.a11y-tester-form-overlay {
  outline: 2px solid #22d3ee !important;
  outline-offset: 2px !important;
  position: relative !important;
}
.a11y-tester-form-overlay.form-error {
  outline-color: #e06c75 !important;
}
.a11y-tester-form-overlay.form-warn {
  outline-color: #e0a458 !important;
}
.a11y-tester-form-badge {
  position: absolute !important;
  top: -2px !important;
  left: -2px !important;
  background: #0d1117 !important;
  color: #22d3ee !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  font-family: 'JetBrains Mono', monospace !important;
  padding: 1px 5px !important;
  border-radius: 3px !important;
  border: 1px solid rgba(34, 211, 238, 0.3) !important;
  line-height: 1.4 !important;
  pointer-events: none !important;
}
.a11y-tester-form-badge.error {
  color: #e06c75 !important;
  border-color: rgba(224, 108, 117, 0.3) !important;
}
.a11y-tester-form-badge.warn {
  color: #e0a458 !important;
  border-color: rgba(224, 164, 88, 0.3) !important;
}

/* Scrollbar for results */
.a11y-tester-results::-webkit-scrollbar { width: 4px; }
.a11y-tester-results::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

/* --- Mobile: keep panel in viewport --- */
@media (max-width: 480px) {
  .a11y-tester-panel {
    left: 8px;
    right: 8px;
    bottom: 74px;
    width: auto;
    max-height: 60vh;
  }
  .a11y-tester-results {
    max-height: 150px;
  }
}
`;if(typeof document<"u"){let s=document.createElement("style");s.textContent=J,document.head.appendChild(s)}globalThis.A11yToolkit=globalThis.A11yToolkit||{};globalThis.A11yToolkit.initA11yAudit=j;globalThis.A11yToolkit.destroyA11yAudit=H;typeof document<"u"&&j();})();
