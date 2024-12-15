import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Cookie, Settings, Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setShow(true);
        // Entry animation
        gsap.fromTo(containerRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!show) {
      gsap.to(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          setShow(false);
        }
      });
    }
  }, [show]);

  useEffect(() => {
    if (!detailsRef.current) return;

    if (showDetails) {
      gsap.fromTo(detailsRef.current,
        { height: 0, opacity: 0 },
        { 
          height: 'auto', 
          opacity: 1, 
          duration: 0.4,
          ease: 'power2.out'
        }
      );
    } else {
      gsap.to(detailsRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [showDetails]);

  const handleAcceptAll = () => {
    const newSettings = { necessary: true, analytics: true, marketing: true };
    setSettings(newSettings);
    localStorage.setItem('cookie-consent', JSON.stringify(newSettings));
    setShow(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(settings));
    setShow(false);
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.timeline()
      .to(e.currentTarget, {
        scale: 0.98,
        duration: 0.1
      })
      .to(e.currentTarget, {
        scale: 1,
        duration: 0.1
      });
  };

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto"
    >
      <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl shadow-2xl border border-light-text-primary/10 dark:border-dark-text-primary/10">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="w-6 h-6 text-light-text-primary dark:text-dark-text-primary" />
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                Cookie Settings
              </h3>
            </div>
            <button
              onClick={() => setShow(false)}
              className="p-1 text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors rounded-full hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary"
            >
              <X size={20} />
            </button>
          </div>
          
          <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            We use cookies to enhance your browsing experience and provide personalized content.
            Your privacy matters to us.
          </p>

          <div ref={detailsRef} style={{ height: 0, overflow: 'hidden' }}>
            {showDetails && (
              <div className="mt-4 space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      id: 'necessary',
                      title: 'Essential Cookies',
                      description: 'Required for the website to function properly',
                      icon: <Shield className="w-5 h-5" />,
                      required: true,
                    },
                    {
                      id: 'analytics',
                      title: 'Analytics Cookies',
                      description: 'Help us improve our website by collecting anonymous usage data',
                      icon: <Settings className="w-5 h-5" />,
                    },
                    {
                      id: 'marketing',
                      title: 'Marketing Cookies',
                      description: 'Used to deliver more relevant advertisements',
                      icon: <Cookie className="w-5 h-5" />,
                    },
                  ].map(({ id, title, description, icon, required }) => (
                    <div
                      key={id}
                      className="flex items-start gap-4 p-3 rounded-lg bg-light-bg-tertiary dark:bg-dark-bg-tertiary"
                    >
                      <div className="text-light-text-muted dark:text-dark-text-muted">
                        {icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                            {title}
                          </h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings[id as keyof CookieSettings]}
                              onChange={(e) =>
                                !required &&
                                setSettings((prev) => ({
                                  ...prev,
                                  [id]: e.target.checked,
                                }))
                              }
                              disabled={required}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-light-bg-tertiary dark:bg-dark-bg-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-light-accent-blue dark:peer-checked:bg-dark-accent-blue"></div>
                          </label>
                        </div>
                        <p className="mt-1 text-sm text-light-text-muted dark:text-dark-text-muted">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-4 py-2 bg-light-accent-blue dark:bg-dark-accent-blue text-white rounded-lg font-medium hover:opacity-90 transition-all"
            >
              Accept All
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 px-4 py-2 border border-light-text-primary/10 dark:border-dark-text-primary/10 text-light-text-primary dark:text-dark-text-primary rounded-lg font-medium hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors flex items-center justify-center gap-2"
            >
              {showDetails ? (
                <>Hide Details <ChevronUp size={16} /></>
              ) : (
                <>Cookie Settings <ChevronDown size={16} /></>
              )}
            </button>
            {showDetails && (
              <button
                onClick={handleSaveSettings}
                className="flex-1 px-4 py-2 bg-light-accent-blue dark:bg-dark-accent-blue text-white rounded-lg font-medium hover:opacity-90 transition-all"
              >
                Save Settings
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;