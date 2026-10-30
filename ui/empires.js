/* Empire maps: the approximate greatest extent of an empire, shown by shading today's countries (data in data/empires.js). */
(()=>{
const EMP=window.EMPIRES||{},WORLD=window.WORLD||[];
function empSVG(e){const[lon,lat,span]=e.v,cx=lon+180,cy=90-lat,w=span,h=span*.6;const x0=cx-w/2,y0=Math.min(Math.max(cy-h/2,0),180-h),sw=w/500;
const F=new Set(e.f),P=new Set(e.p);
const paths=WORLD.map(c=>`<path d="${c[1]}"${F.has(c[0])?' class="ef"':P.has(c[0])?' class="ep"':""}><title>${esc(c[0])}${F.has(c[0])?": mostly within the empire":P.has(c[0])?": partly within the empire":""}</title></path>`).join("");
const st=Math.max(w/160,.25);
return `<svg viewBox="${x0} ${y0} ${w} ${h}" class="empsvg" role="img" aria-label="${esc(e.t)}"><defs><pattern id="epat" patternUnits="userSpaceOnUse" width="${st*2.4}" height="${st*2.4}" patternTransform="rotate(45)"><rect width="${st*2.4}" height="${st*2.4}" class="epbg"/><line x1="0" y1="0" x2="0" y2="${st*2.4}" class="epln" stroke-width="${st*1.1}"/></pattern></defs><rect x="${x0}" y="${y0}" width="${w}" height="${h}" class="sea"/><g class="land" stroke-width="${sw}">${paths}</g></svg>`}
function empHTML(e){return `<section class="panelx empm" id="empire"><div class="hd">${esc(e.t)}<span>Map</span></div><div class="in">${empSVG(e)}
<div class="emleg"><span><i class="sw f"></i>Mostly within the empire</span><span><i class="sw p"></i>Partly within the empire</span></div>
<p class="cap">${esc(e.n)} Shading uses today’s borders as a rough guide, because ancient frontiers did not follow them.</p>
<details class="tbl"><summary>List the modern countries shown</summary><p><b>Mostly within:</b> ${e.f.map(esc).join(", ")}.</p><p><b>Partly within:</b> ${e.p.map(esc).join(", ")}.</p></details></div></section>`}
window.empHTML=empHTML;
const prev=R.art;
R.art=function(id){prev(id);const e=EMP[id];if(!e||!get(id))return;const h=document.getElementById("s4")||document.getElementById("s3");if(h)h.insertAdjacentHTML("beforebegin",empHTML(e))};
})();
