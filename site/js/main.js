(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(window.gsap){
    if(window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      if(!reduce){
        gsap.from('.hero-line',{yPercent:115,duration:1.2,stagger:.12,ease:'power4.out',delay:.15});
        gsap.from('.hero .reveal',{opacity:0,y:24,duration:.8,delay:.55,ease:'power3.out'});
        gsap.utils.toArray('.reveal').forEach(el=>{if(el.closest('.hero'))return;gsap.to(el,{opacity:1,y:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}})});
        gsap.to('.orb',{y:-100,scale:1.06,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
        gsap.to('.hero-grid',{y:80,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
      }
    } else if(!reduce){
      gsap.from('.hero-line',{yPercent:115,duration:1.2,stagger:.12,ease:'power4.out',delay:.15});
      gsap.from('.hero .reveal',{opacity:0,y:24,duration:.8,delay:.55,ease:'power3.out'});
      gsap.utils.toArray('.reveal').forEach(el=>{if(el.closest('.hero'))return;gsap.to(el,{opacity:1,y:0,duration:.85,ease:'power3.out'});});
    } else {
      document.querySelectorAll('.reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
    }
  } else {
    document.querySelectorAll('.reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
  }

  const cursor=document.querySelector('.cursor');
  if(cursor&&!reduce&&window.matchMedia('(pointer:fine)').matches){
    let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;
    addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});
    (function loop(){x+=(tx-x)*.18;y+=(ty-y)*.18;cursor.style.left=x+'px';cursor.style.top=y+'px';requestAnimationFrame(loop)})();
    document.querySelectorAll('a,.magnetic').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))});
  }

  const canvas=document.getElementById('globe-canvas');
  const globe=document.getElementById('system-globe');
  if(!canvas||!globe)return;
  const ctx=canvas.getContext('2d');
  if(!ctx)return;

  const nodes=[
    {name:'MyDNS',lat:25,lon:-28,known:true},
    {name:'MyDrive',lat:-15,lon:52,known:true},
    {name:'MyVault',lat:32,lon:82,known:true},
    {name:'',lat:58,lon:-92},
    {name:'',lat:8,lon:-118},
    {name:'',lat:-42,lon:-55},
    {name:'',lat:-28,lon:2},
    {name:'',lat:48,lon:30}
  ];

  let w=0,h=0,dpr=1,rotX=-.08,rotY=-.18,targetX=rotX,targetY=rotY,drag=false,lastX=0,lastY=0,lastInteraction=0;
  let hoverNode=null;
  const R=.31;
  const dotStep=9;
  const connections=[[0,1],[1,2],[0,2],[1,4],[2,7],[0,3],[3,4],[4,5],[5,6],[6,1],[7,2]];

  function resize(){
    const rect=globe.getBoundingClientRect();
    dpr=Math.min(window.devicePixelRatio||1,2);
    w=Math.max(1,rect.width);h=Math.max(1,rect.height);
    canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
    canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  addEventListener('resize',resize,{passive:true});resize();

  function project(lat,lon){
    const la=lat*Math.PI/180,lo=lon*Math.PI/180+rotY;
    const x=Math.cos(la)*Math.sin(lo), y=Math.sin(la), z=Math.cos(la)*Math.cos(lo);
    const cy=Math.cos(rotX),sy=Math.sin(rotX);
    const yy=y*cy-z*sy;
    return {x:x,y:yy,z:y*sy+z*cy};
  }
  function point(p,cx,cy,r){return{x:cx+p.x*r,y:cy-p.y*r,z:p.z}}

  function draw(){
    ctx.clearRect(0,0,w,h);
    const cx=w/2,cy=h/2+8,r=Math.min(w,h)*R;
    const grd=ctx.createRadialGradient(cx-r*.25,cy-r*.3,r*.05,cx,cy,r*1.05);
    grd.addColorStop(0,'rgba(91,167,255,.045)');grd.addColorStop(.72,'rgba(91,167,255,.012)');grd.addColorStop(1,'rgba(91,167,255,0)');
    ctx.fillStyle=grd;ctx.beginPath();ctx.arc(cx,cy,r*1.04,0,Math.PI*2);ctx.fill();

    for(let lat=-90;lat<=90;lat+=dotStep){
      for(let lon=-180;lon<180;lon+=dotStep){
        const p=project(lat,lon);if(p.z<-.04)continue;
        const q=point(p,cx,cy,r),alpha=.08+.18*Math.max(0,p.z);
        ctx.fillStyle=`rgba(91,167,255,${alpha})`;ctx.beginPath();ctx.arc(q.x,q.y,Math.max(.65,1.15*p.z),0,Math.PI*2);ctx.fill();
      }
    }

    const projected=nodes.map((n,i)=>({node:n,index:i,p:project(n.lat,n.lon)})).map(o=>({...o,q:point(o.p,cx,cy,r)}));
    ctx.lineWidth=1;
    connections.forEach(([a,b])=>{
      const A=projected[a],B=projected[b];
      if(A.p.z<-.05&&B.p.z<-.05)return;
      const visibility=Math.max(.05,(A.p.z+B.p.z+2)/4);
      ctx.strokeStyle=`rgba(91,167,255,${.10*visibility})`;ctx.beginPath();ctx.moveTo(A.q.x,A.q.y);ctx.lineTo(B.q.x,B.q.y);ctx.stroke();
      if(!reduce){
        const t=((performance.now()/2600)%1),px=A.q.x+(B.q.x-A.q.x)*t,py=A.q.y+(B.q.y-A.q.y)*t;
        ctx.fillStyle=`rgba(91,167,255,${.25*visibility})`;ctx.beginPath();ctx.arc(px,py,1.3,0,Math.PI*2);ctx.fill();
      }
    });

    projected.sort((a,b)=>a.p.z-b.p.z).forEach(o=>{
      const front=o.p.z>-.02;const active=hoverNode===o.index;
      const size=o.node.known?3.8:2.6;
      ctx.globalAlpha=front?(active?1:.82):.28;
      if(active||o.node.known){ctx.shadowBlur=active?18:10;ctx.shadowColor='rgba(91,167,255,.7)'}else ctx.shadowBlur=0;
      ctx.fillStyle='#5ba7ff';ctx.beginPath();ctx.arc(o.q.x,o.q.y,size,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
      if(o.node.known&&front){
        ctx.font='500 11px "DM Mono", monospace';ctx.fillStyle=active?'#f3f6f8':'#aeb9c4';ctx.textAlign=o.q.x<cx?'right':'left';ctx.textBaseline='middle';
        ctx.fillText(o.node.name,o.q.x+(o.q.x<cx?-10:10),o.q.y);
      }
    });
    ctx.globalAlpha=1;
    if(reduce)return;
    requestAnimationFrame(draw);
  }

  function tick(){
    if(!drag&&performance.now()-lastInteraction>900)targetY+=.0009;
    rotY+=(targetY-rotY)*.08;rotX+=(targetX-rotX)*.08;
    if(reduce){draw();return}
    requestAnimationFrame(tick);
  }

  function pointerPos(e){const rect=canvas.getBoundingClientRect();return{x:e.clientX-rect.left,y:e.clientY-rect.top}}
  function findNode(x,y){
    const cx=w/2,cy=h/2+8,r=Math.min(w,h)*R;
    let best=-1,dist=18;
    nodes.forEach((n,i)=>{const p=project(n.lat,n.lon);if(p.z<.03)return;const q=point(p,cx,cy,r),d=Math.hypot(q.x-x,q.y-y);if(d<dist){dist=d;best=i}});
    return best;
  }

  canvas.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;lastY=e.clientY;lastInteraction=performance.now();canvas.setPointerCapture(e.pointerId);globe.classList.add('interacted')});
  canvas.addEventListener('pointermove',e=>{
    if(drag){const dx=e.clientX-lastX,dy=e.clientY-lastY;targetY+=dx*.008;targetX=Math.max(-1.15,Math.min(1.15,targetX+dy*.008));lastX=e.clientX;lastY=e.clientY;lastInteraction=performance.now()}
    const p=pointerPos(e);hoverNode=findNode(p.x,p.y);
  });
  canvas.addEventListener('pointerup',e=>{drag=false;lastInteraction=performance.now();try{canvas.releasePointerCapture(e.pointerId)}catch(_){} });
  canvas.addEventListener('pointercancel',()=>{drag=false});
  canvas.addEventListener('pointerleave',()=>{if(!drag)hoverNode=null});
  canvas.addEventListener('wheel',e=>{e.preventDefault();targetX+=e.deltaY*.0008;lastInteraction=performance.now();globe.classList.add('interacted')},{passive:false});

  draw();
  tick();
})();
