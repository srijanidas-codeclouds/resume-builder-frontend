import React from "react";

const Footer = () => {
  return (
    <footer className="py-20 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#050508]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {/* BRAND */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 font-semibold">
                <div
                  className="
                    w-8 h-8 rounded-lg text-white flex items-center justify-center
                    bg-blue-600
                    dark:bg-gradient-to-br
                    dark:from-[var(--brand-indigo)]
                    dark:to-[var(--brand-purple)]
                  "
                >
                  <i className="fa fa-cube" aria-hidden="true"></i>
                </div>
                <span className="text-sm dark:text-slate-200"></span>
              </div>

              <span className="text-md font-black tracking-tighter text-slate-900 dark:text-white uppercase ">
                Curriculum
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8 font-medium">
              Elevating professional identity through the intersection of
              design, technology, and career strategy.
            </p>

            <div className="flex gap-4">
              {["language", "camera", "alternate_email"].map(icon => (
                <a
                  key={icon}
                  href="#"
                  className="
                    size-10 rounded-full flex items-center justify-center
                    border border-slate-200 dark:border-white/10
                    text-slate-500 dark:text-slate-400
                    hover:text-indigo-500 dark:hover:text-white
                    transition-all
                  "
                >
                  <span className="material-symbols-outlined text-xl">
                    {icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          {[
            {
              title: "Product",
              links: ["Visual Systems", "AI Architect", "Premium Paper", "Pricing"],
            },
            {
              title: "Manifesto",
              links: ["The Gallery", "Design Standards", "Journal", "Advisory"],
            },
          ].map(section => (
            <div key={section.title}>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm font-semibold">
                {section.links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-indigo-500 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            © 2026 <span className="text-slate-900 dark:text-white">Curriculum</span> — All rights reserved
          </p>

          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            {["Terms", "Privacy", "Cookies"].map(item => (
              <a
                key={item}
                href="#"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
