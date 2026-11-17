/* =============================================================================
   Lex Serdica · site behaviour
   Reads js/config.js, js/i18n.js and js/content.js. No libraries, no tracking.
   Icons: Lucide (ISC licence, see README).

   Pages: the home page, plus one page per practice area. An area page opens when
   the address ends in the area's slug, e.g. index.html#criminal-defence, so every
   area page has its own link that can be bookmarked or sent to someone.
   ============================================================================= */
(function () {
  'use strict';

  var C = window.SITE_CONFIG;
  var I18N = window.SITE_I18N;
  var CONTENT = window.SITE_CONTENT;
  if (!C || !I18N || !CONTENT) {
    document.documentElement.classList.remove('i18n-pending');
    return;
  }

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = window.__LS_LANG || C.defaultLanguage || 'en';

  /* ---------- Small helpers ---------- */
  function $(sel, el) { return (el || document).querySelector(sel); }
  function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var store = {
    get: function (k) { try { return localStorage.getItem('ls-' + k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem('ls-' + k, v); } catch (e) { /* storage blocked */ } },
  };
  function pick(v) {
    if (v == null) return '';
    if (typeof v === 'string' || Array.isArray(v)) return v;
    if (v[lang] != null) return v[lang];
    if (v.en != null) return v.en;
    var keys = Object.keys(v);
    return keys.length ? v[keys[0]] : '';
  }
  // Content text in the current language, with numbers and ranges kept together
  function txt(v) { var x = pick(v); return Array.isArray(x) ? x.map(glue) : glue(x); }
  function cap(s, l) { return s ? s.charAt(0).toLocaleUpperCase(l || lang) + s.slice(1) : s; }
  // Locale used for lists, plurals and dates: British English, as in the site's spelling
  function loc() { return lang === 'en' ? 'en-GB' : lang; }

  /* ---------- Translation ---------- */
  function raw(key) {
    var d = I18N[lang] || {};
    if (d[key] != null) return d[key];
    var e = I18N.en || {};
    return e[key] != null ? e[key] : null;
  }
  function fillWith(s, vars) {
    return String(s).replace(/\{(\w+)\}/g, function (m, k) { return vars && vars[k] != null ? vars[k] : m; });
  }
  function baseVars() {
    var h = C.contact.hours;
    return {
      min: C.freeMinutes,
      phone: C.contact.phoneDisplay,
      email: C.contact.email,
      firm: C.firm.name,
      address: pick(C.contact.address),
      days: C.booking.maxDaysAhead,
      hours: glue(fillWith(raw('hours.text') || '', h)),
      hoursLine: glue(fillWith(raw('hours.line') || '', h)),
    };
  }
  function htmlVars() {
    var v = baseVars();
    Object.keys(v).forEach(function (k) { v[k] = esc(v[k]); });
    v.phoneLink = '<a href="tel:' + esc(C.contact.phoneLink) + '">' + esc(C.contact.phoneDisplay) + '</a>';
    return v;
  }
  function t(key, vars) {
    var s = raw(key);
    if (s == null) {
      if (window.console) console.warn('[i18n] missing text:', key);
      return key;
    }
    return glue(fillWith(s, Object.assign(baseVars(), vars || {})));
  }
  // Keeps numbers with their words, units and ranges on one line
  function glue(s) {
    return String(s)
      .replace(/(\d)–(\d)/g, '$1⁠–⁠$2')
      .replace(/(\d) (?=[\p{L}%‰])/gu, '$1 ')
      .replace(/ (ч\.|Uhr)(?=[\s.,;:)]|$)/g, ' $1');
  }
  function plural(base, n, vars) {
    var cat = 'other';
    try { cat = new Intl.PluralRules(loc()).select(n); } catch (e) { cat = n === 1 ? 'one' : 'other'; }
    return t(raw(base + '.' + cat) != null ? base + '.' + cat : base + '.other', vars);
  }

  var LANG_NAMES = {
    en: { bg: 'Bulgarian', en: 'English', de: 'German', ru: 'Russian', fr: 'French' },
    bg: { bg: 'български', en: 'английски', de: 'немски', ru: 'руски', fr: 'френски' },
    de: { bg: 'Bulgarisch', en: 'Englisch', de: 'Deutsch', ru: 'Russisch', fr: 'Französisch' },
  };
  function langName(code, inLang) {
    inLang = inLang || lang;
    try {
      var s = new Intl.DisplayNames([inLang], { type: 'language' }).of(code);
      if (s && s.toLowerCase() !== code) return s;
    } catch (e) { /* older browser */ }
    var table = LANG_NAMES[inLang] || LANG_NAMES.en;
    return table[code] || code.toUpperCase();
  }
  function nativeName(code) { return cap(langName(code, code), code); }
  function listOf(items) {
    try { return new Intl.ListFormat(loc(), { style: 'long', type: 'conjunction' }).format(items); } catch (e) { return items.join(', '); }
  }
  function langList(codes) { return listOf(codes.map(function (c) { return langName(c); })); }

  /* ---------- Content helpers ---------- */
  function lawyerById(id) { return CONTENT.lawyers.filter(function (l) { return l.id === id; })[0] || null; }
  function areaById(id) { return CONTENT.areas.filter(function (a) { return a.id === id; })[0] || null; }
  function areaBySlug(slug) { return slug ? CONTENT.areas.filter(function (a) { return a.slug === slug; })[0] || null : null; }
  function lawyersFor(areaId) { return CONTENT.lawyers.filter(function (l) { return l.area === areaId; }); }
  function nameParts(l) {
    var n = (lang === 'bg' && l.name.cyrillic) ? l.name.cyrillic : l.name.latin;
    return { first: n[0], last: n[1], full: n.join(' ') };
  }
  function initials(l) { var n = nameParts(l); return (n.first.charAt(0) + n.last.charAt(0)).toLocaleUpperCase(lang); }
  function years(l) { return Math.max(0, new Date().getFullYear() - l.since); }
  function bookLabel(l) {
    var n = nameParts(l);
    return t('team.book', { first: n.first, last: n.last, full: n.full, hon: t(l.gender === 'f' ? 'hon.f' : 'hon.m') }).replace(/\s+/g, ' ').trim();
  }
  function consultLangs() {
    var seen = [];
    function add(c) { if (seen.indexOf(c) < 0) seen.push(c); }
    C.languages.forEach(function (c) {
      if (CONTENT.lawyers.some(function (l) { return l.languages.indexOf(c) > -1; })) add(c);
    });
    CONTENT.lawyers.forEach(function (l) { l.languages.forEach(add); });
    return seen;
  }
  function icon(name, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }

  /* ---------- Static text and contact details ---------- */
  function applyStatic() {
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    var hv = htmlVars();
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html'), hv); });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2) el.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
  }
  function applyContact() {
    var mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(C.contact.mapsQuery || pick(C.contact.address));
    $$('[data-phone-link]').forEach(function (a) { a.setAttribute('href', 'tel:' + C.contact.phoneLink); });
    $$('[data-phone-text]').forEach(function (el) { el.textContent = C.contact.phoneDisplay; });
    $$('[data-email-link]').forEach(function (a) { a.setAttribute('href', 'mailto:' + C.contact.email); a.textContent = C.contact.email; });
    $$('[data-address]').forEach(function (el) { el.textContent = txt(C.contact.address); });
    $$('[data-maps-link]').forEach(function (a) { a.setAttribute('href', mapsUrl); });
    $$('[data-hours-line]').forEach(function (el) { el.textContent = baseVars().hoursLine; });
    $$('[data-firm]').forEach(function (el) { el.textContent = C.firm.name; });
    $$('[data-tagline]').forEach(function (el) { el.textContent = pick(C.firm.tagline); });
    $$('[data-min]').forEach(function (el) { el.textContent = C.freeMinutes; });
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    $$('[data-demo]').forEach(function (el) { el.hidden = !C.demoMode; });
  }
  function updateMeta() {
    root.lang = lang;
    var title = currentArea ? t('area.meta', { area: pick(currentArea.title) }) : t('meta.title');
    var desc = currentArea ? txt(currentArea.summary) : t('meta.description');
    document.title = title;
    var d = $('meta[name="description"]');
    if (d) d.setAttribute('content', desc);
    var ogt = $('meta[property="og:title"]');
    if (ogt) ogt.setAttribute('content', title);
    var ogd = $('meta[property="og:description"]');
    if (ogd) ogd.setAttribute('content', desc);
  }

  /* ---------- Language switcher ---------- */
  var langBtn = $('[data-lang-btn]');
  var langMenu = $('[data-lang-menu]');
  function renderLangUI() {
    if (langMenu) {
      langMenu.innerHTML = C.languages.map(function (c) {
        var current = c === lang;
        return '<li><button type="button" lang="' + c + '" data-set-lang="' + c + '"' + (current ? ' aria-current="true"' : '') + '>' +
          '<span>' + esc(nativeName(c)) + '</span>' +
          '<span class="lm-code">' + (current ? icon('check') : '') + c.toUpperCase() + '</span>' +
          '</button></li>';
      }).join('');
    }
    var code = $('[data-lang-code]');
    if (code) code.textContent = lang.toUpperCase();
    var sr = $('[data-lang-sr]');
    if (sr) sr.textContent = t('lang.label') + ': ' + nativeName(lang);
    var seg = $('[data-lang-seg]');
    if (seg) {
      seg.setAttribute('aria-label', t('lang.label'));
      seg.innerHTML = C.languages.map(function (c) {
        return '<button type="button" lang="' + c + '" data-set-lang="' + c + '" aria-pressed="' + (c === lang) + '">' + c.toUpperCase() + '<span class="sr-only"> ' + esc(nativeName(c)) + '</span></button>';
      }).join('');
    }
  }
  function toggleLangMenu(open) {
    if (!langMenu || !langBtn) return;
    langMenu.hidden = !open;
    langBtn.setAttribute('aria-expanded', String(open));
    if (open) {
      var cur = $('[aria-current="true"]', langMenu) || $('button', langMenu);
      if (cur) cur.focus();
    }
  }
  if (langBtn) langBtn.addEventListener('click', function () { toggleLangMenu(langMenu.hidden); });
  if (langMenu) {
    langMenu.addEventListener('keydown', function (e) {
      var items = $$('button', langMenu);
      var i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      if (e.key === 'Home') { e.preventDefault(); items[0].focus(); }
      if (e.key === 'End') { e.preventDefault(); items[items.length - 1].focus(); }
    });
    langMenu.addEventListener('focusout', function (e) {
      if (!langMenu.contains(e.relatedTarget) && e.relatedTarget !== langBtn) toggleLangMenu(false);
    });
  }

  function setLang(next, save) {
    if (C.languages.indexOf(next) < 0) return;
    lang = next;
    if (save) store.set('lang', next);
    try {
      var url = new URL(location.href);
      if (url.searchParams.has('lang')) { url.searchParams.set('lang', next); history.replaceState(history.state, '', url); }
    } catch (e) { /* address bar not available */ }
    renderAll();
  }

  /* ---------- Theme ---------- */
  function currentTheme() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  function syncTheme() {
    var dark = currentTheme() === 'dark';
    $$('[data-theme-toggle]').forEach(function (b) { b.setAttribute('aria-pressed', String(dark)); });
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getComputedStyle(root).getPropertyValue('--field').trim() || '#203388');
  }
  function setTheme(next) {
    root.setAttribute('data-theme', next);
    store.set('theme', next);
    syncTheme();
  }
  if (window.MutationObserver) {
    new MutationObserver(syncTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  }

  /* ---------- Rosette for portrait placeholders and tiles ---------- */
  function buildRosette() {
    if (document.getElementById('rosette')) return;
    function ring(R, A, k, phase, N) {
      var d = '';
      for (var i = 0; i <= N; i++) {
        var th = (i / N) * Math.PI * 2;
        var r = R + A * Math.sin(k * th + phase);
        d += (i ? 'L' : 'M') + (r * Math.cos(th)).toFixed(1) + ' ' + (r * Math.sin(th)).toFixed(1);
      }
      return '<path d="' + d + 'Z"/>';
    }
    var paths = '';
    var j;
    for (j = 0; j < 6; j++) paths += ring(72, 13, 16, (j * Math.PI) / 3, 384);
    for (j = 0; j < 3; j++) paths += ring(93, 4.2, 42, (j * 2 * Math.PI) / 3, 504);
    for (j = 0; j < 2; j++) paths += ring(52, 2.6, 24, j * Math.PI, 288);
    // A lighter version with fewer lines for small emblems, so it stays crisp on ordinary screens
    var small = '';
    for (j = 0; j < 3; j++) small += ring(72, 13, 16, (j * 2 * Math.PI) / 3, 288);
    for (j = 0; j < 2; j++) small += ring(93, 4.2, 42, j * Math.PI, 420);
    small += ring(52, 2.6, 24, 0, 192);
    var defs = $('.sprite defs');
    if (defs) defs.insertAdjacentHTML('beforeend', '<symbol id="rosette" viewBox="-100 -100 200 200">' + paths + '</symbol>' +
      '<symbol id="rosette-sm" viewBox="-100 -100 200 200">' + small + '</symbol>');
  }
  function portrait(l, index) {
    var n = nameParts(l);
    if (l.photo) {
      return '<div class="portrait"><img src="' + esc(l.photo) + '" alt="' + esc(t('team.photo', { name: n.full })) + '" loading="lazy" decoding="async"></div>';
    }
    return '<div class="portrait" aria-hidden="true">' +
      '<svg class="rosette" viewBox="0 0 200 200" style="--rot:' + ((index * 17) % 45) + 'deg"><use href="#rosette"/></svg>' +
      '<span class="initials">' + esc(initials(l)) + '</span></div>';
  }
  function emblem(a) {
    return '<span class="emblem" aria-hidden="true"><svg class="rose" viewBox="0 0 200 200"><use href="#rosette-sm"/></svg>' + icon(a.icon) + '</span>';
  }
  function avatar(l) {
    return '<span class="avatar">' + (l.photo ? '<img src="' + esc(l.photo) + '" alt="">' : esc(initials(l))) + '</span>';
  }

  /* ---------- Practice area tiles ---------- */
  function renderAreas() {
    var host = $('[data-render="areas"]');
    if (!host) return;
    host.innerHTML = CONTENT.areas.map(function (a) {
      var team = lawyersFor(a.id);
      var names = listOf(team.map(function (l) { return nameParts(l).full; }));
      return '<article class="tile" data-area="' + a.id + '">' +
        '<div class="tile-top">' + emblem(a) + '<span class="tile-go" aria-hidden="true">' + icon('arrow-right') + '</span></div>' +
        '<h3><a class="tile-link" href="#' + esc(a.slug) + '">' + esc(pick(a.title)) + '</a></h3>' +
        '<p class="tile-sum">' + esc(txt(a.summary)) + '</p>' +
        (team.length ? '<p class="tile-foot"><span class="avatars" aria-hidden="true">' + team.map(avatar).join('') + '</span><span>' + esc(names) + '</span></p>' : '') +
        '</article>';
    }).join('');
  }

  /* ---------- Lawyers ---------- */
  var teamFilter = '';
  function expLine(l) {
    var y = years(l);
    return '<p class="lawyer-exp"><b>' + y + '</b><span>' + esc(plural('team.years', y)) + '<br>' + esc(t('team.since', { year: l.since })) + '</span></p>';
  }
  function areaLabel(a) {
    return '<p class="lawyer-area"><a href="#' + esc(a.slug) + '">' + icon(a.icon) + esc(pick(a.title)) + '</a></p>';
  }
  function renderTeamFilter() {
    var host = $('[data-render="team-filter"]');
    if (!host) return;
    var chips = [{ id: '', label: t('team.all') }].concat(CONTENT.areas.map(function (a) {
      return { id: a.id, label: pick(a.short || a.title), icon: a.icon };
    }));
    host.innerHTML = chips.map(function (c) {
      return '<button type="button" class="chip" data-team-filter="' + c.id + '" aria-pressed="' + (teamFilter === c.id) + '">' +
        (c.icon ? icon(c.icon) : '') + esc(c.label) + '</button>';
    }).join('');
  }
  function renderTeam() {
    var host = $('[data-render="team"]');
    if (!host) return;
    host.innerHTML = CONTENT.lawyers.filter(function (l) { return !teamFilter || l.area === teamFilter; }).map(function (l) {
      var n = nameParts(l);
      var a = areaById(l.area) || { icon: 'scale', title: '', slug: 'areas' };
      return '<article class="lawyer" id="lawyer-' + l.id + '">' + portrait(l, CONTENT.lawyers.indexOf(l)) +
        '<div class="lawyer-body">' + areaLabel(a) +
        '<h3 class="lawyer-name">' + esc(n.full) + '</h3>' +
        '<p class="lawyer-role">' + esc(pick(l.role)) + '</p>' +
        expLine(l) +
        '<dl class="facts">' +
        '<div><dt>' + esc(t('team.education')) + '</dt>' + l.education.map(function (e) { return '<dd>' + esc(txt(e)) + '</dd>'; }).join('') + '</div>' +
        '<div><dt>' + esc(t('team.languages')) + '</dt><dd>' + esc(cap(langList(l.languages))) + '</dd></div>' +
        '</dl>' +
        '<div class="lawyer-actions">' +
        '<a class="btn btn-ink btn-sm" href="#book" data-book-lawyer="' + l.id + '">' + esc(bookLabel(l)) + '</a>' +
        '<button class="link-btn" type="button" data-profile="' + l.id + '" aria-label="' + esc(t('team.profile') + ': ' + n.full) + '">' + esc(t('team.profile')) + '</button>' +
        '</div></div></article>';
    }).join('');
  }
  function setTeamFilter(id) {
    teamFilter = areaById(id) ? id : '';
    renderTeam();
    $$('[data-team-filter]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-team-filter') === teamFilter)); });
    var shown = CONTENT.lawyers.filter(function (l) { return !teamFilter || l.area === teamFilter; }).length;
    var status = $('[data-team-status]');
    if (status) status.textContent = plural('team.showing', shown, { count: shown }) + (teamFilter ? ': ' + pick(areaById(teamFilter).title) : '');
  }
  function updateTeamHeading() {
    var ys = CONTENT.lawyers.map(years);
    var total = ys.reduce(function (s, y) { return s + y; }, 0);
    var title = $('[data-team-title]');
    if (title) title.textContent = t('team.title', { count: CONTENT.lawyers.length, years: total });
    var lead = $('[data-team-lead]');
    if (lead && ys.length) lead.textContent = t('team.lead', { from: Math.min.apply(null, ys), to: Math.max.apply(null, ys) });
  }

  /* ---------- Profile dialog ---------- */
  var openProfileId = null;
  function listHtml(items, cls) { return '<ul' + (cls ? ' class="' + cls + '"' : '') + '>' + items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }
  function renderProfile() {
    var l = lawyerById(openProfileId);
    var body = $('[data-profile-body]');
    if (!l || !body) return;
    var n = nameParts(l);
    var a = areaById(l.area) || { icon: 'scale', title: '', slug: 'areas' };
    var career = (l.career && l.career.length) ? '<section><h3>' + esc(t('team.career')) + '</h3>' + listHtml(l.career.map(txt)) + '</section>' : '';
    body.innerHTML = portrait(l, CONTENT.lawyers.indexOf(l)) +
      '<div class="pf-main">' + areaLabel(a) +
      '<h2 class="pf-name" id="pf-name">' + esc(n.full) + '</h2>' +
      '<p class="lawyer-role">' + esc(pick(l.role)) + '</p>' +
      expLine(l) +
      '<p class="pf-bio">' + esc(txt(l.bio)) + '</p>' +
      '<div class="pf-facts">' +
      '<section><h3>' + esc(t('team.focus')) + '</h3>' + listHtml(txt(l.focus)) + '</section>' +
      '<section><h3>' + esc(t('team.education')) + '</h3>' + listHtml(l.education.map(txt)) + '</section>' + career +
      '<section><h3>' + esc(t('team.bar')) + '</h3><p>' + esc(t('team.barText', { year: l.barSince })) + '</p></section>' +
      '<section><h3>' + esc(t('team.languages')) + '</h3><p>' + esc(cap(langList(l.languages))) + '</p></section>' +
      '</div>' +
      '<div class="pf-actions">' +
      '<a class="btn btn-ink" href="#book" data-book-lawyer="' + l.id + '">' + esc(bookLabel(l)) + '</a>' +
      '<a class="btn btn-outline" href="tel:' + esc(C.contact.phoneLink) + '">' + icon('phone') + esc(t('team.callOffice')) + '</a>' +
      '</div></div>';
  }
  function openProfile(id, trigger) {
    openProfileId = id;
    renderProfile();
    openDialog($('#profile-dialog'), trigger);
  }

  /* ---------- FAQ, footer, legal texts ---------- */
  function qaHtml(f, i, open) {
    var v = baseVars();
    return '<details class="qa" data-i="' + i + '"' + (open ? ' open' : '') + '>' +
      '<summary><span>' + esc(glue(fillWith(pick(f.q), v))) + '</span>' + icon('chevron-down') + '</summary>' +
      '<div class="qa-a"><p>' + esc(glue(fillWith(pick(f.a), v))) + '</p></div></details>';
  }
  function openAnswers(host) {
    return host.querySelector('.qa') ? $$('.qa', host).filter(function (d) { return d.open; }).map(function (d) { return d.getAttribute('data-i'); }) : null;
  }
  function renderFaq() {
    var host = $('[data-render="faq"]');
    if (!host) return;
    var open = openAnswers(host);
    host.innerHTML = CONTENT.faq.map(function (f, i) { return qaHtml(f, i, open ? open.indexOf(String(i)) > -1 : i === 0); }).join('');
  }
  function renderFooterAreas() {
    var host = $('[data-render="footer-areas"]');
    if (!host) return;
    host.innerHTML = CONTENT.areas.map(function (a) {
      return '<li><a href="#' + esc(a.slug) + '">' + esc(pick(a.title)) + '</a></li>';
    }).join('');
  }
  function renderLegal() {
    var hv = htmlVars();
    $$('[data-legal]').forEach(function (el) {
      var src = CONTENT.legal && CONTENT.legal[el.getAttribute('data-legal')];
      if (!src) return;
      el.innerHTML = fillWith(pick(src), hv) + (C.demoMode ? '<p class="dialog-note">' + esc(t('legal.template')) + '</p>' : '');
    });
  }

  /* ---------- Practice area page ---------- */
  var homeView = $('#home-view');
  var areaView = $('#area-view');
  var currentArea = null;
  var TICKS = [
    'M5.6 12.6c1.5 1 2.8 2.6 3.9 4.7 2.4-5.2 5.6-9.2 9.8-12.6',
    'M5.2 13.2c1.7.8 3 2.3 4.1 4.3 2.7-5.6 5.4-9 9.9-12.9',
    'M5.8 12.2c1.4 1.3 2.6 2.8 3.6 4.9 2.6-4.9 5.9-8.9 10-12',
  ];

  function lawyerCardLg(l) {
    var n = nameParts(l);
    var career = (l.career && l.career.length) ? '<div><dt>' + esc(t('team.career')) + '</dt>' + l.career.map(function (e) { return '<dd>' + esc(txt(e)) + '</dd>'; }).join('') + '</div>' : '';
    return '<article class="lawyer lawyer-lg" id="area-lawyer-' + l.id + '">' + portrait(l, CONTENT.lawyers.indexOf(l)) +
      '<div class="lawyer-body">' +
      '<h3 class="lawyer-name">' + esc(n.full) + '</h3>' +
      '<p class="lawyer-role">' + esc(pick(l.role)) + '</p>' +
      expLine(l) +
      '<p class="lawyer-bio">' + esc(txt(l.bio)) + '</p>' +
      '<dl class="facts">' +
      '<div><dt>' + esc(t('team.focus')) + '</dt><dd>' + listHtml(txt(l.focus), 'ticks') + '</dd></div>' +
      '<div><dt>' + esc(t('team.education')) + '</dt>' + l.education.map(function (e) { return '<dd>' + esc(txt(e)) + '</dd>'; }).join('') + '</div>' +
      career +
      '<div><dt>' + esc(t('team.bar')) + '</dt><dd>' + esc(t('team.barText', { year: l.barSince })) + '</dd></div>' +
      '<div><dt>' + esc(t('team.languages')) + '</dt><dd>' + esc(cap(langList(l.languages))) + '</dd></div>' +
      '</dl>' +
      '<div class="lawyer-actions"><a class="btn btn-ink btn-sm" href="#book" data-book-lawyer="' + l.id + '">' + esc(bookLabel(l)) + '</a></div>' +
      '</div></article>';
  }

  function renderAreaView() {
    var a = currentArea;
    if (!a || !areaView) return;
    // Keep ticked documents and open answers when the page is redrawn in another language
    var same = areaView.getAttribute('data-area') === a.id;
    var ticked = same ? $$('.doc input', areaView).map(function (x) { return x.checked; }) : [];
    var faqHost = $('.area-faq .faq-list', areaView);
    var open = same && faqHost ? openAnswers(faqHost) : null;
    areaView.setAttribute('data-area', a.id);

    var title = pick(a.title);
    var tel = esc(C.contact.phoneLink);
    var callBtn = function (cls) { return '<a class="btn ' + cls + '" href="tel:' + tel + '">' + icon('phone') + '<span>' + esc(t('cta.call')) + '</span></a>'; };
    var bookBtn = function (cls) { return '<a class="btn ' + cls + '" href="#book" data-book-area="' + a.id + '">' + esc(t('cta.free')) + '</a>'; };

    var urgent = !a.urgent ? '' :
      '<div class="alert">' + icon('circle-alert', 'alert-i') +
      '<div><p class="alert-t">' + esc(txt(a.urgent.title)) + '</p><p class="alert-text">' + esc(txt(a.urgent.text)) + '</p></div>' +
      '<div class="alert-act"><a class="btn btn-seal" href="tel:' + tel + '">' + icon('phone-call') + '<span>' + esc(t('cta.call')) + '</span></a>' +
      '<span class="alert-hours">' + esc(baseVars().hoursLine) + '</span></div></div>';

    var facts = '<aside class="facts-card" aria-labelledby="facts-t">' +
      '<svg class="v-guilloche" aria-hidden="true"></svg>' +
      '<div class="fc-inner">' +
      '<h2 class="fc-head" id="facts-t"><svg class="seal" viewBox="0 0 48 48" aria-hidden="true"><use href="#seal"/></svg>' + esc(t('area.facts')) + '</h2>' +
      '<dl class="fc-list">' + a.facts.map(function (f) {
        return '<div class="fact"><dt><span class="fact-v">' + esc(txt(f.value)) + '</span><span class="fact-l">' + esc(txt(f.label)) + '</span></dt>' +
          '<dd>' + esc(txt(f.note)) + '</dd></div>';
      }).join('') + '</dl></div></aside>';

    var hero = '<section class="area-hero" aria-labelledby="area-h1"><div class="wrap">' +
      '<a class="area-back" href="#areas">' + icon('arrow-left') + esc(t('area.back')) + '</a>' +
      urgent +
      '<div class="area-head">' +
      '<div class="area-title"><span class="area-icon" aria-hidden="true">' + icon(a.icon) + '</span>' +
      '<h1 class="display area-h1" id="area-h1" tabindex="-1">' + esc(title) + '</h1></div>' +
      '<p class="area-lede area-intro">' + esc(txt(a.intro)) + '</p>' +
      '<div class="area-acts"><div class="btn-row">' + bookBtn('btn-light btn-lg') + callBtn('btn-ghost btn-lg') + '</div></div>' +
      '</div>' + facts + '</div></section>';

    var situations = '<section class="section area-sit" aria-labelledby="sit-t"><div class="wrap">' +
      '<h2 class="area-h2" id="sit-t">' + esc(t('area.situations')) + '</h2>' +
      '<div class="sit-grid">' + a.situations.map(function (s) {
        return '<div class="sit"><h3>' + esc(txt(s.title)) + '</h3><p>' + esc(txt(s.text)) + '</p></div>';
      }).join('') + '</div></div></section>';

    var before = '<section class="section area-before" aria-labelledby="before-t"><div class="wrap">' +
      '<div class="section-head"><h2 id="before-t">' + esc(t('area.before')) + '</h2><p class="section-lead">' + esc(t('area.beforeLead')) + '</p></div>' +
      '<div class="before-grid">' +
      '<div class="before-steps"><h3>' + esc(t('area.steps')) + '</h3><ol class="vsteps">' +
      txt(a.steps).map(function (s, i) { return '<li><span class="step-n" aria-hidden="true">' + (i + 1) + '</span>' + esc(s) + '</li>'; }).join('') +
      '</ol>' + bookBtn('btn-ink btn-lg') + '</div>' +
      '<div class="docs-card"><h3 id="docs-t">' + esc(t('area.docs')) + '</h3><ul class="docs" aria-labelledby="docs-t">' +
      txt(a.documents).map(function (d, i) {
        var id = 'doc-' + a.id + '-' + i;
        return '<li class="doc"><input type="checkbox" id="' + id + '"' + (ticked[i] ? ' checked' : '') + '>' +
          '<label for="' + id + '"><svg class="v-box" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="2.5"/>' +
          '<path class="v-tick" pathLength="1" d="' + TICKS[i % TICKS.length] + '"/></svg><span>' + esc(d) + '</span></label></li>';
      }).join('') +
      '</ul><p class="docs-note">' + esc(t('area.docsNote')) + '</p></div>' +
      '</div></div></section>';

    var team = lawyersFor(a.id);
    var lawyers = !team.length ? '' : '<section class="section area-team" aria-labelledby="alaw-t"><div class="wrap">' +
      '<div class="section-head"><h2 id="alaw-t">' + esc(t('area.lawyers')) + '</h2><p class="section-lead">' + esc(t('area.lawyersLead')) + '</p></div>' +
      '<div class="pair">' + team.map(lawyerCardLg).join('') + '</div>' +
      (C.demoMode ? '<p class="sample-note">' + esc(t('team.sample')) + '</p>' : '') +
      '</div></section>';

    var faq = '<section class="section area-faq" aria-labelledby="afaq-t"><div class="wrap faq-grid">' +
      '<div class="faq-head"><h2 id="afaq-t">' + esc(t('area.faq')) + '</h2><p class="section-lead">' + t('faq.lead', htmlVars()) + '</p></div>' +
      '<div class="faq-list">' + a.faq.map(function (f, i) { return qaHtml(f, i, open ? open.indexOf(String(i)) > -1 : i === 0); }).join('') + '</div>' +
      '</div></section>';

    var more = '<section class="area-more" aria-labelledby="more-t"><div class="wrap">' +
      '<h2 id="more-t">' + esc(t('area.other')) + '</h2>' +
      '<ul class="more-grid">' + CONTENT.areas.filter(function (x) { return x.id !== a.id; }).map(function (x) {
        return '<li><a class="more-link" href="#' + esc(x.slug) + '">' + icon(x.icon) + '<span>' + esc(pick(x.title)) + '</span>' + icon('arrow-right', 'more-go') + '</a></li>';
      }).join('') + '</ul>' +
      '<p class="disclaimer">' + esc(t('area.disclaimer')) + '</p>' +
      (C.demoMode ? '<p class="disclaimer">' + esc(t('area.sample')) + '</p>' : '') +
      '</div></section>';

    areaView.innerHTML = '<div class="area-page">' + hero + situations + before + lawyers + faq + more + '</div>';
    watchFacts();
  }

  /* ---------- Guilloche borders: the voucher and the "Worth knowing" sheet ---------- */
  function roundedRect(x0, y0, x1, y1, r) {
    var w = x1 - x0, h = y1 - y0, arc = Math.PI * r / 2;
    function corner(cx, cy, start) {
      return function (s) {
        var th = start + s / r;
        return [cx + r * Math.cos(th), cy + r * Math.sin(th), -Math.cos(th), -Math.sin(th)];
      };
    }
    var segs = [
      { len: w - 2 * r, f: function (s) { return [x0 + r + s, y0, 0, 1]; } },
      { len: arc, f: corner(x1 - r, y0 + r, -Math.PI / 2) },
      { len: h - 2 * r, f: function (s) { return [x1, y0 + r + s, -1, 0]; } },
      { len: arc, f: corner(x1 - r, y1 - r, 0) },
      { len: w - 2 * r, f: function (s) { return [x1 - r - s, y1, 0, -1]; } },
      { len: arc, f: corner(x0 + r, y1 - r, Math.PI / 2) },
      { len: h - 2 * r, f: function (s) { return [x0, y1 - r - s, 1, 0]; } },
      { len: arc, f: corner(x0 + r, y0 + r, Math.PI) },
    ];
    var P = segs.reduce(function (sum, g) { return sum + g.len; }, 0);
    return {
      P: P,
      at: function (s) {
        s = ((s % P) + P) % P;
        for (var i = 0; i < segs.length; i++) {
          if (s <= segs[i].len) return segs[i].f(s);
          s -= segs[i].len;
        }
        return segs[0].f(0);
      },
    };
  }
  // Four phase-shifted waves running round a rounded rectangle, framed by two fine lines
  function guilloche(host, svg, inset, band) {
    if (!host || !svg) return;
    var W = host.offsetWidth, H = host.offsetHeight;
    if (!W || !H) return;
    var mid = inset + band / 2, r = band * 1.4;
    var rr = roundedRect(mid, mid, W - mid, H - mid, r);
    var waves = Math.max(12, Math.round(rr.P / (band * 2.4)));
    var N = Math.ceil(rr.P / 2);
    var out = '';
    for (var j = 0; j < 4; j++) {
      var phase = (j * Math.PI) / 2, d = '';
      for (var i = 0; i <= N; i++) {
        var s = (i / N) * rr.P;
        var p = rr.at(s);
        var o = (band / 2) * Math.sin((2 * Math.PI * waves * s) / rr.P + phase);
        d += (i ? 'L' : 'M') + (p[0] + p[2] * o).toFixed(1) + ' ' + (p[1] + p[3] * o).toFixed(1);
      }
      out += '<path d="' + d + 'Z" stroke-width=".7"/>';
    }
    var e1 = inset - 2.5, e2 = inset + band + 2.5;
    out += '<rect x="' + e1.toFixed(1) + '" y="' + e1.toFixed(1) + '" width="' + (W - 2 * e1).toFixed(1) + '" height="' + (H - 2 * e1).toFixed(1) + '" rx="' + (r + band / 2 + 2.5).toFixed(1) + '" fill="none" stroke="currentColor" stroke-width="1"/>';
    out += '<rect x="' + e2.toFixed(1) + '" y="' + e2.toFixed(1) + '" width="' + (W - 2 * e2).toFixed(1) + '" height="' + (H - 2 * e2).toFixed(1) + '" rx="' + Math.max(1, r - band / 2 - 2.5).toFixed(1) + '" fill="none" stroke="currentColor" stroke-width=".7"/>';
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.innerHTML = out;
  }
  function drawVoucher() {
    var v = $('.voucher');
    if (v && v.offsetWidth) guilloche(v, $('.v-guilloche', v), v.offsetWidth * 0.05, Math.max(6, v.offsetWidth * 0.028));
  }
  function drawFacts() {
    var card = areaView && $('.facts-card', areaView);
    if (card) guilloche(card, $('.v-guilloche', card), 12, 9);
  }
  function redrawOnResize(fn) {
    if (!window.ResizeObserver) return null;
    var pending = 0;
    return new ResizeObserver(function () {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(fn);
    });
  }
  var factsObserver = redrawOnResize(drawFacts);
  function watchFacts() {
    drawFacts();
    if (!factsObserver) return;
    factsObserver.disconnect();
    var card = $('.facts-card', areaView);
    if (card) factsObserver.observe(card);
  }
  function fitStamp() {
    var tp = $('[data-stamp-ring]'), word = $('[data-stamp-word]'), mins = $('[data-stamp-min]');
    if (mins) mins.textContent = t('stamp.min');
    if (tp) {
      tp.textContent = t('stamp.ring') + ' ';
      var text = tp.parentNode;
      text.style.letterSpacing = '0px';
      text.setAttribute('font-size', '15');
      var circ = 2 * Math.PI * 71, len = 0;
      try { len = text.getComputedTextLength(); } catch (e) { len = 0; }
      if (len > 0) {
        if (len > circ * 0.97) {
          text.setAttribute('font-size', (15 * (circ * 0.93) / len).toFixed(2));
          len = text.getComputedTextLength();
        }
        var chars = Array.from ? Array.from(tp.textContent).length : tp.textContent.length;
        text.style.letterSpacing = ((circ - len) / chars).toFixed(3) + 'px';
      }
    }
    if (word) {
      word.textContent = t('stamp.word');
      word.setAttribute('font-size', '30');
      try {
        var w = word.getComputedTextLength();
        if (w > 94) word.setAttribute('font-size', (30 * 94 / w).toFixed(2));
      } catch (e) { /* not rendered yet */ }
    }
  }

  /* ---------- Structured data for search engines ---------- */
  function updateJsonLd() {
    var el = document.getElementById('ld-json');
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = 'ld-json';
      document.head.appendChild(el);
    }
    var pc = C.contact.postal || {};
    var h = C.contact.hours;
    var dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    function hhmm(s) { var p = String(s).split(':'); return ('0' + p[0]).slice(-2) + ':' + (p[1] || '00'); }
    var data = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: C.firm.name,
      description: t('meta.description'),
      telephone: C.contact.phoneLink,
      email: C.contact.email,
      address: { '@type': 'PostalAddress', streetAddress: pc.street, addressLocality: pc.city, postalCode: pc.zip, addressCountry: pc.country },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: C.contact.workdays.map(function (d) { return dayNames[d - 1]; }), opens: hhmm(h.open), closes: hhmm(h.close) }],
      areaServed: 'Bulgaria',
      availableLanguage: consultLangs(),
      knowsAbout: CONTENT.areas.map(function (a) { return pick(a.title); }),
      employee: CONTENT.lawyers.map(function (l) { return { '@type': 'Person', name: nameParts(l).full, jobTitle: pick(l.role) }; }),
    };
    el.textContent = JSON.stringify(data);
  }

  /* ---------- Booking form ---------- */
  var form = $('#booking-form');
  var okPanel = $('#book-ok');
  var langTouched = false;
  var areaChosen = false; // true once the visitor picks an area or a lawyer in the form themselves
  var lastRequest = null;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function isoDate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function addDays(d, n) { var x = startOfDay(d); x.setDate(x.getDate() + n); return x; }
  function parseISO(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }

  function slotLabel(slot, i) {
    var name = raw('slot.' + i);
    return (name ? name + ', ' : '') + slot[0] + '⁠–⁠' + slot[1];
  }
  function fillSelects() {
    if (!form) return;
    var area = $('#f-area'), lawyer = $('#f-lawyer'), lng = $('#f-lang'), time = $('#f-time');
    var keep = { area: area.value, lawyer: lawyer.value, lng: lng.value, time: time.value };
    area.innerHTML = '<option value="">' + esc(t('form.areaAny')) + '</option>' + CONTENT.areas.map(function (a) {
      return '<option value="' + a.id + '">' + esc(pick(a.title)) + '</option>';
    }).join('');
    lawyer.innerHTML = '<option value="">' + esc(t('form.lawyerAny')) + '</option>' + CONTENT.areas.map(function (a) {
      return '<optgroup label="' + esc(pick(a.title)) + '">' + lawyersFor(a.id).map(function (l) {
        return '<option value="' + l.id + '">' + esc(nameParts(l).full) + '</option>';
      }).join('') + '</optgroup>';
    }).join('');
    var langs = consultLangs();
    lng.innerHTML = langs.map(function (c) { return '<option value="' + c + '">' + esc(cap(langName(c))) + '</option>'; }).join('');
    time.innerHTML = '<option value="">' + esc(t('form.timeAny')) + '</option>' + C.booking.timeSlots.map(function (s, i) {
      return '<option value="' + s[0] + '-' + s[1] + '">' + esc(slotLabel(s, i)) + '</option>';
    }).join('');
    area.value = keep.area;
    lawyer.value = keep.lawyer;
    time.value = keep.time;
    if (langTouched && langs.indexOf(keep.lng) > -1) lng.value = keep.lng;
    else lng.value = langs.indexOf(lang) > -1 ? lang : langs[0];
    var date = $('#f-date');
    date.min = isoDate(addDays(new Date(), 1));
    date.max = isoDate(addDays(new Date(), C.booking.maxDaysAhead));
  }

  function setLawyer(id) {
    var l = lawyerById(id);
    if (!l || !form) return;
    $('#f-lawyer').value = l.id;
    $('#f-area').value = l.area;
    checkLangNote();
  }
  function setArea(id) {
    if (!form || !areaById(id)) return;
    $('#f-area').value = id;
    var l = lawyerById($('#f-lawyer').value);
    if (l && l.area !== id) $('#f-lawyer').value = '';
    checkLangNote();
  }
  function checkLangNote() {
    var note = $('#lang-note');
    if (!note) return;
    var l = lawyerById($('#f-lawyer').value), code = $('#f-lang').value;
    if (l && code && l.languages.indexOf(code) < 0) {
      note.textContent = t('form.langNote', { name: nameParts(l).full, langs: langList(l.languages), lang: langName(code) });
      note.hidden = false;
    } else {
      note.textContent = '';
      note.hidden = true;
    }
  }
  function currentMode() {
    var checked = form && form.querySelector('input[name="mode"]:checked');
    return checked ? checked.value : 'phone';
  }
  function updateMode() {
    if (!form) return;
    var video = currentMode() === 'video';
    var email = $('#f-email');
    email.required = video;
    var opt = $('[data-email-opt]');
    if (opt) opt.hidden = video;
    $('#f-email-hint').hidden = !video;
    $$('.mode', form).forEach(function (m) { m.classList.toggle('is-checked', m.querySelector('input').checked); });
    if (email.getAttribute('aria-invalid') === 'true') validateField('f-email');
  }

  var rules = {
    'f-name': function (el) { return el.value.trim().length >= 2 ? '' : 'err.name'; },
    'f-phone': function (el) {
      var v = el.value.trim(), digits = v.replace(/\D/g, '');
      return /^[+\d\s()\-./]+$/.test(v) && digits.length >= 8 && digits.length <= 15 ? '' : 'err.phone';
    },
    'f-email': function (el) {
      var v = el.value.trim();
      if (!v) return el.required ? 'err.emailReq' : '';
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'err.email';
    },
    'f-date': function (el) {
      if (!el.value) return '';
      var d = parseISO(el.value);
      var today = startOfDay(new Date());
      if (!d || d <= today) return 'err.datePast';
      if (d > addDays(today, C.booking.maxDaysAhead)) return 'err.dateFar';
      var weekday = d.getDay() || 7;
      return C.contact.workdays.indexOf(weekday) > -1 ? '' : 'err.dateWeekend';
    },
    'f-consent': function (el) { return el.checked ? '' : 'err.consent'; },
  };
  function setError(id, key) {
    var el = document.getElementById(id), err = document.getElementById(id + '-err');
    if (!el || !err) return;
    el.setAttribute('data-err', key || '');
    if (key) {
      el.setAttribute('aria-invalid', 'true');
      err.textContent = t(key);
      err.hidden = false;
    } else {
      el.removeAttribute('aria-invalid');
      err.textContent = '';
      err.hidden = true;
    }
  }
  function validateField(id) {
    var el = document.getElementById(id);
    var key = rules[id](el);
    setError(id, key);
    return !key;
  }
  function retranslateErrors() {
    Object.keys(rules).forEach(function (id) {
      var el = document.getElementById(id);
      var key = el && el.getAttribute('data-err');
      if (key) setError(id, key);
    });
    var status = $('#form-status');
    if (status && !status.hidden && status.getAttribute('data-key')) status.textContent = t(status.getAttribute('data-key'));
  }
  function showStatus(key) {
    var status = $('#form-status');
    if (!status) return;
    status.setAttribute('data-key', key || '');
    status.textContent = key ? t(key) : '';
    status.hidden = !key;
  }
  function updateCount() {
    var msg = $('#f-msg'), count = $('#f-msg-count');
    if (msg && count) count.textContent = msg.value.length + ' / ' + (msg.maxLength > 0 ? msg.maxLength : 1000);
  }

  function payload() {
    var area = areaById($('#f-area').value), l = lawyerById($('#f-lawyer').value);
    return {
      mode: currentMode(),
      area: area ? area.id : '',
      areaTitle: area ? area.title.en : '',
      lawyer: l ? l.id : '',
      lawyerName: l ? l.name.latin.join(' ') : '',
      language: $('#f-lang').value,
      date: $('#f-date').value,
      time: $('#f-time').value,
      name: $('#f-name').value.trim(),
      phone: $('#f-phone').value.trim(),
      email: $('#f-email').value.trim(),
      message: $('#f-msg').value.trim(),
      consent: $('#f-consent').checked,
      siteLanguage: lang,
      sentAt: new Date().toISOString(),
      page: location.href,
    };
  }
  function renderSuccess() {
    var d = lastRequest;
    if (!d || !okPanel) return;
    var first = d.name.split(/\s+/)[0] || d.name;
    $('#ok-title').textContent = t('ok.title', { name: first });
    $('#ok-text').textContent = t('ok.text', { phone: d.phone });
    var area = areaById(d.area), l = lawyerById(d.lawyer);
    var when = t('form.timeAny');
    var date = parseISO(d.date);
    var slotIndex = C.booking.timeSlots.map(function (s) { return s[0] + '-' + s[1]; }).indexOf(d.time);
    var slot = slotIndex > -1 ? slotLabel(C.booking.timeSlots[slotIndex], slotIndex) : '';
    if (date) {
      var dateText;
      try { dateText = new Intl.DateTimeFormat(loc(), { weekday: 'long', day: 'numeric', month: 'long' }).format(date); } catch (e) { dateText = d.date; }
      when = cap(dateText) + (slot ? ', ' + slot.charAt(0).toLocaleLowerCase(loc()) + slot.slice(1) : '');
    } else if (slot) {
      when = cap(slot);
    }
    var rows = [
      [t('ok.mode'), t('mode.' + d.mode)],
      [t('ok.area'), area ? pick(area.title) : t('form.areaAny')],
      [t('ok.lawyer'), l ? nameParts(l).full : t('form.lawyerAny')],
      [t('ok.lang'), cap(langName(d.language))],
      [t('ok.when'), when],
    ];
    $('#ok-list').innerHTML = rows.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('');
    $('#ok-demo').hidden = !!C.booking.endpoint;
  }
  function showSuccess(data) {
    lastRequest = data;
    renderSuccess();
    form.hidden = true;
    okPanel.hidden = false;
    var title = $('#ok-title');
    if (title) title.focus({ preventScroll: true });
    var panel = $('#book');
    var top = panel.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
  function resetForm() {
    if (!form) return;
    form.reset();
    lastRequest = null;
    langTouched = false;
    areaChosen = false;
    okPanel.hidden = true;
    form.hidden = false;
    Object.keys(rules).forEach(function (id) { setError(id, ''); });
    showStatus('');
    fillSelects();
    updateMode();
    updateCount();
    checkLangNote();
  }

  if (form) {
    form.addEventListener('change', function (e) {
      var id = e.target.id;
      if (e.target.name === 'mode') updateMode();
      if (id === 'f-lawyer') {
        var l = lawyerById(e.target.value);
        if (l) $('#f-area').value = l.area;
        areaChosen = true;
        checkLangNote();
      }
      if (id === 'f-area') {
        var cur = lawyerById($('#f-lawyer').value);
        if (cur && cur.area !== e.target.value) $('#f-lawyer').value = '';
        areaChosen = true;
        checkLangNote();
      }
      if (id === 'f-lang') { langTouched = true; checkLangNote(); }
      if (id === 'f-date' || id === 'f-consent') validateField(id);
    });
    form.addEventListener('focusout', function (e) {
      var id = e.target.id;
      if (rules[id] && id !== 'f-consent' && (e.target.value || e.target.getAttribute('aria-invalid'))) validateField(id);
    });
    form.addEventListener('input', function (e) {
      if (e.target.id === 'f-msg') updateCount();
      if (rules[e.target.id] && e.target.getAttribute('aria-invalid') === 'true') validateField(e.target.id);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('#f-website').value) return; // filled in by a bot
      var firstBad = null;
      Object.keys(rules).forEach(function (id) {
        if (!validateField(id) && !firstBad) firstBad = document.getElementById(id);
      });
      if (firstBad) {
        showStatus('err.summary');
        firstBad.focus();
        return;
      }
      showStatus('');
      var data = payload();
      var btn = $('#f-submit');
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.textContent = t('form.sending');
      var finish = function () {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
        btn.textContent = t('form.submit');
      };
      var send;
      if (C.booking.endpoint) {
        var ctrl = window.AbortController ? new AbortController() : null;
        var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
        send = fetch(C.booking.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
          signal: ctrl ? ctrl.signal : undefined,
        }).then(function (res) {
          clearTimeout(timer);
          if (!res.ok) throw new Error('HTTP ' + res.status);
        });
      } else {
        // Demo mode: nothing is sent anywhere
        send = new Promise(function (resolve) { setTimeout(resolve, 650); });
      }
      send.then(function () { finish(); showSuccess(data); })
        .catch(function () { finish(); showStatus('err.send'); });
    });
    var again = $('#ok-again');
    if (again) again.addEventListener('click', function () { resetForm(); $('#f-name').focus(); });
  }

  /* ---------- Dialogs ---------- */
  var returnFocus = null;
  var skipReturn = false;
  function openDialog(d, trigger) {
    if (!d) return;
    returnFocus = trigger || document.activeElement;
    if (typeof d.showModal === 'function') { if (!d.open) d.showModal(); } else { d.setAttribute('open', ''); }
  }
  function closeDialog(d) {
    if (!d) return;
    if (typeof d.close === 'function') d.close(); else d.removeAttribute('open');
  }
  $$('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d) closeDialog(d); });
    d.addEventListener('close', function () {
      if (d.id === 'profile-dialog') openProfileId = null;
      if (d.id === 'menu-dialog') { var mb = $('[data-menu-btn]'); if (mb) mb.setAttribute('aria-expanded', 'false'); }
      if (!skipReturn && returnFocus && document.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
      skipReturn = false;
    });
  });

  /* ---------- Pages and scrolling ----------
     The address decides the page: an area's slug opens its page, anything else shows
     the home page. The booking section is shared, so #contact and #book stay on the
     current page. Where the visitor was on each page is kept in the browser history,
     so Back returns to the same spot (for example the tile they opened). */
  var HOME_IDS = ['top', 'areas', 'lawyers', 'process', 'fees', 'faq'];
  var SHARED_IDS = ['main', 'contact', 'book'];
  var focusOnArrival = false;
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) { /* not allowed */ }

  function hashId() {
    var h = location.hash.slice(1);
    try { return decodeURIComponent(h); } catch (e) { return h; }
  }
  function saveScroll() {
    try { history.replaceState(Object.assign({}, history.state || {}, { lsY: Math.round(window.scrollY) }), ''); } catch (e) { /* history not available */ }
  }
  function savedScroll() {
    var s = null;
    try { s = history.state; } catch (e) { s = null; }
    return s && typeof s.lsY === 'number' ? s.lsY : null;
  }
  // Jump without the smooth scrolling set in the stylesheet (used when a new page is shown)
  function instantly(fn) {
    var before = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    void getComputedStyle(root).scrollBehavior; // apply the change before scrolling
    fn();
    root.style.scrollBehavior = before;
  }
  function jumpTo(y) {
    try { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); }
    catch (e) { instantly(function () { window.scrollTo(0, y); }); } // browsers without 'instant'
  }
  function jumpToEl(el, block) {
    try { el.scrollIntoView({ block: block || 'start', behavior: 'instant' }); }
    catch (e) { instantly(function () { el.scrollIntoView({ block: block || 'start' }); }); }
  }
  function focusQuietly(el) {
    if (!el) return;
    if (!el.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
  function markNav() {
    if (!currentArea) return;
    $$('.main-nav a, .sheet-nav a').forEach(function (a) {
      if (a.getAttribute('href') === '#areas') a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }
  function showView(area) {
    if (homeView) homeView.hidden = area;
    if (areaView) areaView.hidden = !area;
    if (!area && areaView) { areaView.innerHTML = ''; areaView.removeAttribute('data-area'); }
    markNav();
  }

  function route(initial) {
    var id = hashId();
    var y = initial ? null : savedScroll();
    var wantFocus = focusOnArrival;
    focusOnArrival = false;
    var area = areaBySlug(id);

    if (area) {
      var same = currentArea && currentArea.id === area.id;
      currentArea = area;
      if (initial) { showView(true); return; } // drawn by renderAll() at start-up
      if (!same) {
        renderAreaView();
        showView(true);
        drawFacts();
        updateMeta();
      }
      if (y != null) jumpTo(y);
      else if (!same) { jumpTo(0); focusQuietly($('#area-h1')); }
      return;
    }

    if (currentArea) {
      if (SHARED_IDS.indexOf(id) > -1) return; // the booking form, on the same page
      var from = currentArea;
      currentArea = null;
      showView(false);
      updateMeta();
      drawVoucher();
      if (y != null) { jumpTo(y); return; }
      var tile = id === 'areas' && $('.tile[data-area="' + from.id + '"]');
      if (tile) { jumpToEl(tile, 'center'); focusQuietly($('.tile-link', tile)); return; }
      var target = id !== 'top' && HOME_IDS.indexOf(id) > -1 ? document.getElementById(id) : null;
      if (target) { jumpToEl(target); focusQuietly($('h2', target)); } else jumpTo(0);
      return;
    }

    // Home page to home page: the browser has already scrolled to the section
    if (y != null) jumpTo(y);
    else if (wantFocus) {
      var section = document.getElementById(id);
      if (section && id !== 'top') focusQuietly($('h2', section) || section);
    }
  }
  // Used by links inside dialogs, which close first and then go to the place
  function goTo(id) {
    if (hashId() !== id) {
      saveScroll();
      focusOnArrival = true;
      location.hash = id;
      return;
    }
    var target = id === 'top' ? null : document.getElementById(id);
    if (target && !target.closest('[hidden]')) {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      focusQuietly($('h1, h2', target) || target);
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }

  /* ---------- Booking shortcuts from anywhere on the page ---------- */
  function goToForm() {
    var panel = $('#book');
    if (!panel) return;
    if (form && form.hidden) resetForm();
    panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    panel.classList.remove('flash');
    void panel.offsetWidth;
    panel.classList.add('flash');
    panel.focus({ preventScroll: true });
  }

  // Remember where the visitor was before following a link on the page
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a) saveScroll();
  }, true);
  window.addEventListener('pagehide', saveScroll);
  // Also note the position shortly after scrolling stops, so a reload can return to it
  var saveTimer = 0;
  window.addEventListener('scroll', function () {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveScroll, 250);
  }, { passive: true });

  document.addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-set-lang]'))) {
      var fromSeg = !!el.closest('[data-lang-seg]');
      setLang(el.getAttribute('data-set-lang'), true);
      toggleLangMenu(false);
      if (fromSeg) { var again = $('[data-lang-seg] [data-set-lang="' + lang + '"]'); if (again) again.focus(); }
      else if (langBtn) langBtn.focus();
      return;
    }
    if (langMenu && !langMenu.hidden && !e.target.closest('[data-lang]')) toggleLangMenu(false);

    if ((el = e.target.closest('[data-theme-toggle]'))) {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      return;
    }
    if ((el = e.target.closest('[data-team-filter]'))) {
      setTeamFilter(el.getAttribute('data-team-filter'));
      return;
    }
    if ((el = e.target.closest('[data-book], [data-book-lawyer], [data-book-area]'))) {
      e.preventDefault();
      var dlg = el.closest('dialog');
      if (dlg) { skipReturn = true; closeDialog(dlg); }
      if (form && form.hidden) resetForm();
      if (el.hasAttribute('data-book-lawyer')) setLawyer(el.getAttribute('data-book-lawyer'));
      else if (el.hasAttribute('data-book-area')) setArea(el.getAttribute('data-book-area'));
      else if (currentArea && !areaChosen) setArea(currentArea.id); // a general "Book" button on an area page
      requestAnimationFrame(goToForm);
      return;
    }
    if ((el = e.target.closest('[data-profile]'))) {
      openProfile(el.getAttribute('data-profile'), el);
      return;
    }
    if ((el = e.target.closest('[data-open]'))) {
      e.preventDefault();
      openDialog(document.getElementById(el.getAttribute('data-open') + '-dialog'), el);
      return;
    }
    if ((el = e.target.closest('[data-close]'))) {
      closeDialog(el.closest('dialog'));
      return;
    }
    if ((el = e.target.closest('dialog a[href^="#"]'))) {
      e.preventDefault();
      var id = el.getAttribute('href').slice(1);
      skipReturn = true;
      closeDialog(el.closest('dialog'));
      requestAnimationFrame(function () { goTo(id); });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && langMenu && !langMenu.hidden) { toggleLangMenu(false); if (langBtn) langBtn.focus(); }
  });

  var menuBtn = $('[data-menu-btn]');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      openDialog($('#menu-dialog'), menuBtn);
      menuBtn.setAttribute('aria-expanded', 'true');
    });
  }
  // Close the mobile menu if the window grows past the point where the full navigation shows
  if (window.matchMedia) {
    var wide = window.matchMedia('(min-width: 1181px)');
    var onWide = function () { if (wide.matches) closeDialog($('#menu-dialog')); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
  }

  /* ---------- Header, current section, mobile bar ---------- */
  var header = $('.site-header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 4); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    var navLinks = $$('.main-nav a, .sheet-nav a');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target === areaView ? 'areas' : en.target.id;
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['areas', 'lawyers', 'process', 'fees', 'faq', 'contact', 'area-view'].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
    var hero = $('.hero');
    if (hero) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
      }, { rootMargin: '-45% 0px -50% 0px' }).observe(hero);
    }
    var bar = $('[data-mobile-bar]'), contact = $('#contact');
    if (bar && contact) {
      new IntersectionObserver(function (entries) {
        bar.classList.toggle('is-hidden', entries[0].isIntersecting);
      }, { threshold: 0.02 }).observe(contact);
    }
  }
  var stamp = $('.stamp');
  if (stamp) stamp.addEventListener('animationend', function () { stamp.classList.add('is-stamped'); });

  /* ---------- Put it all together ---------- */
  function renderAll() {
    applyStatic();
    applyContact();
    updateMeta();
    renderLangUI();
    renderAreas();
    renderTeamFilter();
    renderTeam();
    updateTeamHeading();
    renderFaq();
    renderFooterAreas();
    renderLegal();
    if (currentArea) renderAreaView();
    fillSelects();
    updateMode();
    updateCount();
    checkLangNote();
    retranslateErrors();
    if (lastRequest) renderSuccess();
    if (openProfileId) renderProfile();
    fitStamp();
    updateJsonLd();
    syncTheme();
    markNav();
    root.classList.remove('i18n-pending');
  }

  function start(saved) {
    buildRosette();
    route(true);
    renderAll();

    var voucher = $('.voucher');
    if (voucher) {
      drawVoucher();
      var vo = redrawOnResize(drawVoucher);
      if (vo) vo.observe(voucher);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitStamp(); drawFacts(); });
    window.addEventListener('hashchange', function () { route(false); });

    // Back where the visitor was after the page is reloaded
    var y = savedScroll();
    if (y != null) jumpTo(y);

    // Restore an unfinished booking form after the page is refreshed in place
    if (saved && saved.form && form) {
      Object.keys(saved.form).forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        if (el.type === 'checkbox' || el.type === 'radio') el.checked = !!saved.form[id];
        else el.value = saved.form[id];
      });
      updateMode();
      updateCount();
      checkLangNote();
    }
  }

  var hot = window.claude && window.claude.hot;
  if (hot && typeof hot.snapshot === 'function' && form) {
    hot.snapshot(function () {
      var state = {};
      ['mode-phone', 'mode-video', 'mode-office', 'f-area', 'f-lawyer', 'f-lang', 'f-date', 'f-time', 'f-name', 'f-phone', 'f-email', 'f-msg', 'f-consent'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) state[id] = (el.type === 'checkbox' || el.type === 'radio') ? el.checked : el.value;
      });
      return { form: state };
    });
  }
  if (hot && typeof hot.ready === 'function') hot.ready(start);
  else start((hot && hot.data) || {});
})();
