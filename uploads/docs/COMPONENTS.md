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
| Button       | `components/primitives/Button`   | `planned` | custom | Variants: `primary`, `secondary`, `ghost`. Squircle, nunca pill.         |
| Badge        | `components/primitives/Badge`    | `planned` | custom | Para tags, status. Roxo accent ou ciano.                                 |
| Card         | `components/primitives/Card`     | `planned` | custom | Squircle 18px, opcionalmente com HUDFrame.                               |
| HUDFrame     | `components/primitives/HUDFrame` | `planned` | custom | Wrapper que adiciona L-corners ciano. Ver UI-GUIDELINES §8.              |

### Backgrounds interativos

| Componente      | Path                                  | Status    | Origem                                                                          | Observações                                                  |
| --------------- | ------------------------------------- | --------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| InteractiveGrid | `components/backgrounds/InteractiveGrid` | `planned` | adapted — [magicui](https://magicui.design/docs/components/interactive-grid-pattern) | Hero only. Ajustar cor das células acesas para `--color-primary`. |
| DotPattern      | `components/backgrounds/DotPattern`   | `planned` | adapted — [shadcn](https://www.shadcn.io/view/backgrounds/dot-pattern)          | Estático. Dots em `--color-border`. Para seções claras secundárias. |

**Referências consideradas e descartadas:**
- `animated-grid-pattern` (magicui) — animação contínua mata foco
- `dotted-glow-background` (aceternity) — conflita visualmente com a fonte de luz radial das seções deep
- `dot-pattern` animado (magicui) — usado apenas a versão estática do shadcn equivalente, mais barato

### HUD decorativo

| Componente   | Path                          | Status    | Origem | Observações                                              |
| ------------ | ----------------------------- | --------- | ------ | -------------------------------------------------------- |
| SerialTag    | `components/hud/SerialTag`    | `planned` | custom | Texto tipo `SYS::CRS-7741 / v2.4.1`. Aceita prop `code`. |
| Coordinates  | `components/hud/Coordinates`  | `planned` | custom | LAT/LONG fake.                                            |
| BinaryStrip  | `components/hud/BinaryStrip`  | `planned` | custom | Linha de 0s e 1s. Aceita `length` prop.                  |

### Motion

| Componente      | Path                            | Status    | Origem | Observações                                                                   |
| --------------- | ------------------------------- | --------- | ------ | ----------------------------------------------------------------------------- |
| RevealOnScroll  | `components/motion/RevealOnScroll` | `planned` | custom | Wrapper com Intersection Observer. Props: `delay`, `direction` (`up`/`fade`). |

### Sections

| Componente | Path                       | Status    | Origem | Observações                                                                                       |
| ---------- | -------------------------- | --------- | ------ | ------------------------------------------------------------------------------------------------- |
| Hero       | `components/sections/Hero` | `planned` | custom | Usa `InteractiveGrid` de background, imagem placeholder via `HERO_IMAGE` constant. Tema claro.    |
| (demais)   | `components/sections/...`  | `planned` | —      | Time editorial define conteúdo; cada seção alterna entre tema claro e deep conforme o ritmo da página. |

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
