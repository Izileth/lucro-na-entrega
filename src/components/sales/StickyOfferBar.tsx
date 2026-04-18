import { Button } from "@/components/ui/button";
import { useCountdown, pad } from "./useCountdown";

const StickyOfferBar = () => {
  const { hours, minutes, seconds } = useCountdown();

  return (
    <div className="sticky top-0 z-[60] w-full gradient-asphalt text-primary-foreground shadow-lg">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-2.5 sm:flex-row sm:gap-6 sm:py-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <p className="text-xs font-semibold sm:text-sm">
            <span className="hidden sm:inline">Oferta exclusiva termina em </span>
            <span className="sm:hidden">Termina em </span>
            <span className="font-display text-base font-bold tabular-nums text-accent sm:text-lg">
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
          </p>
        </div>

        <Button variant="torque" size="sm" asChild className="h-9 px-5 text-xs sm:text-sm">
          <a href="#planos">Garantir agora</a>
        </Button>
      </div>
    </div>
  );
};

export default StickyOfferBar;
