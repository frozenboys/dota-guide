import { useMemo, useState } from 'react';
import { AlertTriangle, RefreshCw, Search, Shield, SearchX } from 'lucide-react';
import { useHeroes } from '@/hooks/useHeroes';
import { useItemCatalog } from '@/hooks/useItemData';
import HeroCard from '@/components/HeroCard';
import HeroFilters, { type AttributeFilter } from '@/components/HeroFilters';
import HeroModal from '@/components/HeroModal';
import type { Hero } from '@/types/hero';

const SKELETON_COUNT = 12;

function App() {
  const { heroes, loading, error, retry } = useHeroes();
  const { catalog: itemCatalog, error: itemCatalogError } = useItemCatalog();
  const [query, setQuery] = useState('');
  const [attribute, setAttribute] = useState<AttributeFilter>('any');
  const [role, setRole] = useState<string | 'any'>('any');
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  const filteredHeroes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return heroes.filter(
      (hero) =>
        (!normalized || hero.localizedName.toLowerCase().includes(normalized)) &&
        (attribute === 'any' || hero.primaryAttr === attribute) &&
        (role === 'any' || hero.roles.includes(role)),
    );
  }, [heroes, query, attribute, role]);

  const showGrid = !loading && !error && heroes.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_rgba(120,53,15,0.25),_transparent_60%)] text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-600/50 bg-slate-900 text-amber-400 shadow-lg shadow-amber-900/30">
            <Shield className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl text-amber-100 sm:text-4xl">Герои Dota 2</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
            Справочник всех героев для новичков. Выберите героя, чтобы узнать о нём больше.
          </p>
        </header>

        <div className="sticky top-0 z-10 -mx-4 mt-8 space-y-5 bg-slate-950/90 px-4 py-4 backdrop-blur sm:mx-0 sm:px-0">
          <label className="relative mx-auto block max-w-xl">
            <span className="sr-only">Поиск героя по имени</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-600"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск по имени героя"
              disabled={!showGrid}
              className="w-full rounded-full border border-amber-900/60 bg-slate-900 py-3 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 disabled:opacity-50"
            />
          </label>

          {showGrid && (
            <div className="mx-auto max-w-4xl">
              <HeroFilters
                attribute={attribute}
                onAttributeChange={setAttribute}
                role={role}
                onRoleChange={setRole}
              />
            </div>
          )}

          {showGrid && (
            <p className="text-center text-xs text-slate-500">
              Найдено героев: {filteredHeroes.length} из {heroes.length}
            </p>
          )}
        </div>

        {loading && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-xl border border-amber-900/30 bg-slate-900/70"
              >
                <div className="aspect-video bg-slate-800/80" />
                <div className="p-3">
                  <div className="h-4 w-3/4 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-xl border border-red-900/60 bg-slate-900/80 p-8 text-center"
          >
            <AlertTriangle className="h-10 w-10 text-red-400" aria-hidden="true" />
            <p className="mt-4 text-slate-200">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Попробовать снова
            </button>
          </div>
        )}

        {showGrid && filteredHeroes.length === 0 && (
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center text-center text-slate-400">
            <SearchX className="h-10 w-10 text-amber-700" aria-hidden="true" />
            <p className="mt-4">Героев по этим условиям нет. Попробуйте изменить поиск или фильтры.</p>
          </div>
        )}

        {showGrid && filteredHeroes.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredHeroes.map((hero) => (
              <HeroCard key={hero.id} hero={hero} onSelect={setSelectedHero} />
            ))}
          </div>
        )}
      </div>

      {selectedHero && (
        <HeroModal
          hero={selectedHero}
          onClose={() => setSelectedHero(null)}
          itemCatalog={itemCatalog}
          itemCatalogError={itemCatalogError}
        />
      )}
    </div>
  );
}

export default App;
