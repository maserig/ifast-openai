'use client';
import { useState } from 'react';
import { useSupplements } from '@/hooks/useSupplements';
import { recalcBadges } from '@/lib/recalc';

export default function SupplementLogForm({ onClose }:{ onClose: ()=>void }){
  const { supplements, logIntake } = useSupplements();
  const [supplement_id, setSupplementId] = useState<number>();
  const [amount, setAmount] = useState<number>();
  const [context, setContext] = useState<'fasted'|'with_meal'>('with_meal');
  const submit = async (e:any) => { e.preventDefault(); await logIntake.mutateAsync({ supplement_id, amount, context }); await recalcBadges(); onClose(); };
  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center">
      <form onSubmit={submit} className="bg-white dark:bg-neutral-900 p-4 rounded-2xl w-[90vw] max-w-md">
        <h3 className="font-semibold mb-3">Log Intake</h3>
        <select value={supplement_id as any} onChange={e=>setSupplementId(Number(e.target.value))} className="w-full mb-2 p-2 rounded bg-neutral-100 dark:bg-neutral-800">
          <option value="">Select supplement</option>
          {supplements.data?.map((s:any) => <option key={s.id} value={s.id}>{s.name} ({s.default_amount ?? ''} {s.unit})</option>)}
        </select>
        <div className="flex gap-2">
          <input type="number" step="any" value={amount ?? ''} onChange={e=>setAmount(Number(e.target.value))} placeholder="Amount" className="flex-1 p-2 rounded bg-neutral-100 dark:bg-neutral-800" />
          <select value={context} onChange={e=>setContext(e.target.value as any)} className="w-40 p-2 rounded bg-neutral-100 dark:bg-neutral-800">
            <option value="with_meal">With meal</option>
            <option value="fasted">Fasted</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-2 rounded">Cancel</button>
          <button className="px-3 py-2 rounded bg-indigo-600 text-white">Save</button>
        </div>
      </form>
    </div>
  );
}