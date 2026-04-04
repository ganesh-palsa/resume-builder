import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import './Templates.css';

const Templates = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();
  const navigate = useNavigate();

  const templates = [
    {
      id: 'simple',
      name: 'Simple Professional',
      description: 'Clean, traditional, and ATS friendly. Best for conventional roles.',
      color: '#4F46E5', // Primary
    },
    {
      id: 'modern',
      name: 'Modern Clean',
      description: 'Contemporary design with subtle accents. Great for tech and modern companies.',
      color: '#10B981', // Secondary
    },
    {
      id: 'corporate',
      name: 'Corporate Style',
      description: 'Bold headers and distinct sections. Ideal for management and executive roles.',
      color: '#1F2937', // Dark Gray
    }
  ];

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    navigate('/preview');
  };

  return (
    <div className="templates-page container mt-4 mb-6">
      <div className="text-center mb-6">
        <h1 className="mb-2">Choose Your Template</h1>
        <p className="text-muted">Select a template that best represents your professional brand</p>
      </div>

      <div className="templates-grid">
        {templates.map((tpl) => (
          <div 
            key={tpl.id} 
            className={`template-card ${selectedTemplate === tpl.id ? 'active' : ''}`}
            onClick={() => handleSelectTemplate(tpl.id)}
          >
            <div className="template-preview-img" style={{ borderTop: `6px solid ${tpl.color}` }}>
              {tpl.id === 'modern' ? (
                <div className="placeholder-content" style={{ display: 'flex', padding: 0, height: '100%', background: 'white', border: '1px solid #eee' }}>
                  <div style={{ width: '35%', backgroundColor: '#1e293b', padding: '0.75rem', height: '100%' }}>
                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem', marginBottom: '1rem' }}>John Doe</div>
                    <div style={{ height: '4px', background: '#334155', marginBottom: '4px', width: '80%' }}></div>
                    <div style={{ height: '4px', background: '#334155', marginBottom: '1rem', width: '60%' }}></div>
                    <div style={{ color: '#94a3b8', fontSize: '0.5rem', borderBottom: '1px solid #334155', paddingBottom: '2px', marginBottom: '8px', textTransform: 'uppercase', marginTop: '1rem' }}>Skills</div>
                    <div style={{ height: '4px', background: '#475569', marginBottom: '4px' }}></div>
                  </div>
                  <div style={{ width: '65%', padding: '0.75rem' }}>
                    <div style={{ color: '#1e293b', fontSize: '0.5rem', fontWeight: 'bold', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>Experience</div>
                    <div className="ph-line"></div>
                    <div className="ph-line half"></div>
                    <div style={{ color: '#1e293b', fontSize: '0.5rem', fontWeight: 'bold', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '8px', marginTop: '1rem', textTransform: 'uppercase' }}>Education</div>
                    <div className="ph-line"></div>
                  </div>
                </div>
              ) : tpl.id === 'corporate' ? (
                <div className="placeholder-content" style={{ padding: '0.75rem', height: '100%', background: 'white', border: '1px solid #ccc' }}>
                  <div style={{ borderBottom: '3px solid #1e3a8a', paddingBottom: '0.5rem', textAlign: 'center', marginBottom: '1rem' }}>
                    <div style={{ color: '#111', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'serif' }}>John Doe</div>
                    <div style={{ color: '#555', fontSize: '0.5rem', marginTop: '4px' }}>john@example.com | 555-0100</div>
                  </div>
                  <div style={{ color: '#1e3a8a', borderBottom: '1px solid #1e3a8a', paddingBottom: '2px', fontSize: '0.55rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Experience</div>
                  <div className="ph-line"></div>
                  <div className="ph-line half"></div>
                  <div style={{ color: '#1e3a8a', borderBottom: '1px solid #1e3a8a', paddingBottom: '2px', fontSize: '0.55rem', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '1rem', marginBottom: '0.5rem' }}>Education</div>
                  <div className="ph-line"></div>
                </div>
              ) : (
                <div className="placeholder-content" style={{ padding: '0.75rem', height: '100%', background: 'white', border: '1px solid #eee' }}>
                  <div className="ph-header" style={{ color: '#111', textAlign: 'center', borderBottom: '2px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem' }}>John Doe</div>
                  <div style={{ textAlign: 'center' }}>
                    <div className="ph-line short" style={{ margin: '0 auto' }}></div>
                  </div>
                  <div className="ph-section-title" style={{ marginTop: '1.5rem' }}>Experience</div>
                  <div className="ph-line"></div>
                  <div className="ph-line"></div>
                  <div className="ph-section-title">Education</div>
                  <div className="ph-line"></div>
                  <div className="ph-line half"></div>
                </div>
              )}
            </div>
            <div className="template-info">
              <h3>{tpl.name}</h3>
              <p>{tpl.description}</p>
              <button 
                className={`btn ${selectedTemplate === tpl.id ? 'btn-primary' : 'btn-outline'} w-full mt-4`}
              >
                {selectedTemplate === tpl.id ? 'Current Template' : 'Use Template'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
