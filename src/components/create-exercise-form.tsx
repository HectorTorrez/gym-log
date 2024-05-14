"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useGetCategories} from "@/hooks/useGetCategories";
import {useGetTypes} from "@/hooks/useGetType";
import supabase from "@/db/api/client";

import {CategorySelected} from "./type-category";
import {TypeSelected} from "./type-select";

const formSchema = z.object({
  exercise: z.string().min(2, {
    message: "exercise must be at least 2 characters.",
  }),
  category: z
    .string({
      required_error: "Category is required",
    })
    .min(2, {
      message: "Select a category",
    }),
  type: z
    .string({
      required_error: "Type is required",
    })
    .min(2, {
      message: "Select a type",
    }),
});

export default function CreateExerciseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exercise: "",
      category: "",
      type: "",
    },
  });

  const {data: category} = useGetCategories();
  const {data: type} = useGetTypes();

  const {user} = useUser();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const {error} = await supabase.from("exercise_list").insert({
        name: values.exercise,
        category: values.category,
        type: values.type,
        role: "user",
        user_id: user?.id,
      });

      console.log({error});
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="exercise"
          render={({field}) => (
            <FormItem>
              <FormLabel>Exercise name</FormLabel>
              <FormControl>
                <Input placeholder="Squat" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue=""
          name="category"
          render={({field}) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <CategorySelected
                isCreate
                options={category || []}
                onCategoryChange={field.onChange}
              />

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue=""
          name="type"
          render={({field}) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <TypeSelected isCreate options={type || []} onTypeChange={field.onChange} />

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
