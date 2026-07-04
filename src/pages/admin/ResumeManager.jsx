import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FiArrowLeft, FiFileText, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";

function ResumeManager() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Download Resume");
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      try {
        const snapshot = await getDoc(doc(db, "resume", "main"));

        if (snapshot.exists()) {
          setTitle(snapshot.data().title || "Download Resume");
          setResumeUrl(snapshot.data().resumeUrl || "");
        }
      } catch {
        setMessage("Could not load resume details.");
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await setDoc(doc(db, "resume", "main"), {
        title: title.trim(),
        resumeUrl: resumeUrl.trim(),
        updatedAt: new Date().toISOString(),
      });

      setMessage("Resume details saved successfully.");
    } catch {
      setMessage("Could not save resume details. Check Firebase rules.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080d1b] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-cyan-400"
        >
          <FiArrowLeft />
          Back to dashboard
        </button>

        <div className="mt-10 border-b border-slate-800 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Portfolio Manager
          </p>
          <h1 className="mt-2 text-4xl font-bold">Resume Manager</h1>
          <p className="mt-3 text-slate-400">
            Update the resume button label and the public PDF link.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3 text-cyan-400">
            <FiFileText className="text-2xl" />
            <h2 className="text-xl font-bold text-white">Resume Details</h2>
          </div>

          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Button title
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Download Resume"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <label className="mb-2 mt-5 block text-sm font-semibold text-slate-200">
            Resume PDF URL
          </label>
          <input
            type="url"
            value={resumeUrl}
            onChange={(event) => setResumeUrl(event.target.value)}
            placeholder="https://drive.google.com/... or /resume.pdf"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          {message && (
            <p className="mt-5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving || loading}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
          >
            <FiSave />
            {saving ? "Saving..." : "Save Resume"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default ResumeManager;