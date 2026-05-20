/**
 * theme-playground.jsx
 * Porte do ThemePlayground.tsx para preview.
 *
 * Diferenças intencionais (documentadas):
 *   • As 7 famílias de fonte já estão pré-carregadas pelo <link> do Google
 *     Fonts no <head>, então não há mais carregamento dinâmico.
 *   • Por padrão neste preview o painel inicia ABERTO (para que a feature
 *     fique visível sem precisar de ?theme=1). Em produção, manter dev-only.
 */
const { useEffect, useMemo, useRef, useState } = React;

/* ── catálogo de fontes ─────────────────────────────────────────────── */
const HEADING_FONTS_LIST = [
  { label: 'JetBrains Mono', stack: "'JetBrains Mono', ui-monospace, monospace" },
  { label: 'Space Grotesk',  stack: "'Space Grotesk', system-ui, sans-serif" },
  { label: 'Archivo (Neue Machina-like)', stack: "'Archivo', system-ui, sans-serif" },
];
const BODY_FONTS_LIST = [
  { label: 'Inter',          stack: "'Inter', system-ui, sans-serif" },
  { label: 'IBM Plex Sans',  stack: "'IBM Plex Sans', system-ui, sans-serif" },
  { label: 'Manrope',        stack: "'Manrope', system-ui, sans-serif" },
];
const UI_FONTS_LIST = [
  { label: 'JetBrains Mono', stack: "'JetBrains Mono', ui-monospace, monospace" },
  { label: 'IBM Plex Mono',  stack: "'IBM Plex Mono', ui-monospace, monospace" },
  { label: 'Fira Code',      stack: "'Fira Code', ui-monospace, monospace" },
];

const PRESETS = [
  { id: 'A', label: 'A · Técnico coeso',       heading: 'JetBrains Mono', body: 'Inter',        ui: 'JetBrains Mono' },
  { id: 'B', label: 'B · Editorial cyber',     heading: 'Archivo (Neue Machina-like)', body: 'IBM Plex Sans', ui: 'IBM Plex Mono' },
  { id: 'C', label: 'C · Geométrico friendly', heading: 'Space Grotesk',  body: 'IBM Plex Sans', ui: 'IBM Plex Mono' },
  { id: 'D', label: 'D · Industrial refinado', heading: 'Archivo (Neue Machina-like)', body: 'Manrope', ui: 'Fira Code' },
];

function findFont(list, label) {
  return list.find((f) => f.label === label) ?? list[0];
}

function applyThemeToDOM(theme) {
  const root = document.documentElement;
  root.style.setProperty('--color-bg', theme.bg);
  root.style.setProperty('--color-surface', theme.surface);
  root.style.setProperty('--color-deep', theme.deep);
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--font-heading', findFont(HEADING_FONTS_LIST, theme.fontHeading).stack);
  root.style.setProperty('--font-body', findFont(BODY_FONTS_LIST, theme.fontBody).stack);
  root.style.setProperty('--font-ui', findFont(UI_FONTS_LIST, theme.fontUi).stack);
  const scale = theme.radiusLg / 14;
  root.style.setProperty('--radius-sm', `${Math.round(6 * scale)}px`);
  root.style.setProperty('--radius-md', `${Math.round(10 * scale)}px`);
  root.style.setProperty('--radius-lg', `${theme.radiusLg}px`);
  root.style.setProperty('--radius-xl', `${Math.round(18 * scale)}px`);
  root.style.setProperty('--radius-2xl', `${Math.round(24 * scale)}px`);
}

function encodeTheme(theme) {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(theme)))); } catch { return ''; }
}
function decodeTheme(encoded) {
  try { return JSON.parse(decodeURIComponent(escape(atob(encoded)))); } catch { return null; }
}
function loadInitialTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const urlParams = new URLSearchParams(window.location.search);
  const fromUrl = urlParams.get('theme');
  if (fromUrl && fromUrl !== '1') {
    const decoded = decodeTheme(fromUrl);
    if (decoded) return { ...DEFAULT_THEME, ...decoded };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_THEME, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_THEME;
}

