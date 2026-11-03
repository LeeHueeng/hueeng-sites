import {localized,setLanguage} from './i18n.js?v=20260914g';
import {tr,translate} from './placement-i18n.js?v=20260914j';
import {defaults,sanitize,copy,canPlace,conditionKey,createSimulation,step,metrics,DT,DURATION,SPECS} from './placement-model.js?v=20260914j';
import {PlacementView} from './placement-view.js?v=20260914j';

const $=id=>document.getElementById(id),STORAGE='flylab-placement-v1';
let stored=null;try{stored=JSON.parse(localStorage.getItem(STORAGE));}catch{}
const state={config:sanitize(stored?.config||defaults()),saved:stored?.saved&&typeof stored.saved.condition==='string'&&Array.isArray(stored.saved.devices)?stored.saved:null,tool:'select',selected:null,playing:false,busy:false,drag:null,worker:null,jobId:0,results:null,notice:'',noticeParams:{},accumulator:0};
let sim=createSimulation(state.config);
const view=new PlacementView($('placementCanvas'),$('placement3D'));
const lists={device:'devices',obstacle:'obstacles',food:'foods'};
const toolKeys=['select','trap','spray','desk','bed','plant','food','erase'];
const mutableIds=['pAccuracy','pY','pSize','pPopulation','pWind','pSeed','pPlay','pReset','pImport','pDefaults','pSaveA','pSelected','pX','pZ','pApplyPosition'];
const selectedItem=()=>state.selected?state.config[lists[state.selected.kind]][state.selected.index]:null;
const compatible=()=>!!state.saved&&state.saved.condition===conditionKey(state.config);

function persist(){try{localStorage.setItem(STORAGE,JSON.stringify({config:state.config,saved:state.saved}));}catch{}}
function notice(key,params={}){state.notice=key;state.noticeParams=params;$('pMessage').textContent=key?tr(key,params):'';}
function syncControls(){
 $('pAccuracy').value=state.config.accuracy;
 $('pResolution').textContent=tr(state.config.accuracy==='maximum'?'resolutionMaximum':'resolutionPrecise');
 $('pSize').value=String(state.config.size);$('pPopulation').value=String(state.config.population);$('pWind').value=state.config.wind;$('pSeed').value=String(state.config.seed);
 const half=state.config.size/2;for(const id of ['pX','pZ']){$(id).min=String(-half);$(id).max=String(half);}
 $('pCompare').disabled=state.busy||!state.config.devices.length;$('pRestoreA').disabled=state.busy||!compatible();$('pDelete').disabled=state.busy||!selectedItem();
 $('pSavedNote').textContent=tr(state.saved?(compatible()?'savedCompatible':'savedIncompatible'):'noSaved');
 for(const id of mutableIds)$(id).disabled=state.busy;document.querySelectorAll('#placementTools button').forEach(b=>b.disabled=state.busy);
}
function renderTools(){
 const focused=document.activeElement?.dataset.tool;$('placementTools').replaceChildren();
 for(const key of toolKeys){const button=document.createElement('button');button.type='button';button.dataset.tool=key;button.textContent=tr(key);button.setAttribute('aria-pressed',String(state.tool===key));button.disabled=state.busy;button.addEventListener('click',()=>{if(state.busy)return;state.tool=key;state.selected=null;switchView('plan');renderTools();renderSelection();notice('');});$('placementTools').append(button);}
 if(focused)$('placementTools').querySelector(`[data-tool="${focused}"]`)?.focus({preventScroll:true});
}
function itemName(kind,item,index){return `${tr(kind==='food'?'food':item.type)} ${index+1}`;}
function renderSelection(){
 const heightItem=state.selected?.kind==='device'?state.config.devices[state.selected.index]:null;
 $('pY').value=heightItem?.y??(state.selected?0:1);
 $('pY').readOnly=Boolean(state.selected&&state.selected.kind!=='device');
 const select=$('pSelected'),empty=document.createElement('option');empty.value='';empty.textContent=tr('none');select.replaceChildren(empty);
 for(const [kind,key] of Object.entries(lists))state.config[key].forEach((item,index)=>{const option=document.createElement('option');option.value=`${kind}:${index}`;option.textContent=itemName(kind,item,index);select.append(option);});
 select.value=state.selected?`${state.selected.kind}:${state.selected.index}`:'';const item=selectedItem();if(item){$('pX').value=String(item.x);$('pZ').value=String(item.z);}syncControls();
}
function resetRun(clearResults=true){state.playing=false;state.accumulator=0;sim=createSimulation(state.config);if(clearResults){state.results=null;$('rankingSection').hidden=true;}$('pProgressText').textContent='';updateStats();}
function commitEdit(){resetRun();persist();renderSelection();syncControls();notice('edited');}
function setBusy(busy){state.busy=busy;$('pCancel').hidden=!busy;$('pProgress').hidden=!busy;syncControls();}
function switchView(mode){
 try{view.setMode(mode);}catch{view.mode='plan';$('placementCanvas').hidden=false;$('placement3D').hidden=true;notice('sceneError');}
 $('planView').setAttribute('aria-pressed',String(view.mode==='plan'));$('sceneView').setAttribute('aria-pressed',String(view.mode==='scene'));
}
function place(type,x,z){
 if(state.busy)return;if(type==='select'||type==='erase'){notice('editHint');return;}
 const kind=['trap','spray'].includes(type)?'device':type==='food'?'food':'obstacle',list=state.config[lists[kind]],max=kind==='device'?6:kind==='food'?4:10;
 if(list.length>=max){notice('maxReached');return;}const item={x:Math.round(x*2)/2,z:Math.round(z*2)/2};if(kind!=='food')item.type=type;
 if(kind==='device'){let n=1;while(list.some(d=>d.id===`D${n}`))n++;item.id=`D${n}`;}
 if(!canPlace(state.config,kind==='device'?Object.assign(item,{y:Number($('pY').value)||1}):item,kind)){notice('blocked');return;}list.push(item);state.selected={kind,index:list.length-1};commitEdit();
}
function removeSelected(){if(state.busy||!selectedItem())return;state.config[lists[state.selected.kind]].splice(state.selected.index,1);state.selected=null;commitEdit();}

