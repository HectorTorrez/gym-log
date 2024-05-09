/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import type {ExerciseList} from "@/types/exercise";
import type {Control} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {useEffect} from "react";

import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";

import {Set} from "./set-form";

export const formSchema = z.object({
  exercises: z.array(
    z
      .object({
        id: z.string().optional(),
        name: z.string(),
        sets: z.array(
          z.object({
            weight: z.coerce.number().positive(),
            reps: z.coerce.number().positive(),
          }),
        ),
      })
      .optional(),
  ),
});

interface ExerciseFormProps {
  handleDeleteExercise: (id: string) => void;
  exercisesList: ExerciseList[];
}

export function ExerciseForm({exercisesList, handleDeleteExercise}: ExerciseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {fields, remove} = useFieldArray({
    name: "exercises",
    control: form.control,
  });

  // const onInvalid = (errors) => console.log(errors);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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

  const values = form.getValues();

  return (
    <Form {...form}>
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
          Submit
        </Button>
      </form>
    </Form>
  );
}
