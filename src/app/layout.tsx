import type {Metadata} from "next";

import "./globals.css";
import {MainNav} from "@/components/navbar";
import AuthProvider from "@/auth/provider";

export const metadata: Metadata = {
  title: "gym-log",
  description: "Add your gym logs",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="dark bg-background   font-sans antialiased">
        <AuthProvider>
          <header className="text-xl font-bold leading-[4rem]">
            <MainNav className="my-5  justify-between px-4" />
          </header>
          <main className="px-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
