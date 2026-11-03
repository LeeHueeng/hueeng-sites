const repo = 'https://github.com/LeeHueeng/fly-lab';
const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.51-1.28-1.24-1.62-1.24-1.62-1.01-.7.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.48-.28-5.08-1.24-5.08-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.7 10.7 0 0 1 5.58 0c2.12-1.44 3.05-1.14 3.05-1.14.62 1.54.24 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.61 5.23-5.1 5.5.4.35.76 1.02.76 2.06V22c0 .3.2.64.77.53A11.1 11.1 0 0 0 12 .9Z"/></svg>';
const words = {
  title: ['작은 뇌의 코드도 열어보세요.', 'Open the code behind the little brain.', '小さな脳のコードをのぞいてみよう。', '看看小小大脑背后的代码。', 'Explora el código de este pequeño cerebro.'],
  description: ['7개의 실험을 공개합니다. 코드를 살펴보고, 버그를 알려주고, 다음 이상한 세계를 함께 제안해 주세요.', 'Seven experiments, shared openly. Explore the code, report a bug, or help dream up the next strange world.', '7つの実験を公開しています。コードを読んで、不具合や次の不思議な世界を提案してください。', '七个公开实验。探索代码、报告问题，或一起构思下一个奇妙世界。', 'Siete experimentos abiertos. Explora el código, informa de errores o imagina el próximo mundo extraño.'],
  source: ['코드 보러 가기', 'Explore the code', 'コードを見る', '查看代码', 'Ver el código'],
  star: ['마음에 들면 GitHub Star', 'Enjoyed it? Star on GitHub', '気に入ったら GitHub Star', '喜欢的话，点个 GitHub Star', '¿Te gustó? Dale una estrella'],
  accessible: ['FLY LAB GitHub 저장소', 'FLY LAB GitHub repository', 'FLY LAB GitHub リポジトリ', 'FLY LAB GitHub 仓库', 'Repositorio de FLY LAB en GitHub']
};
const localize = key => words[key][Math.max(0, ['ko', 'en', 'ja', 'zh', 'es'].indexOf(document.getElementById('language')?.value || document.documentElement.lang))];
const makeLink = className => {
  const link = document.createElement('a');
  link.href = repo;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = className;
  return link;
};
const header = document.querySelector('.site-header');
if (header) {
  const link = makeLink('github-header-link');
  link.innerHTML = icon + '<span>GitHub</span>';
  const language = header.querySelector('.language-control');
  header.insertBefore(link, language?.parentElement === header ? language : null);
}
const footer = document.querySelector('.site-footer');
if (footer) {
  const link = makeLink('github-footer-link');
  link.innerHTML = icon + '<span>GitHub / MIT</span>';
  footer.append(link);
}
const home = document.getElementById('homePage');
if (home) {
  const section = document.createElement('section');
  section.className = 'github-open-source';
  section.setAttribute('aria-labelledby', 'githubProjectTitle');
  section.innerHTML = '<div class="github-project-mark" aria-hidden="true">' + icon + '</div><div class="github-project-copy"><p class="github-project-kicker">OPEN SOURCE / MIT</p><h2 id="githubProjectTitle" data-project-copy="title"></h2><p data-project-copy="description"></p></div><div class="github-project-actions"></div>';
  const source = makeLink('github-source-button');
  source.dataset.projectCopy = 'source';
  const star = makeLink('github-star-link');
  star.dataset.projectCopy = 'star';
  section.querySelector('.github-project-actions').append(source, star);
  home.append(section);
}
function translateProject() {
  document.querySelectorAll('[data-project-copy]').forEach(node => { node.textContent = localize(node.dataset.projectCopy); });
  document.querySelectorAll('.github-header-link,.github-footer-link').forEach(node => { node.setAttribute('aria-label', localize('accessible')); });
}
document.getElementById('language')?.addEventListener('change', translateProject);
translateProject();
