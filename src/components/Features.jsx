import React, { useState } from "react";

const Features = ({ id }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How does the AI optimize my resume?",
      a: "Our AI analyzes industry-specific keywords and parses your experience to match ATS (Applicant Tracking System) algorithms while maintaining a human-readable flow."
    },
    {
      q: "Can I export to different formats?",
      a: "Yes, you can export your resume as a high-quality PDF, Word document, or even a live web link for recruiters."
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. We use bank-level encryption and never share your personal information or resume data with third parties without your consent."
    }
  ];

  return (
    <section
      id={id}
      className="py-16 md:py-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-black dark:via-black dark:to-slate-950"
    >
      {/* TEXT CONTAINER */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <h2 className="serif-heading text-4xl md:text-5xl xl:text-6xl text-slate-900 dark:text-white mb-6">
            Everything <span className="italic font-playfair">you</span> need to get <span className="italic font-playfair">noticed</span>.
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base md:text-lg xl:text-xl max-w-2xl mx-auto">
            Our tools are designed to make the resume building process as simple and effective as possible.
          </p>
        </div>
      </div>

      {/* BENTO GRID */}
      <div className="mt-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
            
            {/* LARGE CARD: AI INTELLIGENCE */}
            <div className="sm:col-span-2 lg:col-span-8 glass-card p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all border border-slate-200 dark:border-white/10 rounded-3xl">
              <div className="relative z-10">
                <div className="size-12 sm:size-14 rounded-2xl flex items-center justify-center mb-6 border bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl">auto_fix_high</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">AI Resume Intelligence</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm text-base sm:text-lg leading-relaxed">
                  Our AI transforms your experience into clear, persuasive language that works seamlessly with ATS systems.
                </p>
              </div>
              
              <div className="absolute right-[-10%] bottom-[-10%] w-1/2 opacity-10 dark:opacity-20 group-hover:scale-110 transition-transform duration-700">
                <div className="aspect-square bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-[100px]" />
              </div>

              <div className="mt-8 flex items-center gap-3 font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-5 transition-all cursor-pointer">
                Explore AI Engine <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>

            {/* SMALL CARD 1: RECRUITER LAYOUTS */}
            <div className="lg:col-span-4 glass-card p-6 sm:p-8 lg:p-10 flex flex-col border border-slate-200 dark:border-white/10 rounded-3xl hover:bg-white dark:hover:bg-white/5 transition-colors">
              <div className="size-12 sm:size-14 rounded-2xl flex items-center justify-center mb-6 border bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                <span className="material-symbols-outlined text-2xl sm:text-3xl">visibility</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Recruiter-First</h3>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">Layouts structured to surface your strongest achievements in under 6 seconds.</p>
            </div>

            {/* SMALL CARD 2: VERIFIED CREDENTIALS */}
            <div className="lg:col-span-4 glass-card p-6 sm:p-8 lg:p-10 flex flex-col border border-slate-200 dark:border-white/10 rounded-3xl hover:bg-white dark:hover:bg-white/5 transition-colors">
              <div className="size-12 sm:size-14 rounded-2xl flex items-center justify-center mb-6 border bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                <span className="material-symbols-outlined text-2xl sm:text-3xl">token</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Verified Sync</h3>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">Secure verification tools that reinforce trust with instant background checks.</p>
            </div>

            {/* WIDE CARD: TEMPLATES */}
            <div className="sm:col-span-2 lg:col-span-8 glass-card p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 relative overflow-hidden border border-slate-200 dark:border-white/10 rounded-3xl">
              <div className="flex-1">
                <div className="size-12 sm:size-14 rounded-2xl flex items-center justify-center mb-6 border bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl">history_edu</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">Pro Templates</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">A refined library balancing clarity, personality, and executive polish.</p>
              </div>

              {/* MOCKUP GRAPHIC */}
              <div className="flex-1 rounded-2xl border p-6 flex flex-col gap-3 rotate-1 hover:rotate-0 transition-transform bg-white/60 border-black/10 dark:bg-black/40 dark:border-white/10 shadow-inner">
                <div className="flex gap-2">
                  <div className="size-2 rounded-full bg-red-400/50" />
                  <div className="size-2 rounded-full bg-amber-400/50" />
                  <div className="size-2 rounded-full bg-green-400/50" />
                </div>
                <div className="h-3 w-full bg-slate-200 dark:bg-white/10 rounded-full" />
                <div className="h-16 w-full bg-gradient-to-r from-indigo-500/20 to-transparent border border-indigo-500/10 rounded-xl animate-pulse" />
                <div className="h-3 w-3/4 bg-slate-200 dark:bg-white/10 rounded-full" />
                <div className="h-3 w-1/2 bg-slate-200 dark:bg-white/10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
       {/* ENHANCED FAQ SECTION */}
      <div className="mt-32 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left Side: Header */}
          <div className="md:w-1/3">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Frequently <br />
              <span className="text-indigo-600 dark:text-indigo-400">Asked Questions</span>
            </h3>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Can't find what you're looking for? Reach out to our support team anytime.
            </p>
            <button className="mt-6 px-6 py-3 rounded-full border border-slate-200 dark:border-white/10 text-sm font-semibold hover:bg-white dark:hover:bg-white/5 transition-all">
              Contact Support
            </button>
          </div>

          {/* Right Side: Interactive Cards */}
          <div className="md:w-2/3 grid gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className={`
                    group cursor-pointer p-6 rounded-2xl border transition-all duration-300
                    ${isOpen 
                      ? 'bg-white dark:bg-white/10 border-indigo-500/50 shadow-lg shadow-indigo-500/5' 
                      : 'bg-white/40 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'}
                  `}
                >
                  <div className="flex justify-between items-center gap-4">
                    <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                      {faq.q}
                    </span>
                    <div className={`
                      flex-shrink-0 size-8 rounded-full border flex items-center justify-center transition-all
                      ${isOpen ? 'bg-indigo-600 border-indigo-600 text-white rotate-180' : 'border-slate-300 dark:border-white/20 text-slate-500'}
                    `}>
                      <span className="material-symbols-outlined text-xl">expand_more</span>
                    </div>
                  </div>
                  
                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}
                  `}>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;