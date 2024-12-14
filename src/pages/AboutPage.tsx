import { FC } from 'react'
import AnimatedSection from '@components/common/AnimatedSection'

const AboutPage: FC = () => {
  return (
    <main className="container mx-auto px-4 py-20">
      <AnimatedSection className="mb-16">
        <header>
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
        </header>
        <p className="text-gray-600 dark:text-gray-300">
          We are Nordic Code Works, dedicated to delivering high-quality digital solutions with Nordic precision and innovation.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <section>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our mission is to craft elegant and efficient digital products that empower businesses and delight users.
          </p>
        </section>
      </AnimatedSection>
    </main>
  )
}

export default AboutPage
