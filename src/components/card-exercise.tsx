"use client";

import type {Exercise} from "@/types/exercise";

import {Trash2} from "lucide-react";
import {useAuth} from "@clerk/nextjs";
import {useRouter, useSearchParams} from "next/navigation";

import {supabaseClient} from "@/db/api/server";
import {mock} from "@/api/mock";

import {Card, CardDescription, CardTitle} from "./ui/card";
import {AlertDelete} from "./alert-delete";
import {toast} from "./ui/use-toast";

export default function CardExercise({exercise}: {exercise: Exercise[]}) {
  const {userId, getToken} = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const name = searchParams.get("name");
  const category = searchParams.get("category");

  const filteredExercise = mock.filter((item) => {
    const filterByCategory = item.category.toLowerCase().includes(category?.toLowerCase() ?? "");

    const filterByName = item.name.toLowerCase().includes(name?.toLowerCase() ?? "");

    return filterByCategory && filterByName;
  });

  const handleDeleteExercise = async (id: string) => {
    const supabaseAccessToken = await getToken({template: "gym-log"});

    if (supabaseAccessToken === null) {
      toast({
        description: "Error delete exercise. Please log.",
      });

      return;
    }

    const supabase = await supabaseClient(supabaseAccessToken);
    const {error} = await supabase.from("exercise_list").delete().eq("id", id);

    if (error === null) {
      router.refresh();
    }
  };

  return (
    <>
      {filteredExercise.map((item) => {
        return (
          <Card key={item.id} className="flex flex-col gap-3 px-4 py-4">
            <section className="flex items-center justify-between text-wrap">
              <CardTitle className="h-auto max-w-[70%] text-wrap">
                {item.name} <span>({item.type})</span>
              </CardTitle>
              {userId === item.user_id && item.user_id !== null && (
                <AlertDelete
                  textAction="Continue"
                  textButton={<Trash2 color="red" size={20} />}
                  textCancel="Cancel"
                  textDescription="This action cannot be undone. This will permanently delete the exercise."
                  textTitle="Are you absolutely sure?"
                  variant="ghost"
                  onClick={() => void handleDeleteExercise(item.id)}
                />
              )}
            </section>
            <CardDescription>{item.category}</CardDescription>
          </Card>
        );
      })}
    </>
  );
}
