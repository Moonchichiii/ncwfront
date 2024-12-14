import { FC } from 'react'
import useProjects from '@hooks/useProjects'
import { Link } from 'react-router-dom'

const PortfolioPage: FC = () => {
  const { data, isLoading, isError, error } = useProjects()

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen" role="status" aria-live="polite">Loading...</div>
  }

  if (isError) {
    return <div className="flex items-center justify-center min-h-screen" role="alert">Error: {error.message}</div>
  }

  return (
    <main className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Our Projects</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Project List">
        {data?.results.map(project => (
          <article
            key={project.id}
            className="block border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link to={`/portfolio/${project.id}`} className="block">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}

export default PortfolioPage
