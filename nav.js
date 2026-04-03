/* nomadic-horizon/nav.js – shared site behaviour */
(function () {
  'use strict';

  /* ── Sticky header shadow on scroll ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile nav toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  /* ── Mark active nav link based on current filename ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page) a.classList.add('active');
    else a.classList.remove('active');
  });

  /* ── Payment method toggle (booking.html) ── */
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => {
        o.classList.remove('selected');
        o.classList.add('idle');
        o.querySelector('.radio-dot')?.classList.remove('border-primary');
      });
      opt.classList.add('selected');
      opt.classList.remove('idle');
      opt.querySelector('.radio-dot')?.classList.add('border-primary');
    });
  });

  /* ── Login tab toggle ── */
  const loginTabs = document.querySelectorAll('.login-tab');
  const loginForms = document.querySelectorAll('.login-form-panel');
  loginTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      loginTabs.forEach(t => t.classList.remove('active-tab'));
      loginForms.forEach(f => f.classList.add('hidden'));
      tab.classList.add('active-tab');
      document.getElementById(target)?.classList.remove('hidden');
    });
  });

  /* ── Map: add stop button ── */
  const addStopBtn = document.querySelector('[data-action="add-stop"]');
  if (addStopBtn) {
    addStopBtn.addEventListener('click', () => {
      const container = document.querySelector('[data-stops]');
      if (!container) return;
      const count = container.children.length + 1;
      const card = document.createElement('div');
      card.className = 'bg-surface-container-lowest p-4 rounded-xl shadow-sm relative z-10';
      card.innerHTML = `<div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-tertiary-container">trip_origin</span>
        <div class="flex-1">
          <p class="text-xs text-on-surface-variant font-medium">Зогсоол ${count}</p>
          <input class="bg-transparent border-none focus:ring-0 w-full p-0 text-on-surface text-sm font-bold" placeholder="Газрын нэр оруулна уу" />
        </div>
        <button class="text-outline-variant hover:text-error transition-colors remove-stop">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>`;
      card.querySelector('.remove-stop').addEventListener('click', () => card.remove());
      container.appendChild(card);
    });
  }

  /* ── Remove stop buttons (pre-existing) ── */
  document.querySelectorAll('.remove-stop').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('[class*="bg-surface"]')?.remove());
  });

  /* ── Newsletter / footer email form ── */
  document.querySelectorAll('form[data-newsletter]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type=email]');
      const btn = form.querySelector('button[type=submit]');
      if (!input?.value) return;
      if (btn) { btn.textContent = 'Амжилттай!'; btn.disabled = true; }
      input.value = '';
    });
  });

  /* ── Booking form ── */
  const bookingBtn = document.querySelector('[data-action="confirm-payment"]');
  if (bookingBtn) {
    bookingBtn.addEventListener('click', () => {
      bookingBtn.textContent = '✓ Баталгаажлаа';
      bookingBtn.disabled = true;
      bookingBtn.style.opacity = '0.7';
    });
  }
})();
