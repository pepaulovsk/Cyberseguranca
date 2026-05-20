/**
 * ThemePlayground.tsx
 * ───────────────────────────────────────────────────────────────────────────
 * Menu de customização em runtime para a landing page do curso de Cyber.
 *
 * COMO ABRIR:
 *   • Adicione `?theme=1` na URL, OU
 *   • Pressione ⌘K (Mac) / Ctrl+K (Windows) em qualquer página
 *
 * O QUE FAZ:
 *   • Escreve CSS custom properties no :root em runtime (cor, fonte, radius)
 *   • Controla o estilo global dos ícones via `useThemeStore` (linear, bold,
 *     outline, broken, line-duotone, bold-duotone)
 *   • Persiste a configuração escolhida em localStorage (`cyber-lp-theme`)
 *   • Permite compartilhar configuração via URL: `?theme=<base64-config>`
 *   • Carrega fontes do Google Fonts on-demand (apenas as escolhidas)
 *
 * ARQUITETURA:
 *   O state vive em `useThemeStore.ts` (store singleton + useSyncExternalStore).
 *   Outros componentes (ex: `<IconStyleProvider />`) leem o tema com `useTheme()`
 *   e reagem automaticamente — sem precisar de Context wrapper no root.
 *
 * ESCOPO ATUAL: paleta (5 cores), 3 fontes, radius global, icon style.
 *   Spacing NÃO é configurável aqui — alterar em runtime quebra layout das seções.
 *
 * VISIBILIDADE: dev-only. Em produção, remover o handler de keydown e
 *   gating em `?theme=1` ou esconder o componente atrás de uma flag de build.
 *
 * IMAGEM PLACEHOLDER: a constante HERO_IMAGE abaixo aponta para o asset real
 *   anexado ao projeto. Para trocar, substituir o caminho.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { ICON_STYLES } from './Icon';
import {
  DEFAULT_THEME,
  STORAGE_KEY,
  initTheme,
  setTheme,
  useTheme,
  type ThemeConfig,
} from './useThemeStore';

/* ─────────────────────────────────────────────────────────────────────────── */
/* PLACEHOLDER ASSET                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

export const HERO_IMAGE = '/assets/placeholder-hero.png';

/* ─────────────────────────────────────────────────────────────────────────── */
/* FONT OPTIONS                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

type FontOption = {
  label: string;
  stack: string;
  googleFontsUrl: string | null;
};

const HEADING_FONTS: FontOption[] = [
  {
    label: 'JetBrains Mono',
    stack: "'JetBrains Mono', ui-monospace, monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap',
  },
  {
    label: 'Space Grotesk',
    stack: "'Space Grotesk', system-ui, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
  },
  {
    label: 'Geist Mono',
    stack: "'Geist Mono', ui-monospace, monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&display=swap',
  },
  {
    label: 'Archivo (Neue Machina-like)',
    stack: "'Archivo', system-ui, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&display=swap',
  },
];

const BODY_FONTS: FontOption[] = [
  {
    label: 'Inter',
    stack: "'Inter', system-ui, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
  },
  {
    label: 'IBM Plex Sans',
    stack: "'IBM Plex Sans', system-ui, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap',
  },
  {
    label: 'General Sans (fallback)',
    stack: "'General Sans', system-ui, sans-serif",
    googleFontsUrl: null,
  },
  {
    label: 'Manrope',
    stack: "'Manrope', system-ui, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap',
  },
];

const UI_FONTS: FontOption[] = [
  {
    label: 'JetBrains Mono',
    stack: "'JetBrains Mono', ui-monospace, monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap',
  },
  {
    label: 'IBM Plex Mono',
    stack: "'IBM Plex Mono', ui-monospace, monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap',
  },
  {
    label: 'Commit Mono',
    stack: "'Commit Mono', ui-monospace, monospace",
    googleFontsUrl: null,
  },
  {
    label: 'Fira Code',
    stack: "'Fira Code', ui-monospace, monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap',
  },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* PRESET PAIRS                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

type Preset = {
  id: string;
  label: string;
  heading: string;
  body: string;
  ui: string;
};

const PRESETS: Preset[] = [
  { id: 'A', label: 'A · Técnico coeso',       heading: 'JetBrains Mono', body: 'Inter',          ui: 'JetBrains Mono' },
  { id: 'B', label: 'B · Editorial cyber',     heading: 'Archivo (Neue Machina-like)', body: 'General Sans (fallback)', ui: 'IBM Plex Mono' },
  { id: 'C', label: 'C · Geométrico friendly', heading: 'Space Grotesk',  body: 'IBM Plex Sans',  ui: 'IBM Plex Mono' },
  { id: 'D', label: 'D · Industrial refinado', heading: 'Archivo (Neue Machina-like)', body: 'Manrope', ui: 'Commit Mono' },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/* HELPERS                                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */

function findFont(list: FontOption[], label: string): FontOption {
  return list.find((f) => f.label === label) ?? list[0];
}

