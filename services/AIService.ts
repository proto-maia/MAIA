
import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  GoogleGenAI, 
  FunctionDeclaration, 
  Type, 
  Chat,
  Content
} from "@google/genai";
import { Message, ChatHookProps, Asset, Adversary, Threat, Mitigation, AgentMode } from '../types';
import { getAgentSystemInstruction } from './prompts';

// --- TOOL DEFINITIONS ---

const addAssetTool: FunctionDeclaration = {
  name: 'addAsset',
  parameters: {
    type: Type.OBJECT,
    description: 'Registrar un activo en la base de datos.',
    properties: {
      name: { type: Type.STRING, description: 'Nombre del activo' },
      type: { type: Type.STRING, description: 'Tipo: Físico, Digital, Intangible, Humano', enum: ['Físico', 'Digital', 'Intangible', 'Humano'] },
      value: { type: Type.NUMBER, description: 'Valor estratégico (1-5).' },
      description: { type: Type.STRING, description: 'Descripción breve' }
    },
    required: ['name', 'type', 'value']
  }
};

const addAdversaryTool: FunctionDeclaration = {
  name: 'addAdversary',
  parameters: {
    type: Type.OBJECT,
    description: 'Registrar un adversario en la base de datos.',
    properties: {
      name: { type: Type.STRING, description: 'Nombre del adversario' },
      type: { type: Type.STRING, description: 'Tipo', enum: ['Estatal', 'Criminal', 'Interno', 'Competencia', 'Natural'] },
      capability: { type: Type.NUMBER, description: 'Capacidad/Recursos (1-5).' },
      motivation: { type: Type.STRING, description: 'Motivación principal' }
    },
    required: ['name', 'type', 'capability']
  }
};

const addThreatTool: FunctionDeclaration = {
  name: 'addThreat',
  parameters: {
    type: Type.OBJECT,
    description: 'Registrar una AMENAZA en el modelo.',
    properties: {
      name: { type: Type.STRING, description: 'Nombre corto del riesgo' },
      category: { type: Type.STRING, description: 'Categoría (STRIDE, JURIST...)' },
      relatedAsset: { type: Type.STRING, description: 'Nombre exacto del Activo afectado' },
      relatedAdversary: { type: Type.STRING, description: 'Nombre exacto del Adversario' },
      impact: { type: Type.NUMBER, description: 'Impacto (1-5)' },
      probability: { type: Type.NUMBER, description: 'Probabilidad (1-5)' },
      riskLevel: { type: Type.STRING, enum: ['Crítico', 'Alto', 'Medio', 'Bajo'], description: 'Nivel calculado' },
      description: { type: Type.STRING, description: 'Narrativa del escenario' }
    },
    required: ['name', 'category', 'relatedAsset', 'relatedAdversary', 'impact', 'probability', 'riskLevel']
  }
};

const addMitigationTool: FunctionDeclaration = {
  name: 'addMitigation',
  parameters: {
    type: Type.OBJECT,
    description: 'Añadir una medida de protección a una amenaza existente.',
    properties: {
      threatName: { type: Type.STRING, description: 'El nombre exacto de la amenaza a mitigar' },
      description: { type: Type.STRING, description: 'Acción concreta a tomar' },
      strategy: { 
        type: Type.STRING, 
        enum: ['Prevención', 'Mitigación', 'Transferencia', 'Aceptación'],
        description: 'Tipo de estrategia.'
      }
    },
    required: ['threatName', 'description', 'strategy']
  }
};

const switchAgentTool: FunctionDeclaration = {
  name: 'switchAgent',
  parameters: {
    type: Type.OBJECT,
    description: 'Transferir la sesión a otro agente especializado.',
    properties: {
      targetAgent: { 
        type: Type.STRING, 
        enum: ['register', 'modeling', 'mitigation', 'general'],
        description: 'El agente al cual transferir.'
      },
      reason: { type: Type.STRING, description: 'Razón de la transferencia para el usuario.' }
    },
    required: ['targetAgent', 'reason']
  }
};

