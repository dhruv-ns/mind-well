import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Heart, MessageCircle } from 'lucide-react';

const CommunityTab = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    try {
      await api.post('/posts', { content: newPost });
      setNewPost('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const res = await api.post(`/posts/${postId}/like`);
      setPosts((prev) => prev.map(p => {
        if (p._id === postId) {
          return { 
            ...p, 
            likesCount: res.data.likesCount,
            likes: res.data.liked ? [...p.likes, user._id] : p.likes.filter(id => id !== user._id)
          };
        }
        return p;
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tab-content">
      <div className="page-header">
        <h1>Community</h1>
        <p>Anonymous, safe spaces to connect with others</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div>
          <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <textarea 
              className="input" 
              placeholder="Share what's on your mind... (always anonymous)"
              style={{ minHeight: '100px', resize: 'vertical', marginBottom: '1rem', background: 'rgba(15,23,42,0.3)' }}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            ></textarea>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={handlePost}>Post anonymously</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {posts.map((post) => {
              const hasLiked = post.likes && post.likes.includes(user?._id);
              return (
                <div key={post._id} className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="avatar" style={{ background: 'rgba(129, 140, 248, 0.2)', color: '#818cf8', width: 40, height: 40 }}>
                      {post.personaTag?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Anonymous {post.personaTag || 'user'}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>{post.content}</p>
                  <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1rem' }}>
                    <button 
                      onClick={() => toggleLike(post._id)}
                      style={{ 
                        background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', 
                        color: hasLiked ? 'var(--danger)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500
                      }}
                    >
                      <Heart fill={hasLiked ? 'currentColor' : 'none'} size={18} /> 
                      {post.likesCount || 0}
                    </button>
                    <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500 }}>
                      <MessageCircle size={18} /> Reply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Your groups</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(129, 140, 248, 0.1)', color: 'var(--primary)', fontWeight: 500, cursor: 'pointer' }}>Student wellness</div>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Exam support</div>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Mindfulness</div>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Crisis resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>iCall (India)</div>
                <div style={{ fontWeight: 600 }}>9152987821</div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Vandrevala Foundation</div>
                <div style={{ fontWeight: 600 }}>1860-2662-345</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;
