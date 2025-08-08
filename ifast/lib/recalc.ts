import { supabase } from './supabase-browser';
export async function recalcBadges(){
  const { data: { session } } = await supabase.auth.getSession();
  await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/recalc-badges`, {
    headers: { Authorization: `Bearer ${session?.access_token}` }
  });
}