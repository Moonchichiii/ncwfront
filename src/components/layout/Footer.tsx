import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';
import PolicyModal from '@/components/common/PolicyModal';
import { policies } from '@/components/common/policies';

const Footer: FC = () => {
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const socials = [
    {
      icon: Github,
      href: 'https://github.com/Moonchichiii',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/mats-gustafsson-a57643103',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:mats.gustafsson83@gmail.com',
      label: 'Email'
    }
  ];

  const handlePolicyClick = (policyType: 'terms' | 'privacy' | 'cookies') => {
    setModalContent(policies[policyType]);
  };

  return (
    <>
      <footer
        className="border-t border-light-text-primary/10 dark:border-dark-text-primary/10 py-12 mt-auto"
        role="contentinfo"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-light-text-primary dark:text-dark-text-heading">
                Connect
              </h3>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={social.label}
                  >
                    <div className="p-3 rounded-full border border-light-text-primary/10 dark:border-dark-text-primary/10 hover:border-light-accent-blue dark:hover:border-dark-accent-blue transition-all duration-300 group-hover:scale-105">
                      <social.icon
                        className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-light-accent-blue dark:group-hover:text-dark-accent-blue transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-light-text-primary dark:text-dark-text-heading">
                Legal
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => handlePolicyClick('privacy')}
                  className="block text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handlePolicyClick('terms')}
                  className="block text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition-colors"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => handlePolicyClick('cookies')}
                  className="block text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition-colors"
                >
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-light-text-primary/10 dark:border-dark-text-primary/10">
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-4 md:mb-0 font-light">
              &copy; {new Date().getFullYear()} Nordic Code Works. All rights reserved.
            </p>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-light">
              Made in Sweden
            </p>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={modalContent !== null}
        onClose={() => setModalContent(null)}
        title={modalContent?.title || ''}
        content={modalContent?.content || ''}
      />
    </>
  );
};

export default Footer;