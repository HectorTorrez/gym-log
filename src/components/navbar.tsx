"use client";
import {SignInButton, SignedIn, UserButton, useUser} from "@clerk/nextjs";
import {Dumbbell, History, Rows4} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {cn} from "@/lib/utils";

import {DropDownNavbar} from "./dropdown-navbar";
import {ModeToggle} from "./mode-toggle";

export function Navbar() {
  const {user} = useUser();

  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <nav className="z-50   py-2">
      <section className="mx-auto flex w-full max-w-7xl items-center justify-between ">
        <section className="flex items-center gap-3">
          <DropDownNavbar />
          <ModeToggle />
        </section>

        <section className="flex items-center gap-5">
          <Link
            className={cn("flex items-center gap-1", {
              "text-blue-400": isActive("/"),
            })}
            href="/"
          >
            <History className="h-5 w-5" />
            <span className="hidden md:block">History</span>
          </Link>

          <Link
            className={cn("flex items-center gap-1", {
              "text-blue-400": isActive("/workout"),
            })}
            href="/workout"
          >
            <Dumbbell className="h-5 w-5" />
            <span className="hidden md:block">Workouts</span>
          </Link>

          <Link
            className={cn("flex items-center gap-1", {
              "text-blue-400": isActive("/exercises-list"),
            })}
            href="/exercises-list"
          >
            <Rows4 />
            <span className="hidden md:block">Exercises</span>
          </Link>
          {!user && (
            <Link
              className={cn("flex items-center gap-1", {
                "text-blue-400": isActive("/sign-in"),
              })}
              href="/sign-in"
            >
              Sign in
            </Link>
          )}

          {/* <SignedIn> */}
          {user ? <UserButton /> : null}
          {/* </SignedIn> */}
        </section>
      </section>
    </nav>
  );
}
