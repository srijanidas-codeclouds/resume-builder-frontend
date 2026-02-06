const Pricing = ({ id }) => {
  const tiers = [
    { name: "Essential", price: "0", features: ["1 Active Resume", "Standard Templates", "PDF Exports"] },
    { name: "Pro", price: "12", features: ["Unlimited Resumes", "AI Bullet Point Generator", "Premium Templates", "Cover Letter Builder"], popular: true },
    { name: "Lifetime", price: "99", features: ["One-time payment", "All Future Templates", "Priority Support", "Custom Domains"] },
  ];

  return (
    <section id={id} className="py-24 hero-gradient">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 glow-text">Flexible Pricing</h2>
          <p className="text-slate-500 dark:text-slate-400">Scale your career without breaking the bank.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`glass-card p-8 rounded-3xl flex flex-col ${tier.popular ? 'border-indigo-500/50 scale-105 z-10' : ''}`}
            >
              {tier.popular && (
                <span className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-4 block">Most Popular</span>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">${tier.price}</span>
                <span className="text-slate-500 ml-2">{tier.price === "99" ? "once" : "/mo"}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-center text-sm gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-[10px]">✔</div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={tier.popular ? "btn-primary w-full" : "btn-secondary w-full"}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;