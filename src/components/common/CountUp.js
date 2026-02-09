/**
 * Simple CountUp component using IntersectionObserver.
 * Animates a number from 0 to the target value when element enters viewport.
 */
import React, { useState, useEffect, useRef } from 'react';

const CountUp = ({ end, duration = 2000, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const endValue = Number(end);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = eased * endValue;

      if (decimals > 0) {
        setCount(Number(currentValue.toFixed(decimals)));
      } else {
        setCount(Math.floor(currentValue));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration, decimals]);

  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : count}{suffix}</span>;
};

export default CountUp;
