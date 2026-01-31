import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  Page as PDFPage,
  View as PDFView,
  Text as PDFText,
  Link as PDFLink,
  Image as PDFImage,
  StyleSheet as PDFStyleSheet,
} from "@react-pdf/renderer";

// ---------- Utils ----------
export function formatYearMonth(yearMonth) {
  return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
}

// ---------- Theme Variables ----------
const THEME = {
  primary: "#111827", // Black/Dark Gray
  accent: "#ea580c", // Orange (matches top bar)
  highlight: "#ffedd5", // Pale Orange (for header backgrounds)
  border: "#000000", // Black border for headers
};

// ---------- PDF Styles ----------
const pdfStyles = PDFStyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#111",
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.4,
    paddingBottom: 30,
  },
  // Top Orange Bar
  topBar: {
    width: "100%",
    height: 15,
    backgroundColor: THEME.accent,
    marginBottom: 25,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  // Columns
  leftColumn: {
    width: "65%",
    paddingRight: 20,
  },
  rightColumn: {
    width: "35%",
  },
  // Headers
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 6,
    marginTop: 10,
    borderBottomWidth: 1, // Visual underline
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
  // The subtle highlight behind section titles
  titleHighlight: {
    backgroundColor: THEME.highlight,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  // Content
  summary: {
    textAlign: "justify",
    marginBottom: 15,
  },
  // Experience Block
  expBlock: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
  },
  companyLine: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 2,
  },
  dateLocation: {
    fontSize: 9,
    fontStyle: "italic",
    color: "#4b5563",
    marginBottom: 2,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 5,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletContent: {
    flex: 1,
  },
  // Sidebar items
  contactItem: {
    marginBottom: 4,
    fontSize: 9,
  },
  contactLabel: {
    fontWeight: "bold",
  },
  skillItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  // Profile Image Area
  photoPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#e5e7eb",
    marginBottom: 20,
    alignSelf: "flex-start", // Aligns to left of sidebar (which is right of page)
  },
  link: {
    color: "#111",
    textDecoration: "none",
  },
});

