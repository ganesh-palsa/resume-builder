import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import Sidebar from './Sidebar/Sidebar';
import PersonalDetailsForm from './Forms/PersonalDetailsForm';
import EducationForm from './Forms/EducationForm';
import ExperienceForm from './Forms/ExperienceForm';
import SkillsForm from './Forms/SkillsForm';
import ProjectsForm from './Forms/ProjectsForm';
import './Builder.css';

const Builder = () => {
  const { userType } = useResume();
  const [activeSection, setActiveSection] = useState('personal');

  // Define what sections are available for each user type
  const getSections = () => {
    const base = [
      { id: 'personal', label: 'Personal Details' },
      { id: 'objective', label: 'Objective / Summary' },
      { id: 'education', label: 'Education' },
      { id: 'skills', label: 'Skills' }
    ];

    if (userType === 'student') {
      return [...base, { id: 'projects', label: 'Projects' }];
    } else if (userType === 'fresher') {
      return [...base, { id: 'experience', label: 'Internships' }, { id: 'projects', label: 'Projects' }];
    } else {
      return [...base, { id: 'experience', label: 'Experience' }, { id: 'achievements', label: 'Achievements' }, { id: 'certifications', label: 'Certifications' }];
    }
  };

  const sections = getSections();

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalDetailsForm />;
      case 'education':
        return <EducationForm />;
      case 'experience':
        return <ExperienceForm title={userType === 'fresher' ? 'Internships' : 'Work Experience'} />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      default:
        return (
          <div className="placeholder-form">
            <h3>{sections.find(s => s.id === activeSection)?.label}</h3>
            <p>Form logic to be added for this section.</p>
          </div>
        );
    }
  };

  return (
    <div className="builder-layout">
      <Sidebar 
        sections={sections} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <div className="builder-content">
        <div className="form-container">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default Builder;
