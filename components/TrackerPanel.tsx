import React, { useContext } from 'react';
import { ThreatModelContext } from '../types';
import { 
  Shield, Users, Database, Server, FileText, AlertTriangle, CheckCircle 
} from 'lucide-react';

export const TrackerPanel: React.FC = () => {
  const { state } = useContext(ThreatModelContext);
  const { assets, adversaries, threats } = state;

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'Digital': return <Database size={14} />;
      case 'Físico': return <Server size={14} />;
      case 'Humano': return <Users size={14} />;
      default: return <FileText size={14} />;
    }
  };

  const getRiskColorClass = (level?: string) => {
    switch(level) {
        case 'Crítico': return 'bg-red-50 text-red-700 border-red-200';
        case 'Alto': return 'bg-orange-50 text-orange-700 border-orange-200';
        case 'Medio': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        case 'Bajo': return 'bg-green-50 text-green-700 border-green-200';
        default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const EmptyState = ({ text }: { text: string }) => (
    <div className="p-4 text-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
        <p className="text-xs text-gray-400 italic">{text}</p>
    </div>
  );

  const SectionHeader = ({ title, count }: { title: string, count: number }) => (
    <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center justify-between">
        {title}
        <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] min-w-[20px] text-center">
            {count}
        </span>
    </h3>
  );

  return (
    <div className="space-y-6 h-full font-sans">
      
      {/* Summary Status */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
          <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold text-slate-700">Sistema Activo</span>
          </div>
          <p className="text-[10px] text-slate-500">
              El asistente está monitoreando el contexto de la conversación para actualizar el modelo.
          </p>
      </div>

      {/* Assets Section */}
      <section>
        <SectionHeader title="Activos" count={assets.length} />
        {assets.length === 0 ? (
          <EmptyState text="Sin activos registrados" />
        ) : (
          <div className="space-y-2">
            {assets.map((asset) => (
              <div key={asset.id} className="group bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm hover:border-slate-300 transition-colors flex justify-between items-center">
                 <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-1.5 bg-slate-50 rounded text-slate-500 shrink-0">
                        {getAssetIcon(asset.type)}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm text-gray-900 font-medium truncate">{asset.name}</span>
                        <span className="text-[10px] text-gray-400 truncate">{asset.type}</span>
                    </div>
                 </div>
                 <div className="flex gap-0.5 shrink-0" title={`Valor: ${asset.value}/5`}>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1 h-2 rounded-full ${i < asset.value ? 'bg-slate-600' : 'bg-gray-200'}`}></div>
                    ))}
                 </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Adversaries Section */}
      <section>
        <SectionHeader title="Adversarios" count={adversaries.length} />
        {adversaries.length === 0 ? (
           <EmptyState text="Sin adversarios perfilados" />
        ) : (
          <div className="space-y-2">
            {adversaries.map((adv) => (
              <div key={adv.id} className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-red-50 rounded text-red-500 shrink-0">
                        <Users size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-900 font-medium">{adv.name}</span>
                        <span className="text-[10px] text-gray-400">{adv.type}</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Threats Section */}
      <section>
        <SectionHeader title="Amenazas" count={threats.length} />
        {threats.length === 0 ? (
          <EmptyState text="Modelo de amenazas vacío" />
        ) : (
          <div className="space-y-2">
            {threats.map((threat) => (
              <div key={threat.id} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2 gap-2">
                      <span className="text-sm text-gray-900 font-bold leading-tight">{threat.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border shrink-0 ${getRiskColorClass(threat.riskLevel)}`}>
                        {threat.riskLevel}
                      </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mb-2">
                      <Shield size={10} className="text-gray-400" />
                      <span className="text-xs text-gray-500 truncate">
                          {threat.relatedAsset}
                      </span>
                  </div>

                  {threat.mitigations && threat.mitigations.length > 0 && (
                      <div className="pt-2 border-t border-gray-100 flex items-center gap-1 text-green-600">
                          <CheckCircle size={10} />
                          <span className="text-[10px] font-medium">{threat.mitigations.length} plan(es) de mitigación</span>
                      </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};