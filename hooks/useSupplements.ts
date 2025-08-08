'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase-browser';

export function useSupplements(){
  const qc = useQueryClient();
  const supplements = useQuery({ queryKey: ['supplements'], queryFn: async () => {
    const { data, error } = await supabase.from('supplements').select('*').order('name');
    if (error) throw error; return data as any[];
  }});
  const logs = useQuery({ queryKey: ['supplement_logs'], queryFn: async () => {
    const { data, error } = await supabase.from('supplement_logs').select('*, supplements(name, unit)').order('taken_at', { ascending: false });
    if (error) throw error; return data as any[];
  }});

  const addSupp = useMutation({ mutationFn: async (payload: any) => {
    const { data, error } = await supabase.from('supplements').insert(payload).select('*').single();
    if (error) throw error; return data;
  }, onSuccess(){ qc.invalidateQueries({ queryKey: ['supplements']}); }});

  const logIntake = useMutation({ mutationFn: async (payload: any) => {
    const { data, error } = await supabase.from('supplement_logs').insert(payload).select('*').single();
    if (error) throw error; return data;
  }, onSuccess(){ qc.invalidateQueries({ queryKey: ['supplement_logs']}); }});

  return { supplements, logs, addSupp, logIntake };
}