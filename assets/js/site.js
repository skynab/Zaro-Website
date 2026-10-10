/* Zaro: shared page behaviour. No dependencies. */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); revealObs.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Hero screenshot: tilted, flattens as you scroll ---------- */
  var heroShot = document.querySelector(".hero-shot");
  if (heroShot && !reduceMotion) {
    var ticking = false;
    var updateTilt = function () {
      var rect = heroShot.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 when the shot's top sits at the bottom of the viewport, 1 once it reaches ~25% from the top.
      var p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.75)));
      heroShot.style.setProperty("--tilt", (22 * (1 - p)).toFixed(2) + "deg");
      heroShot.style.setProperty("--shrink", (0.94 + 0.06 * p).toFixed(3));
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateTilt); }
    }, { passive: true });
    updateTilt();
  }

  /* ---------- Tabs (workspace gallery etc.) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var buttons = root.querySelectorAll('[role="tab"]');
    var select = function (btn) {
      buttons.forEach(function (b) {
        var on = b === btn;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(b.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
    };
    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () { select(btn); });
      btn.addEventListener("keydown", function (e) {
        var dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!dir) return;
        var next = buttons[(i + dir + buttons.length) % buttons.length];
        next.focus();
        select(next);
      });
    });
  });

  /* ---------- Sticky story: highlight the step in view, swap the pinned visual ---------- */
  document.querySelectorAll("[data-story]").forEach(function (story) {
    var steps = story.querySelectorAll(".story-step");
    var figures = story.querySelectorAll(".story-visual figure");
    if (!("IntersectionObserver" in window)) return;
    var activate = function (idx) {
      steps.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
      figures.forEach(function (f, i) { f.classList.toggle("is-active", i === idx); });
    };
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) activate(Array.prototype.indexOf.call(steps, e.target));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach(function (s) { obs.observe(s); });
    activate(0);
  });

  /* ---------- Floating download pill: shows once the hero is past ---------- */
  var pill = document.querySelector(".float-pill");
  var pillAnchor = document.querySelector("[data-pill-after]");
  var pillStop = document.querySelector("[data-pill-stop]");
  if (pill && pillAnchor && "IntersectionObserver" in window) {
    var pastHero = false, atStop = false;
    var sync = function () { pill.classList.toggle("is-visible", pastHero && !atStop); };
    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      sync();
    }).observe(pillAnchor);
    if (pillStop) {
      new IntersectionObserver(function (entries) { atStop = entries[0].isIntersecting; sync(); }).observe(pillStop);
    }
  }

  /* ---------- Lightbox for screenshots ---------- */
  var zoomables = document.querySelectorAll("img.zoomable");
  if (zoomables.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Screenshot");
    box.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(box);
    var boxImg = box.querySelector("img");
    var lastFocus = null;
    var close = function () { box.classList.remove("is-open"); document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); };
    var open = function (img) {
      lastFocus = img;
      boxImg.src = img.currentSrc || img.src;
      boxImg.alt = img.alt;
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
      box.querySelector("button").focus();
    };
    zoomables.forEach(function (img) {
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.addEventListener("click", function () { open(img); });
      img.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(img); } });
    });
    box.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("is-open")) close(); });
  }

  /* ---------- Placeholder waveforms (SoundSplice mock UI) ---------- */
  // Seeded so the art is the same on every load.
  var rng = function (seed) {
    return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  };
  var wavePath = function (seed, bars) {
    var r = rng(seed), d = "", env = 0.5;
    for (var i = 0; i < bars; i++) {
      env += (r() - 0.5) * 0.25;
      env = Math.min(0.95, Math.max(0.15, env));
      var h = env * (0.45 + r() * 0.55) * 50;
      d += "M" + (i * 2 + 1) + " " + (50 - h).toFixed(1) + "V" + (50 + h).toFixed(1);
    }
    return d;
  };
  document.querySelectorAll("[data-wave]").forEach(function (el, i) {
    var seed = parseInt(el.getAttribute("data-wave"), 10) || i + 7;
    var bars = parseInt(el.getAttribute("data-bars"), 10) || 140;
    var color = el.getAttribute("data-color") || "currentColor";
    el.innerHTML =
      '<svg viewBox="0 0 ' + bars * 2 + ' 100" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="' + wavePath(seed, bars) + '" stroke="' + color + '" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg>';
  });
})();
