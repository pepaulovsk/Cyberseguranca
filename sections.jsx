/**
 * sections.jsx — todas as seções da LP, ancoradas no conteúdo real
 * da Information Architecture (docs/information-architecture.docx).
 *
 * Ordem visual (alternância clear ↔ deep):
 *   Header → Hero (clear) → Mercado (deep) → Carreira (clear) →
 *   Diferenciais (deep) → Corpo Docente (clear) → Perfil (clear) →
 *   Investimento (deep) → FAQ (clear) → CTA (deep) → Footer
 *
 * Sem Depoimentos (IA: "retirar").
 * Sem Stack/Labs (não estava no IA).
 *
 * Microcopy HUD: gerada livre (VISUAL §5).
 */

/* ────────────────────────────────────────────────────────────────────── *\
 *  HEADER — implementado em header.jsx (dual-state, drawer mobile).
\* ────────────────────────────────────────────────────────────────────── */

/* ────────────────────────────────────────────────────────────────────── *\
 *  HERO
\* ────────────────────────────────────────────────────────────────────── */

function Hero({ gridIntensity = 'off', primaryRgb }) {
  return (
    <section className="lp-section hero" id="hero">
      <img className="hero-image" src="assets/placeholder-hero.png" alt="" aria-hidden="true" />
      <div className="hero-bg" aria-hidden="true">
        <InteractiveGrid cellSize={56} intensity={gridIntensity} primaryRgb={primaryRgb} />
      </div>

      <div className="container hero-inner">
        <div className="hero-content">
          <RevealOnScroll>
            <div className="hero-badges">
              <CyBadge tone="primary" dot>Certificação USP</CyBadge>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <h1 className="hero-title">
              <span className="hero-title-line">MBA em Cibersegurança</span>
              <span className="hero-title-line">
                <span className="hero-title-muted">Pós-graduação </span>
                <span className="hero-keyword">USP/Esalq</span>
              </span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={160}>
            <p className="hero-lead">
              Torne-se o líder que protege empresas com uma pós-graduação em cibersegurança
              da melhor universidade da América Latina. <strong>750 mil vagas abertas no
              Brasil. 4 milhões no mundo.</strong> Salários de até R$ 52.000,00.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={240}>
            <div className="hero-ctas">
              <CyButton variant="primary" size="lg" as="a" href="#cta"
              icon={<Icon name="ArrowRight" size={18} />}>Inicie seu MBA agora</CyButton>
              <CyButton variant="secondary" size="lg" as="a" href="#diferenciais"
              icon={<Icon name="Play" size={16} iconStyle="bold" />} iconPosition="left">
                Conheça o programa
              </CyButton>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <dl className="hero-stats">
        <div>
          <dt>Salário máx. CSO</dt>
          <dd>R$ 52k</dd>
          <span className="ds-caption-micro">Robert Half · 2026</span>
        </div>
        <div>
          <dt>Vagas até 2034</dt>
          <dd>+29%</dd>
          <span className="ds-caption-micro">BLS · 2024</span>
        </div>
        <div>
          <dt>Déficit BR</dt>
          <dd>750k</dd>
          <span className="ds-caption-micro">Fortinet</span>
        </div>
      </dl>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  VISION — Statement claro, transição Hero → Mercado (light)
\* ────────────────────────────────────────────────────────────────────── */

const VISION_TOKENS = [
  { kind: 'w', text: 'O' },
  { kind: 'w', text: 'futuro', accent: true },
  { kind: 'icon', name: 'Eye' },
  { kind: 'w', text: 'das' },
  { kind: 'w', text: 'empresas' },
  { kind: 'w', text: 'depende' },
  { kind: 'w', text: 'de' },
  { kind: 'w', text: 'líderes' },
  { kind: 'w', text: 'preparados' },
  { kind: 'icon', name: 'Target' },
  { kind: 'w', text: 'para' },
  { kind: 'w', text: 'enfrentar' },
  { kind: 'w', text: 'ameaças', accent: true },
  { kind: 'w', text: 'digitais.', accent: true },
  { kind: 'icon', name: 'Bug' },
];

function Vision() {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let wordIndex = 0;
  let iconIndex = 0;
  const a11yText = VISION_TOKENS
    .filter((t) => t.kind === 'w')
    .map((t) => t.text)
    .join(' ')
    .replace(/\s+\./, '.');

  return (
    <section className="lp-section vision" id="vision">
      <div
        ref={ref}
        className={`vision-inner ${visible ? 'is-visible' : ''}`}>

        <p className="vision-hat">O novo perfil da liderança digital</p>
        <h2
          className="vision-statement"
          aria-label={a11yText}>

          {VISION_TOKENS.map((tok, i) => {
            if (tok.kind === 'icon') {
              const idx = iconIndex++;
              return (
                <span
                  key={`i-${i}`}
                  className="vision-icon"
                  aria-hidden="true"
                  style={{ '--i': idx }}>
                  <Icon name={tok.name} size={88} color="var(--curso-color-primary)" />
                </span>);

            }
            const idx = wordIndex++;
            const isDot = tok.text === '.';
            const cls = `vision-word${tok.accent ? ' vision-word--accent' : ''}${isDot ? ' vision-word--punct' : ''}`;
            return (
              <span
                key={`w-${i}`}
                className={cls}
                aria-hidden="true"
                style={{ '--i': idx }}>
                {tok.text}
              </span>);

          })}
        </h2>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  MERCADO — O Problema e Dados de Mercado (deep)
\* ────────────────────────────────────────────────────────────────────── */

function Mercado() {
  const items = [
  { icon: 'Database', value: 'R$ 6,7M',
    label: 'Custo médio de um breach no Brasil',
    body: 'Custos operacionais, legais, reputacionais e de conformidade com LGPD/GDPR. (IBM Cost of a Data Breach 2024)' },
  { icon: 'Users', value: '4 milhões',
    label: 'Vagas abertas em segurança no mundo',
    body: '750 mil só no Brasil. Profissionais de IA, cibersegurança e marketing digital recebem em média 20% a 25% acima da média global. (Fortinet)' },
  { icon: 'Sparkle', value: 'IA',
    label: 'turbina os ataques',
    body: 'Phishing por IA, deepfakes executivos, ataques a modelos de ML. A superfície de ataque nunca cresceu tão rápido.' },
  { icon: 'Document', value: 'LGPD',
    label: 'em execução',
    body: 'A ANPD amplia a fiscalização e aplica sanções previstas na lei. Multas de até 2% do faturamento (máx. R$ 50M por infração).' },
  { icon: 'Bug', value: 'Ransomware',
    label: 'paralisa tudo',
    body: 'Hospitais, bancos, indústrias — ninguém está imune. O Brasil foi o 5º mais atacado em 2024.' },
  { icon: 'Network', value: '6%',
    label: 'das empresas globais',
    body: 'Demonstram resiliência completa contra ataques cibernéticos. Hoje liderança e governança definem a capacidade de resposta. (PwC 2026)' }];


  return (
    <section className="lp-section section-deep alt" id="mercado">
      <div className="hud-overlay" aria-hidden="true">
        <div className="hud-corner tl">
          <SerialTag system="MKT" prefix="SECTOR" />
          <MicroBarcode seed="mercado-tl" bars={16} height={20} />
        </div>
        <div className="hud-corner tr">
          <VersionBlock system="MKT" env="LIVE" />
        </div>
        <div className="hud-corner br">
          <BinaryStrip length={24} seed="mkt-br" />
        </div>
      </div>
      <div className="container">
        <SectionHeader
          tone="deep"
          eyebrow="01 · Mercado & contexto"
          title={<>O mercado de Cyber Security<br /><span className="muted">e a exposição do Brasil</span></>} />
        

        <RevealOnScroll>
          <p className="section-lead-deep">
            Por que a segurança da informação se tornou a prioridade número 1 das empresas?
            Enquanto você lê isso, empresas brasileiras estão sendo atacadas. O mercado precisa
            de líderes, e o déficit de profissionais nunca foi tão crítico.
          </p>
        </RevealOnScroll>

        <div className="mercado-grid">
          {items.map((it, i) =>
          <RevealOnScroll key={it.label} delay={i * 60}>
              <div className="mercado-card-glow" aria-hidden="true" />
              <CyCard tone="deep" className="mercado-card">
                <span className="mercado-icon">
                  <Icon name={it.icon} size={22} color="var(--color-primary)" />
                </span>
                <div className="mercado-title-group">
                  <span className="mercado-value">{it.value}</span>
                  <h3 className="mercado-label">{it.label}</h3>
                </div>
                <p className="mercado-body">{it.body}</p>
              </CyCard>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  CARREIRA & ROI (clear, dot-pattern)
\* ────────────────────────────────────────────────────────────────────── */

function Carreira() {
  const stats = [
  { value: '+29%', label: 'Crescimento de vagas até 2034',
    body: 'O BLS projeta 29% de crescimento para Information Security Analysts, quase 3× a média de todas as ocupações.',
    source: 'BLS Occupational Outlook 2024' },
  { value: 'R$52k', label: 'Teto salarial para líderes',
    body: 'O Guia Salarial Robert Half 2026 aponta até R$ 52.500/mês para Chief Security Officers. Coordenadores chegam a R$ 23.750.',
    source: 'Robert Half 2026' },
  { value: '+14,5%', label: 'Alta em contratações em 1 ano',
    body: 'Especialistas em Segurança da Informação: +14,51% de contratações formais entre mar/25 e fev/26.',
    source: 'Portal Salário / CAGED 2026' }];


  const salary = [
  { role: 'Analista Júnior', range: 'R$6.100 – 10.250/mês', status: 'Porta de entrada', level: 'entry' },
  { role: 'Analista Pleno', range: 'R$8.400 – 14.100/mês', status: '↑ Alta demanda', level: 'mid' },
  { role: 'Analista Sênior', range: 'R$11.450 – 19.300/mês', status: '↑ Escasso', level: 'high' },
  { role: 'Coordenador de Segurança', range: 'R$17.350 – 23.750/mês', status: '↑↑ Muito escasso', level: 'high' },
  { role: 'CISO / CSO', range: 'R$35.000 – 52.500/mês', status: '↑↑↑ Crítico', level: 'top' }];


  return (
    <section className="lp-section section-light" id="carreira">
      <div className="container">
        <SectionHeader
          eyebrow="02 · Carreira & ROI"
          title={<>Carreira e salários<br /><span className="muted">o retorno do seu MBA em Cyber Security</span></>} />
        

        <div className="grid-3 carreira-stats">
          {stats.map((s, i) =>
          <RevealOnScroll key={s.label} delay={i * 80}>
              <CyCard tone="light" className="carreira-stat-card">
                <span className="carreira-value">{s.value}</span>
                <h3 className="carreira-label">{s.label}</h3>
                <p className="carreira-body">{s.body}</p>
                <span className="ds-caption-micro carreira-source">{s.source}</span>
              </CyCard>
            </RevealOnScroll>
          )}
        </div>

        <RevealOnScroll>
          <div className="salary-table-wrap">
            <header className="salary-table-head">
              <h3>Faixa Salarial Brasil 2026</h3>
              <span className="ds-caption">para quem possui pós em cibersegurança · Fonte: Robert Half 2026</span>
            </header>
            <div className="salary-table" role="table" aria-label="Faixa salarial Brasil 2026">
              <div className="salary-row salary-row-head" role="row">
                <span role="columnheader">Cargo</span>
                <span role="columnheader">Faixa salarial</span>
                <span role="columnheader">Situação</span>
              </div>
              {salary.map((row) =>
              <div key={row.role} className={`salary-row salary-row-${row.level}`} role="row">
                  <span role="cell" className="salary-role">{row.role}</span>
                  <span role="cell" className="salary-range">{row.range}</span>
                  <span role="cell" className="salary-status">{row.status}</span>
                </div>
              )}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="roi-callout">
            <span className="eyebrow">ROI do MBA</span>
            <p>
              Um profissional que evolui de <strong>Analista Sênior (R$ 11k)</strong> para
              <strong> Coordenador (R$ 20k)</strong> recupera os R$ 13.134 do MBA em
              <strong> cerca de 3 meses.</strong> O certificado USP
              fortalece essa progressão em processos seletivos.
            </p>
            <CyButton variant="primary" size="md" as="a" href="#cta"
            icon={<Icon name="ArrowRight" size={16} />}>Inicie seu MBA agora</CyButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  DIFERENCIAIS USP/Esalq (deep)
\* ────────────────────────────────────────────────────────────────────── */

function Diferenciais({ dotGap = 22, dotSize = 1.4, showDots = true }) {
  const items = [
  { icon: 'GraduationCap', tag: 'Certificação',
    title: 'Certificado pela USP',
    body: 'A única universidade brasileira entre as 110 melhores do mundo (QS 2026) e a melhor da América Latina. Reconhecida pelos maiores empregadores do país.' },
  { icon: 'Play', tag: 'Formato',
    title: 'Ao vivo e gravadas, sem sacrificar a carreira',
    body: 'Uma aula por semana, ao vivo com professores doutores USP e especialistas do mercado. Todas ficam gravadas para assistir quando e quantas vezes quiser.' },
  { icon: 'Sparkle', tag: 'IA',
    title: 'IA no currículo e na plataforma',
    body: 'Legendas em tempo real via IA (Skylar) em PT, EN e ES. Currículo atualizado com GenAI attacks, deepfakes e defesas adaptativas.' },
  { icon: 'Network', tag: 'Networking',
    title: 'Rede em 80+ países',
    body: '+50.000 profissionais qualificados e +5.400 empresas parceiras. Networking real com os maiores players do mercado brasileiro.' },
  { icon: 'Document', tag: 'Governança',
    title: 'LGPD, GDPR e compliance como eixo',
    body: 'Não é só técnico, é gestão estratégica. Comunicação de risco para o board, ISO 27001, NIST, COBIT e definição de política corporativa.' },
  { icon: 'Target', tag: 'Prática',
    title: 'Business Case real como projeto',
    body: 'Você resolve um desafio real de segurança em uma organização. O projeto vira portfólio prático para entrevistas e processos seletivos.' }];


  return (
    <section className="lp-section section-deep dot-bg" id="diferenciais">
      {showDots && <DotPattern color="var(--color-primary)" gap={dotGap} size={dotSize} />}
      <div className="hud-overlay" aria-hidden="true">
        <div className="hud-corner tl">
          <VersionBlock system="USP" env="LIVE" />
        </div>
        <div className="hud-corner tr">
          <SerialTag system="DIF" />
        </div>
        <div className="hud-corner bl">
          <Timestamp />
        </div>
        <div className="hud-corner br">
          <Coordinates label="CAMPUS" />
          <MicroBarcode seed="dif-br" bars={20} height={22} />
        </div>
      </div>
      <div className="container">
        <SectionHeader
          tone="deep"
          eyebrow="03 · Diferenciais USP/Esalq"
          title={<>Por que escolher a pós-graduação<br /><span className="muted">em Cibersegurança USP/Esalq?</span></>} />
        

        <RevealOnScroll>
          <p className="section-lead-deep">
            Obtenha a assinatura da universidade #1 da América Latina em uma das áreas
            mais críticas e valorizadas pelo mercado.
          </p>
        </RevealOnScroll>

        <div className="grid-3 diferenciais-grid">
          {items.map((it, i) =>
          <RevealOnScroll key={it.title} delay={i * 60}>
              <CyCard tone="deep" className="diferencial-card">
                <div className="diferencial-head">
                  <span className="diferencial-num">D{String(i + 1).padStart(2, '0')}</span>
                  <span className="diferencial-icon">
                    <Icon name={it.icon} size={26} color="var(--color-primary)" />
                  </span>
                </div>
                <span className="diferencial-tag">{it.tag}</span>
                <h3 className="diferencial-title">{it.title}</h3>
                <p className="diferencial-body">{it.body}</p>
              </CyCard>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  PROGRAMA DO CURSO (deep, alt)
\* ────────────────────────────────────────────────────────────────────── */

function Programa() {
  const [active, setActive] = React.useState(0);

  const modules = [
    {
      id: 'intro',
      label: 'Módulo Introdutório',
      tag: 'Pré-curso',
      desc: 'Base sólida de conhecimento e habilidades essenciais antes dos módulos regulares.',
      isSchedule: true,
      items: [
        { date: '05/05/2026', title: 'Fundamentos de Linux I' },
        { date: '07/05/2026', title: 'Fundamentos de Linux II' },
        { date: '12/05/2026', title: 'Redes para Cibersegurança I' },
        { date: '14/05/2026', title: 'Redes para Cibersegurança II' },
      ],
    },
    {
      id: 'm1',
      label: 'Módulo 1',
      tag: 'Governança e Gestão',
      items: [
        'Agile Management & Lean Startup',
        'Análise da Conjuntura Econômica em Cenários de Tecnologia',
        'Análise de dados aplicada à cibersegurança (Big Data & BI)',
        'Atração e Retenção de Times de Cibersegurança',
        'Cloud Security',
        'Criptografia Aplicada e Computação Quântica',
        'Design Thinking',
        'Ethical Hacking',
        'Gestão de Equipes Multiculturais e Intergeracionais',
        'Gestão Financeira',
        'Governança e Segurança da Informação',
      ],
    },
    {
      id: 'm2',
      label: 'Módulo 2',
      tag: 'Ataque e Defesa Cibernéticos',
      items: [
        'Análise de vulnerabilidades em aplicações web',
        'Análise Forense Digital',
        'Compliance em Segurança da Informação',
        'Direito Digital',
        'Gestão da Mudança',
        'Inteligência e Contra-Inteligência Cibernética',
        'Planejamento e Gestão Estratégica',
        'Regulação Internacional e Geopolítica da Cibersegurança',
        'Segurança no ciclo de desenvolvimento de software (DevSecOps)',
        'Simulação prática de ataque e defesa (Pentest e CTF)',
      ],
    },
    {
      id: 'm3',
      label: 'Módulo 3',
      tag: 'Gestão de Riscos e Tecnologias',
      items: [
        'Armadilhas para captura e estudo de atacantes (Honeypots)',
        'Blockchain, Criptomoedas e Smart Contracts',
        'Cibersegurança e ESG',
        'Cibersegurança no Setor Financeiro',
        'Ecossistemas de Inovação e Empreendedorismo',
        'Engenharia Social com IA (Phishing)',
        'Fundamentos e arquitetura da Deepweb',
        'Gestão de Incidentes e Resposta a Crises Cibernéticas',
        'Gestão de Riscos Cibernéticos',
        'Inteligência Artificial & Machine Learning',
        'Maturidade em Gestão de Riscos',
      ],
    },
  ];

  const mod = modules[active];

  return (
    <section className="lp-section section-deep alt" id="programa">
      <div className="hud-overlay" aria-hidden="true">
        <div className="hud-corner tl">
          <SerialTag system="PRG" prefix="MODULE" />
          <MicroBarcode seed="programa-tl" bars={16} height={20} />
        </div>
        <div className="hud-corner tr">
          <VersionBlock system="PRG" env="LIVE" />
        </div>
        <div className="hud-corner br">
          <BinaryStrip length={24} seed="prg-br" />
        </div>
      </div>

      <div className="container">
        <SectionHeader
          tone="deep"
          eyebrow="05 · Programa do Curso"
          title={<>Grade curricular<br /><span className="muted">MBA em Cibersegurança USP/Esalq</span></>} />
      </div>

      <div className="programa-tabs-wrap">
        <div className="programa-tabs" role="tablist" aria-label="Módulos do curso">
          {modules.map((m, i) =>
            <button
              key={m.id}
              role="tab"
              aria-selected={active === i}
              className={`programa-tab${active === i ? ' is-active' : ''}`}
              onClick={() => setActive(i)}>
              <span className="programa-tab-num" aria-hidden="true">{String(i).padStart(2, '0')}</span>
              <span className="programa-tab-label">{m.label}</span>
            </button>
          )}
        </div>
      </div>

      <div className="container">
        <RevealOnScroll delay={80}>
          <div className="programa-panel">
            <div className="programa-panel-hd">
              <div className="programa-panel-hd-left">
                <span className="programa-panel-mod-num" aria-hidden="true">
                  {active === 0 ? 'PRÉ' : `M${String(active).padStart(2, '0')}`}
                </span>
                <div className="programa-panel-hd-info">
                  <span className="programa-panel-hd-tag">{mod.tag}</span>
                  <span className="programa-panel-hd-label">{mod.label}</span>
                </div>
              </div>
              {!mod.isSchedule && (
                <div className="programa-panel-hd-count" aria-label={`${mod.items.length} disciplinas`}>
                  <span className="programa-panel-hd-count-n">{mod.items.length}</span>
                  <span className="programa-panel-hd-count-l">disciplinas</span>
                </div>
              )}
            </div>

            {mod.isSchedule ? (
              <>
                <p className="programa-panel-desc">{mod.desc}</p>
                <div className="programa-schedule">
                  {mod.items.map((item, i) =>
                    <div key={i} className="programa-schedule-item">
                      <span className="programa-schedule-idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <span className="programa-schedule-date">{item.date}</span>
                      <span className="programa-schedule-name">{item.title}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <ul className="programa-disciplines">
                {mod.items.map((item, i) =>
                  <li key={i} className="programa-discipline">
                    <span className="programa-disc-idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="programa-disc-text">{item}</span>
                  </li>
                )}
              </ul>
            )}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={160}>
          <p className="programa-contact ds-caption">
            Em caso de dúvidas sobre o programa do curso, entre em contato pelo e-mail{' '}
            <a href="mailto:info@mbauspesalq.com">info@mbauspesalq.com</a>
          </p>
        </RevealOnScroll>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  CORPO DOCENTE — múltiplos professores (clear, dot-pattern)
 *  Conteúdo: time editorial preenche. Layout escala 4-8+ docentes.
\* ────────────────────────────────────────────────────────────────────── */

function CorpoDocente() {
  const trackRef = React.useRef(null);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.docente-card');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    track.scrollBy({ left: dir * ((card?.offsetWidth ?? 260) + gap), behavior: 'smooth' });
  };

  const profs = [
  { name: <>Adriana {/* Cristina Ferreira */} Caldana</>, role: 'Representante brasileira no ExPeG-PRME (ONU) e TEDx Speaker', tag: 'USP · ESALQ' },
  { name: <>Cristina {/* Godoy Bernardo de */} Oliveira</>, role: 'PI do Centro de IA USP-IBM-Fapesp', tag: 'USP · IBM · Fapesp' },
  { name: <>Fabiano {/* Guasti */} Lima</>, role: 'Livre-Docente em Métodos Quantitativos e Finanças · Pesquisador Fapesp', tag: 'USP · Fapesp' },
  { name: <>Felipe {/* Mendes */} Borini</>, role: 'Pesquisador Sênior Glorad · Especialista em Inovação e Ecossistemas Tecnológicos', tag: 'USP · Glorad' },
  { name: <>Fernando {/* de Souza */} Coelho</>, role: 'Especialista em Políticas Públicas e Governança', tag: 'Gov. Pública' },
  { name: <>Fábio {/* Miguel */} Junges</>, role: 'CEO da SOU.cloud Serviços Gerenciados', tag: 'Indústria' },
  { name: <>Jaime {/* Simão */} Sichman</>, role: 'Doutor em Inteligência Artificial · Distinguished Speaker ACM', tag: 'USP · IA' },
  { name: <>Bruno {/* Antunes */} Kadri</>, role: 'CTO no Pecege · Especialista em Gestão de Produtos, Pessoas e Engenharia de Software', tag: 'Pecege' },
  { name: 'Daniel Donda', role: 'CEO e fundador da Hackers Hive', tag: 'Indústria' },
  { name: <>Matheus {/* Borguete de */} Souza</>, role: 'CMO no Pecege · Líder das áreas de Produtos e de Segurança e Governança no Pecege', tag: 'Pecege' }];


  const navButtons = (
    <div className="docentes-nav">
      <button className="docente-nav-btn" onClick={() => scroll(-1)} aria-label="Anterior">
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button className="docente-nav-btn" onClick={() => scroll(1)} aria-label="Próximo">
        <Icon name="ChevronRight" size={20} />
      </button>
    </div>
  );

  return (
    <section className="lp-section section-light dot-bg" id="docentes">
      <DotPattern />
      <div className="container">
        <SectionHeader
          eyebrow="06 · Corpo docente"
          title={<>Professores doutores USP<br /><span className="muted">+ especialistas do mercado</span></>}
          right={navButtons} />
      </div>

      <div className="docentes-scroll-wrap">
        <div className="docentes-track" ref={trackRef}>
          {profs.map((p, i) =>
            <article key={i} className="docente-card">
              <div className="docente-photo" aria-hidden="true">
                <div className="docente-photo-corners" aria-hidden="true">
                  <span className="docente-corner tl" />
                  <span className="docente-corner tr" />
                  <span className="docente-corner bl" />
                  <span className="docente-corner br" />
                </div>
                <span className="docente-photo-label">[PHOTO]</span>
                <span className="docente-photo-id" aria-hidden="true">ID · {String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="docente-info">
                <div className="docente-meta-bar" aria-hidden="true">
                  <span className="docente-type">{p.tag}</span>
                  <span className="docente-status">
                    <span className="docente-status-dot" />
                    ATIVO
                  </span>
                </div>
                <h3 className="docente-name">{p.name}</h3>
                <p className="docente-role">{p.role}</p>
              </div>
            </article>
          )}
        </div>
      </div>

      <div className="container">
        <div className="docentes-nav docentes-nav--mobile">
          <button className="docente-nav-btn" onClick={() => scroll(-1)} aria-label="Anterior">
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button className="docente-nav-btn" onClick={() => scroll(1)} aria-label="Próximo">
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  USP SEAL — selo animado (tempero)
\* ────────────────────────────────────────────────────────────────────── */

function USPSeal() {
  const rootRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleEnter = () => {
    const el = rootRef.current;
    if (!el) return;
    el.classList.remove('is-boosting');
    void el.offsetWidth;
    el.classList.add('is-boosting');
  };

  const handleAnimEnd = (e) => {
    if (e.animationName === 'usp-seal-boost' && rootRef.current) {
      rootRef.current.classList.remove('is-boosting');
    }
  };

  return (
    <div
      ref={rootRef}
      className={`usp-seal${visible ? ' is-visible' : ''}`}
      onMouseEnter={handleEnter}
      onAnimationEnd={handleAnimEnd}
      aria-hidden="true">

      <div className="usp-seal-boost">
        <div className="usp-seal-rotor">
          <svg className="usp-seal-text-svg" viewBox="0 0 200 200">
            <defs>
              <path id="usp-seal-text-path"
                d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
            </defs>
            <text className="usp-seal-text">
              <textPath href="#usp-seal-text-path" startOffset="0" textLength="490" lengthAdjust="spacing">
                USP · ESALQ · MBA EM CIBERSEGURANÇA · EST. 2026 ·{' '}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      <span className="usp-seal-logo" />
    </div>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  PERFIL DO ALUNO (clear)
\* ────────────────────────────────────────────────────────────────────── */

function Perfil() {
  const personas = [
  {
    icon: 'Code',
    tag: 'Perfil 01',
    title: 'Profissional de TI',
    body: 'Para analistas, desenvolvedores, sysadmins e arquitetos que desejam se especializar em cibersegurança, assumir posições mais estratégicas ou conquistar uma credencial de alto reconhecimento.',
    roles: ['Analista de TI', 'Dev', 'SysAdmin', 'Arquiteto']
  },
  {
    icon: 'Network',
    tag: 'Perfil 02',
    title: 'Gestor Estratégico',
    body: 'Ideal para gestores, líderes de tecnologia e executivos que precisam compreender riscos cibernéticos, fortalecer governança e dialogar com clareza junto ao board.',
    roles: ['Gerente', 'Diretor de TI', 'CTO', 'COO']
  },
  {
    icon: 'Document',
    tag: 'Perfil 03',
    title: 'Profissional de Compliance ou Jurídico',
    body: 'Voltado para profissionais que precisam dominar LGPD, GDPR e governança de dados para apoiar decisões jurídicas, regulatórias e corporativas.',
    roles: ['DPO', 'Compliance', 'Jurídico', 'RH']
  }];


  return (
    <section className="lp-section section-light" id="perfil">
      <div className="container">
        <USPSeal />
        <SectionHeader
          eyebrow="04 · Perfil do aluno"
          title={<>Este MBA em Cibersegurança<br /><span className="muted">é para você?</span></>} />
        

        <div className="grid-3">
          {personas.map((p, i) =>
          <RevealOnScroll key={p.title} delay={i * 80}>
              <CyCard tone="light" className="persona-card">
                <span className="persona-icon">
                  <Icon name={p.icon} size={28} />
                </span>
                <span className="persona-tag">{p.tag}</span>
                <h3 className="persona-title">{p.title}</h3>
                <p className="persona-body">{p.body}</p>
                <ul className="persona-list">
                  {p.roles.map((r) =>
                <li key={r}>
                      <Icon name="Check" size={14} color="var(--ds-color-primary)" />{r}
                    </li>
                )}
                </ul>
              </CyCard>
            </RevealOnScroll>
          )}
        </div>

        <RevealOnScroll delay={120}>
          <aside className="focus-note">
            <div className="focus-note-rule" aria-hidden="true">
              <span className="focus-note-tag">NOTE · 001 / FOCUS</span>
            </div>
            <div className="focus-note-body">
              <h3 className="focus-note-title">Sobre o foco deste programa</h3>
              <p style={{ fontSize: "14px", fontWeight: "400" }}>
                O foco deste MBA é formar profissionais capazes de atuar tanto em posições
                de liderança quanto como referência técnica em equipes de segurança, governança
                e compliance. Embora existam disciplinas técnicas — incluindo conteúdos práticos
                como pentest — o curso não tem como objetivo um aprofundamento operacional tão
                intenso quanto certificações técnicas específicas.
              </p>
            </div>
          </aside>
        </RevealOnScroll>

        <RevealOnScroll delay={180}>
          <AlumniTicker />
        </RevealOnScroll>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  INVESTIMENTO — Planos (deep)
\* ────────────────────────────────────────────────────────────────────── */

function Investimento({ tempero = true }) {
  const plans = [
  {
    id: 'nacional',
    tag: 'Plano Nacional',
    price: 'R$597',
    cadence: '/mês',
    total: 'Total R$ 13.134 em 22 parcelas',
    featured: false,
    items: [
    'Certificado USP — válido em todo o Brasil',
    'Aulas ao vivo com professores doutores USP + gravações (acesso vitalício)',
    'App mobile com acesso offline',
    'Legendas em PT via IA Skylar',
    'Business Case + orientação acadêmica']

  },
  {
    id: 'internacional',
    tag: 'Plano Internacional',
    price: 'R$944,64',
    cadence: '/mês',
    total: 'Total R$ 20.782 em 22 parcelas',
    featured: true,
    items: [
    'Materiais em EN e ES incluídos',
    'Certificado USP — reconhecimento global',
    'Aulas ao vivo com professores doutores USP + gravações (acesso vitalício)',
    'App mobile com acesso offline',
    'Legendas em PT, EN e ES via IA Skylar',
    'Business Case + orientação acadêmica']

  }];


  return (
    <section className="lp-section section-deep alt" id="investimento">
      <div className="hud-overlay" aria-hidden="true">
        <div className="hud-corner tl">
          <SerialTag system="INV" prefix="FIN" />
          <MicroBarcode seed="investimento-tl" bars={18} height={22} />
        </div>
        <div className="hud-corner tr">
          <Timestamp />
        </div>
        <div className="hud-corner bl">
          <BinaryStrip length={24} seed="inv-bl" />
        </div>
        <div className="hud-corner br">
          <VersionBlock system="INV" />
        </div>
      </div>
      <div className="container">
        <SectionHeader
          tone="deep"
          eyebrow="07 · Investimento"
          title={<>Preço MBA em Cibersegurança<br /><span className="muted">e planos de investimento</span></>} />
        

        <RevealOnScroll>
          <p className="section-lead-deep">
            Comparado ao retorno salarial, o MBA USP/Esalq em Cibersegurança é o investimento
            com melhor custo-benefício disponível no Brasil.
          </p>
        </RevealOnScroll>

        <div className="plans-grid">
          {plans.map((plan, i) =>
          <RevealOnScroll key={plan.id} delay={i * 80}>
              <CyCard tone="deep" className={`plan-card ${plan.featured ? 'is-featured' : ''}`}>
                {tempero && <div className="plan-top-line" aria-hidden="true" />}
                <header className="plan-head">
                  <div className="plan-head-left">
                    <span className="plan-tag">{plan.tag}</span>
                    {tempero && (
                      <div className="plan-status" aria-hidden="true">
                        <span className="plan-status-dot" />
                        <span className="plan-status-label">DISPONÍVEL</span>
                      </div>
                    )}
                  </div>
                  {plan.featured && <CyBadge tone="primary" dot>Reconhecimento global</CyBadge>}
                </header>
                <div className="plan-price">
                  <span className="plan-price-prefix ds-caption">a partir de</span>
                  <span className="plan-price-value">{plan.price}<small>{plan.cadence}</small></span>
                  <span className="plan-price-total ds-caption">{plan.total}</span>
                </div>
                <CyButton variant={plan.featured ? 'primary' : 'secondary'} size="md" as="a" href="#cta"
              icon={<Icon name="ArrowRight" size={16} />}>Escolher {plan.tag.split(' ')[1]}</CyButton>
                <div className="plan-divider" aria-hidden="true" />
                <div className="plan-features-wrap">
                  <span className="plan-features-label ds-caption">O plano inclui</span>
                  <ul className="plan-features">
                    {plan.items.map((it) =>
                  <li key={it}>
                        <Icon name="Check" size={16} color="var(--color-primary)" iconStyle="bold-duotone" />
                        <span>{it}</span>
                      </li>
                  )}
                  </ul>
                </div>
                {tempero && (
                  <div className="plan-card-hud" aria-hidden="true">
                    <MicroBarcode seed={plan.id + '-hud'} bars={10} height={12} />
                    <SerialTag system="PLN" />
                  </div>
                )}
              </CyCard>
            </RevealOnScroll>
          )}
        </div>

        <RevealOnScroll delay={160}>
          <div className="roi-callout roi-callout-deep">
            <span className="eyebrow">Cálculo do ROI</span>
            <p>
              Com mensalidades a partir de R$597/mês ao longo de 22 meses, o investimento total é de 
              <strong>~R$13.134</strong>. Um Analista Sênior promovido a Coordenador passa a ganhar
              a partir de R$5.900/mês. <strong>O investimento se paga em aproximadamente 3 meses</strong>.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  FAQ (clear)
\* ────────────────────────────────────────────────────────────────────── */

function FAQ() {
  const [openIndex, setOpenIndex] = React.useState(0);
  const items = [
  {
    q: 'Cibersegurança: pós ou MBA? Qual a diferença?',
    a: 'Uma pós tradicional costuma focar apenas no aprofundamento técnico. Já o MBA, além do aprofundamento técnico, combina segurança da informação, governança, gestão de riscos, compliance e tomada de decisão estratégica — competências cada vez mais exigidas em cargos de liderança.'
  },
  {
    q: 'Preciso ter experiência em TI para fazer o MBA em Cibersegurança?',
    a: 'Não. O MBA em Cibersegurança foi desenvolvido para profissionais de tecnologia, gestão, compliance, jurídico e áreas correlatas. Os módulos iniciais ajudam a construir a base necessária, mesmo sem experiência avançada em segurança.'
  },
  {
    q: 'A pós-graduação em Cibersegurança aborda Pentest e Ethical Hacking?',
    a: 'Sim. O curso inclui Ethical Hacking, análise de vulnerabilidades, defesa cibernética, cloud security, DevSecOps e simulações práticas de pentest, conectando teoria e aplicação real de mercado.'
  },
  {
    q: 'Quanto tempo preciso dedicar por semana?',
    a: 'O MBA conta com aulas ao vivo uma vez por semana, às quintas-feiras, das 19h às 23h (horário de Brasília). As aulas ficam gravadas até o fim do curso, com flexibilidade para quem trabalha em tempo integral.'
  },
  {
    q: 'O certificado é reconhecido pelo MEC e pela USP?',
    a: 'Sim. O MBA em Cibersegurança USP/Esalq é uma pós-graduação lato sensu reconhecida pelo MEC e certificada pela USP — universidade com maior reputação acadêmica da América Latina.'
  },
  {
    q: 'O MBA em Cibersegurança aborda Cloud Security e DevSecOps?',
    a: 'Sim. A grade do curso contempla temas atuais como Cloud Security, DevSecOps, proteção de ambientes em nuvem, gestão de vulnerabilidades e segurança aplicada ao desenvolvimento de software, preparando o aluno para os desafios das arquiteturas modernas.'
  },
  {
    q: 'Quais competências o aluno desenvolve ao longo da pós-graduação em Cibersegurança?',
    a: 'O MBA desenvolve competências técnicas, estratégicas e de gestão, incluindo governança em segurança da informação, gestão de riscos cibernéticos, resposta a incidentes, compliance, ethical hacking e liderança de equipes de segurança.'
  },
  {
    q: 'O MBA em Cibersegurança é indicado para transição de carreira?',
    a: 'Sim. O curso também atende profissionais que desejam migrar para a área de segurança da informação, oferecendo uma base sólida em cibersegurança, visão estratégica de mercado e contato com aplicações práticas utilizadas em ambientes corporativos.'
  }];


  return (
    <section className="lp-section section-light" id="faq">
      <div className="container faq-container">
        <SectionHeader
          eyebrow="08 · FAQ"
          title={<>Perguntas frequentes<br /><span className="muted">sobre a pós-graduação em Cibersegurança</span></>} />
        
        <div className="faq-list">
          {items.map((it, i) =>
          <FAQItem
            key={i}
            index={i}
            question={it.q}
            answer={it.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex((prev) => prev === i ? -1 : i)} />

          )}
        </div>
      </div>
    </section>);

}

function FAQItem({ index, question, answer, isOpen, onToggle }) {
  return (
    <RevealOnScroll delay={index * 40}>
      <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
        <button className="faq-q" onClick={onToggle} aria-expanded={isOpen}>
          <span className="faq-q-num ds-caption">Q.{String(index + 1).padStart(2, '0')}</span>
          <span className="faq-q-text">{question}</span>
          <span className="faq-q-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14">
              <line x1="2" y1="8" x2="14" y2="8"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="8" y1="2" x2="8" y2="14"
              className="faq-q-icon-vert"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        </button>
        <div className="faq-a" role="region">
          <div className="faq-a-inner"><p>{answer}</p></div>
        </div>
      </div>
    </RevealOnScroll>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  CTA FINAL (deep)
\* ────────────────────────────────────────────────────────────────────── */

function CTA({ dotGap = 22, dotSize = 1.4, showDots = true }) {
  return (
    <section className="lp-section section-deep dot-bg" id="cta">
      {showDots && <DotPattern color="var(--color-primary)" gap={dotGap} size={dotSize} />}
      <div className="hud-overlay" aria-hidden="true">
        <div className="hud-corner tl">
          <SerialTag system="CTA" prefix="SEC" />
        </div>
        <div className="hud-corner tr">
          <BinaryStrip length={24} seed="cta-tr" />
          <MicroBarcode seed="cta-tr" bars={22} height={22} />
        </div>
        <div className="hud-corner bl">
          <Coordinates label="SP" />
        </div>
        <div className="hud-corner br">
          <VersionBlock system="CTA" env="LIVE" />
        </div>
      </div>
      <div className="container cta-container">
        <RevealOnScroll>
          <span className="eyebrow">09 · Inscrição</span>
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <h2 className="cta-title">
            O Brasil precisa de líderes em cibersegurança.<br />
            <span className="cta-keyword">Seja um deles.</span>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={160}>
          <p className="cta-body">
            <strong>750 mil vagas abertas. Salários de até R$ 52k.</strong> Certificado
            da melhor universidade da América Latina. A pergunta não é se vale a pena —
            é quando você vai começar.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={240}>
          <div className="cta-actions">
            <CyButton variant="primary" size="lg" as="a" href="#"
            icon={<Icon name="ArrowRight" size={18} />}>Inicie seu MBA agora</CyButton>
            <CyButton variant="ghost" size="lg" as="a" href="tel:+551926603343"
            icon={<Icon name="ArrowUpRight" size={16} />}>(19) 2660-3343</CyButton>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={320}>
          <div className="cta-contact ds-caption">
            <span>info@mbauspesalq.com</span>
            <span>·</span>
            <span>Atendimento de seg. a sex., 9h–18h</span>
          </div>
        </RevealOnScroll>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  FOOTER (clear, minimal)
\* ────────────────────────────────────────────────────────────────────── */

function Footer() {
  const cursos = [
    { label: 'MBAs e Pós-Graduações', href: '#' },
    { label: 'Cursos de Curta Duração', href: '#' },
    { label: 'Cursos Gratuitos', href: '#' }];

  const bolsas = [
    { label: 'MBAs e Pós-graduações', href: '#' },
    { label: 'Cursos de Curta Duração', href: '#' }];

  const informacoes = [
    { label: 'Sobre', href: '/sobre' },
    { label: 'Parcerias', href: '/parcerias' },
    { label: 'Blog', href: 'https://blog.mbauspesalq.com/' },
    { label: 'Webinar', href: '/webinar' },
    { label: 'faq', href: '/faq' },
    { label: 'Aluno Indica Aluno', href: '/programa-aluno-indica-aluno' },
    { label: 'Política de privacidade', href: 'https://pecege.com/politica-de-privacidade' }];

  const socials = [
    {
      key: 'facebook',
      label: 'Facebook do MBA USP/Esalq',
      href: 'https://www.facebook.com/mbauspesalq',
      svg: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-9h3l.5-3.5h-3.5V7.2c0-1 .3-1.7 1.7-1.7H17V2.4C16.5 2.3 15.4 2.2 14.2 2.2c-2.6 0-4.4 1.6-4.4 4.4v2.9H7v3.5h2.8V22h3.7z" /></svg>
    },
    {
      key: 'instagram',
      label: 'Instagram do MBA USP/Esalq',
      href: 'https://www.instagram.com/mbauspesalq/',
      svg: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.6c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 2.7c2.9 0 5.3 2.4 5.3 5.3s-2.4 5.3-5.3 5.3-5.3-2.4-5.3-5.3 2.4-5.3 5.3-5.3zm0 8.8c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5-3.5 1.6-3.5 3.5 1.6 3.5 3.5 3.5zm6.7-9c0 .7-.6 1.2-1.2 1.2s-1.2-.6-1.2-1.2.6-1.2 1.2-1.2 1.2.5 1.2 1.2z" /></svg>
    },
    {
      key: 'twitter',
      label: 'Twitter do MBA USP/Esalq',
      href: 'https://twitter.com/mbauspesalq',
      svg: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
    },
    {
      key: 'linkedin',
      label: 'Linkedin do MBA USP/Esalq',
      href: 'https://br.linkedin.com/school/mba-usp-esalq/',
      svg: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66V19z" /></svg>
    },
    {
      key: 'youtube',
      label: 'Youtube do MBA USP/Esalq',
      href: 'https://www.youtube.com/channel/UCDYYGdKY3_zOk3L0VBdx9XQ',
      svg: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
    },
    {
      key: 'tiktok',
      label: 'Tiktok do MBA USP/Esalq',
      href: 'https://www.tiktok.com/@mbauspesalq',
      svg: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
    }];

  const PhoneIcon = (
    <svg viewBox="0 0 512 512" aria-hidden="true"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" /></svg>);

  const WhatsAppIcon = (
    <svg viewBox="0 0 448 512" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>);

  const EnvelopeIcon = (
    <svg viewBox="0 0 512 512" aria-hidden="true"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z" /></svg>);

  return (
    <footer className="lp-footer">
      <div className="lp-footer-main">
        <div className="lp-footer-container">
          <div className="lp-footer-grid">

            {/* Coluna 1 — Marca */}
            <div className="lp-footer-col lp-footer-brand-col">
              <img
                src="assets/mba-usp-esalq.svg"
                alt="MBA USP/Esalq"
                className="lp-footer-brand-logo" />
              <p className="lp-footer-brand-text">Pós-graduação Lato sensu da USP</p>
              <p className="lp-footer-brand-text">*Campanha válida para a turma do primeiro semestre de 2026</p>
            </div>

            {/* Coluna 2 — Nossos Cursos + Programa de Bolsas */}
            <div className="lp-footer-col">
              <div className="lp-footer-block">
                <span className="lp-footer-title">Nossos Cursos</span>
                <ul className="lp-footer-list">
                  {cursos.map((it) =>
                    <li key={it.label}><a href={it.href}>{it.label}</a></li>
                  )}
                </ul>
              </div>
              <div className="lp-footer-block">
                <span className="lp-footer-title">Programa de Bolsas</span>
                <ul className="lp-footer-list">
                  {bolsas.map((it) =>
                    <li key={it.label}><a href={it.href}>{it.label}</a></li>
                  )}
                </ul>
              </div>
            </div>

            {/* Coluna 3 — Informações */}
            <div className="lp-footer-col">
              <div className="lp-footer-block">
                <span className="lp-footer-title">Informações</span>
                <ul className="lp-footer-list">
                  {informacoes.map((it) =>
                    <li key={it.label}>
                      {it.label === 'faq' ?
                        <a href={it.href}>
                          <span className="lp-footer-faq-bold">FAQ</span>
                          <span> (Perguntas Frequentes)</span>
                        </a> :
                        <a href={it.href}>{it.label}</a>
                      }
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Coluna 4 — Contatos */}
            <div className="lp-footer-col">
              <div className="lp-footer-block">
                <span className="lp-footer-title">Contatos</span>
                <ul className="lp-footer-list lp-footer-contact-list">
                  <li>
                    <a href="tel:+551926603343" aria-label="Entre em contato via Telefone">
                      {PhoneIcon}<span>+55 (19) 2660-3343</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/551926603343" aria-label="Entre em contato via WhatsApp" target="_blank" rel="noopener noreferrer">
                      {WhatsAppIcon}<span>+55 (19) 2660-3343</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@mbauspesalq.com" aria-label="Entre em contato via E-mail">
                      {EnvelopeIcon}<span>info@mbauspesalq.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Coluna 5 — Login + Redes Sociais */}
            <div className="lp-footer-col lp-footer-social-col">
              <button type="button" className="lp-footer-login">Login</button>
              <ul className="lp-footer-socials">
                {socials.map((s) =>
                  <li key={s.key} className={`lp-footer-soc-${s.key}`}>
                    <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                      {s.svg}
                    </a>
                  </li>
                )}
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className="lp-footer-copyright">
        <div className="lp-footer-copyright-inner">
          <div>Todos os direitos reservados &ndash; 2026</div>
          <div>
            <span className="lp-footer-pecege-prefix">Desenvolvido por:</span>
            <a href="https://pecege.com/">Pecege</a>
          </div>
        </div>
      </div>
    </footer>);

}

/* ────────────────────────────────────────────────────────────────────── *\
 *  SectionHeader (subcomponente local)
\* ────────────────────────────────────────────────────────────────────── */

function SectionHeader({ eyebrow, title, right, tone = 'light' }) {
  return (
    <header className={`section-header section-header-${tone}`}>
      <div className="section-header-main">
        <RevealOnScroll>
          <span className="eyebrow">{eyebrow}</span>
        </RevealOnScroll>
        <RevealOnScroll delay={60}>
          <h2 className="section-title">{title}</h2>
        </RevealOnScroll>
      </div>
      {right &&
      <RevealOnScroll delay={120}>
          <div className="section-header-right">{right}</div>
        </RevealOnScroll>
      }
    </header>);

}

Object.assign(window, {
  Hero, Vision,
  Mercado, Carreira, Diferenciais, Perfil, Programa, CorpoDocente, Investimento,
  FAQ, CTA, Footer, SectionHeader
});