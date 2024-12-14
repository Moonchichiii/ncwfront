import { FC, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import ThemeToggle from '@components/common/ThemeToggle';
import AnimatedLogo from '@components/common/AnimatedLogo';

const LandingPage: FC = () => {
  const timeDisplaysRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update times
  useEffect(() => {
    const updateTimeDisplays = () => {
      if (!timeDisplaysRef.current) return;
      const now = new Date();
      const timeElements =
        timeDisplaysRef.current.querySelectorAll<HTMLElement>('.time-value');

      timeElements.forEach((el) => {
        const timezone = el.getAttribute('data-timezone');
        if (!timezone) return;
        const time = new Date(
          now.toLocaleString('en-US', { timeZone: timezone })
        ).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        el.textContent = time;
      });
    };

    updateTimeDisplays();
    const interval = setInterval(updateTimeDisplays, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initial animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set('.time-display', {
        opacity: 0,
        x: 20,
      });

      const mainTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

      mainTL.to(
        '.time-display',
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-light-bg-primary dark:bg-dark-bg-primary"
    >
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-50">
        <ThemeToggle variant="landing" />
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-[1400px] px-4 mx-auto flex flex-col items-center justify-center min-h-screen">
        {/* Logo Section */}
        <AnimatedLogo />

        {/* Time Zones */}
        <div
          ref={timeDisplaysRef}
          className="absolute bottom-12 right-12 flex flex-col gap-3"
        >
          {[
            { city: 'STOCKHOLM', timezone: 'Europe/Stockholm' },
            { city: 'NEW YORK', timezone: 'America/New_York' },
            { city: 'LONDON', timezone: 'Europe/London' },
          ].map(({ city, timezone }) => (
            <div
              key={city}
              className="time-display flex items-center gap-2 text-xs"
            >
              <Clock
                size={12}
                className="text-light-text-muted dark:text-dark-text-muted"
              />
              <span className="text-light-text-muted dark:text-dark-text-muted font-medium">
                {city}
              </span>
              <span
                className="time-value font-mono font-medium text-light-text-primary dark:text-dark-text-primary"
                data-timezone={timezone}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
