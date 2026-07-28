import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api-handler/auth.js";
import { emailRegex, phoneRegex, trimFormValues } from "../utils/validation.js";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const data = trimFormValues(Object.fromEntries(formData));

    try {
      // Check that every required field has a value before sending anything to the server.
      if (
        !data.firstName ||
        !data.lastName ||
        !data.username ||
        !data.email ||
        !data.phone ||
        !data.dob ||
        !data.gender ||
        !data.password ||
        !data.confirmPassword
      ) {
        throw new Error("All fields are required.");
      }

      // Validate the phone number using the regular expression.
      if (!phoneRegex.test(data.phone)) {
        throw new Error("Please enter a valid phone number.");
      }

      // Validate the email format before submitting the request.
      if (!emailRegex.test(data.email)) {
        throw new Error("Please enter a valid email address.");
      }

      // Confirm that both password fields match exactly.
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const resData = await registerUser(data);

      // Log the created user data for debugging or confirmation purposes.
      console.log(resData.user);

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30 lg:p-12">
        <div className="mb-8 text-center lg:text-left">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            Create account
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Start your secure journey
          </h1>
          <p className="mt-3 text-slate-300">
            Join the platform by filling out the details below.
          </p>
        </div>

        <p id="errorMessage" className="text-red-500">
          {errorMessage}
        </p>
        <form id="registrationForm" onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-200">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-slate-200">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-200">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="dob" className="mb-2 block text-sm font-medium text-slate-200">
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>
          <div>
            <label htmlFor="gender" className="mb-2 block text-sm font-medium text-slate-200">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
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
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-200">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              {isSubmitting ? "Registering..." : "Create account"}
            </button>
            <p className="text-sm text-slate-400">
              Already a member?{" "}
              <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
