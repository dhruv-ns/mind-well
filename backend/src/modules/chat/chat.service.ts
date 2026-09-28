import { ChatMessage } from '../../models/chat.model';

// Basic simulated AI responses for now
const aiResponses = [
  "I hear you. It takes courage to share that.",
  "That sounds really tough. You're not alone in this.",
  "I understand. Let's try taking a slow, deep breath together.",
  "You're doing better than you think. What would feel most helpful right now?",
  "It's okay to not be okay. Sometimes naming what we feel is the first step.",
];

export const processMessage = async (userId: string, content: string) => {
  // 1. Save user's message
  const userMsg = await ChatMessage.create({
    userId,
    role: 'user',
    content,
  });

  // 2. Generate and save AI's response (Simulated)
  // In a real app, you would call OpenAI / LangChain here
  const replyContent = aiResponses[Math.floor(Math.random() * aiResponses.length)];
  
  const aiMsg = await ChatMessage.create({
    userId,
    role: 'ai',
    content: replyContent,
  });

  return { userMessage: userMsg, aiMessage: aiMsg };
};

export const getHistory = async (userId: string) => {
  return await ChatMessage.find({ userId }).sort({ createdAt: 1 });
};
