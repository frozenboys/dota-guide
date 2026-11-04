import type {
  HeroItemBuild,
  HeroItemPopularity,
  ItemInfo,
  ItemPopularity,
  OpenDotaItemConstant,
} from '@/types/items';

const IMAGE_BASE_URL = 'https://cdn.cloudflare.steamstatic.com';
const ITEMS_PER_GROUP = 6;

export function buildItemCatalog(raw: Record<string, OpenDotaItemConstant>): Map<number, ItemInfo> {
  const catalog = new Map<number, ItemInfo>();
  for (const item of Object.values(raw)) {
    if (!item.dname || !item.img) continue;
    catalog.set(item.id, {
      id: item.id,
      name: item.dname,
      imageUrl: `${IMAGE_BASE_URL}${item.img}`,
    });
  }
  return catalog;
}

function topItems(
  popularity: ItemPopularity,
  catalog: Map<number, ItemInfo>,
): ItemInfo[] {
  return Object.entries(popularity)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => catalog.get(Number(id)))
    .filter((item): item is ItemInfo => item !== undefined)
    .slice(0, ITEMS_PER_GROUP);
}

export function buildHeroItems(
  popularity: HeroItemPopularity,
  catalog: Map<number, ItemInfo>,
): HeroItemBuild {
  return {
    startItems: topItems(popularity.start_game_items, catalog),
    midItems: topItems(popularity.mid_game_items, catalog),
    lateItems: topItems(popularity.late_game_items, catalog),
  };
}
