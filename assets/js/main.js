/* =============================================
   PONY PARTY - Main JavaScript
   ============================================= */

'use strict';

// =============================================
// THEME MANAGER
// =============================================
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('pp-theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = saved || system;
    this.apply(theme);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('pp-theme')) {
        this.apply(e.matches ? 'dark' : 'light');
      }
    });
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pp-theme', next);
    this.apply(next);
  }
};

// =============================================
// RTL MANAGER
// =============================================
const RTLManager = {
  init() {
    const saved = localStorage.getItem('pp-rtl') === 'true';
    if (saved) this.apply(true);

    document.querySelectorAll('.rtl-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
      this.updateBtn(btn, saved);
    });
  },

  apply(isRTL) {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.querySelectorAll('.rtl-toggle').forEach(btn => this.updateBtn(btn, isRTL));
  },

  updateBtn(btn, isRTL) {
    btn.textContent = isRTL ? 'LTR' : 'RTL';
  },

  toggle() {
    const current = document.documentElement.getAttribute('dir') === 'rtl';
    const next = !current;
    localStorage.setItem('pp-rtl', next);
    this.apply(next);
  }
};

// =============================================
// HEADER / NAVIGATION
// =============================================
const Header = {
  init() {
    this.header = document.querySelector('.site-header');
    this.hamburger = document.querySelector('.hamburger');
    this.mobileMenu = document.querySelector('.mobile-menu');

    if (this.header) {
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    if (this.hamburger && this.mobileMenu) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });
    }

    // Active nav link
    this.setActiveLink();
  },

  handleScroll() {
    if (window.scrollY > 50) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
  },

  toggleMenu() {
    const isOpen = this.mobileMenu.classList.contains('open');
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  },

  openMenu() {
    this.mobileMenu.classList.add('open');
    this.hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeMenu() {
    this.mobileMenu.classList.remove('open');
    this.hamburger.classList.remove('active');
    document.body.style.overflow = '';
  },

  setActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === current || href.endsWith(current))) {
        link.classList.add('active');
      }
    });
  }
};

// =============================================
// SCROLL ANIMATIONS
// =============================================
const ScrollAnimations = {
  init() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
  }
};

// =============================================
// BACK TO TOP
// =============================================
const BackToTop = {
  init() {
    this.btn = document.querySelector('.back-to-top');
    if (!this.btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        this.btn.classList.add('visible');
      } else {
        this.btn.classList.remove('visible');
      }
    }, { passive: true });

    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

// =============================================
// FAQ ACCORDION
// =============================================
const FAQ = {
  init() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

        // Open clicked if was closed
        if (!isOpen) item.classList.add('open');
      });
    });
  }
};

