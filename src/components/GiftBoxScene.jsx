import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import FloatingMessage from './FloatingMessage';
import EKGLine from './EKGLine';

// Fecha de inicio: 21 de Marzo de 2026. Objetivo: 1 Mes después.
const TARGET_DATE = new Date('2026-04-21T00:00:00');

const LOVE_MESSAGES = [
  "Eres mi razón de sonreír todos los días.",
  "Me encanta cada pequeño momento a tu lado.",
  "Tu forma de ser me vuelve loco.",
  "No hay lugar donde prefiera estar que contigo.",
  "Desde que llegaste, mi vida es mucho mejor.",
  "Amo cada detalle de ti.",
  "Me haces sentir la persona más afortunada.",
  "Eres mi pedacito de cielo.",
  "Contigo el tiempo vuela tan rápido...",
  "Siento un cariño enorme y sincero por ti."
];

export default function GiftBoxScene() {
  const boxRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [msgCounter, setMsgCounter] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMonthPassed, setIsMonthPassed] = useState(false);
  const [showGift, setShowGift] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        setIsMonthPassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        setIsMonthPassed(false);
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBoxClick = () => {
    // Animación de GSAP al hacer clic en la imagen dentro del contenedor
    gsap.fromTo(boxRef.current,
      { rotate: -5, scale: 1.15 },
      { rotate: 5, scale: 1.25, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => {
          gsap.to(boxRef.current, { rotate: 0, scale: 1.2, duration: 0.2, ease: "bounce.out" });
      }}
    );

    if (isMonthPassed) {
      // Si ya pasó un mes, abrimos el regalo!
      if (!showGift) {
        setShowGift(true);
      }
    } else {
      // Reemplaza el mensaje actual con uno nuevo, sin esperar
      const randomMsg = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
      const newMsgObj = { id: msgCounter, text: randomMsg };
      setMessages([newMsgObj]);
      setMsgCounter(prev => prev + 1);
    }
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-start pt-4 md:pt-8 text-center">
      {/* Título Nuevo con EKG */}
      <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-400 drop-shadow-md leading-tight mb-2">
        Latidos hasta Nuestro Primer Mes
      </h1>
      <EKGLine />
      <div className="bg-white/10 backdrop-blur-md border border-pink-200/30 rounded-2xl p-4 mb-10 w-full max-w-sm shadow-xl">
        <h2 className="text-pink-100/80 uppercase text-sm font-semibold tracking-wider mb-2">
          {isMonthPassed ? '¡Feliz Primer Mes!' : 'Tiempo para nuestro mes:'}
        </h2>
        
        {!isMonthPassed ? (
          <div className="flex justify-center gap-4 text-pink-50">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{timeLeft.days}</span>
              <span className="text-xs opacity-70">Días</span>
            </div>
            <div className="text-3xl font-light opacity-50">:</div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{timeLeft.hours}</span>
              <span className="text-xs opacity-70">Horas</span>
            </div>
            <div className="text-3xl font-light opacity-50">:</div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{timeLeft.minutes}</span>
              <span className="text-xs opacity-70">Min</span>
            </div>
            <div className="text-3xl font-light opacity-50">:</div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{timeLeft.seconds}</span>
              <span className="text-xs opacity-70">Seg</span>
            </div>
          </div>
        ) : (
          <p className="text-lg font-light text-pink-200">
            El tiempo ha cumplido su promesa. Abre tu sorpresa.
          </p>
        )}
      </div>

      {/* Regalo Especial si se abrió */}
      {showGift ? (
         <div className="animate-in fade-in zoom-in duration-1000 bg-rose-900/40 p-8 rounded-3xl border border-pink-500/50">
            <h3 className="text-3xl font-serif text-pink-200 mb-4">¡Sorpresa! 🎁</h3>
            <p className="text-pink-100 font-light text-lg">
              (Aquí insertaremos el regalo sorpresa especial cuando lo decidas. <br/><br/> ¡Felicidades por su primer mes juntos!)
            </p>
         </div>
      ) : (
        /* Contenedor interactivo (Este será sacudido por GSAP) */
        <div className="relative mt-6 md:mt-10 cursor-pointer group" onClick={handleBoxClick}>
          {/* Instrucción visual sutil */}
          <div className="absolute -top-10 left-0 w-full text-center text-pink-200/80 text-sm animate-bounce font-medium">
            {isMonthPassed ? "Tócame para abrir" : "Tócame"}
          </div>

          {/* Contenedor Blanco del Gift Box */}
          <div 
            className="w-56 h-56 md:w-64 md:h-64 bg-white rounded-2xl shadow-[0_10px_40px_rgba(255,105,180,0.4)] border-4 border-white/50 overflow-hidden transition-transform group-hover:scale-105 flex items-center justify-center"
          >
            <img
              ref={boxRef}
              src="/gift_box.png"
              alt="Caja de Regalo Mágica"
              className="w-full h-full object-cover scale-[1.2] pointer-events-none drop-shadow-sm"
              style={{ WebkitUserDrag: 'none' }}
            />
          </div>

          {/* Mensajes Flotantes - se renderizan encima */}
          {messages.map(msg => (
            <FloatingMessage 
              key={msg.id} 
              message={msg.text} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
