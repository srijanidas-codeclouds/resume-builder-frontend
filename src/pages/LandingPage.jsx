import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";
import HeroSection from "../components/HeroSection";
import TrustedBySection from "../components/Trusted";

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
      <Features />

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="
            rounded-2xl text-white text-center py-16 px-6
            bg-blue-600
            dark:bg-linear-to-r
            dark:from-(--brand-indigo)
            dark:to-(--brand-purple)
          ">
            <h3 className="text-3xl font-bold ">
              Ready to land your <span className="italic font-playfair">dream</span> job?
            </h3>
            <p className="mt-4 text-blue-100 dark:text-indigo-200 font-playfair">
              Join over 50,000 candidates who used ResumeBuilder to get hired.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
              <a
                href="/signup"
                className="
                  mt-8 inline-block
                  bg-white text-indigo-600 font-semibold
                  px-6 py-3 rounded-lg
                  hover:bg-blue-50
                  transition
                "
              >
                Get Started 
              </a>
              <a
              href="/signup"
              className="
                mt-8 inline-block
                bg-white text-indigo-600 font-semibold
                px-6 py-3 rounded-lg
                hover:bg-blue-50
                transition
              "
            >
              See Pricing
            </a>
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
