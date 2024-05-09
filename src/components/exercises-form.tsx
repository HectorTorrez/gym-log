/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import type {ExerciseList} from "@/types/exercise";
import type {Control} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldArray, useForm} from "react-hook-form";
import {set, z} from "zod";
import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";
import {Loader} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import supabase from "@/db/api/client";

import {Set} from "./set-form";
import {DialogClose} from "./ui/dialog";
import {AlertError} from "./alert-error";

export const formSchema = z.object({
  exercises: z.array(
    z
      .object({
        id: z.string().optional(),
        name: z.string(),
        sets: z.array(
          z.object({
            weight: z.coerce.number().nonnegative(),
            reps: z.coerce.number().nonnegative(),
          }),
        ),
      })
      .optional(),
  ),
});

interface ExerciseFormProps {
  handleDeleteExercise: (id: string) => void;
  exercisesList: ExerciseList[];
  templateName: string;
  setOpen: (open: boolean) => void;
  handleClearTemplate: () => void;
}

export function ExerciseForm({
  exercisesList,
  handleDeleteExercise,
  templateName,
  setOpen,
  handleClearTemplate,
}: ExerciseFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {fields, remove} = useFieldArray({
    name: "exercises",
    control: form.control,
  });

  const {user} = useUser();

  // const onInvalid = (errors) => console.log(errors);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpen(true);
    setLoading(true);
    try {
      const {data: templateData, error: templateError} = await supabase
        .from("template")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        .insert([
          {
            name: templateName.length === 0 ? "Template name" : templateName,
            user_id: user?.id,
          },
        ])
        .select("id");

      if (!templateError) {
        values.exercises.forEach(async (exercise) => {
          exercise?.sets.forEach(async (set, index) => {
            const {data, error} = await supabase
              .from("sets")
              .insert([
                {
                  weight: set.weight,
                  reps: set.reps,
                  set: index + 1,
                },
              ])
              .select("id");

            if (!error) {
              await supabase
                .from("exercise")
                .insert([
                  {
                    name: exercise.name,
                    set: data[0].id,
                    template_id: templateData[0].id,
                  },
                ])
                .select("id");

              // if (!exerciseError) {
              //   const {data: userExercise, error: userExerciseError} = await supabase
              //     .from("user_exercises")
              //     .insert([
              //       {
              //         exercise_id: exerciseData[0].id,
              //         user_id: user?.id,
              //       },
              //     ]);

              //   console.log({userExerciseError});
              // }
            }
          });
        });
      }
      setLoading(false);
      handleClearTemplate();
      setOpen(false);
    } catch (error) {
      setError(true);
      setOpen(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (exercisesList.length > 0) {
    form.setValue(
      "exercises",

      exercisesList.map((exercise) => {
        return {
          name: exercise.name,
          sets: [{id: crypto.randomUUID(), weight: 0, reps: 0}],
        };
      }),
    );
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercisesList]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  const values = form.getValues();

  return (
    <Form {...form}>
      {error ? (
        <AlertError
          alertClassName="absolute -top-32 right-0 bg-red-500 p-2 rounded-lg text-white "
          description="There is an error, please wait"
          iconClassName="w-4 h-4"
          title="Error"
        />
      ) : null}
      <form className="mb-10 mt-10 flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((exercise, index) => {
          return (
            <Set
              key={exercise.id}
              control={form.control as unknown as Control}
              exercise={exercise}
              handleDeleteExercise={handleDeleteExercise}
              index={index}
              removeExercise={remove}
            />
          );
        })}

        <Button
          disabled={
            Object.keys(values).length === 0 ||
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            !values.exercises ||
            values.exercises.length === 0 ||
            !values.exercises.every((exercise) => exercise?.sets && exercise.sets.length > 0)
          }
          type="submit"
        >
          {loading ? <Loader /> : " Create template"}
        </Button>
      </form>
    </Form>
  );
}
