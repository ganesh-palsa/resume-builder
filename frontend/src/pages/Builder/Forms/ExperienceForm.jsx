import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { useToast } from '../../../context/ToastContext';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = ({ title }) => {
  const { resumeData, updateSection } = useResume();
  const { showToast } = useToast();
  const [expList, setExpList] = useState(resumeData.experience);
  
  const [currentExp, setCurrentExp] = useState({
    id: '', company: '', role: '', startDate: '', endDate: '', description: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleChange = (e) => {
    setCurrentExp({ ...currentExp, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newList = [...expList, { ...currentExp, id: Date.now().toString() }];
    setExpList(newList);
    updateSection('experience', newList);
    showToast('Experience details saved successfully!');
    
    setCurrentExp({ id: '', company: '', role: '', startDate: '', endDate: '', description: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    const newList = expList.filter(exp => exp.id !== id);
    setExpList(newList);
    updateSection('experience', newList);
  };

  return (
    <div className="form-section">
      <div className="form-header flex justify-between items-center">
        <h2>{title}</h2>
        {!isAdding && (
          <button className="btn btn-primary btn-sm" onClick={() => setIsAdding(true)}>
            <Plus size={16} /> Add {title}
          </button>
        )}
      </div>

      {!isAdding && expList.length === 0 && (
        <p className="text-muted">No experience details added yet.</p>
      )}

      {!isAdding && expList.map(exp => (
        <div key={exp.id} className="list-item-card">
          <div className="list-item-header">
            <h4 className="list-item-title">{exp.role} at {exp.company}</h4>
            <button className="btn btn-outline btn-sm text-danger" onClick={() => handleDelete(exp.id)}>
              <Trash2 size={16} />
            </button>
          </div>
          <p className="list-item-subtitle">{exp.startDate} - {exp.endDate || 'Present'}</p>
          <p className="mt-4 text-sm">{exp.description}</p>
        </div>
      ))}

      {isAdding && (
        <form onSubmit={handleAdd} className="add-form card">
          <div className="form-row">
            <div className="input-group">
              <label>Company / Organization</label>
              <input type="text" name="company" className="input-control" value={currentExp.company} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Role / Position</label>
              <input type="text" name="role" className="input-control" value={currentExp.role} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Start Date</label>
              <input type="month" name="startDate" className="input-control" value={currentExp.startDate} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>End Date</label>
              <input type="month" name="endDate" className="input-control" value={currentExp.endDate} onChange={handleChange} />
            </div>
          </div>
          <div className="input-group">
            <label>Description / Responsibilities</label>
            <textarea name="description" className="input-control" rows="4" value={currentExp.description} onChange={handleChange}></textarea>
          </div>
          <div className="btn-container">
            <button type="button" className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExperienceForm;
