'use client'
import { Dot, GraduationCap, User, Weight } from "lucide-react";
import {  useState } from "react";
import {


  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMetric } from "@/app/metric-context";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

import Link from "next/link";
import { useCoach } from "@/app/context/coach-context";



export function DropDownNavbar() {
  const { handleChangeMetric, metric } = useMetric();
  const [position, setPosition] = useState(metric);

  const {coachInfo} = useCoach()



  const onMetricChange = (value: string) => {
    handleChangeMetric(value);
    setPosition(value as "kg" | "lbs");
  };



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center gap-4 justify-between">
          Gym Log
          <ModeToggle />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(coachInfo) && 
            <Link href='/coach' className={cn("flex items-center w-full px-2 py-1 text-sm hover:bg-[#5858583f] ", {
              'bg-[#5858583f]': window.location.pathname === '/coach'
            })}>
              <GraduationCap className="mr-2 h-4 w-4" />
              Coach
            </Link>
          }

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Weight className="mr-2 h-4 w-4" />
              <span>Metrics</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  className="flex flex-col gap-2"
                  value={position}
                  onValueChange={onMetricChange}
                >
                  <DropdownMenuRadioItem
                    className={cn("flex cursor-pointer items-center p-1", {
                      "bg-[#5858583f]": position === "kg",
                    })}
                    value="kg"
                  >
                    <span className=" text-[14px]">Kg</span>
                    {position === "kg" && <Dot className="h-5 w-5" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className={cn("flex cursor-pointer items-center p-1", {
                      "bg-[#5858583f]": position === "lbs",
                    })}
                    value="lbs"
                  >
                    <span className=" text-[14px]"> Lbs</span>
                    {position === "lbs" && <Dot className="h-5 w-5 text-lg" />}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
