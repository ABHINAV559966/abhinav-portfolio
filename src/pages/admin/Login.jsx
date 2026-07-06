import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiLock, FiMail, FiLogIn } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, isAdmin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!loading && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);

      const destination = location.state?.from || "/admin";
      navigate(destination, { replace: true });
    } catch (loginError) {
      const message = loginError?.message || "";

      if (message.includes("authorized")) {
        setError("This account is not authorized to access the dashboard.");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080d1b] px-5 py-10 text-white">
      <section className="w-full max-w-md rounded-3xl border border-slate-700/80 bg-slate-900/80 p-7 shadow-2xl backdrop-blur sm:p-9">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-400">
            <FiLock />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Private Area
          </p>

          <h1 className="mt-2 text-3xl font-bold">Admin Login</h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sign in to manage your portfolio details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Email address
            </label>

            <div className="relative">
              <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-11 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Password
            </label>

            <div className="relative">
              <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-11 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiLogIn />
            {isSubmitting ? "Signing in..." : "Sign in to dashboard"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;