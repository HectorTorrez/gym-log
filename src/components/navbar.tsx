"use client";
import {SignInButton, SignedIn, SignedOut, UserButton, useUser} from "@clerk/nextjs";
import {BookDashed, Dumbbell, Rows4} from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const {user} = useUser();

  return (
    <nav className=" z-50 flex w-full items-center justify-between bg-gray-800 p-2">
      <section>
        <Link href="/">Home</Link>
      </section>

      <section className="flex items-center gap-5">
        <Link className="flex items-center gap-1" href="/workout">
          <Dumbbell className="h-5 w-5" />
          <span className="hidden md:block">Workouts</span>
        </Link>
        <Link className="flex items-center gap-1" href="/workout-history">
          <BookDashed className="h-5 w-5" />
          <span className="hidden md:block">Templates</span>
        </Link>
        <Link className="flex items-center gap-1" href="/exercises-list">
          <Rows4 />
          <span className="hidden md:block">Exercises</span>
        </Link>
        {!user && <SignInButton />}

        <SignedIn>
          <UserButton />
        </SignedIn>
      </section>
    </nav>
  );
}
