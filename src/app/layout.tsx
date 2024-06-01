import type {Metadata} from "next";

import "./globals.css";

import AuthProvider from "@/auth/provider";
import {Navbar} from "@/components/navbar";
import ReactQueryProvider from "@/components/ReactQueryClientProvider";
import {ThemeProvider} from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"
import {MetricProvider} from "./metric-context";

export const metadata: Metadata = {
  title: "Workout Tracker",
  description: "A simple workout tracker",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="    bg-background font-sans antialiased ">
        <AuthProvider>
          <ReactQueryProvider>
            <MetricProvider>
              <ThemeProvider
                disableTransitionOnChange
                enableSystem
                attribute="class"
                defaultTheme="system"
              >
                <main className="mx-auto max-w-7xl px-4">
                  <header>
                    <Navbar />
                  </header>
                  {children}
                </main>
                <Toaster />
              </ThemeProvider>
            </MetricProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
