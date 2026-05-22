# UI GUIDELINES — Regras técnicas

> Arquivo operacional-técnico. Define o "como" da implementação.
> Qualquer IA ou pessoa gerando UI para esta landing **deve** seguir as regras abaixo. Quando algo aqui conflitar com a vontade do momento, este arquivo vence.

---

## 1. CSS Variables — Fonte única de verdade

**Toda cor, font, radius e spacing usado em qualquer componente DEVE vir de uma CSS variable.** Valores hardcoded (`#fff`, `16px`, `'Inter'`) são proibidos fora deste arquivo e do `:root`.

Motivo: o `ThemePlayground` reescreve variáveis em `:root` em runtime. Valor hardcoded = quebra do playground.

### Bloco `:root` canônico

```css
:root {
  /* ── COLOR ─────────────────────────────────────── */
  --color-bg: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-deep: #0A1628;
  --color-deep-2: #0F1F38;
  --color-primary: #00CBC9;
  --color-accent: #7C3AED;
  --color-text: #0A1628;
  --color-text-muted: #5A6779;
  --color-text-on-deep: #E6EEF8;
  --color-border: #E5E9F0;
  --color-border-deep: rgba(255, 255, 255, 0.08);

  /* ── TYPOGRAPHY ────────────────────────────────── */
  --font-heading: 'JetBrains Mono', ui-monospace, monospace;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-ui: 'JetBrains Mono', ui-monospace, monospace;

  /* Escala — ver §3 */
  --fs-display: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  --fs-h1: clamp(2rem, 3vw + 1rem, 3rem);
  --fs-h2: 2rem;       /* 32px */
  --fs-h3: 1.5rem;     /* 24px */
  --fs-h4: 1.25rem;    /* 20px */
  --fs-body-lg: 1.125rem;  /* 18px */
  --fs-body: 1rem;     /* 16px */
  --fs-body-sm: 0.875rem;  /* 14px — exceção da escala */
  --fs-caption: 0.75rem;   /* 12px */
  --fs-micro: 0.625rem;    /* 10px — só para HUD/telemetria */

  /* ── SPACING (grid 4/8) ────────────────────────── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-14: 56px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  /* Exceções permitidas — usar com critério */
  --space-1-5: 6px;
  --space-2-5: 10px;
  --space-3-5: 14px;

  /* ── RADIUS ────────────────────────────────────── */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --radius-2xl: 24px;
  /* Squircle aproximado: usar var(--radius-lg) ou superior + clip-path quando aplicável */
  /* PROIBIDO: 9999px (pill) em botões. */

  /* ── MOTION ────────────────────────────────────── */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;

  /* ── LAYOUT ────────────────────────────────────── */
  --container-max: 1280px;
  --container-padding: clamp(16px, 4vw, 48px);
}
```

---

## 2. Spacing — Grid 4/8

Use **apenas** os valores definidos em `--space-*`. Combinações são compostas, não inventadas.

- Padding interno mínimo de componente: `--space-4` (16px)
- Gap entre seções: `--space-24` (96px) desktop, `--space-16` (64px) mobile
- Gap entre cards num grid: `--space-6` (24px)
- Padding de botão: vertical `--space-3` (12px), horizontal `--space-5` (20px)

Exceções `6 / 10 / 14` existem para casos onde o ritmo de 8 quebra a microcomposição (ex: badge de status, espaçamento entre ícone e label). Não usar para layout macro.

---

## 3. Tipografia — Escala e uso

| Token            | Tamanho            | Uso                                  | Família                  |
| ---------------- | ------------------ | ------------------------------------ | ------------------------ |
| `--fs-display`   | fluid 40-72px      | Hero único da página                 | `--font-heading`         |
| `--fs-h1`        | fluid 32-48px      | Título de seção principal            | `--font-heading`         |
| `--fs-h2`        | 32px               | Subtítulo de seção                   | `--font-heading`         |
| `--fs-h3`        | 24px               | Card titles, blocos internos         | `--font-heading`         |
| `--fs-h4`        | 20px               | Sub-blocos                           | `--font-heading` ou body |
| `--fs-body-lg`   | 18px               | Lead paragraph                       | `--font-body`            |
| `--fs-body`      | 16px               | Texto corrido                        | `--font-body`            |
| `--fs-body-sm`   | 14px               | Captions, ajudas, metadata           | `--font-body`            |
| `--fs-caption`   | 12px               | Labels, badges                       | `--font-body` ou ui      |
| `--fs-micro`     | 10px               | HUD, telemetria decorativa           | `--font-ui` obrigatório  |

