/*
  Zaro: shared header and footer.

  Every page has two empty placeholders:
    <header class="site-header" data-layout="header"></header>
    <footer class="site-footer" data-layout="footer"></footer>
  and loads this script before site.js. Edit SITE below to change the links on
  every page at once.

  The markup is built in JavaScript (not fetched from a partial .html file) so
  the site still works when a page is opened straight from disk.
*/
(function () {
  "use strict";

  var SITE = {
    // Main navigation. `dot` adds a coloured product dot (cutreel | soundsplice).
    nav: [
      { label: "CutReel", href: "cutreel.html", dot: "cutreel" },
      { label: "SoundSplice", href: "soundsplice.html", dot: "soundsplice" },
      { label: "Downloads", href: "downloads.html" },
      { label: "Info", href: "info.html" }
    ],

    // PLACEHOLDER: point this at the real donation page.
    donate: { label: "Donate", href: "#" },

    // Footer social icons. `icon` must be a key of ICONS below; set href to "#" until the account exists.
    social: [
      { label: "GitHub", href: "https://github.com/skynab", icon: "github" },
      { label: "YouTube", href: "#", icon: "youtube" },
      { label: "X", href: "#", icon: "x" },
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "LinkedIn", href: "#", icon: "linkedin" }
    ],

    legal: [
      { label: "Privacy", href: "legal.html#privacy" },
      { label: "Terms of use", href: "legal.html#terms" },
      { label: "Licenses", href: "legal.html#licenses" },
      { label: "Trademarks", href: "legal.html#trademarks" }
    ],

    company: "Zaro Software LLC",
    logo: { src: "assets/img/brand/zaro-logo.svg", alt: "Zaro", home: "index.html" }
  };

  var ICONS = {
    github: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.3l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.4C.9 8.1 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.2 1.8-2 3.3-3.2 5.4-3.2 3.6 0 5.7 3.6 4.2 7.1C19.5 16.4 12 21 12 21z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };

  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  // "cutreel.html" for /cutreel.html, "index.html" for / or /index.html.
  var current = location.pathname.split("/").pop() || "index.html";

  var logo =
    '<img src="' + esc(SITE.logo.src) + '" alt="' + esc(SITE.logo.alt) + '" width="132" height="32">';

  var header = document.querySelector('[data-layout="header"]');
  if (header) {
    var links = SITE.nav.map(function (item) {
      var here = item.href === current ? ' aria-current="page"' : "";
      var dot = item.dot ? '<span class="dot dot--' + esc(item.dot) + '"></span>' : "";
      return '<a href="' + esc(item.href) + '"' + here + ">" + dot + esc(item.label) + "</a>";
    }).join("");

    header.innerHTML =
      '<div class="wrap">' +
        '<a class="brand" href="' + esc(SITE.logo.home) + '" aria-label="' + esc(SITE.logo.alt) + ' home">' + logo + "</a>" +
        '<nav class="nav" id="site-nav" aria-label="Main">' + links + "</nav>" +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">' + ICONS.menu + "</button>" +
        '<a class="btn-donate" href="' + esc(SITE.donate.href) + '">' + ICONS.heart + "<span>" + esc(SITE.donate.label) + "</span></a>" +
      "</div>";
  }

  var footer = document.querySelector('[data-layout="footer"]');
  if (footer) {
    var social = SITE.social.map(function (s) {
      return '<li><a href="' + esc(s.href) + '" aria-label="' + esc(s.label) + '">' + (ICONS[s.icon] || "") + "</a></li>";
    }).join("");
    var legal = SITE.legal.map(function (l) {
      return '<li><a href="' + esc(l.href) + '">' + esc(l.label) + "</a></li>";
    }).join("");

    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-top">' +
          '<a class="footer-logo" href="' + esc(SITE.logo.home) + '" aria-label="' + esc(SITE.logo.alt) + ' home">' + logo + "</a>" +
          '<ul class="social" aria-label="Zaro on social media">' + social + "</ul>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>&copy; " + new Date().getFullYear() + " " + esc(SITE.company) + "</span>" +
          '<ul class="legal-links">' + legal + "</ul>" +
        "</div>" +
      "</div>";
  }
})();
