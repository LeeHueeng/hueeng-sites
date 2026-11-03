import {sharedTransport,liveEnvironment,advanceEnvironment,sample,localWind} from './placement-transport.js?v=20260914j';
export const SIZE=14,DT=1/60;
export const SHAPES={desk:{w:2,d:1.3,h:1.5},bed:{w:2.2,d:3.1,h:.75},plant:{w:.9,d:.9,h:2.2}};
export const OBSTACLES=[{type:'desk',x:-2,z:2},{type:'bed',x:2,z:-1},{type:'plant',x:-4,z:-3}];
export const HOME={x:0,z:5.1};
export const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
const angle=value=>Math.atan2(Math.sin(value),Math.cos(value));
const length=(x,z)=>Math.hypot(x,z);
const NODES=['visual','olfactory','navigation','memory','reflex','left','right','flight','groom'];
// A hand-authored rate controller and fictional fly-to-human motor decoder.
// No FlyWire connectivity or learned biological weights are loaded here.
// Inspiration: doi:10.1038/s41467-022-32247-7 and doi:10.1038/s41592-024-02497-y.
export class HumanBodyModel{
 constructor(){this.settings={visual:1,odor:1,reflex:1,decoder:true,mass:72,auto:true};this.reset('sandbox');}
 reset(mode='sandbox'){
  this.mode=mode;this.time=0;this.done=false;this.won=false;this.collected=0;this.falls=0;this.energy=100;this.score=0;this.pickup=0;this.pickupId=null;this.cooldown=0;this.fallTimer=0;this.flash=0;this.status='search';this.trail=[];this.remembered=[];this.commands=Array.from({length:8},()=>({left:0,right:0,flight:0,groom:0}));this.commandIndex=0;
  this.body={x:HOME.x,z:HOME.z,y:0,vx:0,vz:0,vy:0,yaw:Math.PI,omega:0,roll:0,rollV:0,phase:0,arm:0,fallen:false};
  this.nodes=Object.fromEntries(NODES.map(key=>[key,0]));this.sensors={odor:0,left:0,right:0,loom:0,threat:0,touch:0};
  this.foods=[{id:1,x:-4.7,z:3.8,active:true},{id:2,x:4.8,z:2.5,active:true},{id:3,x:0,z:-4.8,active:true}];
  this.balls=[{id:1,x:4,z:-4.5,y:.85,r:.64,vx:-1.45,vz:.47}];this.rebuildEnvironment(false);
 }
 rebuildEnvironment(keep=true){
  const old=this.environment?.odor,config={size:SIZE,accuracy:'precise',wind:'east',obstacles:OBSTACLES,foods:this.foods.filter(food=>food.active),devices:[]};
  const shared=sharedTransport(config,SHAPES,{x:.28,z:0});this.environment=liveEnvironment(config,shared);if(keep&&old?.length===this.environment.odor.length)this.environment.odor.set(old);this.environmentStart=this.time;
 }
 blocked(x,z,y=0,radius=.3){if(Math.abs(x)>SIZE/2-radius||Math.abs(z)>SIZE/2-radius)return true;return OBSTACLES.some(object=>{const shape=SHAPES[object.type];return y<shape.h&&Math.abs(x-object.x)<shape.w/2+radius&&Math.abs(z-object.z)<shape.d/2+radius;});}
 visible(from,to){
  for(const object of OBSTACLES){const shape=SHAPES[object.type],lower=[object.x-shape.w/2,0,object.z-shape.d/2],upper=[object.x+shape.w/2,shape.h,object.z+shape.d/2],a=[from.x,from.y,from.z],b=[to.x,to.y,to.z];let near=0,far=1;
   for(let axis=0;axis<3;axis++){const delta=b[axis]-a[axis];if(Math.abs(delta)<1e-8){if(a[axis]<lower[axis]||a[axis]>upper[axis]){near=2;break;}}else{const p=(lower[axis]-a[axis])/delta,q=(upper[axis]-a[axis])/delta;near=Math.max(near,Math.min(p,q));far=Math.min(far,Math.max(p,q));if(near>far)break;}}if(near<=far&&far>=0&&near<=1)return false;
  }return true;
 }
 addFood(point){if(this.mode==='challenge'||this.foods.filter(food=>food.active).length>=8||this.blocked(point.x,point.z,0,.45))return false;this.foods.push({id:Math.max(0,...this.foods.map(food=>food.id))+1,x:point.x,z:point.z,active:true});this.rebuildEnvironment();return true;}
 addBall(point){if(this.mode==='challenge'||this.balls.length>=4||this.blocked(point.x,point.z,0,.7)||length(point.x-this.body.x,point.z-this.body.z)<1.5)return false;const dx=this.body.x-point.x,dz=this.body.z-point.z,d=length(dx,dz)||1;this.balls.push({id:this.balls.length+1,x:point.x,z:point.z,y:.85,r:.64,vx:dx/d*1.8,vz:dz/d*1.8});return true;}
 rayClear(yaw){const b=this.body;for(let distance=.25;distance<=1.6;distance+=.1)if(this.blocked(b.x+Math.sin(yaw)*distance,b.z+Math.cos(yaw)*distance,b.y,.32))return clamp((distance-.25)/1.35,0,1);return 1;}
 steerTo(x,z){return angle(Math.atan2(x,z)-this.body.yaw);}
 sense(){
  const b=this.body,forward={x:Math.sin(b.yaw),z:Math.cos(b.yaw)},right={x:Math.cos(b.yaw),z:-Math.sin(b.yaw)},env=this.environment,smell=side=>sample(env.grid,env.odor,b.x+forward.x*.28+right.x*.16*side,b.y+1.38,b.z+forward.z*.28+right.z*.16*side);
  const left=smell(-1),r=smell(1),odor=clamp(1-Math.exp(-(left+r)*90),0,1),wind=localWind(env.grid,b.x,b.y+1.38,b.z),wx=wind.x??wind[0]??0,wz=wind.z??wind[2]??0;
  let loom=0,threat=null;for(const ball of this.balls){const dx=ball.x-b.x,dz=ball.z-b.z,d=Math.max(.1,length(dx,dz));if((dx*forward.x+dz*forward.z)/d<-.85||!this.visible({x:b.x,y:b.y+1.65,z:b.z},ball))continue;const closing=-((ball.vx-b.vx)*dx+(ball.vz-b.vz)*dz)/d,value=2*ball.r*Math.max(0,closing)/(d*d+ball.r*ball.r);if(value>loom){loom=value;threat=ball;}}
  return{left,right:r,odor,windX:wx,windZ:wz,loom,threat,clearLeft:this.rayClear(b.yaw-.65),clearRight:this.rayClear(b.yaw+.65),clearFront:this.rayClear(b.yaw)};
 }
 step(input={},dt=DT){
  if(this.done)return;const b=this.body;this.time+=dt;this.cooldown=Math.max(0,this.cooldown-dt);this.flash=Math.max(0,this.flash-dt);
  advanceEnvironment(this.environment,Math.floor((this.time-this.environmentStart)/.1+1e-7));
  for(const ball of this.balls){const dx=ball.vx*dt,dz=ball.vz*dt;if(this.blocked(ball.x+dx,ball.z,0,ball.r))ball.vx=-ball.vx;else ball.x+=dx;if(this.blocked(ball.x,ball.z+dz,0,ball.r))ball.vz=-ball.vz;else ball.z+=dz;}
  if(b.fallen){this.fallTimer-=dt;this.status='fallen';b.vx*=Math.exp(-dt*4);b.vz*=Math.exp(-dt*4);if(this.fallTimer<=0){b.fallen=false;b.roll=0;b.rollV=0;b.omega=0;b.y=0;b.vx=0;b.vz=0;b.vy=0;this.cooldown=1.5;this.commands.forEach(command=>{command.left=command.right=command.flight=command.groom=0;});}this.finish();return;}
  const sensors=this.sense(),settings=this.settings,rawOdor=sensors.odor*settings.odor,threat=clamp(sensors.loom*settings.visual*settings.reflex*.95,0,1);
  this.sensors={...sensors,touch:1-sensors.clearFront,threat};
  let turn=0,drive=0,memory=0,flight=input.flight?1:threat>.55?.85:0,groom=input.groom?1:0;
  if(settings.auto){
   drive=.43+clamp(rawOdor,0,1)*.28;turn=Math.sin(this.time*.7)*.15*(1-Math.min(1,rawOdor));
   if(rawOdor>.015){const difference=(sensors.right-sensors.left)/(sensors.right+sensors.left+.001);turn+=clamp(difference*3,-1,1)*Math.min(1,rawOdor)*.8;if(length(sensors.windX,sensors.windZ)>.02)turn+=clamp(this.steerTo(-sensors.windX,-sensors.windZ),-1,1)*Math.min(1,rawOdor)*.55;}
   if(this.mode==='challenge'&&this.collected>=3&&this.visible({x:b.x,y:1.5,z:b.z},{...HOME,y:.5})){turn=clamp(this.steerTo(HOME.x-b.x,HOME.z-b.z),-1,1);drive=.65;this.status='home';}
   for(const point of this.remembered){const dx=b.x-point.x,dz=b.z-point.z,d=length(dx,dz);if(d<1.8){memory=Math.max(memory,1-d/1.8);turn+=clamp(this.steerTo(dx,dz),-1,1)*(1-d/1.8)*.7;}}
  }
  const avoidance=(sensors.clearRight-sensors.clearLeft)*1.7;turn+=avoidance;if(sensors.clearFront<.55){turn+=(Math.abs(avoidance)>.05?Math.sign(avoidance):1)*(1-sensors.clearFront)*.9;drive*=Math.max(.2,sensors.clearFront);}
  if(threat>.15&&sensors.threat){turn=turn*(1-threat)+clamp(this.steerTo(b.x-sensors.threat.x,b.z-sensors.threat.z),-1,1)*threat;drive=Math.max(drive,threat*.9);}
  turn+=(input.right?1:0)-(input.left?1:0);if(input.forward)drive=Math.max(.88,drive);if(input.brake)drive=0;
  const nearby=this.foods.find(food=>food.active&&length(food.x-b.x,food.z-b.z)<.83&&b.y<.12);
  if(nearby&&!input.forward&&threat<.5){drive=0;this.pickupId=nearby.id;this.pickup+=dt;if(this.pickup>=.8){nearby.active=false;this.collected++;this.energy=Math.min(100,this.energy+15);this.remembered.push({x:nearby.x,z:nearby.z});this.pickup=0;this.pickupId=null;this.rebuildEnvironment();this.flash=.7;}}else{this.pickup=0;this.pickupId=null;}
  if(groom)drive*=.08;
  const targets={visual:clamp(.1+length(b.vx,b.vz)*.1+Math.abs(b.omega)*.16+threat*.7,0,1)*settings.visual,olfactory:rawOdor,navigation:Math.abs(turn),memory,reflex:threat,left:clamp(drive+turn*.45,0,1),right:clamp(drive-turn*.45,0,1),flight,groom};
  for(const key of NODES)this.nodes[key]+=(clamp(targets[key],0,1)-this.nodes[key])*(1-Math.exp(-dt/(key==='memory'?.9:.09)));
  const command=this.commands[this.commandIndex];const delayed={...command};command.left=this.nodes.left;command.right=this.nodes.right;command.flight=this.nodes.flight;command.groom=this.nodes.groom;this.commandIndex=(this.commandIndex+1)%this.commands.length;
  const effort=(delayed.left+delayed.right)/2,steering=delayed.left-delayed.right,targetSpeed=effort*(settings.decoder?2.3:3.0),targetOmega=steering*(settings.decoder?2.3:6.3),blend=1-Math.exp(-dt*(settings.decoder?5:12));
  b.omega+=(targetOmega-b.omega)*blend;b.yaw=angle(b.yaw+b.omega*dt);
  const desiredX=Math.sin(b.yaw)*targetSpeed,desiredZ=Math.cos(b.yaw)*targetSpeed,maxDelta=300/settings.mass*dt;
  b.vx+=clamp(desiredX-b.vx,-maxDelta,maxDelta);b.vz+=clamp(desiredZ-b.vz,-maxDelta,maxDelta);
  if(input.brake||nearby){b.vx*=Math.exp(-dt*7);b.vz*=Math.exp(-dt*7);}
  if(settings.decoder&&delayed.flight>.55&&b.y<.001&&this.cooldown===0){b.vy=2.0;this.cooldown=1.8;this.energy=Math.max(0,this.energy-3);}
  b.vy-=9.81*dt;b.y=Math.max(0,b.y+b.vy*dt);if(b.y===0&&b.vy<0)b.vy=0;
  const parts=Math.max(1,Math.ceil(length(b.vx,b.vz)*dt/.07));for(let part=0;part<parts;part++){const x=b.x+b.vx*dt/parts,z=b.z+b.vz*dt/parts;if(!this.blocked(x,b.z,b.y))b.x=x;else b.vx*=.25;if(!this.blocked(b.x,z,b.y))b.z=z;else b.vz*=.25;}
  const speed=length(b.vx,b.vz),lateral=speed*b.omega,kp=settings.decoder?35:14,kd=settings.decoder?10:2.7;
  b.rollV+=(9.81*Math.sin(b.roll)+lateral-kp*b.roll-kd*b.rollV+(settings.decoder?0:Math.sin(this.time*16)*delayed.flight*3))*dt;b.roll+=b.rollV*dt;b.phase+=speed*dt*6;b.arm=delayed.flight;
  for(const ball of this.balls){const dx=b.x-ball.x,dz=b.z-ball.z,d=length(dx,dz);if(d<ball.r+.31&&b.y<1.25){const nx=d>.001?dx/d:1,nz=d>.001?dz/d:0,amount=ball.r+.32-d;if(!this.blocked(b.x+nx*amount,b.z+nz*amount,b.y)){b.x+=nx*amount;b.z+=nz*amount;}if(this.cooldown===0){b.rollV+=(nx*Math.cos(b.yaw)-nz*Math.sin(b.yaw))*3.5;this.energy=Math.max(0,this.energy-7);this.cooldown=.8;this.flash=.35;}}}
  this.energy=Math.max(0,this.energy-(.035+speed*speed*.022)*dt*settings.mass/72);
  if(Math.abs(b.roll)>.78){b.fallen=true;this.fallTimer=1.9;this.falls++;this.energy=Math.max(0,this.energy-12);b.y=0;b.vy=0;this.flash=.8;}
  this.status=b.fallen?'fallen':groom?'groom':delayed.flight>.45?(settings.decoder?'hop':'noWings'):nearby?'pickup':threat>.35?'escape':this.mode==='challenge'&&this.collected>=3?'home':input.forward||input.left||input.right?'stimulate':rawOdor>.07?'smell':'search';
  if(Math.floor(this.time*10)!==Math.floor((this.time-dt)*10)){this.trail.push({x:b.x,y:b.y,z:b.z});if(this.trail.length>240)this.trail.shift();}
  this.finish();
 }
 finish(){this.score=Math.max(0,this.collected*300-this.falls*60+(this.mode==='challenge'?Math.floor(Math.max(0,90-this.time))*3:0));if(this.mode!=='challenge')return;this.won=this.collected>=3&&length(this.body.x-HOME.x,this.body.z-HOME.z)<1.05&&!this.body.fallen;if(this.won||this.time>=90||this.energy<=0){this.done=true;this.status=this.won?'success':'timeout';}}
}
