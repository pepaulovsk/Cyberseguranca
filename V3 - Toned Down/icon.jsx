/**
 * icon.jsx
 * ───────────────────────────────────────────────────────────────────────────
 * Ícones do site sempre em bold-duotone (Solar Icon Set style).
 * API: <Icon name="ArrowRight" size={20} color="currentColor" />
 */

/* ── Biblioteca de geometria ───────────────────────────────────────────── */
/* Cada entrada define `main` (silhueta principal) e opcionalmente `accent`
 * (forma secundária preenchida, usada no duotone). */

const ICON_DATA = {
  /* navegação */
  ArrowRight: {
    main: 'M5 12 H19 M13 6 L19 12 L13 18',
  },
  ArrowUpRight: {
    main: 'M7 17 L17 7 M9 7 H17 V15',
  },
  ChevronDown: {
    main: 'M6 9 L12 15 L18 9',
  },
  ChevronRight: {
    main: 'M9 6 L15 12 L9 18',
  },
  Plus: {
    main: 'M12 5 V19 M5 12 H19',
  },
  Close: {
    main: 'M6 6 L18 18 M6 18 L18 6',
  },
  Minus: {
    main: 'M5 12 H19',
  },

  /* status */
  Check: {
    main: 'M5 12 L10 17 L19 7',
  },
  CheckCircle: {
    main: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18 Z M8 12 l3 3 l5-6',
    accent: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z',
  },

  /* técnicos */
  Code: {
    main: 'M8 7 L3 12 L8 17 M16 7 L21 12 L16 17 M14 4 L10 20',
  },
  Terminal: {
    main: 'M4 5 H20 V19 H4 Z M7 10 L10 12 L7 14 M12 15 H16',
    accent: 'M4 5 H20 V19 H4 Z',
  },
  Database: {
    main: 'M4 6 c0-1.6 3.6-3 8-3 s8 1.4 8 3 v12 c0 1.6 -3.6 3 -8 3 s-8-1.4-8-3 Z M4 6 c0 1.6 3.6 3 8 3 s8-1.4 8-3 M4 12 c0 1.6 3.6 3 8 3 s8-1.4 8-3',
    accent: 'M4 6 c0-1.6 3.6-3 8-3 s8 1.4 8 3 v12 c0 1.6 -3.6 3 -8 3 s-8-1.4-8-3 Z',
  },
  Cloud: {
    main: 'M7 18 a4 4 0 0 1 0-8 a5 5 0 0 1 9.5 -1.5 A4 4 0 0 1 17 18 Z',
    accent: 'M7 18 a4 4 0 0 1 0-8 a5 5 0 0 1 9.5 -1.5 A4 4 0 0 1 17 18 Z',
  },
  Cpu: {
    main: 'M6 6 H18 V18 H6 Z M9 9 H15 V15 H9 Z M9 3 V6 M15 3 V6 M9 18 V21 M15 18 V21 M3 9 H6 M3 15 H6 M18 9 H21 M18 15 H21',
    accent: 'M9 9 H15 V15 H9 Z',
  },
  Bug: {
    main: 'M9 4 L10 6 M15 4 L14 6 M6 10 H4 M20 10 H18 M5 14 H8 M19 14 H16 M6 18 H8 M18 18 H16 M8 8 H16 V14 a4 4 0 0 1 -8 0 Z M12 14 V20',
    accent: 'M8 8 H16 V14 a4 4 0 0 1 -8 0 Z',
  },
  Pulse: {
    main: 'M3 12 H7 L9 6 L13 18 L15 12 H21',
  },
  Network: {
    main: 'M12 4 a2 2 0 1 1 0 4 a2 2 0 0 1 0-4 Z M5 16 a2 2 0 1 1 0 4 a2 2 0 0 1 0-4 Z M19 16 a2 2 0 1 1 0 4 a2 2 0 0 1 0-4 Z M12 8 V14 M12 14 L6 16 M12 14 L18 16',
    accent: 'M12 4 a2 2 0 1 1 0 4 a2 2 0 0 1 0-4 Z',
  },
  Target: {
    main: 'M12 21 a9 9 0 1 1 0-18 a9 9 0 0 1 0 18 Z M12 17 a5 5 0 1 1 0-10 a5 5 0 0 1 0 10 Z M12 14 a2 2 0 1 1 0-4 a2 2 0 0 1 0 4 Z',
    accent: 'M12 14 a2 2 0 1 1 0-4 a2 2 0 0 1 0 4 Z',
  },

  /* conteúdo */
  Document: {
    main: 'M6 3 H14 L19 8 V21 H6 Z M14 3 V8 H19 M9 13 H16 M9 17 H14',
    accent: 'M14 3 V8 H19 L14 3 Z',
  },
  Sparkle: {
    main: 'M12 3 L13.5 9.5 L20 11 L13.5 12.5 L12 19 L10.5 12.5 L4 11 L10.5 9.5 Z',
    accent: 'M12 3 L13.5 9.5 L20 11 L13.5 12.5 L12 19 L10.5 12.5 L4 11 L10.5 9.5 Z',
  },
  Eye: {
    main: 'M2 12 c3.5-5 6.5-7 10-7 s6.5 2 10 7 c-3.5 5 -6.5 7 -10 7 s-6.5-2-10-7 Z M12 15 a3 3 0 1 1 0-6 a3 3 0 0 1 0 6 Z',
    accent: 'M12 15 a3 3 0 1 1 0-6 a3 3 0 0 1 0 6 Z',
  },
  Search: {
    main: 'M10 17 a7 7 0 1 1 0-14 a7 7 0 0 1 0 14 Z M15 15 L21 21',
  },

  /* pessoas / aprendizado */
  User: {
    main: 'M12 12 a4 4 0 1 1 0-8 a4 4 0 0 1 0 8 Z M4 21 c0-4 4-6 8-6 s8 2 8 6',
    accent: 'M12 12 a4 4 0 1 1 0-8 a4 4 0 0 1 0 8 Z',
  },
  Users: {
    main: 'M9 12 a4 4 0 1 1 0-8 a4 4 0 0 1 0 8 Z M2 20 c0-3 3-5 7-5 s7 2 7 5 M17 13 a3 3 0 1 0 0-6 M16 20 c0-3 2-4 5-4',
    accent: 'M9 12 a4 4 0 1 1 0-8 a4 4 0 0 1 0 8 Z',
  },
  GraduationCap: {
    main: 'M3 9 L12 4 L21 9 L12 14 Z M7 11 V16 c0 2 3 3 5 3 s5-1 5-3 V11',
    accent: 'M3 9 L12 4 L21 9 L12 14 Z',
  },
  Play: {
    main: 'M7 5 V19 L19 12 Z',
    accent: 'M7 5 V19 L19 12 Z',
  },
};

/* ── Renderer (bold-duotone) ────────────────────────────────────────────── */

function renderIcon(data, size, color) {
  const { accent, main } = data;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
         focusable="false" fill="none" stroke={color}
         strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      {accent && <path d={accent} fill={color} fillOpacity={0.32} stroke="none" />}
      <path d={main} />
    </svg>
  );
}

/* ── <Icon /> wrapper ──────────────────────────────────────────────────── */

function Icon({ name, size = 20, color = 'currentColor', style: cssStyle, className }) {
  const data = ICON_DATA[name];

  if (!data) {
    if (typeof console !== 'undefined') {
      console.warn(`[Icon] "${name}" não está no catálogo.`);
    }
    return (
      <span
        aria-hidden="true"
        style={{ display: 'inline-block', width: size, height: size, ...cssStyle }}
        className={className}
      />
    );
  }

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', lineHeight: 0, color, ...cssStyle }}
    >
      {renderIcon(data, size, 'currentColor')}
    </span>
  );
}

Object.assign(window, { Icon, ICON_DATA });
