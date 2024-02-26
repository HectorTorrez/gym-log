import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

import {Input} from "./ui/input";

export default function SelectCategory() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="flex w-[50%] flex-col gap-10 md:flex-row">
      <Input
        className="w-[180px] max-w-[500px] md:w-[100%]"
        defaultValue={searchParams.get("name") ?? ""}
        maxLength={20}
        placeholder="Search"
        onChange={(e) => handleFilter("name", e.target.value)}
      />
      <select
        className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
        defaultValue={searchParams.get("category") ?? ""}
        onChange={(e) => handleFilter("category", e.target.value)}
      >
        <option value="">Todas las monedas</option>
        <option value="chest">Chest</option>
        <option value="legs">Legs</option>
        <option value="arms">Arms</option>
        <option value="shoulders">Shoulders</option>
        <option value="back">Back</option>
      </select>
    </section>
  );
}
