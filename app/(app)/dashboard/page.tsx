import FastingTimer from "@/components/dashboard/FastingTimer";
import MonthCalendar from "@/components/calendar/MonthCalendar";
import SupplementFab from "@/components/supplements/SupplementFab";
import { ExportButton } from "@/components/export/ExportButton";

export default function Dashboard(){
  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <FastingTimer />
      <section className="rounded-2xl p-4 bg-white dark:bg-neutral-900 shadow">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold mb-2">Calendar & History</h2>
          <ExportButton />
        </div>
        <MonthCalendar />
      </section>
      <SupplementFab />
    </main>
  );
}