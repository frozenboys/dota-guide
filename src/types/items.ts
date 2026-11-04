export interface ItemInfo {
  id: number;
  name: string;
  imageUrl: string;
}

export interface OpenDotaItemConstant {
  id: number;
  dname?: string;
  img?: string;
}

export type ItemPopularity = Record<string, number>;

export interface HeroItemPopularity {
  start_game_items: ItemPopularity;
  mid_game_items: ItemPopularity;
  late_game_items: ItemPopularity;
}

export interface HeroItemBuild {
  startItems: ItemInfo[];
  midItems: ItemInfo[];
  lateItems: ItemInfo[];
}
