// Tiny pathname-based router — no dependencies.
import { useEffect, useState } from 'react';

export function usePath() {
  const [path, setPath] = useState(() => (typeof window === 'undefined' ? '/' : window.location.pathname));
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    window.addEventListener('cps:navigate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('cps:navigate', onPop);
    };
  }, []);
  return path;
}

export function navigate(to) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname === to) return;
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('cps:navigate'));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function Link({ to, children, className = '', ...rest }) {
  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={onClick} className={className} {...rest}>{children}</a>
  );
}
