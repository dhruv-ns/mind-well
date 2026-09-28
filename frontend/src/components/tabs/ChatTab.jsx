import React, { useEffect, useState, useRef } from 'react';
import api from '../../services/api';
import { Send } from 'lucide-react';

const ChatTab = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/chat');
      if (res.data.history.length === 0) {
        setMessages([{ role: 'ai', content: "Hi! I'm your Mindwell companion. I'm here to listen, support, and guide you through whatever you're facing. How are you feeling today? 💙" }]);
      } else {
        setMessages(res.data.history);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (text = input) => {
    if (!text.trim() || isTyping) return;
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.post('/chat', { content: text });
      setMessages((prev) => [...prev, res.data.aiMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="tab-content" style={{ height: 'calc(100vh - 6rem)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <h1>AI Companion</h1>
        <p>Conversations are private and encrypted</p>
      </div>

      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="chat-messages" style={{ padding: '2rem' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="msg-avatar">{msg.role === 'ai' ? 'M' : 'U'}</div>
              <div className="msg-content">{msg.content}</div>
            </div>
          ))}
          {isTyping && (
            <div className="message ai">
              <div className="msg-avatar">M</div>
              <div className="msg-content">Thinking...</div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--surface-border)', background: 'rgba(15,23,42,0.3)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto' }}>
            {["I'm feeling anxious", "I can't focus today", "I need to calm down"].map((s) => (
              <button 
                key={s} 
                className="tag-btn"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="chat-input-area" style={{ marginTop: 0 }}>
            <input 
              type="text" 
              className="chat-input"
              placeholder="Share what's on your mind..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="send-btn" onClick={() => sendMessage()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
