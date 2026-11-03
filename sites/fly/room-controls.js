import * as THREE from './assets/vendor/three.module.js';
import { t } from './i18n.js?v=20260914g';
import { newExposure } from './insecticide.js?v=20260914g';

const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const UP=new THREE.Vector3(0,1,0);
const MOVE_KEYS=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','KeyQ','KeyE']);
const freshActivity=()=>({visual:0,olfactory:0,navigation:0,memory:0,touch:0,motor:0});

export class RoomControls {
 constructor(room){
  this.room=room;this.keys=new Set();this.dragId=null;this.lastSelected=null;
  this.panel=document.createElement('section');this.panel.className='room-direct-controls';this.panel.setAttribute('aria-labelledby','directControlTitle');
  this.panel.innerHTML='<div class="direct-control-heading"><h3 id="directControlTitle" data-control-i18n="controlTitle"></h3><span id="directAliveCount"></span></div><div class="direct-control-actions"><button type="button" data-control-action="start" data-control-i18n="controlStart"></button><button type="button" data-control-action="free" data-control-i18n="controlFree"></button><button type="button" class="direct-kill" data-control-action="kill" data-control-i18n="controlKillSelected"></button><button type="button" class="direct-revive" data-control-action="revive" data-control-i18n="controlRevive"></button></div><p class="direct-control-hint" id="directControlHint"></p><div class="direct-control-tools" id="directControlTools"><label class="direct-altitude"><span data-control-i18n="controlHeight"></span><output id="directHeightValue" for="directHeight"></output><input id="directHeight" type="range" min="0.2" max="2.9" step="0.05"></label><div class="direct-pad"><button type="button" data-key="KeyW" data-label="controlForward">↑</button><button type="button" data-key="KeyA" data-label="controlLeft">←</button><button type="button" data-key="KeyS" data-label="controlBack">↓</button><button type="button" data-key="KeyD" data-label="controlRight">→</button></div><div class="direct-elevation-pad"><button type="button" data-key="KeyE" data-label="controlRise">+</button><button type="button" data-key="KeyQ" data-label="controlLower">−</button></div></div><p class="direct-control-note" data-control-i18n="controlNote"></p>';
  room.readout.after(this.panel);
  this.hint=this.panel.querySelector('#directControlHint');this.count=this.panel.querySelector('#directAliveCount');this.height=this.panel.querySelector('#directHeight');this.heightValue=this.panel.querySelector('#directHeightValue');this.motionTools=this.panel.querySelector('#directControlTools');
  this.buttons=Object.fromEntries([...this.panel.querySelectorAll('[data-control-action]')].map(b=>[b.dataset.controlAction,b]));
  this.buttons.start.addEventListener('click',()=>this.activate());
  this.buttons.free.addEventListener('click',()=>this.releaseSelected());
  this.buttons.kill.addEventListener('click',()=>this.kill(room.selectedFly()));
  this.buttons.revive.addEventListener('click',()=>this.revive(room.selectedFly()));
  this.height.addEventListener('input',()=>{const f=room.selectedFly();if(!f||f.dead)return;this.takeControl(f);f.controlHeight=Number(this.height.value);if(f.controlTarget)f.controlTarget.y=f.controlHeight;});
  this.marker=new THREE.Mesh(new THREE.RingGeometry(.19,.22,28),new THREE.MeshBasicMaterial({color:'#bfedb0',side:THREE.DoubleSide,transparent:true,opacity:.8,depthWrite:false}));this.marker.rotation.x=-Math.PI/2;this.marker.visible=false;room.scene.add(this.marker);
  this.events();
 }
 translate(){
  this.panel.querySelectorAll('[data-control-i18n]').forEach(el=>el.textContent=t(el.dataset.controlI18n));
  this.panel.querySelectorAll('[data-label]').forEach(el=>{el.title=t(el.dataset.label);el.setAttribute('aria-label',t(el.dataset.label));});
  this.room.renderer.domElement.setAttribute('aria-label',t('roomReady')+' '+t('controlHint')+' '+t('sprayTip'));
  this.render();
 }
 reset(){this.clearInput();this.marker.visible=false;this.lastSelected=null;}
 clearInput(){this.keys.clear();this.dragId=null;}
 onToolChange(type){
  this.clearInput();
  if(type==='controlFly'){const f=this.room.selectedFly();if(f&&!f.dead)this.takeControl(f,false);this.room.callbacks.event('controlHint');}
  else if(type==='killFly')this.room.callbacks.event('killFlyHint');
 }
 activate(){
  const f=this.room.selectedFly();if(!f||f.dead)return;
  this.room.stopSpray(false);this.room.tool='controlFly';this.onToolChange('controlFly');this.takeControl(f);this.room.translate();this.room.renderer.domElement.focus({preventScroll:true});
 }
 select(f){
  if(this.room.selected===f.id)return;
  this.clearInput();this.room.selected=f.id;this.lastSelected=f.id;document.getElementById('trackFly').value=String(f.id);this.room.callbacks.onTrack?.();this.room.updateReadout();
 }
 takeControl(f,start=true){
  if(!f||f.dead)return false;
  this.room.neural?.release(f,false);
  this.select(f);
  if(!f.manualControl){f.manualControl=true;f.controlHeight=clamp(f.pos.y,.2,2.9);f.controlTarget=null;f.vel.set(0,0,0);this.room.callbacks.event('controlTakeEvent');}
  if(start)this.room.callbacks.start?.();return true;
 }
 releaseSelected(){
  const f=this.room.selectedFly();if(!f||f.dead)return;
  f.manualControl=false;f.controlTarget=null;f.decision=0;this.clearInput();this.room.tool='move';this.room.renderer.domElement.style.cursor='grab';this.room.translate();this.room.callbacks.start?.();this.room.callbacks.event('controlAutoEvent');
 }
 kill(f){
  if(!f||f.dead)return;
  this.select(f);this.clearInput();f.dead=true;f.manualControl=false;f.controlTarget=null;f.neural=null;f.exposure={...newExposure(),condition:'dead'};f.activity=freshActivity();f.vel.set(0,0,0);f.memory=0;f.turn=0;
  for(const wing of f.wings){wing.rotation.z=.05;wing.material.opacity=.25;}
  this.room.renderFlyOptions();this.room.updateReadout();this.render();this.room.callbacks.start?.();this.room.callbacks.event('controlKillEvent');
 }
 revive(f){
  if(!f?.dead)return;
  this.clearInput();f.dead=false;f.exposure=newExposure();f.manualControl=this.room.tool==='controlFly';f.controlTarget=null;f.memory=0;f.turn=0;f.decision=0;f.vel.set(0,0,0);f.pos.y=clamp(Math.max(1,this.room.supportHeight(f)+.35),.2,2.9);this.room.resolveCollision(f);f.controlHeight=f.pos.y;f.mesh.rotation.set(0,0,0);f.mesh.position.copy(f.pos);
  for(const wing of f.wings)wing.material.opacity=.68;
  f.trail=[];f.line.geometry.setDrawRange(0,0);this.room.updateSignals(f,.016,0,0);this.room.renderFlyOptions();this.room.updateReadout();this.render();this.room.callbacks.start?.();this.room.callbacks.event('controlReviveEvent');
 }
 pickFly(event){
  const room=this.room;room.setRay(event);const hits=room.raycaster.intersectObjects(room.flies.map(f=>f.mesh),true);
  if(hits.length){let node=hits[0].object;while(node&&node.userData.flyId===undefined)node=node.parent;const f=room.flies.find(f=>f.id===node?.userData.flyId);if(f)return f;}
  // A screen-space hit margin keeps the deliberately tiny models selectable.
  const rect=room.renderer.domElement.getBoundingClientRect();let found=null,distance=event.pointerType==='touch'?27:19;
  for(const f of room.flies){const p=f.pos.clone().project(room.camera);if(p.z<-1||p.z>1)continue;const x=rect.left+(p.x+1)*rect.width/2,y=rect.top+(1-p.y)*rect.height/2,d=Math.hypot(event.clientX-x,event.clientY-y);if(d<distance){distance=d;found=f;}}
  return found;
 }
 destination(event,f){
  this.room.setRay(event);const point=new THREE.Vector3();const plane=new THREE.Plane(UP,-(f.controlHeight??f.pos.y));
  if(!this.room.raycaster.ray.intersectPlane(plane,point))return null;
  const half=this.room.size/2-.18;point.x=clamp(point.x,-half,half);point.z=clamp(point.z,-half,half);return point;
 }
 events(){
  const room=this.room,canvas=room.renderer.domElement;
  const intercept=e=>{e.preventDefault();e.stopImmediatePropagation();};
  canvas.addEventListener('pointerdown',e=>{
   if(e.button!==0||!['controlFly','killFly'].includes(room.tool))return;intercept(e);canvas.focus({preventScroll:true});
   const hit=this.pickFly(e);
   if(room.tool==='killFly'){if(hit)this.kill(hit);else room.callbacks.event('killFlyHint');return;}
   const f=hit||room.selectedFly();if(!f)return;if(f.dead){this.select(f);room.callbacks.event('controlDeadHint');return;}
   this.takeControl(f);this.dragId=e.pointerId;canvas.setPointerCapture(e.pointerId);f.controlTarget=hit?f.pos.clone():this.destination(e,f);
  },true);
  canvas.addEventListener('pointermove',e=>{
   if(!['controlFly','killFly'].includes(room.tool))return;
   if(e.pointerId!==this.dragId)return;intercept(e);const f=room.selectedFly();if(f&&!f.dead){const target=this.destination(e,f);if(target)f.controlTarget=target;}
  },true);
  canvas.addEventListener('pointerup',e=>{if(!['controlFly','killFly'].includes(room.tool))return;intercept(e);if(this.dragId===e.pointerId)this.dragId=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);},true);
  canvas.addEventListener('pointercancel',()=>this.clearInput());
  canvas.addEventListener('lostpointercapture',()=>{this.dragId=null;});
  canvas.addEventListener('keydown',e=>{
   if(room.tool!=='controlFly'||e.metaKey||e.ctrlKey||e.altKey)return;
   if(e.code==='KeyX'){intercept(e);if(!e.repeat)this.kill(room.selectedFly());return;}
   if(!MOVE_KEYS.has(e.code))return;intercept(e);const f=room.selectedFly();if(this.takeControl(f)){this.keys.add(e.code);f.controlTarget=null;}
  },true);
  canvas.addEventListener('keyup',e=>{if(MOVE_KEYS.has(e.code)){this.keys.delete(e.code);if(room.tool==='controlFly')intercept(e);}},true);
  canvas.addEventListener('blur',()=>this.clearInput());window.addEventListener('blur',()=>this.clearInput());document.addEventListener('visibilitychange',()=>{if(document.hidden)this.clearInput();});
  for(const keyButton of this.panel.querySelectorAll('[data-key]')){
   const code=keyButton.dataset.key;let held=null;
   keyButton.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();const f=room.selectedFly();if(!f||f.dead)return;room.stopSpray(false);room.tool='controlFly';this.takeControl(f);f.controlTarget=null;keyButton.setPointerCapture(e.pointerId);held=e.pointerId;this.keys.add(code);room.renderer.domElement.style.cursor='crosshair';});
   const release=()=>{this.keys.delete(code);held=null;};keyButton.addEventListener('pointerup',release);keyButton.addEventListener('pointercancel',release);keyButton.addEventListener('lostpointercapture',release);
   keyButton.addEventListener('keydown',e=>{if(e.code!=='Space'&&e.code!=='Enter')return;e.preventDefault();if(e.repeat)return;const f=room.selectedFly();if(!f||f.dead)return;room.stopSpray(false);room.tool='controlFly';this.takeControl(f);f.controlTarget=null;this.keys.add(code);});
   keyButton.addEventListener('keyup',e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();this.keys.delete(code);}});
   keyButton.addEventListener('blur',()=>{if(held===null)this.keys.delete(code);});
  }
 }
 stepDead(f,dt,sampleTrail){
  const support=this.room.supportHeight(f)+.045;f.exposure.condition='dead';f.vel.set(0,Math.max(-3,f.vel.y-dt*5),0);f.pos.y=Math.max(support,f.pos.y+f.vel.y*dt);if(f.pos.y<=support+.004)f.vel.set(0,0,0);
  f.mesh.rotation.z+=(Math.PI-f.mesh.rotation.z)*Math.min(1,dt*7);f.mesh.rotation.x+=(.2-f.mesh.rotation.x)*Math.min(1,dt*7);f.mesh.position.copy(f.pos);f.activity=freshActivity();if(sampleTrail)this.room.recordTrail(f);
 }
 stepControlled(f,dt,sampleTrail,motion,contact){
  const room=this.room,selected=room.selected===f.id&&room.tool==='controlFly';
  const key=code=>selected&&this.keys.has(code)?1:0;
  const horizontal=(key('KeyD')||key('ArrowRight'))-(key('KeyA')||key('ArrowLeft'));
  const forward=(key('KeyW')||key('ArrowUp'))-(key('KeyS')||key('ArrowDown'));
  const vertical=key('KeyE')-key('KeyQ');
  f.controlHeight=clamp((f.controlHeight??f.pos.y)+vertical*dt*1.45,.2,2.9);
  const desired=new THREE.Vector3();
  if(horizontal||forward){const ahead=new THREE.Vector3();room.camera.getWorldDirection(ahead);ahead.y=0;ahead.normalize();const right=ahead.clone().cross(UP).normalize();desired.addScaledVector(ahead,forward).addScaledVector(right,horizontal).normalize().multiplyScalar(2.2);f.controlTarget=null;}
  else if(f.controlTarget){const offset=f.controlTarget.clone().sub(f.pos);offset.y=0;if(offset.length()<.07)f.controlTarget=null;else desired.copy(offset).setLength(Math.min(2.5,offset.length()*5));}
  desired.y=(f.controlHeight-f.pos.y)*5;desired.multiplyScalar(motion.speed);
  if(contact.source&&motion.escape){const away=f.pos.clone().sub(new THREE.Vector3(contact.source.x,f.pos.y,contact.source.z));if(away.lengthSq())desired.addScaledVector(away.normalize(),motion.escape*.6);}
  desired.x+=Math.sin(room.clock*17+f.phase)*motion.jitter;desired.z+=Math.cos(room.clock*19+f.phase)*motion.jitter;
  const old=Math.atan2(f.vel.x,f.vel.z);f.vel.lerp(desired,1-Math.exp(-dt*10));if(f.vel.length()>3.4*motion.speed)f.vel.setLength(3.4*motion.speed);f.pos.addScaledVector(f.vel,dt);room.resolveCollision(f);const angle=Math.atan2(f.vel.x,f.vel.z);
  f.turn=f.vel.length()>.04?Math.abs(Math.atan2(Math.sin(angle-old),Math.cos(angle-old)))/Math.max(.001,dt):0;f.mesh.position.copy(f.pos);if(Math.hypot(f.vel.x,f.vel.z)>.03)f.mesh.rotation.y=angle+Math.PI;f.mesh.rotation.z+=(0-f.mesh.rotation.z)*Math.min(1,dt*8);f.mesh.rotation.x=Math.sin(room.clock*18+f.phase)*motion.jitter*.16;
  f.wings.forEach((wing,i)=>wing.rotation.z=(i?1:-1)*(.3+Math.sin(room.clock*100+f.phase)*.35));
  let odor=0,near=0;for(const o of room.objects){const dx=Math.abs(f.pos.x-o.x),dz=Math.abs(f.pos.z-o.z);if(o.type==='food')odor=Math.max(odor,Math.exp(-Math.hypot(dx,dz)/3));else if(f.pos.y<o.h+.4&&dx<o.w/2+.5&&dz<o.d/2+.5)near=Math.max(near,.65);}
  room.updateSignals(f,dt,odor,near);if(sampleTrail)room.recordTrail(f);
 }
 render(){
  const room=this.room,f=room.selectedFly();
  if(this.lastSelected!==room.selected){this.clearInput();this.lastSelected=room.selected;}
  this.count.textContent=t('controlPopulation',{alive:room.flies.filter(f=>!f.dead).length,total:room.flies.length});
  this.panel.dataset.state=f?.dead?'dead':f?.manualControl?'controlled':'normal';
  this.hint.textContent=t(f?.dead?'controlDeadHint':room.tool==='killFly'?'killFlyHint':room.tool==='controlFly'?'controlHint':'controlIdleHint');
  this.buttons.start.disabled=!f||!!f.dead;this.buttons.kill.disabled=!f||!!f.dead;this.buttons.revive.disabled=!f?.dead;this.buttons.free.disabled=!f||!!f.dead||!f.manualControl;
  this.motionTools.hidden=room.tool!=='controlFly';this.height.disabled=!f||!!f.dead;
  this.panel.querySelectorAll('[data-key]').forEach(button=>button.disabled=!f||!!f.dead);
  if(f){const height=f.controlHeight??f.pos.y;if(document.activeElement!==this.height)this.height.value=String(clamp(height,.2,2.9));this.heightValue.textContent=Number(f.pos.y).toFixed(2);}
  this.marker.visible=!!f&&!f.dead&&!!f.controlTarget&&room.tool==='controlFly';if(this.marker.visible)this.marker.position.copy(f.controlTarget);
  if(room.ring&&f)room.ring.material.color.set(f.dead?'#e98570':f.exposure.condition==='knocked'?'#efa77a':f.manualControl?'#b3f0cc':'#ffe79a');
 }
}
