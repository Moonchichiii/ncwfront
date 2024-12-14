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

  const isLandingPage = currentSection === 0;

  useEffect(() => {
    if (!menuRef.current || !sidebarRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(sidebarRef.current, {
        clipPath: 'circle(0% at calc(100% - 28px) 28px)',
        opacity: 1,
        pointerEvents: 'none',
      });

      gsap.set(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
      });
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
          clipPath: 'circle(170% at calc(100% - 28px) 28px)',
          pointerEvents: 'auto',
          duration: 0.75,
          ease: 'power3.inOut',
        }, '-=0.2');

      document.body.style.overflow = 'hidden';
    } else {
      setIsMenuOpen(false);
      
      gsap.timeline()
        .to(sidebarRef.current, {
          clipPath: 'circle(0% at calc(100% - 28px) 28px)',
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
        onClick={toggleMenu}
        className={`flex items-center gap-2 text-light-text-primary dark:text-dark-text-primary focus:outline-none transition-all duration-300`}
        aria-label="Toggle Menu"
      >
        {isLandingPage ? (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md flex items-center justify-center group hover:bg-white/20 dark:hover:bg-black/20 transition-colors">
            <div className="flex items-center gap-2 select-none">
              <span className="w-2 h-2 bg-light-accent-blue dark:bg-dark-accent-blue rounded-full" />
              <span className="block text-sm font-medium tracking-wide">menu</span>
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md flex items-center justify-center group hover:bg-white/20 dark:hover:bg-black/20 transition-colors">
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-light-text-primary dark:text-dark-text-primary" />
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
        className="fixed top-4 right-4 w-[calc(100vw-2rem)] max-w-[20rem] h-[calc(100vh-2rem)] bg-light-bg-primary/95 dark:bg-dark-bg-primary/95 shadow-2xl rounded-[2rem] overflow-hidden backdrop-blur-md border border-white/10 dark:border-white/5"
        aria-label="Main Navigation"
      >
        {/* Glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/10 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 p-2 text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition-colors z-[70]"
          aria-label="Close Menu"
        >
          <X className="w-6 h-6" />
        </button>

        {/* ThemeToggle - Only show when not on landing page */}
        {!isLandingPage && (
          <div className="absolute top-4 left-4 z-[70]">
            <ThemeToggle />
          </div>
        )}

        <nav className="relative h-full flex flex-col pt-24 px-8">
          <div className="flex-1 space-y-6">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/portfolio', label: 'Portfolio' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={toggleMenu}
                className="block text-xl sm:text-2xl font-light text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition-colors"
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