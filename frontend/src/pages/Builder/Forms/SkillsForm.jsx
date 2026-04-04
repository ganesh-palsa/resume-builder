import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { useToast } from '../../../context/ToastContext';
import { Plus, X } from 'lucide-react';

const SkillsForm = () => {
  const { resumeData, updateSection } = useResume();
  const { showToast } = useToast();
  const [skills, setSkills] = useState(resumeData.skills || []);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    updateSection('skills', skills);
    showToast('Skills saved successfully!');
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      updateSection('skills', updatedSkills);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    updateSection('skills', updatedSkills);
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Skills</h2>
      </div>

      <form onSubmit={handleAddSkill} className="mb-6">
        <label>Add new skill</label>
        <div className="flex gap-1 items-center mt-4 mb-4">
          <input 
            type="text" 
            className="input-control" 
            value={newSkill} 
            onChange={(e) => setNewSkill(e.target.value)} 
            placeholder="e.g. React, Python, Project Management"
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.625rem 1rem' }}>
            <Plus size={18} /> Add
          </button>
        </div>
      </form>

      <div className="skills-container flex" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
        {skills.map((skill, index) => (
          <div key={index} className="skill-badge" style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            background: 'var(--primary)', color: 'white', 
            padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.875rem' 
          }}>
            {skill}
            <button 
              type="button" 
              onClick={() => handleRemoveSkill(skill)}
              style={{ background: 'transparent', color: 'white', border: 'none', display: 'flex' }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {skills.length === 0 && <p className="text-muted">No skills added yet.</p>}
      </div>
    </div>
  );
};

export default SkillsForm;
