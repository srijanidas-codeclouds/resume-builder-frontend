import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../validation/auth.schema";
import google from "../../assets/google.png";
import ThemeToggle from "../../components/ThemeToggle";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { register: signUp, loading } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/dashboard/my-resumes");
  }, [user]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const getPasswordStrength = () => {
    let score = 0;
    if (!password) return 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getPasswordStrength();

  const onSubmit = async (data) => {
    try {
      await signUp({
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        terms: data.terms,
      });
      toast.success("Account created. Please sign in.");
      navigate("/signin", { replace: true });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="relative bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      {/* LOGO */}
      <div className="flex items-center gap-2 font-semibold p-4">
        <div
          className="
            w-8 h-8 rounded-lg text-white flex items-center justify-center
            bg-blue-600
            dark:bg-linear-to-br
            dark:from-(--brand-indigo)
            dark:to-(--brand-purple)
          "
        >
          <Link to="/">
            <i className="fa fa-cube" aria-hidden="true"></i>
          </Link>
          <span className="text-sm dark:text-slate-200"></span>
        </div>
        <span className="text-sm dark:text-slate-200"></span>
      </div>
      {/* Header stays unchanged */}
      <div className="absolute top-2 right-2 z-50">
        <ThemeToggle />
      </div>
      <main className="flex   items-center justify-center px-4 py-12">
        <div className="w-full max-w-120 rounded-xl bg-white dark:bg-[#1a2131] p-8 shadow-xl border border-gray-100 dark:border-gray-800">
          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-[24px] font-bold text-gray-900 dark:text-white leading-tight">
              Create your account
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Join thousands of professionals building their future.
            </p>
          </div>

          {/* Google signup */}
          <div className="flex gap-3">
            <button
              type="button"
              className="flex w-1/2 items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <img src={google} alt="Google" className="h-5 w-5" />
              Google
            </button>
            <button
              type="button"
              className="flex w-1/2 items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-transparent py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <i className="fa-brands fa-linkedin fa-xl"></i>
              LinkedIn
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-2">
            <div className="relative flex items-center py-4">
              <div className="grow border-t border-gray-300 dark:border-gray-700" />
              <span className="mx-4 text-xs text-gray-400 uppercase">
                Or continue with email
              </span>
              <div className="grow border-t border-gray-300 dark:border-gray-700" />
            </div>
          </div>

          {/* Form */}
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                placeholder="e.g. johndoe01"
                className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#141826] px-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Full name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="e.g. John Doe"
                className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#141826] px-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="name@company.com"
                className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#141826] px-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Min. 8 characters"
                className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#141826] px-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}

              {/* Strength bars */}
              <div className="mt-3 space-y-2">
                <div className="flex gap-2 h-1">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${
                        i <= strength
                          ? "bg-green-500"
                          : "bg-gray-200 dark:bg-gray-800"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-gray-500">
                  Password strength:{" "}
                  {strength <= 2 ? "Weak" : strength <= 4 ? "Medium" : "Strong"}
                </p>
              </div>
            </div>

            {/* Confirm Password (no UI change required) */}
            {/* <input type="hidden" {...register("password_confirmation")} /> */}

            {/* Terms */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  {...register("terms")}
                  id="terms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              {errors.terms && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`
                  mt-4 w-full h-12 rounded-lg font-bold text-white
                  transition active:scale-[0.98]
                  ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }
                `}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-2 border-t border-gray-100 dark:border-gray-800 pt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <a
                href="/signin"
                className="ml-1 font-semibold text-primary hover:underline text-blue-600 dark:text-blue-500"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2026 Curriculum. All rights reserved.
      </footer>
    </div>
  );
};

export default Signup;
