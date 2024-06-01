
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Bell, Check, X } from "lucide-react"
import { AcceptFriendRequest, GetFriendsRequest, RejectFriendRequest } from "@/queries/friends-notifications"
import {  useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Friends } from "@/types/clients"
import { toast } from "./ui/use-toast"



export  function FriendsNotifications() {
  const [newFriends, SetNewFriends] = useState<Friends[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const {user} = useUser()
  const userId = user?.id ?? ''

  const handleGetFriendsRequest = async () => {
    const {friend} = await GetFriendsRequest(userId)
    SetNewFriends(friend)
  }

  const handleAcceptFriendRequest = async ( receiver_id: string, sender_id: string) => {
    setIsLoading(true)
    const{error} = await AcceptFriendRequest( receiver_id, sender_id)
    if(error === 'Request accepted'){
      toast({
        title: "Friend request accepted",
      })
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  const handleDeclineFriendRequest = async ( receiver_id: string, sender_id: string) => {
    setIsLoading(true)
    const {error} = await RejectFriendRequest( receiver_id, sender_id,)
    if(error === 'Request rejected'){
      toast({
        title: "Friend request rejected",
      })
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    handleGetFriendsRequest()
  },[open, isLoading])


 return ( <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="ghost">
    <Bell className="h-5 w-5" />
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Friend request</DialogTitle>
    </DialogHeader>
      {
        newFriends.map((request) => {
          const sender_id = request?.sender_id ?? ''
          const reciever_id = request?.reciever_id ?? ''
          return(
          <div key={request?.reciever_id} className="flex items-center gap-2 justify-between">
            <img src={user?.imageUrl} alt={request?.users?.name} className="h-8 w-8 rounded-full" />
            <DialogDescription>{request?.users?.name}</DialogDescription>
            <div className="flex gap-2">
              <Button onClick={()=>handleAcceptFriendRequest(reciever_id, sender_id)} variant="accept" size="icon">
              <Check className="h-5 w-5" />
   
              </Button>
              <Button onClick={()=>handleDeclineFriendRequest(reciever_id, sender_id)} variant="destructive" size="icon">
              <X className="h-5 w-5" />
              </Button>
              </div>
          </div>
        )})
      }
      {
        newFriends.length === 0 && <DialogDescription>No new friend request</DialogDescription>
      }
  </DialogContent>
</Dialog>
 )
}
