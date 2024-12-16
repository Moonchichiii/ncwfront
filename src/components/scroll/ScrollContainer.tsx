import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import LandingPage from '@pages/LandingPage';
import AboutPage from '@pages/AboutPage';
import PortfolioPage from '@pages/PortfolioPage';
import ContactPage from '@pages/ContactPage';
import CookieConsent from '@components/common/CookieConsent';
import ChatAssistant from '@components/assistant/ChatAssistant';

gsap.registerPlugin(ScrollTrigger);

// Constants to avoid magic numbers
const SCROLL_THRESHOLD = 150;
const DEBOUNCE_DELAY = 100;
const SCROLL_ANIMATION_DURATION = 1;
const INDICATOR_ANIMATION_DURATION = 0.3;

const PAGES = [LandingPage, AboutPage, PortfolioPage, ContactPage] as const;

interface ScrollState {
  currentSection: number;
  showUI: boolean;
  showFooter: boolean;
  showChatAssistant: boolean;
}

const ScrollContainer: React.FC = () => {
  // Combined state object to reduce re-renders
  const [scrollState, setScrollState] = useState<ScrollState>({
    currentSection: 0,
    showUI: true,
    showFooter: false,
    showChatAssistant: false,
  });

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const lastScrollTimeRef = useRef<number>(0);

  // Memoized scroll trigger configuration
  const scrollTriggerConfig = useMemo(() => ({
    limitCallbacks: true,
    syncInterval: 50,
  }), []);

  // Optimized state update function
  const updateScrollState = useCallback((index: number) => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current > SCROLL_THRESHOLD) {
      lastScrollTimeRef.current = now;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Update all related states at once
      setScrollState(prev => ({
        currentSection: index,
        showUI: index !== 0,
        showFooter: index === PAGES.length - 1,
        showChatAssistant: index !== 0,
      }));
    }
  }, []);

  // Scroll indicator animation effect
  useEffect(() => {
    if (!scrollIndicatorRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(scrollIndicatorRef.current, {
        opacity: scrollState.currentSection === 0 ? 1 : 0,
        duration: INDICATOR_ANIMATION_DURATION,
        ease: 'power2.out',
        pointerEvents: scrollState.currentSection === 0 ? 'auto' : 'none'
      });
    });

    return () => ctx.revert();
  }, [scrollState.currentSection]);

  // Scroll triggers setup
  useEffect(() => {
    if (!containerRef.current) return;

    const sections = sectionsRef.current;
    const scrollTriggers: gsap.ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      sections.forEach((section, index) => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => updateScrollState(index),
          onEnterBack: () => updateScrollState(index),
        });
        scrollTriggers.push(trigger);
      });

      ScrollTrigger.config(scrollTriggerConfig);
    }, containerRef);

    return () => {
      scrollTriggers.forEach(trigger => trigger.kill());
      ctx.revert();
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [updateScrollState, scrollTriggerConfig]);

  // Optimized scroll handler
  const handleScroll = useCallback((index: number) => {
    const target = sectionsRef.current[index];
    if (!target) return;

    gsap.to(window, {
      duration: SCROLL_ANIMATION_DURATION,
      scrollTo: {
        y: target,
        autoKill: false,
      },
      ease: 'power3.inOut',
    });
  }, []);

  // Memoized keyboard handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleScroll(Math.min(scrollState.currentSection + 1, PAGES.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleScroll(Math.max(scrollState.currentSection - 1, 0));
    }
  }, [scrollState.currentSection, handleScroll]);

  return (
    <div ref={containerRef} className="relative bg-light-bg-primary dark:bg-dark-bg-primary">
      <Header 
        currentSection={scrollState.currentSection} 
        showUI={scrollState.showUI}
      />
      
      {PAGES.map((Page, index) => (
        <div
          key={index}
          ref={el => el && (sectionsRef.current[index] = el)}
          className="min-h-screen"
        >
          <Page currentSection={scrollState.currentSection} />
        </div>
      ))}

      <div 
        ref={scrollIndicatorRef}
        className="fixed left-0 top-0 w-0 h-0 overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: PAGES.length }, (_, i) => (
          <div
            key={i}
            data-section={i}
            className="scroll-section-marker"
          />
        ))}
      </div>

      <div 
        className="sr-only"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="application"
        aria-label="Section Navigation"
      />

      <ChatAssistant show={scrollState.showChatAssistant} />
      {scrollState.showFooter && <Footer />}
      <CookieConsent />
    </div>
  );
};

export default ScrollContainer;