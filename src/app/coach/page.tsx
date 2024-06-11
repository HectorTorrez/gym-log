import { CardWorkout } from "@/components/coach/card-workout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/get-initials"
import { thereIsCoach } from "@/queries/friends-notifications"
import { getWorkoutNote } from "@/queries/notes"
import { getWorkout } from "@/queries/workout"
import { auth } from "@clerk/nextjs"
import { AtSign, Mail } from "lucide-react"

export default async  function CoachPage() {
  const user = auth()
  const id = user?.userId ?? ''
  const {coach } = await thereIsCoach(id)
  const {workout, error} = await getWorkout(id)
  const {notes} = await getWorkoutNote(id, 'workout')


  if(error) {
    return <div>{error}</div>
  }


  const name = coach?.users?.name ?? ''
  const email = coach?.users?.email
  const username = coach?.users?.username
  const image = coach?.users?.image ?? ''
  return (
    <section className="mt-5 flex flex-col gap-10 sm:flex-row">
      <section className="flex flex-col gap-3 sm:flex-row">

        <Avatar className="h-28 w-28">
          <AvatarImage src={image} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      <section className="flex flex-col gap-1">
      <h3 className="font-bold text-3xl">{name}</h3>
      <p className="flex items-center">
      <Mail className="mr-2 h-4 w-4" />
        {email}</p>
      <p className="flex items-center">
      <AtSign className="mr-2 h-4 w-4" />
        {username}</p>
      </section>
      </section>
      <section className="min-w-[300px] border p-5 flex flex-col gap-4">
        <p>Program: <span className="text-blue-400">{workout?.[0].name}</span></p>
        <section className="flex flex-col gap-3 md:flex-row md:items-center ">
          <h3>Workout: </h3>
          {
            workout?.map((workout => (
              workout.coach_templates.map((exercise) => {
                return (
                  <CardWorkout key={exercise.id} coach_exercise={exercise.coach_exercise} name={exercise.name}/>
                )
              })
             
            )))
          }
        </section>
        <section>
          <h3>Notes:</h3>
          <p>{notes ? notes.note : 'There is no note'}</p>
        </section>
      </section>
    </section>
  )
}
