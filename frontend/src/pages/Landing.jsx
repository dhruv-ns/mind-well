import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-page">
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>mind<span className="text-gradient">well</span></div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" className="btn btn-outline">Log in</Link>
          <Link to="/signup" className="btn btn-primary">Get started free</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">✦ AI-powered mental wellness</div>
          <h1>Your mind deserves <br/><span>better care</span></h1>
          <p>A compassionate AI companion that meets you where you are — whether you're a stressed student, a burned-out professional, or an overwhelmed new parent.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Start your journey</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
