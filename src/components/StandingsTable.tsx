import { useState } from 'react';

type Team = {
  pos: number; name: string; div: string;
  p: number; w: number; d: number; l: number;
  gf: number; ga: number; gd: string; pts: number;
  leader?: boolean; relegation?: boolean;
};

type SortCol = 'p' | 'w' | 'd' | 'l' | 'gf' | 'ga' | 'gd' | 'pts';

const COLS: { label: string; key?: SortCol; cls: string }[] = [
  { label: 'POS', cls: 'w-10 text-left' },
  { label: 'TEAM', cls: 'text-left' },
  { label: 'DIV', cls: 'w-14 text-center' },
  { label: 'P',   key: 'p',   cls: 'w-10 text-center' },
  { label: 'W',   key: 'w',   cls: 'w-10 text-center' },
  { label: 'D',   key: 'd',   cls: 'w-10 text-center' },
  { label: 'L',   key: 'l',   cls: 'w-10 text-center' },
  { label: 'GF',  key: 'gf',  cls: 'w-10 text-center' },
  { label: 'GA',  key: 'ga',  cls: 'w-10 text-center' },
  { label: 'GD',  key: 'gd',  cls: 'w-10 text-center' },
  { label: 'PTS', key: 'pts', cls: 'w-12 text-right' },
];

function gdNum(s: string) {
  return parseInt(s.replace('+', '')) || 0;
}

export default function StandingsTable({ teams }: { teams: Team[] }) {
  const [sortKey, setSortKey] = useState<SortCol>('pts');
  const [asc, setAsc] = useState(false);

  const sorted = [...teams].sort((a, b) => {
    const av = sortKey === 'gd' ? gdNum(a.gd) : (a[sortKey] as number);
    const bv = sortKey === 'gd' ? gdNum(b.gd) : (b[sortKey] as number);
    return asc ? av - bv : bv - av;
  });

  function handleSort(key: SortCol) {
    if (sortKey === key) { setAsc(!asc); } else { setSortKey(key); setAsc(false); }
  }

  return (
    <div className="border border-[var(--color-border)] overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[640px]" aria-label="Premier division standings">
        <thead>
          <tr className="bg-[var(--color-dark)] text-[var(--color-on-dark)]">
            {COLS.map(({ label, key, cls }) => (
              <th
                key={label}
                scope="col"
                onClick={key ? () => handleSort(key) : undefined}
                aria-sort={key ? (sortKey === key ? (asc ? 'ascending' : 'descending') : 'none') : undefined}
                className={`font-mono text-xs uppercase tracking-widest px-3 py-3 border-r last:border-r-0 border-[var(--color-border)]/20 ${cls} ${key ? 'cursor-pointer select-none hover:bg-black/20' : ''}`}
              >
                {label}{key && sortKey === key ? (asc ? ' ↑' : ' ↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((team) => (
            <tr
              key={team.name}
              className={`border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface)] transition-colors ${team.leader ? 'border-l-4 border-l-[var(--color-primary)]' : ''} ${team.relegation ? 'border-l-4 border-l-red-600' : ''}`}
            >
              <td className="font-mono text-sm px-3 py-3 text-[var(--color-text-muted)] border-r border-[var(--color-border)]">{team.pos}</td>
              <td className="font-body text-sm px-3 py-3 text-[var(--color-text)] uppercase font-semibold border-r border-[var(--color-border)]">{team.name}</td>
              <td className="font-mono text-xs px-3 py-3 text-center text-[var(--color-text-muted)] border-r border-[var(--color-border)]">{team.div}</td>
              <td className="font-mono text-xs px-3 py-3 text-center text-[var(--color-text-muted)] border-r border-[var(--color-border)]">{team.p}</td>
              <td className="font-mono text-xs px-3 py-3 text-center text-[var(--color-text-muted)] border-r border-[var(--color-border)]">{team.w}</td>
              <td className="font-mono text-xs px-3 py-3 text-center text-[var(--color-text-muted)] border-r border-[var(--color-border)]">{team.d}</td>
              <td className="font-mono text-xs px-3 py-3 text-center text-[var(--color-text-muted)] border-r border-[var(--color-border)]">{team.l}</td>
              <td className="font-mono text-xs px-3 py-3 text-center text-[var(--color-text-muted)] border-r border-[var(--color-border)]">{team.gf}</td>
              <td className="font-mono text-xs px-3 py-3 text-center text-[var(--color-text-muted)] border-r border-[var(--color-border)]">{team.ga}</td>
              <td className="font-mono text-xs px-3 py-3 text-center text-[var(--color-text-muted)] border-r border-[var(--color-border)]">{team.gd}</td>
              <td className="font-mono text-sm px-3 py-3 text-right font-bold text-[var(--color-text)]">{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