const getInitialMessage = (mode: AgentMode) => {
    switch(mode) {
        case 'register':
            return "📋 **Módulo de Registro**\nIniciando inventario de activos y perfilado de adversarios. Por favor, indique qué activos desea proteger.";
        case 'modeling':
            return "🛡️ **Módulo de Modelado**\nListo para analizar riesgos. Cruzaremos sus activos registrados con los adversarios para identificar amenazas potenciales.";
        case 'mitigation':
            return "✅ **Módulo de Mitigación**\nPreparado para desarrollar estrategias de defensa. Revisemos las amenazas identificadas para crear planes de acción.";
        default:
            return "👋 **Asistente de Seguridad**\nSistema en línea. Puedo ayudarle a registrar información, analizar riesgos o generar planes de protección. ¿Cómo desea proceder?";
    }
}

export const useGeminiChat = (props: ChatHookProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatSessionRef = useRef<Chat | null>(null);
  
  // Track previous mode to handle history migration
  const prevModeRef = useRef<AgentMode>(props.agentMode);
  // Track if context file changed to re-init
  const prevContextFileTitleRef = useRef<string | undefined>(props.contextFile?.title);
  const isInitializingRef = useRef(false);

  // Helper to convert internal messages to Gemini history
  const getHistoryFromMessages = (msgs: Message[]): Content[] => {
    return msgs.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
  };

  // Effect to load initial history if provided
  useEffect(() => {
    if (props.initialHistory && props.initialHistory.length > 0) {
        setMessages(props.initialHistory);
    } else {
        setMessages([]); // Reset if explicitly undefined/null
    }
  }, [props.initialHistory]);

  const initializeChat = useCallback(async (keepHistory = false) => {
    if (isInitializingRef.current) return;
    isInitializingRef.current = true;

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
         setError("Clave de acceso no detectada.");
         isInitializingRef.current = false;
         return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Inject Current State into System Prompt
      const stateJson = JSON.stringify({
        assets: props.modelState.assets.map(a => ({ name: a.name, type: a.type, value: a.value })),
        adversaries: props.modelState.adversaries.map(a => ({ name: a.name, type: a.type, capability: a.capability })),
        threats: props.modelState.threats.map(t => ({ name: t.name, risk: t.riskLevel, status: t.status }))
      }, null, 2);

      let systemInstruction = getAgentSystemInstruction(props.agentMode, stateJson);

      // RAG Feature: Inject File Content if present
      if (props.contextFile) {
          systemInstruction += `\n\nCONTEXTO ADICIONAL DEL USUARIO (ARCHIVO):
          TÍTULO: ${props.contextFile.title}
          CONTENIDO:
          ${props.contextFile.content}
          
          INSTRUCCIÓN DE CONTEXTO: El usuario está consultando sobre este archivo específico. Úsalo como fuente primaria de información para tus respuestas.`;
      }

      // Create Chat
      // If we are initializing with existing messages (resume), use them
      // If we are switching agents, use current session messages
      const historyToUse = keepHistory ? messages : (props.initialHistory || []);

      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction,
          tools: [{ functionDeclarations: [addAssetTool, addAdversaryTool, addThreatTool, addMitigationTool, switchAgentTool] }],
        },
        history: getHistoryFromMessages(historyToUse)
      });
      
      // If fresh start (no history kept and no initial history), add greeting
      if (historyToUse.length === 0) {
        let initialMsg = getInitialMessage(props.agentMode);
        if (props.contextFile) {
            initialMsg = `📂 **Contexto Cargado:** ${props.contextFile.title}\n\nHe leído el archivo. ¿Qué te gustaría saber o analizar sobre él?`;
        }
        
        setMessages([
          {
            id: 'init_' + Date.now(),
            role: 'model',
            text: initialMsg,
            timestamp: new Date()
          }
        ]);
      } else if (keepHistory) {
         // Optionally add a small system note that mode changed
         setMessages(prev => [...prev, {
             id: 'sys_' + Date.now(),
             role: 'model',
             text: `🔄 *Sistema: Transfiriendo contexto al módulo ${props.agentMode.toUpperCase()}...*`,
             timestamp: new Date()
         }]);
      }

    } catch (e: any) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      isInitializingRef.current = false;
    }
  }, [props.agentMode, props.modelState, props.initialHistory, messages, props.contextFile]); // Dependencies

  // Re-initialize when agent mode changes OR context file changes
  useEffect(() => {
    const contextChanged = props.contextFile?.title !== prevContextFileTitleRef.current;
    
    if (props.agentMode !== prevModeRef.current || contextChanged) {
        // Mode changed or context file changed, re-init
        const keepHistory = !contextChanged && (props.agentMode !== prevModeRef.current); // Only keep history if agent switched but context remained same (unlikely in this flow, but safe)
        
        prevModeRef.current = props.agentMode;
        prevContextFileTitleRef.current = props.contextFile?.title;
        
        initializeChat(keepHistory);
    } else if (!chatSessionRef.current) {
        // First load
        initializeChat(false);
    }
  }, [props.agentMode, props.contextFile, initializeChat]);

  const sendMessage = useCallback(async (text: string) => {
    if (!chatSessionRef.current) await initializeChat(messages.length > 0);
    if (!chatSessionRef.current) return;

    setIsLoading(true);
    
    // Optimistic UI update
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      let result = await chatSessionRef.current.sendMessage({ message: text });
      
      // Loop for tool calls
      while (result.candidates && result.candidates[0]?.content?.parts) {
        const parts = result.candidates[0].content.parts;
        const functionCalls = parts.filter(p => p.functionCall);
        
        if (functionCalls.length > 0) {
          const functionResponses = [];
          
          for (const part of functionCalls) {
            const call = part.functionCall!;
            let responseResult = {};
            
            console.log("Calling Tool:", call.name, call.args);

            if (call.name === 'switchAgent') {
                const args = call.args as any;
                props.switchAgent(args.targetAgent);
                responseResult = { result: `Transferencia a ${args.targetAgent} iniciada. Razón: ${args.reason}` };
            } 
            else if (call.name === 'addAsset') {
              const args = call.args as unknown as Omit<Asset, 'id'>;
              props.addAsset({ ...args, id: Math.random().toString(36).substr(2, 9) });
              responseResult = { result: 'Activo registrado.' };
            } 
            else if (call.name === 'addAdversary') {
              const args = call.args as unknown as Omit<Adversary, 'id'>;
              props.addAdversary({ ...args, id: Math.random().toString(36).substr(2, 9) });
              responseResult = { result: 'Adversario registrado.' };
            } 
            else if (call.name === 'addThreat') {
              const args = call.args as unknown as Omit<Threat, 'id' | 'riskScore'>;
              props.addThreat({ 
                  ...args, 
                  id: Math.random().toString(36).substr(2, 9), 
                  mitigations: [],
                  status: 'Identificado',
                  dateIdentified: new Date()
              } as Threat); 
              responseResult = { result: 'Amenaza registrada.' };
            } 
            else if (call.name === 'addMitigation') {
              const args = call.args as unknown as { threatName: string, description: string, strategy: any };
              props.addMitigation(args.threatName, {
                id: Math.random().toString(36).substr(2, 9),
                description: args.description,
                strategy: args.strategy,
                status: 'Pendiente'
              });
              responseResult = { result: 'Plan de mitigación registrado.' };
            }

            functionResponses.push({
              name: call.name,
              response: responseResult,
              id: call.id
            });
          }

          // Send tool output back to model
          result = await chatSessionRef.current.sendMessage({
             message: functionResponses.map(fr => ({
                 functionResponse: fr
             }))
          });
        } else {
            break;
        }
      }

      const responseText = result.text;
      
      if (responseText) {
        setMessages(prev => [...prev, {
          id: Date.now().toString() + '_model',
          role: 'model',
          text: responseText,
          timestamp: new Date()
        }]);
      }

    } catch (err: any) {
      console.error(err);
      setError("Error de conexión con el Asistente.");
      setMessages(prev => [...prev, {
        id: Date.now().toString() + '_error',
        role: 'model',
        text: "⚠️ Hubo una interrupción en el servicio. Intente nuevamente.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [props, messages]); // Dependencies

  return { messages, sendMessage, isLoading, error, setMessages };
};
