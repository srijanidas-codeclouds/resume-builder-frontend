const ResumeActions = () => (
  <div className="space-y-4">
    <h3 className="font-semibold">Colours</h3>

    <div className="flex gap-2">
      {["#4F46E5", "#7C3AED", "#0EA5E9", "#F59E0B"].map(c => (
        <span
          key={c}
          className="w-7 h-7 rounded-full cursor-pointer"
          style={{ background: c }}
        />
      ))}
    </div>

    <button className="w-full py-2 rounded-xl bg-indigo-600 text-white">
      Download Resume
    </button>

    <button className="w-full py-2 rounded-xl border border-white/20">
      Share Resume
    </button>
  </div>
)

export default ResumeActions