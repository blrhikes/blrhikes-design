/* ------------------------------------------------------------------------
   DEBUG PANEL — a browser-side inspector for layout bugs that only appear on
   a real device, horizontal overflow first among them.

   Not part of the design system: it builds its own DOM and injects its own
   styles from here rather than living in base.css, so nothing about it can
   leak into a theme or a component. It is inert until switched on.

   Open it with `?debug` in the URL, or Shift+D anywhere on the page (the
   theme shortcuts are unshifted single keys, so the two cannot collide). The
   state is remembered per tab in sessionStorage, so it survives navigation
   between the pages while you are hunting.

   What it reports:
     · the viewport width, the document's scrollWidth, and the difference —
       the difference is the overflow, in CSS pixels
     · every element sticking out past the document's right edge (or before
       its left one), widest offender first, each with the amount
     · which of those have an ancestor that also sticks out — a child of an
       overflowing parent is usually a symptom, and the ones with NO
       overflowing ancestor are usually the cause
     · every element whose own scrollWidth exceeds its clientWidth, which
       catches the containers that are silently scrolling instead

   Tap a row to outline that element and scroll it into view. "Copy report"
   puts the whole thing on the clipboard as text — paste it back into the
   conversation and it is everything needed to fix the bug from here.
   ------------------------------------------------------------------------ */