$('language').value=localized(['ko','en','ja','zh','es']);$('language').addEventListener('change',e=>{setLanguage(e.target.value);renderLanguage();});
function renderLanguage(){translate();renderTools();renderSelection();updateStats();if(state.results)renderResults();notice(state.notice,state.noticeParams);}
for(const [id,key] of [['pSize','size'],['pPopulation','population'],['pWind','wind'],['pSeed','seed'],['pAccuracy','accuracy']])$(id).addEventListener('change',e=>{if(state.busy)return;state.config=sanitize({...state.config,[key]:(key==='wind'||key==='accuracy')?e.target.value:Number(e.target.value)});state.selected=null;commitEdit();});
$('planView').addEventListener('click',()=>switchView('plan'));$('sceneView').addEventListener('click',()=>switchView('scene'));
$('pPlay').addEventListener('click',()=>{if(state.busy)return;if(sim.done)resetRun(false);state.playing=!state.playing;state.accumulator=0;updateStats();});
$('pReset').addEventListener('click',()=>{if(state.busy)return;resetRun(false);notice('');});
$('pSelected').addEventListener('change',e=>{if(state.busy)return;const [kind,index]=e.target.value.split(':');state.selected=Object.hasOwn(lists,kind)?{kind,index:Number(index)}:null;state.tool='select';renderTools();renderSelection();});
$('pApplyPosition').addEventListener('click',()=>{if(state.busy)return;const x=Number($('pX').value),z=Number($('pZ').value),item=selectedItem();if(!item){place(state.tool,x,z);return;}const moved={...item,x,z,...(state.selected?.kind==='device'?{y:Number($('pY').value)}:{})};if(!canPlace(state.config,moved,state.selected.kind,state.selected.index)){notice('blocked');return;}Object.assign(item,moved);commitEdit();});
$('pDelete').addEventListener('click',removeSelected);
$('pDefaults').addEventListener('click',()=>{if(state.busy)return;state.config=defaults();state.selected=null;commitEdit();});
$('pImport').addEventListener('click',()=>{
 if(state.busy)return;let data;try{data=JSON.parse(localStorage.getItem('flylab-room-v1'));}catch{}
 if(!data||![8,12,16].includes(data.size)||!Array.isArray(data.items)){notice('noSavedRoom');return;}
 state.config=sanitize({...state.config,size:data.size,obstacles:data.items.filter(item=>item&&SPECS[item.type]),foods:data.items.filter(item=>item?.type==='food').map(({x,z})=>({x,z})),devices:[]});state.selected=null;commitEdit();notice('imported');
});
$('pSaveA').addEventListener('click',()=>{if(state.busy)return;state.saved={condition:conditionKey(state.config),devices:copy(state.config.devices)};persist();syncControls();notice('saved');});
$('pRestoreA').addEventListener('click',()=>{if(state.busy||!compatible())return;state.config.devices=copy(state.saved.devices);state.selected=null;commitEdit();});

