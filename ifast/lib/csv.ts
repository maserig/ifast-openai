import { supabase } from './supabase-browser';
export async function exportCsv(from?: string, to?: string){
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/export-csv${from||to?`?from=${encodeURIComponent(from??'')}&to=${encodeURIComponent(to??'')}`:''}`;
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch(url, { headers: { Authorization: `Bearer ${session?.access_token}` }});
  if (!res.ok) throw new Error('Export failed');
  const blob = await res.blob();
  return blob;
}