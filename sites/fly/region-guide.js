import { localized } from './i18n.js?v=20260914g';

// Locale order matches i18n.js: Korean, English, Japanese, Chinese, Spanish.
// This is educational copy, not an additional neural or behavioral model.
const UI = {
  title: ['작은 뇌, 영역별 사용 설명서','A field guide to the little brain','小さな脳の各領域ガイド','小小大脑的分区指南','Guía de las regiones del pequeño cerebro'],
  intro: ['영역 이름을 누르면 뇌에서 위치가 강조됩니다. 실제 역할과 게임 속 표현을 나란히 읽어 보세요.','Select a region to highlight it in the atlas. Compare its biological role with what the game illustrates.','領域名を選ぶとアトラス上の位置が強調されます。実際の役割とゲームの表現を比べてみましょう。','选择区域名称可在图谱中突出显示其位置，对照了解真实功能与游戏中的表达。','Selecciona una región para resaltarla en el atlas y comparar su función biológica con la representación del juego.'],
  quickTitle: ['이 부분은 무슨 일을 할까요?','What does this part do?','この部分は何をする？','这个区域做什么？','¿Qué hace esta parte?'],
  quickHint: ['위의 영역 이름을 눌러 보세요. 역할 설명과 연구 자료가 함께 표시됩니다.','Choose a region above to see its role and the supporting research.','上の領域名を選ぶと、役割と関連研究が表示されます。','点击上方区域名称，查看功能解释和相关研究。','Elige una región arriba para consultar su función y los estudios relacionados.'],
  readMore: ['역할 자세히 읽기','Read the detailed guide','詳しい説明を読む','阅读详细说明','Leer la explicación completa'],
  all: ['전체 뇌 / 여섯 영역 비교','Whole brain / compare six regions','脳全体 / 6領域を比較','整个大脑 / 比较六个区域','Cerebro completo / comparar seis regiones'],
  overview: ['감각은 나뉘어 들어오고, 행동은 함께 만들어집니다.','Separate sensory routes, coordinated behavior.','感覚の入口は別々、行動は協調して生まれます。','感官信息分路进入，行为由多个区域协作产生。','Entradas sensoriales distintas, comportamiento coordinado.'],
  overviewText: ['시각엽은 시각, 더듬이엽은 초기 후각, AMMC는 더듬이의 기계감각에 관련됩니다. 중심복합체·버섯체·가쪽부속엽도 다른 회로들과 연결되어 방향 선택, 학습, 움직임에 기여합니다. 한 영역이 한 행동을 혼자 지휘하는 구조는 아닙니다. 아래에서 하나를 골라 자세히 읽어 보세요.','Vision, smell and antennal mechanics enter through different pathways. Navigation, learning and movement involve interacting circuits, not one isolated controller per behavior. Choose a region for its detailed explanation.','視覚・嗅覚・触角の機械感覚には異なる経路があります。方向選択・学習・運動は複数の回路の協調によるもので、各行動を一つの領域だけが支配するわけではありません。領域を選んで詳しく見てみましょう。','视觉、嗅觉和触角机械感觉通过不同通路传入。导航、学习和运动由相互连接的回路参与，并非一种行为只对应一个独立控制中心。选择区域可阅读详情。','La visión, el olfato y la mecanosensación antenal llegan por vías diferentes. La navegación, el aprendizaje y el movimiento implican circuitos conectados, no un controlador aislado para cada conducta. Elige una región para leer más.'],
  flow: ['정보는 대략 이렇게 이어집니다','A simplified information route','情報の流れを簡単に見る','简化的信息传递路径','Una ruta simplificada de información'],
  flowNote: ['설명을 위한 요약입니다. 모든 연결이나 일대일 배선을 뜻하지 않습니다.','A teaching sketch, not every connection or a one-to-one wiring diagram.','説明用の要約であり、すべての接続や一対一の配線を示すものではありません。','仅用于解释，不代表全部连接或一一对应的线路。','Esquema didáctico: no muestra todas las conexiones ni un cableado uno a uno.'],
  science: ['연구에서 알려진 역할','WHAT RESEARCH SHOWS','研究で知られている役割','研究已知的功能','LO QUE MUESTRA LA INVESTIGACIÓN'],
  game: ['이 게임에서는 어떻게 보이나요?','WHAT THE GAME SHOWS','ゲームではどう見える？','游戏中如何表现？','QUÉ REPRESENTA EL JUEGO'],
  watch: ['이렇게 관찰해 보세요','Try observing this','こんな観察をしてみよう','可以这样观察','Prueba a observar esto'],
  caution: ['혼동하지 마세요','An important distinction','ここは区別しましょう','请注意区分','Una distinción importante'],
  disclaimer: ['화면의 0–100%는 게임 변수로 계산한 상대적 표시값입니다. 80%라고 해서 신경세포 80%가 발화하거나 실제 뇌 활동이 80%라는 뜻은 아닙니다. JFRC2 표면은 해부학적 형태이며, 색과 그래프는 실제 칼슘 영상·전기 기록·전뇌 신경 시뮬레이션이 아닙니다.','The 0–100% display is a relative game-generated index. An 80% reading does not mean 80% of neurons are firing or that measured brain activity is 80%. JFRC2 provides anatomical surfaces; colors and traces are not calcium imaging, electrical recordings or a whole-brain neural simulation.','0–100%はゲーム変数から計算した相対指標です。80%は神経細胞の80%が発火しているという意味ではありません。JFRC2は解剖学的な表面形状であり、色やグラフは実測のカルシウム画像・電気記録・全脳神経シミュレーションではありません。','0–100%是由游戏变量计算的相对指标。80%不代表80%的神经元正在放电，也不是实测脑活动达到80%。JFRC2提供解剖表面；颜色与曲线并非钙成像、电生理记录或全脑神经模拟。','El 0–100% es un índice relativo calculado con variables del juego. Un 80% no significa que dispare el 80% de las neuronas ni que la actividad cerebral medida sea del 80%. JFRC2 aporta superficies anatómicas; los colores y las curvas no son imágenes de calcio, registros eléctricos ni una simulación neuronal de todo el cerebro.']
};

