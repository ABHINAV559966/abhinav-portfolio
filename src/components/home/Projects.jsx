import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { db } from "../../services/firebase";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const projectList = snapshot.docs
          .map((item) => ({
            id: item.id,
            ...item.data(),
          }))
          .sort((a, b) => {
            const first = a.createdAt?.seconds || 0;
            const second = b.createdAt?.seconds || 0;
            return second - first;
          });

        setProjects(projectList);
        setLoading(false);
      },
      (error) => {
        console.error("Projects loading error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            My Work
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            A selection of projects I have built.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-slate-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-10 text-center">
            <h3 className="text-xl font-bold text-white">
              Projects will appear here soon
            </h3>
            <p className="mt-2 text-slate-400">
              Add projects from the admin dashboard.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-7 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                {project.featured && (
                  <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-300">
                    Featured
                  </span>
                )}

                <h3 className="mt-5 text-2xl font-bold text-white">
                  {project.title}
                </h3>

                <p className="mt-4 min-h-24 leading-7 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(project.technologies || []).map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                      <FiGithub />
                      Code
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                      <FiExternalLink />
                      Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;