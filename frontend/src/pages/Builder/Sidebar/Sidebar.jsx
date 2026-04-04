import { User, Target, Book, Layout, Briefcase, Award, CheckCircle, Image, Eye, LayoutTemplate, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ sections, activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  const getIcon = (id) => {
    switch (id) {
      case 'personal': return <User size={18} />;
      case 'objective': return <Target size={18} />;
      case 'education': return <Book size={18} />;
      case 'skills': return <Layout size={18} />;
      case 'experience': return <Briefcase size={18} />;
      case 'projects': return <CheckCircle size={18} />;
      case 'achievements': return <Award size={18} />;
      case 'certifications': return <Target size={18} />;
      default: return <User size={18} />;
    }
  };

  return (
    <aside className="builder-sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      
      <ul className="sidebar-nav">
        {sections.map(section => (
          <li key={section.id} className="sidebar-item">
            <button 
              className={`sidebar-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {getIcon(section.id)}
              <span>{section.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <Link to="/templates" className="sidebar-action-btn">
          <LayoutTemplate size={18} />
          <span>Templates</span>
        </Link>
        <Link to="/preview" className="sidebar-action-btn primary">
          <Eye size={18} />
          <span>Preview</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
