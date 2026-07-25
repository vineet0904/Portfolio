import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import SectionHeading from '@/components/UI/SectionHeading';
import chatData from '@/data/aichat.json';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
}

let messageId = 0;
const nextId = () => ++messageId;

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) return chatData.responses.skills;
  if (lower.includes('project') || lower.includes('work') || lower.includes('build')) return "My projects include:\n\n• " + chatData.responses.projects.join("\n• ");
  if (lower.includes('education') || lower.includes('degree') || lower.includes('study')) return chatData.responses.education;
  if (lower.includes('llm') || lower.includes('language model')) return chatData.responses.llm;
  if (lower.includes('agent') || lower.includes('agentic')) return chatData.responses.agents;
  return chatData.responses.default;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([{ id: nextId(), role: 'bot', text: chatData.greeting }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: msg }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(msg);
      setTyping(false);
      setMessages((prev) => [...prev, { id: nextId(), role: 'bot', text: response }]);
    }, 1200);
  };

  return (
    <section className="relative z-10 section-pad px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="AI Assistant" subtitle="Ask About Vineet" icon={<Sparkles size={14} className="text-primary" />} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          <div className="flex items-center gap-3 p-4 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Vineet's AI Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-muted">Online</span>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4 no-scrollbar" role="log" aria-live="polite">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-secondary/20' : 'bg-primary/20'
                  }`}>
                    {msg.role === 'user' ? <User size={16} className="text-secondary" /> : <Bot size={16} className="text-primary" />}
                  </div>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-secondary/15 text-white rounded-tr-sm'
                      : 'glass text-white/90 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Bot size={16} className="text-primary" />
                  </div>
                  <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, delay: d * 0.15, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {chatData.suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="px-3 py-1.5 rounded-lg glass text-xs text-muted hover:text-white hover:bg-white/10 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="p-4 border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about Vineet..."
              aria-label="Ask a question"
              className="flex-1 px-4 py-2.5 rounded-xl glass text-sm text-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            <button
              onClick={() => handleSend()}
              className="w-11 h-11 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white neon-glow hover:scale-105 transition-transform"
              aria-label="Send"
            >
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
