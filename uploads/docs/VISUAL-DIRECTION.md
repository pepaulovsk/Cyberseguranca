# VISUAL DIRECTION — Landing Page Curso de Cybersegurança

> Arquivo estratégico. Define o "porquê" estético da página.
> Mude raramente. Quando mudar aqui, `UI-GUIDELINES.md` e `COMPONENTS.md` precisam ser revisados.

---

## 1. Conceito

Uma landing que **parece um terminal de operação** mais do que um anúncio de curso. O visitante deve sentir que já entrou no ambiente onde o profissional de cyber trabalha — não que está olhando um folder de venda.

A página comunica três coisas em ordem:

1. **Capacidade técnica** — isto não é introdutório raso.
2. **Atmosfera operacional** — HUD, telemetria, microdados decorativos.
3. **Acessibilidade visual** — apesar do tom técnico, a leitura é confortável (branco predominante, tipografia legível, contraste forte).

O equilíbrio é deliberado: **estética cyberpunk filtrada por design system enxuto**. Nada de neon excessivo, glitch gratuito ou Matrix verde-fosforescente.

---

## 2. Mood

| Atributo            | Sim                                                              | Não                                                          |
| ------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ |
| Tom emocional       | Confiante, técnico, ligeiramente conspiratório                   | Alarmista, infantil, "hacker de filme dos anos 90"           |
| Densidade           | Limpo com explosões controladas de detalhe (HUD, microcopy fake) | Poluído, todo elemento gritando                              |
| Referência cultural | Cyberpunk 2077 (UI), Severance (rigor), Apple (refino)           | Mr. Robot literal, terminais verdes, ícones de cadeado óbvio |
| Movimento           | Reveal-on-scroll, microinterações no mouse                       | Carrosséis, parallax pesado, autoplay video hero             |

---

## 3. Paleta (60-30-10)

Três cores. Tudo o que não estiver aqui é exceção justificada.

### 60% — Branco operacional

`--color-bg`: `#FAFAFA` (off-white levemente quente para reduzir fadiga)
`--color-surface`: `#FFFFFF` (cards, painéis sobre o bg)

### 30% — Azul escuro (seções de imersão)

`--color-deep`: `#0A1628` (azul-petróleo profundo, quase preto-azulado)
`--color-deep-2`: `#0F1F38` (variação 1 tom acima, para sobreposições)

Usado em seções inteiras (não em blocos pequenos). É o "modo terminal" da página. Cada seção em deep tem **uma fonte de luz ciano** posicionada num canto (top-right ou bottom-left, alternando), criando profundidade tipo lens-flare suave.

### 10% — Ciano principal + roxo accent

`--color-primary`: `#00CBC9` (ciano-turquesa — é a cor da marca, usar para CTAs, highlights, fonte de luz nas seções escuras)
`--color-accent`: `#7C3AED` (roxo elétrico — usar com parcimônia: hover de elementos secundários, badges, micro-decoração de HUD, gradientes pontuais)

### Neutros de apoio

`--color-text`: `#0A1628` (mesmo que deep — economiza variáveis)
`--color-text-muted`: `#5A6779`
`--color-text-on-deep`: `#E6EEF8`
`--color-border`: `#E5E9F0`
`--color-border-deep`: `rgba(255,255,255,0.08)` (sobre fundos escuros)

### Regra dos gradientes

Permitidos apenas em dois lugares:

1. **Fonte de luz** nas seções deep (radial gradient ciano → transparente).
2. **CTAs primários** opcionais (linear ciano → ciano ligeiramente deslocado em luminosidade — nunca ciano → roxo, que vira "fintech genérica").

---

## 4. Tipografia — Direção

Três famílias com papéis distintos. **As escolhas finais ficam configuráveis no `ThemePlayground.tsx`** — abaixo estão as opções sugeridas, agrupadas por par recomendado.

### Heading — Display, técnico, com personalidade

Precisa carregar a cara da página. Geometria forte, monospace ou semi-monospace funciona muito bem aqui.

Sugestões (em ordem de preferência):

1. **JetBrains Mono** (variável, peso 400-800) — monospace técnica, pesos altos têm presença de display
2. **Space Grotesk** — geometric sans com curvas levemente quirky (atenção: está virando default, evitar se possível)
3. **Geist Mono** — mono moderna da Vercel, muito clean
4. **Migra** — display serif contemporânea (para virar a direção mais "editorial-cyber")
5. **PP Neue Machina** — geométrica industrial (paga, mas tem fallback grátis: **Archivo** com tracking apertado)