function applyThemeToDOM(theme: ThemeConfig) {
  const root = document.documentElement;

  root.style.setProperty('--color-bg', theme.bg);
  root.style.setProperty('--color-surface', theme.surface);
  root.style.setProperty('--color-deep', theme.deep);
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-accent', theme.accent);

  root.style.setProperty('--font-heading', findFont(HEADING_FONTS, theme.fontHeading).stack);
  root.style.setProperty('--font-body', findFont(BODY_FONTS, theme.fontBody).stack);
  root.style.setProperty('--font-ui', findFont(UI_FONTS, theme.fontUi).stack);

  const scale = theme.radiusLg / 14;
  root.style.setProperty('--radius-sm', `${Math.round(6 * scale)}px`);
  root.style.setProperty('--radius-md', `${Math.round(10 * scale)}px`);
  root.style.setProperty('--radius-lg', `${theme.radiusLg}px`);
  root.style.setProperty('--radius-xl', `${Math.round(18 * scale)}px`);
  root.style.setProperty('--radius-2xl', `${Math.round(24 * scale)}px`);
}

function loadFontStylesheet(url: string, id: string) {
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

function loadFontsFromTheme(theme: ThemeConfig) {
  const fonts = [
    findFont(HEADING_FONTS, theme.fontHeading),
    findFont(BODY_FONTS, theme.fontBody),
    findFont(UI_FONTS, theme.fontUi),
  ];
  fonts.forEach((f) => {
    if (f.googleFontsUrl) {
      loadFontStylesheet(f.googleFontsUrl, `font-${f.label.replace(/[^a-z0-9]/gi, '-')}`);
    }
  });
}

function encodeTheme(theme: ThemeConfig): string {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(theme))));
  } catch {
    return '';
  }
}

function decodeTheme(encoded: string): ThemeConfig | null {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return null;
  }
}

function loadInitialTheme(): ThemeConfig {
  if (typeof window === 'undefined') return DEFAULT_THEME;

  // 1. URL param
  const urlParams = new URLSearchParams(window.location.search);
  const fromUrl = urlParams.get('theme');
  if (fromUrl && fromUrl !== '1') {
    const decoded = decodeTheme(fromUrl);
    if (decoded) return { ...DEFAULT_THEME, ...decoded };
  }

  // 2. localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_THEME, ...JSON.parse(stored) };
  } catch {
    /* ignore */
  }

  // 3. Default
  return DEFAULT_THEME;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* INITIALIZATION HOOK                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

/**
 * Inicializa o tema no client. Chamar uma vez no root da app, fora do
 * ThemePlayground, para que o tema funcione mesmo quando o painel está fechado.
 *
 * Ex:
 *   function App() {
 *     useThemeInit();
 *     return <>...</>;
 *   }
 */
export function useThemeInit() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initial = loadInitialTheme();
    initTheme(initial);
    applyThemeToDOM(initial);
    loadFontsFromTheme(initial);
  }, []);
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* COMPONENT                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

