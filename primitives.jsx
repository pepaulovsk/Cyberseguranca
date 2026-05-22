/**
 * primitives.jsx — Button, Badge, Card, HUDFrame
 * Cada um lê tudo de CSS variables. Squircle via `corner-shape` global.
 */

/* ── Button ────────────────────────────────────────────────────────────
 * Variants: primary | secondary | ghost
 * Sizes: md | lg
 * Squircle (não pill). Sem 9999px.
 */
function CyButton(props) {
  const variant = props.variant || 'primary';
  const size = props.size || 'md';
  const icon = props.icon;
  const iconPosition = props.iconPosition || 'right';
  const as = props.as || 'button';
  const children = props.children;
  // Defensivamente filtrar props que NÃO devem ir ao DOM.
  const rest = {};
  for (const k in props) {
    if (k === 'variant' || k === 'size' || k === 'icon' ||
        k === 'iconPosition' || k === 'as' || k === 'children') continue;
    rest[k] = props[k];
  }
  const Tag = as;
  const cls = `btn btn-${variant} btn-${size}`;
  return (
    <Tag className={cls} {...rest}>
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span className="btn-label">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </Tag>
  );
}

/* ── Badge ─────────────────────────────────────────────────────────────
 * Cores: primary (ciano) | accent (roxo) | mute
 */
