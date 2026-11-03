import {MonitorBrain as AtlasBrainPanel} from './monitor-brain.js?v=20260914n';
import {localized,setLanguage} from './i18n.js?v=20260914g';
import {tr,translate} from './human-body-i18n.js?v=20260914o';
import {HumanBodyModel,DT} from './human-body-model.js?v=20260914l';
import {HumanBodyView} from './human-body-view.js?v=20260914l';
const $=selector=>document.querySelector(selector),model=new HumanBodyModel();
const brain=new AtlasBrainPanel($('#hBrainCanvas'),$('#hBrainSignal'));
let playing=false,accumulator=0,reported=false,best=0,view,noticeUntil=0;
const held=new Map(),pulses=new Map(),keyMap={KeyW:'forward',KeyA:'left',KeyD:'right',KeyS:'brake',Space:'flight',KeyG:'groom'};
try{best=Number(localStorage.getItem('flylab-human-best-v1'))||0;}catch{}
function start(){if(model.done)return;playing=true;}
function clearInput(){held.clear();pulses.clear();}
function reset(mode=model.mode){clearInput();model.reset(mode);brain.reset();playing=false;accumulator=0;reported=false;$('#hFinish').hidden=true;$('#hTool').value='orbit';$('#hTool').disabled=mode==='challenge';if(view)view.tool='orbit';renderLabels();}
function renderLabels(){translate();brain.renderControls();$('#bodyLanguage').value=localized(['ko','en','ja','zh','es']);$('#hDecoderLabel').textContent=tr(model.settings.decoder?'bridgeOn':'bridgeOff');$('#hMode').textContent=tr(model.mode);$('#hBest').textContent=String(best);updateUI();}
function input(){const result={};for(const action of held.values())result[action]=true;for(const [action,until] of pulses){if(performance.now()<until)result[action]=true;else pulses.delete(action);}return result;}
function updateUI(){
 $('#hPlay').textContent=tr(playing?'pause':'play');$('#hPlay').disabled=model.done;$('#hTime').textContent=(model.mode==='challenge'?Math.max(0,90-model.time):model.time).toFixed(1);$('#hFruit').textContent=String(model.collected)+(model.mode==='challenge'?' / 3':'');$('#hBalance').textContent=String(model.body.fallen?0:Math.round(Math.max(0,1-Math.abs(model.body.roll)/.78)*100));$('#hEnergy').textContent=String(Math.round(model.energy));$('#hSpeed').textContent=Math.hypot(model.body.vx,model.body.vz).toFixed(2)+' m/s';
 const stateKey=model.status==='stimulate'?'stimulateState':model.status==='groom'?'groomState':model.status,message=tr(!playing&&!model.done?'paused':stateKey);if($('#hStatus').textContent!==message)$('#hStatus').textContent=message;
 for(const node of document.querySelectorAll('[data-node]')){const value=Math.round(model.nodes[node.dataset.node]*100);node.style.setProperty('--level',value);node.querySelector('output').textContent=String(value);}
 const signals=input();for(const button of document.querySelectorAll('[data-signal]'))button.dataset.active=String(!!signals[button.dataset.signal]);
 if(noticeUntil&&performance.now()>noticeUntil){$('#hPlaceHint').textContent=tr('placeHint');noticeUntil=0;}
 if(model.done){$('#hOutcome').textContent=tr(model.won?'success':'timeout');$('#hFinalScore').textContent=String(model.score);$('#hResultHint').textContent=tr(model.won?'objective':'failHint');}
}
try{view=new HumanBodyView($('#hWorld'),(tool,point)=>{const ok=tool==='food'?model.addFood(point):tool==='ball'?model.addBall(point):false;if(!ok){$('#hPlaceHint').textContent=tr('invalid');noticeUntil=performance.now()+4500;}else start();});}catch(error){$('#hWorld').textContent=tr('webgl');$('#hPlay').disabled=true;}
$('#bodyLanguage').addEventListener('change',event=>{setLanguage(event.target.value);renderLabels();});
$('#hPlay').addEventListener('click',()=>{if(playing){playing=false;clearInput();}else start();updateUI();});
$('#hReset').addEventListener('click',()=>reset());$('#hSandbox').addEventListener('click',()=>{reset('sandbox');start();});$('#hChallenge').addEventListener('click',()=>{reset('challenge');start();});$('#hRetry').addEventListener('click',()=>{reset('challenge');start();});
$('#hCamera').addEventListener('change',event=>{if(view)view.mode=event.target.value;});$('#hTool').addEventListener('change',event=>{if(view){view.tool=event.target.value;view.renderer.domElement.style.cursor=view.tool==='orbit'?'grab':'crosshair';}});$('#hOdorView').addEventListener('change',event=>{if(view)view.showOdor=event.target.checked;});
$('#hDecoder').addEventListener('change',event=>{model.settings.decoder=event.target.checked;$('#hDecoderLabel').textContent=tr(model.settings.decoder?'bridgeOn':'bridgeOff');});$('#hAuto').addEventListener('change',event=>model.settings.auto=event.target.checked);
for(const [id,key] of [['hVisual','visual'],['hOdor','odor'],['hReflex','reflex'],['hMass','mass']])$('#'+id).addEventListener('input',event=>{const value=Number(event.target.value);model.settings[key]=value;$('#'+id+'Value').textContent=key==='mass'?value+' kg':value.toFixed(1)+'×';});
for(const button of document.querySelectorAll('[data-signal]')){
 const action=button.dataset.signal;
 button.addEventListener('pointerdown',event=>{if(event.button!==0)return;event.preventDefault();button.setPointerCapture(event.pointerId);held.set('pointer:'+event.pointerId,action);start();});
 const release=event=>held.delete('pointer:'+event.pointerId);button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
 button.addEventListener('keydown',event=>{if(!['Space','Enter'].includes(event.code))return;event.preventDefault();held.set('button:'+action+':'+event.code,action);start();});button.addEventListener('keyup',event=>{if(!['Space','Enter'].includes(event.code))return;event.preventDefault();held.delete('button:'+action+':'+event.code);});button.addEventListener('blur',()=>{for(const key of [...held.keys()])if(key.startsWith('button:'+action+':'))held.delete(key);});
 button.addEventListener('click',event=>{if(event.detail===0&&!held.size){pulses.set(action,performance.now()+250);start();}});
}
window.addEventListener('keydown',event=>{if(event.metaKey||event.ctrlKey||event.altKey||event.target instanceof Element&&(event.target.matches('input,select,textarea,button')||event.target.isContentEditable))return;const action=keyMap[event.code];if(!action)return;event.preventDefault();held.set('key:'+event.code,action);start();});
window.addEventListener('keyup',event=>{if(!keyMap[event.code])return;held.delete('key:'+event.code);});window.addEventListener('blur',clearInput);document.addEventListener('visibilitychange',()=>{if(document.hidden){playing=false;clearInput();accumulator=0;}});
renderLabels();let previous=performance.now(),uiClock=0;
function frame(now){const elapsed=Math.min(.1,Math.max(0,(now-previous)/1000));previous=now;if(playing&&view){accumulator+=elapsed;let count=0;while(accumulator>=DT&&count++<8&&!model.done){model.step(input());accumulator-=DT;}if(model.done){playing=false;clearInput();accumulator=0;if(!reported){reported=true;$('#hFinish').hidden=false;if(model.won&&model.score>best){best=model.score;try{localStorage.setItem('flylab-human-best-v1',String(best));}catch{}$('#hBest').textContent=String(best);}}}}
 if(view)view.draw(model);
 const neural=model.nodes,contact=model.pickupId?.65:(model.sensors.touch||0)>.88?.35:.025;
 brain.update(elapsed,{visual:neural.visual,olfactory:neural.olfactory,navigation:neural.navigation,memory:neural.memory,touch:contact,motor:Math.max(neural.left,neural.right,neural.flight,neural.groom)},playing&&!!view);
 brain.draw();uiClock+=elapsed;if(uiClock>.1){uiClock=0;updateUI();}requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
