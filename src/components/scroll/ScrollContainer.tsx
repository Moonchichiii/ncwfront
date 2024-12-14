import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import LandingPage from '@pages/LandingPage';
import AboutPage from '@pages/AboutPage';
import PortfolioPage from '@pages/PortfolioPage';
import ContactPage from '@pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

const ScrollContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = sectionsRef.current;
    const scrollTriggers: gsap.ScrollTrigger[] = [];
    let lastScrollTime = 0;
    const scrollThreshold = 150;

    const ctx = gsap.context(() => {
      sections.forEach((section, index) => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            const now = Date.now();
            if (now - lastScrollTime > scrollThreshold) {
              setCurrentSection(index);
              lastScrollTime = now;
              
              setShowUI(index !== 0);
              setShowFooter(index === sections.length - 1);

              // Hide/show navigation elements based on section
              if (index !== 0) {
                gsap.to(['.scroll-indicator', '.time-zones'], {
                  opacity: 0,
                  duration: 0.3,
                  ease: 'power2.out',
                  pointerEvents: 'none',
                  delay: 0.1
                });
              }
            }
          },
          onEnterBack: () => {
            const now = Date.now();
            if (now - lastScrollTime > scrollThreshold) {
              setCurrentSection(index);
              lastScrollTime = now;

              setShowUI(index !== 0);
              setShowFooter(index === sections.length - 1);

              // Elements returning to landing page
              gsap.to(['.scroll-indicator', '.time-zones'], {
                opacity: index === 0 ? 1 : 0,
                duration: 0.3,
                ease: 'power2.out',
                pointerEvents: index === 0 ? 'auto' : 'none',
              });
            }
          },
        });
        scrollTriggers.push(trigger);
      });

      ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 50,
      });
    }, containerRef);

    return () => {
      scrollTriggers.forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  const handleScroll = (index: number) => {
    const target = sectionsRef.current[index];
    if (!target) return;

    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: target,
        autoKill: false,
      },
      ease: 'power3.inOut',
    });
  };

  return (
    <div ref={containerRef} className="relative bg-light-bg-primary dark:bg-dark-bg-primary">
      <Header 
        currentSection={currentSection} 
        showUI={showUI}
      />
      
      {/* Sections */}
      {[LandingPage, AboutPage, PortfolioPage, ContactPage].map((Page, index) => (
        <div
          key={index}
          ref={el => {
            if (el) sectionsRef.current[index] = el;
          }}
          className="min-h-screen"
        >
          <Page currentSection={currentSection} />
        </div>
      ))}

      {/* Scroll Indicator - Only visible on landing page */}
      {currentSection === 0 && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 scroll-indicator">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => handleScroll(index)}
              className={`block w-3 h-3 mb-4 rounded-full transition-all duration-300 ${
                currentSection === index
                  ? 'bg-light-accent-blue dark:bg-dark-accent-blue scale-150'
                  : 'bg-gray-300 dark:bg-gray-600 scale-100'
              }`}
              aria-label={`Scroll to section ${index + 1}`}
            />
          ))}
        </div>
      )}

      {showFooter && <Footer />}
    </div>
  );
};

export default ScrollContainer;