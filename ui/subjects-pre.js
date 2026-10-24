/* Applies the subject arrangement in data/subjects.js before the layout layers load.
   Each article keeps its old section in a.oc, gets its subject in a.c and its sub-section in a.sub,
   and the article list is put in book order: subject, then sub-section, then the order listed. */
/* Extra sections for flagship articles (data/deep3-*.js) are added after the in-depth layer. */
Object.entries(window.DEEP3||{}).forEach(([i,d])=>{const a=get(i);if(a&&d.s)a.p.push(...d.s)});
(()=>{const S=window.SUBJECTS||[],OLD=window.OLDSEC||{};if(!S.length)return;
const where={};S.forEach((s,si)=>s[6].forEach((b,bi)=>b[2].split(/\s+/).filter(Boolean).forEach((id,k)=>where[id]=[si,bi,k])));
const SUBJ=window.SUBJ={};S.forEach(s=>SUBJ[s[0]]={n:s[0],i:s[1],col:s[2],tag:s[3],intro:s[4],feat:s[5],subs:s[6].map(b=>({n:b[0],d:b[1],ids:[]}))});
/* Articles not listed yet go to an "Other articles" sub-section of the subject their old section maps to. */
A.forEach(a=>{a.oc=a.c;let w=where[a.id];if(!w){const sn=OLD[a.c]||S[0][0],si=S.findIndex(s=>s[0]==sn);let bi=SUBJ[sn].subs.findIndex(b=>b.n=="Other articles");if(bi<0){SUBJ[sn].subs.push({n:"Other articles",d:"More articles in this subject.",ids:[]});bi=SUBJ[sn].subs.length-1}w=where[a.id]=[si,bi,999]}
a.c=S[w[0]][0];a.sub=SUBJ[a.c].subs[w[1]].n});
A.sort((x,y)=>{const a=where[x.id],b=where[y.id];return a[0]-b[0]||a[1]-b[1]||a[2]-b[2]});
A.forEach(a=>SUBJ[a.c].subs.find(b=>b.n==a.sub).ids.push(a.id));
Object.values(SUBJ).forEach(s=>s.subs=s.subs.filter(b=>b.ids.length));
/* Section colors become subject colors. */
Object.keys(CAT).forEach(k=>delete CAT[k]);S.forEach(s=>CAT[s[0]]=s[2]);
window.CATINFO={};S.forEach(s=>CATINFO[s[0]]={tag:s[3],intro:s[4],feat:s[5]});
window.subOf=a=>a&&SUBJ[a.c]&&SUBJ[a.c].subs.find(b=>b.n==a.sub);
window.subjFor=c=>CAT[c]?c:OLD[c]||null;
})();
