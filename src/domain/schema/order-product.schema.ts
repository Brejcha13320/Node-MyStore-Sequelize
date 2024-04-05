import Joi from "joi";
import {
  CreateOrderProduct,
  UpdateOrderProduct,
} from "../interfaces/orders-products.interface";

const orderId = Joi.string();
const productId = Joi.string();
const amount = Joi.number().integer().min(1);

export const createOrderProductSchema = Joi.object<CreateOrderProduct>({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
}).unknown(false);

export const updateOrderProductSchema = Joi.object<UpdateOrderProduct>({
  orderId,
  productId,
  amount,
}).unknown(false);
