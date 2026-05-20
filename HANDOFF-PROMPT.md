# HANDOFF PROMPT

> Este texto deve ser enviado em conjunto com os arquivos da pasta `/docs`, da pasta `/src/components`, e a imagem placeholder.
> Contém contexto operacional que não se encaixa nos arquivos acima.

---

## Contexto

Você vai me ajudar a construir uma **landing page para um curso de Cybersegurança**. Em anexo estão os seguintes arquivos:

**Documentação** (`/docs`):
- `VISUAL-DIRECTION.md` — direção estética (conceito, mood, paleta, tipografia, tom)
- `UI-GUIDELINES.md` — regras técnicas de implementação (CSS vars, spacing, tipografia, motion, acessibilidade, ícones)
- `COMPONENTS.md` — inventário dos componentes a serem construídos

**Código já implementado** (`/src/components`):
- `ThemePlayground.tsx` — menu de customização em runtime
- `useThemeStore.ts` — store singleton do tema (lida pelo Playground e pelo Icon)
- `Icon.tsx` — wrapper sobre `solar-icon-set` com controle global de estilo
- `themeBoot.ts` — snippet inline para aplicar tema antes do React montar (anti-flash)

**Asset**:
- `placeholder-hero.png` — imagem placeholder para o hero da página

**Stack assumida**: React 18+ com TypeScript. Se a stack for outra, me avise antes de começar.

**Dependência externa principal**: `solar-icon-set@^2` (npm).

## Hierarquia das instruções

Quando algo em conversa contradisser o que está nos arquivos, **os arquivos vencem**. Se você acredita que uma decisão dos arquivos deveria ser revista, levante a questão explicitamente antes de implementar uma versão alternativa — não decida sozinho.

Dentro dos arquivos, em caso de conflito:
1. `UI-GUIDELINES.md` (regras duras) >
2. `VISUAL-DIRECTION.md` (direção estética) >
3. `COMPONENTS.md` (estado atual — pode ficar desatualizado entre commits).

## Sobre conteúdo

**Não elabore conteúdo textual da página.** Não escreva headline, subhead, descrição de módulo, depoimento, FAQ, nada. Existe um time editorial responsável por isso. Quando precisar de texto para visualizar um componente, use placeholder genérico (`Lorem ipsum`, `[HEADING]`, `[BODY]`) ou pergunte.

A única exceção: **microcopy decorativa de HUD** (serial numbers, coordenadas falsas, binários, timestamps) — esses você gera livremente seguindo `VISUAL-DIRECTION.md §5`. Não comunicam nada real.

## Sobre o sistema de tema (ThemePlayground + useThemeStore + Icon)

Já está pronto. **Não reescreva, não "melhore".** Se precisar adicionar capacidade nova (ex: novo campo configurável), pergunte primeiro. As fontes listadas no playground são as mesmas sugeridas no `VISUAL-DIRECTION.md §4` — se sugerir adicionar/trocar fonte, atualizar os dois lugares.

Resumo rápido do funcionamento:
- `useThemeStore` é uma store singleton com o estado do tema (cor, fonte, radius, icon style)
- `ThemePlayground` é o painel dev-only que escreve nessa store
- `Icon` lê da mesma store pra renderizar o estilo de ícone correto
- `themeBoot` é um snippet inline que aplica o tema salvo antes do React montar

**Decisões abertas** que ficaram registradas (já implementado, mas pode ser revisado):
- Escopo: paleta + 3 fontes + radius + icon style. Sem modo light/dark, sem spacing.
- Persistência: `localStorage` + URL param compartilhável (`?theme=<base64>`).
- Visibilidade: dev-only via `?theme=1` na URL ou `⌘K` / `Ctrl+K`.

Se algum desses três pontos precisar mudar para o caso de uso real, me avise.

## Sobre os backgrounds interativos

