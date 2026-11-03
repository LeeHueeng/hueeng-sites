import * as THREE from './assets/vendor/three.module.js';
import {humanText as text} from './room-human-i18n.js?v=20260914k';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),UP=new THREE.Vector3(0,1,0),TAU=Math.PI*2;
const KEYS=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight']);
const fresh=()=>({risk:0,hold:0,memory:0,visible:0,loom:0,motion:0,angle:0,mask:0,bearing:0,history:[],state:'idle',source:new THREE.Vector3(),away:new THREE.Vector3(0,0,1)});
// Visual expansion and directional avoidance are inspired by looming studies, not a
// fitted human-recognition or connectome model: doi:10.1038/nature24626;
// doi:10.1038/s41586-022-05562-8. Flight is not given a walking-only freezing reflex.
export class HumanObserver{
 constructor(room){
  this.room=room;this.enabled=true;this.mode='patrol';this.speed=1;this.path=[];this.keys=new Set();this.position=new THREE.Vector3();this.velocity=new THREE.Vector3();this.sensor=new THREE.Raycaster();this.senseElapsed=0;this.uiElapsed=0;this.replan=0;this.wait=0;this.wave=0;this.stride=0;this.selected=null;this.dragId=null;
  this.createActor();this.createPanel();this.events();this.layoutChanged();this.translate();
 }
 createActor(){
  this.actor=new THREE.Group();this.room.scene.add(this.actor);
  const material=color=>new THREE.MeshStandardMaterial({color,roughness:.85});
  this.skin=material('#d7b08a');this.shirt=material('#b58d63');this.trousers=material('#576c68');this.hair=material('#493e31');this.shoes=material('#35433b');
  const sphere=(radius,mat,parent,x,y,z,sx=1,sy=1,sz=1)=>{const mesh=new THREE.Mesh(new THREE.SphereGeometry(radius,14,10),mat);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);mesh.castShadow=true;parent.add(mesh);return mesh;};
  const cylinder=(top,bottom,height,mat,parent,x,y,z)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(top,bottom,height,12),mat);mesh.position.set(x,y,z);mesh.castShadow=true;parent.add(mesh);return mesh;};
  cylinder(.25,.22,.61,this.shirt,this.actor,0,1.17,0);sphere(.235,this.trousers,this.actor,0,.83,0,1,.55,.72);
  cylinder(.075,.085,.13,this.skin,this.actor,0,1.51,0);sphere(.155,this.skin,this.actor,0,1.68,0,1,1.13,.93);sphere(.155,this.hair,this.actor,0,1.755,-.022,1, .58,1);sphere(.037,this.skin,this.actor,0,1.68,.145, .65,.8,1);
  this.legs=[];this.arms=[];
  for(const side of [-1,1]){
   const leg=new THREE.Group();leg.position.set(side*.115,.85,0);this.actor.add(leg);cylinder(.082,.065,.68,this.trousers,leg,0,-.34,0);sphere(.083,this.shoes,leg,0,-.75,.045,1,.68,1.8);this.legs.push(leg);
   const arm=new THREE.Group();arm.position.set(side*.285,1.39,0);this.actor.add(arm);sphere(.10,this.shirt,arm,0,0,0);cylinder(.075,.06,.24,this.shirt,arm,0,-.12,0);cylinder(.057,.045,.29,this.skin,arm,0,-.385,0);sphere(.065,this.skin,arm,0,-.565,0,.85,1.25,.8);this.arms.push(arm);
  }
  const ring=new THREE.Mesh(new THREE.RingGeometry(.35,.38,40),new THREE.MeshBasicMaterial({color:'#e6c48c',side:THREE.DoubleSide,transparent:true,opacity:.7,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.014;this.actor.add(ring);
  this.destination=new THREE.Mesh(new THREE.RingGeometry(.19,.23,32),new THREE.MeshBasicMaterial({color:'#e9cf87',side:THREE.DoubleSide,transparent:true,opacity:.8,depthWrite:false}));this.destination.rotation.x=-Math.PI/2;this.destination.visible=false;this.room.scene.add(this.destination);
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(6),3));
  this.sightLine=new THREE.Line(geometry,new THREE.LineBasicMaterial({color:'#c8d796',transparent:true,opacity:.45,depthWrite:false}));this.sightLine.frustumCulled=false;this.sightLine.visible=false;this.room.scene.add(this.sightLine);
  this.samples=Array.from({length:5},(_,index)=>({point:new THREE.Vector3(),previous:new THREE.Vector3(),velocity:new THREE.Vector3(),radius:[.16,.3,.25,.075,.075][index]}));
 }
 createPanel(){
  this.panel=document.createElement('section');this.panel.className='room-human-observer';this.panel.setAttribute('aria-labelledby','roomHumanTitle');
  this.panel.innerHTML='<div class="room-human-heading"><h3 id="roomHumanTitle" data-human="title"></h3><label class="room-human-toggle"><input type="checkbox" data-input="enabled" checked><span data-human="enabled"></span></label></div><div class="room-human-actions"><button type="button" data-action="patrol" data-human="walk"></button><button type="button" data-action="approach" data-human="approach"></button><button type="button" data-action="manual" data-human="move"></button><button type="button" data-action="wave" data-human="wave"></button><button type="button" data-action="still" data-human="stop"></button></div><label class="room-human-speed"><span data-human="speed"></span><input type="range" data-input="speed" min="0.2" max="2.4" step="0.1" value="1"><output data-value="speed"></output></label><p class="room-human-hint" data-value="hint"></p><div class="room-human-content"><div class="room-human-thought"><small data-human="badge"></small><h4 data-value="state" role="status" aria-live="polite"></h4><p data-value="thought"></p><canvas class="room-human-diagram"></canvas></div><div><dl class="room-human-metrics"><div><dt data-human="visible"></dt><dd data-value="visible"></dd></div><div><dt data-human="expansion"></dt><dd data-value="loom"></dd></div><div><dt data-human="movement"></dt><dd data-value="motion"></dd></div><div><dt data-human="avoidance"></dt><dd data-value="risk"></dd><span class="room-human-meter"><i></i></span></div></dl><ol class="room-human-history"></ol></div></div><p class="room-human-note" data-human="note"></p>';
  this.room.readout.after(this.panel);this.nodes=Object.fromEntries([...this.panel.querySelectorAll('[data-value]')].map(node=>[node.dataset.value,node]));this.canvas=this.panel.querySelector('canvas');this.context=this.canvas.getContext('2d');this.meter=this.panel.querySelector('.room-human-meter i');this.history=this.panel.querySelector('ol');
  this.bubble=document.createElement('div');this.bubble.className='room-human-bubble';this.bubble.hidden=true;this.bubble.innerHTML='<small></small><span></span>';this.room.container.append(this.bubble);
 }
 translate(){this.panel.querySelectorAll('[data-human]').forEach(node=>node.textContent=text(node.dataset.human));this.canvas.setAttribute('aria-label',text('view'));this.history.setAttribute('aria-label',text('history'));this.bubble.querySelector('small').textContent=text('badge');this.nodes.hint.textContent=text('hint');this.nodes.hint.dataset.error='false';if(this.room.tool!=='humanMove')this.keys.clear();this.uiElapsed=1;this.render();}
 events(){
  this.panel.querySelector('[data-input=enabled]').addEventListener('change',event=>{this.enabled=event.target.checked;this.keys.clear();this.velocity.set(0,0,0);for(const fly of this.room.flies)fly.humanSense=fresh();this.refreshSamples(0);if(this.enabled)this.room.callbacks.start?.();this.uiElapsed=1;this.render();});
  this.panel.querySelector('[data-input=speed]').addEventListener('input',event=>{this.speed=Number(event.target.value);this.nodes.speed.textContent=this.speed.toFixed(1)+' m/s';});
  this.panel.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>{
   this.enabled=true;this.panel.querySelector('[data-input=enabled]').checked=true;const action=button.dataset.action;
   if(action==='wave')this.wave=2.6;
   else{this.mode=action;this.path=[];this.keys.clear();this.replan=0;this.wait=0;if(action==='still')this.velocity.set(0,0,0);}
   if(action==='manual'){this.room.stopSpray(false);this.room.tool='humanMove';this.room.manual.clearInput();this.room.renderer.domElement.style.cursor='crosshair';}
   else if(action!=='wave'&&this.room.tool==='humanMove'){this.room.tool='move';this.room.renderer.domElement.style.cursor='grab';}
   this.room.translate();this.room.callbacks.start?.();if(action==='manual')this.room.renderer.domElement.focus({preventScroll:true});
  }));
  const canvas=this.room.renderer.domElement,intercept=event=>{event.preventDefault();event.stopImmediatePropagation();};
  canvas.addEventListener('pointerdown',event=>{if(this.room.tool!=='humanMove'||event.button!==0)return;intercept(event);canvas.focus({preventScroll:true});this.room.setRay(event);const hit=this.room.raycaster.intersectObject(this.room.floor)[0];if(!hit)return;this.enabled=true;this.mode='manual';this.keys.clear();this.setRoute(hit.point,false);this.dragId=event.pointerId;canvas.setPointerCapture(event.pointerId);this.room.callbacks.start?.();},true);
  canvas.addEventListener('pointermove',event=>{if(this.room.tool==='humanMove'&&event.pointerId===this.dragId)intercept(event);},true);
  canvas.addEventListener('pointerup',event=>{if(this.room.tool!=='humanMove')return;intercept(event);this.dragId=null;if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);},true);
  canvas.addEventListener('keydown',event=>{if(this.room.tool!=='humanMove'||!KEYS.has(event.code)||event.metaKey||event.ctrlKey||event.altKey)return;intercept(event);this.enabled=true;this.mode='manual';this.keys.add(event.code);this.path=[];this.room.callbacks.start?.();},true);
  canvas.addEventListener('keyup',event=>{if(!KEYS.has(event.code))return;this.keys.delete(event.code);if(this.room.tool==='humanMove')intercept(event);},true);
  const clear=()=>{this.keys.clear();this.dragId=null;};canvas.addEventListener('blur',clear);canvas.addEventListener('pointercancel',clear);canvas.addEventListener('lostpointercapture',()=>this.dragId=null);window.addEventListener('blur',clear);document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
 }
 passable(x,z){const half=this.room.size/2-.4;if(Math.abs(x)>half||Math.abs(z)>half)return false;return !this.room.objects.some(object=>Math.abs(x-object.x)<object.w/2+.36&&Math.abs(z-object.z)<object.d/2+.36);}
 layoutChanged(){
  const count=Math.ceil(this.room.size/.4),cell=this.room.size/count;this.grid={count,cell,open:new Uint8Array(count*count)};
  for(let z=0;z<count;z++)for(let x=0;x<count;x++){const point=this.gridPoint(z*count+x);this.grid.open[z*count+x]=Number(this.passable(point.x,point.z));}
  if(!this.passable(this.position.x,this.position.z)){const index=this.nearest(this.position);if(index>=0)this.position.copy(this.gridPoint(index));}
  this.path=[];this.replan=0;this.wait=0;this.velocity.set(0,0,0);this.actor.position.copy(this.position);this.actor.updateMatrixWorld(true);this.refreshSamples(0);for(const fly of this.room.flies)fly.humanSense=fresh();
 }
 gridPoint(index){const {count,cell}=this.grid;return new THREE.Vector3(-this.room.size/2+(index%count+.5)*cell,0,-this.room.size/2+(Math.floor(index/count)+.5)*cell);}
 nearest(point){let best=-1,distance=Infinity;for(let index=0;index<this.grid.open.length;index++){if(!this.grid.open[index])continue;const p=this.gridPoint(index),d=(p.x-point.x)**2+(p.z-point.z)**2;if(d<distance){distance=d;best=index;}}return best;}
 route(target){
  const start=this.nearest(this.position),goal=this.nearest(target);if(start<0||goal<0)return null;
  const {count,open}=this.grid,parent=new Int32Array(open.length).fill(-1),queue=new Int32Array(open.length);let head=0,tail=1;queue[0]=start;parent[start]=start;
  while(head<tail&&parent[goal]<0){const index=queue[head++],x=index%count,z=Math.floor(index/count);for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,zz=z+dz;if(xx<0||zz<0||xx>=count||zz>=count)continue;const next=zz*count+xx;if(!open[next]||parent[next]>=0)continue;parent[next]=index;queue[tail++]=next;}}
  if(parent[goal]<0)return null;const path=[];for(let at=goal;at!==start;at=parent[at])path.push(this.gridPoint(at));path.push(this.gridPoint(start));return path.reverse();
 }
 setRoute(target,quiet=true){const path=this.route(target);if(!path){if(!quiet){this.nodes.hint.textContent=text('blocked');this.nodes.hint.dataset.error='true';}return false;}this.path=path;this.destination.position.copy(path[path.length-1]);this.destination.position.y=.02;if(!quiet){this.nodes.hint.textContent=text('hint');this.nodes.hint.dataset.error='false';}return true;}
 move(displacement){const parts=Math.max(1,Math.ceil(displacement.length()/.07));for(let i=0;i<parts;i++){const x=this.position.x+displacement.x/parts,z=this.position.z+displacement.z/parts;if(this.passable(x,this.position.z))this.position.x=x;if(this.passable(this.position.x,z))this.position.z=z;}}
 update(dt){
  if(!Number.isFinite(dt)||dt<=0)return;this.uiElapsed+=dt;
  if(!this.enabled){this.actor.visible=false;this.destination.visible=false;this.sightLine.visible=false;return;}
  this.actor.visible=true;const before=this.position.clone();this.replan-=dt;this.wait-=dt;this.wave=Math.max(0,this.wave-dt);
  if(this.room.tool!=='humanMove')this.keys.clear();
  if(this.mode==='manual'&&this.keys.size){const ahead=new THREE.Vector3();this.room.camera.getWorldDirection(ahead);ahead.y=0;ahead.normalize();const right=ahead.clone().cross(UP).normalize(),has=(a,b)=>this.keys.has(a)||this.keys.has(b)?1:0,forward=has('KeyW','ArrowUp')-has('KeyS','ArrowDown'),side=has('KeyD','ArrowRight')-has('KeyA','ArrowLeft'),delta=ahead.multiplyScalar(forward).addScaledVector(right,side);if(delta.lengthSq())this.move(delta.normalize().multiplyScalar(this.speed*dt));}
  else{
   if(this.mode==='approach'&&this.replan<=0){const fly=this.room.selectedFly();if(fly&&!fly.dead)this.setRoute(fly.pos);else this.path=[];this.replan=.9;}
   if(this.mode==='patrol'&&!this.path.length&&this.wait<=0){for(let attempt=0;attempt<8;attempt++){const target=new THREE.Vector3((Math.random()-.5)*(this.room.size-1),0,(Math.random()-.5)*(this.room.size-1));if(target.distanceTo(this.position)>1.8&&this.setRoute(target))break;}this.wait=1.5;}
   if(this.mode!=='still'&&this.path.length){let budget=this.speed*dt;while(budget>0&&this.path.length){const target=this.path[0],offset=target.clone().sub(this.position);offset.y=0;const distance=offset.length();if(distance<.04){this.path.shift();continue;}const amount=Math.min(distance,budget);this.move(offset.multiplyScalar(amount/distance));budget-=amount;if(this.position.distanceTo(target)<.05)this.path.shift();else break;}}
  }
  this.velocity.copy(this.position).sub(before).divideScalar(dt);const moving=this.velocity.length();this.stride+=moving*dt*7;
  if(moving>.02)this.actor.rotation.y=Math.atan2(this.velocity.x,this.velocity.z);
  this.actor.position.copy(this.position);this.actor.position.y=Math.sin(this.stride*2)*Math.min(.018,moving*.01);
  this.legs.forEach((leg,index)=>leg.rotation.x=Math.sin(this.stride+index*Math.PI)*Math.min(.38,moving*.3));
  this.arms.forEach((arm,index)=>{arm.rotation.x=-Math.sin(this.stride+index*Math.PI)*Math.min(.35,moving*.3);arm.rotation.z=(index?1:-1)*.08;});
  if(this.wave>0){this.arms[1].rotation.z=-2.1+Math.sin(this.room.clock*12)*.38;this.arms[1].rotation.x=.25;}
  this.actor.updateMatrixWorld(true);this.refreshSamples(dt);this.senseElapsed+=dt;
  if(this.senseElapsed>=.05){const elapsed=this.senseElapsed;this.senseElapsed=0;this.room.objectGroup.updateMatrixWorld(true);for(const fly of this.room.flies)this.perceive(fly,elapsed);}
 }
 refreshSamples(dt){
  const points=[new THREE.Vector3(0,1.68,0),new THREE.Vector3(0,1.2,0),new THREE.Vector3(0,.83,0)];points.forEach(point=>point.applyMatrix4(this.actor.matrixWorld));for(const arm of this.arms)points.push(new THREE.Vector3(0,-.565,0).applyMatrix4(arm.matrixWorld));
  this.samples.forEach((sample,index)=>{sample.previous.copy(sample.point);sample.point.copy(points[index]);if(dt>0)sample.velocity.copy(sample.point).sub(sample.previous).divideScalar(dt);else sample.velocity.set(0,0,0);});
 }
 perceive(fly,dt){
  const sense=fly.humanSense??=fresh();
  if(fly.dead||fly.exposure.condition==='knocked'){sense.visible=0;sense.loom=0;sense.motion=0;sense.risk=0;sense.hold=0;sense.memory=0;this.setState(sense,fly.dead?'dead':'knocked');return;}
  let visible=0,mask=0,loom=0,motion=0,angle=0,salience=-1;const directions=[];
  for(const [index,sample] of this.samples.entries()){
   const offset=sample.point.clone().sub(fly.pos),distance=Math.max(.06,offset.length()),direction=offset.clone().divideScalar(distance);this.sensor.set(fly.pos,direction);this.sensor.near=.02;this.sensor.far=Math.max(.021,distance-.06);
   if(this.sensor.intersectObjects(this.room.objectGroup.children,true).length)continue;
   visible++;mask|=1<<index;directions.push(direction);const relative=sample.velocity.clone().sub(fly.vel),closing=-relative.dot(direction),angularMotion=relative.clone().addScaledVector(direction,closing).length()/distance,expansion=2*sample.radius*Math.max(0,closing)/(distance*distance+sample.radius*sample.radius);
   loom=Math.max(loom,expansion);motion=Math.max(motion,angularMotion);angle=Math.max(angle,2*Math.atan2(sample.radius,distance));
   const score=expansion+angularMotion*.15+sample.radius/distance*.1;if(score>salience){salience=score;sense.source.copy(sample.point);}
  }
  for(let a=0;a<directions.length;a++)for(let b=a+1;b<directions.length;b++)angle=Math.max(angle,Math.acos(clamp(directions[a].dot(directions[b]),-1,1)));
  if(mask&&mask===sense.mask)loom=Math.max(loom,Math.max(0,(angle-sense.angle)/dt));
  sense.angle=angle;sense.mask=mask;sense.visible=visible/5;sense.loom=loom;sense.motion=motion;
  const input=sense.visible*(clamp(loom/.9,0,1)*.8+clamp(motion/2.2,0,1)*.22+clamp(angle/1.4,0,1)*.1),blend=1-Math.exp(-dt/(input>sense.risk?.09:.6));sense.risk+=(clamp(input,0,1)-sense.risk)*blend;
  sense.memory=Math.max(sense.risk,sense.memory*Math.exp(-dt/1.8));sense.hold=Math.max(0,sense.hold-dt);
  if(sense.risk>.42)sense.hold=.65;
  if(visible){sense.away.copy(fly.pos).sub(sense.source);sense.away.y*=.35;if(sense.away.lengthSq()<1e-5)sense.away.set(1,.1,0);sense.away.normalize();const heading=Math.hypot(fly.vel.x,fly.vel.z)>.04?Math.atan2(fly.vel.x,fly.vel.z):fly.mesh.rotation.y-Math.PI;sense.bearing=Math.atan2(sense.source.x-fly.pos.x,sense.source.z-fly.pos.z)-heading;sense.bearing=Math.atan2(Math.sin(sense.bearing),Math.cos(sense.bearing));}
  const state=fly.manualControl||fly.neural?'external':!visible?'hidden':sense.hold>0?'escape':sense.risk>.14?'watch':sense.memory>.22?'settle':'idle';this.setState(sense,state);
 }
 setState(sense,state){if(sense.state!==state){sense.state=state;sense.history.unshift({time:this.room.clock,state});sense.history.length=Math.min(4,sense.history.length);}}
 applyMotion(fly,desired){const sense=fly.humanSense;if(!this.enabled||!sense||fly.manualControl||fly.neural||fly.dead||fly.exposure.condition==='knocked')return;const intensity=sense.hold>0?Math.max(.55,sense.risk):sense.risk*.3;if(intensity>.03){const escape=sense.away.clone().multiplyScalar(2.5);escape.y=clamp(escape.y+.2,-.8,1);desired.lerp(escape,clamp(intensity,0,.92));}}
 speedGain(fly){return this.enabled&&!fly.neural&&!fly.manualControl&&fly.humanSense?.hold>0?1+.6*fly.humanSense.risk:1;}
 turnRate(fly){return this.enabled&&!fly.neural&&!fly.manualControl&&fly.humanSense?.hold>0?9:2.2;}
 applySignals(fly){const sense=fly.humanSense;if(!this.enabled||!sense||fly.dead)return;fly.activity.visual=clamp(Math.max(fly.activity.visual,sense.visible*(.15+Math.min(1,sense.motion)*.2+sense.risk*.65)),0,1);fly.activity.navigation=clamp(fly.activity.navigation+sense.risk*.35,0,1);fly.activity.memory=clamp(Math.max(fly.activity.memory,sense.memory*.7),0,1);if(!fly.manualControl&&!fly.neural&&sense.hold>0)fly.activity.motor=Math.max(fly.activity.motor,.65+sense.risk*.3);}
 resolveFly(fly){if(!this.enabled||fly.dead||fly.pos.y>1.89)return;const radius=fly.pos.y>1.51?.22:fly.pos.y<.7?.25:.34,dx=fly.pos.x-this.position.x,dz=fly.pos.z-this.position.z,d=Math.hypot(dx,dz);if(d>=radius)return;const normal=new THREE.Vector3(dx||.001,0,dz).normalize();fly.pos.x=this.position.x+normal.x*radius;fly.pos.z=this.position.z+normal.z*radius;const inward=fly.vel.dot(normal);if(inward<0)fly.vel.addScaledVector(normal,-inward);}
 reset(){this.keys.clear();this.path=[];this.replan=0;this.wait=0;this.wave=0;this.velocity.set(0,0,0);this.senseElapsed=0;this.uiElapsed=1;this.selected=null;this.refreshSamples(0);}
 direction(sense){const angle=sense?.bearing??0;return text(Math.abs(angle)<Math.PI/4?'front':Math.abs(angle)>Math.PI*.75?'back':angle>0?'right':'left');}
 render(){
  const fly=this.room.selectedFly(),sense=fly?.humanSense,state=!fly?'empty':fly.dead?'dead':!this.enabled?'absent':fly.exposure.condition==='knocked'?'knocked':sense?.state??'idle';this.actor.visible=this.enabled;this.destination.visible=this.enabled&&this.mode==='manual'&&this.path.length>0;
  this.panel.querySelectorAll('[data-action]').forEach(button=>{if(button.dataset.action!=='wave')button.setAttribute('aria-pressed',String(this.enabled&&this.mode===button.dataset.action));});
  const thought=text('thought_'+state,{direction:this.direction(sense)});this.bubble.hidden=!this.enabled||!fly||fly.dead;
  if(!this.bubble.hidden){this.room.camera.updateMatrixWorld();const projected=fly.pos.clone().project(this.room.camera),w=this.room.container.clientWidth,h=this.room.container.clientHeight;this.bubble.hidden=projected.z<-1||projected.z>1||Math.abs(projected.x)>1||Math.abs(projected.y)>1;if(!this.bubble.hidden){this.bubble.querySelector('span').textContent=thought;this.bubble.style.left=clamp((projected.x+1)*w/2+12,8,Math.max(8,w-this.bubble.offsetWidth-8))+'px';this.bubble.style.top=clamp((1-projected.y)*h/2-this.bubble.offsetHeight-14,8,Math.max(8,h-this.bubble.offsetHeight-8))+'px';}}
  this.sightLine.visible=!!fly&&this.enabled&&!fly.dead&&fly.exposure.condition!=='knocked'&&!!sense?.visible;
  if(this.sightLine.visible){const positions=this.sightLine.geometry.attributes.position;positions.setXYZ(0,fly.pos.x,fly.pos.y,fly.pos.z);positions.setXYZ(1,sense.source.x,sense.source.y,sense.source.z);positions.needsUpdate=true;this.sightLine.material.color.set(sense.hold>0?'#e9a275':'#b4cf97');}
  if(this.selected===fly?.id&&this.uiElapsed<.1&&this.panel.dataset.state===state)return;this.selected=fly?.id;this.uiElapsed=0;this.panel.dataset.state=state;
  this.panel.querySelector('[data-input=enabled]').checked=this.enabled;this.nodes.speed.textContent=this.speed.toFixed(1)+' m/s';this.nodes.state.textContent=(fly?text('tracked',{id:String(fly.id).padStart(3,'0')})+' / ':'')+text(state);this.nodes.thought.textContent=thought;
  const responding=this.enabled&&!!fly&&!fly.dead&&fly.exposure.condition!=='knocked',risk=responding?sense?.risk??0:0;this.nodes.visible.textContent=Math.round((responding?sense?.visible??0:0)*5)+' / 5';this.nodes.loom.textContent=((responding?sense?.loom??0:0)*180/Math.PI).toFixed(1)+' °/s';this.nodes.motion.textContent=((responding?sense?.motion??0:0)*180/Math.PI).toFixed(1)+' °/s';this.nodes.risk.textContent=Math.round(risk*100)+' / 100';this.meter.style.width=Math.round(risk*100)+'%';
  this.history.replaceChildren();for(const record of responding?sense?.history??[]:[]){const item=document.createElement('li'),time=document.createElement('time'),label=document.createElement('span');time.textContent=record.time.toFixed(1)+' s';label.textContent=text(record.state);item.append(time,label);this.history.append(item);}this.drawDiagram(responding?sense:null);
 }
 drawDiagram(sense){
  const c=this.context,w=this.canvas.clientWidth||260,h=112,dpr=Math.min(devicePixelRatio||1,2);if(this.canvas.width!==Math.round(w*dpr)||this.canvas.height!==Math.round(h*dpr)){this.canvas.width=Math.round(w*dpr);this.canvas.height=Math.round(h*dpr);c.setTransform(dpr,0,0,dpr,0,0);}c.clearRect(0,0,w,h);c.fillStyle='#14261e';c.fillRect(0,0,w,h);c.strokeStyle='#829b5530';c.lineWidth=.6;
  for(let x=12;x<w;x+=19){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}for(let y=12;y<h;y+=19){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
  c.setLineDash([3,4]);c.strokeStyle='#c4d08c55';c.beginPath();c.moveTo(w/2,12);c.lineTo(w/2,h-20);c.stroke();c.setLineDash([]);
  if(sense?.visible){const x=w/2+sense.bearing/TAU*w,size=clamp(sense.angle/Math.PI*h*1.7,12,83);for(const xx of [x-w,x,x+w]){c.fillStyle=sense.hold>0?'#ddad7bb0':'#b5c795a0';c.beginPath();c.ellipse(xx,h/2-size*.25,size*.13,size*.14,0,0,TAU);c.fill();c.fillRect(xx-size*.16,h/2-size*.09,size*.32,size*.45);if(sense.loom>.1){c.strokeStyle='#eccd8788';c.lineWidth=1.3;c.beginPath();c.arc(xx,h/2,size*.55+3,0,TAU);c.stroke();}}}
  c.fillStyle='#aabb90';c.font='10px monospace';c.textAlign='center';c.fillText(text('front'),w/2,h-7);c.textAlign='left';c.fillText(text('left'),8,h-7);c.textAlign='right';c.fillText(text('right'),w-8,h-7);
 }
}
