# Etapa 2 — Refinamento estrutural e de layout

> **Objetivo**: trabalhar layout, hierarquia, ritmo e UX para que a estrutura herdada da Etapa 1 fique bem executada.
> **Escopo proibido**: não trocar paleta (cyan/roxo continuam até Etapa 3), não introduzir elementos novos, não tocar no Tweak menu.
> **Regra de ouro**: a referência institucional tem problemas de execução de layout. Estou autorizado a fazer melhor que ela aqui — espaçamento mais respirado, hierarquia mais clara, ritmo mais cuidado — sem me distanciar do registro de sobriedade dela.

A Etapa 1 trocou tipografia para Poppins/Roboto e removeu tempero. Resultado: a LP ficou mais sóbria, mas com **métricas de espaçamento e pesos herdados da era JetBrains Mono** — pesos 700, letter-spacing negativo agressivo, paddings dimensionados para uma display monospace. Poppins não pede isso. Esta etapa recalibra para a métrica humanista da nova tipografia.

---

## 1. Hierarquia tipográfica

### 1.1 Escala — reduzir teto

| Token | Antes | Depois | Justificativa |
|---|---|---|---|
| `--fs-display` (hero) | `clamp(2.5rem, 5vw+1rem, 4.5rem)` (40-72px) | `clamp(2.25rem, 4vw+1rem, 3.75rem)` (36-60px) | 72px em Poppins fica cinematográfico — não é registro institucional. 60px mantém presença e reduz "grito". |
| `--fs-h1` (section title) | `clamp(2rem, 3vw+1rem, 3rem)` (32-48px) | `clamp(1.875rem, 2.5vw+1rem, 2.5rem)` (30-40px) | Cria distância clara entre hero e seções (era quase igual). Section title de 40px é o ponto institucional. |
| `--fs-h2` (sub-bloco) | 2rem (32px) | 1.75rem (28px) | Usado em `.salary-table-head h3` e `.focus-note-title`. 28px diferencia bem de section-title e h3. |
| `--fs-h3` (card title) | 1.5rem (24px) | 1.375rem (22px) | Cards têm muitas instâncias na página; 24px somava muito peso visual total. 22px respira mais. |
| `--fs-h4` | 1.25rem (20px) | 1.125rem (18px) | Card titles secundários (diferencial-title, mercado-label). 18px funciona porque Poppins 600 tem corpo. |

### 1.2 Pesos — reduzir massa

| Elemento | Antes | Depois |
|---|---|---|
| `.hero-title` | 700 | **600** |
| `.section-title` | 700 | **600** |
| `.section-title .muted` | 500 | **400** |
| Card titles (`.mercado-label`, `.diferencial-title`, `.carreira-label`, etc.) | 700 | **600** |
| `.cta-title` | 700 | **600** |
| `.plan-price-value` | 700 | **600** |
| `.carreira-value` (R$52k etc.) | 700 | **600** |

Motivo: Poppins 700 é muito mais pesado que JetBrains Mono 700 (mono compensa com regularidade, sans humanista acumula massa). Toda a hierarquia herdada estava 700 porque foi calibrada para mono. Cai para 600 — ainda hierárquica, sem martelar.

### 1.3 Letter-spacing

| Token | Antes | Depois |
|---|---|---|
| Heading (display + section-title + cta-title + hero-title) | `-0.02em` | `-0.01em` |
| `h1..h4` base | `-0.005em` | `-0.005em` (mantém) |

Poppins não precisa do espremido que JetBrains Mono pedia. `-0.01em` é o ajuste de tipógrafo discreto.

### 1.4 Eyebrow — manter mas afinar

Mantém o pseudo-elemento `::before` (linha 24px). É o padrão institucional ESALQ ("rubrica curta + título"). Mantém numeração `01 · / 02 · …` — ajuda hierarquia de leitura ao longo da página.

---

## 2. Ritmo e espaçamento entre seções

### 2.1 Padding vertical das seções

