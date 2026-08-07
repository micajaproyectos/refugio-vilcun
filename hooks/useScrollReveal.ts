'use client';
import { useEffect } from 'react';

export function useScrollReveal(rootMargin = '0px 0px -60px 0px') {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin }
    );

    const selectors = ['.reveal', '.reveal-fade', '.reveal-left', '.reveal-right'];
    const elements: Element[] = [];

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        observer.observe(el);
        elements.push(el);
      });
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [rootMargin]);
}
