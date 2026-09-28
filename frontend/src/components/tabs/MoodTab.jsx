import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const MoodTab = () => {
  const [selectedScore, setSelectedScore] = useState(null);
  const [note, setNote] = useState('');
  const [activeFactors, setActiveFactors] = useState([]);
  const [moodSaved, setMoodSaved] = useState(false);

  const factors = ['😴 Sleep', '📚 Study', '🏃 Exercise', '🍕 Food', '👥 Social', '💊 Health', '💰 Finance', '❤️ Relationships'];

  const toggleFactor = (f) => {
    setActiveFactors((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  };

  const saveMood = async () => {
    if (!selectedScore) return alert('Please select a mood score');
    const factorNames = activeFactors.map(f => f.split(' ')[1]);
    try {
      await api.post('/moods', { score: selectedScore, note, factors: factorNames });
      setMoodSaved(true);
      setTimeout(() => setMoodSaved(false), 3000);
      setSelectedScore(null);
      setNote('');
      setActiveFactors([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tab-content">
      <div className="page-header">
        <h1>Mood Tracker</h1>
        <p>Understanding your emotional patterns</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3>Log today's mood</h3>
          <div className="mood-selector" style={{ marginTop: '1.5rem' }}>
            {[
              { score: 1, icon: '😞', label: 'Very low' },
              { score: 2, icon: '😕', label: 'Low' },
              { score: 3, icon: '😐', label: 'Neutral' },
              { score: 4, icon: '🙂', label: 'Good' },
              { score: 5, icon: '😊', label: 'Great' },
            ].map((m) => (
              <button 
                key={m.score} 
                className={`mood-btn ${selectedScore === m.score ? 'selected' : ''}`}
                onClick={() => setSelectedScore(m.score)}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            ))}
          </div>
          <textarea 
            className="input" 
            style={{ minHeight: '100px', marginBottom: '1.5rem', resize: 'vertical' }}
            placeholder="What's on your mind today? (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={saveMood}>
            Save mood log
          </button>
          {moodSaved && <div style={{ color: 'var(--success)', marginTop: '1rem', textAlign: 'center', fontWeight: 500 }}>✓ Mood saved for today!</div>}
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3>Mood factors</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>What's affecting your mood today?</p>
          <div className="factor-tags">
            {factors.map((f) => (
              <button 
                key={f} 
                className={`tag-btn ${activeFactors.includes(f) ? 'active' : ''}`}
                onClick={() => toggleFactor(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTab;
