import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const HomeTab = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ streak: 0, averageMood: 0 });
  const [moodSaved, setMoodSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/moods/stats');
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logQuickMood = async (score) => {
    try {
      await api.post('/moods', { score });
      setMoodSaved(true);
      fetchStats();
      setTimeout(() => setMoodSaved(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="tab-content">
      <div className="page-header">
        <h1>{getGreeting()}, {user?.firstName}</h1>
        <p>You're on a <strong>{stats.streak}-day streak</strong> — keep the momentum going!</p>
      </div>

      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Current Streak</div>
          <div className="stat-value">{stats.streak}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>days</div>
        </div>
        <div className="glass-panel stat-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Average Mood</div>
          <div className="stat-value">{stats.averageMood || '-'}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>out of 5</div>
        </div>
        <div className="glass-panel stat-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Total Focus</div>
          <div className="stat-value">0</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>minutes</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3>How are you feeling right now?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Your daily check-in takes just 5 seconds.</p>
          <div className="mood-selector" style={{ marginBottom: 0 }}>
            {[
              { score: 1, icon: '😞' },
              { score: 2, icon: '😕' },
              { score: 3, icon: '😐' },
              { score: 4, icon: '🙂' },
              { score: 5, icon: '😊' },
            ].map((m) => (
              <button 
                key={m.score} 
                className="mood-btn" 
                onClick={() => logQuickMood(m.score)}
              >
                {m.icon}
              </button>
            ))}
          </div>
          {moodSaved && <div style={{ color: 'var(--success)', marginTop: '1rem', textAlign: 'center', fontWeight: 500 }}>✓ Mood logged!</div>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div 
            className="glass-panel stat-card" 
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
            onClick={() => navigate('/dashboard/chat')}
          >
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>💬</div>
            <div>
              <h4 style={{ marginBottom: '0.25rem' }}>Talk to your AI</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Available 24/7 · No judgement</p>
            </div>
            <div style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>→</div>
          </div>
          <div 
            className="glass-panel stat-card" 
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
            onClick={() => navigate('/dashboard/focus')}
          >
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(129, 140, 248, 0.2)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>⏱️</div>
            <div>
              <h4 style={{ marginBottom: '0.25rem' }}>Start a Focus Session</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Beat distractions and get things done</p>
            </div>
            <div style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>→</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
