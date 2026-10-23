/* Reference features: links inside the text, How to cite, error reports, the edition page and the footer. */
(()=>{
const ED={n:1,label:"First edition",date:"October 2026",year:2026};window.ED=ED;
const enc=encodeURIComponent;

/* ---------- Links inside the text ---------- */
let LRX=null,LMAP=null;
function buildLinks(){LMAP={};const L=window.LINKS||{},add=(a,id)=>{a=a.trim();if(a.length<2||!get(id))return;const k=/[A-Z]/.test(a[0])?a:a[0].toLowerCase()+a.slice(1);if(!(k in LMAP))LMAP[k]=id};
A.forEach(a=>{add(sortT(a.t),a.id);(L[a.id]||[]).forEach(x=>add(x,a.id))});
(window.SH||[]).forEach(e=>{const t=e.t.replace(/\s*\(.*\)$/,"");if(t.length<4)return;const k=/^[A-Z][a-z]/.test(t)&&!/[A-Z]/.test(t.slice(1))&&!e.proper?t[0].toLowerCase()+t.slice(1):t;if(!(k in LMAP))LMAP[k]="e:"+e.id});
const keys=Object.keys(LMAP).sort((x,y)=>y.length-x.length).map(k=>{const e=k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return /[A-Z]/.test(k[0])?e:`[${k[0].toUpperCase()}${k[0]}]${e.slice(1)}`});
LRX=new RegExp(`(?<![\\p{L}\\p{N}])(?:${keys.join("|")})(?![\\p{L}\\p{N}])`,"gu")}
const lookup=m=>LMAP[m]||LMAP[m[0].toLowerCase()+m.slice(1)];
function linkText(root,self,max){if(!LRX)buildLinks();const used=new Set([self]);let n=0;
root.querySelectorAll(".body>p:not(.lead), .body .spot p, .body .fact li, .body .lead").forEach(el=>{if(n>=max||el.children.length)return;const t=el.textContent;let out="",last=0,m;LRX.lastIndex=0;
while((m=LRX.exec(t))&&n<max){const id=lookup(m[0]);if(!id||used.has(id))continue;used.add(id);n++;const isE=id.startsWith("e:"),tt=isE?(window.SHBY[id.slice(2)]||{}).t:get(id).t;out+=esc(t.slice(last,m.index))+`<a class="xl${isE?" xe":""}" href="#/${isE?"e/"+id.slice(2):"art/"+id}" title="${esc(tt)}">${esc(m[0])}</a>`;last=m.index+m[0].length}
if(last)el.innerHTML=out+esc(t.slice(last))});return n}
window.linkText=linkText;

/* ---------- How to cite ---------- */
const today=()=>new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
const mla=()=>{const d=new Date();return `${d.getDate()} ${["Jan.","Feb.","Mar.","Apr.","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."][d.getMonth()]} ${d.getFullYear()}`};
function cite(a){const u=location.href.split("#")[0]+"#/art/"+a.id,t=a.t;return [
["APA",`${esc(t)}. (${ED.year}). In <i>Encyclopedia Premium</i> (1st ed.). Retrieved ${today()}, from ${esc(u)}`],
["MLA",`“${esc(t)}.” <i>Encyclopedia Premium</i>, 1st ed., ${ED.year}, ${esc(u)}. Accessed ${mla()}.`],
["Chicago",`<i>Encyclopedia Premium</i>, 1st ed., s.v. “${esc(t)},” accessed ${today()}, ${esc(u)}.`]]}

/* ---------- Error reports (kept in this browser so the owner can copy and send them) ---------- */
const RK="reports";const reports=()=>ls(RK,[]);

/* ---------- Article additions ---------- */
const prevArt=R.art;
R.art=function(id){prevArt(id);const a=get(id);if(!a)return;linkText(V,id,18);
const fr=$("#fr");if(fr){fr.insertAdjacentHTML("afterend",`<details class="cite" id="ct"><summary><b class="disp">How to cite this article</b></summary>${cite(a).map((c,i)=>`<div class="cr"><small>${c[0]}</small><p id="c${i}">${c[1]}</p><button class="btn sm" data-c="${i}">Copy</button></div>`).join("")}<p class="mu" style="font:13px system-ui">Encyclopedia Premium, ${ED.label}, ${ED.date}. Check your teacher’s or publisher’s preferred style.</p></details>
<details class="cite" id="rp"><summary><b class="disp">Report an error</b></summary><p style="font:14px system-ui">Spotted a mistake or something out of date? Describe it below. Reports are saved in this browser and listed on the <a href="#/about">About this edition</a> page, where they can be copied and sent to the editor.</p><textarea id="rpt" rows="3" style="width:100%" placeholder="What is wrong, and where did you find the correct information?"></textarea><button class="btn" id="rps">Save report</button><span id="rpm" class="mu" style="font:13px system-ui"></span></details>`);
V.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{const t=$("#c"+b.dataset.c).textContent;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>b.textContent="Copied",()=>{const r=document.createRange();r.selectNodeContents($("#c"+b.dataset.c));getSelection().removeAllRanges();getSelection().addRange(r);b.textContent="Selected; press Ctrl+C"})});
$("#rps").onclick=()=>{const v=$("#rpt").value.trim();if(!v){$("#rpm").textContent=" Please describe the error first.";return}const r=reports();r.unshift({id,t:a.t,m:v,d:new Date().toISOString()});sv(RK,r);$("#rpt").value="";$("#rpm").textContent=" Thank you. Your report has been saved."};
const toc=V.querySelector(".toc");toc&&toc.insertAdjacentHTML("beforeend",`<button class="lk" data-s2="ct">How to cite</button>`);toc&&toc.querySelector("[data-s2]").addEventListener("click",()=>{$("#ct").open=true;$("#ct").scrollIntoView({behavior:"smooth"})})}};

