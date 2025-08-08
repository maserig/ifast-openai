'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-browser';

export function useFasts(){
  const qc = useQueryClient();
  const fasts = useQuery({ queryKey: ['fasts'], queryFn: async () => {
    const { data, error } = await supabase.from('fasts').select('*').order('start_at', { ascending: false });
    if (error) throw error; return data as any[];
  }});

  const add = useMutation({ mutationFn: async (payload: any) => {
    const { data, error } = await supabase.from('fasts').insert(payload).select('*').single();
    if (error) throw error; return data;
  }, onSuccess(){ qc.invalidateQueries({ queryKey: ['fasts']}); }});

  const update = useMutation({ mutationFn: async ({ id, ...patch }: any) => {
    const { data, error } = await supabase.from('fasts').update(patch).eq('id', id).select('*').single();
    if (error) throw error; return data;
  }, onSuccess(){ qc.invalidateQueries({ queryKey: ['fasts']}); }});

  return { fasts, add, update };
}