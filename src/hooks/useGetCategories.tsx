import type {Category} from "@/types/exercise";

import {useState, useEffect} from "react";

import supabase from "@/db/api/client";

export function useGetCategories() {
  const [data, setData] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const {data: category} = await supabase.from("exercise_list").select("category");

    setData(category);
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
