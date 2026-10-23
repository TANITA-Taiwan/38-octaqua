/* ============================================================
   OCTAQUA 網站程式（一般情況不需要修改）
   內容、張數、完成狀態都在 config.js；圖片放在 images/ 資料夾。
   ============================================================ */
(function () {
  'use strict';

  var S = window.SITE;
  if (!S) { document.body.textContent = '找不到 config.js，請確認檔案已上傳。'; return; }

  var CHECK = /[?&]check\b/.test(location.search);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SVGNS = 'http://www.w3.org/2000/svg';
  var N = S.events.length;

  /* ---------- 小工具 ---------- */
  function $(id) { return document.getElementById(id); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function h(tag, attrs) {
    var el = document.createElement(tag);
    for (var k in (attrs || {})) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else el.setAttribute(k, v);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null) continue;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return el;
  }
  function s(tag, attrs) {
    var el = document.createElementNS(SVGNS, tag);
    for (var k in (attrs || {})) { if (attrs[k] != null) el.setAttribute(k, attrs[k]); }
    for (var i = 2; i < arguments.length; i++) { if (arguments[i]) el.appendChild(arguments[i]); }
    return el;
  }
  function txt(tag, attrs, str) { var el = s(tag, attrs); el.textContent = str; return el; }

  /* 圖片格子：載入失敗就顯示「請放這個檔名」的佔位框 */
  function slotImg(src, alt, kind, hint, extraClass) {
    var wrap = h('div', { 'class': 'slot ' + (extraClass || ''), 'data-file': src, 'data-kind': kind, 'data-hint': hint || '' });
    var im = new Image();
    im.alt = alt || '';
    im.decoding = 'async';
    im.loading = CHECK ? 'eager' : 'lazy';
    im.addEventListener('error', function () { wrap.classList.add('is-empty'); if (im.parentNode) im.parentNode.removeChild(im); });
    im.src = src;
    wrap.appendChild(im);
    return wrap;
  }
  function placeholder(src, kind, hint, extraClass) {
    return h('div', { 'class': 'slot is-empty ' + (extraClass || ''), 'data-file': src, 'data-kind': kind, 'data-hint': hint || '' });
  }
  /* 標誌：沒有圖片時，改顯示文字 */
  function logoImg(src, fallback, cls) {
    var span = h('span', { 'class': 'logo ' + cls, 'data-file': src });
    var im = new Image();
    im.alt = fallback;
    im.addEventListener('error', function () { span.classList.add('is-empty'); span.textContent = fallback; });
    im.src = src;
    span.appendChild(im);
    return span;
  }

  /* ---------- 像素小圖（沒有 YOTA 圖與地圖小圖示時的預設樣式） ---------- */
  var PAL = { y: '#FFF2A0', o: '#F6A94A', g: '#8CC672', l: '#C2DD84', w: '#FFFFFF', n: '#0B4A86', b: '#7FCBF3', p: '#E8699F', r: '#A64A78' };
  var ICONS = [
    ['..gggg..', '.gggggg.', 'gggggggg', '.yyyyyy.', '.ywyywy.', '.yyyyyy.', '.yyoyyy.', '.yyoyyy.'],           // 幸之國：小屋
    ['..yyyy..', '.yyyyyy.', '.yywwyy.', '.yyyyyy.', '..yyyy..', '...oo...', '...oo...', '...oo...'],           // 電之國：燈泡
    ['...yy...', '...yy...', '..yyyy..', '.yyyyyy.', '.yywyyy.', '.yyyyyy.', '..yyyy..', '........'],           // 水之國：水滴
    ['..yyyy..', '.yyyyyy.', 'yyyyyyyy', 'yyyyyyyy', '.oooooo.', '..o..o..', '.o..o...', '........'],           // 風之國：雲與風
    ['..y..y..', '.yyyyyy.', '.yyoyyy.', '.yyyyyy.', '..y..y..', '...gg...', '...gg...', '...gg...'],           // 花之國：花
    ['...yy...', '.y.yy.y.', '..yyyy..', 'yyyyyyyy', '..yyyy..', '.y.yy.y.', '...yy...', '........'],           // 雪之國：雪花
    ['nnnnnnnn', 'nbbbbbbn', 'nbwwwwbn', 'nbwnnwbn', 'nbwwwwbn', 'nbbbbbbn', 'nbbbbbbn', 'nnnnnnnn']            // 畢業展：體組成計
  ];
  var FOOT = ['..oo.oo.', '.oooooo.', '..yyyyy.', '.yyyyyyy', '.yyyyyyy', '.yyyyyyy', '..yyyyy.', '..yyyy..', '..yyyy..', '...yyy..'];
  function bitmap(rows, px, x, y) {
    var g = s('g', { transform: 'translate(' + (x || 0) + ' ' + (y || 0) + ')' });
    rows.forEach(function (row, ry) {
      for (var cx = 0; cx < row.length; cx++) {
        var c = row.charAt(cx);
        if (c !== '.') g.appendChild(s('rect', { x: cx * px, y: ry * px, width: px, height: px, fill: PAL[c] }));
      }
    });
    return g;
  }
  function footSvg() {
    var svg = s('svg', { viewBox: '0 0 24 30', width: 24, height: 30, 'aria-hidden': 'true', 'shape-rendering': 'crispEdges' });
    svg.appendChild(bitmap(FOOT, 3, 0, 0));
    return svg;
  }

  /* 進度依「台灣時間（Asia/Taipei）」計算：活動結束日的隔天，就算走完那一站。
     不管瀏覽者人在哪個時區，看到的都一樣。網址加 ?today=2026-11-30 可預覽那一天。 */
  function taipeiToday() {
    var q = /[?&]today=(\d{4}-\d{2}-\d{2})/.exec(location.search);
    if (q) return q[1];
    try {
      var p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
      if (/^\d{4}-\d{2}-\d{2}$/.test(p)) return p;
    } catch (err) {}
    var d = new Date(Date.now() + (new Date().getTimezoneOffset() + 480) * 60000);
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  var TODAY = taipeiToday();
  function eventState(ev) {
    if (ev.end && TODAY > ev.end) return 'ended';
    if (ev.start && TODAY >= ev.start) return 'live';
    return 'upcoming';
  }
  function countDone() {
    if (typeof S.progress === 'number') return Math.max(0, Math.min(N, Math.floor(S.progress)));
    var k = 0;
    while (k < N && eventState(S.events[k]) === 'ended') k++;
    return k;
  }
  var doneCount = countDone();

  /* ============================================================
     上方導覽、首圖
     ============================================================ */
  document.title = S.title + ' ' + S.project + '｜TANITA 第 38 屆產學合作';
  var logos = $('nav-logos');
  logos.appendChild(logoImg(S.logos.tanita, 'TANITA', 'logo--tanita'));
  logos.appendChild(h('span', { 'class': 'logo__x', text: '×' }));
  logos.appendChild(logoImg(S.logos.octaqua, 'OCTAQUA', 'logo--octaqua'));

  $('hero-school').textContent = S.school;
  $('hero-title').innerHTML = '<span class="t-pink">腳腳者上線！</span><span class="t-blue">好腳力等你</span><span class="t-lime">TRY</span>';
  $('hero-msg').textContent = '健康之樹能否再次綻放，就交給腳腳者們了！腳腳者召集任務開啟！';

  var frame = $('hero-frame'), heroFallback = $('hero-fallback'), heroImg = null, heroLoaded = false;
  var mq = window.matchMedia('(max-width: 700px)');
  function loadBanner() {
    var list = mq.matches ? [S.bannerMobile, S.banner] : [S.banner];
    (function next(i) {
      if (i >= list.length) { if (!heroImg) frame.classList.remove('has-img'); return; }
      var im = new Image();
      im.alt = S.title + ' ' + S.project + ' 主視覺';
      im.onload = function () {
        if (heroImg && heroImg.parentNode) heroImg.parentNode.removeChild(heroImg);
        heroImg = im; heroLoaded = true;
        frame.insertBefore(im, heroFallback);
        frame.classList.add('has-img');
      };
      im.onerror = function () { next(i + 1); };
      im.src = list[i];
    })(0);
  }
  loadBanner();
  if (mq.addEventListener) mq.addEventListener('change', loadBanner);

  /* ---------- 進度條元件（首圖與地圖共用） ---------- */
  function pbar(live) {
    return h('div', { 'class': 'pbar' },
      h('span', { 'class': 'pbar__foot' }, footSvg()),
      h('div', { 'class': 'pbar__track' + (live ? ' js-bar' : ''), role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': 0, 'aria-label': '活動完成進度' },
        h('div', { 'class': 'pbar__fill' + (live ? ' js-fill' : '') }))
    );
  }
  var heroBar = pbar(false);
  $('hero-bar').appendChild(heroBar);   // 首圖的進度條：直接顯示目前進度
  heroBar.querySelector('.pbar__fill').style.width = (doneCount / N * 100) + '%';
  $('map-bar').appendChild(pbar(true)); // 地圖旁的進度條：跟著 YOTA 動

  function updateProgress(sv) {
    var pct = Math.round(sv / N * 100);
    Array.prototype.forEach.call(document.querySelectorAll('.js-pct'), function (e) { e.textContent = pct; });
    Array.prototype.forEach.call(document.querySelectorAll('.js-fill'), function (e) { e.style.width = (sv / N * 100) + '%'; });
    Array.prototype.forEach.call(document.querySelectorAll('.js-bar'), function (e) { e.setAttribute('aria-valuenow', pct); });
  }

  /* ============================================================
     主題、能量、世界觀、YOTA
     ============================================================ */
  $('about-heading').textContent = S.intro.heading;
  S.intro.paragraphs.forEach(function (t) { $('about-body').appendChild(h('p', { text: t })); });
  S.intro.points.forEach(function (p) {
    $('about-points').appendChild(h('div', null, h('dt', { text: p.label }), h('dd', { text: p.text })));
  });

  (function energy() {
    var E = S.energy, pct = Math.min(100, E.current / E.target * 100);
    $('energy').appendChild(h('div', { 'class': 'energy__head' },
      h('h3', { 'class': 'energy__title', text: E.heading }),
      h('p', { 'class': 'energy__num' }, h('b', { text: E.current.toLocaleString('en-US') }), ' / ' + E.target.toLocaleString('en-US') + ' ' + E.unit)
    ));
    var fill = h('div', { 'class': 'pbar__fill' });
    fill.style.width = pct + '%';
    $('energy').appendChild(h('div', { 'class': 'pbar pbar--tree' },
      h('span', { 'class': 'pbar__foot' }, footSvg()),
      h('div', { 'class': 'pbar__track', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': E.target, 'aria-valuenow': E.current, 'aria-label': E.heading }, fill)));
    $('energy').appendChild(h('p', { 'class': 'energy__note', text: E.note }));
  })();


  /* ---------- 產品介紹用的像素小圖 ---------- */
  var NAVY = { n: '#0B4A86' };
  var SCAN_ICONS = {
    '體重': ['...nn...', '..nnnn..', '...nn...', '.nnnnnn.', '.nnnnnn.', '..n..n..', '..n..n..', '.nnnnnn.'],
    '推定骨量': ['......nn', '....nnnn', '...nnn..', '..nnn...', '.nnn....', 'nnnn....', 'nn......', '........'],
    '基礎代謝': ['...n....', '...nn...', '..nnn.n.', '.nnnnnn.', 'nnn.nnnn', 'nnn..nnn', 'nnnn.nnn', '.nnnnnn.', '..nnnn..'],
    '體水分率': ['...nn...', '...nn...', '..nnnn..', '.nnnnnn.', 'nnnnnnnn', 'nnnnnnnn', 'nnnnnnnn', '.nnnnnn.', '..nnnn..'],
    '內臟脂肪': ['........', '.nnnnnn.', 'n......n', 'n.nnnn.n', 'n.nnnn.n', 'n......n', '.nnnnnn.', '........'],
    '肌肉量': ['..nnn...', '.nnnnn..', '.nnnnnn.', '..nnnnn.', '..nnnnn.', '.nnnnn..', 'nnnn....', '........'],
    '腳點': ['..nn.nn.', '.nnnnnn.', '..nnnnn.', '.nnnnnnn', '.nnnnnnn', '.nnnnnnn', '..nnnnn.', '...nnn..', '...nnn..', '....nn..']
  };
  var SCAN_TEXT = { '體脂率': '%', 'BMI': 'BMI', '體內年齡': 'Age' };
  var ITEM_ICONS = {
    'DATA': ['........', '.....nn.', '....nnn.', '..n.nnn.', '.nn.nnn.', '.nnnnnn.', '.nnnnnn.', '........'],
    'LEG SCORE': FOOT,
    'CONNECT': ['...nn...', '...nnn..', '.n.n.nn.', '..nnnn..', '..nnnn..', '.n.n.nn.', '...nnn..', '...nn...'],
    'PLAYERS': ['.ll..ll.', 'llll.lll', '.ll..ll.', 'gggg.gggg'.slice(0, 8), 'gggggggg', 'gggggggg', '........', '........']
  };
  function iconSvg(rows, px, pal) {
    var w = 0; rows.forEach(function (r) { w = Math.max(w, r.length); });
    var svg = s('svg', { viewBox: '0 0 ' + (w * px) + ' ' + (rows.length * px), width: w * px, height: rows.length * px, 'aria-hidden': 'true', 'shape-rendering': 'crispEdges', 'class': 'picon' });
    var g = s('g'); svg.appendChild(g);
    rows.forEach(function (row, ry) {
      for (var cx = 0; cx < row.length; cx++) {
        var c = row.charAt(cx);
        if (c !== '.') g.appendChild(s('rect', { x: cx * px, y: ry * px, width: px, height: px, fill: (pal && pal[c]) || PAL[c] }));
      }
    });
    return svg;
  }
  function winBar(en, zh) {
    return h('div', { 'class': 'winbar' },
      h('span', { 'class': 'winbar__t' }, h('b', { text: en }), ' ｜ ' + zh),
      h('span', { 'class': 'winbar__btns', 'aria-hidden': 'true' }, h('i', { text: '–' }), h('i', { text: '□' }), h('i', { text: '✕' })));
  }

  (function product() {
    var P = S.product;
    // 1. 新道具：裝備資訊與解鎖效果
    var it = $('item');
    it.appendChild(h('span', { 'class': 'tag tag--item', text: P.tag }));
    var left = h('div', { 'class': 'item__photo' }, slotImg(P.image, P.name + ' ' + P.sub, '產品照', '方形・1200×1200'));
    var right = h('div', { 'class': 'item__info' });
    right.appendChild(h('h3', { 'class': 'item__name' }, P.name, h('span', { text: P.sub })));
    var data = h('div', { 'class': 'win' }, winBar(P.itemsTitle[0], P.itemsTitle[1]));
    var rows = h('ul', { 'class': 'item__rows' });
    P.items.forEach(function (r) {
      var ic = ITEM_ICONS[r.k];
      rows.appendChild(h('li', null,
        h('span', { 'class': 'item__ic' }, ic ? iconSvg(ic, 4, r.k === 'LEG SCORE' ? null : { n: '#0B4A86', l: '#C2DD84', g: '#8CC672' }) : null),
        h('span', { 'class': 'item__k', text: r.k }),
        h('span', { 'class': 'item__v', text: r.v })));
    });
    data.appendChild(rows);
    right.appendChild(data);
    var un = h('div', { 'class': 'win' }, winBar(P.unlockTitle[0], P.unlockTitle[1]));
    var ul = h('ul', { 'class': 'item__unlocks' });
    var UN_ICONS = [SCAN_ICONS['肌肉量'], ['nnnnn...', 'n...nn..', 'nnnnnnn.', 'n.nnn.n.', 'n.....n.', 'n.nnn.n.', 'n.....n.', 'nnnnnnn.']];
    P.unlocks.forEach(function (u, i) { ul.appendChild(h('li', null, iconSvg(UN_ICONS[i % 2], 5, { n: '#0B4A86' }), h('span', { text: u }))); });
    un.appendChild(ul);
    right.appendChild(un);
    it.appendChild(h('div', { 'class': 'item__grid' }, left, right));

    // 2. 特殊技能：腳點 3 階段
    var K = P.skill, sk = $('skill');
    sk.appendChild(h('span', { 'class': 'tag tag--skill', text: K.tag }));
    var say = h('div', { 'class': 'skill__say' },
      h('div', { 'class': 'skill__yota' }, slotImg(S.yota.marker, 'YOTA', '', '', 'skill__yimg')),
      h('p', { 'class': 'skill__bubble', text: K.text }));
    sk.appendChild(say);
    sk.appendChild(h('h3', { 'class': 'skill__title' }, h('span', { 'class': 'skill__feet' }, iconSvg(FOOT, 4)), K.heading));
    var gauge = h('div', { 'class': 'gauge', 'aria-hidden': 'true' });
    ['low', 'low', 'mid', 'mid', 'mid', 'good', 'good'].forEach(function (tn) { gauge.appendChild(h('span', { 'class': 'gauge__cell gauge__cell--' + tn })); });
    sk.appendChild(gauge);
    var lv = h('div', { 'class': 'levels' });
    K.levels.forEach(function (L) {
      lv.appendChild(h('div', { 'class': 'level level--' + L.tone },
        h('p', { 'class': 'level__range', text: L.range }),
        h('p', { 'class': 'level__name', text: L.name }),
        h('p', { 'class': 'level__desc' }, L.lines[0], h('br'), L.lines[1])));
    });
    sk.appendChild(lv);

    // 3. 玩家數據掃描：10 項
    var C = P.scan, sc = $('scan');
    sc.appendChild(h('h3', { 'class': 'scan__title', text: C.tag }));
    sc.appendChild(h('p', { 'class': 'scan__status' }, h('mark', { text: C.status })));
    var grid = h('ul', { 'class': 'scan__grid' });
    C.items.forEach(function (name) {
      var ic;
      if (name === '腳點') ic = iconSvg(FOOT, 5, { y: '#0B4A86', o: '#0B4A86' });
      else if (SCAN_ICONS[name]) ic = iconSvg(SCAN_ICONS[name], 6, { n: '#0B4A86' });
      else ic = h('span', { 'class': 'scan__glyph', text: SCAN_TEXT[name] || name.charAt(0) });
      grid.appendChild(h('li', { 'class': 'panel scan__cell' + (name === '腳點' ? ' is-key' : '') }, h('span', { 'class': 'scan__ic' }, ic), h('span', { 'class': 'scan__nm', text: name })));
    });
    sc.appendChild(grid);
  })();

  $('story-heading').textContent = S.story.heading;
  S.story.panels.forEach(function (t, i) {
    $('story-panels').appendChild(h('li', { 'class': 'story__panel' },
      h('p', { 'class': 'panel story__text', text: t }),
      slotImg('images/story/' + pad2(i + 1) + '.jpg', '世界觀漫畫格 ' + (i + 1), '漫畫格 ' + pad2(i + 1), '橫式・1600×1000', 'story__img')
    ));
  });
  S.story.roles.forEach(function (r) {
    $('story-roles').appendChild(h('p', { 'class': 'panel panel--lime story__role' }, h('b', { text: r.who }), r.what));
  });
  S.story.steps.forEach(function (t) { $('story-steps').appendChild(h('li', { text: t })); });

  var Y = S.yota;
  $('yota-art').appendChild(slotImg(Y.image, Y.name, 'YOTA 介紹圖', '透明背景 PNG・1200×1200'));
  $('yota-name').textContent = Y.name;
  $('yota-intro').textContent = Y.intro;
  Y.facts.forEach(function (f) { $('yota-facts').appendChild(h('div', null, h('dt', { text: f.label }), h('dd', { text: f.text }))); });

  $('footer-text').textContent = S.title + ' × TANITA Taiwan｜' + S.school;
  if (S.links && S.links.tanita) $('footer-link').href = S.links.tanita;

  /* ============================================================
     活動紀錄
     ============================================================ */
  var galleries = {};
  var RATIOS = ['r1', 'r2', 'r3', 'r4', 'r5', 'r2', 'r1', 'r3', 'r5', 'r4', 'r2', 'r1'];

  function videoBlock(ev) {
    var file = 'images/' + ev.id + '/video.mp4';
    var box = h('div', { 'class': 'slot video-slot', 'data-file': file, 'data-kind': '直式影片', 'data-hint': '9:16・1080×1920・25MB 內' });
    if (ev.done || ev === S.mission) {
      var v = h('video', { controls: '', playsinline: '', preload: 'metadata', poster: 'images/' + ev.id + '/poster.jpg', 'aria-label': ev.name + ' 影片' });
      v.addEventListener('error', function () { box.classList.add('is-empty'); if (v.parentNode) v.parentNode.removeChild(v); });
      v.src = file;
      box.appendChild(v);
    } else { box.classList.add('is-empty'); }
    return box;
  }
  function galleryBlock(ev) {
    var g = h('div', { 'class': 'gallery', 'data-event': ev.id });
    var n = Math.max(0, Math.floor(ev.photos || 0));
    if (n === 0) {
      for (var i = 1; i <= 9; i++) g.appendChild(placeholder('images/' + ev.id + '/' + pad2(i) + '.jpg', '照片 ' + pad2(i), '寬 1800px・500KB 內', RATIOS[i - 1]));
    } else {
      for (var j = 1; j <= n; j++) g.appendChild(slotImg('images/' + ev.id + '/' + pad2(j) + '.jpg', ev.name + ' 照片 ' + j, '照片 ' + pad2(j), '', RATIOS[(j - 1) % RATIOS.length]));
    }
    return g;
  }

  function eventArticle(ev, isMission) {
    var n = Math.floor(ev.photos || 0);
    var note = n > 0 ? '共 ' + n + ' 張照片，點一下可放大。' : '這裡預留 30–50 張照片。上傳後，到 config.js 填入張數。';
    var g = galleryBlock(ev);
    galleries[ev.id] = g;
    var placeDd = h('dd', null, ev.place);
    if (ev.address) placeDd.appendChild(h('small', { text: ev.address }));
    var meta = h('dl', { 'class': 'event__meta' },
      h('div', null, h('dt', { text: '時間' }), h('dd', { text: ev.date })),
      h('div', null, h('dt', { text: '地點' }), placeDd));
    if (ev.goal) meta.appendChild(h('div', null, h('dt', { text: '目標' }), h('dd', { text: ev.goal })));
    var st = isMission ? 'live' : eventState(ev);
    var badge = ev.badge || (st === 'ended' ? (ev.done ? '已上傳' : '待上傳') : st === 'live' ? '進行中' : '準備中');
    return h('article', { 'class': 'event panel' + (isMission ? ' event--mission' : ''), id: ev.id, 'data-done': String(!!ev.done || isMission), 'data-state': st },
      h('header', { 'class': 'event__head' },
        h('span', { 'class': 'event__chapter', text: ev.chapter }),
        h('h3', { 'class': 'event__title', text: ev.name }),
        h('span', { 'class': 'event__badge', text: badge })
      ),
      ev.event ? h('p', { 'class': 'event__sub', text: ev.event }) : null,
      meta,
      h('p', { 'class': 'event__summary', text: ev.summary }),
      h('div', { 'class': 'event__body' },
        h('div', { 'class': 'event__video' }, videoBlock(ev)),
        h('div', { 'class': 'event__photos' }, h('p', { 'class': 'gallery__note', text: note }), g)
      )
    );
  }
  if (S.mission) $('events').appendChild(eventArticle(S.mission, true));
  S.events.forEach(function (ev) { $('events').appendChild(eventArticle(ev, false)); });

  /* ---------- 放大檢視 ---------- */
  var lb = $('lightbox'), lbImg = $('lb-img'), lbCount = $('lb-count');
  var lbList = [], lbIdx = 0;
  function lbShow() {
    var im = lbList[lbIdx];
    lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt;
    lbCount.textContent = (lbIdx + 1) + ' / ' + lbList.length;
  }
  function lbStep(d) { lbIdx = (lbIdx + d + lbList.length) % lbList.length; lbShow(); }
  Object.keys(galleries).forEach(function (id) {
    var g = galleries[id];
    g.addEventListener('click', function (e) {
      var im = e.target.closest ? e.target.closest('img') : null;
      if (!im || !g.contains(im)) return;
      lbList = Array.prototype.slice.call(g.querySelectorAll('.slot:not(.is-empty) img'));
      lbIdx = lbList.indexOf(im);
      if (lbIdx < 0) return;
      lbShow();
      if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
    });
  });
  $('lb-close').addEventListener('click', function () { lb.close(); });
  $('lb-prev').addEventListener('click', function () { lbStep(-1); });
  $('lb-next').addEventListener('click', function () { lbStep(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') lbStep(-1); else if (e.key === 'ArrowRight') lbStep(1);
  });

  /* ============================================================
     活動地圖：由下往上的階梯，YOTA 跳到完成的那一站
     ============================================================ */
  var svg = $('map-svg');
  var VW = 800, VH = 1010;
  var BX = 165, BDX = 88, BY = 760, BDY = 100;   // 第 1 格中心 x、每格右移、第 1 格頂端 y、每格上升
  var HW = 95, HH = 48, DEPTH = 110;              // 半寬、半高、方塊側面厚度
  var SKEW = Math.atan(HH / HW) * 180 / Math.PI;
  var pts = [], nodes = [], yotaG = null, hopG = null, curS = 0, animId = 0;

  svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);

  function poly(points, cls) { return s('polygon', { 'class': cls, points: points.map(function (p) { return p.join(','); }).join(' ') }); }

  function buildMap() {
    // 方塊共 N + 1 個：最下面是「序章」起點，其餘對應 N 站活動。由最上面往下畫，下面的才會蓋在前面
    for (var i = N; i >= 0; i--) {
      var cx = BX + i * BDX, t = BY - i * BDY;
      var ev = i === 0 ? { chapter: '序章', short: '幸之國', name: '幸之國（起點）', id: 'mission' } : S.events[i - 1];
      var g = s('g', { 'class': 'blk' });
      g.appendChild(poly([[cx, t], [cx + HW, t + HH], [cx, t + 2 * HH], [cx - HW, t + HH]], 'blk__top'));
      g.appendChild(poly([[cx - HW, t + HH], [cx, t + 2 * HH], [cx, t + 2 * HH + DEPTH], [cx - HW, t + HH + DEPTH]], 'blk__left'));
      g.appendChild(poly([[cx, t + 2 * HH], [cx + HW, t + HH], [cx + HW, t + HH + DEPTH], [cx, t + 2 * HH + DEPTH]], 'blk__right'));
      g.appendChild(poly([[cx, t + 30], [cx + 34, t + 47], [cx, t + 64], [cx - 34, t + 47]], 'blk__hole'));
      // 右側面上的章節名稱（順著斜面）
      var lab = s('g', { transform: 'translate(' + cx + ' ' + (t + 2 * HH) + ') skewY(-' + SKEW.toFixed(2) + ')' });
      lab.appendChild(txt('text', { 'class': 'blk__ch', x: HW / 2, y: 38 }, ev.chapter));
      lab.appendChild(txt('text', { 'class': 'blk__nm', x: HW / 2, y: 80 }, ev.short));
      g.appendChild(lab);
      // 方塊上的小圖示
      var bm = bitmap(ICONS[i % ICONS.length], 5, cx - 62, t - 12);
      g.appendChild(bm);
      // 最終章的小圖：放 images/map/final.png（像素版 BC-775，透明背景）就會取代預設的小圖示
      if (i === N && S.mapIcon) {
        (function (bm, x, y) {
          var im = s('image', { x: x, y: y, width: 64, height: 64, preserveAspectRatio: 'xMidYMid meet' });
          im.setAttribute('href', S.mapIcon);
          im.addEventListener('load', function () { bm.style.display = 'none'; });
          im.addEventListener('error', function () { if (im.parentNode) im.parentNode.removeChild(im); });
          g.appendChild(im);
        })(bm, cx - 74, t - 24);
      }

      var a = s('a', { href: '#' + ev.id, 'aria-label': ev.chapter + ' ' + ev.name }, g);
      svg.appendChild(a);
      nodes[i] = g;
      pts[i] = { x: cx + 30, y: t + 58 };
    }

    // YOTA
    yotaG = s('g', { 'class': 'm-yota' });
    yotaG.appendChild(s('ellipse', { 'class': 'm-yota__shadow', cx: 0, cy: 2, rx: 34, ry: 9 }));
    hopG = s('g');
    var bob = s('g', { 'class': 'm-yota__bob' });
    var fb = s('g', { 'class': 'm-yota__fb' });
    [[-34, -66], [4, -66], [-34, -30], [4, -30]].forEach(function (p) { fb.appendChild(s('rect', { x: p[0], y: p[1], width: 30, height: 30, 'class': 'fb-lobe' })); });
    fb.appendChild(s('rect', { x: -24, y: -56, width: 48, height: 48, 'class': 'fb-face' }));
    fb.appendChild(s('rect', { x: -13, y: -38, width: 6, height: 6, 'class': 'fb-eye' }));
    fb.appendChild(s('rect', { x: 7, y: -38, width: 6, height: 6, 'class': 'fb-eye' }));
    var img = s('image', { 'class': 'm-yota__img', x: -76, y: -122, width: 152, height: 122, preserveAspectRatio: 'xMidYMax meet' });
    img.setAttribute('href', Y.marker);
    img.addEventListener('load', function () { fb.style.display = 'none'; });
    img.addEventListener('error', function () { if (img.parentNode) img.parentNode.removeChild(img); });
    bob.appendChild(fb); bob.appendChild(img);
    hopG.appendChild(bob);
    yotaG.appendChild(hopG);
    svg.appendChild(yotaG);
  }

  function ease(t) { return 0.5 - Math.cos(Math.PI * t) / 2; }

  function setS(v) {
    curS = v;
    var j = Math.min(Math.floor(v), N - 1);
    var f = Math.min(v - j, 1);
    var a = pts[j], b = pts[j + 1];
    var hop = (f > 0 && f < 1) ? Math.sin(Math.PI * f) * 80 : 0;
    yotaG.setAttribute('transform', 'translate(' + (a.x + (b.x - a.x) * f).toFixed(1) + ' ' + (a.y + (b.y - a.y) * f).toFixed(1) + ')');
    hopG.setAttribute('transform', 'translate(0 ' + (-hop).toFixed(1) + ')');
    nodes.forEach(function (g, idx) { if (idx === 0 || v >= idx - 0.001) g.classList.add('is-reached'); else g.classList.remove('is-reached'); });
    Array.prototype.forEach.call(document.querySelectorAll('.stops li[data-i]'), function (li) { li.classList.toggle('is-done', v >= Number(li.getAttribute('data-i')) + 1 - 0.001); });
    updateProgress(v);
  }

  function animateTo(target, from) {
    cancelAnimationFrame(animId);
    if (reduceMotion || target === from) { setS(target); return; }
    var dur = Math.min(900 * Math.abs(target - from) + 400, 5200);
    var t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      setS(from + (target - from) * ease(p));
      if (p < 1) animId = requestAnimationFrame(step);
    }
    animId = requestAnimationFrame(step);
  }

  // 右側（或手機下方）的站點清單
  function stopItem(ev, i) {
    return h('li', { 'class': i == null ? 'stops__mission' : null, 'data-i': i == null ? null : i },
      h('a', { href: '#' + ev.id },
        h('span', { 'class': 'stops__ch', text: ev.chapter }),
        h('span', { 'class': 'stops__nm', text: ev.name }),
        h('span', { 'class': 'stops__dt', text: ev.date })
      ));
  }
  S.events.forEach(function (ev, i) { $('stops').appendChild(stopItem(ev, i)); });
  if (S.mission) $('stops').appendChild(stopItem(S.mission, null));

  function statusText(k) {
    if (k <= 0) return 'YOTA 還在序章・幸之國，等第一章開始。';
    if (k >= N) return '全部完成！YOTA 回到幸之國了。';
    return 'YOTA 現在在「' + S.events[k - 1].chapter + '・' + S.events[k - 1].short + '」，下一站是「' + S.events[k].chapter + '・' + S.events[k].short + '」。';
  }
  $('status').textContent = statusText(doneCount);
  $('today').textContent = '依台灣時間 ' + TODAY.replace(/-/g, '.') + ' 自動更新';

  buildMap();
  setS(0);

  var played = false;
  function playOnce() { if (played) return; played = true; animateTo(doneCount, 0); }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { playOnce(); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe($('map-stage'));
  } else { playOnce(); }
  $('replay').addEventListener('click', function () { animateTo(doneCount, 0); });


  /* ============================================================
     延伸閱讀：三篇文章、影片、產品連結
     ============================================================ */
  (function () {
    var M = S.more;
    if (!M) { var sec = $('more'); if (sec) sec.hidden = true; return; }
    $('more-heading').textContent = M.heading || '延伸閱讀';
    (M.articles || []).forEach(function (A) {
      var ok = !!A.url;
      var card = h(ok ? 'a' : 'div', { 'class': 'panel card' + (ok ? '' : ' is-empty'), href: ok ? A.url : null, target: ok ? '_blank' : null, rel: ok ? 'noopener' : null },
        winBar(A.tag, '延伸閱讀'),
        h('div', { 'class': 'card__body' },
          h('h3', { 'class': 'card__title', text: A.title }),
          h('p', { text: A.text }),
          h('span', { 'class': 'card__go', text: ok ? (A.cta || '閱讀文章') + ' ▶' : '網址待補' })));
      $('more-articles').appendChild(card);
    });
    var vid = $('more-video');
    var m = /(?:v=|youtu\.be\/|embed\/)([\w-]{11})/.exec(M.youtube || '');
    vid.appendChild(winBar('VIDEO', M.videoTitle || '影片'));
    if (m) {
      vid.appendChild(h('div', { 'class': 'more__frame' },
        h('iframe', { src: 'https://www.youtube-nocookie.com/embed/' + m[1], title: M.videoTitle || 'YouTube 影片', loading: 'lazy', allowfullscreen: 'true',
          allow: 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share', referrerpolicy: 'strict-origin-when-cross-origin' })));
    } else {
      vid.appendChild(h('p', { 'class': 'more__empty', text: '請在 config.js 的 more.youtube 貼上 YouTube 網址。' }));
    }
    var P = M.product, pa = $('more-product');
    if (P) {
      pa.href = P.url;
      pa.appendChild(h('span', { 'class': 'tag tag--more', text: P.tag }));
      pa.appendChild(h('h3', { 'class': 'more__pname', text: P.name }));
      pa.appendChild(h('p', { text: P.text }));
      pa.appendChild(h('span', { 'class': 'btn', text: P.cta || '看產品介紹' }));
    } else { pa.hidden = true; }
  })();


  /* 受贈單位 */
  (function () {
    var D = S.donee, sec = $('donee');
    if (!D) { sec.hidden = true; return; }
    var box = $('donee-panel');
    box.appendChild(h('span', { 'class': 'tag tag--more', text: D.heading || '受贈單位' }));
    var a = h('a', { 'class': 'donee__logo', href: D.url, target: '_blank', rel: 'noopener', 'aria-label': D.name });
    a.appendChild(logoImg(D.logo, D.name, 'logo--donee'));
    box.appendChild(a);
    box.appendChild(h('div', { 'class': 'donee__copy' },
      h('h3', { 'class': 'donee__name', text: D.name }),
      h('p', { text: D.text }),
      h('a', { 'class': 'btn', href: D.url, target: '_blank', rel: 'noopener', text: '前往基金會官網' })));
  })();

  /* ============================================================
     維護檢查：網址後面加 ?check，列出還沒放的圖片
     ============================================================ */
  if (CHECK) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        var groups = {}, order = [];
        function add(file) {
          var dir = file.replace(/[^\/]+$/, '') || '(根目錄)';
          if (!groups[dir]) { groups[dir] = []; order.push(dir); }
          groups[dir].push(file.replace(/^.*\//, ''));
        }
        if (!heroLoaded) add(S.banner);
        Array.prototype.forEach.call(document.querySelectorAll('.logo.is-empty'), function (e) { add(e.getAttribute('data-file')); });
        Array.prototype.forEach.call(document.querySelectorAll('.slot.is-empty'), function (e) { add(e.getAttribute('data-file')); });
        var box = h('aside', { 'class': 'check', role: 'region', 'aria-label': '缺少的圖片' },
          h('p', { 'class': 'check__title', text: order.length ? '還沒放的圖片' : '圖片都到齊了' }));
        order.forEach(function (d) {
          var names = groups[d];
          var shown = names.slice(0, 3).join('、') + (names.length > 3 ? ' …共 ' + names.length + ' 個' : '');
          box.appendChild(h('p', { 'class': 'check__row' }, h('b', { text: d }), ' ' + shown));
        });
        var close = h('button', { type: 'button', 'class': 'check__close', text: '關閉' });
        close.addEventListener('click', function () { box.remove(); });
        box.appendChild(close);
        document.body.appendChild(box);
      }, 1800);
    });
  }
})();