function useThemeInit() {
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const initial = loadInitialTheme();
    initTheme(initial);
    applyThemeToDOM(initial);
  }, []);
}

/* ── styles (escopados, prefixo tp* para evitar colisão) ─────────────── */
const tpPanel = {
  position: 'fixed', bottom: 16, right: 16, width: 320,
  maxHeight: 'calc(100vh - 32px)', overflowY: 'auto', padding: 16,
  background: '#0A1628', color: '#E6EEF8',
  border: '1px solid rgba(0, 203, 201, 0.3)', borderRadius: 14,
  boxShadow: '0 20px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(0, 203, 201, 0.1)',
  zIndex: 9999, fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 12,
};
const tpToggle = {
  position: 'fixed', bottom: 16, right: 16, zIndex: 9998,
  background: '#0A1628', color: '#E6EEF8',
  border: '1px solid rgba(0, 203, 201, 0.4)',
  padding: '8px 12px', borderRadius: 10,
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer',
};
const tpHeader = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  marginBottom: 16, paddingBottom: 12,
  borderBottom: '1px solid rgba(255,255,255,0.08)',
};
const tpClose = {
  background: 'transparent', border: 'none', color: '#E6EEF8',
  fontSize: 20, cursor: 'pointer', padding: 0, width: 24, height: 24,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const tpSectionTitle = {
  fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
  color: '#00CBC9', margin: '0 0 10px 0',
};
const tpFieldLabel = { fontSize: 11, minWidth: 72, opacity: 0.7 };
const tpSelect = {
  flex: 1, background: 'rgba(255,255,255,0.05)', color: '#E6EEF8',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
  padding: '4px 6px', fontSize: 11, fontFamily: 'inherit',
};
const tpSwatch = {
  width: 28, height: 22, border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 4, padding: 0, background: 'transparent', cursor: 'pointer',
};
const tpHex = {
  flex: 1, background: 'rgba(255,255,255,0.05)', color: '#E6EEF8',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
  padding: '4px 6px', fontSize: 11, fontFamily: 'inherit',
};
const tpPresetBtn = {
  background: 'rgba(0,203,201,0.08)', color: '#E6EEF8',
  border: '1px solid rgba(0,203,201,0.2)', borderRadius: 8,
  padding: '8px 10px', fontSize: 10, fontFamily: 'inherit',
  cursor: 'pointer', textAlign: 'left', letterSpacing: '0.04em',
};
const tpIconBtn = {
  color: '#E6EEF8', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 6, padding: '8px 10px', fontSize: 10,
  fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
  letterSpacing: '0.04em',
  transition: 'background-color 150ms ease, border-color 150ms ease',
};
const tpAction = {
  flex: 1, background: 'rgba(255,255,255,0.05)', color: '#E6EEF8',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
  padding: '8px 12px', fontSize: 11, fontFamily: 'inherit',
  cursor: 'pointer', letterSpacing: '0.04em',
};

function TPSection({ title, children }) {
  return (
    <section style={{ marginBottom: 18 }}>
      <h4 style={tpSectionTitle}>{title}</h4>
      {children}
    </section>
  );
}
function TPFontSelect({ label, options, value, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <span style={tpFieldLabel}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={tpSelect}>
        {options.map((o) => (<option key={o.label} value={o.label}>{o.label}</option>))}
      </select>
    </label>
  );
}
function TPColorInput({ label, value, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <span style={tpFieldLabel}>{label}</span>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} style={tpSwatch} />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={tpHex} />
    </label>
  );
}

