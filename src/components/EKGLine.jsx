export default function EKGLine() {
  return (
    <div className="w-full flex justify-center my-3 opacity-90 overflow-hidden">
      <svg 
        viewBox="0 0 500 100" 
        className="w-full max-w-md h-16 stroke-pink-500 fill-none drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" 
        strokeWidth="5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path 
          d="M -100 50 L 100 50 L 130 50 L 150 20 L 180 90 L 220 10 L 260 90 L 290 50 L 320 50 L 340 30 L 360 70 L 380 50 L 600 50"
          style={{ strokeDasharray: '1500', animation: 'ekg-draw 3s infinite linear' }}
        />
      </svg>
      <style>{`
        @keyframes ekg-draw {
          0% { stroke-dashoffset: 1500; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
