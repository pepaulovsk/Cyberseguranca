# COMPONENTS — Inventário

> Arquivo operacional. Lista o que existe pronto, onde está, e o status.
> Muda com frequência — atualizar conforme componentes forem criados, alterados ou removidos.

---

## Convenções

- **Path**: caminho relativo a partir de `/src/`
- **Status**: `done` · `wip` · `planned` · `external`
- **Origem**: `custom` (feito do zero) · `adapted` (baseado em referência externa) · `library` (instalado de uma lib)

---

## Estrutura do diretório

```
/src/components
  ├── ThemePlayground.tsx     ← menu de customização (não é UI da página, é overlay dev/admin)
  ├── useThemeStore.ts        ← store singleton do tema (consumido pelo Playground e pelo Icon)
  ├── themeBoot.ts            ← snippet inline para aplicar tema antes do React montar (anti-flash)
  ├── Icon.tsx                ← wrapper de solar-icon-set com estilo global controlável
  ├── primitives/             ← átomos do design system
  │   ├── Button.tsx
  │   ├── Badge.tsx
  │   ├── Card.tsx
  │   └── HUDFrame.tsx
  ├── backgrounds/            ← pattern interativos
  │   ├── InteractiveGrid.tsx
  │   └── DotPattern.tsx
  ├── hud/                    ← microcopy decorativa
  │   ├── SerialTag.tsx
  │   ├── Coordinates.tsx
  │   └── BinaryStrip.tsx
  ├── sections/               ← blocos completos da LP
  │   ├── Hero.tsx
  │   ├── ...
  │   └── Footer.tsx
  └── motion/
      └── RevealOnScroll.tsx
```

---

## Inventário

### Primitives

| Componente   | Path                             | Status    | Origem | Observações                                                              |
| ------------ | -------------------------------- | --------- | ------ | ------------------------------------------------------------------------ |
| Button       | `components/primitives/Button`   | `done`    | custom | Variants: `primary`, `secondary`, `ghost`. Squircle (--radius-md), nunca pill. Aceita `icon` + `iconPosition` (`left`/`right`) e `as` (poliforma). |
| Badge        | `components/primitives/Badge`    | `done`    | custom | Tones: `primary` (ciano), `accent` (roxo), `mute`. Aceita `dot`.        |
| Card         | `components/primitives/Card`     | `done`    | custom | Tones: `light` (sobre bg) / `deep` (sobre seções deep). Squircle 18px. Aceita `hudFrame`. |
| HUDFrame     | `components/primitives/HUDFrame` | `done`    | custom | Wrapper que adiciona L-corners ciano. Ver UI-GUIDELINES §8. Usado 2x na página (hero media + instructor media). |

### Backgrounds interativos

