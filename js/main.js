/* Haziq Halidi portfolio: small, dependency-free behaviour (Bootstrap bundle handles collapse). */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Colour mode ---------- */
  var themeToggle = document.getElementById('theme-toggle');
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function storedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function applyTheme(theme) {
    root.setAttribute('data-bs-theme', theme);
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  applyTheme(root.getAttribute('data-bs-theme') || 'light');

  themeToggle.addEventListener('click', function () {
    var next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Follow the system setting until the visitor picks one manually.
  darkQuery.addEventListener('change', function (e) {
    if (!storedTheme()) applyTheme(e.matches ? 'dark' : 'light');
  });

  /* ---------- Marketer / Developer headline toggle ---------- */
  var hero = document.querySelector('.hero');
  var modeButtons = document.querySelectorAll('.segmented-btn[data-mode]');

  modeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      hero.setAttribute('data-mode', btn.dataset.mode);
      modeButtons.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
    });
  });

  /* ---------- Portrait placeholder until the photo exists ---------- */
  var portrait = document.querySelector('.portrait');
  var portraitImg = portrait && portrait.querySelector('img');
  if (portraitImg) {
    var markMissing = function () { portrait.classList.add('is-missing'); };
    if (portraitImg.complete && portraitImg.naturalWidth === 0) markMissing();
    else portraitImg.addEventListener('error', markMissing);
  }

  /* ---------- Navbar: border on scroll, collapse after a link click on mobile ---------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var navCollapse = document.getElementById('nav-links');
  var menuToggle = document.querySelector('.menu-toggle');
  navCollapse.addEventListener('show.bs.collapse', function () { menuToggle.setAttribute('aria-label', 'Close menu'); });
  navCollapse.addEventListener('hide.bs.collapse', function () { menuToggle.setAttribute('aria-label', 'Open menu'); });
  navCollapse.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  /* ---------- Experience filter ---------- */
  var filterButtons = document.querySelectorAll('.filter [data-filter]');
  var roles = document.querySelectorAll('.timeline .role');
  var filterStatus = document.getElementById('filter-status');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter;
      var shown = 0;
      roles.forEach(function (role) {
        var match = filter === 'all' || role.dataset.tags.split(' ').indexOf(filter) !== -1;
        role.hidden = !match;
        if (match) { shown++; role.classList.add('is-visible'); }
      });
      filterButtons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      filterStatus.textContent = 'Showing ' + shown + (shown === 1 ? ' role' : ' roles') +
        (filter === 'all' ? '' : ' tagged ' + btn.textContent.trim());
    });
  });

  /* ---------- Contact form: client-side validation only ---------- */
  var form = document.getElementById('contact-form');
  var formStatus = document.getElementById('form-status');

  if (form) form.addEventListener('submit', function (e) {
    var fields = form.querySelectorAll('.form-control');
    var firstInvalid = null;
    fields.forEach(function (field) {
      var valid = field.checkValidity() && field.value.trim() !== '';
      setFieldState(field, valid);
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      e.preventDefault();
      formStatus.textContent = 'Please fix the highlighted fields.';
      firstInvalid.focus();
      return;
    }

    // Until a real endpoint is set, don't post to a placeholder URL.
    if (form.getAttribute('action').indexOf('[FORM_ENDPOINT]') !== -1) {
      e.preventDefault();
      formStatus.textContent = 'The form is not connected yet. Please email haziqimac@gmail.com instead.';
    }
  });

  if (form) form.addEventListener('input', function (e) {
    var field = e.target;
    if (field.classList.contains('is-invalid') && field.checkValidity() && field.value.trim() !== '') {
      setFieldState(field, true);
    }
  });

  // The error text is only linked to the field while it's showing, so it isn't read out on valid fields.
  function setFieldState(field, valid) {
    field.classList.toggle('is-invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));
    if (valid) field.removeAttribute('aria-describedby');
    else field.setAttribute('aria-describedby', field.dataset.errorId);
  }

  /* ---------- Scroll reveal (the current page's nav link is marked in the HTML) ---------- */
  if ('IntersectionObserver' in window) {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealEls = document.querySelectorAll('.reveal');

    if (reduceMotion) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var revealer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealEls.forEach(function (el) { revealer.observe(el); });
    }
  }
})();
