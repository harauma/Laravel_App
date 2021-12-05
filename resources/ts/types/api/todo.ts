export type Todo = {
  id: number;
  account_id: number;
  account_name: string;
  todo: string;
  detail: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}