export function ThemePlayground() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const initialized = useRef(false);

  // Init defensivo (caso useThemeInit não tenha sido chamado no root) + keybind
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initial = loadInitialTheme();
    initTheme(initial);
    applyThemeToDOM(initial);
    loadFontsFromTheme(initial);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('theme')) setIsOpen(true);

    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Re-aplicar e persistir quando o tema muda
  useEffect(() => {
    applyThemeToDOM(theme);
    loadFontsFromTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch {
      /* quota / private mode */
    }
  }, [theme]);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}${window.location.pathname}?theme=${encodeTheme(theme)}`;
  }, [theme]);

  const update = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: Preset) => {
    setTheme((prev) => ({
      ...prev,
      fontHeading: preset.heading,
      fontBody: preset.body,
      fontUi: preset.ui,
    }));
  };

  const resetTheme = () => setTheme(DEFAULT_THEME);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-label="Theme Playground" style={panelStyle}>
      <header style={headerStyle}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', opacity: 0.6 }}>
          SYS::THEME-PLAYGROUND · v0.2
        </span>
        <button onClick={() => setIsOpen(false)} style={closeBtnStyle} aria-label="Fechar">×</button>
      </header>

      <Section title="PRESETS">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {PRESETS.map((p) => (
            <button key={p.id} onClick={() => applyPreset(p)} style={presetBtnStyle}>
              {p.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="FONTS">
        <FontSelect label="Heading"  options={HEADING_FONTS} value={theme.fontHeading} onChange={(v) => update('fontHeading', v)} />
        <FontSelect label="Body"     options={BODY_FONTS}    value={theme.fontBody}    onChange={(v) => update('fontBody', v)} />
        <FontSelect label="UI / HUD" options={UI_FONTS}      value={theme.fontUi}      onChange={(v) => update('fontUi', v)} />
      </Section>

      <Section title="ICONS · Solar Icon Set">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {ICON_STYLES.map((s) => (
            <button
              key={s}
              onClick={() => update('iconStyle', s)}
              style={{
                ...iconStyleBtnStyle,
                background:
                  theme.iconStyle === s
                    ? 'rgba(0, 203, 201, 0.18)'
                    : 'rgba(255, 255, 255, 0.04)',
                borderColor:
                  theme.iconStyle === s ? 'rgba(0, 203, 201, 0.5)' : 'rgba(255, 255, 255, 0.08)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <p style={iconHintStyle}>
          Aplica a todos os <code style={inlineCodeStyle}>&lt;Icon /&gt;</code> da página.
        </p>
      </Section>

      <Section title="COLORS">
        <ColorInput label="Background" value={theme.bg}      onChange={(v) => update('bg', v)} />
        <ColorInput label="Surface"    value={theme.surface} onChange={(v) => update('surface', v)} />
        <ColorInput label="Deep"       value={theme.deep}    onChange={(v) => update('deep', v)} />
        <ColorInput label="Primary"    value={theme.primary} onChange={(v) => update('primary', v)} />
        <ColorInput label="Accent"     value={theme.accent}  onChange={(v) => update('accent', v)} />
      </Section>

      <Section title="RADIUS">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="range"
            min={4}
            max={28}
            step={2}
            value={theme.radiusLg}
            onChange={(e) => update('radiusLg', Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, minWidth: 40 }}>{theme.radiusLg}px</span>
        </div>
      </Section>

      <Section title="ACTIONS">
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={resetTheme} style={actionBtnStyle}>Reset</button>
          <button onClick={() => navigator.clipboard?.writeText(shareUrl)} style={actionBtnStyle}>
            Copy share URL
          </button>
        </div>
      </Section>

      <footer style={{ fontFamily: 'var(--font-ui)', fontSize: 10, opacity: 0.4, marginTop: 16, letterSpacing: '0.08em' }}>
        ⌘K / CTRL+K · ESC TO CLOSE
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* SUBCOMPONENTS                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 18 }}>
      <h4 style={sectionTitleStyle}>{title}</h4>
      {children}
    </section>
  );
}

function FontSelect({
  label, options, value, onChange,
}: {
  label: string;
  options: FontOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <span style={fieldLabelStyle}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={selectStyle}>
        {options.map((o) => (
          <option key={o.label} value={o.label}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

function ColorInput({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <span style={fieldLabelStyle}>{label}</span>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} style={colorSwatchStyle} />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={hexInputStyle} />
    </label>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* STYLES                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

const panelStyle: React.CSSProperties = {
  position: 'fixed',
  top: 16,
  right: 16,
  width: 340,
  maxHeight: 'calc(100vh - 32px)',
  overflowY: 'auto',
  padding: 16,
  background: '#0A1628',
  color: '#E6EEF8',
  border: '1px solid rgba(0, 203, 201, 0.3)',
  borderRadius: 14,
  boxShadow: '0 20px 60px -20px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 203, 201, 0.1)',
  zIndex: 9999,
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: 12,
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16,
  paddingBottom: 12,
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
};

const closeBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#E6EEF8',
  fontSize: 20,
  cursor: 'pointer',
  padding: 0,
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.12em',
  color: '#00CBC9',
  margin: '0 0 10px 0',
};

const fieldLabelStyle: React.CSSProperties = {
  fontSize: 11,
  minWidth: 72,
  opacity: 0.7,
};

const selectStyle: React.CSSProperties = {
  flex: 1,
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#E6EEF8',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 6,
  padding: '4px 6px',
  fontSize: 11,
  fontFamily: 'inherit',
};

const colorSwatchStyle: React.CSSProperties = {
  width: 28,
  height: 22,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 4,
  padding: 0,
  background: 'transparent',
  cursor: 'pointer',
};

const hexInputStyle: React.CSSProperties = {
  flex: 1,
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#E6EEF8',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 6,
  padding: '4px 6px',
  fontSize: 11,
  fontFamily: 'inherit',
};

const presetBtnStyle: React.CSSProperties = {
  background: 'rgba(0, 203, 201, 0.08)',
  color: '#E6EEF8',
  border: '1px solid rgba(0, 203, 201, 0.2)',
  borderRadius: 8,
  padding: '8px 10px',
  fontSize: 10,
  fontFamily: 'inherit',
  cursor: 'pointer',
  textAlign: 'left',
  letterSpacing: '0.04em',
};

const iconStyleBtnStyle: React.CSSProperties = {
  color: '#E6EEF8',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 6,
  padding: '8px 10px',
  fontSize: 10,
  fontFamily: 'inherit',
  cursor: 'pointer',
  textAlign: 'left',
  letterSpacing: '0.04em',
  transition: 'background-color 150ms ease, border-color 150ms ease',
};

const iconHintStyle: React.CSSProperties = {
  fontSize: 10,
  opacity: 0.5,
  marginTop: 8,
  marginBottom: 0,
  lineHeight: 1.4,
};

const inlineCodeStyle: React.CSSProperties = {
  background: 'rgba(0, 203, 201, 0.1)',
  padding: '1px 4px',
  borderRadius: 3,
  fontSize: 10,
};

const actionBtnStyle: React.CSSProperties = {
  flex: 1,
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#E6EEF8',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 8,
  padding: '8px 12px',
  fontSize: 11,
  fontFamily: 'inherit',
  cursor: 'pointer',
  letterSpacing: '0.04em',
};
