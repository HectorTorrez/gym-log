export interface TypeReusableTemplate {
  created_at: string;
  id: string;
  name: string;
  user_id: string;
  reusable_exercise: {
    created_at: string;
    id: string;
    name: string;
    template_id: string;
  }[];
}
