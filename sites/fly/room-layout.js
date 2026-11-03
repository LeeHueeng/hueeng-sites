const page = document.getElementById('gamePage');
const copy = {
  build: ['방 꾸미기', 'Furnish room', '部屋づくり', '布置房间', 'Amueblar'],
  interact: ['파리 조작', 'Interact', 'ハエの操作', '操控果蝇', 'Interactuar'],
  tools: ['방 도구 모음', 'Room tools', '部屋のツール', '房间工具', 'Herramientas'],
  below: ['반응 실험과 고급 조작', 'Reactions & advanced controls', '反応実験と詳細操作', '反应实验与高级操作', 'Reacciones y controles avanzados'],
  belowHint: ['방은 위에서 관찰하고, 필요한 실험만 아래에서 펼쳐보세요.', 'Watch the room above. Open only the experiments you need below.', '上の部屋を観察し、必要な実験だけ下で開いてください。', '在上方观察房间，在下方展开需要的实验。', 'Observa la habitación arriba y abre solo los experimentos que necesites.'],
  reactions: ['반응 실험 보기', 'Reaction experiments', '反応実験へ', '查看反应实验', 'Ver reacciones'],
  back: ['방 화면으로', 'Back to room', '部屋の画面へ', '返回房间', 'Volver a la habitación'],
  manual: ['파리 직접 조작', 'Direct fly control', 'ハエの直接操作', '直接操控果蝇', 'Control directo'],
  manualHint: ['이동 · 높이 · 죽이기 · 되살리기', 'Movement, altitude, remove & revive', '移動・高度・死亡・復活', '移动、高度、击杀与复活', 'Movimiento, altura, eliminar y revivir'],
  neural: ['뇌로 몸 조종하기', 'Control the body through the brain', '脳から体を操作', '通过大脑控制身体', 'Control corporal desde el cerebro'],
  neuralHint: ['영역별 자극과 운동 출력', 'Regional stimulation & motor output', '領域別の刺激と運動出力', '脑区刺激与运动输出', 'Estimulación regional y respuesta motora'],
  signals: ['활성도 기록 · 영역 안내', 'Activity history & region guide', '活動履歴・領域ガイド', '活动记录与脑区说明', 'Historial y guía de regiones'],
  anatomy: ['뇌 영역별 자세한 설명', 'Detailed brain region guide', '脳領域の詳しい説明', '脑区详细说明', 'Guía detallada del cerebro'],
  anatomyHint: ['궁금한 영역의 역할과 연구 자료 살펴보기', 'Explore functions and research for each region', '各領域の役割と研究資料', '了解各脑区功能与研究资料', 'Funciones y referencias de cada región'],
  active: ['조작 중', 'Active', '操作中', '操控中', 'Activo']
};
const languages = ['ko', 'en', 'ja', 'zh', 'es'];
const text = key => copy[key][Math.max(0, languages.indexOf(document.getElementById('language')?.value || 'ko'))];
let layout = null;
let queued = false;

function label(key, tag = 'span') {
  const element = document.createElement(tag);
  element.dataset.roomLayoutCopy = key;
  element.textContent = text(key);
  return element;
}

function disclosure(key, hint) {
  const details = document.createElement('details');
  details.className = 'room-disclosure';
  const summary = document.createElement('summary');
  const title = document.createElement('span');
  title.className = 'room-disclosure-title';
  title.append(label(key, 'strong'));
  if (hint) title.append(label(hint, 'small'));
  const indicator = label('active');
  indicator.className = 'room-control-indicator';
  indicator.hidden = true;
  summary.append(title, indicator);
  const body = document.createElement('div');
  body.className = 'room-disclosure-body';
  details.append(summary, body);
  return {details, body, indicator};
}

function refreshLabels() {
  if (!layout) return;
  for (const element of page.querySelectorAll('[data-room-layout-copy]')) {
    element.textContent = text(element.dataset.roomLayoutCopy);
  }
  layout.modes.setAttribute('aria-label', text('tools'));
  layout.lower.setAttribute('aria-label', text('below'));
}

