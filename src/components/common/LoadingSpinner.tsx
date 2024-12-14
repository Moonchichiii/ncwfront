import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const LoadingSpinner: React.FC = () => {
  const outerSpinnerRef = useRef<HTMLDivElement>(null);
  const innerSpinnerRef = useRef<HTMLDivElement>(null);
  const centerDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (outerSpinnerRef.current) {
      tl.to(outerSpinnerRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "none",
      });
    }

    if (innerSpinnerRef.current) {
      tl.to(innerSpinnerRef.current, {
        rotation: -360,
        duration: 1.5,
        repeat: -1,
        ease: "none",
      }, 0);
    }

    if (centerDotRef.current) {
      tl.to(centerDotRef.current, {
        opacity: 0.4,
        duration: 0.75,
        repeat: -1,
        yoyo: true,
        ease: "none",
      }, 0);
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" role="status" aria-live="polite">
      <div className="relative">
        <span className="sr-only">Loading...</span>
        <div
          ref={outerSpinnerRef}
          className="w-16 h-16 border-4 border-white/10 border-t-white/30 rounded-full"
        />
        <div
          ref={innerSpinnerRef}
          className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 border-4 border-white/20 border-t-white/40 rounded-full"
        />
        <div
          ref={centerDotRef}
          className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 bg-white rounded-full opacity-40"
          style={{
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
          }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;