function CyBadge({ children, tone = 'primary', dot = false }) {
  return (
    <span className={`badge badge-${tone}`}>
      {dot && <span className="badge-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

/* ── Card ──────────────────────────────────────────────────────────────
 * Surface card. Aceita `tone="deep"` para usar em seções deep.
 * Aceita `hudFrame` para virar HUD frame com L-corners.
 */
function CyCard(props) {
  const tone = props.tone || 'light';
  const hudFrame = !!props.hudFrame;
  const extraClass = props.className || '';
  const children = props.children;
  const rest = {};
  for (const k in props) {
    if (k === 'tone' || k === 'hudFrame' || k === 'className' || k === 'children') continue;
    rest[k] = props[k];
  }
  const cls = `card card-${tone}${hudFrame ? ' hud-frame' : ''}${extraClass ? ' ' + extraClass : ''}`;
  return <div {...rest} className={cls}>{children}</div>;
}

/* ── HUDFrame ──────────────────────────────────────────────────────────
 * Wrapper standalone que adiciona L-corners ciano em qualquer elemento.
 * Usar com moderação — 1-2x na página inteira (VISUAL §6).
 */
function HUDFrame(props) {
  const extraClass = props.className || '';
  const children = props.children;
  const rest = {};
  for (const k in props) {
    if (k === 'className' || k === 'children') continue;
    rest[k] = props[k];
  }
  const cls = `hud-frame${extraClass ? ' ' + extraClass : ''}`;
  return <div {...rest} className={cls}>{children}</div>;
}

/* ── CSS para os primitives (injetado uma vez) ─────────────────────── */
(function injectPrimitivesCSS() {
  if (document.getElementById('cy-primitives-css')) return;
  const style = document.createElement('style');
  style.id = 'cy-primitives-css';
  style.textContent = `
    /* ── BUTTONS ───────────────────────────────────────────────────── */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      font-family: var(--font-ui);
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      border-radius: var(--radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      transition:
        transform var(--duration-fast) var(--ease-out),
        box-shadow var(--duration-base) var(--ease-out),
        background-color var(--duration-fast) var(--ease-out),
        border-color var(--duration-fast) var(--ease-out),
        color var(--duration-fast) var(--ease-out);
      white-space: nowrap;
    }
    .btn-md {
      padding: var(--space-3) var(--space-5);
      font-size: var(--fs-body-sm);
    }
    .btn-lg {
      padding: var(--space-3-5) var(--space-6);
      font-size: var(--fs-body);
    }
    .btn .btn-icon { display: inline-flex; line-height: 0; }

    .btn-primary {
      background: var(--color-brand);
      color: #fff;
    }
    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 24px -8px rgba(var(--color-brand-rgb), 0.45);
    }
    .btn-primary:active { transform: translateY(0); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    /* em seções escuras: sabor do curso */
    .section-deep .btn-primary {
      background: var(--color-primary);
      color: var(--color-deep);
    }
    .section-deep .btn-primary:hover {
      box-shadow: 0 8px 24px -8px rgba(var(--color-primary-rgb), 0.45);
    }

    .btn-secondary {
      background: transparent;
      color: var(--color-text);
      border-color: var(--color-border);
    }
    .btn-secondary:hover {
      border-color: var(--color-deep);
      background: var(--color-surface);
      transform: translateY(-1px);
    }
    /* secondary em seções deep */
    .section-deep .btn-secondary {
      color: var(--color-text-on-deep);
      border-color: rgba(255, 255, 255, 0.18);
    }
    .section-deep .btn-secondary:hover {
      border-color: var(--color-primary);
      background: rgba(var(--color-primary-rgb), 0.08);
    }

    .btn-ghost {
      background: transparent;
      color: var(--color-text);
      padding-left: var(--space-2);
      padding-right: var(--space-2);
    }
    .btn-ghost:hover { color: var(--color-brand); }
    .section-deep .btn-ghost { color: var(--color-text-on-deep); }
    .section-deep .btn-ghost:hover { color: var(--color-primary); }

    /* ── BADGES ────────────────────────────────────────────────────── */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1-5);
      font-family: var(--font-ui);
      font-size: var(--fs-caption);
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: var(--space-1) var(--space-2-5);
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      line-height: 1.4;
    }
    .badge .badge-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: currentColor;
    }
    .badge-primary {
      color: var(--color-brand);
      background: rgba(var(--color-brand-rgb), 0.07);
      border-color: rgba(var(--color-brand-rgb), 0.25);
    }
    .section-deep .badge-primary {
      color: var(--color-primary);
      background: rgba(var(--color-primary-rgb), 0.08);
      border-color: rgba(var(--color-primary-rgb), 0.28);
    }
    .badge-accent {
      color: var(--color-accent);
      background: rgba(var(--color-accent-rgb), 0.08);
      border-color: rgba(var(--color-accent-rgb), 0.28);
    }
    .badge-mute {
      color: var(--color-text-muted);
      background: var(--color-surface);
      border-color: var(--color-border);
    }
    .section-deep .badge-mute {
      color: var(--color-text-on-deep);
      background: rgba(255, 255, 255, 0.04);
      border-color: var(--color-border-deep);
    }

    /* ── CARDS ─────────────────────────────────────────────────────── */
    .card {
      border-radius: var(--radius-xl);
      padding: var(--space-8);
      transition: transform var(--duration-base) var(--ease-out),
                  border-color var(--duration-base) var(--ease-out),
                  box-shadow var(--duration-base) var(--ease-out);
    }
    .card-light {
      background: var(--color-surface);
      color: var(--color-text);
      border: 1px solid var(--color-border);
    }
    .card-light:hover {
      border-color: rgba(var(--color-brand-rgb), 0.4);
      box-shadow: 0 12px 40px -16px rgba(var(--color-deep-rgb), 0.10);
    }
    .card-deep {
      background: var(--color-deep-2);
      color: var(--color-text-on-deep);
      border: 1px solid var(--color-border-deep);
    }
    .card-deep:hover {
      border-color: rgba(var(--color-primary-rgb), 0.4);
    }

    /* ── HUD FRAME (L-corners) ─────────────────────────────────────── */
    .hud-frame { position: relative; }
    .hud-frame::before,
    .hud-frame::after {
      content: '';
      position: absolute;
      width: 14px; height: 14px;
      border: 1px solid var(--color-primary);
      pointer-events: none;
    }
    .hud-frame::before {
      top: -1px; left: -1px;
      border-right: none; border-bottom: none;
    }
    .hud-frame::after {
      bottom: -1px; right: -1px;
      border-left: none; border-top: none;
    }
  `;
  document.head.appendChild(style);
})();

Object.assign(window, { CyButton, CyBadge, CyCard, HUDFrame });