const entry = (tag,location,path,facts,watch,caution) => ({tag,location,path,facts,watch,caution});
const CONTENT = {
  visual: [
    entry('움직이는 장면을 분석하는 시각 처리 회로','위치: 뇌 양옆에서 크게 펼쳐진 시각 영역입니다.',
      ['겹눈','시각엽의 병렬 회로','시각 정보 출력','방향·행동 관련 회로'],
      [['어느 쪽으로 움직이는지 계산','시각엽의 T4·T5 세포에는 서로 다른 이동 방향에 반응하는 집단이 있습니다. T4는 밝아지는 경계, T5는 어두워지는 경계의 움직임을 주로 처리합니다.'],['한 장의 사진이 아니라 시간에 따른 변화','서로 다른 시간 특성의 시각 입력을 조합해 움직임을 계산합니다. 이렇게 얻은 신호는 주변 장면의 이동에 맞춰 방향을 조절하는 데 쓰입니다.']],
      '파리잡기에서 파리 가까이 포인터를 움직이거나, 방에서 파리가 이동할 때 OL 표시를 함께 보세요. 이 값은 게임의 움직임·위협 변수에 연결된 표현입니다.',
      '게임은 겹눈에 맺히는 실제 영상을 계산하거나 T4·T5 회로를 구현하지 않습니다. OL 수치가 높다고 특정 물체를 인식했다고 단정할 수 없습니다.'),
    entry('Visual circuits that analyze a moving scene','Location: the large visual regions on either side of the brain.',
      ['Compound eyes','Parallel optic-lobe circuits','Visual output','Orientation and behavior circuits'],
      [['Which way did it move?','T4 and T5 populations prefer different motion directions. T4 mainly detects moving bright edges; T5 detects moving dark edges.'],['Change over time, not a photograph','Inputs with different timing properties contribute to motion computation. These signals support turning responses to a moving visual scene.']],
      'Move the pointer near a fly in Hunt, or watch OL while a fly travels through the room. The display follows game motion and threat variables.',
      'The game does not render a retinal image or implement T4/T5 circuits. A high OL index cannot establish recognition of a particular object.'),
    entry('動く景色を分析する視覚回路','位置: 脳の両側に大きく広がる視覚領域です。',
      ['複眼','視葉の並列回路','視覚情報の出力','方向・行動の回路'],
      [['動く方向を計算','T4・T5細胞には異なる移動方向に反応する集団があります。T4は明るい境界、T5は暗い境界の動きを主に処理します。'],['静止画ではなく時間変化','時間特性の異なる入力を組み合わせて動きを計算します。その信号は、動く景色に応じて向きを調節する行動に役立ちます。']],
      'ハエ捕りでポインターをハエに近づけるか、部屋を移動するハエとOL表示を見比べてください。表示はゲーム内の動き・脅威の変数に対応します。',
      'ゲームは実際の網膜像やT4・T5回路を計算していません。OLが高くても、特定の物体を認識したとは言えません。'),
    entry('分析移动场景的视觉回路','位置：大脑两侧展开的较大视觉区域。',
      ['复眼','视叶并行回路','视觉信息输出','方向与行为回路'],
      [['计算物体向哪边移动','T4和T5细胞群对不同移动方向有偏好。T4主要处理明亮边缘的移动，T5主要处理暗边缘的移动。'],['处理时间变化，而非一张照片','回路结合时间特性不同的输入计算运动。这些信号参与根据移动场景调整转向的行为。']],
      '在捕蝇游戏中将指针移近果蝇，或对照房间内的移动观察OL。这里的显示与游戏的运动、威胁变量相连。',
      '游戏没有计算真实的视网膜图像，也没有实现T4/T5回路。OL数值较高不能证明果蝇识别了某个物体。'),
    entry('Circuitos visuales que analizan escenas en movimiento','Ubicación: las grandes regiones visuales a ambos lados del cerebro.',
      ['Ojos compuestos','Circuitos paralelos del lóbulo óptico','Salida visual','Orientación y conducta'],
      [['¿Hacia dónde se mueve?','Las poblaciones T4 y T5 prefieren distintas direcciones. T4 detecta principalmente bordes claros en movimiento y T5, bordes oscuros.'],['Cambios temporales, no una fotografía','Entradas con diferentes propiedades temporales contribuyen al cálculo del movimiento. Estas señales participan en los giros ante una escena visual móvil.']],
      'Acerca el puntero a una mosca en Caza u observa OL mientras explora la habitación. El indicador sigue variables de movimiento y amenaza del juego.',
      'No calculamos imágenes retinianas ni circuitos T4/T5. Un índice OL alto no demuestra que la mosca haya reconocido un objeto concreto.')
  ],
  olfactory: [
    entry('냄새 신호를 처음 정리하는 후각 처리 회로','위치: 더듬이에서 온 후각 정보가 들어오는 한 쌍의 뇌 영역입니다.',
      ['더듬이·작은턱수염의 후각 수용세포','더듬이엽 사구체','투사 뉴런','버섯체·가쪽뿔'],
      [['냄새마다 다른 활동 조합','사구체는 후각 입력이 모이는 작은 처리 단위입니다. 더듬이엽의 입력과 출력을 비교한 실험에서는 출력 뉴런의 냄새 표현이 더 안정적이고 서로 구별되기 쉬워졌습니다.'],['단순한 냄새 전달선이 아닙니다','국소 뉴런은 여러 사구체와 연결됩니다. 연결 방식과 반응이 다양하므로 냄새 처리는 단일 농도계보다 훨씬 복잡한 회로 계산입니다.']],
      '먹이 실험이나 방에 과일을 놓고, 파리가 가까워지고 멀어질 때 AL 표시를 비교해 보세요. 여기서는 가상 먹이 냄새의 세기를 단순화해 보여줍니다.',
      '실제 냄새의 종류는 여러 세포의 활동 패턴과 관련됩니다. AL 전체의 숫자 하나로 냄새의 정체나 좋아하는 정도를 읽을 수 없고, 살충제 독성 수치도 아닙니다.'),
    entry('The first brain circuits to organize odor signals','Location: paired brain regions receiving olfactory input from the antennae.',
      ['Antennal / maxillary-palp receptors','Antennal-lobe glomeruli','Projection neurons','Mushroom body / lateral horn'],
      [['Different odor patterns','Glomeruli are small units where olfactory inputs converge. Experiments comparing inputs and outputs found more reliable, distinguishable odor representations in projection neurons.'],['More than a relay wire','Local neurons connect glomeruli with diverse wiring and responses. Olfactory processing therefore involves circuit interactions, not a single concentration meter.']],
      'Place fruit in the food experiment or room. Compare AL as a fly approaches and leaves: the game simplifies this to synthetic food-scent intensity.',
      'One whole-region value cannot identify an odor or measure how much a fly likes it. AL is not a pesticide-toxicity gauge.'),
    entry('匂いの信号を最初に整理する嗅覚回路','位置: 触角からの嗅覚入力を受け取る左右一対の脳領域です。',
      ['触角・小顎鬚の嗅覚受容細胞','触角葉の糸球体','投射ニューロン','キノコ体・外側角'],
      [['匂いごとに異なる活動パターン','糸球体は嗅覚入力が集まる小さな処理単位です。入力と出力を比べた実験では、投射ニューロンの匂い表現がより安定し、区別しやすくなりました。'],['単なる中継線ではありません','局所ニューロンは複数の糸球体を結び、接続や応答も多様です。嗅覚処理は一つの濃度計より複雑な回路の働きです。']],
      'エサ実験や部屋に果物を置き、ハエが近づく時と離れる時のALを比較してください。ゲームでは仮想の匂いの強さに単純化しています。',
      '領域全体の数値一つから匂いの種類や好みは読み取れません。ALは殺虫剤の毒性を測る指標でもありません。'),
    entry('首先整理气味信号的嗅觉回路','位置：接收触角嗅觉输入的一对脑区。',
      ['触角与颚须嗅觉受体细胞','触角叶嗅小球','投射神经元','蘑菇体与外侧角'],
      [['不同气味形成不同组合','嗅小球是嗅觉输入汇聚的小型处理单元。比较输入与输出的实验发现，投射神经元对气味的表达更稳定，也更容易区分。'],['不只是传递信号的线路','局部神经元连接多个嗅小球，其连接方式和反应具有多样性。嗅觉处理涉及复杂的回路作用，而非一个简单浓度计。']],
      '在食物实验或房间中放置水果，对比果蝇靠近和离开时的AL。游戏将其简化为虚拟食物气味的强度。',
      '一个脑区的单一数值不能确定气味种类或喜爱程度。AL也不是杀虫剂毒性指标。'),
    entry('Los primeros circuitos cerebrales que organizan los olores','Ubicación: regiones pares que reciben información olfativa de las antenas.',
      ['Receptores de antenas y palpos','Glomérulos antenales','Neuronas de proyección','Cuerpo pedunculado / cuerno lateral'],
      [['Patrones distintos para los olores','Los glomérulos son unidades donde converge información olfativa. Al comparar entradas y salidas, los experimentos hallaron representaciones más fiables y distinguibles en las neuronas de proyección.'],['Más que un cable de transmisión','Las neuronas locales conectan glomérulos con conexiones y respuestas diversas. El procesamiento olfativo implica interacciones de circuitos, no un simple medidor de concentración.']],
      'Coloca fruta en el experimento de comida o en la habitación. Compara AL cuando una mosca se acerca y se aleja: mostramos una intensidad de olor ficticia.',
      'Un único valor regional no identifica el olor ni cuánto le gusta a la mosca. AL tampoco mide la toxicidad del insecticida.')
  ],
  navigation: [
    entry('내가 향한 방향과 가려는 방향을 다루는 회로','구성: 타원체(EB), 부채꼴체(FB), 전대뇌다리(PB), 결절(NO) 등을 포함하는 뇌 중앙의 구조군입니다.',
      ['시각 단서·자기 움직임','CX의 현재 방향 표현','목표 방향과 비교','조향 관련 출력'],
      [['몸 안의 나침반 같은 방향 표현','타원체 관련 뉴런 집단의 활동 위치는 파리가 향한 방향과 함께 달라집니다. 시각 표지와 자기 움직임 정보를 이용하므로 어둠 속에서도 방향 표현이 유지될 수 있습니다.'],['어디를 향하고, 어디로 갈 것인가','현재 방향과 목표 방향은 같은 정보가 아닙니다. PFL3 관련 연구는 이 정보를 결합해 몸 기준의 좌우 조향 신호로 바꾸는 회로를 보여줍니다.']],
      '방에서 파리가 벽이나 가구를 피하며 돌아설 때 CX와 이동 경로를 함께 보세요. 게임에서는 회전·탐험 상태를 요약한 지표입니다.',
      '실제 방향 정보는 활동 패턴의 위치 등으로 표현됩니다. CX의 퍼센트가 높다고 나침반이 더 정확한 것은 아니며, 이 게임은 해당 회로를 재현하지 않습니다.'),
    entry('Circuits for current heading and intended direction','Structures: a central group including the ellipsoid body (EB), fan-shaped body (FB), protocerebral bridge (PB) and noduli (NO).',
      ['Visual cues / self-motion','Current heading in CX','Comparison with a goal','Steering-related output'],
      [['An internal compass-like signal','The location of population activity in ellipsoid-body circuits tracks heading. Visual landmarks and self-motion contribute, allowing a heading representation to persist in darkness.'],['Where am I facing, and where should I go?','Heading and goal are different variables. PFL3 research shows how their combination can produce left/right steering signals relative to the body.']],
      'Watch CX and the trail as a fly turns around room obstacles. The game index summarizes turning and exploration.',
      'Real heading depends on patterns such as activity location. A higher percentage does not mean a more accurate compass; the game does not implement this circuit.'),
    entry('現在の向きと目標方向を扱う回路','構成: 楕円体(EB)、扇状体(FB)、前大脳橋(PB)、結節(NO)などを含む脳中央の構造群です。',
      ['視覚の手がかり・自己運動','CXでの現在方向の表現','目標方向との比較','操舵に関わる出力'],
      [['体内コンパスのような表現','楕円体の回路では集団活動の位置がハエの向きに応じて変わります。視覚的な目印と自己運動を利用し、暗闇でも向きの表現を維持できます。'],['現在の向きと目標は別の情報','PFL3に関する研究は、現在方向と目標方向の情報を組み合わせ、体を基準にした左右の操舵信号へ変換する回路を示しています。']],
      '部屋で壁や家具を避けて曲がる時に、CXと移動経路を見比べてください。ゲームでは旋回・探索状態を要約しています。',
      '実際の向きは活動位置などのパターンで表現されます。CXの数値が高いほどコンパスが正確という意味ではなく、この回路も再現していません。'),
    entry('处理当前朝向与目标方向的回路','组成：位于脑中央，包括椭球体(EB)、扇形体(FB)、前脑桥(PB)和结节(NO)等结构。',
      ['视觉线索与自身运动','CX中的当前朝向表达','与目标方向比较','转向相关输出'],
      [['类似内部指南针的表达','椭球体相关回路的群体活动位置会随朝向变化。视觉地标与自身运动共同参与，使方向表达在黑暗中也能持续。'],['面向哪里，与想去哪里不同','PFL3相关研究展示了回路如何结合当前朝向与目标方向，将其转换为以身体为参照的左右转向信号。']],
      '观察果蝇绕过墙壁或家具时的CX和路径。游戏中的指标概括了转向与探索状态。',
      '真实方向信息取决于活动位置等模式。CX百分比越高并不意味着指南针越准确，游戏也未实现该神经回路。'),
    entry('Circuitos para la orientación actual y la dirección deseada','Estructuras: grupo central que incluye cuerpo elipsoide (EB), cuerpo en abanico (FB), puente protocerebral (PB) y nódulos (NO).',
      ['Señales visuales / movimiento propio','Orientación actual en CX','Comparación con la meta','Salida relacionada con el giro'],
      [['Una señal parecida a una brújula interna','La posición de la actividad poblacional en circuitos del cuerpo elipsoide sigue la orientación. Usa referencias visuales y movimiento propio, y puede mantener la representación en oscuridad.'],['La orientación y la meta son distintas','Los estudios de PFL3 muestran cómo combinar ambas informaciones para generar señales de giro izquierda/derecha relativas al cuerpo.']],
      'Observa CX y el recorrido cuando una mosca gira para evitar muebles o paredes. El índice resume giros y exploración.',
      'La orientación real depende de patrones como la posición de la actividad. Un porcentaje mayor no significa una brújula más precisa; no implementamos ese circuito.')
  ],
  memory: [
    entry('경험을 바탕으로 자극의 의미를 바꾸는 학습 회로','구성: 케니언 세포(KC), 버섯체 출력 뉴런(MBON), 도파민 입력이 상호작용합니다.',
      ['감각 입력','케니언 세포 + 강화 신호','버섯체 출력 뉴런','접근·회피 선택의 변화'],
      [['같은 냄새도 경험에 따라 달라집니다','냄새 같은 자극을 케니언 세포 집단이 표현하고, 버섯체 출력은 접근 또는 회피 선택에 영향을 줍니다. 먹이나 불쾌한 경험과 연결된 자극에 다르게 반응하는 학습을 연구할 때 중요한 회로입니다.'],['기억은 저장 칸 하나가 아닙니다','도파민 신호와 여러 버섯체 구획의 상호작용이 기억의 형성과 변화에 관여합니다. 최근 연구는 단기·장기 기억 회로가 서로 영향을 주는 과정도 보여줍니다.']],
      '자극을 준 직후와 시간이 지난 뒤의 MB 표시를 비교해 보세요. 이 게임의 MB 값은 최근 자극이 서서히 줄어드는 흔적일 뿐, 경험으로 행동을 학습하는 모델은 아닙니다.',
      '수치가 높다고 기억을 더 많이 저장했거나 똑똑해졌다는 뜻은 아닙니다. 현재 게임에는 실제 연합학습이나 장기 기억 회로가 구현되어 있지 않습니다.'),
    entry('Learning circuits that change what a stimulus means','Components: Kenyon cells (KCs), mushroom-body output neurons (MBONs) and interacting dopamine inputs.',
      ['Sensory input','Kenyon cells + reinforcement','Mushroom-body output','Changed approach / avoidance'],
      [['The same odor, a different experience','Kenyon-cell populations represent stimuli; mushroom-body outputs influence approach and avoidance. This makes the circuit important for learning associations with rewarding or unpleasant outcomes.'],['Memory is not one storage box','Dopamine and interactions among compartments influence memory formation and change. Research also shows interactions between short- and long-term memory circuits.']],
      'Compare MB just after a stimulus and later. Here MB is only a fading recent-stimulus trace, not a system that learns behavior from experience.',
      'A larger index does not mean more memories or greater intelligence. Associative learning and long-term memory circuits are not implemented.'),
    entry('経験によって刺激の意味を変える学習回路','構成: ケニオン細胞(KC)、キノコ体出力ニューロン(MBON)、ドーパミン入力が相互作用します。',
      ['感覚入力','ケニオン細胞と強化信号','キノコ体出力','接近・回避の選択変化'],
      [['同じ匂いでも経験で反応が変わる','ケニオン細胞集団が刺激を表現し、キノコ体の出力は接近や回避に影響します。報酬や不快な結果と刺激を結びつける学習で重要な回路です。'],['記憶は一つの保存箱ではありません','ドーパミンと複数の区画の相互作用が記憶の形成や変化に関わります。短期・長期記憶回路が互いに影響する仕組みも研究されています。']],
      '刺激直後と時間が経過した後のMBを比較してください。ここでの値は最近の刺激が減衰する痕跡であり、経験から行動を学ぶ仕組みではありません。',
      '数値が高くても記憶量や知能が増えたわけではありません。連合学習や長期記憶回路は実装していません。'),
    entry('根据经验改变刺激意义的学习回路','组成：Kenyon细胞(KC)、蘑菇体输出神经元(MBON)与多巴胺输入相互作用。',
      ['感觉输入','Kenyon细胞与强化信号','蘑菇体输出','趋近或回避选择的改变'],
      [['同一种气味，经历不同就可能反应不同','Kenyon细胞群表达刺激，蘑菇体输出影响趋近或回避。这一回路参与将刺激与奖励或不愉快结果联系起来的学习。'],['记忆并非单一存储盒','多巴胺信号和多个分区间的相互作用参与记忆形成与改变。研究还展示了短期和长期记忆回路彼此影响的机制。']],
      '比较刺激刚发生时与过一段时间后的MB。这里仅显示近期刺激逐渐衰减的痕迹，并不让果蝇通过经验学习行为。',
      '数值更高不代表记忆更多或更聪明。游戏没有实现真实的联想学习或长期记忆回路。'),
    entry('Circuitos de aprendizaje que cambian el significado de un estímulo','Componentes: células de Kenyon (KC), neuronas de salida (MBON) y entradas de dopamina que interactúan.',
      ['Entrada sensorial','Células de Kenyon y refuerzo','Salida del cuerpo pedunculado','Cambio de acercamiento / evitación'],
      [['El mismo olor, otra experiencia','Las células de Kenyon representan estímulos y las salidas influyen en acercarse o evitar. El circuito participa en aprender asociaciones con resultados gratificantes o desagradables.'],['La memoria no es una sola caja','La dopamina y las interacciones entre compartimentos influyen en formar y modificar recuerdos. También se han observado interacciones entre circuitos de memoria a corto y largo plazo.']],
      'Compara MB justo después de un estímulo y más tarde. Aquí solo mostramos una huella que disminuye; no hay aprendizaje de conducta por experiencia.',
      'Un índice mayor no significa más recuerdos ni más inteligencia. No implementamos aprendizaje asociativo ni circuitos de memoria a largo plazo.')
  ],
  touch: [
    entry('더듬이가 흔들리는 방식을 읽는 기계감각 회로','AMMC: 더듬이 기계감각·운동 중추. 더듬이의 존스턴 기관에서 오는 입력을 받습니다.',
      ['바람·가까운 소리의 공기 움직임','더듬이의 흔들림','존스턴 기관','AMMC와 후속 회로'],
      [['같은 더듬이로 바람과 소리를 구분','바람에 의한 지속적인 휨과 소리에 의한 빠른 진동은 서로 다른 감각세포 집단을 활성화합니다. 이들은 AMMC의 서로 다른 구역으로 정보를 보냅니다.'],['소리가 계속 같아도 반응은 달라질 수 있습니다','소리의 세기에 적응하는 과정은 청각 신호 표현을 조절합니다. 따라서 기계감각 활동은 단순히 물체에 닿았는지 여부만 나타내는 값이 아닙니다.']],
      '파리가 손이나 물체에 착지하거나 가까워질 때 AMMC 표시를 보세요. 현재 게임은 이 상황을 설명용 기계감각 신호로 대응시킵니다.',
      'AMMC는 모든 촉각의 대표 중추가 아닙니다. 다리·날개·몸 표면의 감각에는 다른 경로도 있으며, 게임은 실제 더듬이 진동·청각·바람 회로를 계산하지 않습니다.'),
    entry('Circuits that read how the antenna moves','AMMC: antennal mechanosensory and motor center, receiving inputs from Johnston’s organ in the antenna.',
      ['Air movement from wind / nearby sound','Antennal deflection','Johnston’s organ','AMMC and downstream circuits'],
      [['One antenna, different kinds of movement','Sustained wind deflections and rapid sound vibrations activate distinct sensory populations. These project to different AMMC zones.'],['Responses also adapt','Adaptation to sound intensity adjusts auditory encoding. Mechanosensory activity is therefore not simply a yes/no indication of touching an object.']],
      'Watch AMMC as flies land on or approach surfaces. The game maps these events to an illustrative mechanosensory signal.',
      'AMMC does not represent all touch. Legs, wings and body surfaces also use other pathways; antennal vibration, hearing and wind circuits are not simulated.'),
    entry('触角の動き方を読み取る機械感覚回路','AMMC: 触角機械感覚・運動中枢。触角のジョンストン器官から入力を受けます。',
      ['風・近くの音による空気の動き','触角の変位','ジョンストン器官','AMMCと後続回路'],
      [['同じ触角で風と音を区別','風による持続的な変位と音による速い振動は、異なる感覚細胞集団を活性化します。それぞれAMMCの異なる区画へ投射します。'],['応答には順応もあります','音の強さへの順応は聴覚信号の表現を調節します。機械感覚の活動は、単に物体に触れたかどうかを示す値ではありません。']],
      'ハエが手や物体に着地したり近づいたりする時、AMMCを見てください。ゲームでは説明用の機械感覚信号として対応させています。',
      'AMMCはすべての触覚を代表しません。脚・翅・体表の感覚には別の経路もあります。触角振動・聴覚・風の回路は再現していません。'),
    entry('读取触角运动方式的机械感觉回路','AMMC：触角机械感觉与运动中枢，接收触角内约翰斯顿器官的输入。',
      ['风或近场声音引起的空气运动','触角偏转','约翰斯顿器官','AMMC及后续回路'],
      [['同一触角区分风与声音','风引起的持续偏转和声音引起的快速振动会激活不同感受细胞群，它们投射至AMMC的不同分区。'],['反应也会适应','对声音强度的适应会调整听觉编码。因此机械感觉活动不只是是否碰到物体的二元指示。']],
      '观察果蝇降落在手或物体上、或靠近表面时的AMMC。游戏将这些情境对应为示意性的机械感觉信号。',
      'AMMC不代表全部触觉。腿、翅和体表感觉也有其他通路。游戏未模拟真实触角振动、听觉或风感回路。'),
    entry('Circuitos que leen cómo se mueve la antena','AMMC: centro mecanosensorial y motor antenal, que recibe señales del órgano de Johnston de la antena.',
      ['Aire movido por viento / sonido cercano','Desviación de la antena','Órgano de Johnston','AMMC y circuitos posteriores'],
      [['Una antena, movimientos diferentes','Las desviaciones sostenidas por viento y las vibraciones rápidas por sonido activan poblaciones sensoriales distintas, que se proyectan a zonas diferentes del AMMC.'],['Las respuestas también se adaptan','La adaptación a la intensidad del sonido ajusta su codificación. La actividad mecanosensorial no indica simplemente si se está tocando un objeto.']],
      'Observa AMMC cuando las moscas aterrizan o se acercan a superficies. El juego relaciona estos eventos con una señal mecanosensorial ilustrativa.',
      'AMMC no representa todo el tacto. Patas, alas y cuerpo también usan otras vías; no simulamos vibraciones antenales, audición ni circuitos del viento.')
  ],
  motor: [
    entry('방향 정보를 실제 조향으로 연결하는 회로의 접점','위치: 중심복합체 양옆과 연결되는 가쪽부속엽(LAL)입니다.',
      ['CX의 방향·목표 정보','LAL의 조향 관련 신호','하행 뉴런 네트워크','배쪽신경삭의 운동 회로'],
      [['왼쪽과 오른쪽의 차이가 중요합니다','LAL로 출력하는 PFL3 세포의 좌우 활동 차이는 파리의 회전과 관련됩니다. 단순히 활동이 큰가보다 어느 쪽 신호가 더 큰가가 조향에 중요할 수 있습니다.'],['날개와 다리는 뇌 한곳이 혼자 움직이지 않습니다','하행 뉴런은 뇌와 배쪽신경삭의 운동 회로를 연결합니다. 행동을 유도하는 신호도 여러 하행 뉴런을 동원하므로 운동 제어는 분산된 네트워크의 협력입니다.']],
      '파리의 이동 속도와 회피 행동을 LAL 표시와 비교해 보세요. 방에서 살충제 노출로 움직임이 둔해질 때 표시가 달라지는 것도 게임 규칙에 따른 표현입니다.',
      'LAL은 운동과 관련된 여러 영역 중 하나입니다. 화면의 단일 값은 좌우 조향 차이나 근육 명령이 아니고, 실제 살충제가 이 부위만 손상시킨다는 뜻도 아닙니다.'),
    entry('An interface linking direction information to steering','Location: lateral accessory lobes (LAL), connected with circuits on either side of the central complex.',
      ['CX heading / goal information','Steering-related signals in LAL','Descending-neuron networks','Ventral nerve cord motor circuits'],
      [['The left-right difference matters','Activity differences between left and right PFL3 outputs in LAL relate to turning. Steering can depend on the difference, not just total activity.'],['Movement is distributed','Descending neurons link the brain to motor circuits in the ventral nerve cord. Behavior-driving signals recruit networks of these neurons rather than acting through one isolated controller.']],
      'Compare LAL with movement and escape. Changes during insecticide-induced slowing in the room also follow illustrative game rules.',
      'LAL is one of several motor-related regions. The single value is neither a left-right steering difference nor a muscle command, and does not imply selective pesticide damage to LAL.'),
    entry('方向情報と実際の操舵をつなぐ回路の接点','位置: 中心複合体の左右の回路とつながる外側付属葉(LAL)です。',
      ['CXの向き・目標情報','LALの操舵関連信号','下行ニューロン群','腹側神経索の運動回路'],
      [['左右の差が重要です','LALへ出力するPFL3細胞の左右の活動差は旋回と関連します。単なる活動量ではなく、左右どちらが強いかが操舵に重要になり得ます。'],['運動は分散した回路の協力','下行ニューロンは脳と腹側神経索の運動回路を結びます。行動を起こす信号も複数の下行ニューロンを動員し、一つの領域だけで制御するわけではありません。']],
      '移動速度や回避行動とLALを比較してください。部屋で殺虫剤により動きが鈍くなる時の変化もゲーム規則による表現です。',
      'LALは運動関連領域の一つです。単一の値は左右の操舵差や筋肉への命令ではなく、殺虫剤がLALだけを損傷するという意味でもありません。'),
    entry('连接方向信息与实际转向的回路接口','位置：外侧附叶(LAL)，与中央复合体两侧相关回路相连。',
      ['CX中的朝向与目标信息','LAL转向相关信号','下行神经元网络','腹神经索运动回路'],
      [['左右差异很重要','PFL3细胞在LAL中的左右输出活动差与转向相关。影响转向的可能是两侧差值，而不仅是活动总量。'],['运动由分布式回路协作','下行神经元连接大脑与腹神经索中的运动回路。引发行为的信号会招募多个下行神经元网络，并非单一控制中心独立执行。']],
      '对比LAL与移动速度、逃避行为。房间中喷雾导致运动减慢时的显示变化，也只是游戏规则的示意表达。',
      'LAL只是多个运动相关区域之一。单一数值不是左右转向差或肌肉命令，也不意味着真实杀虫剂只损伤LAL。'),
    entry('Una interfaz entre información direccional y control del giro','Ubicación: lóbulos accesorios laterales (LAL), conectados con circuitos a ambos lados del complejo central.',
      ['Orientación y meta en CX','Señales de giro en LAL','Redes de neuronas descendentes','Circuitos motores del cordón nervioso ventral'],
      [['Importa la diferencia izquierda-derecha','Las diferencias de actividad entre las salidas PFL3 izquierda y derecha en LAL se relacionan con los giros. Puede importar la diferencia, no solo la actividad total.'],['El movimiento está distribuido','Las neuronas descendentes unen el cerebro con circuitos motores del cordón nervioso ventral. Las señales que inducen conductas reclutan redes, no un controlador aislado.']],
      'Compara LAL con el movimiento y la huida. Los cambios al ralentizarse por insecticida en la habitación también obedecen a reglas ilustrativas del juego.',
      'LAL es una de varias regiones motoras. El valor único no es una diferencia de giro ni una orden muscular, y no implica que el insecticida dañe selectivamente LAL.')
  ]
};

