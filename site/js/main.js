(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=window.matchMedia('(pointer:fine)').matches;
  const root=document.documentElement;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

  if(window.gsap){
    if(window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      if(!reduce){
        const heroTL=gsap.timeline({defaults:{ease:'power4.out'}});
        heroTL.from('.hero-line',{yPercent:115,duration:1.2,stagger:.12,delay:.08})
          .from('.hero .eyebrow',{opacity:0,x:-18,duration:.55},'-=.72')
          .from('.hero .hero-bottom',{opacity:0,y:28,duration:.75},'-=.45');

        gsap.utils.toArray('.reveal').forEach(el=>{
          if(el.closest('.hero'))return;
          const section=el.closest('.section');
          const siblings=section?Array.from(section.querySelectorAll('.reveal')):[];
          const index=Math.max(0,siblings.indexOf(el));
          const isPrinciple=el.classList.contains('principle');
          gsap.fromTo(el,{opacity:0,y:isPrinciple?42:32,x:isPrinciple?(index%2?18:-18):0},{opacity:1,y:0,x:0,duration:isPrinciple?.95:.85,ease:'power3.out',delay:Math.min(index*.09,.36),scrollTrigger:{trigger:el,start:'top 88%',once:true}});
        });

        gsap.to('.orb',{y:-110,scale:1.08,rotate:3,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.1}});
        gsap.to('.hero-grid',{y:90,scale:1.035,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.15}});
        gsap.to('.hero-copy',{y:-55,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
        gsap.to('.scrollcue',{y:28,opacity:0,scrollTrigger:{trigger:'.hero',start:'top top',end:'35% top',scrub:.7}});
        document.querySelectorAll('.section-label').forEach(label=>{if(label.closest('.hero'))return;gsap.fromTo(label,{x:-12,opacity:.25},{x:0,opacity:1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:label,start:'top 90%',once:true}})});

        const architecture=document.querySelector('.architecture');
        if(architecture){
          gsap.to('.architecture-copy',{y:-70,scrollTrigger:{trigger:architecture,start:'top bottom',end:'bottom top',scrub:1.2}});
          gsap.fromTo('.network',{y:120,scale:.84,opacity:.35},{y:-20,scale:1,opacity:1,ease:'none',scrollTrigger:{trigger:architecture,start:'top bottom',end:'75% top',scrub:1.1}});
        }
        gsap.to('.cta .ring',{rotation:180,scale:1.08,scrollTrigger:{trigger:'.cta',start:'top bottom',end:'bottom top',scrub:1.5}});
      }else document.querySelectorAll('.reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
    }else if(!reduce){
      gsap.from('.hero-line',{yPercent:115,duration:1.2,stagger:.12,ease:'power4.out'});
      gsap.from('.hero .eyebrow',{opacity:0,x:-18,duration:.55,delay:.5});
      gsap.from('.hero .hero-bottom',{opacity:0,y:28,duration:.75,delay:.65});
      gsap.utils.toArray('.reveal').forEach((el,i)=>gsap.fromTo(el,{opacity:0,y:30},{opacity:1,y:0,duration:.85,delay:i*.06,ease:'power3.out'}));
    }else document.querySelectorAll('.reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
  }else document.querySelectorAll('.reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none'});

  const cursor=document.querySelector('.cursor');
  const hero=document.querySelector('.hero');
  if(cursor&&fine&&!reduce){
    let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;
    addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});
    (function loop(){x+=(tx-x)*.18;y+=(ty-y)*.18;cursor.style.left=x+'px';cursor.style.top=y+'px';requestAnimationFrame(loop)})();
    document.querySelectorAll('a,.magnetic').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))});
  }

  if(hero&&!reduce&&fine){
    let px=0,py=0,targetX=0,targetY=0;
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();targetX=(e.clientX-r.left)/r.width-.5;targetY=(e.clientY-r.top)/r.height-.5},{passive:true});
    hero.addEventListener('pointerleave',()=>{targetX=0;targetY=0},{passive:true});
    (function heroMotion(){px+=(targetX-px)*.075;py+=(targetY-py)*.075;root.style.setProperty('--mx',px.toFixed(3));root.style.setProperty('--my',py.toFixed(3));requestAnimationFrame(heroMotion)})();
  }

  if(!reduce){
    document.querySelectorAll('.magnetic').forEach(el=>{
      if(!fine)return;
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),dx=clamp((e.clientX-(r.left+r.width/2))/(r.width||1),-1,1),dy=clamp((e.clientY-(r.top+r.height/2))/(r.height||1),-1,1);el.style.transform=`translate3d(${(dx*12).toFixed(2)}px,${(dy*9).toFixed(2)}px,0)`},{passive:true});
      el.addEventListener('pointerleave',()=>{el.style.transform='translate3d(0,0,0)'},{passive:true});
    });
  }

  const systems=Array.from(document.querySelectorAll('.system'));
  systems.forEach((row,i)=>{
    row.addEventListener('pointermove',e=>{if(!fine||reduce)return;const r=row.getBoundingClientRect(),x=clamp((e.clientX-r.left)/r.width,0,1),y=(e.clientY-r.top)/r.height-.5;row.style.setProperty('--row-y',(y*6).toFixed(2)+'px');row.style.setProperty('--signal-progress',(x*100).toFixed(1)+'%')},{passive:true});
    row.addEventListener('pointerenter',()=>row.classList.add('is-active'),{passive:true});
    row.addEventListener('pointerleave',()=>{row.style.setProperty('--row-y','0px');row.classList.remove('is-active')},{passive:true});
    row.addEventListener('focus',()=>row.classList.add('is-active'));
    row.addEventListener('blur',()=>row.classList.remove('is-active'));
  });

  let lastScroll=window.scrollY,lastScrollTime=performance.now(),scrollVelocity=0;
  addEventListener('scroll',()=>{const now=performance.now(),dy=window.scrollY-lastScroll,dt=Math.max(8,now-lastScrollTime);scrollVelocity=clamp((dy/dt)*16,-3,3);lastScroll=window.scrollY;lastScrollTime=now;root.style.setProperty('--scroll-velocity',scrollVelocity.toFixed(3))},{passive:true});
  (function scrollSettle(){scrollVelocity+=(0-scrollVelocity)*.07;root.style.setProperty('--scroll-velocity',scrollVelocity.toFixed(3));requestAnimationFrame(scrollSettle)})();

  if('IntersectionObserver' in window&&!reduce){
    const rowObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting&&entry.intersectionRatio>.5){systems.forEach(r=>r.classList.remove('scroll-active'));entry.target.classList.add('scroll-active')}})},{threshold:[.5,.75]});
    systems.forEach(row=>rowObserver.observe(row));
  }

  const canvas=document.getElementById('globe-canvas'),globe=document.getElementById('system-globe');
  if(!canvas||!globe)return;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const nodes=[{name:'MyDNS',lat:25,lon:-28,known:true},{name:'MyDrive',lat:-15,lon:52,known:true},{name:'MyVault',lat:32,lon:82,known:true},{name:'',lat:58,lon:-92},{name:'',lat:8,lon:-118},{name:'',lat:-42,lon:-55},{name:'',lat:-28,lon:2},{name:'',lat:48,lon:30}];
  let w=0,h=0,dpr=1,rotX=-.08,rotY=-.18,targetX=rotX,targetY=rotY,drag=false,lastX=0,lastY=0,hoverNode=-1,velocityX=0,velocityY=0,lastInteraction=0;
  const R=.37,dotStep=9;
  const connections=[[0,1],[1,2],[0,2],[1,4],[2,7],[0,3],[3,4],[4,5],[5,6],[6,1],[7,2]];
  function resize(){const rect=globe.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=Math.max(1,rect.width);h=Math.max(1,rect.height);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
  addEventListener('resize',resize,{passive:true});resize();
  function project(lat,lon){const la=lat*Math.PI/180,lo=lon*Math.PI/180+rotY,x=Math.cos(la)*Math.sin(lo),y=Math.sin(la),z=Math.cos(la)*Math.cos(lo),cy=Math.cos(rotX),sy=Math.sin(rotX);return{x,y:y*cy-z*sy,z:y*sy+z*cy}}
  function point(p,cx,cy,r){return{x:cx+p.x*r,y:cy-p.y*r,z:p.z}}
  function draw(){
    ctx.clearRect(0,0,w,h);const cx=w/2,cy=h/2+8,r=Math.min(w,h)*R;
    const grd=ctx.createRadialGradient(cx-r*.25,cy-r*.3,r*.05,cx,cy,r*1.05);grd.addColorStop(0,'rgba(91,167,255,.055)');grd.addColorStop(.72,'rgba(91,167,255,.014)');grd.addColorStop(1,'rgba(91,167,255,0)');ctx.fillStyle=grd;ctx.beginPath();ctx.arc(cx,cy,r*1.04,0,Math.PI*2);ctx.fill();
    for(let lat=-90;lat<=90;lat+=dotStep)for(let lon=-180;lon<180;lon+=dotStep){const p=project(lat,lon);if(p.z<-.04)continue;const q=point(p,cx,cy,r),alpha=.08+.18*Math.max(0,p.z);ctx.fillStyle=`rgba(91,167,255,${alpha})`;ctx.beginPath();ctx.arc(q.x,q.y,Math.max(.65,1.15*p.z),0,Math.PI*2);ctx.fill()}
    const projected=nodes.map((n,i)=>({node:n,index:i,p:project(n.lat,n.lon)})).map(o=>({...o,q:point(o.p,cx,cy,r)}));
    ctx.lineWidth=1;
    connections.forEach(([a,b],ci)=>{const A=projected[a],B=projected[b];if(A.p.z<-.05&&B.p.z<-.05)return;const near=hoverNode===a||hoverNode===b,visibility=Math.max(.05,(A.p.z+B.p.z+2)/4);ctx.strokeStyle=near?`rgba(91,167,255,${.38*visibility})`:`rgba(91,167,255,${.10*visibility})`;ctx.lineWidth=near?1.5:1;ctx.beginPath();ctx.moveTo(A.q.x,A.q.y);ctx.lineTo(B.q.x,B.q.y);ctx.stroke();if(!reduce){const t=(performance.now()/3000+ci*.17)%1,px=A.q.x+(B.q.x-A.q.x)*t,py=A.q.y+(B.q.y-A.q.y)*t;ctx.fillStyle=`rgba(91,167,255,${(near?.65:.24)*visibility})`;ctx.beginPath();ctx.arc(px,py,near?1.9:1.2,0,Math.PI*2);ctx.fill()}});
    if(hoverNode>=0){const o=projected[hoverNode];if(o&&o.p.z>.03){ctx.strokeStyle='rgba(91,167,255,.34)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(o.q.x,o.q.y,12+Math.sin(performance.now()/190)*2.5,0,Math.PI*2);ctx.stroke()}}
    projected.sort((a,b)=>a.p.z-b.p.z).forEach(o=>{const front=o.p.z>-.02,active=hoverNode===o.index,size=o.node.known?4.2:2.7;ctx.globalAlpha=front?(active?1:.82):.28;if(active||o.node.known){ctx.shadowBlur=active?17:8;ctx.shadowColor='rgba(91,167,255,.65)'}else ctx.shadowBlur=0;ctx.fillStyle='#5ba7ff';ctx.beginPath();ctx.arc(o.q.x,o.q.y,size,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;if(o.node.known&&front){ctx.font='500 11px "DM Mono",monospace';ctx.fillStyle=active?'#f3f6f8':'#aeb9c4';ctx.textAlign=o.q.x<cx?'right':'left';ctx.textBaseline='middle';ctx.fillText(o.node.name,o.q.x+(o.q.x<cx?-11:11),o.q.y)}});ctx.globalAlpha=1;if(!reduce)requestAnimationFrame(draw);
  }
  function tick(){if(!drag){velocityX*=.91;velocityY*=.91;const idle=performance.now()-lastInteraction>850;if(idle)targetY+=.00052;targetY+=velocityX*.48;targetX=clamp(targetX+velocityY*.48,-1.15,1.15)}rotY+=(targetY-rotY)*.10;rotX+=(targetX-rotX)*.10;if(reduce)draw();else requestAnimationFrame(tick)}
  function pointerPos(e){const rect=canvas.getBoundingClientRect();return{x:e.clientX-rect.left,y:e.clientY-rect.top}}
  function findNode(x,y){const cx=w/2,cy=h/2+8,r=Math.min(w,h)*R;let best=-1,dist=22;nodes.forEach((n,i)=>{const p=project(n.lat,n.lon);if(p.z<.03)return;const q=point(p,cx,cy,r),d=Math.hypot(q.x-x,q.y-y);if(d<dist){dist=d;best=i}});return best}
  canvas.addEventListener('pointerdown',e=>{drag=true;lastInteraction=performance.now();lastX=e.clientX;lastY=e.clientY;velocityX=0;velocityY=0;canvas.setPointerCapture(e.pointerId);globe.classList.add('interacted')});
  canvas.addEventListener('pointermove',e=>{lastInteraction=performance.now();if(drag){const dx=e.clientX-lastX,dy=e.clientY-lastY;velocityX=dx*.0007;velocityY=dy*.0007;targetY+=dx*.008;targetX=clamp(targetX+dy*.008,-1.15,1.15);lastX=e.clientX;lastY=e.clientY}const p=pointerPos(e);hoverNode=findNode(p.x,p.y)},{passive:true});
  canvas.addEventListener('pointerup',e=>{drag=false;lastInteraction=performance.now();try{canvas.releasePointerCapture(e.pointerId)}catch(_){}},{passive:true});
  canvas.addEventListener('pointercancel',()=>{drag=false},{passive:true});
  canvas.addEventListener('pointerleave',()=>{if(!drag)hoverNode=-1},{passive:true});
  draw();tick();
})();
