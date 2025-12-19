
import React, { useContext, useState, useEffect, useRef } from 'react';
import { ThreatModelContext, Threat, AgentMode, ChatSession, AppNotification, ContextFile } from '../types';
import { 
  Shield, 
  AlertTriangle, 
  Plus, 
  Search, 
  ArrowRight,
  ArrowLeft, 
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  BookOpen,
  HelpCircle,
  FileText,
  Bell,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Settings,
  User,
  Users,
  Upload,
  Server,
  ShieldCheck,
  ShieldAlert,
  BrainCircuit,
  History,
  Trash2,
  Wind,
  Clock,
  LogOut
} from 'lucide-react';
import { ManualEntryModal } from './ManualEntryModal';
import { KnowledgeBase } from './KnowledgeBase';
import { UserProfile } from './UserProfile';
import { AppSettings } from './AppSettings';
import { NotificationPanel } from './NotificationSystem';
import { fileSystem, FileNode } from '../data/knowledgeData';

interface DashboardProps {
  onConsultAI: (mode: AgentMode, context?: ContextFile) => void;
  onResumeChat: (session: ChatSession) => void;
  onNotificationAction?: (notification: AppNotification) => void; 
  onLogout: () => void;
}

const ASSISTANT_OPTIONS = [
  {
    id: 'register',
    title: 'Registro',
    description: 'Identifica y cataloga tus activos críticos y adversarios potenciales a través de una entrevista guiada.',
    icon: Search,
    mode: 'register' as AgentMode
  },
  {
    id: 'modeling',
    title: 'Modelado de Amenazas',
    description: 'Analiza vulnerabilidades cruzando tus activos con vectores de ataque.',
    icon: BrainCircuit,
    mode: 'modeling' as AgentMode
  },
  {
    id: 'mitigation',
    title: 'Generación de planes',
    description: 'Crea estrategias defensivas y planes de acción concretos para los riesgos detectados.',
    icon: FileText,
    mode: 'mitigation' as AgentMode
  },
  {
    id: 'general',
    title: 'Consulta',
    description: 'Pregunta sobre tu situación, metodologías, mejores prácticas y obtén orientación experta en seguridad.',
    icon: MessageSquare,
    mode: 'general' as AgentMode
  }
];

