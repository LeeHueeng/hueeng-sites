import { REGIONS, localized, t } from './i18n.js?v=20260914g';
import { renderRegionGuide } from './region-guide.js?v=20260914i';
const TAU=Math.PI*2;
export class BrainViewer {
  constructor(canvas,signal){
    this.canvas=canvas;this.ctx=canvas.getContext('2d');this.signal=signal;this.sctx=signal.getContext('2d');this.models=[];this.values={};this.history=[];this.historyTime=0;this.yaw=0;this.pitch=0;this.selected=null;this.dirty=true;this.loaded=false;this.failed=false;this.drag=null;
    REGIONS.forEach(r=>this.values[r.id]=0);
    this.renderControls();
    canvas.addEventListener('pointerdown',e=>{this.drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
    canvas.addEventListener('pointermove',e=>{if(!this.drag)return;this.yaw+=(e.clientX-this.drag.x)*.009;this.pitch=Math.max(-1.3,Math.min(1.3,this.pitch+(e.clientY-this.drag.y)*.009));this.drag={x:e.clientX,y:e.clientY};this.dirty=true;});
    const release=()=>this.drag=null;canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);
    canvas.addEventListener('keydown',e=>{if(!e.key.startsWith('Arrow'))return;e.preventDefault();e.stopPropagation();if(e.key==='ArrowLeft')this.yaw-=.12;if(e.key==='ArrowRight')this.yaw+=.12;if(e.key==='ArrowUp')this.pitch-=.12;if(e.key==='ArrowDown')this.pitch+=.12;this.pitch=Math.max(-1.3,Math.min(1.3,this.pitch));this.dirty=true;});
    document.getElementById('resetView').addEventListener('click',()=>{this.yaw=0;this.pitch=0;this.dirty=true;});
    new ResizeObserver(()=>this.dirty=true).observe(canvas);
    this.load();
  }
  async load(){try{const response=await fetch('assets/atlas/brain.json?v=20260914g');if(!response.ok)throw new Error('Atlas response');const data=await response.json();this.models=data.models;const all=this.models.find(m=>m.group==='shell').vertices;const bounds=[0,1,2].map(axis=>{let min=Infinity,max=-Infinity;for(let i=axis;i<all.length;i+=3){min=Math.min(min,all[i]);max=Math.max(max,all[i]);}return[min,max];});this.center=bounds.map(b=>(b[0]+b[1])/2);this.span=bounds[0][1]-bounds[0][0];this.loaded=true;this.dirty=true;}catch(e){this.failed=true;console.error('Anatomical atlas unavailable',e);}this.setStatus();}
  setStatus(){const el=document.getElementById('atlasStatus');el.hidden=this.loaded;el.textContent=t(this.failed?'atlasError':'atlasLoading');}
  renderControls(){
    const list=document.getElementById('regionList');
    const focused=document.activeElement?.closest('.region-row')?.dataset.region;
    list.replaceChildren();
    for(const r of REGIONS){
      const b=document.createElement('button');b.type='button';b.className='region-row';b.dataset.region=r.id;
      b.style.setProperty('--region',r.color);b.setAttribute('aria-pressed',String(this.selected===r.id));
      b.setAttribute('aria-controls','brainRegionGuide');b.classList.toggle('active',this.selected===r.id);
      b.innerHTML=`<span class="region-dot"></span><span>${localized(r.name)}</span><span class="region-code">${r.code}</span><span class="region-track"><i></i></span><span class="region-value">${Math.round(this.values[r.id]*100)}%</span>`;
      b.addEventListener('click',()=>{this.selected=this.selected===r.id?null:r.id;this.renderControls();});list.append(b);
    }
    const selected=REGIONS.find(r=>r.id===this.selected);
    document.getElementById('regionDescription').textContent=selected?localized(selected.description):'';
    renderRegionGuide(REGIONS,this.selected,id=>{this.selected=id;this.renderControls();});
    if(focused)list.querySelector(`[data-region="${focused}"]`)?.focus({preventScroll:true});
    this.setStatus();
  }
  reset(){this.history=[];this.historyTime=0;REGIONS.forEach(r=>this.values[r.id]=0);}
  update(dt,activity,advance=true){if(advance){for(const r of REGIONS){const target=Math.max(0,Math.min(1,activity?.[r.id]??.04));this.values[r.id]+=(target-this.values[r.id])*(1-Math.exp(-dt*6));}this.historyTime+=dt;if(this.historyTime>=.1){this.historyTime%=.1;this.history.push({...this.values});if(this.history.length>100)this.history.shift();}}}
  size(canvas,ctx){const rect=canvas.getBoundingClientRect();const dpr=Math.min(devicePixelRatio||1,2);const width=Math.round(rect.width*dpr),height=Math.round(rect.height*dpr);if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;ctx.setTransform(dpr,0,0,dpr,0,0);return true;}return false;}
  prepare(){this.size(this.canvas,this.ctx);const w=this.canvas.clientWidth,h=this.canvas.clientHeight,scale=Math.min(w*.88/this.span,(h-56)/(this.span*.59));this.scale=scale;
    for(const m of this.models){const points=[];let depth=0;for(let i=0;i<m.vertices.length;i+=3){const x=m.vertices[i]-this.center[0],y=m.vertices[i+1]-this.center[1],z=m.vertices[i+2]-this.center[2];const xx=x*Math.cos(this.yaw)+z*Math.sin(this.yaw),zz=-x*Math.sin(this.yaw)+z*Math.cos(this.yaw),yy=y*Math.cos(this.pitch)-zz*Math.sin(this.pitch);const depthZ=y*Math.sin(this.pitch)+zz*Math.cos(this.pitch);points.push([w/2+xx*scale,h*.45+yy*scale,depthZ]);depth+=depthZ;}m.projected=points;m.depth=depth/points.length;const path=new Path2D();for(let i=0;i<m.triangles.length;i+=3){const a=points[m.triangles[i]],b=points[m.triangles[i+1]],c=points[m.triangles[i+2]];if(!a||!b||!c)continue;const cross=(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);if(cross<0){path.moveTo(a[0],a[1]);path.lineTo(c[0],c[1]);path.lineTo(b[0],b[1]);}else{path.moveTo(a[0],a[1]);path.lineTo(b[0],b[1]);path.lineTo(c[0],c[1]);}path.closePath();}m.path=path;}
    this.dirty=false;
  }
  draw(){const c=this.ctx,w=this.canvas.clientWidth,h=this.canvas.clientHeight;if(!w||!h)return;if(this.dirty)this.prepare();c.clearRect(0,0,w,h);if(!this.loaded)return;
    c.strokeStyle='#56694618';c.lineWidth=.5;for(let x=25;x<w;x+=32){c.beginPath();c.moveTo(x,24);c.lineTo(x,h-30);c.stroke();}for(let y=28;y<h-30;y+=32){c.beginPath();c.moveTo(22,y);c.lineTo(w-22,y);c.stroke();}
    const shell=this.models.find(m=>m.group==='shell');if(shell){c.globalAlpha=.055;c.fillStyle='#b2caa4';c.fill(shell.path);c.globalAlpha=.075;c.strokeStyle='#bcceb1';c.lineWidth=.45;c.stroke(shell.path);c.globalAlpha=1;}
    const regions=this.models.filter(m=>m.group!=='shell').sort((a,b)=>a.depth-b.depth);
    for(const m of regions){const r=REGIONS.find(r=>r.id===m.group),value=this.values[m.group],dim=this.selected&&this.selected!==m.group?.27:1;c.fillStyle=r.color;c.globalAlpha=(.10+value*.30)*dim;c.fill(m.path);c.strokeStyle=r.color;c.lineWidth=.35;c.globalAlpha=(.13+value*.28)*dim;c.stroke(m.path);c.globalAlpha=(.28+value*.65)*dim;c.fillStyle=value>.82?'#ffdc9c':r.color;const step=Math.max(1,Math.floor(m.projected.length/330));for(let i=0;i<m.projected.length;i+=step){const p=m.projected[i];c.fillRect(p[0],p[1],value>.5?1.3:.8,value>.5?1.3:.8);}c.globalAlpha=1;}
    c.font='8px "IBM Plex Mono",monospace';c.textAlign='center';c.fillStyle='#7c9684';c.fillText('JFRC2 · 3D NEUROPIL SURFACES',w/2,h-37);
    for(const r of REGIONS){const row=document.querySelector(`[data-region="${r.id}"]`);if(row){const value=Math.round(this.values[r.id]*100);row.querySelector('i').style.width=`${value}%`;row.querySelector('.region-value').textContent=`${value}%`;}}
    this.drawSignal();
  }
  drawSignal(){const canvas=this.signal,c=this.sctx;this.size(canvas,c);const w=canvas.clientWidth,h=canvas.clientHeight;c.clearRect(0,0,w,h);c.strokeStyle='#44564055';c.lineWidth=.5;for(let i=0;i<=4;i++){c.beginPath();c.moveTo(0,3+i*(h-6)/4);c.lineTo(w,3+i*(h-6)/4);c.stroke();}for(const r of REGIONS){c.beginPath();c.strokeStyle=r.color;c.lineWidth=1;c.globalAlpha=this.selected&&this.selected!==r.id?.2:.85;for(let i=0;i<this.history.length;i++){const x=(100-this.history.length+i)/99*w,y=h-3-this.history[i][r.id]*(h-6);if(!i)c.moveTo(x,y);else c.lineTo(x,y);}c.stroke();}c.globalAlpha=1;}
}
