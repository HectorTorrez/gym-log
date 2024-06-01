export type Friends = {
  reciever_id: string;
  sender_id: string;
  users: {
      username: string;
      name: string;
      email: string;
  } | null;
} | null
