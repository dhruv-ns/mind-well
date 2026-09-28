import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    // We pass data to onboarding via state
    navigate('/onboarding', { state: formData });
  };

  return (
    <div className="auth-layout">
      <div className="glass-panel auth-card">
        <div className="auth-header">
          <h1>mindwell</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Create your free account.</p>
        </div>
        <form onSubmit={handleNext}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>First name</label>
              <input 
                type="text" 
                className="input" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Last name</label>
              <input 
                type="text" 
                className="input" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label>Email address</label>
            <input 
              type="email" 
              className="input" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              className="input" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Continue
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
