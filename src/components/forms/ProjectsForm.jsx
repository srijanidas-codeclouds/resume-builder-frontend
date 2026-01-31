import { Input, TextArea, SectionHeader } from "./FormComponents";

const ProjectsForm = ({ data, updateData }) => {
  const projects = data.projects || [];

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ ...data, projects: updated });
  };

  const addProject = () => {
    updateData({
      ...data,
      projects: [{ name: "", description: "", tech_stack: "", start_date: "", end_date: "", live_link: "", github_link: "" }, ...projects]
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <SectionHeader title="Projects" subtitle="Showcase your best work" />
        <button onClick={addProject} className="btn-secondary text-xs px-3 py-1 bg-gray-800 text-white rounded">
          + Add
        </button>
      </div>
      <div className="space-y-8">
        {projects.map((proj, idx) => (
          <div key={idx} className="relative pl-4 border-l-2 border-blue-100">
             <div className="space-y-3">
                <Input label="Project Name" value={proj.name} onChange={(v) => updateProject(idx, "name", v)} />
                <TextArea label="Description" value={proj.description} onChange={(v) => updateProject(idx, "description", v)} rows={2} />
                <Input label="Tech Stack (comma separated)" value={proj.tech_stack} onChange={(v) => updateProject(idx, "tech_stack", v)} placeholder="React, Laravel, AWS" />
                <div className="grid grid-cols-2 gap-3">
                    <Input label="Live URL" value={proj.live_link} onChange={(v) => updateProject(idx, "live_link", v)} />
                    <Input label="GitHub URL" value={proj.github_link} onChange={(v) => updateProject(idx, "github_link", v)} />
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProjectsForm;