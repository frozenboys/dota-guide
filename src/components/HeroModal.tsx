import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Hero } from '@/types/hero';
import type { ItemInfo } from '@/types/items';
import { HERO_LORE } from '@/data/heroLore';
import { ATTACK_TYPE_LABELS, ATTRIBUTE_LABELS, ROLE_LABELS } from '@/lib/heroLabels';
import HeroItems from '@/components/HeroItems';

const NO_LORE_TEXT = 'Лор скоро появится';

interface HeroModalProps {
  hero: Hero;
  onClose: () => void;
  itemCatalog: Map<number, ItemInfo> | null;
  itemCatalogError: boolean;
}

export default function HeroModal({ hero, onClose, itemCatalog, itemCatalogError }: HeroModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const lore = HERO_LORE[hero.name] ?? NO_LORE_TEXT;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="hero-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-amber-800/50 bg-slate-900 shadow-2xl shadow-black/60 sm:max-w-lg sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/80 text-slate-300 transition hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="aspect-video overflow-hidden bg-slate-950">
          <img src={hero.imageUrl} alt={hero.localizedName} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <h2 id="hero-modal-title" className="font-display text-2xl text-amber-100">
            {hero.localizedName}
          </h2>

          <dl className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-amber-900/40 bg-slate-950/60 p-3">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Атрибут</dt>
              <dd className="mt-1 text-slate-100">{ATTRIBUTE_LABELS[hero.primaryAttr]}</dd>
            </div>
            <div className="rounded-lg border border-amber-900/40 bg-slate-950/60 p-3">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Тип атаки</dt>
              <dd className="mt-1 text-slate-100">
                {ATTACK_TYPE_LABELS[hero.attackType] ?? hero.attackType}
              </dd>
            </div>
          </dl>

          <div>
            <h3 className="text-xs uppercase tracking-wide text-slate-500">Роли</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {hero.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-full border border-amber-700/50 bg-amber-950/30 px-3 py-1 text-sm text-amber-200"
                >
                  {ROLE_LABELS[role] ?? role}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-amber-200">Предметы</h3>
            <div className="mt-3">
              <HeroItems heroId={hero.id} catalog={itemCatalog} catalogError={itemCatalogError} />
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg text-amber-200">Лор</h3>
            <p className="mt-2 leading-relaxed text-slate-300">{lore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
