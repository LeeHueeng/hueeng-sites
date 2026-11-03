import {localized} from './i18n.js?v=20260914g';

const copy = {
  grab: ['손 움켜쥐기', 'Close your hand', '手を握る', '握住手掌', 'Cerrar la mano'],
  start: ['시작하기를 누르고 기다리세요', 'Press Start, then wait', '開始して着地を待ってください', '点击开始，等待果蝇着陆', 'Pulsa Iniciar y espera'],
  waiting: ['파리가 손바닥에 앉기를 기다리는 중', 'Waiting for a fly to land on your palm', 'ハエが手のひらに止まるのを待っています', '等待果蝇停在手掌上', 'Esperando que una mosca se pose'],
  ready: ['초록 원이 보이면 지금 잡으세요', 'Green ring: catch it now', '緑の丸が出たら捕まえよう', '出现绿圈时就可以抓住它', 'Círculo verde: atrápala ahora'],
  paused: ['계속하기를 누르면 다시 잡을 수 있어요', 'Resume to keep catching', '再開すると捕まえられます', '继续游戏后即可捕捉', 'Reanuda para seguir atrapando'],
  finished: ['라운드가 끝났어요. 다시 해보세요', 'Round complete. Try again', 'ラウンド終了。もう一度挑戦', '本轮结束，再试一次吧', 'Ronda terminada. Inténtalo de nuevo'],
  hint: ['1. 시작 → 2. 초록 착지 표시 기다리기 → 3. 손바닥 클릭 / Space / 손 움켜쥐기. 한 번에 한 마리를 잡습니다.', '1. Start → 2. Wait for a green landing ring → 3. Click your palm, press Space, or close your hand. One fly per catch.', '1. 開始 → 2. 緑の着地マークを待つ → 3. 手のひらをクリック・Space・手を握る。一度に1匹捕まえます。', '1. 开始 → 2. 等待绿色着陆标记 → 3. 点击手掌、按空格或握住手掌。每次捕捉一只。', '1. Inicia → 2. Espera el círculo verde → 3. Haz clic en la palma, pulsa Espacio o cierra la mano. Una mosca por intento.'],
  target: ['잡기', 'CATCH', 'つかむ', '捕捉', 'ATRAPAR']
};

export const handText = key => localized(copy[key]);

export function createHandControls(onGrab) {
  const panel = document.createElement('div');
  panel.className = 'hand-catch-controls';
  panel.hidden = true;
  const main = document.createElement('div');
  main.className = 'hand-catch-main';
  const status = document.createElement('strong');
  status.className = 'hand-catch-status';
  status.setAttribute('role', 'status');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'hand-catch-button';
  button.addEventListener('click', onGrab);
  const hint = document.createElement('p');
  hint.id = 'handCatchHint';
  button.setAttribute('aria-describedby', hint.id);
  main.append(status, button);
  panel.append(main, hint);
  document.querySelector('.arena-canvas-wrap').after(panel);
  const setText = (node, value) => { if (node.textContent !== value) node.textContent = value; };
  return {
    update({visible, running, started, over, landed}) {
      panel.hidden = !visible;
      document.getElementById('gamePage').classList.toggle('hand-active', visible);
      if (!visible) return;
      const ready = running && landed > 0;
      panel.dataset.ready = String(ready);
      button.disabled = !ready;
      const key = over ? 'finished' : !started ? 'start' : !running ? 'paused' : ready ? 'ready' : 'waiting';
      setText(status, handText(key));
      setText(button, handText('grab'));
      setText(hint, handText('hint'));
      document.getElementById('modeHint').textContent = handText('hint');
      document.getElementById('gameCanvas').setAttribute('aria-label', handText('hint'));
      if (running) setText(document.getElementById('arenaBadge'), handText(ready ? 'ready' : 'waiting'));
    }
  };
}
