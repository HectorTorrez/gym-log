import supabase from "@/db/api/server";

export async function getWorkout(clientId: string) {
  const {data, error} = await  supabase.from('user_routine').select('routine_id').eq('userID', clientId).single()

   if(!data?.routine_id) {
    return {
      workout: [],
      error: "No workout found",
    }
    
   }
    const {data: workout, error: errorWorkout} = await supabase.from('coach_workout').select('*, coach_templates(*, coach_exercise(*, coach_sets(*)))').eq('id', data.routine_id)

    return {
      workout
    }
  
}
