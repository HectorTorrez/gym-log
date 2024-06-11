export interface CoachSet {
  id: string;
  set: number;
  reps: number;
  weight: number;
  user_id: string;
  created_at: string;
  exercise_id: string;
}

export interface CoachExercise {
  coach_template_id: string;
  created_at: string;
  id: string;
  metric: string;
  name: string;
  order: number;
  user_id: string;
  coach_sets: CoachSet[];
}

export interface Exercise {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  coach_workout: string;
  coach_exercise: CoachExercise[];
}
