import { FC, useRef, useEffect } from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import AnimatedLogo from '@/components/animation/AnimatedLogo';
import ThemeToggle from '@components/common/ThemeToggle';

interface LandingPageProps {
  currentSection: number;
}

const LandingPage: FC<LandingPageProps> = ({ currentSection }) => {
  const timeDisplaysRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTimeDisplays = () => {
      if (!timeDisplaysRef.current) return;
      const now = new Date();
      const timeElements = timeDisplaysRef.current.querySelectorAll<HTMLElement>('.time-value');

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

  useEffect(() => {
    if (!containerRef.current || !scrollIndicatorRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set('.time-display', {
        opacity: 0,
        x: 20,
      });

      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
      });

      const mainTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

      mainTL
        .to('.time-display', {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
        }, 2)
        .to(scrollIndicatorRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.3');

      gsap.to('.scroll-chevron', {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollClick = () => {
    const target = document.getElementById('about-section');
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, autoKill: false },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-light-bg-primary dark:bg-dark-bg-primary overflow-hidden"
    >
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-5 sm:p-6 z-50">
        {/* ThemeToggle */}
        {currentSection === 0 && (
          <div className="flex items-center">
            <ThemeToggle variant="landing" />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        {/* Logo Section */}
        <div className="py-8 sm:py-12 md:py-16 lg:py-20 transform-gpu relative">
          <AnimatedLogo className="scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100" />
          
          {/* Scroll Indicator - Closer to WORKS text */}
          <div
            ref={scrollIndicatorRef}
            onClick={handleScrollClick}
            className="absolute left-1/2 -translate-x-1/2 mt-4 sm:mt-1 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <span className="text-sm text-light-text-muted dark:text-dark-text-muted mb-2 uppercase tracking-wider">
              Scroll
            </span>
            <ChevronDown 
              className="scroll-chevron w-6 h-6 text-light-accent-blue dark:text-dark-accent-blue" 
            />
          </div>
        </div>

        {/* Time Zones */}
        {currentSection === 0 && (
          <div
            ref={timeDisplaysRef}
            className="fixed bottom-12 right-4 sm:right-8 md:right-12 flex flex-col gap-2 sm:gap-3 time-zones"
          >
            {[
              { city: 'STOCKHOLM', timezone: 'Europe/Stockholm' },
              { city: 'NEW YORK', timezone: 'America/New_York' },
              { city: 'LONDON', timezone: 'Europe/London' },
            ].map(({ city, timezone }) => (
              <div
                key={city}
                className="time-display flex items-center gap-2 text-[10px] sm:text-xs md:text-sm"
              >
                <Clock
                  size={12}
                  className="text-light-text-muted dark:text-dark-text-muted hidden sm:block"
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
        )}
      </div>
    </div>
  );
};

export default LandingPage;