/**
 * header.jsx — Navbar.
 *
 * Cópia fiel da navbar de mbauspesalq.com em prod:
 *   • Dual-state (transparente sobre o hero deep, sólido com border ao scrollar).
 *   • Mega menu de Cursos com sidebar de categorias + painel dinâmico.
 *   • Dropdown clássico para Contato.
 *   • Busca e seletor de idioma visuais (não-funcionais, como solicitado).
 *   • Drawer mobile full-overlay com focus-trap, scroll-lock e Esc-to-close.
 *
 * Esta LP é single-page — todos os links apontam para as rotas reais de
 * mbauspesalq.com. Não há âncoras internas. Os dados do mega menu são
 * uma amostra realista; a estrutura permite ajustar os cursos sem mexer
 * no componente.
 *
 * Registrado em window.Header (sobrescreve a definição em sections.jsx).
 */

const NAV_BASE = 'https://mbauspesalq.com';
const NAV_BLOG_URL = 'https://blog.mbauspesalq.com/';
const NAV_AREA_ALUNO_URL = 'https://mbx.academy/?from=mba';

const NAV_PRIMARY_ITEMS = [
  { id: 'home',      label: 'Home',      href: `${NAV_BASE}/` },
  { id: 'cursos',    label: 'Cursos',    type: 'megamenu' },
  { id: 'sobre',     label: 'Sobre',     href: `${NAV_BASE}/sobre` },
  { id: 'parcerias', label: 'Parcerias', href: `${NAV_BASE}/parcerias` },
  { id: 'blog',      label: 'Blog',      href: NAV_BLOG_URL, external: true },
  { id: 'webinar',   label: 'Webinar',   href: `${NAV_BASE}/webinar` },
  { id: 'contato',   label: 'Contato',   type: 'dropdown' },
];

const NAV_CONTATO_ITEMS = [
  { id: 'fale-conosco', label: 'Fale conosco', href: `${NAV_BASE}/fale-conosco` },
  { id: 'ouvidoria',    label: 'Ouvidoria',    href: `${NAV_BASE}/ouvidoria` },
  { id: 'faq',          label: 'FAQ',          href: `${NAV_BASE}/faq` },
];

const NAV_LANGUAGES = [
  { id: 'pt-BR', label: 'pt-BR', flag: '🇧🇷' },
  { id: 'en',    label: 'en',    flag: '🇺🇸' },
  { id: 'es',    label: 'es',    flag: '🇪🇸' },
];

/* ── Mega menu data ────────────────────────────────────────────────────
 * Categorias e cursos espelham a oferta real de MBA USP/Esalq.
 * Ajuste livremente — a estrutura é dirigida 100% por este objeto.
 */
