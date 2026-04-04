import { Link } from 'react-router-dom';
import './Home.css';
import { ArrowRight, FileText, Star, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Build professional resumes in <span className="highlight">minutes</span>
            </h1>
            <p className="hero-subtitle">
              Create a flawless, ATS-friendly resume tailored to your career goals. 
              Whether you're a student, a fresher, or a seasoned professional, we've got you covered.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started Now <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Login
              </Link>
            </div>
            
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <Zap className="feature-icon" />
                </div>
                <h3>Lightning Fast</h3>
                <p>Generate a complete resume in just a few clicks.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <FileText className="feature-icon" />
                </div>
                <h3>Modern Templates</h3>
                <p>Choose from our premium, expert-designed templates.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <Star className="feature-icon" />
                </div>
                <h3>Smart Analysis</h3>
                <p>Get AI-powered feedback on your resume score.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
