/**
 * backgrounds.jsx — InteractiveGrid (magicui-inspired) + DotPattern (shadcn-inspired)
 *
 * InteractiveGrid:
 *   • Grid de células que se acendem com proximidade do mouse.
 *   • Adaptado de magicui.design/docs/components/interactive-grid-pattern.
 *   • Cores via var(--color-primary) (em vez de hardcoded).
 *   • Respeita prefers-reduced-motion (vira grade estática).
 *   • Density / intensity controlados por props (expostos via Tweaks).
 *
 * DotPattern:
 *   • Estático. Grid de pontos pequenos em var(--color-border).
 *   • Adaptado de shadcn.io/view/backgrounds/dot-pattern.
 *   • Massa visual barata pra seções claras secundárias.
 */
const { useEffect: useEffectBg, useRef: useRefBg, useState: useStateBg } = React;

/* ── InteractiveGrid ──────────────────────────────────────────────────── */
function InteractiveGrid({
  cellSize = 56,
  intensity = 'normal', // 'off' | 'subtle' | 'normal' | 'strong'
  className = '',
  primaryRgb: primaryRgbProp, // Prop takes priority to avoid CSS-read flash on load
}) {
  const wrapRef = useRefBg(null);
  const [cells, setCells] = useStateBg({ cols: 0, rows: 0 });
  const [mouse, setMouse] = useStateBg({ x: -9999, y: -9999, inside: false });
  const reduced = useRefBg(false);
  const [cssRgb, setCssRgb] = useStateBg(
    () => getComputedStyle(document.documentElement).getPropertyValue('--color-primary-rgb').trim() || '0, 203, 201'
  );
  const primaryRgb = primaryRgbProp || cssRgb;

  useEffectBg(() => {
    if (primaryRgbProp) return; // prop-driven — no need to sync from CSS
    const sync = () => setCssRgb(
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary-rgb').trim() || '0, 203, 201'
    );
    window.addEventListener('tweakchange', sync);
    return () => window.removeEventListener('tweakchange', sync);
  }, [primaryRgbProp]);

  // Medir grid e respeitar reduced-motion
  useEffectBg(() => {
    if (intensity === 'off') return;
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const measure = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setCells({
        cols: Math.ceil(rect.width / cellSize) + 1,
        rows: Math.ceil(rect.height / cellSize) + 1,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [cellSize, intensity]);

  // Mouse tracking — escuta no DOCUMENT (não no wrap), pra que o conte\u00fado
  // sobreposto (hero-content, bot\u00f5es, etc) n\u00e3o bloqueie o tracking.
  useEffectBg(() => {
    if (intensity === 'off' || reduced.current) return;
    const onMove = (e) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // S\u00f3 atualiza quando o cursor est\u00e1 dentro da \u00e1rea do wrap
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        inside,
      });
    };
    const onLeave = () => setMouse((m) => ({ ...m, inside: false }));
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [intensity]);

  if (intensity === 'off') return null;

  // Raio de iluminação: ~2.5 células
  const lightRadius = cellSize * 2.5;
  // Alpha base por intensidade
  const baseAlpha =
    intensity === 'subtle' ? 0.10 :
    intensity === 'strong' ? 0.40 :
    0.22;
  // Borda do grid (sempre presente, estática)
  const gridBorder = `rgba(${primaryRgb}, ${intensity === 'subtle' ? 0.04 : 0.07})`;

  // Gerar cells
  const cellsArr = [];
  if (cells.cols && cells.rows) {
    for (let r = 0; r < cells.rows; r++) {
      for (let c = 0; c < cells.cols; c++) {
        const cx = c * cellSize + cellSize / 2;
        const cy = r * cellSize + cellSize / 2;
        let a = 0;
        if (mouse.inside && !reduced.current) {
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < lightRadius) {
            a = (1 - d / lightRadius) * baseAlpha;
          }
        }
        cellsArr.push(
          <div
            key={`${r}-${c}`}
            style={{
              position: 'absolute',
              left: c * cellSize,
              top: r * cellSize,
              width: cellSize,
              height: cellSize,
              background: a > 0.001 ? `rgba(${primaryRgb}, ${a.toFixed(3)})` : 'transparent',
              transition: a > 0 ? 'background 220ms var(--ease-out)' : 'background 480ms var(--ease-out)',
              pointerEvents: 'none',
            }}
          />,
        );
      }
    }
  }

  return (
    <div
      ref={wrapRef}
      className={`ig-wrap ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        backgroundImage:
          `linear-gradient(to right, ${gridBorder} 1px, transparent 1px),` +
          `linear-gradient(to bottom, ${gridBorder} 1px, transparent 1px)`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 50%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, #000 50%, transparent 100%)',
        pointerEvents: 'none', // ouvinte de mouse vive no document, n\u00e3o aqui.
      }}
    >
      {cellsArr}
    </div>
  );
}

/* ── DotPattern ──────────────────────────────────────────────────────── */
function DotPattern({ gap = 22, size = 1.4, color = 'var(--color-border)', className = '' }) {
  return (
    <div
      className={`dot-pattern ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)',
        pointerEvents: 'none',
      }}
    />
  );
}

Object.assign(window, { InteractiveGrid, DotPattern });
