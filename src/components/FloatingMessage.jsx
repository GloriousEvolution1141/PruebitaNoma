import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingMessage({ message }) {
  const msgRef = useRef(null);

  useEffect(() => {
    const el = msgRef.current;
    
    // Configuración inicial (invisible, abajo, un poco pequeño)
    gsap.set(el, { opacity: 0, y: 50, scale: 0.5 });

    // Animación para que aparezca, suba y se quede estático
    gsap.to(el, {
      opacity: 1,
      y: -140, // Sube por encima de la caja
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.2)"
    });
  }, []);

  return (
    <div 
      ref={msgRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 w-56 bg-pink-900/90 backdrop-blur border border-pink-400 text-pink-50 text-base md:text-lg p-4 rounded-2xl shadow-2xl leading-relaxed text-center"
    >
      {message}
    </div>
  );
}
