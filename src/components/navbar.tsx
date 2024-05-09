"use client";
import {SignInButton, SignedIn, SignedOut, UserButton, useUser} from "@clerk/nextjs";
import {BookDashed, Dumbbell} from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const {user} = useUser();

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-2">
      <section>
        <Link href="/">Home</Link>
      </section>

      <section className="flex items-center gap-5">
        <Link className="flex items-center gap-1" href="/workout">
          <Dumbbell className="h-5 w-5" />
          <span className="hidden md:block">Workouts</span>
        </Link>
        <Link className="flex items-center gap-1" href="/templates">
          <BookDashed className="h-5 w-5" />
          <span className="hidden md:block">Templates</span>
        </Link>
        {!user && <SignInButton />}

        <SignedIn>
          <UserButton />
        </SignedIn>
      </section>
    </nav>
  );
}
