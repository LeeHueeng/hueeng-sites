import {localized} from './i18n.js?v=20260914g';
const COPY={
 title:['모니터 위의 초파리','Flies on the monitor','モニターの上のハエ','显示器上的果蝇','Moscas en el monitor'],
 headline:['불량 화소가 아닙니다.','That is not a dead pixel.','ドット抜けではありません。','这不是坏点。','No es un píxel muerto.'],
 subtitle:['모니터에 붙은 작은 침입자들. 천천히 다가가, 앉아 있을 때 잡으세요.','Tiny intruders on the screen. Approach slowly and catch them while they are perched.','画面にとまった小さな侵入者。ゆっくり近づき、とまっている間に捕まえよう。','屏幕上的小小入侵者。慢慢靠近，趁停落时抓住它们。','Pequeños intrusos en la pantalla. Acércate despacio y atrápalos cuando se posen.'],
 back:['모든 게임','All games','すべてのゲーム','全部游戏','Todos los juegos'],
 challenge:['60초 도전','60-second challenge','60秒チャレンジ','60秒挑战','Reto de 60 segundos'],practice:['자유 연습','Free practice','自由練習','自由练习','Práctica libre'],
 play:['시작','Start','開始','开始','Empezar'],pause:['일시정지','Pause','一時停止','暂停','Pausar'],resume:['계속하기','Resume','再開','继续','Continuar'],reset:['새 라운드','New round','新しいラウンド','新回合','Nueva ronda'],
 time:['남은 시간','Time left','残り時間','剩余时间','Tiempo restante'],score:['점수','Score','得点','分数','Puntos'],caught:['잡은 파리','Caught','捕獲数','捕获数','Atrapadas'],combo:['콤보','Combo','コンボ','连击','Combo'],best:['이 설정의 최고점','Best for these settings','この設定の最高点','当前设置最高分','Récord con estos ajustes'],accuracy:['명중률','Accuracy','命中率','命中率','Precisión'],
 ready:['시작을 누르거나 화면의 파리를 클릭하세요.','Press Start or click a fly on the screen.','開始を押すか画面のハエをクリック。','点击开始或点击屏幕上的果蝇。','Pulsa Empezar o una mosca de la pantalla.'],
 paused:['잠깐 쉬는 중. 파리도 기다리고 있어요.','Paused. The flies are waiting, too.','休憩中。ハエも待っています。','已暂停，果蝇也在等待。','En pausa. Las moscas también esperan.'],
 playing:['살금살금. 화면에 붙어 있을 때만 잡혀요.','Easy does it. Only perched flies can be caught.','そっと近づこう。とまっているハエだけ捕まえられます。','慢慢靠近，只有停落的果蝇才能被抓住。','Con cuidado. Solo puedes atrapar moscas posadas.'],
 hit:['잡았다! 다음 파리를 찾아보세요.','Caught! Find the next one.','捕まえた！次のハエを探そう。','抓到了！寻找下一只。','¡Atrapada! Busca la siguiente.'],
 miss:['빗나갔어요. 가까운 파리들이 놀랐어요.','Missed. Nearby flies were startled.','外れました。近くのハエが驚きました。','没打中，附近的果蝇受惊了。','Fallaste. Las moscas cercanas se asustaron.'],
 airborne:['날고 있어요. 다시 앉을 때를 노려보세요.','It is flying. Wait for it to land.','飛んでいます。着地を待とう。','它正在飞，等落下再抓。','Está volando. Espera a que se pose.'],
 end:['화면 정리 시간 끝!','Screen-cleaning time is up!','画面のお掃除、終了！','清理屏幕的时间到了！','¡Se acabó la limpieza de pantalla!'],
 retry:['다시 도전','Try again','再挑戦','再次挑战','Volver a intentar'],newBest:['새 최고 기록','New personal best','自己新記録','个人新纪录','Nuevo récord personal'],
 settings:['모니터 환경','Monitor setup','モニター環境','显示器设置','Configuración del monitor'],
 count:['파리 수','Fly count','ハエの数','果蝇数量','Número de moscas'],difficulty:['반응 속도','Reaction speed','反応速度','反应速度','Velocidad de reacción'],
 relaxed:['느긋하게','Relaxed','のんびり','悠闲','Tranquila'],normal:['보통','Normal','普通','普通','Normal'],agile:['아주 민첩하게','Very agile','とても敏捷','非常敏捷','Muy ágil'],
 size:['파리 크기','Fly size','ハエの大きさ','果蝇大小','Tamaño de mosca'],small:['작게','Small','小さく','小','Pequeña'],standard:['기본','Standard','標準','标准','Estándar'],large:['잘 보이게','Easy to see','見やすく','醒目','Fácil de ver'],
 brightness:['화면 밝기','Screen brightness','画面の明るさ','屏幕亮度','Brillo de pantalla'],sound:['효과음','Sound effects','効果音','音效','Efectos de sonido'],fullscreen:['전체화면','Fullscreen','全画面','全屏','Pantalla completa'],exitFullscreen:['전체화면 종료','Exit fullscreen','全画面を終了','退出全屏','Salir de pantalla completa'],
 settingsHint:['파리 수·크기·반응 속도를 바꾸면 새 라운드가 시작됩니다.','Changing count, size or reaction speed resets the round.','数・大きさ・反応速度を変えると新しいラウンドになります。','更改数量、大小或反应速度会重置回合。','Cambiar cantidad, tamaño o reacción reinicia la ronda.'],
 how:['잡는 요령','How to catch them','捕まえるコツ','捕捉技巧','Cómo atraparlas'],
 ruleOne:['천천히 접근해서 클릭. 모바일에서는 파리를 바로 터치하세요.','Approach slowly and click. On mobile, tap the fly directly.','ゆっくり近づいてクリック。スマホではハエを直接タップ。','缓慢靠近后点击，手机上直接轻触果蝇。','Acércate despacio y pulsa. En móvil, toca la mosca.'],
 ruleTwo:['그림자가 멀어지고 날개가 퍼지면 비행 중입니다. 앉을 때까지 기다리세요.','A separated shadow and spread wings mean it is flying. Wait until it lands.','影が離れ、羽が広がったら飛行中。とまるまで待とう。','影子离开身体且翅膀张开表示正在飞行，请等待落下。','Una sombra separada y alas abiertas indican vuelo. Espera a que se pose.'],
 ruleThree:['1.8초 안에 연속으로 잡으면 콤보 보너스. 놓치면 콤보가 끊겨요.','Catch again within 1.8 seconds for a combo bonus. A miss breaks the combo.','1.8秒以内の連続捕獲でコンボ加点。外すとコンボが途切れます。','1.8秒内连续捕获获得连击奖励，失误会中断连击。','Atrapa otra en 1,8 segundos para sumar combo. Un fallo lo rompe.'],
 keys:['키보드: 화면을 선택한 뒤 방향키로 조준, Shift로 천천히, Enter·Space로 잡기.','Keyboard: focus the screen, aim with arrows, hold Shift to slow down, Enter / Space to catch.','キーボード: 画面を選び、矢印で照準、Shiftでゆっくり、Enter・Spaceで捕獲。','键盘：选中屏幕后用方向键瞄准，Shift减速，Enter或空格捕捉。','Teclado: enfoca la pantalla, apunta con flechas, Shift para ir lento, Enter / Espacio para atrapar.'],
 observing:['커서 근처 파리의 반응','Reaction of the fly near your cursor','カーソル付近のハエの反応','光标附近果蝇的反应','Reacción de la mosca cerca del cursor'],
 motion:['움직임 감지','Motion detected','動きを検出','运动感知','Movimiento detectado'],threat:['회피 신호','Avoidance signal','回避信号','回避信号','Señal de evasión'],motor:['움직임 출력','Movement output','運動出力','运动输出','Salida de movimiento'],
 perched:['붙어 쉬는 중','Resting on the glass','画面で休息中','停在屏幕上休息','Descansando en el cristal'],walking:['화면 위를 걷는 중','Walking on the screen','画面を歩行中','正在屏幕上爬行','Caminando por la pantalla'],grooming:['다리를 비비는 중','Grooming its legs','脚を身繕い中','正在搓腿','Acicalándose las patas'],flying:['날아올라 피하는 중','Flying away','飛んで回避中','正在飞起躲避','Se aleja volando'],waiting:['다음 파리가 오는 중','Another fly is arriving','次のハエが到着中','下一只果蝇即将到来','Llega otra mosca'],
 note:['가상 모니터 안에서만 진행되는 게임입니다. 초파리 행동과 반응 수치는 게임용으로 단순화했으며 실제 신경 신호가 아닙니다.','This game runs only inside the virtual monitor. Fly behavior and reaction values are simplified game rules, not real neural signals.','仮想モニター内だけで遊ぶゲームです。行動や反応値はゲーム向けに簡略化したもので、実際の神経信号ではありません。','游戏仅在虚拟显示器内运行，果蝇行为与反应数值为简化游戏规则，并非真实神经信号。','El juego funciona solo dentro del monitor virtual. El comportamiento y los valores son reglas simplificadas, no señales neurales reales.'],
 monitorNote:['画面清掃メモ','Screen cleaning memo','画面清掃メモ','屏幕清洁便笺','Nota de limpieza'],
 memoTitle:['오늘 할 일','Today’s checklist','今日の予定','今日清单','Lista de hoy'],memoOne:['화면 밝기 조절','Adjust brightness','明るさを調整','调节亮度','Ajustar brillo'],memoTwo:['먼지와 파리 구분','Tell dust from flies','ホコリとハエを区別','区分灰尘和果蝇','Distinguir polvo de moscas'],memoThree:['움직이는 점 잡기','Catch the moving dots','動く点を捕まえる','抓住移动的小点','Atrapar los puntos que se mueven'],
 canvasLabel:['모니터 위 초파리 잡기. 방향키로 조준하고 Enter로 잡으세요.','Catch flies on the monitor. Aim with arrow keys and press Enter.','モニターのハエを捕獲。矢印キーで照準、Enterで捕獲。','捕捉显示器上的果蝇，方向键瞄准并按Enter。','Atrapa moscas en el monitor. Apunta con flechas y pulsa Enter.']
};
Object.assign(COPY,{
 "subtitle": [
  "한 번에 한 마리. 화면 위를 걷는 초파리를 잡고, 오른쪽에서 그 개체의 뇌 반응을 관찰하세요.",
  "One fly at a time. Catch the fly on the screen and follow its brain responses on the right.",
  "一度に1匹。画面のハエを捕まえ、右側でその個体の脳反応を観察しましょう。",
  "每次一只。捕捉屏幕上的果蝇，并在右侧观察该个体的脑反应。",
  "Una mosca a la vez. Atrápala en la pantalla y observa sus respuestas cerebrales a la derecha."
 ],
 "oneFly": [
  "한 마리씩",
  "One at a time",
  "1匹ずつ",
  "每次一只",
  "Una a la vez"
 ],
 "singleMonitor": [
  "현재 모니터 위 개체",
  "Currently on the monitor",
  "現在のモニター上の個体",
  "当前屏幕上的个体",
  "Individuo en el monitor"
 ],
 "brainTitle": [
  "이 파리의 뇌",
  "This fly’s brain",
  "このハエの脳",
  "这只果蝇的脑",
  "El cerebro de esta mosca"
 ],
 "brainCaption": [
  "JFRC2 해부학 지도 위에 현재 개체의 가상 활성 신호를 표시합니다.",
  "Current-fly simulated activity on the JFRC2 anatomical atlas.",
  "JFRC2解剖学マップに現在の個体の仮想活動信号を表示します。",
  "在JFRC2解剖图谱上显示当前个体的模拟活动信号。",
  "Actividad simulada de la mosca actual sobre el atlas anatómico JFRC2."
 ],
 "brainAria": [
  "현재 초파리의 뇌 지도. 드래그 또는 방향키로 회전할 수 있습니다.",
  "Brain atlas of the current fly. Rotate by dragging or using arrow keys.",
  "現在のハエの脳マップ。ドラッグや矢印キーで回転できます。",
  "当前果蝇的脑图谱，可拖动或使用方向键旋转。",
  "Atlas cerebral de la mosca actual. Gira arrastrando o con las flechas."
 ],
 "brainReset": [
  "시점 초기화",
  "Reset view",
  "視点を初期化",
  "重置视角",
  "Restablecer vista"
 ],
 "brainHint": [
  "뇌를 드래그해 돌리거나 부위 이름을 눌러 강조해보세요.",
  "Drag to rotate the brain; select a region to highlight it.",
  "脳をドラッグして回転、領域名を押して強調できます。",
  "拖动旋转脑图，选择区域名称以高亮显示。",
  "Arrastra para girar el cerebro y selecciona una región para resaltarla."
 ],
 "brainSignal": [
  "현재 개체의 활성 기록",
  "Current individual’s activity history",
  "現在の個体の活動履歴",
  "当前个体的活动记录",
  "Historial de actividad del individuo actual"
 ],
 "brainModelNote": [
  "뇌 모양은 해부학 템플릿이며 활성값은 게임 모델입니다. 잡히면 신호가 줄고 다음 개체가 오면 기록을 새로 시작합니다.",
  "The shape is an anatomical template; activity is a game model. Signals fall after capture, and history resets for the next fly.",
  "形状は解剖学的テンプレート、活動値はゲームモデルです。捕獲後に信号が減り、次の個体で履歴をリセットします。",
  "脑形态来自解剖模板，活动值为游戏模型。捕获后信号下降，下一只出现时重置记录。",
  "La forma es una plantilla anatómica; la actividad es un modelo de juego. Tras capturarla baja la señal y el historial se reinicia con la siguiente."
 ],
 "settingsHint": [
  "크기·반응 속도를 바꾸면 새 라운드가 시작됩니다.",
  "Changing size or reaction speed resets the round.",
  "大きさ・反応速度を変えると新しいラウンドになります。",
  "更改大小或反应速度会重置回合。",
  "Cambiar tamaño o reacción reinicia la ronda."
 ],
 "ruleThree": [
  "한 마리를 잡으면 다음 한 마리가 옵니다. 4초 안에 이어서 잡으면 콤보 보너스가 붙어요.",
  "After a catch, one new fly arrives. Catch it within 4 seconds for a combo bonus.",
  "捕獲すると次の1匹が来ます。4秒以内に続けて捕まえるとコンボ加点。",
  "捕获后下一只会出现，4秒内继续捕获可获得连击奖励。",
  "Tras una captura llega otra mosca. Atrápala en 4 segundos para sumar combo."
 ],
 "miss": [
  "빗나갔어요. 파리가 놀라 날아갈 수 있어요.",
  "Missed. The fly may startle and take off.",
  "外れました。ハエが驚いて飛ぶことがあります。",
  "没打中，果蝇可能受惊飞走。",
  "Fallaste. La mosca puede asustarse y volar."
 ],
 "hit": [
  "잡았어요! 다음 한 마리가 오는 중입니다.",
  "Caught! The next fly is arriving.",
  "捕まえた！次の1匹が来ます。",
  "抓到了！下一只即将到来。",
  "¡Atrapada! Ya llega la siguiente."
 ]
});
export function tr(key){return localized(COPY[key]||[key,key,key,key,key]);}
export function translate(){document.querySelectorAll('[data-copy]').forEach(node=>node.textContent=tr(node.dataset.copy));document.documentElement.lang=localized(['ko','en','ja','zh','es']);document.title=tr('title')+' | FLY LAB';}