const Template3 = ({ resumeData = {}, forPdf = false, containerWidth }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    languages = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [],
    interests = [],
  } = resumeData;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(1100);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!forPdf && resumeRef.current) {
      const actualBaseWidth = resumeRef.current.offsetWidth;
      setBaseWidth(actualBaseWidth);
      if (containerWidth > 0) {
        setScale(containerWidth / actualBaseWidth);
      }
    }
  }, [containerWidth, forPdf]);

  // Helpers
  const EPage = forPdf ? PDFPage : "div";
  const EView = forPdf ? PDFView : "div";
  const EText = forPdf ? PDFText : "div";
  const ELink = forPdf ? PDFLink : "a";

  const renderBullets = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => (
      <EView key={i} style={pdfStyles.bulletPoint}>
        <EText style={pdfStyles.bullet}>•</EText>
        <EText style={pdfStyles.bulletContent}>{line}</EText>
      </EView>
    ));
  };

  // ----------------------------------------------------------------------
  // PDF RENDERER
  // ----------------------------------------------------------------------
  if (forPdf) {
    return (
      <EPage size="A4" style={pdfStyles.page}>
        {/* Top Orange Bar */}
        <EView style={pdfStyles.topBar} />

        <EView style={pdfStyles.container}>
          {/* LEFT COLUMN (65%) */}
          <EView style={pdfStyles.leftColumn}>
            {/* Name */}
            <EText style={pdfStyles.name}>{profileInfo.fullName}</EText>

            {/* Summary */}
            {profileInfo.summary && (
              <EView style={{ marginBottom: 15 }}>
                <EView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 4, paddingBottom: 2 }}>
                    <EView style={pdfStyles.titleHighlight}>
                        <EText style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' }}>Professional Summary</EText>
                    </EView>
                </EView>
                <EText style={pdfStyles.summary}>{profileInfo.summary}</EText>
              </EView>
            )}

            {/* Experience */}
            {workExperience.length > 0 && (
              <EView style={{ marginBottom: 15 }}>
                 <EView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 8, paddingBottom: 2 }}>
                    <EView style={pdfStyles.titleHighlight}>
                        <EText style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' }}>Experience</EText>
                    </EView>
                </EView>
                {workExperience.map((exp, i) => (
                  <EView key={i} style={pdfStyles.expBlock}>
                    <EText style={pdfStyles.jobTitle}>
                      {exp.title}
                      {exp.startDate && `, ${formatYearMonth(exp.startDate)} - ${exp.is_current ? 'Current' : formatYearMonth(exp.endDate)}`}
                    </EText>
                    <EText style={pdfStyles.companyLine}>
                      {exp.company} {exp.location ? `- ${exp.location}` : ""}
                    </EText>
                    <EView style={{ marginTop: 2 }}>
                       {renderBullets(exp.description)}
                    </EView>
                  </EView>
                ))}
              </EView>
            )}

            {/* Education */}
            {education.length > 0 && (
              <EView style={{ marginBottom: 15 }}>
                <EView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 8, paddingBottom: 2 }}>
                    <EView style={pdfStyles.titleHighlight}>
                        <EText style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' }}>Education</EText>
                    </EView>
                </EView>
                {education.map((edu, i) => (
                  <EView key={i} style={{ marginBottom: 6 }}>
                    <EText style={pdfStyles.jobTitle}>
                       {edu.degree}
                       {edu.endDate && `, ${moment(edu.endDate).format("YYYY")}`}
                    </EText>
                    <EText style={pdfStyles.companyLine}>{edu.institution}</EText>
                    {edu.gpa && <EText style={{fontSize: 9}}>GPA: {edu.gpa}</EText>}
                  </EView>
                ))}
              </EView>
            )}

             {/* Projects (If any - placed in main column) */}
             {projects.length > 0 && (
              <EView style={{ marginBottom: 15 }}>
                <EView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 8, paddingBottom: 2 }}>
                    <EView style={pdfStyles.titleHighlight}>
                        <EText style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' }}>Projects</EText>
                    </EView>
                </EView>
                {projects.map((proj, i) => (
                  <EView key={i} style={{ marginBottom: 6 }}>
                    <EText style={pdfStyles.jobTitle}>{proj.title}</EText>
                     <EView style={{flexDirection: "row", gap: 5, marginBottom: 2}}>
                        {proj.liveDemo && <ELink src={proj.liveDemo} style={{fontSize: 8, color: '#ea580c'}}>Live Demo</ELink>}
                        {proj.github && <ELink src={proj.github} style={{fontSize: 8, color: '#ea580c'}}>GitHub</ELink>}
                    </EView>
                    <EText style={{ fontSize: 9 }}>{proj.description}</EText>
                  </EView>
                ))}
              </EView>
            )}
          </EView>

          {/* RIGHT COLUMN (35%) */}
          <EView style={pdfStyles.rightColumn}>
            {/* Photo Placeholder (Matches image style) */}
            <EView style={pdfStyles.photoPlaceholder}>
                {/* Logic to render actual image if profileInfo.image exists would go here */}
                {/* For now, it's a gray box as per standard templates if no image */}
                 <EText style={{ fontSize: 8, textAlign: 'center', marginTop: 40, color: '#9ca3af' }}>PHOTO</EText>
            </EView>

            {/* Contact */}
            <EView style={{ marginBottom: 20 }}>
               <EView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 8, paddingBottom: 2 }}>
                    <EView style={pdfStyles.titleHighlight}>
                        <EText style={{ fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Contact</EText>
                    </EView>
                </EView>
                
              {contactInfo.location && (
                <EView style={pdfStyles.contactItem}>
                    <EText style={pdfStyles.contactLabel}>Address:</EText>
                    <EText>{contactInfo.location}</EText>
                </EView>
              )}
              {contactInfo.phone && (
                <EView style={pdfStyles.contactItem}>
                    <EText style={pdfStyles.contactLabel}>Phone:</EText>
                    <EText>{contactInfo.phone}</EText>
                </EView>
              )}
              {contactInfo.email && (
                <EView style={pdfStyles.contactItem}>
                    <EText style={pdfStyles.contactLabel}>Email:</EText>
                    <ELink src={`mailto:${contactInfo.email}`} style={pdfStyles.link}>{contactInfo.email}</ELink>
                </EView>
              )}
               {contactInfo.linkedin && (
                <EView style={pdfStyles.contactItem}>
                    <EText style={pdfStyles.contactLabel}>LinkedIn:</EText>
                    <ELink src={contactInfo.linkedin} style={pdfStyles.link}>LinkedIn Profile</ELink>
                </EView>
              )}
               {contactInfo.website && (
                <EView style={pdfStyles.contactItem}>
                    <EText style={pdfStyles.contactLabel}>Portfolio:</EText>
                    <ELink src={contactInfo.website} style={pdfStyles.link}>Portfolio Link</ELink>
                </EView>
              )}
            </EView>

            {/* Core Qualifications (Skills) */}
            {skills.length > 0 && (
                <EView style={{ marginBottom: 20 }}>
                    <EView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 8, paddingBottom: 2 }}>
                        <EView style={pdfStyles.titleHighlight}>
                            <EText style={{ fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Core Qualifications</EText>
                        </EView>
                    </EView>
                    {skills.map((skill, i) => (
                        <EView key={i} style={pdfStyles.skillItem}>
                            <EText style={{ marginRight: 4 }}>•</EText>
                            <EText>{skill.name}</EText>
                        </EView>
                    ))}
                </EView>
            )}

             {/* Languages */}
             {languages.length > 0 && (
                <EView style={{ marginBottom: 20 }}>
                    <EView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 8, paddingBottom: 2 }}>
                        <EView style={pdfStyles.titleHighlight}>
                            <EText style={{ fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Languages</EText>
                        </EView>
                    </EView>
                    {languages.map((lang, i) => (
                        <EView key={i} style={pdfStyles.skillItem}>
                            <EText style={{ marginRight: 4 }}>•</EText>
                            <EText style={{ fontWeight: 'bold'}}>{lang.name}</EText>
                             {lang.progress && <EText>: {lang.progress}</EText>}
                        </EView>
                    ))}
                </EView>
            )}

             {/* Interests */}
             {interests.length > 0 && (
                <EView style={{ marginBottom: 20 }}>
                    <EView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 8, paddingBottom: 2 }}>
                        <EView style={pdfStyles.titleHighlight}>
                            <EText style={{ fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Interests</EText>
                        </EView>
                    </EView>
                    {interests.map((int, i) => (
                        <EView key={i} style={pdfStyles.skillItem}>
                            <EText style={{ marginRight: 4 }}>•</EText>
                            <EText>{int.name}</EText>
                        </EView>
                    ))}
                </EView>
            )}
             
             {/* Certifications (Mapped to Additional Info area) */}
             {certifications.length > 0 && (
                <EView style={{ marginBottom: 20 }}>
                    <EView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', marginBottom: 8, paddingBottom: 2 }}>
                        <EView style={pdfStyles.titleHighlight}>
                            <EText style={{ fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>Additional Info</EText>
                        </EView>
                    </EView>
                    {certifications.map((cert, i) => (
                        <EView key={i} style={pdfStyles.skillItem}>
                            <EText style={{ marginRight: 4 }}>•</EText>
                            <EText>{cert.name} ({cert.year || cert.issueDate})</EText>
                        </EView>
                    ))}
                </EView>
            )}

          </EView>
        </EView>
      </EPage>
    );
  }

  // ----------------------------------------------------------------------
  // DOM RENDERER (Live Preview)
  // ----------------------------------------------------------------------
  return (
    <div
      ref={resumeRef}
      className="bg-white text-gray-900 mx-auto shadow-lg print:shadow-none font-sans overflow-hidden"
      style={{
        width: containerWidth > 0 ? `${baseWidth}px` : "210mm",
        minHeight: "297mm",
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
      }}
    >
      {/* Top Bar */}
      <div className="h-4 w-full bg-orange-600 mb-8"></div>

      <div className="px-10 pb-10 grid grid-cols-12 gap-8 h-full">
        
        {/* LEFT COLUMN */}
        <div className="col-span-8 pr-4">
          
          {/* Header Name */}
          <div className="border-b-2 border-black pb-2 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">
                {profileInfo.fullName}
            </h1>
            <p className="text-lg font-medium text-gray-600 mt-1 uppercase tracking-widest">
                {profileInfo.designation}
            </p>
          </div>

          {/* Summary */}
          {profileInfo.summary && (
            <div className="mb-8">
               <div className="border-b border-black mb-3 pb-1 flex">
                 <h2 className="text-sm font-bold uppercase tracking-wider bg-orange-100 px-2 py-0.5">
                    Professional Summary
                 </h2>
               </div>
               <p className="text-sm text-gray-700 leading-relaxed text-justify">
                 {profileInfo.summary}
               </p>
            </div>
          )}

          {/* Experience */}
          {workExperience.length > 0 && (
             <div className="mb-8">
               <div className="border-b border-black mb-4 pb-1 flex">
                 <h2 className="text-sm font-bold uppercase tracking-wider bg-orange-100 px-2 py-0.5">
                    Experience
                 </h2>
               </div>
               
               <div className="space-y-6">
                 {workExperience.map((exp, i) => (
                    <div key={i}>
                       <div className="flex justify-between items-baseline font-bold text-sm text-gray-900">
                          <span>{exp.title}</span>
                          <span className="font-normal text-xs text-gray-500 italic">
                             {formatYearMonth(exp.startDate)} - {exp.is_current ? 'Current' : formatYearMonth(exp.endDate)}
                          </span>
                       </div>
                       <div className="text-xs font-bold text-gray-700 mb-2">
                           {exp.company} {exp.location && `- ${exp.location}`}
                       </div>
                       <ul className="list-disc list-outside ml-4 text-xs text-gray-700 space-y-1">
                          {exp.description?.split("\n").map((line, idx) => (
                              <li key={idx}>{line}</li>
                          ))}
                       </ul>
                    </div>
                 ))}
               </div>
             </div>
          )}

          {/* Education */}
          {education.length > 0 && (
             <div className="mb-8">
               <div className="border-b border-black mb-4 pb-1 flex">
                 <h2 className="text-sm font-bold uppercase tracking-wider bg-orange-100 px-2 py-0.5">
                    Education
                 </h2>
               </div>
               <div className="space-y-4">
                 {education.map((edu, i) => (
                    <div key={i}>
                       <div className="text-sm font-bold text-gray-900">
                          {edu.degree}, {moment(edu.endDate).format("YYYY")}
                       </div>
                       <div className="text-sm font-bold text-gray-700">
                          {edu.institution}
                       </div>
                       {edu.gpa && <div className="text-xs text-gray-500 mt-1">GPA: {edu.gpa}</div>}
                    </div>
                 ))}
               </div>
             </div>
          )}
          
          {/* Projects (If needed here) */}
          {projects.length > 0 && (
             <div className="mb-8">
               <div className="border-b border-black mb-4 pb-1 flex">
                 <h2 className="text-sm font-bold uppercase tracking-wider bg-orange-100 px-2 py-0.5">
                    Projects
                 </h2>
               </div>
               <div className="space-y-4">
                 {projects.map((proj, i) => (
                    <div key={i}>
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-gray-900">{proj.title}</span>
                          {proj.liveDemo && <a href={proj.liveDemo} className="text-[10px] text-orange-600 font-bold hover:underline">LIVE</a>}
                          {proj.github && <a href={proj.github} className="text-[10px] text-orange-600 font-bold hover:underline">GITHUB</a>}
                       </div>
                       <p className="text-xs text-gray-700 leading-relaxed">
                          {proj.description}
                       </p>
                    </div>
                 ))}
               </div>
             </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-4">
          
          {/* Profile Photo Placeholder */}
          <div className="w-full aspect-square bg-gray-200 mb-8 flex items-center justify-center text-gray-400 text-xs font-bold tracking-widest">
              PHOTO
          </div>

          {/* Contact */}
          <div className="mb-8">
             <div className="border-b border-black mb-3 pb-1 flex">
                 <h2 className="text-sm font-bold uppercase tracking-wider bg-orange-100 px-2 py-0.5">
                    Contact
                 </h2>
             </div>
             <div className="text-xs text-gray-700 space-y-2">
                {contactInfo.location && (
                    <div><span className="font-bold block text-gray-900">Address:</span> {contactInfo.location}</div>
                )}
                {contactInfo.phone && (
                    <div><span className="font-bold block text-gray-900">Phone:</span> {contactInfo.phone}</div>
                )}
                {contactInfo.email && (
                    <div className="break-words"><span className="font-bold block text-gray-900">Email:</span> {contactInfo.email}</div>
                )}
                {contactInfo.linkedin && (
                    <div><a href={contactInfo.linkedin} className="text-blue-600 hover:underline">LinkedIn Profile</a></div>
                )}
             </div>
          </div>

          {/* Skills (Core Qualifications) */}
          {skills.length > 0 && (
            <div className="mb-8">
                <div className="border-b border-black mb-3 pb-1 flex">
                    <h2 className="text-sm font-bold uppercase tracking-wider bg-orange-100 px-2 py-0.5">
                        Core Qualifications
                    </h2>
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                    {skills.map((skill, i) => (
                        <li key={i}>{skill.name}</li>
                    ))}
                </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-8">
                <div className="border-b border-black mb-3 pb-1 flex">
                    <h2 className="text-sm font-bold uppercase tracking-wider bg-orange-100 px-2 py-0.5">
                        Languages
                    </h2>
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                    {languages.map((lang, i) => (
                        <li key={i}>
                            <span className="font-bold text-gray-900">{lang.name}</span>
                            {lang.progress && <span className="text-gray-600">: {lang.progress}</span>}
                        </li>
                    ))}
                </ul>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div className="mb-8">
                <div className="border-b border-black mb-3 pb-1 flex">
                    <h2 className="text-sm font-bold uppercase tracking-wider bg-orange-100 px-2 py-0.5">
                        Interests
                    </h2>
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                    {interests.map((int, i) => (
                        <li key={i}>{int.name}</li>
                    ))}
                </ul>
            </div>
          )}

           {/* Additional Info (Certifications) */}
           {certifications.length > 0 && (
            <div className="mb-8">
                <div className="border-b border-black mb-3 pb-1 flex">
                    <h2 className="text-sm font-bold uppercase tracking-wider bg-orange-100 px-2 py-0.5">
                        Additional Info
                    </h2>
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                    {certifications.map((cert, i) => (
                        <li key={i}>{cert.name} {cert.year && `(${cert.year})`}</li>
                    ))}
                </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Template3;