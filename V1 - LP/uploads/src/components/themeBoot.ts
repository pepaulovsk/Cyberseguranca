/**
 * themeBoot.ts
 * ───────────────────────────────────────────────────────────────────────────
 * Script inline que roda ANTES do React montar, aplicando o tema salvo do
 * localStorage diretamente no :root. Evita o "flash" do tema padrão que
 * aconteceria entre o HTML inicial chegar e o React hidratar.
 *
 * COMO USAR:
 *   Em Next.js (app router): colocar dentro de <head> no layout.tsx:
 *     <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
 *
 *   Em Vite/CRA: copiar o conteúdo de `themeBootScript` para uma tag <script>
 *   inline no index.html, ANTES do bundle do React.
 *
 *   Em Remix: colocar em root.tsx dentro de <head>.
 *
 * Se você não usa SSR, este snippet ainda funciona (e roda tão rápido que é
 * imperceptível). Não precisa remover.
 */

export const themeBootScript = `
(function() {
  try {
    var stored = localStorage.getItem('cyber-lp-theme');
    if (!stored) {
      // Tenta URL param
      var params = new URLSearchParams(window.location.search);
      var fromUrl = params.get('theme');
      if (fromUrl && fromUrl !== '1') {
        try { stored = decodeURIComponent(escape(atob(fromUrl))); } catch(e) {}
      }
    }
    if (!stored) return;

    var theme = JSON.parse(stored);
    var root = document.documentElement;

    if (theme.bg)      root.style.setProperty('--color-bg', theme.bg);
    if (theme.surface) root.style.setProperty('--color-surface', theme.surface);
    if (theme.deep)    root.style.setProperty('--color-deep', theme.deep);
    if (theme.primary) root.style.setProperty('--color-primary', theme.primary);
    if (theme.accent)  root.style.setProperty('--color-accent', theme.accent);

    if (theme.radiusLg) {
      var scale = theme.radiusLg / 14;
      root.style.setProperty('--radius-sm',  Math.round(6 * scale)  + 'px');
      root.style.setProperty('--radius-md',  Math.round(10 * scale) + 'px');
      root.style.setProperty('--radius-lg',  theme.radiusLg + 'px');
      root.style.setProperty('--radius-xl',  Math.round(18 * scale) + 'px');
      root.style.setProperty('--radius-2xl', Math.round(24 * scale) + 'px');
    }

    // Fontes não são aplicadas aqui — o link do Google Fonts demora pra carregar
    // de qualquer forma, então o React assume essa parte sem prejuízo visual.
  } catch(e) {
    // Falha silenciosa: o React assume e aplica o tema normalmente.
  }
})();
`;
