import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  FiArrowLeft,
  FiCode,
  FiEdit2,
  FiPlus,
  FiSave,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";

const categories = [
  "Programming",
  "Web Development",
  "Database",
  "Data & Analytics",
  "Tools & Platforms",
  "Other",
];

const emptyForm = {
  name: "",
  category: "Programming",
  percentage: 70,
};

function SkillsManager() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const skillsQuery = query(
      collection(db, "skills"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      skillsQuery,
      (snapshot) => {
        const skillList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setSkills(skillList);
        setLoading(false);
      },
      (snapshotError) => {
        console.error(snapshotError);
        setError("Unable to load skills. Check Firestore rules and refresh.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: name === "percentage" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const skillName = form.name.trim();

    if (!skillName) {
      setError("Please enter a skill name.");
      return;
    }

    if (form.percentage < 0 || form.percentage > 100) {
      setError("Percentage must be between 0 and 100.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const skillData = {
        name: skillName,
        category: form.category,
        percentage: Number(form.percentage),
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        await updateDoc(doc(db, "skills", editingId), skillData);
        setMessage(`${skillName} updated successfully.`);
      } else {
        await addDoc(collection(db, "skills"), {
          ...skillData,
          createdAt: new Date().toISOString(),
        });
        setMessage(`${skillName} added successfully.`);
      }

      resetForm();
    } catch (saveError) {
      console.error(saveError);
      setError("Could not save the skill. Check Firestore rules.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setForm({
      name: skill.name || "",
      category: skill.category || "Programming",
      percentage: Number(skill.percentage || 0),
    });

    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (skill) => {
    const shouldDelete = window.confirm(
      `Delete "${skill.name}" from your skills list?`
    );

    if (!shouldDelete) return;

    try {
      setError("");
      setMessage("");

      await deleteDoc(doc(db, "skills", skill.id));
      setMessage(`${skill.name} deleted successfully.`);
    } catch (deleteError) {
      console.error(deleteError);
      setError("Could not delete the skill. Check Firestore rules.");
    }
  };

  const groupedSkills = categories.reduce((result, category) => {
    result[category] = skills.filter((skill) => skill.category === category);
    return result;
  }, {});

  return (
    <main className="min-h-screen bg-[#080d1b] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
            >
              <FiArrowLeft />
              Back to dashboard
            </button>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Portfolio Manager
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Manage Skills
            </h1>

            <p className="mt-2 text-slate-400">
              Add, edit, or remove the skills shown in your portfolio.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-center">
            <p className="text-2xl font-bold text-cyan-400">{skills.length}</p>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Total Skills
            </p>
          </div>
        </header>

        <section className="grid gap-7 lg:grid-cols-[420px_1fr]">
          <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Skill" : "Add New Skill"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {editingId
                    ? "Update the selected skill."
                    : "Add a skill to your portfolio."}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-xl text-cyan-400">
                {editingId ? <FiEdit2 /> : <FiPlus />}
              </div>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="skill-name"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Skill name
                </label>

                <input
                  id="skill-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Example: Python"
                  className="w-full rounded-xl border border-slate-700 bg-[#080d1b] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div>
                <label
                  htmlFor="skill-category"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Category
                </label>

                <select
                  id="skill-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#080d1b] px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="skill-percentage"
                    className="text-sm font-semibold text-slate-200"
                  >
                    Proficiency percentage
                  </label>

                  <span className="font-bold text-cyan-400">
                    {form.percentage}%
                  </span>
                </div>

                <input
                  id="skill-percentage"
                  type="range"
                  name="percentage"
                  min="0"
                  max="100"
                  step="5"
                  value={form.percentage}
                  onChange={handleChange}
                  className="h-2 w-full cursor-pointer accent-cyan-400"
                />

                <input
                  type="number"
                  name="percentage"
                  min="0"
                  max="100"
                  value={form.percentage}
                  onChange={handleChange}
                  className="mt-4 w-full rounded-xl border border-slate-700 bg-[#080d1b] px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-[#080d1b] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiSave />
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Skill"
                    : "Add Skill"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
                  >
                    <FiX />
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <section className="space-y-6">
            {loading ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-400">
                Loading your skills...
              </div>
            ) : skills.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center">
                <FiCode className="mx-auto text-4xl text-cyan-400" />
                <h2 className="mt-4 text-xl font-bold">No skills added yet</h2>
                <p className="mt-2 text-slate-400">
                  Use the form to add your first portfolio skill.
                </p>
              </div>
            ) : (
              categories.map((category) => {
                const categorySkills = groupedSkills[category];

                if (!categorySkills?.length) return null;

                return (
                  <div
                    key={category}
                    className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"
                  >
                    <h2 className="mb-4 text-lg font-bold text-cyan-400">
                      {category}
                    </h2>

                    <div className="space-y-3">
                      {categorySkills.map((skill) => (
                        <article
                          key={skill.id}
                          className="rounded-xl border border-slate-800 bg-[#080d1b] p-4"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-3">
                                <h3 className="truncate text-lg font-bold">
                                  {skill.name}
                                </h3>
                                <span className="font-bold text-cyan-400">
                                  {skill.percentage}%
                                </span>
                              </div>

                              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300"
                                  style={{
                                    width: `${Math.min(
                                      Math.max(Number(skill.percentage) || 0, 0),
                                      100
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleEdit(skill)}
                                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
                              >
                                <FiEdit2 />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(skill)}
                                className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                              >
                                <FiTrash2 />
                                Delete
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </section>
        </section>
      </div>
    </main>
  );
}

export default SkillsManager;