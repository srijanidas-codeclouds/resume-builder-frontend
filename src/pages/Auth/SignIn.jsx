import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../validation/auth.schema";
import google from "../../assets/google.png";
import ThemeToggle from "../../components/ThemeToggle";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { login, loading, user } = useAuth();

  useEffect(() => {
  if (!loading && user) {
    if (user.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/dashboard/my-resumes", { replace: true });
    }
  }
}, [user, loading, navigate]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data) => {
  try {
    const loggedInUser = await login({
      email: data.email,
      password: data.password,
    });

    toast.success("Logged in successfully.");
  } catch (error) {
    console.error(error.response?.data || "Login failed");
    toast.error(error.message || "Login failed");
  }
};


  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
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

      {/* Main */}
      <main className="grow flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-110">
          <div className="bg-white dark:bg-[#1a2131] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="h-2 bg-primary" />

            <div className="px-8 pt-10 pb-12">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold  dark:text-white text-gray-800">
                  Welcome back
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Please enter your details to sign in.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Email address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="e.g. alex@example.com"
                    className="form-input w-full h-12 rounded-lg px-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#242c3d]"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="form-input w-full h-12 rounded-lg px-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#242c3d]"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Utils */}
                <div className="flex items-center justify-between py-1">
                  <label className="flex items-center gap-2">
                    <input
                      {...register("remember")}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400 italic">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="/forgotpassword"
                    className="text-xs font-semibold text-blue-500 italic hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    w-full h-12 rounded-lg font-bold text-white transition
                    ${
                      loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 active:scale-[0.98]"
                    }
                  `}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
                {/* Divider */}
                <div className="relative flex items-center py-4">
                  <div className="grow border-t border-gray-200 dark:border-gray-800" />
                  <span className="mx-4 text-xs text-gray-400 uppercase">
                    Or continue with
                  </span>
                  <div className="grow border-t border-gray-200 dark:border-gray-800" />
                </div>

                <div></div>
                {/* Google button unchanged */}
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
              </form>
            </div>

            <div className="px-8 py-5 bg-gray-50 dark:bg-black/20 border-t text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?
                <a
                  href="/signup"
                  className="ml-1 font-bold text-primary text-blue-500 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">
        <p>&copy; 2026 Curriculum. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignIn;
