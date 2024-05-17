import {HistoryWorkout} from "@/components/history-workout";
import {getUsersHistoryWorkouts} from "@/lib/getUserHistoryWorkouts";

export const revalidate = 1;

export const dynamic = "force-dynamic";

export default async function WorkoutHistoryPage() {
  const template = await getUsersHistoryWorkouts();



  return (
    <div>
      <section className="pb-5 pt-5">
        <h2>History Workouts</h2>
      </section>
      <section className="flex flex-col gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3">
        {template?.length === 0 && <div className="text-center">No history workouts</div>}
        {template?.map((exercise) => {
          return <HistoryWorkout key={exercise.id} {...exercise} />;
        })}
      </section>
    </div>
  );
}