function scrollTo(element) {
  element?.scrollIntoView({block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
}

function mount() {
  const arena = page.querySelector('.arena-panel');
  const brain = page.querySelector('.brain-panel');
  const toolbar = document.getElementById('roomToolbar');
  const tools = document.getElementById('furnitureTools');
  const human = page.querySelector('.room-human-observer');
  const manual = page.querySelector('.room-direct-controls');
  const neural = document.getElementById('brainStimPanel');
  const observation = page.querySelector('.room-observation');
  const guide = document.getElementById('brainRegionGuide');
  if (!arena || !brain || !toolbar || !tools?.children.length || !human || !manual || !neural || !observation || !guide) return;

  const moves = [];
  const created = [];
  const abort = new AbortController();
  const listen = (node, event, handler, options = {}) => node.addEventListener(event, handler, {...options, signal: abort.signal});
  const move = (node, parent, before = null) => {
    if (!node) return;
    const origin = document.createComment('room-layout-origin');
    node.before(origin);
    moves.push({node, origin});
    parent.insertBefore(node, before);
  };
  const add = (node, parent, before = null) => {
    parent.insertBefore(node, before);
    created.push(node);
    return node;
  };

  const lower = document.createElement('section');
  lower.id = 'roomExperiments';
  lower.className = 'room-lower-panels';
  const lowerHeading = document.createElement('div');
  lowerHeading.className = 'room-lower-heading';
  const headingCopy = document.createElement('div');
  headingCopy.append(label('below', 'h2'), label('belowHint', 'p'));
  const returnButton = label('back', 'button');
  returnButton.type = 'button';
  returnButton.className = 'room-jump';
  lowerHeading.append(headingCopy, returnButton);
  lower.append(lowerHeading);
  add(lower, page, guide);
  move(human, lower);

  const advanced = document.createElement('div');
  advanced.className = 'room-advanced-grid';
  lower.append(advanced);
  const manualCard = disclosure('manual', 'manualHint');
  const neuralCard = disclosure('neural', 'neuralHint');
  advanced.append(manualCard.details, neuralCard.details);
  move(manual, manualCard.body);
  move(neural, neuralCard.body);
  const guideCard = disclosure('anatomy', 'anatomyHint');
  guideCard.details.classList.add('room-anatomy-disclosure');
  lower.append(guideCard.details);
  move(guide, guideCard.body);

  const more = disclosure('signals');
  more.details.classList.add('room-brain-more');
  const modelNote = brain.querySelector('.model-note');
  add(more.details, brain, modelNote);
  move(document.getElementById('regionQuickGuide'), more.body);
  move(brain.querySelector('.signal-heading'), more.body);
  move(document.getElementById('signalCanvas'), more.body);

  const canvas = arena.querySelector('.arena-canvas-wrap');
  const footer = arena.querySelector('.arena-footer');
  move(document.getElementById('arenaStats'), arena, footer);
  move(observation, arena, footer);
  const viewOptions = document.createElement('div');
  viewOptions.className = 'room-view-options';
  add(viewOptions, arena, observation);
  move(toolbar.querySelector('.check-control'), viewOptions);
  move(toolbar.querySelector('.path-scope-control'), viewOptions);

  const modes = document.createElement('div');
  modes.className = 'room-tool-modes';
  modes.setAttribute('role', 'group');
  add(modes, toolbar, toolbar.firstChild);
  const modeButtons = {};
  for (const key of ['build', 'interact']) {
    const button = label(key, 'button');
    button.type = 'button';
    button.setAttribute('aria-controls', 'furnitureTools');
    modes.append(button);
    modeButtons[key] = button;
  }
  let mode = 'build';
  const interactionTools = new Set(['controlFly', 'killFly', 'spray']);
  const allowed = tool => tool === 'move' || (mode === 'interact' ? interactionTools.has(tool) : !interactionTools.has(tool));
  const filterTools = () => {
    for (const button of tools.querySelectorAll('[data-tool]')) button.hidden = !allowed(button.dataset.tool);
    for (const [key, button] of Object.entries(modeButtons)) button.setAttribute('aria-pressed', String(key === mode));
  };
  const activeTool = tools.querySelector('.active')?.dataset.tool;
  if (interactionTools.has(activeTool)) mode = 'interact';
  for (const [key, button] of Object.entries(modeButtons)) {
    listen(button, 'click', () => {
      mode = key;
      const active = tools.querySelector('.active');
      if (active && !allowed(active.dataset.tool)) tools.querySelector('[data-tool="move"]')?.click();
      filterTools();
    });
  }
  listen(tools, 'click', event => {
    if (event.target.closest('[data-tool="controlFly"]')) manualCard.details.open = true;
  });
  const toolObserver = new MutationObserver(() => {
    const active = tools.querySelector('.active')?.dataset.tool;
    if (active && active !== 'move') mode = interactionTools.has(active) ? 'interact' : 'build';
    filterTools();
  });
  toolObserver.observe(tools, {childList: true, subtree: true, attributes: true, attributeFilter: ['class']});

  const updateIndicators = () => {
    manualCard.indicator.hidden = manual.dataset.state !== 'controlled';
    neuralCard.indicator.hidden = neural.dataset.active !== 'true';
  };
  const stateObserver = new MutationObserver(updateIndicators);
  stateObserver.observe(manual, {attributes: true, attributeFilter: ['data-state']});
  stateObserver.observe(neural, {attributes: true, attributeFilter: ['data-active']});
  listen(page, 'click', event => {
    if (event.target.closest('#regionList .region-row')) more.details.open = true;
    if (event.target.closest('#regionQuickGuide button, #regionQuickGuide a')) guideCard.details.open = true;
  }, {capture: true});

  const jump = label('reactions', 'button');
  jump.type = 'button';
  jump.className = 'room-jump';
  add(jump, arena.querySelector('.panel-bar'));
  listen(jump, 'click', () => scrollTo(lower));
  listen(returnButton, 'click', () => scrollTo(canvas));

  layout = {moves, created, abort, toolObserver, stateObserver, tools, lower, modes};
  page.classList.add('room-workspace');
  document.body.classList.add('room-workspace-page');
  filterTools();
  updateIndicators();
  refreshLabels();
}

function unmount() {
  if (!layout) return;
  const current = layout;
  layout = null;
  current.abort.abort();
  current.toolObserver.disconnect();
  current.stateObserver.disconnect();
  for (const button of current.tools.querySelectorAll('[data-tool]')) button.hidden = false;
  for (const {node, origin} of current.moves.reverse()) {
    if (origin.isConnected) origin.replaceWith(node);
  }
  for (const node of current.created) node.remove();
  page.classList.remove('room-workspace');
  document.body.classList.remove('room-workspace-page');
}

function sync() {
  queued = false;
  if (location.hash === '#/room' && page.classList.contains('room-active')) {
    if (!layout) mount();
  } else unmount();
}

function schedule() {
  if (queued) return;
  queued = true;
  queueMicrotask(sync);
}

if (page) {
  const observer = new MutationObserver(schedule);
  observer.observe(page, {attributes: true, attributeFilter: ['class'], childList: true});
  for (const panel of page.querySelectorAll('.arena-panel, .brain-panel')) observer.observe(panel, {childList: true});
  window.addEventListener('hashchange', schedule);
  document.getElementById('language')?.addEventListener('change', () => queueMicrotask(refreshLabels));
  schedule();
}
