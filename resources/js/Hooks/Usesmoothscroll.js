// resources/js/hooks/useSmoothScroll.js
import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    // Enable CSS smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optional: Add reduced motion support for accessibility
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e) => {
      if (e.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
      } else {
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    };
    
    // Set initial state
    handleReducedMotion(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleReducedMotion);
    
    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      mediaQuery.removeEventListener('change', handleReducedMotion);
    };
  }, []);
};

export default useSmoothScroll;