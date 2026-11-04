import { useCallback, useEffect, useState } from 'react';
import type { Hero, OpenDotaHeroStat } from '@/types/hero';

const HERO_STATS_URL = 'https://api.opendota.com/api/heroStats';
const IMAGE_BASE_URL = 'https://cdn.cloudflare.steamstatic.com';

function mapHero(stat: OpenDotaHeroStat): Hero {
  return {
    id: stat.id,
    name: stat.name,
    localizedName: stat.localized_name,
    primaryAttr: stat.primary_attr,
    attackType: stat.attack_type,
    roles: stat.roles,
    imageUrl: `${IMAGE_BASE_URL}${stat.img}`,
  };
}

async function fetchHeroes(signal: AbortSignal): Promise<Hero[]> {
  const response = await fetch(HERO_STATS_URL, { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Unexpected response shape');
  }
  return (data as OpenDotaHeroStat[])
    .map(mapHero)
    .sort((a, b) => a.localizedName.localeCompare(b.localizedName));
}

export function useHeroes() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchHeroes(controller.signal)
      .then((list) => {
        setHeroes(list);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        console.error('Failed to load heroes', err);
        setError('Не удалось загрузить героев. Проверьте интернет-соединение и попробуйте снова.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  return { heroes, loading, error, retry };
}
