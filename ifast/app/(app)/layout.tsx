import "../globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import SWRegister from "./sw-register";

export const metadata = {
  title: "IFast",
  description: "Intermittent fasting & supplements tracker"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="min-h-dvh">
        <ThemeProvider>
          <QueryProvider>
            <SWRegister />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}