/**
 * TRL — The Right Lifestyle
 * app.js — interaction layer. Vanilla JS, zero dependencies, zero trackers.
 *
 * 01 Theme engine          06 Counters
 * 02 Nav / drawer          07 Cursor glow & spotlight
 * 03 Scroll progress       08 Services filter + search
 * 04 Reveal on scroll      09 FAQ accordion
 * 05 Marquee               10 Brief wizard → WhatsApp
 * 11 Currency switch       12 Misc (to-top, toast, year, timeline, tilt)
 */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var WHATSAPP = '923190091457';

  /* ------------------------------------------------------------------ 01 */
  /* Theme engine — set before paint by the inline head script; toggle here */
  function initTheme() {
    var root = document.documentElement;
    var btns = $$('[data-theme-toggle]');
    function paint() {
      var t = root.getAttribute('data-theme') || 'dark';
      btns.forEach(function (b) {
        b.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        b.setAttribute('title', t === 'dark' ? 'Light mode' : 'Dark mode');
      });
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', t === 'dark' ? '#04060d' : '#f6f8fc');
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('trl-theme', next); } catch (e) {}
        paint();
      });
    });
    paint();
  }

  /* ------------------------------------------------------------------ 02 */
  function initNav() {
    var nav = $('.nav');
    var btn = $('.menu-btn');
    var drawer = $('.drawer');

    function onScroll() {
      if (nav) nav.classList.toggle('stuck', window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    function close() {
      if (!drawer) return;
      drawer.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
    function open() {
      if (!drawer) return;
      drawer.classList.add('open');
      document.body.classList.add('no-scroll');
      if (btn) btn.setAttribute('aria-expanded', 'true');
      var first = $('a', drawer);
      if (first) first.focus({ preventScroll: true });
    }
    if (btn && drawer) {
      btn.addEventListener('click', function () {
        drawer.classList.contains('open') ? close() : open();
      });
    }
    if (drawer) {
      $$('a', drawer).forEach(function (a) { a.addEventListener('click', close); });
      drawer.addEventListener('click', function (e) { if (e.target === drawer) close(); });
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    /* Active link highlight for same-page anchors */
    var anchors = $$('.nav-link[href^="#"], .drawer-links a[href^="#"]');
    if (anchors.length > 1 && 'IntersectionObserver' in window) {
      var targets = anchors.map(function (a) {
        var id = a.getAttribute('href').slice(1);
        return id ? { a: a, el: document.getElementById(id) } : null;
      }).filter(Boolean);
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          targets.forEach(function (t) { if (t.el === en.target) t.a.classList.add('active'); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      targets.forEach(function (t) { io.observe(t.el); });
    }
  }

  /* ------------------------------------------------------------------ 03 */
  function initProgress() {
    var bar = $('.progress');
    if (!bar) return;
    var raf = false;
    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ')';
      raf = false;
    }
    update();
    window.addEventListener('scroll', function () {
      if (!raf) { raf = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ------------------------------------------------------------------ 04 */
  function initReveal() {
    var els = $$('[data-reveal]');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el, i) {
      if (!el.style.getPropertyValue('--d')) {
        var siblingIndex = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.setProperty('--d', Math.min(siblingIndex, 6) * 70 + 'ms');
      }
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------ 05 */
  function initMarquee() {
    $$('.marquee-track[data-clone]').forEach(function (t) {
      t.innerHTML = t.innerHTML + t.innerHTML;
      var set = t.getAttribute('data-speed');
      if (set) t.style.animationDuration = set + 's';
      t.setAttribute('data-cloned', '');
    });
  }

  /* ------------------------------------------------------------------ 06 */
  function initCounters() {
    var els = $$('[data-count]');
    if (!els.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduceMotion) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
      var start = performance.now(), dur = 1400;
      function frame(now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ 07 */
  function initPointerFX() {
    if (!finePointer || reduceMotion) return;
    document.body.classList.add('has-pointer');

    var glow = $('.cursor-glow');
    if (glow) {
      var gx = window.innerWidth / 2, gy = window.innerHeight / 2, cx = gx, cy = gy;
      window.addEventListener('mousemove', function (e) { gx = e.clientX; gy = e.clientY; }, { passive: true });
      (function loop() {
        cx += (gx - cx) * 0.08; cy += (gy - cy) * 0.08;
        glow.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0) translate(-50%,-50%)';
        requestAnimationFrame(loop);
      })();
    }

    $$('.spotlight').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    $$('.tilt').forEach(function (el) {
      var max = parseFloat(el.getAttribute('data-tilt') || '5');
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(1000px) rotateY(' + (px * max) + 'deg) rotateX(' + (-py * max) + 'deg) translateY(-4px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ------------------------------------------------------------------ 08 */
  function initServiceFilter() {
    var grid = $('#service-grid');
    if (!grid) return;
    var cards = $$('.service-card', grid);
    var btns = $$('.filter-btn');
    var search = $('#service-search');
    var count = $('#service-count');
    var empty = $('#service-empty');
    var active = 'all';

    function apply() {
      var q = (search && search.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (c) {
        var cat = c.getAttribute('data-cat') || '';
        var hay = (c.textContent || '').toLowerCase() + ' ' + (c.getAttribute('data-tags') || '');
        var okCat = active === 'all' || cat === active;
        var okQ = !q || hay.indexOf(q) > -1;
        var show = okCat && okQ;
        c.classList.toggle('hide', !show);
        if (show) shown++;
      });
      if (count) count.textContent = shown;
      if (empty) empty.style.display = shown ? 'none' : 'block';
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); });
        b.classList.add('active');
        b.setAttribute('aria-pressed', 'true');
        active = b.getAttribute('data-filter') || 'all';
        apply();
      });
    });
    if (search) search.addEventListener('input', apply);
    apply();
  }

  /* ------------------------------------------------------------------ 09 */
  function initFAQ() {
    $$('.faq-item').forEach(function (item) {
      var q = $('.faq-q', item);
      if (!q) return;
      q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        var group = item.parentElement;
        if (group && group.hasAttribute('data-accordion')) {
          $$('.faq-item.open', group).forEach(function (o) {
            o.classList.remove('open');
            var oq = $('.faq-q', o); if (oq) oq.setAttribute('aria-expanded', 'false');
          });
        }
        item.classList.toggle('open', !isOpen);
        q.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  /* ------------------------------------------------------------------ 10 */
  function toast(msg) {
    var t = $('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  function initWizard() {
    var form = $('#brief-form');
    if (!form) return;
    var out = $('#brief-preview');
    var waLink = $('#brief-wa');
    var copyBtn = $('#brief-copy');

    function val(name) {
      var el = form.elements[name];
      return el && el.value ? el.value.trim() : '';
    }
    function checks(name) {
      return $$('input[name="' + name + '"]:checked', form).map(function (i) { return i.value; });
    }
    function build() {
      var need = checks('need');
      var lines = [];
      lines.push('Hi Rashid — TRL project brief:');
      lines.push('');
      lines.push('NAME: ' + (val('name') || '—'));
      lines.push('BUSINESS: ' + (val('business') || '—'));
      var industry = val('industry');
      if (industry) { lines.push('WHAT THEY DO: ' + industry); }
      lines.push('NEEDS: ' + (need.length ? need.join(', ') : '—'));
      var bottleneck = val('bottleneck');
      if (bottleneck) { lines.push('BIGGEST TIME WASTE: ' + bottleneck); }
      var leads = val('leads');
      if (leads) { lines.push('LEAD SOURCES: ' + leads); }
      var tools = val('tools');
      if (tools) { lines.push('CURRENT TOOLS: ' + tools); }
      lines.push('BUDGET: ' + (val('budget') || '—'));
      lines.push('TIMELINE: ' + (val('timeline') || '—'));
      var notes = val('notes');
      if (notes) { lines.push(''); lines.push('ADDITIONAL CONTEXT: ' + notes); }
      lines.push('');
      lines.push('Please confirm scope, price and ETA in writing before we start.');
      return lines.join('\n');
    }
    function render() {
      var text = build();
      if (out) out.textContent = text;
      if (waLink) waLink.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);
    }
    form.addEventListener('input', render);
    form.addEventListener('change', render);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      render();
      var text = build();
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var text = build();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { toast('Brief copied — paste it into WhatsApp'); },
            function () { toast('Copy failed — select the brief text manually'); });
        } else {
          toast('Copy not supported in this browser');
        }
      });
    }
    render();
  }

  /* ------------------------------------------------------------------ 11 */
  function initCurrency() {
    var btns = $$('[data-cur-btn]');
    if (!btns.length) return;
    function set(cur) {
      document.body.setAttribute('data-currency', cur);
      btns.forEach(function (b) {
        var on = b.getAttribute('data-cur-btn') === cur;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      try { localStorage.setItem('trl-currency', cur); } catch (e) {}
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () { set(b.getAttribute('data-cur-btn')); });
    });
    var saved = null;
    try { saved = localStorage.getItem('trl-currency'); } catch (e) {}
    set(saved === 'pkr' || saved === 'usd' ? saved : 'usd');
  }

  /* ------------------------------------------------------------------ 12 */
  function initMisc() {
    var top = $('.to-top');
    if (top) {
      window.addEventListener('scroll', function () {
        top.classList.toggle('show', window.scrollY > 700);
      }, { passive: true });
      top.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    }

    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    var timeline = $('.timeline');
    if (timeline) {
      var update = function () {
        var r = timeline.getBoundingClientRect();
        var vh = window.innerHeight;
        var p = (vh * 0.75 - r.top) / (r.height * 0.9);
        timeline.style.setProperty('--tl-progress', Math.max(0, Math.min(p, 1)) * 100 + '%');
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
    }

    $$('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var text = btn.getAttribute('data-copy');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { toast('Copied'); }, function () { toast('Copy failed'); });
        }
      });
    });
  }

  /* ---------------------------------------------------------------- boot */
  function boot() {
    document.body.classList.add('app-ready');
    initTheme(); initNav(); initProgress(); initMarquee(); initReveal();
    initCounters(); initPointerFX(); initServiceFilter(); initFAQ();
    initWizard(); initCurrency(); initMisc();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
