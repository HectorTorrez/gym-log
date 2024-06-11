'use server'

import supabase from "@/db/api/server"

export async function getWorkoutNote(clientId: string, type: string) {
  const {data, error} = await supabase.from('client_notes').select('*').eq('reciever_id', clientId).eq('type', type).single()

  if(error) {
    return {
      error: 'An error occurred',
      data: null
    }
  }

  return {
    notes: data,
    error
  }
}
