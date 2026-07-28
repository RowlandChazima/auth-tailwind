import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function Landing() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-slate-800 bg-slate-900/70 px-6 py-4 backdrop-blur">
          <Link to="/" className="text-lg font-semibold tracking-wide">
            SecureAuth
          </Link>
          <nav id="indexNav" className="flex gap-6 text-sm text-slate-300 items-center">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="transition hover:text-white">
                  Dashboard
                </Link>
                <button
                  id="logout"
                  onClick={logout}
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="transition hover:text-white">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
              Modern authentication, made simple
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Build trust with a polished auth experience.
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              Create an account, sign in securely, and manage users from one
              elegant dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Create account
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30">
            <h2 className="text-xl font-semibold">Why teams love it</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="font-semibold text-white">Fast onboarding</p>
                <p className="mt-2">
                  Collect account details with a streamlined form and clear
                  validation.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="font-semibold text-white">Insightful admin view</p>
                <p className="mt-2">
                  Monitor signups and track user activity from a polished
                  dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
