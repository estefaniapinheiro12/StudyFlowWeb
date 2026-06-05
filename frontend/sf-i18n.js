/* StudyFlow — sf-i18n.js
   Motor de internacionalização.
   Uso: SF_I18N.t('chave')  →  string traduzida
   No HTML: <span data-i18n="chave"></span>  →  preenchido automaticamente */

(function () {
  const STORAGE_KEY = 'sf_lang';
  const FALLBACK    = 'pt';

  /* Idiomas disponíveis e seus rótulos para o seletor */
  const AVAILABLE = [
    { code: 'pt', label: 'PT', flag: '🇧🇷' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
  ];

  /* ── Estado ── */
  let current = localStorage.getItem(STORAGE_KEY) || FALLBACK;

  /* ── API pública ── */
  const SF_I18N = {

    /* Traduz uma chave; retorna a chave se não encontrar */
    t(key) {
      const dict = (window.SF_TRANSLATIONS || {})[current] || {};
      const fallbackDict = (window.SF_TRANSLATIONS || {})[FALLBACK] || {};
      return dict[key] || fallbackDict[key] || key;
    },

    /* Idioma atual */
    getLang() { return current; },

    /* Lista de idiomas disponíveis */
    getAvailable() { return AVAILABLE; },

    /* Muda idioma e re-renderiza a página */
    setLang(code) {
      if (!AVAILABLE.find(l => l.code === code)) return;
      current = code;
      localStorage.setItem(STORAGE_KEY, code);
      SF_I18N.apply();
      /* Dispara evento para que o código JS da página possa reagir */
      document.dispatchEvent(new CustomEvent('sf:langchange', { detail: { lang: code } }));
    },

    /* Aplica traduções a todos os elementos data-i18n na página */
    apply() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = SF_I18N.t(key);
        /* Preserva elementos filhos (ex: ícones SVG antes do texto) */
        if (el.childElementCount === 0) {
          el.textContent = val;
        } else {
          /* Substitui apenas nós de texto, mantém SVGs/spans filhos */
          for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              node.textContent = ' ' + val;
              break;
            }
          }
        }
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = SF_I18N.t(el.getAttribute('data-i18n-placeholder'));
      });
      /* Atualiza seletor visual, se existir */
      document.querySelectorAll('.sf-lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === current);
      });
    },

    /* Injeta o seletor de idioma em qualquer contêiner */
    renderSelector(container) {
      if (!container) return;
      container.innerHTML = '';
      AVAILABLE.forEach(({ code, label, flag }) => {
        const btn = document.createElement('button');
        btn.className = 'sf-lang-btn' + (code === current ? ' active' : '');
        btn.dataset.lang = code;
        btn.title = label;
        btn.innerHTML = `<span class="sf-lang-flag">${flag}</span><span class="sf-lang-code">${label}</span>`;
        btn.addEventListener('click', () => SF_I18N.setLang(code));
        container.appendChild(btn);
      });
    },
  };

  window.SF_I18N = SF_I18N;

  /* Auto-aplica quando o DOM estiver pronto */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SF_I18N.apply());
  } else {
    SF_I18N.apply();
  }
})();