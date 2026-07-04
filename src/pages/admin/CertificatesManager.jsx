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
import {
  FiArrowLeft,
  FiAward,
  FiEdit2,
  FiExternalLink,
  FiPlus,
  FiSave,
  FiTrash2,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { db } from "../../services/firebase";

const emptyForm = {
  title: "",
  issuer: "",
  issueDate: "",
  credentialUrl: "",
};

function CertificatesManager() {
  const [certificates, setCertificates] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "certificates"),
      (snapshot) => {
        setCertificates(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data(),
          }))
        );
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setMessage("Could not load certificates. Check Firebase rules.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.issuer.trim()) {
      setMessage("Certificate title and issuing organization are required.");
      return;
    }

    setSaving(true);
    setMessage("");

    const certificateData = {
      title: form.title.trim(),
      issuer: form.issuer.trim(),
      issueDate: form.issueDate,
      credentialUrl: form.credentialUrl.trim(),
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "certificates", editingId), certificateData);
        setMessage("Certificate updated successfully.");
      } else {
        await addDoc(collection(db, "certificates"), {
          ...certificateData,
          createdAt: serverTimestamp(),
        });
        setMessage("Certificate added successfully.");
      }

      resetForm();
    } catch (error) {
      console.error(error);
      setMessage("Could not save certificate. Check Firebase rules.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (certificate) => {
    setEditingId(certificate.id);
    setForm({
      title: certificate.title || "",
      issuer: certificate.issuer || "",
      issueDate: certificate.issueDate || "",
      credentialUrl: certificate.credentialUrl || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (certificateId) => {
    if (!window.confirm("Delete this certificate permanently?")) return;

    try {
      await deleteDoc(doc(db, "certificates", certificateId));
      setMessage("Certificate deleted successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Could not delete certificate.");
    }
  };

  return (
    <main className="min-h-screen bg-[#080d1b] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/admin"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-400"
        >
          <FiArrowLeft />
          Back to dashboard
        </Link>

        <header className="mb-8 border-b border-slate-800 pb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Portfolio Manager
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Certificates Manager
          </h1>
          <p className="mt-2 text-slate-400">
            Add, edit, or remove certificates shown on your portfolio.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-7">
          <h2 className="text-xl font-bold">
            {editingId ? "Edit Certificate" : "Add Certificate"}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-300">
                Certificate title *
              </span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Example: Python for Data Science"
                className="w-full rounded-xl border border-slate-700 bg-[#080d1b] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-300">
                Issuing organization *
              </span>
              <input
                name="issuer"
                value={form.issuer}
                onChange={handleChange}
                placeholder="Example: Coursera"
                className="w-full rounded-xl border border-slate-700 bg-[#080d1b] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-300">
                Issue date
              </span>
              <input
                type="date"
                name="issueDate"
                value={form.issueDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-[#080d1b] px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-300">
                Certificate PDF or credential link
              </span>
              <input
                type="url"
                name="credentialUrl"
                value={form.credentialUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-700 bg-[#080d1b] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </label>

            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
              >
                {editingId ? <FiSave /> : <FiPlus />}
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add Certificate"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {message && (
            <p className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
              {message}
            </p>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Your Certificates</h2>

          {loading ? (
            <p className="mt-5 text-slate-400">Loading certificates...</p>
          ) : certificates.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
              No certificates added yet.
            </div>
          ) : (
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate) => (
                <article
                  key={certificate.id}
                  className="flex min-h-64 flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl text-cyan-400">
                      <FiAward />
                    </div>

                    {certificate.credentialUrl && (
                      <a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-700 p-2 text-slate-300"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>

                  <h3 className="mt-5 text-xl font-bold">{certificate.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{certificate.issuer}</p>

                  {certificate.issueDate && (
                    <p className="mt-1 text-sm font-medium text-cyan-400">
                      Issued: {certificate.issueDate}
                    </p>
                  )}

                  <div className="mt-auto flex gap-3 border-t border-slate-800 pt-5">
                    <button
                      type="button"
                      onClick={() => handleEdit(certificate)}
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 px-3 py-2 text-sm font-semibold text-cyan-300"
                    >
                      <FiEdit2 />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(certificate.id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-400/40 px-3 py-2 text-sm font-semibold text-red-300"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default CertificatesManager;