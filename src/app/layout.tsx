import type {Metadata} from "next";

import "./globals.css";

import AuthProvider from "@/auth/provider";
import {Navbar} from "@/components/navbar";
import ReactQueryProvider from "@/components/ReactQueryClientProvider";

export const metadata: Metadata = {
  title: "gym-log",
  description: "Add your gym logs",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="dark bg-background   font-sans antialiased">
        <AuthProvider>
          <ReactQueryProvider>
            <header>
              <Navbar />
            </header>
            <main className="px-4">{children}</main>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
