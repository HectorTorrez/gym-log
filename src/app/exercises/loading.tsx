import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section>
      <section className="flex flex-col gap-10">
        <section className="flex justify-between">
          <Skeleton className="h-[40px] w-[180px] rounded-xl" />
          <Skeleton className="h-[40px] w-[60px] rounded-xl" />
        </section>
        <Skeleton className="h-[40px] w-[180px] rounded-xl" />
      </section>
      <section className="mt-3 flex flex-col gap-3">
        <Skeleton className="h-[90px] w-[387px] rounded-xl" />
        <Skeleton className="h-[90px] w-[387px] rounded-xl" />
        <Skeleton className="h-[90px] w-[387px] rounded-xl" />
        <Skeleton className="h-[90px] w-[387px] rounded-xl" />
        <Skeleton className="h-[90px] w-[387px] rounded-xl" />
        <Skeleton className="h-[90px] w-[387px] rounded-xl" />
      </section>
    </section>
  );
}
