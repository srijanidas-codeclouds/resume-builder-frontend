import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

// Import react-pdf primitives
import {
  Page as PDFPage,
  View as PDFView,
  Text as PDFText,
  Link as PDFLink,
  StyleSheet as PDFStyleSheet,
} from "@react-pdf/renderer";

export function formatYearMonth(yearMonth) {
  if (!yearMonth) return "";
  if (yearMonth === "Present") return "Present";
  return moment(yearMonth, "YYYY-MM").format("MMM YYYY");
}

const pdfStyles = PDFStyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica", fontSize: 10, lineHeight: 1.5, color: "#333" },
  header: { marginBottom: 20, borderBottomWidth: 2, paddingBottom: 10 },
  name: { fontSize: 24, marginBottom: 12, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 },
  designation: { fontSize: 12, color: "#4b5563", marginTop: 4, textTransform: "uppercase" },
  summary: { marginTop: 8, fontSize: 10, color: "#374151" },
  container: { flexDirection: "row" },
  sidebar: { width: "32%", paddingRight: 15, borderRightWidth: 1, borderRightColor: "#e5e7eb" },
  main: { width: "68%", paddingLeft: 15 },
  section: { marginBottom: 15 },
  sectionTitle: { 
    fontSize: 11, 
    fontWeight: "bold", 
    textTransform: "uppercase", 
    borderBottomWidth: 1, 
    marginBottom: 8, 
    paddingBottom: 2 
  },
  itemBlock: { marginBottom: 8 },
  itemTitle: { fontSize: 10, fontWeight: "bold", color: "#000" },
  itemSubtitle: { fontSize: 9, color: "#4b5563", fontStyle: "italic" }, 
  itemDate: { fontSize: 9, color: "#6b7280" },
  text: { fontSize: 10, color: "#374151" },
  bulletPoint: { flexDirection: "row", marginBottom: 2 },
  bullet: { width: 10, fontSize: 10 },
  bulletContent: { flex: 1, fontSize: 10 },
  link: { textDecoration: "none" },
  skillTag: { 
    backgroundColor: "#f3f4f6", 
    paddingHorizontal: 4, 
    paddingVertical: 2, 
    borderRadius: 2, 
    fontSize: 9, 
    marginRight: 4, 
    marginBottom: 4 
  },
  techStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    gap: 4,
  },
  techTag: {
    fontSize: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
});

