import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { resumeService } from "../../services/resume.service";
import TemplateModal from "../../components/TemplateModal";
import ResumeSummaryCard from "../../components/ResumeSummaryCard";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [resumes, setResumes] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  /* =====================
     FETCH RESUMES
  ===================== */
  const fetchResumes = async () => {
  try {
    setLoading(true);
    const res = await resumeService.getAll();
    const list = res?.data?.data;

    setResumes(Array.isArray(list) ? list : []);
  } catch {
    setResumes([]);
    toast.error("Failed to load resumes");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchResumes();
  }, [location.key]);

  /* =====================
     CREATE RESUME
  ===================== */
  const handleCreateResume = async (template) => {
    try {
      const res = await resumeService.create({
        title: "Untitled Resume",
        template, // "modern" | "classic"
      });

      toast.success("Resume created");
      setShowTemplateModal(false);
      navigate(`/editor/${res.data.data.id}`);
    } catch {
      toast.error("Could not create resume");
    }
  };

  /* =====================
     FILTERING
  ===================== */
  const safeResumes = Array.isArray(resumes) ? resumes : [];

  const filteredResumes = useMemo(() => {
  if (activeTab === "drafts") {
    return safeResumes.filter((r) => r.status === "draft");
  }
  return safeResumes;
}, [safeResumes, activeTab]);

  const draftCount = safeResumes.filter(
  (r) => r.status === "draft"
).length;


  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <main className="flex flex-1 justify-center">
          {showTemplateModal && (
            <TemplateModal
              onClose={() => setShowTemplateModal(false)}
              onSelect={(template) => handleCreateResume(template)}
            />
          )}

          {/* ================= END MODAL ================= */}

          <div className="w-full max-w-280 px-6">
            {/* Heading */}
            <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                  Welcome back, {user?.name || user?.username || "User"}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                  You have {safeResumes.length} resumes in your account.
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-800 mb-6 flex gap-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`pb-3 text-sm font-bold ${
                  activeTab === "all"
                    ? "border-b-2 border-primary text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                All Resumes
                <span className="ml-2 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                  {resumes.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("drafts")}
                className={`pb-3 text-sm font-bold ${
                  activeTab === "drafts"
                    ? "border-b-2 border-primary text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                Drafts
                <span className="ml-2 rounded-full bg-yellow-500/10 px-1.5 py-0.5 text-[10px] text-yellow-600">
                  {draftCount}
                </span>
              </button>
            </div>

            {/* Resume Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Create New */}
              <div
                onClick={() => setShowTemplateModal(true)}
                className="flex  w-full flex/4 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-primary"
              >
                <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">
                    add
                  </span>
                </div>
                <p className="font-semibold text-slate-600 dark:text-slate-300">
                  Create New Resume
                </p>
              </div>

              {/* Resume Cards */}
              {filteredResumes.map((resume) => (
                <ResumeSummaryCard
                  key={resume.id}
                  title={resume.title}
                  createdAt={resume.created_at}
                  updatedAt={resume.updated_at}
                  completion={resume.completion ?? 0}
                  isPublished={resume.status === "published"}
                  publicId={resume.slug || resume.id}
                  onSelect={() => navigate(`/editor/${resume.id}`)}
                  onDelete={() => {
                    toast(
                      (t) => (
                        <div className="flex gap-3">
                          <span>Delete this resume?</span>
                          <button
                            onClick={async () => {
                              await resumeService.delete(resume.id);
                              fetchResumes();
                              toast.dismiss(t.id);
                            }}
                            className="font-bold text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      ),
                      { duration: 4000 },
                    );
                  }}
                />
              ))}

              {!loading && filteredResumes.length === 0 && (
                <p className="text-sm text-slate-500">No resumes found.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
