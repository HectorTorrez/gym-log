'use server'
import supabase from "@/db/api/server"

export async function GetFriendsRequest(user_id: string){
  const {data: friend, error} = await supabase
    .from("friends")
    .select(
      `
      reciever_id, 
      sender_id,
      users!friends_reciever_id_fkey (
        username, 
        name, 
        email
      )
    `,
    )
    .eq("reciever_id", user_id )
    .eq("status", "pending");



  if (friend === null) {
    return {
      friend: [],
      error: "No clients found",
    };
  }

  return {
    friend,
    error,
  };
}

export async function AcceptFriendRequest(reciever_id: string, sender_id: string){

 const{error} =  await supabase
    .from("friends")
    .update({status: "accepted"})
    .eq("reciever_id", reciever_id)
    .eq("sender_id", sender_id)

  if(error === null) {
    return {
      error: "Request accepted"
    }
  }

  return {
    error
  }
}

export async function RejectFriendRequest(reciever_id: string, sender_id: string){

  const{error} =  await supabase
     .from("friends")
     .update({status: "rejected"})
     .eq("reciever_id", reciever_id)
     .eq("sender_id", sender_id)
 
   if(error === null) {
     return {
       error: "Request rejected"
     }
   }
 
   return {
     error
   }
 }
