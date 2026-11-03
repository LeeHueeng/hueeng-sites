import { REGIONS, localized, t } from './i18n.js?v=20260914g';

// These dimensionless gains are explicit game controls, not neural stimulation
// predictions. They modulate the existing behavioral agent, not atlas neurons.
const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
const TEXT={
 title:['뇌로 몸 조종하기','Control the body through the brain','脳から体を操作','通过大脑控制身体','Controlar el cuerpo desde el cerebro'],
 intro:['관찰 중인 파리의 뇌 영역에 가상 자극을 주세요. 버튼이나 슬라이더를 움직이면 방 안의 행동이 바뀝니다.','Apply virtual input to the tracked fly. Buttons and sliders change its behavior in the room.','観察中のハエに仮想の刺激を与えます。ボタンやスライダーで部屋の中の行動が変化します。','向正在追踪的果蝇施加虚拟输入，按钮与滑块会改变它在房间中的行为。','Aplica entradas virtuales a la mosca observada. Los botones y deslizadores cambian su conducta en la habitación.'],
 off:['자율 탐험','Autonomous exploration','自動探索','自主探索','Exploración autónoma'],
 active:['가상 뇌 입력 적용 중','Virtual brain input active','仮想の脳入力を適用中','正在施加虚拟脑输入','Entrada cerebral virtual activa'],
 dead:['사망: 먼저 되살려 주세요','Dead: revive this fly first','死亡: 先に復活してください','已死亡：请先复活','Muerta: revívela primero'],
 knocked:['녹다운 중: 자극보다 노출 반응 우선','Knockdown: exposure overrides input','ノックダウン中: 曝露反応を優先','击倒状态：暴露反应优先','Derribo: la exposición tiene prioridad'],
 inhibit:['억제','Inhibit','抑制','抑制','Inhibir'],
 excite:['자극','Excite','刺激','刺激','Estimular'],
 left:['좌회전 · CX','Turn left · CX','左旋回 · CX','左转 · CX','Girar izquierda · CX'],
 right:['우회전 · CX','Turn right · CX','右旋回 · CX','右转 · CX','Girar derecha · CX'],
 fast:['가속 · LAL','Speed up · LAL','加速 · LAL','加速 · LAL','Acelerar · LAL'],
 stop:['운동 정지 · LAL','Stop motion · LAL','運動停止 · LAL','停止运动 · LAL','Detener movimiento · LAL'],
 food:['먹이 추적 · AL','Seek food · AL','エサ追跡 · AL','追踪食物 · AL','Buscar comida · AL'],
 rise:['떠오르기 · AMMC','Lift up · AMMC','上昇 · AMMC','上升 · AMMC','Elevarse · AMMC'],
 reset:['선택 개체의 자극 해제 · 다시 탐험','Release this fly’s input · explore again','この個体の刺激を解除・再び探索','解除所选个体刺激 · 恢复探索','Quitar entradas de esta mosca · explorar'],
 speed:['가상 속도 배율','Game speed multiplier','ゲーム速度倍率','游戏速度倍率','Multiplicador de velocidad'],
 turning:['회전 입력','Steering input','旋回入力','转向输入','Entrada de giro'],
 none:['없음','None','なし','无','Ninguna'],
 leftShort:['왼쪽','Left','左','左','Izquierda'],
 rightShort:['오른쪽','Right','右','右','Derecha'],
 noFood:['먹이를 놓아야 AL 조작의 접근 반응을 볼 수 있습니다.','Place food to observe the approach effect of AL input.','AL入力の接近反応を見るにはエサを置いてください。','放置食物后才能观察AL输入带来的趋近反应。','Coloca comida para observar el efecto de acercamiento de AL.'],
 stopNote:['이 정지는 사망이 아닙니다. 자극을 해제하면 다시 움직입니다.','This stop is not death. Release the input to move again.','この停止は死亡ではありません。刺激を解除すると再び動きます。','停止不等于死亡，解除输入后可再次移动。','Esta detención no es la muerte. Quita la entrada para volver a moverse.'],
 instruction:['슬라이더 0은 기존 탐험 규칙입니다. 음수는 해당 게임 효과를 약하게, 양수는 강하게 만듭니다. 좌우 버튼은 진행 방향 기준의 별도 가상 조향 입력입니다.','Zero keeps the original exploration rules. Negative values weaken a game effect; positive values strengthen it. Left/right presets add a separate virtual steering command relative to the fly’s heading.','0は元の探索ルールです。負の値はゲーム効果を弱め、正の値は強めます。左右ボタンは進行方向を基準にした別の仮想操舵入力です。','0保留原有探索规则。负值减弱游戏效果，正值增强效果。左右按钮另加一个相对果蝇前进方向的虚拟转向命令。','Cero mantiene las reglas originales. Los valores negativos reducen el efecto del juego y los positivos lo aumentan. Los botones izquierda/derecha añaden una orden virtual relativa a la dirección de avance.'],
 warning:['교육용 가상 조작입니다. 이 슬라이더는 전류·발화율·신경세포 비율이 아니며, 실제 뇌 영역을 자극했을 때 이런 행동이 나온다는 뜻이 아닙니다. 뇌 색과 그래프도 게임 표시값입니다. 직접 조종으로 전환하면 해당 개체의 뇌 입력은 해제됩니다.','Educational game controls only. Sliders are not current, firing rate or fractions of neurons; they do not predict the result of stimulating a real region. Brain colors and graphs are also game indices. Switching to direct body control releases this fly’s brain input.','教育用の仮想操作です。電流・発火率・神経細胞の割合ではなく、実際の領域刺激で同じ行動が起こるという意味でもありません。脳の色やグラフもゲーム指標です。直接操作に切り替えると、この個体の脳入力は解除されます。','仅用于教学游戏。滑块不是电流、放电率或神经元比例，也不预测刺激真实脑区的结果。脑部颜色与曲线同样是游戏指标。切换到直接身体操控会解除该个体的脑输入。','Controles educativos de juego. No representan corriente, frecuencia de disparo ni proporciones neuronales, y no predicen la respuesta de una región real. Colores y gráficas son índices del juego. El control corporal directo quita la entrada cerebral de esa mosca.']
};
const EFFECTS={
 visual:['게임 규칙: 벽·가구 회피의 보정 강도. 억제해도 물체를 통과하지는 않습니다.','Game rule: obstacle-avoidance correction; inhibition never permits passing through objects.','ゲーム規則: 壁・家具の回避補正。抑制しても物体は通り抜けません。','游戏规则：调整障碍回避强度，抑制也不会穿过物体。','Regla: corrección para evitar obstáculos; inhibir no permite atravesarlos.'],
 olfactory:['게임 규칙: 실제로 놓인 먹이에 끌리는 힘. 먹이가 없으면 접근 효과도 없습니다.','Game rule: attraction to food you placed; no food means no attraction effect.','ゲーム規則: 置いたエサへの誘引。エサがなければ接近効果はありません。','游戏规则：调整对已放置食物的吸引力，没有食物就无此效果。','Regla: atracción por la comida colocada; sin comida no hay efecto de atracción.'],
 navigation:['게임 규칙: 좌우 버튼의 회전 강도. 슬라이더만 올린다고 특정 방향이 정해지지는 않습니다.','Game rule: strength of the left/right presets; the slider alone does not specify a heading.','ゲーム規則: 左右ボタンの旋回強度。スライダーだけでは向きは決まりません。','游戏规则：左右按钮的转向强度；滑块本身不指定朝向。','Regla: fuerza de los giros de los botones; el deslizador solo no elige una dirección.'],
 memory:['게임 규칙: 현재 탐험 목표를 유지하는 시간. 경험을 학습하거나 기억을 심는 기능은 아닙니다.','Game rule: how long an exploration target persists, not learning or implanted memories.','ゲーム規則: 探索目標を維持する時間。学習や記憶の植え付けではありません。','游戏规则：维持探索目标的时长，并非学习或植入记忆。','Regla: duración del objetivo de exploración, no aprendizaje ni recuerdos implantados.'],
 touch:['게임 규칙: 가구 근처에서 위로 피하는 반응. 떠오르기 버튼은 별도 상승 입력을 더합니다.','Game rule: upward avoidance near furniture; Lift up also adds a separate ascent input.','ゲーム規則: 家具付近で上へ避ける反応。上昇ボタンは別の上向き入力を追加します。','游戏规则：家具附近的向上避让；上升按钮另加向上输入。','Regla: evasión hacia arriba cerca de muebles; Elevarse añade una entrada ascendente.'],
 motor:['게임 규칙: 이동 속도 0–2배. −100은 이동 정지이며 사망 처리하지 않습니다.','Game rule: motion speed from 0–2×; −100 stops motion without killing the fly.','ゲーム規則: 移動速度0〜2倍。−100は運動停止で、死亡ではありません。','游戏规则：移动速度0–2倍；−100停止运动但不会杀死果蝇。','Regla: velocidad de 0–2×; −100 detiene el movimiento sin matar a la mosca.']
};
const label=key=>localized(TEXT[key]);
const element=(tag,className,text)=>{const el=document.createElement(tag);el.className=className||'';if(text!==undefined)el.textContent=text;return el;};