| Componente      | Path                                  | Status    | Origem                                                                          | Observações                                                  |
| --------------- | ------------------------------------- | --------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| InteractiveGrid | `components/backgrounds/InteractiveGrid` | `done`    | adapted — [magicui](https://magicui.design/docs/components/interactive-grid-pattern) | Hero only. Cores via `var(--color-primary)`. Respeita `prefers-reduced-motion` (vira grade estática). Prop `intensity` (`off`/`subtle`/`normal`/`strong`) exposta via Tweaks. |
| DotPattern      | `components/backgrounds/DotPattern`   | `done`    | adapted — [shadcn](https://www.shadcn.io/view/backgrounds/dot-pattern)          | Estático. Dots em `--color-border`, com máscara radial. Sem custo runtime. |

**Referências consideradas e descartadas:**
- `animated-grid-pattern` (magicui) — animação contínua mata foco
- `dotted-glow-background` (aceternity) — conflita visualmente com a fonte de luz radial das seções deep
- `dot-pattern` animado (magicui) — usado apenas a versão estática do shadcn equivalente, mais barato

### HUD decorativo

| Componente   | Path                          | Status    | Origem | Observações                                              |
| ------------ | ----------------------------- | --------- | ------ | -------------------------------------------------------- |
| SerialTag    | `components/hud/SerialTag`    | `done`    | custom | Texto tipo `SYS::CRS-7741 / v2.4.1`. Aceita `code`, `system`, `version`, `prefix`. |
| Coordinates  | `components/hud/Coordinates`  | `done`    | custom | LAT/LONG fake. Aceita `lat`, `lng`, `label`.            |
| BinaryStrip  | `components/hud/BinaryStrip`  | `done`    | custom | Linha de 0s e 1s. Aceita `length` e `seed`.             |
| Timestamp    | `components/hud/Timestamp`    | `done`    | custom | Novo. `[hh:mm:ss UTC] 0×HEX`. Não estava no inventário inicial — adicionado porque VISUAL §5 cita timestamps como tipo válido. |

### Motion

| Componente      | Path                            | Status    | Origem | Observações                                                                   |
| --------------- | ------------------------------- | --------- | ------ | ----------------------------------------------------------------------------- |
| RevealOnScroll  | `components/motion/RevealOnScroll` | `done`    | custom | Wrapper com Intersection Observer (sem dep externas). Props: `delay`, `direction` (`up`/`fade`), `as`. Respeita `prefers-reduced-motion` (entra direto no estado final). |

### Sections

| Componente   | Path                       | Status    | Origem | Observações                                                                                       |
| ------------ | -------------------------- | --------- | ------ | ------------------------------------------------------------------------------------------------- |
| Header       | `components/sections/Header`        | `done`    | custom | Sticky nav com brand `MBA USP/Esalq`, links âncora, CTAs. Underline animado nos links. |
| Hero         | `components/sections/Hero`          | `done`    | custom | Tema claro. `InteractiveGrid` background. Imagem real em `assets/placeholder-hero.png` envolvida em `HUDFrame`. Badges (Certificação USP / Cyber Security / Aulas ao vivo). Stats reais com fonte. |
| Mercado      | `components/sections/Mercado`       | `done`    | custom | **Novo · IA §2.** Tema deep alt. 6 cards de stats do mercado (R$6,7M breach, 4M vagas, IA, LGPD, ransomware, 6% resiliência). Lead pergunta-resposta. |
| Carreira     | `components/sections/Carreira`      | `done`    | custom | **Novo · IA §3.** Tema claro com `dot-pattern`. 3 stat cards + tabela de faixa salarial 2026 (5 cargos com destaque visual no topo) + ROI callout com CTA. |
| Diferenciais | `components/sections/Diferenciais`  | `done`    | custom | **Novo · IA §4.** Tema deep. 6 cards de diferenciais USP/Esalq (Certificado, Aulas ao vivo, IA, Rede 80+ países, LGPD/compliance, Business Case). |
| CorpoDocente | `components/sections/CorpoDocente`  | `done`    | custom | **Novo (não estava no inventário inicial).** Substitui o `Instructor` único. Grid 4-col responsivo (4→3→2→1) para 4-8+ professores. Foto placeholder listrada, nome/cargo/credencial/expertise. Conteúdo Lorem — time editorial preenche. |
| Perfil       | `components/sections/Perfil`        | `done`    | custom | **IA §5** (renomeado de `Audience`). Tema claro. 3 personas reais (Profissional de TI, Gestor Estratégico, Compliance/Jurídico) com listas de roles. Nota de foco abaixo. |
| Investimento | `components/sections/Investimento`  | `done`    | custom | **Novo · IA §6.** Tema deep alt. 2 plan cards (Nacional / Internacional, este featured). Preço grande, feature list com checks, CTA por card. ROI callout no rodapé. |
| FAQ          | `components/sections/FAQ`           | `done`    | custom | **IA §7.** Tema claro. 8 perguntas reais. Accordion com `grid-template-rows` (sem JS de altura). |
| CTA          | `components/sections/CTA`           | `done`    | custom | **IA §CTA Final.** Tema deep. Headline real ("Seja um deles"), contatos reais (telefone + email), linha HUD no rodapé. |
| Footer       | `components/sections/Footer`        | `done`    | custom | Brand `MBA USP/Esalq · Cibersegurança`. Links âncora. Meta `Pós-graduação Lato Sensu · © 2026`. |
| ~~Modules~~  | —                                   | `removed` | —      | Substituído por `Diferenciais` (IA §4) — cobre o mesmo espaço com conteúdo real. |
| ~~Stack~~    | —                                   | `removed` | —      | Não estava no IA. Removido para enxugar a página. |
| ~~Testimonials~~ | —                              | `removed` | —      | IA explicita: "retirar (ainda não temos depoimentos de alunos)". |
| ~~Instructor~~ | —                                 | `removed` | —      | Substituído por `CorpoDocente` (múltiplos professores em grid escalável). |

### Icons

| Componente      | Path                  | Status | Origem                                                 | Observações                                                                                          |
| --------------- | --------------------- | ------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Icon            | `components/Icon`     | `done` | adapted — [`solar-icon-set@^2`](https://github.com/480-Design/Solar-Icon-Set) | Wrapper que mapeia `<Icon name="Document" />` + estilo global → componente Solar correspondente. Lazy-loaded por chunk. |
| useThemeStore   | `components/useThemeStore` | `done` | custom                                                 | Store singleton do tema (cor, fonte, radius, iconStyle). Consumido pelo Playground e pelo Icon.       |
| themeBoot       | `components/themeBoot`     | `done` | custom                                                 | Snippet inline para aplicar tema antes do React montar. Ver instruções no próprio arquivo.            |

### Overlay / Dev

| Componente      | Path                          | Status    | Origem | Observações                                                                                                |
| --------------- | ----------------------------- | --------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| ThemePlayground | `components/ThemePlayground`  | `done`    | custom | Menu de customização em runtime. Controla cor, fonte, radius e icon style. Dev-only via `?theme=1` ou `⌘K`. |

---

## Notas de manutenção

- Quando adicionar componente novo, **registrar aqui antes de mergear**.
- Quando mudar a API de um primitivo, atualizar a coluna Observações.
- Componentes `external` (de libs npm) só entram se substituírem algo custom com ganho claro — esta LP prioriza enxutez.

---

## Notas do preview HTML (este projeto)

> Esta entrega é um preview navegável em HTML único (React via CDN + Babel inline). O código em produção (Next/Vite/etc) deve usar os arquivos `.tsx` originais em `/src/components`. Diferenças intencionais documentadas:

- **Icon**: o `Icon.tsx` original consome `solar-icon-set` via npm. Como o preview não tem bundler, o `icon.jsx` aqui usa um catálogo curado de ~25 ícones desenhados in-house, em 6 variantes de estilo (linear/bold/outline/broken/line-duotone/bold-duotone). A API (`<Icon name="X" iconStyle="bold" size={24} color="..." />`) e o controle global via `useThemeStore.iconStyle` são idênticos. Em produção, substituir pelo `Icon.tsx` original sem mudar nenhum call-site.
- **ThemePlayground**: porte fiel do `.tsx`. Único delta: as 7 famílias do Google Fonts já vêm pré-carregadas via `<link>` no `<head>` (em vez de carregar on-demand), o que economiza um round-trip no preview mas não muda o comportamento de runtime. Painel inicia ABERTO neste preview (em produção, manter dev-only via `?theme=1` ou `⌘K`).
- **Subcomponentes auxiliares**: `SectionHeader` (em `sections.jsx`) é um helper visual reusado por Audience/Modules/Stack/Testimonials/FAQ. Não é parte do design system enxuto — está local às sections para não inflar primitives.
- **Tweaks da plataforma**: a LP expõe dois toggles além do `ThemePlayground`:
  - `gridIntensity` (`off`/`subtle`/`normal`/`strong`) — controla `<InteractiveGrid intensity>` no hero
  - `hudDensity` (`minimal`/`calibrated`/`dense`) — ajusta opacidade global e visibilidade da microcopy decorativa
  
  Persistidos via `EDITMODE-BEGIN/END` em `app.jsx`.
