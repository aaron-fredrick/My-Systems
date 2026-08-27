(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=window.matchMedia('(pointer:fine)').matches;
  const root=document.documentElement;

  function setRevealState(){
    document.querySelectorAll('.reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
  }

  if(window.gsap){
    if(window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      if(!reduce){
        gsap.from('.hero-line',{yPercent:115,duration:1.15,stagger:.13,ease:'power4.out',delay:.12});
        gsap.from('.hero .eyebrow',{opacity:0,y:10,duration:.55,ease:'power3.out',delay:.42});
        gsap.from('.hero .hero-bottom',{opacity:0,y:18,duration:.7,ease:'power3.out',delay:.62});
        gsap.utils.toArray('.reveal').forEach(el=>{
          if(el.closest('.hero'))return;
          const section=el.closest('.section');
          const siblings=section?section.querySelectorAll('.reveal'):[];
          const index=Math.max(0,Array.prototype.indexOf.call(siblings,el));
          const x=el.classList.contains('principle')?14:0;
          gsap.fromTo(el,{opacity:0,y:24,x},{opacity:1,y:0,x:0,duration:.78,ease:'power3.out',delay:Math.min(index*.07,.28),scrollTrigger:{trigger:el,start:'top 86%',once:true}});
        });
        gsap.to('.orb',{y:-85,scale:1.045,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.2}});
        gsap.to('.hero-grid',{y:55,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.2}});
      }else setRevealState();
    }else if(!reduce){
      gsap.from('.hero-line',{yPercent:115,duration:1.15,stagger:.13,ease:'power4.out',delay:.12});
      gsap.from('.hero .eyebrow',{opacity:0,y:10,duration:.55,ease:'power3.out',delay:.42});
      gsap.from('.hero .hero-bottom',{opacity:0,y:18,duration:.7,ease:'power3.out',delay:.62});
      gsap.utils.toArray('.reveal').forEach((el,i)=>gsap.fromTo(el,{opacity:0,y:24},{opacity:1,y:0,duration:.78,ease:'power3.out',delay:i*.05}));
    }else setRevealState();
  }else setRevealState();

  const cursor=document.querySelector('.cursor');
  const hero=document.querySelector('.hero');

  if(cursor&&fine&&!reduce){
    let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;
    addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});
    (function loop(){x+=(tx-x)*.18;y+=(ty-y)*.18;cursor.style.left=x+'px';cursor.style.top=y+'px';requestAnimationFrame(loop)})();
    document.querySelectorAll('a,.magnetic').forEach(el=>{
      el.addEventListener('mouseenter',()=>cursor.classList.add('active'));
      el.addEventListener('mouseleave',()=>cursor.classList.remove('active'));
    });
  }

  if(hero&&!reduce&&fine){
    let raf=0,px=0,py=0,targetX=0,targetY=0;
    hero.addEventListener('pointermove',e=>{
      const r=hero.getBoundingClientRect();
      targetX=(e.clientX-r.left)/r.width-.5;
      targetY=(e.clientY-r.top)/r.height-.5;
      if(raf)return;
      raf=requestAnimationFrame(()=>{
        px+=(targetX-px)*.35;py+=(targetY-py)*.35;
        root.style.setProperty('--mx',px.toFixed(3));root.style.setProperty('--my',py.toFixed(3));raf=0;
      });
    },{passive:true});
    hero.addEventListener('pointerleave',()=>{targetX=0;targetY=0},{passive:true});
  }

  const magnetic=document.querySelectorAll('.magnetic');
  if(!reduce){
    magnetic.forEach(el=>{
      if(fine){
        el.addEventListener('pointermove',e=>{
          const r=el.getBoundingClientRect();
          const dx=(e.clientX-(r.left+r.width/2))/(r.width||1);
          const dy=(e.clientY-(r.top+r.height/2))/(r.height||1);
          el.style.transform=`translate3d(${(dx*8).toFixed(2)}px,${(dy*6).toFixed(2)}px,0)`;
        },{passive:true});
        el.addEventListener('pointerleave',()=>{el.style.transform='translate3d(0,0,0)'},{passive:true});
      }else{
        el.addEventListener('pointerdown',()=>el.classList.add('magnetic-pressed'),{passive:true});
        ['pointerup','pointercancel'].forEach(type=>el.addEventListener(type,()=>el.classList.remove('magnetic-pressed'),{passive:true}));
      }
    });
  }

  const systems=document.querySelectorAll('.system');
  systems.forEach((row,i)=>{
    row.addEventListener('pointermove',e=>{
      if(!fine||reduce)return;
      const r=row.getBoundingClientRect();
      const y=(e.clientY-r.top)/r.height-.5;
      row.style.setProperty('--row-y',(y*3).toFixed(2)+'px');
    },{passive:true});
    row.addEventListener('pointerleave',()=>row.style.setProperty('--row-y','0px'),{passive:true});
  });

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
    connections.forEach(([a,b])=>{const A=projected[a],B=projected[b];if(A.p.z<-.05&&B.p.z<-.05)return;const near=hoverNode===a||hoverNode===b,visibility=Math.max(.05,(A.p.z+B.p.z+2)/4);ctx.strokeStyle=near?`rgba(91,167,255,${.34*visibility})`:`rgba(91,167,255,${.10*visibility})`;ctx.lineWidth=near?1.4:1;ctx.beginPath();ctx.moveTo(A.q.x,A.q.y);ctx.lineTo(B.q.x,B.q.y);ctx.stroke();if(!reduce){const t=(performance.now()/3000)%1,px=A.q.x+(B.q.x-A.q.x)*t,py=A.q.y+(B.q.y-A.q.y)*t;ctx.fillStyle=`rgba(91,167,255,${(near?.55:.22)*visibility})`;ctx.beginPath();ctx.arc(px,py,near?1.8:1.15,0,Math.PI*2);ctx.fill()}});
    if(hoverNode>=0){const o=projected[hoverNode];if(o&&o.p.z>.03){ctx.strokeStyle='rgba(91,167,255,.28)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(o.q.x,o.q.y,11+Math.sin(performance.now()/220)*2,0,Math.PI*2);ctx.stroke()}}
    projected.sort((a,b)=>a.p.z-b.p.z).forEach(o=>{const front=o.p.z>-.02,active=hoverNode===o.index,size=o.node.known?4.2:2.7;ctx.globalAlpha=front?(active?1:.82):.28;if(active||o.node.known){ctx.shadowBlur=active?16:8;ctx.shadowColor='rgba(91,167,255,.65)'}else ctx.shadowBlur=0;ctx.fillStyle='#5ba7ff';ctx.beginPath();ctx.arc(o.q.x,o.q.y,size,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;if(o.node.known&&front){ctx.font='500 11px "DM Mono",monospace';ctx.fillStyle=active?'#f3f6f8':'#aeb9c4';ctx.textAlign=o.q.x<cx?'right':'left';ctx.textBaseline='middle';ctx.fillText(o.node.name,o.q.x+(o.q.x<cx?-11:11),o.q.y)}});ctx.globalAlpha=1;if(!reduce)requestAnimationFrame(draw);
  }
  function tick(){
    if(!drag){
      velocityX*=.91;velocityY*=.91;
      const idle=performance.now()-lastInteraction>1600;
      if(idle)targetY+=.00024;
      targetY+=velocityX*.45;targetX=Math.max(-1.15,Math.min(1.15,targetX+velocityY*.45));
    }
    rotY+=(targetY-rotY)*.10;rotX+=(targetX-rotX)*.10;
    if(reduce)draw();else requestAnimationFrame(tick);
  }
  function pointerPos(e){const rect=canvas.getBoundingClientRect();return{x:e.clientX-rect.left,y:e.clientY-rect.top}}
  function findNode(x,y){const cx=w/2,cy=h/2+8,r=Math.min(w,h)*R;let best=-1,dist=20;nodes.forEach((n,i)=>{const p=project(n.lat,n.lon);if(p.z<.03)return;const q=point(p,cx,cy,r),d=Math.hypot(q.x-x,q.y-y);if(d<dist){dist=d;best=i}});return best}
  canvas.addEventListener('pointerdown',e=>{drag=true;lastInteraction=performance.now();lastX=e.clientX;lastY=e.clientY;velocityX=0;velocityY=0;canvas.setPointerCapture(e.pointerId);globe.classList.add('interacted')});
  canvas.addEventListener('pointermove',e=>{lastInteraction=performance.now();if(drag){const dx=e.clientX-lastX,dy=e.clientY-lastY;velocityX=dx*.0007;velocityY=dy*.0007;targetY+=dx*.008;targetX=Math.max(-1.15,Math.min(1.15,targetX+dy*.008));lastX=e.clientX;lastY=e.clientY}const p=pointerPos(e);hoverNode=findNode(p.x,p.y)},{passive:true});
  canvas.addEventListener('pointerup',e=>{drag=false;lastInteraction=performance.now();try{canvas.releasePointerCapture(e.pointerId)}catch(_){}},{passive:true});
  canvas.addEventListener('pointercancel',()=>{drag=false},{passive:true});
  canvas.addEventListener('pointerleave',()=>{if(!drag)hoverNode=-1},{passive:true});
  draw();tick();
})();
