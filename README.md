# IFast — Intermittent Fasting & Supplements (PWA)

Stack: Next.js 14 (App Router) + TypeScript + Tailwind + React Query + Supabase (Auth, Postgres, RLS) + Edge Functions. Deploy: Vercel + Supabase.

## Variables de entorno
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_PROJECT_ID

## Pasos rápidos
1) Crear proyecto en Supabase y copiar URL + anon key.
2) En Supabase → SQL Editor ejecutar `supabase/migrations/000_init.sql`, `010_rls.sql` y `020_seed_badges.sql`.
3) Activar Google OAuth (ver guía de conversación).
4) En Supabase → Edge Functions crear y desplegar `export-csv` y `recalc-badges` pegando los archivos de `supabase/functions/...`.
5) En Vercel importar el repo, configurar las ENV, desplegar.
6) Iniciar sesión con Google y usar el dashboard.