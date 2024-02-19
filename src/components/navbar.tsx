"use client";
import Link from "next/link";

import {cn} from "@/lib/utils";

export function MainNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <section>
        <Link className={cn('"text-sm hover:text-primary" font-medium transition-colors')} href="/">
          Exercises
        </Link>
      </section>
      <section className="flex items-center gap-3">
        <Link
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          href="/workout"
        >
          Start Workout
        </Link>
        <Link
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          )}
          href="/exercises"
        >
          Exercises
        </Link>
        <Link
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          href="/examples/dashboard"
        >
          Profile
        </Link>
      </section>
    </nav>
  );
}