const SOURCES = {
  visual: [
    ['Maisak et al. (2013), Nature','A directional tuning map of Drosophila elementary motion detectors','https://www.nature.com/articles/nature12320'],
    ['Behnia et al. (2014), Nature','Processing properties of ON and OFF pathways for Drosophila motion detection','https://www.nature.com/articles/nature13427']
  ],
  olfactory: [
    ['Bhandawat et al. (2007), Nature Neuroscience','Sensory processing in the Drosophila antennal lobe increases reliability and separability of ensemble odor representations','https://www.nature.com/articles/nn1976'],
    ['Chou et al. (2010), Nature Neuroscience','Diversity and wiring variability of olfactory local interneurons in the Drosophila antennal lobe','https://www.nature.com/articles/nn.2489']
  ],
  navigation: [
    ['Seelig & Jayaraman (2015), Nature','Neural dynamics for landmark orientation and angular path integration','https://www.nature.com/articles/nature14446'],
    ['Nature (2024), PFL3','Converting an allocentric goal into an egocentric steering signal','https://www.nature.com/articles/s41586-023-07006-3']
  ],
  memory: [
    ['Aso et al. (2014), eLife','Mushroom body output neurons encode valence and guide memory-based action selection in Drosophila','https://elifesciences.org/articles/4580'],
    ['Nature (2024), dopamine and memory','Dopamine-mediated interactions between short- and long-term memory dynamics','https://www.nature.com/articles/s41586-024-07819-w']
  ],
  touch: [
    ['Yorozu et al. (2009), Nature','Distinct sensory representations of wind and near-field sound in the Drosophila brain','https://www.nature.com/articles/nature07843'],
    ['Nature Communications (2017), sound adaptation','Fast intensity adaptation enhances the encoding of sound in Drosophila','https://www.nature.com/articles/s41467-017-02453-9']
  ],
  motor: [
    ['Nature (2024), PFL3','Converting an allocentric goal into an egocentric steering signal','https://www.nature.com/articles/s41586-023-07006-3'],
    ['Braun et al. (2024), Nature','Descending networks transform command signals into population motor control','https://www.nature.com/articles/s41586-024-07523-9']
  ]
};

