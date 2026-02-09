/**
 * Custom hook that adds IntersectionObserver-based scroll reveal animations.
 * Observes elements with animation classes and triggers visibility when in viewport.
 */
import { useEffect } from 'react';

const useScrollReveal = (selector = '.card-animate-in, .content-animate-in, .scroll-reveal') => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the appropriate "visible" class
            if (entry.target.classList.contains('scroll-reveal')) {
              entry.target.classList.add('visible');
            } else {
              entry.target.classList.add('is-inview');
            }
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    // Small delay to let DOM render first
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  });
};

export default useScrollReveal;
