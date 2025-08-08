'use client';
import { exportCsv } from '@/lib/csv';

export function ExportButton(){
  const onExport = async () => {
    const from = new Date(Date.now()-30*24*3600*1000).toISOString();
    const to = new Date().toISOString();
    const blob = await exportCsv(from, to);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'ifast_export.zip'; a.click();
  };
  return <button onClick={onExport} className="px-3 py-2 rounded bg-neutral-200 dark:bg-neutral-800 text-sm">Export 30 días</button>;
}