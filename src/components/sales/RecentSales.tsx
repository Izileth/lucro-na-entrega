import { useEffect, useState } from "react";
import { ShoppingCart, Users } from "lucide-react";

const RecentSales = () => {
  const [salesCount, setSalesCount] = useState(1240);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simula um efeito de contagem aumentando aos poucos
    const timer = setTimeout(() => setIsVisible(true), 1500);
    const interval = setInterval(() => {
      setSalesCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[50] animate-fade-up sm:bottom-8 sm:left-8">
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-primary/95 p-4 pr-6 text-white shadow-2xl backdrop-blur-md md:p-5 md:pr-8">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cta text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-cta" />
          </span>
        </div>
        
        <div className="flex flex-col">
          <p className="text-[10px] font-black uppercase tracking-widest text-cta">Vendas Recentes</p>
          <p className="font-display text-sm font-bold leading-tight md:text-base">
            <span className="text-white">{salesCount.toLocaleString()}</span> entregadores <br />
            <span className="text-white/60 font-medium">já garantiram o acesso hoje</span>
          </p>
        </div>

        {/* Mini avatar stack (simulado) */}
        <div className="hidden items-center -space-x-2 md:flex">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-8 rounded-full border-2 border-primary bg-secondary flex items-center justify-center text-[10px] font-bold text-primary">
              {String.fromCharCode(64 + i + Math.random() * 20)}
            </div>
          ))}
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-cta text-[10px] font-black text-white">
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSales;