### Regras

- **Line-height**: headings `1.1`, body `1.6`, micro/caption `1.4`.
- **Letter-spacing**: headings em mono podem receber `-0.01em`. Microcopy HUD recebe `+0.08em` (tracking solto para parecer telemetria).
- **Font-weight body**: 400 normal, 500 medium para destaque inline, 600 para subtítulos. Evitar 700+ em body.
- **Font-weight heading**: 500-700 dependendo da família. JetBrains Mono 700 é o default da heading.
- **Nunca** justificar texto. Sempre `text-align: left` (ou center em casos pontuais como hero).

---

## 4. Cor — Aplicação e contraste

### Hierarquia de uso

- **Branco/off-white**: bg da maioria das seções
- **Azul deep**: seções de imersão (1-3 por página, blocos inteiros, não micro-blocos)
- **Ciano `#00CBC9`**: CTAs primários, highlight de keyword no heading, fonte de luz em seções deep, ícones de check/status
- **Roxo `#7C3AED`**: badges, secondary hover, micro-decoração HUD, gradient pontual

### Contraste — WCAG AA mínimo, AAA preferido

- Texto sobre `--color-bg`: usar `--color-text` (#0A1628 — passa AAA)
- Texto sobre `--color-deep`: usar `--color-text-on-deep` (#E6EEF8 — passa AAA)
- **Ciano sobre branco**: `#00CBC9` em texto pequeno NÃO passa contraste. Usar apenas para:
  - Elementos gráficos não-textuais (linhas, ícones, fontes de luz)
  - Texto em tamanho ≥ 24px e peso ≥ 600
  - Em CTAs com bg ciano, usar texto `--color-deep`, não branco
- **Ciano sobre deep**: contraste excelente, pode usar texto.
- Sempre validar com tooling (ex: WebAIM Contrast Checker) antes de finalizar.

### Fonte de luz nas seções deep

```css
.section-deep {
  background: var(--color-deep);
  position: relative;
  overflow: hidden;
}
.section-deep::before {
  content: '';
  position: absolute;
  /* Alternar canto entre seções — top-right e bottom-left */
  top: -20%;
  right: -10%;
  width: 60%;
  aspect-ratio: 1;
  background: radial-gradient(
    circle,
    rgba(0, 203, 201, 0.25) 0%,
    rgba(0, 203, 201, 0) 60%
  );
  pointer-events: none;
}
```

---

## 5. Border-radius — Squircles, nunca pills

- **Cards, painéis, inputs**: `--radius-lg` (14px) ou `--radius-xl` (18px)
- **Botões**: `--radius-md` (10px) ou `--radius-lg` (14px). **Proibido `9999px`.**
- **Badges/chips pequenos**: `--radius-sm` (6px)
- **Imagens e media**: `--radius-xl` (18px) ou `--radius-2xl` (24px)

### Squircle real via `corner-shape` (progressive enhancement)

Browsers modernos suportam a propriedade nativa [`corner-shape`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/corner-shape-value), que altera a curva do `border-radius` para uma squircle real (curvatura contínua G2, estilo iOS) sem precisar de SVG, clip-path ou hacks.

**Aplicar globalmente** em todos os elementos com `border-radius` >= `--radius-md`:

```css
/* Aplica squircle em containers significativos.
   Browsers sem suporte ignoram `corner-shape` e usam o border-radius normal — fallback automático. */
.card,
.btn,
input,
textarea,
.media,
.surface {
  corner-shape: squircle;
}
```

Ou aplicar via helper class para casos específicos:

```css
.squircle {
  corner-shape: squircle;
}
```

**Status de suporte**: propriedade recente, ainda em rollout. **Comportamento esperado em browser sem suporte**: a declaração é descartada silenciosamente e o `border-radius` original renderiza no modo arredondado convencional. Não há quebra visual nem layout shift — é progressive enhancement puro.

**Não usar** SVG masks, `clip-path` poligonal ou bibliotecas externas para aproximar squircle. O custo de manutenção e o impacto em performance/acessibilidade não compensa o ganho estético em browsers que ainda não suportam a propriedade nativa.

---

## 6. Estados

Todos os elementos interativos têm 4 estados obrigatórios: **default, hover, focus, active**. Adicionar `disabled` quando aplicável.

### Botão primário (referência)

```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-deep);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  font-family: var(--font-ui);
  font-size: var(--fs-body-sm);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition:
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
  cursor: pointer;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px -8px rgba(0, 203, 201, 0.4);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
.btn-primary:active {
  transform: translateY(0);
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

### Foco — acessibilidade não é opcional

- **Sempre** ter `:focus-visible` estilizado. Nunca `outline: none` sem substituto.
- `outline-offset: 3px` como padrão para dar respiro.

---

## 7. Motion — Reveal e microinterações

### Reveal on viewport

Usar **Intersection Observer** (ou Motion / Framer Motion no React). Não usar bibliotecas de scroll-trigger pesadas (AOS, ScrollReveal) — overhead desnecessário.

```css
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

Stagger entre itens de uma mesma lista: `transition-delay` incrementado em 60ms por item. Limite: 8 itens (depois o stagger fica longo demais).

### Microinterações com mouse

**Decidido para esta LP** (de 5 referências enviadas):

1. **Hero**: `interactive-grid-pattern` (magicui) — grid de células que se acendem com proximidade do mouse. É o efeito de maior impacto, fica no primeiro fold.
2. **Seções secundárias claras**: `dot-pattern` simples (estático, baixo overhead) com leve glow ciano onde o conteúdo principal sobrepõe.
3. **Seções deep**: sem grid/dots — a fonte de luz radial já preenche o papel atmosférico. Adicionar grid em cima vira ruído.

**Não usar**: animated-grid-pattern (animação contínua mata atenção), dotted-glow-background (sobrepõe mal com a fonte de luz ciano).

### `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .reveal { opacity: 1; transform: none; }
}
```

Obrigatório. Reveal-on-scroll inteiro precisa cair pra estado final imediato.

---

## 8. HUD & Micro-UI decorativa

Elementos não-semânticos que dão textura cyberpunk. Regras:

- **Sempre** `aria-hidden="true"` e `user-select: none`.
- **Sempre** `pointer-events: none` (não devem capturar clique).
- Tamanho máximo: `--fs-micro` (10px) ou `--fs-caption` (12px).
- Cor: `--color-text-muted` sobre claro, `--color-text-on-deep` com opacidade 0.4 sobre deep.
- Densidade: 2-4 elementos HUD por seção, no máximo. Mais que isso vira poluição.

### Tipos a usar

- Serial numbers: `SYS::CRS-7741`, `OPS-v2.4.1`
- Coordenadas falsas: `LAT 23.5505° S / LONG 46.6333° W`
- Timestamps: `[17:42:03 UTC]`, `0×4F2A`
- Binários decorativos: linhas curtas de `0` e `1`
- Bar codes: SVG decorativo (não escaneável de verdade)
- L-shaped corners em alguns cards (não todos)

### L-corner helper

```css
.hud-frame {
  position: relative;
  /* Container sem border próprio */
}
.hud-frame::before,
.hud-frame::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid var(--color-primary);
}
.hud-frame::before { top: 0; left: 0; border-right: none; border-bottom: none; }
.hud-frame::after  { bottom: 0; right: 0; border-left: none; border-top: none; }
```

---

## 9. Imagens

- Formato: `webp` ou `avif`. Fallback `jpg`.
- Lazy loading: `loading="lazy"` em tudo abaixo do first fold.
- Border-radius: `--radius-xl` ou `--radius-2xl`.
- Alt text descritivo. Imagens puramente decorativas: `alt=""`.
- **Placeholder do hero**: arquivo real em `/public/assets/placeholder-hero.png`. Trocar o `src` no `ThemePlayground.tsx` (variável `HERO_IMAGE`) ou diretamente no componente do hero.

---

## 9.5. Ícones — Solar Icon Set

Único set de ícones aprovado para a LP: [`solar-icon-set`](https://github.com/480-Design/Solar-Icon-Set) (v2.x). Seis estilos disponíveis: `linear`, `bold`, `outline`, `broken`, `line-duotone`, `bold-duotone`.

### Como usar

**Sempre via wrapper `<Icon />`** (não importar componentes Solar diretamente, salvo casos críticos — ver "Performance"):

```tsx
import { Icon } from '@/components/Icon';

