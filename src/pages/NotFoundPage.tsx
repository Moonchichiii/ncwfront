import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import AnimatedSection from '@/components/animation/AnimatedSection';

const NotFoundPage: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-light-bg-primary dark:bg-dark-bg-primary px-4">
      <AnimatedSection>
        <div className="max-w-2xl mx-auto text-center">
          {/* Large 404 */}
          <div className="mb-12">
          <span className="text-8xl sm:text-9xl font-light inline-block bg-gradient-to-r from-light-accent-blue to-light-accent-purple dark:from-dark-accent-blue dark:to-dark-accent-purple bg-clip-text text-transparent">
          404
        </span>
          </div>

          {/* Message */}
          <div className="space-y-6 mb-12">
          <h1 className="text-3xl sm:text-4xl font-light text-light-text-primary dark:text-dark-text-heading">
          This page has moved or doesn't exist
        </h1>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
              The page you're looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
          </div>

          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-light-accent-blue dark:bg-dark-accent-blue text-white hover:bg-light-accent-purple dark:hover:bg-dark-accent-purple transition-colors"
            >
              <Home className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              Return Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 px-8 py-4 rounded-full border border-light-text-primary/20 dark:border-dark-text-primary/20 hover:border-light-accent-blue dark:hover:border-dark-accent-blue text-light-text-primary dark:text-dark-text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              Go Back
            </button>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default NotFoundPage;