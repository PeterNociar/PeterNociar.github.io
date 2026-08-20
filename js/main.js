/* Renders the transform board, the plate grid and the project sheets.
   Routing is the URL hash: #/<slug> opens a sheet, back closes it. */

(function () {
  'use strict';

  var SHOT_DIR = 'assets/screenshots/';

  var board = document.getElementById('board');
  var plates = document.getElementById('plates');
  var scrim = document.getElementById('sheet');
  var sheetEl = scrim.querySelector('.sheet');
  var sheetBody = document.getElementById('sheet-body');
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var lbCap = document.getElementById('lightbox-cap');

  var lastFocus = null;
  var gallery = [];
  var galleryIndex = 0;
  /* False when a sheet URL was opened directly, so there is no page to go back to. */
  var cameFromThisPage = false;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function shotPath(p, file) { return SHOT_DIR + p.slug + '/' + file; }

  function pipeline(p, into) {
    p.pipeline.forEach(function (step, i) {
      if (i) into.appendChild(el('i', null, '→'));
      into.appendChild(el('b', null, step));
    });
    return into;
  }

  /* ------------------------------------------------------- board rows */

  function buildBoard() {
    PROJECTS.forEach(function (p, i) {
      var row = el('a', 'tf');
      row.href = '#/' + p.slug;
      row.setAttribute('role', 'listitem');
      row.style.setProperty('--tf-accent', p.accent);
      row.style.setProperty('--i', i);

      row.appendChild(el('span', 'tf-name', p.name));
      row.appendChild(pipeline(p, el('span', 'tf-pipe')));

      var status = el('span', 'tf-status');
      status.appendChild(el('span', 'status-dot status-' + p.status.key));
      status.appendChild(document.createTextNode(p.status.label));
      row.appendChild(status);

      board.appendChild(row);
    });
  }

  /* ----------------------------------------------------------- plates */

  function buildPlates() {
    PROJECTS.forEach(function (p) {
      var card = el('button', 'plate');
      card.type = 'button';
      card.style.setProperty('--plate-accent', p.accent);
      card.setAttribute('aria-label', 'Open ' + p.name);
      card.addEventListener('click', function () { location.hash = '#/' + p.slug; });

      var thumb = el('div', 'plate-thumb');
      if (p.shots.length) {
        var img = el('img');
        img.src = shotPath(p, p.shots[0].file);
        img.alt = p.name + ': ' + p.shots[0].caption;
        img.loading = 'lazy';
        thumb.appendChild(img);
      } else {
        var empty = el('div', 'plate-empty');
        empty.appendChild(el('span', null, 'No capture yet'));
        thumb.appendChild(empty);
      }
      card.appendChild(thumb);

      var kicker = el('p', 'plate-kicker mono');
      kicker.appendChild(el('span', null, p.kind));
      var st = el('span');
      st.appendChild(el('span', 'status-dot status-' + p.status.key));
      st.appendChild(document.createTextNode(p.status.label));
      kicker.appendChild(st);
      card.appendChild(kicker);

      card.appendChild(el('h3', 'plate-name', p.name));
      card.appendChild(el('p', 'plate-tagline', p.tagline));

      var stack = el('ul', 'plate-stack');
      p.stack.forEach(function (s) { stack.appendChild(el('li', null, s)); });
      card.appendChild(stack);

      card.appendChild(el('span', 'plate-open', 'Open sheet →'));
      plates.appendChild(card);
    });
  }

  /* ------------------------------------------------------------ sheet */

  function buildSheet(p) {
    sheetBody.textContent = '';
    sheetEl.style.setProperty('--sheet-accent', p.accent);

    var kicker = el('p', 'sheet-kicker mono');
    kicker.appendChild(el('span', 'status-dot status-' + p.status.key));
    kicker.appendChild(document.createTextNode(p.kind + ' · ' + p.status.label));
    sheetBody.appendChild(kicker);

    var title = el('h2', 'sheet-title', p.name);
    title.id = 'sheet-title';
    sheetBody.appendChild(title);
    sheetBody.appendChild(el('p', 'sheet-tagline', p.tagline));
    sheetBody.appendChild(pipeline(p, el('p', 'sheet-pipe')));

    sheetBody.appendChild(el('h3', 'sheet-h', 'Why it exists'));
    sheetBody.appendChild(el('p', 'sheet-p', p.problem));

    sheetBody.appendChild(el('h3', 'sheet-h', 'What it does'));
    var list = el('ul', 'sheet-list');
    p.does.forEach(function (d) { list.appendChild(el('li', null, d)); });
    sheetBody.appendChild(list);

    sheetBody.appendChild(el('h3', 'sheet-h', 'How it is put together'));
    sheetBody.appendChild(el('p', 'sheet-p', p.detail));

    sheetBody.appendChild(el('h3', 'sheet-h', 'Screenshots'));
    if (p.shots.length) {
      var grid = el('div', 'gallery');
      p.shots.forEach(function (shot, i) {
        var btn = el('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Enlarge: ' + shot.caption);
        var img = el('img');
        img.src = shotPath(p, shot.file);
        img.alt = shot.caption;
        img.loading = 'lazy';
        btn.appendChild(img);
        btn.addEventListener('click', function () { openLightbox(i); });
        grid.appendChild(btn);
      });
      sheetBody.appendChild(grid);
      gallery = p.shots.map(function (s) {
        return { src: shotPath(p, s.file), caption: s.caption };
      });
      if (p.shotsNote) sheetBody.appendChild(el('p', 'gallery-note', p.shotsNote));
    } else {
      gallery = [];
      var empty = el('div', 'gallery-empty');
      empty.appendChild(document.createTextNode('Nothing captured yet. Drop images into '));
      empty.appendChild(el('code', null, SHOT_DIR + p.slug + '/'));
      empty.appendChild(document.createTextNode(' and list them in js/projects.js.'));
      sheetBody.appendChild(empty);
    }

    var tb = el('dl', 'titleblock');
    [
      ['Project', p.name],
      ['Stack', p.stack.join(' · ')],
      ['Status', p.status.label],
      ['Started', p.started],
      ['Last commit', p.lastTouched],
      ['Commits', String(p.commits)],
      ['Size', p.files],
      ['Repository', p.repoPath]
    ].forEach(function (pair) {
      var cell = el('div');
      cell.appendChild(el('dt', null, pair[0]));
      cell.appendChild(el('dd', null, pair[1]));
      tb.appendChild(cell);
    });
    sheetBody.appendChild(tb);
  }

  function openSheet(p) {
    lastFocus = document.activeElement;
    buildSheet(p);
    scrim.hidden = false;
    document.body.classList.add('body-locked');
    sheetEl.scrollTop = 0;
    scrim.scrollTop = 0;
    sheetEl.focus();
  }

  function closeSheet() {
    scrim.hidden = true;
    document.body.classList.remove('body-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* --------------------------------------------------------- lightbox */

  function showImage() {
    var item = gallery[galleryIndex];
    lbImg.src = item.src;
    lbImg.alt = item.caption;
    lbCap.textContent = (galleryIndex + 1) + ' / ' + gallery.length + ' — ' + item.caption;
  }

  function openLightbox(i) {
    if (!gallery.length) return;
    galleryIndex = i;
    showImage();
    lightbox.hidden = false;
    document.getElementById('lightbox-close').focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    sheetEl.focus();
  }

  function step(delta) {
    if (gallery.length < 2) return;
    galleryIndex = (galleryIndex + delta + gallery.length) % gallery.length;
    showImage();
  }

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', function () { step(-1); });
  document.getElementById('lightbox-next').addEventListener('click', function () { step(1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });

  function dismiss() {
    if (cameFromThisPage) history.back();
    else location.replace('#work');
  }

  document.getElementById('sheet-close').addEventListener('click', dismiss);
  scrim.addEventListener('click', function (e) { if (e.target === scrim) dismiss(); });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
      return;
    }
    if (!scrim.hidden && e.key === 'Escape') dismiss();
  });

  /* ---------------------------------------------------------- routing */

  function route() {
    var slug = (location.hash.match(/^#\/(.+)$/) || [])[1];
    var project = PROJECTS.filter(function (p) { return p.slug === slug; })[0];
    if (project) {
      openSheet(project);
    } else {
      if (!lightbox.hidden) closeLightbox();
      if (!scrim.hidden) closeSheet();
    }
  }

  window.addEventListener('hashchange', function () {
    cameFromThisPage = true;
    route();
  });

  buildBoard();
  buildPlates();
  route();
})();
