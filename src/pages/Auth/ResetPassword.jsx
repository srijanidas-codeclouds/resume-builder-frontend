import React from "react";
import ThemeToggle from "../../components/ThemeToggle";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] bg-white dark:bg-[#1a2130] rounded-xl border border-[#e7ebf3] dark:border-white/5 shadow-sm p-8 md:p-10">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-[28px] md:text-[32px] font-bold text-[#0d121b] dark:text-white pb-3">
              Set new password
            </h1>
            <p className="text-sm text-[#4c669a] dark:text-gray-400">
              Your new password must be different from previous passwords.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-6">
            {/* New password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#0d121b] dark:text-gray-200">
                New password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#141826] px-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
              />

              {/* Strength indicator */}
              <div className="flex gap-1 h-1 mt-1">
                <div className="flex-1 rounded-full bg-primary" />
                <div className="flex-1 rounded-full bg-primary" />
                <div className="flex-1 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="flex-1 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#0d121b] dark:text-gray-200">
                Confirm new password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#141826] px-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Password rules */}
            <div className="rounded-lg border border-[#e7ebf3] dark:border-white/5 bg-background-light dark:bg-background-dark/60 p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-green-500">
                ✓ <span className="text-[#0d121b] dark:text-gray-300">At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2 text-green-500">
                ✓ <span className="text-[#0d121b] dark:text-gray-300">One number (0–9)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                ○ <span>One special character</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-4 w-full h-12 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition active:scale-[0.98] bg-blue-500 hover:bg-blue-600"
            >
              Update password
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-8 pt-6 border-t border-[#e7ebf3] dark:border-white/10 flex justify-center">
            <a
              href="/signin"
              className="text-sm text-[#4c669a] dark:text-gray-400 hover:text-primary transition"
            >
              ← Back to login
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
