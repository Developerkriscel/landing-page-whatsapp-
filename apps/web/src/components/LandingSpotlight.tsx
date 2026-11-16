import { useEffect, useRef } from 'react';

// Inspired by React Bits SpotlightCard; preserves existing card semantics.
export default function LandingSpotlight() {
  const lightRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const light = lightRef.current;
    const card = light?.parentElement;
    if (!light || !card) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || motion.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        light.style.setProperty('--light-x', `${event.clientX - rect.left}px`);
        light.style.setProperty('--light-y', `${event.clientY - rect.top}px`);
      });
    };
    card.addEventListener('pointermove', move);
    return () => {
      cancelAnimationFrame(frame);
      card.removeEventListener('pointermove', move);
    };
  }, []);
  return <span ref={lightRef} className="landing-spotlight" aria-hidden="true" />;
}
