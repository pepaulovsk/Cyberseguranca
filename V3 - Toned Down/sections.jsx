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

function Hero({ gridIntensity = 'off' }) {
  return (
    <section className="lp-section hero" id="hero">
      {/* Etapa 1: hero-image (placeholder) e overlay complexo removidos.
          InteractiveGrid default 'off' — volta como Slot 1 na Etapa 3. */}
      <div className="hero-bg" aria-hidden="true">
        <InteractiveGrid cellSize={56} intensity={gridIntensity} />
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
                <span className="hero-keyword">USP/Esalq</span>
                <span className="hero-title-muted"> / pós-graduação em Cyber Security</span>
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

          <RevealOnScroll delay={320}>
            <dl className="hero-stats">
              <div>
                <dt>Salário máx. CSO</dt>
                <dd>R$ 52k</dd>
                <span className="hud">Robert Half · 2026</span>
              </div>
              <div>
                <dt>Vagas até 2034</dt>
                <dd>+29%</dd>
                <span className="hud">BLS · 2024</span>
              </div>
              <div>
                <dt>Déficit BR</dt>
                <dd>750k</dd>
                <span className="hud">Fortinet</span>
              </div>
            </dl>
          </RevealOnScroll>
        </div>
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
                <span className="hud carreira-source">{s.source}</span>
              </CyCard>
            </RevealOnScroll>
          )}
        </div>

        <RevealOnScroll>
          <div className="salary-table-wrap">
            <header className="salary-table-head">
              <h3>Faixa Salarial Brasil 2026</h3>
              <span className="hud">para quem possui pós em cibersegurança · Fonte: Robert Half 2026</span>
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
              <strong> Coordenador (R$ 20k)</strong> recupera o investimento total do MBA em
              <strong> menos de 4 meses</strong> apenas com a diferença salarial. O certificado USP
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
    title: 'Aulas ao vivo, sem sacrificar a carreira',
    body: 'Uma aula por semana, ao vivo com professores doutores USP e especialistas do mercado. Todas ficam gravadas para assistir quando quiser.' },
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
 *  CORPO DOCENTE — múltiplos professores (clear, dot-pattern)
 *  Conteúdo: time editorial preenche. Layout escala 4-8+ docentes.
\* ────────────────────────────────────────────────────────────────────── */

function CorpoDocente() {
  // Lorem placeholder — time editorial preenche depois.
  const profs = [
  { name: '[PROF. 01]', role: '[Cargo · USP/Esalq]', expertise: 'GenAI Attacks', credential: 'PhD' },
  { name: '[PROF. 02]', role: '[Cargo · USP/Esalq]', expertise: 'Cloud Security', credential: 'CISSP' },
  { name: '[PROF. 03]', role: '[Cargo · USP/Esalq]', expertise: 'LGPD & GDPR', credential: 'DPO' },
  { name: '[PROF. 04]', role: '[Cargo · USP/Esalq]', expertise: 'Pentest', credential: 'OSCP' },
  { name: '[PROF. 05]', role: '[Cargo · USP/Esalq]', expertise: 'Governança SI', credential: 'ISO 27001' },
  { name: '[PROF. 06]', role: '[Cargo · USP/Esalq]', expertise: 'Resposta a incidentes', credential: 'CISM' }];


  return (
    <section className="lp-section section-light dot-bg" id="docentes">
      <DotPattern />
      <div className="container">
        <SectionHeader
          eyebrow="05 · Corpo docente"
          title={<>Professores doutores USP<br /><span className="muted">+ especialistas do mercado</span></>} />
        

        <RevealOnScroll>
          <p className="section-lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Conteúdo do corpo docente a ser
            preenchido pelo time editorial — perfis completos, formação, publicações.
          </p>
        </RevealOnScroll>

        <div className="docentes-grid">
          {profs.map((p, i) =>
          <RevealOnScroll key={p.name + i} delay={i % 4 * 60}>
              <article className="docente-card">
                <div className="docente-photo" aria-hidden="true">
                  <span className="docente-photo-label hud">[PHOTO]</span>
                </div>
                <div className="docente-info">
                  <h3 className="docente-name">{p.name}</h3>
                  <p className="docente-role">{p.role}</p>
                  <div className="docente-meta">
                    <span className="badge badge-primary">{p.credential}</span>
                    <span className="docente-expertise">{p.expertise}</span>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          )}
        </div>

        <RevealOnScroll delay={120}>
          <div className="docentes-foot">
            <CyButton variant="secondary" size="md" as="a" href="#cta"
            icon={<Icon name="ArrowUpRight" size={16} />}>Ver corpo docente completo</CyButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>);

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
                      <Icon name="Check" size={14} color="var(--color-primary)" />{r}
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
    price: 'R$597',
    cadence: '/mês',
    total: 'Total R$ 10.746 em 18 parcelas',
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
          eyebrow="06 · Investimento"
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
                  <span className="plan-price-prefix hud">a partir de</span>
                  <span className="plan-price-value">{plan.price}<small>{plan.cadence}</small></span>
                  <span className="plan-price-total hud">{plan.total}</span>
                </div>
                <CyButton variant={plan.featured ? 'primary' : 'secondary'} size="md" as="a" href="#cta"
              icon={<Icon name="ArrowRight" size={16} />}>Escolher {plan.tag.split(' ')[1]}</CyButton>
                <div className="plan-divider" aria-hidden="true" />
                <div className="plan-features-wrap">
                  <span className="plan-features-label hud">O plano inclui</span>
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
              <strong>~R$13.134</strong>. Um Analista Sênior promovido a Coordenador com
              aumento de R$3.000/mês recupera esse valor em <strong>menos de 4 meses</strong>.
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
          eyebrow="07 · FAQ"
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
          <span className="faq-q-num hud">Q.{String(index + 1).padStart(2, '0')}</span>
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
          <span className="eyebrow">08 · Inscrição</span>
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
          <div className="cta-contact hud">
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
  return (
    <footer className="lp-footer">
      <div className="container lp-footer-inner">
        <div className="lp-footer-brand">
          <img src="assets/mba-usp-esalq.svg" alt="MBA USP/Esalq" className="lp-brand-logo" />
        </div>
        <nav className="lp-footer-nav" aria-label="Navegação do rodapé">
          <a href="#mercado">Mercado</a>
          <a href="#diferenciais">Diferenciais</a>
          <a href="#investimento">Investimento</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="lp-footer-meta hud">
          <span>Pós-graduação Lato Sensu</span>
          <span>·</span>
          <span>© 2026</span>
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
  Hero,
  Mercado, Carreira, Diferenciais, CorpoDocente, Perfil, Investimento,
  FAQ, CTA, Footer, SectionHeader
});