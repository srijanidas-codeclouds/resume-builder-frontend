import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";
import HeroSection from "../components/HeroSection";
import TrustedBySection from "../components/Trusted";
import Pricing from "../components/Pricing";
import TemplatesSection from "../components/TemplateSection";

const LandingPage = () => {
  return (
    <div className="
      bg-[#f8fafc]  text-slate-900
      dark:bg-[#050508] dark:text-slate-200
      font-display min-h-screen 
    ">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <HeroSection />

      {/* TRUSTED BY */}
      <TrustedBySection />
      {/* FEATURES */}
      <Features id="features" />

      {/* Pricing */}
      <Pricing  id="pricing"/>

      {/* Templates */}
      <TemplatesSection id="templates" />

      {/* CTA */}
      <section className="pb-24 pt-12">
  <div className="max-w-6xl mx-auto px-6">
    <div className="
      relative overflow-hidden rounded-[2.5rem] 
      bg-indigo-500 
      dark:bg-gradient-to-br dark:from-indigo-500 dark:via-indigo-600 dark:to-purple-500
      py-16 px-8 md:px-12 shadow-2xl
    ">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 size-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 size-64 bg-indigo-400/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Ready to land your <span className="italic font-playfair font-medium">dream</span> job?
        </h3>
        
        <p className="mt-6 text-indigo-100 dark:text-indigo-100/80 text-lg md:text-xl">
          Join <span className="font-bold text-white">50,000+</span> candidates who used ResumeBuilder to bypass recruiters and get hired.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
          <a
            href="/signup"
            className="
              w-full sm:w-auto
              bg-white text-indigo-600 font-bold
              px-8 py-4 rounded-2xl
              hover:bg-indigo-50 hover:scale-105
              transition-all duration-300 shadow-lg
            "
          >
            Get Started Free
          </a>
          
          <a
            href="/pricing"
            className="
              w-full sm:w-auto
              bg-indigo-500/20 text-white font-semibold
              px-8 py-4 rounded-2xl
              border border-white/30 backdrop-blur-md
              hover:bg-indigo-500/40 transition-all
            "
          >
            See Pricing
          </a>
        </div>

        {/* Micro-trust indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 opacity-60 grayscale brightness-200">
           {/* You can add small partner logos or icons here */}
           <div className="flex items-center gap-1 text-xs font-medium text-white uppercase tracking-widest">
             <span className="material-symbols-outlined text-sm">verified_user</span>
             No credit card required
           </div>
           <div className="flex items-center gap-1 text-xs font-medium text-white uppercase tracking-widest">
             <span className="material-symbols-outlined text-sm">bolt</span>
             Setup in 2 minutes
           </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};


export default LandingPage;
