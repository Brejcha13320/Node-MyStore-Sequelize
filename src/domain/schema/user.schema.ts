import Joi from "joi";
import { CreateUser } from "../interfaces/users.interface";

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

export const createUserSchema = Joi.object<CreateUser>({
  email: email.required(),
  password: password.required(),
  role: role.required(),
}).unknown(false);

export const updateUserSchema = Joi.object({ email: email }).unknown(false);

export const getUserSchema = Joi.object({ id: id.required() }).unknown(false);
