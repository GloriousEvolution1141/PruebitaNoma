import GiftBoxScene from './components/GiftBoxScene'
import fondo from './assets/fondo.jpg'

function App() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black text-white flex justify-center items-center">
      {/* Imagen de fondo global */}
      <img
        src={fondo}
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Contenedor principal con márgenes laterales y centrado */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-10 h-full flex flex-col items-center">
        <GiftBoxScene />
      </div>
    </div>
  )
}

export default App
