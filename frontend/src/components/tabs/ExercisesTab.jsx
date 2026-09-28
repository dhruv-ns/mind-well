import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const EXERCISE_CATALOG = [
  { id: 1, title: '4-7-8 breathing', category: 'breathing', tag: 'Breathing', tagClass: 'tag-breathing', duration: '3 min', desc: 'Inhale for 4 counts, hold for 7, exhale for 8.' },
  { id: 2, title: '5-4-3-2-1 grounding', category: 'grounding', tag: 'Grounding', tagClass: 'tag-grounding', duration: '5 min', desc: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.' },
  { id: 3, title: '2-minute brain dump', category: 'journaling', tag: 'Journaling', tagClass: 'tag-journaling', duration: '2 min', desc: 'Write down everything on your mind without filtering.' },
  { id: 4, title: 'Progressive relaxation', category: 'relaxation', tag: 'Relaxation', tagClass: 'tag-relaxation', duration: '7 min', desc: 'Systematically tense and release each muscle group.' }
];

const ExercisesTab = () => {
  const [doneIds, setDoneIds] = useState(new Set());
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await api.get('/exercises/progress');
      setDoneIds(new Set(res.data.completed));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDone = async (id) => {
    try {
      const res = await api.post(`/exercises/${id}/toggle`);
      setDoneIds((prev) => {
        const next = new Set(prev);
        if (res.data.done) next.add(id);
        else next.delete(id);
        return next;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = filter === 'all' ? EXERCISE_CATALOG : EXERCISE_CATALOG.filter(e => e.category === filter);

  return (
    <div className="tab-content">
      <div className="page-header flex-between">
        <div>
          <h1>Exercises</h1>
          <p>Science-backed techniques for a calmer mind</p>
        </div>
        <div style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600 }}>
          {doneIds.size}/{EXERCISE_CATALOG.length} completed
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {['all', 'breathing', 'grounding', 'journaling', 'relaxation'].map((f) => (
          <button 
            key={f}
            className={`tag-btn ${filter === f ? 'active' : ''}`}
            style={{ textTransform: 'capitalize' }}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="exercises-grid">
        {filtered.map((ex) => {
          const isDone = doneIds.has(ex.id);
          return (
            <div key={ex.id} className="glass-panel exercise-card" style={{ opacity: isDone ? 0.7 : 1 }}>
              <span className={`ex-tag ${ex.tagClass}`}>{ex.tag}</span>
              <h3>{ex.title}</h3>
              <p style={{ color: 'var(--text-secondary)', flex: 1 }}>{ex.desc}</p>
              <div className="flex-between" style={{ marginTop: '1rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>⏱️ {ex.duration}</span>
                <button 
                  onClick={() => toggleDone(ex.id)}
                  style={{ 
                    width: 32, height: 32, borderRadius: '50%', border: 'none', 
                    background: isDone ? 'var(--success)' : 'rgba(255,255,255,0.1)',
                    color: 'white', cursor: 'pointer', transition: 'var(--transition)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  {isDone ? '✓' : ''}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExercisesTab;
