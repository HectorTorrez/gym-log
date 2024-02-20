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
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
