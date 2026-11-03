import {BrainViewer} from './brain.js?v=20260914i';
import {REGIONS,localized} from './i18n.js?v=20260914g';
import {tr} from './monitor-fly-i18n.js?v=20260914n';
const clamp=value=>Math.max(0,Math.min(1,value));
// Reuse the anatomical atlas renderer without inserting the shared room guide.
export class MonitorBrain extends BrainViewer{
 renderControls(){
  const list=document.getElementById('regionList'),focused=document.activeElement?.closest('.region-row')?.dataset.region;list.replaceChildren();
  for(const region of REGIONS){
   const button=document.createElement('button');button.type='button';button.className='region-row';button.dataset.region=region.id;button.style.setProperty('--region',region.color);button.setAttribute('aria-pressed',String(this.selected===region.id));button.setAttribute('aria-controls','regionDescription');button.classList.toggle('active',this.selected===region.id);
   const dot=document.createElement('span');dot.className='region-dot';const name=document.createElement('span');name.className='region-name';name.textContent=localized(region.name);const code=document.createElement('span');code.className='region-code';code.textContent=region.code;const track=document.createElement('span');track.className='region-track';track.append(document.createElement('i'));const value=document.createElement('span');value.className='region-value';value.textContent=Math.round((this.values[region.id]||0)*100)+'%';button.append(dot,name,code,track,value);
   button.addEventListener('click',()=>{this.selected=this.selected===region.id?null:region.id;this.renderControls();});list.append(button);
  }
  const selected=REGIONS.find(region=>region.id===this.selected),description=document.getElementById('regionDescription');description.textContent=selected?localized(selected.description):tr('brainHint');
  this.canvas.setAttribute('aria-label',tr('brainAria'));this.signal.setAttribute('aria-label',tr('brainSignal'));this.setStatus();
  if(focused)list.querySelector(`[data-region="${focused}"]`)?.focus({preventScroll:true});
 }
 reset(){super.reset();this.trackedFly=null;}
 follow(fly,dt,advance){
  if(fly&&this.trackedFly!==fly.id){super.reset();this.trackedFly=fly.id;}
  const label=document.getElementById('mBrainSubject');label.textContent=fly?'#'+String(fly.id).padStart(3,'0'):tr('waiting');
  let activity={visual:0,olfactory:0,navigation:0,memory:0,touch:0,motor:0};
  if(fly){const flying=fly.mode==='flying',walking=fly.mode==='walking',grooming=fly.mode==='grooming';activity={visual:clamp(.06+fly.detected*.65+fly.threat*.2+(flying?.15:walking?.1:0)),olfactory:.015,navigation:clamp((flying?.76:walking?.48:grooming?.09:.035)+fly.threat*.16),memory:clamp(fly.memory||0),touch:flying?.015:grooming?.72:walking?.5:.22,motor:flying?.94:walking?.6:grooming?.38:.035};}
  this.update(dt,activity,advance);this.draw();
 }
}
