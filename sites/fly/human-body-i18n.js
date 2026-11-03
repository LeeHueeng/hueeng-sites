import {localized} from './i18n.js?v=20260914g';
const WORDS={
 title:['인간 몸 × 초파리 신경계','Human body × fly nervous system','人の体 × ハエの神経系','人体 × 果蝇神经系统','Cuerpo humano × sistema nervioso de mosca'],
 headline:['작은 뇌, 낯선 몸.','Small brain. Unfamiliar body.','小さな脳、見知らぬ体。','小小大脑，陌生身体。','Cerebro pequeño. Cuerpo desconocido.'],
 intro:['냄새를 좇는 신호, 피하려는 반사. 두 다리와 두 팔은 그 명령을 어떻게 받아들일까요?','Odor-seeking signals. Avoidance reflexes. How will two legs and two arms interpret them?','匂いを追う信号、避ける反射。2本の脚と腕はどう受け取るでしょう？','追逐气味的信号、躲避反射，两条腿和两只手臂会如何执行？','Señales que siguen olores y reflejos de evasión. ¿Cómo las interpretan dos piernas y dos brazos?'],
 back:['모든 실험','All experiments','すべての実験','全部实验','Todos los experimentos'],
 note:['가상 신경·신체 게임입니다. 실제 초파리 전체 신경망을 불러오거나 인간에게 이식한 모델이 아니며, 신호·보행·균형 수치는 게임용 근사값입니다.','A fictional neural/body game. It does not load an entire fly connectome or transplant it into a human. Signals, gait and balance are game approximations.','仮想の神経・身体ゲームです。ハエの全神経回路を読み込んだり人へ移植したモデルではなく、信号・歩行・平衡はゲーム用の近似です。','这是虚构的神经与身体游戏，并未载入果蝇完整连接组或将其移植到人体；信号、步态与平衡为游戏近似值。','Juego ficticio de nervios y cuerpo. No carga un conectoma completo ni lo trasplanta a humanos. Señales, marcha y equilibrio son aproximaciones de juego.'],
 sandbox:['자유 실험','Sandbox','自由実験','自由实验','Experimento libre'],challenge:['90초 도전','90-second challenge','90秒チャレンジ','90秒挑战','Reto de 90 segundos'],
 objective:['과일 3개를 모으고 청록색 시작 원으로 돌아오세요.','Collect 3 fruits, then return to the teal starting ring.','果物を3つ集め、青緑色の開始リングへ戻りましょう。','收集3份水果，然后回到青绿色起点圆环。','Recoge 3 frutas y vuelve al círculo inicial verde azulado.'],
 play:['재생','Play','再生','开始','Iniciar'],pause:['일시정지','Pause','一時停止','暂停','Pausar'],reset:['다시 시작','Restart','やり直す','重新开始','Reiniciar'],
 paused:['재생을 누르거나 신경 신호를 보내세요.','Press Play or send a neural signal.','再生を押すか神経信号を送ってください。','点击开始或发送神经信号。','Pulsa Iniciar o envía una señal neural.'],
 time:['시간','Time','時間','时间','Tiempo'],fruit:['과일','Fruit','果物','水果','Fruta'],balance:['균형','Balance','平衡','平衡','Equilibrio'],energy:['체력','Energy','体力','体力','Energía'],best:['최고점','Best','最高点','最高分','Récord'],score:['점수','Score','得点','得分','Puntos'],
 camera:['카메라','Camera','カメラ','镜头','Cámara'],orbit:['둘러보기','Orbit','見回す','环绕','Orbitar'],follow:['따라가기','Follow','追従','跟随','Seguir'],first:['몸의 시점','Body viewpoint','体の視点','身体视角','Vista del cuerpo'],
 tool:['공간 도구','Room tool','空間ツール','场景工具','Herramienta'],observe:['관찰','Observe','観察','观察','Observar'],foodTool:['과일 놓기','Place fruit','果物を置く','放置水果','Colocar fruta'],ballTool:['접근 물체 놓기','Place approaching object','接近物体を置く','放置接近物体','Colocar objeto que se acerca'],
 odorView:['냄새 보기','Show odor','匂いを表示','显示气味','Mostrar olor'],
 placeHint:['도구를 선택하고 바닥을 누르세요. 도전 중에는 배치를 바꿀 수 없습니다.','Select a tool and tap the floor. Layout editing is disabled during a challenge.','ツールを選んで床を押してください。挑戦中は配置を変更できません。','选择工具后点击地板，挑战期间无法改变布局。','Elige una herramienta y pulsa el suelo. No se puede editar durante el reto.'],
 invalid:['장애물과 떨어진 빈 바닥에 놓아주세요. 자유 실험에서만 추가할 수 있습니다.','Choose clear floor away from obstacles. Objects can be added only in sandbox mode.','障害物から離れた空き床を選んでください。追加は自由実験のみです。','请选择远离障碍物的空地，仅自由实验可添加。','Elige suelo libre lejos de obstáculos. Solo se añaden objetos en modo libre.'],
 bridge:['신경 → 몸 변환기','Neural → body decoder','神経 → 身体の変換器','神经 → 身体转换器','Decodificador neural → corporal'],
 bridgeOn:['두 다리 보행으로 변환','Decode for two-legged walking','2脚歩行へ変換','转换为双足步行','Traducir a marcha bípeda'],
 bridgeOff:['직결 실험 · 균형 주의','Direct mapping · balance risk','直結実験 · 平衡に注意','直接映射 · 注意平衡','Mapeo directo · riesgo de desequilibrio'],
 bridgeNote:['켜짐: 보행을 안정화하고 비행 신호를 작은 도약으로 변환합니다. 꺼짐: 팔을 날개처럼 움직이지만 날 수 없고, 급회전에 쉽게 균형을 잃습니다.','On: stabilizes gait and maps flight signals to small hops. Off: arms flap without flight, and abrupt turns can upset balance.','ON: 歩行を安定化し飛行信号を小さな跳躍へ変換。OFF: 腕を羽ばたかせても飛べず、急旋回で平衡を失いやすくなります。','开启：稳定步态并将飞行信号转换为小跳跃。关闭：手臂拍动但无法飞行，急转弯易失衡。','Activado: estabiliza la marcha y convierte vuelo en pequeños saltos. Desactivado: agita brazos sin volar y los giros bruscos pueden desequilibrar.'],
 auto:['자율 신경 제어','Autonomous neural control','自律神経制御','自主神经控制','Control neural autónomo'],
 visual:['시각엽 · 움직임','Optic lobes · motion','視葉 · 動き','视叶 · 运动','Lóbulos ópticos · movimiento'],olfactory:['더듬이엽 · 냄새','Antennal lobes · odor','触角葉 · 匂い','触角叶 · 气味','Lóbulos antenales · olor'],navigation:['중심복합체 · 방향','Central complex · heading','中心複合体 · 方向','中央复合体 · 方向','Complejo central · rumbo'],memory:['버섯체 · 재방문 신호','Mushroom bodies · revisit signal','キノコ体 · 再訪信号','蘑菇体 · 重访信号','Cuerpos pedunculados · señal de retorno'],reflex:['회피 반사 · 모델','Avoidance reflex · model','回避反射 · モデル','回避反射 · 模型','Reflejo de evasión · modelo'],
 leftLeg:['왼쪽 보행 출력','Left gait output','左歩行出力','左侧步行输出','Salida de marcha izquierda'],rightLeg:['오른쪽 보행 출력','Right gait output','右歩行出力','右侧步行输出','Salida de marcha derecha'],
 diagram:['기능별 신호 흐름도 · 해부학적 뇌 영상 아님','Functional signal flow · not an anatomical brain image','機能別信号図 · 解剖学的脳画像ではありません','功能信号图 · 非脑解剖图像','Flujo funcional de señales · no es una imagen anatómica'],
 sensitivity:['입력과 몸 조절','Adjust inputs and body','入力と体を調整','调节输入与身体','Ajustar entradas y cuerpo'],visualGain:['시각 민감도','Visual sensitivity','視覚感度','视觉灵敏度','Sensibilidad visual'],odorGain:['냄새 끌림','Odor attraction','匂いへの誘引','气味吸引','Atracción por olor'],reflexGain:['회피 반사 강도','Avoidance gain','回避反射の強さ','回避反射强度','Intensidad de evasión'],mass:['몸무게','Body mass','体重','体重','Masa corporal'],
 stimulate:['신경 신호 직접 보내기','Send neural signals','神経信号を直接送る','直接发送神经信号','Enviar señales neurales'],
 forward:['전진','Forward','前進','前进','Avanzar'],left:['좌회전','Turn left','左旋回','左转','Girar izquierda'],right:['우회전','Turn right','右旋回','右转','Girar derecha'],brake:['정지 신호','Stop signal','停止信号','停止信号','Señal de parada'],flight:['비행 신호','Flight signal','飛行信号','飞行信号','Señal de vuelo'],groom:['몸단장','Groom','身繕い','梳理身体','Acicalarse'],
 keys:['W 전진 · A/D 회전 · S 정지 · Space 비행 신호 · G 몸단장. 버튼은 누르는 동안 신호를 보냅니다.','W forward · A/D turn · S stop · Space flight · G groom. Hold buttons to keep sending signals.','W前進 · A/D旋回 · S停止 · Space飛行 · G身繕い。押している間、信号を送ります。','W前进 · A/D转向 · S停止 · 空格飞行 · G梳理，按住按钮持续发送信号。','W avanzar · A/D girar · S parar · Espacio volar · G acicalar. Mantén pulsado para enviar señales.'],
 search:['냄새와 움직임을 탐색하고 있어요.','Searching for odor and motion.','匂いと動きを探索中。','正在探索气味与运动。','Buscando olores y movimiento.'],
 smell:['냄새 입력이 커졌어요. 바람과 좌우 차이를 따라 움직여요.','Odor input has risen. Following wind and left/right differences.','匂い入力が増えました。風と左右差に沿って移動します。','气味输入增强，跟随风向和左右差异移动。','Aumenta el olor. Sigue el viento y las diferencias entre lados.'],
 escape:['커지는 시각 자극! 회피 방향으로 몸을 돌려요.','Expanding visual stimulus! Turning the body away.','拡大する視覚刺激！体を回避方向へ。','视觉刺激正在扩大！转身避让。','¡Estímulo visual en expansión! Gira para evitarlo.'],
 home:['과일을 모았어요. 청록색 시작 원으로 돌아가세요.','Fruit collected. Return to the teal starting ring.','果物を集めました。青緑色の開始リングへ。','已收集水果，请返回青绿色起点圆环。','Fruta recogida. Vuelve al círculo inicial.'],
 pickup:['근접 먹이 자극: 멈추고 과일을 회수해요.','Nearby food cue: stopping to collect fruit.','近くの食物刺激: 停止して果物を回収。','近距离食物刺激：停下收取水果。','Comida cercana: se detiene para recoger fruta.'],
 stimulateState:['외부 신경 자극이 운동 출력에 합쳐지고 있어요.','External stimulation is being combined with motor outputs.','外部神経刺激が運動出力に加わっています。','外部神经刺激正在叠加到运动输出。','La estimulación externa se combina con las salidas motoras.'],
 hop:['비행 명령을 인간의 작은 도약으로 변환해요.','Mapping a flight command to a small human hop.','飛行命令を人の小さな跳躍へ変換。','将飞行指令转换为人体小跳跃。','Convierte vuelo en un pequeño salto humano.'],
 noWings:['팔을 날개처럼 움직이지만, 이 몸에는 날개가 없어요.','The arms flap, but this body has no wings.','腕を羽ばたかせても、この体に翼はありません。','手臂像翅膀一样拍动，但身体没有翅膀。','Agita los brazos, pero este cuerpo no tiene alas.'],
 groomState:['몸단장 신호를 팔과 손의 움직임으로 변환해요.','Mapping grooming signals to arm and hand movements.','身繕い信号を腕と手の動きへ変換。','将梳理信号转换为手臂和手的动作。','Convierte acicalamiento en movimientos de brazos y manos.'],
 fallen:['몸이 균형을 잃었어요. 잠시 후 다시 일어납니다.','The body lost balance. It will stand up shortly.','体が平衡を失いました。少し後に立ち上がります。','身体失去平衡，稍后会重新站起。','El cuerpo perdió el equilibrio. Se levantará pronto.'],
 success:['낯선 몸으로 임무 성공!','Mission complete in an unfamiliar body!','見知らぬ体で任務成功！','用陌生的身体完成了任务！','¡Misión cumplida en un cuerpo desconocido!'],
 timeout:['이번 도전은 여기까지','Challenge ended','今回の挑戦は終了','本次挑战结束','Reto terminado'],
 retry:['다시 도전','Try again','再挑戦','再次挑战','Reintentar'],
 failHint:['입력 강도를 낮추거나 운동 변환기를 켜서 다시 도전해보세요.','Try lower gains or enable the motor decoder.','入力を弱めるか運動変換器をONにして再挑戦しましょう。','尝试降低输入强度或开启运动转换器。','Prueba con menor intensidad o activa el decodificador.'],
 webgl:['3D 화면을 시작하지 못했습니다. WebGL을 지원하는 브라우저에서 다시 열어주세요.','Could not start 3D. Open in a browser with WebGL support.','3Dを開始できません。WebGL対応ブラウザーで開いてください。','无法启动3D，请使用支持WebGL的浏览器。','No se pudo iniciar el 3D. Usa un navegador compatible con WebGL.']
};
Object.assign(WORDS,{
 "brainTitle": [
  "인간 몸을 움직이는 초파리 뇌",
  "The fly brain driving the human body",
  "人の体を動かすハエの脳",
  "驱动人体的果蝇脑",
  "El cerebro de mosca que mueve el cuerpo humano"
 ],
 "brainCaption": [
  "해부학 뇌 지도 위에서 이 게임의 감각·운동 신호를 볼 수 있습니다.",
  "View this game’s sensory and motor signals on an anatomical brain atlas.",
  "このゲームの感覚・運動信号を解剖学的脳マップ上で表示します。",
  "在脑解剖图谱上查看本游戏的感觉与运动信号。",
  "Observa las señales sensoriales y motoras del juego sobre un atlas cerebral anatómico."
 ],
 "brainReset": [
  "시점 초기화",
  "Reset view",
  "視点を初期化",
  "重置视角",
  "Restablecer vista"
 ],
 "brainLive": [
  "현재 제어 신호와 연결",
  "Linked to current control signals",
  "現在の制御信号と連動",
  "连接当前控制信号",
  "Conectado a las señales de control"
 ],
 "brainHistory": [
  "부위별 활성 기록",
  "Regional activity history",
  "領域別の活動履歴",
  "各区域活动记录",
  "Historial de actividad por región"
 ],
 "brainModelNote": [
  "형태는 JFRC2 해부학 템플릿, 색상·활성값은 현재 게임 모델의 신호입니다. 실제 전체 신경망이나 측정된 뇌 활동을 재현한 것은 아닙니다.",
  "The shape is the JFRC2 anatomical template; colors and activity values come from this game’s model. This is not a reconstruction of a complete neural network or measured brain activity.",
  "形状はJFRC2解剖学テンプレート、色・活動値は現在のゲームモデルの信号です。実際の全神経回路や測定脳活動の再現ではありません。",
  "形态来自JFRC2解剖模板，颜色及活动值来自当前游戏模型，并非完整神经网络或实测脑活动的重建。",
  "La forma corresponde a la plantilla anatómica JFRC2; colores y valores proceden del modelo del juego. No reconstruye una red neural completa ni actividad cerebral medida."
 ]
});
export function tr(key){return localized(WORDS[key]||[key,key,key,key,key]);}
export function translate(){document.querySelectorAll('[data-copy]').forEach(node=>node.textContent=tr(node.dataset.copy));document.title=tr('title')+' | FLY LAB';document.documentElement.lang=localized(['ko','en','ja','zh','es']);}
