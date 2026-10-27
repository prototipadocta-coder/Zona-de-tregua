import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  Copy, 
  Check, 
  Wind, 
  ShieldAlert, 
  Sparkles, 
  HeartHandshake,
  MessageCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { ChatMessage, TabType } from '../types';
import { QUICK_PROMPTS, INITIAL_BOT_MESSAGES, getBotResponseForQuery } from '../data/treguaBotData';
import { sounds } from '../utils/audio';

interface TreguaBotProps {
  onNavigateTab: (tab: TabType) => void;
}

export const TreguaBot: React.FC<TreguaBotProps> = ({ onNavigateTab }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('treguabot_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_BOT_MESSAGES;
      }
    }
    return INITIAL_BOT_MESSAGES;
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    try {
      localStorage.setItem('treguabot_chat_history', JSON.stringify(messages));
    } catch {
      // quota or private mode
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    sounds.playClick();

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulated natural empathetic typing delay
    setTimeout(() => {
      const response = getBotResponseForQuery(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        helpfulTool: response.helpfulTool
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      sounds.playPeaceBell();
    }, 750);
  };

  const handleClearHistory = () => {
    sounds.playClick();
    setMessages(INITIAL_BOT_MESSAGES);
    localStorage.removeItem('treguabot_chat_history');
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Bot Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Bot className="w-7 h-7 text-emerald-400" />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">TreguaBot</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold">
                  Mediador Escolar IA
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                En línea · Confidencial · Sin juicios, sin regaños, 100% de tu lado para proteger tu futuro
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearHistory}
              title="Borrar conversación local"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar chat</span>
            </button>
          </div>
        </div>

        {/* Quick Topics Pills */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Selecciona una situación para recibir ayuda inmediata:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handleSendMessage(prompt.prompt)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-left text-xs text-slate-200 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/30 transition cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {prompt.id === 'rabia' && <span className="text-amber-400 text-sm">🔥</span>}
                  {prompt.id === 'amenaza' && <span className="text-rose-400 text-sm">⚠️</span>}
                  {prompt.id === 'amigo' && <span className="text-sky-400 text-sm">🤝</span>}
                  {prompt.id === 'libre' && <span className="text-teal-400 text-sm">✍️</span>}
                </div>
                <span className="font-medium truncate">{prompt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-4 min-h-[420px] max-h-[560px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-emerald-400" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-sm leading-relaxed ${
                isBot 
                  ? 'bg-slate-800/90 border border-slate-700/60 text-slate-200' 
                  : 'bg-emerald-600 text-white rounded-tr-none shadow-md'
              }`}>
                {/* Header info */}
                <div className="flex items-center justify-between text-[11px] opacity-70 pb-1 border-b border-white/10 mb-1">
                  <span className="font-semibold">{isBot ? 'TreguaBot' : 'Tú (Anónimo)'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Content with rich markdown styling */}
                <div className="space-y-2 whitespace-pre-line">
                  {msg.text.split('\n\n').map((paragraph, i) => {
                    // Check for headers
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h4 key={i} className="font-bold text-white text-base text-emerald-300">
                          {paragraph.replace('### ', '')}
                        </h4>
                      );
                    }
                    // Replace bold markers
                    const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '$1');
                    return <p key={i}>{formatted}</p>;
                  })}
                </div>

                {/* Actionable in-chat helpers */}
                {isBot && msg.helpfulTool && (
                  <div className="mt-3 pt-3 border-t border-slate-700/80 flex flex-wrap gap-2">
                    {msg.helpfulTool === 'breathing' && (
                      <button
                        onClick={() => onNavigateTab('herramientas')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/40 transition cursor-pointer"
                      >
                        <Wind className="w-3.5 h-3.5" />
                        <span>Abrir Respiración Guiada 4-7-8</span>
                      </button>
                    )}

                    {msg.helpfulTool === 'emergency' && (
                      <button
                        onClick={() => onNavigateTab('lineas')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold border border-rose-500/40 transition cursor-pointer"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Líneas de Protección Inmediata</span>
                      </button>
                    )}

                    {msg.helpfulTool === 'responses' && (
                      <button
                        onClick={() => onNavigateTab('herramientas')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40 transition cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ver Banco de Respuestas Asertivas</span>
                      </button>
                    )}

                    {msg.helpfulTool === 'report' && (
                      <button
                        onClick={() => onNavigateTab('buzon')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-semibold border border-sky-500/40 transition cursor-pointer"
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>Pedir Mediación Escolar Neutral</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Quick Follow-up actions if present */}
                {isBot && msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.quickActions.map((qa, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(qa.actionPayload)}
                        className="text-xs bg-slate-900/90 hover:bg-slate-700/90 text-slate-300 hover:text-white px-2.5 py-1 rounded-full border border-slate-700 transition cursor-pointer"
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Copy button */}
                {isBot && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 transition"
                      title="Copiar respuesta"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 text-[10px]">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[10px]">Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-4 py-3 flex items-center gap-1.5 text-xs text-slate-400">
              <span>TreguaBot está pensando una respuesta empática</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Cuéntame qué está pasando... (Ej: Me están buscando pelea a la salida)"
            className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder-slate-500 outline-none transition shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={!inputMessage.trim() || isTyping}
          className="p-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-950 font-bold transition shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Footer reassurance note */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 px-1">
        <span className="flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-emerald-400" />
          Tus mensajes no se guardan en ningún servidor externo ni se comparten con el colegio.
        </span>
        <button
          onClick={() => onNavigateTab('lineas')}
          className="text-emerald-400 hover:underline hidden sm:inline"
        >
          ¿Crisis urgente? Ver líneas gratuitas
        </button>
      </div>
    </div>
  );
};
