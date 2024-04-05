export interface OrderProduct {
  id: string;
  productId: string;
  orderId: string;
  amount: number;
}

export type CreateOrderProduct = Omit<OrderProduct, "id">;

export type UpdateOrderProduct = Partial<OrderProduct>;
