import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { resumeService } from "../services/resume.service";
import { TEMPLATE_MAP } from "../templates";

// Import Forms
import PersonalForm from "../components/forms/PersonalForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import EducationForm from "../components/forms/EducationForm";
import SkillsForm from "../components/forms/SkillsForm";
import CertificationsForm from "../components/forms/CertificationsForm";
import LanguagesForm from "../components/forms/LanguagesForm";

import ThemeToggle from "../components/ThemeToggle";
import downloadA4PDF from "../utils/downloadA4PDF";
import toast from "react-hot-toast";

const ResumeEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [resume, setResume] = useState(null);
  const [template, setTemplate] = useState("classic");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("personal");
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const previewRef = useRef(null);

  /**
   * FIXED SERIALIZATION:
   * Ensures all data matches backend validation rules exactly
   */
  const serializeResumeForSave = () => {
    const payload = {
      version: resume.version,
      title: resume.title || null,
      summary: resume.summary ?? resume.personal_details?.summary ?? null,
      template,
      accent_color: resume.accent_color || '#2563eb',
      
      // Skills: ensure it's an array of strings
      skills: Array.isArray(resume.skills) 
        ? resume.skills.filter(s => s && typeof s === 'string')
        : [],
      
      // Languages: ensure proper structure
      languages: Array.isArray(resume.languages)
        ? resume.languages
            .filter(l => l && l.name)
            .map(l => ({
              name: l.name,
              level: l.level || 'intermediate'
            }))
        : [],

      // Personal details
      personal_details: resume.personal_details ? {
        full_name: resume.personal_details.full_name || '',
        designation: resume.personal_details.designation || '',
        email: resume.personal_details.email || '',
        phone: resume.personal_details.phone || '',
        location: resume.personal_details.location || '',
      } : {},

      // Socials
      socials: resume.socials ? {
        linkedIn: resume.socials.linkedIn || '',
        github: resume.socials.github || '',
        portfolio: resume.socials.portfolio || '',
        twitter: resume.socials.twitter || '',
      } : {},

      // Experiences: ensure location field is included
      experiences: Array.isArray(resume.experiences)
        ? resume.experiences
            .filter(exp => exp && (exp.position || exp.organization))
            .map(exp => ({
              organization: exp.organization || '',
              position: exp.position || '',
              location: exp.location || '', // ✅ Include location
              description: exp.description || '',
              start_date: exp.start_date || null,
              end_date: exp.is_current ? null : (exp.end_date || null),
              is_current: Boolean(exp.is_current),
            }))
        : [],

      // Projects: ensure tech_stack is a comma-separated STRING, not array
      projects: Array.isArray(resume.projects)
        ? resume.projects
            .filter(proj => proj && proj.name)
            .map(proj => ({
              name: proj.name || '',
              description: proj.description || '',
              // ✅ CRITICAL FIX: Convert array to comma-separated string
              tech_stack: Array.isArray(proj.tech_stack)
                ? proj.tech_stack.join(', ')
                : (proj.tech_stack || ''),
              start_date: proj.start_date || null,
              end_date: proj.end_date || null,
              live_link: proj.live_link || '',
              github_link: proj.github_link || '',
            }))
        : [],

      // Education
      education: Array.isArray(resume.education)
        ? resume.education
            .filter(edu => edu && (edu.institution || edu.degree))
            .map(edu => ({
              institution: edu.institution || '',
              degree: edu.degree || '',
              field: edu.field || '',
              grade: edu.grade || '',
              start_date: edu.start_date || null,
              end_date: edu.end_date || null,
            }))
        : [],

      // Certifications
      certifications: Array.isArray(resume.certifications)
        ? resume.certifications
            .filter(cert => cert && cert.title)
            .map(cert => ({
              title: cert.title || '',
              issuer: cert.issuer || '',
              issued_date: cert.issued_date || null,
              url: cert.url || '',
            }))
        : [],
    };

    // Remove empty arrays to avoid unnecessary DB operations
    if (payload.experiences.length === 0) delete payload.experiences;
    if (payload.projects.length === 0) delete payload.projects;
    if (payload.education.length === 0) delete payload.education;
    if (payload.certifications.length === 0) delete payload.certifications;
    if (payload.skills.length === 0) delete payload.skills;
    if (payload.languages.length === 0) delete payload.languages;

    return payload;
  };

  /* ===============================
     FETCH RESUME
  ================================ */
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await resumeService.getById(id);
        const data = res.data.data;

        setResume({
          ...data,
          version: data.version ?? 1,

          personal_details: data.personal_details || {},
          socials: data.socials || {},
          experiences: data.experiences || [],
          education: data.education || [],
          projects: data.projects || [],
          skills: data.skills || [],
          languages: data.languages || [],
          certifications: data.certifications || [],
        });

        setTemplate(data.template || "classic");
      } catch (err) {
        console.error("Failed to fetch resume", err);
        toast.error("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  /* ===============================
     PREVIEW ADAPTER
  ================================ */
  const getTemplateData = useCallback(() => {
    if (!resume) return {};

    return {
      accentColor: resume.accent_color || "#2563eb",
      profileInfo: {
        fullName: resume.personal_details?.full_name || "Your Name",
        designation: resume.personal_details?.designation || "Designation",
        summary: resume.summary || "",
      },
      contactInfo: {
        email: resume.personal_details?.email,
        phone: resume.personal_details?.phone,
        location: resume.personal_details?.location,
        linkedin: resume.socials?.linkedIn,
        github: resume.socials?.github,
        website: resume.socials?.portfolio,
      },
      workExperience: (resume.experiences || []).map((exp) => ({
        title: exp.position,
        company: exp.organization,
        location: exp.location,
        startDate: exp.start_date,
        endDate: exp.is_current ? "Present" : exp.end_date,
        description: exp.description,
        is_current: exp.is_current,
      })),
      projects: (resume.projects || []).map((proj) => ({
        title: proj.name,
        description: proj.description,
        startDate: proj.start_date,
        endDate: proj.end_date,
        liveDemo: proj.live_link,
        github: proj.github_link,
        // Handle both string and array formats for tech_stack
        technologies: proj.tech_stack 
          ? (typeof proj.tech_stack === 'string' 
              ? proj.tech_stack.split(",").map((tech) => tech.trim())
              : Array.isArray(proj.tech_stack) 
                ? proj.tech_stack 
                : [])
          : [],
      })),
      education: (resume.education || []).map((edu) => ({
        institution: edu.institution,
        degree: edu.degree,
        startDate: edu.start_date,
        endDate: edu.end_date,
        gpa: edu.grade,
      })),
      skills: (resume.skills || []).map((s) => ({ name: s })),
      languages: (resume.languages || []).map((l) => ({
        name: l.name,
        level: l.level,
      })),
      certifications: (resume.certifications || []).map((c) => ({
        name: c.title,
        issuer: c.issuer,
        issueDate: c.issued_date,
      })),
    };
  }, [resume]);

  /* ===============================
     SAVE LOGIC
  ================================ */
  const handleSaveAndExit = async () => {
    setIsSaving(true);
    try {
      const payload = serializeResumeForSave();
      
      // Optional: Log for debugging (remove in production)
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('Saving payload:', payload);
      // }
      
      await resumeService.update(id, payload);
      toast.success("Resume saved successfully!");
      navigate("/dashboard/my-resumes");
    } catch (error) {
      console.error("Save failed", error);
      
      // Better error messages
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0]?.[0];
        toast.error(firstError || "Validation error. Please check your data.");
      } else if (error.response?.status === 409) {
        toast.error("Resume was modified elsewhere. Please reload.");
      } else {
        toast.error("Failed to save resume. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const updateData = (newData) => {
    setResume(newData);
  };

  /* ================= MEASURE PREVIEW WIDTH ================= */
  useEffect(() => {
    if (!previewRef.current) return;

    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });

    observer.observe(previewRef.current);
    return () => observer.disconnect();
  }, []);

  const TemplateComponent = TEMPLATE_MAP[template] || TEMPLATE_MAP.classic;

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-[#141422] text-gray-900 dark:text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 bg-[#4F46E5] rounded animate-spin"></div>
          <p className="font-light tracking-widest uppercase text-sm">
            Loading Workspace...
          </p>
        </div>
      </div>
    );

  if (!resume) return <div className="p-10 text-center">Resume not found</div>;

  const renderActiveForm = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalForm data={resume} updateData={updateData} errors={errors} />
        );
      case "work":
        return <ExperienceForm data={resume} updateData={updateData} />;
      case "school":
        return <EducationForm data={resume} updateData={updateData} />;
      case "projects":
        return <ProjectsForm data={resume} updateData={updateData} />;
      case "skills":
        return <SkillsForm data={resume} updateData={updateData} />;
      case "certifications":
        return <CertificationsForm data={resume} updateData={updateData} />;
      case "languages":
        return <LanguagesForm data={resume} updateData={updateData} />;
      default:
        return <PersonalForm data={resume} updateData={updateData} />;
    }
  };

  const sections = [
    { id: "personal", icon: "person", label: "Personal Info" },
    { id: "work", icon: "work", label: "Experience" },
    { id: "projects", icon: "code", label: "Projects" },
    { id: "school", icon: "school", label: "Education" },
    { id: "skills", icon: "psychology", label: "Skills" },
    { id: "languages", icon: "translate", label: "Languages" },
    { id: "certifications", icon: "verified", label: "Certifications" },
  ];

  return (
    <div className="h-screen bg-gray-50 dark:bg-[#141422] text-gray-900 dark:text-[#E2E8F0] flex flex-col overflow-hidden font-sans transition-colors duration-300">
      {/* ================= HEADER ================= */}
      <header className="shrink-0 h-16 z-50 px-6 flex items-center justify-between glass-card border-b-0 m-4 rounded-xl">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="w-8 h-8 rounded-lg text-white flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 dark:from-indigo-600 dark:to-purple-600">
              <i className="fa fa-cube" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-800 dark:text-white">
              Curriculum
            </span>
          </Link>

          <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-2"></div>

          <div className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${isSaving ? "bg-yellow-400 animate-pulse" : "bg-green-500"}`}
            ></span>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
              {isSaving ? "Saving changes..." : "Ready"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center relative">
            <span className="absolute left-3 text-gray-400 material-symbols-outlined text-[18px]">
              grid_view
            </span>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-lg bg-gray-100 dark:bg-white/5 border border-transparent hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-gray-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer transition-all"
            >
              <option value="classic">Classic Layout</option>
              <option value="modern">Modern Layout</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <button
            onClick={() =>
              downloadA4PDF({
                template,
                resumeData: getTemplateData(),
              })
            }
            className="h-9 px-4 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 text-xs font-bold transition-all flex items-center gap-2 border border-transparent dark:border-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={handleSaveAndExit}
            disabled={isSaving}
            className="h-9 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 flex items-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>{isSaving ? "Saving..." : "Save & Exit"}</span>
          </button>

          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ================= TITLE BAR ================= */}
      <div className="mx-4 mb-2 rounded-xl glass-card px-6 py-3">
        <input
          type="text"
          value={resume.title ?? ""}
          onChange={(e) =>
            setResume((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          placeholder="Resume title (e.g. Frontend Developer Resume)"
          className="w-full max-w-lg bg-transparent text-lg font-semibold outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>

      {/* ================= EDITOR BODY ================= */}
      <div className="flex flex-1 overflow-hidden px-4 pb-4 gap-4">
        {/* ========== LEFT SIDEBAR ========== */}
        <aside className="w-64 glass-card rounded-xl flex flex-col gap-1 p-3 overflow-y-auto print:hidden">
          <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3 mt-2">
            Sections
          </h3>
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                activeSection === item.id
                  ? "bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${activeSection === item.id ? "" : "opacity-70"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </aside>

        {/* ========== MAIN PREVIEW ========== */}
        <main className="flex-1 rounded-xl bg-gray-200 dark:bg-[#0a0f18] relative overflow-hidden flex flex-col items-center justify-start p-8 transition-colors">
          <div className="hero-gradient absolute inset-0 opacity-10 pointer-events-none"></div>

          <div className="flex-1 w-full flex justify-center overflow-y-auto custom-scrollbar">
            <div
              ref={previewRef}
              className="resume-page bg-white shadow-2xl w-[210mm] min-h-[297mm] origin-top"
            >
              <TemplateComponent
                resumeData={getTemplateData()}
                containerWidth={800}
              />
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Accent Color
            </span>

            <input
              type="color"
              value={resume.accent_color || "#2563eb"}
              onChange={(e) =>
                setResume((prev) => ({
                  ...prev,
                  accent_color: e.target.value,
                }))
              }
              className="h-9 w-9 cursor-pointer rounded-md border border-gray-200 dark:border-white/10 bg-transparent"
              title="Choose accent color"
            />
          </div>
        </main>

        {/* ========== RIGHT FORM PANEL ========== */}
        <aside className="hidden xl:flex w-96 glass-card rounded-xl flex-col print:hidden overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white capitalize flex items-center gap-2">
              {sections.find((s) => s.id === activeSection)?.icon && (
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                  {sections.find((s) => s.id === activeSection)?.icon}
                </span>
              )}
              {activeSection.replace("_", " ")}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar text-sm">
            {renderActiveForm()}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ResumeEditor;