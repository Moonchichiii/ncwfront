import { FC } from 'react';
import AnimatedSection from '@/components/animation/AnimatedSection';
import { Code2, Boxes, Rocket, Terminal, Server, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: FC = () => {
  const expertise = [
    {
      area: "Frontend Development",
      skills: "React · TypeScript · Tailwind · GSAP",
      description: "Creating responsive and intuitive user interfaces with modern web technologies"
    },
    {
      area: "Backend Development",
      skills: "Python · Django · Node.js · REST APIs",
      description: "Building robust server-side solutions and efficient database architectures"
    },
    {
      area: "DevOps & Tools",
      skills: "Docker · AWS · Git · VS Code",
      description: "Implementing reliable deployment and development workflows"
    }
  ];

  const values = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, efficient, and well-documented code"
    },
    {
      icon: Cpu,
      title: "Modern Stack",
      description: "Leveraging cutting-edge technologies for optimal solutions"
    },
    {
      icon: Server,
      title: "Full Stack",
      description: "End-to-end development from frontend to backend"
    }
  ];

  return (
    <main id="about-section" className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <AnimatedSection className="mb-32">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-12 text-light-text-primary dark:text-dark-text-heading">
          Crafting digital
          <br /> experiences with
          <br /> Nordic precision
        </h1>
        <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl">
          Founded by Mats Gustafsson, Nordic Code Works transforms ideas into elegant, 
          efficient digital solutions. We combine technical expertise with 
          creative problem-solving to deliver exceptional results.
        </p>
      </AnimatedSection>

      {/* Expertise Section */}
      <AnimatedSection className="mb-32">
        <div className="space-y-16">
          {expertise.map((item, index) => (
            <div 
              key={index}
              className="group border-b border-light-text-primary/10 dark:border-dark-text-primary/10 pb-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <span className="text-sm text-light-text-muted dark:text-dark-text-muted">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-light text-light-text-primary dark:text-dark-text-heading">{item.area}</h3>
                </div>
                <div className="lg:col-span-9">
                  <p className="text-3xl font-light text-light-text-secondary dark:text-dark-text-secondary mb-4">
                    {item.description}
                  </p>
                  <p className="text-light-text-muted dark:text-dark-text-muted font-mono">
                    {item.skills}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection className="mb-32">
      <h2 className="text-2xl font-light text-light-text-primary dark:text-dark-text-heading">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <div key={index} className="space-y-4">
              <value.icon className="w-10 h-10 text-light-accent-blue dark:text-dark-accent-blue" />
              <h3 className="text-xl font-light text-light-text-primary dark:text-dark-text-heading">{value.title}</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-light text-light-text-primary dark:text-dark-text-heading">Ready to start your project?</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl">
            Let's discuss how we can bring your ideas to life with modern web development 
            solutions tailored to your needs.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-light-accent-blue dark:bg-dark-accent-blue text-white rounded-full hover:bg-light-accent-purple dark:hover:bg-dark-accent-purple transition-colors"
          >
            Start a Conversation
            <Rocket className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default AboutPage;