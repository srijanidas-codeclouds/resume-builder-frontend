const TemplateSection = ({id}) => {

//   redirect to resume editor with selected template
  const handleTryLayout = () => {
    window.location.href = "/dashboard/my-resumes";
  };
  return (
    <section id={id} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Playfair flourish */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Designed for <br />
              <span className="font-playfair text-gradient italic">Impact.</span>
            </h2>
            <p className="mt-6 text-slate-500 dark:text-slate-400 text-lg">
              Stop fighting with Word margins. Our layouts are architected by hiring experts to lead the recruiter's eye exactly where it needs to go.
            </p>
          </div>
          <button className="btn-secondary flex items-center gap-2 hover:bg-slate-100 transition-colors">
            View All Templates <span>→</span>
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid min-h-[700px]">
          
          {/* Main Feature - Spans 7 columns */}
          <div className="col-span-12 lg:col-span-7 glass-card p-8 rounded-[2rem] overflow-hidden group relative">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="badge badge-active mb-2 inline-block uppercase tracking-widest text-[10px]">Most Successful</span>
                <h3 className="text-3xl font-bold">The "Executive"</h3>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-indigo-500">88% Success Rate</p>
                <p className="text-xs text-slate-400">FAANG Approved</p>
              </div>
            </div>
            
            {/* Template Preview Mockup */}
            <div className="relative mt-4 h-full bg-white dark:bg-slate-800 rounded-t-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] origin-top p-6">
              <div className="w-1/3 h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-3">
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700/50 rounded" />
                <div className="w-5/6 h-2 bg-slate-100 dark:bg-slate-700/50 rounded" />
                <div className="w-4/6 h-2 bg-slate-100 dark:bg-slate-700/50 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="h-32 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-200 dark:border-slate-700" />
                <div className="h-32 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-200 dark:border-slate-700" />
              </div>
            </div>
          </div>

          {/* Side Stack - Spans 5 columns */}
          <div className="col-span-12 lg:col-span-5 grid grid-rows-2 gap-6">
            
            {/* Creative Template */}
            <div className="glass-card p-6 rounded-[2rem] flex items-center gap-6 group">
              <div className="w-32 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex-shrink-0 floating-element group-hover:rotate-3 transition-transform" />
              <div>
                <h4 className="text-xl font-bold mb-2">The "Creative"</h4>
                <p className="text-sm text-slate-500">Perfect for Designers and Marketing professionals.</p>
                <button onClick={handleTryLayout} className="mt-4 text-xs font-bold text-indigo-500 uppercase tracking-wider">Try this layout</button>
              </div>
            </div>

            {/* Classic Template */}
            <div className="glass-card p-6 rounded-[2rem] flex items-center gap-6 group">
              <div className="w-32 h-40 bg-slate-200 dark:bg-slate-800 rounded-xl flex-shrink-0 group-hover:-rotate-3 transition-transform" />
              <div>
                <h4 className="text-xl font-bold mb-2">The "Minimalist"</h4>
                <p className="text-sm text-slate-500">A clean, focused approach for Mid-Senior roles.</p>
                <button onClick={handleTryLayout} className="mt-4 text-xs font-bold text-indigo-500 uppercase tracking-wider">Try this layout</button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="mt-12 flex justify-center items-center gap-8 text-slate-400 grayscale opacity-60">
           <span className="text-sm font-semibold tracking-widest uppercase">Used by candidates at:</span>
           <span className="font-bold text-lg">Google</span>
           <span className="font-bold text-lg">Meta</span>
           <span className="font-bold text-lg">Airbnb</span>
        </div>
      </div>
    </section>
  );
};

export default TemplateSection;