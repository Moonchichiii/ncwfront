import { FC } from 'react';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-surface-darker py-8 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between">
        <nav aria-labelledby="quick-links" className="mb-6 md:mb-0">
          <h4 id="quick-links" className="text-lg font-semibold text-gray-700 dark:text-gray-300">Quick Links</h4>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-tekhelet-base">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-tekhelet-base">
                About
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-tekhelet-base">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-tekhelet-base">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-labelledby="legal" className="mb-6 md:mb-0">
          <h4 id="legal" className="text-lg font-semibold text-gray-700 dark:text-gray-300">Legal</h4>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-tekhelet-base">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-tekhelet-base">
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Nordic Code Works. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
