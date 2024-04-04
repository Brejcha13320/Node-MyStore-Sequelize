export interface Category {
  id: string;
  name: string;
  image: string;
}

export type CreateCategory = Omit<Category, "id">;

export type UpdateCategory = Partial<Category>;
