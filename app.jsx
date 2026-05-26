/**
 * app.jsx — root da LP.
 */

function hexToRgbChannels(hex) {
  var h = String(hex).replace('#', '');
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  const n = parseInt(h.slice(0, 6), 16);
  if (isNaN(n)) return null;
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function hexToHslComponents(hex) {
  var h = String(hex).replace('#', '');
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  var n = parseInt(h.slice(0, 6), 16);
  if (isNaN(n)) return null;
  var r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l };
  var d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min), hue;
  if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) hue = ((b - r) / d + 2) / 6;
  else hue = ((r - g) / d + 4) / 6;
  return { h: hue * 360, s: s, l: l };
}

// Converte a cor primária em um tint muito escuro (para backgrounds de seções).
// Preserva o hue/matiz, reduz saturação e força lightness baixo.
function primaryToDarkTint(hex, lightness) {
  var hsl = hexToHslComponents(hex);
  if (!hsl) return null;
  var h = hsl.h, s = Math.min(hsl.s * 0.55, 0.35), l = lightness;
  var k = function(n) { return (n + h / 30) % 12; };
  var a = s * Math.min(l, 1 - l);
  var f = function(n) {
    return Math.round((l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))) * 255);
  };
  var rv = f(0), gv = f(8), bv = f(4);
  return {
    hex: '#' + rv.toString(16).padStart(2, '0') + gv.toString(16).padStart(2, '0') + bv.toString(16).padStart(2, '0'),
    rgb: rv + ', ' + gv + ', ' + bv,
  };
}

const FONT_STACKS = {
  'Poppins':        "'Poppins', system-ui, sans-serif",
  'Roboto':         "'Roboto', system-ui, sans-serif",
  'Inter':          "'Inter', system-ui, sans-serif",
  'IBM Plex Sans':  "'IBM Plex Sans', system-ui, sans-serif",
  'Space Grotesk':  "'Space Grotesk', system-ui, sans-serif",
  'Manrope':        "'Manrope', system-ui, sans-serif",
  'Archivo':        "'Archivo', system-ui, sans-serif",
  'JetBrains Mono': "'JetBrains Mono', ui-monospace, monospace",
  'Fira Code':      "'Fira Code', ui-monospace, monospace",
  'IBM Plex Mono':  "'IBM Plex Mono', ui-monospace, monospace",
};

const FONTS_OPTIONS = [
  'Poppins', 'Roboto', 'Inter', 'IBM Plex Sans', 'Space Grotesk',
  'Manrope', 'Archivo', 'JetBrains Mono', 'Fira Code', 'IBM Plex Mono',
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mbaBg":                 "#FAFAFA",
  "mbaBgOpacity":          100,
  "mbaSurface":            "#FFFFFF",
  "mbaSurfaceOpacity":     100,
  "mbaPrimary":            "#0d3db2",
  "mbaPrimaryOpacity":     100,
  "mbaRadius":             14,
  "mbaFontPrimary":        "Poppins",
  "mbaHeading":            "#0A1628",
  "mbaHeadingOpacity":     100,
  "mbaFontSecondary":      "Roboto",
  "mbaBody":               "#2D3748",
  "mbaBodyOpacity":        100,
  "mbaFontDeco":           "Poppins",
  "mbaCaption":            "#5A6779",
  "mbaCaptionOpacity":     100,
  "cursoBg":               "#0F1F38",
  "cursoBgOpacity":        100,
  "cursoSurface":          "#FFFFFF",
  "cursoSurfaceOpacity":   6,
  "cursoHero":             "#0A1628",
  "cursoHeroOpacity":      100,
  "cursoPrimary":          "#b48dc2",
  "cursoPrimaryOpacity":   100,
  "cursoSecondary":        "#A36DFF",
  "cursoSecondaryOpacity": 100,
  "cursoRadius":           14,
  "cursoFontPrimary":      "Poppins",
  "cursoHeading":          "#E6EEF8",
  "cursoHeadingOpacity":   100,
  "cursoFontSecondary":    "Roboto",
  "cursoBody":             "#E6EEF8",
  "cursoBodyOpacity":      80,
  "cursoFontDeco":         "JetBrains Mono",
  "cursoCaption":          "#E6EEF8",
  "cursoCaptionOpacity":   55,
  "tempero":               true,
  "gridIntensity":         "normal",
  "mercadoLightSpeed":     "normal",
  "mercadoLightIntensity": "medium",
  "mercadoLightWidth":     2,
  "dotGap":                32,
  "dotSize":               1.5
}/*EDITMODE-END*/;

