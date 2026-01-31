const Features = () => {
  return (
    <section
      className="
        py-16 md:py-24 overflow-hidden
        bg-gradient-to-b
        from-slate-50 via-white to-slate-100
        dark:from-black dark:via-black dark:to-slate-950
      "
    >
      {/* TEXT CONTAINER */}
      <div className="max-w-6xl mx-auto px-6">
        <div>
          <h2
            className="
              serif-heading
              text-4xl md:text-5xl xl:text-6xl
              text-slate-900 dark:text-white
              mb-6
              text-center
            "
          >
            Everything <span className="italic font-playfair">you </span>need, <span className="italic font-playfair"></span>to get{" "}
            <span className="italic font-playfair">noticed</span>.
          </h2>

          <p
            className="
              mt-4
              text-slate-600 dark:text-slate-400
              text-base md:text-lg xl:text-xl
              text-center
              max-w-2xl
              mx-auto
            "
          >
            Our tools are designed to make the resume building process as
            simple and effective as possible.
          </p>
        </div>
      </div>

      {/* BENTO GRID */}
      <div className="mt-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* LARGE CARD */}
            <div
              className="
                sm:col-span-2 lg:col-span-8
                glass-card
                p-6 sm:p-8 lg:p-10
                flex flex-col justify-between
                relative overflow-hidden
                group
              "
            >
              <div className="relative z-10">
                <div
                  className="
                    size-12 sm:size-14
                    rounded-2xl
                    flex items-center justify-center
                    mb-6
                    border
                    bg-indigo-500/10
                    text-indigo-600 dark:text-indigo-400
                    border-indigo-500/20
                  "
                >
                  <span className="material-symbols-outlined text-2xl sm:text-3xl">
                    auto_fix_high
                  </span>
                </div>

                <h3
                  className="
                    text-2xl sm:text-3xl
                    font-bold
                    text-slate-900 dark:text-white
                    mb-4
                  "
                >
                  AI Resume Intelligence
                </h3>

                <p
                  className="
                    text-slate-600 dark:text-slate-400
                    max-w-sm
                    text-base sm:text-lg
                    leading-relaxed
                  "
                >
                  Our AI transforms your experience into clear, persuasive
                  language that works seamlessly with ATS systems and
                  recruiters.
                </p>
              </div>

              {/* GLOW */}
              <div
                className="
                  absolute right-[-20%] bottom-[-20%]
                  w-2/3
                  opacity-10 dark:opacity-30
                  transition-opacity
                  group-hover:opacity-40
                "
              >
                <div className="aspect-square bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-[120px]" />
              </div>

              <div
                className="
                  mt-8
                  flex items-center gap-3
                  font-semibold
                  text-slate-900 dark:text-white
                  group-hover:gap-5
                  transition-all
                  cursor-pointer
                "
              >
                Explore AI Engine
                <span className="material-symbols-outlined">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* SMALL CARD 1 */}
            <div
              className="
                lg:col-span-4
                glass-card
                p-6 sm:p-8 lg:p-10
                flex flex-col
              "
            >
              <div
                className="
                  size-12 sm:size-14
                  rounded-2xl
                  flex items-center justify-center
                  mb-6
                  border
                  bg-purple-500/10
                  text-purple-600 dark:text-purple-400
                  border-purple-500/20
                "
              >
                <span className="material-symbols-outlined text-2xl sm:text-3xl">
                  visibility
                </span>
              </div>

              <h3
                className="
                  text-2xl sm:text-3xl
                  font-bold
                  text-slate-900 dark:text-white
                  mb-4
                "
              >
                Recruiter-First Layouts
              </h3>

              <p
                className="
                  text-slate-600 dark:text-slate-400
                  text-base sm:text-lg
                  leading-relaxed
                "
              >
                Layouts structured to surface your strongest achievements fast.
              </p>
            </div>

            {/* SMALL CARD 2 */}
            <div
              className="
                lg:col-span-4
                glass-card
                p-6 sm:p-8 lg:p-10
                flex flex-col
              "
            >
              <div
                className="
                  size-12 sm:size-14
                  rounded-2xl
                  flex items-center justify-center
                  mb-6
                  border
                  bg-blue-500/10
                  text-blue-600 dark:text-blue-400
                  border-blue-500/20
                "
              >
                <span className="material-symbols-outlined text-2xl sm:text-3xl">
                  token
                </span>
              </div>

              <h3
                className="
                  text-2xl sm:text-3xl
                  font-bold
                  text-slate-900 dark:text-white
                  mb-4
                "
              >
                Verified Credentials
              </h3>

              <p
                className="
                  text-slate-600 dark:text-slate-400
                  text-base sm:text-lg
                  leading-relaxed
                "
              >
                Secure verification tools that reinforce trust and credibility.
              </p>
            </div>

            {/* WIDE CARD */}
            <div
              className="
                sm:col-span-2 lg:col-span-8
                glass-card
                p-6 sm:p-8 lg:p-10
                flex flex-col lg:flex-row
                gap-8
                relative overflow-hidden
              "
            >
              <div className="flex-1">
                <div
                  className="
                    size-12 sm:size-14
                    rounded-2xl
                    flex items-center justify-center
                    mb-6
                    border
                    bg-green-500/10
                    text-green-600 dark:text-green-400
                    border-green-500/20
                  "
                >
                  <span className="material-symbols-outlined text-2xl sm:text-3xl">
                    history_edu
                  </span>
                </div>

                <h3
                  className="
                    text-2xl sm:text-3xl
                    font-bold
                    text-slate-900 dark:text-white
                    mb-4
                  "
                >
                  Professional Templates
                </h3>

                <p
                  className="
                    text-slate-600 dark:text-slate-400
                    text-base sm:text-lg
                    leading-relaxed
                  "
                >
                  A refined library balancing clarity, personality, and polish.
                </p>
              </div>

              <div
                className="
                  flex-1
                  rounded-2xl
                  border
                  p-6
                  flex flex-col gap-3
                  rotate-1 hover:rotate-0
                  transition-transform
                  bg-white/60 border-black/10
                  dark:bg-black/40 dark:border-white/10
                "
              >
                <div className="flex gap-2">
                  <div className="size-2 rounded-full bg-black/20 dark:bg-white/20" />
                  <div className="size-2 rounded-full bg-black/20 dark:bg-white/20" />
                  <div className="size-2 rounded-full bg-black/20 dark:bg-white/20" />
                </div>

                <div className="h-4 w-full bg-black/5 dark:bg-white/5 rounded-full" />
                <div className="h-20 w-full bg-gradient-to-r from-indigo-500/10 to-transparent border border-black/10 dark:border-white/5 rounded-xl" />
                <div className="h-4 w-3/4 bg-black/5 dark:bg-white/5 rounded-full" />
                <div className="h-4 w-2/3 bg-black/5 dark:bg-white/5 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