| Tela | Antes | Depois |
|---|---|---|
| Desktop | 96 / 96 (`--space-24`) | **80 / 80** (`--space-20`) |
| Mobile | 64 / 64 (`--space-16`) | **56 / 56** (`--space-14`) |

96 + 96 = 192px de vão entre seções era institucional-com-folga-demais. 80 + 80 = 160px é o ponto onde respira sem perder densidade. Em mobile, 56+56 = 112px.

### 2.2 Section header — gap até o conteúdo

| Antes | Depois |
|---|---|
| `.section-header { margin-bottom: var(--space-16) }` (64px) + `.section-lead { margin-top: -32px }` (hack) | `.section-header { margin-bottom: var(--space-8) }` (32px) + `.section-lead { margin-top: 0; margin-bottom: var(--space-12) }` |

O hack de margin-top negativo no `.section-lead` existia porque o header forçava 64px de gap até o que vinha embaixo, mas o lead precisava ficar visualmente colado ao header. Limpa a hierarquia:

```
eyebrow
  ↓ 12px
section-title
  ↓ 32px (margin-bottom do .section-header)
section-lead (parágrafo de apoio)
  ↓ 48px
grid / tabela / cards
```

### 2.3 Gap entre eyebrow e section-title

| Antes | Depois |
|---|---|
| `margin: var(--space-3) 0 0` (12px) | `margin: var(--space-2) 0 0` (8px) |

Eyebrow vive grudada no título — institucional. 8px ao invés de 12px reforça que são um conjunto.

---

## 3. Alternância clear ↔ deep — corrigir adjacências mortas

A Etapa 1 limpou `.section-deep::before` (radial glow). Resultado: as duas seções deep adjacentes do início (**Hero → Mercado**) viraram um bloco visualmente contínuo, sem fronteira.

