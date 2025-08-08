'use client';
import { useState } from 'react';
import SupplementForm from './SupplementForm';
import SupplementLogForm from './SupplementLogForm';

export default function SupplementFab(){
  const [open, setOpen] = useState<'add'|'log'|null>(null);
  return (
    <>
      <div className="fixed right-4 bottom-20 flex flex-col gap-2">
        <button onClick={()=>setOpen('add')} className="rounded-full w-14 h-14 bg-emerald-600 text-white text-2xl">+</button>
        <button onClick={()=>setOpen('log')} className="rounded-full w-14 h-14 bg-indigo-600 text-white text-sm">Log</button>
      </div>
      {open==='add' && <SupplementForm onClose={()=>setOpen(null)} />}
      {open==='log' && <SupplementLogForm onClose={()=>setOpen(null)} />}
    </>
  );
}