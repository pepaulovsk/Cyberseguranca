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
  "mbaBg":                  "#FAFAFA",
  "mbaSurface":             "#FFFFFF",
  "mbaDeep":                "#0A1628",
  "mbaAccent":              "#0d3db2",
  "mbaRadius":              14,
  "mbaFontPrimary":         "Poppins",
  "mbaFontPrimaryColor":    "#0A1628",
  "mbaFontSecondary":       "Roboto",
  "mbaFontSecondaryColor":  "#4A5568",
  "mbaFontDeco":            "Roboto",
  "mbaFontDecoColor":       "#0d3db2",
  "cursoBg":                "#FAFAFA",
  "cursoSurface":           "#FFFFFF",
  "cursoDeep":              "#0A1628",
  "cursoAccent":            "#00CBC9",
  "cursoRadius":            14,
  "cursoFontPrimary":       "Poppins",
  "cursoFontPrimaryColor":  "#0A1628",
  "cursoFontSecondary":     "Roboto",
  "cursoFontSecondaryColor":"#4A5568",
  "cursoFontDeco":          "JetBrains Mono",
  "cursoFontDecoColor":     "#00CBC9",
  "tempero":                true,
  "gridIntensity":          "normal",
  "hudDensity":             "minimal",
  "mercadoLightSpeed":      "normal",
  "mercadoLightIntensity":  "medium",
  "mercadoLightWidth":      2,
  "hudMicroOpacity":        70,
  "dotGap":                 32,
  "dotSize":                1.5
}/*EDITMODE-END*/;

function FontRow({ label, fontValue, colorValue, onFont, onColor }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl" style={{ minWidth: 72 }}><span>{label}</span></div>
      <div style={{ display: 'flex', gap: 4, flex: 1, minWidth: 0 }}>
        <input type="color" className="twk-swatch"
               value={colorValue} onChange={(e) => onColor(e.target.value)}
               style={{ width: 24, flexShrink: 0 }} />
        <select className="twk-field" value={fontValue}
                onChange={(e) => onFont(e.target.value)}
                style={{ flex: 1, minWidth: 0 }}>
          {FONTS_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
    </div>
  );
}

