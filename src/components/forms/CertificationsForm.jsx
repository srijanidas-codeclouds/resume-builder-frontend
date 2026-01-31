import React from "react";

const CertificationsForm = ({ data, updateData }) => {
  const certifications = data.certifications || [];

  const handleAdd = () => {
    updateData({
      ...data,
      certifications: [
        ...certifications,
        { title: "", issuer: "", issued_date: "" },
      ],
    });
  };

  const handleRemove = (index) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    updateData({ ...data, certifications: newCertifications });
  };

  const handleChange = (index, field, value) => {
    const newCertifications = [...certifications];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    updateData({ ...data, certifications: newCertifications });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add your certifications and licenses.
        </p>
        <button
          onClick={handleAdd}
          className="h-8 px-3 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] hover:bg-[#4F46E5]/20 text-xs font-bold transition-all flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Add New
        </button>
      </div>

      {certifications.length === 0 && (
        <div className="py-8 text-center">
          <div className="inline-flex items-center justify-center size-12 rounded-full bg-gray-100 dark:bg-white/5 mb-3 text-gray-400">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <p className="text-sm text-gray-500">No certifications added yet.</p>
        </div>
      )}

      {certifications.map((cert, index) => (
        <div
          key={index}
          className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex flex-col gap-4 relative group"
        >
          {/* Header & Delete */}
          <div className="flex justify-between items-start">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Certification #{index + 1}
            </h4>
            <button
              onClick={() => handleRemove(index)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>

          {/* Fields */}
          <div className="grid gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Certification Name
              </label>
              <input
                type="text"
                value={cert.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                placeholder="e.g. AWS Certified Solutions Architect"
                className="w-full h-9 px-3 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-sm focus:ring-2 focus:ring-[#4F46E5] outline-none dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleChange(index, "issuer", e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full h-9 px-3 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-sm focus:ring-2 focus:ring-[#4F46E5] outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Date Issued
                </label>
                <input
                  type="text"
                  value={cert.issued_date}
                  onChange={(e) => handleChange(index, "issued_date", e.target.value)}
                  placeholder="e.g. 2023"
                  className="w-full h-9 px-3 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-sm focus:ring-2 focus:ring-[#4F46E5] outline-none dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationsForm;