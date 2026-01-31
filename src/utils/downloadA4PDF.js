import { pdf, Document } from "@react-pdf/renderer";
import React from "react";

// PDF-capable layouts (already converted by you)
import ClassicLayout from "../templates/ClassicLayout";
import ModernLayout from "../templates/ModernLayout";
import ProfessionalLayout from "../templates/ProfessionalLayout";

/**
 * Central template registry
 * Add new templates here once, use everywhere
 */
const PDF_TEMPLATE_MAP = {
  classic: ClassicLayout,
  modern: ModernLayout,
  professional: ProfessionalLayout,
};

/**
 * Download resume as A4 PDF using react-pdf
 */
const downloadA4PDF = async ({ template, resumeData }) => {
  const TemplateComponent = PDF_TEMPLATE_MAP[template];

  if (!TemplateComponent) {
    console.error(`[PDF] Unknown template: ${template}`);
    return;
  }

  const blob = await pdf(
  React.createElement(
    Document,
    null,
    React.createElement(TemplateComponent, {
      resumeData,
      forPdf: true,
    })
  )
).toBlob();

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download =
    `${resumeData?.profileInfo?.fullName || "resume"}.pdf`;

  link.click();
  URL.revokeObjectURL(url);
};

export default downloadA4PDF;
