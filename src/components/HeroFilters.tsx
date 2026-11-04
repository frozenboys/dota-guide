import { ATTRIBUTE_LABELS, ROLE_LABELS } from '@/lib/heroLabels';
import type { HeroAttribute } from '@/types/hero';

export type AttributeFilter = HeroAttribute | 'any';

const ATTRIBUTE_OPTIONS: AttributeFilter[] = ['any', 'str', 'agi', 'int', 'all'];

const ALL_LABEL = 'Все';

const chipBase =
  'shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400';
const chipActive = 'border-amber-500 bg-amber-600 font-semibold text-slate-950';
const chipIdle = 'border-amber-900/60 bg-slate-900 text-slate-300 hover:border-amber-600 hover:text-amber-200';

interface HeroFiltersProps {
  attribute: AttributeFilter;
  onAttributeChange: (value: AttributeFilter) => void;
  role: string | 'any';
  onRoleChange: (value: string | 'any') => void;
}

export default function HeroFilters({
  attribute,
  onAttributeChange,
  role,
  onRoleChange,
}: HeroFiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Атрибут</p>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {ATTRIBUTE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onAttributeChange(option)}
              aria-pressed={attribute === option}
              className={`${chipBase} ${attribute === option ? chipActive : chipIdle}`}
            >
              {option === 'any' ? ALL_LABEL : ATTRIBUTE_LABELS[option]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Роль</p>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          <button
            type="button"
            onClick={() => onRoleChange('any')}
            aria-pressed={role === 'any'}
            className={`${chipBase} ${role === 'any' ? chipActive : chipIdle}`}
          >
            {ALL_LABEL}
          </button>
          {Object.entries(ROLE_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onRoleChange(key)}
              aria-pressed={role === key}
              className={`${chipBase} ${role === key ? chipActive : chipIdle}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
