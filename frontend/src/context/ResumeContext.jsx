import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../api/axios';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

const defaultResumeState = {
  personalDetails: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
  },
  objective: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
};

export const ResumeProvider = ({ children }) => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState(defaultResumeState);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [userType, setUserType] = useState('student'); // 'student', 'fresher', 'experienced'
  const [currentResumeId, setCurrentResumeId] = useState(null);

  useEffect(() => {
    const storedType = localStorage.getItem('userType');
    if (storedType) {
      setUserType(storedType);
    }
  }, []);

  const updateSection = async (section, data) => {
    const updatedData = { ...resumeData, [section]: data };
    setResumeData(updatedData);

    if (user) {
      try {
        const payload = {
          ...updatedData,
          userType,
          templateName: selectedTemplate,
          fullName: updatedData.personalDetails.fullName || user.name || 'Anonymous',
          email: updatedData.personalDetails.email || user.email || 'no-email@test.com',
          title: "My Resume"
        };

        if (currentResumeId) {
          await api.put(`/resumes/${currentResumeId}`, payload);
        } else {
          const res = await api.post('/resumes', payload);
          setCurrentResumeId(res.data._id);
        }
      } catch (err) {
        console.error('Failed to sync resume to cloud:', err.response?.data?.message || err.message);
      }
    }
  };

  const resetResume = () => {
    setResumeData(defaultResumeState);
    setCurrentResumeId(null);
  };

  const saveUserType = (type) => {
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const value = {
    resumeData,
    setResumeData,
    updateSection,
    resetResume,
    selectedTemplate,
    setSelectedTemplate,
    userType,
    saveUserType,
    currentResumeId,
    setCurrentResumeId
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};
