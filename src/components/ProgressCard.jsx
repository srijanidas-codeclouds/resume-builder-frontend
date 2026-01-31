const ProgressCard = () => (
  <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 h-full">
    <h3 className="font-semibold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
      <i className="fa fa-tasks text-indigo-500"></i> Profile Completion
    </h3>

    <div className="flex flex-col sm:flex-row items-center gap-8">
      {/* Circular Progress */}
      <div className="relative flex-shrink-0">
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center transition-transform hover:scale-105 duration-500"
          style={{
            background: "conic-gradient(#4F46E5 70%, rgba(148, 163, 184, 0.1) 0)"
          }}
        >
          <div className="absolute inset-3 rounded-full bg-white dark:bg-slate-900 shadow-inner flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">70%</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Done</span>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <ul className="text-sm space-y-2 flex-grow w-full">
        {["PersonalInfo", "Skills", "Education", "Project", "Certifications", "Experience", "Languages"].map((item) => (
          <li key={item} className="flex justify-between items-center group">
            <span className="text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">
              {item}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">9/10</span>
              <i className="fa fa-check-circle text-emerald-500 opacity-70"></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ProgressCard;