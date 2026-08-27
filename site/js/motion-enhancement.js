(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=window.matchMedia('(pointer:fine)').matches;
  if(reduce)return;
  const root=document.documentElement;
  const cursor=document.querySelector('.cursor');
  const hero=document.querySelector('.hero');

  // Semantic cursor states: the cursor becomes part of the interface language.
  if(cursor&&fine){
    const setState=state=>cursor.dataset.state=state;
    document.querySelectorAll('.system').forEach(el=>{
      el.addEventListener('mouseenter',()=>setState('view'));
      el.addEventListener('mouseleave',()=>setState('default'));
      el.addEventListener('focus',()=>setState('view'));
      el.addEventListener('blur',()=>setState('default'));
    });
    document.querySelectorAll('.button,.nav-cta').forEach(el=>{
      el.addEventListener('mouseenter',()=>setState('action'));
      el.addEventListener('mouseleave',()=>setState('default'));
    });
    const canvas=document.querySelector('#globe-canvas');
    if(canvas){
      canvas.addEventListener('mouseenter',()=>setState('drag'));
      canvas.addEventListener('mouseleave',()=>setState('default'));
    }
  }

  // Stronger hero depth: rotation + translation, with each layer at a different depth.
  if(hero&&fine){
    let tx=0,ty=0,x=0,y=0;
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5},{passive:true});
    hero.addEventListener('pointerleave',()=>{tx=0;ty=0},{passive:true});
    const loop=()=>{
      x+=(tx-x)*.055;y+=(ty-y)*.055;
      root.style.setProperty('--hero-rx',(y*-1.8).toFixed(2)+'deg');
      root.style.setProperty('--hero-ry',(x*2.4).toFixed(2)+'deg');
      requestAnimationFrame(loop);
    };loop();
  }

  // System rows: pointer position becomes a directional signal rather than a card hover.
  if(fine){
    document.querySelectorAll('.system').forEach(row=>{
      row.addEventListener('pointermove',e=>{
        const r=row.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        row.style.setProperty('--pointer-x',(x*16).toFixed(2)+'px');
        row.style.setProperty('--pointer-y',(y*4).toFixed(2)+'px');
        row.style.setProperty('--signal-origin',((x+.5)*100).toFixed(1)+'%');
      },{passive:true});
      row.addEventListener('pointerleave',()=>{
        row.style.setProperty('--pointer-x','0px');row.style.setProperty('--pointer-y','0px');row.style.setProperty('--signal-origin','0%');
      },{passive:true});
    });
  }

  // Scroll velocity becomes a transient system signal and decays to zero.
  let lastY=scrollY,lastT=performance.now(),velocity=0;
  addEventListener('scroll',()=>{const now=performance.now(),dt=Math.max(8,now-lastT);velocity=Math.max(-1,Math.min(1,(scrollY-lastY)/dt*.9));lastY=scrollY;lastT=now},{passive:true});
  function velocityLoop(){velocity*=.91;root.style.setProperty('--motion-v',velocity.toFixed(3));requestAnimationFrame(velocityLoop)}
  velocityLoop();

  // Principles respond sequentially to the viewer's position instead of all behaving identically.
  const principles=[...document.querySelectorAll('.principle')];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('in-focus',entry.isIntersecting)),{threshold:.55});
    principles.forEach(p=>observer.observe(p));
  }
})();
