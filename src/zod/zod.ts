import {z} from "zod";

export const FormSchema = z.object({
  exerciseName: z.string().min(3).max(20),
  exerciseCategory: z
    .string({required_error: "Please select a category to display"})
    .min(1, {message: "String must contain at least 1 category"}),
});
