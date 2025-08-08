'use client';
import { supabase } from '@/lib/supabase-browser';
export default function SignInCard() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${location.origin}/dashboard` } });
  };
  return (
    <div className="mx-auto max-w-sm p-6 rounded-2xl shadow bg-white dark:bg-neutral-900 mt-24 text-center">
      <h1 className="text-2xl font-semibold mb-4">IFast</h1>
      <p className="text-sm mb-6">Track your fasts & supplements.</p>
      <button onClick={signIn} className="w-full py-2 rounded-lg bg-sky-600 text-white">Continuar con Google</button>
    </div>
  );
}