<Icon name="ShieldCheck" size={20} />
<Icon name="Document" size={24} color="var(--color-primary)" />
```

A prop `name` é o nome PascalCase do ícone **sem sufixo de estilo**. O wrapper concatena o estilo global atual automaticamente (ex: `name="Document"` + estilo `bold` → renderiza `DocumentBold`).

### Estilo global vs override pontual

O estilo padrão vem do `useThemeStore` (controlado pelo `ThemePlayground`). Para override pontual:

```tsx
<Icon name="Lock" iconStyle="bold-duotone" />
```

**Não usar override sem motivo claro.** O ponto de ter controle global é manter consistência visual — overrides fragmentam o look.

### Tamanhos

Usar valores do grid 4/8 já documentado:

- `16` — inline em texto pequeno
- `20` — default; inline em body, botões, listas
- `24` — botões maiores, cards
- `32` — destaque em feature cards
- `48+` — apenas em ilustrações decorativas (raríssimo)

### Cor

- Default `currentColor` (herda do texto) — preferir essa abordagem
- Override via prop: `color="var(--color-primary)"`
- **Sempre** usar CSS variable, nunca hex direto

### Performance

O wrapper usa `React.lazy` + `Suspense` — cada ícone carrega como chunk separado. Bom para a maior parte da página, mas evitar em:

- **Above-the-fold**: hero, header — o flash do fallback é perceptível
- **CTAs primários**: qualquer atraso prejudica conversão

Para esses casos, importar o componente Solar **estaticamente** e perder o controle global de estilo nesses ícones específicos:

```tsx
import { ShieldCheckLinear } from 'solar-icon-set';
<ShieldCheckLinear size={20} color="var(--color-primary)" />
```

Documentar no comentário do componente que o estilo está fixo intencionalmente.

### Acessibilidade

- Ícone decorativo (acompanha texto que já comunica): `aria-hidden="true"`
- Ícone semântico (botão só com ícone): `aria-label="Ação descritiva"` no botão pai, nunca no ícone
- Ícone informativo (status, indicador): considerar `<title>` dentro do SVG ou texto auxiliar com `sr-only`

### ✅ Do

- Usar CSS variables para tudo.
- Validar contraste em cada combinação de cor.
- Animar via CSS quando possível; Motion (Framer) só quando necessário.
- Testar a página com `prefers-reduced-motion: reduce` ativo.
- Compor spacing somando tokens, não inventando valores.
- Marcar HUD/decorativo como `aria-hidden`.
- Squircle (raio elíptico) em containers grandes quando o esforço cabe.
- Usar `<Icon name="..." />` (do wrapper) em vez de importar componentes Solar diretamente — exceto em above-the-fold.

### ❌ Don't

- Hardcoded color, font, spacing, radius.
- Pill buttons (`border-radius: 9999px`).
- Gradient ciano → roxo em CTA.
- Grid animado em todas as seções.
- Texto ciano #00CBC9 em tamanho pequeno sobre branco.
- HUD que captura clique ou aparece no DOM acessível.
- Reveal-on-scroll sem fallback de reduced-motion.
- Mais de uma seção deep adjacente sem respiro claro entre elas.
- Misturar sets de ícones diferentes — apenas Solar Icon Set nesta LP.
- Override de `iconStyle` em ícones individuais sem motivo documentado.

---

## 11. Checklist antes de mergear

- [ ] Toda cor/font/spacing/radius usa CSS variable
- [ ] Contraste WCAG AA validado em todas as combinações
- [ ] Estados hover/focus/active definidos em todos os interativos
- [ ] `focus-visible` estilizado, nunca `outline: none` puro
- [ ] `prefers-reduced-motion` respeitado
- [ ] HUD com `aria-hidden`, `user-select: none`, `pointer-events: none`
- [ ] Imagens com lazy loading abaixo do fold
- [ ] `ThemePlayground` ainda muda toda a paleta/fonts (teste rápido)
- [ ] Sem botões pill
- [ ] `corner-shape: squircle` aplicado em containers significativos (com fallback gracioso para `border-radius` em browsers sem suporte)
- [ ] Sem gradient cliché
