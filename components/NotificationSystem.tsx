import React, { useEffect } from 'react';
import { AppNotification, NotificationType } from '../types';
import { Bell, CheckCircle, Info, AlertTriangle, Sparkles, X, ArrowRight } from 'lucide-react';

// --- TOAST COMPONENT ---
interface ToastProps {
  notifications: AppNotification[];
  onDismiss: (id: string) => void;
  onAction: (notification: AppNotification) => void;
}

export const NotificationToasts: React.FC<ToastProps> = ({ notifications, onDismiss, onAction }) => {
  // Show only unread notifications created in the last 5 seconds for toasts
  const recentNotifications = notifications.filter(n => 
      !n.read && (new Date().getTime() - new Date(n.timestamp).getTime() < 6000)
  ).slice(0, 3); // Max 3 at a time

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {recentNotifications.map(n => (
        <div 
            key={n.id} 
            className="pointer-events-auto w-80 bg-white rounded-xl shadow-deep border border-gray-100 p-4 animate-fade-in flex gap-3 relative overflow-hidden"
        >
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                n.type === 'success' ? 'bg-green-500' :
                n.type === 'suggestion' ? 'bg-maia-protective' :
                n.type === 'warning' ? 'bg-maia-alert' : 'bg-blue-500'
            }`}></div>

            <div className="shrink-0 mt-0.5">
                {n.type === 'success' && <CheckCircle size={18} className="text-green-500" />}
                {n.type === 'suggestion' && <Sparkles size={18} className="text-maia-protective" />}
                {n.type === 'warning' && <AlertTriangle size={18} className="text-maia-alert" />}
                {n.type === 'info' && <Info size={18} className="text-blue-500" />}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-maia-dark leading-tight mb-1">{n.title}</h4>
                <p className="text-xs text-gray-600 leading-snug">{n.message}</p>
                
                {n.action && (
                    <button 
                        onClick={() => onAction(n)}
                        className="mt-2 text-xs font-bold text-maia-protective hover:text-maia-dark flex items-center gap-1 transition-colors"
                    >
                        {n.action.label} <ArrowRight size={12} />
                    </button>
                )}
            </div>

            <button onClick={() => onDismiss(n.id)} className="shrink-0 text-gray-300 hover:text-gray-500 self-start">
                <X size={14} />
            </button>
        </div>
      ))}
    </div>
  );
};

// --- PANEL COMPONENT ---
interface PanelProps {
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
  onClear: () => void;
  onAction: (notification: AppNotification) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<PanelProps> = ({ notifications, onMarkRead, onClear, onAction, isOpen, onClose }) => {
    if (!isOpen) return null;

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="absolute right-0 top-14 w-80 md:w-96 bg-white rounded-2xl shadow-deep border border-gray-100 z-50 flex flex-col max-h-[500px] animate-fade-in origin-top-right">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
                <div>
                    <h3 className="font-bold text-maia-dark">Notificaciones</h3>
                    <p className="text-[10px] text-gray-500">{unreadCount} nuevas</p>
                </div>
                {notifications.length > 0 && (
                    <button onClick={onClear} className="text-[10px] font-bold text-maia-muted hover:text-maia-alert transition-colors">
                        Borrar todo
                    </button>
                )}
            </div>

            <div className="overflow-y-auto custom-scrollbar p-2 flex-1">
                {notifications.length === 0 ? (
                    <div className="py-8 text-center text-gray-400">
                        <Bell size={24} className="mx-auto mb-2 opacity-30" />
                        <p className="text-xs">No hay notificaciones</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {notifications.map(n => (
                            <div 
                                key={n.id} 
                                className={`p-3 rounded-xl border transition-all ${
                                    n.read ? 'bg-white border-transparent opacity-60 hover:opacity-100' : 'bg-blue-50/30 border-blue-100'
                                }`}
                                onClick={() => onMarkRead(n.id)}
                            >
                                <div className="flex gap-3">
                                    <div className="shrink-0 mt-1">
                                        {n.type === 'suggestion' ? (
                                            <div className="w-6 h-6 rounded-full bg-maia-base flex items-center justify-center text-maia-dark">
                                                <Sparkles size={12} />
                                            </div>
                                        ) : n.type === 'success' ? (
                                             <CheckCircle size={14} className="text-green-500" />
                                        ) : (
                                             <Info size={14} className="text-maia-muted" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className={`text-xs font-bold ${n.read ? 'text-gray-600' : 'text-maia-dark'}`}>{n.title}</h4>
                                            <span className="text-[9px] text-gray-300 whitespace-nowrap ml-2">
                                                {n.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.message}</p>
                                        
                                        {n.action && (
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onAction(n);
                                                    onMarkRead(n.id);
                                                    onClose();
                                                }}
                                                className="mt-2 w-full py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-maia-protective hover:border-maia-protective hover:bg-maia-base/20 transition-all flex items-center justify-center gap-1 shadow-sm"
                                            >
                                                {n.action.label} <ArrowRight size={12} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};