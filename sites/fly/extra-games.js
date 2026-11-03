import { localized } from './i18n.js?v=20260914g';

// Independent experiments live here, without replacing the original four games.
export const EXTRA_GAMES=[{
 id:'placement',href:'placement.html',
 title:['방역 배치 실험실','Placement lab','防除配置ラボ','防治布局实验室','Laboratorio de distribución'],
 description:['포충기와 분사기를 어디에 놓을까요? 방을 설계하고, 같은 조건에서 배치안을 비교해 보세요.','Where should traps and sprayers go? Design a room and compare layouts under matched conditions.','捕虫器と噴霧器をどこに置く？部屋を設計し、同じ条件で配置を比べましょう。','捕虫器与喷雾器放哪里？设计房间，在相同条件下比较布局。','¿Dónde colocar trampas y pulverizadores? Diseña una habitación y compara distribuciones en las mismas condiciones.'],
 category:['설계 · 비교 · 실험','DESIGN / COMPARE / EXPERIMENT','設計・比較・実験','设计 · 比较 · 实验','DISEÑAR / COMPARAR / EXPERIMENTAR']
},{
 "id": "human-body",
 "href": "human-body.html",
 "title": [
  "인간 몸 × 초파리 신경계",
  "Human body × fly nervous system",
  "人の体 × ハエの神経系",
  "人体 × 果蝇神经系统",
  "Cuerpo humano × sistema nervioso de mosca"
 ],
 "description": [
  "초파리식 신호로 두 다리와 두 팔을 움직여 보세요. 냄새를 좇고, 위험을 피하고, 낯선 몸의 균형을 잡는 3D 게임.",
  "Move two legs and two arms with fly-inspired signals. Follow odors, avoid threats and balance an unfamiliar body in 3D.",
  "ハエ式の信号で2本の脚と腕を動かす3Dゲーム。匂いを追い、危険を避け、見知らぬ体の平衡を保とう。",
  "用果蝇式信号控制双腿双臂，在3D世界追踪气味、避让危险并维持陌生身体的平衡。",
  "Mueve dos piernas y dos brazos con señales inspiradas en moscas. Sigue olores, evita amenazas y equilibra un cuerpo desconocido en 3D."
 ],
 "category": [
  "신경 · 신체 · 생존",
  "NEURAL / BODY / SURVIVAL",
  "神経・身体・サバイバル",
  "神经 · 身体 · 生存",
  "NERVIOS / CUERPO / SUPERVIVENCIA"
 ]
},{
 "id": "monitor-fly",
 "href": "monitor-fly.html",
 "title": [
  "모니터 위의 초파리",
  "Flies on the monitor",
  "モニターの上のハエ",
  "显示器上的果蝇",
  "Moscas en el monitor"
 ],
 "description": [
  "불량 화소가 아닙니다. 화면에 붙은 초파리에게 천천히 다가가 클릭! 60초 포획 도전과 연속 콤보.",
  "Not a dead pixel. Sneak up on flies perched on the screen and click! A 60-second catching challenge with combos.",
  "ドット抜けではありません。画面のハエにそっと近づいてクリック！60秒の捕獲チャレンジとコンボ。",
  "不是坏点！慢慢靠近停在屏幕上的果蝇并点击，挑战60秒捕捉与连续连击。",
  "No es un píxel muerto. Acércate a las moscas posadas en la pantalla y pulsa. Un reto de 60 segundos con combos."
 ],
 "category": [
  "화면 · 반응 · 포획",
  "SCREEN / REFLEX / CATCH",
  "画面・反応・捕獲",
  "屏幕 · 反应 · 捕获",
  "PANTALLA / REFLEJOS / CAPTURA"
 ]
}];
const hero=[
 '작은 뇌로 노는<br><em>계속 늘어나는 세계.</em>',
 'A little brain.<br><em>More worlds to explore.</em>',
 '小さな脳で遊ぶ<br><em>広がり続ける世界。</em>',
 '和小小大脑一起<br><em>探索不断扩展的世界。</em>',
 'Un pequeño cerebro.<br><em>Más mundos por explorar.</em>'
];
function refresh(){
 const grid=document.getElementById('gameCards');if(!grid)return;
 const base=[...grid.children].filter(el=>!el.dataset.extraGame).length;
 EXTRA_GAMES.forEach((game,index)=>{
  let card=grid.querySelector(`[data-extra-game="${game.id}"]`);
  if(!card){card=document.createElement('a');card.className='experiment-card';card.dataset.extraGame=game.id;card.href=game.href;grid.append(card);}
  card.replaceChildren();const number=document.createElement('span');number.className='experiment-number';number.textContent=`EXPERIMENT / ${String(base+index+1).padStart(2,'0')}`;
  const icon=document.createElement('div');icon.className='mode-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg viewBox="0 0 54 48"><path d="M5 40V8h43v32H5Zm15 0V25h13V8M5 25h15"/><circle cx="39" cy="32" r="4"/><path d="M39 24v4m0 8v4m-8-8h4m8 0h4"/><circle cx="13" cy="16" r="3"/></svg>';
  const title=document.createElement('h3');title.textContent=localized(game.title);const description=document.createElement('p');description.textContent=localized(game.description);
  const footer=document.createElement('div');footer.className='card-bottom';const category=document.createElement('span');category.textContent=localized(game.category);const arrow=document.createElement('span');arrow.textContent='↗';footer.append(category,arrow);card.append(number,icon,title,description,footer);
 });
 const count=String(base+EXTRA_GAMES.length).padStart(2,'0');const badge=document.querySelector('[data-i18n="fourGames"]');if(badge)badge.textContent=`${count} GAMES / ${count} WORLDS`;
 const title=document.querySelector('[data-i18n="heroTitle"]');if(title)title.innerHTML=localized(hero);
}
const grid=document.getElementById('gameCards');if(grid)new MutationObserver(refresh).observe(grid,{childList:true});document.getElementById('language')?.addEventListener('change',refresh);refresh();
