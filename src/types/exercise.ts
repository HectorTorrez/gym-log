export interface FechExercise {
  category: string;
  created_at: string;
  type: string;
  id: string;
  name: string;
  user_id: string | null;
}

export interface ExerciseList {
  id: string;
  name: string;
}

export type FieldsSet = {
  name: string;
  sets: {
    weight: number;
    reps: number;
  }[];
} & Record<"id", string | number>;

export interface Exercise {
  id?: string;
  exercises: Exercises[];
}

export interface Exercises {
  id?: string;
  name: string;
  sets: Set[];
}

export interface Set {
  id?: string;
  weight: number;
  reps: number;
}
