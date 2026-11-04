export type HeroAttribute = 'str' | 'agi' | 'int' | 'all';

export interface Hero {
  id: number;
  name: string;
  localizedName: string;
  primaryAttr: HeroAttribute;
  attackType: string;
  roles: string[];
  imageUrl: string;
}

export interface OpenDotaHeroStat {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: HeroAttribute;
  attack_type: string;
  roles: string[];
  img: string;
}
