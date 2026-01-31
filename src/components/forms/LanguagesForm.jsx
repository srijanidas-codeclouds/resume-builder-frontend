import React, { useState } from "react";
import { SectionHeader, Input } from "./FormComponents";

const LanguagesForm = ({ data, updateData }) => {
  const languages = data.languages || [];
  const [newName, setNewName] = useState("");
  const [newLevel, setNewLevel] = useState("intermediate");

  const handleAddLanguage = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    // Add as an object to match Backend validation (name and level)
    updateData({
      ...data,
      languages: [...languages, { name: newName.trim(), level: newLevel }],
    });
    
    setNewName("");
    setNewLevel("intermediate"); // Reset to default
  };

  const removeLanguage = (indexToRemove) => {
    updateData({
      ...data,
      languages: languages.filter((_, idx) => idx !== indexToRemove),
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader title="Languages" subtitle="Communication & Proficiency" />

      {/* Add Language Form */}
      <form onSubmit={handleAddLanguage} className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-[2]">
            <Input
              placeholder="e.g. English, Spanish"
              value={newName}
              onChange={setNewName}
              icon="translate"
            />
          </div>
          <div className="flex-1">
            <select
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              className="w-full h-[42px] px-3 rounded-lg bg-gray-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none text-sm text-gray-700 dark:text-gray-200 transition-all cursor-pointer"
            >
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="fluent">Fluent</option>
              <option value="native">Native</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-lg font-bold text-sm hover:bg-blue-700 transition h-[42px]"
          >
            Add
          </button>
        </div>
      </form>

      {/* Languages List */}
      <div className="flex flex-wrap gap-2 pt-2">
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="group flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-white/10 hover:border-red-200 dark:hover:border-red-900/30 transition-colors"
          >
            <span className="font-medium">{lang.name}</span>
            <span className="text-[10px] uppercase px-1.5 py-0.5 bg-gray-200 dark:bg-white/10 rounded-md text-gray-500 dark:text-gray-400">
              {lang.level}
            </span>
            <button
              onClick={() => removeLanguage(idx)}
              className="text-gray-400 hover:text-red-500 flex items-center ml-1"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}

        {languages.length === 0 && (
          <p className="text-sm text-gray-400 italic w-full text-center py-4">
            No languages added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default LanguagesForm;