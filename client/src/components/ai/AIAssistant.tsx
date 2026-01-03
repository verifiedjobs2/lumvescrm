import React, { useState, useRef, useEffect } from 'react';
import { HiSparkles, HiX, HiPaperAirplane, HiLightBulb, HiChartBar } from 'react-icons/hi';
import api from '../../services/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
  timestamp: Date;
}

interface AIAssistantProps {
  leadId?: number;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ leadId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardInsights, setDashboardInsights] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeMessage: Message = {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your AI Sales Assistant. I can help you with lead intelligence, follow-up strategies, and sales tips. What would you like to know?",
        suggestions: [
          'Analyze my leads',
          'Show hot leads',
          'Follow-up tips',
          'Conversion strategies'
        ],
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      fetchDashboardInsights();
    }
  }, [isOpen]);

  const fetchDashboardInsights = async () => {
    try {
      const response = await api.get('/ai/dashboard');
      setDashboardInsights(response.data);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/ai/chat', {
        message: text,
        leadId: leadId
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.message,
        suggestions: response.data.suggestions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatMessage = (content: string) => {
    // Convert markdown-like formatting to JSX
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold mt-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('• ')) {
        return <p key={i} className="ml-4">• {line.substring(2)}</p>;
      }
      if (line.startsWith('**')) {
        const parts = line.split('**');
        return (
          <p key={i} className="mt-2">
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
          </p>
        );
      }
      return <p key={i}>{line}</p>;
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 ${isOpen ? 'hidden' : ''}`}
      >
        <HiSparkles className="w-6 h-6" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <HiSparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">AI Sales Assistant</h3>
                <p className="text-xs text-purple-200">Lead Intelligence</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          {/* Insights Bar */}
          {dashboardInsights && (
            <div className="bg-purple-50 px-4 py-3 border-b border-purple-100">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <HiChartBar className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-600">Score:</span>
                  <span className="font-semibold text-purple-600">{dashboardInsights.avgScore}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiLightBulb className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">Hot:</span>
                  <span className="font-semibold text-orange-500">{dashboardInsights.hotLeads}</span>
                </div>
                {dashboardInsights.needsAttention > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-red-600 font-medium">{dashboardInsights.needsAttention} urgent</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {message.role === 'assistant'
                      ? formatMessage(message.content)
                      : message.content
                    }
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-white text-purple-600 px-3 py-1.5 rounded-full border border-purple-200 hover:bg-purple-50 transition"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about leads, sales tips..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiPaperAirplane className="w-4 h-4 transform rotate-90" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
