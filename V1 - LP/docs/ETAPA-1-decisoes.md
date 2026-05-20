# Etapa 1 — Simplificação e alinhamento de marca

> **Objetivo**: aproximar a LP atual do DNA visual do MBA USP/Esalq, removendo / atenuando o que destoa.
> **Escopo proibido**: não reorganizo estrutura, não troco paleta (cyan/roxo continuam), não introduzo elementos novos. Apenas calibro.
>
> A LP atual gritava cyberpunk-terminal. A referência institucional é sóbria, datada, sem decoração performática. Vou descer o volume da LP até ela soar como "parente bem-vestido da referência" — sem ainda ter trocado paleta nem reaplicado tempero (Etapas 2 e 3).

---

## 1. Tipografia — única restrição que toco nesta etapa

A restrição "Poppins + Roboto" é fixa em todas as etapas, então já entra agora. Trocar a tipografia sozinha já produz ~50% da aproximação institucional, porque JetBrains Mono em headings é o que mais "grita cyber" hoje.

| Variável | Antes | Depois |
|---|---|---|
| `--font-heading` | JetBrains Mono 700 (monospace, display) | **Poppins** (sans humanista, peso 600/700) |
| `--font-body` | Inter | **Roboto** |
| `--font-ui` | JetBrains Mono (eyebrows, badges, botões, hud) | **Roboto** (peso 500, tracking solto para eyebrow/badge) |

Eyebrow continua maiúsculo com `letter-spacing` solto — esse é padrão institucional, não cyber. Só muda a face. ThemePlayground recebe Poppins/Roboto como opções e default; presets exploratórios (Space Grotesk, Archivo etc.) continuam disponíveis para A/B futuro, mas a LP carrega sempre institucional.

---

## 2. Remover (com justificativa)

| Item | Onde | Por que sai |
|---|---|---|
| `SerialTag`, `BinaryStrip`, `Coordinates`, `Timestamp` em SectionHeaders | Mercado, Carreira, Diferenciais, Docentes, Perfil, Investimento, FAQ | Pseudo-telemetria fake. Tempero puro do registro cyberpunk; não existe equivalente em LP institucional. Voltam controlados na **Etapa 3 — Slot 3**, sob parcimônia. |
| `hero-hud-tl` (BinaryStrip flutuando no canto sup-esq do hero) | Hero | Decoração flutuante, característica de painel HUD. |
| `hero-hud-br` (SerialTag flutuando no canto inf-dir do hero) | Hero | Mesmo motivo. |
| `cta-hud-row` (Serial + Coordinates + Timestamp no rodapé do CTA) | CTA | Triplica HUD na seção que deveria fechar limpa. |
| `docentes-foot` BinaryStrip | Corpo docente | Mesma família, redundante. |
| Badges "Cyber Security" e "Aulas ao vivo" no hero | Hero | "Cyber Security" em inglês + roxo accent acumula tom tech-genérico. Sobra apenas **"Certificação USP"** — o ativo institucional. |
| `.hero-keyword::after` (sublinhado em gradiente ciano) | Hero | Detalhe ornamental que não tem paralelo na referência. O destaque vai por cor pura, não por adorno. |
| `.docente-photo-id` (ID `PRF-0000` fake na foto) | Docentes | Mesma família HUD. |
| `.section-deep::before` e `.section-deep.alt::before` (radial glow ciano/roxo) | Mercado, Diferenciais, Investimento, CTA | A "luz ciano nos cantos" era a marca registrada cyberpunk explícita (Visual Direction §6). Seções deep ficam lisas. |
| `.hero-image` (placeholder PNG de fundo + filtros) | Hero | Imagem stock-techy que está como placeholder. Hero deep liso até ter imagem real (decisão do time). |
| `.hero-overlay` complexo (radial+linear empilhados) | Hero | Sem imagem, vira só azul deep sólido. |
| `.salary-row-top` background gradient ciano | Carreira | Linha do CISO ganha peso por tipografia + badge, não por gradiente. |
| `.plan-card.is-featured` box-shadow + gradient interno | Investimento | Glow noturno; é o tipo de adorno que a referência institucional não usa para diferenciar planos. Diferenciação vai pela borda + badge. |
| `.plan-divider` gradient ciano→transparente | Investimento | Vira linha sólida `--color-border-deep`. |
| `.docente-photo` listras diagonais + radial gradient | Docentes | Placeholder de foto recebe tom neutro liso até foto real. |
| `.testimonial-avatar` listras diagonais | (componente, não em uso ativo) | Limpo por coerência. |
| `.instructor-photo` listras diagonais + radial | (componente legado) | Limpo por coerência. |
| `.module-card::before` linha ciano superior | (componente legado) | Coerência. |
| `::selection` background ciano + fg deep | Global | Seleção volta ao default do navegador. Detalhe diminuto mas é "cara da página". |