export class BrainControl {
 constructor(room){
  this.room=room;this.rows=new Map();this.buttons=new Map();
  this.panel=element('section','brain-stim-panel');this.panel.id='brainStimPanel';this.panel.setAttribute('aria-labelledby','brainStimTitle');
  const head=element('div','brain-stim-head');head.append(element('p','eyebrow','NEURAL REMOTE / GAME MODEL'));
  this.title=element('h3');this.title.id='brainStimTitle';this.intro=element('p');head.append(this.title,this.intro);
  const status=element('div','brain-stim-status');this.flyLabel=element('strong');this.status=element('span','brain-stim-state');this.status.setAttribute('role','status');status.append(this.flyLabel,this.status);
  const presets=element('div','brain-stim-presets');for(const id of ['left','right','fast','stop','food','rise']){const button=element('button');button.type='button';button.dataset.preset=id;button.addEventListener('click',()=>this.preset(id));presets.append(button);this.buttons.set(id,button);}
  const rows=element('div','brain-stim-rows');
  for(const r of REGIONS){
   const row=element('div','brain-stim-row');row.style.setProperty('--region',r.color);const top=element('div','brain-stim-row-top');const name=element('button','brain-stim-region');name.type='button';const nameText=element('b');const code=element('span','',r.code);name.append(nameText,code);name.addEventListener('click',()=>this.highlight(r.id));
   const value=element('output','brain-stim-value');const sliderId=`stim-${r.id}`;value.htmlFor=sliderId;
   const rail=element('div','brain-stim-slider');const inhibit=element('span');const excite=element('span');const input=element('input');input.type='range';input.id=sliderId;input.min='-100';input.max='100';input.step='5';input.value='0';const effect=element('p','brain-stim-effect');effect.id=`stim-effect-${r.id}`;input.setAttribute('aria-describedby',effect.id);
   input.addEventListener('input',()=>{const f=this.activate();if(!f)return;f.neural.levels[r.id]=clamp(Number(input.value)/100,-1,1);f.neural.preset=null;if(r.id==='navigation'&&f.neural.levels.navigation===-1)f.neural.steering=0;this.highlight(r.id);this.render();});
   top.append(name,value);rail.append(inhibit,input,excite);row.append(top,rail,effect);rows.append(row);this.rows.set(r.id,{row,name,nameText,value,inhibit,excite,input,effect});
  }
  this.output=element('p','brain-stim-output');this.resetButton=element('button','brain-stim-reset');this.resetButton.type='button';this.resetButton.addEventListener('click',()=>this.release(room.selectedFly()));
  this.instruction=element('p','brain-stim-warning');this.warning=element('p','brain-stim-warning');this.panel.append(head,status,presets,rows,this.output,this.resetButton,this.instruction,this.warning);document.querySelector('.brain-panel').append(this.panel);
 }
 translate(){
  this.title.textContent=label('title');this.intro.textContent=label('intro');this.resetButton.textContent=label('reset');this.instruction.textContent=label('instruction');this.warning.textContent=label('warning');
  for(const [id,button] of this.buttons)button.textContent=label(id);
  for(const r of REGIONS){const row=this.rows.get(r.id);row.nameText.textContent=localized(r.name);row.inhibit.textContent=label('inhibit');row.excite.textContent=label('excite');row.input.setAttribute('aria-label',`${localized(r.name)} / ${label('inhibit')} / ${label('excite')}`);row.effect.textContent=localized(EFFECTS[r.id]);}
  this.render();
 }
 highlight(id){const row=document.querySelector(`#regionList [data-region="${id}"]`);if(row&&row.getAttribute('aria-pressed')!=='true')row.click();}
 activate(){
  const room=this.room,f=room.selectedFly();if(!f||f.dead)return null;
  if(!f.neural?.enabled){f.neural={enabled:true,levels:Object.fromEntries(REGIONS.map(r=>[r.id,0])),steering:0,lift:0,heading:null,preset:null};}
  f.manualControl=false;f.controlTarget=null;room.manual.clearInput();room.stopSpray(false);
  if(room.tool==='controlFly'){room.tool='move';room.renderer.domElement.style.cursor='grab';room.translate();}
  room.callbacks.start?.();return f;
 }
 release(f,announce=true){
  if(!f?.neural?.enabled)return;
  f.neural=null;f.decision=0;
  if(announce){this.room.callbacks.start?.();this.room.callbacks.event('controlAutoEvent');this.render();}
 }
 preset(id){
  const f=this.activate();if(!f)return;const s=f.neural;s.levels=Object.fromEntries(REGIONS.map(r=>[r.id,0]));s.steering=0;s.lift=0;s.heading=null;s.preset=id;
  let region='motor';
  if(id==='left'||id==='right'){s.levels.navigation=.7;s.steering=id==='left'?-1:1;s.heading=Math.atan2(f.vel.x,f.vel.z);region='navigation';}
  else if(id==='fast')s.levels.motor=.8;
  else if(id==='stop'){s.levels.motor=-1;f.vel.set(0,0,0);}
  else if(id==='food'){s.levels.olfactory=1;region='olfactory';}
  else if(id==='rise'){s.levels.touch=.8;s.levels.motor=.25;s.lift=1;region='touch';}
  this.highlight(region);this.render();
 }
 level(f,id){return !f.dead&&f.neural?.enabled?f.neural.levels[id]||0:0;}
 motorGain(f){return 1+this.level(f,'motor');}
 decisionRate(f){return 1-this.level(f,'memory')*.8;}
 applyMotion(f,desired,dt,near){
  const s=f.neural;if(!s?.enabled||f.dead)return;const room=this.room;
  const smell=this.level(f,'olfactory'),vision=this.level(f,'visual'),touch=this.level(f,'touch');
  for(const o of room.objects){const dx=o.x-f.pos.x,dz=o.z-f.pos.z,d=Math.hypot(dx,dz);
   if(o.type==='food'){const strength=Math.exp(-d/3);desired.x+=dx/(d||1)*strength*1.6*smell;desired.z+=dz/(d||1)*strength*1.6*smell;if(d<1.4)desired.y+=(.4-f.pos.y)*strength*smell;continue;}
   const rx=o.w/2+.5,rz=o.d/2+.5;if(f.pos.y<o.h+.35&&Math.abs(dx)<rx&&Math.abs(dz)<rz){if(rx-Math.abs(dx)<rz-Math.abs(dz))desired.x-=Math.sign(dx||1)*3*vision*.7;else desired.z-=Math.sign(dz||1)*3*vision*.7;desired.y+=.65*touch;}
  }
  const edge=room.size/2-.85;if(f.pos.x<-edge)desired.x+=2*vision*.7;if(f.pos.x>edge)desired.x-=2*vision*.7;if(f.pos.z<-edge)desired.z+=2*vision*.7;if(f.pos.z>edge)desired.z-=2*vision*.7;
  if(s.steering){s.heading=(s.heading??Math.atan2(f.vel.x,f.vel.z))-s.steering*dt*1.35*(1+this.level(f,'navigation'));const speed=Math.max(.9,Math.hypot(desired.x,desired.z));desired.x=Math.sin(s.heading)*speed;desired.z=Math.cos(s.heading)*speed;}
  if(s.lift){desired.y+=s.lift*1.25;if(f.pos.y>2.8&&s.lift>0)desired.y=Math.min(desired.y,0);}
  desired.multiplyScalar(this.motorGain(f));
 }
 applySignals(f){
  if(!f.neural?.enabled||f.dead||f.exposure.condition==='knocked')return;
  for(const r of REGIONS){const value=this.level(f,r.id),base=f.activity[r.id]||0;f.activity[r.id]=clamp(value<0?base*(1+value):base+(1-base)*value*.8,0,1);}
 }
 render(){
  const room=this.room,f=room.selectedFly(),s=f?.neural,active=!!s?.enabled&&!f?.dead;
  this.panel.dataset.active=String(active);this.flyLabel.textContent=f?`FLY #${String(f.id).padStart(3,'0')}`:'FLY ---';
  const status=label(f?.dead?'dead':f?.exposure.condition==='knocked'?'knocked':active?'active':'off');if(this.status.textContent!==status)this.status.textContent=status;
  const selectedRegion=document.querySelector('#regionList .region-row.active')?.dataset.region;
  for(const [id,row] of this.rows){const value=Math.round(active?(s.levels[id]||0)*100:0);if(document.activeElement!==row.input)row.input.value=String(value);row.value.textContent=`${value>0?'+':''}${value}`;row.input.disabled=!f||!!f.dead;row.row.classList.toggle('selected',selectedRegion===id);row.name.setAttribute('aria-pressed',String(selectedRegion===id));}
  for(const [id,button] of this.buttons){button.disabled=!f||!!f.dead;button.setAttribute('aria-pressed',String(active&&s.preset===id));}
  this.resetButton.disabled=!active;
  const turn=active&&s.steering?label(s.steering<0?'leftShort':'rightShort'):label('none');
  let text=`${label('speed')}: ${f?this.motorGain(f).toFixed(2):'1.00'}× / ${label('turning')}: ${turn}.`;
  if(active&&s.levels.motor===-1)text+=' '+label('stopNote');if(active&&s.levels.olfactory!==0&&!room.objects.some(o=>o.type==='food'))text+=' '+label('noFood');this.output.textContent=text;
  if(active&&room.ring)room.ring.material.color.set('#9bdbe6');
 }
}
