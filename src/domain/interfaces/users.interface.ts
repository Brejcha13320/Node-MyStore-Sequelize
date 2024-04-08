export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
}

export type Role = "customer" | "seller" | "admin";

export type CreateUser = Omit<User, "id">;

export type UpdateUser = Partial<User>;