export const Dashboard: React.FC<DashboardProps> = ({ onConsultAI, onResumeChat, onNotificationAction, onLogout }) => {
  const { state, addThreat, addAsset, addAdversary, deleteChatSession, markNotificationRead, clearNotifications } = useContext(ThreatModelContext);
  const [showManualModal, setShowManualModal] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [activeTab, setActiveTab] = useState('panel'); // 'panel', 'mitigation', 'conversations', 'knowledge', 'profile', 'settings'
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Notifications UI State
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Conversations State
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [showHistory, setShowHistory] = useState(false);

  // Knowledge Base State (Lifted)
  const [knowledgeFiles, setKnowledgeFiles] = useState<FileNode[]>(fileSystem);
  const [kbSelectedFileId, setKbSelectedFileId] = useState<string | null>(null);
  const [kbIsEditing, setKbIsEditing] = useState(false);

  // Date for header
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

  // KPIs
  const totalAssets = state.assets.length;
  const totalAdversaries = state.adversaries.length;
  const activeThreats = state.threats.filter(t => t.status !== 'Cerrado').length;
  
  // Safe calculation for avgRisk
  const avgRisk = state.threats.length > 0 
    ? Math.round(state.threats.reduce((acc, t) => acc + (Number(t.riskScore) || 0), 0) / state.threats.length) 
    : 0;
  
  // Notification Count
  const unreadNotifications = state.notifications.filter(n => !n.read).length;

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSaveManual = (data: any) => {
    // We check 'entryType' instead of 'type' because 'type' is a field in the asset/adversary forms themselves.
    if (data.entryType === 'asset') {
        addAsset({
            id: Date.now().toString(),
            name: data.name,
            type: data.type,
            value: Number(data.value),
            description: data.description
        });
    } else if (data.entryType === 'adversary') {
        addAdversary({
            id: Date.now().toString(),
            name: data.name,
            type: data.type,
            capability: Number(data.capability),
            motivation: data.motivation
        });
    } else {
        // Threat
        const impact = Number(data.impact) || 0;
        const probability = Number(data.probability) || 0;
        const riskScore = impact * probability;
        const riskLevel = riskScore >= 15 ? 'Crítico' : riskScore >= 10 ? 'Alto' : riskScore >= 5 ? 'Medio' : 'Bajo';
        
        addThreat({
            id: Date.now().toString(),
            name: data.name,
            category: data.category,
            relatedAsset: data.relatedAsset,
            relatedAdversary: data.relatedAdversary,
            impact,
            probability,
            riskScore,
            riskLevel,
            description: data.description,
            mitigations: [],
            status: 'Identificado',
            dateIdentified: new Date()
        });
    }
  };

  // --- Knowledge Base Handlers ---
  const handleCreateFile = () => {
    const newFile: FileNode = {
      id: `file_${Date.now()}`,
      name: 'Nuevo Documento',
      type: 'file',
      content: '# Nuevo Documento\n\nEscribe aquí tu contenido...'
    };

    // Add to "Mis archivos" (folder_user_files) by default if it exists, otherwise root
    const updatedFiles = [...knowledgeFiles];
    const targetFolder = updatedFiles.find(f => f.id === 'folder_user_files');
    
    if (targetFolder && targetFolder.children) {
      targetFolder.children.unshift(newFile);
    } else {
      updatedFiles.unshift(newFile);
    }

    setKnowledgeFiles(updatedFiles);
    setKbSelectedFileId(newFile.id);
    setKbIsEditing(true); // Auto-open editor
  };

  const handleUpdateFile = (id: string, newName: string, newContent: string) => {
    const updateRecursive = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, name: newName, content: newContent };
        }
        if (node.children) {
          return { ...node, children: updateRecursive(node.children) };
        }
        return node;
      });
    };
    setKnowledgeFiles(updateRecursive(knowledgeFiles));
    setKbIsEditing(false);
  };

  const handleDeleteFile = (id: string) => {
    // Recursive delete
    const deleteRecursive = (nodes: FileNode[], parentId?: string): FileNode[] => {
      return nodes.filter(node => {
        if (node.id === id) {
           // Protection Check: Cannot delete files inside 'folder_fundamentos'
           if (parentId === 'folder_fundamentos' || node.id === 'folder_fundamentos') {
             alert("Los archivos de Fundamentos Teóricos son parte del núcleo de MAIA y no pueden eliminarse.");
             return true; 
           }
           return false;
        }
        if (node.children) {
          node.children = deleteRecursive(node.children, node.id);
        }
        return true;
      });
    };

    if (window.confirm("¿Estás segura de eliminar este archivo?")) {
        const newFiles = deleteRecursive([...knowledgeFiles]);
        setKnowledgeFiles(newFiles);
        if (kbSelectedFileId === id) {
          setKbSelectedFileId(null);
          setKbIsEditing(false);
        }
    }
  };

  const getRiskBadge = (level: string) => {
    switch(level) {
        case 'Crítico': return 'bg-maia-alert text-white';
        case 'Alto': return 'bg-[#D97757] text-white';
        case 'Medio': return 'bg-[#F4D35E] text-maia-dark';
        default: return 'bg-gray-100 text-gray-600';
    }
  };

  const NavItem = ({ id, icon: Icon, label, onClick, isActive }: any) => (
    <button 
      onClick={onClick}
      className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-5 gap-3'} py-3 mx-auto rounded-lg transition-all duration-200 group relative w-full mb-1 ${
        isActive 
          ? 'bg-maia-dark/5 text-maia-dark font-bold shadow-sm border border-maia-dark/5' 
          : 'text-maia-dark/70 hover:bg-white/40 hover:text-maia-dark'
      }`}
    >
      <Icon size={18} className={`shrink-0 ${isActive ? 'text-maia-dark' : 'text-maia-dark/60 group-hover:text-maia-dark'}`} />
      
      {!isCollapsed && (
        <>
            <span className="text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden">{label}</span>
            {isActive && <ChevronRight size={14} className="ml-auto text-maia-dark opacity-50" />}
        </>
      )}

      {/* Tooltip for Nav Items when collapsed */}
      {isCollapsed && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-maia-dark text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all z-[60] shadow-xl">
            {label}
            <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-maia-dark rotate-45"></div>
        </div>
      )}
    </button>
  );

  const renderHeaderActions = () => {
    switch(activeTab) {
        case 'panel':
            return (
                <>
                    <button 
                      onClick={() => setShowManualModal(true)}
                      className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-maia-dark text-maia-dark font-bold text-xs hover:bg-maia-protective hover:text-maia-dark hover:border-maia-protective transition-all shadow-sm"
                    >
                        <Plus size={16} />
                        Nuevo registro
                    </button>

                    <button 
                      onClick={() => onConsultAI('register')}
                      className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-maia-dark text-white font-bold text-xs hover:bg-maia-protective hover:text-maia-dark transition-all shadow-lg hover:shadow-maia-protective/40 group"
                    >
                        <Sparkles size={16} className="transition-colors" />
                        Registro asistido
                    </button>
                </>
            );
        case 'mitigation':
            return (
                <button 
                  onClick={() => onConsultAI('mitigation')}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-maia-dark text-white font-bold text-xs hover:bg-maia-protective hover:text-maia-dark transition-all shadow-lg hover:shadow-maia-protective/40 group"
                >
                    <Sparkles size={16} className="transition-colors" />
                    Generar plan
                </button>
            );
        case 'knowledge':
            return (
                <>
                    <button 
                      onClick={handleCreateFile}
                      className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-maia-dark text-maia-dark font-bold text-xs hover:bg-maia-protective hover:text-maia-dark hover:border-maia-protective transition-all shadow-sm"
                    >
                        <Plus size={16} />
                        Nuevo archivo
                    </button>
                    <button 
                      className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-maia-dark text-white font-bold text-xs hover:bg-maia-protective hover:text-maia-dark transition-all shadow-lg hover:shadow-maia-protective/40 group"
                    >
                        <Upload size={16} className="transition-colors" />
                        Cargar archivo
                    </button>
                </>
            );
        case 'conversations':
            return (
                <button
                    onClick={() => setShowHistory(true)}
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-maia-dark text-white font-bold text-xs hover:bg-maia-protective hover:text-maia-dark transition-all shadow-lg hover:shadow-maia-protective/40 group"
                >
                    <History size={16} className="transition-colors" />
                    Ver Historial
                </button>
            );
        default:
            return null;
    }
  };

  const filteredConversations = state.chatHistory.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (c.summary && c.summary.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-full w-full bg-maia-base font-sans overflow-hidden">
      
      {/* SIDEBAR - Collapsible */}
      <aside 
        className={`${isCollapsed ? 'w-[80px]' : 'w-[280px]'} bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl flex flex-col border-r border-white/50 flex-shrink-0 h-full relative z-40 shadow-xl shadow-maia-dark/5 transition-all duration-300 ease-in-out`}
      >
        <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3.5 top-10 w-7 h-7 bg-white border border-maia-structure/80 rounded-full flex items-center justify-center text-maia-dark/70 hover:text-maia-dark hover:border-maia-protective transition-all shadow-sm z-50 hover:scale-105"
        >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className={`py-8 flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-6 gap-3'} transition-all`}>
            <div className="w-10 h-10 bg-maia-dark rounded-xl flex items-center justify-center shadow-soft text-white shrink-0">
                <Shield size={20} />
            </div>
            {!isCollapsed && (
                <div className="flex flex-col h-10 justify-center overflow-hidden whitespace-nowrap">
                    <h1 className="text-2xl font-bold text-maia-dark tracking-tighter leading-none">MAIA</h1>
                    <p className="text-[10px] text-maia-muted font-bold tracking-wider uppercase leading-none mt-0.5">Modelado de Amenazas</p>
                </div>
            )}
        </div>

        <div className="px-6 mb-4">
            <div className="h-px w-full bg-maia-dark/5"></div>
        </div>

        <div className={`flex-1 px-3 space-y-1 ${isCollapsed ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden custom-scrollbar'}`}>
            <NavItem 
                id="panel" 
                icon={LayoutDashboard} 
                label="Panel de Control" 
                isActive={activeTab === 'panel'} 
                onClick={() => setActiveTab('panel')}
            />
            <NavItem 
                id="conversations" 
                icon={Sparkles} 
                label="Asistente IA" 
                isActive={activeTab === 'conversations'}
                onClick={() => {
                    setActiveTab('conversations');
                    setShowHistory(false);
                }}
            />
            <NavItem 
                id="mitigation" 
                icon={ClipboardList} 
                label="Planes de Mitigación" 
                isActive={activeTab === 'mitigation'} 
                onClick={() => setActiveTab('mitigation')}
            />
            <NavItem 
                id="knowledge" 
                icon={BookOpen} 
                label="Base de conocimiento" 
                isActive={activeTab === 'knowledge'} 
                onClick={() => setActiveTab('knowledge')}
            />
        </div>

        <div className="px-3 pb-4">
            <div className="my-3 px-2">
                <div className="h-px w-full bg-maia-dark/10"></div>
            </div>

            <NavItem 
                id="profile" 
                icon={User} 
                label="Perfil" 
                isActive={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')}
            />
            <NavItem 
                id="settings" 
                icon={Settings} 
                label="Configuración" 
                isActive={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')}
            />

            <div className="mt-4">
                {isCollapsed ? (
                    <div className="flex justify-center">
                        <button 
                            onClick={() => setActiveTab('knowledge')}
                            className="w-10 h-10 bg-white border border-maia-structure/50 rounded-xl flex items-center justify-center text-maia-muted hover:text-maia-dark hover:border-maia-protective transition-all shadow-sm group relative"
                        >
                            <HelpCircle size={18} />
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-maia-dark text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all z-[60] shadow-xl">
                                Centro de Ayuda
                                <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-maia-dark rotate-45"></div>
                            </div>
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setActiveTab('knowledge')}
                        className="w-full bg-white/40 hover:bg-white border border-maia-structure/50 rounded-xl p-3 flex items-center gap-3 transition-all hover:shadow-sm group text-left"
                    >
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-maia-muted group-hover:text-maia-protective transition-colors border border-gray-50">
                            <HelpCircle size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-maia-dark group-hover:text-maia-protective transition-colors">¿Necesitas ayuda?</p>
                            <p className="text-[10px] text-maia-muted">Revisa la documentación</p>
                        </div>
                    </button>
                )}
            </div>

            {/* LOGOUT BUTTON */}
            <div className="mt-2 pt-2 border-t border-maia-dark/5 flex justify-center">
                <button 
                    onClick={onLogout}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-2 rounded-xl text-maia-dark/40 hover:text-maia-alert hover:bg-maia-alert/5 transition-colors group`}
                    title="Cerrar Sesión"
                >
                    <LogOut size={16} />
                    {!isCollapsed && <span className="text-xs font-bold ml-3">Salir</span>}
                </button>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full bg-white relative overflow-hidden shadow-2xl z-10 transition-all duration-300">
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-white z-10 shrink-0">
            <div>
                <h2 className="text-2xl font-bold text-maia-dark tracking-tight animate-fade-in">
                    {activeTab === 'panel' && 'Panel de Control'}
                    {activeTab === 'mitigation' && 'Planes de Mitigación'}
                    {activeTab === 'knowledge' && 'Base de Conocimiento'}
                    {activeTab === 'conversations' && 'Asistente IA'}
                    {activeTab === 'profile' && 'Perfil de Usuario'}
                    {activeTab === 'settings' && 'Configuración'}
                </h2>
                {['panel', 'mitigation', 'knowledge'].includes(activeTab) && (
                    <p className="text-xs text-maia-muted font-medium mt-1 animate-fade-in">
                        Última Actualización: {formattedDate}
                    </p>
                )}
                {activeTab === 'conversations' && (
                    <p className="text-xs text-maia-muted font-medium mt-1 animate-fade-in">
                        {state.chatHistory.length} conversaciones guardadas
                    </p>
                )}
            </div>
            
            <div className="flex items-center gap-3">
                {renderHeaderActions()}
                
                <div className="relative ml-2" ref={notifRef}>
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`p-2.5 rounded-full transition-colors relative ${
                            showNotifications ? 'bg-maia-dark text-white' : 'text-gray-400 hover:bg-gray-50 hover:text-maia-dark'
                        }`}
                    >
                        <Bell size={20} />
                        {unreadNotifications > 0 && (
                            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-maia-alert rounded-full border border-white"></span>
                        )}
                    </button>
                    
                    <NotificationPanel 
                        isOpen={showNotifications}
                        onClose={() => setShowNotifications(false)}
                        notifications={state.notifications}
                        onMarkRead={markNotificationRead}
                        onClear={clearNotifications}
                        onAction={(n) => {
                            if (onNotificationAction) onNotificationAction(n);
                        }}
                    />
                </div>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden p-0 md:p-8 pt-2">
            
            {/* KPI GRID */}
            {activeTab === 'panel' && (
             <div className="h-full overflow-y-auto custom-scrollbar px-1 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-deep transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-5">
                            <div className="p-0">
                                <Server size={28} className="text-maia-dark group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Activos</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-5xl font-bold text-maia-dark tracking-tighter">{totalAssets}</div>
                            <span className="text-sm text-maia-dark font-bold">identificados</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-deep transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-5">
                            <div className="p-0">
                                <Users size={28} className="text-maia-dark group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Adversarios</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-5xl font-bold text-maia-dark tracking-tighter">{totalAdversaries}</div>
                            <span className="text-sm text-maia-dark font-bold">perfilados</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-deep transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-5">
                            <div className="p-0">
                                <ShieldAlert size={28} className="text-maia-dark group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Amenazas</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-5xl font-bold text-maia-dark tracking-tighter">{activeThreats}</div>
                            <span className="text-sm text-maia-dark font-bold">activas</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-deep transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-5">
                            <div className="p-0">
                                <BrainCircuit size={28} className="text-maia-dark group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Riesgo</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-5xl font-bold text-maia-dark tracking-tighter">{avgRisk}<span className="text-2xl text-gray-300 font-light ml-1">/25</span></div>
                            <span className="text-sm text-maia-dark font-bold">score</span>
                        </div>
                    </div>
                </div>

                {/* Main Data Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                    <div className="px-8 py-8 border-b border-gray-100 flex justify-between items-center bg-white">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-maia-dark">Matriz de Riesgos</h3>
                            <p className="text-sm text-gray-500 mt-1">Estado actual de la infraestructura de seguridad.</p>
                        </div>
                        <div className="flex gap-3">
                             <select className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-4 py-2 text-gray-600 outline-none focus:border-maia-protective font-medium cursor-pointer hover:border-gray-300 transition-colors">
                                <option>Filtrar por Estado</option>
                                <option>Activos</option>
                                <option>Cerrados</option>
                             </select>
                             <button className="text-xs font-bold text-maia-protective hover:text-maia-dark transition-colors px-2">
                                 Ver Todo
                             </button>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto">
                        {state.threats.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50/30">
                                <div className="bg-white p-4 rounded-full mb-4 shadow-sm border border-gray-100">
                                    <Wind size={32} className="text-gray-300" />
                                </div>
                                <p className="font-bold text-gray-500 mb-1 text-lg">Sin amenazas detectadas</p>
                                <p className="text-sm mb-6 max-w-xs text-center leading-relaxed">Tu modelo está limpio. Usa el asistente IA para identificar posibles riesgos.</p>
                                <button onClick={() => onConsultAI('general')} className="text-maia-protective font-bold text-sm hover:underline flex items-center gap-1">
                                    Iniciar conversación <ArrowRight size={14} />
                                </button>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/40 text-xs uppercase text-gray-500 font-bold tracking-wider">
                                    <tr>
                                        <th className="px-8 py-5 pl-8 rounded-tl-lg">Amenaza</th>
                                        <th className="px-6 py-5">Nivel de Riesgo</th>
                                        <th className="px-6 py-5">Activo</th>
                                        <th className="px-6 py-5">Estado</th>
                                        <th className="px-6 py-5 text-right pr-8 rounded-tr-lg">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {state.threats.map((threat) => (
                                        <tr key={threat.id} className="hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => setSelectedThreat(threat)}>
                                            <td className="px-8 py-5">
                                                <div className="font-bold text-maia-dark text-base">{threat.name}</div>
                                                <div className="text-xs text-gray-500 mt-1.5 flex items-center gap-2 font-medium">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-maia-structure"></span>
                                                    {threat.category}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border border-transparent ${getRiskBadge(threat.riskLevel)} bg-opacity-90`}>
                                                    {threat.riskLevel}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                 <div className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                                                        <Shield size={12} />
                                                    </div>
                                                    {threat.relatedAsset}
                                                 </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${threat.status === 'Cerrado' ? 'bg-green-500' : 'bg-maia-dark animate-pulse'}`}></span>
                                                    <span className="text-sm text-gray-600 font-medium">{threat.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right pr-8">
                                                <button className="text-gray-300 hover:text-maia-protective transition-colors p-2 hover:bg-maia-base/30 rounded-lg">
                                                    <ArrowRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
             </div>
            )}

            {/* CONVERSATIONS VIEW - REDESIGNED */}
            {activeTab === 'conversations' && (
                <div className="flex flex-col h-full overflow-hidden bg-white">
                    {!showHistory ? (
                        <div className="h-full w-full max-w-7xl mx-auto p-4 md:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                                
                                {/* LEFT COLUMN (Span 4) */}
                                <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                                    {/* 1. How it works */}
                                    <div className="flex-1 bg-maia-base/20 rounded-2xl p-8 border border-maia-structure/30 flex flex-col justify-center animate-fade-in relative overflow-hidden group">
                                         {/* Decorative element */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-maia-structure/10 rounded-full -mr-16 -mt-16 pointer-events-none group-hover:bg-maia-structure/20 transition-colors"></div>
                                        
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold text-maia-dark mb-4 tracking-tight">
                                                ¿Cómo funciona?
                                            </h3>
                                            <p className="text-sm text-maia-dark/70 font-medium leading-relaxed">
                                                MAIA utiliza agentes de Inteligencia Artificial (IA). Cada unx se especializa en fases y procesos específicos para tu estrategia de seguridad y te guiarán a través de entrevistas, análisis, generación de documentos estratégicos.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 3. Tip (Modified) */}
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex items-center gap-4 animate-fade-in" style={{animationDelay: '150ms'}}>
                                        <div className="p-2.5 bg-gray-50 rounded-xl text-maia-protective shrink-0">
                                            <BookOpen size={20} />
                                        </div>
                                        <p className="text-xs text-maia-dark/80 font-medium leading-relaxed">
                                            Revisa la <button onClick={() => setActiveTab('knowledge')} className="text-maia-dark font-bold hover:underline hover:text-maia-protective transition-colors">base de conocimiento</button> para entender y añadir contexto.
                                        </p>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN (Span 8) */}
                                <div className="lg:col-span-8 h-full overflow-hidden flex flex-col animate-fade-in pl-0 lg:pl-4" style={{animationDelay: '100ms'}}>
                                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-2 space-y-4">
                                        {ASSISTANT_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => onConsultAI(opt.mode)}
                                                className="w-full text-left bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-lg hover:border-maia-dark/30 transition-all duration-300 group flex items-center gap-6 relative overflow-hidden"
                                            >
                                                {/* Left Border Accent - Purple */}
                                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-maia-dark/10 group-hover:bg-maia-dark transition-colors"></div>

                                                {/* Icon - Purple, no bg */}
                                                <div className="ml-2 text-maia-dark group-hover:scale-110 transition-transform duration-300">
                                                    <opt.icon size={28} strokeWidth={1.5} />
                                                </div>

                                                <div className="flex-1">
                                                    <h4 className="text-base font-bold text-maia-dark mb-1 group-hover:text-maia-protective transition-colors">{opt.title}</h4>
                                                    <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-lg group-hover:text-gray-500 transition-colors">{opt.description}</p>
                                                </div>

                                                <div className="mr-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <div className="w-10 h-10 rounded-full bg-maia-base/30 text-maia-dark flex items-center justify-center group-hover:bg-maia-dark group-hover:text-white transition-all duration-300 shadow-sm">
                                                        <ArrowRight size={18} />
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* History List View */
                        <div className="flex-1 overflow-hidden px-6 py-8 flex flex-col max-w-5xl mx-auto w-full animate-fade-in">
                             <div className="flex items-center mb-6">
                                <button 
                                    onClick={() => setShowHistory(false)}
                                    className="flex items-center gap-2 text-maia-dark font-bold hover:underline group"
                                >
                                    <div className="p-2 rounded-full bg-white shadow-sm group-hover:bg-maia-structure/20 transition-colors">
                                        <ArrowLeft size={18} /> 
                                    </div>
                                    <span className="text-lg">Volver</span>
                                </button>
                                <div className="h-8 w-px bg-gray-300 mx-6"></div>
                                <h3 className="text-xl font-bold text-maia-dark flex items-center gap-2">
                                    <History size={20} className="text-maia-muted" />
                                    Historial de Sesiones
                                </h3>
                             </div>

                             <div className="flex-1 bg-white rounded-2xl border border-maia-structure/60 shadow-card overflow-hidden relative flex flex-col min-h-0">
                                 {/* Table Header */}
                                 <div className="bg-maia-base/30 px-6 py-3 border-b border-maia-structure/30 flex text-[10px] font-bold text-maia-muted uppercase tracking-widest shrink-0">
                                    <div className="w-8"></div>
                                    <div className="flex-1">Conversación</div>
                                    <div className="w-32 text-right">Fecha</div>
                                 </div>

                                 {/* Content */}
                                 {filteredConversations.length > 0 ? (
                                    <div className="overflow-y-auto flex-1 pb-10 custom-scrollbar">
                                        <div className="divide-y divide-maia-base">
                                            {filteredConversations.slice(0, visibleCount).map((chat) => (
                                                <div key={chat.id} className="group relative flex items-center gap-4 p-5 hover:bg-maia-base/30 transition-colors cursor-pointer" onClick={() => onResumeChat(chat)}>
                                                    <div className="shrink-0 pt-1" onClick={(e) => e.stopPropagation()}>
                                                        <div className="w-8 h-8 rounded-lg bg-white border border-maia-structure flex items-center justify-center text-maia-dark shadow-sm">
                                                            <MessageSquare size={14} />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="text-sm font-bold text-maia-dark truncate">{chat.title}</h3>
                                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase font-bold border border-gray-200">{chat.agentMode}</span>
                                                        </div>
                                                        <p className="text-xs text-maia-muted truncate flex items-center gap-1">
                                                            <Clock size={10} />
                                                            {chat.messages.length} mensajes
                                                        </p>
                                                    </div>
                                                    <div className="w-32 text-right text-xs text-gray-400">
                                                        {new Date(chat.date).toLocaleDateString()}
                                                    </div>
                                                    
                                                    {/* Actions Hover */}
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm border border-gray-100 z-10" onClick={(e) => e.stopPropagation()}>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if(window.confirm('¿Eliminar esta conversación?')) deleteChatSession(chat.id);
                                                            }}
                                                            className="p-2 hover:bg-maia-alert/10 hover:text-maia-alert rounded-md text-gray-400 transition-colors"
                                                            title="Eliminar"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onResumeChat(chat);
                                                            }}
                                                            className="p-2 hover:bg-maia-base hover:text-maia-dark rounded-md text-maia-protective transition-colors font-bold text-xs flex items-center gap-1"
                                                        >
                                                            Abrir <ArrowRight size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                 ) : (
                                    <div className="flex flex-col items-center justify-center flex-1 text-maia-muted opacity-50">
                                        <History size={48} className="mb-4 stroke-1" />
                                        <p className="text-sm font-medium">No hay conversaciones guardadas.</p>
                                    </div>
                                 )}
                             </div>
                        </div>
                    )}
                </div>
            )}

            {/* MITIGATION PLANS VIEW */}
            {activeTab === 'mitigation' && (
                <div className="h-full flex flex-col animate-fade-in p-6">
                     <div className="flex-1 bg-white rounded-2xl border border-maia-structure/60 shadow-card overflow-hidden relative flex flex-col min-h-0">
                         {/* Table Header */}
                         <div className="bg-maia-base/30 px-6 py-3 border-b border-maia-structure/30 flex text-[10px] font-bold text-maia-muted uppercase tracking-widest shrink-0">
                            <div className="flex-1">Medida / Estrategia</div>
                            <div className="w-1/4 hidden md:block">Amenaza</div>
                            <div className="w-32 text-center">Tipo</div>
                            <div className="w-32 text-center">Estado</div>
                         </div>

                         {/* Content */}
                         {(() => {
                             const allMitigations = state.threats.flatMap(t => (t.mitigations || []).map(m => ({...m, threatName: t.name})));
                             
                             if (allMitigations.length > 0) {
                                return (
                                    <div className="overflow-y-auto flex-1 pb-10 custom-scrollbar">
                                        <div className="divide-y divide-maia-base">
                                            {allMitigations.map((item, idx) => (
                                                <div key={idx} className="group relative flex items-center gap-4 p-5 hover:bg-maia-base/30 transition-colors">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start gap-3">
                                                            <div className="mt-0.5 p-1.5 rounded-md bg-green-50 text-green-600 border border-green-100 shrink-0">
                                                                <ShieldCheck size={16} />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-maia-dark leading-snug">{item.description}</p>
                                                                <div className="flex items-center gap-2 mt-1 md:hidden">
                                                                    <span className="text-xs text-gray-400">•</span>
                                                                    <span className="text-xs text-maia-muted">{item.threatName}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="w-1/4 hidden md:flex items-center">
                                                        <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100 max-w-full">
                                                            <ShieldAlert size={12} className="text-maia-alert shrink-0" />
                                                            <span className="text-xs text-gray-600 truncate font-medium">{item.threatName}</span>
                                                        </div>
                                                    </div>

                                                    <div className="w-32 text-center text-xs text-gray-500 font-medium">
                                                        {item.strategy}
                                                    </div>

                                                    <div className="w-32 flex justify-center">
                                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                                                            item.status === 'Implementado' ? 'bg-green-50 text-green-700 border-green-200' :
                                                            item.status === 'En Progreso' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                            'bg-gray-50 text-gray-500 border-gray-200'
                                                        }`}>
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                 );
                             } else {
                                return (
                                    <div className="flex flex-col items-center justify-center flex-1 text-maia-muted opacity-50">
                                        <div className="w-16 h-16 bg-maia-base/40 rounded-full flex items-center justify-center mb-4">
                                            <ClipboardList size={32} className="stroke-1 text-maia-dark" />
                                        </div>
                                        <p className="text-sm font-medium">No hay planes de mitigación generados.</p>
                                        <p className="text-xs mt-2 max-w-xs text-center">Usa el asistente IA para generar estrategias de defensa para tus amenazas.</p>
                                    </div>
                                );
                             }
                         })()}
                     </div>
                </div>
            )}

            {/* KNOWLEDGE BASE VIEW */}
            {activeTab === 'knowledge' && (
                <div className="h-full animate-fade-in">
                    <KnowledgeBase 
                        files={knowledgeFiles}
                        selectedFileId={kbSelectedFileId}
                        onSelectFile={setKbSelectedFileId}
                        onDeleteFile={handleDeleteFile}
                        onSaveFile={handleUpdateFile}
                        isEditing={kbIsEditing}
                        setIsEditing={setKbIsEditing}
                        onConsultAI={onConsultAI}
                    />
                </div>
            )}

            {/* USER PROFILE */}
            {activeTab === 'profile' && (
                <UserProfile />
            )}

            {/* SETTINGS */}
            {activeTab === 'settings' && (
                <AppSettings />
            )}
        </div>

        {/* Manual Entry Modal */}
        <ManualEntryModal 
            isOpen={showManualModal} 
            onClose={() => setShowManualModal(false)}
            onSave={handleSaveManual}
            assets={state.assets}
            adversaries={state.adversaries}
            onConsultAI={() => {
                setShowManualModal(false);
                onConsultAI('register');
            }}
        />
      </main>
    </div>
  );
};
