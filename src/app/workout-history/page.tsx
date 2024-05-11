import {HistoryWorkout} from "@/components/history-workout";
import {getUsersHistoryWorkouts} from "@/lib/getUserHistoryWorkouts";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export default async function WorkoutHistoryPage() {
  const template = await getUsersHistoryWorkouts();

  console.log({template});

  return (
    <div>
      <section className="pb-5 pt-5">
        <h2>History Workouts</h2>
      </section>
      <section className="flex flex-col gap-5">
        {template?.map((exercise) => {
          return <HistoryWorkout key={exercise.id} {...exercise} />;
        })}
      </section>
    </div>
  );
}
