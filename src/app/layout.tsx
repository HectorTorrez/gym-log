import type {Metadata} from "next";

import "./globals.css";

import AuthProvider from "@/auth/provider";
import {Navbar} from "@/components/navbar";
import ReactQueryProvider from "@/components/ReactQueryClientProvider";

import {MetricProvider} from "./metric-context";

export const metadata: Metadata = {
  title: "gym-log",
  description: "Add your gym logs",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="dark    bg-background font-sans antialiased ">
        <AuthProvider>
          <ReactQueryProvider>
            <MetricProvider>
              <header>
                <Navbar />
              </header>
              <main className="mx-auto max-w-7xl px-4">{children}</main>
            </MetricProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
