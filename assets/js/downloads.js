/* Renders the Downloads page from window.ZARO_DOWNLOADS (downloads-data.js). */
(function () {
  "use strict";

  var root = document.getElementById("download-sections");
  var products = window.ZARO_DOWNLOADS || [];
  if (!root || !products.length) return;

  var OS = {
    windows: {
      name: "Windows",
      icon: '<svg class="os-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.1 10.4 4v7.2H3zm8.4-1.2L21 2.5v8.7h-9.6zM3 12.6h7.4v7.3L3 18.8zm8.4 0H21v8.9l-9.6-1.4z"/></svg>'
    },
    macos: {
      name: "macOS",
      icon: '<svg class="os-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.8zM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4z"/></svg>'
    },
    linux: {
      name: "Linux",
      icon: '<svg class="os-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 2.5c-2.2 0-3.5 1.8-3.5 4.3 0 1.4.3 2.3-.6 3.9-1 1.8-2.6 3.8-2.6 6.4 0 .9.2 1.6.5 2.2"/><path d="M12 2.5c2.2 0 3.5 1.8 3.5 4.3 0 1.4-.3 2.3.6 3.9 1 1.8 2.6 3.8 2.6 6.4 0 .9-.2 1.6-.5 2.2"/><circle cx="10.4" cy="6.6" r=".6" fill="currentColor"/><circle cx="13.6" cy="6.6" r=".6" fill="currentColor"/><path d="M10.7 8.6h2.6L12 9.8z" fill="currentColor"/><path d="M4.5 19.3c1.2-.4 2.6.2 3.4 1.7-1.6.9-3 .9-3.9.2-.4-.3-.1-1.7.5-1.9zM19.5 19.3c-1.2-.4-2.6.2-3.4 1.7 1.6.9 3 .9 3.9.2.4-.3.1-1.7-.5-1.9zM8.4 20.6c1.2.6 5.9.6 7.2 0"/></svg>'
    }
  };

  var detectOS = function () {
    var p = ((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent || "").toLowerCase();
    if (/android|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) return null;
    if (p.indexOf("win") !== -1) return "windows";
    if (p.indexOf("mac") !== -1) return "macos";
    if (p.indexOf("linux") !== -1 || p.indexOf("x11") !== -1) return "linux";
    return null;
  };
  var yours = detectOS();

  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var arrow = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

  var osCard = function (product, key) {
    var os = OS[key];
    var entry = product.platforms[key];
    if (!entry) return "";
    var isYours = key === yours;
    var cta;
    if (!entry.url) {
      cta = '<span class="btn btn--soon btn--sm" aria-disabled="true">Coming soon</span>';
    } else if (isYours) {
      cta = '<a class="btn btn--primary" href="' + esc(entry.url) + '">Download for ' + os.name + "</a>";
    } else {
      cta = '<a class="text-link" href="' + esc(entry.url) + '">Download ' + arrow + '<span class="visually-hidden"> ' + esc(product.name) + " for " + os.name + "</span></a>";
    }
    return (
      '<div class="card os-card' + (isYours ? " is-yours" : "") + '">' +
      (isYours ? '<span class="yours-badge">Your system</span>' : "") +
      os.icon +
      "<h3>" + os.name + "</h3>" +
      "<p>" + esc(entry.detail) + "</p>" +
      '<div class="os-cta">' + cta + "</div>" +
      "</div>"
    );
  };

  var html = products.map(function (p) {
    // Put the visitor's OS first so its card leads the row.
    var order = ["windows", "macos", "linux"];
    if (yours) order.sort(function (a, b) { return (b === yours) - (a === yours); });

    var resources = (p.resources || []).map(function (r) {
      return (
        '<a class="card res-card" href="' + esc(r.url) + '">' +
        "<h4>" + esc(r.title) + "</h4>" +
        "<p>" + esc(r.detail) + "</p>" +
        '<span class="res-go">' + esc(r.action) + " " + arrow + "</span>" +
        "</a>"
      );
    }).join("");

    return (
      '<section class="dl-product" id="' + esc(p.id) + '" style="--p-accent:' + esc(p.accent) + '" aria-labelledby="' + esc(p.id) + '-title">' +
        '<div class="dl-head">' +
          '<img src="' + esc(p.icon) + '" alt="" width="56" height="56">' +
          "<div>" +
            '<p class="dl-label" style="margin:0 0 4px">' + esc(p.kind) + "</p>" +
            '<h2 id="' + esc(p.id) + '-title">' + esc(p.name) + "</h2>" +
          "</div>" +
          '<span class="tag">Free &amp; open source</span>' +
        "</div>" +
        '<p class="dl-meta">Current version: <strong>' + esc(p.version) + "</strong> &nbsp;|&nbsp; " +
          '<a href="' + esc(p.changelog) + '">View changelog</a> &nbsp;|&nbsp; ' +
          '<a href="' + esc(p.page) + '">About ' + esc(p.name) + "</a></p>" +
        '<p class="dl-label">Download for</p>' +
        '<div class="os-grid">' + order.map(function (k) { return osCard(p, k); }).join("") + "</div>" +
        '<p class="dl-label">Additional resources</p>' +
        '<div class="res-grid">' + resources + "</div>" +
        (p.note ? '<p class="dl-note">' + esc(p.note) + "</p>" : "") +
      "</section>"
    );
  }).join("");

  root.innerHTML = html;

  // The sections didn't exist when the browser tried to honour #cutreel / #soundsplice.
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
})();
