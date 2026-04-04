import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import { FileText, Plus, Edit, Trash2, Eye, Download, ArrowLeft } from 'lucide-react';
import api from '../../api/axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { setResumeData, setCurrentResumeId, setSelectedTemplate, saveUserType } = useResume();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get('/resumes');
        setResumes(response.data);
      } catch (err) {
        console.error('Failed to fetch resumes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.delete(`/resumes/${id}`);
        setResumes(resumes.filter(r => r._id !== id));
      } catch (err) {
        console.error('Failed to delete resume', err);
      }
    }
  };

  const handleEdit = (resume) => {
    setResumeData(resume);
    setCurrentResumeId(resume._id);
    if(resume.templateName) setSelectedTemplate(resume.templateName);
    if(resume.userType) saveUserType(resume.userType);
    navigate('/builder');
  };

  const handlePreview = (resume) => {
    setResumeData(resume);
    setCurrentResumeId(resume._id);
    if(resume.templateName) setSelectedTemplate(resume.templateName);
    if(resume.userType) saveUserType(resume.userType);
    navigate('/preview');
  };

  return (
    <div className="dashboard-page container mt-6 mb-6">
      <div className="dashboard-header flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-1">My Resumes</h1>
          <p className="text-muted">Manage your saved resumes and track their scores</p>
        </div>
        <Link to="/user-type" className="btn btn-primary">
          <Plus size={18} /> Create New Resume
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-6">Loading your resumes...</div>
      ) : resumes.length === 0 ? (
        <div className="empty-state text-center card py-6">
          <FileText size={48} className="text-muted mx-auto mb-4" />
          <h3 className="mb-2">No resumes found</h3>
          <p className="text-muted mb-4">You haven't created any resumes yet.</p>
          <Link to="/user-type" className="btn btn-primary mx-auto">Build Your First Resume</Link>
        </div>
      ) : (
        <div className="resumes-grid">
          {resumes.map(resume => (
            <div key={resume._id} className="resume-card card">
              <div className="resume-card-content flex justify-between">
                <div>
                  <h3 className="resume-title mb-1">{resume.title || 'Untitled Resume'}</h3>
                  <p className="text-muted text-sm mb-1">Template: {resume.templateName || 'modern'}</p>
                  <p className="text-muted text-sm">Last updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="resume-score">
                  <span className="score-badge">{resume.score}/100</span>
                </div>
              </div>
              <div className="resume-card-actions flex gap-1 mt-4 pt-4">
                <button onClick={() => handleEdit(resume)} className="btn btn-outline btn-sm flex-1">
                  <Edit size={16} /> Edit
                </button>
                <button onClick={() => handlePreview(resume)} className="btn btn-outline btn-sm flex-1">
                  <Eye size={16} /> Preview
                </button>
                <button className="btn btn-outline btn-sm" title="Download Full PDF">
                  <Download size={16} />
                </button>
                <button 
                  className="btn btn-outline btn-sm text-danger border-danger" 
                  onClick={() => handleDelete(resume._id)}
                  title="Delete Resume"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
