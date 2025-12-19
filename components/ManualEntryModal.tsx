import React, { useState, useEffect } from 'react';
import { X, Save, ShieldAlert, Server, Users, Info, AlertTriangle, Sparkles } from 'lucide-react';
import { Asset, Adversary } from '../types';

interface ManualEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  assets: Asset[];
  adversaries: Adversary[];
  onConsultAI: () => void;
}

type EntryType = 'asset' | 'adversary' | 'threat';

export const ManualEntryModal: React.FC<ManualEntryModalProps> = ({ isOpen, onClose, onSave, assets, adversaries, onConsultAI }) => {
  const [activeTab, setActiveTab] = useState<EntryType>('asset');
  
  // Form States
  const [assetForm, setAssetForm] = useState({
    name: '',
    type: 'Digital',
    value: 3,
    description: ''
  });

  const [adversaryForm, setAdversaryForm] = useState({
    name: '',
    type: 'Criminal',
    capability: 3,
    motivation: ''
  });

  const [threatForm, setThreatForm] = useState({
    name: '',
    category: 'Seguridad Digital',
    relatedAsset: '',
    relatedAdversary: '',
    description: '',
    impact: 3,
    probability: 3
  });

  // Reset forms on open
  useEffect(() => {
    if (isOpen) {
        // Optional: Reset logic could go here
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'asset') {
        onSave({ ...assetForm, entryType: 'asset' });
    } else if (activeTab === 'adversary') {
        onSave({ ...adversaryForm, entryType: 'adversary' });
    } else {
        onSave({ 
            ...threatForm, 
            relatedAdversary: threatForm.relatedAdversary || 'Desconocido',
            entryType: 'threat'
        });
    }
    onClose();
  };

  const TabButton = ({ id, icon: Icon, label }: { id: EntryType, icon: any, label: string }) => {
    const isActive = activeTab === id;
    return (
        <button
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive 
                ? 'bg-white text-maia-dark shadow-sm ring-1 ring-black/5 font-bold' 
                : 'text-gray-500 hover:text-maia-dark hover:bg-gray-50'
            }`}
        >
            <Icon size={16} className={isActive ? 'text-maia-dark' : 'text-gray-400'} />
            <span>{label}</span>
        </button>
    );
  };

  // Helper for input styling
  const inputClasses = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-maia-dark text-sm focus:outline-none focus:border-maia-dark focus:ring-1 focus:ring-maia-dark/10 transition-all placeholder-gray-400 hover:border-gray-300";
  const labelClasses = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-maia-dark/20 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh] ring-1 ring-black/5">
        
        {/* Header */}
        <header className="px-6 py-5 border-b border-gray-100 flex justify-between items-center shrink-0 bg-white">
            <div>
                <h3 className="text-lg font-bold text-maia-dark flex items-center gap-2">
                    Registro Manual
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Ingresa datos clave para tu modelo de amenazas.</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-maia-dark transition-colors p-2 rounded-full hover:bg-gray-50">
                <X size={20} />
            </button>
        </header>

        {/* Tab Selection (Segmented Control Style) */}
        <div className="px-6 pt-6 pb-2 shrink-0">
            <div className="bg-gray-100/80 p-1 rounded-xl flex gap-1">
                <TabButton id="asset" icon={Server} label="Activo" />
                <TabButton id="adversary" icon={Users} label="Adversario" />
                <TabButton id="threat" icon={ShieldAlert} label="Riesgo" />
            </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
            <form id="entryForm" onSubmit={handleSubmit} className="space-y-6">
                
                {/* --- ASSET FORM --- */}
                {activeTab === 'asset' && (
                    <div className="space-y-5 animate-fade-in">
                        {/* Tip Box - Using MAIA Palette (Base/Dark) */}
                        <div className="bg-maia-base/30 p-4 rounded-xl border border-maia-structure flex gap-4 items-center">
                            <div className="bg-white p-2 rounded-lg text-maia-dark shadow-sm shrink-0 border border-maia-structure/30">
                                <Info size={18} />
                            </div>
                            <p className="text-xs text-maia-dark/90 leading-relaxed font-medium">
                                Un <strong>Activo</strong> es cualquier cosa de valor (datos, equipos, personas) que necesitas proteger.
                            </p>
                        </div>

                        <div>
                            <label className={labelClasses}>Nombre del Activo</label>
                            <input 
                                required
                                type="text" 
                                className={inputClasses}
                                placeholder="Ej. Base de datos de clientes, Servidor Principal..."
                                value={assetForm.name}
                                onChange={e => setAssetForm({...assetForm, name: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className={labelClasses}>Tipo</label>
                                <select 
                                    className={inputClasses}
                                    value={assetForm.type}
                                    onChange={e => setAssetForm({...assetForm, type: e.target.value})}
                                >
                                    <option>Digital</option>
                                    <option>Físico</option>
                                    <option>Humano</option>
                                    <option>Intangible</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Valor (1-5)</label>
                                <div className="flex items-center gap-3 h-[42px]">
                                    <input 
                                        type="range" min="1" max="5" 
                                        className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-maia-dark"
                                        value={assetForm.value}
                                        onChange={e => setAssetForm({...assetForm, value: parseInt(e.target.value)})}
                                    />
                                    <span className="font-bold text-maia-dark w-6 text-center text-sm">{assetForm.value}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className={labelClasses}>Descripción</label>
                            <textarea 
                                className={`${inputClasses} resize-none h-24`}
                                placeholder="¿Por qué es importante este activo?"
                                value={assetForm.description}
                                onChange={e => setAssetForm({...assetForm, description: e.target.value})}
                            ></textarea>
                        </div>
                    </div>
                )}

                {/* --- ADVERSARY FORM --- */}
                {activeTab === 'adversary' && (
                    <div className="space-y-5 animate-fade-in">
                        {/* Tip Box - Using MAIA Palette */}
                        <div className="bg-maia-base/30 p-4 rounded-xl border border-maia-structure flex gap-4 items-center">
                            <div className="bg-white p-2 rounded-lg text-maia-dark shadow-sm shrink-0 border border-maia-structure/30">
                                <Info size={18} />
                            </div>
                            <p className="text-xs text-maia-dark/90 leading-relaxed font-medium">
                                Un <strong>Adversario</strong> es quien podría intentar comprometer tus activos (hackers, competencia, etc).
                            </p>
                        </div>

                        <div>
                            <label className={labelClasses}>Nombre del Adversario</label>
                            <input 
                                required
                                type="text" 
                                className={inputClasses}
                                placeholder="Ej. Grupo de Hacktivistas, Competencia desleal..."
                                value={adversaryForm.name}
                                onChange={e => setAdversaryForm({...adversaryForm, name: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className={labelClasses}>Tipo</label>
                                <select 
                                    className={inputClasses}
                                    value={adversaryForm.type}
                                    onChange={e => setAdversaryForm({...adversaryForm, type: e.target.value})}
                                >
                                    <option>Criminal</option>
                                    <option>Estatal</option>
                                    <option>Competencia</option>
                                    <option>Interno</option>
                                    <option>Natural</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Capacidad (1-5)</label>
                                <div className="flex items-center gap-3 h-[42px]">
                                    <input 
                                        type="range" min="1" max="5" 
                                        className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-maia-dark"
                                        value={adversaryForm.capability}
                                        onChange={e => setAdversaryForm({...adversaryForm, capability: parseInt(e.target.value)})}
                                    />
                                    <span className="font-bold text-maia-dark w-6 text-center text-sm">{adversaryForm.capability}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className={labelClasses}>Motivación</label>
                            <textarea 
                                className={`${inputClasses} resize-none h-24`}
                                placeholder="¿Qué busca obtener?"
                                value={adversaryForm.motivation}
                                onChange={e => setAdversaryForm({...adversaryForm, motivation: e.target.value})}
                            ></textarea>
                        </div>
                    </div>
                )}

                {/* --- THREAT FORM --- */}
                {activeTab === 'threat' && (
                    <div className="space-y-5 animate-fade-in">
                        {/* Check dependencies */}
                        {(assets.length === 0 || adversaries.length === 0) && (
                            <div className="bg-maia-alert/10 p-4 rounded-xl border border-maia-alert/20 flex gap-4 items-center mb-2">
                                <div className="bg-white p-2 rounded-lg text-maia-alert shadow-sm shrink-0 border border-maia-alert/10">
                                    <AlertTriangle size={18} />
                                </div>
                                <div className="text-xs text-maia-dark">
                                    <p className="font-bold mb-0.5 text-maia-alert">Faltan requisitos</p>
                                    Para registrar un riesgo, primero debes crear al menos un <strong>Activo</strong> y un <strong>Adversario</strong>.
                                </div>
                            </div>
                        )}

                        <div>
                            <label className={labelClasses}>Escenario de Riesgo</label>
                            <input 
                                required
                                type="text" 
                                className={inputClasses}
                                placeholder="Ej. Robo de equipo durante viaje..."
                                value={threatForm.name}
                                onChange={e => setThreatForm({...threatForm, name: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Categoría</label>
                            <select 
                                className={inputClasses}
                                value={threatForm.category}
                                onChange={e => setThreatForm({...threatForm, category: e.target.value})}
                            >
                                <option>Seguridad Digital</option>
                                <option>Seguridad Física</option>
                                <option>Privacidad</option>
                                <option>Legal / Reputacional</option>
                                <option>Violencia de Género</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className={labelClasses}>Activo Afectado</label>
                                <select 
                                    className={inputClasses}
                                    value={threatForm.relatedAsset}
                                    onChange={e => setThreatForm({...threatForm, relatedAsset: e.target.value})}
                                    disabled={assets.length === 0}
                                >
                                    <option value="">-- Seleccionar --</option>
                                    {assets.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                                    {assets.length === 0 && <option value="" disabled>Sin activos registrados</option>}
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Adversario</label>
                                <select 
                                    className={inputClasses}
                                    value={threatForm.relatedAdversary}
                                    onChange={e => setThreatForm({...threatForm, relatedAdversary: e.target.value})}
                                    disabled={adversaries.length === 0}
                                >
                                    <option value="">-- Seleccionar --</option>
                                    {adversaries.map(adv => <option key={adv.id} value={adv.name}>{adv.name}</option>)}
                                    <option value="Desconocido">Desconocido / Oportunista</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-5 rounded-xl border border-gray-100">
                            <div>
                                <label className={labelClasses}>Probabilidad</label>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] text-gray-400 font-bold w-8">BAJA</span>
                                    <input 
                                        type="range" min="1" max="5" 
                                        className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-maia-dark"
                                        value={threatForm.probability}
                                        onChange={e => setThreatForm({...threatForm, probability: parseInt(e.target.value)})}
                                    />
                                    <span className="text-[10px] text-gray-400 font-bold w-8 text-right">ALTA</span>
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>Impacto</label>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] text-gray-400 font-bold w-8">LEVE</span>
                                    <input 
                                        type="range" min="1" max="5" 
                                        className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-maia-alert"
                                        value={threatForm.impact}
                                        onChange={e => setThreatForm({...threatForm, impact: parseInt(e.target.value)})}
                                    />
                                    <span className="text-[10px] text-gray-400 font-bold w-8 text-right">GRAVE</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className={labelClasses}>Descripción</label>
                            <textarea 
                                className={`${inputClasses} resize-none h-20`}
                                placeholder="Detalles del escenario..."
                                value={threatForm.description}
                                onChange={e => setThreatForm({...threatForm, description: e.target.value})}
                            ></textarea>
                        </div>
                    </div>
                )}

                {/* AI Assist CTA */}
                <div className="pt-2 flex items-center justify-center gap-2">
                    <Sparkles size={14} className="text-maia-dark fill-maia-dark shrink-0" />
                    <p className="text-sm text-gray-400 font-medium flex items-center gap-1">
                        ¿No estás segurx?
                        <button 
                            type="button"
                            onClick={onConsultAI}
                            className="text-maia-protective hover:text-maia-dark font-bold transition-colors inline-flex items-center gap-0.5 ml-0.5"
                        >
                            usa el registro asistido →
                        </button>
                    </p>
                </div>
            </form>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0 flex justify-end">
            <div className="flex gap-3 w-full md:w-auto">
                <button 
                    onClick={onClose}
                    className="flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 hover:text-maia-dark transition-colors"
                >
                    Cancelar
                </button>
                <button 
                    form="entryForm" 
                    type="submit" 
                    disabled={activeTab === 'threat' && (assets.length === 0 || adversaries.length === 0)}
                    className="flex-1 md:flex-none bg-maia-dark hover:bg-maia-dark/90 text-white font-bold px-8 py-2.5 rounded-xl shadow-lg shadow-maia-dark/10 transition-all flex justify-center items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save size={16} /> 
                    {activeTab === 'asset' && 'Guardar Activo'}
                    {activeTab === 'adversary' && 'Guardar Adversario'}
                    {activeTab === 'threat' && 'Registrar Riesgo'}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};