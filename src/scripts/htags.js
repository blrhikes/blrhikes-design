/* HighlightTag overflow — keep every .htags row one line deep.
   Tags that would wrap are hidden and counted into a trailing "+N" chip.
   Measured, not estimated: theme swaps change the font, so the row is
   re-measured on resize, on font load and whenever data-theme changes. */
(function () {
  var rows = [].slice.call(document.querySelectorAll(".htags"));
  if (!rows.length) return;

  function fit(row) {
    var chip = row.querySelector(".htag-more");
    if (chip) chip.remove();

    var tags = [].slice.call(row.querySelectorAll(".htag"));
    if (!tags.length) return;
    tags.forEach(function (t) {
      t.hidden = false;
    });

    var top = tags[0].offsetTop;
    var firstWrapped = tags.findIndex(function (t) {
      return t.offsetTop > top;
    });
    if (firstWrapped === -1) return;

    chip = document.createElement("span");
    chip.className = "htag htag-more";
    row.appendChild(chip);

    /* Hide from the first wrapping tag on, then keep giving ground until the
       chip itself fits on the line it is counting for. */
    var cut = firstWrapped;
    for (;;) {
      tags.forEach(function (t, i) {
        t.hidden = i >= cut;
      });
      chip.textContent = "+" + (tags.length - cut);
      if (chip.offsetTop <= top || cut === 0) break;
      cut--;
    }
  }

  function fitAll() {
    rows.forEach(fit);
  }

  fitAll();

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);

  var pending = false;
  addEventListener(
    "resize",
    function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        fitAll();
        pending = false;
      });
    },
    { passive: true }
  );

  new MutationObserver(fitAll).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
})();
