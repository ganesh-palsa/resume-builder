import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { BookOpen, Briefcase, Award, ArrowLeft } from 'lucide-react';
import './UserTypeSelect.css';

const UserTypeSelect = () => {
  const navigate = useNavigate();
  const { saveUserType, resetResume } = useResume();

  const handleSelect = (type) => {
    resetResume();
    saveUserType(type);
    navigate('/builder');
  };

  return (
    <div className="usertype-page">
      <div className="container usertype-container">
        <div className="usertype-header">
          <h2>Select Your Current Profile</h2>
          <p>We'll customize the resume builder based on your experience level</p>
        </div>

        <div className="usertype-grid">
          <div className="usertype-card" onClick={() => handleSelect('student')}>
            <div className="icon-wrapper bg-blue">
              <BookOpen size={32} />
            </div>
            <h3>Student</h3>
            <p>You are currently studying and looking for internships or part-time roles.</p>
            <span className="btn-select">Select Profile</span>
          </div>

          <div className="usertype-card" onClick={() => handleSelect('fresher')}>
            <div className="icon-wrapper bg-green">
              <Award size={32} />
            </div>
            <h3>Fresher / Graduate</h3>
            <p>You have recently graduated and are looking for your first full-time job.</p>
            <span className="btn-select">Select Profile</span>
          </div>

          <div className="usertype-card" onClick={() => handleSelect('experienced')}>
            <div className="icon-wrapper bg-purple">
              <Briefcase size={32} />
            </div>
            <h3>Experienced Professional</h3>
            <p>You have prior work experience and are looking to switch or upgrade roles.</p>
            <span className="btn-select">Select Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelect;
