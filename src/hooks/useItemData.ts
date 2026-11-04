import { useEffect, useState } from 'react';
import { buildItemCatalog } from '@/lib/heroItems';
import type { HeroItemPopularity, ItemInfo, OpenDotaItemConstant } from '@/types/items';

const ITEMS_URL = 'https://api.opendota.com/api/constants/items';
const HERO_ITEM_POPULARITY_URL = 'https://api.opendota.com/api/heroes';

export function useItemCatalog() {
  const [catalog, setCatalog] = useState<Map<number, ItemInfo> | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(ITEMS_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<Record<string, OpenDotaItemConstant>>;
      })
      .then((raw) => setCatalog(buildItemCatalog(raw)))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        console.error('Failed to load item catalog', err);
        setError(true);
      });

    return () => controller.abort();
  }, []);

  return { catalog, error };
}

export function useHeroItemPopularity(heroId: number) {
  const [data, setData] = useState<HeroItemPopularity | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${HERO_ITEM_POPULARITY_URL}/${heroId}/itemPopularity`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<HeroItemPopularity>;
      })
      .then((result) => setData(result))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        console.error('Failed to load hero item popularity', err);
        setError(true);
      });

    return () => controller.abort();
  }, [heroId]);

  return { data, error };
}
