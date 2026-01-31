const ProfileSidebar = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <img
        src=""
        className="w-12 h-12 rounded-full border border-white/20"
      />
      <div>
        <p className="font-semibold">Md Reazul Karim</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          UI UX Designer
        </p>
      </div>
    </div>

    <nav className="space-y-2 text-sm">
      {["Dashboard", "Profile", "Messages", "Applied Jobs", "Discover"].map(item => (
        <button
          key={item}
          className="w-full text-left px-3 py-2 rounded-xl
                     hover:bg-white/30 dark:hover:bg-white/10
                     transition"
        >
          {item}
        </button>
      ))}
    </nav>
  </div>
)

export default ProfileSidebar