(function () {
  var KEY = "blrhikes-debug";
  var MAX_ROWS = 40;

  var on = false;
  try {
    on =
      /(^|[?&])debug(=|&|$)/.test(location.search) ||
      sessionStorage.getItem(KEY) === "1";
  } catch (e) {}

  var panel = null;
  var body = null;
  var marked = [];

  /* ---- describing an element ------------------------------------------ */

  /* A short, human-readable identity: `section.hero > div.container`-ish, but
     one line and cheap. Enough to find the node in the source by eye. */
  function label(el) {
    var s = el.tagName.toLowerCase();
    if (el.id) return s + "#" + el.id;
    var cls = (el.getAttribute("class") || "").trim().split(/\s+/).slice(0, 3);
    if (cls[0]) s += "." + cls.join(".");
    return s;
  }

  function path(el) {
    var parts = [];
    var node = el;
    for (var i = 0; i < 3 && node && node.tagName; i++) {
      parts.unshift(label(node));
      node = node.parentElement;
      if (!node || node === document.documentElement) break;
    }
    return parts.join(" > ");
  }

  /* Something wider than the viewport inside a container that scrolls or clips
     it — the registrations table, an event rail — is doing what it was built
     to do and cannot move the document. Only the ones with a clear path to the
     root are the page's problem. */
  function clipped(el) {
    var p = el.parentElement;
    while (p && p !== document.documentElement) {
      var ox = getComputedStyle(p).overflowX;
      if (ox !== "visible") return true;
      p = p.parentElement;
    }
    return false;
  }

  /* ---- the scan -------------------------------------------------------- */

  function scan() {
    var doc = document.documentElement;
    var vw = doc.clientWidth;
    var over = [];
    var scrollers = [];

    var all = document.body.querySelectorAll("*");
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      /* The panel measures the page, not itself. */
      if (panel && panel.contains(el)) continue;
      /* An element in the top layer (the open nav drawer) is positioned
         against the viewport and legitimately covers it. */
      if (el.closest("dialog[open]")) continue;

      var st = getComputedStyle(el);
      if (st.display === "none" || st.visibility === "hidden") continue;
      /* Fixed elements are laid out against the viewport, and a decorative one
         bleeding past the edge does not make the DOCUMENT scroll. */
      if (st.position === "fixed") continue;

      var r = el.getBoundingClientRect();
      if (!r.width && !r.height) continue;

      var right = r.right - vw;
      var left = -r.left;
      var amount = Math.max(right, left);
      if (amount > 1 && !clipped(el)) {
        over.push({ el: el, amount: Math.round(amount), rect: r, side: right >= left ? "right" : "left" });
      }

      /* A container scrolling its own content sideways is either the bug or
         the thing hiding it, and either way it is worth seeing. Ones that opt
         in (overflow-x: auto/scroll) are the page's own rails — skip those. */
      if (
        el.scrollWidth - el.clientWidth > 1 &&
        st.overflowX !== "auto" &&
        st.overflowX !== "scroll" &&
        /* The visually-hidden idiom is a 1px box with its content clipped
           away — every instance of it would otherwise be reported here. */
        el.clientWidth > 2
      ) {
        scrollers.push({
          el: el,
          amount: Math.round(el.scrollWidth - el.clientWidth),
        });
      }
    }

    over.sort(function (a, b) {
      return b.amount - a.amount;
    });
    scrollers.sort(function (a, b) {
      return b.amount - a.amount;
    });

    /* An offender whose ancestor also offends is usually downstream of it. */
    var set = new Set(
      over.map(function (o) {
        return o.el;
      })
    );
    over.forEach(function (o) {
      var p = o.el.parentElement;
      o.root = true;
      while (p && p !== document.body) {
        if (set.has(p)) {
          o.root = false;
          break;
        }
        p = p.parentElement;
      }
    });

    return {
      vw: vw,
      scrollW: Math.max(doc.scrollWidth, document.body.scrollWidth),
      dpr: window.devicePixelRatio,
      theme: document.documentElement.dataset.theme,
      over: over,
      scrollers: scrollers,
    };
  }

  /* ---- report + render -------------------------------------------------- */

  function report(data) {
    var lines = [];
    lines.push("PAGE      " + location.pathname + location.search);
    lines.push("THEME     " + data.theme);
    lines.push(
      "VIEWPORT  " + data.vw + "px · document " + data.scrollW + "px · overflow " +
        Math.max(0, data.scrollW - data.vw) + "px · dpr " + data.dpr
    );
    lines.push("UA        " + navigator.userAgent);
    lines.push("");
    lines.push("PAST THE EDGE (" + data.over.length + ")");
    if (!data.over.length) lines.push("  none");
    data.over.slice(0, MAX_ROWS).forEach(function (o) {
      lines.push(
        "  " + (o.root ? "*" : " ") + " +" + o.amount + "px " + o.side +
          "  w=" + Math.round(o.rect.width) + "  " + path(o.el)
      );
    });
    if (data.over.length > MAX_ROWS) {
      lines.push("  … " + (data.over.length - MAX_ROWS) + " more");
    }
    lines.push("  (* = no overflowing ancestor — start here)");
    lines.push("");
    lines.push("SCROLLING SIDEWAYS (" + data.scrollers.length + ")");
    if (!data.scrollers.length) lines.push("  none");
    data.scrollers.slice(0, MAX_ROWS).forEach(function (s) {
      lines.push("  +" + s.amount + "px  " + path(s.el));
    });
    return lines.join("\n");
  }

  function unmark() {
    marked.forEach(function (el) {
      el.style.outline = "";
      el.style.outlineOffset = "";
    });
    marked = [];
  }

  function mark(el) {
    unmark();
    el.style.outline = "2px solid #ff2d55";
    el.style.outlineOffset = "-2px";
    marked.push(el);
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function row(item, kind) {
    var b = document.createElement("button");
    b.className = "dbg-row" + (kind === "over" && item.root ? " dbg-root" : "");
    b.innerHTML =
      '<span class="dbg-amt">+' + item.amount + "px</span> " +
      '<span class="dbg-path"></span>';
    b.querySelector(".dbg-path").textContent = path(item.el);
    b.addEventListener("click", function () {
      mark(item.el);
    });
    return b;
  }

  function render() {
    var data = scan();
    body.textContent = "";

    var head = document.createElement("div");
    head.className = "dbg-stat";
    var spill = Math.max(0, data.scrollW - data.vw);
    head.innerHTML =
      "<b>" + data.vw + "px</b> viewport · <b>" + data.scrollW +
      "px</b> document · <b class=" + (spill ? '"dbg-bad"' : '"dbg-ok"') + ">" +
      spill + "px</b> overflow";
    body.appendChild(head);

    var h1 = document.createElement("div");
    h1.className = "dbg-head";
    h1.textContent = "Past the edge (" + data.over.length + ")";
    body.appendChild(h1);
    if (!data.over.length) {
      var none = document.createElement("div");
      none.className = "dbg-none";
      none.textContent = "nothing";
      body.appendChild(none);
    }
    data.over.slice(0, MAX_ROWS).forEach(function (o) {
      body.appendChild(row(o, "over"));
    });

    var h2 = document.createElement("div");
    h2.className = "dbg-head";
    h2.textContent = "Scrolling sideways (" + data.scrollers.length + ")";
    body.appendChild(h2);
    data.scrollers.slice(0, MAX_ROWS).forEach(function (s) {
      body.appendChild(row(s, "scroll"));
    });

    panel.dataset.report = report(data);
  }

  /* ---- chrome ----------------------------------------------------------- */

  function styles() {
    var css = document.createElement("style");
    css.textContent = [
      ".dbg{position:fixed;z-index:9999;right:.5rem;bottom:.5rem;width:min(24rem,calc(100vw - 1rem));",
      "max-height:min(60vh,32rem);display:flex;flex-direction:column;background:#111;color:#eee;",
      "border:1px solid #444;border-radius:.5rem;font:12px/1.4 ui-monospace,monospace;",
      "box-shadow:0 10px 40px -10px rgb(0 0 0/.6);overscroll-behavior:contain}",
      ".dbg[data-min] .dbg-body,.dbg[data-min] .dbg-acts{display:none}",
      ".dbg-bar{display:flex;align-items:center;gap:.4rem;padding:.4rem .5rem;border-bottom:1px solid #333}",
      ".dbg-bar b{flex:1;font-weight:600;letter-spacing:.06em;text-transform:uppercase;font-size:11px}",
      ".dbg-acts{display:flex;gap:.35rem;padding:.4rem .5rem;border-bottom:1px solid #333;flex-wrap:wrap}",
      ".dbg button{background:#222;color:#eee;border:1px solid #444;border-radius:.3rem;padding:.25rem .5rem;",
      "font:inherit;cursor:pointer}",
      ".dbg button:hover{background:#333}",
      ".dbg-body{overflow:auto;padding:.35rem .25rem .5rem;-webkit-overflow-scrolling:touch}",
      ".dbg-stat{padding:.35rem .5rem;color:#bbb}",
      ".dbg-stat b{color:#fff}",
      ".dbg-ok{color:#6ee7a8}.dbg-bad{color:#ff6b81}",
      ".dbg-head{padding:.5rem .5rem .25rem;color:#8ab4ff;text-transform:uppercase;letter-spacing:.06em;font-size:11px}",
      ".dbg-none{padding:.1rem .5rem;color:#666}",
      ".dbg-row{display:flex;gap:.4rem;width:100%;text-align:left;background:none;border:0;border-radius:0;",
      "padding:.25rem .5rem;color:#ccc;word-break:break-all}",
      ".dbg-row:hover{background:#222}",
      ".dbg-root{color:#fff}",
      ".dbg-root .dbg-amt{color:#ff6b81;font-weight:700}",
      ".dbg-amt{flex:0 0 auto;color:#888}",
    ].join("");
    document.head.appendChild(css);
  }

  function build() {
    styles();

    panel = document.createElement("div");
    panel.className = "dbg";
    panel.innerHTML =
      '<div class="dbg-bar"><b>debug</b>' +
      '<button data-min title="Collapse">–</button>' +
      '<button data-off title="Close (Shift+D)">×</button></div>' +
      '<div class="dbg-acts">' +
      '<button data-scan>Rescan</button>' +
      '<button data-copy>Copy report</button>' +
      '<button data-clear>Clear marks</button>' +
      "</div>" +
      '<div class="dbg-body"></div>';
    document.body.appendChild(panel);
    body = panel.querySelector(".dbg-body");

    panel.querySelector("[data-min]").addEventListener("click", function () {
      if (panel.hasAttribute("data-min")) panel.removeAttribute("data-min");
      else panel.setAttribute("data-min", "");
    });
    panel.querySelector("[data-off]").addEventListener("click", function () {
      toggle(false);
    });
    panel.querySelector("[data-scan]").addEventListener("click", render);
    panel.querySelector("[data-clear]").addEventListener("click", unmark);
    panel.querySelector("[data-copy]").addEventListener("click", function (e) {
      var text = panel.dataset.report || "";
      var done = function () {
        e.target.textContent = "Copied";
        setTimeout(function () {
          e.target.textContent = "Copy report";
        }, 1200);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done, function () {
          fallbackCopy(text, done);
        });
      } else {
        fallbackCopy(text, done);
      }
    });

    /* A rescan on resize is the whole point on a phone: rotate, and the
       offenders change. Debounced so dragging a desktop window is not a
       full-tree walk per frame. */
    var t;
    addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(render, 200);
    });

    render();
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      done();
    } catch (e) {}
    ta.remove();
  }

  function toggle(next) {
    on = next;
    try {
      sessionStorage.setItem(KEY, on ? "1" : "0");
    } catch (e) {}
    if (on) {
      if (!panel) build();
      else {
        panel.hidden = false;
        render();
      }
    } else if (panel) {
      panel.hidden = true;
      unmark();
    }
  }

  addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "select" || tag === "textarea") return;
    if (e.key === "D") toggle(!on);
  });

  if (on) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", build);
    } else {
      build();
    }
  }
})();
