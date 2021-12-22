export type Account = {
  id?: number;
  login_id: string;
  password: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}