`UI-GUIDELINES.md §7` já decidiu quais dos 5 padrões interativos das referências entram na LP:
- **Hero**: `interactive-grid-pattern` (magicui)
- **Seções claras secundárias**: `dot-pattern` estático (shadcn)
- **Seções deep**: nenhum — a fonte de luz radial preenche

**Você tem autorização para visitar essas referências e outros sites** (magicui.design, ui.aceternity.com, shadcn.io, motion.dev, etc.) para buscar a implementação mais limpa e adaptá-la às variáveis do nosso sistema. Quando adaptar:
- Trocar cores hardcoded por `var(--color-*)`
- Garantir que respeita `prefers-reduced-motion`
- Validar que não custa frames (testar com Performance tab antes de aprovar)
- Registrar a fonte da adaptação em `COMPONENTS.md` (coluna Origem: `adapted — <url>`)

Se encontrar uma alternativa **melhor** que as cinco referências que enviei, sugira — mas implemente apenas após aprovação.

## Sobre a imagem placeholder

A imagem anexada deve ser linkada **como arquivo real** no projeto, em `/public/assets/placeholder-hero.png`. O componente `ThemePlayground.tsx` exporta uma constante `HERO_IMAGE` apontando para esse caminho — para trocar a imagem definitiva depois, só alterar o caminho na constante (ou substituir o arquivo no path).

## Como quero trabalhar

1. **Antes de gerar código novo**, confirme que leu os três `.md` e me diga em 2-3 linhas o que entendeu da direção. Isso me dá chance de corrigir desalinhamento cedo.
2. **Quando construir componente**, atualize `COMPONENTS.md` no mesmo PR/turno (mover de `planned` → `done`, ajustar Observações).
3. **Quando bater contra uma regra do `UI-GUIDELINES.md`** que parece errada, levante a questão. Não viole silenciosamente.
4. **Não improvise spacing, cor, font, radius.** Tudo vem de CSS variables. Se precisar de algo novo, adicione a variable em `:root` primeiro e documente em `UI-GUIDELINES.md`.

## Primeiro passo sugerido

Quando começar:
1. Leia os três `.md` e me responda com o resumo de entendimento.
2. Pergunte qualquer ambiguidade antes de codar.
3. Quando alinhado, sugira por onde começar. Sugestão minha:
   - Instalar dependências (`solar-icon-set`, lib de motion se for usar uma)
   - Setup do `:root` global com todas as CSS variables do `UI-GUIDELINES.md §1`
   - Chamar `themeBoot` no `<head>` da app
   - Chamar `useThemeInit()` no root + renderizar `<ThemePlayground />` em qualquer lugar
   - Criar primitives (`Button`, `Card`, `Badge`) e `RevealOnScroll` antes do hero
   - Hero por último, pois depende dos primitives + InteractiveGrid

---

## Anotações originais do briefing (referência)

(Mantidas abaixo para preservar o tom e detalhes que originaram os arquivos. Em caso de conflito com os `.md`, os `.md` vencem porque foram a destilação revisada.)

> Cor principal `#00CBC9`. Usar também azul escuro. Roxo como accent. Predominantemente branco. Regra 60-30-10.
>
> Algumas seções com azul escuro e uma "luz" na cor `#00CBC9` em algum canto.
>
> Bordas redondas (squircle se possível), mas **não usar botões pill shaped**.
>
> Elementos de HUD. Micro UI decorativa (serial numbers, codes, números binários, bar codes), tipo Cyberpunk 2077. Não selecionáveis.
>
> Animar elementos/cards para aparecer quando visíveis na viewport.
>
> Microinterações com mouse — referências: dot-pattern (shadcn), dotted-glow-background (aceternity), interactive-grid-pattern + animated-grid-pattern + dot-pattern (magicui). Decidir quais fazem sentido.
>
> Grid 4-8px (4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64...) + exceções 6, 10, 14.
>
> Apesar da direção apontar para design system, esta é apenas uma página de curso — simplificar onde fizer sentido.
>
> Menu de configuração da página para escolher font pairings (heading, body, ui decorativo).
