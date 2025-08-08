'use client';
import { useState } from 'react';
import { useSupplements } from '@/hooks/useSupplements';

export default function SupplementForm({ onClose }:{ onClose: ()=>void }){
  const { addSupp } = useSupplements();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('mg');
  const [defAmt, setDefAmt] = useState(0);
  const submit = async (e: any) => { e.preventDefault(); await addSupp.mutateAsync({ name, unit, default_amount: defAmt }); onClose(); };
  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center">
      <form onSubmit={submit} className="bg-white dark:bg-neutral-900 p-4 rounded-2xl w-[90vw] max-w-md">
        <h3 className="font-semibold mb-3">Add Supplement</h3>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full mb-2 p-2 rounded bg-neutral-100 dark:bg-neutral-800" required/>
        <div className="flex gap-2">
          <input type="number" step="any" value={defAmt} onChange={e=>setDefAmt(Number(e.target.value))} placeholder="Default" className="flex-1 p-2 rounded bg-neutral-100 dark:bg-neutral-800" />
          <input value={unit} onChange={e=>setUnit(e.target.value)} placeholder="Unit" className="w-28 p-2 rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-2 rounded">Cancel</button>
          <button className="px-3 py-2 rounded bg-emerald-600 text-white">Save</button>
        </div>
      </form>
    </div>
  );
}