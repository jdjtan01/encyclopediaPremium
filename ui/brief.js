/* "In brief": gathers an article's three opening points into one summary box under the lead.
   Short opening points (one-liners) move into the box and keep their section ids, so the contents
   list, search results and links still jump to them. Long opening sections (mostly biographies) stay
   where they are, and the box shows the first sentence of each with a link to the full section. */
(()=>{
const words=s=>String(s||"").split(/\s+/).filter(Boolean).length;
const first=s=>{const m=String(s).match(/^.*?[.!?](?=\s+[A-Z“"(]|$)/);return m?m[0]:String(s)};
const prev=R.art;
R.art=function(id){prev(id);const a=get(id);if(!a||!a.p||a.p.length<6)return;
const body=V.querySelector(".body");if(!body||body.querySelector(".brief"))return;
const H=[0,1,2].map(i=>body.querySelector("h3#s"+i));if(H.some(h=>!h))return;
const P=H.map(h=>{const n=h.nextElementSibling;return n&&n.tagName=="P"?n:null});if(P.some(p=>!p))return;
const short=a.p.slice(0,3).every(x=>words(x[1])<=40);
const items=a.p.slice(0,3).map((x,i)=>short
 ?`<li id="s${i}"><b>${esc(x[0])}.</b> ${esc(x[1])}</li>`
 :`<li><b>${esc(x[0])}.</b> ${esc(first(x[1]))} <button class="lk more" data-b="${i}">Read more</button></li>`).join("");
const html=`<section class="brief" aria-label="In brief"><div class="bh">In brief</div><ul>${items}</ul></section>`;
const ld=body.querySelector(".lead");
if(short){H.forEach(h=>h.remove());P.forEach(p=>p.remove())}
if(ld)ld.insertAdjacentHTML("afterend",html);else body.insertAdjacentHTML("afterbegin",html);
body.querySelectorAll(".brief [data-b]").forEach(b=>b.onclick=()=>{const t=document.getElementById("s"+b.dataset.b);t&&t.scrollIntoView({behavior:"smooth",block:"start"})})};
})();