const Template1 = ({ resumeData = {}, containerWidth = 0, forPdf = false }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [],
    languages = [],
    interests = [],
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
  const EText = forPdf ? PDFText : "div";
  const ELink = forPdf ? PDFLink : "a";

  const renderBullets = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => (
      <EView key={i} style={pdfStyles.bulletPoint}>
        <EText style={[pdfStyles.bullet, { color: accentColor }]}>•</EText>
        <EText style={pdfStyles.bulletContent}>{line}</EText>
      </EView>
    ));
  };

  // --- PDF Structure ---
  if (forPdf) {
    return (
      <EPage size="A4" style={pdfStyles.page}>
        <EView style={[pdfStyles.header, { borderBottomColor: accentColor }]}>
          <EText style={[pdfStyles.name, { color: accentColor }]}>{profileInfo.fullName}</EText>
          <EText style={pdfStyles.designation}>{profileInfo.designation}</EText>
          {profileInfo.summary && (
            <EText style={pdfStyles.summary}>{profileInfo.summary}</EText>
          )}
        </EView>

        <EView style={pdfStyles.container}>
          <EView style={pdfStyles.sidebar}>
            <EView style={pdfStyles.section}>
              <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>Contact</EText>
              <EView style={{ gap: 4 }}>
                {contactInfo.location && (
                  <EText style={pdfStyles.text}>{contactInfo.location}</EText>
                )}
                {contactInfo.phone && (
                  <EText style={pdfStyles.text}>{contactInfo.phone}</EText>
                )}
                {contactInfo.email && (
                  <ELink src={`mailto:${contactInfo.email}`} style={[pdfStyles.link, { color: accentColor }]}>
                    {contactInfo.email}
                  </ELink>
                )}
                {contactInfo.linkedin && (
                  <ELink src={contactInfo.linkedin} style={[pdfStyles.link, { color: accentColor }]}>
                    LinkedIn
                  </ELink>
                )}
                {contactInfo.github && (
                  <ELink src={contactInfo.github} style={[pdfStyles.link, { color: accentColor }]}>
                    GitHub
                  </ELink>
                )}
                {contactInfo.website && (
                  <ELink src={contactInfo.website} style={[pdfStyles.link, { color: accentColor }]}>
                    Portfolio
                  </ELink>
                )}
              </EView>
            </EView>

            {education.length > 0 && (
              <EView style={pdfStyles.section}>
                <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>Education</EText>
                {education.map((edu, i) => (
                  <EView key={i} style={pdfStyles.itemBlock}>
                    <EText style={pdfStyles.itemTitle}>{edu.institution}</EText>
                    <EText style={pdfStyles.itemSubtitle}>{edu.degree}</EText>
                    <EText style={pdfStyles.itemDate}>
                      {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                    </EText>
                    {edu.gpa && <EText style={pdfStyles.text}>GPA: {edu.gpa}</EText>}
                  </EView>
                ))}
              </EView>
            )}

            {skills.length > 0 && (
              <EView style={pdfStyles.section}>
                <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>Skills</EText>
                <EView style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {skills.map((s, i) => (
                    <EText key={i} style={[pdfStyles.skillTag, { backgroundColor: accentColor + '20', color: accentColor }]}>
                      {s.name}
                    </EText>
                  ))}
                </EView>
              </EView>
            )}

            {languages.length > 0 && (
              <EView style={pdfStyles.section}>
                <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>Languages</EText>
                {languages.map((lang, i) => (
                  <EText key={i} style={pdfStyles.text}>
                    {lang.name} {lang.level ? `(${lang.level})` : ""}
                  </EText>
                ))}
              </EView>
            )}

            {certifications.length > 0 && (
              <EView style={pdfStyles.section}>
                <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>Certifications</EText>
                {certifications.map((cert, i) => (
                  <EView key={i} style={{ marginBottom: 4 }}>
                    <EText style={pdfStyles.itemTitle}>{cert.name}</EText>
                    <EText style={pdfStyles.text}>{cert.issuer}</EText>
                    {cert.issueDate && (
                      <EText style={pdfStyles.itemDate}>{cert.issueDate}</EText>
                    )}
                  </EView>
                ))}
              </EView>
            )}
          </EView>

          <EView style={pdfStyles.main}>
            {workExperience.length > 0 && (
              <EView style={pdfStyles.section}>
                <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>Professional Experience</EText>
                {workExperience.map((exp, i) => (
                  <EView key={i} style={pdfStyles.itemBlock}>
                    <EText style={pdfStyles.itemTitle}>{exp.title}</EText>
                    <EView style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 2}}>
                      <EText style={pdfStyles.itemSubtitle}>
                        {exp.company}{exp.location ? ` | ${exp.location}` : ""}
                      </EText>
                      <EText style={pdfStyles.itemDate}>
                        {formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}
                      </EText>
                    </EView>
                    {renderBullets(exp.description)}
                  </EView>
                ))}
              </EView>
            )}

            {projects.length > 0 && (
              <EView style={pdfStyles.section}>
                <EText style={[pdfStyles.sectionTitle, { borderBottomColor: accentColor, color: accentColor }]}>Projects</EText>
                {projects.map((proj, i) => (
                  <EView key={i} style={pdfStyles.itemBlock}>
                    <EView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <EText style={pdfStyles.itemTitle}>{proj.title}</EText>
                      <EView style={{ flexDirection: "row", gap: 8 }}>
                        {proj.liveDemo && (
                          <ELink src={proj.liveDemo} style={[pdfStyles.link, { fontSize: 8, color: accentColor }]}>
                            Live
                          </ELink>
                        )}
                        {proj.github && (
                          <ELink src={proj.github} style={[pdfStyles.link, { fontSize: 8, color: accentColor }]}>
                            Code
                          </ELink>
                        )}
                      </EView>
                    </EView>
                    <EText style={[pdfStyles.text, { marginTop: 2 }]}>{proj.description}</EText>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <EView style={pdfStyles.techStack}>
                        {proj.technologies.map((tech, idx) => (
                          <EText 
                            key={idx} 
                            style={[pdfStyles.techTag, { backgroundColor: accentColor + '15', color: accentColor }]}
                          >
                            {tech}
                          </EText>
                        ))}
                      </EView>
                    )}
                  </EView>
                ))}
              </EView>
            )}
          </EView>
        </EView>
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
        padding: "35px 40px",
      }}
    >
      <div className="pb-6 mb-6 border-b-2" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-3" style={{ color: accentColor }}>
          {profileInfo.fullName}
        </h1>
        <h2 className="text-base font-medium text-gray-600 uppercase tracking-wide">
          {profileInfo.designation}
        </h2>
        {profileInfo.summary && (
          <p className="text-sm text-gray-700 mt-4 leading-relaxed">{profileInfo.summary}</p>
        )}
      </div>

      <div className="flex gap-8">
        <aside className="w-1/3 pr-6 border-r border-gray-200">
          <section className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" 
                style={{ color: accentColor, borderColor: accentColor }}>
              Contact
            </h3>
            <div className="text-sm flex flex-col gap-y-2">
              {contactInfo.phone && <p className="text-gray-700">{contactInfo.phone}</p>}
              
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="hover:underline break-all"
                  style={{ color: accentColor }}
                >
                  {contactInfo.email}
                </a>
              )}

              {contactInfo.location && (
                <p className="text-gray-700">{contactInfo.location}</p>
              )}

              {contactInfo.linkedin && (
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: accentColor }}
                >
                  LinkedIn
                </a>
              )}

              {contactInfo.github && (
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: accentColor }}
                >
                  GitHub
                </a>
              )}

              {contactInfo.website && (
                <a
                  href={contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: accentColor }}
                >
                  Portfolio
                </a>
              )}
            </div>
          </section>

          {education.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" 
                  style={{ color: accentColor, borderColor: accentColor }}>
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-gray-800 text-sm">{edu.institution}</div>
                    <div className="text-sm text-gray-600 italic">{edu.degree}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {formatYearMonth(edu.startDate)} – {formatYearMonth(edu.endDate)}
                    </div>
                    {edu.gpa && <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" 
                  style={{ color: accentColor, borderColor: accentColor }}>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 text-xs rounded font-medium" 
                        style={{ backgroundColor: accentColor + '15', color: accentColor }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" 
                  style={{ color: accentColor, borderColor: accentColor }}>
                Languages
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {languages.map((lang, i) => (
                  <li key={i}>
                    <span className="font-medium">{lang.name}</span>{" "}
                    <span className="text-gray-400 text-xs">
                      {lang.level ? `(${lang.level})` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" 
                  style={{ color: accentColor, borderColor: accentColor }}>
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i}>
                    <div className="font-bold text-sm text-gray-800">{cert.name}</div>
                    <div className="text-xs text-gray-600">{cert.issuer}</div>
                    {cert.issueDate && (
                      <div className="text-xs text-gray-500">{cert.issueDate}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        <main className="flex-1">
          {workExperience.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider pb-1 mb-4 border-b-2" 
                  style={{ color: accentColor, borderColor: accentColor }}>
                Professional Experience
              </h3>
              {workExperience.map((exp, i) => (
                <div key={i} className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-base font-bold">{exp.title}</h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </div>
                  <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1 leading-relaxed">
                    {exp.description?.split("\n").map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider pb-1 mb-4 border-b-2" 
                  style={{ color: accentColor, borderColor: accentColor }}>
                Key Projects
              </h3>
              <div className="space-y-5">
                {projects.map((proj, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-gray-800">{proj.title}</h4>
                      <div className="flex gap-2 text-xs">
                        {proj.liveDemo && (
                          <a href={proj.liveDemo} className="hover:underline" style={{ color: accentColor }}>
                            Live Demo
                          </a>
                        )}
                        {proj.github && (
                          <a href={proj.github} className="hover:underline" style={{ color: accentColor }}>
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {proj.technologies.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 text-xs rounded font-medium"
                            style={{ backgroundColor: accentColor + '10', color: accentColor }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Template1;