import { FC, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import SplitType from 'split-type';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: FC<AnimatedLogoProps> = ({ className = '' }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const nordicRef = useRef<HTMLSpanElement>(null);
  const codeRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const ctx = gsap.context(() => {
      // Split text into characters
      const nordicText = new SplitType(nordicRef.current!, {
        types: 'chars',
        absolute: false
      });
      
      const codeText = new SplitType(codeRef.current!, {
        types: 'chars',
        absolute: false
      });

      // Initial states
      gsap.set(nordicText.chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        perspective: 500,
      });
      
      gsap.set(codeText.chars, {
        opacity: 0,
        scale: 3,
        y: -50,
      });
      
      gsap.set(lineRef.current, {
        scaleX: 0,
        opacity: 0,
      });
      
      gsap.set(worksRef.current, {
        opacity: 0,
        y: 20,
        letterSpacing: '0.2em',
      });
      
      gsap.set(yearRef.current, {
        opacity: 0,
        x: 50,
        rotation: 0,
      });

      // Main animation timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // NORDIC text animation
      tl.to(nordicText.chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
      })
      // Line animation
      .to(lineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.5')
      // CODE text animation with bounce effect
      .to(codeText.chars, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: {
          each: 0.1,
          from: 'random',
        },
        ease: 'elastic.out(1, 0.3)',
      }, '-=0.7')
      // Works text animation
      .to(worksRef.current, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.5em',
        duration: 1,
        ease: 'back.out(1.7)',
      }, '-=0.5')
      // Year animation
      .to(yearRef.current, {
        opacity: 0.25,
        x: 0,
        rotation: 90,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.8')
      // Final flourish - subtle pulse on the line
      .to(lineRef.current, {
        scaleX: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      }, '-=0.4');

      // Add hover animations
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl
        .to(nordicText.chars, {
          y: -5,
          duration: 0.4,
          stagger: {
            each: 0.02,
            from: "center",
          },
          ease: "power2.out"
        })
        .to(codeText.chars, {
          y: 5,
          duration: 0.4,
          stagger: {
            each: 0.02,
            from: "center",
          },
          ease: "power2.out"
        }, 0);

      logoRef.current.addEventListener('mouseenter', () => hoverTl.play());
      logoRef.current.addEventListener('mouseleave', () => hoverTl.reverse());

      return () => {
        logoRef.current?.removeEventListener('mouseenter', () => hoverTl.play());
        logoRef.current?.removeEventListener('mouseleave', () => hoverTl.reverse());
      };
    }, logoRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={logoRef} 
      className={`flex flex-col items-center ${className}`}
    >
      <div className="relative">
        <div className="text-[12rem] md:text-[16rem] font-logo tracking-tighter leading-[0.8] select-none">
          <div className="flex items-center justify-center relative overflow-hidden">
            <span 
              ref={nordicRef}
              className="text-light-text-primary dark:text-dark-text-primary"
            >
              NORDIC
            </span>
            <div 
              ref={lineRef}
              className="absolute -bottom-2 left-0 w-full h-1 bg-light-accent-blue dark:bg-dark-accent-blue"
            />
          </div>
          <div className="flex items-center justify-center mt-4 overflow-hidden">
            <span 
              ref={codeRef}
              className="text-light-accent-blue dark:text-dark-accent-blue"
            >
              CODE
            </span>
          </div>
        </div>
        <div 
          ref={yearRef}
          className="absolute -right-4 top-0 text-4xl font-mono text-light-text-muted dark:text-dark-text-muted origin-left"
        >
          2024
        </div>
      </div>
      <div 
        ref={worksRef}
        className="text-2xl font-light mt-8 text-light-text-secondary dark:text-dark-text-secondary uppercase"
      >
        Works
      </div>
    </div>
  );
};

export default AnimatedLogo;