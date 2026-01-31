import React from 'react'

const HeroSection = () => {
  return (
    <section className="py-10 mt-16 dark:hero-gradient">
      
        <div className="max-w-5xl mx-auto px-6 text-center mb-32">
          
          <div className="
            inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-full
            bg-indigo-50 text-indigo-600 border border-indigo-100
            dark:bg-white/5 dark:text-indigo-300 dark:border-white/10
          ">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            AI-POWERED RESUME BUILDER
          </div>

          <h1 className="mt-8 text-4xl md:text-5xl font-extrabold leading-tight">
            Build a career-winning <br />
            resume in{" "}
            <span className="
              italic text-transparent bg-clip-text
              bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500
              dark:from-(--brand-indigo)
              dark:via-(--brand-purple)
              dark:to-(--brand-indigo)
              dark:glow-text
              font-playfair
            ">
              minutes
            </span>.
          </h1>

          <p className="mt-15 text-lg max-w-4xl mx-auto text-slate-600 dark:text-slate-400 font-playfair tracking-wide">
            Land your dream job with AI-powered suggestions, professional
            recruiter-approved templates, and a builder designed for your success.
          </p>
        </div>

      </section>
  )
}

export default HeroSection