import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import LandingPage from '@pages/LandingPage';
import AboutPage from '@pages/AboutPage';
import PortfolioPage from '@pages/PortfolioPage';
import ContactPage from '@pages/ContactPage';
import CookieConsent from '@components/common/CookieConsent';
import ChatAssistant from '@components/assistant/ChatAssistant';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


export const ScrollContext = createContext<{ scrollToSection: (id: string) => void }>({ scrollToSection: () => {} });

const ScrollContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [showChatAssistant, setShowChatAssistant] = useState(false);

  
  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          autoKill: false,
        },
        ease: 'power3.inOut',
      });
    }
  };


  useEffect(() => {
    if (!scrollIndicatorRef.current) return;

    const ctx = gsap.context(() => {
      if (currentSection === 0) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          pointerEvents: 'auto'
        });
      } else {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
          pointerEvents: 'none'
        });
      }
    });

    return () => ctx.revert();
  }, [currentSection]);

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
              setShowChatAssistant(index !== 0);
            }
          },
          onEnterBack: () => {
            const now = Date.now();
            if (now - lastScrollTime > scrollThreshold) {
              setCurrentSection(index);
              lastScrollTime = now;

              setShowUI(index !== 0);
              setShowFooter(index === sections.length - 1);
              setShowChatAssistant(index !== 0);
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
    <ScrollContext.Provider value={{ scrollToSection }}>
      <div ref={containerRef} className="relative bg-light-bg-primary dark:bg-dark-bg-primary">
        <Header 
          currentSection={currentSection} 
          showUI={showUI}
        />
        
        {/* Sections */}
        {[LandingPage, AboutPage, PortfolioPage, ContactPage].map((Page, index) => (
          <div
            key={index}
            id={index === 0 ? 'landing-section' : index === 1 ? 'about-section' : index === 2 ? 'portfolio-section' : 'contact-section'}
            ref={(el) => el && (sectionsRef.current[index] = el)}
            className="min-h-screen"
          >
            <Page currentSection={currentSection} />
          </div>
        ))}

        {/* Hidden Scroll Index */}
        <div 
          ref={scrollIndicatorRef}
          className="fixed left-0 top-0 w-0 h-0 overflow-hidden"
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              data-section={index}
              className="scroll-section-marker"
            />
          ))}
        </div>

        {/* Keyboard Navigation Handler */}
        <div 
          className="sr-only"
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              handleScroll(Math.min(currentSection + 1, 3));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              handleScroll(Math.max(currentSection - 1, 0));
            }
          }}
          tabIndex={0}
          role="application"
          aria-label="Section Navigation"
        />

        <ChatAssistant show={showChatAssistant} />
        {showFooter && <Footer />}
        <CookieConsent />
      </div>
    </ScrollContext.Provider>
  );
};

export default ScrollContainer;
