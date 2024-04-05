import Joi from "joi";
import { CreateOrder, UpdateOrder } from "../interfaces/orders.interface";

const customerId = Joi.string();

export const createOrderSchema = Joi.object<CreateOrder>({
  customerId: customerId.required(),
}).unknown(false);

export const updateOrderSchema = Joi.object<UpdateOrder>({
  customerId: customerId.required(),
}).unknown(false);
