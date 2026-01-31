const ResumePreview = () => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">Full Resume</h3>
      <button className="text-sm text-indigo-500 hover:underline">
        Edit
      </button>
    </div>

    <div className="h-[420px] rounded-xl bg-white/60 dark:bg-white/10
                    border border-white/20 p-4 overflow-hidden">
      {/* Embed resume preview or skeleton */}
      Resume preview goes here
    </div>
  </div>
)

export default ResumePreview