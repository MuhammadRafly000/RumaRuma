import { useEffect, useState } from 'react';

export function useScrollPosition() {
  const [position, setPosition] = useState({ y: 0, direction: 'up' });

  useEffect(() => {
    let lastY = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      setPosition({ y, direction: y > lastY ? 'down' : 'up' });
      lastY = y;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return position;
}
