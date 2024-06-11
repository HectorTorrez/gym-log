"use client";

import { thereIsCoach } from "@/queries/friends-notifications";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import {createContext, useContext, useEffect, useState} from "react";

interface CoachContext {

  coachInfo: CoachInfo | null;
  handleCoachInfo: (value: CoachInfo) => void;


}
const CoachContext = createContext<CoachContext>({
  coachInfo: null,

  handleCoachInfo: () => {},
});

interface User {
  name: string;
  email: string;
  username: string;
}

export interface CoachInfo {
  reciever_id: string;
  sender_id: string;
  users: User;
}

export function CoachProvider({children}: {children: React.ReactNode}) {

  const [coachInfo, setCoachInfo] = useState<CoachInfo | null>(null)

  const handleCoachInfo = (value: CoachInfo) =>{
    setCoachInfo(value)
  }
  const { user } = useUser();
  const id = user?.id ?? '';
  const { data  } = useQuery({
    queryKey: ['getCoach'],
    queryFn: () => thereIsCoach(id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    localStorage.setItem("coachInfo", JSON.stringify(coachInfo));
  }, [coachInfo]);

  useEffect(() => {
    const localCoach = localStorage.getItem("coachInfo");
    if (localCoach) {
      setCoachInfo(JSON.parse(localCoach));
    }
  }, []);

  useEffect(()=>{
    if(data?.coach !== undefined){
      handleCoachInfo(data?.coach as CoachInfo);
    }
  },[data])

  return (
    <CoachContext.Provider value={{ coachInfo, handleCoachInfo}}>{children}</CoachContext.Provider>
  );
}

export const useCoach = () => useContext(CoachContext);
