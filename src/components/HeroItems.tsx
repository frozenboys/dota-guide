import { useMemo } from 'react';
import { buildHeroItems } from '@/lib/heroItems';
import { useHeroItemPopularity } from '@/hooks/useItemData';
import type { HeroItemBuild, ItemInfo } from '@/types/items';

interface HeroItemsProps {
  heroId: number;
  catalog: Map<number, ItemInfo> | null;
  catalogError: boolean;
}

interface ItemGroupProps {
  title: string;
  items: ItemInfo[];
}

function ItemGroup({ title, items }: ItemGroupProps) {
  if (items.length === 0) return null;
  return (
    <div>
      <h4 className="text-sm text-slate-300">{title}</h4>
      <ul className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {items.map((item) => (
          <li
            key={item.id}
            title={item.name}
            className="flex flex-col items-center gap-1 rounded-lg border border-amber-900/40 bg-slate-950/60 p-2"
          >
            <img src={item.imageUrl} alt={item.name} loading="lazy" className="h-8 w-auto object-contain" />
            <span className="w-full truncate text-center text-[11px] text-slate-400">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function hasAnyItems(build: HeroItemBuild) {
  return build.startItems.length + build.midItems.length + build.lateItems.length > 0;
}

export default function HeroItems({ heroId, catalog, catalogError }: HeroItemsProps) {
  const { data, error } = useHeroItemPopularity(heroId);

  const build = useMemo(
    () => (data && catalog ? buildHeroItems(data, catalog) : null),
    [data, catalog],
  );

  if (catalogError || error) {
    return <p className="text-sm text-red-300/90">Не удалось загрузить предметы для этого героя.</p>;
  }

  if (!build) {
    return <p className="text-sm text-slate-500">Загружаем сборки...</p>;
  }

  if (!hasAnyItems(build)) {
    return <p className="text-sm text-slate-500">Данных о сборках пока нет.</p>;
  }

  return (
    <div className="space-y-4">
      <ItemGroup title="Стартовые предметы" items={build.startItems} />
      <ItemGroup title="Основная сборка" items={build.midItems} />
      <ItemGroup title="Поздняя игра" items={build.lateItems} />
      <p className="text-[11px] text-slate-600">Самые популярные предметы по данным OpenDota.</p>
    </div>
  );
}
