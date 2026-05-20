/**
 * motion.jsx — RevealOnScroll
 *
 * Intersection Observer leve. Props: delay (ms), direction ('up' | 'fade').
 * Respeita prefers-reduced-motion via CSS já injetado no index.html.
 */
const { useEffect: useEffectMo, useRef: useRefMo, useState: useStateMo } = React;

function RevealOnScroll(props) {
  const delay = props.delay ?? 0;
  const direction = props.direction || 'up';
  const Tag = props.as || 'div';
  const extraStyle = props.style;
  const extraClass = props.className || '';
  const children = props.children;
  const rest = {};
  for (const k in props) {
    if (k === 'delay' || k === 'direction' || k === 'as' ||
        k === 'style' || k === 'className' || k === 'children') continue;
    rest[k] = props[k];
  }

  const ref = useRefMo(null);
  const [visible, setVisible] = useStateMo(false);

  useEffectMo(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = `reveal ${visible ? 'is-visible' : ''} reveal-${direction}${extraClass ? ' ' + extraClass : ''}`;
  return (
    <Tag
      {...rest}
      ref={ref}
      className={cls}
      style={{ transitionDelay: `${delay}ms`, ...extraStyle }}
    >
      {children}
    </Tag>
  );
}

Object.assign(window, { RevealOnScroll });