const canvas=$('placementCanvas');
canvas.addEventListener('pointerdown',e=>{
 if(state.busy||state.drag||e.button!==0)return;canvas.focus({preventScroll:true});const point=view.point(e,state.config);
 if(state.tool==='erase'){state.selected=view.hit(state.config,point);removeSelected();return;}
 if(state.tool!=='select'){place(state.tool,point.x,point.z);return;}
 state.selected=view.hit(state.config,point);renderSelection();const item=selectedItem();if(!item)return;state.playing=false;state.drag={pointerId:e.pointerId,startX:e.clientX,startY:e.clientY,oldX:item.x,oldZ:item.z,offsetX:point.x-item.x,offsetZ:point.z-item.z,changed:false};canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove',e=>{
 const drag=state.drag;if(!drag||drag.pointerId!==e.pointerId)return;if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)<3)return;const item=selectedItem();if(!item)return;const p=view.point(e,state.config),moved={...item,x:Math.round((p.x-drag.offsetX)*2)/2,z:Math.round((p.z-drag.offsetZ)*2)/2};if(!canPlace(state.config,moved,state.selected.kind,state.selected.index)){notice('blocked');return;}if(moved.x===item.x&&moved.z===item.z)return;item.x=moved.x;item.z=moved.z;drag.changed=true;$('pX').value=String(item.x);$('pZ').value=String(item.z);
});
function finishDrag(cancel=false){const drag=state.drag;if(!drag)return;state.drag=null;if(cancel){const item=selectedItem();if(item){item.x=drag.oldX;item.z=drag.oldZ;}renderSelection();}else if(drag.changed)commitEdit();}
canvas.addEventListener('pointerup',e=>{if(state.drag?.pointerId===e.pointerId)finishDrag();});canvas.addEventListener('pointercancel',()=>finishDrag(true));canvas.addEventListener('lostpointercapture',()=>finishDrag(true));
canvas.addEventListener('keydown',e=>{if(state.busy)return;if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();removeSelected();}else if(e.key==='Escape'){finishDrag(true);state.selected=null;renderSelection();}});

$('pCompare').addEventListener('click',()=>{
 if(state.busy)return;if(!state.config.devices.length){notice('needDevice');return;}state.playing=false;state.accumulator=0;state.results=null;$('rankingSection').hidden=true;$('pProgress').value=0;setBusy(true);notice('');const jobId=++state.jobId;
 try{
  const worker=new Worker(new URL('./placement-worker.js?v=20260914j',import.meta.url),{type:'module'});state.worker=worker;
  const failed=()=>{if(jobId!==state.jobId)return;worker.terminate();state.worker=null;setBusy(false);notice('workerError');};worker.onerror=failed;worker.onmessageerror=failed;
  worker.onmessage=({data})=>{if(data.jobId!==state.jobId)return;if(data.type==='progress'){$('pProgress').max=data.total;$('pProgress').value=data.completed;$('pProgressText').textContent=tr('comparing',{done:data.completed,total:data.total});}
   else if(data.type==='done'){state.results=data;worker.terminate();state.worker=null;setBusy(false);$('pProgressText').textContent='';renderResults();}
   else if(data.type==='error')failed();
  };
  worker.postMessage({jobId,config:copy(state.config),saved:compatible()?copy(state.saved):null});
 }catch{state.worker?.terminate();state.worker=null;setBusy(false);notice('workerError');}
});
$('pCancel').addEventListener('click',()=>{state.jobId++;state.worker?.terminate();state.worker=null;setBusy(false);$('pProgressText').textContent='';notice('cancelled');});

