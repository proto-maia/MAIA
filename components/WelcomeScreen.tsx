import React, { useEffect, useRef } from 'react';
import { Shield, Lock, ArrowRight, Eye, Cpu, Users } from 'lucide-react';
import * as THREE from 'three';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F6E1C3'); // Maia Base
    // Lighter fog for depth without obscuring too much
    scene.fog = new THREE.FogExp2('#F6E1C3', 0.025);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // PARTICLES SYSTEM - Elegant, Lightweight, Math-based
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1800;

    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
        // Spread particles nicely in a wide volume
        posArray[i] = (Math.random() - 0.5) * 35;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.06, // Slightly bigger as requested
        color: 0x7A3E65, // Maia Dark (Purple) from Sidebar
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // ANIMATION LOOP
    let mouseX = 0;
    let mouseY = 0;

    // Interaction for "Sophisticated" feel
    const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Gentle rotation of the entire field
      particlesMesh.rotation.y += 0.0005;
      
      // Gentle wave/breathing using simple math + noise/chaos
      const time = Date.now() * 0.0002;
      
      // Adding some "chaos" using sin/cos combinations
      particlesMesh.rotation.x = Math.sin(time) * 0.05 + (mouseY * 0.03) + Math.cos(time * 2.5) * 0.02;
      particlesMesh.rotation.z = Math.cos(time * 0.8) * 0.05 + (mouseX * 0.03) + Math.sin(time * 1.5) * 0.02;

      // Pulse effect on size slightly
      // Note: modifying material properties in loop can be expensive but okay for this simple scene
      // particlesMaterial.size = 0.06 + Math.sin(time * 3) * 0.01; 

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-maia-base font-sans">
      {/* 3D Background */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-6xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in">
          
          {/* Left: Brand Identity */}
          <div className="md:w-1/3 bg-maia-dark/95 text-white p-10 flex flex-col justify-between relative overflow-hidden">
             {/* Gradient orb decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-maia-protective/20 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>

             <div className="relative z-10">
               <div className="w-14 h-14 bg-gradient-to-br from-maia-protective to-[#D68C65] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                 <Shield size={28} className="text-maia-dark" />
               </div>
               <h1 className="text-5xl font-bold tracking-tighter mb-2">MAIA</h1>
               <div className="flex items-center gap-2">
                   <div className="h-px w-8 bg-maia-protective/50"></div>
                   <p className="text-maia-protective font-mono text-xs font-bold tracking-[0.2em] uppercase">VERSION 0.3.2</p>
               </div>
             </div>

             <div className="relative z-10 mt-12 space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Users size={20} className="text-maia-protective shrink-0 mt-1" />
                    <div className="space-y-2">
                        <p className="text-xs text-white font-bold leading-relaxed">
                            Codiseñado por y para organizaciones latinoamericanas en lucha.
                            <br className="my-1"/>
                            © CAD & Diversa, 2025
                        </p>
                        <p className="text-[9px] text-white/60 leading-relaxed">
                            Reimaginamos y hackeamos la tecnología para un mejor futuro en el Sur Global.
                        </p>
                    </div>
                </div>
             </div>
          </div>

          {/* Right: Interaction & Info */}
          <div className="md:w-2/3 p-8 md:p-12 flex flex-col bg-gradient-to-br from-white/40 to-white/10">
             
             {/* Hero Intro */}
             <div className="mb-10">
                <p className="text-lg md:text-xl text-maia-dark font-medium leading-relaxed border-l-4 border-maia-protective pl-6 py-2">
                    MAIA es una herramienta de Defensa Civil Digital. Su propósito es democratizar el modelado de amenazas para activistas y organizaciones mediante el uso inteligencia artificial encriptada para generar estrategias de ciberseguridad accionables en diferentes contextos.
                </p>
             </div>

             {/* Functional Grid */}
             <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Feature 1: Privacidad por Diseño */}
                    <div className="bg-white/60 hover:bg-white/80 transition-colors p-5 rounded-xl border border-white/50 shadow-sm group cursor-default">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-maia-base rounded-lg text-maia-dark group-hover:scale-110 transition-transform">
                                <Lock size={18} />
                            </div>
                            <h3 className="font-bold text-maia-dark text-sm uppercase tracking-wide">Privacidad por Diseño</h3>
                        </div>
                        <p className="text-xs text-maia-dark/80 pl-1">Los datos y conversaciones están encriptados</p>
                    </div>

                    {/* Feature 2: Gobernanza de IA */}
                    <div className="bg-white/60 hover:bg-white/80 transition-colors p-5 rounded-xl border border-white/50 shadow-sm group cursor-default">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-maia-base rounded-lg text-maia-dark group-hover:scale-110 transition-transform">
                                <Cpu size={18} />
                            </div>
                            <h3 className="font-bold text-maia-dark text-sm uppercase tracking-wide">Gobernanza de IA</h3>
                        </div>
                        <p className="text-xs text-maia-dark/80 pl-1">Modelos ejecutados localmente</p>
                    </div>

                    {/* Feature 3: Visibilidad */}
                    <div className="bg-white/60 hover:bg-white/80 transition-colors p-5 rounded-xl border border-white/50 shadow-sm group cursor-default">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-maia-base rounded-lg text-maia-dark group-hover:scale-110 transition-transform">
                                <Eye size={18} />
                            </div>
                            <h3 className="font-bold text-maia-dark text-sm uppercase tracking-wide">Visibilidad</h3>
                        </div>
                        <p className="text-xs text-maia-dark/80 pl-1">Identifica activos en riesgo y vectores de ataque</p>
                    </div>

                    {/* Feature 4: Mitigacion */}
                    <div className="bg-white/60 hover:bg-white/80 transition-colors p-5 rounded-xl border border-white/50 shadow-sm group cursor-default">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-maia-base rounded-lg text-maia-dark group-hover:scale-110 transition-transform">
                                <Shield size={18} />
                            </div>
                            <h3 className="font-bold text-maia-dark text-sm uppercase tracking-wide">Mitigacion</h3>
                        </div>
                        <p className="text-xs text-maia-dark/80 pl-1">Planes y acciones concretas para reducir riesgos</p>
                    </div>
                </div>
             </div>

             {/* Footer Actions & Limitations */}
             <div className="mt-8 pt-6 border-t border-maia-dark/10 flex flex-col md:flex-row justify-between items-end gap-6">
                
                <div className="max-w-xs">
                    <p className="text-[10px] text-maia-dark/50 leading-normal font-medium">
                        <span className="font-bold text-maia-alert/60 uppercase mr-1">limitaciones:</span>
                         MAIA usa modelos de lenguaje de código abierto. Verifica las recomendaciones críticas. MAIA no reemplaza a expertxs legales o en ciberguridad.
                    </p>
                </div>

                <button 
                    onClick={onStart}
                    className="group relative overflow-hidden bg-maia-dark text-white px-9 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-maia-protective/40 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center hover:bg-maia-protective hover:text-maia-dark"
                >
                    Ingresar
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};