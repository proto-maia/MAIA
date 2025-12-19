
import React, { useState, useMemo, useEffect } from 'react';
import { Folder, FileText, ChevronRight, ChevronDown, X, ArrowRight, ArrowLeft, BookOpen, Trash2, Edit3, Save, Sparkles } from 'lucide-react';
import { marked } from 'marked';
import { FileNode } from '../data/knowledgeData';
import { AgentMode, ContextFile } from '../types';

interface KnowledgeBaseProps {
  files: FileNode[];
  selectedFileId: string | null;
  onSelectFile: (id: string | null) => void;
  onDeleteFile: (id: string) => void;
  onSaveFile: (id: string, name: string, content: string) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onConsultAI: (mode: AgentMode, context?: ContextFile) => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ 
  files, 
  selectedFileId, 
  onSelectFile, 
  onDeleteFile,
  onSaveFile,
  isEditing,
  setIsEditing,
  onConsultAI
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['folder_ejemplos', 'folder_fundamentos', 'folder_user_files']));
  
  // Local edit state
  const [editName, setEditName] = useState('');
  const [editContent, setEditContent] = useState('');

  // Helper to find file by ID and flatten list for navigation
  const flatFileList = useMemo(() => {
    const list: FileNode[] = [];
    const traverse = (nodes: FileNode[]) => {
      nodes.forEach(node => {
        if (node.type === 'file') list.push(node);
        if (node.children) traverse(node.children);
      });
    };
    traverse(files);
    return list;
  }, [files]);

  const selectedFile = useMemo(() => flatFileList.find(f => f.id === selectedFileId), [selectedFileId, flatFileList]);
  const selectedIndex = useMemo(() => flatFileList.findIndex(f => f.id === selectedFileId), [selectedFileId, flatFileList]);

  // Sync local edit state when selection changes
  useEffect(() => {
    if (selectedFile) {
        setEditName(selectedFile.name);
        setEditContent(selectedFile.content || '');
    }
  }, [selectedFile]);

  const toggleFolder = (id: string) => {
    const newSet = new Set(expandedFolders);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedFolders(newSet);
  };

  const navigateFile = (direction: 'next' | 'prev') => {
    if (selectedIndex === -1) return;
    const newIndex = direction === 'next' ? selectedIndex + 1 : selectedIndex - 1;
    if (newIndex >= 0 && newIndex < flatFileList.length) {
        onSelectFile(flatFileList[newIndex].id);
        setIsEditing(false);
    }
  };

  const handleSave = () => {
    if (selectedFileId) {
        onSaveFile(selectedFileId, editName, editContent);
    }
  };

  const handleConsult = () => {
    if (selectedFile) {
      onConsultAI('general', {
        title: selectedFile.name,
        content: selectedFile.content || ''
      });
    }
  };

  const isProtected = (nodeId: string, parentId?: string) => {
    return nodeId === 'folder_fundamentos' || parentId === 'folder_fundamentos';
  };

  const renderTree = (nodes: FileNode[], depth = 0, parentId?: string) => {
    return nodes.map(node => (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors group relative ${
            node.id === selectedFileId 
                ? 'bg-maia-protective text-maia-dark font-bold' 
                : 'hover:bg-maia-structure/30 text-maia-dark'
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          onClick={() => node.type === 'folder' ? toggleFolder(node.id) : onSelectFile(node.id)}
        >
          {node.type === 'folder' ? (
             <span className="text-maia-muted">
               {expandedFolders.has(node.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
             </span>
          ) : (
             <span className="text-maia-muted opacity-50"></span>
          )}
          
          {node.type === 'folder' ? (
              <Folder size={16} className={node.id === selectedFileId ? 'text-maia-dark' : 'text-maia-structure'} />
          ) : (
              <FileText size={16} className={node.id === selectedFileId ? 'text-maia-dark' : 'text-maia-muted'} />
          )}
          
          <span className="text-sm truncate flex-1">{node.name}</span>

          {/* Delete Button on Hover */}
          {node.type === 'file' && !isProtected(node.id, parentId) && (
              <button 
                onClick={(e) => { e.stopPropagation(); onDeleteFile(node.id); }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-maia-alert/20 text-maia-muted hover:text-maia-alert rounded transition-all"
                title="Eliminar archivo"
              >
                  <Trash2 size={14} />
              </button>
          )}
        </div>
        
        {node.type === 'folder' && expandedFolders.has(node.id) && node.children && (
          <div>{renderTree(node.children, depth + 1, node.id)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex h-full w-full bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      
      {/* Sidebar List - Hidden on mobile if file selected */}
      <div className={`
        ${selectedFile ? 'hidden lg:flex' : 'flex'} 
        flex-col w-full lg:w-1/3 border-r border-gray-100 bg-gray-50/50
      `}>
         <div className="p-4 border-b border-gray-100 bg-white">
             <h3 className="font-bold text-maia-dark flex items-center gap-2">
                 <BookOpen size={18} className="text-maia-protective" />
                 Explorador de Archivos
             </h3>
             <p className="text-xs text-maia-muted mt-1">Fundamentos y ejemplos.</p>
         </div>
         <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
             {renderTree(files)}
         </div>
      </div>

      {/* Content Viewer / Editor */}
      {selectedFile ? (
         <div className="flex-1 flex flex-col h-full bg-white animate-fade-in relative">
            
            {/* Viewer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white/95 backdrop-blur z-10 sticky top-0">
                <div className="flex items-center gap-3 overflow-hidden flex-1">
                     <button 
                       onClick={() => onSelectFile(null)}
                       className="lg:hidden p-2 hover:bg-gray-100 rounded-full text-maia-muted"
                     >
                        <ArrowLeft size={18} />
                     </button>
                     <div className="p-2 bg-maia-base/50 rounded-lg shrink-0">
                        <FileText size={18} className="text-maia-dark" />
                     </div>
                     {isEditing ? (
                        <input 
                            type="text" 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="font-bold text-maia-dark bg-gray-50 border border-gray-200 rounded px-2 py-1 w-full max-w-sm focus:outline-none focus:border-maia-protective"
                        />
                     ) : (
                        <div className="flex items-center gap-2 overflow-hidden">
                           <span className="font-bold text-maia-dark truncate">{selectedFile.name}</span>
                           {/* Sparkles Action */}
                           <div className="group relative">
                                <button 
                                    onClick={handleConsult}
                                    className="p-1.5 rounded-full text-maia-muted hover:text-white hover:bg-gradient-to-r hover:from-maia-protective hover:to-maia-alert transition-all">
                                    <Sparkles size={16} />
                                </button>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-maia-dark text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-lg">
                                    Iniciar una conversación sobre este archivo
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-maia-dark"></div>
                                </div>
                           </div>
                        </div>
                     )}
                </div>
                
                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <>
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-maia-dark hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSave}
                                className="px-3 py-1.5 text-xs font-bold text-white bg-maia-dark hover:bg-maia-protective rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Save size={14} /> Guardar
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="p-2 text-gray-400 hover:text-maia-dark hover:bg-gray-50 rounded-full transition-colors"
                            title="Editar archivo"
                        >
                            <Edit3 size={18} />
                        </button>
                    )}
                    <button 
                        onClick={() => onSelectFile(null)}
                        className="p-2 text-gray-400 hover:text-maia-alert hover:bg-red-50 rounded-full transition-colors ml-1"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Markdown Content / Editor */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                {isEditing ? (
                    <textarea 
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full h-full p-8 resize-none focus:outline-none text-maia-dark font-mono text-sm leading-relaxed"
                        placeholder="Escribe tu contenido en Markdown..."
                    />
                ) : (
                    <div className="p-8">
                        <div className="prose prose-slate max-w-3xl mx-auto prose-headings:text-maia-dark prose-headings:font-bold prose-p:text-gray-600 prose-a:text-maia-protective prose-a:no-underline hover:prose-a:underline prose-strong:text-maia-dark prose-blockquote:border-l-maia-protective prose-blockquote:bg-maia-base/20 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-li:text-gray-600">
                            <div dangerouslySetInnerHTML={{ __html: marked.parse(selectedFile.content || '') }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Viewer Footer - Navigation */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30 shrink-0">
                <button 
                    onClick={() => navigateFile('prev')}
                    disabled={selectedIndex <= 0 || isEditing}
                    className="flex items-center gap-2 text-xs font-bold text-maia-muted disabled:opacity-30 hover:text-maia-dark transition-colors px-3 py-2 rounded-lg hover:bg-maia-base/50"
                >
                    <ArrowLeft size={14} /> Anterior
                </button>
                
                {selectedIndex < flatFileList.length - 1 && (
                    <button 
                        onClick={() => navigateFile('next')}
                        disabled={isEditing}
                        className="flex items-center gap-2 text-xs font-bold text-maia-dark hover:text-maia-protective transition-colors px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md disabled:opacity-50 disabled:shadow-none"
                    >
                        Siguiente: {flatFileList[selectedIndex + 1].name.substring(0, 20)}... <ArrowRight size={14} />
                    </button>
                )}
            </div>
         </div>
      ) : (
         <div className="hidden lg:flex flex-1 flex-col items-center justify-center text-maia-muted/50 p-8 bg-gray-50/20">
            <div className="w-24 h-24 bg-maia-base/30 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={40} className="text-maia-structure" />
            </div>
            <p className="text-sm font-medium">Selecciona un archivo para visualizar.</p>
         </div>
      )}
    </div>
  );
};
