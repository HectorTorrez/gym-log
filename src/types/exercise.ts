export interface FechExercise {
  category: string;
  created_at: string;
  type: string;
  id: string;
  name: string;
  user_id: string | null;
}

export interface ExerciseList {
  created_at?: string;
  id: string;
  name: string;
  template_id?: string;
  sets?: Set[];
  metric: string;
}

export type FieldsSet = {
  name: string;
  sets: {
    metric: string;
    dbId: string;
    weight: number;
    reps: number;
  }[];
} & Record<"id", string | number>;

export interface Exercise {
  id?: string;
  exercises: Exercises[];
}

export interface Exercises {
  dbId?: string;
  name: string;
  created_at?: string;
  template_id?: string;
  sets: Set[];
  metric: string;
}

export interface Set {
  created_at?: string;
  id?: string;
  weight: number;
  reps: number;
  set?: number;
  exercise_id?: string;

  // created_at: string;
  // exercise_id: string;
  // id: string;
  // reps: number;
  // set: number;
  // weight: number;
}

export interface Types {
  type: string;
}

export interface Category {
  category: string;
}
