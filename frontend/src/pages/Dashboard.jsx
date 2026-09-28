import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Home, MessageSquare, Activity, CheckCircle, Users, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Import Tabs (we will create these next)
import HomeTab from '../components/tabs/HomeTab';
import ChatTab from '../components/tabs/ChatTab';
import MoodTab from '../components/tabs/MoodTab';
import ExercisesTab from '../components/tabs/ExercisesTab';
import CommunityTab from '../components/tabs/CommunityTab';
import FocusTab from '../components/tabs/FocusTab';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/dashboard/chat', label: 'AI Chat', icon: MessageSquare },
    { path: '/dashboard/mood', label: 'Mood', icon: Activity },
    { path: '/dashboard/exercises', label: 'Exercises', icon: CheckCircle },
    { path: '/dashboard/focus', label: 'Focus Time', icon: BookOpen }, // New Feature!
    { path: '/dashboard/community', label: 'Community', icon: Users },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <Link to="/dashboard" className="sidebar-logo">
          mind<span style={{ color: 'var(--text-primary)' }}>well</span>
        </Link>
        <nav className="nav-menu">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">
            {user?.firstName?.charAt(0) || 'U'}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.firstName}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
              {user?.persona}
            </div>
          </div>
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <LogOut size={18} />
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeTab />} />
          <Route path="/chat" element={<ChatTab />} />
          <Route path="/mood" element={<MoodTab />} />
          <Route path="/exercises" element={<ExercisesTab />} />
          <Route path="/community" element={<CommunityTab />} />
          <Route path="/focus" element={<FocusTab />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
