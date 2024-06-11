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

export async function GetCoachRequest(reciever_id: string, sender_id: string){
  const {data: coach, error} = await supabase
    .from("friends")
    .select(
      `
      reciever_id, 
      sender_id,
      users!friends_sender_id_fkey (
        username, 
        name, 
        email
      )
    `,
    )
    .eq("reciever_id", reciever_id )
    .eq("sender_id", sender_id)
    .eq("status", "accepted");
  }

export async function AcceptFriendRequest(reciever_id: string, sender_id: string){

 const{data} =  await supabase
    .from("friends")
    .update({status: "accepted"})
    .eq("reciever_id", reciever_id)
    .eq("sender_id", sender_id)

  if(data === null) {
    return {
      data: "Request accepted"
    }
  }

  return {
    data
  }
}

export async function RejectFriendRequest(reciever_id: string, sender_id: string){

  const{data} =  await supabase
     .from("friends")
     .update({status: "rejected"})
     .eq("reciever_id", reciever_id)
     .eq("sender_id", sender_id)
 
   if(data === null) {
     return {
       data: "Request rejected"
     }
   }
 
   return {
     data
   }
 }


 export async function thereIsCoach(reciever_id: string){

  const {data: coach, error} = await supabase
    .from("friends")
    .select(
      `
      reciever_id, 
      sender_id,
      users!friends_sender_id_fkey (
        username, 
        name, 
        email,
        image
      )
    `,
    )
    .eq("reciever_id", reciever_id )
    .eq("status", "accepted").single();


    return {
      coach
    }
  }
