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
    { key: 'tools',      label: '工具', href: root + 'tools/spectrum-viewer.html' },
    { key: 'simulators', label: '模擬器', href: root + 'simulators/civil-defense.html' },
    { key: 'glossary',   label: '白話手冊', href: root + 'courses/rf-glossary.html' }
  ];

  var navLinks = links.map(function (l) {
    var active = l.key === section ? ' class="active"' : '';
    return '<a href="' + l.href + '"' + active + '>' + l.label + '</a>';
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
