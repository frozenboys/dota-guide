import type { Hero } from '@/types/hero';
import { ATTRIBUTE_LABELS } from '@/lib/heroLabels';

interface HeroCardProps {
  hero: Hero;
  onSelect: (hero: Hero) => void;
}

export default function HeroCard({ hero, onSelect }: HeroCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(hero)}
      aria-label={`Открыть карточку героя: ${hero.localizedName}`}
      className="group relative w-full cursor-pointer overflow-hidden rounded-xl border border-amber-900/40 bg-slate-900/70 text-left shadow-lg shadow-black/40 transition duration-300 hover:-translate-y-1 hover:border-amber-500/70 hover:shadow-amber-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      <div className="aspect-video overflow-hidden bg-slate-950">
        <img
          src={hero.imageUrl}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <h2 className="truncate font-display text-sm text-amber-100 sm:text-base">
          {hero.localizedName}
        </h2>
        <span className="shrink-0 rounded-full border border-amber-700/50 px-2 py-0.5 text-[11px] text-amber-300/90">
          {ATTRIBUTE_LABELS[hero.primaryAttr]}
        </span>
      </div>
    </button>
  );
}
