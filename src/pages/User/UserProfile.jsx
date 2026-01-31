import React from "react";
import ProgressCard from "../../components/ProgressCard";

const UserProfile = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Profile Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Track your resume strength and profile completion.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition shadow-lg shadow-indigo-500/20 text-sm font-semibold">
          Update Resume
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Basic Info */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 sticky top-24">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff"
                  alt="Avatar"
                  className="w-24 h-24 rounded-2xl shadow-2xl shadow-indigo-500/20"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Alex Thompson
              </h2>
              <p className="text-sm text-indigo-500 font-medium mb-6">
                Senior Software Engineer
              </p>

              <div className="w-full space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Resume Score</span>
                  <span className="font-bold text-emerald-500">Expert</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Member Since</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Stats & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Row: Progress & Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <ProgressCard />
          </div>

          {/* Bottom Row: ATS Scores */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa fa-line-chart text-indigo-500"></i>
              ATS Score Analysis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Frontend Dev",
                  score: 92,
                  color: "from-blue-500 to-indigo-600",
                },
                {
                  name: "Fullstack Role",
                  score: 78,
                  color: "from-purple-500 to-pink-600",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-sm">{item.name}</span>
                    <span className="text-2xl font-black text-slate-700 dark:text-slate-300">
                      {item.score}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
