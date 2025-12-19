
import React, { useRef, useEffect, useState } from 'react';
import { Message, AgentMode } from '../types';
import { Send, User, ArrowLeft, FileText, BrainCircuit, Search, MessageSquare, Save, PlusCircle, RefreshCw } from 'lucide-react';
import { marked } from 'marked';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onExit: () => void;
  onClear: () => void;
  currentAgent: AgentMode;
  onSwitchAgent: (mode: AgentMode) => void;
  activeSessionId?: string;
  initialInput?: string;
}

// Icons synchronized with Dashboard options - Reordered as requested
const AGENTS = [
  { id: 'register', label: 'Registro', icon: Search, description: 'Inventario de activos' },
  { id: 'modeling', label: 'Modelado', icon: BrainCircuit, description: 'Análisis de riesgos' },
  { id: 'mitigation', label: 'Mitigación', icon: FileText, description: 'Planes de defensa' },
  { id: 'general', label: 'General', icon: MessageSquare, description: 'Consultas y orquestación' },
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
    messages, 
    onSendMessage, 
    isLoading, 
    onExit, 
    onClear,
    currentAgent,
    onSwitchAgent,
    activeSessionId,
    initialInput
}) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Set initial input if provided (UX Requirement)
  useEffect(() => {
    if (initialInput) {
        setInput(initialInput);
    }
  }, [initialInput]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  const activeAgentInfo = AGENTS.find(a => a.id === currentAgent) || AGENTS[0];

  return (
    <div className="flex flex-col h-full bg-[#FDFBF7] relative font-sans">
      
      {/* Header */}
      <header className="flex-none bg-white border-b border-maia-structure/30 shadow-sm z-30">
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-3">
            
            {/* Left: Navigation, Title & Agent Selector */}
            <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-3 shrink-0">
                    <button 
                        onClick={onExit} 
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-maia-dark transition-colors"
                        title="Volver al Dashboard"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-maia-dark tracking-tight leading-none">
                            Asistente IA
                        </h2>
                    </div>
                </div>

                <div className="h-6 w-px bg-gray-200 hidden md:block shrink-0"></div>

                {/* Agent Mode Selector - Moved Left */}
                <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 shrink-0">
                    {AGENTS.map(agent => (
                        <button
                            key={agent.id}
                            onClick={() => onSwitchAgent(agent.id as AgentMode)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                                currentAgent === agent.id 
                                ? 'bg-white text-maia-dark shadow-sm ring-1 ring-black/5' 
                                : 'text-gray-400 hover:text-maia-dark hover:bg-gray-200/50'
                            }`}
                            title={agent.description}
                        >
                            <agent.icon size={14} strokeWidth={currentAgent === agent.id ? 2 : 1.5} />
                            <span className="hidden lg:inline">{agent.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Right: Actions (Icons) */}
            <div className="flex items-center gap-1 pl-4 shrink-0">
                <button
                    onClick={() => { if(window.confirm('¿Iniciar una nueva conversación?')) onClear(); }}
                    className="p-2.5 rounded-lg text-maia-muted hover:text-maia-dark hover:bg-maia-base/30 transition-all group relative"
                    title="Nueva Conversación"
                >
                    <PlusCircle size={20} />
                </button>

                <button
                    onClick={() => { if(window.confirm('¿Reiniciar la conversación actual?')) onClear(); }}
                    className="p-2.5 rounded-lg text-maia-muted hover:text-maia-dark hover:bg-maia-base/30 transition-all group relative"
                    title="Limpiar Conversación"
                >
                    <RefreshCw size={20} />
                </button>
                
                <div className="h-5 w-px bg-gray-200 mx-1"></div>

                <button
                    onClick={onExit}
                    className="p-2.5 rounded-lg text-maia-muted hover:text-maia-protective hover:bg-maia-base/30 transition-all group relative"
                    title="Guardar y Salir"
                >
                    <Save size={20} />
                </button>
            </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 max-w-4xl mx-auto w-full group ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border ${
                msg.role === 'model' 
                  ? 'bg-white border-maia-structure/40 text-maia-protective' 
                  : 'bg-maia-protective border-maia-protective text-maia-dark'
              }`}
            >
              {msg.role === 'model' ? <activeAgentInfo.icon size={18} /> : <User size={18} />}
            </div>
            
            {/* Bubble */}
            <div
              className={`relative px-6 py-4 text-[15px] leading-relaxed max-w-[85%] shadow-sm ${
                msg.role === 'user'
                  ? 'bg-maia-dark text-white rounded-2xl rounded-tr-sm'
                  : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-maia-structure/30'
              }`}
            >
               {/* Markdown Rendering for Model, Plain text for User */}
               {msg.role === 'model' ? (
                   <div 
                     className="prose prose-sm prose-p:text-gray-700 prose-headings:text-maia-dark prose-headings:font-bold prose-strong:text-maia-dark prose-a:text-maia-protective hover:prose-a:text-maia-dark prose-code:bg-maia-base/30 prose-code:text-maia-dark prose-code:px-1 prose-code:rounded max-w-none"
                     dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} 
                   />
               ) : (
                   <div className="whitespace-pre-wrap font-medium">{msg.text}</div>
               )}

              <div className={`text-[10px] mt-2 opacity-60 uppercase tracking-widest font-bold ${msg.role === 'user' ? 'text-white/80 text-right' : 'text-maia-muted text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-4 max-w-4xl mx-auto w-full pl-2">
             <div className="w-9 h-9 rounded-xl bg-white border border-maia-structure/40 flex items-center justify-center shadow-sm">
                 <activeAgentInfo.icon size={18} className="text-maia-protective animate-pulse" />
             </div>
             <div className="bg-white px-5 py-3 rounded-2xl rounded-tl-sm border border-maia-structure/30 shadow-sm flex items-center gap-3">
                <span className="text-xs font-bold text-maia-muted">Escribiendo</span>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-maia-protective rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-maia-protective rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-maia-protective rounded-full animate-bounce delay-150"></div>
                </div>
             </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white border-t border-maia-structure/30 z-20">
        <form onSubmit={handleSubmit} className="relative flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Escribe a ${activeAgentInfo.label}...`}
            className="flex-1 bg-gray-50/50 border border-gray-200 text-maia-dark rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-maia-protective/20 focus:border-maia-protective transition-all placeholder-maia-muted/50 font-medium"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-maia-dark hover:bg-maia-dark/90 disabled:bg-gray-100 disabled:text-gray-300 text-white rounded-xl px-6 transition-all shadow-lg hover:shadow-maia-dark/20 active:scale-95 flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="max-w-4xl mx-auto mt-3 text-center">
             <p className="text-[10px] text-maia-muted/70 font-medium">
                La IA puede cometer errores. Verifica la información importante.
             </p>
        </div>
      </div>
    </div>
  );
};