function candidateName(result){return result.id==='current'?tr('current'):result.id==='saved'?tr('savedCandidate'):tr('candidateName',{n:result.id.split('-')[1]});}
function renderResults(){
 const data=state.results;if(!data?.results?.length)return;
 $('rankingSection').hidden=false;$('pRanking').replaceChildren();
 $('pTrialInfo').textContent=tr('trialInfo',{count:data.screenCount,search:data.searchRepeats,confirm:data.confirmRepeats});
 const recommended=data.results.find(result=>result.id===data.recommendedId)||data.results[0];
 $('pWinner').textContent=tr(data.recommendedId==='current'?'keepCurrent':'winner',{name:candidateName(recommended),score:recommended.reduction.toFixed(1)});
 const paired=data.paired;
 $('pPaired').textContent=paired?tr(paired.low>0?'pairedSupported':paired.high<0?'pairedWorse':'pairedUncertain',{mean:(paired.mean>=0?'+':'')+paired.mean.toFixed(1),low:paired.low.toFixed(1),high:paired.high.toFixed(1),n:paired.n}):tr('noChallenger');
 for(const [index,result] of data.results.entries()){
  const row=document.createElement('tr');
  for(const text of [index+1,candidateName(result),result.reduction.toFixed(1)+'% ['+result.low.toFixed(1)+', '+result.high.toFixed(1)+']',result.captured.toFixed(1),result.knocked.toFixed(1)]){const cell=document.createElement('td');cell.textContent=String(text);row.append(cell);}
  const cell=document.createElement('td'),button=document.createElement('button');button.type='button';button.textContent=tr('apply');button.setAttribute('aria-label',candidateName(result)+' / '+tr('apply'));
  button.addEventListener('click',()=>{if(state.busy)return;state.config.devices=copy(result.devices);state.selected=null;resetRun(false);persist();renderSelection();notice('edited');});
  cell.append(button);row.append(cell);$('pRanking').append(row);
 }
 $('pBaseline').textContent=tr('baseline',{score:data.baseline.reduction.toFixed(1),captured:data.baseline.captured.toFixed(1),seeds:data.seeds.join(', ')});
}
function updateStats(){
 const value=metrics(sim);$('pCaptured').textContent=String(value.captured);$('pKnocked').textContent=String(value.knocked);$('pActive').textContent=String(value.active);$('pReduction').textContent=`${value.reduction.toFixed(1)}%`;
 $('pClock').textContent=`${value.time.toFixed(1).padStart(4,'0')} / ${DURATION}`;$('pMode').textContent=tr(view.mode==='scene'?'observing':state.playing?'running':sim.done?'complete':'design');$('pPlay').textContent=tr(state.playing?'pause':sim.tick&&!sim.done?'resume':'play');
 $('pEquipment').textContent=tr('equipment',{traps:state.config.devices.filter(d=>d.type==='trap').length,sprays:state.config.devices.filter(d=>d.type==='spray').length,pulses:value.pulses});drawChart();
}
function drawChart(){
 const canvas=$('placementChart'),c=canvas.getContext('2d'),w=canvas.clientWidth,h=canvas.clientHeight,ratio=Math.min(devicePixelRatio||1,2);if(!w||!h)return;if(canvas.width!==Math.round(w*ratio)||canvas.height!==Math.round(h*ratio)){canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);c.setTransform(ratio,0,0,ratio,0,0);}c.clearRect(0,0,w,h);c.strokeStyle='#647a4744';c.lineWidth=.5;for(let i=0;i<=4;i++){const y=5+i*(h-10)/4;c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
 c.strokeStyle='#b9e58c';c.lineWidth=1.7;c.beginPath();c.moveTo(0,5);for(const point of sim.history)c.lineTo(point.time/DURATION*w,5+(1-point.active/sim.config.population)*(h-10));c.stroke();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){state.playing=false;state.accumulator=0;updateStats();}});
renderLanguage();persist();let previous=performance.now(),uiClock=0;
function frame(now){
 const elapsed=Math.min(.08,Math.max(0,(now-previous)/1000));previous=now;
 if(state.playing&&!state.busy&&!state.drag){state.accumulator+=elapsed*Number($('pSpeed').value);let steps=0;while(state.accumulator>=sim.dt&&steps++<48&&!sim.done){step(sim);state.accumulator-=sim.dt;}if(sim.done){state.playing=false;state.accumulator=0;notice('complete');}}
 view.draw(state.config,sim,{heat:$('pHeat').checked,ranges:$('pRanges').checked,selected:state.selected});uiClock+=elapsed;if(uiClock>.12){uiClock=0;updateStats();}requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

$('pSlice').addEventListener('input',event=>{view.sliceHeight=Number(event.target.value);$('pSliceValue').textContent=view.sliceHeight.toFixed(1)+' m';});
