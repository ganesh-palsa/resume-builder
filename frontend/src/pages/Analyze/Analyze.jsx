import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { Star, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import './Analyze.css';

const Analyze = () => {
  const { resumeData } = useResume();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    // Simulate an API call to analyze the resume
    setTimeout(() => {
      // Dummy rule-based calculation for context
      let score = 50;
      let status = 'Average';
      let suggestions = [];

      if (resumeData.personalDetails.fullName && resumeData.personalDetails.email) {
        score += 10;
      }

      if (resumeData.education.length > 0) score += 10;
      else suggestions.push("Add your education background.");

      if (resumeData.experience && resumeData.experience.length > 0) score += 15;
      else suggestions.push("Add work experience or internships to stand out.");

      if (resumeData.skills && resumeData.skills.length > 0) score += 15;
      else suggestions.push("Include at least 5 key skills relevant to your role.");

      if (score >= 90) status = 'Excellent';
      else if (score >= 70) status = 'Good';
      else if (score < 60) status = 'Needs Improvement';

      if (score >= 80 && resumeData.projects && resumeData.projects.length === 0) {
        suggestions.push("Adding personal or academic projects boosts your profile further.");
      }

      setScoreData({
        score,
        status,
        suggestions: suggestions.length ? suggestions : ["Your resume looks great! Make sure your contact info is up to date."]
      });
      setLoading(false);
    }, 2000);
  }, [resumeData]);

  const renderStars = (score) => {
    const starsCount = Math.ceil((score / 100) * 5);
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={24} 
        fill={i < starsCount ? "#F59E0B" : "transparent"} 
        stroke={i < starsCount ? "#F59E0B" : "#D1D5DB"} 
      />
    ));
  };

  return (
    <div className="analyze-page container mt-4 mb-6">
      <div className="analyze-card card">
        {loading ? (
          <div className="analyze-loading text-center py-6">
            <div className="spinner"></div>
            <h2 className="mt-4">Analyzing your resume...</h2>
            <p className="text-muted">Our AI is checking for formatting, keywords, and impact.</p>
          </div>
        ) : (
          <div className="analyze-results text-center">
            <h1 className="mb-2">Resume Score</h1>
            
            <div className={`score-circle status-${scoreData.status.toLowerCase().replace(' ', '-')}`}>
              <span className="score-value">{scoreData.score}</span>
              <span className="score-total">/100</span>
            </div>

            <div className="score-rating mb-2">
              <div className="stars flex justify-center gap-1">
                {renderStars(scoreData.score)}
              </div>
            </div>

            <h2 className={`status-label status-text-${scoreData.status.toLowerCase().replace(' ', '-')}`}>
              {scoreData.status}
            </h2>

            <div className="suggestions-box text-left mt-6">
              <h3>Suggestions for Improvement</h3>
              <ul className="suggestions-list mt-4">
                {scoreData.suggestions.map((sug, idx) => (
                  <li key={idx} className="flex gap-1 items-start mb-2">
                    <span className="text-warning mt-1"><AlertTriangle size={18} /></span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="analyze-actions flex justify-center gap-1 mt-6">
              <Link to="/builder" className="btn btn-primary">
                <ArrowLeft size={16} /> Back to Editor
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyze;
