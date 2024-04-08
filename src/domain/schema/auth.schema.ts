import Joi from "joi";
import { LoginUser } from "../interfaces/auth.interface";

const email = Joi.string().email();
const password = Joi.string().min(8);

export const loginUserSchema = Joi.object<LoginUser>({
  email: email.required(),
  password: password.required(),
}).unknown(false);
