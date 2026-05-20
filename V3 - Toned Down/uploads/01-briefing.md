# Briefing — Refatoração visual da LP do MBA em Cibersegurança

## Contexto

A LP atual do curso de Cibersegurança foi construída com identidade visual forte e autoral, e hoje descola da identidade do site institucional do MBA USP ESALQ (mbauspesalq.com). O objetivo é **aproximar a LP da identidade da marca-mãe sem perder a personalidade do curso**, e estabelecer um padrão replicável para os demais cursos no futuro.

Importante: a referência institucional tem problemas conhecidos de design (datado, espaçamento irregular, hierarquia frágil). O alvo **não é replicar a referência pixel-a-pixel**, e sim absorver sua sobriedade, paleta e hierarquia tipográfica, executando melhor do que o original.

## Princípio diretor (régua mental)

Divisão de direção visual em três camadas:

- **60% — DNA MBA USP ESALQ.** Estrutura, paleta-base (azul institucional + neutros), tipografia (Poppins/Roboto), densidade e ritmo de seções, padrões de header/footer/CTA.
- **30% — Identidade do curso de Cibersegurança.** Cor accent do curso aplicada em pontos estratégicos (CTAs, destaques, headings de seção, ícones), sem dominar a tela.
- **10% — Tempero exclusivo do curso.** Elementos visuais que reforçam o tema "cyber" — usados com parcimônia cirúrgica. Esse é o orçamento mais fácil de estourar.

Essa lógica é régua mental de equilíbrio geral, **não** regra técnica de proporção de cor. Para cor, segue padrão clássico abaixo.

## Paleta — regra técnica 60/30/10 (cor pura)

- **60% dominante:** neutros + azul institucional USP ESALQ. Backgrounds, blocos de texto, header/footer.
- **30% secundária:** azul-marca em variações (versão mais saturada ou mais escura, usada em headings, separadores, hover states).
- **10% accent:** cor exclusiva do curso de Cibersegurança, aplicada em CTAs primários, highlights pontuais e nos elementos "tempero".

## Orçamento de personalidade (tempero)

O tempero do curso é distribuído em **3 slots**, cada um com função, orçamento e regra de uso próprios. Cada slot é preenchido por um elemento visual exclusivo do curso de Cibersegurança. Misturar as funções dos slots ou estourar o orçamento de qualquer um deles quebra a sobriedade da marca-mãe.

### Slot 1 — Background interativo de seção
- **Função:** elemento de fundo com interação de mouse, em uma única seção de alto impacto.
- **Conteúdo neste curso:** grid que acende na cor do curso ao passar o mouse.
- **Quantidade:** 1 ocorrência na página inteira.
- **Onde:** hero ou seção temática única — definir na execução.
- **Por quê:** é o elemento mais carregado visualmente; usado duas vezes vira ruído.

### Slot 2 — Tratamento de card característico
- **Função:** componente de card com tratamento visual exclusivo, reutilizado em seção(ões) específica(s).
- **Conteúdo neste curso:** luz correndo na borda do card, na cor do curso.
- **Quantidade:** restrito a 1, no máximo 2 seções da página.
- **Onde:** seções onde o card é a unidade de conteúdo central (pilares, diferenciais, módulos). Se múltiplas seções da LP têm cards, **uma** recebe o tratamento.

### Slot 3 — Microdecoração
- **Função:** elementos decorativos pequenos espalhados pela página como detalhes secundários.
- **Conteúdo neste curso:** mini elementos HUD — serial numbers, coordinates, codes.
- **Quantidade:** parcimônia. Critério: se remover o elemento não muda nada na compreensão da seção, está no nível certo. Se está "preenchendo espaço", reduzir.
- **Onde:** acompanhando títulos de seção, numeração de módulos, rodapés de bloco. Nunca como elemento principal.

### Regra de inviolabilidade

Os orçamentos acima são fixos e cirúrgicos por design. O tempero combina com o tema, mas o tema **não justifica estourar quantidade** — o Slot 3 continua sendo decoração secundária com parcimônia mesmo que HUD elements "fiquem bem" na página.

## Tipografia (fixo)

- **Poppins** + **Roboto**, conforme padrão MBA USP ESALQ.
- Hierarquia clara: H1/H2 em Poppins (peso forte), corpo em Roboto.

## Tweak menu (intocável)

A LP atual tem um **tweak menu** no canto inferior direito que dá controle de fonte, paleta e outros parâmetros visuais. Esse componente é **requisito fixo** da refatoração e deve ser preservado em todas as etapas.

- **Posição:** canto inferior direito, fixo na viewport.
- **Função:** controle ao vivo de tipografia, paleta e demais opções já existentes.
- **Regra:** não remover, não realocar, não simplificar. Pode receber ajuste **estético** para alinhar ao novo registro visual (cores, bordas, tipografia interna), mas funcionalidade e posição permanecem.
- **Por quê:** é ferramenta de trabalho para ajuste fino da própria página — perder isso compromete o processo de refinamento contínuo.

## Estrutura da página

Em princípio, manter a estrutura/ordem de seções atual da LP. Reorganizar **apenas** se uma seção atual:
- duplica função de outra;
- quebra o fluxo de leitura (ex.: CTA forte cedo demais ou tarde demais);
- não tem equivalente conceitual na referência e não justifica sua existência.

Mudanças estruturais devem ser justificadas, não cosméticas.

## Critérios de aceite

A refatoração está pronta quando:

1. Um visitante que conhece o site MBA USP ESALQ reconhece a LP como parte da mesma família visual em até 3 segundos.
2. Um visitante que **não** conhece o site percebe que o curso é de Cibersegurança sem precisar ler — pela cor accent e por pelo menos um elemento "tempero" visível.
3. Removendo todo o "tempero" (categorias A, B, C), a página continua funcionando como LP institucional limpa.
4. A LP resultante é visivelmente **melhor executada** que a referência institucional, mesmo respeitando seu DNA.

## Documentação das decisões

Toda decisão de execução (paleta, escolha de seção pra cada slot, ajustes de estrutura, justificativas de remoção/atenuação) deve ser registrada de forma estruturada ao longo do processo. Decisões mudas não entram.
