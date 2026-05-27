/**
 * sf-profile.js — StudyFlow shared profile engine
 * Inclua este script em TODAS as páginas, logo após sf-theme.js:
 *   <script src="sf-theme.js"></script>
 *   <script src="sf-profile.js"></script>
 *
 * O que ele faz:
 *  1. Busca /api/perfil e atualiza nome, cargo e foto em TODA a sidebar
 *  2. Faz cache no localStorage (chave sf_perfil) para evitar flash
 *  3. Expõe window.SFProfile.load() e window.SFProfile.clear()
 *  4. Na dashboardPrincipal, atualiza também o greeting "Olá, <Nome>"
 */
(function () {
  'use strict';

  const API = 'https://studyflow-backend-9sqw.onrender.com';
  const CACHE_KEY = 'sf_perfil';
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

  /* ── helpers ─────────────────────────────────── */
  function getToken() {
    return localStorage.getItem('studyflow_token');
  }

  function authHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    };
  }

  /* ── aplica perfil na UI ─────────────────────── */
  function applyProfile(perfil) {
    if (!perfil) return;

    const nomeCompleto = [perfil.nome, perfil.sobrenome].filter(Boolean).join(' ') || 'Usuário';
    const curso = perfil.curso || '';
    const email = perfil.email || '';
    const foto = perfil.foto || null;

    /* --- Nome na sidebar --- */
    document.querySelectorAll('.sb-name').forEach(el => {
      el.textContent = nomeCompleto;
    });

    /* --- Cargo / curso na sidebar --- */
    document.querySelectorAll('.sb-role').forEach(el => {
      if (curso) el.textContent = curso;
    });

    /* --- Avatar na sidebar e na tela de perfil --- */
    document.querySelectorAll('.sb-avatar, .avatar-big').forEach(el => {
      if (foto) {
        el.style.backgroundImage = `url(${foto})`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
        /* Remove emoji/ícone interno sem quebrar o badge de edição */
        Array.from(el.childNodes).forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) child.remove();
          if (child.tagName === 'svg') child.remove();
        });
      } else {
        el.style.backgroundImage = '';
        /* Garante que a cor de destaque (sf_cor) ou o gradiente padrão seja mantido */
        const cor = localStorage.getItem('sf_cor');
        el.style.background = cor
          ? `linear-gradient(135deg, ${cor}, #7c3aed)`
          : 'linear-gradient(135deg, #4d8ef5, #7c3aed)';
      }
    });

    /* --- Tela de perfil: preenche campos se existirem --- */
    _setVal('f-nome', perfil.nome);
    _setVal('f-sobrenome', perfil.sobrenome);
    _setVal('f-curso', perfil.curso);
    _setVal('f-instituicao', perfil.instituicao);
    _setVal('f-bio', perfil.bio);
    _setVal('f-email', perfil.email);

    /* Avatar info block (tela de perfil) */
    document.querySelectorAll('.avatar-info h3').forEach(el => {
      el.textContent = nomeCompleto;
    });
    document.querySelectorAll('.avatar-info p').forEach(el => {
      el.textContent = email;
    });

    /* --- dashboardPrincipal: greeting "Olá, <Nome>" --- */
    const greetSpan = document.querySelector('.greeting h1 span');
    if (greetSpan) {
      const firstName = perfil.nome || nomeCompleto.split(' ')[0] || 'Estudante';
      greetSpan.textContent = firstName;
    }

    /* --- dashboardPrincipal: sb-name duplicado no top --- */
    const sbNameTop = document.querySelector('.sb-name');
    if (sbNameTop) sbNameTop.textContent = nomeCompleto;
  }

  function _setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.value = val;
  }

  /* ── cache ───────────────────────────────────── */
  function saveCache(perfil) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: perfil }));
    } catch (e) { /* quota exceeded — ignora */ }
  }

  function loadCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (Date.now() - obj.ts > CACHE_TTL) return null;
      return obj.data;
    } catch (e) { return null; }
  }

  /* ── busca perfil na API ─────────────────────── */
  async function fetchProfile() {
    if (!getToken()) return; // não autenticado — deixa a página redirecionar

    /* Aplica cache imediatamente para evitar flash de "Estefânia Pinheiro" hardcoded */
    const cached = loadCache();
    if (cached) applyProfile(cached);

    try {
      const res = await fetch(`${API}/api/perfil`, { headers: authHeaders() });
      if (res.status === 401) {
        // Token expirado — limpa cache e redireciona
        clear();
        window.location.href = 'login.html';
        return;
      }
      if (!res.ok) return;
      const perfil = await res.json();
      saveCache(perfil);
      applyProfile(perfil);

      /* Salva primeiro nome no localStorage para compatibilidade com código legado */
      if (perfil.nome) {
        localStorage.setItem('studyflow_nome', perfil.nome);
      }
    } catch (e) {
      /* Sem rede: usa cache silenciosamente */
    }
  }

  /* ── limpa cache (chamar no logout) ─────────── */
  function clear() {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem('studyflow_nome');
  }

  /* Invalida cache quando o perfil é salvo em outra aba */
  window.addEventListener('storage', function (e) {
    if (e.key === CACHE_KEY || e.key === 'studyflow_token') {
      fetchProfile();
    }
  });

  /* ── init ────────────────────────────────────── */
  function init() {
    /* Aplica cache antes do primeiro paint */
    const cached = loadCache();
    if (cached) applyProfile(cached);

    /* Busca dados frescos após DOM pronto */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fetchProfile);
    } else {
      fetchProfile();
    }
  }

  init();

  /* ── API pública ─────────────────────────────── */
  window.SFProfile = {
    load: fetchProfile,
    apply: applyProfile,
    clear: clear,
    invalidateCache: function () {
      localStorage.removeItem(CACHE_KEY);
    }
  };

})();