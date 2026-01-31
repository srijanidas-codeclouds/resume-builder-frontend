import { useState } from "react";
import toast from "react-hot-toast";

const ResumeSummaryCard = ({
  title = "Untitled Resume",
  createdAt = null,
  updatedAt = null,
  completion = 0,
  isPublished = false,
  publicId, // slug or id
  onSelect,
  onDelete,
}) => {
  const [hovered, setHovered] = useState(false);

  const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};


  const completionColor =
    completion >= 90
      ? "bg-green-500"
      : completion >= 70
      ? "bg-yellow-500"
      : "bg-red-500";

  const handleShare = (e) => {
    e.stopPropagation();
    const link = `${window.location.origin}/r/${publicId}`;
    navigator.clipboard.writeText(link);
    toast.success("Public link copied");
  };

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl glass-card p-4 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {completion === 0
              ? "Not started"
              : completion < 80
              ? "In progress"
              : "Ready"}
          </p>
        </div>

        {isPublished && (
          <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-600">
            Public
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className={`h-full rounded-full ${completionColor}`}
            style={{ width: `${completion}%` }}
          />
        </div>
        <p className="mt-1 text-[11px] text-slate-500">
          {completion}% completed
        </p>
      </div>

      {/* Dates */}
      <div className="mt-4 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
        <div>Updated {formatDate(updatedAt)}</div>
      </div>

      {/* Actions */}
      <div
        className={`absolute right-4 top-4 flex gap-2 transition ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {isPublished && (
          <button
            onClick={handleShare}
            className="rounded-lg bg-slate-600/80 px-3 py-1 text-xs text-white"
          >
            Share
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
          className="rounded-lg bg-[var(--accent-color)] px-3 py-1 text-xs text-white"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="rounded-lg bg-red-500/80 px-3 py-1 text-xs text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
