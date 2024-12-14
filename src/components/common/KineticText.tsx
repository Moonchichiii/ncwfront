import { FC, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
  text: string;
  className?: string;
}

const KineticText: FC<KineticTextProps> = ({ text, className }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current!.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reset',
          },
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={textRef} className={className} role="text">
      {text.split(' ').map((word, index) => (
        <span key={index} className="inline-block mr-2" aria-label={word}>
          {word}
        </span>
      ))}
    </div>
  );
};

export default KineticText;
