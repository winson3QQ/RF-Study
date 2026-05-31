/* Shared top nav + footer for 無線電學習站.
   Injects a consistent, depth-aware header into every page.
   A page may set window.SITE_SECTION to one of:
   'courses' | 'tools' | 'simulators' | 'glossary' to highlight a link. */
(function () {
  var path = location.pathname.replace(/\\/g, '/');
  var inSub = /\/(courses|tools|simulators)\//.test(path);
  var root = inSub ? '../' : '';
  var section = window.SITE_SECTION || '';

  var links = [
    { key: 'courses',    label: '課程', href: root + 'courses/basic-radio.html' },
    { key: 'map',        label: '學習地圖', href: root + 'learning-map.html' },
    { key: 'simulators', label: '模擬器', href: root + 'simulators/civil-defense.html' },
    { key: 'glossary',   label: '白話手冊', href: root + 'courses/rf-glossary.html' }
  ];

  var navLinks = links.map(function (l) {
    /* tool pages declare section 'tools'; they live under the 學習地圖 (map) hub */
    var isActive = l.key === section || (l.key === 'map' && section === 'tools');
    return '<a href="' + l.href + '"' + (isActive ? ' class="active"' : '') + '>' + l.label + '</a>';
  }).join('');

  var header = document.createElement('div');
  header.className = 'wrap';
  header.innerHTML =
    '<nav class="nav">' +
      '<a class="brand" href="' + root + 'index.html">' +
        '<img src="' + root + 'assets/logo-mark.svg" alt="無線電學習站">' +
        '<div>' +
          '<div class="wm">無線電學習站</div>' +
          '<div class="tg">SDR · 民防通訊</div>' +
        '</div>' +
      '</a>' +
      '<div class="nav-links">' + navLinks + '</div>' +
    '</nav>';
  document.body.insertBefore(header, document.body.firstChild);

  /* ── Journey breadcrumb (訊號的旅程) ──────────────────────────
     Each main-track tool belongs to a station along the signal path
     發射機 → 通道 → 接收機. Driven entirely by this table so tool
     pages don't need per-page edits. Format: [file, layer, color, station] */
  var JOURNEY = [
    ['circuit-calculator.html',     '地基',   '#E89A1C', '出發前・電與波的地基'],
    ['modulation-viewer.html',      '發射機', '#F2643C', '第一層・發射機 1-1 調變'],
    ['spectrum-viewer.html',        '發射機', '#F2643C', '第一層・發射機 1-2 頻段與功率'],
    ['power-circuit.html',          '發射機', '#F2643C', '第一層・發射機 1-3 電源供應'],
    ['rf-safety.html',              '發射機', '#F2643C', '第一層・發射機 1-4 發射安全'],
    ['antenna-basics.html',         '通道',   '#1F9E96', '第二層・通道 2-1 天線'],
    ['swr-visualizer.html',         '通道',   '#1F9E96', '第二層・通道 2-2 饋線與匹配'],
    ['link-budget-sim.html',        '通道',   '#1F9E96', '第二層・通道 2-3 自由空間'],
    ['ionosphere-viewer.html',      '通道',   '#1F9E96', '第二層・通道 2-4 電離層傳播'],
    ['propagation-multipath.html',  '通道',   '#1F9E96', '第二層・通道 2-5 地形與多徑'],
    ['receiver-chain.html',         '接收機', '#3B86C9', '第三層・接收機 3-1 收得到嗎'],
    ['superhet-receiver.html',      '接收機', '#3B86C9', '第三層・接收機 3-2 超外差架構'],
    ['interference-diagnosis.html', '接收機', '#3B86C9', '第三層・接收機 3-3 干擾排除'],
    ['callsign-decoder.html',       '操作法規', '#3DA35D', '操作與法規・呼號'],
    ['qcode-trainer.html',          '操作法規', '#3DA35D', '操作與法規・Q 簡語'],
  ];
  var curFile = path.split('/').pop();
  var idx = -1;
  for (var i = 0; i < JOURNEY.length; i++) { if (JOURNEY[i][0] === curFile) { idx = i; break; } }
  if (idx >= 0) {
    var here = JOURNEY[idx], prev = JOURNEY[idx - 1], next = JOURNEY[idx + 1];
    var navHtml = '';
    if (prev) navHtml += '<a class="jb-step" href="' + prev[0] + '"><i data-lucide="arrow-left"></i> ' + prev[3].split(' ').pop() + '</a>';
    if (next) navHtml += '<a class="jb-step" href="' + next[0] + '">' + next[3].split(' ').pop() + ' <i data-lucide="arrow-right"></i></a>';
    var bc = document.createElement('div');
    bc.className = 'wrap';
    bc.innerHTML =
      '<div class="journey-bar" style="--jc:' + here[2] + '">' +
        '<a class="jb-map" href="' + root + 'learning-map.html"><i data-lucide="map"></i> 學習地圖</a>' +
        '<span class="jb-sep">/</span>' +
        '<span class="jb-here">' + here[3] + '</span>' +
        '<span class="jb-steps">' + navHtml + '</span>' +
      '</div>';
    header.parentNode.insertBefore(bc, header.nextSibling);
  }

  var foot = document.createElement('div');
  foot.className = 'wrap';
  foot.innerHTML =
    '<footer class="foot">' +
      '<div class="l">無線電學習站 · HAM RADIO LEARNING HUB</div>' +
      '<div class="r">純靜態 · 無需後端 · 可離線使用</div>' +
    '</footer>';
  document.body.appendChild(foot);

  if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();

  /* Home scroll memory: remember where the user was on the home page so that
     "回首頁" returns them to that spot instead of jumping to the top. */
  var file = path.split('/').pop();
  var isHome = !inSub && (file === '' || file === 'index.html');
  if (isHome) {
    var KEY = 'rf-home-scroll';
    try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
    var saved = sessionStorage.getItem(KEY);
    if (saved !== null) {
      var y = parseInt(saved, 10) || 0;
      window.scrollTo(0, y);
      window.addEventListener('load', function () { window.scrollTo(0, y); });
    }
    var save = function () { sessionStorage.setItem(KEY, String(window.scrollY || window.pageYOffset || 0)); };
    window.addEventListener('pagehide', save);
    window.addEventListener('beforeunload', save);
  }
})();
