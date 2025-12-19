
import React, { useState } from 'react';
import { Trash2, RefreshCw, Layout, Sliders } from 'lucide-react';

export const AppSettings: React.FC = () => {
  // Settings State
  const [detailedResponses, setDetailedResponses] = useState(true);
  const [temperature, setTemperature] = useState(0.7);
  const [contextLength, setContextLength] = useState(8192);
  const [confirmClearShort, setConfirmClearShort] = useState(false);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const handleClearShortTerm = () => {
    if (confirmClearShort) {
      // Logic to clear short term memory would go here
      setConfirmClearShort(false);
      alert("Memoria de corto plazo (chat actual) borrada.");
    } else {
      setConfirmClearShort(true);
      // Auto reset confirmation after 3 seconds
      setTimeout(() => setConfirmClearShort(false), 3000);
    }
  };

  const handleClearAll = () => {
    if (confirmClearAll) {
      // Logic to clear all data
      setConfirmClearAll(false);
      localStorage.clear();
      window.location.reload(); 
    } else {
      setConfirmClearAll(true);
       // Auto reset confirmation after 3 seconds
       setTimeout(() => setConfirmClearAll(false), 3000);
    }
  };

  return (
    <div className="h-full flex flex-col items-center p-6 md:p-12 overflow-y-auto animate-fade-in custom-scrollbar">
      <div className="w-full max-w-2xl space-y-10">
        
        <div className="mb-4 text-center md:text-left">
             <h2 className="text-2xl font-bold text-maia-dark tracking-tight">Configuración</h2>
             <p className="text-sm text-maia-muted mt-1">Ajusta el comportamiento del agente y gestiona tus datos.</p>
        </div>

        {/* Response Settings */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-gray-50 rounded-xl text-maia-dark">
                        <Layout size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-maia-dark">Respuestas Detalladas</p>
                        <p className="text-xs text-gray-500 mt-0.5">Incluir contexto metodológico y explicaciones extensas.</p>
                    </div>
                </div>
                <button 
                    onClick={() => setDetailedResponses(!detailedResponses)}
                    className={`w-12 h-7 rounded-full transition-colors relative ${detailedResponses ? 'bg-maia-protective' : 'bg-gray-200'}`}
                >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 transition-transform ${detailedResponses ? 'left-6' : 'left-1'}`}></div>
                </button>
            </div>
          </div>
        </section>

        {/* Model Tuning Settings */}
        <section className="space-y-4">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Ajuste del Modelo (LLM)</h3>
             
             <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-2.5 bg-gray-50 rounded-xl text-maia-dark">
                        <Sliders size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-maia-dark">Parámetros de Generación</p>
                        <p className="text-xs text-gray-500 mt-0.5">Controla la creatividad y capacidad de memoria del agente.</p>
                    </div>
                </div>

                {/* Temperature Slider */}
                <div>
                    <div className="flex justify-between mb-3">
                        <label className="text-xs font-bold text-maia-dark uppercase">Temperatura</label>
                        <span className="text-xs font-mono font-bold text-maia-protective">{temperature}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-maia-dark"
                    />
                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
                        <span>Preciso (Determinista)</span>
                        <span>Creativo (Aleatorio)</span>
                    </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* Context Length Slider */}
                <div>
                    <div className="flex justify-between mb-3">
                        <label className="text-xs font-bold text-maia-dark uppercase">Longitud de Contexto</label>
                        <span className="text-xs font-mono font-bold text-maia-protective">{contextLength} tokens</span>
                    </div>
                    <input 
                        type="range" 
                        min="2048" 
                        max="32768" 
                        step="1024"
                        value={contextLength}
                        onChange={(e) => setContextLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-maia-dark"
                    />
                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
                        <span>Rápido (Menos memoria)</span>
                        <span>Profundo (Más memoria)</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Memory Management */}
        <section className="space-y-4">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Gestión de Memoria</h3>

            {/* Clear Short Term */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-maia-base/40 rounded-xl text-maia-dark">
                        <RefreshCw size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-maia-dark">Limpiar memoria de corto plazo</p>
                        <p className="text-xs text-gray-500 mt-0.5">Olvida la conversación actual pero mantiene tus datos guardados.</p>
                    </div>
                </div>
                <button 
                    onClick={handleClearShortTerm}
                    className={`px-6 py-2.5 md:py-2 md:px-4 rounded-xl text-xs font-bold transition-all border w-full md:w-auto ${
                        confirmClearShort 
                        ? 'bg-maia-dark text-white border-maia-dark' 
                        : 'bg-white text-gray-500 border-gray-200 hover:border-maia-dark hover:text-maia-dark'
                    }`}
                >
                    {confirmClearShort ? '¿Confirmar?' : 'Limpiar'}
                </button>
            </div>

            {/* Clear All */}
            <div className="bg-maia-alert/5 rounded-2xl border border-maia-alert/20 shadow-none p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-white rounded-xl text-maia-alert shadow-sm border border-maia-alert/10">
                        <Trash2 size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-maia-alert">Limpiar toda la memoria</p>
                        <p className="text-xs text-gray-600 mt-0.5">Elimina todos los activos, adversarios y configuraciones. Irreversible.</p>
                    </div>
                </div>
                <button 
                    onClick={handleClearAll}
                    className={`px-6 py-2.5 md:py-2 md:px-4 rounded-xl text-xs font-bold transition-all shadow-sm w-full md:w-auto ${
                        confirmClearAll 
                        ? 'bg-red-700 text-white' 
                        : 'bg-maia-alert text-white hover:bg-red-700'
                    }`}
                >
                    {confirmClearAll ? '¿Seguro?' : 'Eliminar Todo'}
                </button>
            </div>
        </section>

      </div>
    </div>
  );
};
