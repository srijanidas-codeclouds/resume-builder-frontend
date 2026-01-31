const UserViewModal = ({ user, onClose }) => {
  if (!user) return null;

  // Laravel withCount() returns the value in {relation}_count
  const resumeCount = user.resumes_count ?? 0;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
        
        {/* Profile Header */}
        <div className="relative h-32 bg-[#135bec]">
          <div className="absolute -bottom-12 left-8 p-1 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
            <div className="size-24 rounded-xl bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center text-3xl font-black text-[#135bec]">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="h-full w-full object-cover rounded-lg" />
              ) : (
                user.name?.charAt(0).toUpperCase()
              )}
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="pt-16 p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {user.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">mail</span>
                {user.email}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              user.status === 'active' 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              {user.status}
            </span>
          </div>

          {/* SaaS Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Functional Resume Count */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-[#135bec] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-[#135bec] text-lg">description</span>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Total Resumes</p>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                {resumeCount}
              </p>
            </div>

            {/* Plan Info */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-purple-500 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-purple-500 text-lg">workspace_premium</span>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Plan Type</p>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white capitalize">
                {user.membership || 'Free'}
              </p>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-6 space-y-3">
             <div className="flex justify-between text-xs border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-400 font-bold uppercase">Username</span>
                <span className="text-slate-900 dark:text-white font-mono">@{user.username}</span>
             </div>
             <div className="flex justify-between text-xs border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-400 font-bold uppercase">Member Since</span>
                <span className="text-slate-900 dark:text-white">
                  {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
             </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-4">
            <button className="flex-1 bg-[#135bec] text-white py-3.5 rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
              Email User
            </button>
            <button className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
               <span className="material-symbols-outlined text-slate-400">more_horiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewModal;