import React, { useState, useContext } from 'react';
import { User, Briefcase, Calendar, Key, Download, Trash2, AlertTriangle, Save, Shield } from 'lucide-react';
import { ThreatModelContext } from '../types';

export const UserProfile: React.FC = () => {
  const { state } = useContext(ThreatModelContext);
  const [orgName, setOrgName] = useState('Organización Civil Sin Fines de Lucro');
  const [isEditing, setIsEditing] = useState(false);

  // Use the active user from state or fallback
  const username = state.activeUser || "Admin";
  const creationDate = "14 de Octubre, 2024";

  const handleExport = () => {
    // Export actual state data
    const exportData = {
        meta: {
            user: username,
            organization: orgName,
            date: new Date().toISOString(),
            version: '0.3.2'
        },
        data: state
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    
    element.href = url;
    element.download = `maia_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col items-center p-6 md:p-12 overflow-y-auto animate-fade-in custom-scrollbar">
      
      <div className="w-full max-w-2xl space-y-8">
        
        {/* Identity Card */}
        <div className="bg-white rounded-2xl p-8 shadow-card border border-maia-structure/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-maia-dark"></div>
            
            <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-maia-base rounded-2xl flex items-center justify-center border-2 border-white shadow-sm text-maia-dark shrink-0">
                    <User size={32} strokeWidth={1.5} />
                </div>
                
                <div className="flex-1 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold text-maia-dark tracking-tight">{username}</h2>
                        <div className="flex items-center gap-2 text-sm text-maia-muted mt-1">
                            <Calendar size={14} />
                            <span>Miembro desde el {creationDate}</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                            Organización
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Briefcase size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-maia-dark transition-all ${
                                        isEditing 
                                        ? 'bg-white border-maia-protective focus:ring-1 focus:ring-maia-protective outline-none' 
                                        : 'bg-gray-50 border-transparent'
                                    }`}
                                />
                            </div>
                            <button 
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-4 rounded-xl text-xs font-bold transition-colors ${
                                    isEditing 
                                    ? 'bg-maia-dark text-white hover:bg-maia-protective hover:text-maia-dark' 
                                    : 'bg-white border border-gray-200 text-gray-500 hover:text-maia-dark'
                                }`}
                            >
                                {isEditing ? <Save size={16} /> : 'Editar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl p-8 shadow-card border border-maia-structure/50">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-maia-base/40 rounded-lg text-maia-dark">
                    <Shield size={20} />
                </div>
                <h3 className="text-lg font-bold text-maia-dark">Seguridad</h3>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-maia-muted border border-gray-100">
                        <Key size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-maia-dark">Contraseña</p>
                        <p className="text-xs text-gray-500">Último cambio hace 3 meses</p>
                    </div>
                </div>
                <button className="text-xs font-bold text-maia-protective hover:text-maia-dark transition-colors px-4 py-2 hover:bg-maia-base/30 rounded-lg">
                    Cambiar contraseña
                </button>
            </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-maia-alert/30 bg-maia-alert/5 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6 text-maia-alert">
                <AlertTriangle size={20} />
                <h3 className="text-lg font-bold">Zona de Riesgo</h3>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-maia-alert/10">
                    <div>
                        <p className="text-sm font-bold text-maia-dark">Exportar mis datos</p>
                        <p className="text-xs text-gray-500 max-w-xs">Descarga una copia de tus modelos y activos en formato JSON.</p>
                    </div>
                    <button 
                        onClick={handleExport}
                        className="flex items-center gap-2 text-xs font-bold text-maia-dark hover:text-maia-protective border border-gray-200 hover:border-maia-protective px-4 py-2.5 rounded-xl transition-all bg-white"
                    >
                        <Download size={14} /> Exportar
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-maia-alert/10">
                    <div>
                        <p className="text-sm font-bold text-maia-alert">Eliminar cuenta</p>
                        <p className="text-xs text-gray-500 max-w-xs">Esta acción es irreversible. Se borrarán todos los datos locales.</p>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold text-white bg-maia-alert hover:bg-red-700 px-4 py-2.5 rounded-xl transition-all shadow-sm">
                        <Trash2 size={14} /> Eliminar
                    </button>
                </div>
            </div>
        </div>

        <div className="text-center pt-4">
            <p className="text-[10px] text-gray-400 font-mono">ID DE USUARIO: {state.activeUser ? state.activeUser.toUpperCase() : 'NO-ID'}</p>
        </div>

      </div>
    </div>
  );
};