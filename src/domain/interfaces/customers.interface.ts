export interface Customer {
  id: string;
  userId: string;
  name: string;
  lastName: string;
  phone: string;
}

export type CreateCustomer = Omit<Customer, "id">;

export type UpdateCustomer = Partial<Customer>;
