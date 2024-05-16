/* eslint-disable @typescript-eslint/no-unnecessary-condition */
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
import {useRouter} from "next/navigation";

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
        dbId: z.string().optional(),
        name: z.string(),
        template_id: z.string().optional(),
        set: z.string().optional(),
        created_at: z.string().optional(),
        sets: z.array(
          z.object({
            dbId: z.string().optional(),
            weight: z.coerce.number().nonnegative(),
            reps: z.coerce.number().nonnegative(),
            set: z.coerce.number().optional(),
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
  isEditing?: boolean;
  open: boolean;
  editButton?: string;
}

export function ExerciseForm({
  exercisesList,
  handleDeleteExercise,
  templateName,
  setOpen,
  handleClearTemplate,
  isEditing,
  open,
  editButton,
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
  const router = useRouter();

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

      const {data: reusableTemplate, error: reusableTemplateError} = await supabase
        .from("reusables_templates")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        .insert({
          name: templateName.length === 0 ? "Template name" : templateName,
          user_id: user?.id,
          id: crypto.randomUUID(),
        })
        .select("id");

      if (!templateError) {
        values.exercises.forEach(async (exercise) => {
          const {data: exerciseData} = await supabase
            .from("exercise")
            .insert([
              {
                name: exercise?.name || "",
                template_id: templateData[0].id,
              },
            ])
            .select("id");

          const {data: reusableExercise, error: errorReusable} = await supabase
            .from("reusable_exercise")
            .insert({
              name: exercise?.name || "",
              template_id: (reusableTemplate?.[0]?.id as string) || "", // Add type assertion here
            });

          console.log({errorReusable});

          exercise?.sets.forEach(async (set, index) => {
            const {data, error} = await supabase
              .from("sets")
              .insert([
                {
                  weight: set.weight,
                  reps: set.reps,
                  set: index + 1,
                  exercise_id: exerciseData?.[0]?.id ?? "", // Add null check here
                },
              ])
              .select("id");
          });
        });
      }
      router.refresh();
      setLoading(false);
      handleClearTemplate();
      setOpen(false);
    } catch (error) {
      setError(true);
      setOpen(true);
      setLoading(false);
    }
  };

  const onEdit = async (values: z.infer<typeof formSchema>) => {
    setOpen(true);
    setLoading(true);
    console.log({values});
    try {
      const {data: templateId, error: templateError} = await supabase
        .from("template")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        .upsert(
          [
            {
              //HERE THE PROBLEM IS THAT THE TEMPLATE ID IS NOT BEING PASSED
              // id: values.exercises[0] ? values.exercises[0].template_id ?? "" : "",
              // id: crypto.randomUUID(),
              name: templateName.length === 0 ? "Template name" : templateName,
              user_id: user?.id,
            },
          ],
          {
            unique: "id",
          },
        )
        .select("id");

      console.log({templateError});

      if (!templateError) {
        values.exercises.forEach(async (exercise) => {
          console.log(templateId[0].id);
          if (!exercise) return setError(true);
          const {data: exerciseData, error: exerciseError} = await supabase
            .from("exercise")
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
            //@ts-ignore
            .upsert(
              [
                {
                  id: exercise.dbId,
                  name: exercise.name,
                  template_id: templateId[0].id,
                  created_at: exercise.created_at,
                },
              ],
              {
                unique: "id",
              },
              // exercise.template_id ??
            )
            .select("id");

          console.log({exerciseError});
          console.log({exerciseData});

          exercise?.sets.forEach(async (set) => {
            const {data, error} = await supabase
              .from("sets")
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
              //@ts-ignore
              .upsert(
                [
                  {
                    id: set.dbId,
                    weight: set.weight,
                    reps: set.reps,
                    set: set.set || 0,
                    exercise_id: exerciseData?.[0]?.id ?? "",
                  },
                ],
                {
                  unique: "id",
                },
              )
              .select("*");

            console.log({error});
            console.log({data});
            router.refresh();
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
    if (isEditing) {
      form.setValue(
        "exercises",
        exercisesList.map((exercise) => {
          return {
            name: exercise.name,
            created_at: exercise.created_at,
            sets: exercise.sets?.map((set) => {
              return {
                dbId: set.id,
                weight: set.weight,
                reps: set.reps,
                exercise_id: set.exercise_id,
                ...(isEditing ? {set: set.set} : {}),
              };
            }) ?? [
              {
                dbId: crypto.randomUUID(),
                weight: 0,
                reps: 0,
              },
            ],
            dbId: exercise.id,
            template_id: exercise.template_id,
          };
        }),
      );
    } else {
      form.setValue(
        "exercises",
        exercisesList.map((exercise) => {
          return {
            dbId: exercise.id,
            name: exercise.name,
            // created_at: exercise.created_at,
            sets: [
              {
                dbId: crypto.randomUUID(),
                weight: 0,
                reps: 0,
              },
            ],
          };
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercisesList, isEditing, open]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  const values = form.getValues();

  console.log({fields});

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
      <form
        className="mb-10 mt-10 flex flex-col gap-5"
        onSubmit={isEditing ? form.handleSubmit(onEdit) : form.handleSubmit(onSubmit)}
      >
        <section className="flex max-h-[340px] flex-col gap-5 overflow-y-auto">
          {fields.map((exercise, index) => {
            return (
              <Set
                key={exercise.dbId}
                control={form.control as unknown as Control}
                exercise={exercise}
                handleDeleteExercise={handleDeleteExercise}
                index={index}
                removeExercise={remove}
              />
            );
          })}
        </section>
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
          {loading ? <Loader /> : isEditing ? editButton ? editButton : "edit" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
