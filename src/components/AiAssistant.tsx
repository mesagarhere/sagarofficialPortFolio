import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Bot,
  Send,
  X,
  Minimize2,
  Sparkles,
  ExternalLink,
  Mail,
  Flame,
  RotateCcw,
  Check,
  MessageSquare,
  Zap,
  Clock,
  Copy,
  ChevronRight,
  ShieldCheck,
  Code2,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  suggestedActions?: Array<{
    label: string;
    url: string;
    type: string;
  }>;
}

const EXECUTIVE_PROMPTS = [
  { label: '💰 Pricing & Packages', query: 'What are Sagar\'s services, packages and pricing starting at $5?' },
  { label: '⚡ Fast Turnaround & Delivery', query: 'How fast can Sagar deliver Python scripts, web pages, or video projects?' },
  { label: '🐍 Python & Web Development', query: 'Can Sagar build web scrapers, automation bots, and responsive React websites?' },
  { label: '🎬 AI Videos & YouTube Thumbnails', query: 'Tell me about Sagar\'s YouTube thumbnails and AI video creation capabilities.' },
  { label: '🛒 How to Order Safely on Fiverr', query: 'How do I place an order on Fiverr with buyer escrow protection?' }
];

export const AiAssistant: React.FC = () => {
  const { data } = usePortfolio();
  const { socialLinks } = data;

  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `### Executive Project Concierge — Sagar D.

Welcome! I am Sagar D.'s **24/7 AI Representative**. Sagar is currently engaged in active engineering and creative sprints, but I am standing by to assist you:

* **Python & Automation**: Scrapers, bots, and backend utilities starting at **$5**.
* **Web Engineering**: Responsive modern React & Tailwind web applications from **$25**.
* **Content & Visual Media**: High-CTR YouTube thumbnails ($5) and short-form video editing ($15–$25).
* **Delivery Schedule**: Rapid turnarounds between **24 to 72 hours**.

How can Sagar's expertise assist your business or project today?`,
      timestamp: 'Just now',
      suggestedActions: [
        {
          label: 'Instant Order on Fiverr ($5+)',
          url: socialLinks.fiverr,
          type: 'fiverr'
        },
        {
          label: `Direct Email (${socialLinks.email || 'mrsagar.0790@gmail.com'})`,
          url: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(socialLinks.email || 'mrsagar.0790@gmail.com')}&su=${encodeURIComponent('Client Inquiry for Sagar D.')}`,
          type: 'email'
        }
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen, messages]);

  // Global custom event listener to open AI Assistant from Hero/Contact
  useEffect(() => {
    const handleOpenAssistant = (e: CustomEvent<{ query?: string }>) => {
      setIsOpen(true);
      if (e.detail?.query) {
        handleSendMessage(e.detail.query);
      }
    };

    window.addEventListener('open-ai-assistant', handleOpenAssistant as EventListener);
    return () => {
      window.removeEventListener('open-ai-assistant', handleOpenAssistant as EventListener);
    };
  }, []);

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const aiMsgId = `ai-${Date.now()}`;
    const initialAiMsg: ChatMessage = {
      id: aiMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true
    };

    const currentHistory = [...messages, userMsg];
    setMessages([...currentHistory, initialAiMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify({
          userMessage: query,
          messages: currentHistory.map((m) => ({
            role: m.role,
            content: m.content
          })),
          stream: true
        }),
        signal: abortController.signal
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      // Check if response is streaming SSE
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedText = '';
        let finalActions: Array<{ label: string; url: string; type: string }> | undefined = undefined;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data:')) {
              const dataStr = trimmed.replace(/^data:\s*/, '');
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  accumulatedText += parsed.text;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === aiMsgId
                        ? { ...msg, content: accumulatedText, isStreaming: true }
                        : msg
                    )
                  );
                }
                if (parsed.done && parsed.suggestedActions) {
                  finalActions = parsed.suggestedActions;
                }
              } catch {
                // Ignore chunk parse error
              }
            }
          }
        }

        // Finalize streaming
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId
              ? {
                  ...msg,
                  content: accumulatedText || 'I am ready to assist with your project inquiry.',
                  isStreaming: false,
                  suggestedActions: finalActions || [
                    { label: 'Order on Fiverr ($5+)', url: socialLinks.fiverr, type: 'fiverr' },
                    { label: 'Direct Email', url: `mailto:${socialLinks.email}`, type: 'email' }
                  ]
                }
              : msg
          )
        );
      } else {
        // Non-streaming fallback
        const data = await response.json();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId
              ? {
                  ...msg,
                  content: data.reply,
                  isStreaming: false,
                  suggestedActions: data.suggestedActions
                }
              : msg
          )
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;

      console.warn('Chat request completed with fallback:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsgId
            ? {
                ...msg,
                content: `### Executive Notice\n\nSagar is available for immediate freelance work starting at **$5** with delivery in **24–48 hours**.\n\n* **Fiverr Gig**: Place your order with escrow protection at [fiverr.com/s/jyje2oV](${socialLinks.fiverr}).\n* **Direct Email**: Send full specifications to **${socialLinks.email}**.\n\nSagar personally monitors inquiries and replies within 1–4 hours!`,
                isStreaming: false,
                suggestedActions: [
                  { label: 'Instant Order on Fiverr ($5+)', url: socialLinks.fiverr, type: 'fiverr' },
                  { label: 'Direct Email Inquiry', url: `mailto:${socialLinks.email}`, type: 'email' }
                ]
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `### Conversation Cleared\n\nI am standing by to assist with questions about **Python development**, **modern responsive websites**, **YouTube thumbnails**, or **AI video projects** starting at **$5**.\n\nHow can I help you today?`,
        timestamp: 'Just now',
        suggestedActions: [
          { label: 'Order on Fiverr ($5+)', url: socialLinks.fiverr, type: 'fiverr' },
          { label: `Email Sagar (${socialLinks.email || 'mrsagar.0790@gmail.com'})`, url: `mailto:${socialLinks.email || 'mrsagar.0790@gmail.com'}`, type: 'email' }
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-900/90 text-white border border-white/20 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-neutral-200">Sagar's AI Agent is <strong className="text-emerald-400">Online 24/7</strong></span>
          </div>
        )}

        <button
          type="button"
          id="btn-open-ai-assistant"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open 24/7 AI Customer Assistant"
          className={`group flex items-center gap-3 p-3.5 sm:px-4 sm:py-3 rounded-full transition-all duration-300 shadow-2xl cursor-pointer ${
            isOpen
              ? 'bg-neutral-900 border border-white/25 text-white'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/30 hover:scale-105'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-neutral-950"></span>
            </span>
          </div>

          <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-tight">Sagar D. AI Concierge</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-mono uppercase font-bold border border-emerald-500/30">
                Fast AI
              </span>
            </div>
            <span className="text-[10px] text-blue-200">
              Standing by 24/7 while Sagar codes
            </span>
          </div>

          {isOpen ? (
            <X className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100" />
          ) : (
            <ChevronRight className="w-4 h-4 ml-1 hidden sm:block opacity-70 group-hover:opacity-100" />
          )}
        </button>
      </div>

      {/* Expanded Executive AI Concierge Window */}
      {isOpen && (
        <div
          id="ai-assistant-window"
          className="fixed bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[440px] max-h-[640px] h-[84vh] flex flex-col rounded-3xl glass-panel border border-white/20 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)'
          }}
        >
          {/* Executive Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-neutral-950/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md border border-white/20 relative">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-neutral-950 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Sagar D. Project Concierge
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Online 24/7
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Available 24/7 for instant scoping & quotes</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize assistant"
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SLA Performance Bar */}
          <div className="px-4 py-2 bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-blue-900/30 border-b border-white/10 flex items-center justify-between text-[11px] text-blue-200 shrink-0">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Sagar is busy coding? Ask AI for instant specs & rates.</span>
            </div>
            <a
              href={socialLinks.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Fiverr ($5+)</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => {
              const isAi = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`relative group max-w-[90%] p-4 rounded-2xl leading-relaxed whitespace-pre-line ${
                      isAi
                        ? 'bg-white/[0.08] border border-white/15 text-neutral-100 rounded-tl-sm shadow-sm'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-md'
                    }`}
                  >
                    {/* Copy Button on hover */}
                    {isAi && msg.content && (
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-neutral-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}

                    {msg.content ? (
                      <div className="space-y-1">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-neutral-400">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-xs">Analyzing and drafting response...</span>
                      </div>
                    )}

                    {/* Streaming Cursor */}
                    {msg.isStreaming && (
                      <span className="inline-block w-1.5 h-3.5 bg-blue-400 ml-1 animate-pulse align-middle" />
                    )}

                    {/* Suggested Action Buttons */}
                    {isAi && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                        {msg.suggestedActions.map((action, i) => (
                          <a
                            key={i}
                            href={action.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                              action.type === 'fiverr'
                                ? 'bg-[#1dbf73] hover:bg-[#19a463] text-white shadow-sm'
                                : 'bg-white/10 hover:bg-white/20 text-neutral-100 border border-white/15'
                            }`}
                          >
                            {action.type === 'fiverr' ? (
                              <Flame className="w-3.5 h-3.5 text-white" />
                            ) : (
                              <Mail className="w-3.5 h-3.5 text-blue-300" />
                            )}
                            <span>{action.label}</span>
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1 px-1">
                    <span className="text-[10px] text-neutral-500">
                      {msg.timestamp}
                    </span>
                    {isAi && (
                      <span className="text-[9px] text-neutral-500 uppercase tracking-wider">
                        • Verified SLA
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Executive Fast-Chips Carousel */}
          <div className="px-3 py-2 border-t border-white/10 bg-black/30 shrink-0 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            {EXECUTIVE_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(item.query)}
                className="shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-medium bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-200 hover:text-white transition-colors cursor-pointer text-left whitespace-nowrap flex items-center gap-1"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="p-3 sm:p-4 border-t border-white/10 bg-neutral-950/80 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Sagar's AI: 'Can you build a Python scraper for $5?'"
                className="flex-1 px-4 py-2.5 rounded-2xl text-xs sm:text-sm bg-white/[0.06] border border-white/15 text-white placeholder-neutral-500 outline-none focus:border-blue-400 focus:bg-white/[0.09] transition-all"
              />
              <button
                type="button"
                id="btn-ai-send"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white transition-all cursor-pointer shrink-0 shadow-md shadow-blue-500/20"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-2 px-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Available 24/7 for Client Inquiries
              </span>
              <span>Gemini 3.8 Flash • Real-time</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
