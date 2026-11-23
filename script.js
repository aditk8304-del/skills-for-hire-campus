const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const toast = (message) => {
  const el = $('#toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(window.toastTimer); window.toastTimer = setTimeout(()=>el.classList.remove('show'), 2600);
};
const openModal = id => { const el = document.getElementById(id); if(el) el.classList.add('show'); };
const closeModals = () => $$('.modal-backdrop').forEach(m=>m.classList.remove('show'));
$$('[data-open]').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.open)));
$$('[data-close]').forEach(btn=>btn.addEventListener('click',closeModals));
$$('.modal-backdrop').forEach(bg=>bg.addEventListener('click',e=>{if(e.target===bg) closeModals();}));
$$('[data-switch]').forEach(btn=>btn.addEventListener('click',()=>{closeModals();openModal(btn.dataset.switch);}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals();});

$('#menuToggle').addEventListener('click',()=>$('#nav').classList.toggle('open'));
$$('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));

function filterGigs(){
  const query=$('#gigSearch').value.trim().toLowerCase();
  const category=$('#categoryFilter').value;
  const sort=$('#sortFilter').value;
  const cards=$$('.gig-card');
  cards.forEach(card=>{
    const text=card.innerText.toLowerCase();
    card.style.display=((category==='All'||card.dataset.category===category)&&text.includes(query))?'flex':'none';
  });
  const visible=cards.filter(c=>c.style.display!=='none');
  if(sort==='low') visible.sort((a,b)=>+a.dataset.budget- +b.dataset.budget);
  if(sort==='high') visible.sort((a,b)=>+b.dataset.budget- +a.dataset.budget);
  const grid=$('#gigGrid'); visible.forEach(c=>grid.appendChild(c));
  $('#emptyState').hidden=visible.length!==0;
}
$('#gigSearch').addEventListener('input',filterGigs);
$('#categoryFilter').addEventListener('change',filterGigs);
$('#sortFilter').addEventListener('change',filterGigs);
$$('.category-card').forEach(card=>card.addEventListener('click',()=>{
  $('#categoryFilter').value=card.dataset.category; filterGigs(); $('#gigs').scrollIntoView({behavior:'smooth'});
}));
$$('.save-btn').forEach(btn=>btn.addEventListener('click',()=>{
  btn.classList.toggle('saved'); btn.textContent=btn.classList.contains('saved')?'♥':'♡';
  toast(btn.classList.contains('saved')?'Gig saved to your list':'Gig removed from saved list');
}));
$$('.gig-apply').forEach(btn=>btn.addEventListener('click',()=>toast('Opportunity selected: '+btn.dataset.gig+'. Sign up to apply!')));
$$('.demo-form').forEach(form=>form.addEventListener('submit',e=>{
  e.preventDefault(); closeModals(); form.reset();
  toast('Thanks! This is a demo prototype — connect a backend to enable real accounts and submissions.');
}));
