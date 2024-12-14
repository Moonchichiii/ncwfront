import { FC } from 'react';
import AnimatedSection from '@components/common/AnimatedSection';

const ContactPage: FC = () => {
  return (
    <main className="container mx-auto px-4 py-20">
      <AnimatedSection
        className="mb-16"
        role="region"
        aria-labelledby="contact-us-heading"
      >
        <h1 id="contact-us-heading" className="text-4xl font-bold mb-6">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          We would love to hear from you! Whether you have a question about our
          services, pricing, or anything else, our team is ready to answer all
          your questions.
        </p>
      </AnimatedSection>

      <AnimatedSection
        className="mb-16"
        role="region"
        aria-labelledby="get-in-touch-heading"
      >
        <h2 id="get-in-touch-heading" className="text-3xl font-semibold mb-4">
          Get In Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          You can reach us via email at{' '}
          <a
            href="mailto:contact@nordiccodeworks.com"
            className="text-blue-600 underline"
          >
            contact@nordiccodeworks.com
          </a>{' '}
          or call us at{' '}
          <a href="tel:+1234567890" className="text-blue-600 underline">
            +123 456 7890
          </a>
          . We are also available on social media platforms.
        </p>
      </AnimatedSection>
    </main>
  );
};

export default ContactPage;
