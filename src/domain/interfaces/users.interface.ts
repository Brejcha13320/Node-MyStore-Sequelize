export interface User {
  id: string;
  email: string;
  password: string;
}

export type CreateUser = Omit<User, "id">;

export type UpdateUser = Partial<User>;
