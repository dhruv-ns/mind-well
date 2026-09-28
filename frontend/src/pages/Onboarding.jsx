import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Onboarding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [persona, setPersona] = useState(null);
  const [error, setError] = useState('');

  const formData = location.state;
  if (!formData) {
    return <Navigate to="/signup" replace />;
  }

  const handleRegister = async () => {
    try {
      await register({ ...formData, persona });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-layout">
      <div className="glass-panel auth-card" style={{ maxWidth: '600px' }}>
        <div className="auth-header">
          <h2>Who are you?</h2>
          <p style={{ color: 'var(--text-secondary)' }}>We'll personalise your entire experience around your life stage.</p>
        </div>
        {error && <div style={{ color: 'var(--danger)', textAlign: 'center' }}>{error}</div>}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          <div 
            onClick={() => setPersona('student')}
            style={{ 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-md)', 
              border: `2px solid ${persona === 'student' ? 'var(--primary)' : 'var(--surface-border)'}`,
              background: persona === 'student' ? 'rgba(129, 140, 248, 0.1)' : 'rgba(15, 23, 42, 0.5)',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'var(--transition)'
            }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
            <h4 style={{ marginBottom: '0.25rem' }}>Student</h4>
          </div>
          <div 
            onClick={() => setPersona('professional')}
            style={{ 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-md)', 
              border: `2px solid ${persona === 'professional' ? 'var(--success)' : 'var(--surface-border)'}`,
              background: persona === 'professional' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(15, 23, 42, 0.5)',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'var(--transition)'
            }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💼</div>
            <h4 style={{ marginBottom: '0.25rem' }}>Professional</h4>
          </div>
          <div 
            onClick={() => setPersona('parent')}
            style={{ 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-md)', 
              border: `2px solid ${persona === 'parent' ? 'var(--warning)' : 'var(--surface-border)'}`,
              background: persona === 'parent' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(15, 23, 42, 0.5)',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'var(--transition)'
            }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👶</div>
            <h4 style={{ marginBottom: '0.25rem' }}>New Parent</h4>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          disabled={!persona} 
          onClick={handleRegister}
          style={{ width: '100%' }}
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
