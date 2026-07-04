import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FiArrowLeft, FiSave, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";

const emptyProfile = {
  name: "Abhinav",
  headline: "Aspiring Software Developer",
  bio: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",
  imageUrl: "",
};

function ProfileManager() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileRef = doc(db, "profile", "main");
        const snapshot = await getDoc(profileRef);

        if (snapshot.exists()) {
          setProfile({ ...emptyProfile, ...snapshot.data() });
        }
      } catch {
        setMessage("Could not load profile details.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await setDoc(doc(db, "profile", "main"), {
        ...profile,
        updatedAt: new Date().toISOString(),
      });

      setMessage("Profile saved successfully.");
    } catch {
      setMessage("Could not save profile. Check Firebase rules.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080d1b] p-10 text-white">
        Loading profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080d1b] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
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
          <h1 className="mt-2 text-4xl font-bold">Profile Manager</h1>
          <p className="mt-3 text-slate-400">
            Update the personal information shown on your portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3 text-cyan-400">
            <FiUser className="text-2xl" />
            <h2 className="text-xl font-bold text-white">Public Profile Details</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" value={profile.name} onChange={handleChange} />
            <Field label="Headline" name="headline" value={profile.headline} onChange={handleChange} />
            <Field label="Email" name="email" type="email" value={profile.email} onChange={handleChange} />
            <Field label="Phone" name="phone" value={profile.phone} onChange={handleChange} />
            <Field label="Location" name="location" value={profile.location} onChange={handleChange} />
            <Field label="Profile image URL" name="imageUrl" value={profile.imageUrl} onChange={handleChange} />
            <Field label="GitHub URL" name="github" value={profile.github} onChange={handleChange} />
            <Field label="LinkedIn URL" name="linkedin" value={profile.linkedin} onChange={handleChange} />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              About / Bio
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="5"
              placeholder="Write a short professional introduction..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {message && (
            <p className="mt-5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
          >
            <FiSave />
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-200">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
      />
    </div>
  );
}

export default ProfileManager;