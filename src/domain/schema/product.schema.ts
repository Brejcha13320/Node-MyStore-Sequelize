import Joi from "joi";
import { CreateProduct, UpdateProduct } from "../interfaces/products.interface";

const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.string();

export const createProductSchema = Joi.object<CreateProduct>({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

export const updateProductSchema = Joi.object<UpdateProduct>({
  name,
  price,
  image,
  description,
  categoryId,
});
