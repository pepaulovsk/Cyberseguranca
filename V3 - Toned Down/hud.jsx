/**
 * hud.jsx — Microcopy decorativa (VISUAL §5, UI §8)
 *
 * Regras universais:
 *   • aria-hidden="true", user-select: none, pointer-events: none
 *   • Tamanho máximo --fs-micro (10px) ou --fs-caption (12px)
 *   • Densidade: 2-4 por seção
 *
 * Conteúdo é gerado livremente (pseudo-telemetria, não comunica nada real).
 */
const { useMemo: useMemoHud } = React;

/* ── SerialTag ─────────────────────────────────────────────────────────
 * Texto tipo SYS::CRS-7741 / v2.4.1
 */
function SerialTag({ code, system = 'SYS', version, prefix }) {
  const text = useMemoHud(() => {
    if (code) return code;
    const parts = [];
    if (prefix) parts.push(prefix);
    parts.push(`${system}::CRS-${randInt(1000, 9999)}`);
    if (version) parts.push(`v${version}`);
    else parts.push(`v${randInt(1, 4)}.${randInt(0, 9)}.${randInt(0, 9)}`);
    return parts.join(' / ');
  }, [code, system, version, prefix]);

  return <span className="hud hud-serial" aria-hidden="true">{text}</span>;
}

/* ── Coordinates ──────────────────────────────────────────────────────
 * LAT/LONG fake. Defaults: SP (~23.5505° S / 46.6333° W)
 */
function Coordinates({ lat, lng, label }) {
  const text = useMemoHud(() => {
    const la = lat ?? `${(23 + Math.random()).toFixed(4)}° S`;
    const lo = lng ?? `${(46 + Math.random()).toFixed(4)}° W`;
    return `LAT ${la} / LONG ${lo}`;
  }, [lat, lng]);
  return (
    <span className="hud hud-coords" aria-hidden="true">
      {label && <span className="hud-coords-label">{label} · </span>}
      {text}
    </span>
  );
}

/* ── BinaryStrip ───────────────────────────────────────────────────────
 * Linha de 0s e 1s. Aceita prop `length`.
 */
function BinaryStrip({ length = 32, seed }) {
  const text = useMemoHud(() => {
    const s = seed || Date.now().toString(36);
    let acc = '';
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    for (let i = 0; i < length; i++) {
      h = (h * 1103515245 + 12345) >>> 0;
      acc += (h & 1) ? '1' : '0';
      if ((i + 1) % 8 === 0 && i !== length - 1) acc += ' ';
    }
    return acc;
  }, [length, seed]);
  return <span className="hud hud-binary" aria-hidden="true">{text}</span>;
}

/* ── Timestamp ─────────────────────────────────────────────────────────
 * Não está no inventário original, mas VISUAL §5 cita timestamps como
 * tipo válido. Útil em vários lugares.
 */
function Timestamp({ value, hex }) {
  const text = useMemoHud(() => {
    const h = (Math.floor(Math.random() * 24)).toString().padStart(2, '0');
    const m = (Math.floor(Math.random() * 60)).toString().padStart(2, '0');
    const s = (Math.floor(Math.random() * 60)).toString().padStart(2, '0');
    const tm = value || `${h}:${m}:${s} UTC`;
    const hx = hex ?? `0×${Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0')}`;
    return `[${tm}] ${hx}`;
  }, [value, hex]);
  return <span className="hud hud-ts" aria-hidden="true">{text}</span>;
}

/* ── MicroBarcode ──────────────────────────────────────────────────────
 * Barras verticais decorativas de largura variável (visual de código de barras).
 */
function MicroBarcode({ seed, bars = 22, height = 24 }) {
  const widths = useMemoHud(() => {
    let h = 0;
    const s = (seed || 'cy') + bars;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return Array.from({ length: bars }, () => {
      h = (h * 1103515245 + 12345) >>> 0;
      return (h % 3) + 1;
    });
  }, [seed, bars]);
  return (
    <div className="hud hud-barcode" aria-hidden="true" style={{ height }}>
      {widths.map((w, i) => <span key={i} style={{ width: w + 'px' }} />)}
    </div>
  );
}

/* ── VersionBlock ───────────────────────────────────────────────────────
 * Bloco de 3–4 linhas: sistema, build, hash, env.
 */
function VersionBlock({ system = 'CY', build, hash, env = 'PROD' }) {
  const data = useMemoHud(() => ({
    sys:   `${system}::SEC`,
    build: build || `2026.${String(randInt(1, 52)).padStart(2, '0')}.${randInt(1, 7)}`,
    hash:  hash  || `0×${randInt(0, 65535).toString(16).toUpperCase().padStart(4, '0')}`,
    env,
  }), [system, build, hash, env]);
  return (
    <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span className="hud">{data.sys}</span>
      <span className="hud">BUILD {data.build}</span>
      <span className="hud">HASH {data.hash}</span>
      <span className="hud">ENV:{data.env}</span>
    </div>
  );
}

/* ── helpers internos ─────────────────────────────────────────────── */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(function injectHudCSS() {
  if (document.getElementById('cy-hud-css')) return;
  const style = document.createElement('style');
  style.id = 'cy-hud-css';
  style.textContent = `
    .hud-serial,
    .hud-coords,
    .hud-binary,
    .hud-ts {
      font-family: var(--font-ui);
      font-size: var(--fs-micro);
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
      user-select: none;
      pointer-events: none;
      white-space: nowrap;
    }
    .section-deep .hud-serial,
    .section-deep .hud-coords,
    .section-deep .hud-binary,
    .section-deep .hud-ts {
      color: rgba(230, 238, 248, 0.42);
    }
    .hud-coords-label { color: var(--color-primary); opacity: 0.8; }
    .hud-binary {
      color: var(--color-text-muted);
      opacity: 0.6;
      font-variant-numeric: tabular-nums;
    }

    /* ── overlay de micro HUD nas seções escuras ───────────────────── */
    .hud-overlay {
      position: absolute !important;
      inset: 0;
      z-index: 0 !important;
      pointer-events: none;
      user-select: none;
      overflow: hidden;
      opacity: var(--hud-micro-opacity, 0.70);
    }
    .hud-corner {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .hud-corner.tl { top: 24px; left: 28px; }
    .hud-corner.tr { top: 24px; right: 28px; align-items: flex-end; text-align: right; }
    .hud-corner.bl { bottom: 24px; left: 28px; }
    .hud-corner.br { bottom: 24px; right: 28px; align-items: flex-end; text-align: right; }
    .hud-corner .hud {
      font-family: var(--font-ui);
      font-size: var(--fs-micro);
      letter-spacing: 0.1em;
      color: var(--color-primary);
      line-height: 1.55;
      white-space: nowrap;
    }
    /* barcode decorativo */
    .hud-barcode {
      display: flex;
      gap: 1.5px;
      align-items: stretch;
    }
    .hud-barcode span {
      display: block;
      background: var(--color-primary);
      border-radius: 0.5px;
      flex-shrink: 0;
    }
    @media (max-width: 768px) {
      .hud-corner.tr,
      .hud-corner.bl { display: none; }
    }
  `;
  document.head.appendChild(style);
})();

Object.assign(window, { SerialTag, Coordinates, BinaryStrip, Timestamp, MicroBarcode, VersionBlock });
