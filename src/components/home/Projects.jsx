import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight, FiAlertCircle } from "react-icons/fi";

function Projects() {
  const projectsData = [
    {
      id: 1,
      title: "MedVisionRx Healthcare Platform",
      description:
        "A web-based healthcare platform designed to upload prescriptions, extract medicine details, provide multilingual explanations, and improve accessibility for users.",
      technologies: ["React", "FastAPI", "MongoDB", "OCR", "AI", "Translation APIs"],
      github: "https://github.com/ABHINAV559966",
      demo: "#",
      featured: true,
      image: "🏥",
    },
    {
      id: 2,
      title: "AI-Based Smart Portfolio Management",
      description:
        "A virtual investment portfolio platform that uses market data, AI-based prediction, risk analysis, and recommendation features to help users understand investment decisions.",
      technologies: ["React", "Spring Boot", "Python", "FastAPI", "MySQL", "ML"],
      github: "https://github.com/ABHINAV559966",
      demo: "#",
      featured: true,
      image: "📊",
    },
    {
      id: 3,
      title: "Smart Digital Goniometer",
      description:
        "An IoT-based digital angle measurement system using ESP32, BMI160 sensor, OLED display, and embedded programming.",
      technologies: ["ESP32", "BMI160", "Arduino IDE", "Embedded C/C++", "IoT"],
      github: "https://github.com/ABHINAV559966",
      demo: "#",
      featured: false,
      image: "⚙️",
    },
  ];

  // Example state for loading, empty, error (will be connected to Firebase in Phase 4)
  const isLoading = false;
  const hasError = false;
  const isEmpty = projectsData.length === 0;

  const SkeletonCard = () => (
    <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6 backdrop-blur">
      <div className="mb-4 h-40 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg animate-pulse" />
      <div className="h-6 bg-slate-700 rounded mb-3 animate-pulse" />
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-700 rounded animate-pulse w-full" />
        <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4" />
      </div>
      <div className="flex gap-2">
        <div className="h-8 bg-slate-700 rounded w-16 animate-pulse" />
        <div className="h-8 bg-slate-700 rounded w-16 animate-pulse" />
      </div>
    </div>
  );

  return (
    <section id="projects" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            My <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-gradient-to-r from-cyan-400 to-transparent" />
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {hasError && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-red-700/50 bg-red-900/10 p-8 text-center backdrop-blur"
          >
            <FiAlertCircle className="mx-auto mb-4 text-4xl text-red-400" />
            <h3 className="mb-2 text-xl font-bold text-white">
              Failed to load projects
            </h3>
            <p className="mb-4 text-slate-400">
              An error occurred while loading projects. Please try refreshing
              the page.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {isEmpty && !isLoading && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-slate-700 bg-slate-900/50 p-12 text-center backdrop-blur"
          >
            <p className="text-slate-400">No projects yet. Check back soon!</p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!isLoading && !hasError && !isEmpty && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-900/50 backdrop-blur transition hover:border-cyan-400/50 hover:bg-slate-900/70 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-400/5 to-transparent opacity-0 transition group-hover:opacity-100" />

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute right-4 top-4 z-10 rounded-lg bg-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-300 backdrop-blur">
                    Featured
                  </div>
                )}

                {/* Project Image Placeholder */}
                <div className="flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                  <span className="text-6xl">{project.image}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white transition group-hover:text-cyan-300">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block rounded-md bg-cyan-400/10 px-2 py-1 text-xs font-semibold text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-6 flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <FiGithub size={16} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      aria-label={`${project.title} live demo`}
                    >
                      <FiExternalLink size={16} />
                      Demo
                    </a>
                    <a
                      href={`/project/${project.id}`}
                      className="flex items-center gap-2 rounded-lg border border-cyan-400/50 px-3 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      aria-label={`${project.title} details`}
                    >
                      <FiArrowRight size={16} />
                      Details
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!isLoading && !hasError && !isEmpty && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a
              href="https://github.com/ABHINAV559966"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-400 px-6 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              View More on GitHub
              <FiArrowRight size={18} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Projects;
