import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiCode,
  FiFolder,
  FiFileText,
  FiAward,
  FiMail,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const managerCards = [
  {
    title: "Profile",
    description: "Update your name, bio, contact details, and profile image.",
    icon: FiUser,
    path: "/admin/profile",
  },
  {
    title: "Skills",
    description: "Add, edit, remove skills and change proficiency percentages.",
    icon: FiCode,
    path: "/admin/skills",
  },
  {
    title: "Projects",
    description: "Manage project details, technologies, GitHub links, and demo links.",
    icon: FiFolder,
    path: "/admin/projects",
  },
  {
    title: "Resume",
    description: "Update the resume title and permanent resume file link.",
    icon: FiFileText,
    path: "/admin/resume",
  },
  {
    title: "Certificates",
    description: "Add, edit, or remove certificates shown on your portfolio.",
    icon: FiAward,
    path: "/admin/certificates",
  },
  {
    title: "Messages",
    description: "View contact form messages submitted by portfolio visitors.",
    icon: FiMail,
    path: "/admin/messages",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#080d1b] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-slate-800 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Portfolio Manager
            </p>

            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-slate-400">
              Signed in as {user?.email || "Admin"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-100 transition hover:border-red-400 hover:text-red-300"
          >
            <FiLogOut />
            Logout
          </button>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {managerCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.path)}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-left transition hover:-translate-y-1 hover:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-3xl text-cyan-400">
                  <Icon />
                </div>

                <h2 className="mt-8 text-2xl font-bold">{card.title}</h2>

                <p className="mt-4 min-h-14 leading-7 text-slate-400">
                  {card.description}
                </p>

                <span className="mt-7 inline-flex items-center gap-2 font-bold text-cyan-400">
                  Manage <span>→</span>
                </span>
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default Dashboard;