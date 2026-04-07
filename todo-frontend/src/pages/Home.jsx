import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLaunch = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section-premium">
        <div className="task-greeting">
          <i className="fas fa-sparkles"></i> task management · next gen
        </div>

        <h1 className="premium-title">
          Organize Your <span className="gradient-text">Tasks</span> Like Never Before
        </h1>

        <p className="premium-description">
          The ultimate task management solution for modern professionals. 
          Stay organized, boost productivity, and achieve your goals.
        </p>

        <button className="hero-button" onClick={handleLaunch}>
          Launch Task Hub <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      {/* How to Use Section */}
      <div className="how-to-use-section">
        <h2 className="section-title">
          <i className="fas fa-compass"></i> How to Use TaskFlow
        </h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <i className="fas fa-user-plus step-icon"></i>
            <h3>Create Account</h3>
            <p>Sign up with your email and password to get started. Your tasks are securely stored.</p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <i className="fas fa-tasks step-icon"></i>
            <h3>Add Tasks</h3>
            <p>Create tasks with title, description, priority level, due date, category, and tags.</p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <i className="fas fa-flag-checkered step-icon"></i>
            <h3>Set Priorities</h3>
            <p>Mark tasks as High, Medium, or Low priority to focus on what matters most.</p>
          </div>

          <div className="step-card">
            <div className="step-number">04</div>
            <i className="fas fa-calendar-alt step-icon"></i>
            <h3>Track Deadlines</h3>
            <p>Set due dates to never miss important deadlines again.</p>
          </div>

          <div className="step-card">
            <div className="step-number">05</div>
            <i className="fas fa-tags step-icon"></i>
            <h3>Organize with Tags</h3>
            <p>Add custom tags and categories to group similar tasks together.</p>
          </div>

          <div className="step-card">
            <div className="step-number">06</div>
            <i className="fas fa-trash-alt step-icon"></i>
            <h3>Manage Tasks</h3>
            <p>Delete completed tasks to keep your workspace clean and organized.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">
          <i className="fas fa-star"></i> Premium Features
        </h2>
        <div className="features-grid">
          <div className="feature-item">
            <i className="fas fa-cloud-upload-alt"></i>
            <span>Cloud Sync</span>
          </div>
          <div className="feature-item">
            <i className="fas fa-shield-alt"></i>
            <span>Secure Storage</span>
          </div>
          <div className="feature-item">
            <i className="fas fa-mobile-alt"></i>
            <span>Responsive Design</span>
          </div>
          <div className="feature-item">
            <i className="fas fa-chart-line"></i>
            <span>Productivity Analytics</span>
          </div>
        </div>
      </div>

      {/* Creator Section - NOW AT BOTTOM */}
      <div className="bottom-section">
        <div className="creator-badge">
          <i className="fas fa-code-branch"></i> Created by <strong>Aryan Raj</strong>
          <br />
          <i className="fas fa-envelope"></i> aryanssm2006@gmail.com
        </div>

        <p className="tagline">
          ✨ Build, assign & track tasks with real-time warmth — premium productivity suite.
        </p>
      </div>
    </div>
  );
}

export default Home;