import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function calcStreak(fasts: { start_at: string; end_at: string | null }[]) {
  const days = new Set<string>();
  for (const f of fasts) {
    const end = new Date(f.end_at ?? f.start_at);
    const key = end.toISOString().slice(0,10);
    days.add(key);
  }
  let streak = 0;
  const today = new Date();
  for (let d = 0; d < 60; d++) {
    const dt = new Date(today);
    dt.setDate(today.getDate() - d);
    const key = dt.toISOString().slice(0,10);
    if (days.has(key)) streak++; else break;
  }
  return streak;
}

serve(async (req) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey, { global: { headers: { Authorization: req.headers.get('Authorization')! }}});

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { data: fasts } = await supabase.from('fasts').select('start_at, end_at').order('start_at');
  const streak = calcStreak(fasts ?? []);

  const { data: badges } = await supabase.from('badges').select('id, code');
  const wants = new Set<string>();
  if ((fasts?.length ?? 0) > 0) wants.add('first_fast');
  if (streak >= 3) wants.add('streak_3');
  if (streak >= 7) wants.add('streak_7');
  if ((fasts ?? []).some(f => {
    const start = new Date(f.start_at); const end = new Date(f.end_at ?? new Date());
    return (end.getTime()-start.getTime()) >= 48*60*60*1000;
  })) wants.add('first_48h');

  const codeToId = new Map((badges ?? []).map((b:any) => [b.code, b.id]));

  for (const code of wants) {
    const badge_id = codeToId.get(code);
    if (!badge_id) continue;
    await supabase.from('user_badges').insert({ badge_id }); // user_id trigger fills in
  }

  return new Response(JSON.stringify({ streak, applied: Array.from(wants) }), { headers: { 'Content-Type': 'application/json' } });
});