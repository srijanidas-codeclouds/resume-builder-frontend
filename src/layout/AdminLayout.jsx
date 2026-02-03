import { Link, NavLink, Outlet } from "react-router";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const isAdmin = user?.role === "admin";
  const navClass = ({ isActive }) => 
    `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive 
        ? "glass-card border-purple-500/50 text-[var(--accent-color)] dark:text-white shadow-lg" 
        : "text-slate-500 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5"
    }`;

  return (
    // Replaced hardcoded bg with a generic class that respects your CSS :root/.dark settings
    <div className="flex min-h-screen bg-white dark:bg-[#141422] text-slate-900 dark:text-slate-200 transition-colors duration-500">
      
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] backdrop-blur-xl p-6 flex flex-col">
        <div className="mb-10 px-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-playfair tracking-tight">
            <span className="text-gradient">Admin</span>
          </h2>
          {/* Theme Toggle placed inside sidebar header for easy access */}
          <ThemeToggle />
        </div>

        <nav className="space-y-2 flex-1">
          <NavLink title="Overview" to="/admin" end className={navClass}>
            <span className="mr-3 text-lg opacity-70">
                <div className="material-symbols-outlined">
                    dashboard
                </div>
            </span>
            Dashboard
          </NavLink>
          
          <NavLink title="User Management" to="/admin/users" className={navClass}>
            <span className="mr-3 text-lg opacity-70">
                <div className="material-symbols-outlined">
                    group
                </div>
            </span>
            Users
          </NavLink>
          
          <NavLink title="Analytics" to="/admin/stats/summary" className={navClass}>
            <span className="mr-3 text-lg opacity-70">
                <div className="material-symbols-outlined">
                    bar_chart
                </div>
            </span>
            Stats
          </NavLink>
          {/* Admin Section - Now stays at the bottom of the nav list or scrolls with it */}
          {isAdmin && (
            <div className="mt-6 pt-4 border-t border-slate-200/40 dark:border-slate-700/40">
              <a
                href={`https://resume-builder-backend-b7er.onrender.com/blade-admin/login`}
                // href={`http://127.0.0.1:8000/blade-admin/login`}
                // target="_blank"
                // rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-amber-700 dark:text-amber-400 hover:bg-amber-100/40 dark:hover:bg-amber-400/10 transition-all"
              >
                <i className="fa fa-shield w-5 text-center"></i>
                <span className="font-medium">Super Admin</span>
              </a>
              <p className="mt-1 text-[10px] text-slate-500 px-3 uppercase tracking-wider">
                System Access
              </p>
            </div>
          )}
        </nav>

        {/* Profile Section */}
        <div className="mt-auto glass-card p-4 rounded-2xl border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
            <div className="text-xs">
              <p className="font-medium">Admin User</p>
              <p className="opacity-50 underline cursor-pointer hover:text-purple-500">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/"
              onClick={logout}
              className="w-full block text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Sign Out
            </Link>
          </div>
          <div className="mt-3 text-center text-xs text-slate-400">
            <p>
              Logged in as <span className="font-medium">{user?.role}</span>
            </p>
            <div className="mt-1">
              <p>
                <span className="font-medium">{user?.name}</span>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Background Gradients */}
        <div className="absolute inset-0 hero-gradient -z-10 opacity-40 dark:opacity-60" />
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 bg-white/10 dark:bg-white/[0.01]">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            System Status: <span className="text-green-500 font-bold">● Online</span>
          </div>
          {/* <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="input-glass text-sm w-64 focus:w-80 transition-all bg-white dark:bg-transparent"
            />
          </div> */}
        </header>

        {/* Content */}
        <section className="p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* The Outlet content will now use your .glow-text and .glass-card styles naturally */}
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;