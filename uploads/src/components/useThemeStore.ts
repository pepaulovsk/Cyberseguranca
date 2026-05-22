/**
 * useThemeStore.ts
 * ───────────────────────────────────────────────────────────────────────────
 * Store compartilhada do tema, consumida pelo ThemePlayground e por qualquer
 * componente que precise reagir a mudanças de tema (ex: IconStyleProvider).
 *
 * Usa um padrão de subscription leve (sem libs externas) para que múltiplos
 * componentes vejam mudanças em tempo real.
 *
 * Por que não Context puro:
 *   O ThemePlayground precisa estar fora da árvore principal (renderiza
 *   absolutamente, em portal-like), e o estado precisa sobreviver a hot-reloads.
 *   Um store-singleton + useSyncExternalStore resolve sem prop drilling e sem
 *   wrapper de Provider no root.
 */

import { useSyncExternalStore } from 'react';
import type { IconStyle } from './Icon';

/* ─────────────────────────────────────────────────────────────────────────── */
/* TYPES                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export type ThemeConfig = {
  // Colors
  bg: string;
  surface: string;
  deep: string;
  primary: string;
  accent: string;
  // Fonts (label, não stack)
  fontHeading: string;
  fontBody: string;
  fontUi: string;
  // Radius
  radiusLg: number; // px
  // Icons
  iconStyle: IconStyle;
};

export const DEFAULT_THEME: ThemeConfig = {
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  deep: '#0A1628',
  primary: '#00CBC9',
  accent: '#7C3AED',
  fontHeading: 'JetBrains Mono',
  fontBody: 'Inter',
  fontUi: 'JetBrains Mono',
  radiusLg: 14,
  iconStyle: 'linear',
};

export const STORAGE_KEY = 'cyber-lp-theme';

/* ─────────────────────────────────────────────────────────────────────────── */
/* STORE                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

let currentTheme: ThemeConfig = DEFAULT_THEME;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ThemeConfig {
  return currentTheme;
}

function getServerSnapshot(): ThemeConfig {
  return DEFAULT_THEME;
}

export function setTheme(next: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) {
  const resolved = typeof next === 'function' ? next(currentTheme) : next;
  if (resolved === currentTheme) return;
  currentTheme = resolved;
  listeners.forEach((l) => l());
}

export function initTheme(initial: ThemeConfig) {
  currentTheme = initial;
  listeners.forEach((l) => l());
}

/**
 * Hook para qualquer componente que precise reagir ao tema atual.
 * Ex: o IconStyleProvider faz `const { iconStyle } = useTheme()`.
 */
export function useTheme(): ThemeConfig {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
