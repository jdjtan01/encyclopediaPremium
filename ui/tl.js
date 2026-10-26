/* Optional Filipino summaries (Sa madaling salita, off unless turned on in an article's More menu) and How to say it (pronunciation). */
(()=>{const TL=window.TL||{},PR=window.PRON||{};
const voice=lang=>{try{return speechSynthesis.getVoices().find(v=>v.lang&&v.lang.toLowerCase().startsWith(lang))}catch(e){return null}};
const say=(t,lang)=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);const v=voice(lang);if(v)u.voice=v;u.lang=lang=="fil"?"fil-PH":"en-US";u.rate=.9;speechSynthesis.speak(u)}catch(e){}};
const prev=R.art;
R.art=function(id){prev(id);const a=get(id);if(!a)return;
const pr=PR[id];if(pr){const meta=V.querySelector("h2.atitle+p.mu");meta&&meta.insertAdjacentHTML("afterend",`<p class="pron"><b>How to say it</b> <span>${esc(pr)}</span> <button class="lk il" id="prs" title="Hear it spoken">🔊</button></p>`);const b=$("#prs");const fil=a.oc=="Philippines"||((window.LOC||{})[id]||[])[2]=="Philippines"&&a.oc=="People";b&&(b.onclick=()=>say(sortT(a.t).replace(/\s*\(.*\)/,""),fil?"fil":"en"))}
let on=false;try{on=localStorage.getItem("showFil")=="1"}catch(e){}const t=TL[id];if(t&&on){const ld=V.querySelector(".body .lead");ld&&ld.insertAdjacentHTML("afterend",`<aside class="tlbox" lang="fil"><div><small>SA MADALING SALITA</small><button class="lk il" id="tls" title="Pakinggan">🔊 Pakinggan</button></div><p>${esc(t)}</p></aside>`);const b=$("#tls");b&&(b.onclick=()=>say(t,"fil"))}};
})();
