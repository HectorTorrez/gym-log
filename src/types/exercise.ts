export interface FechExercise {
  category: string;
  created_at: string;
  type: string;
  id: string;
  name: string;
  user_id: string | null;
}

export interface ExerciseList {
  created_at: string;
  id: string;
  name: string;
  template_id?: string;
  sets: Set[];
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
  // created_at?: string;
  // id?: string;
  // weight: number;
  // reps: number;
  // set?: number;
  // exercise_id?: string;

  created_at: string;
  exercise_id: string;
  id: string;
  reps: number;
  set: number;
  weight: number;
}
