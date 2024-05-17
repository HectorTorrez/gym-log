"use client";
import {SignInButton, SignedIn, UserButton, useUser} from "@clerk/nextjs";
import {Dumbbell, History, Rows4} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {cn} from "@/lib/utils";

export function Navbar() {
  const {user} = useUser();

  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <nav className="z-50  bg-gray-800 px-4 py-2">
      <section className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <section>
          {/* <Link
            className={cn("flex items-center gap-1", {
              "text-blue-400": isActive("/"),
              "text-white": !isActive("/"),
            })}
            href="/"
          >
            <History className="h-5 w-5" />
            <span className="hidden md:block">History</span>
          </Link> */}
        </section>

        <section className="flex items-center gap-5">
          <Link
            className={cn("flex items-center gap-1", {
              "text-blue-400": isActive("/"),
              "text-white": !isActive("/"),
            })}
            href="/"
          >
            <History className="h-5 w-5" />
            <span className="hidden md:block">History</span>
          </Link>

          <Link
            className={cn("flex items-center gap-1", {
              "text-blue-400": isActive("/workout"),
              "text-white": !isActive("/workout"),
            })}
            href="/workout"
          >
            <Dumbbell className="h-5 w-5" />
            <span className="hidden md:block">Workouts</span>
          </Link>
          {/* <Link
            className={cn("flex items-center gap-1", {
              "text-blue-400": isActive("/workout-history"),
              "text-white": !isActive("/workout-history"),
            })}
            href="/workout-history"
          >
            <BookDashed className="h-5 w-5" />
            <span className="hidden md:block">Templates</span>
          </Link> */}
          <Link
            className={cn("flex items-center gap-5", {
              "text-blue-400": isActive("/exercises-list"),
              "text-white": !isActive("/exercises-list"),
            })}
            href="/exercises-list"
          >
            <Rows4 />
            <span className="hidden md:block">Exercises</span>
          </Link>
          {!user && <SignInButton />}

          <SignedIn>
            <UserButton />
          </SignedIn>
        </section>
      </section>
    </nav>
  );
}
