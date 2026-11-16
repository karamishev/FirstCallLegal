/* =============================================================================
   Lex Serdica · site behaviour
   Reads js/config.js, js/i18n.js and js/content.js. No libraries, no tracking.
   Icons: Lucide (ISC licence, see README).
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
  // Keeps numbers with their words and time ranges on one line
  function glue(s) {
    return String(s)
      .replace(/(\d)–(\d)/g, '$1\u2060–\u2060$2')
      .replace(/(\d) (?=[\p{L}])/gu, '$1\u00a0')
      .replace(/ (ч\.|Uhr)(?=[\s.,;:)]|$)/g, '\u00a0$1');
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
  function leadFor(areaId) { return CONTENT.lawyers.filter(function (l) { return l.area === areaId; })[0] || null; }
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
    document.title = t('meta.title');
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));
    var ogt = $('meta[property="og:title"]');
    if (ogt) ogt.setAttribute('content', t('meta.title'));
    var ogd = $('meta[property="og:description"]');
    if (ogd) ogd.setAttribute('content', t('meta.description'));
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
          '<span class="lm-code">' + (current ? '<svg class="i" aria-hidden="true"><use href="#i-check"/></svg>' : '') + c.toUpperCase() + '</span>' +
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
      if (url.searchParams.has('lang')) { url.searchParams.set('lang', next); history.replaceState(null, '', url); }
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

  /* ---------- Rosette for portrait placeholders ---------- */
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
    var defs = $('.sprite defs');
    if (defs) defs.insertAdjacentHTML('beforeend', '<symbol id="rosette" viewBox="-100 -100 200 200">' + paths + '</symbol>');
  }
  function portrait(l, index, extra) {
    var n = nameParts(l);
    if (l.photo) {
      return '<div class="portrait ' + (extra || '') + '"><img src="' + esc(l.photo) + '" alt="' + esc(t('team.photo', { name: n.full })) + '" loading="lazy" decoding="async"></div>';
    }
    return '<div class="portrait ' + (extra || '') + '" aria-hidden="true">' +
      '<svg class="rosette" viewBox="0 0 200 200" style="--rot:' + ((index * 17) % 45) + 'deg"><use href="#rosette"/></svg>' +
      '<span class="initials">' + esc(initials(l)) + '</span></div>';
  }

  /* ---------- Practice areas ---------- */
  function renderAreas() {
    var host = $('[data-render="areas"]');
    if (!host) return;
    host.innerHTML = CONTENT.areas.map(function (a) {
      var lead = leadFor(a.id);
      var title = pick(a.title);
      var leadHtml = '';
      if (lead) {
        var mini = lead.photo ? '<img src="' + esc(lead.photo) + '" alt="">' : esc(initials(lead));
        leadHtml = '<button class="area-lead" type="button" data-profile="' + lead.id + '">' +
          '<span class="mini" aria-hidden="true">' + mini + '</span>' +
          '<span><span class="lbl">' + esc(t('areas.leadLawyer')) + '</span><span class="nm">' + esc(nameParts(lead).full) + '</span></span></button>';
      }
      return '<article class="area" id="area-' + a.id + '">' +
        '<div class="area-top"><svg class="i" aria-hidden="true"><use href="#i-' + a.icon + '"/></svg><h3>' + esc(title) + '</h3></div>' +
        '<p class="area-sum">' + esc(txt(a.summary)) + '</p>' +
        '<ul class="area-list">' + txt(a.items).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<div class="area-foot">' + leadHtml +
        '<a class="link-btn" href="#book" data-book-area="' + a.id + '" aria-label="' + esc(t('areas.bookLabel', { area: title })) + '">' + esc(t('areas.book')) + '</a>' +
        '</div></article>';
    }).join('');
  }

  /* ---------- Lawyers ---------- */
  function expLine(l) {
    var y = years(l);
    return '<p class="lawyer-exp"><b>' + y + '</b><span>' + esc(plural('team.years', y)) + '<br>' + esc(t('team.since', { year: l.since })) + '</span></p>';
  }
  function renderTeam() {
    var host = $('[data-render="team"]');
    if (!host) return;
    host.innerHTML = CONTENT.lawyers.map(function (l, i) {
      var n = nameParts(l);
      var a = areaById(l.area) || { icon: 'scale', title: '' };
      return '<article class="lawyer" id="lawyer-' + l.id + '">' + portrait(l, i) +
        '<div class="lawyer-body">' +
        '<p class="lawyer-area"><svg class="i" aria-hidden="true"><use href="#i-' + a.icon + '"/></svg>' + esc(pick(a.title)) + '</p>' +
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
  function renderProfile() {
    var l = lawyerById(openProfileId);
    var body = $('[data-profile-body]');
    if (!l || !body) return;
    var n = nameParts(l);
    var a = areaById(l.area) || { icon: 'scale', title: '' };
    function list(items) { return '<ul>' + items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }
    var career = (l.career && l.career.length) ? '<section><h3>' + esc(t('team.career')) + '</h3>' + list(l.career.map(txt)) + '</section>' : '';
    body.innerHTML = portrait(l, CONTENT.lawyers.indexOf(l)) +
      '<div class="pf-main">' +
      '<p class="lawyer-area"><svg class="i" aria-hidden="true"><use href="#i-' + a.icon + '"/></svg>' + esc(pick(a.title)) + '</p>' +
      '<h2 class="pf-name" id="pf-name">' + esc(n.full) + '</h2>' +
      '<p class="lawyer-role">' + esc(pick(l.role)) + '</p>' +
      expLine(l) +
      '<p class="pf-bio">' + esc(txt(l.bio)) + '</p>' +
      '<div class="pf-facts">' +
      '<section><h3>' + esc(t('team.focus')) + '</h3>' + list(txt(l.focus)) + '</section>' +
      '<section><h3>' + esc(t('team.education')) + '</h3>' + list(l.education.map(txt)) + '</section>' + career +
      '<section><h3>' + esc(t('team.bar')) + '</h3><p>' + esc(t('team.barText', { year: l.barSince })) + '</p></section>' +
      '<section><h3>' + esc(t('team.languages')) + '</h3><p>' + esc(cap(langList(l.languages))) + '</p></section>' +
      '</div>' +
      '<div class="pf-actions">' +
      '<a class="btn btn-ink" href="#book" data-book-lawyer="' + l.id + '">' + esc(bookLabel(l)) + '</a>' +
      '<a class="btn btn-outline" href="tel:' + esc(C.contact.phoneLink) + '"><svg class="i" aria-hidden="true"><use href="#i-phone"/></svg>' + esc(t('team.callOffice')) + '</a>' +
      '</div></div>';
  }
  function openProfile(id, trigger) {
    openProfileId = id;
    renderProfile();
    openDialog($('#profile-dialog'), trigger);
  }

  /* ---------- FAQ, footer, legal texts ---------- */
  function renderFaq() {
    var host = $('[data-render="faq"]');
    if (!host) return;
    var open = $$('.qa', host).filter(function (d) { return d.open; }).map(function (d) { return d.getAttribute('data-i'); });
    var first = !host.querySelector('.qa');
    var v = baseVars();
    host.innerHTML = CONTENT.faq.map(function (f, i) {
      var isOpen = first ? i === 0 : open.indexOf(String(i)) > -1;
      return '<details class="qa" data-i="' + i + '"' + (isOpen ? ' open' : '') + '>' +
        '<summary><span>' + esc(glue(fillWith(pick(f.q), v))) + '</span><svg class="i" aria-hidden="true"><use href="#i-chevron-down"/></svg></summary>' +
        '<div class="qa-a"><p>' + esc(glue(fillWith(pick(f.a), v))) + '</p></div></details>';
    }).join('');
  }
  function renderFooterAreas() {
    var host = $('[data-render="footer-areas"]');
    if (!host) return;
    host.innerHTML = CONTENT.areas.map(function (a) {
      return '<li><a href="#area-' + a.id + '">' + esc(pick(a.title)) + '</a></li>';
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

  /* ---------- Voucher: guilloche border and stamp ---------- */
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
  function drawGuilloche() {
    var v = $('.voucher'), svg = $('.v-guilloche');
    if (!v || !svg) return;
    var W = v.offsetWidth, H = v.offsetHeight;
    if (!W || !H) return;
    var inset = W * 0.05, band = Math.max(6, W * 0.028), mid = inset + band / 2, r = band * 1.4;
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
  var lastRequest = null;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function isoDate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function addDays(d, n) { var x = startOfDay(d); x.setDate(x.getDate() + n); return x; }
  function parseISO(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }

  function slotLabel(slot, i) {
    var name = raw('slot.' + i);
    return (name ? name + ', ' : '') + slot[0] + '\u2060–\u2060' + slot[1];
  }
  function fillSelects() {
    if (!form) return;
    var area = $('#f-area'), lawyer = $('#f-lawyer'), lng = $('#f-lang'), time = $('#f-time');
    var keep = { area: area.value, lawyer: lawyer.value, lng: lng.value, time: time.value };
    area.innerHTML = '<option value="">' + esc(t('form.areaAny')) + '</option>' + CONTENT.areas.map(function (a) {
      return '<option value="' + a.id + '">' + esc(pick(a.title)) + '</option>';
    }).join('');
    lawyer.innerHTML = '<option value="">' + esc(t('form.lawyerAny')) + '</option>' + CONTENT.lawyers.map(function (l) {
      var a = areaById(l.area);
      return '<option value="' + l.id + '">' + esc(nameParts(l).full + (a ? ', ' + pick(a.title) : '')) + '</option>';
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
      page: location.href.split('#')[0],
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
        checkLangNote();
      }
      if (id === 'f-area') {
        var cur = lawyerById($('#f-lawyer').value);
        if (cur && cur.area !== e.target.value) $('#f-lawyer').value = '';
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
  function scrollToId(id) {
    var target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    var heading = $('h2, h3', target) || target;
    if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }

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
    if ((el = e.target.closest('[data-book], [data-book-lawyer], [data-book-area]'))) {
      e.preventDefault();
      var dlg = el.closest('dialog');
      if (dlg) { skipReturn = true; closeDialog(dlg); }
      if (form && form.hidden) resetForm();
      if (el.hasAttribute('data-book-lawyer')) setLawyer(el.getAttribute('data-book-lawyer'));
      else if (el.hasAttribute('data-book-area')) setArea(el.getAttribute('data-book-area'));
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
    if ((el = e.target.closest('#menu-dialog a[href^="#"]'))) {
      e.preventDefault();
      var id = el.getAttribute('href').slice(1);
      skipReturn = true;
      closeDialog($('#menu-dialog'));
      requestAnimationFrame(function () { scrollToId(id === 'top' ? 'main' : id); });
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
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['areas', 'lawyers', 'process', 'fees', 'faq', 'contact'].forEach(function (id) {
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

  /* ---------- Put it all together ---------- */
  function renderAll() {
    applyStatic();
    applyContact();
    updateMeta();
    renderLangUI();
    renderAreas();
    renderTeam();
    updateTeamHeading();
    renderFaq();
    renderFooterAreas();
    renderLegal();
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
    root.classList.remove('i18n-pending');
  }

  function start(saved) {
    buildRosette();
    renderAll();

    var voucher = $('.voucher');
    if (voucher) {
      drawGuilloche();
      if (window.ResizeObserver) {
        var pending = 0;
        new ResizeObserver(function () {
          cancelAnimationFrame(pending);
          pending = requestAnimationFrame(drawGuilloche);
        }).observe(voucher);
      }
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitStamp);

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
