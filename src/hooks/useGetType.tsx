import type {Types} from "@/types/exercise";

import {useState, useEffect} from "react";

import supabase from "@/db/api/client";

export function useGetTypes() {
  const [data, setData] = useState<Types[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const {data: type} = await supabase.from("exercise_list").select("type");

    setData(type);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
  };
}
