/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import type {z} from "zod";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {FormSchema} from "@/zod/zod";

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

export default function FormAddExercise() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      exerciseName: "",
      exerciseCategory: "",
      exerciseType: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
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

        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
