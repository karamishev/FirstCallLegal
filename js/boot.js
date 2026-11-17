/* Lex Serdica · runs before the page is drawn.
   Applies the theme and language straight away, so visitors never see a flash
   of the wrong colours or the wrong language. Reads js/config.js. */
(function () {
  'use strict';
  var C = window.SITE_CONFIG || {};
  var root = document.documentElement;
  root.classList.add('js');

  function saved(key) {
    try { return localStorage.getItem('ls-' + key); } catch (e) { return null; }
  }

  // Theme: the visitor's own choice, then a theme set by the hosting page, then the site setting
  var theme = saved('theme');
  if (theme !== 'light' && theme !== 'dark') {
    theme = root.getAttribute('data-theme');
    if (theme !== 'light' && theme !== 'dark') {
      var pref = C.theme || 'light';
      if (pref === 'system') {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        theme = pref === 'dark' ? 'dark' : 'light';
      }
    }
  }
  root.setAttribute('data-theme', theme);

  // Language: ?lang=de in the address, then #de, then the visitor's earlier choice,
  // then the browser's languages, then the site default
  var langs = C.languages || ['en'];
  function offered(value) {
    var code = String(value || '').toLowerCase().split(/[-_]/)[0];
    return langs.indexOf(code) > -1 ? code : null;
  }
  var lang = null;
  try { lang = offered(new URLSearchParams(location.search).get('lang')); } catch (e) {}
  if (!lang && /^#[a-z]{2}$/i.test(location.hash)) lang = offered(location.hash.slice(1));
  if (!lang) lang = offered(saved('lang'));
  if (!lang) {
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (var i = 0; i < list.length && !lang; i++) lang = offered(list[i]);
  }
  if (!lang) lang = offered(C.defaultLanguage) || langs[0];

  root.lang = lang;
  // The page is written in English; hide it for a moment while another language is applied.
  // Do the same when the address points to a practice area page (#criminal-defence and so on),
  // so the home page does not flash up before the area page is drawn.
  var hash = location.hash.slice(1);
  var homeIds = /^(top|main|areas|lawyers|process|fees|faq|contact|book|[a-z]{2})?$/i;
  if (lang !== 'en' || !homeIds.test(hash)) root.classList.add('i18n-pending');
  window.__LS_LANG = lang;
})();
