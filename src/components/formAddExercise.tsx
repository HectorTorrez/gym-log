/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import {set, type z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useAuth} from "@clerk/nextjs";
import {useState} from "react";

import {FormSchema} from "@/zod/zod";
import {supabaseClient} from "@/db/api/server";

import {Input} from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {Button} from "./ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {toast} from "./ui/use-toast";

interface FormAddExerciseProps {
  setOpen: (open: boolean) => void;
}

export default function FormAddExercise({setOpen}: FormAddExerciseProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      exerciseName: "",
      exerciseCategory: "",
      exerciseType: "",
    },
  });

  const {getToken, userId} = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const {exerciseCategory, exerciseName, exerciseType} = data;

    try {
      const supabaseAccessToken = await getToken({template: "gym-log"});

      if (supabaseAccessToken === null) return console.log("No access token");
      const supabase = await supabaseClient(supabaseAccessToken);
      const {
        data: InsertedData,
        error,
        status,
      } = await supabase.from("exercise_list").insert([
        {
          name: exerciseName,
          category: exerciseCategory,
          type: exerciseType,
          role: "user",
          user_id: userId,
        },
      ]);

      if (status === 201) {
        toast({
          description: "Your exercise has been added",
        });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding exercise", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="exerciseName"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  className={`${form.formState.errors.exerciseName ? "border border-red-400" : ""}`}
                  minLength={3}
                  placeholder="Squat"
                  {...form.register("exerciseName", {required: true})}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <section className="flex flex-col gap-10 sm:flex sm:flex-row sm:justify-between">
          <FormField
            control={form.control}
            name="exerciseCategory"
            render={({field}) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="arms">Arms</SelectItem>
                      <SelectItem value="legs">Legs</SelectItem>
                      <SelectItem value="chest">Chest</SelectItem>
                      <SelectItem value="back">Back</SelectItem>
                      <SelectItem value="shoulder">Shoulder</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exerciseType"
            render={({field}) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Barbell">Barbell</SelectItem>
                      <SelectItem value="Dumbbell">Dumbbell</SelectItem>
                      <SelectItem value="Machine">Machine</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <Button type="submit">{loading ? "Loading" : "Add"}</Button>
      </form>
    </Form>
  );
}
