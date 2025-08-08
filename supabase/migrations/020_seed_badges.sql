insert into public.badges (code, name, description) values
  ('first_fast', 'First Fast', 'Logged your first fast'),
  ('streak_3', '3-Day Streak', '3 days fasting streak'),
  ('streak_7', '7-Day Streak', '7 days fasting streak'),
  ('first_48h', 'First 48h Fast', 'Completed a 48-hour fast')
on conflict (code) do nothing;