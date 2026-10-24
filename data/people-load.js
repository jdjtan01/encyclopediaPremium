// Turns the PEOPLE biographies into regular articles in the People section.
// Each biography: 10 sections (4 overview, 3 in-depth, 3 more), born/died/nationality/known-for, key dates,
// a Spotlight, key words and facts. The portrait is the lead image of the Wikipedia page named in w.
(()=>{window.MORE=window.MORE||[];window.DEEP=window.DEEP||{};window.DEEP2=window.DEEP2||{};window.WIKI=window.WIKI||{};
(window.PEOPLE||[]).forEach(b=>{
window.MORE.push({id:b.id,t:b.t,c:"People",i:b.i,p:b.s.slice(0,4),r:b.r||[],bio:1});
window.DEEP[b.id]={l:b.l,k:[["Born",b.born],["Died",b.died],["Nationality",b.nat],["Known for",b.known]].filter(x=>x[1]),d:b.d,s:b.s.slice(4,7)};
window.DEEP2[b.id]={s:b.s.slice(7),sp:b.sp,g:b.g,f:b.f};
if(b.w)window.WIKI[b.id]=b.w;
(window.LINKS=window.LINKS||{})[b.id]=b.a||[];});
})();
