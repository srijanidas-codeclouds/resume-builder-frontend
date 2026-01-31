import { useState } from "react";
import { Input, TextArea, SectionHeader, DatePicker } from "./FormComponents";

const ExperienceForm = ({ data, updateData }) => {
  const experiences = data.experiences || [];

  const addExperience = () => {
    updateData({
      ...data,
      experiences: [
        {
          organization: "",
          position: "",
          description: "",
          start_date: "",
          end_date: "",
          is_current: false,
        },
        ...experiences,
      ],
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ ...data, experiences: updated });
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    updateData({ ...data, experiences: updated });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <SectionHeader title="Experience" subtitle="Your work history" />
        <button
          onClick={addExperience}
          className="text-xs font-bold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">add</span> Add
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm group hover:border-blue-300 transition-all">
            <div className="flex justify-between mb-3">
              <h4 className="font-bold text-sm text-gray-700">
                {exp.organization || "New Position"}
              </h4>
              <button
                onClick={() => removeExperience(idx)}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Input
                label="Company / Organization"
                value={exp.organization}
                onChange={(v) => updateExperience(idx, "organization", v)}
              />
              <Input
                label="Position Title"
                value={exp.position}
                onChange={(v) => updateExperience(idx, "position", v)}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Start Date"
                  type="date"
                  value={exp.start_date}
                  onChange={(v) => updateExperience(idx, "start_date", v)}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={exp.end_date}
                  disabled={exp.is_current}
                  onChange={(v) => updateExperience(idx, "end_date", v)}
                />
              </div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.is_current}
                  onChange={(e) => updateExperience(idx, "is_current", e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                I currently work here
              </label>
              <TextArea
                label="Description"
                value={exp.description}
                onChange={(v) => updateExperience(idx, "description", v)}
                rows={3}
              />
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm italic">
            No experience added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;