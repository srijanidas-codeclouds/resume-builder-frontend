import React from "react";
import ThemeToggle from "../../components/ThemeToggle";

const ForgotPassword = () => {
  return (
    <div className="relative bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">

      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      {/* <header className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#050508] px-10 py-3">
        <div className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white
                          bg-blue-600
                          dark:bg-gradient-to-br
                          dark:from-indigo-500
                          dark:to-purple-600">
            <i className="fa fa-cube" aria-hidden="true"></i>
          </div>
          <span className="text-sm text-slate-900 dark:text-slate-200">
            Curriculum
          </span>
        </div>
      </header> */}

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl flex flex-col items-center">

          {/* Card */}
          <div className="w-full rounded-xl bg-white dark:bg-[#1a2131] border border-slate-200 dark:border-white/5 p-8 md:p-10 shadow-sm">

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center pb-3">
              Forgot your password?
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-center pb-8">
              Enter the email associated with your account and we’ll send you a secure reset link.
            </p>

            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#141826] px-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="h-12 rounded-lg bg-primary text-white font-bold bg-blue-500 hover:bg-blue-700 transition"
              >
                Send reset link
              </button>
            </form>

            <div className="mt-8 flex justify-center">
              <a
                href="/signin"
                className="text-primary text-sm font-semibold hover:underline"
              >
                ← Back to login
              </a>
            </div>
          </div>

          {/* Footer */}
          <footer className="py-6 text-sm text-slate-500 dark:text-slate-400">
            © 2026 Curriculum. All rights reserved.
          </footer>

        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
