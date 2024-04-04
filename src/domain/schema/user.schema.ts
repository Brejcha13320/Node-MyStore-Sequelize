import Joi from "joi";
import { CreateUser, UpdateUser } from "../interfaces/users.interface";

const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

export const createUserSchema = Joi.object<CreateUser>({
  email: email.required(),
  password: password.required(),
  role: role.required(),
}).unknown(false);

export const updateUserSchema = Joi.object<UpdateUser>({
  email: email.required(),
}).unknown(false);
