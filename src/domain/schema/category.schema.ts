import Joi from "joi";
import {
  CreateCategory,
  UpdateCategory,
} from "../interfaces/categories.interface";

const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

export const createCategorySchema = Joi.object<CreateCategory>({
  name: name.required(),
  image: image.required(),
});

export const updateCategorySchema = Joi.object<UpdateCategory>({
  name: name,
  image: image,
});
