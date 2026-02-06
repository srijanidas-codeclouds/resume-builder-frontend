import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  Page as PDFPage,
  View as PDFView,
  Text as PDFText,
  Link as PDFLink,
  StyleSheet as PDFStyleSheet,
} from "@react-pdf/renderer";

// ---------- Utils ----------
export function formatYearMonth(yearMonth) {
  if (!yearMonth) return "";
  if (yearMonth === "Present") return "Present";
  return moment(yearMonth, "YYYY-MM").format("MMM YYYY");
}

// ---------- PDF Styles ----------
const pdfStyles = PDFStyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#1f2937",
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.5,
    paddingBottom: 30,
  },
  topBar: {
    width: "100%",
    height: 12,
    marginBottom: 25,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 35,
  },
  leftColumn: {
    width: "65%",
    paddingRight: 25,
  },
  rightColumn: {
    width: "35%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  designation: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  sectionTitleBox: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    marginBottom: 8,
    marginTop: 12,
    padding: 3,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  expBlock: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
  companyLine: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 2,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bullet: {
    width: 8,
  },
  bulletContent: {
    flex: 1,
  },
  contactItem: {
    marginBottom: 8,
  },
  contactLabel: {
    fontWeight: "bold",
    fontSize: 8,
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  sidebarText: {
    fontSize: 9,
    color: "#374151",
  },
  skillBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 8,
    borderRadius: 3,
    marginBottom: 4,
    marginRight: 4,
  },
  techStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    gap: 4,
  },
  techTag: {
    fontSize: 7,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
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
    accentColor = "#ea580c",
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

  const renderPdfBullets = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => (
      <PDFView key={i} style={pdfStyles.bulletPoint}>
        <PDFText style={[pdfStyles.bullet, { color: accentColor }]}>•</PDFText>
        <PDFText style={pdfStyles.bulletContent}>{line}</PDFText>
      </PDFView>
    ));
  };

  if (forPdf) {
    return (
      <PDFPage size="A4" style={pdfStyles.page}>
        <PDFView style={[pdfStyles.topBar, { backgroundColor: accentColor }]} />
        <PDFView style={pdfStyles.container}>
          <PDFView style={pdfStyles.leftColumn}>
            <PDFText style={[pdfStyles.name, { color: accentColor }]}>{profileInfo.fullName}</PDFText>
            <PDFText style={[pdfStyles.designation, { color: "#4b5563" }]}>{profileInfo.designation}</PDFText>

            {profileInfo.summary && (
              <PDFView>
                <PDFView style={[pdfStyles.sectionTitleBox, { borderBottomColor: accentColor, backgroundColor: accentColor + '10' }]}>
                  <PDFText style={[pdfStyles.sectionTitle, { color: accentColor }]}>Professional Profile</PDFText>
                </PDFView>
                <PDFText style={{ textAlign: 'justify', marginBottom: 10 }}>{profileInfo.summary}</PDFText>
              </PDFView>
            )}

            {workExperience.length > 0 && (
              <PDFView>
                <PDFView style={[pdfStyles.sectionTitleBox, { borderBottomColor: accentColor, backgroundColor: accentColor + '10' }]}>
                  <PDFText style={[pdfStyles.sectionTitle, { color: accentColor }]}>Experience</PDFText>
                </PDFView>
                {workExperience.map((exp, i) => (
                  <PDFView key={i} style={pdfStyles.expBlock}>
                    <PDFText style={pdfStyles.jobTitle}>{exp.title}</PDFText>
                    <PDFText style={pdfStyles.companyLine}>
                      {exp.company}{exp.location ? ` | ${exp.location}` : ""} | {formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}
                    </PDFText>
                    {renderPdfBullets(exp.description)}
                  </PDFView>
                ))}
              </PDFView>
            )}

            {projects.length > 0 && (
              <PDFView>
                <PDFView style={[pdfStyles.sectionTitleBox, { borderBottomColor: accentColor, backgroundColor: accentColor + '10' }]}>
                  <PDFText style={[pdfStyles.sectionTitle, { color: accentColor }]}>Projects</PDFText>
                </PDFView>
                {projects.map((proj, i) => (
                  <PDFView key={i} style={{ marginBottom: 10 }}>
                    <PDFView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <PDFText style={pdfStyles.jobTitle}>{proj.title}</PDFText>
                      {(proj.liveDemo || proj.github) && (
                        <PDFView style={{ flexDirection: "row", gap: 6 }}>
                          {proj.liveDemo && (
                            <PDFLink src={proj.liveDemo} style={[pdfStyles.link, { fontSize: 7, color: accentColor }]}>
                              Live
                            </PDFLink>
                          )}
                          {proj.github && (
                            <PDFLink src={proj.github} style={[pdfStyles.link, { fontSize: 7, color: accentColor }]}>
                              Code
                            </PDFLink>
                          )}
                        </PDFView>
                      )}
                    </PDFView>
                    <PDFText style={{ fontSize: 9, marginBottom: 2, marginTop: 2 }}>{proj.description}</PDFText>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <PDFView style={pdfStyles.techStack}>
                        {proj.technologies.map((tech, idx) => (
                          <PDFText 
                            key={idx} 
                            style={[pdfStyles.techTag, { backgroundColor: accentColor + '15', color: accentColor }]}
                          >
                            {tech}
                          </PDFText>
                        ))}
                      </PDFView>
                    )}
                  </PDFView>
                ))}
              </PDFView>
            )}
          </PDFView>

          <PDFView style={pdfStyles.rightColumn}>
            {/* Contact */}
            <PDFView style={[pdfStyles.sectionTitleBox, { borderBottomColor: accentColor, backgroundColor: accentColor + '10', marginTop: 0 }]}>
              <PDFText style={[pdfStyles.sectionTitle, { color: accentColor }]}>Contact</PDFText>
            </PDFView>
            <PDFView style={{ marginBottom: 15 }}>
              {contactInfo.email && (
                <PDFView style={pdfStyles.contactItem}>
                  <PDFText style={[pdfStyles.contactLabel, { color: accentColor }]}>Email</PDFText>
                  <PDFText style={pdfStyles.sidebarText}>{contactInfo.email}</PDFText>
                </PDFView>
              )}
              {contactInfo.phone && (
                <PDFView style={pdfStyles.contactItem}>
                  <PDFText style={[pdfStyles.contactLabel, { color: accentColor }]}>Phone</PDFText>
                  <PDFText style={pdfStyles.sidebarText}>{contactInfo.phone}</PDFText>
                </PDFView>
              )}
              {contactInfo.location && (
                <PDFView style={pdfStyles.contactItem}>
                  <PDFText style={[pdfStyles.contactLabel, { color: accentColor }]}>Location</PDFText>
                  <PDFText style={pdfStyles.sidebarText}>{contactInfo.location}</PDFText>
                </PDFView>
              )}
              {contactInfo.linkedin && (
                <PDFView style={pdfStyles.contactItem}>
                  <PDFText style={[pdfStyles.contactLabel, { color: accentColor }]}>LinkedIn</PDFText>
                  <PDFLink src={contactInfo.linkedin} style={[pdfStyles.sidebarText, { color: accentColor }]}>
                    View Profile
                  </PDFLink>
                </PDFView>
              )}
              {contactInfo.github && (
                <PDFView style={pdfStyles.contactItem}>
                  <PDFText style={[pdfStyles.contactLabel, { color: accentColor }]}>GitHub</PDFText>
                  <PDFLink src={contactInfo.github} style={[pdfStyles.sidebarText, { color: accentColor }]}>
                    View Repository
                  </PDFLink>
                </PDFView>
              )}
              {contactInfo.website && (
                <PDFView style={pdfStyles.contactItem}>
                  <PDFText style={[pdfStyles.contactLabel, { color: accentColor }]}>Website</PDFText>
                  <PDFLink src={contactInfo.website} style={[pdfStyles.sidebarText, { color: accentColor }]}>
                    Visit Site
                  </PDFLink>
                </PDFView>
              )}
            </PDFView>

            {education.length > 0 && (
              <PDFView>
                <PDFView style={[pdfStyles.sectionTitleBox, { borderBottomColor: accentColor, backgroundColor: accentColor + '10' }]}>
                  <PDFText style={[pdfStyles.sectionTitle, { color: accentColor }]}>Education</PDFText>
                </PDFView>
                {education.map((edu, i) => (
                  <PDFView key={i} style={{ marginBottom: 8 }}>
                    <PDFText style={pdfStyles.jobTitle}>{edu.degree}</PDFText>
                    <PDFText style={pdfStyles.sidebarText}>{edu.institution}</PDFText>
                    <PDFText style={[pdfStyles.sidebarText, { fontSize: 8 }]}>
                      {moment(edu.endDate, "YYYY-MM").format("YYYY")}
                    </PDFText>
                    {edu.gpa && <PDFText style={pdfStyles.sidebarText}>GPA: {edu.gpa}</PDFText>}
                  </PDFView>
                ))}
              </PDFView>
            )}

            {skills.length > 0 && (
              <PDFView>
                <PDFView style={[pdfStyles.sectionTitleBox, { borderBottomColor: accentColor, backgroundColor: accentColor + '10' }]}>
                  <PDFText style={[pdfStyles.sectionTitle, { color: accentColor }]}>Skills</PDFText>
                </PDFView>
                <PDFView style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {skills.map((s, i) => (
                    <PDFText key={i} style={[pdfStyles.skillBadge, { backgroundColor: accentColor + '15', color: accentColor }]}>
                      {s.name}
                    </PDFText>
                  ))}
                </PDFView>
              </PDFView>
            )}

            {languages.length > 0 && (
              <PDFView>
                <PDFView style={[pdfStyles.sectionTitleBox, { borderBottomColor: accentColor, backgroundColor: accentColor + '10' }]}>
                  <PDFText style={[pdfStyles.sectionTitle, { color: accentColor }]}>Languages</PDFText>
                </PDFView>
                {languages.map((l, i) => (
                  <PDFText key={i} style={[pdfStyles.sidebarText, { marginBottom: 2 }]}>
                    • {l.name} ({l.level})
                  </PDFText>
                ))}
              </PDFView>
            )}

            {certifications.length > 0 && (
              <PDFView>
                <PDFView style={[pdfStyles.sectionTitleBox, { borderBottomColor: accentColor, backgroundColor: accentColor + '10' }]}>
                  <PDFText style={[pdfStyles.sectionTitle, { color: accentColor }]}>Certifications</PDFText>
                </PDFView>
                {certifications.map((c, i) => (
                  <PDFView key={i} style={{ marginBottom: 4 }}>
                    <PDFText style={[pdfStyles.sidebarText, { fontWeight: "bold" }]}>• {c.name}</PDFText>
                    {c.issuer && (
                      <PDFText style={[pdfStyles.sidebarText, { fontSize: 8, paddingLeft: 8 }]}>
                        {c.issuer}
                      </PDFText>
                    )}
                  </PDFView>
                ))}
              </PDFView>
            )}
          </PDFView>
        </PDFView>
      </PDFPage>
    );
  }

  // --- HTML Preview ---
  return (
    <div
      ref={resumeRef}
      className="bg-white text-gray-900 mx-auto shadow-xl font-sans"
      style={{
        width: containerWidth > 0 ? `${baseWidth}px` : "210mm",
        minHeight: "297mm",
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
      }}
    >
      <div className="h-3 w-full" style={{ backgroundColor: accentColor }}></div>
      
      <div className="p-12 grid grid-cols-12 gap-10">
        <div className="col-span-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: accentColor }}>
            {profileInfo.fullName}
          </h1>
          <p className="font-bold uppercase tracking-widest text-sm mt-1 mb-8 text-gray-500">
            {profileInfo.designation}
          </p>

          {profileInfo.summary && (
            <>
              <SectionTitle title="Professional Summary" accentColor={accentColor} />
              <p className="text-xs text-gray-700 leading-relaxed mb-6 text-justify">
                {profileInfo.summary}
              </p>
            </>
          )}

          {workExperience.length > 0 && (
            <>
              <SectionTitle title="Work Experience" accentColor={accentColor} />
              <div className="space-y-6">
                {workExperience.map((exp, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between font-bold text-gray-900 mb-0.5">
                      <span>{exp.title}</span>
                      <span style={{ color: accentColor }} className="whitespace-nowrap ml-4">
                        {formatYearMonth(exp.startDate)} — {formatYearMonth(exp.endDate)}
                      </span>
                    </div>
                    <div className="font-semibold text-gray-600 mb-2 italic">
                      {exp.company}{exp.location ? ` | ${exp.location}` : ""}
                    </div>
                    <ul className="list-none space-y-1">
                      {exp.description?.split("\n").map((line, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span style={{ color: accentColor }}>•</span>
                          <span className="text-gray-700">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}

          {projects.length > 0 && (
            <>
              <SectionTitle title="Key Projects" accentColor={accentColor} />
              <div className="space-y-4">
                {projects.map((proj, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900">{proj.title}</h4>
                      <div className="flex gap-2 text-xs">
                        {proj.liveDemo && (
                          <a href={proj.liveDemo} className="hover:underline" style={{ color: accentColor }}>
                            Live
                          </a>
                        )}
                        {proj.github && (
                          <a href={proj.github} className="hover:underline" style={{ color: accentColor }}>
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 text-[10px] rounded font-medium"
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
            </>
          )}
        </div>

        <div className="col-span-4">
          <SectionTitle title="Contact" accentColor={accentColor} noMarginTop />
          <div className="space-y-4 mb-8">
            {contactInfo.email && (
              <ContactBlock 
                label="Email" 
                value={
                  <a href={`mailto:${contactInfo.email}`} className="hover:underline break-all" style={{ color: accentColor }}>
                    {contactInfo.email}
                  </a>
                } 
                accentColor={accentColor} 
              />
            )}
            
            {contactInfo.phone && (
              <ContactBlock label="Phone" value={contactInfo.phone} accentColor={accentColor} />
            )}
            
            {contactInfo.location && (
              <ContactBlock label="Location" value={contactInfo.location} accentColor={accentColor} />
            )}

            {contactInfo.linkedin && (
              <ContactBlock 
                label="LinkedIn" 
                value={
                  <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: accentColor }}>
                    View Profile
                  </a>
                } 
                accentColor={accentColor} 
              />
            )}

            {contactInfo.github && (
              <ContactBlock 
                label="GitHub" 
                value={
                  <a href={contactInfo.github} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: accentColor }}>
                    View Repository
                  </a>
                } 
                accentColor={accentColor} 
              />
            )}

            {contactInfo.website && (
              <ContactBlock 
                label="Website" 
                value={
                  <a href={contactInfo.website} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: accentColor }}>
                    Visit Site
                  </a>
                }
                accentColor={accentColor} 
              />
            )}
          </div>

          {education.length > 0 && (
            <>
              <SectionTitle title="Education" accentColor={accentColor} />
              <div className="space-y-4 mb-8">
                {education.map((edu, i) => (
                  <div key={i} className="text-xs">
                    <div className="font-bold text-gray-900">{edu.degree}</div>
                    <div className="text-gray-600">{edu.institution}</div>
                    <div className="text-gray-400 italic">
                      {moment(edu.endDate, "YYYY-MM").format("YYYY")}
                    </div>
                    {edu.gpa && <div className="text-gray-500">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </>
          )}

          {skills.length > 0 && (
            <>
              <SectionTitle title="Expertise" accentColor={accentColor} />
              <div className="flex flex-wrap gap-2 mb-8">
                {skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 rounded text-[10px] font-bold border" 
                        style={{ backgroundColor: accentColor + '15', color: accentColor, borderColor: accentColor + '30' }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </>
          )}

          {languages.length > 0 && (
            <>
              <SectionTitle title="Languages" accentColor={accentColor} />
              <ul className="text-xs space-y-2 mb-8">
                {languages.map((l, i) => (
                  <li key={i} className="text-gray-700">
                    <span className="font-bold text-gray-900">{l.name}</span> — {l.level}
                  </li>
                ))}
              </ul>
            </>
          )}

          {certifications.length > 0 && (
            <>
              <SectionTitle title="Certifications" accentColor={accentColor} />
              <ul className="text-xs space-y-2">
                {certifications.map((c, i) => (
                  <li key={i} className="text-gray-700 flex gap-2">
                    <span style={{ color: accentColor }}>•</span>
                    <div>
                      <div className="font-semibold">{c.name}</div>
                      {c.issuer && <div className="text-gray-500 text-[10px]">{c.issuer}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title, noMarginTop, accentColor }) => (
  <div className={`border-b-2 px-2 py-1 mb-4 ${noMarginTop ? '' : 'mt-6'}`} 
       style={{ borderColor: accentColor, backgroundColor: accentColor + '10' }}>
    <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: accentColor }}>
      {title}
    </h2>
  </div>
);

const ContactBlock = ({ label, value, accentColor }) => value ? (
  <div className="text-xs">
    <span className="block font-black uppercase text-[10px] tracking-tighter" style={{ color: accentColor }}>
      {label}
    </span>
    <span className="text-gray-700 break-all">{value}</span>
  </div>
) : null;

export default Template3;