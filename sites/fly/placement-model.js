import {newExposure,advanceExposure,exposureMotion} from './insecticide.js?v=20260914g';
import {PROFILES,HEIGHT,sharedTransport,liveEnvironment,recordedEnvironment,advanceEnvironment,sample,localWind} from './placement-transport.js?v=20260914j';

export {PROFILES,HEIGHT};
export const DT=PROFILES.precise.dt,DURATION=60,STEPS=Math.round(DURATION/DT),REPEATS=PROFILES.precise.confirm;
export const SPECS={desk:{w:2,d:1.3,h:1.5},bed:{w:2.2,d:3.1,h:.75},plant:{w:.9,d:.9,h:2.2}};
export const WIND={none:{x:0,z:0},east:{x:.55,z:0},west:{x:-.55,z:0},north:{x:0,z:-.55},south:{x:0,z:.55}};
export const copy=value=>JSON.parse(JSON.stringify(value));
export const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
export const defaults=()=>({size:12,population:48,seed:2026,wind:'none',accuracy:'precise',obstacles:[{type:'desk',x:2.5,z:-3},{type:'bed',x:-3,z:1.5},{type:'plant',x:-3.8,z:-3.8}],foods:[{x:2.5,z:2.5}],devices:[{id:'T1',type:'trap',x:4,y:.8,z:2},{id:'T2',type:'trap',x:-.5,y:1.2,z:-3},{id:'S1',type:'spray',x:0,y:1.2,z:1.5}]});
function noise(seed,id,tick,channel){let x=(seed^Math.imul(id+1,0x9e3779b1)^Math.imul(tick+1,0x85ebca6b)^Math.imul(channel+1,0xc2b2ae35))>>>0;x=Math.imul(x^(x>>>16),0x7feb352d);x=Math.imul(x^(x>>>15),0x846ca68b);return((x^(x>>>16))>>>0)/4294967296;}
function footprint(a,b,w,d,padding=0){return Math.abs(a.x-b.x)<w/2+padding&&Math.abs(a.z-b.z)<d/2+padding;}
export function canPlace(config,item,kind,ignore=-1){
 const spec=kind==='obstacle'?SPECS[item.type]:{w:.6,d:.6};
 if(!spec||!Number.isFinite(item.x)||!Number.isFinite(item.z))return false;
 if(Math.abs(item.x)+spec.w/2>config.size/2-.2||Math.abs(item.z)+spec.d/2>config.size/2-.2)return false;
 if(kind==='device'&&(!Number.isFinite(item.y??1)||Number(item.y??1)<.2||Number(item.y??1)>HEIGHT-.25))return false;
 for(const [index,obstacle] of config.obstacles.entries()){
  if(kind==='obstacle'&&index===ignore)continue;
  const other=SPECS[obstacle.type];if(!other)continue;
  if(kind==='device'&&(item.y??1)-.32>other.h)continue;
  if(Math.abs(item.x-obstacle.x)<(spec.w+other.w)/2+.1&&Math.abs(item.z-obstacle.z)<(spec.d+other.d)/2+.1)return false;
 }
 if(kind==='obstacle'){
  if(config.foods.some(food=>footprint(food,item,spec.w,spec.d,.4)))return false;
  if(config.devices.some(device=>(device.y??1)-.32<spec.h&&footprint(device,item,spec.w,spec.d,.4)))return false;
 }
 if(kind==='device'){
  if(config.devices.some((other,index)=>index!==ignore&&Math.hypot(item.x-other.x,(item.y??1)-(other.y??1),item.z-other.z)<.8))return false;
  if(config.foods.some(food=>Math.hypot(item.x-food.x,item.z-food.z)<(item.type==='spray'?1.5:.55)))return false;
 }
 if(kind==='food'){
  if(config.foods.some((food,index)=>index!==ignore&&Math.hypot(item.x-food.x,item.z-food.z)<.7))return false;
  if(config.devices.some(device=>Math.hypot(item.x-device.x,item.z-device.z)<(device.type==='spray'?1.5:.55)))return false;
 }
 return true;
}
export function sanitize(value){
 const base=defaults(),raw=value&&typeof value==='object'?value:base;
 const config={size:[8,12,16].includes(Number(raw.size))?Number(raw.size):base.size,population:[24,48,96].includes(Number(raw.population))?Number(raw.population):base.population,seed:clamp(Math.round(Number(raw.seed)||base.seed),1,999999),wind:Object.hasOwn(WIND,raw.wind)?raw.wind:'none',accuracy:Object.hasOwn(PROFILES,raw.accuracy)?raw.accuracy:'precise',obstacles:[],foods:[],devices:[]};
 for(const item of (Array.isArray(raw.obstacles)?raw.obstacles:base.obstacles).slice(0,10)){
  if(!item||!Object.hasOwn(SPECS,item.type))continue;const next={type:item.type,x:Number(item.x),z:Number(item.z)};if(canPlace(config,next,'obstacle'))config.obstacles.push(next);
 }
 for(const item of (Array.isArray(raw.foods)?raw.foods:base.foods).slice(0,4)){
  if(!item)continue;const next={x:Number(item.x),z:Number(item.z)};if(canPlace(config,next,'food'))config.foods.push(next);
 }
 for(const item of (Array.isArray(raw.devices)?raw.devices:base.devices).slice(0,6)){
  if(!item||!['trap','spray'].includes(item.type))continue;const next={id:`D${config.devices.length+1}`,type:item.type,x:Number(item.x),y:clamp(Number(item.y??1),.2,HEIGHT-.25),z:Number(item.z)};if(canPlace(config,next,'device'))config.devices.push(next);
 }
 return config;
}
export function conditionKey(config){return JSON.stringify({model:'transport-3d-v2',size:config.size,population:config.population,seed:config.seed,wind:config.wind,accuracy:config.accuracy,obstacles:config.obstacles,foods:config.foods,types:config.devices.map(device=>device.type).sort()});}
export function prepareEnvironment(config,record=false){const shared=sharedTransport(config,SPECS,WIND[config.wind]||WIND.none);return record?recordedEnvironment(config,shared):liveEnvironment(config,shared);}
function blocked(config,x,y,z,pad=.055){if(Math.abs(x)>config.size/2-pad||Math.abs(z)>config.size/2-pad||y<pad||y>HEIGHT-pad)return true;return config.obstacles.some(obstacle=>{const spec=SPECS[obstacle.type];return y<spec.h+pad&&footprint({x,z},obstacle,spec.w,spec.d,pad);});}
function visible(config,from,to){
 for(const obstacle of config.obstacles){
  const spec=SPECS[obstacle.type],low=[obstacle.x-spec.w/2,0,obstacle.z-spec.d/2],high=[obstacle.x+spec.w/2,spec.h,obstacle.z+spec.d/2],start=[from.x,from.y,from.z],end=[to.x,to.y,to.z];let near=0,far=1;
  for(let axis=0;axis<3;axis++){const delta=end[axis]-start[axis];if(Math.abs(delta)<1e-8){if(start[axis]<low[axis]||start[axis]>high[axis]){near=2;break;}}else{const a=(low[axis]-start[axis])/delta,b=(high[axis]-start[axis])/delta;near=Math.max(near,Math.min(a,b));far=Math.min(far,Math.max(a,b));if(near>far)break;}}
  if(near<=far&&far>=0&&near<=1)return false;
 }
 return true;
}
function vector(x,y,z){const length=Math.hypot(x,y,z)||1;return{x:x/length,y:y/length,z:z/length};}
function gradient(grid,field,fly){const h=.2;return{x:(sample(grid,field,fly.x+h,fly.y,fly.z)-sample(grid,field,fly.x-h,fly.y,fly.z))/(2*h),y:(sample(grid,field,fly.x,fly.y+h,fly.z)-sample(grid,field,fly.x,fly.y-h,fly.z))/(2*h),z:(sample(grid,field,fly.x,fly.y,fly.z+h)-sample(grid,field,fly.x,fly.y,fly.z-h))/(2*h)};}
function move(sim,fly,dt,knocked){
 const count=Math.max(1,Math.ceil(Math.hypot(fly.vx,fly.vy,fly.vz)*dt/.07)),h=dt/count;
 for(let n=0;n<count;n++)for(const [position,velocity] of [['x','vx'],['z','vz'],['y','vy']]){
  const next=fly[position]+fly[velocity]*h;
  if(blocked(sim.config,position==='x'?next:fly.x,position==='y'?next:fly.y,position==='z'?next:fly.z))fly[velocity]*=knocked?0:-.35;else fly[position]=next;
 }
}
export function createSimulation(input,seed=input.seed,environment=null){
 const config=copy(input);config.accuracy=Object.hasOwn(PROFILES,config.accuracy)?config.accuracy:'precise';config.devices.forEach(device=>device.y??=1);
 const profile=PROFILES[config.accuracy],env=environment||prepareEnvironment(config);
 if(env.recorded)advanceEnvironment(env,0);
 const flies=Array.from({length:config.population},(_,id)=>{
  let x=0,y=HEIGHT-.2,z=0;
  for(let attempt=0;attempt<90;attempt++){
   const food=id%2===0&&config.foods.length?config.foods[id%config.foods.length]:null;
   x=food?food.x+(noise(seed,id,attempt,1)-.5)*2.4:(noise(seed,id,attempt,1)-.5)*(config.size-.3);
   z=food?food.z+(noise(seed,id,attempt,2)-.5)*2.4:(noise(seed,id,attempt,2)-.5)*(config.size-.3);
   y=.16+noise(seed,id,attempt,3)*(food?1.3:HEIGHT-.35);
   if(!blocked(config,x,y,z))break;
   if(attempt===89){x=0;y=HEIGHT-.2;z=0;}
  }
  return{id,x,y,z,vx:0,vy:0,vz:0,status:'free',capturedBy:null,exposure:newExposure(),trail:[],wander:noise(seed,id,0,4)*Math.PI*2,odorMemory:0,lastOdor:0,speedScale:.75+noise(seed,id,0,5)*.5,sensitivity:.7+noise(seed,id,0,6)*.6};
 });
 return{config,seed,dt:profile.dt,steps:Math.round(DURATION/profile.dt),profile,environment:env,tick:0,flies,clouds:[],pulses:0,activitySum:0,heat:new Float32Array(1024),history:[],done:false};
}
export function metrics(sim){const captured=sim.flies.filter(fly=>fly.status==='captured').length,knocked=sim.flies.filter(fly=>fly.status!=='captured'&&fly.exposure.condition==='knocked').length,time=Math.min(DURATION,sim.tick*sim.dt);return{captured,knocked,active:sim.flies.length-captured-knocked,reduction:time?clamp(100*(1-sim.activitySum/(sim.flies.length*time)),0,100):0,pulses:sim.pulses,time};}
export function step(sim){
 if(sim.done)return;
 const {config,environment:env,dt}=sim,time=sim.tick*dt,forcingTick=Math.floor(time*10+1e-7),fieldFrame=Math.floor(time/sim.profile.fieldDt+1e-7);
 advanceEnvironment(env,fieldFrame);
 const grid=env.grid,traps=config.devices.filter(device=>device.type==='trap');
 let active=0;
 for(const fly of sim.flies){
  if(fly.status==='captured')continue;
  const aerosol=sample(grid,env.aerosol,fly.x,fly.y,fly.z);
  advanceExposure(fly.exposure,dt,aerosol*fly.sensitivity);
  const motor=exposureMotion(fly.exposure),knocked=fly.exposure.condition==='knocked';
  if(knocked){fly.vx*=Math.exp(-4*dt);fly.vz*=Math.exp(-4*dt);fly.vy-=9.81*dt;move(sim,fly,dt,true);}
  else{
   const odor=sample(grid,env.odor,fly.x,fly.y,fly.z),odorGradient=gradient(grid,env.odor,fly),local=localWind(grid,fly.x,fly.y,fly.z);
   const wind={x:local.x??local[0]??0,y:local.y??local[1]??0,z:local.z??local[2]??0},windLength=Math.hypot(wind.x,wind.y,wind.z),upwind=windLength>1e-6?vector(-wind.x,-wind.y,-wind.z):{x:0,y:0,z:0};
   fly.odorMemory=Math.max(odor,fly.odorMemory*Math.exp(-dt/1.8));
   const cue=clamp(Math.log1p(60*odor),0,1),memory=clamp(Math.log1p(60*fly.odorMemory),0,1),grad=vector(odorGradient.x,odorGradient.y,odorGradient.z);
   fly.wander+=(noise(sim.seed,fly.id,forcingTick,10)-.5)*3.2*dt;
   const jitter=Number.isFinite(motor.jitter)?motor.jitter:0;
   let dx=Math.cos(fly.wander)*.55+grad.x*cue+upwind.x*memory*.85,dz=Math.sin(fly.wander)*.55+grad.z*cue+upwind.z*memory*.85,dy=(noise(sim.seed,fly.id,forcingTick,11)-.5)*.5+grad.y*cue+upwind.y*memory*.85;
   // Optical attraction is a generic, uncalibrated device assumption, gated by occlusion.
   for(const trap of traps){const tx=trap.x-fly.x,ty=trap.y-fly.y,tz=trap.z-fly.z,distance=Math.hypot(tx,ty,tz);if(distance<3.5&&distance>.01&&visible(config,fly,trap)){const attraction=.7/(.4+distance*distance);dx+=tx/distance*attraction;dy+=ty/distance*attraction;dz+=tz/distance*attraction;}}
   if(aerosol>.015){const g=gradient(grid,env.aerosol,fly),away=vector(-g.x,-g.y,-g.z),avoidance=clamp(aerosol*5,0,1.6);dx+=away.x*avoidance;dy+=away.y*avoidance;dz+=away.z*avoidance;}
   dx+=(noise(sim.seed,fly.id,forcingTick,12)-.5)*jitter*.35;dz+=(noise(sim.seed,fly.id,forcingTick,13)-.5)*jitter*.35;
   const direction=vector(dx,dy,dz),speed=.95*fly.speedScale*(Number.isFinite(motor.speed)?motor.speed:1),blend=1-Math.exp(-dt/.18);
   fly.vx+=(direction.x*speed+wind.x*.55-fly.vx)*blend;fly.vy+=(direction.y*speed+wind.y*.55-fly.vy)*blend;fly.vz+=(direction.z*speed+wind.z*.55-fly.vz)*blend;
   move(sim,fly,dt,false);fly.lastOdor=odor;
   for(const trap of traps){const distance=Math.hypot(fly.x-trap.x,(fly.y-trap.y)*.8,fly.z-trap.z);if(distance<.3&&visible(config,fly,trap)&&noise(sim.seed,fly.id,sim.tick,20)<1-Math.exp(-12*dt)){fly.status='captured';fly.capturedBy=trap.id;fly.vx=fly.vy=fly.vz=0;break;}}
  }
  if(fly.status!=='captured'&&fly.exposure.condition!=='knocked')active++;
  if(fly.status!=='captured'){
   const column=clamp(Math.floor((fly.x/config.size+.5)*32),0,31),row=clamp(Math.floor((fly.z/config.size+.5)*32),0,31);sim.heat[row*32+column]+=dt;
   if((sim.tick+1)%Math.round(.2/dt)===0){fly.trail.push({x:fly.x,y:fly.y,z:fly.z});if(fly.trail.length>40)fly.trail.shift();}
  }
 }
 sim.activitySum+=active*dt;sim.tick++;sim.pulses=config.devices.filter(device=>device.type==='spray').length*Math.min(10,Math.ceil(sim.tick*dt/6));
 if(sim.tick%Math.round(1/dt)===0)sim.history.push(metrics(sim));
 if(sim.tick>=sim.steps){sim.done=true;advanceEnvironment(env,Math.round(DURATION/sim.profile.fieldDt));}
}
export function buildCandidates(config,saved){
 const candidates=[{id:'current',devices:copy(config.devices)}],seen=new Set([JSON.stringify(config.devices.map(({x,y,z,type})=>[type,x,y,z]))]);
 if(saved?.condition===conditionKey(config)&&Array.isArray(saved.devices))candidates.push({id:'saved',devices:copy(saved.devices)});
 for(let attempt=0;attempt<120&&candidates.length<12;attempt++){
  const working={...config,devices:[]};let valid=true;
  for(const [index,device] of config.devices.entries()){
   let placed=false;
   for(let trial=0;trial<100;trial++){
    const tick=attempt*100+trial,item={...device,x:Math.round((noise(config.seed,index,tick,30)-.5)*(config.size-1)*2)/2,y:Math.round((.3+noise(config.seed,index,tick,31)*2.4)*10)/10,z:Math.round((noise(config.seed,index,tick,32)-.5)*(config.size-1)*2)/2};
    if(canPlace(working,item,'device')){working.devices.push(item);placed=true;break;}
   }
   if(!placed){valid=false;break;}
  }
  const key=JSON.stringify(working.devices.map(({x,y,z,type})=>[type,x,y,z]));
  if(valid&&!seen.has(key)){seen.add(key);candidates.push({id:`candidate-${candidates.length}`,devices:working.devices});}
 }
 return candidates;
}
const STUDENT=[0,12.706,4.303,3.182,2.776,2.571,2.447,2.365,2.306,2.262,2.228,2.201,2.179,2.16,2.145,2.131,2.12,2.11,2.101,2.093,2.086,2.08,2.074,2.069,2.064,2.06,2.056,2.052,2.048,2.045,2.042,2.04];
function distribution(values){const n=values.length,mean=values.reduce((sum,value)=>sum+value,0)/Math.max(1,n),std=n>1?Math.sqrt(values.reduce((sum,value)=>sum+(value-mean)**2,0)/(n-1)):0,half=n>1?(STUDENT[Math.min(n-1,31)]||2.04)*std/Math.sqrt(n):0;return{mean,std,half,low:mean-half,high:mean+half,n};}
export function summarize(rows){const interval=distribution(rows.map(row=>row.reduction)),mean=key=>rows.reduce((sum,row)=>sum+row[key],0)/Math.max(1,rows.length);return{reduction:interval.mean,std:interval.std,half:interval.half,low:Math.max(0,interval.low),high:Math.min(100,interval.high),captured:mean('captured'),knocked:mean('knocked'),active:mean('active'),pulses:mean('pulses'),n:rows.length};}
export function pairedImprovement(current,challenger){return distribution(challenger.map((row,index)=>row.reduction-current[index].reduction));}
