'use client';
import { useEffect, useMemo, useState } from 'react';
import { useFasts } from '@/hooks/useFasts';
import { recalcBadges } from '@/lib/recalc';

const PRESETS: Record<string, number> = { '16:8': 16*60, '24h': 24*60, '48h': 48*60 };

export default function FastingTimer(){
  const { fasts, add, update } = useFasts();
  const active = useMemo(() => fasts.data?.find(f => !f.end_at) ?? null, [fasts.data]);
  const [now, setNow] = useState(Date.now());
  useEffect(()=>{ const id=setInterval(()=>setNow(Date.now()), 1000); return ()=>clearInterval(id);},[]);

  const start = async (preset: keyof typeof PRESETS) => {
    await add.mutateAsync({ start_at: new Date().toISOString(), preset_type: preset, custom_duration_minutes: PRESETS[preset] });
    await recalcBadges();
  };
  const stop = async () => {
    if (!active) return;
    await update.mutateAsync({ id: active.id, end_at: new Date().toISOString() });
    await recalcBadges();
  };

  const elapsedMin = active ? Math.floor((now - new Date(active.start_at).getTime())/60000) : 0;
  const target = active ? new Date(new Date(active.start_at).getTime() + (active.custom_duration_minutes ?? PRESETS[active.preset_type ?? '16:8'])*60000) : null;
  const remainingMin = target ? Math.max(0, Math.floor((target.getTime()-now)/60000)) : 0;

  return (
    <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900 shadow">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Fasting Timer</h2>
        <div className="text-xs opacity-70">{active ? `Ends: ${target?.toLocaleString()}` : 'Not fasting'}</div>
      </div>
      <div className="mt-4 text-4xl tabular-nums">{active ? `${elapsedMin}m elapsed` : '—'}</div>
      {active && <div className="mt-1 text-sm opacity-80">{remainingMin}m remaining</div>}
      <div className="mt-4 flex gap-2">
        {!active ? (
          <>
            {Object.keys(PRESETS).map(p => (
              <button key={p} onClick={()=>start(p as any)} className="px-3 py-2 rounded-lg bg-sky-600 text-white text-sm">Start {p}</button>
            ))}
          </>
        ) : (
          <button onClick={stop} className="px-3 py-2 rounded-lg bg-rose-600 text-white text-sm">Stop</button>
        )}
      </div>
    </div>
  );
}