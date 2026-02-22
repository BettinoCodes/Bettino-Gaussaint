import { useRef, useEffect, useState } from 'react';

/**
 * Hook that observes an element and sets visible to true when it enters the viewport.
 * Use with .scroll-fade and .scroll-fade.visible CSS for fade-in animation.
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Ratio of visibility (0-1). Default 0.1
 * @param {string} options.rootMargin - Margin around root. Default '0px 0px -50px 0px' (trigger slightly before bottom)
 * @param {boolean} options.initialVisible - Start visible (e.g. for above-the-fold hero). Default false
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export function useFadeInOnScroll(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', initialVisible = false } = options;
  const [isVisible, setIsVisible] = useState(initialVisible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
