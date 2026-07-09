import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { getProjects, Project } from '../services/projectService';
import { SectionHeader } from './ui/SectionHeader';
import { ExternalLink } from 'lucide-react';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 px-6 md:px-12 bg-transparent">
        <div className="max-w-6xl mx-auto w-full">
          <div className="h-12 w-64 bg-muted rounded animate-pulse mb-16"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[1, 2].map((i) => (
              <div key={i} className="h-[400px] bg-muted rounded-none animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  // Animation configuration
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section id="projects" className="pb-12 md:pb-16 pt-2 md:pt-4 px-4 sm:px-6 md:px-12 bg-transparent relative z-10 overflow-hidden -mt-6 md:-mt-10">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="max-w-6xl mx-auto w-full"
      >
        <div className="mb-8">
          <SectionHeader subtitle="Portfolio" title="Projects" />
          <p className="text-lg text-muted-foreground max-w-2xl text-justify mb-12 leading-relaxed">
            A collection of projects that best represent my ability to design, develop and deliver complete software solutions using modern technologies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} isExploration={false} />
            ))}
          </div>
        </div>

        {/* Section 2: Other Explorations */}
        {otherProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl text-foreground font-serif mb-6">Other Explorations</h2>
            <p className="text-lg text-muted-foreground max-w-3xl text-justify mb-12 leading-relaxed">
              Beyond my major projects, I enjoy experimenting with different technologies and building applications that strengthen my skills across multiple areas of software development.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard key={project._id} project={project} isExploration={true} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

// Reusable 3D Flip Card Component
const ProjectCard = ({ project, isExploration }: { project: Project, isExploration: boolean }) => {
  // Safe compact sizing: featured uses 16:9 cinematic, explorations use a slightly taller proportion (aspect-[4/3] or square on small screens) to guarantee text fits
  const cardHeight = isExploration ? 'h-[300px] sm:aspect-[4/3] w-full' : 'aspect-video w-full min-h-[250px]';

  return (
    <div className={`group relative w-full ${cardHeight} rounded-none perspective`}>
      {/* Inner container for 3D flip */}
      <div className="w-full h-full relative preserve-3d transition-transform duration-[700ms] ease-flip group-hover:rotate-y-180 rounded-none shadow-soft group-hover:shadow-card group-hover:-translate-y-2 group-hover:scale-[1.03]">
        
        {/* FRONT FACE */}
        <div className="absolute inset-0 backface-hidden w-full h-full rounded-none overflow-hidden bg-white border border-border flex flex-col">
          <div className="flex-1 w-full relative overflow-hidden bg-muted/10 p-4 md:p-6 flex items-center justify-center">
            <img 
              src={project.coverImageUrl} 
              alt={project.title} 
              className="w-full h-full object-contain transition-transform duration-[700ms] ease-flip group-hover:scale-[1.05]"
            />
          </div>
          <div className="shrink-0 flex flex-col justify-center bg-white p-4 md:p-5 border-t border-border">
            <h3 className={`${isExploration ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} font-bold mb-1 text-foreground`}>{project.title}</h3>
            <p className="text-muted-foreground text-[11px] md:text-sm font-medium line-clamp-1">
              {project.techStack.join(' • ')}
            </p>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 backface-hidden w-full h-full rounded-none bg-white border border-border flex flex-col rotate-y-180 overflow-y-auto custom-scrollbar p-4 md:p-5">
          <div className="flex-1 flex flex-col">
            <h3 className={`${isExploration ? 'text-base mb-1' : 'text-lg md:text-xl mb-2'} font-medium text-foreground leading-tight`}>{project.title}</h3>
            
            <p className={`text-muted-foreground text-justify ${isExploration ? 'text-[11px] leading-tight' : 'text-xs md:text-sm leading-snug'} mb-1`}>
              {project.description}
            </p>
            
            {/* Tech Stack - Fully visible on all screens */}
            <div className="mt-2 mb-2">
              <h4 className="text-[10px] md:text-xs font-semibold text-foreground mb-1 uppercase tracking-wider">Tech Stack</h4>
              <div className="flex flex-wrap gap-1 md:gap-1.5">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="px-1.5 md:px-2 py-0.5 bg-muted text-foreground rounded-none text-[9px] md:text-[10px] font-medium whitespace-nowrap">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-auto pt-2 border-t border-border/50 flex flex-row justify-end gap-3 md:gap-4 shrink-0">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-foreground hover:text-accent transition-colors flex items-center justify-center p-1" title="View Source">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {project.liveDemoUrl && (
              <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="text-accent hover:text-accent/80 transition-colors flex items-center justify-center p-1" title="Live Demo">
                <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
