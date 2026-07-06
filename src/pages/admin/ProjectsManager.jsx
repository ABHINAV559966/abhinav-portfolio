import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { FiArrowLeft, FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";

const emptyProject = {
  title: "",
  description: "",
  technologies: "",
  githubUrl: "",
  demoUrl: "",
  featured: false,
};

function ProjectsManager() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

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
      },
      () => setMessage("Could not load projects. Check Firebase rules.")
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyProject);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!form.title.trim() || !form.description.trim() || !form.technologies.trim()) {
      setMessage("Please enter title, description, and technologies.");
      return;
    }

    const projectData = {
      title: form.title.trim(),
      description: form.description.trim(),
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      githubUrl: form.githubUrl.trim(),
      demoUrl: form.demoUrl.trim(),
      featured: form.featured,
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), projectData);
        setMessage("Project updated successfully.");
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: serverTimestamp(),
        });
        setMessage("Project added successfully.");
      }

      resetForm();
    } catch (error) {
      console.error(error);
      setMessage("Could not save project. Check Firebase rules.");
    }
  };

  const editProject = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies || "",
      githubUrl: project.githubUrl || "",
      demoUrl: project.demoUrl || "",
      featured: Boolean(project.featured),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProject = async (projectId) => {
    const confirmed = window.confirm("Delete this project permanently?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "projects", projectId));
      setMessage("Project deleted.");
    } catch {
      setMessage("Could not delete project.");
    }
  };

  return (
    <main className="min-h-screen bg-[#080d1b] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-cyan-400"
        >
          <FiArrowLeft />
          Back to dashboard
        </button>

        <header className="mt-10 border-b border-slate-800 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Portfolio Manager
          </p>
          <h1 className="mt-2 text-4xl font-bold">Projects Manager</h1>
          <p className="mt-3 text-slate-400">
            Add and manage the projects displayed on your portfolio.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">
              {editingId ? "Edit Project" : "Add Project"}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"
              >
                <FiX />
                Cancel edit
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-5">
            <Field
              label="Project title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Example: MedVisionRx Healthcare Platform"
              required
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Short description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Write 2–3 lines explaining what the project does..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <Field
              label="Technologies used"
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              placeholder="React, FastAPI, MongoDB"
              required
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="GitHub link (optional)"
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />

              <Field
                label="Live demo link (optional)"
                name="demoUrl"
                value={form.demoUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4 accent-cyan-400"
              />
              <span className="text-sm font-semibold text-slate-200">
                Show as featured project
              </span>
            </label>
          </div>

          {message && (
            <p className="mt-5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300"
          >
            <FiPlus />
            {editingId ? "Update Project" : "Add Project"}
          </button>
        </form>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Your Projects</h2>

          <div className="mt-5 grid gap-5">
            {projects.length === 0 ? (
              <p className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 text-slate-400">
                No projects added yet.
              </p>
            ) : (
              projects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        {project.featured && (
                          <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-300">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="mt-3 leading-7 text-slate-400">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {(project.technologies || []).map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-300"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => editProject(project)}
                        className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 px-3 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/10"
                      >
                        <FiEdit2 />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteProject(project.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-400/40 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/10"
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-200">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
      />
    </div>
  );
}

export default ProjectsManager;