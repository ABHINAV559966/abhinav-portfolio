import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiUser,
} from "react-icons/fi";
import { db } from "../../services/firebase";

const initialProfile = {
  name: "",
  role: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  portfolio: "",
  imageUrl: "",
};

function ProfileManager() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileRef = doc(db, "profile", "main");
        const profileSnapshot = await getDoc(profileRef);

        if (profileSnapshot.exists()) {
          setProfile({
            ...initialProfile,
            ...profileSnapshot.data(),
          });
        }
      } catch (loadError) {
        console.error(loadError);
        setError("Could not load profile details from Firebase.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      await setDoc(
        doc(db, "profile", "main"),
        {
          ...profile,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setMessage("Profile details saved successfully.");
    } catch (saveError) {
      console.error(saveError);
      setError("Could not save profile details. Check Firestore rules.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080d1b] text-cyan-400">
        <FiLoader className="animate-spin text-3xl" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080d1b] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-400"
        >
          <FiArrowLeft />
          Back to dashboard
        </button>

        <header className="mt-10 border-b border-slate-800 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Portfolio Manager
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Profile Manager
          </h1>

          <p className="mt-3 text-slate-400">
            Update the information displayed across your portfolio.
          </p>
        </header>

        <form
          onSubmit={handleSave}
          className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
        >
          {message && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              <FiCheckCircle />
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="mb-8 flex items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-cyan-400/10 text-2xl text-cyan-400">
              {profile.imageUrl ? (
                <img
                  src={profile.imageUrl}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiUser />
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold">Personal details</h2>
              <p className="mt-1 text-sm text-slate-400">
                Add your public professional information.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Full name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Abhinav Adabala"
              required
            />

            <Input
              label="Professional role"
              name="role"
              value={profile.role}
              onChange={handleChange}
              placeholder="AI & Data Science Student"
              required
            />

            <Input
              label="Email address"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="yourmail@gmail.com"
              icon={<FiMail />}
            />

            <Input
              label="Phone number"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              icon={<FiPhone />}
            />

            <Input
              label="Location"
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Chennai, India"
              icon={<FiMapPin />}
            />

            <Input
              label="Profile image URL"
              name="imageUrl"
              value={profile.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
            />

            <Input
              label="LinkedIn URL"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              icon={<FiLinkedin />}
            />

            <Input
              label="GitHub URL"
              name="github"
              value={profile.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
              icon={<FiGithub />}
            />

            <div className="sm:col-span-2">
              <Input
                label="Portfolio URL"
                name="portfolio"
                value={profile.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Professional bio
              </label>

              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows="5"
                placeholder="Write a short introduction about yourself..."
                className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <FiLoader className="animate-spin" /> : <FiSave />}
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-200"
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border border-slate-700 bg-slate-950 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
            icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

export default ProfileManager;