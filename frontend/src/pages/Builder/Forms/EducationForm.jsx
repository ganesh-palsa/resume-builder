import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { useToast } from '../../../context/ToastContext';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const { resumeData, updateSection } = useResume();
  const { showToast } = useToast();
  const [educationList, setEducationList] = useState(resumeData.education);
  
  const [currentEdu, setCurrentEdu] = useState({
    id: '', school: '', degree: '', startDate: '', endDate: '', grade: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleChange = (e) => {
    setCurrentEdu({ ...currentEdu, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newList = [...educationList, { ...currentEdu, id: Date.now().toString() }];
    setEducationList(newList);
    updateSection('education', newList);
    showToast('Education details saved successfully!');
    
    setCurrentEdu({ id: '', school: '', degree: '', startDate: '', endDate: '', grade: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    const newList = educationList.filter(edu => edu.id !== id);
    setEducationList(newList);
    updateSection('education', newList);
  };

  return (
    <div className="form-section">
      <div className="form-header flex justify-between items-center">
        <h2>Education</h2>
        {!isAdding && (
          <button className="btn btn-primary btn-sm" onClick={() => setIsAdding(true)}>
            <Plus size={16} /> Add Education
          </button>
        )}
      </div>

      {!isAdding && educationList.length === 0 && (
        <p className="text-muted">No education details added yet.</p>
      )}

      {!isAdding && educationList.map(edu => (
        <div key={edu.id} className="list-item-card">
          <div className="list-item-header">
            <h4 className="list-item-title">{edu.degree} at {edu.school}</h4>
            <button className="btn btn-outline btn-sm text-danger" onClick={() => handleDelete(edu.id)}>
              <Trash2 size={16} />
            </button>
          </div>
          <p className="list-item-subtitle">{edu.startDate} - {edu.endDate || 'Present'} | Grade: {edu.grade}</p>
        </div>
      ))}

      {isAdding && (
        <form onSubmit={handleAdd} className="add-form card">
          <div className="form-row">
            <div className="input-group">
              <label>School / University</label>
              <input type="text" name="school" className="input-control" value={currentEdu.school} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Degree / Course</label>
              <input type="text" name="degree" className="input-control" value={currentEdu.degree} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Start Date</label>
              <input type="month" name="startDate" className="input-control" value={currentEdu.startDate} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>End Date</label>
              <input type="month" name="endDate" className="input-control" value={currentEdu.endDate} onChange={handleChange} />
            </div>
          </div>
          <div className="input-group">
            <label>Grade / CGPA</label>
            <input type="text" name="grade" className="input-control" value={currentEdu.grade} onChange={handleChange} />
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

export default EducationForm;
