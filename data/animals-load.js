// Loader for the Animal Kingdom articles in data/animals1.js to animals5.js.
// Each article object: id, t (title), i (icon), w (Wikipedia page for the photo), r (related ids),
// p (three short opening sections), l (lead), s (four sections), k (key facts), d (key dates),
// s2 (six in-depth sections), sp (Spotlight), g (key words), f (Did you know facts), fun (fact of the day),
// tl (Filipino summary) and cons (IUCN status, optional).
window.ADDART=a=>{const M=window.MORE=window.MORE||[],D=window.DEEP=window.DEEP||{},D2=window.DEEP2=window.DEEP2||{};
window.TL=window.TL||{};window.WIKI=window.WIKI||{};window.FUN=window.FUN||{};window.CONS_NEW=window.CONS_NEW||{};
M.push({id:a.id,t:a.t,c:a.c||"Animals and Nature",i:a.i,p:a.p,r:a.r||[]});
D[a.id]={l:a.l,s:a.s,k:a.k,d:a.d};D2[a.id]={s:a.s2,sp:a.sp,g:a.g,f:a.f};
if(a.tl)TL[a.id]=a.tl;if(a.w)WIKI[a.id]=a.w;if(a.fun)FUN[a.id]=a.fun;if(a.cons)CONS_NEW[a.id]=a.cons};
