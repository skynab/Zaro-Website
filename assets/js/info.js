/* Info page: filter guides/FAQ by app, and search them as you type. */
(function () {
  "use strict";

  var input = document.getElementById("info-search");
  var buttons = document.querySelectorAll("[data-filter]");
  var items = document.querySelectorAll("[data-searchable] > [data-app]");
  var empty = document.querySelector("[data-empty]");
  var app = "all";

  var apply = function () {
    var q = (input.value || "").trim().toLowerCase();
    var guidesShown = 0;
    items.forEach(function (el) {
      var appOk = app === "all" || el.getAttribute("data-app") === app;
      var textOk = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
      var show = appOk && textOk;
      el.hidden = !show;
      if (show && el.classList.contains("guide")) guidesShown++;
      // Open matching FAQ answers so the hit is visible.
      if (el.tagName === "DETAILS") el.open = Boolean(q) && show;
    });
    if (empty) empty.classList.toggle("is-visible", guidesShown === 0);
  };

  var setApp = function (next) {
    app = next;
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === app)); });
    apply();
  };

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { setApp(b.getAttribute("data-filter")); });
  });
  if (input) input.addEventListener("input", apply);

  // info.html#cutreel or #soundsplice opens with that app selected.
  var hash = location.hash.slice(1);
  if (hash === "cutreel" || hash === "soundsplice") {
    setApp(hash);
    var list = document.querySelector("[data-searchable]");
    if (list) list.scrollIntoView();
  }
})();