// =============================================
// FORM VALIDATION
// =============================================
const FormValidator = {
  rules: {
    required: (val) => val.trim() !== '' || 'This field is required.',
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Please enter a valid email address.',
    minLength: (min) => (val) => val.length >= min || `Minimum ${min} characters required.`,
    match: (fieldId) => (val, form) => {
      const other = form.querySelector(`#${fieldId}`);
      return !other || val === other.value || 'Passwords do not match.';
    }
  },

  validate(form) {
    let valid = true;
    form.querySelectorAll('[data-validate]').forEach(field => {
      const rules = field.dataset.validate.split('|');
      const errorEl = form.querySelector(`[data-error="${field.id}"]`);
      let fieldValid = true;
      let errorMsg = '';

      for (const rule of rules) {
        if (rule === 'required') {
          const result = this.rules.required(field.value);
          if (result !== true) { errorMsg = result; fieldValid = false; break; }
        } else if (rule === 'email') {
          const result = this.rules.email(field.value);
          if (result !== true) { errorMsg = result; fieldValid = false; break; }
        } else if (rule.startsWith('min:')) {
          const min = parseInt(rule.split(':')[1]);
          const result = this.rules.minLength(min)(field.value);
          if (result !== true) { errorMsg = result; fieldValid = false; break; }
        } else if (rule.startsWith('match:')) {
          const id = rule.split(':')[1];
          const result = this.rules.match(id)(field.value, form);
          if (result !== true) { errorMsg = result; fieldValid = false; break; }
        }
      }

      if (!fieldValid) {
        field.classList.add('error');
        if (errorEl) { errorEl.textContent = errorMsg; errorEl.style.display = 'block'; }
        valid = false;
      } else {
        field.classList.remove('error');
        if (errorEl) { errorEl.style.display = 'none'; }
      }
    });

    return valid;
  },

  initLive(form) {
    form.querySelectorAll('[data-validate]').forEach(field => {
      field.addEventListener('blur', () => this.validateField(field, form));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) this.validateField(field, form);
      });
    });
  },

  validateField(field, form) {
    const rules = field.dataset.validate.split('|');
    const errorEl = form.querySelector(`[data-error="${field.id}"]`);
    let fieldValid = true;
    let errorMsg = '';

    for (const rule of rules) {
      if (rule === 'required') {
        const result = this.rules.required(field.value);
        if (result !== true) { errorMsg = result; fieldValid = false; break; }
      } else if (rule === 'email') {
        const result = this.rules.email(field.value);
        if (result !== true) { errorMsg = result; fieldValid = false; break; }
      } else if (rule.startsWith('min:')) {
        const min = parseInt(rule.split(':')[1]);
        const result = this.rules.minLength(min)(field.value);
        if (result !== true) { errorMsg = result; fieldValid = false; break; }
      } else if (rule.startsWith('match:')) {
        const id = rule.split(':')[1];
        const result = this.rules.match(id)(field.value, form);
        if (result !== true) { errorMsg = result; fieldValid = false; break; }
      }
    }

    if (!fieldValid) {
      field.classList.add('error');
      if (errorEl) { errorEl.textContent = errorMsg; errorEl.style.display = 'block'; }
    } else {
      field.classList.remove('error');
      if (errorEl) { errorEl.style.display = 'none'; }
    }
  },

  initForms() {
    document.querySelectorAll('form[data-form]').forEach(form => {
      this.initLive(form);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.validate(form)) {
          Toast.show('Message sent successfully! We\'ll be in touch soon. 🐴', 'success');
          form.reset();
        }
      });
    });
  }
};

// =============================================
// PASSWORD TOGGLE
// =============================================
const PasswordToggle = {
  init() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.querySelector('#' + btn.dataset.target);
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.textContent = isPassword ? '🙈' : '👁️';
      });
    });
  }
};

// =============================================
// TOAST NOTIFICATIONS
// =============================================
const Toast = {
  show(message, type = '') {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
};

// =============================================
// COUNTDOWN TIMER (Coming Soon)
// =============================================
const Countdown = {
  init() {
    const el = document.querySelector('.countdown');
    if (!el) return;

    const target = new Date();
    target.setDate(target.getDate() + 45);

    const tick = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return;

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      const items = el.querySelectorAll('.countdown-num');
      if (items[0]) items[0].textContent = String(d).padStart(2, '0');
      if (items[1]) items[1].textContent = String(h).padStart(2, '0');
      if (items[2]) items[2].textContent = String(m).padStart(2, '0');
      if (items[3]) items[3].textContent = String(s).padStart(2, '0');
    };

    tick();
    setInterval(tick, 1000);
  }
};

// =============================================
// COUNTER ANIMATION
// =============================================
const Counter = {
  init() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  },

  animate(el) {
    const target = parseInt(el.dataset.count);
    const duration = 1800;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
};

// =============================================
// ADDON SELECTOR
// =============================================
const AddonSelector = {
  init() {
    document.querySelectorAll('.addon-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('selected');
        this.updateTotal();
      });
    });
  },

  updateTotal() {
    const selected = document.querySelectorAll('.addon-card.selected');
    const totalEl = document.querySelector('.addons-total');
    if (!totalEl) return;

    let total = 0;
    selected.forEach(card => {
      const price = parseFloat(card.dataset.price || 0);
      total += price;
    });
    totalEl.textContent = `$${total.toFixed(0)}`;
  }
};

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }
};

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  RTLManager.init();
  Header.init();
  ScrollAnimations.init();
  BackToTop.init();
  FAQ.init();
  FormValidator.initForms();
  PasswordToggle.init();
  Countdown.init();
  Counter.init();
  AddonSelector.init();
  SmoothScroll.init();
});
