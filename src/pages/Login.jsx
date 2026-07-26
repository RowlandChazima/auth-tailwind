import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../api/auth";
import { trimFormValues } from "../utils/validation";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const data = trimFormValues(Object.fromEntries(formData));

    try {
      // Check that every required field has a value before sending anything to the server.
      if (!data.email || !data.password) {
        throw new Error("All fields are required.");
      }

      const resData = await loginUser(data);

      // Log the login message for debugging or confirmation purposes.
      console.log(resData.message);

      login();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30 lg:flex-row lg:gap-10 lg:p-12">
        <div className="max-w-md space-y-4 text-center lg:text-left">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Sign in to your account
          </h1>
          <p className="text-slate-300">
            Access your workspace and keep your authentication flow moving.
          </p>
        </div>
        <form
          id="loginForm"
          onSubmit={handleSubmit}
          className="mt-8 w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-6"
        >
          <p id="errorMessage" className="text-red-500">
            {errorMessage}
          </p>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none ring-0 transition focus:border-cyan-400"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-cyan-400"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-sm text-slate-400">
            New here?{" "}
            <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