| Boundary | Estado | Decisão |
|---|---|---|
| Hero (deep) → Mercado (deep) | Indistinguível | `.section-deep.alt` agora usa `--color-deep-2` (#0F1F38, levemente mais quente/claro). Cria diferenciação tonal mínima sem voltar ao glow ciano da Etapa 0. |
| Mercado → Carreira | OK (deep→clear) | — |
| Carreira → Diferenciais | OK (clear→deep) | — |
| Diferenciais → CorpoDocente | OK (deep→clear) | — |
| CorpoDocente → Perfil (depois da reordenação: Perfil → CorpoDocente) | clear→clear | Mantido: Perfil é flat, CorpoDocente tem `dot-bg`. A textura diferencia. |
| (depois da reordenação) CorpoDocente → Investimento | OK (clear→deep) | — |
| Investimento → FAQ | OK (deep→clear) | — |
| FAQ → CTA | OK (clear→deep) | — |

---

## 4. Ordem das seções — uma troca funcional

**Antes**: Hero → Mercado → Carreira → Diferenciais → **Corpo Docente → Perfil** → Investimento → FAQ → CTA

**Depois**: Hero → Mercado → Carreira → Diferenciais → **Perfil → Corpo Docente** → Investimento → FAQ → CTA

Justificativa: o leitor primeiro entende "**por que USP**" (Diferenciais), depois se identifica "**isso é para mim?**" (Perfil), e só então avalia "**quem ensina?**" (Corpo Docente, prova de qualidade). A ordem anterior criava a sequência estranha "Por que USP / Aqui estão os profs / Ah, isso é pra você?" — corpo docente vinha antes do leitor se qualificar.

Numeração das eyebrows muda:
- 01 Mercado · 02 Carreira · 03 Diferenciais
- **04 Perfil · 05 Corpo Docente**
- 06 Investimento · 07 FAQ · 08 Inscrição

---

## 5. Balanço e ajustes pontuais de layout

### 5.1 Hero
- `min-height: clamp(560px, 80vh, 820px)` → `clamp(520px, 70vh, 720px)`. O viewport-percent estava produzindo hero de 800+px em telas grandes, com pouco conteúdo dentro. Reduz para um hero presente mas proporcional.
- Stats: gap horizontal 40px → 56px (`--space-14`). Three-up com mais respiro.
- Badges row: reduzir o `gap` interno.

### 5.2 Cards de grade (Mercado / Diferenciais / Perfil / Carreira stats)
- Padding interno: 24px → 28px (uso `--space-7`-equivalent via combo). Cards respiram mais, ficam menos achatados em altura.
- Remove `min-height: 280px` arbitrário do `.carreira-stat-card`. Conteúdo define altura; `gap` no grid alinha. Min-heights fixos são frágeis a mudanças de copy.
- Remove `min-height: 2.5em` dos labels (mercado-label, carreira-label, diferencial-title). Alinhamento por grid resolve o problema sem regra de min-height por instância.

### 5.3 Salary table
- `.salary-table-head h3` passa de `--fs-h3` (24px) para `--fs-h2` (28px). Sinaliza que é um sub-bloco maior.
- `.salary-table-head` ganha alinhamento `align-items: flex-end` em vez de `baseline` para encostar título e fonte na mesma linha de base.

### 5.4 ROI callout
- Grid 3 colunas (eyebrow | parágrafo | botão) → 2 colunas (parágrafo | botão), com eyebrow acima como rubrica. O eyebrow vertical encostado num parágrafo era um leitor estranho.
- Padding: 24/32 → 24/28 (vertical/horizontal). Mais discreto.

### 5.5 Plan cards (Investimento)
- Padding interno: 32px → 36px (`--space-9`-equivalent via combo). Plano é o cartão "premium" da página — precisa de respiro.
- `.plan-price-value` cap fluido: `clamp(2.5rem, 4vw+1rem, 4rem)` → `clamp(2.25rem, 3vw+1rem, 3.25rem)` (36-52px). 64px era cinematográfico demais.
- `.plan-card.is-featured` ganha um `box-shadow` discreto e largura tonal (sem glow ciano — apenas profundidade neutra).

### 5.6 FAQ
- Mantém grid de 3 colunas; reduzimos a coluna esquerda (numeração `Q.01`) de 48px para 40px — a numeração nunca usa mais que isso e a coluna ficava com whitespace excessivo.
- Padding vertical de cada item: 24px → 22px. 8 itens com 24 cada acumula uma lista alta demais.

### 5.7 CTA
- `.cta-title` cap: `--fs-display` (volta para 36-60px depois da redução em 1.1) — alinhada com hero, fechando a página em paralelo com a abertura.
- Gap interno do `.cta-container`: 24px (mantém) — funcional.

### 5.8 Header
- Em < 880px, esconde nav mas mantém os dois botões CTA (já estava assim). Em < 560px, esconde "Falar com o time" e mantém apenas "Inscrever-se" (já estava). **Sem hamburger menu** — fica fora do escopo desta etapa; é uma adição de UI, não refinamento.

---

## 6. O que NÃO foi mexido

- Paleta — segue cyan/roxo até Etapa 3.
- Tweak menu (canto inferior direito) — função e posição intocados.
- ThemePlayground — ferramenta de dev, mantido.
- Estrutura interior das seções (a `<dl>` da hero, o grid 3x2 do Mercado, a salary table, etc.) — refinada em proporção, não redesenhada.
- Imagens e conteúdo — copy idêntica, placeholders idênticos.
- `RevealOnScroll`, `DotPattern`, `InteractiveGrid` (off) — mecânicos intocados.

---

## 7. Checklist de auto-conferência

- [x] Não adicionei elemento novo (apenas refino métricas e reordeno).
- [x] Não troquei paleta.
- [x] Tweak menu intocado em função/posição.
- [x] Reordenei 1 par de seções com justificativa funcional explícita.
- [x] Para cada mudança métrica tem justificativa curta.
- [x] Defeitos de execução da referência (paddings irregulares, hierarquia frágil de peso) não foram herdados — calibrei.
- [x] O registro de sobriedade está mais firme, não menos.