/* ---------- About this edition ---------- */
R.about=function(){window.setCat&&setCat(null);const cats=Object.keys(CAT),r=reports(),words=A.reduce((s,a)=>s+(a.l||"").split(/\s+/).length+a.p.reduce((n,x)=>n+x[1].split(/\s+/).length,0),0),gl=A.reduce((s,a)=>s+(a.g||[]).length,0),dg=Object.keys(window.DIAG||{}).filter(get).length;
V.innerHTML=`<h2>About this edition</h2>
<div class="edbox"><div><small>Edition</small><b>${ED.label}</b></div><div><small>Published</small><b>${ED.date}</b></div><div><small>Articles</small><b>${A.length}</b></div><div><small>A–Z entries</small><b>${(window.SH||[]).length}</b></div><div><small>Sections</small><b>${cats.length}</b></div><div><small>Words</small><b>${Math.round(words/1000)},000</b></div><div><small>Key words</small><b>${gl.toLocaleString()}</b></div><div><small>Diagrams</small><b>${dg}</b></div></div>
<h3>Editorial standards</h3>
<p>Encyclopedia Premium aims to be accurate, clear and fair. Every article follows the same structure, so readers always know where to find a summary, key facts, key dates and key words. Articles are written in plain English for students and general readers, with particular attention to the Philippines.</p>
<p><b>How articles are written and checked.</b> Articles were drafted and fact-checked with the help of Claude, an AI model made by Anthropic, and checked against established reference sources. Numbers are rounded and described as approximate where measurements vary. Where experts disagree, articles say so rather than picking a side. Religious and political topics are described fairly and respectfully.</p>
<p><b>Corrections.</b> Errors can still slip through. Readers can report a problem from the Report an error box at the end of any article. Corrections are made in the next update, and the edition date above changes when the encyclopedia is revised.</p>
<p><b>Facts that change.</b> Figures such as populations, records and office holders change over time. They are correct as of ${ED.date} unless the text says otherwise. Each article lists trusted places to check the latest information under Further reading.</p>
<h3>Pictures and diagrams</h3>
<p>Photographs come from Wikimedia Commons and are shown with credits linking to each file’s page, where the photographer and license are listed. Most are under Creative Commons licenses or are in the public domain. Diagrams, scale drawings, maps and charts were drawn especially for this encyclopedia. Scale drawings are to scale; other diagrams are simplified, as their captions explain.</p>
<h3>Error reports saved in this browser</h3>
${r.length?`<p class="mu" style="font:14px system-ui">${r.length} report${r.length==1?"":"s"}. Copy them and send them to the editor, then clear the list.</p><div class="ixl">${r.map(x=>`<div><a href="#/art/${x.id}">${esc(x.t)}</a> <small>${new Date(x.d).toLocaleDateString()}</small><br><span style="font:14px system-ui">${esc(x.m)}</span></div>`).join("")}</div><button class="btn" id="rcp">Copy all reports</button><button class="btn" id="rcl">Clear the list</button>`:"<p>No reports have been saved in this browser.</p>"}
<h3>Using this encyclopedia</h3><p>See <a href="#/howto">How to use this encyclopedia</a>, the <a href="#/contents">Contents</a>, the <a href="#/index">Index</a> and the <a href="#/gloss">Glossary</a>.</p>`;
if(r.length){$("#rcp").onclick=()=>{const t=r.map(x=>`${x.t} (${x.d.slice(0,10)}): ${x.m}`).join("\n\n");navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>$("#rcp").textContent="Copied")};$("#rcl").onclick=()=>{sv(RK,[]);R.about()}}};

/* ---------- Footer on every page ---------- */
document.body.insertAdjacentHTML("beforeend",`<footer class="foot"><span>Encyclopedia Premium · ${ED.label} · ${ED.date}</span><a href="#/about">About this edition</a><a href="#/howto">How to use</a><a href="#/contents">Contents</a><a href="#/index">Index</a></footer>`);
const nv=$("#nv");nv&&nv.insertAdjacentHTML("beforeend",`<button data-v="about" onclick="go('about')">About</button>`);
})();
