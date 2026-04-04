import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { useToast } from '../../../context/ToastContext';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = () => {
  const { resumeData, updateSection } = useResume();
  const { showToast } = useToast();
  const [projectList, setProjectList] = useState(resumeData.projects || []);
  
  const [currentProject, setCurrentProject] = useState({
    id: '', title: '', link: '', technologies: '', description: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleChange = (e) => {
    setCurrentProject({ ...currentProject, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newList = [...projectList, { ...currentProject, id: Date.now().toString() }];
    setProjectList(newList);
    updateSection('projects', newList);
    showToast('Project added successfully!');
    
    setCurrentProject({ id: '', title: '', link: '', technologies: '', description: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    const newList = projectList.filter(proj => proj.id !== id);
    setProjectList(newList);
    updateSection('projects', newList);
  };

  return (
    <div className="form-section">
      <div className="form-header flex justify-between items-center">
        <h2>Projects</h2>
        {!isAdding && (
          <button className="btn btn-primary btn-sm" onClick={() => setIsAdding(true)}>
            <Plus size={16} /> Add Project
          </button>
        )}
      </div>

      {!isAdding && projectList.length === 0 && (
        <p className="text-muted">No projects added yet.</p>
      )}

      {!isAdding && projectList.map(proj => (
        <div key={proj.id} className="list-item-card">
          <div className="list-item-header">
            <h4 className="list-item-title">{proj.title}</h4>
            <button className="btn btn-outline btn-sm text-danger" onClick={() => handleDelete(proj.id)}>
              <Trash2 size={16} />
            </button>
          </div>
          <p className="list-item-subtitle">{proj.technologies}</p>
          <p className="mt-4 text-sm">{proj.description}</p>
        </div>
      ))}

      {isAdding && (
        <form onSubmit={handleAdd} className="add-form card">
          <div className="form-row">
            <div className="input-group">
              <label>Project Title</label>
              <input type="text" name="title" className="input-control" value={currentProject.title} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Link (Optional)</label>
              <input type="url" name="link" className="input-control" value={currentProject.link} onChange={handleChange} />
            </div>
          </div>
          <div className="input-group">
            <label>Technologies Used</label>
            <input type="text" name="technologies" className="input-control" value={currentProject.technologies} onChange={handleChange} placeholder="e.g. React, Node.js, MongoDB" />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea name="description" className="input-control" rows="4" value={currentProject.description} onChange={handleChange}></textarea>
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

export default ProjectsForm;
