import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';
import { LogOut, LayoutDashboard, FileText, ArrowLeft } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {!isHome && (
            <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm" style={{ border: 'none', padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }} title="Go Back">
              <ArrowLeft size={18} /> <span style={{ fontWeight: 600 }}>Back</span>
            </button>
          )}
          <Link to="/" className="navbar-logo">
            <FileText className="logo-icon" />
            <span>ResumeBuilder</span>
          </Link>
        </div>
        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <div className="user-profile">
                <span className="user-name">Hello, {user.name || 'User'}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
