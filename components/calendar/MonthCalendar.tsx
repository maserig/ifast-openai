'use client';
import { useFasts } from '@/hooks/useFasts';
import { useSupplements } from '@/hooks/useSupplements';

export default function MonthCalendar(){
  const { fasts } = useFasts();
  const { logs } = useSupplements();
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const start = new Date(first); start.setDate(first.getDate() - first.getDay());
  const days = [...Array(42)].map((_,i)=>{ const d = new Date(start); d.setDate(start.getDate()+i); return d; });

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(d => {
        const key = d.toISOString().slice(0,10);
        const dayFasts = fasts.data?.filter(f => (f.end_at ? f.end_at.slice(0,10) : f.start_at.slice(0,10)) === key) ?? [];
        const dayLogs = logs.data?.filter(l => l.taken_at.slice(0,10) === key) ?? [];
        return (
          <div key={key} className={`p-2 rounded-xl border ${d.getMonth()===now.getMonth()? 'bg-white dark:bg-neutral-900':'opacity-50'}`}>
            <div className="text-xs mb-1">{d.getDate()}</div>
            <div className="flex flex-wrap gap-1">
              {dayFasts.map((f:any) => <span key={f.id} className="text-[10px] px-1 rounded bg-sky-600 text-white">Fast</span>)}
              {dayLogs.map((l:any) => <span key={l.id} className="text-[10px] px-1 rounded bg-emerald-600 text-white">{l.supplements?.name}</span>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}