function element(tag,className,text){
  const node=document.createElement(tag);
  if(className)node.className=className;
  if(text!==undefined)node.textContent=text;
  return node;
}
function button(className,text,action){
  const node=element('button',className,text);node.type='button';node.addEventListener('click',action);return node;
}
function sourceLink(source,label,className){
  const link=element('a',className,label);link.href=source[2];link.target='_blank';link.rel='noopener noreferrer';link.title=source[1];
  link.setAttribute('aria-label',`${label}: ${source[1]}`);return link;
}
const label=key=>localized(UI[key]);

export function renderRegionGuide(regions,selected,onSelect){
  let root=document.getElementById('brainRegionGuide');
  if(!root){root=element('section','brain-region-guide');root.id='brainRegionGuide';root.setAttribute('aria-labelledby','brainGuideTitle');document.querySelector('#gamePage .lab-grid').after(root);}
  const focused=root.contains(document.activeElement)?document.activeElement.dataset.guideFocus:null;
  root.replaceChildren();
  const heading=element('header','brain-guide-heading');
  const headingCopy=element('div');headingCopy.append(element('p','eyebrow','ANATOMY / FIELD GUIDE'));
  const title=element('h2','',label('title'));title.id='brainGuideTitle';title.tabIndex=-1;
  headingCopy.append(title,element('p','',label('intro')));heading.append(headingCopy,element('span','model-badge','JFRC2 / 06 REGIONS'));root.append(heading);
  const layout=element('div','brain-guide-layout');const menu=element('div','brain-guide-menu');menu.setAttribute('role','group');menu.setAttribute('aria-label',label('title'));
  for(const r of regions){
    const copy=localized(CONTENT[r.id]);
    const choice=button('brain-guide-choice',undefined,()=>onSelect(r.id));
    choice.dataset.guideFocus=r.id;choice.style.setProperty('--region',r.color);choice.setAttribute('aria-pressed',String(selected===r.id));choice.setAttribute('aria-controls','brainGuideContent');
    choice.append(element('span','',r.code),element('strong','',localized(r.name)),element('small','',copy.tag));menu.append(choice);
  }
  const all=button('brain-guide-all',label('all'),()=>onSelect(null));all.dataset.guideFocus='all';all.setAttribute('aria-pressed',String(!selected));all.setAttribute('aria-controls','brainGuideContent');menu.append(all);
  const content=element('article','brain-guide-content');content.id='brainGuideContent';
  const region=regions.find(r=>r.id===selected);
  if(region){
    const copy=localized(CONTENT[region.id]);const sources=SOURCES[region.id];content.style.setProperty('--region',region.color);
    content.append(element('p','eyebrow',region.code),element('h3','',localized(region.name)),element('p','brain-guide-tagline',copy.tag),element('p','brain-guide-location',copy.location),element('p','brain-guide-flow-label',label('flow')));
    const flow=element('ol','brain-guide-flow');for(const text of copy.path){const step=element('li');step.append(element('span','',text));flow.append(step);}
    content.append(flow,element('p','brain-guide-flow-note',label('flowNote')));
    const columns=element('div','brain-guide-columns');const science=element('section','brain-guide-science');science.append(element('h4','',label('science')));
    copy.facts.forEach(([name,text],index)=>{const fact=element('div','brain-guide-fact');const paragraph=element('p','',text);paragraph.append(sourceLink(sources[index],`[${index+1}]`,'brain-guide-citation'));fact.append(element('h5','',name),paragraph);science.append(fact);});
    const game=element('section','brain-guide-game');game.append(element('h4','',label('game')),element('p','',localized(region.description)));
    for(const [kind,text] of [['watch',copy.watch],['caution',copy.caution]]){const box=element('div',`brain-guide-${kind}`);box.append(element('strong','',label(kind)),element('p','',text));game.append(box);}
    columns.append(science,game);content.append(columns);
    const refs=element('div','brain-guide-sources');sources.forEach((source,index)=>refs.append(sourceLink(source,`[${index+1}] ${source[0]}`,'')));content.append(refs);
  }else{
    content.append(element('h3','',label('overview')),element('p','brain-guide-overview-intro',label('overviewText')));
    const overview=element('div','brain-guide-overview');
    for(const r of regions){const copy=localized(CONTENT[r.id]);const card=button('',undefined,()=>onSelect(r.id));card.dataset.guideFocus=`overview-${r.id}`;card.style.setProperty('--region',r.color);card.append(element('strong','',`${r.code} / ${localized(r.name)}`),element('span','',copy.tag));overview.append(card);}
    content.append(overview);
  }
  content.append(element('p','brain-guide-disclaimer',label('disclaimer')));layout.append(menu,content);root.append(layout);

  let quick=document.getElementById('regionQuickGuide');
  if(!quick){quick=element('div','region-quick-guide');quick.id='regionQuickGuide';document.getElementById('regionList').after(quick);}
  quick.replaceChildren();quick.style.setProperty('--region',region?.color||'#c4ee85');
  quick.append(element('strong','',region?`${localized(region.name)} / ${region.code}`:label('quickTitle')),element('p','',region?localized(CONTENT[region.id]).tag:label('quickHint')));
  const read=button('',label('readMore'),()=>{title.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});title.focus({preventScroll:true});});quick.append(read);
  if(focused){const restored=[...root.querySelectorAll('[data-guide-focus]')].find(node=>node.dataset.guideFocus===focused)||[...menu.querySelectorAll('[data-guide-focus]')].find(node=>node.dataset.guideFocus===selected);restored?.focus({preventScroll:true});}
}
