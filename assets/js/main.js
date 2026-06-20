(function () {
  'use strict';

  const scriptUrl = new URL(document.currentScript.src);
  const root = new URL('../../', scriptUrl);
  const path = (relativePath) => new URL(relativePath, root).href;
  const page = document.body.dataset.page || '';

  const icon = (name) => {
    const icons = {
      chevron: '<svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
      map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
      clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
      phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z"/></svg>',
      whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.6 6L.2 24l6.4-1.7c1.7.9 3.6 1.4 5.5 1.4 6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.2-3.4-8.4Zm-8.4 18.2c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.8 1 1-3.7-.2-.4a9.7 9.7 0 1 1 8.3 4.6Zm5.3-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.6.1-.2.1-.4 0-.6l-.9-2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.1.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.2-.1-.4-.2-.7-.3Z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
      youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12s0-4-1-5c-.6-.7-1.3-.9-2.2-1C17.2 5.8 12 5.8 12 5.8s-5.2 0-6.8.2C4.3 6.1 3.6 6.3 3 7c-1 1-1 5-1 5s0 4 1 5c.6.7 1.3.9 2.2 1 1.6.2 6.8.2 6.8.2s5.2 0 6.8-.2c.9-.1 1.6-.3 2.2-1 1-1 1-5 1-5Z"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none"/></svg>',
      arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 15 6-6 6 6"/></svg>'
    };
    return icons[name] || '';
  };

  const ministries = [
    ['Infantil', 'infantil.html', 'infantil'],
    ['Mensageiras do Rei', 'mensageiras-do-rei.html', 'mensageiras'],
    ['Moças', 'mocas.html', 'mocas'],
    ['Mulheres em Missão', 'mulheres-em-missao.html', 'mulheres'],
    ['Embaixadores do Rei', 'embaixadores-do-rei.html', 'embaixadores'],
    ['Jovens e Adolescentes', 'jovens-e-adolescentes.html', 'jovens'],
    ['Homens', 'homens.html', 'homens'],
    ['Ministério de Louvor J4', 'louvor-j4.html', 'louvor']
  ];

  const header = document.querySelector('[data-site-header]');
  if (header) {
    const ministryLinks = ministries.map(([label, file, key]) =>
      `<a class="${page === key ? 'active' : ''}" href="${path(`pages/ministerios/${file}`)}">${label}</a>`
    ).join('');

    header.innerHTML = `
      <header class="site-header" id="site-header">
        <div class="container header-inner">
          <a class="brand" href="${path('index.html')}" aria-label="Igreja Batista Calvário — início">
            <img src="${path('assets/images/brand/logo-ibc.webp')}" alt="Igreja Batista Calvário Cuiabá">
          </a>
          <button class="nav-toggle" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="Abrir menu"><span></span></button>
          <nav class="main-nav" id="main-nav" aria-label="Navegação principal">
            <ul class="nav-list">
              <li><a class="nav-link ${page === 'inicio' ? 'active' : ''}" href="${path('index.html')}">Início</a></li>
              <li><a class="nav-link ${page === 'sobre' ? 'active' : ''}" href="${path('pages/sobre.html')}">Sobre nós</a></li>
              <li class="nav-item ${ministries.some(([, , key]) => key === page) || page === 'ministerios' ? 'active' : ''}">
                <a class="nav-trigger" href="${path('pages/ministerios.html')}">Ministérios ${icon('chevron')}</a>
                <div class="dropdown">${ministryLinks}</div>
              </li>
              <li><a class="nav-link ${page === 'agenda' ? 'active' : ''}" href="${path('pages/agenda.html')}">Agenda</a></li>
              <li><a class="nav-link ${page === 'doutrina' ? 'active' : ''}" href="${path('pages/declaracao-doutrinaria.html')}">No que cremos</a></li>
              <li><a class="nav-link ${page === 'contato' ? 'active' : ''}" href="${path('pages/contato.html')}">Contato</a></li>
            </ul>
          </nav>
          <a class="btn btn-primary header-cta" href="${path('pages/contato.html')}">Planeje sua visita</a>
        </div>
      </header>`;
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-main">
          <div class="footer-brand">
            <img src="${path('assets/images/brand/logo-ibc.webp')}" alt="Igreja Batista Calvário Cuiabá">
            <p>Uma comunidade de fé, adoração, ensino bíblico e comunhão servindo Cuiabá desde 1987.</p>
            <div class="social-links">
              <a href="https://www.instagram.com/ibcalvariocuiaba/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Igreja Batista Calvário">${icon('instagram')}</a>
              <a href="https://www.youtube.com/@ibcalvariocuiaba" target="_blank" rel="noopener noreferrer" aria-label="YouTube da Igreja Batista Calvário">${icon('youtube')}</a>
              <a href="https://wa.me/5565999937163" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Igreja Batista Calvário">${icon('whatsapp')}</a>
            </div>
          </div>
          <div>
            <h2 class="footer-title">Navegue</h2>
            <ul class="footer-links">
              <li><a href="${path('pages/sobre.html')}">Sobre nós</a></li>
              <li><a href="${path('pages/ministerios.html')}">Ministérios</a></li>
              <li><a href="${path('pages/agenda.html')}">Horários</a></li>
              <li><a href="${path('pages/declaracao-doutrinaria.html')}">No que cremos</a></li>
              <li><a href="${path('pages/contato.html')}">Contato</a></li>
            </ul>
          </div>
          <div>
            <h2 class="footer-title">Venha nos visitar</h2>
            <address class="footer-address">
              <span>Rua Trinta, 7, Quadra 74<br>Santa Cruz, Cuiabá — MT<br>CEP 78077-132</span>
              <a href="tel:+5565999937163">(65) 99993-7163</a>
              <span>Pr. Arcelino</span>
            </address>
          </div>
          <div class="footer-partners">
            <h2 class="footer-title">Cooperação Batista</h2>
            <div class="partner-logos">
              <a href="https://convencaobatista.com.br/" target="_blank" rel="noopener noreferrer" aria-label="Convenção Batista Brasileira">
                <img src="${path('assets/images/brand/logo-cbb.webp')}" alt="Convenção Batista Brasileira">
              </a>
              <a href="https://batistasmt.org.br/" target="_blank" rel="noopener noreferrer" aria-label="Convenção Batista de Mato Grosso">
                <img src="${path('assets/images/brand/logo-cbmt.webp')}" alt="Convenção Batista de Mato Grosso">
              </a>
            </div>
          </div>
        </div>
        <div class="container footer-bottom">
          <span>© <span data-current-year></span> Igreja Batista Calvário. Todos os direitos reservados.</span>
          <span class="footer-credit">Designed by: <strong>Fábio Rockeiro Studio Software &amp; Sounds</strong></span>
        </div>
      </footer>
      <button class="back-to-top" type="button" aria-label="Voltar ao topo">${icon('arrowUp')}</button>
      <a class="floating-whatsapp" href="https://wa.me/5565999937163?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Igreja%20Batista%20Calv%C3%A1rio." target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp">${icon('whatsapp')}</a>`;
  }

  document.querySelectorAll('[data-icon]').forEach((element) => {
    element.innerHTML = icon(element.dataset.icon);
  });

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    const closeNav = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
      mainNav.classList.remove('open');
      document.body.classList.remove('nav-open');
    };
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      mainNav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
    });
    mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeNav();
    });
  }

  const headerElement = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');
  const updateScrollState = () => {
    const scrolled = window.scrollY > 24;
    headerElement?.classList.toggle('scrolled', scrolled);
    backToTop?.classList.toggle('visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  }

  const recurringServices = [
    { day: 0, hour: 8, minute: 30, title: 'EBD — Escola Bíblica Discipuladora' },
    { day: 0, hour: 18, minute: 30, title: 'Culto Evangelístico da Família' },
    { day: 1, hour: 19, minute: 30, title: 'Culto nos Lares' },
    { day: 2, hour: 19, minute: 30, title: 'Embaixadores do Rei' },
    { day: 3, hour: 19, minute: 30, title: 'Culto de Ensino' },
    { day: 4, hour: 19, minute: 0, title: 'Mensageiras do Rei' }
  ];

  const findNextService = () => {
    const now = new Date();
    const candidates = recurringServices.map((service) => {
      const date = new Date(now);
      let daysAhead = (service.day - now.getDay() + 7) % 7;
      date.setHours(service.hour, service.minute, 0, 0);
      if (daysAhead === 0 && date <= now) daysAhead = 7;
      date.setDate(now.getDate() + daysAhead);
      return { ...service, date };
    });
    return candidates.sort((a, b) => a.date - b.date)[0];
  };

  const nextServiceName = document.querySelector('[data-next-service-name]');
  if (nextServiceName) {
    const service = findNextService();
    const dateText = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }).format(service.date);
    nextServiceName.textContent = service.title;
    document.querySelector('[data-next-service-time]').textContent = `${String(service.hour).padStart(2, '0')}:${String(service.minute).padStart(2, '0')}`;
    document.querySelector('[data-next-service-date]').textContent = dateText.charAt(0).toUpperCase() + dateText.slice(1);
  }

  document.querySelectorAll('[data-copy-pix]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('24.770.083/0001-66');
        const original = button.textContent;
        button.textContent = 'PIX copiado!';
        setTimeout(() => { button.textContent = original; }, 2000);
      } catch (_error) {
        button.textContent = 'CNPJ: 24.770.083/0001-66';
      }
    });
  });
})();
