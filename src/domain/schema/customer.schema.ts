import Joi from "joi";
import {
  CreateCustomer,
  UpdateCustomer,
} from "../interfaces/customers.interface";

const userId = Joi.string();
const name = Joi.string().min(5);
const lastName = Joi.string().min(5);
const phone = Joi.string().min(5);

export const createCustomerSchema = Joi.object<CreateCustomer>({
  userId: userId.required(),
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
}).unknown(false);

export const updateCustomerSchema = Joi.object<UpdateCustomer>({
  userId,
  name,
  lastName,
  phone,
}).unknown(false);
