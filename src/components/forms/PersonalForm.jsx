import { useState } from "react";
import { Input, TextArea, SectionHeader } from "./FormComponents";

const PersonalForm = ({ data, updateData }) => {
  const [errors, setErrors] = useState({});
  const validateField = (field, value) => {
  let error = "";

  if (field === "full_name" && value?.length < 2) {
    error = "Name must be at least 2 characters";
  }

  if (field === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) {
    error = "Invalid email address";
  }

  if (field === "summary" && value?.length > 1500) {
    error = "Summary cannot exceed 1500 characters";
  }

  setErrors((prev) => ({
    ...prev,
    [field]: error,
  }));
};

  const handleChange = (field, value, parent = null) => {
    if (parent) {
      updateData({
        ...data,
        [parent]: { ...data[parent], [field]: value },
      });
    } else {
      updateData({
      ...data,
      [field]: value,
    });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        title="Personal Details"
        subtitle="Your name and contact info"
      />

      {/* =====================
          PERSONAL DETAILS
      ===================== */}
      <div className="space-y-4">
        <Input
          label="Full Name"
          value={data.personal_details?.full_name || ""}
          onChange={(v) =>
            handleChange("full_name", v, "personal_details")
          }
          error={errors.full_name}
          placeholder="e.g. John Doe"
        />

        <Input
          label="Designation / Job Title"
          value={data.personal_details?.designation || ""}
          onChange={(v) =>
            handleChange("designation", v, "personal_details")
          }
          placeholder="e.g. Senior Software Engineer"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={data.personal_details?.email || ""}
            onChange={(v) =>
              handleChange("email", v, "personal_details")
            }
            error={errors.email}
          />

          <Input
            label="Phone"
            value={data.personal_details?.phone || ""}
            onChange={(v) =>
              handleChange("phone", v, "personal_details")
            }
          />
        </div>

        <Input
          label="Location"
          value={data.personal_details?.location || ""}
          onChange={(v) =>
            handleChange("location", v, "personal_details")
          }
          placeholder="City, Country"
        />

        {/* =====================
            SUMMARY (ROOT LEVEL)
        ===================== */}
        <TextArea
          label="Professional Summary"
          value={data.summary || ""}
          onChange={(v) => handleChange("summary", v)}
          rows={5}
          error={errors.summary}
          placeholder="Briefly describe your professional background..."
        />
      </div>

      {/* =====================
    SOCIAL LINKS
===================== */}
<div className="pt-4 border-t border-gray-100">
  <SectionHeader
    title="Social Links"
    subtitle="Where can people find you?"
  />

  <div className="grid grid-cols-1 gap-4 mt-4">
    <Input
      label="LinkedIn URL"
      value={data.socials?.linkedIn || ""}
      onChange={(v) => handleChange("linkedIn", v, "socials")}
      icon="link"
    />

    <Input
      label="GitHub URL"
      value={data.socials?.github || ""}
      onChange={(v) => handleChange("github", v, "socials")}
      icon="code"
    />

    <Input
      label="Portfolio URL"
      value={data.socials?.portfolio || ""}
      onChange={(v) => handleChange("portfolio", v, "socials")}
      icon="language"
    />
  </div>
</div>

    </div>
  );
};

export default PersonalForm;