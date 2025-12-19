import { ThreatModelState } from '../types';

export const DEMO_STATE: ThreatModelState = {
  activeUser: 'user1',
  notifications: [
    {
      id: 'notif_demo_1',
      type: 'warning',
      title: 'Alerta de Inteligencia',
      message: 'Se ha detectado actividad inusual en los nodos de salida relacionados con su región.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false
    }
  ],
  assets: [
    {
      id: 'asset_1',
      name: 'Base de Datos de Beneficiarios',
      type: 'Digital',
      value: 5,
      description: 'Servidor SQL encriptado con registros de 5000 personas vulnerables.'
    },
    {
      id: 'asset_2',
      name: 'Portátil de Dirección',
      type: 'Físico',
      value: 4,
      description: 'MacBook Pro utilizada por la directora ejecutiva en viajes de campo.'
    },
    {
      id: 'asset_3',
      name: 'Canal de Signal',
      type: 'Digital',
      value: 3,
      description: 'Grupo de coordinación logística para emergencias.'
    }
  ],
  adversaries: [
    {
      id: 'adv_1',
      name: 'Grupo "Los Vigilantes"',
      type: 'Criminal',
      capability: 3,
      motivation: 'Extorsión y venta de datos personales al mercado negro.'
    },
    {
      id: 'adv_2',
      name: 'Inteligencia Estatal',
      type: 'Estatal',
      capability: 5,
      motivation: 'Monitoreo de actividades de ONGs y disidencia política.'
    }
  ],
  threats: [
    {
      id: 'threat_1',
      name: 'Filtración por Malware',
      category: 'Seguridad Digital',
      relatedAsset: 'Base de Datos de Beneficiarios',
      relatedAdversary: 'Inteligencia Estatal',
      impact: 5,
      probability: 4,
      riskScore: 20,
      riskLevel: 'Crítico',
      description: 'Infección mediante spear-phishing dirigido a administradores para exfiltrar la BD.',
      status: 'En Análisis',
      dateIdentified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      mitigations: [
        {
          id: 'mit_1',
          description: 'Implementar llaves de seguridad física (YubiKey) para admins.',
          strategy: 'Prevención',
          status: 'En Progreso'
        }
      ]
    },
    {
      id: 'threat_2',
      name: 'Robo de equipo en campo',
      category: 'Seguridad Física',
      relatedAsset: 'Portátil de Dirección',
      relatedAdversary: 'Grupo "Los Vigilantes"',
      impact: 4,
      probability: 3,
      riskScore: 12,
      riskLevel: 'Alto',
      description: 'Asalto durante traslados en zonas de bajo control gubernamental.',
      status: 'Identificado',
      dateIdentified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      mitigations: []
    }
  ],
  chatHistory: [
    {
      id: 'chat_demo_1',
      title: 'Análisis de Riesgo Físico',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      agentMode: 'modeling',
      summary: 'Evaluación de rutas seguras para el equipo de campo.',
      messages: [
        {
          id: 'msg_1',
          role: 'model',
          text: "🛡️ **Módulo de Modelado**\nListo para analizar riesgos. Cruzaremos sus activos registrados con los adversarios para identificar amenazas potenciales.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
        },
        {
          id: 'msg_2',
          role: 'user',
          text: "Me preocupa que roben la laptop de la directora en el próximo viaje.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 5000)
        },
        {
          id: 'msg_3',
          role: 'model',
          text: "Entendido. Basado en tus activos, refieres al activo **Portátil de Dirección**. \n\n¿Quién consideras que es el adversario más probable en esta ruta? ¿El **Grupo \"Los Vigilantes\"** o actores estatales?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 10000)
        }
      ]
    }
  ]
};