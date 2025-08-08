// deno run --allow-env --allow-net --allow-read
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!; // verify via JWT below
    const supabase = createClient(supabaseUrl, supabaseKey, { global: { headers: { Authorization: req.headers.get('Authorization')! }}});

    const url = new URL(req.url);
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    const { data: { user }, error: uerr } = await supabase.auth.getUser();
    if (uerr || !user) return new Response("Unauthorized", { status: 401 });

    const { data: fasts } = await supabase.from('fasts')
      .select('*')
      .gte('start_at', from ?? '1970-01-01')
      .lte('start_at', to ?? new Date().toISOString())
      .order('start_at');

    const { data: logs } = await supabase.from('supplement_logs')
      .select('*, supplements(name, unit)')
      .gte('taken_at', from ?? '1970-01-01')
      .lte('taken_at', to ?? new Date().toISOString())
      .order('taken_at');

    const headerF = ['id','start_at','end_at','preset_type','custom_duration_minutes','notes'];
    const headerL = ['id','supplement','unit','amount','context','taken_at'];

    const csvF = [headerF.join(',')].concat((fasts ?? []).map((f:any) => [f.id,f.start_at,f.end_at,f.preset_type,f.custom_duration_minutes,(f.notes ?? '').toString().replaceAll(',', ';')].join(','))).join('\n');
    const csvL = [headerL.join(',')].concat((logs ?? []).map((l:any) => [l.id,l.supplements?.name,l.supplements?.unit,l.amount,l.context,l.taken_at].join(','))).join('\n');

    const boundary = 'IFASTBOUNDARY';
    const body = `--${boundary}\r\nContent-Type: text/csv\r\nContent-Disposition: attachment; filename=fasts.csv\r\n\r\n${csvF}\r\n--${boundary}\r\nContent-Type: text/csv\r\nContent-Disposition: attachment; filename=supplement_logs.csv\r\n\r\n${csvL}\r\n--${boundary}--`;

    return new Response(body, {
      headers: {
        'Content-Type': `multipart/mixed; boundary=${boundary}`,
        'Cache-Control': 'no-store'
      }
    });
  } catch (e) {
    return new Response(`Error: ${e}`, { status: 500 });
  }
});