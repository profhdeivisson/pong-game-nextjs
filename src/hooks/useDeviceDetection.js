import { useState, useEffect } from 'react';

export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(false);

  function checkMobile() {
    if (typeof window === 'undefined') return false;
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    return mobile;
  }

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return {
    isMobile,
    setIsMobile,
    checkMobile
  };
}