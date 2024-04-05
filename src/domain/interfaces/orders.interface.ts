export interface Order {
  id: string;
  customerId: string;
}

export type CreateOrder = Omit<Order, "id">;

export type UpdateOrder = Partial<Order>;
