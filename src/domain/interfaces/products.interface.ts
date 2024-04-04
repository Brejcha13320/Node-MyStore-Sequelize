export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: string;
}

export type CreateProduct = Omit<Product, "id">;

export type UpdateProduct = Partial<Product>;
