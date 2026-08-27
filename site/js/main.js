(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce)return;
  if(window.gsap){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-line',{yPercent:115,duration:1.2,stagger:.12,ease:'power4.out',delay:.15});
    gsap.from('.hero .reveal',{opacity:0,y:24,duration:.8,delay:.55,ease:'power3.out'});
    gsap.utils.toArray('.reveal').forEach(el=>{if(el.closest('.hero'))return;gsap.to(el,{opacity:1,y:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}})});
    gsap.to('.orb',{y:-100,scale:1.06,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
    gsap.to('.hero-grid',{y:80,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
  }
  const cursor=document.querySelector('.cursor');
  if(cursor&&window.matchMedia('(pointer:fine)').matches){let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});(function loop(){x+=(tx-x)*.18;y+=(ty-y)*.18;cursor.style.left=x+'px';cursor.style.top=y+'px';requestAnimationFrame(loop)})();document.querySelectorAll('a,.magnetic').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))})}
})();
