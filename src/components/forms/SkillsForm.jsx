import React, { useState } from "react";
import { SectionHeader, Input } from "./FormComponents";

const SkillsForm = ({ data, updateData }) => {
  const skills = data.skills || [];
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    
    // Add to array
    updateData({
      ...data,
      skills: [...skills, newSkill.trim()],
    });
    setNewSkill("");
  };

  const removeSkill = (indexToRemove) => {
    updateData({
      ...data,
      skills: skills.filter((_, idx) => idx !== indexToRemove),
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader title="Skills" subtitle="Technologies & Core Competencies" />

      {/* Add Skill Input */}
      <form onSubmit={handleAddSkill} className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Type a skill (e.g. React) and hit Enter"
            value={newSkill}
            onChange={setNewSkill}
            icon="bolt"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-lg font-bold text-sm hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2 pt-2">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="group flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200 hover:bg-white hover:border-red-200 transition-colors"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(idx)}
              className="text-gray-400 hover:text-red-500 flex items-center"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}
        
        {skills.length === 0 && (
          <p className="text-sm text-gray-400 italic w-full text-center py-4">
            No skills added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;