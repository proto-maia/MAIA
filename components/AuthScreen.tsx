import React, { useState, useEffect, useRef } from 'react';
import { Shield, ArrowRight, Lock, Key, User, AlertCircle } from 'lucide-react';
import * as THREE from 'three';

interface AuthScreenProps {
  onLogin: (userId: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F6E1C3'); // Maia Base
    scene.fog = new THREE.FogExp2('#F6E1C3', 0.02); // Soft depth

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25; 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create a group to hold all particle layers for unified rotation
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    const radius = 28; 

    // --- LAYER 1: BASE PARTICLES (Fine Mesh) ---
    const baseGeometry = new THREE.BufferGeometry();
    const baseCount = 2000;
    const basePositions = new Float32Array(baseCount * 3);

    for (let i = 0; i < baseCount; i++) {
        const theta = Math.random() * Math.PI * 2; 
        const phi = Math.acos(2 * Math.random() - 1); 
        
        const r = radius + (Math.random() - 0.5) * 2.0; 

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        basePositions[i * 3] = x;
        basePositions[i * 3 + 1] = y;
        basePositions[i * 3 + 2] = z;
    }
    baseGeometry.setAttribute('position', new THREE.BufferAttribute(basePositions, 3));

    const baseMaterial = new THREE.PointsMaterial({
        size: 0.10, // Increased from 0.07 so they aren't "too tiny"
        color: 0x7A3E65, // Maia Dark
        transparent: true,
        opacity: 0.4,
    });
    const baseMesh = new THREE.Points(baseGeometry, baseMaterial);
    particleGroup.add(baseMesh);

    // --- LAYER 2: ACCENT PARTICLES (Larger, Randomly Distributed) ---
    const accentGeometry = new THREE.BufferGeometry();
    const accentCount = 200; // Fewer count for accents
    const accentPositions = new Float32Array(accentCount * 3); // Fixed: size * 3 for x,y,z

    for (let i = 0; i < accentCount; i++) {
        const theta = Math.random() * Math.PI * 2; 
        const phi = Math.acos(2 * Math.random() - 1); 
        
        // Slightly more variance in radius for depth
        const r = radius + (Math.random() - 0.5) * 2.0; 

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        accentPositions[i * 3] = x;
        accentPositions[i * 3 + 1] = y;
        accentPositions[i * 3 + 2] = z;
    }
    accentGeometry.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3));

    const accentMaterial = new THREE.PointsMaterial({
        size: 0.30, // Significantly bigger
        color: 0x7A3E65,
        transparent: true,
        opacity: 0.6,
    });
    const accentMesh = new THREE.Points(accentGeometry, accentMaterial);
    particleGroup.add(accentMesh);


    // --- ANIMATION ---
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      // Slower speed as requested
      time += 0.0004;

      particleGroup.rotation.y = time;
      particleGroup.rotation.z = time * 0.1;
      
      // Gentle breathing
      const scale = 1 + Math.sin(time * 0.5) * 0.03; 
      particleGroup.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      baseGeometry.dispose();
      baseMaterial.dispose();
      accentGeometry.dispose();
      accentMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsLoading(true);
    setError(null);

    // Validate credentials
    setTimeout(() => {
        let valid = false;
        
        // Credentials Logic
        if (username === 'user0' && password === '000.000') valid = true;
        else if (username === 'user1' && password === '111.111') valid = true;
        else if (username === 'user2' && password === '222.222') valid = true;

        if (valid) {
            onLogin(username);
        } else {
            setIsLoading(false);
            setError("Credenciales inválidas. Verifica tu usuario y contraseña.");
        }
    }, 1500);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-maia-base font-sans">
      
      {/* 3D Background */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full animate-fade-in p-6">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden flex flex-col">
            
            {/* Header / Logo Area */}
            <div className="bg-maia-dark/95 p-10 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Gradient orb decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-maia-protective/20 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-maia-protective to-[#D68C65] rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Shield size={28} className="text-maia-dark" />
                </div>
                <h1 className="text-4xl font-bold text-white tracking-tighter mb-2">MAIA</h1>
                <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-maia-protective/50"></div>
                    <p className="text-maia-protective font-mono text-[10px] font-bold tracking-[0.2em] uppercase">VERSION 0.3.2</p>
                </div>
                </div>
            </div>

            <div className="p-8 pt-8 bg-gradient-to-br from-white/40 to-white/10 flex-1">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-maia-dark uppercase tracking-wide mb-2 pl-1">Usuarix</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 text-maia-dark/50" size={18} />
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-white/50 rounded-xl text-maia-dark focus:outline-none focus:border-maia-protective focus:bg-white/80 transition-all placeholder-maia-dark/40 shadow-sm"
                                placeholder="user"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-maia-dark uppercase tracking-wide mb-2 pl-1">Contraseña</label>
                        <div className="relative">
                            <Key className="absolute left-4 top-3.5 text-maia-dark/50" size={18} />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-white/50 rounded-xl text-maia-dark focus:outline-none focus:border-maia-protective focus:bg-white/80 transition-all placeholder-maia-dark/40 shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-maia-alert/10 border border-maia-alert/20 rounded-xl flex items-start gap-2 animate-fade-in">
                            <AlertCircle size={16} className="text-maia-alert shrink-0 mt-0.5" />
                            <p className="text-xs text-maia-dark font-medium leading-tight">{error}</p>
                        </div>
                    )}

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={isLoading || !username || !password}
                            className={`group relative w-full overflow-hidden px-6 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] ${
                                isLoading 
                                ? 'bg-maia-structure/80 text-maia-dark cursor-wait' 
                                : 'bg-maia-dark text-white hover:bg-maia-protective hover:text-maia-dark hover:shadow-maia-protective/40 hover:shadow-2xl hover:scale-[1.02]'
                            }`}
                        >
                            {isLoading ? (
                                <span className="animate-pulse text-sm">Verificando...</span>
                            ) : (
                                <>
                                    <span>Ingresar</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="bg-white/5 p-4 border-t border-white/20 text-center">
                <p className="text-[10px] text-maia-dark/60 font-medium flex items-center justify-center gap-1">
                    <Lock size={10} />
                    Sistema Encriptado. Almacenamiento Local.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};