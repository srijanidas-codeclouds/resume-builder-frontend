import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Templates", href: "#templates" },
  { name: "Pricing", href: "#pricing" },
];

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef(null);

  /* =========================
     Sticky shadow on scroll
  ========================== */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =========================
     Click outside dropdown
  ========================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================
     Close dropdown on logout
  ========================== */
  useEffect(() => {
    if (!isAuthenticated) {
      setProfileOpen(false);
      setMobileMenuOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <header
      className={`
        sticky top-0 z-50 transition-shadow
        bg-white dark:bg-[#050508]
        border-b border-slate-200 dark:border-white/10
        ${scrolled ? "shadow-md dark:shadow-black/30" : ""}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600 text-white">
            <i className="fa fa-cube" />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-sm text-slate-600 dark:text-slate-300">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-slate-900 dark:hover:text-white transition"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4 ">
          <div className="cursor-pointer">
            <ThemeToggle />
          </div>
          

          {!isAuthenticated ? (
            <>
              <Link
                to="/signin"
                className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg text-sm font-medium text-white
                  bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center"
              >
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  className="h-9 w-9 rounded-full border cursor-pointer"
                />
              </button>

              {profileOpen && (
                <div className="
                  absolute right-0 mt-2 w-48 rounded-xl border
                  border-slate-200 dark:border-slate-700
                  bg-white dark:bg-slate-900 shadow-lg
                ">
                  <div className="px-4 py-3 border-b dark:border-slate-700">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>

                  <Link
                    to="/dashboard/my-resumes"
                    className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/dashboard/settings"
                    className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Settings
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 text-slate-700 dark:text-slate-200 cursor-pointer"
        >
          <i className="fa fa-bars text-lg" />
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 h-full w-72 p-6 bg-white dark:bg-slate-900 shadow-xl">
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Menu</span>
              <button className="cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa fa-times" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {isAuthenticated ? (
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-bold">{user.name}</p>
                  <button
                    onClick={logout}
                    className="text-xs text-red-500 cursor-pointer hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/signin" className="btn-primary">
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}

            <div className="mt-8 border-t pt-4 cursor-pointer">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