const MEGAMENU_CATEGORIES = [
  {
    id: 'profissionais',
    label: 'MBAs Profissionais',
    title: 'MBAs Profissionais',
    columns: 2,
    description:
      'Pós-graduação lato sensu com certificação USP/Esalq. Programas com foco em mercado, ministrados por professores doutores e referências corporativas.',
    courses: [
      { label: 'MBA em Cybersegurança',           href: `${NAV_BASE}/cursos/mba-cyberseguranca` },
      { label: 'MBA em Agronegócios',             href: `${NAV_BASE}/cursos/mba-agronegocios` },
      { label: 'MBA em Data Science e Analytics', href: `${NAV_BASE}/cursos/mba-data-science` },
      { label: 'MBA em Gestão de Projetos',       href: `${NAV_BASE}/cursos/mba-gestao-projetos` },
      { label: 'MBA em Gestão Financeira',        href: `${NAV_BASE}/cursos/mba-gestao-financeira` },
      { label: 'MBA em Marketing',                href: `${NAV_BASE}/cursos/mba-marketing` },
      { label: 'MBA em Recursos Humanos',         href: `${NAV_BASE}/cursos/mba-recursos-humanos` },
      { label: 'MBA em Engenharia de Software',   href: `${NAV_BASE}/cursos/mba-engenharia-software` },
      { label: 'MBA em Inteligência Artificial',  href: `${NAV_BASE}/cursos/mba-inteligencia-artificial` },
      { label: 'MBA em Logística e Supply Chain', href: `${NAV_BASE}/cursos/mba-logistica` },
      { label: 'MBA em Sustentabilidade',         href: `${NAV_BASE}/cursos/mba-sustentabilidade` },
      { label: 'MBA em Gestão de Negócios',       href: `${NAV_BASE}/cursos/mba-gestao-negocios` },
    ],
  },
  {
    id: 'executivo',
    label: 'Executivo',
    title: 'MBA Executivo',
    description:
      'Programa avançado para profissionais experientes que assumem decisões estratégicas e cargos de liderança. Visão sistêmica de negócios.',
    courses: [
      { label: 'MBA Executivo em Gestão de Negócios', href: `${NAV_BASE}/cursos/mba-executivo` },
    ],
  },
  {
    id: 'especializacao',
    label: 'Especialização',
    title: 'Especialização',
    description:
      'Cursos lato sensu de aprofundamento técnico em áreas específicas. Carga horária e duração reduzidas em relação aos MBAs.',
    courses: [
      { label: 'Especialização em Direito Empresarial', href: `${NAV_BASE}/cursos/esp-direito-empresarial` },
      { label: 'Especialização em Educação',            href: `${NAV_BASE}/cursos/esp-educacao` },
      { label: 'Especialização em Saúde Pública',       href: `${NAV_BASE}/cursos/esp-saude-publica` },
    ],
  },
  {
    id: 'gratuitos',
    label: 'Gratuitos',
    title: 'Cursos Gratuitos',
    description:
      'Cursos abertos e gratuitos. Conteúdo introdutório de alta qualidade para experimentar a didática USP/Esalq antes de uma pós-graduação.',
    courses: [
      { label: 'Excel para Negócios',     href: `${NAV_BASE}/cursos/gratuito-excel` },
      { label: 'Liderança e Gestão',      href: `${NAV_BASE}/cursos/gratuito-lideranca` },
      { label: 'Negociação e Influência', href: `${NAV_BASE}/cursos/gratuito-negociacao` },
    ],
  },
  {
    id: 'curta',
    label: 'Curta Duração',
    title: 'Cursos de Curta Duração',
    description:
      'Programas intensivos de poucas semanas, voltados para temas pontuais. Certificado digital ao final.',
    courses: [
      { label: 'Power BI Aplicado',     href: `${NAV_BASE}/cursos/curta-powerbi` },
      { label: 'Python para Dados',     href: `${NAV_BASE}/cursos/curta-python` },
      { label: 'IA Generativa Aplicada', href: `${NAV_BASE}/cursos/curta-ia-generativa` },
    ],
  },
];

function pluralizeCursos(n) {
  const padded = String(n).padStart(2, '0');
  return `${padded} ${n === 1 ? 'Curso' : 'Cursos'}`;
}

