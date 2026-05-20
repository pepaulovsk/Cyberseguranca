/**
 * app.jsx — root da LP.
 * Wires:
 *   • useThemeInit() — aplica tema do localStorage/URL
 *   • <ThemePlayground /> — painel dev (visível por padrão neste preview)
 *   • <TweaksPanel /> — controles da plataforma (densidade HUD, intensidade do grid)
 *   • Seções na ordem definida
 */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "gridIntensity": "normal",
  "hudDensity": "calibrated"
}/*EDITMODE-END*/;

function applyHudDensity(value) {
  // 'minimal' esconde tudo exceto SerialTag; 'dense' aumenta opacidade
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
  useThemeInit();

  // Tweaks panel state — só aplica side-effects, sem reflow custoso.
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyHudDensity(t.hudDensity); }, [t.hudDensity]);

  return (
    <>
      <Header />
      <main>
        <Hero gridIntensity={t.gridIntensity} />
        <Mercado />
        <Carreira />
        <Diferenciais />
        <CorpoDocente />
        <Perfil />
        <Investimento />
        <FAQ />
        <CTA />
      </main>
      <Footer />

      <ThemePlayground />

      <TweaksPanel title="Tweaks">
        <TweakSection label="HUD">
          <TweakRadio
            label="Densidade"
            value={t.hudDensity}
            onChange={(v) => setTweak('hudDensity', v)}
            options={[
              { value: 'minimal',     label: 'Min' },
              { value: 'calibrated',  label: 'Calib' },
              { value: 'dense',       label: 'Denso' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Hero · InteractiveGrid">
          <TweakSelect
            label="Intensidade"
            value={t.gridIntensity}
            onChange={(v) => setTweak('gridIntensity', v)}
            options={[
              { value: 'off',    label: 'Off (estático sem grid)' },
              { value: 'subtle', label: 'Sutil' },
              { value: 'normal', label: 'Normal (default)' },
              { value: 'strong', label: 'Forte' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

/* ── injetar regras de densidade HUD (varia opacidade global dos hud-*) ── */
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
    /* Quando minimal, esconde Coordinates, Binary, Timestamp; mantém Serial e eyebrow */
    [data-hud-density="minimal"] .hud-coords,
    [data-hud-density="minimal"] .hud-binary,
    [data-hud-density="minimal"] .hud-ts {
      display: none;
    }
  `;
  document.head.appendChild(s);
})();

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(<App />);
