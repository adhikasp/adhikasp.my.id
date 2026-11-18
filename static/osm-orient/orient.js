/* Which way do Singapore's blocks face? Interactive map + compass rose.
   Data: static/osm-orient/blocks.json (OpenStreetMap, ODbL). No tiles, no libraries:
   every dot on the map is one building footprint's long axis. */
(function () {
  "use strict";
  var root = document.getElementById("osm-orient-app");
  if (!root) return;

  var COL = { ew: "#2a78d6", ns: "#eb6834", diag: "#8b93a1" };
  var TOWNS = [
    ["Whole island", null],
    ["Queenstown", [103.79, 103.81, 1.29, 1.31]],
    ["Toa Payoh", [103.84, 103.865, 1.325, 1.345]],
    ["Bukit Merah", [103.815, 103.84, 1.275, 1.29]],
    ["Ang Mo Kio", [103.835, 103.865, 1.365, 1.385]],
    ["Tampines", [103.93, 103.96, 1.34, 1.365]],
    ["Jurong West", [103.69, 103.72, 1.34, 1.355]],
    ["Woodlands", [103.77, 103.8, 1.425, 1.445]],
    ["Sengkang", [103.885, 103.915, 1.38, 1.405]],
    ["Punggol", [103.89, 103.92, 1.395, 1.42]],
    ["Bukit Batok", [103.74, 103.76, 1.34, 1.36]]
  ];
  var ERAS = [["All", 0, 9999], ["Before 1980", 1900, 1979], ["1980 to 1994", 1980, 1994], ["1995 or later", 1995, 2099]];

  var css = [
    ".oo{--oo-bg:var(--surface,#f5f5f3);margin:1.5rem 0;font-size:.9rem;line-height:1.4}",
    ".oo *{box-sizing:border-box}",
    ".oo-row{display:flex;flex-wrap:wrap;gap:.4rem;margin:.4rem 0}",
    ".oo-lbl{font-size:.75rem;color:var(--muted,#6b7280);text-transform:uppercase;letter-spacing:.04em;margin:.7rem 0 0}",
    ".oo button,.oo select{font:inherit;font-size:.85rem;padding:.35rem .65rem;border-radius:999px;border:1px solid var(--line-strong,#d4d4cf);background:var(--bg,#fff);color:var(--text,#1f2328);cursor:pointer;min-height:2.2rem}",
    ".oo button[aria-pressed=true]{background:var(--accent,#4338ca);border-color:var(--accent,#4338ca);color:var(--bg,#fff)}",
    ".oo button:focus-visible,.oo select:focus-visible,.oo canvas:focus-visible{outline:2px solid var(--accent,#4338ca);outline-offset:2px}",
    ".oo-map{position:relative;margin-top:.6rem;border:1px solid var(--line,#e6e6e2);border-radius:10px;overflow:hidden;background:var(--oo-bg)}",
    ".oo-map canvas{display:block;width:100%;height:360px;touch-action:none;cursor:grab}",
    ".oo-map canvas:active{cursor:grabbing}",
    ".oo-zoom{position:absolute;right:.5rem;top:.5rem;display:flex;flex-direction:column;gap:.3rem}",
    ".oo-zoom button{width:2.2rem;padding:0;border-radius:8px;font-size:1.1rem;line-height:1}",
    ".oo-leg{position:absolute;left:.5rem;bottom:.4rem;font-size:.72rem;color:var(--text-2,#4b5260);background:color-mix(in srgb,var(--oo-bg) 85%,transparent);padding:.15rem .4rem;border-radius:6px}",
    ".oo-leg i{display:inline-block;width:.7rem;height:.35rem;border-radius:2px;margin:0 .25rem 0 .5rem;vertical-align:middle}",
    ".oo-leg i:first-child{margin-left:0}",
    ".oo-info{margin:.5rem 0 0;min-height:2.6em;color:var(--text-2,#4b5260);font-size:.85rem}",
    ".oo-panel{display:grid;grid-template-columns:200px 1fr;gap:1rem;align-items:center;margin-top:.6rem;padding:.8rem;border:1px solid var(--line,#e6e6e2);border-radius:10px;background:var(--oo-bg)}",
    ".oo-panel canvas{width:200px;height:200px}",
    ".oo-big{font-size:2rem;font-weight:700;line-height:1.1;color:var(--text,#1f2328)}",
    ".oo-sub{color:var(--text-2,#4b5260);font-size:.85rem;margin:.15rem 0 .5rem}",
    ".oo-bar{display:flex;height:.7rem;border-radius:4px;overflow:hidden;margin:.3rem 0}",
    ".oo-bar span{display:block;height:100%}",
    ".oo-foot{font-size:.75rem;color:var(--muted,#6b7280);margin-top:.4rem}",
    "@media (max-width:560px){.oo-panel{grid-template-columns:1fr;justify-items:center;text-align:center}.oo-map canvas{height:320px}}"
  ].join("");
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  root.className = "oo";
  root.innerHTML =
    '<div class="oo-lbl">Buildings</div><div class="oo-row" id="oo-layers"></div>' +
    '<div class="oo-lbl">Built (only the 453 towers that have a build year)</div><div class="oo-row" id="oo-eras"></div>' +
    '<div class="oo-lbl">Go to</div><div class="oo-row"><select id="oo-town" aria-label="Jump to a town"></select>' +
    '<button id="oo-shuffle" aria-pressed="false" title="Give every block a random direction, to see what chance would look like">Spin them randomly</button></div>' +
    '<div class="oo-map"><canvas id="oo-map" tabindex="0" role="img" aria-label="Map of Singapore residential blocks coloured by the direction of their long side"></canvas>' +
    '<div class="oo-zoom"><button id="oo-in" aria-label="Zoom in">+</button><button id="oo-out" aria-label="Zoom out">&minus;</button></div>' +
    '<div class="oo-leg"><i style="background:' + COL.ew + '"></i>long sides face N/S<i style="background:' + COL.diag + '"></i>diagonal<i style="background:' + COL.ns + '"></i>long sides face E/W</div></div>' +
    '<p class="oo-info" id="oo-info" aria-live="polite">Drag to pan, pinch or use +/&minus; to zoom (Ctrl or &#8984; + scroll also works). Tap a block to read it.</p>' +
    '<div class="oo-panel"><canvas id="oo-rose" width="400" height="400" role="img" aria-label="Compass rose of block directions in view"></canvas>' +
    '<div><div class="oo-big" id="oo-big">&nbsp;</div><div class="oo-sub" id="oo-sub"></div><div class="oo-bar" id="oo-bar"></div><div id="oo-detail"></div>' +
    '<div class="oo-foot">If directions were random, about a third would land in each colour.</div></div></div>';

  var $ = function (id) { return root.querySelector("#" + id); };
  var mapC = $("oo-map"), roseC = $("oo-rose"), ctx = mapC.getContext("2d"), rctx = roseC.getContext("2d");
  var state = { towers: true, low: false, era: 0, shuffle: false, cx: 0, cy: 0, scale: 0.01 };
  var B = null, OUT = null; // parsed rows, island outline (metres)

  // ---- controls
  function chip(parent, label, pressed, cb) {
    var b = document.createElement("button"); b.type = "button"; b.textContent = label;
    b.setAttribute("aria-pressed", pressed ? "true" : "false");
    b.addEventListener("click", function () { cb(b); }); parent.appendChild(b); return b;
  }
  chip($("oo-layers"), "Towers, 10+ floors", true, function (b) { state.towers = !state.towers; b.setAttribute("aria-pressed", state.towers); draw(); });
  chip($("oo-layers"), "Low-rise and landed", false, function (b) { state.low = !state.low; b.setAttribute("aria-pressed", state.low); draw(); });
  var eraBtns = ERAS.map(function (e, i) {
    return chip($("oo-eras"), e[0], i === 0, function () { state.era = i; eraBtns.forEach(function (x, j) { x.setAttribute("aria-pressed", j === i); }); draw(); });
  });
  var sel = $("oo-town");
  TOWNS.forEach(function (t, i) { var o = document.createElement("option"); o.value = i; o.textContent = t[0]; sel.appendChild(o); });
  sel.addEventListener("change", function () { goTown(+sel.value); });
  $("oo-shuffle").addEventListener("click", function (e) {
    state.shuffle = !state.shuffle; e.currentTarget.setAttribute("aria-pressed", state.shuffle);
    e.currentTarget.textContent = state.shuffle ? "Back to the real thing" : "Spin them randomly"; draw();
  });
  $("oo-in").addEventListener("click", function () { zoomAt(1.6, mapC.clientWidth / 2, mapC.clientHeight / 2); });
  $("oo-out").addEventListener("click", function () { zoomAt(1 / 1.6, mapC.clientWidth / 2, mapC.clientHeight / 2); });

  // ---- geometry: metres east/north of the data origin
  var KE = 11.13, KN = 11.057, LON0 = 103.55, LAT0 = 1.15;
  function toM(lon, lat) { return [(lon - LON0) * 1e4 * KE, (lat - LAT0) * 1e4 * KN]; }
  var W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (!mapC.clientWidth) return;
    W = mapC.clientWidth; H = mapC.clientHeight;
    mapC.width = W * dpr; mapC.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function fit(box, instant) {
    var a = box ? toM(box[0], box[2]) : toM(103.6, 1.2), b = box ? toM(box[1], box[3]) : toM(104.05, 1.48);
    var w = (b[0] - a[0]) * 1.08, h = (b[1] - a[1]) * 1.08;
    var s = Math.min(W / w, H / h);
    animateTo((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, s, instant);
  }
  function goTown(i) { sel.value = i; fit(TOWNS[i][1]); }
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, anim = 0;
  function animateTo(cx, cy, s, instant) {
    cancelAnimationFrame(anim);
    if (instant || reduce) { state.cx = cx; state.cy = cy; state.scale = s; draw(); return; }
    var c0 = state.cx, y0 = state.cy, s0 = state.scale, t0 = performance.now();
    (function step(t) {
      var k = Math.min(1, (t - t0) / 450), e = 1 - Math.pow(1 - k, 3);
      state.cx = c0 + (cx - c0) * e; state.cy = y0 + (cy - y0) * e;
      state.scale = Math.exp(Math.log(s0) + (Math.log(s) - Math.log(s0)) * e); draw();
      if (k < 1) anim = requestAnimationFrame(step);
    })(t0);
  }
  function sx(mx) { return W / 2 + (mx - state.cx) * state.scale; }
  function sy(my) { return H / 2 - (my - state.cy) * state.scale; }
  function zoomAt(f, px, py) {
    var ns = Math.max(0.004, Math.min(state.scale * f, 8));
    var mx = state.cx + (px - W / 2) / state.scale, my = state.cy - (py - H / 2) / state.scale;
    state.scale = ns; state.cx = mx - (px - W / 2) / ns; state.cy = my + (py - H / 2) / ns; draw();
  }

  // ---- classification helpers
  function devEW(b) { return Math.abs(((b - 90) + 90) % 180 - 90); } // 0 = long axis due east-west
  function bucket(dev) { return dev < 30 ? "ew" : dev > 60 ? "ns" : "diag"; }
  function rng(seed) { var t = seed + 0x6D2B79F5; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }
  function bearing(i) { return state.shuffle ? rng(i * 7 + 1) * 180 : B.b[i]; }
  function visibleRow(i) {
    if (B.c[i] === 0 ? !state.towers : !state.low) return false;
    if (state.era) { var y = B.yr[i]; if (!y) return false; y = y < 30 ? 2000 + y : 1900 + y; var e = ERAS[state.era]; if (y < e[1] || y > e[2]) return false; if (B.c[i] !== 0) return false; }
    return true;
  }

  // ---- draw
  var hover = -1;
  function draw() {
    if (!B) return;
    var cs = getComputedStyle(root), bg = cs.getPropertyValue("--surface").trim() || "#f5f5f3";
    root.style.setProperty("--oo-bg", bg);
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    if (OUT) {
      ctx.beginPath();
      OUT.forEach(function (ring) { ring.forEach(function (q, j) { var px = sx(q[0]), py = sy(q[1]); if (j) ctx.lineTo(px, py); else ctx.moveTo(px, py); }); });
      ctx.lineJoin = "round"; ctx.lineWidth = 1.5; ctx.strokeStyle = cs.getPropertyValue("--line-strong").trim() || "#bbb"; ctx.stroke();
    }
    var n = B.n, s = state.scale, counts = new Array(36).fill(0), tot = 0, cEW = 0, cNS = 0, cD = 0;
    ctx.lineCap = "butt";
    var cs3 = { ew: [], ns: [], diag: [] };
    for (var i = 0; i < n; i++) {
      if (!visibleRow(i)) continue;
      var x = sx(B.x[i]), y = sy(B.nn[i]);
      var inView = x > -20 && x < W + 20 && y > -20 && y < H + 20;
      if (!inView) continue;
      var b = bearing(i), dev = devEW(b), k = bucket(dev);
      tot++; if (k === "ew") cEW++; else if (k === "ns") cNS++; else cD++;
      counts[Math.floor((b % 180) / 5) % 36]++;
      cs3[k].push(i);
    }
    ["diag", "ns", "ew"].forEach(function (k) {
      ctx.strokeStyle = COL[k]; ctx.globalAlpha = 0.92;
      cs3[k].forEach(function (i) {
        var b = bearing(i) * Math.PI / 180, L = Math.max(B.l[i] * s, 4.5), Wd = Math.max(B.w[i] * s, 1.7);
        var dx = Math.sin(b) * L / 2, dy = -Math.cos(b) * L / 2, x = sx(B.x[i]), y = sy(B.nn[i]);
        ctx.lineWidth = Wd; ctx.beginPath(); ctx.moveTo(x - dx, y - dy); ctx.lineTo(x + dx, y + dy); ctx.stroke();
      });
    });
    ctx.globalAlpha = 1;
    if (hover >= 0 && visibleRow(hover)) {
      var hb = bearing(hover) * Math.PI / 180, hl = Math.max(B.l[hover] * s, 4.5) / 2 + 3, hx = sx(B.x[hover]), hy = sy(B.nn[hover]);
      ctx.strokeStyle = cs.getPropertyValue("--text").trim() || "#000"; ctx.lineWidth = 2;
      ctx.strokeRect(hx - hl, hy - hl, hl * 2, hl * 2);
    }
    stats(counts, tot, cEW, cNS, cD);
  }

  function stats(counts, tot, cEW, cNS, cD) {
    var pe = tot ? Math.round(cEW / tot * 100) : 0, pn = tot ? Math.round(cNS / tot * 100) : 0, pd = tot ? 100 - pe - pn : 0;
    $("oo-big").textContent = tot ? pe + "% face N/S" : "Nothing in view";
    $("oo-sub").textContent = tot ? tot.toLocaleString("en") + " blocks in view. Long sides facing east or west: " + pn + "%." : "Pan or zoom back to the island.";
    $("oo-bar").innerHTML = '<span style="width:' + pe + '%;background:' + COL.ew + '"></span><span style="width:' + pd + '%;background:' + COL.diag + '"></span><span style="width:' + pn + '%;background:' + COL.ns + '"></span>';
    rose(counts);
  }

  function rose(counts) {
    var c = rctx, S = 400, R = 150, cx = S / 2, cy = S / 2, cs = getComputedStyle(root);
    var text = cs.getPropertyValue("--text-2").trim() || "#555", line = cs.getPropertyValue("--line-strong").trim() || "#ccc";
    c.clearRect(0, 0, S, S);
    c.strokeStyle = line; c.lineWidth = 1.5;
    [0.5, 1].forEach(function (f) { c.beginPath(); c.arc(cx, cy, R * f, 0, Math.PI * 2); c.stroke(); });
    var mx = Math.max.apply(null, counts) || 1;
    for (var i = 0; i < 36; i++) {
      var b0 = i * 5, bm = b0 + 2.5, v = counts[i] / mx; if (!v) continue;
      var col = COL[bucket(devEW(bm))];
      [bm, bm + 180].forEach(function (b) {
        var a0 = (b - 2.5 - 90) * Math.PI / 180, a1 = (b + 2.5 - 90) * Math.PI / 180, r = R * Math.sqrt(v);
        c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, r, a0, a1); c.closePath();
        c.fillStyle = col; c.globalAlpha = 0.9; c.fill(); c.globalAlpha = 1;
      });
    }
    c.fillStyle = text; c.font = "600 26px system-ui,sans-serif"; c.textAlign = "center"; c.textBaseline = "middle";
    c.fillText("N", cx, 14); c.fillText("S", cx, S - 14); c.fillText("W", 16, cy); c.fillText("E", S - 16, cy);
    c.font = "22px system-ui,sans-serif"; c.fillText("☀︎", S - 16, cy - 30); c.fillText("☽︎", 16, cy - 30);
  }

  // ---- pointer: pan, pinch, tap
  var ptrs = {}, last = null, moved = 0;
  function pos(e) { var r = mapC.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
  mapC.addEventListener("pointerdown", function (e) {
    mapC.setPointerCapture(e.pointerId); ptrs[e.pointerId] = pos(e); moved = 0; last = null; cancelAnimationFrame(anim);
  });
  mapC.addEventListener("pointermove", function (e) {
    var p = pos(e), ids = Object.keys(ptrs);
    if (ptrs[e.pointerId]) {
      if (ids.length === 1) {
        var o = ptrs[e.pointerId]; moved += Math.abs(p[0] - o[0]) + Math.abs(p[1] - o[1]);
        state.cx -= (p[0] - o[0]) / state.scale; state.cy += (p[1] - o[1]) / state.scale; ptrs[e.pointerId] = p; draw();
      } else if (ids.length === 2) {
        var other = ptrs[ids.filter(function (k) { return +k !== e.pointerId; })[0]], o2 = ptrs[e.pointerId];
        var d0 = Math.hypot(o2[0] - other[0], o2[1] - other[1]), d1 = Math.hypot(p[0] - other[0], p[1] - other[1]);
        ptrs[e.pointerId] = p; moved += 10; if (d0 > 0) zoomAt(d1 / d0, (p[0] + other[0]) / 2, (p[1] + other[1]) / 2);
      }
    } else if (e.pointerType === "mouse") { pick(p, false); }
  });
  function up(e) {
    var p = pos(e), was = ptrs[e.pointerId]; delete ptrs[e.pointerId];
    if (was && moved < 6 && Object.keys(ptrs).length === 0) pick(p, true);
  }
  mapC.addEventListener("pointerup", up); mapC.addEventListener("pointercancel", function (e) { delete ptrs[e.pointerId]; });
  mapC.addEventListener("wheel", function (e) {
    if (!(e.ctrlKey || e.metaKey)) return; e.preventDefault();
    var p = pos(e); zoomAt(Math.exp(-e.deltaY * 0.0025), p[0], p[1]);
  }, { passive: false });
  mapC.addEventListener("keydown", function (e) {
    var step = 60 / state.scale;
    if (e.key === "+" || e.key === "=") zoomAt(1.4, W / 2, H / 2);
    else if (e.key === "-") zoomAt(1 / 1.4, W / 2, H / 2);
    else if (e.key === "ArrowLeft") { state.cx -= step; draw(); } else if (e.key === "ArrowRight") { state.cx += step; draw(); }
    else if (e.key === "ArrowUp") { state.cy += step; draw(); } else if (e.key === "ArrowDown") { state.cy -= step; draw(); }
    else return; e.preventDefault();
  });

  function pick(p, sticky) {
    var best = -1, bd = 14 * 14;
    for (var i = 0; i < B.n; i++) {
      if (!visibleRow(i)) continue;
      var dx = sx(B.x[i]) - p[0], dy = sy(B.nn[i]) - p[1], d = dx * dx + dy * dy;
      if (d < bd) { bd = d; best = i; }
    }
    if (best !== hover) { hover = best; draw(); }
    if (best >= 0) {
      var real = B.b[best], dev = devEW(real), where = dev < 30 ? "long sides face north and south" : dev > 60 ? "long sides face east and west" : "set at a diagonal";
      var yv = B.yr[best], yr = yv ? ", built " + (yv < 30 ? 2000 + yv : 1900 + yv) : "";
      $("oo-info").textContent = (B.c[best] === 0 ? B.lv[best] + "-storey tower" : "Low-rise block") + ": " + Math.round(B.l[best]) + " by " + Math.round(B.w[best]) + " m, long axis " + Math.round(real) + "° from north, " + where + yr + (state.shuffle ? " (shown spun at random)" : "") + ".";
    } else if (sticky) $("oo-info").textContent = "Nothing close to that spot. Tap a block.";
  }

  // ---- load
  var url = root.getAttribute("data-src") || "/osm-orient/blocks.json";
  fetch(url.replace("blocks.json", "outline.json")).then(function (r) { return r.json(); }).then(function (o) {
    OUT = o.map(function (ring) { return ring.map(function (q) { var m = toM(q[0], q[1]); return m; }); }); if (B) draw();
  }).catch(function () {});
  fetch(url).then(function (r) { return r.json(); }).then(function (d) {
    var r = d.rows, n = r.length;
    B = { n: n, x: new Float32Array(n), nn: new Float32Array(n), b: new Float32Array(n), l: new Float32Array(n), w: new Float32Array(n), lv: new Uint8Array(n), yr: new Uint8Array(n), c: new Uint8Array(n) };
    for (var i = 0; i < n; i++) {
      var o = r[i]; B.x[i] = o[0] * KE; B.nn[i] = o[1] * KN; B.b[i] = o[2]; B.l[i] = o[3]; B.w[i] = o[4]; B.lv[i] = o[5]; B.yr[i] = o[6]; B.c[i] = o[7];
    }
    resize(); fit(null, true);
  }).catch(function () { $("oo-info").textContent = "Couldn't load the map data."; });

  window.addEventListener("resize", resize);
  if (window.ResizeObserver) new ResizeObserver(function () { if (B && mapC.clientWidth !== W) resize(); }).observe(mapC);
  // redraw when the site theme flips
  new MutationObserver(function () { draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  if (window.matchMedia) matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { draw(); });
})();
