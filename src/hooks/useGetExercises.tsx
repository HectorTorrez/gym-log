import type {FechExercise} from "@/types/exercise";

import {useState, useEffect} from "react";

import supabase from "@/db/api/client";

export function useGetExercises() {
  const [data, setData] = useState<FechExercise[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const {data, error} = await supabase
      .from("exercise_list")
      .select()
      .order("created_at", {ascending: false});

    setData(data);
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
