
function setup(){
  if(window._variant==='parallax'){
    const bg=document.getElementById('bg');
    if(bg) window.addEventListener('scroll',()=>{ const y=window.scrollY*0.35; bg.style.transform='translateY('+y+'px)'; });
  } else {
    const b1=document.getElementById('b1'), b2=document.getElementById('b2');
    window.addEventListener('scroll',()=>{ const y=window.scrollY; if(b1) b1.style.transform='translateY('+(y*0.15)+'px)'; if(b2) b2.style.transform='translateY('+(y*0.25)+'px)'; });
  }
  const io=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); } }); },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  const io2=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); } }); },{threshold:.2});
  document.querySelectorAll('.card.rodelay,#aboutimg').forEach(el=>io2.observe(el));
  function openModal(id){ const d=document.getElementById(id); if(!d) return; d.showModal(); const btn=d.querySelector('[data-close]'); if(btn) btn.focus(); }
  document.querySelectorAll('[data-modal], .link[data-modal]').forEach(a=>{
    a.addEventListener('click', e=>{ e.preventDefault(); openModal(a.dataset.modal || a.getAttribute('data-modal')); });
  });
  document.querySelectorAll('[data-close]').forEach(b=>{
    b.addEventListener('click',()=> b.closest('dialog').close());
  });
}
window.addEventListener('content-ready', setup);