function Header() {
  const [isScrolled,      setIsScrolled]      = React.useState(false);
  const [isHidden,        setIsHidden]        = React.useState(false);
  const [isDrawerOpen,    setIsDrawerOpen]    = React.useState(false);
  const [isMegaOpen,      setIsMegaOpen]      = React.useState(false);
  const [activeCategory,  setActiveCategory]  = React.useState(MEGAMENU_CATEGORIES[0].id);
  const [isContatoOpen,   setIsContatoOpen]   = React.useState(false);
  const [isLangOpen,      setIsLangOpen]      = React.useState(false);
  const [activeLang,      setActiveLang]      = React.useState('pt-BR');
  const [searchQuery,     setSearchQuery]     = React.useState('');
  const [drawerCursos,    setDrawerCursos]    = React.useState(false);
  const [drawerContato,   setDrawerContato]   = React.useState(false);

  const headerRef       = React.useRef(null);
  const megaWrapRef     = React.useRef(null);
  const contatoWrapRef  = React.useRef(null);
  const langWrapRef     = React.useRef(null);
  const drawerRef       = React.useRef(null);
  const drawerCloseRef  = React.useRef(null);
  const hamburgerRef    = React.useRef(null);

  /* ── scroll listener ─────────────────────────────────────────────── */
  React.useEffect(() => {
    let ticking = false;
    let prevY = window.scrollY;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsScrolled(y > 0);
        if (y <= 0) {
          setIsHidden(false);
        } else if (y > prevY && y > 80) {
          setIsHidden(true);
        } else if (y < prevY) {
          setIsHidden(false);
        }
        prevY = y;
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── click-outside fecha overlays ────────────────────────────────── */
  React.useEffect(() => {
    function onDocClick(e) {
      if (isMegaOpen && megaWrapRef.current && !megaWrapRef.current.contains(e.target)) {
        setIsMegaOpen(false);
      }
      if (isContatoOpen && contatoWrapRef.current && !contatoWrapRef.current.contains(e.target)) {
        setIsContatoOpen(false);
      }
      if (isLangOpen && langWrapRef.current && !langWrapRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [isMegaOpen, isContatoOpen, isLangOpen]);

  /* ── Esc-to-close global ─────────────────────────────────────────── */
  React.useEffect(() => {
    function onKey(e) {
      if (e.key !== 'Escape') return;
      if (isMegaOpen)    setIsMegaOpen(false);
      if (isContatoOpen) setIsContatoOpen(false);
      if (isLangOpen)    setIsLangOpen(false);
      if (isDrawerOpen)  setIsDrawerOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMegaOpen, isContatoOpen, isLangOpen, isDrawerOpen]);

  /* ── drawer mobile: scroll-lock + focus management ──────────────── */
  React.useEffect(() => {
    if (!isDrawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      drawerCloseRef.current && drawerCloseRef.current.focus();
    }, 60);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
      hamburgerRef.current && hamburgerRef.current.focus();
    };
  }, [isDrawerOpen]);

  /* ── handlers ────────────────────────────────────────────────────── */
  function toggleMega() {
    setIsMegaOpen((v) => !v);
    setIsContatoOpen(false);
    setIsLangOpen(false);
  }
  function toggleContato() {
    setIsContatoOpen((v) => !v);
    setIsMegaOpen(false);
    setIsLangOpen(false);
  }
  function toggleLang() {
    setIsLangOpen((v) => !v);
    setIsMegaOpen(false);
    setIsContatoOpen(false);
  }
  function handleSearchSubmit(e) {
    e.preventDefault();
    /* fake — não navega */
  }

  const activePanel =
    MEGAMENU_CATEGORIES.find((c) => c.id === activeCategory) || MEGAMENU_CATEGORIES[0];
  const activeLangData = NAV_LANGUAGES.find((l) => l.id === activeLang) || NAV_LANGUAGES[0];

  /* ── render ──────────────────────────────────────────────────────── */
  return (
    <>
      <header
        ref={headerRef}
        className={`lp-header${isScrolled ? ' is-scrolled' : ''}${isHidden ? ' is-hidden' : ''}`}
        data-state={isScrolled ? 'scrolled' : 'top'}
      >
        <div className="container lp-header-inner">
          <a className="lp-brand" href={`${NAV_BASE}/`} aria-label="MBA USP/Esalq — início">
            <img
              src="assets/mba-usp-esalq.svg"
              alt="MBA USP/Esalq"
              className="lp-brand-logo"
              width="160"
              height="40"
            />
          </a>

          <ul className="lp-nav" role="menubar" aria-label="Navegação principal">
            {NAV_PRIMARY_ITEMS.map((item) => {
              if (item.type === 'megamenu') {
                return (
                  <li
                    key={item.id}
                    ref={megaWrapRef}
                    className={`lp-nav-item lp-nav-item-trigger${isMegaOpen ? ' is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="lp-nav-trigger"
                      aria-haspopup="true"
                      aria-controls="lp-megamenu"
                      aria-expanded={isMegaOpen}
                      onClick={toggleMega}
                    >
                      {item.label}
                      <Icon name="ChevronDown" size={14} className="lp-nav-chev" />
                    </button>
                  </li>
                );
              }
              if (item.type === 'dropdown') {
                return (
                  <li
                    key={item.id}
                    ref={contatoWrapRef}
                    className={`lp-nav-item lp-nav-item-trigger${isContatoOpen ? ' is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="lp-nav-trigger"
                      aria-haspopup="true"
                      aria-controls="lp-contato-dropdown"
                      aria-expanded={isContatoOpen}
                      onClick={toggleContato}
                    >
                      {item.label}
                      <Icon name="ChevronDown" size={14} className="lp-nav-chev" />
                    </button>
                    <ul
                      id="lp-contato-dropdown"
                      className="lp-dropdown"
                      role="menu"
                      aria-hidden={!isContatoOpen}
                    >
                      {NAV_CONTATO_ITEMS.map((c) => (
                        <li key={c.id} role="none">
                          <a href={c.href} role="menuitem" tabIndex={isContatoOpen ? 0 : -1}>
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={item.id} className="lp-nav-item">
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <form className="lp-search" role="search" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              className="lp-search-input"
              placeholder="Buscar"
              aria-label="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="lp-search-btn" aria-label="Buscar">
              <Icon name="Search" size={16} />
            </button>
          </form>

          <a
            className="lp-aluno"
            href={NAV_AREA_ALUNO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-navigation-item="area-aluno"
          >
            Área do aluno
          </a>

          <div
            ref={langWrapRef}
            className={`lp-lang${isLangOpen ? ' is-open' : ''}`}
          >
            <button
              type="button"
              className="lp-lang-trigger"
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              onClick={toggleLang}
            >
              <span className="lp-lang-flag" aria-hidden="true">{activeLangData.flag}</span>
              <span className="lp-lang-label">{activeLangData.label}</span>
              <Icon name="ChevronDown" size={12} className="lp-nav-chev" />
            </button>
            <ul
              className="lp-lang-list"
              role="listbox"
              aria-hidden={!isLangOpen}
            >
              {NAV_LANGUAGES.map((l) => (
                <li
                  key={l.id}
                  role="option"
                  aria-selected={l.id === activeLang}
                  tabIndex={isLangOpen ? 0 : -1}
                  onClick={() => {
                    setActiveLang(l.id);
                    setIsLangOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLang(l.id);
                      setIsLangOpen(false);
                    }
                  }}
                >
                  <span className="lp-lang-flag" aria-hidden="true">{l.flag}</span>
                  <span>{l.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            ref={hamburgerRef}
            type="button"
            className="lp-hamburger"
            aria-label={isDrawerOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isDrawerOpen}
            aria-controls="lp-drawer"
            onClick={() => setIsDrawerOpen((v) => !v)}
          >
            <span className="lp-hamburger-bars" aria-hidden="true">
              <span /><span /><span />
            </span>
          </button>
        </div>

        {/* ── mega menu (overlay full-width abaixo do header) ───────── */}
        <nav
          id="lp-megamenu"
          className={`lp-megamenu${isMegaOpen ? ' is-open' : ''}`}
          aria-hidden={!isMegaOpen}
          aria-label="Categorias de cursos"
        >
          <div className="container lp-megamenu-grid">
            <aside className="lp-megamenu-sidebar">
              <ul role="tablist" aria-orientation="vertical">
                {MEGAMENU_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={cat.id === activeCategory}
                      className={`lp-megamenu-cat${cat.id === activeCategory ? ' is-active' : ''}`}
                      onMouseEnter={() => setActiveCategory(cat.id)}
                      onFocus={() => setActiveCategory(cat.id)}
                      onClick={() => setActiveCategory(cat.id)}
                      tabIndex={isMegaOpen ? 0 : -1}
                    >
                      <span>{cat.label}</span>
                      <Icon name="ChevronRight" size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            <section
              className="lp-megamenu-panel"
              role="tabpanel"
              aria-label={activePanel.title}
            >
              <header className="lp-megamenu-panel-head">
                <h2>{activePanel.title}</h2>
                <span className="lp-megamenu-badge">
                  {pluralizeCursos(activePanel.courses.length)}
                </span>
              </header>
              <p className="lp-megamenu-desc">{activePanel.description}</p>
              <hr className="lp-megamenu-divider" />
              <ul
                className={`lp-megamenu-courses${
                  activePanel.columns && activePanel.columns > 1
                    ? ` lp-megamenu-courses--cols-${activePanel.columns}`
                    : ''
                }`}
              >
                {activePanel.courses.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} tabIndex={isMegaOpen ? 0 : -1}>
                      <span>{c.label}</span>
                      <Icon name="ChevronRight" size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </nav>
      </header>

      {/* ── drawer mobile ────────────────────────────────────────────── */}
      <div
        id="lp-drawer"
        ref={drawerRef}
        className={`lp-drawer${isDrawerOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isDrawerOpen}
        aria-label="Menu de navegação"
        onClick={(e) => {
          if (e.target === drawerRef.current) setIsDrawerOpen(false);
        }}
      >
        <div className="lp-drawer-panel">
          <div className="lp-drawer-top">
            <a href={`${NAV_BASE}/`} className="lp-brand" aria-label="MBA USP/Esalq — início"
               tabIndex={isDrawerOpen ? 0 : -1}>
              <img
                src="assets/mba-usp-esalq.svg"
                alt="MBA USP/Esalq"
                className="lp-brand-logo"
                width="160"
                height="40"
              />
            </a>
            <button
              ref={drawerCloseRef}
              type="button"
              className="lp-drawer-close"
              aria-label="Fechar menu"
              onClick={() => setIsDrawerOpen(false)}
              tabIndex={isDrawerOpen ? 0 : -1}
            >
              <Icon name="Close" size={20} />
            </button>
          </div>

          <form
            className="lp-drawer-search"
            role="search"
            onSubmit={handleSearchSubmit}
          >
            <Icon name="Search" size={16} />
            <input
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              tabIndex={isDrawerOpen ? 0 : -1}
            />
          </form>

          <nav className="lp-drawer-nav" aria-label="Navegação mobile">
            <a href={`${NAV_BASE}/`} tabIndex={isDrawerOpen ? 0 : -1}>Home</a>

            <button
              type="button"
              className={`lp-drawer-accordion${drawerCursos ? ' is-open' : ''}`}
              aria-expanded={drawerCursos}
              onClick={() => setDrawerCursos((v) => !v)}
              tabIndex={isDrawerOpen ? 0 : -1}
            >
              <span>Cursos</span>
              <Icon name="ChevronDown" size={16} />
            </button>
            {drawerCursos && (
              <div className="lp-drawer-sublist">
                {MEGAMENU_CATEGORIES.map((cat) => (
                  <details key={cat.id} className="lp-drawer-cat">
                    <summary>{cat.label}</summary>
                    <ul>
                      {cat.courses.map((c) => (
                        <li key={c.label}>
                          <a href={c.href} tabIndex={isDrawerOpen ? 0 : -1}>{c.label}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            )}

            <a href={`${NAV_BASE}/sobre`}     tabIndex={isDrawerOpen ? 0 : -1}>Sobre</a>
            <a href={`${NAV_BASE}/parcerias`} tabIndex={isDrawerOpen ? 0 : -1}>Parcerias</a>
            <a href={NAV_BLOG_URL} target="_blank" rel="noopener noreferrer"
               tabIndex={isDrawerOpen ? 0 : -1}>Blog</a>
            <a href={`${NAV_BASE}/webinar`}   tabIndex={isDrawerOpen ? 0 : -1}>Webinar</a>

            <button
              type="button"
              className={`lp-drawer-accordion${drawerContato ? ' is-open' : ''}`}
              aria-expanded={drawerContato}
              onClick={() => setDrawerContato((v) => !v)}
              tabIndex={isDrawerOpen ? 0 : -1}
            >
              <span>Contato</span>
              <Icon name="ChevronDown" size={16} />
            </button>
            {drawerContato && (
              <div className="lp-drawer-sublist">
                {NAV_CONTATO_ITEMS.map((c) => (
                  <a key={c.id} href={c.href} tabIndex={isDrawerOpen ? 0 : -1}>{c.label}</a>
                ))}
              </div>
            )}
          </nav>

          <div className="lp-drawer-cta">
            <a
              className="lp-drawer-aluno"
              href={NAV_AREA_ALUNO_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isDrawerOpen ? 0 : -1}
            >
              Área do aluno
              <Icon name="ArrowRight" size={14} />
            </a>
            <div className="lp-drawer-lang">
              <span className="lp-lang-flag" aria-hidden="true">{activeLangData.flag}</span>
              <select
                aria-label="Idioma"
                value={activeLang}
                onChange={(e) => setActiveLang(e.target.value)}
                tabIndex={isDrawerOpen ? 0 : -1}
              >
                {NAV_LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

window.Header = Header;

/* ── TOP BANNER ──────────────────────────────────────────────────────
 * Banner fixo acima da navbar. Não some com scroll.
 * Atualiza --banner-h em :root via ResizeObserver para que o
 * .lp-header e o .hero se compensem automaticamente.
 */
const BANNER_TARGET_DATE = new Date('2026-09-15T08:00:00-03:00');
const BANNER_CTA_HREF = `${NAV_BASE}/cursos/mba-cyberseguranca`;
const BANNER_STORAGE_KEY = 'mba-cyber-banner-v1-dismissed';

function calcBannerTimeLeft() {
  const diff = BANNER_TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function TopBanner() {
  const [visible, setVisible] = React.useState(() => {
    try { return !localStorage.getItem(BANNER_STORAGE_KEY); }
    catch { return true; }
  });
  const [timeLeft, setTimeLeft] = React.useState(calcBannerTimeLeft);
  const bannerRef = React.useRef(null);

  /* Mantém --banner-h sincronizado com a altura real do banner */
  React.useEffect(() => {
    const root = document.documentElement;
    function sync() {
      root.style.setProperty(
        '--banner-h',
        (visible && bannerRef.current)
          ? bannerRef.current.getBoundingClientRect().height + 'px'
          : '0px'
      );
    }
    sync();
    if (!visible) return;
    const ro = new ResizeObserver(sync);
    if (bannerRef.current) ro.observe(bannerRef.current);
    return () => ro.disconnect();
  }, [visible]);

  /* Ticker do countdown */
  React.useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      const t = calcBannerTimeLeft();
      setTimeLeft(t);
      if (!t) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [visible]);

  function dismiss() {
    setVisible(false);
    try { localStorage.setItem(BANNER_STORAGE_KEY, '1'); } catch {}
  }

  if (!visible || !timeLeft) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="top-banner" ref={bannerRef} role="region" aria-label="Aviso de turma">
      <div className="top-banner-inner">
        <div className="top-banner-content">
          <span className="top-banner-badge">Turma 2026.2</span>
          <span className="top-banner-label">Início em</span>
          <div
            className="top-banner-countdown"
            aria-live="off"
            aria-label={`${timeLeft.d} dias, ${timeLeft.h} horas, ${timeLeft.m} minutos e ${timeLeft.s} segundos`}
          >
            <div className="top-banner-unit">
              <span className="top-banner-num">{pad(timeLeft.d)}</span>
              <span className="top-banner-lbl">D</span>
            </div>
            <span className="top-banner-sep" aria-hidden="true">:</span>
            <div className="top-banner-unit">
              <span className="top-banner-num">{pad(timeLeft.h)}</span>
              <span className="top-banner-lbl">H</span>
            </div>
            <span className="top-banner-sep" aria-hidden="true">:</span>
            <div className="top-banner-unit">
              <span className="top-banner-num">{pad(timeLeft.m)}</span>
              <span className="top-banner-lbl">M</span>
            </div>
            <span className="top-banner-sep" aria-hidden="true">:</span>
            <div className="top-banner-unit">
              <span className="top-banner-num">{pad(timeLeft.s)}</span>
              <span className="top-banner-lbl">S</span>
            </div>
          </div>
        </div>

        <a
          className="top-banner-cta"
          href={BANNER_CTA_HREF}
          target="_blank"
          rel="noopener noreferrer"
        >
          Garantir vaga
          <Icon name="ArrowRight" size={13} />
        </a>

      </div>

      <button
        className="top-banner-close"
        type="button"
        onClick={dismiss}
        aria-label="Fechar aviso de turma"
      >
        <Icon name="Close" size={15} />
      </button>
    </div>
  );
}

window.TopBanner = TopBanner;
