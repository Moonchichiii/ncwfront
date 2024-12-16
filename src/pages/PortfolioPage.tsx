import { FC, useState } from 'react';
import AnimatedSection from '@/components/animation/AnimatedSection';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import useProjects from '@/hooks/useProjects';

const PortfolioPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { data, isLoading, error } = useProjects({ category: selectedCategory });

  const categories = [
    { id: undefined, label: 'All' },
    { id: 'Design', label: 'Design' },
    { id: 'Development', label: 'Development' },
  ];

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-20">
        <div className="h-screen flex items-center justify-center">
          <div className="text-light-text-secondary dark:text-dark-text-secondary">
            Loading projects...
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-20">
        <div className="h-screen flex items-center justify-center">
          <div className="text-status-error">Error loading projects</div>
        </div>
      </main>
    );
  }

  const projects = data?.results || [];

  return (
    <main className="container mx-auto px-4 py-20">
      <AnimatedSection>
        <header className="mb-16 max-w-3xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-8 text-light-text-primary dark:text-dark-text-heading">
            Creating next level digital products
          </h1>
          <div className="flex gap-4">
            {categories.map((category) => (
              <button
                key={category.label}
                onClick={() => setSelectedCategory(category.id)}
                aria-label={`Filter by ${category.label}`}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary'
                    : 'hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary text-light-text-secondary dark:text-dark-text-secondary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </header>
      </AnimatedSection>

      <section className="space-y-6">
        {/* Column Headers */}
        <div className="grid grid-cols-12 items-center px-4 pb-4">
          <div className="col-span-12 md:col-span-3">
            <h2 className="text-sm font-medium uppercase tracking-wider text-light-text-secondary dark:text-dark-text-secondary">
              Client
            </h2>
          </div>
          <div className="hidden md:block md:col-span-3">
            <h2 className="text-sm font-medium uppercase tracking-wider text-light-text-secondary dark:text-dark-text-secondary">
              Location
            </h2>
          </div>
          <div className="hidden md:block md:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-light-text-secondary dark:text-dark-text-secondary">
              Services
            </h2>
          </div>
          <div className="hidden md:block md:col-span-2">
            <h2 className="text-sm font-medium uppercase tracking-wider text-light-text-secondary dark:text-dark-text-secondary">
              Year
            </h2>
          </div>
        </div>

        {/* Projects List */}
        <div className="border-t border-light-text-primary/10 dark:border-dark-text-primary/10">
          {projects.map((project) => (
            <AnimatedSection key={project.id}>
              <Link to={project.link} className="block group">
                <article className="grid grid-cols-12 items-center py-8 hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 transition-colors rounded-2xl px-4">
                  <div className="col-span-12 md:col-span-3">
                    <h3 className="text-xl font-light text-light-text-primary dark:text-dark-text-heading group-hover:text-light-accent-blue dark:group-hover:text-dark-accent-blue transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-3 text-light-text-secondary dark:text-dark-text-secondary">
                    {project.location}
                  </div>
                  <div className="col-span-12 md:col-span-4 text-light-text-secondary dark:text-dark-text-secondary">
                    {project.services}
                  </div>
                  <div className="col-span-11 md:col-span-1 text-light-text-secondary dark:text-dark-text-secondary">
                    {project.year}
                  </div>
                  <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-6 h-6 text-light-accent-blue dark:text-dark-accent-blue transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 text-light-text-secondary dark:text-dark-text-secondary">
            No projects found in this category
          </div>
        )}
      </section>

      <AnimatedSection>
        <div className="mt-20 py-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-light-accent-blue dark:bg-dark-accent-blue text-white rounded-full hover:bg-light-accent-purple dark:hover:bg-dark-accent-purple transition-colors"
          >
            Start a Project
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default PortfolioPage;