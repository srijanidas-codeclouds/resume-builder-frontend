import React from "react";
import { Input, SectionHeader, DatePicker } from "./FormComponents";

const EducationForm = ({ data, updateData }) => {
  const education = data.education || [];

  const addEducation = () => {
    updateData({
      ...data,
      education: [
        {
          institution: "",
          degree: "",
          field: "", // optional based on your PHP resource
          start_date: "",
          end_date: "",
          grade: "",
        },
        ...education,
      ],
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ ...data, education: updated });
  };

  const removeEducation = (index) => {
    const updated = education.filter((_, i) => i !== index);
    updateData({ ...data, education: updated });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <SectionHeader title="Education" subtitle="Academic background" />
        <button
          onClick={addEducation}
          className="text-xs font-bold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">add</span> Add
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm group hover:border-blue-300 transition-all">
            <div className="flex justify-between mb-3">
              <h4 className="font-bold text-sm text-gray-700 truncate pr-4">
                {edu.institution || "New School"}
              </h4>
              <button
                onClick={() => removeEducation(idx)}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>

            <div className="space-y-3">
              <Input
                label="Institution / University"
                value={edu.institution}
                onChange={(v) => updateEducation(idx, "institution", v)}
                placeholder="e.g. Harvard University"
              />
              <Input
                label="Degree"
                value={edu.degree}
                onChange={(v) => updateEducation(idx, "degree", v)}
                placeholder="e.g. Bachelor of Science"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <DatePicker
                  label="Start Date"
                  value={edu.start_date}
                  onChange={(v) => updateEducation(idx, "start_date", v)}
                />
                <DatePicker
                  label="End Date"
                  value={edu.end_date}
                  onChange={(v) => updateEducation(idx, "end_date", v)}
                />
              </div>

              <Input
                label="Grade / GPA"
                value={edu.grade}
                onChange={(v) => updateEducation(idx, "grade", v)}
                placeholder="e.g. 3.8/4.0"
              />
            </div>
          </div>
        ))}
        {education.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm italic">
            No education history added.
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationForm;