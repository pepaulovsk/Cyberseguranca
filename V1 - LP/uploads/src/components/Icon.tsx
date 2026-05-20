/**
 * Icon.tsx
 * ───────────────────────────────────────────────────────────────────────────
 * Wrapper sobre `solar-icon-set` (v2.0.1+) que adiciona controle global de estilo.
 *
 * Por que existe:
 *   A API nativa do solar-icon-set v2 não tem prop `iconStyle` — cada estilo é
 *   um componente separado (DocumentBold, DocumentLinear, DocumentOutline, etc).
 *   Para alternar o estilo de TODOS os ícones da página de uma vez (via
 *   ThemePlayground), este wrapper traduz `<Icon name="Document" />` + estilo
 *   global → o componente Solar correspondente.
 *
 * Como usar:
 *
 *   // 1. Inicializar o tema no root da app (uma vez)
 *   import { useThemeInit } from '@/components/ThemePlayground';
 *   function App() {
 *     useThemeInit();
 *     return <>...</>;
 *   }
 *
 *   // 2. Usar o Icon em qualquer lugar — o estilo global vem da store automaticamente
 *   import { Icon } from '@/components/Icon';
 *   <Icon name="Document" size={24} />
 *   <Icon name="ShieldCheck" size={20} color="var(--color-primary)" />
 *
 *   // 3. Override pontual de estilo (raro, mas suportado)
 *   <Icon name="Document" iconStyle="bold" />
 *
 * Os 6 estilos disponíveis: linear, bold, outline, broken, line-duotone, bold-duotone.
 *
 * Custo de bundle:
 *   Importação dinâmica via React.lazy + Suspense. Cada ícone usado carrega
 *   apenas as 6 variantes daquele ícone (não a biblioteca inteira). Em produção,
 *   o bundler faz code-splitting por chunk.
 *   Para máxima performance, considerar importação estática nos casos críticos
 *   (above-the-fold) — ver seção "Performance" no fim deste arquivo.
 */

import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
  type ReactNode,
} from 'react';
import { useTheme } from './useThemeStore';

/* ─────────────────────────────────────────────────────────────────────────── */
/* TYPES                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export type IconStyle =
  | 'linear'
  | 'bold'
  | 'outline'
  | 'broken'
  | 'line-duotone'
  | 'bold-duotone';

export const ICON_STYLES: IconStyle[] = [
  'linear',
  'bold',
  'outline',
  'broken',
  'line-duotone',
  'bold-duotone',
];

/**
 * Mapeamento do nosso enum legível → sufixo usado pelo solar-icon-set.
 * Ex: { name: 'Document', style: 'line-duotone' } → 'DocumentLineDuotone'
 */
const STYLE_SUFFIX: Record<IconStyle, string> = {
  linear: 'Linear',
  bold: 'Bold',
  outline: 'Outline',
  broken: 'Broken',
  'line-duotone': 'LineDuotone',
  'bold-duotone': 'BoldDuotone',
};

export type SolarIconProps = {
  color?: string;
  size?: number | string;
} & Omit<React.SVGProps<SVGSVGElement>, 'color' | 'size' | 'width' | 'height' | 'children'>;

export type IconProps = Omit<SolarIconProps, 'ref'> & {
  /** Nome PascalCase do ícone, sem o sufixo de estilo. Ex: "Document", "ShieldCheck". */
  name: string;
  /** Override pontual do estilo global. Se omitido, usa o estilo atual do tema. */
  iconStyle?: IconStyle;
  /** Conteúdo de fallback enquanto o chunk do ícone carrega. Default: span vazio com tamanho. */
  fallback?: ReactNode;
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* LAZY LOADER + CACHE                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

type LazySolarIcon = LazyExoticComponent<ComponentType<SolarIconProps>>;

/**
 * Cache de componentes lazy-loaded. Chave: "Name+Suffix" (ex: "DocumentBold").
 * Garante que React.lazy só seja chamado uma vez por par (nome, estilo).
 */
const componentCache = new Map<string, LazySolarIcon>();

function getIconComponent(name: string, style: IconStyle): LazySolarIcon {
  const exportName = `${name}${STYLE_SUFFIX[style]}`;
  const cached = componentCache.get(exportName);
  if (cached) return cached;

  const Lazy: LazySolarIcon = lazy(async () => {
    // `solar-icon-set` exporta tudo do entry principal.
    // O bundler faz tree-shaking dos imports não usados em produção.
    const mod = await import('solar-icon-set');
    const Component = (mod as Record<string, ComponentType<SolarIconProps>>)[exportName];

    if (!Component) {
      // Fallback se o nome não existir: log claro + componente vazio.
      console.error(
        `[Icon] "${exportName}" não existe em solar-icon-set. ` +
          `Confira o nome ("${name}") e o estilo ("${style}").`,
      );
      const Empty: ComponentType<SolarIconProps> = () => null;
      return { default: Empty };
    }

    return { default: Component };
  });

  componentCache.set(exportName, Lazy);
  return Lazy;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* ICON COMPONENT                                                              */
/* ─────────────────────────────────────────────────────────────────────────── */

export function Icon({
  name,
  iconStyle,
  size = 20,
  color = 'currentColor',
  fallback,
  ...rest
}: IconProps) {
  const { iconStyle: themeStyle } = useTheme();
  const resolvedStyle = iconStyle ?? themeStyle;
  const Component = getIconComponent(name, resolvedStyle);

  // Fallback default: span reservando o espaço, evita layout shift enquanto o chunk carrega.
  const defaultFallback = (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
    />
  );

  return (
    <Suspense fallback={fallback ?? defaultFallback}>
      <Component size={size} color={color} {...rest} />
    </Suspense>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* PERFORMANCE NOTES                                                           */
/* ─────────────────────────────────────────────────────────────────────────── */

/**
 * Quando o lazy-loading NÃO é ideal:
 *   - Ícones above-the-fold (hero, header) — o flash do fallback é perceptível.
 *   - Ícones em CTAs primários — qualquer atraso prejudica conversão.
 *
 * Para esses casos, importar o componente Solar diretamente, sem passar pelo
 * wrapper:
 *
 *   import DocumentLinear from 'solar-icon-set/dist/icons/DocumentLinear';
 *   // ou, se o entry principal funcionar com tree-shaking do bundler:
 *   import { DocumentLinear } from 'solar-icon-set';
 *
 *   <DocumentLinear size={20} color="var(--color-primary)" />
 *
 * Importações estáticas NÃO respeitam o IconStyleContext — elas são fixas.
 * Usar apenas quando o estilo daquele ícone específico não deve mudar com o
 * controle global (raro, mas existe).
 */