// Row: font selector + color picker stacked
function FontRow({ label, fontValue, hex, opacity, onFont, onHex, onOpacity }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div className="twk-row twk-row-h">
        <div className="twk-lbl" style={{ minWidth: 80 }}><span>{label}</span></div>
        <select className="twk-field" value={fontValue}
                onChange={(e) => onFont(e.target.value)}
                style={{ flex: 1, minWidth: 0 }}>
          {FONTS_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <ColorPicker label="" hex={hex} opacity={opacity} onHex={onHex} onOpacity={onOpacity} />
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // ── MBA DS ──────────────────────────────────────────────────────────
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--mba-color-bg',      hexToRgba(t.mbaBg,      t.mbaBgOpacity));
    r.style.setProperty('--mba-color-surface',  hexToRgba(t.mbaSurface,  t.mbaSurfaceOpacity));
    r.style.setProperty('--mba-color-primary',  hexToRgba(t.mbaPrimary,  t.mbaPrimaryOpacity));
    r.style.setProperty('--mba-color-heading',  hexToRgba(t.mbaHeading,  t.mbaHeadingOpacity));
    r.style.setProperty('--mba-color-body',     hexToRgba(t.mbaBody,     t.mbaBodyOpacity));
    r.style.setProperty('--mba-color-caption',  hexToRgba(t.mbaCaption,  t.mbaCaptionOpacity));
    // legacy / cascade roots
    r.style.setProperty('--color-bg',      hexToRgba(t.mbaBg,     t.mbaBgOpacity));
    r.style.setProperty('--color-surface',  hexToRgba(t.mbaSurface, t.mbaSurfaceOpacity));
    r.style.setProperty('--mba-color',      hexToRgba(t.mbaPrimary, t.mbaPrimaryOpacity));
    r.style.setProperty('--color-brand',    hexToRgba(t.mbaPrimary, t.mbaPrimaryOpacity));
    const brandRgb = hexToRgbChannels(t.mbaPrimary);
    if (brandRgb) r.style.setProperty('--color-brand-rgb', brandRgb);
    r.style.setProperty('--mba-font-primary',   FONT_STACKS[t.mbaFontPrimary]   || t.mbaFontPrimary);
    r.style.setProperty('--mba-font-secondary', FONT_STACKS[t.mbaFontSecondary] || t.mbaFontSecondary);
    r.style.setProperty('--mba-font-deco',      FONT_STACKS[t.mbaFontDeco]      || t.mbaFontDeco);
  }, [t.mbaBg, t.mbaBgOpacity, t.mbaSurface, t.mbaSurfaceOpacity,
      t.mbaPrimary, t.mbaPrimaryOpacity,
      t.mbaHeading, t.mbaHeadingOpacity,
      t.mbaBody, t.mbaBodyOpacity,
      t.mbaCaption, t.mbaCaptionOpacity,
      t.mbaFontPrimary, t.mbaFontSecondary, t.mbaFontDeco]);

  React.useEffect(() => {
    const r = document.documentElement;
    const scale = t.mbaRadius / 14;
    r.style.setProperty('--radius-sm',  `${Math.round(6  * scale)}px`);
    r.style.setProperty('--radius-md',  `${Math.round(10 * scale)}px`);
    r.style.setProperty('--radius-lg',  `${t.mbaRadius}px`);
    r.style.setProperty('--radius-xl',  `${Math.round(18 * scale)}px`);
    r.style.setProperty('--radius-2xl', `${Math.round(24 * scale)}px`);
  }, [t.mbaRadius]);

  // ── Curso DS ────────────────────────────────────────────────────────
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--curso-color-bg',        hexToRgba(t.cursoBg,        t.cursoBgOpacity));
    r.style.setProperty('--curso-color-surface',    hexToRgba(t.cursoSurface,    t.cursoSurfaceOpacity));
    r.style.setProperty('--curso-color-hero',       hexToRgba(t.cursoHero,       t.cursoHeroOpacity));
    r.style.setProperty('--curso-color-primary',    hexToRgba(t.cursoPrimary,    t.cursoPrimaryOpacity));
    r.style.setProperty('--curso-color-secondary',  hexToRgba(t.cursoSecondary,  t.cursoSecondaryOpacity));
    r.style.setProperty('--curso-color-heading',    hexToRgba(t.cursoHeading,    t.cursoHeadingOpacity));
    r.style.setProperty('--curso-color-body',       hexToRgba(t.cursoBody,       t.cursoBodyOpacity));
    r.style.setProperty('--curso-color-caption',    hexToRgba(t.cursoCaption,    t.cursoCaptionOpacity));
    // legacy
    r.style.setProperty('--color-deep',   hexToRgba(t.cursoHero, t.cursoHeroOpacity));
    r.style.setProperty('--color-deep-2', hexToRgba(t.cursoBg,   t.cursoBgOpacity));
    r.style.setProperty('--curso-color',  hexToRgba(t.cursoPrimary, t.cursoPrimaryOpacity));
    r.style.setProperty('--color-primary',hexToRgba(t.cursoPrimary, t.cursoPrimaryOpacity));
    const primaryRgb = hexToRgbChannels(t.cursoPrimary);
    if (primaryRgb) r.style.setProperty('--color-primary-rgb', primaryRgb);
    // secondary → accent global
    r.style.setProperty('--color-accent', hexToRgba(t.cursoSecondary, t.cursoSecondaryOpacity));
    const secRgb = hexToRgbChannels(t.cursoSecondary);
    if (secRgb) {
      r.style.setProperty('--color-accent-rgb',      secRgb);
      r.style.setProperty('--color-accent-soft-rgb', secRgb);
      r.style.setProperty('--curso-color-secondary-rgb', secRgb);
    }
    r.style.setProperty('--curso-font-primary',   FONT_STACKS[t.cursoFontPrimary]   || t.cursoFontPrimary);
    r.style.setProperty('--curso-font-secondary', FONT_STACKS[t.cursoFontSecondary] || t.cursoFontSecondary);
    r.style.setProperty('--curso-font-deco',      FONT_STACKS[t.cursoFontDeco]      || t.cursoFontDeco);
    // Backgrounds derivados da cor primária: preservam o hue, força lightness baixo
    // para garantir contraste enquanto "respondem" visualmente ao DS do curso.
    const heroTint = primaryToDarkTint(t.cursoPrimary, 0.08);
    const bgTint   = primaryToDarkTint(t.cursoPrimary, 0.12);
    if (heroTint) {
      r.style.setProperty('--color-deep',       heroTint.hex);
      r.style.setProperty('--curso-color-hero', heroTint.hex);
      r.style.setProperty('--color-deep-rgb',   heroTint.rgb);
    }
    if (bgTint) {
      r.style.setProperty('--color-deep-2',   bgTint.hex);
      r.style.setProperty('--curso-color-bg', bgTint.hex);
    }
  }, [t.cursoBg, t.cursoBgOpacity, t.cursoSurface, t.cursoSurfaceOpacity,
      t.cursoHero, t.cursoHeroOpacity,
      t.cursoPrimary, t.cursoPrimaryOpacity,
      t.cursoSecondary, t.cursoSecondaryOpacity,
      t.cursoHeading, t.cursoHeadingOpacity,
      t.cursoBody, t.cursoBodyOpacity,
      t.cursoCaption, t.cursoCaptionOpacity,
      t.cursoFontPrimary, t.cursoFontSecondary, t.cursoFontDeco]);

  React.useEffect(() => {
    const r = document.documentElement;
    const scale = t.cursoRadius / 14;
    r.style.setProperty('--curso-radius-sm',  `${Math.round(6  * scale)}px`);
    r.style.setProperty('--curso-radius-md',  `${Math.round(10 * scale)}px`);
    r.style.setProperty('--curso-radius-lg',  `${t.cursoRadius}px`);
    r.style.setProperty('--curso-radius-xl',  `${Math.round(18 * scale)}px`);
    r.style.setProperty('--curso-radius-2xl', `${Math.round(24 * scale)}px`);
  }, [t.cursoRadius]);

  React.useEffect(() => {
    document.documentElement.dataset.tempero = t.tempero ? 'on' : 'off';
  }, [t.tempero]);

  React.useEffect(() => {
    const dur = { slow: '14s', normal: '8s', fast: '4s' }[t.mercadoLightSpeed] || '8s';
    document.documentElement.style.setProperty('--mercado-light-dur', dur);
  }, [t.mercadoLightSpeed]);

  React.useEffect(() => {
    const alpha = { subtle: '0.25', medium: '0.6', strong: '0.95' }[t.mercadoLightIntensity] || '0.6';
    document.documentElement.style.setProperty('--mercado-light-alpha', alpha);
  }, [t.mercadoLightIntensity]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--mercado-light-width', `${t.mercadoLightWidth}px`);
  }, [t.mercadoLightWidth]);

  return (
    <>
      <Header />
      <main>
        <Hero gridIntensity={t.tempero ? t.gridIntensity : 'off'} primaryRgb={hexToRgbChannels(t.cursoPrimary) || '0, 203, 201'} />
        <Vision />
        <Mercado />
        <Carreira />
        <Diferenciais dotGap={t.dotGap} dotSize={t.dotSize} showDots={t.tempero} />
        <Perfil />
        <Programa />
        <CorpoDocente />
        <Investimento tempero={t.tempero} />
        <FAQ />
        <CTA dotGap={t.dotGap} dotSize={t.dotSize} showDots={t.tempero} />
      </main>
      <Footer />

      <TweaksPanel title="Design System">
        <TweakTabs tabs={[
          {
            label: 'MBA USP Esalq',
            content: (
              <>
                <TweakSection label="Cores" />
                <ColorPicker label="Background" hex={t.mbaBg}      opacity={t.mbaBgOpacity}
                  onHex={v => setTweak('mbaBg', v)}          onOpacity={v => setTweak('mbaBgOpacity', v)} />
                <ColorPicker label="Surface"    hex={t.mbaSurface}  opacity={t.mbaSurfaceOpacity}
                  onHex={v => setTweak('mbaSurface', v)}     onOpacity={v => setTweak('mbaSurfaceOpacity', v)} />
                <ColorPicker label="Primary"    hex={t.mbaPrimary}  opacity={t.mbaPrimaryOpacity}
                  onHex={v => setTweak('mbaPrimary', v)}     onOpacity={v => setTweak('mbaPrimaryOpacity', v)} />
                <TweakSection label="Tipografia" />
                <FontRow label="Heading"
                  fontValue={t.mbaFontPrimary}  hex={t.mbaHeading}  opacity={t.mbaHeadingOpacity}
                  onFont={v => setTweak('mbaFontPrimary', v)}
                  onHex={v => setTweak('mbaHeading', v)}
                  onOpacity={v => setTweak('mbaHeadingOpacity', v)} />
                <FontRow label="Body"
                  fontValue={t.mbaFontSecondary} hex={t.mbaBody}    opacity={t.mbaBodyOpacity}
                  onFont={v => setTweak('mbaFontSecondary', v)}
                  onHex={v => setTweak('mbaBody', v)}
                  onOpacity={v => setTweak('mbaBodyOpacity', v)} />
                <FontRow label="Caption"
                  fontValue={t.mbaFontDeco}      hex={t.mbaCaption} opacity={t.mbaCaptionOpacity}
                  onFont={v => setTweak('mbaFontDeco', v)}
                  onHex={v => setTweak('mbaCaption', v)}
                  onOpacity={v => setTweak('mbaCaptionOpacity', v)} />
                <TweakSection label="Forma" />
                <TweakSlider label="Raio" value={t.mbaRadius}
                  min={4} max={28} step={2} unit="px"
                  onChange={(v) => setTweak('mbaRadius', v)} />
              </>
            ),
          },
          {
            label: 'Curso',
            content: (
              <>
                <TweakSection label="Cores" />
                <ColorPicker label="Surface"    hex={t.cursoSurface}    opacity={t.cursoSurfaceOpacity}
                  onHex={v => setTweak('cursoSurface', v)}     onOpacity={v => setTweak('cursoSurfaceOpacity', v)} />
                <ColorPicker label="Primary"    hex={t.cursoPrimary}    opacity={t.cursoPrimaryOpacity}
                  onHex={v => setTweak('cursoPrimary', v)}     onOpacity={v => setTweak('cursoPrimaryOpacity', v)} />
                <ColorPicker label="Secondary"  hex={t.cursoSecondary}  opacity={t.cursoSecondaryOpacity}
                  onHex={v => setTweak('cursoSecondary', v)}   onOpacity={v => setTweak('cursoSecondaryOpacity', v)} />
                <TweakSection label="Tipografia" />
                <FontRow label="Heading"
                  fontValue={t.cursoFontPrimary}  hex={t.cursoHeading}  opacity={t.cursoHeadingOpacity}
                  onFont={v => setTweak('cursoFontPrimary', v)}
                  onHex={v => setTweak('cursoHeading', v)}
                  onOpacity={v => setTweak('cursoHeadingOpacity', v)} />
                <FontRow label="Body"
                  fontValue={t.cursoFontSecondary} hex={t.cursoBody}    opacity={t.cursoBodyOpacity}
                  onFont={v => setTweak('cursoFontSecondary', v)}
                  onHex={v => setTweak('cursoBody', v)}
                  onOpacity={v => setTweak('cursoBodyOpacity', v)} />
                <FontRow label="Caption"
                  fontValue={t.cursoFontDeco}      hex={t.cursoCaption} opacity={t.cursoCaptionOpacity}
                  onFont={v => setTweak('cursoFontDeco', v)}
                  onHex={v => setTweak('cursoCaption', v)}
                  onOpacity={v => setTweak('cursoCaptionOpacity', v)} />
                <TweakSection label="Forma" />
                <TweakSlider label="Raio" value={t.cursoRadius}
                  min={4} max={28} step={2} unit="px"
                  onChange={(v) => setTweak('cursoRadius', v)} />
                <TweakSection label="Efeitos Visuais" />
                <TweakToggle label="Tempero" value={t.tempero}
                  onChange={(v) => setTweak('tempero', v)} />
                {t.tempero && (
                  <>
                    <TweakSelect label="Grid" value={t.gridIntensity}
                      onChange={(v) => setTweak('gridIntensity', v)}
                      options={[
                        { value: 'off',    label: 'Off' },
                        { value: 'subtle', label: 'Subtle' },
                        { value: 'normal', label: 'Normal' },
                        { value: 'strong', label: 'Strong' },
                      ]} />
                    <TweakSelect label="Luz cards" value={t.mercadoLightSpeed}
                      onChange={(v) => setTweak('mercadoLightSpeed', v)}
                      options={[
                        { value: 'slow',   label: 'Lenta' },
                        { value: 'normal', label: 'Normal' },
                        { value: 'fast',   label: 'Rápida' },
                      ]} />
                    <TweakRadio label="Intensidade" value={t.mercadoLightIntensity}
                      onChange={(v) => setTweak('mercadoLightIntensity', v)}
                      options={[
                        { value: 'subtle', label: 'Sutil' },
                        { value: 'medium', label: 'Médio' },
                        { value: 'strong', label: 'Forte' },
                      ]} />
                    <TweakSlider label="Stroke luz" value={t.mercadoLightWidth}
                      min={1} max={4} step={0.5} unit="px"
                      onChange={(v) => setTweak('mercadoLightWidth', v)} />
                    <TweakSlider label="Pontos gap" value={t.dotGap}
                      min={12} max={56} step={2} unit="px"
                      onChange={(v) => setTweak('dotGap', v)} />
                    <TweakSlider label="Pontos size" value={t.dotSize}
                      min={0.5} max={3.5} step={0.1} unit="px"
                      onChange={(v) => setTweak('dotSize', v)} />
                  </>
                )}
              </>
            ),
          },
        ]} />
      </TweaksPanel>
    </>
  );
}

