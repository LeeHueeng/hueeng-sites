import { localized } from './i18n.js?v=20260914g';
const TEXT={
 allGames:['모든 게임','All games','すべてのゲーム','全部游戏','Todos los juegos'],roomGame:['파리의 작은 방','The little room','ハエの小さな部屋','果蝇的小房间','La pequeña habitación'],language:['언어','Language','言語','语言','Idioma'],
 title:['방역 배치 실험실','The placement lab','防除配置ラボ','防治布局实验室','Laboratorio de distribución'],
 subtitle:['같은 방, 같은 장비. 위치만 바꾸면 얼마나 달라질까요? 포충기와 가상 분사기를 배치하고 비교하는 새로운 초파리 게임입니다.','Same room, same equipment. What changes when you move it? A new fly game for arranging traps and virtual sprayers.','同じ部屋、同じ装置。位置だけを変えると何が違う？捕虫器と仮想噴霧器を配置して比べる新しいハエゲームです。','相同房间、相同设备，只改位置会有什么不同？这是布局捕虫器与虚拟喷雾器的新果蝇游戏。','La misma habitación y los mismos equipos. ¿Qué cambia al moverlos? Un nuevo juego para distribuir trampas y pulverizadores virtuales.'],
 disclaimer:['실험용 게임 모델입니다. 결과는 실제 제품의 성능·안전거리·최적 설치 위치를 보장하지 않습니다. 좌표·시간·분사량은 게임 값이며, 실제 사용은 제품 표시사항과 현장 전문가의 판단을 따르세요.','Experimental game model. Results do not establish real product efficacy, safe distances or optimal installation. Coordinates, time and spray amounts are game values; real use requires product directions and appropriate professional judgment.','実験用ゲームモデルです。実製品の性能・安全距離・最適設置場所を保証しません。座標・時間・噴霧量はゲーム値です。実際の使用は製品表示と専門家の判断に従ってください。','这是实验性游戏模型，不保证真实产品性能、安全距离或最佳安装位置。坐标、时间和喷雾量均为游戏数值；实际使用应遵循产品说明和专业判断。','Modelo experimental de juego. No establece eficacia real, distancias seguras ni ubicaciones óptimas. Coordenadas, tiempo y pulverización son valores ficticios; el uso real requiere seguir las instrucciones y el criterio profesional.'],
 layoutTitle:['방 배치도','Room layout','部屋の配置','房间布局','Distribución'],planView:['평면도 · 편집','Plan · edit','平面図・編集','平面图 · 编辑','Plano · editar'],sceneView:['3D · 관찰','3D · observe','3D・観察','3D · 观察','3D · observar'],roomSize:['방 크기','Room size','部屋サイズ','房间大小','Tamaño'],population:['파리 수','Fly count','ハエの数','果蝇数量','Moscas'],wind:['가상 기류','Game airflow','仮想気流','虚拟气流','Aire ficticio'],windNone:['없음','None','なし','无','Ninguno'],windEast:['서 → 동','West → east','西 → 東','西 → 东','Oeste → este'],windWest:['동 → 서','East → west','東 → 西','东 → 西','Este → oeste'],windNorth:['남 → 북','South → north','南 → 北','南 → 北','Sur → norte'],windSouth:['북 → 남','North → south','北 → 南','北 → 南','Norte → sur'],seed:['난수 씨앗','Seed','乱数シード','随机种子','Semilla'],
 tools:['배치 도구','Placement tools','配置ツール','布局工具','Herramientas'],select:['선택 · 이동','Select · move','選択・移動','选择 · 移动','Seleccionar · mover'],trap:['포충기','Fly trap','捕虫器','捕虫器','Trampa'],spray:['가상 분사기','Virtual sprayer','仮想噴霧器','虚拟喷雾器','Pulverizador virtual'],desk:['책상','Desk','机','书桌','Mesa'],bed:['침대','Bed','ベッド','床','Cama'],plant:['화분','Plant','鉢植え','盆栽','Planta'],food:['먹이','Food','エサ','食物','Comida'],erase:['지우개','Eraser','消しゴム','橡皮擦','Borrar'],
 canvasAria:['배치도. 도구를 선택하고 눌러 설치하거나 드래그로 옮기세요. 아래 좌표 편집기로도 배치할 수 있습니다.','Layout. Choose a tool, click to place, or drag to move. Coordinate controls below provide a keyboard alternative.','配置図。ツールを選んでクリックし配置、ドラッグで移動。下の座標入力でも操作できます。','布局图。选择工具后点击放置或拖动移动，也可使用下方坐标输入。','Plano: elige herramienta y pulsa para colocar o arrastra para mover. También puedes usar coordenadas.'],
 play:['실험 시작','Run experiment','実験開始','开始实验','Iniciar experimento'],pause:['일시정지','Pause','一時停止','暂停','Pausar'],resume:['이어 보기','Resume','再開','继续','Continuar'],restart:['같은 조건 재시작','Restart same conditions','同じ条件で再開','相同条件重新开始','Reiniciar mismas condiciones'],speed:['재생 속도','Playback','再生速度','播放速度','Reproducción'],heat:['활동 열지도','Activity heatmap','活動ヒートマップ','活动热力图','Mapa de actividad'],ranges:['가정한 영향권','Assumed influence','仮定の影響範囲','假设影响范围','Influencia supuesta'],
 editHint:['도구 선택 → 빈 곳에 배치. ‘선택·이동’으로 드래그하세요. 평면도는 위에서 본 모델 단위이며, 분사기는 먹이 주변의 게임상 제외 구역에 놓을 수 없습니다.','Choose a tool and place it in empty space; Select lets you drag. The plan uses model units. Sprayers cannot enter the game’s exclusion zone around food.','ツールを選び空き場所に配置。「選択」でドラッグできます。平面図はモデル単位です。噴霧器はエサ周辺のゲーム上の除外区域には置けません。','选择工具并放在空处，用“选择”拖动。平面图使用模型单位；喷雾器不能进入食物周边的游戏排除区。','Elige una herramienta y coloca en un espacio libre; Seleccionar permite arrastrar. El plano usa unidades del modelo. Los pulverizadores no pueden entrar en la zona ficticia de exclusión alrededor de comida.'],
 coordinates:['좌표로 배치 · 키보드 조작','Place by coordinates · keyboard controls','座標で配置・キーボード操作','坐标布局 · 键盘操作','Colocar por coordenadas · teclado'],selected:['선택 항목','Selected item','選択項目','所选项目','Elemento seleccionado'],none:['새로 배치','Place new','新しく配置','新建放置','Colocar nuevo'],placeAt:['좌표 적용','Apply coordinates','座標を適用','应用坐标','Aplicar coordenadas'],delete:['선택 삭제','Delete selected','選択を削除','删除所选','Eliminar seleccionado'],importRoom:['작은 방 배치 불러오기','Import little room','小さな部屋を読み込む','导入小房间布局','Importar pequeña habitación'],defaults:['기본 배치','Default layout','初期配置','默认布局','Distribución inicial'],
 resultsTitle:['이번 실험','This experiment','今回の実験','本次实验','Este experimento'],captured:['포획됨','Captured','捕獲済み','已捕获','Capturadas'],knocked:['일시적 녹다운','Temporary knockdown','一時的ノックダウン','暂时击倒','Derribo temporal'],active:['아직 활동 중','Still active','活動中','仍在活动','Aún activas'],reduction:['시간가중 활동 감소','Time-weighted reduction','時間加重の活動減少','时间加权活动减少','Reducción ponderada'],scoreNote:['포획은 계속 유지되고, 녹다운은 회복할 수 있습니다. 두 수는 겹치지 않습니다. 감소율은 60 게임초 동안의 활동을 누적해 계산합니다.','Capture is permanent within a run; knockdown can recover. Counts do not overlap. Reduction integrates activity over 60 game seconds.','捕獲は実験中維持され、ノックダウンは回復可能です。数は重複しません。減少率は60ゲーム秒の活動を積算します。','单次实验中捕获不可逆，击倒可恢复；两者不重复计数。减少率按60游戏秒累计活动计算。','La captura permanece durante la ejecución; el derribo puede recuperarse. No se cuentan dos veces. La reducción integra actividad durante 60 segundos de juego.'],chartAria:['시간에 따른 활동 중 파리 수','Active flies over time','時間ごとの活動個体数','随时间变化的活动果蝇数量','Moscas activas a lo largo del tiempo'],chartLabel:['활동 중 개체 / 게임초','Active flies / game seconds','活動個体 / ゲーム秒','活动个体 / 游戏秒','Activas / segundos de juego'],
 equipment:['포충기 {traps} · 분사기 {sprays} / 분사 {pulses}회','Traps {traps} · sprayers {sprays} / pulses {pulses}','捕虫器 {traps}・噴霧器 {sprays} / 噴霧 {pulses}回','捕虫器 {traps} · 喷雾器 {sprays} / 喷雾 {pulses}次','Trampas {traps} · pulverizadores {sprays} / pulsos {pulses}'],compareTitle:['어디에 놓는 게 나을까요?','Where might it work better?','どこに置くと良いでしょう？','放哪里可能更好？','¿Dónde podría funcionar mejor?'],compareNote:['현재 배치와 최대 11개 다른 배치를 동일 장비 구성으로 비교합니다. 각 배치를 같은 5개 난수 씨앗으로 반복하고 장비 없는 기준 실험도 계산합니다.','Compare the current layout with up to 11 others using the same equipment. Each runs with the same five seeds, plus a no-equipment baseline.','現在の配置と最大11案を同じ装置構成で比較。各案を共通の5シードで繰り返し、装置なしの基準実験も計算します。','保持设备配置相同，将当前布局与最多11个其他布局比较；每个布局使用相同5个种子重复，并计算无设备基线。','Compara la distribución actual con hasta 11 alternativas y los mismos equipos. Cada una usa cinco semillas comunes, además de una referencia sin equipos.'],saveA:['배치 A 저장','Save layout A','配置Aを保存','保存布局A','Guardar distribución A'],restoreA:['배치 A 불러오기','Load layout A','配置Aを読み込む','加载布局A','Cargar distribución A'],compare:['후보 배치 반복 비교','Compare candidate layouts','候補配置を反復比較','重复比较候选布局','Comparar distribuciones'],cancel:['비교 중단','Cancel comparison','比較を中断','取消比较','Cancelar comparación'],
 modelScope:['편집하면 진행 중인 실험은 초기화됩니다. 장비는 최대 6개이며, 비교 중에는 조건을 고정합니다. 기존 방과 다른 게임의 저장 내용은 변경하지 않습니다.','Editing resets the current run. Up to six devices; conditions are locked during comparison. Other games and the original room save are untouched.','編集で実験をリセット。装置は最大6個、比較中は条件を固定します。他のゲームや元の部屋の保存内容は変更しません。','编辑会重置当前实验。最多6个设备，比较时锁定条件。不修改其他游戏和原有房间存档。','Editar reinicia la ejecución. Máximo seis equipos y condiciones bloqueadas al comparar. No se modifican otros juegos ni la habitación original.'],
 rankingTitle:['시험한 후보 중 비교 결과','Results among tested candidates','試した候補の比較結果','已测试候选的比较结果','Resultados de candidatos probados'],uncertainty:['평균 ± 표준편차(5회)입니다. 신뢰구간이 아니며, 시험하지 않은 배치보다 좋다는 뜻도 아닙니다. 이 순위는 이 게임 모델과 설정에만 적용됩니다.','Mean ± standard deviation over five runs, not a confidence interval or proof of a global optimum. The ranking applies only to this game model and configuration.','5回の平均±標準偏差です。信頼区間でも未検討の配置より優れる証明でもありません。このゲームモデルと設定だけの順位です。','显示5次运行的均值±标准差，不是置信区间，也不能证明全局最优。排名仅适用于本游戏模型和设置。','Media ± desviación estándar de cinco ejecuciones, no un intervalo de confianza ni prueba de óptimo global. Solo vale para este modelo y configuración.'],candidate:['배치안','Layout','配置案','布局方案','Distribución'],meanScore:['활동 감소 평균 ± 편차','Reduction mean ± SD','活動減少の平均±偏差','活动减少均值±标准差','Reducción media ± DE'],meanCapture:['평균 포획','Mean captured','平均捕獲','平均捕获','Captura media'],meanKnockdown:['종료 시 평균 녹다운','Mean knockdown at end','終了時の平均ノックダウン','结束时平均击倒','Derribo medio al final'],apply:['적용','Apply','適用','应用','Aplicar'],current:['현재 배치','Current layout','現在の配置','当前布局','Distribución actual'],savedCandidate:['저장한 A','Saved A','保存したA','已保存A','A guardada'],candidateName:['후보 {n}','Candidate {n}','候補 {n}','候选 {n}','Candidato {n}'],winner:['시험한 후보 중 1위: {name} · 활동 감소 {score}%','Best tested candidate: {name} · reduction {score}%','試した候補の1位: {name}・活動減少 {score}%','已测试候选第1名：{name} · 活动减少 {score}%','Mejor candidato probado: {name} · reducción {score}%'],trialInfo:['{count}개 배치 × 5회 + 기준 5회','{count} layouts × 5 + 5 baseline runs','{count}配置 × 5回 + 基準5回','{count}个布局 × 5次 + 5次基线','{count} distribuciones × 5 + 5 referencias'],baseline:['장비 없는 기준: 활동 감소 {score}%, 평균 포획 {captured}. 공통 씨앗: {seeds}','No-equipment baseline: reduction {score}%, mean captured {captured}. Shared seeds: {seeds}','装置なしの基準: 活動減少 {score}%、平均捕獲 {captured}。共通シード: {seeds}','无设备基线：活动减少{score}%，平均捕获{captured}。共用种子：{seeds}','Referencia sin equipos: reducción {score}%, captura media {captured}. Semillas comunes: {seeds}'],
 scienceTitle:['배치의 효과와 모델의 한계','Placement effects and model limits','配置効果とモデルの限界','布局效果与模型局限','Efectos y límites del modelo'],scienceIntro:['반경을 그리는 것만으로 효율을 정하지 않습니다. 파리가 이동하며 장비를 만나는 과정을 반복해 비교합니다. 그래도 현실 방역을 예측하는 검증된 모델은 아닙니다.','A radius alone does not determine the score: simulated encounters are repeated and compared. This is still not a validated predictor of real pest control.','円の広さだけで効率を決めず、ハエと装置の遭遇を繰り返して比べます。ただし実際の防除を予測する検証済みモデルではありません。','效率并非仅由半径决定，而是通过重复模拟果蝇与设备的相遇来比较。但这仍不是经过验证的实际防治预测模型。','La puntuación no depende solo de un radio: repetimos encuentros simulados. Aun así, no es un predictor validado del control real de plagas.'],modelTitle:['이 게임에 넣은 규칙','Rules implemented here','ゲーム内のルール','游戏采用的规则','Reglas del juego'],modelExplanation:['포충기는 거리에 따라 약해지는 가상 유인과 근접 포획을 사용합니다. 가구는 이동과 직선 시야를 막습니다. 분사기는 6 게임초마다 분무를 만들며, 기류에 따라 이동한 구름의 노출이 회피·둔화·일시적 녹다운으로 이어집니다. 노출이 줄면 회복할 수 있습니다.','Traps use distance-decaying attraction and close-range capture. Furniture blocks movement and line of sight. Sprayers emit every six game seconds; drifting clouds cause exposure, escape, slowing and temporary knockdown, with possible recovery.','捕虫器は距離減衰する仮想誘引と近距離捕獲を使います。家具は移動と直線視野を遮ります。噴霧器は6ゲーム秒ごとに噴霧し、気流で動く雲への曝露が回避・減速・一時的ノックダウンを起こします。曝露が減ると回復可能です。','捕虫器采用随距离衰减的虚拟吸引和近距离捕获。家具阻挡移动和直线视野。喷雾器每6游戏秒喷一次，随气流漂移的云团产生暴露、逃避、减速和暂时击倒，暴露降低后可恢复。','Las trampas atraen con fuerza decreciente y capturan de cerca. Los muebles bloquean movimiento y visión recta. Hay pulverización cada seis segundos de juego; las nubes causan exposición, huida, lentitud y derribo temporal, con posible recuperación.'],formula:['활동 감소 = 100 × [1 − 누적 활동량 / (파리 수 × 시간 단계 수)]. 활동 가중치: 정상·회피·과흥분 1, 둔화 0.35, 회복 0.6, 녹다운·포획 0.','Reduction = 100 × [1 − accumulated activity / (fly count × time steps)]. Weights: normal/escape/agitation 1; impaired 0.35; recovery 0.6; knockdown/capture 0.','活動減少 = 100 × [1 − 累積活動量 / (個体数 × 時間ステップ数)]。重み: 通常・回避・興奮1、減速0.35、回復0.6、ノックダウン・捕獲0。','活动减少 = 100 × [1 − 累计活动量 / (果蝇数 × 时间步数)]。权重：正常/逃避/兴奋1，受损0.35，恢复0.6，击倒/捕获0。','Reducción = 100 × [1 − actividad acumulada / (moscas × pasos)]. Pesos: normal/huida/agitación 1; afectada 0,35; recuperación 0,6; derribo/captura 0.'],modelLimit:['計算은 2차원이며 3D는 같은 실험의 시각화입니다. 수치 유체역학, 실제 광원·약제·내성, 알·유충·번식, 실외 유입, 인체 노출·식품 오염은 계산하지 않습니다. 먹이 주변 1.5 모델 단위의 분사 제외 구역도 게임 제약일 뿐 안전거리 지침이 아닙니다.','The model is 2D; 3D is a view of that same run. It omits CFD, real lights/chemicals/resistance, eggs/larvae/reproduction, arrivals from outside, human exposure and food contamination. The 1.5-unit spray exclusion around food is a game constraint, not a safe-distance recommendation.','計算は2Dで、3Dは同じ実験の表示です。流体解析、実際の光源・薬剤・抵抗性、卵・幼虫・繁殖、屋外からの侵入、人体曝露・食品汚染は扱いません。エサ周囲1.5モデル単位の噴霧除外もゲーム制約であり安全距離ではありません。','计算为二维，三维只是同一实验的可视化。不计算流体力学、真实光源/药剂/抗性、卵/幼虫/繁殖、室外进入、人体暴露或食品污染。食物周围1.5模型单位的喷雾排除区只是游戏约束，不是安全距离建议。','El cálculo es 2D; 3D visualiza la misma ejecución. Omite CFD, luces/químicos/resistencia reales, huevos/larvas/reproducción, entradas exteriores y exposición humana o contaminación. La exclusión de 1,5 unidades junto a comida es ficticia, no una distancia de seguridad.'],realTitle:['현실에서는 발생원 관리부터','In reality, address sources first','現実では発生源の管理から','现实中先处理滋生源','En la realidad, empezar por las fuentes'],realText:['실제 초파리 관리에는 먹이 찌꺼기·발효물 같은 발생원을 찾고 제거하는 과정이 중요합니다. 포획 수만으로 번식 문제가 해결됐다고 판단할 수 없습니다. 아래 자료는 예방·관찰·여러 수단을 함께 쓰는 통합적 해충 관리의 배경 자료이며, 게임 계수의 검증 자료는 아닙니다.','Real fruit-fly control includes finding and removing sources such as fermenting food residues. Catch counts alone do not show that breeding is resolved. These sources explain integrated prevention, monitoring and control, not validation of the game coefficients.','実際の管理では発酵した残渣などの発生源を見つけ除去することが重要です。捕獲数だけでは繁殖問題の解決は判断できません。資料は予防・観察・対策を組み合わせる背景説明で、ゲーム係数の検証ではありません。','实际管理需要寻找并清除发酵食物残渣等滋生源。仅凭捕获数不能判断繁殖问题已解决。以下资料解释综合预防、监测和控制，并非验证本游戏参数。','El control real requiere localizar y eliminar fuentes como restos fermentados. Las capturas no demuestran que se haya resuelto la reproducción. Las fuentes explican prevención, seguimiento y control integrado; no validan los coeficientes del juego.'],backToGames:['다른 초파리 게임 보기','Explore more fly games','他のハエゲームへ','探索更多果蝇游戏','Más juegos de moscas'],
 blocked:['겹치거나 방 밖이거나 분사 제외 구역입니다. 다른 위치를 골라 주세요.','Overlapping, outside the room or in a spray-exclusion zone. Choose another position.','重なり・部屋の外・噴霧除外区域です。別の場所を選んでください。','位置重叠、超出房间或处于喷雾排除区，请换个位置。','Hay solapamiento, está fuera o en zona de exclusión. Elige otra posición.'],maxReached:['장비 6개·가구 10개·먹이 4개까지 배치할 수 있습니다.','Limits: six devices, ten furniture items, four food sources.','上限は装置6個・家具10個・エサ4個です。','上限：6个设备、10件家具、4处食物。','Límites: seis equipos, diez muebles y cuatro fuentes de comida.'],edited:['배치를 변경했습니다. 실험은 같은 씨앗으로 다시 시작합니다.','Layout changed. The experiment restarts with the same seed.','配置を変更。同じシードで実験をやり直します。','布局已更改，实验将使用相同种子重新开始。','Distribución cambiada. Se reinicia con la misma semilla.'],saved:['배치 A를 이 브라우저에 저장했습니다.','Layout A saved in this browser.','配置Aをこのブラウザーに保存しました。','布局A已保存在此浏览器。','Distribución A guardada en este navegador.'],savedCompatible:['A와 현재 조건이 같아 공정한 비교에 포함합니다.','A matches current conditions and will join the comparison.','Aは現在と同条件なので比較に含めます。','A与当前条件一致，将纳入比较。','A coincide con las condiciones actuales y se incluirá.'],savedIncompatible:['A와 방·장비 수·조건이 달라 비교에서 제외합니다. 새 A를 저장해 주세요.','A has different room/equipment conditions and is excluded. Save a new A to compare.','Aは部屋・装置・条件が異なるため除外します。新しいAを保存してください。','A的房间、设备或条件不同，已排除；请保存新的A。','A tiene otras condiciones y se excluye. Guarda una nueva A.'],noSaved:['아직 저장한 배치 A가 없습니다.','No layout A saved yet.','配置Aは未保存です。','尚未保存布局A。','No hay distribución A guardada.'],noSavedRoom:['이 브라우저에 저장된 작은 방이 없습니다. 먼저 작은 방 게임에서 방을 만들어 주세요.','No little-room save in this browser. Create a room in that game first.','このブラウザーに小さな部屋の保存がありません。先にそちらで部屋を作ってください。','此浏览器没有小房间存档，请先在该游戏中创建房间。','No hay una pequeña habitación guardada aquí. Créala primero en ese juego.'],imported:['작은 방을 복사했습니다. 원래 방은 그대로이며, 방역 장비는 새로 배치해 주세요.','Room copied; the original is unchanged. Add control devices here.','部屋をコピーしました。元の部屋は変更せず、装置はここで配置してください。','已复制房间，原房间未修改；请在此重新放置防治设备。','Habitación copiada sin cambiar la original. Coloca aquí los equipos.'],needDevice:['포충기나 가상 분사기를 한 개 이상 놓아 주세요.','Place at least one trap or virtual sprayer.','捕虫器か仮想噴霧器を1個以上置いてください。','请至少放置一个捕虫器或虚拟喷雾器。','Coloca al menos una trampa o pulverizador.'],comparing:['반복 실험 {done} / {total}','Repeated runs {done} / {total}','反復実験 {done} / {total}','重复实验 {done} / {total}','Ejecuciones {done} / {total}'],cancelled:['비교를 중단했습니다. 배치는 유지됩니다.','Comparison cancelled; layout preserved.','比較を中断。配置は維持します。','比较已取消，布局已保留。','Comparación cancelada; se conserva la distribución.'],workerError:['비교를 완료하지 못했습니다. 배치는 유지됩니다. 다시 시도해 주세요.','Could not finish comparison. Your layout is preserved; please retry.','比較を完了できませんでした。配置は保持しています。再試行してください。','无法完成比较，布局已保留，请重试。','No se pudo completar. Se conserva tu distribución; vuelve a intentarlo.'],sceneError:['3D 표시를 시작할 수 없어 평면도로 돌아갑니다.','3D unavailable; returning to the plan.','3Dを開始できないため平面図に戻ります。','无法启动3D，返回平面图。','3D no disponible; volvemos al plano.'],design:['배치 편집','Layout editing','配置編集','编辑布局','Editar distribución'],running:['실험 진행 중','Experiment running','実験中','实验进行中','Experimento en marcha'],complete:['60 게임초 완료','60 game seconds complete','60ゲーム秒完了','60游戏秒已完成','60 segundos de juego completos'],observing:['드래그: 회전 / 휠: 확대','Drag: orbit / wheel: zoom','ドラッグ: 回転 / ホイール: 拡大','拖动旋转 / 滚轮缩放','Arrastrar: girar / rueda: ampliar']
};
Object.assign(TEXT,{
 "precision": [
  "계산 정밀도",
  "Calculation fidelity",
  "計算精度",
  "计算精细度",
  "Fidelidad de cálculo"
 ],
 "precisionDefault": [
  "정밀 · 기본",
  "Precise · default",
  "精密 · 標準",
  "精细 · 默认",
  "Preciso · predeterminado"
 ],
 "precisionMaximum": [
  "최대 정밀 · 고부하",
  "Maximum · high workload",
  "最高精密 · 高負荷",
  "最高精细 · 高负载",
  "Máximo · carga alta"
 ],
 "sliceHeight": [
  "농도·기류 단면 높이",
  "Concentration / airflow slice height",
  "濃度・気流の断面高さ",
  "浓度与气流切片高度",
  "Altura del corte de concentración y aire"
 ],
 "deviceHeight": [
  "높이 Y (m)",
  "Height Y (m)",
  "高さ Y (m)",
  "高度 Y (m)",
  "Altura Y (m)"
 ],
 "resolutionPrecise": [
  "3D 격자 최대 0.6 × 0.4 × 0.6 m · 움직임 20 Hz · 농도 10 Hz · 후보당 탐색 6회 / 독립 비교 20회",
  "3D cells up to 0.6 × 0.4 × 0.6 m · movement 20 Hz · fields 10 Hz · 6 screening / 20 independent confirmation runs",
  "3D格子 最大0.6 × 0.4 × 0.6 m · 移動20 Hz · 濃度10 Hz · 探索6回 / 独立比較20回",
  "三维网格最大 0.6 × 0.4 × 0.6 m · 运动20 Hz · 浓度10 Hz · 筛选6次 / 独立比较20次",
  "Celdas 3D de hasta 0.6 × 0.4 × 0.6 m · movimiento 20 Hz · campos 10 Hz · 6 pruebas / 20 confirmaciones independientes"
 ],
 "resolutionMaximum": [
  "3D 격자 최대 0.4 × 0.32 × 0.4 m · 움직임 40 Hz · 농도 20 Hz · 후보당 탐색 8회 / 독립 비교 32회 · 비교에 수 분이 걸릴 수 있습니다.",
  "3D cells up to 0.4 × 0.32 × 0.4 m · movement 40 Hz · fields 20 Hz · 8 screening / 32 independent confirmation runs · comparisons may take several minutes.",
  "3D格子 最大0.4 × 0.32 × 0.4 m · 移動40 Hz · 濃度20 Hz · 探索8回 / 独立比較32回 · 比較に数分かかる場合があります。",
  "三维网格最大 0.4 × 0.32 × 0.4 m · 运动40 Hz · 浓度20 Hz · 筛选8次 / 独立比较32次 · 比较可能需要数分钟。",
  "Celdas 3D de hasta 0.4 × 0.32 × 0.4 m · movimiento 40 Hz · campos 20 Hz · 8 pruebas / 32 confirmaciones independientes · puede tardar varios minutos."
 ],
 "fieldNote": [
  "황갈색은 선택한 높이의 분무 상대농도, 화살표는 계산된 기류입니다. 평면도의 파리·경로는 위에서 본 투영이며, 3D에서는 실제 계산 높이를 보여줍니다. 장치 주변 원은 배치 참고선이지 살충·포획 경계가 아닙니다.",
  "Ochre shows relative spray concentration at the selected height; arrows show computed airflow. Plan-view flies and trails are overhead projections; 3D uses simulated heights. Device circles are placement guides, not kill or capture boundaries.",
  "黄土色は選択した高さの噴霧相対濃度、矢印は計算された気流です。平面図のハエと軌跡は上からの投影で、3Dは計算上の高さを表示します。装置の円は配置目安であり、殺虫・捕獲境界ではありません。",
  "赭色表示所选高度的喷雾相对浓度，箭头表示计算气流。平面图中的果蝇和轨迹为俯视投影，3D显示模拟高度。设备圆圈仅为布局参考，并非杀虫或捕获边界。",
  "El ocre muestra concentración relativa de aerosol a la altura elegida; las flechas, el flujo calculado. La planta proyecta moscas y trayectorias desde arriba; el 3D usa alturas simuladas. Los círculos orientan la colocación, no delimitan efectos."
 ],
 "compareNote": [
  "같은 장치 수로 최대 12개 배치를 탐색합니다. 그중 현재 배치 외 최상위 후보 하나를 고정한 뒤, 탐색에 쓰지 않은 동일한 난수 조건으로 현재 배치와 다시 비교합니다. 계산 중에도 취소할 수 있습니다.",
  "Screen up to 12 layouts with identical device counts. Freeze the best non-current candidate, then compare it with the current layout using paired random seeds never used for screening. You can cancel during computation.",
  "同じ装置数で最大12配置を探索します。現在以外の最良候補を固定し、探索未使用の共通乱数で現在配置と再比較します。計算中も中止できます。",
  "以相同设备数量筛选最多12种布局，固定最佳非当前候选，再使用未参与筛选的配对随机种子与当前布局比较。计算中可以取消。",
  "Explora hasta 12 distribuciones con el mismo número de equipos. Fija la mejor alternativa y la compara con la actual usando semillas emparejadas no usadas en la búsqueda. Puedes cancelar el cálculo."
 ],
 "trialInfo": [
  "탐색 {count}개 배치 × {search}회 · 별도 난수로 현재·후보·무장치 각각 {confirm}회 비교",
  "Screening: {count} layouts × {search} runs · independent confirmation: {confirm} runs each for current, challenger and no-device baseline",
  "探索 {count}配置 × {search}回 · 独立乱数で現在・候補・装置なしを各{confirm}回比較",
  "筛选：{count}种布局 × {search}次 · 使用独立种子对当前、候选及无设备基线各比较{confirm}次",
  "Exploración: {count} distribuciones × {search} pruebas · confirmación independiente: {confirm} pruebas por distribución y referencia sin equipos"
 ],
 "uncertainty": [
  "구간은 반복 시뮬레이션 평균의 95% 신뢰구간입니다. 실제 환경·행동·제품 모델의 오차는 포함하지 않습니다. 이 결과로 현실의 방제 효과나 살포량을 판단하지 마세요.",
  "Intervals are 95% confidence intervals for repeated-simulation means. They exclude environment, behavioral and product-model error. Do not use these results to determine real pest-control efficacy or application amounts.",
  "区間は反復シミュレーション平均の95%信頼区間です。実環境・行動・製品モデルの誤差は含みません。実際の防除効果や散布量の判断には使わないでください。",
  "区间为重复模拟均值的95%置信区间，不包含环境、行为或产品模型误差。请勿据此判断实际防治效果或喷洒量。",
  "Los intervalos son de confianza del 95% para medias de simulación; no incluyen errores del entorno, comportamiento ni producto. No sirven para decidir eficacia real ni cantidades de aplicación."
 ],
 "meanScore": [
  "평균 감소율 [95% 구간]",
  "Mean reduction [95% CI]",
  "平均減少率 [95%区間]",
  "平均减少率 [95%区间]",
  "Reducción media [IC 95%]"
 ],
 "rank": [
  "비교군",
  "Group",
  "比較群",
  "比较组",
  "Grupo"
 ],
 "winner": [
  "독립 비교에서 우세: {name} · 평균 활동 감소 {score}%",
  "Supported by independent comparison: {name} · mean activity reduction {score}%",
  "独立比較で優位: {name} · 平均活動減少 {score}%",
  "独立比较支持：{name} · 平均活动减少 {score}%",
  "Ventaja en comparación independiente: {name} · reducción media {score}%"
 ],
 "keepCurrent": [
  "현재 배치 유지: 후보가 더 낫다고 확신할 근거가 부족합니다.",
  "Keep the current layout: evidence is insufficient to recommend the challenger.",
  "現在配置を維持: 候補の優位を推奨する根拠が不足しています。",
  "保留当前布局：尚无足够证据推荐候选布局。",
  "Mantén la distribución actual: no hay evidencia suficiente para recomendar la alternativa."
 ],
 "pairedSupported": [
  "현재 대비 후보의 평균 개선 {mean}%p · 짝지은 차이의 95% 구간 [{low}, {high}]%p · {n}회. 이 가정된 모델 안에서만 개선이 지지됩니다.",
  "Challenger minus current: {mean} percentage points · paired 95% CI [{low}, {high}] · {n} runs. Improvement is supported only within this assumed model.",
  "現在に対する候補の平均改善 {mean}ポイント · 対応差の95%区間 [{low}, {high}] · {n}回。この仮定モデル内だけで改善が支持されます。",
  "候选相对当前平均改善 {mean}个百分点 · 配对差值95%区间 [{low}, {high}] · {n}次。改善仅在本假设模型内得到支持。",
  "Mejora de la alternativa: {mean} puntos porcentuales · IC emparejado 95% [{low}, {high}] · {n} pruebas. Solo está respaldada dentro de este modelo supuesto."
 ],
 "pairedUncertain": [
  "현재 대비 후보의 평균 차이 {mean}%p · 95% 구간 [{low}, {high}]%p · {n}회. 구간이 0을 포함하므로 우열이 불확실합니다.",
  "Challenger minus current: {mean} percentage points · 95% CI [{low}, {high}] · {n} runs. The interval includes zero; superiority is uncertain.",
  "候補と現在の平均差 {mean}ポイント · 95%区間 [{low}, {high}] · {n}回。0を含むため優劣は不確実です。",
  "候选与当前平均差值 {mean}个百分点 · 95%区间 [{low}, {high}] · {n}次。区间包含0，优劣不确定。",
  "Diferencia alternativa menos actual: {mean} puntos · IC 95% [{low}, {high}] · {n} pruebas. Incluye cero: no se distingue una ventaja."
 ],
 "pairedWorse": [
  "현재 대비 후보의 평균 차이 {mean}%p · 95% 구간 [{low}, {high}]%p · {n}회. 독립 비교에서는 현재 배치가 더 낫습니다.",
  "Challenger minus current: {mean} percentage points · 95% CI [{low}, {high}] · {n} runs. The independent comparison favors the current layout.",
  "候補と現在の平均差 {mean}ポイント · 95%区間 [{low}, {high}] · {n}回。独立比較では現在配置が優位です。",
  "候选与当前平均差值 {mean}个百分点 · 95%区间 [{low}, {high}] · {n}次。独立比较支持当前布局。",
  "Diferencia alternativa menos actual: {mean} puntos · IC 95% [{low}, {high}] · {n} pruebas. La comparación favorece la distribución actual."
 ],
 "noChallenger": [
  "비교할 다른 배치가 없습니다. 장치를 추가하거나 위치를 바꿔주세요.",
  "No alternative layout is available. Add devices or change their positions.",
  "比較できる別配置がありません。装置を追加するか位置を変更してください。",
  "没有可比较的其他布局，请添加设备或调整位置。",
  "No hay otra distribución para comparar. Añade equipos o cambia sus posiciones."
 ],
 "scoreNote": [
  "감소율은 전체 60초 동안 포획되었거나 쓰러져 활동하지 못한 개체·시간의 비율입니다. 회복하면 다시 활동에 포함하며, 느려진 개체를 임의로 부분 포획으로 세지 않습니다.",
  "Reduction is the fraction of fly-time captured or knocked down over 60 seconds. Recovered flies count as active again; slowing is not arbitrarily counted as partial capture.",
  "減少率は60秒間の個体・時間のうち捕獲またはノックダウンで活動しない割合です。回復後は再び活動に含め、減速を恣意的な部分捕獲とは数えません。",
  "减少率指60秒内被捕获或击倒的个体时间占比。恢复后重新计为活动，减速不再被任意计作部分捕获。",
  "La reducción es la fracción de tiempo-mosca capturada o derribada en 60 segundos. Tras recuperarse vuelve a contar como activa; ralentizarse no equivale a captura parcial."
 ],
 "disclaimer": [
  "실측 보정 전의 3D 근사 시뮬레이터입니다. 높이·가구·기류·국소 자극을 계산하지만, 실제 초파리 신경망이나 특정 살충제·포충기의 효능을 재현한 것은 아닙니다.",
  "This is an uncalibrated 3D approximation. It computes height, furniture, airflow and local stimuli, but does not reproduce an actual fly neural network or the efficacy of any specific pesticide or trap.",
  "実測校正前の3D近似シミュレーターです。高さ・家具・気流・局所刺激を計算しますが、実際の神経回路や特定薬剤・捕虫器の効果を再現するものではありません。",
  "这是未经实测校准的3D近似模拟器。计算高度、家具、气流及局部刺激，但不复现真实果蝇神经网络或特定杀虫剂、捕虫器的效力。",
  "Es una aproximación 3D sin calibrar. Calcula altura, muebles, aire y estímulos locales, pero no reproduce una red neuronal real ni la eficacia de un insecticida o trampa concretos."
 ]
});
export function tr(key,params={}){let text=localized(TEXT[key]||[key,key,key,key,key]);for(const [name,value] of Object.entries(params))text=text.replaceAll(`{${name}}`,String(value));return text;}
export function translate(){document.querySelectorAll('[data-copy]').forEach(el=>el.textContent=tr(el.dataset.copy));document.querySelectorAll('[data-copy-aria]').forEach(el=>el.setAttribute('aria-label',tr(el.dataset.copyAria)));document.title=`${tr('title')} | FLY LAB`;document.documentElement.lang=localized(['ko','en','ja','zh','es']);}
