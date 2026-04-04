import { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { useToast } from '../../../context/ToastContext';

const PersonalDetailsForm = () => {
  const { resumeData, updateSection } = useResume();
  const { showToast } = useToast();
  const [formData, setFormData] = useState(resumeData.personalDetails);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSection('personalDetails', formData);
    showToast('Personal details saved successfully!');
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Personal Details</h2>
      </div>
      
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" className="input-control" value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" className="input-control" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" className="input-control" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address / Location</label>
            <input type="text" id="address" name="address" className="input-control" value={formData.address} onChange={handleChange} placeholder="New York, NY" />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input type="url" id="linkedin" name="linkedin" className="input-control" value={formData.linkedin || ''} onChange={handleChange} placeholder="https://linkedin.com/in/johndoe" />
          </div>
          <div className="input-group">
            <label htmlFor="github">GitHub URL</label>
            <input type="url" id="github" name="github" className="input-control" value={formData.github || ''} onChange={handleChange} placeholder="https://github.com/johndoe" />
          </div>
        </div>

        <div className="btn-container">
          <button type="submit" className="btn btn-primary">Save Details</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