function ThemePlayground() {
  const theme = useTheme();
  // Default open neste preview para tornar a feature visível.
  const [isOpen, setIsOpen] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const initial = loadInitialTheme();
    initTheme(initial);
    applyThemeToDOM(initial);

    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    applyThemeToDOM(theme);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(theme)); } catch {}
  }, [theme]);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}${window.location.pathname}?theme=${encodeTheme(theme)}`;
  }, [theme]);

  const update = (key, value) => setTheme((prev) => ({ ...prev, [key]: value }));
  const applyPreset = (preset) => setTheme((prev) => ({
    ...prev,
    fontHeading: preset.heading, fontBody: preset.body, fontUi: preset.ui,
  }));
  const resetTheme = () => setTheme(DEFAULT_THEME);

  if (!isOpen) {
    return (
      <button style={tpToggle} onClick={() => setIsOpen(true)} aria-label="Abrir Theme Playground">
        SYS::THEME ⌘K
      </button>
    );
  }

  return (
    <div role="dialog" aria-label="Theme Playground" style={tpPanel}>
      <header style={tpHeader}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', opacity: 0.6 }}>
          SYS::THEME-PLAYGROUND · v0.2
        </span>
        <button onClick={() => setIsOpen(false)} style={tpClose} aria-label="Fechar">×</button>
      </header>

      <TPSection title="PRESETS">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {PRESETS.map((p) => (
            <button key={p.id} onClick={() => applyPreset(p)} style={tpPresetBtn}>{p.label}</button>
          ))}
        </div>
      </TPSection>

      <TPSection title="FONTS">
        <TPFontSelect label="Heading"  options={HEADING_FONTS_LIST} value={theme.fontHeading} onChange={(v) => update('fontHeading', v)} />
        <TPFontSelect label="Body"     options={BODY_FONTS_LIST}    value={theme.fontBody}    onChange={(v) => update('fontBody', v)} />
        <TPFontSelect label="UI / HUD" options={UI_FONTS_LIST}      value={theme.fontUi}      onChange={(v) => update('fontUi', v)} />
      </TPSection>

      <TPSection title="ICONS · Solar Icon Set">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {ICON_STYLES.map((s) => (
            <button
              key={s}
              onClick={() => update('iconStyle', s)}
              style={{
                ...tpIconBtn,
                background: theme.iconStyle === s ? 'rgba(0,203,201,0.18)' : 'rgba(255,255,255,0.04)',
                borderColor: theme.iconStyle === s ? 'rgba(0,203,201,0.5)' : 'rgba(255,255,255,0.08)',
              }}
            >{s}</button>
          ))}
        </div>
      </TPSection>

      <TPSection title="COLORS">
        <TPColorInput label="Background" value={theme.bg}      onChange={(v) => update('bg', v)} />
        <TPColorInput label="Surface"    value={theme.surface} onChange={(v) => update('surface', v)} />
        <TPColorInput label="Deep"       value={theme.deep}    onChange={(v) => update('deep', v)} />
        <TPColorInput label="Primary"    value={theme.primary} onChange={(v) => update('primary', v)} />
        <TPColorInput label="Accent"     value={theme.accent}  onChange={(v) => update('accent', v)} />
      </TPSection>

      <TPSection title="RADIUS">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input type="range" min={4} max={28} step={2} value={theme.radiusLg}
            onChange={(e) => update('radiusLg', Number(e.target.value))} style={{ flex: 1 }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, minWidth: 40 }}>{theme.radiusLg}px</span>
        </div>
      </TPSection>

      <TPSection title="ACTIONS">
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={resetTheme} style={tpAction}>Reset</button>
          <button onClick={() => navigator.clipboard?.writeText(shareUrl)} style={tpAction}>Copy share URL</button>
        </div>
      </TPSection>

      <footer style={{ fontFamily: 'var(--font-ui)', fontSize: 10, opacity: 0.4, marginTop: 16, letterSpacing: '0.08em' }}>
        ⌘K / CTRL+K · ESC TO CLOSE
      </footer>
    </div>
  );
}

Object.assign(window, { ThemePlayground, useThemeInit });
