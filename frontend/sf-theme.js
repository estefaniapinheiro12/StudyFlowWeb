/**
 * sf-theme.js — StudyFlow shared theme engine
 * Inclua este script em TODAS as páginas, logo após o <style> e antes do </head>:
 *   <script src="sf-theme.js"></script>
 *
 * Ele aplica instantaneamente (sem flash):
 *  1. Dark / Light mode  (localStorage: sf_darkmode)
 *  2. Cor de destaque    (localStorage: sf_cor)
 *  3. Animações reduzidas (localStorage: sf_anim)
 *
 * Também expõe window.SFTheme.apply() para re-aplicar a qualquer momento.
 */
(function () {
  'use strict';

  /* ── helpers ─────────────────────────────────── */
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const n = parseInt(hex, 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  }

  function setCssVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  /* ── main apply ──────────────────────────────── */
  function apply() {
    /* 1 ── dark / light */
    const dark = localStorage.getItem('sf_darkmode') !== 'false';
    document.body.classList.toggle('light-mode', !dark);

    /* 2 ── accent color */
    const cor = localStorage.getItem('sf_cor');
    if (cor) {
      const rgb = hexToRgb(cor);

      /* CSS variable principal usada em toda a UI */
      setCssVar('--blue', cor);

      /* Cursor */
      const cursor = document.getElementById('cursor');
      if (cursor) cursor.style.background = cor;

      /* Cursor ring (border-color inline não sobrescreve CSS var, forçamos) */
      const ring = document.getElementById('cursor-ring');
      if (ring) ring.style.borderColor = `rgba(${rgb},.35)`;

      /* Sidebar item ativo */
      document.querySelectorAll('.sb-item.active').forEach(el => {
        el.style.color = cor;
        el.style.borderLeftColor = cor;
        el.style.background = `rgba(${rgb},.07)`;
      });

      /* Logo "Flow" */
      document.querySelectorAll('.sb-logo-text em').forEach(el => {
        el.style.color = cor;
      });

      /* streak number */
      document.querySelectorAll('.streak-num').forEach(el => {
        el.style.color = cor; // mantém âmbar se não houver sf_cor — mas respeita a escolha
      });

      /* Botões primários com gradiente blue→violet */
      document.querySelectorAll('.btn-save, .btn-new, .tbtn-primary, .mbtn-save, .btn-create').forEach(el => {
        el.style.background = `linear-gradient(135deg, ${cor}, #7c3aed)`;
        el.style.boxShadow = `0 4px 20px rgba(${rgb},.28)`;
      });

      /* Avatar e logo-mark quando sem foto */
      document.querySelectorAll('.sb-avatar, .avatar-big').forEach(el => {
        if (!el.style.backgroundImage || el.style.backgroundImage === 'none') {
          el.style.background = `linear-gradient(135deg, ${cor}, #7c3aed)`;
        }
      });

      /* Chips / tabs ativos */
      document.querySelectorAll('.tab.active, .ptab.active, .vtab.active').forEach(el => {
        el.style.color = cor;
        el.style.borderColor = `rgba(${rgb},.35)`;
      });

      /* chip padrão ativo (.chip.active sem classe de cor específica) */
      document.querySelectorAll('.chip.active:not(.ca):not(.cb):not(.cc)').forEach(el => {
        el.style.background = `rgba(${rgb},.1)`;
        el.style.borderColor = `rgba(${rgb},.28)`;
        el.style.color = cor;
      });

      /* Anel principal do progresso (linear gradient no SVG usa stop-color) */
      document.querySelectorAll('#ringGrad stop:first-child, #rg stop:first-child').forEach(el => {
        el.setAttribute('stop-color', cor);
      });

      /* Tags de matéria (.tag-materia) */
      document.querySelectorAll('.tag-materia').forEach(el => {
        el.style.background = `rgba(${rgb},.1)`;
        el.style.color = cor;
        el.style.borderColor = `rgba(${rgb},.15)`;
      });

      /* inputs em foco — sobrescreve a cor do caret e border */
      const style = document.getElementById('sf-theme-dyn') || document.createElement('style');
      style.id = 'sf-theme-dyn';
      style.textContent = `
        :root { --blue: ${cor} !important; }
        input:focus, select:focus, textarea:focus {
          border-color: ${cor} !important;
          box-shadow: 0 0 0 3px rgba(${rgb},.10) !important;
          caret-color: ${cor} !important;
        }
        .task-check:hover, .sub-check:hover { border-color: ${cor} !important; }
        .hm-day.l1 { background: rgba(${rgb},.20) !important; }
        .hm-day.l2 { background: rgba(${rgb},.45) !important; }
        .hm-day.l3 { background: rgba(${rgb},.70) !important; }
        .hm-day.l4 { background: ${cor} !important; }
        .wd-bar { background: linear-gradient(90deg, ${cor}, #06d6c0) !important; }
        .sb-item.active { color: ${cor} !important; border-left-color: ${cor} !important; background: rgba(${rgb},.07) !important; }
        .card-action { color: ${cor} !important; }
        .today-btn:hover { border-color: ${cor} !important; color: ${cor} !important; }
        .mini-day.today { background: ${cor} !important; }
        .mini-day.in-week { background: rgba(${rgb},.10) !important; color: ${cor} !important; }
        .week-day.today { background: rgba(${rgb},.08) !important; border-color: rgba(${rgb},.25) !important; }
        .week-day.today .wd-num { color: ${cor} !important; }
        .dh-cell.today .dh-name { color: ${cor} !important; }
        .dh-cell.today .dh-num { background: ${cor} !important; }
        .now-line { background: ${cor} !important; }
        .now-circle { background: ${cor} !important; }
        .mbtn-save, .btn-create, .btn-new, .btn-save, .tbtn-primary {
          background: linear-gradient(135deg, ${cor}, #7c3aed) !important;
        }
        .add-sub-btn { background: rgba(${rgb},.1) !important; border-color: rgba(${rgb},.2) !important; color: ${cor} !important; }
        .bact-save { background: rgba(${rgb},.1) !important; border-color: rgba(${rgb},.2) !important; color: ${cor} !important; }
        .dp-edit { background: rgba(${rgb},.1) !important; border-color: rgba(${rgb},.2) !important; color: ${cor} !important; }
        .btn-sm-primary { background: rgba(${rgb},.12) !important; border-color: rgba(${rgb},.2) !important; color: ${cor} !important; }
        .search-input:focus { border-color: ${cor} !important; }
        .notif-btn:hover { border-color: rgba(${rgb},.4) !important; }
      `;
      document.head.appendChild(style);
    }

    /* 3 ── animações reduzidas */
    const animReduzida = localStorage.getItem('sf_anim') === 'true';
    if (animReduzida) {
      setCssVar('--anim-dur', '0s');
      document.documentElement.style.setProperty('--transition-speed', '0s');
    }
  }

  /* Aplica imediatamente (antes do primeiro paint) */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

  /* Expõe para uso manual */
  window.SFTheme = { apply };

  /* Escuta mudanças de storage (ex: aba configurações salva, outra aba atualiza) */
  window.addEventListener('storage', function (e) {
    if (e.key === 'sf_darkmode' || e.key === 'sf_cor' || e.key === 'sf_anim') {
      apply();
    }
  });
})();