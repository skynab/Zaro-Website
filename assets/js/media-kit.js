/* Media kit: copy colour values and descriptions to the clipboard. */
(function () {
  "use strict";

  // Fallback for pages opened from disk, plain http, or when the Clipboard API refuses.
  var legacyCopy = function (text) {
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  };

  var copyText = function (text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  };

  document.querySelectorAll("button.copy").forEach(function (btn) {
    var label = btn.textContent;
    btn.addEventListener("click", function () {
      var from = btn.getAttribute("data-copy-from");
      var text = from ? document.getElementById(from).textContent.trim() : btn.getAttribute("data-copy");
      copyText(text).then(function () {
        btn.textContent = "Copied";
        btn.classList.add("is-copied");
      }, function () {
        btn.textContent = "Copy failed";
      });
      clearTimeout(btn._t);
      btn._t = setTimeout(function () { btn.textContent = label; btn.classList.remove("is-copied"); }, 1600);
    });
  });
})();
