'use client';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }){
  const [dark, setDark] = useState(false);
  useEffect(()=>{ setDark(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches); },[]);
  return <div className={dark ? 'dark' : ''}>{children}</div>;
}