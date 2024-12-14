import { FC, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: FC<AnimatedLogoProps> = ({ className = '' }) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      // Animation timeline
      gsap.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'elastic.out(1, 0.3)',
      });
    }, logoRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={logoRef} className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <div className="text-[12rem] md:text-[16rem] font-logo tracking-tighter leading-[0.8] select-none">
          <div className="flex items-center justify-center relative">
            <span className="text-light-text-primary dark:text-dark-text-primary">
              NORDIC
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-light-accent-blue dark:bg-dark-accent-blue transform scale-x-0 animate-expandLine" />
          </div>
          <div className="flex items-center justify-center mt-4">
            <span className="text-light-accent-blue dark:text-dark-accent-blue">
              CODE
            </span>
          </div>
        </div>
        <div className="absolute -right-4 top-0 text-4xl font-mono text-light-text-muted dark:text-dark-text-muted opacity-25 rotate-90 origin-left">
          2024
        </div>
      </div>
      <div className="text-2xl font-light mt-8 tracking-[0.5em] text-light-text-secondary dark:text-dark-text-secondary uppercase">
        Works
      </div>
    </div>
  );
};

export default AnimatedLogo;
