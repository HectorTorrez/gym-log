export interface HistoryWorkoutsCardProps {
  created_at: string;
  id: string;
  name: string;
  user_id: string;
  exercise: {
    created_at: string;
    id: string;
    name: string;
    template_id: string;
    sets: {
      created_at: string;
      id: string;
      reps: number;
      set: number;
      weight: number;
      exercise_id: string;
    }[];
  }[];
}

export interface CardBodyProps {
  exercise: {
    created_at: string;
    id: string;
    name: string;
    template_id: string;
    sets:
      | {
          created_at: string;
          id: string;
          reps: number;
          set: number;
          weight: number;
          exercise_id: string;
        }[]
      | null;
  };
}

export interface HistoryWorkoutsCardPropsWithClassName extends HistoryWorkoutsCardProps {
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
}
