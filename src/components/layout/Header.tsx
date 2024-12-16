import { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '@components/common/ThemeToggle';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentSection: number;
}

const Header: FC<HeaderProps> = ({ currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isLandingPage = currentSection === 0;

  useEffect(() => {
    if (!menuRef.current || !sidebarRef.current) return;

    const ctx = gsap.context(() => {
      // Initial setup with circular clip-path
      gsap.set(sidebarRef.current, {
        clipPath: 'circle(0% at calc(100% + 1rem) 28px)',
        opacity: 1,
        pointerEvents: 'none',
      });

      gsap.set(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
      });

      // Enhanced hover animations for nav links
      navLinksRef.current.forEach((link) => {
        if (!link) return;
        
        const timeline = gsap.timeline({ paused: true });
        timeline.to(link, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });

        link.addEventListener('mouseenter', () => timeline.play());
        link.addEventListener('mouseleave', () => timeline.reverse());
      });

      // Add hover animation for menu text when on landing page
      if (menuButtonRef.current && isLandingPage) {
        const menuTextEl = menuButtonRef.current.querySelector('.menu-text');
        if (menuTextEl) {
          const menuTextTl = gsap.timeline({ paused: true });
          menuTextTl
            .to(menuTextEl, {
              rotateZ: -4,
              y: -3,
              x: -1,
              duration: 0.15,
              ease: 'power2.out',
            })
            .to(menuTextEl, {
              rotateZ: 3,
              y: 2,
              x: 1,
              duration: 0.2,
              ease: 'power2.inOut',
            })
            .to(menuTextEl, {
              rotateZ: -2,
              y: -1,
              x: -0.5,
              duration: 0.2,
              ease: 'power2.inOut',
            })
            .to(menuTextEl, {
              rotateZ: 0,
              y: 0,
              x: 0,
              duration: 0.15,
              ease: 'power2.out',
            });

          menuButtonRef.current.addEventListener('mouseenter', () => menuTextTl.restart());
        }
      } else if (menuButtonRef.current) {
        // Add hover animation for hamburger icon
        const hamburgerEl = menuButtonRef.current.querySelector('.hamburger-icon');
        if (hamburgerEl) {
          const hamburgerTl = gsap.timeline({ paused: true });
          hamburgerTl
            .to(hamburgerEl, {
              rotate: 180,
              scale: 1.1,
              duration: 0.3,
              ease: 'back.out(1.7)',
            });

          menuButtonRef.current.addEventListener('mouseenter', () => hamburgerTl.play());
          menuButtonRef.current.addEventListener('mouseleave', () => hamburgerTl.reverse());
        }
      }
    }, menuRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      
      gsap.timeline()
        .to(overlayRef.current, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.3,
        })
        .to(sidebarRef.current, {
          clipPath: 'circle(170% at calc(100% + 1rem) 28px)',
          pointerEvents: 'auto',
          duration: 0.75,
          ease: 'power3.inOut',
        }, '-=0.2')
        .from(navLinksRef.current, {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power2.out',
        }, '-=0.4');

      document.body.style.overflow = 'hidden';
    } else {
      setIsMenuOpen(false);
      
      gsap.timeline()
        .to(sidebarRef.current, {
          clipPath: 'circle(0% at calc(100% + 1rem) 28px)',
          pointerEvents: 'none',
          duration: 0.5,
          ease: 'power3.inOut',
        })
        .to(overlayRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
        }, '-=0.3');

      document.body.style.overflow = 'auto';
    }
  };

  return (
    <header ref={menuRef} className="fixed top-0 right-0 z-[60] px-6 py-5 sm:p-6">
      {/* Menu Button */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        className="group flex items-center gap-2 text-light-text-primary dark:text-dark-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-light-accent-blue dark:focus-visible:ring-dark-accent-blue rounded-full transition-all duration-300"
        aria-label="Toggle Menu"
        aria-expanded={isMenuOpen}
        aria-controls="main-menu"
      >
        {isLandingPage ? (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 dark:bg-black/15 backdrop-blur-xl flex items-center justify-center group-hover:bg-white/25 dark:group-hover:bg-black/25 transition-all duration-300">
            <div className="flex items-center gap-2 select-none">
              <span className="w-2 h-2 bg-light-accent-blue dark:bg-dark-accent-blue rounded-full" />
              <span className="menu-text block text-lg font-medium tracking-wide">menu</span>
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 dark:bg-black/15 backdrop-blur-xl flex items-center justify-center group-hover:bg-white/25 dark:group-hover:bg-black/25 transition-all duration-300 shadow-lg">
            <Menu className="hamburger-icon w-5 h-5 sm:w-6 sm:h-6 text-light-text-primary dark:text-dark-text-primary transition-transform duration-300" />
          </div>
        )}
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="main-menu"
        className="fixed top-4 right-0 w-[calc(100vw-2rem)] max-w-[20rem] h-[calc(100vh-2rem)] bg-light-bg-primary/95 dark:bg-dark-bg-primary/95 shadow-2xl rounded-l-[3rem] overflow-hidden backdrop-blur-lg border-l border-y border-white/20 dark:border-white/10"
        aria-label="Main Navigation"
      >
        {/* Glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-white/5 dark:via-white/2 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 p-2 text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-light-accent-blue dark:focus-visible:ring-dark-accent-blue rounded-full transition-colors z-[80]"
          aria-label="Close Menu"
        >
          <X className="w-6 h-6" />
        </button>

        {/* ThemeToggle */}
        {!isLandingPage && (
          <div className="absolute top-4 left-4 z-[70]">
            <ThemeToggle />
          </div>
        )}

        <nav className="relative h-full flex flex-col pt-20 px-8">
          <div className="flex-1 space-y-6">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/portfolio', label: 'Portfolio' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }, index) => (
              <Link
                key={to}
                ref={el => navLinksRef.current[index] = el}
                to={to}
                onClick={toggleMenu}
                className="block text-xl sm:text-2xl font-light text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-light-accent-blue dark:focus-visible:ring-dark-accent-blue rounded-lg p-2 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </header>
  );
};

export default Header;