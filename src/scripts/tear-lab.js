(function () {
  "use strict";

  // ---- control definitions -------------------------------------------------
  // kind: range | select | check.  el/attr: which SVG element+attribute.
  var DEFS = [
    // card pass 1
    { g: "grp-c1", id: "c1type", kind: "select", label: "noise type", opts: ["turbulence", "fractalNoise"], v: "turbulence" },
    { g: "grp-c1", id: "c1freq", kind: "range", label: "frequency", min: 0.005, max: 0.12, step: 0.001, v: 0.04 },
    { g: "grp-c1", id: "c1oct",  kind: "range", label: "octaves", min: 1, max: 6, step: 1, v: 4 },
    { g: "grp-c1", id: "c1seed", kind: "range", label: "seed", min: 0, max: 99, step: 1, v: 0 },
    { g: "grp-c1", id: "c1scale", kind: "range", label: "amplitude (px ±half)", min: 0, max: 15, step: 0.5, v: 3 },
    // card pass 2
    { g: "grp-c2", id: "c2type", kind: "select", label: "noise type", opts: ["fractalNoise", "turbulence"], v: "fractalNoise" },
    { g: "grp-c2", id: "c2fx", kind: "range", label: "frequency along x (tear wavelength)", min: 0.002, max: 0.08, step: 0.001, v: 0.015 },
    { g: "grp-c2", id: "c2fy", kind: "range", label: "frequency along y (edge-to-edge variation)", min: 0, max: 0.02, step: 0.001, v: 0.002 },
    { g: "grp-c2", id: "c2oct", kind: "range", label: "octaves (teeth on the tear)", min: 1, max: 5, step: 1, v: 3 },
    { g: "grp-c2", id: "c2seed", kind: "range", label: "seed", min: 0, max: 99, step: 1, v: 9 },
    { g: "grp-c2", id: "c2scale", kind: "range", label: "amplitude (px ±half)", min: 0, max: 90, step: 1, v: 38 },
    { g: "grp-c2", id: "c2straight", kind: "check", label: "straight sides (neutralise horizontal displacement)", v: true },
    // photo pass 1
    { g: "grp-p1", id: "p1type", kind: "select", label: "noise type", opts: ["turbulence", "fractalNoise"], v: "turbulence" },
    { g: "grp-p1", id: "p1freq", kind: "range", label: "frequency", min: 0.005, max: 0.12, step: 0.001, v: 0.04 },
    { g: "grp-p1", id: "p1oct", kind: "range", label: "octaves", min: 1, max: 6, step: 1, v: 4 },
    { g: "grp-p1", id: "p1seed", kind: "range", label: "seed", min: 0, max: 99, step: 1, v: 11 },
    { g: "grp-p1", id: "p1scale", kind: "range", label: "amplitude (px ±half)", min: 0, max: 15, step: 0.5, v: 2 },
    // photo pass 2
    { g: "grp-p2", id: "p2type", kind: "select", label: "noise type", opts: ["fractalNoise", "turbulence"], v: "fractalNoise" },
    { g: "grp-p2", id: "p2fx", kind: "range", label: "frequency along x", min: 0.002, max: 0.08, step: 0.001, v: 0.03 },
    { g: "grp-p2", id: "p2fy", kind: "range", label: "frequency along y", min: 0, max: 0.02, step: 0.001, v: 0.002 },
    { g: "grp-p2", id: "p2oct", kind: "range", label: "octaves", min: 1, max: 5, step: 1, v: 3 },
    { g: "grp-p2", id: "p2seed", kind: "range", label: "seed", min: 0, max: 99, step: 1, v: 47 },
    { g: "grp-p2", id: "p2scale", kind: "range", label: "amplitude (px ±half)", min: 0, max: 40, step: 1, v: 10 },
    { g: "grp-p2", id: "p2straight", kind: "check", label: "straight sides (neutralise horizontal displacement)", v: true },
    // geometry
    { g: "grp-geo", id: "region", kind: "range", label: "filter region depth (% beyond box, top+bottom)", min: 10, max: 60, step: 5, v: 30 },
    { g: "grp-geo", id: "clipTop", kind: "range", label: "clean image clip · top (px)", min: 0, max: 60, step: 1, v: 24 },
    { g: "grp-geo", id: "clipBottom", kind: "range", label: "clean image clip · bottom (px)", min: 0, max: 60, step: 1, v: 12 },
    { g: "grp-geo", id: "clipSide", kind: "range", label: "clean image clip · sides (px)", min: 0, max: 16, step: 1, v: 3 },
    { g: "grp-geo", id: "surfaceTop", kind: "range", label: "surface layer top clip (px, stops bg peeking)", min: 0, max: 90, step: 1, v: 40 },
    { g: "grp-geo", id: "split", kind: "range", label: "backing split — card-tear half vs photo-tear half (%)", min: 25, max: 80, step: 1, v: 55 },
  ];

  var PRESETS = {
    app:     { c1scale: 3, c2scale: 0, p1scale: 2, p2scale: 0, clipTop: 2, clipBottom: 2, clipSide: 1, surfaceTop: 0 },
    current: { c1type: "turbulence", c1freq: 0.04, c1oct: 4, c1seed: 0, c1scale: 3,
               c2type: "fractalNoise", c2fx: 0.015, c2fy: 0.002, c2oct: 3, c2seed: 9, c2scale: 38, c2straight: true,
               p1type: "turbulence", p1freq: 0.04, p1oct: 4, p1seed: 11, p1scale: 2,
               p2type: "fractalNoise", p2fx: 0.03, p2fy: 0.002, p2oct: 3, p2seed: 47, p2scale: 10, p2straight: true,
               region: 30, clipTop: 24, clipBottom: 12, clipSide: 3, surfaceTop: 40, split: 55 },
    wild:    { c2fx: 0.009, c2oct: 4, c2scale: 72, clipTop: 42, surfaceTop: 64, p2scale: 22, clipBottom: 18, region: 50 },
  };

  var STORE_KEY = "blrhikes.tear-lab.v1";

  var state = {}, inputs = {};
  var preview = document.getElementById("preview");
  var out = document.getElementById("out");

  function loadSaved() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null; // private mode / corrupt value — just fall back to defaults
    }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  // ---- build the controls --------------------------------------------------
  DEFS.forEach(function (d) {
    state[d.id] = d.v;
    var wrap = document.createElement("div");
    var el;
    if (d.kind === "range") {
      wrap.className = "ctl";
      var row = document.createElement("div");
      row.className = "ctl-row";
      var lab = document.createElement("label");
      lab.textContent = d.label;
      lab.setAttribute("for", "in-" + d.id);
      var val = document.createElement("output");
      row.append(lab, val);
      el = document.createElement("input");
      el.type = "range"; el.id = "in-" + d.id;
      el.min = d.min; el.max = d.max; el.step = d.step; el.value = d.v;
      wrap.append(row, el);
      d._out = val;
    } else if (d.kind === "select") {
      wrap.className = "ctl";
      var row2 = document.createElement("div");
      row2.className = "ctl-row";
      var lab2 = document.createElement("label");
      lab2.textContent = d.label;
      lab2.setAttribute("for", "in-" + d.id);
      row2.append(lab2);
      el = document.createElement("select");
      el.id = "in-" + d.id;
      d.opts.forEach(function (o) {
        var op = document.createElement("option");
        op.value = op.textContent = o;
        el.append(op);
      });
      el.value = d.v;
      wrap.append(row2, el);
    } else {
      wrap.className = "ctl-check";
      el = document.createElement("input");
      el.type = "checkbox"; el.id = "in-" + d.id; el.checked = d.v;
      var lab3 = document.createElement("label");
      lab3.textContent = d.label;
      lab3.setAttribute("for", "in-" + d.id);
      wrap.append(el, lab3);
    }
    inputs[d.id] = el;
    el.addEventListener("input", function () {
      state[d.id] = d.kind === "check" ? el.checked : (d.kind === "select" ? el.value : parseFloat(el.value));
      apply();
    });
    document.getElementById(d.g).append(wrap);
  });

  // Write a {id: value} bag into state + the matching inputs. Unknown keys are
  // ignored, so a stale saved blob from an older DEFS list can't break the lab.
  function setValues(bag) {
    DEFS.forEach(function (d) {
      if (!(d.id in bag)) return;
      var v = bag[d.id];
      if (d.kind === "check") v = !!v;
      else if (d.kind === "range") { v = parseFloat(v); if (isNaN(v)) return; }
      else if (d.opts.indexOf(v) === -1) return;
      state[d.id] = v;
      if (d.kind === "check") inputs[d.id].checked = v;
      else inputs[d.id].value = v;
    });
  }

  function set(id, attr, value) {
    document.getElementById(id).setAttribute(attr, value);
  }

  // ---- push state into the live filters + geometry -------------------------
  function apply() {
    DEFS.forEach(function (d) {
      if (d._out) d._out.textContent = state[d.id];
    });

    set("c1t", "type", state.c1type);
    set("c1t", "baseFrequency", state.c1freq);
    set("c1t", "numOctaves", state.c1oct);
    set("c1t", "seed", state.c1seed);
    set("c1d", "scale", state.c1scale);

    set("c2t", "type", state.c2type);
    set("c2t", "baseFrequency", state.c2fx + " " + state.c2fy);
    set("c2t", "numOctaves", state.c2oct);
    set("c2t", "seed", state.c2seed);
    set("c2d", "scale", state.c2scale);
    set("c2fx", "slope", state.c2straight ? 0 : 1);
    set("c2fx", "intercept", state.c2straight ? 0.5 : 0);

    set("p1t", "type", state.p1type);
    set("p1t", "baseFrequency", state.p1freq);
    set("p1t", "numOctaves", state.p1oct);
    set("p1t", "seed", state.p1seed);
    set("p1d", "scale", state.p1scale);

    set("p2t", "type", state.p2type);
    set("p2t", "baseFrequency", state.p2fx + " " + state.p2fy);
    set("p2t", "numOctaves", state.p2oct);
    set("p2t", "seed", state.p2seed);
    set("p2d", "scale", state.p2scale);
    set("p2fx", "slope", state.p2straight ? 0 : 1);
    set("p2fx", "intercept", state.p2straight ? 0.5 : 0);

    ["lab-cut", "lab-photo"].forEach(function (fid) {
      var f = document.getElementById(fid);
      f.setAttribute("y", "-" + state.region + "%");
      f.setAttribute("height", 100 + 2 * state.region + "%");
    });

    preview.style.setProperty("--g-clip-top", state.clipTop + "px");
    preview.style.setProperty("--g-clip-bottom", state.clipBottom + "px");
    preview.style.setProperty("--g-clip-side", state.clipSide + "px");
    preview.style.setProperty("--g-surface-top", state.surfaceTop + "px");
    preview.style.setProperty("--g-split", state.split + "%");

    render();
    save();
  }

  // ---- the paste-back snippet ---------------------------------------------
  function xfunc(straight) {
    return straight
      ? '<feComponentTransfer in="n2" result="n2f"><feFuncR type="linear" slope="0" intercept="0.5"/></feComponentTransfer>'
      : '<feComponentTransfer in="n2" result="n2f"><feFuncR type="linear" slope="1" intercept="0"/></feComponentTransfer>';
  }
  function render() {
    var region = 'x="-10%" y="-' + state.region + '%" width="120%" height="' + (100 + 2 * state.region) + '%"';
    out.textContent =
'<filter id="cut-1" ' + region + '>\n' +
'  <feTurbulence type="' + state.c1type + '" baseFrequency="' + state.c1freq + '" numOctaves="' + state.c1oct + '" seed="' + state.c1seed + '" result="n1"/>\n' +
'  <feDisplacementMap in="SourceGraphic" in2="n1" scale="' + state.c1scale + '" xChannelSelector="R" yChannelSelector="G" result="d1"/>\n' +
'  <feTurbulence type="' + state.c2type + '" baseFrequency="' + state.c2fx + ' ' + state.c2fy + '" numOctaves="' + state.c2oct + '" seed="' + state.c2seed + '" result="n2"/>\n' +
'  ' + xfunc(state.c2straight) + '\n' +
'  <feDisplacementMap in="d1" in2="n2f" scale="' + state.c2scale + '" xChannelSelector="R" yChannelSelector="G"/>\n' +
'</filter>\n\n' +
'<filter id="cut-photo" ' + region + '>\n' +
'  <feTurbulence type="' + state.p1type + '" baseFrequency="' + state.p1freq + '" numOctaves="' + state.p1oct + '" seed="' + state.p1seed + '" result="n1"/>\n' +
'  <feDisplacementMap in="SourceGraphic" in2="n1" scale="' + state.p1scale + '" xChannelSelector="R" yChannelSelector="G" result="d1"/>\n' +
'  <feTurbulence type="' + state.p2type + '" baseFrequency="' + state.p2fx + ' ' + state.p2fy + '" numOctaves="' + state.p2oct + '" seed="' + state.p2seed + '" result="n2"/>\n' +
'  ' + xfunc(state.p2straight) + '\n' +
'  <feDisplacementMap in="d1" in2="n2f" scale="' + state.p2scale + '" xChannelSelector="R" yChannelSelector="G"/>\n' +
'</filter>\n\n' +
'/* geometry (kraft.css) */\n' +
'.photo-card::before   { clip-path: inset(' + state.surfaceTop + 'px 0 0 0); }\n' +
'.photo-wrap::before   { clip-path: inset(0 0 ' + (100 - state.split) + '% 0); }   /* card-tear half */\n' +
'.photo-wrap::after    { clip-path: inset(' + (state.split - 10) + '% 0 0 0); }   /* photo-tear half */\n' +
'.photo-card .photo    { clip-path: inset(' + state.clipTop + 'px ' + state.clipSide + 'px ' + state.clipBottom + 'px ' + state.clipSide + 'px); }';
  }

  // ---- presets & copy ------------------------------------------------------
  document.querySelectorAll("[data-preset]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setValues(PRESETS[btn.dataset.preset]);
      apply();
    });
  });

  document.getElementById("reset").addEventListener("click", function () {
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    var defaults = {};
    DEFS.forEach(function (d) { defaults[d.id] = d.v; });
    setValues(defaults);
    apply();
  });

  document.getElementById("copy").addEventListener("click", function () {
    navigator.clipboard.writeText(out.textContent).then(function () {
      var b = document.getElementById("copy");
      b.textContent = "Copied ✓";
      setTimeout(function () { b.textContent = "Copy snippet"; }, 1200);
    });
  });

  var saved = loadSaved();
  if (saved) {
    setValues(saved);
    document.getElementById("saved-note").textContent =
      "Restored your saved settings from this browser.";
  }
  apply();
})();