### Body — Leitura confortável, neutra mas não invisível

1. **Inter** (variável) — sim, é óbvio, mas é uma escolha técnica defensável aqui; pareia bem com mono
2. **IBM Plex Sans** — caráter levemente técnico, conversa com a estética
3. **Söhne** (paga) / **General Sans** (grátis, próximo) — refino editorial
4. **Manrope** — geométrica neutra

### UI Elements / Decorative — Para microcopy de HUD, serial numbers, codes

Aqui o objetivo é parecer telemetria. Sempre monospace, tamanho pequeno (10-12px), tracking solto.

1. **JetBrains Mono** (mesma da heading, se escolhida — economia de carregamento)
2. **IBM Plex Mono** — clássica para terminal
3. **Berkeley Mono** (paga) / **Commit Mono** (grátis) — refinada
4. **Fira Code** — com ligatures desligadas

### Pares recomendados (defaults sugeridos)

| Par | Heading            | Body              | UI/Decorative   | Sensação                       |
| --- | ------------------ | ----------------- | --------------- | ------------------------------ |
| A   | JetBrains Mono 700 | Inter             | JetBrains Mono  | Técnico-coeso, default seguro  |
| B   | Migra              | General Sans      | IBM Plex Mono   | Editorial-cyber, mais autoral  |
| C   | Space Grotesk      | IBM Plex Sans     | IBM Plex Mono   | Geométrico-friendly            |
| D   | PP Neue Machina    | Manrope           | Commit Mono     | Industrial-refinado            |

**Default na primeira carga: Par A.** Os outros ficam acessíveis pelo `ThemePlayground`.

---

## 5. Tom de Voz Visual

(Conteúdo verbal é responsabilidade do time editorial. Isto se aplica a microcopy decorativa e à textura visual.)

- **Microcopy decorativa**: pseudo-telemetria que não diz nada importante. Ex: `SYS::CRS-7741 / SEC-OPS / v2.4.1`, `BIN: 01001000 01010100 01010100 01010000`, `LAT 23.5505° S`, `[REV] 0×4F2A · 17:42:03 UTC`. Sempre `user-select: none` e `aria-hidden="true"`.
- **Tom geral**: como se a página estivesse sendo lida dentro de um terminal seguro. Discreto, não performático.

---

## 6. Identidade do detalhe

Três marcas registradas que devem aparecer recorrentemente (consistência > variedade):

1. **Squircles** (cantos iOS-like, curvatura contínua G2) — usar a propriedade CSS nativa [`corner-shape: squircle`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/corner-shape-value) combinada com `border-radius` normal. Em browsers sem suporte (a maioria hoje), o `corner-shape` é ignorado e o `border-radius` cai no comportamento padrão automaticamente — degradação graciosa, custo zero. Detalhes técnicos em `UI-GUIDELINES.md §5`.
2. **Luz ciano nas seções deep** — sempre presente, mas sutil. Radial gradient com 30-40% de opacidade máxima.
3. **HUD frames** — alguns cards têm cantos "abertos" (linhas de canto em L em vez de borda fechada), tipo viewfinder de câmera. Usar com moderação — 1 a 2 vezes na página inteira.

### Ícones

Único set aprovado: [Solar Icon Set](https://github.com/480-Design/Solar-Icon-Set). Combina com a direção (geometria limpa, técnica, neutra). Seis estilos disponíveis (linear, bold, outline, broken, line-duotone, bold-duotone), trocáveis em runtime via `ThemePlayground` — permite calibrar o "peso" visual da página rapidamente. Detalhes de implementação em `UI-GUIDELINES.md §9.5`.

---

## 7. O que NÃO fazer

- ❌ Botões pill (border-radius: 9999px). Sempre squircle.
- ❌ Verde Matrix, vermelho de alerta como cor decorativa, glitch animado contínuo.
- ❌ Ícones de cadeado, escudo, hacker encapuzado em qualquer lugar.
- ❌ Stock photography de "pessoa olhando código".
- ❌ Gradiente ciano → roxo em CTAs (lê como Stripe/fintech).
- ❌ Background animado em todas as seções (mata performance e foco).
- ❌ Dark mode toggle como feature exposta — a página já alterna claro/escuro por seção, intencionalmente.
