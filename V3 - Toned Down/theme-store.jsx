/**
 * theme-store.jsx
 * Porte do useThemeStore.ts para preview (sem TS, sem build).
 * API idêntica: useTheme, setTheme, initTheme, DEFAULT_THEME, STORAGE_KEY.
 */
const { useSyncExternalStore } = React;

const DEFAULT_THEME = {
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  deep: '#0A1628',
  primary: '#00CBC9',
  accent: '#7C3AED',
  fontHeading: 'Poppins',
  fontBody: 'Roboto',
  fontUi: 'Roboto',
  radiusLg: 14,
  iconStyle: 'bold-duotone',
  mbaColor: '#0d3db2',
  mbaFontPrimary: 'Poppins',
  mbaFontSecondary: 'Roboto',
  mbaFontDeco: 'Roboto',
  cursoColor: '#00CBC9',
  cursoFontPrimary: 'Poppins',
  cursoFontSecondary: 'Roboto',
  cursoFontDeco: 'JetBrains Mono',
};

const STORAGE_KEY = 'cyber-lp-theme';

let currentTheme = DEFAULT_THEME;
const themeListeners = new Set();

function themeSubscribe(listener) {
  themeListeners.add(listener);
  return () => { themeListeners.delete(listener); };
}
function themeGetSnapshot() { return currentTheme; }
function themeGetServerSnapshot() { return DEFAULT_THEME; }

function setTheme(next) {
  const resolved = typeof next === 'function' ? next(currentTheme) : next;
  if (resolved === currentTheme) return;
  currentTheme = resolved;
  themeListeners.forEach((l) => l());
}

function initTheme(initial) {
  currentTheme = initial;
  themeListeners.forEach((l) => l());
}

function useTheme() {
  return useSyncExternalStore(themeSubscribe, themeGetSnapshot, themeGetServerSnapshot);
}

Object.assign(window, {
  DEFAULT_THEME,
  STORAGE_KEY,
  setTheme,
  initTheme,
  useTheme,
});
