import React, { useEffect, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { portfolioAPI } from '../services/api';

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await portfolioAPI.getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

    if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Loading Projects...</h2>
        </div>
      </section>
    );
  }

    return (
    <section id="projects" className="section-padding bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          Featured <span className="text-gradient">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-xl card-hover animate-slide-up"
            >
              {/* Project Image */}
              <div className="h-48 bg-linear-to-br from-primary to-secondary relative overflow-hidden">
                               {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                    {project.title.charAt(0)}
                  </div>
                )}

                {project.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-dark px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>

                {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.split(',').map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-700 text-primary text-sm rounded-full"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </a>
                  )}

                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

                {projects.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No projects available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;