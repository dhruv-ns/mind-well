import React, { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';

const FocusTab = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('pomodoro'); // pomodoro, shortBreak, longBreak

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Here we could API call to save session
      alert('Focus session complete!');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (sessionType === 'pomodoro') setTimeLeft(25 * 60);
    if (sessionType === 'shortBreak') setTimeLeft(5 * 60);
    if (sessionType === 'longBreak') setTimeLeft(15 * 60);
  };

  const changeSession = (type) => {
    setSessionType(type);
    setIsActive(false);
    if (type === 'pomodoro') setTimeLeft(25 * 60);
    if (type === 'shortBreak') setTimeLeft(5 * 60);
    if (type === 'longBreak') setTimeLeft(15 * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="page-header" style={{ width: '100%' }}>
        <h1>Focus Time</h1>
        <p>Beat distractions with the Pomodoro technique</p>
      </div>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button 
            className={`tag-btn ${sessionType === 'pomodoro' ? 'active' : ''}`}
            onClick={() => changeSession('pomodoro')}
          >
            Pomodoro (25m)
          </button>
          <button 
            className={`tag-btn ${sessionType === 'shortBreak' ? 'active' : ''}`}
            onClick={() => changeSession('shortBreak')}
          >
            Short Break (5m)
          </button>
          <button 
            className={`tag-btn ${sessionType === 'longBreak' ? 'active' : ''}`}
            onClick={() => changeSession('longBreak')}
          >
            Long Break (15m)
          </button>
        </div>

        <div style={{ 
          fontSize: '6rem', 
          fontWeight: 700, 
          fontFamily: 'var(--font-display)',
          background: 'linear-gradient(to right, #818cf8, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          marginBottom: '3rem'
        }}>
          {formatTime(timeLeft)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <button 
            onClick={toggleTimer}
            style={{ 
              width: 64, height: 64, borderRadius: '50%', background: 'var(--primary)', 
              color: 'white', border: 'none', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px var(--primary-glow)',
              transition: 'var(--transition)'
            }}
          >
            {isActive ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: 4 }} />}
          </button>
          <button 
            onClick={resetTimer}
            style={{ 
              width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', 
              color: 'var(--text-primary)', border: '1px solid var(--surface-border)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <Square size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusTab;
