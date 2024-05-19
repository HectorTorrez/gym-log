/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import type {ExerciseList} from "@/types/exercise";
import type {Control} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";
import {Loader} from "lucide-react";
import {useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import supabase from "@/db/api/client";
import {useMetric} from "@/app/metric-context";

import {Set} from "./set-form";
import {AlertError} from "./alert-error";

export const formSchema = z.object({
  exercises: z.array(
    z
      .object({
        dbId: z.string().optional(),
        name: z.string(),
        template_id: z.string().optional(),
        set: z.string().optional(),
        metric: z.string().optional(),
        created_at: z.string().optional(),
        order: z.number().optional(),
        sets: z.array(
          z.object({
            dbId: z.string().optional(),
            weight: z.coerce.number().nonnegative(),
            reps: z.coerce.number().nonnegative(),
            set: z.coerce.number().optional(),
            created_at: z.string().optional(),
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
  isEditingTemplate: boolean;
  onDeleteReusableExercise?: (id: string) => void;
  isReusable: boolean;
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
  isEditingTemplate,
  onDeleteReusableExercise,
  isReusable,
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
  const {metric} = useMetric();

  // const onInvalid = (errors) => console.log({errors});

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpen(true);
    setLoading(true);
    const timestamp = new Date().toString();

    console.log({values});

    try {
      const {data: templateData, error: templateError} = await supabase
        .from("template")
        .insert([
          {
            name: templateName.length === 0 ? "Template name" : templateName,
            user_id: user?.id ?? "",
            created_at: new Date().toString(),
          },
        ])
        .select("id");

      const {data: reusableTemplate} = await supabase
        .from("reusables_templates")

        .insert({
          name: templateName.length === 0 ? "Template name" : templateName,
          user_id: user?.id ?? "",
          id: crypto.randomUUID(),
        })
        .select("id");

      if (!templateError) {
        values.exercises.forEach(async (exercise, index) => {
          const {data: exerciseData} = await supabase
            .from("exercise")
            .insert([
              {
                name: exercise?.name || "",
                template_id: templateData[0].id,
                metric: metric,
                created_at: timestamp,
                order: index + 1,
              },
            ])
            .select("id");

          await supabase.from("reusable_exercise").insert({
            name: exercise?.name || "",
            template_id: (reusableTemplate?.[0]?.id as string) || "", // Add type assertion here
          });

          exercise?.sets.forEach(async (set, index) => {
            await supabase
              .from("sets")
              .insert([
                {
                  weight: set.weight,
                  reps: set.reps,
                  set: index + 1,
                  exercise_id: exerciseData?.[0]?.id ?? "",
                  created_at: timestamp,
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

    try {
      const {data: templateId, error: templateError} = await supabase
        .from("template")
        .upsert(
          [
            {
              id: values.exercises[0] ? values.exercises[0].template_id ?? "" : "",
              created_at: values.exercises[0]?.created_at ?? new Date().toString(),
              name: templateName.length === 0 ? "Template name" : templateName,
              user_id: user?.id ?? "",
            },
          ],

          {
            onConflict: "id",
          },
        )
        .select("id");

      if (!templateError) {
        values.exercises.forEach(async (exercise) => {
          if (!exercise) return setError(true);
          const {data: exerciseData} = await supabase
            .from("exercise")

            .upsert(
              [
                {
                  id: exercise.dbId,
                  name: exercise.name,
                  template_id: templateId[0].id,
                  metric: metric,
                  order: exercise.order,
                  created_at: exercise.created_at,
                } as {
                  created_at: string;
                  id?: string;
                  metric: string;
                  name: string;
                  order: number;
                  template_id: string;
                },
              ],
              {
                onConflict: "id",
              },
            )
            .select("id");

          exercise?.sets.forEach(async (set) => {
            await supabase
              .from("sets")

              .upsert(
                [
                  {
                    id: set.dbId ?? crypto.randomUUID(),
                    weight: set.weight,
                    reps: set.reps,
                    set: set.set || 0,
                    exercise_id: exerciseData?.[0]?.id ?? "",
                    created_at: set.created_at ?? new Date().toString(),
                  },
                ],
                {
                  onConflict: "id",
                },
              )
              .select("*");

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

  const handleAddWithReusableTemplate = async (values: z.infer<typeof formSchema>) => {
    setOpen(true);
    setLoading(true);

    const timestamp = new Date().toString();

    try {
      const {data} = await supabase
        .from("template")
        .insert([
          {
            id: crypto.randomUUID(),
            name: templateName.length === 0 ? "Template name" : templateName,
            user_id: user?.id || "",
            created_at: new Date().toString(),
          },
        ])
        .select("id");

      values.exercises.forEach(async (exercise, index) => {
        const {data: dataExercise} = await supabase
          .from("exercise")
          .insert({
            name: exercise?.name ?? "",
            template_id: data?.[0]?.id ?? "",
            metric: metric,
            created_at: timestamp,
            order: index + 1,
          })
          .select("id");

        exercise?.sets.forEach(async (set, index) => {
          await supabase.from("sets").insert({
            weight: set.weight || 0,
            reps: set.reps,
            set: index + 1,
            exercise_id: dataExercise?.[0]?.id || "",
            created_at: timestamp,
          });
        });
      });
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

  const handleEditReusableTemplate = async (values: z.infer<typeof formSchema>) => {
    setOpen(true);
    setLoading(true);
    try {
      if (isEditingTemplate) {
        const {data: reusableTemplate} = await supabase
          .from("reusables_templates")

          .upsert(
            [
              {
                name: templateName.length === 0 ? "Template name" : templateName,
                user_id: user?.id ?? "",
                id: values.exercises[0]?.template_id ?? "",
              },
            ],
            {onConflict: "id"},
          )
          .select("id");

        for (const exercise of values.exercises) {
          await supabase
            .from("reusable_exercise")

            .upsert(
              {
                name: exercise?.name as string,
                template_id: (reusableTemplate?.[0]?.id as string) || "", // Add type assertion here
                id: exercise?.dbId ?? "",
              },
              {
                onConflict: "id",
              },
            )
            .select("id");
        }
        router.refresh();
        setLoading(false);
        handleClearTemplate();
        setOpen(false);
      }
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
            metric: exercise.metric,
            order: exercise.order,
            sets: exercise.sets?.map((set) => {
              return {
                dbId: set.id,
                weight: set.weight,
                reps: set.reps,
                exercise_id: set.exercise_id,
                ...(isEditing ? {set: set.set} : {}),
                created_at: set.created_at,
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
            metric: metric,

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
        onSubmit={
          isEditingTemplate
            ? form.handleSubmit(handleEditReusableTemplate)
            : isReusable
              ? form.handleSubmit(handleAddWithReusableTemplate)
              : isEditing
                ? form.handleSubmit(onEdit)
                : form.handleSubmit(onSubmit)
        }
      >
        <section className="flex max-h-[340px] flex-col gap-5 overflow-y-auto">
          {fields.map((exercise, index) => {
            return (
              <Set
                key={exercise.dbId}
                control={form.control as unknown as Control}
                exercise={exercise}
                form={form}
                handleDeleteExercise={handleDeleteExercise}
                index={index}
                removeExercise={remove}
                onDeleteReusableExercise={onDeleteReusableExercise}
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
