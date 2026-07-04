import {
  FiAward,
  FiCode,
  FiFileText,
  FiFolder,
  FiLogOut,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  const cards = [
    {
      title: "Profile",
      description: "Update your name, bio, contact details, and profile image.",
      icon: <FiUser />,
      path: "/admin/profile",
    },
    {
      title: "Skills",
      description: "Add, edit, remove skills and change proficiency percentages.",
      icon: <FiCode />,
      path: "/admin/skills",
    },
    {
      title: "Projects",
      description: "Add, edit, or remove portfolio projects and links.",
      icon: <FiFolder />,
      path: "/admin/projects",
    },
    {
      title: "Resume",
      description: "Update your resume title and resume file link.",
      icon: <FiFileText />,
      path: "/admin/resume",
    },
    {
      title: "Certificates",
      description: "Add, edit, or remove certificates shown on your portfolio.",
      icon: <FiAward />,
      path: "/admin/certificates",
    },
    {
      title: "Messages",
      description: "View messages submitted through your contact form.",
      icon: <FiMail />,
      path: "/admin/messages",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080d1b] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-5 border-b border-slate-800 pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Portfolio Manager
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Signed in as {user?.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 font-medium text-slate-200 transition hover:border-red-400/60 hover:bg-red-500/10 hover:text-red-300"
          >
            <FiLogOut />
            Logout
          </button>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <button
              key={card.title}
              type="button"
              onClick={() => navigate(card.path)}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-left transition hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl text-cyan-400">
                {card.icon}
              </div>

              <h2 className="mt-5 text-xl font-bold text-white">
                {card.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {card.description}
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-cyan-400">
                Manage →
              </span>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Dashboard;