/* ── tempero visibility ── */
(function injectTemperoCSS() {
  if (document.getElementById('cy-tempero-css')) return;
  const s = document.createElement('style');
  s.id = 'cy-tempero-css';
  s.textContent = `
    [data-tempero="off"] .hud-overlay { display: none; }
    [data-tempero="off"] .docente-photo-corners,
    [data-tempero="off"] .docente-photo-id,
    [data-tempero="off"] .docente-status { display: none; }
  `;
  document.head.appendChild(s);
})();

/* ── Curso tokens → cascade into .section-deep ── */
(function injectCursoTokensCSS() {
  if (document.getElementById('cy-curso-tokens-css')) return;
  // Pré-computa os tints escuros a partir do primary padrão para evitar flash.
  const defaultPrimary = '#b48dc2';
  const heroInit = primaryToDarkTint(defaultPrimary, 0.08);
  const bgInit   = primaryToDarkTint(defaultPrimary, 0.12);
  const heroColor = heroInit ? heroInit.hex : '#0A1628';
  const bgColor   = bgInit   ? bgInit.hex   : '#0F1F38';
  const s = document.createElement('style');
  s.id = 'cy-curso-tokens-css';
  s.textContent = `
    :root {
      --curso-color-bg:        ${bgColor};
      --curso-color-surface:   rgba(255,255,255,0.06);
      --curso-color-hero:      ${heroColor};
      --color-deep:            ${heroColor};
      --color-deep-2:          ${bgColor};
      --curso-color-secondary: #7C3AED;
      --curso-color-secondary-rgb: 124, 58, 237;
      --curso-radius-sm: 6px; --curso-radius-md: 10px; --curso-radius-lg: 14px;
      --curso-radius-xl: 18px; --curso-radius-2xl: 24px;
    }
    .section-deep {
      --color-surface: var(--curso-color-surface);
      --color-accent:  var(--curso-color-secondary);
      --radius-sm: var(--curso-radius-sm);
      --radius-md: var(--curso-radius-md);
      --radius-lg: var(--curso-radius-lg);
      --radius-xl: var(--curso-radius-xl);
      --radius-2xl: var(--curso-radius-2xl);
    }
  `;
  document.head.appendChild(s);
})();

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(<App />);