function applyHudDensity(value) {
  const root = document.documentElement;
  if (value === 'minimal') {
    root.style.setProperty('--hud-display-secondary', 'none');
    root.style.setProperty('--hud-opacity', '0.55');
  } else if (value === 'dense') {
    root.style.setProperty('--hud-display-secondary', 'inline-flex');
    root.style.setProperty('--hud-opacity', '0.9');
  } else {
    root.style.setProperty('--hud-display-secondary', 'inline-flex');
    root.style.setProperty('--hud-opacity', '1');
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyHudDensity(t.hudDensity); }, [t.hudDensity]);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--color-bg',                  t.mbaBg);
    r.style.setProperty('--color-surface',             t.mbaSurface);
    r.style.setProperty('--color-deep',                t.mbaDeep);
    r.style.setProperty('--mba-color',                 t.mbaAccent);
    const brandRgb = hexToRgbChannels(t.mbaAccent);
    if (brandRgb) r.style.setProperty('--color-brand-rgb', brandRgb);
    const deepRgb = hexToRgbChannels(t.mbaDeep);
    if (deepRgb) r.style.setProperty('--color-deep-rgb', deepRgb);
    r.style.setProperty('--mba-font-primary',          FONT_STACKS[t.mbaFontPrimary]   || t.mbaFontPrimary);
    r.style.setProperty('--mba-font-primary-color',    t.mbaFontPrimaryColor);
    r.style.setProperty('--mba-font-secondary',        FONT_STACKS[t.mbaFontSecondary] || t.mbaFontSecondary);
    r.style.setProperty('--mba-font-secondary-color',  t.mbaFontSecondaryColor);
    r.style.setProperty('--mba-font-deco',             FONT_STACKS[t.mbaFontDeco]      || t.mbaFontDeco);
    r.style.setProperty('--mba-font-deco-color',       t.mbaFontDecoColor);
  }, [t.mbaBg, t.mbaSurface, t.mbaDeep, t.mbaAccent,
      t.mbaFontPrimary, t.mbaFontPrimaryColor,
      t.mbaFontSecondary, t.mbaFontSecondaryColor,
      t.mbaFontDeco, t.mbaFontDecoColor]);

  React.useEffect(() => {
    const r = document.documentElement;
    const scale = t.mbaRadius / 14;
    r.style.setProperty('--radius-sm',  `${Math.round(6  * scale)}px`);
    r.style.setProperty('--radius-md',  `${Math.round(10 * scale)}px`);
    r.style.setProperty('--radius-lg',  `${t.mbaRadius}px`);
    r.style.setProperty('--radius-xl',  `${Math.round(18 * scale)}px`);
    r.style.setProperty('--radius-2xl', `${Math.round(24 * scale)}px`);
  }, [t.mbaRadius]);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--curso-bg',                   t.cursoBg);
    r.style.setProperty('--curso-surface',              t.cursoSurface);
    r.style.setProperty('--curso-deep',                 t.cursoDeep);
    r.style.setProperty('--curso-color',                t.cursoAccent);
    const primaryRgb = hexToRgbChannels(t.cursoAccent);
    if (primaryRgb) r.style.setProperty('--color-primary-rgb', primaryRgb);
    r.style.setProperty('--curso-font-primary',         FONT_STACKS[t.cursoFontPrimary]   || t.cursoFontPrimary);
    r.style.setProperty('--curso-font-primary-color',   t.cursoFontPrimaryColor);
    r.style.setProperty('--curso-font-secondary',       FONT_STACKS[t.cursoFontSecondary] || t.cursoFontSecondary);
    r.style.setProperty('--curso-font-secondary-color', t.cursoFontSecondaryColor);
    r.style.setProperty('--curso-font-deco',            FONT_STACKS[t.cursoFontDeco]      || t.cursoFontDeco);
    r.style.setProperty('--curso-font-deco-color',      t.cursoFontDecoColor);
  }, [t.cursoBg, t.cursoSurface, t.cursoDeep, t.cursoAccent,
      t.cursoFontPrimary, t.cursoFontPrimaryColor,
      t.cursoFontSecondary, t.cursoFontSecondaryColor,
      t.cursoFontDeco, t.cursoFontDecoColor]);

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

  React.useEffect(() => {
    document.documentElement.style.setProperty('--hud-micro-opacity', `${t.hudMicroOpacity / 100}`);
  }, [t.hudMicroOpacity]);

  return (
    <>
      <Header />
      <main>
        <Hero gridIntensity={t.tempero ? t.gridIntensity : 'off'} />
        <Mercado />
        <Carreira />
        <Diferenciais dotGap={t.dotGap} dotSize={t.dotSize} showDots={t.tempero} />
        <Perfil />
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
                <TweakSection label="Colors" />
                <TweakColorInput label="Background" value={t.mbaBg}
                  onChange={(v) => setTweak('mbaBg', v)} />
                <TweakColorInput label="Surface"    value={t.mbaSurface}
                  onChange={(v) => setTweak('mbaSurface', v)} />
                <TweakColorInput label="Deep"       value={t.mbaDeep}
                  onChange={(v) => setTweak('mbaDeep', v)} />
                <TweakColorInput label="Accent"     value={t.mbaAccent}
                  onChange={(v) => setTweak('mbaAccent', v)} />
                <TweakSection label="Typography" />
                <TweakSlider label="Radius" value={t.mbaRadius}
                  min={4} max={28} step={2} unit="px"
                  onChange={(v) => setTweak('mbaRadius', v)} />
                <FontRow label="Primary"
                  fontValue={t.mbaFontPrimary}   colorValue={t.mbaFontPrimaryColor}
                  onFont={(v) => setTweak('mbaFontPrimary', v)}
                  onColor={(v) => setTweak('mbaFontPrimaryColor', v)} />
                <FontRow label="Secondary"
                  fontValue={t.mbaFontSecondary}  colorValue={t.mbaFontSecondaryColor}
                  onFont={(v) => setTweak('mbaFontSecondary', v)}
                  onColor={(v) => setTweak('mbaFontSecondaryColor', v)} />
                <FontRow label="Deco"
                  fontValue={t.mbaFontDeco}        colorValue={t.mbaFontDecoColor}
                  onFont={(v) => setTweak('mbaFontDeco', v)}
                  onColor={(v) => setTweak('mbaFontDecoColor', v)} />
              </>
            ),
          },
          {
            label: 'Curso',
            content: (
              <>
                <TweakSection label="Colors" />
                <TweakColorInput label="Background" value={t.cursoBg}
                  onChange={(v) => setTweak('cursoBg', v)} />
                <TweakColorInput label="Surface"    value={t.cursoSurface}
                  onChange={(v) => setTweak('cursoSurface', v)} />
                <TweakColorInput label="Deep"       value={t.cursoDeep}
                  onChange={(v) => setTweak('cursoDeep', v)} />
                <TweakColorInput label="Accent"     value={t.cursoAccent}
                  onChange={(v) => setTweak('cursoAccent', v)} />
                <TweakSection label="Typography" />
                <TweakSlider label="Radius" value={t.cursoRadius}
                  min={4} max={28} step={2} unit="px"
                  onChange={(v) => setTweak('cursoRadius', v)} />
                <FontRow label="Primary"
                  fontValue={t.cursoFontPrimary}   colorValue={t.cursoFontPrimaryColor}
                  onFont={(v) => setTweak('cursoFontPrimary', v)}
                  onColor={(v) => setTweak('cursoFontPrimaryColor', v)} />
                <FontRow label="Secondary"
                  fontValue={t.cursoFontSecondary}  colorValue={t.cursoFontSecondaryColor}
                  onFont={(v) => setTweak('cursoFontSecondary', v)}
                  onColor={(v) => setTweak('cursoFontSecondaryColor', v)} />
                <FontRow label="Deco"
                  fontValue={t.cursoFontDeco}        colorValue={t.cursoFontDecoColor}
                  onFont={(v) => setTweak('cursoFontDeco', v)}
                  onColor={(v) => setTweak('cursoFontDecoColor', v)} />
                <TweakSection label="Visual Effects" />
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
                    <TweakRadio label="HUD" value={t.hudDensity}
                      onChange={(v) => setTweak('hudDensity', v)}
                      options={[
                        { value: 'minimal',    label: 'Min' },
                        { value: 'calibrated', label: 'Calib' },
                        { value: 'dense',      label: 'Dense' },
                      ]} />
                    <TweakSlider label="Micro HUD" value={t.hudMicroOpacity}
                      min={0} max={100} step={5} unit="%"
                      onChange={(v) => setTweak('hudMicroOpacity', v)} />
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

/* ── HUD density + tempero visibility ── */
(function injectHudDensityCSS() {
  if (document.getElementById('cy-hud-density-css')) return;
  const s = document.createElement('style');
  s.id = 'cy-hud-density-css';
  s.textContent = `
    :root {
      --hud-display-secondary: inline-flex;
      --hud-opacity: 1;
    }
    .hud, .hud-serial, .hud-coords, .hud-binary, .hud-ts {
      opacity: var(--hud-opacity, 1);
    }
    [data-hud-density="minimal"] .hud-coords,
    [data-hud-density="minimal"] .hud-binary,
    [data-hud-density="minimal"] .hud-ts { display: none; }
    [data-tempero="off"] .hud-overlay { display: none; }
  `;
  document.head.appendChild(s);
})();

/* ── Curso tokens → cascade into .section-deep ── */
(function injectCursoTokensCSS() {
  if (document.getElementById('cy-curso-tokens-css')) return;
  const s = document.createElement('style');
  s.id = 'cy-curso-tokens-css';
  s.textContent = `
    :root {
      --curso-bg:       #FAFAFA;
      --curso-surface:  #FFFFFF;
      --curso-deep:     #0A1628;
      --curso-radius-sm: 6px;
      --curso-radius-md: 10px;
      --curso-radius-lg: 14px;
      --curso-radius-xl: 18px;
      --curso-radius-2xl: 24px;
    }
    .section-deep {
      --color-bg:      var(--curso-bg);
      --color-surface: var(--curso-surface);
      --color-deep:    var(--curso-deep);
      --color-accent:  var(--curso-color);
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
