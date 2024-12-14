import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-surface-darker">
      <section className="text-center" aria-labelledby="page-title">
        <h1 id="page-title" className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Page Not Found</p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-tekhelet-base text-white rounded-lg hover:bg-tekhelet-light transition-colors"
        >
          Go Back Home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
