import { prefersReducedMotion, clamp } from './config.js';

export function initGlobe() {
  const canvas = document.getElementById('globe-canvas');
  const globe = document.getElementById('system-globe');
  if (!canvas || !globe) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const nodes = [
    { name: 'MyDNS', lat: 25, lon: -28, known: true }, { name: 'MyDrive', lat: -15, lon: 52, known: true }, { name: 'MyVault', lat: 32, lon: 82, known: true },
    { name: '', lat: 58, lon: -92 }, { name: '', lat: 8, lon: -118 }, { name: '', lat: -42, lon: -55 }, { name: '', lat: -28, lon: 2 }, { name: '', lat: 48, lon: 30 }
  ];
  const links = [[0,1],[1,2],[0,2],[1,4],[2,7],[0,3],[3,4],[4,5],[5,6],[6,1],[7,2]];
  let w=0,h=0,dpr=1,rotX=-.08,rotY=-.18,targetX=rotX,targetY=rotY;
  let drag=false,lastX=0,lastY=0,hover=-1,vx=0,vy=0,lastInteraction=0,pointerX=0,pointerY=0,raf=0,tickRaf=0,dirty=true;
  const radius=.37,step=9;

  function resize(){const r=globe.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=Math.max(1,r.width);h=Math.max(1,r.height);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=`${w}px`;canvas.style.height=`${h}px`;ctx.setTransform(dpr,0,0,dpr,0,0);dirty=true;}
  addEventListener('resize',resize,{passive:true});resize();
  function project(lat,lon){const la=lat*Math.PI/180,lo=lon*Math.PI/180+rotY,x=Math.cos(la)*Math.sin(lo),y=Math.sin(la),z=Math.cos(la)*Math.cos(lo),cy=Math.cos(rotX),sy=Math.sin(rotX);return{x,y:y*cy-z*sy,z:y*sy+z*cy};}
  const screen=(p,cx,cy,r)=>({x:cx+p.x*r,y:cy-p.y*r,z:p.z});

  function draw(){
    raf=0; if(!dirty&&!drag&&Math.abs(vx)<.00001&&Math.abs(vy)<.00001&&!pointerX&&!pointerY)return;
    dirty=false;ctx.clearRect(0,0,w,h);const cx=w/2+pointerX*7,cy=h/2+8+pointerY*5,r=Math.min(w,h)*radius;
    const glow=ctx.createRadialGradient(cx-r*.25,cy-r*.3,r*.05,cx,cy,r*1.05);glow.addColorStop(0,'rgba(91,167,255,.055)');glow.addColorStop(.72,'rgba(91,167,255,.014)');glow.addColorStop(1,'rgba(91,167,255,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(cx,cy,r*1.04,0,Math.PI*2);ctx.fill();
    for(let lat=-90;lat<=90;lat+=step)for(let lon=-180;lon<180;lon+=step){const p=project(lat,lon);if(p.z<-.04)continue;ctx.fillStyle=`rgba(91,167,255,${.07+.2*Math.max(0,p.z)})`;ctx.beginPath();ctx.arc(cx+p.x*r,cy-p.y*r,Math.max(.65,1.15*p.z),0,Math.PI*2);ctx.fill();}
    const projected=nodes.map((node,index)=>{const p=project(node.lat,node.lon);return{node,index,p,q:screen(p,cx,cy,r)};});
    links.forEach(([a,b],i)=>{const A=projected[a],B=projected[b];if(A.p.z<-.05&&B.p.z<-.05)return;const near=hover===a||hover===b,visibility=Math.max(.05,(A.p.z+B.p.z+2)/4);ctx.strokeStyle=`rgba(91,167,255,${(near?.42:.10)*visibility})`;ctx.lineWidth=near?1.5:1;ctx.beginPath();ctx.moveTo(A.q.x,A.q.y);ctx.lineTo(B.q.x,B.q.y);ctx.stroke();if(!prefersReducedMotion){const t=(performance.now()/3000+i*.17)%1,px=A.q.x+(B.q.x-A.q.x)*t,py=A.q.y+(B.q.y-A.q.y)*t;ctx.fillStyle=`rgba(91,167,255,${(near?.72:.24)*visibility})`;ctx.beginPath();ctx.arc(px,py,near?2:1.2,0,Math.PI*2);ctx.fill();}});
    projected.sort((a,b)=>a.p.z-b.p.z).forEach(o=>{const front=o.p.z>-.02,active=hover===o.index,size=o.node.known?4.2:2.7;ctx.globalAlpha=front?(active?1:.82):.28;ctx.fillStyle='#5ba7ff';ctx.shadowBlur=active?18:(o.node.known?7:0);ctx.shadowColor='rgba(91,167,255,.7)';ctx.beginPath();ctx.arc(o.q.x,o.q.y,size,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;if(o.node.known&&front){ctx.font='500 11px "DM Mono",monospace';ctx.fillStyle=active?'#f3f6f8':'#aeb9c4';ctx.textAlign=o.q.x<cx?'right':'left';ctx.textBaseline='middle';ctx.fillText(o.node.name,o.q.x+(o.q.x<cx?-11:11),o.q.y);}});ctx.globalAlpha=1;
  }
  function schedule(){if(!raf)raf=requestAnimationFrame(draw);}
  function tick(){if(!drag){vx*=.93;vy*=.93;if(performance.now()-lastInteraction>700)targetY+=.0008;targetY+=vx*.48;targetX=clamp(targetX+vy*.48,-1.15,1.15);}rotY+=(targetY-rotY)*.085;rotX+=(targetX-rotX)*.085;dirty=true;schedule();tickRaf=requestAnimationFrame(tick);}
  function locate(x,y){const cx=w/2+pointerX*7,cy=h/2+8+pointerY*5,r=Math.min(w,h)*radius;let best=-1,dist=24;nodes.forEach((n,i)=>{const p=project(n.lat,n.lon);if(p.z<.03)return;const q=screen(p,cx,cy,r),d=Math.hypot(q.x-x,q.y-y);if(d<dist){dist=d;best=i;}});return best;}
  const pos=e=>{const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};};
  canvas.addEventListener('pointerdown',e=>{drag=true;lastInteraction=performance.now();lastX=e.clientX;lastY=e.clientY;vx=vy=0;canvas.setPointerCapture(e.pointerId);globe.classList.add('interacted');schedule();});
  canvas.addEventListener('pointermove',e=>{lastInteraction=performance.now();const p=pos(e);pointerX=(p.x/w-.5)*2;pointerY=(p.y/h-.5)*2;if(drag){const dx=e.clientX-lastX,dy=e.clientY-lastY;vx=dx*.0007;vy=dy*.0007;targetY+=dx*.008;targetX=clamp(targetX+dy*.008,-1.15,1.15);lastX=e.clientX;lastY=e.clientY;}hover=locate(p.x,p.y);schedule();},{passive:true});
  const release=e=>{drag=false;lastInteraction=performance.now();try{canvas.releasePointerCapture(e.pointerId);}catch(_){}schedule();};
  canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('pointerleave',()=>{if(!drag){hover=-1;pointerX=0;pointerY=0;schedule();}},{passive:true});
  if(prefersReducedMotion){dirty=true;draw();}else{schedule();tick();}
}