---

## 3. Atenuar (não some, baixa o volume)

| Item | Antes | Depois |
|---|---|---|
| `InteractiveGrid` no hero (grid que acende com o mouse) | default `intensity: 'normal'` | default `intensity: 'off'`. Volta como **Slot 1** na Etapa 3, em uma única seção definida lá. Tweak permanece exposto para ligar e calibrar. |
| `card-walk-light` (luz correndo na borda dos cards) | aplicada em **Mercado E Diferenciais** (2 seções → estoura orçamento futuro do Slot 2) | className removido das duas. CSS da animação preservado, sem uso. Volta como **Slot 2** na Etapa 3 em 1 (no máximo 2) seção(ões) específica(s). |
| `.alumni-mark` grayscale + opacity hover | filter grayscale + brightness/contrast tunado, opacidade 0.5→1 | grayscale + opacity 0.6→0.95, sem brightness/contrast cosmético. |
| `.focus-note-rule::before` linha ciano + `.focus-note-tag::before` dot ciano | Linha + ponto ciano carregam a nota | Linha vira cinza neutra, ponto sai. Tag fica textual. |

---

## 4. Manter (e por quê)

- **Estrutura e ordem das seções** — Etapa 1 não toca em estrutura.
- **Alternância clear ↔ deep** — herança institucional defensável (a referência também alterna). É hierarquia, não tempero.
- **Reveal-on-scroll sutil** — micro-interação não-performática, equivalente ao que sites institucionais sérios usam (fade-in discreto).
- **Eyebrow numerada `01 ·`, `02 ·`…** — padrão institucional, ajuda hierarquia.
- **`DotPattern` em seções claras** — textura leve, neutra, baixíssima saliência. Funciona como "papel".
- **`CyButton`, `CyBadge`, `CyCard`, primitives** — só mudam de tipografia.
- **Tweak menu (inferior direito)** — intocável em função/posição. Recebe Poppins/Roboto como parte do alinhamento estético geral, mas painel permanece igual.
- **ThemePlayground** — ferramenta de dev, mantida.
- **Paleta atual (cyan #00CBC9 + roxo #7C3AED)** — Etapa 1 proíbe mexer. Vai mudar na Etapa 3.

---

## 5. O que ainda destoa depois desta etapa (consciente, vai pra Etapa 2/3)

- Paleta ainda é cyan/roxo (não USP/Esalq). → Etapa 3.
- Hierarquia tipográfica e ritmo entre seções podem estar irregulares (a LP foi projetada com display monospace; Poppins muda métricas, alguns paddings/sizes vão precisar ajuste). → Etapa 2.
- Densidade de informação por seção e ordem podem se beneficiar de reorganização funcional. → Etapa 2.
- Hero, sem imagem e sem grid, fica vazio. Esperado nesta etapa — receberá imagem real ou Slot 1 na Etapa 3.

---

## 6. Checklist de auto-conferência

- [x] Removi apenas. Não adicionei elemento novo.
- [x] Não troquei paleta.
- [x] Não reorganizei a ordem das seções.
- [x] Mantive Tweak menu intocado em função/posição.
- [x] Tipografia troquei (restrição fixa do briefing — aplicável em qualquer etapa).
- [x] Para cada remoção tem justificativa curta.
- [x] Defeitos da referência (espaçamento irregular etc.) não foram reproduzidos — apenas calibrei pra baixo o que estava alto demais.
