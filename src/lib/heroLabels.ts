import type { HeroAttribute } from '@/types/hero';

export const ATTRIBUTE_LABELS: Record<HeroAttribute, string> = {
  str: 'Сила',
  agi: 'Ловкость',
  int: 'Интеллект',
  all: 'Универсал',
};

export const ATTACK_TYPE_LABELS: Record<string, string> = {
  Melee: 'Ближний бой',
  Ranged: 'Дальний бой',
};

export const ROLE_LABELS: Record<string, string> = {
  Carry: 'Керри',
  Mid: 'Мидер',
  Offlane: 'Оффлейнер',
  Support: 'Саппорт',
  Nuker: 'Нюкер',
  Disabler: 'Дизейблер',
  Jungler: 'Лесник',
  Durable: 'Живучий',
  Escape: 'Побег',
  Pusher: 'Пушер',
  Initiator: 'Инициатор',
};
