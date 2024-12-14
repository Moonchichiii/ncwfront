import { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '@components/common/ThemeToggle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  showHeader?: boolean;
}

const Header: FC<HeaderProps> = ({ showHeader = true }) => {
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (
      !showHeader ||
      !hamburgerRef.current ||
      !sidebarRef.current ||
      !headerRef.current ||
      !overlayRef.current
    )
      return;

    const ctx = gsap.context(() => {
      gsap.set(hamburgerRef.current, { x: 100, opacity: 0 });

      gsap.to(hamburgerRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top top+=100',
          toggleActions: 'play none none reset',
        },
      });

      const openSidebar = () => {
        gsap.to(sidebarRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.2,
          ease: 'power3.out',
          pointerEvents: 'auto',
        });
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.2,
          pointerEvents: 'auto',
        });
        document.body.style.overflow = 'hidden';
      };

      const closeSidebar = () => {
        gsap.to(sidebarRef.current, {
          x: '100%',
          opacity: 0,
          duration: 0.2,
          ease: 'power3.in',
          pointerEvents: 'none',
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          pointerEvents: 'none',
        });
        document.body.style.overflow = 'auto';
      };

      if (hamburgerRef.current) {
        hamburgerRef.current.addEventListener('click', openSidebar);
        hamburgerRef.current.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter') openSidebar();
        });
      }

      if (overlayRef.current) {
        overlayRef.current.addEventListener('click', closeSidebar);
      }

      return () => {
        if (hamburgerRef.current) {
          hamburgerRef.current.removeEventListener('click', openSidebar);
          hamburgerRef.current.removeEventListener(
            'keydown',
            (e: KeyboardEvent) => {
              if (e.key === 'Enter') openSidebar();
            }
          );
        }
        if (overlayRef.current) {
          overlayRef.current.removeEventListener('click', closeSidebar);
        }
      };
    }, headerRef);

    return () => ctx.revert();
  }, [showHeader]);

  return (
    <>
      <header
        ref={headerRef}
        className="bg-white dark:bg-surface-darker shadow fixed w-full z-50 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-tekhelet-base dark:text-white"
            >
              Nordic Code Works
            </Link>
          </div>
          <nav
            className="hidden md:flex space-x-4"
            aria-label="Main Navigation"
          >
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-tekhelet-base"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-tekhelet-base"
            >
              About
            </Link>
            <Link
              to="/portfolio"
              className="text-gray-700 dark:text-gray-300 hover:text-tekhelet-base"
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-tekhelet-base"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center">
            <ThemeToggle />
            <div
              ref={hamburgerRef}
              className="md:hidden ml-4 cursor-pointer"
              aria-label="Open Menu"
              role="button"
              tabIndex={0}
            >
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-tekhelet-base transition-colors" />
            </div>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 opacity-0 pointer-events-none transition-opacity duration-500 z-40"
        aria-hidden="true"
      ></div>

      <aside
        ref={sidebarRef}
        className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-surface-darker shadow-lg transform translate-x-full opacity-0 pointer-events-none transition-transform transition-opacity duration-500 z-50"
        aria-label="Sidebar Navigation"
      >
        <div className="flex justify-end p-4">
          <X
            className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-tekhelet-base cursor-pointer transition-colors"
            onClick={() => {
              gsap.to(sidebarRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                pointerEvents: 'none',
              });
              gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.5,
                pointerEvents: 'none',
              });
              document.body.style.overflow = 'auto';
            }}
            aria-label="Close Menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                gsap.to(sidebarRef.current, {
                  x: '100%',
                  opacity: 0,
                  duration: 0.5,
                  ease: 'power3.in',
                  pointerEvents: 'none',
                });
                gsap.to(overlayRef.current, {
                  opacity: 0,
                  duration: 0.5,
                  pointerEvents: 'none',
                });
                document.body.style.overflow = 'auto';
              }
            }}
          />
        </div>
        <nav className="flex flex-col space-y-4 px-6">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-tekhelet-base"
            onClick={() => {
              gsap.to(sidebarRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                pointerEvents: 'none',
              });
              gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.5,
                pointerEvents: 'none',
              });
              document.body.style.overflow = 'auto';
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-tekhelet-base"
            onClick={() => {
              gsap.to(sidebarRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                pointerEvents: 'none',
              });
              gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.5,
                pointerEvents: 'none',
              });
              document.body.style.overflow = 'auto';
            }}
          >
            About
          </Link>
          <Link
            to="/portfolio"
            className="text-gray-700 dark:text-gray-300 hover:text-tekhelet-base"
            onClick={() => {
              gsap.to(sidebarRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                pointerEvents: 'none',
              });
              gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.5,
                pointerEvents: 'none',
              });
              document.body.style.overflow = 'auto';
            }}
          >
            Portfolio
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-tekhelet-base"
            onClick={() => {
              gsap.to(sidebarRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                pointerEvents: 'none',
              });
              gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.5,
                pointerEvents: 'none',
              });
              document.body.style.overflow = 'auto';
            }}
          >
            Contact
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Header;
