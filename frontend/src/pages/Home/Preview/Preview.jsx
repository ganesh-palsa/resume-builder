import { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Link, useNavigate } from 'react-router-dom';
import { Download, Edit, BarChart, ArrowLeft } from 'lucide-react';
import './Preview.css';

const Preview = () => {
  const { resumeData, selectedTemplate } = useResume();
  const navigate = useNavigate();
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const renderEducation = () => {
    if (!resumeData.education?.length) return null;
    return (
      <section className="resume-section">
        <h2 className="section-title">Education</h2>
        {resumeData.education.map((edu, idx) => (
          <div key={idx} className="resume-item">
            <div className="item-header flex justify-between">
              <h3 className="item-title">{edu.degree} - {edu.school}</h3>
              <span className="item-date">{edu.startDate} to {edu.endDate || 'Present'}</span>
            </div>
            {edu.grade && <div className="item-subtitle">Grade: {edu.grade}</div>}
          </div>
        ))}
      </section>
    );
  };

  const renderExperience = () => {
    if (!resumeData.experience?.length) return null;
    return (
      <section className="resume-section">
        <h2 className="section-title">Experience</h2>
        {resumeData.experience.map((exp, idx) => (
          <div key={idx} className="resume-item">
            <div className="item-header flex justify-between">
              <h3 className="item-title">{exp.role} at {exp.company}</h3>
              <span className="item-date">{exp.startDate} to {exp.endDate || 'Present'}</span>
            </div>
            <p className="item-desc mt-2">{exp.description}</p>
          </div>
        ))}
      </section>
    );
  };

  const renderProjects = () => {
    if (!resumeData.projects?.length) return null;
    return (
      <section className="resume-section">
        <h2 className="section-title">Projects</h2>
        {resumeData.projects.map((proj, idx) => (
          <div key={idx} className="resume-item">
            <div className="item-header flex justify-between">
              <h3 className="item-title">{proj.title}</h3>
            </div>
            {proj.technologies && <div className="item-subtitle text-primary">{proj.technologies}</div>}
            <p className="item-desc mt-2">{proj.description}</p>
          </div>
        ))}
      </section>
    );
  };

  const renderSkills = () => {
    if (!resumeData.skills?.length) return null;
    return (
      <section className="resume-section">
        <h2 className="section-title">Skills</h2>
        <div className="skills-list flex gap-1" style={{ flexWrap: 'wrap' }}>
          {resumeData.skills.map((skill, idx) => (
            <span key={idx} className="skill-item">{skill}</span>
          ))}
        </div>
      </section>
    );
  };

  const renderSimpleTemplate = () => (
    <div className="resume-document template-simple" ref={printRef} id="printable-resume">
      <header className="resume-header text-center">
        <h1 className="resume-name">{resumeData.personalDetails.fullName || 'Your Name'}</h1>
        <div className="resume-contact flex justify-center gap-1 mt-2">
          {resumeData.personalDetails.email && <span>{resumeData.personalDetails.email}</span>}
          {resumeData.personalDetails.phone && <span>• {resumeData.personalDetails.phone}</span>}
          {resumeData.personalDetails.address && <span>• {resumeData.personalDetails.address}</span>}
        </div>
        <div className="resume-links flex justify-center gap-1 mt-1 text-sm">
          {resumeData.personalDetails.linkedin && <span>{resumeData.personalDetails.linkedin}</span>}
          {resumeData.personalDetails.github && <span>• {resumeData.personalDetails.github}</span>}
        </div>
      </header>
      <main className="resume-body">
        {renderExperience()}
        {renderEducation()}
        {renderProjects()}
        {renderSkills()}
      </main>
    </div>
  );

  const renderModernTemplate = () => (
    <div className="resume-document template-modern" ref={printRef} id="printable-resume">
      <div className="modern-layout">
        <aside className="modern-sidebar">
          <div className="modern-sidebar-header">
            <h1 className="resume-name">{resumeData.personalDetails.fullName || 'Your Name'}</h1>
            <div className="resume-contact mt-4">
              {resumeData.personalDetails.email && <div className="contact-item">{resumeData.personalDetails.email}</div>}
              {resumeData.personalDetails.phone && <div className="contact-item">{resumeData.personalDetails.phone}</div>}
              {resumeData.personalDetails.address && <div className="contact-item">{resumeData.personalDetails.address}</div>}
            </div>
          </div>
          <div className="modern-sidebar-content">
            {renderSkills()}
          </div>
        </aside>
        <main className="modern-main">
          {renderExperience()}
          {renderProjects()}
          {renderEducation()}
        </main>
      </div>
    </div>
  );

  const renderCorporateTemplate = () => (
    <div className="resume-document template-corporate" ref={printRef} id="printable-resume">
      <header className="corporate-header">
        <h1 className="resume-name">{resumeData.personalDetails.fullName || 'Your Name'}</h1>
        <div className="corporate-contact">
          {resumeData.personalDetails.email && <span>{resumeData.personalDetails.email}</span>}
          {resumeData.personalDetails.phone && <span> | {resumeData.personalDetails.phone}</span>}
          {resumeData.personalDetails.address && <span> | {resumeData.personalDetails.address}</span>}
        </div>
      </header>
      <main className="corporate-body">
        {renderExperience()}
        {renderEducation()}
        {renderProjects()}
        {renderSkills()}
      </main>
    </div>
  );

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern': return renderModernTemplate();
      case 'corporate': return renderCorporateTemplate();
      case 'simple':
      default: return renderSimpleTemplate();
    }
  };

  return (
    <div className="preview-page container mt-4 mb-6">
      <div className="preview-toolbar flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-1">Resume Preview</h1>
          <p className="text-muted">Review your resume before downloading</p>
        </div>
        <div className="preview-actions flex gap-1">
          <Link to="/builder" className="btn btn-outline">
            <Edit size={16} /> Edit
          </Link>
          <button className="btn btn-outline" onClick={handlePrint}>
            <Download size={16} /> Print / PDF
          </button>
          <Link to="/analyze" className="btn btn-primary">
            <BarChart size={16} /> Analyze
          </Link>
        </div>
      </div>

      <div className="resume-container">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default Preview;
