import { useState } from "react";
import { NavLink, Outlet } from "react-router"; // Adjust path based on your setup
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard/my-resumes", icon: "fa-th-large" },
    { name: "Profile", path: "/dashboard/profile", icon: "fa-user" },
    { name: "Settings", path: "/dashboard/settings", icon: "fa-cog" },
    { name: "Billing", path: "/dashboard/billing", icon: "fa-credit-card" },
    { name: "Discover", path: "/dashboard/discover", icon: "fa-compass" },
  ];

  const isAdmin = user?.role === "admin";

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen hero-gradient text-slate-900 dark:text-slate-100">
      {/* ===== Top Bar ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          
          {/* Left Side: Logo Only */}
          <div className="flex items-center gap-2 font-semibold">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg text-white flex items-center justify-center bg-blue-600 dark:bg-linear-to-br dark:from-(--brand-indigo) dark:to-(--brand-purple)">
                <i className="fa fa-cube" aria-hidden="true"></i>
              </div>
              <span className="text-sm">Curriculum</span>
            </NavLink>
          </div>

          {/* Right Side: Theme Toggle + Hamburger (Mobile) */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Mobile Menu Toggle - Now on the right */}
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              <i className={`fa ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </header>

      {/* ===== Mobile Overlay ===== */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed top-24 left-6 z-40
          h-[calc(100vh-7rem)]
          w-64
          glass-card rounded-2xl p-4
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-[120%] opacity-0 lg:translate-x-0 lg:opacity-100"}
          lg:block
        `}
      >
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500">
             <i className="fa fa-user-circle text-2xl"></i>
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold truncate">
              {user?.name || user?.username || "User"}
            </p>
            <p className="text-xs text-slate-500 truncate">@{user?.username || 'guest'}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                ${isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                  : "text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-white/10"}
              `}
            >
              <i className={`fa ${item.icon} w-5 text-center`}></i>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ===== Page Content ===== */}
      <main
        className="
          relative z-10
          pt-24 pb-10
          px-4 sm:px-6 lg:px-8
          lg:pl-80
          transition-all duration-300
        "
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;