/* B-only continuous filmstrip: pause for reading, pointer, keyboard and reduced motion. */
(()=>{
 const film=document.querySelector('.faculty-film');if(!film)return;
 const rail=film.querySelector('.faculty-reel'),track=film.querySelector('.faculty-film-track'),group=film.querySelector('.faculty-film-group'),button=film.querySelector('.faculty-motion');
 const copy=group.cloneNode(true);copy.setAttribute('aria-hidden','true');track.append(copy);
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let manual=reduced.matches,hover=false,focused=false,visible=false,last=0,touchUntil=0;
 function label(){button.setAttribute('aria-pressed',String(manual));button.innerHTML=manual?'继续滚动 <span aria-hidden="true">▷</span>':'暂停滚动 <span aria-hidden="true">Ⅱ</span>';}
 button.addEventListener('click',()=>{manual=!manual;label();});
 film.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hover=true;});
 film.addEventListener('pointerleave',()=>{hover=false;});
 rail.addEventListener('focusin',()=>{focused=true;});rail.addEventListener('focusout',()=>{focused=false;});
 rail.addEventListener('touchstart',()=>{touchUntil=Infinity;},{passive:true});rail.addEventListener('touchend',()=>{touchUntil=performance.now()+5000;},{passive:true});rail.addEventListener('touchcancel',()=>{touchUntil=performance.now()+5000;},{passive:true});
 reduced.addEventListener('change',()=>{manual=reduced.matches;label();});
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;},{threshold:0}).observe(film);
 let position=0,lastWritten=0;
 rail.addEventListener('scroll',()=>{if(Math.abs(rail.scrollLeft-lastWritten)>.75){position=rail.scrollLeft;lastWritten=position;}},{passive:true});
 function frame(time){const delta=Math.min(time-last,50);last=time;
  if(visible&&!document.hidden&&!manual&&!hover&&!focused&&time>touchUntil){const width=group.getBoundingClientRect().width;position+=delta*.018;if(position>=width)position-=width;rail.scrollLeft=position;lastWritten=rail.scrollLeft;}
  requestAnimationFrame(frame);
 }
 label();requestAnimationFrame(frame);
})();
