/**
 * alumni-ticker.jsx — strip horizontal "Onde nossos formados trabalham".
 *
 * Comportamento:
 *  • Ticker rolando para a esquerda continuamente (requestAnimationFrame).
 *  • Mouse enter na faixa: target speed = 0, easing suave até parar.
 *  • Mouse leave: target speed = 1, retoma a velocidade base.
 *  • Cada bloco é um SVG placeholder em escala de cinza; no :hover do card
 *    a cor original da marca é revelada.
 *
 * Os blocos são placeholders abstratos (forma + cor de marca) — quando
 * existirem os SVGs reais, basta trocar <AlumniMark /> por <img src=...>.
 */

const ALUMNI_BRANDS = [
{ name: 'Itaú', color: '#EC7000', shape: 'circle' },
{ name: 'Bradesco', color: '#CC092F', shape: 'diamond' },
{ name: 'Santander', color: '#EC0000', shape: 'flame' },
{ name: 'Nubank', color: '#820AD1', shape: 'circle' },
{ name: 'Banco do Brasil', color: '#FFEF38', shape: 'circle' },
{ name: 'Caixa', color: '#0070AF', shape: 'square' },
{ name: 'Stone', color: '#00A868', shape: 'square' },
{ name: 'PagBank', color: '#089E47', shape: 'circle' },
{ name: 'B3', color: '#1B365D', shape: 'hex' },
{ name: 'XP Inc.', color: '#FFC709', shape: 'square' },
{ name: 'BTG Pactual', color: '#04243E', shape: 'bars' },
{ name: 'C6 Bank', color: '#1A1A1A', shape: 'hex' },
{ name: 'Mercado Livre', color: '#FFE600', shape: 'circle' },
{ name: 'iFood', color: '#EA1D2C', shape: 'flame' },
{ name: 'Magalu', color: '#0080FF', shape: 'circle' },
{ name: 'Globo', color: '#1A75CF', shape: 'circle' },
{ name: 'Vivo', color: '#660099', shape: 'circle' },
{ name: 'Claro', color: '#DA291C', shape: 'square' },
{ name: 'Petrobras', color: '#008542', shape: 'diamond' },
{ name: 'Vale', color: '#EAA823', shape: 'diamond' },
{ name: 'Embraer', color: '#003DA5', shape: 'triangle' },
{ name: 'Ambev', color: '#C8102E', shape: 'bars' },
{ name: 'Natura', color: '#FF7A00', shape: 'circle' },
{ name: 'Accenture', color: '#A100FF', shape: 'triangle' },
{ name: 'Deloitte', color: '#86BC25', shape: 'square' },
{ name: 'IBM', color: '#0F62FE', shape: 'bars' },
{ name: 'Microsoft', color: '#5E5E5E', shape: 'grid' },
{ name: 'PwC', color: '#D04A02', shape: 'bars' },
{ name: 'KPMG', color: '#00338D', shape: 'square' },
{ name: 'EY', color: '#FFE600', shape: 'diamond' }];


function AlumniMark({ shape, color }) {
  const c = color;
  return (
    <svg viewBox="0 0 32 32" className="alumni-mark" aria-hidden="true">
      <g className="alumni-mark-fill">
        {shape === 'circle' && <circle cx="16" cy="16" r="10" fill={c} />}
        {shape === 'square' && <rect x="6" y="6" width="20" height="20" rx="2" fill={c} />}
        {shape === 'diamond' && <path d="M16 4 L28 16 L16 28 L4 16 Z" fill={c} />}
        {shape === 'hex' && <path d="M16 4 L26 10 L26 22 L16 28 L6 22 L6 10 Z" fill={c} />}
        {shape === 'triangle' && <path d="M16 5 L28 27 L4 27 Z" fill={c} />}
        {shape === 'flame' &&
        <path d="M16 4 C22 11 26 18 16 28 C6 18 10 11 16 4 Z" fill={c} />
        }
        {shape === 'bars' &&
        <React.Fragment>
            <rect x="6" y="6" width="5" height="20" fill={c} />
            <rect x="13" y="6" width="5" height="20" fill={c} opacity="0.75" />
            <rect x="21" y="6" width="5" height="20" fill={c} opacity="0.5" />
          </React.Fragment>
        }
        {shape === 'grid' &&
        <React.Fragment>
            <rect x="6" y="6" width="9" height="9" fill={c} />
            <rect x="17" y="6" width="9" height="9" fill={c} opacity="0.8" />
            <rect x="6" y="17" width="9" height="9" fill={c} opacity="0.6" />
            <rect x="17" y="17" width="9" height="9" fill={c} opacity="0.4" />
          </React.Fragment>
        }
      </g>
    </svg>);

}

function AlumniTicker() {
  const trackRef = React.useRef(null);
  const halfWidthRef = React.useRef(0);
  const posRef = React.useRef(0);
  const targetSpeedRef = React.useRef(1); // 1 = velocidade base; 0 = parado
  const currSpeedRef = React.useRef(1);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // metade da largura = largura de UMA cópia (o conteúdo é duplicado)
    const measure = () => {halfWidthRef.current = el.scrollWidth / 2;};
    measure();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener('resize', measure);

    const BASE_PX_PER_MS = 0.04; // ≈40 px/seg
    const EASE_TAU_MS = 280; // tempo de "ease" entre target e atual

    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(now - last, 64);
      last = now;
      // smooth approach to target speed
      const k = 1 - Math.exp(-dt / EASE_TAU_MS);
      currSpeedRef.current += (targetSpeedRef.current - currSpeedRef.current) * k;
      posRef.current -= dt * BASE_PX_PER_MS * currSpeedRef.current;
      const hw = halfWidthRef.current;
      if (hw > 0) {
        while (posRef.current <= -hw) posRef.current += hw;
        while (posRef.current > 0) posRef.current -= hw;
      }
      el.style.transform = `translate3d(${posRef.current.toFixed(2)}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
    };
  }, []);

  // Respect prefers-reduced-motion
  const reduced = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  React.useEffect(() => {
    if (reduced) targetSpeedRef.current = 0;
  }, [reduced]);

  const onEnter = () => {targetSpeedRef.current = 0;};
  const onLeave = () => {targetSpeedRef.current = reduced ? 0 : 1;};

  const items = ALUMNI_BRANDS.concat(ALUMNI_BRANDS);

  return (
    <div className="alumni-strip" data-comment-anchor="d2ac16fd38-div-147-5">
      <header className="alumni-strip-head">
        <h3 className="alumni-strip-title">
          <span className="alumni-strip-bar" aria-hidden="true"></span>
          Onde nossos formados trabalham
        </h3>
        <span className="alumni-strip-meta hud">
          MBA USP/Esalq · alumni network
        </span>
      </header>

      <div
        className="alumni-ticker"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        tabIndex={-1}
        aria-label="Marcas onde alunos e egressos do MBA USP/Esalq trabalham">
        
        <div className="alumni-ticker-track" ref={trackRef}>
          {items.map((b, i) =>
          <AlumniMark key={i} shape={b.shape} color={b.color} />
          )}
        </div>
      </div>
    </div>);

}

window.AlumniTicker = AlumniTicker;
window.AlumniMark = AlumniMark;