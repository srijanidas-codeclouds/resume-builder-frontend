// src/components/Template2.jsx
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  Page as PDFPage,
  View as PDFView,
  Text as PDFText,
  Link as PDFLink,
  StyleSheet as PDFStyleSheet,
} from "@react-pdf/renderer";

// Helper
export function formatYearMonth(yearMonth) {
  return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
}

// --- PDF Styles (ATS Optimized) ---
const pdfStyles = PDFStyleSheet.create({
  page: {
    paddingVertical: 30,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#1f2937",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottomWidth: 2, // Slightly thicker for accent
    paddingBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  designation: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  contactItem: {
    fontSize: 9,
  },
  link: {
    textDecoration: "none",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingBottom: 2,
  },
  block: {
    marginBottom: 10,
  },
  blockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 2,
  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 10,
    color: "#374151",
    fontWeight: "bold",
  },
  date: {
    fontSize: 9,
    color: "#6b7280",
    fontStyle: "italic",
  },
  description: {
    fontSize: 10,
    color: "#374151",
    marginLeft: 10,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 1,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillItem: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 9,
    borderRadius: 2,
  },
});

const Template2 = ({ resumeData = {}, forPdf = false, containerWidth }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    languages = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [],
    accentColor = "#2563eb",
  } = resumeData;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(1100);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!forPdf && resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
      if (containerWidth > 0) {
        setScale(containerWidth / resumeRef.current.offsetWidth);
      }
    }
  }, [containerWidth, forPdf]);

  const EPage = forPdf ? PDFPage : "div";
  const EView = forPdf ? PDFView : "div";
  const EText = forPdf ? PDFText : "p";
  const ELink = forPdf ? PDFLink : "a";

  const renderBullets = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => (
      <EView key={i} style={pdfStyles.bulletPoint}>
        <EText style={[pdfStyles.bullet, { color: accentColor }]}>•</EText>
        <EText style={{ flex: 1 }}>{line}</EText>
      </EView>
    ));
  };

  if (forPdf) {
    return (
      <EPage size="A4" style={pdfStyles.page}>
        <EView style={[pdfStyles.header, { borderBottomColor: accentColor }]}>
          <EText style={[pdfStyles.name, { color: accentColor }]}>{profileInfo.fullName}</EText>
          <EText style={pdfStyles.designation}>{profileInfo.designation}</EText>
          <EView style={pdfStyles.contactRow}>
            {contactInfo.phone && <EText style={pdfStyles.contactItem}>{contactInfo.phone}</EText>}
            {contactInfo.email && (
              <ELink src={`mailto:${contactInfo.email}`} style={[pdfStyles.contactItem, { color: accentColor }]}>
                {contactInfo.email}
              </ELink>
            )}
            {contactInfo.linkedin && (
              <ELink src={contactInfo.linkedin} style={[pdfStyles.contactItem, { color: accentColor }]}>
                LinkedIn
              </ELink>
            )}
          </EView>
        </EView>

        {/* SUMMARY */}
        {profileInfo.summary && (
          <EView style={pdfStyles.section}>
            <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>Summary</EText>
            <EText style={{ fontSize: 10, lineHeight: 1.4 }}>{profileInfo.summary}</EText>
          </EView>
        )}

        {/* EXPERIENCE */}
        {workExperience.length > 0 && (
          <EView style={pdfStyles.section}>
            <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>Experience</EText>
            {workExperience.map((exp, i) => (
              <EView key={i} style={pdfStyles.block}>
                <EView style={pdfStyles.blockHeader}>
                  <EView>
                    <EText style={pdfStyles.title}>{exp.title}</EText>
                    <EText style={pdfStyles.subtitle}>{exp.company}</EText>
                  </EView>
                  <EText style={pdfStyles.date}>{formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}</EText>
                </EView>
                <EView style={pdfStyles.description}>{renderBullets(exp.description)}</EView>
              </EView>
            ))}
          </EView>
        )}

        {/* PROJECTS */}
{projects.length > 0 && (
  <EView style={pdfStyles.section}>
    <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>
      Projects
    </EText>
    {projects.map((proj, i) => (
      <EView key={i} style={pdfStyles.block}>
        <EView style={{ flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 2 }}>
          <EText style={pdfStyles.title}>{proj.title}</EText>
          {proj.liveDemo && (
            <ELink src={proj.liveDemo} style={[pdfStyles.link, { fontSize: 9, color: accentColor }]}>
              [Live]
            </ELink>
          )}
          {proj.github && (
            <ELink src={proj.github} style={[pdfStyles.link, { fontSize: 9, color: accentColor }]}>
              [Code]
            </ELink>
          )}
        </EView>
        <EText style={{ fontSize: 10, lineHeight: 1.4 }}>{proj.description}</EText>
      </EView>
    ))}
  </EView>
)}

{/* EDUCATION */}
{education.length > 0 && (
  <EView style={pdfStyles.section}>
    <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>
      Education
    </EText>
    {education.map((edu, i) => (
      <EView key={i} style={pdfStyles.block}>
        <EView style={pdfStyles.blockHeader}>
          <EView>
            <EText style={pdfStyles.title}>{edu.institution}</EText>
            <EText style={pdfStyles.subtitle}>{edu.degree}</EText>
          </EView>
          <EView style={{ alignItems: "flex-end" }}>
            <EText style={pdfStyles.date}>
              {formatYearMonth(edu.startDate)} – {formatYearMonth(edu.endDate)}
            </EText>
            {edu.gpa && <EText style={pdfStyles.date}>GPA: {edu.gpa}</EText>}
          </EView>
        </EView>
      </EView>
    ))}
  </EView>
)}

{/* CERTIFICATIONS & LANGUAGES */}
{(certifications.length > 0 || languages.length > 0) && (
  <EView style={{ flexDirection: "row", gap: 20 }}>
    {certifications.length > 0 && (
      <EView style={{ flex: 1 }}>
        <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>
          Certifications
        </EText>
        {certifications.map((c, i) => (
          <EView key={i} style={{ flexDirection: "row", marginBottom: 2 }}>
            <EText style={{ color: accentColor, width: 10, fontSize: 10 }}>•</EText>
            <EText style={{ fontSize: 9 }}>
              {c.name} ({c.issueDate})
            </EText>
          </EView>
        ))}
      </EView>
    )}
    {languages.length > 0 && (
      <EView style={{ flex: 1 }}>
        <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>
          Languages
        </EText>
        <EView style={pdfStyles.skillList}>
          {languages.map((l, i) => (
            <EText key={i} style={{ fontSize: 9 }}>
              {l.name} {l.progress ? `(${l.progress})` : ""}
            </EText>
          ))}
        </EView>
      </EView>
    )}
  </EView>
)}

        {/* SKILLS */}
        {skills.length > 0 && (
          <EView style={pdfStyles.section}>
            <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>Skills</EText>
            <EView style={pdfStyles.skillList}>
              {skills.map((s, i) => (
                <EText key={i} style={[pdfStyles.skillItem, { backgroundColor: accentColor + '15', color: accentColor }]}>
                  {s.name}
                </EText>
              ))}
            </EView>
          </EView>
        )}
      </EPage>
    );
  }

  // --- DOM Preview (HTML) ---
  return (
    <div
      ref={resumeRef}
      className="bg-white text-gray-900 mx-auto shadow-lg print:shadow-none"
      style={{
        width: containerWidth > 0 ? `${baseWidth}px` : "210mm",
        minHeight: "297mm",
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        padding: "40px 50px",
      }}
    >
      <header className="text-center border-b-2 pb-6 mb-6" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-1" style={{ color: accentColor }}>
          {profileInfo.fullName}
        </h1>
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-4">
          {profileInfo.designation}
        </h2>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            {contactInfo.phone && <span className="text-gray-600">{contactInfo.phone}</span>}
            {contactInfo.email && (
                <a href={`mailto:${contactInfo.email}`} style={{ color: accentColor }} className="hover:underline">{contactInfo.email}</a>
            )}
            {contactInfo.linkedin && (
                <a href={contactInfo.linkedin} style={{ color: accentColor }} className="hover:underline">LinkedIn</a>
            )}
             {contactInfo.github && (
                <a href={contactInfo.github} style={{ color: accentColor }} className="hover:underline">GitHub</a>
            )}
        </div>
      </header>

      {profileInfo.summary && (
        <section className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3" style={{ color: accentColor, borderColor: accentColor }}>
            Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{profileInfo.summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4" style={{ color: accentColor, borderColor: accentColor }}>
            Experience
          </h3>
          <div className="space-y-6">
            {workExperience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-gray-900 text-base">{exp.title}</span>
                    <span className="text-gray-400 mx-2">|</span>
                    <span className="font-semibold text-gray-700">{exp.company}</span>
                  </div>
                  {/* if end date is present */}
                  {exp.endDate && <span className="text-xs text-gray-500 italic">{formatYearMonth(exp.endDate)}</span>}
                  {/* if start and end dates are the same */}
                  {exp.startDate === exp.endDate ? (
                    <span className="text-xs text-gray-500 italic">{formatYearMonth(exp.startDate)}</span>
                  ) : (
                    <span className="text-xs text-gray-500 italic">
                      {formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}
                    </span>
                  )}
                </div>
                <ul className="list-none ml-5 text-sm text-gray-700 space-y-1">
                  {exp.description?.split("\n").map((line, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2" style={{ color: accentColor }}>•</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4" 
              style={{ color: accentColor, borderColor: accentColor }}>
            Projects
          </h3>
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx}>
                 <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-gray-900">{proj.title}</h4>
                    <div className="flex gap-2 text-xs">
                        {proj.liveDemo && (
                          <a href={proj.liveDemo} className="hover:underline" style={{ color: accentColor }}>
                            Live Demo
                          </a>
                        )}
                        {proj.github && (
                          <a href={proj.github} className="hover:underline" style={{ color: accentColor }}>
                            GitHub
                          </a>
                        )}
                    </div>
                 </div>
                 <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4"
              style={{ color: accentColor, borderColor: accentColor }}>
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-900">{edu.institution}</div>
                  <div className="text-sm text-gray-700">{edu.degree}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 italic">
                    {formatYearMonth(edu.startDate)} – {formatYearMonth(edu.endDate)}
                  </div>
                  {edu.gpa && <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two Column Bottom: Certs + Languages */}
      <div className="grid grid-cols-2 gap-8">
          {certifications.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
                  style={{ color: accentColor, borderColor: accentColor }}>
                Certifications
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {certifications.map((cert, idx) => (
                   <li key={idx} className="flex items-start">
                     <span className="mr-2" style={{ color: accentColor }}>•</span>
                     <span>{cert.name} <span className="text-gray-500 text-xs">({cert.issueDate})</span></span>
                   </li>
                ))}
              </ul>
            </section>
          )}

           {languages.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3"
                  style={{ color: accentColor, borderColor: accentColor }}>
                Languages
              </h3>
               <div className="flex flex-wrap gap-2">
                {languages.map((lang, idx) => (
                   <span key={idx} className="text-sm text-gray-700 border-r pr-2 last:border-0 mr-2"
                         style={{ borderRightColor: `${accentColor}40` }}>
                      {lang.name} <span className="text-gray-500 text-xs">({lang.progress || lang.level})</span>
                   </span>
                ))}
              </div>
            </section>
          )}
      </div>

      {skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3" style={{ color: accentColor, borderColor: accentColor }}>
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 rounded text-xs font-medium border" 
                    style={{ backgroundColor: accentColor + '15', color: accentColor, borderColor: accentColor + '30' }}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Template2;