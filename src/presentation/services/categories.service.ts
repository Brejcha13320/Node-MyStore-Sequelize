import * as boom from "@hapi/boom";
import { CreateCategory, UpdateCategory, CategoryModel } from "../../domain";

export class CategoriesService {
  async getAll() {
    return await CategoryModel.findAll({
      include: ["products"],
    });
  }

  async getById(id: string) {
    const category = await CategoryModel.findByPk(id, {
      include: ["products"],
    });
    if (!category) throw boom.notFound("El id de la categoria no existe");
    return category;
  }

  async create(data: CreateCategory) {
    return await CategoryModel.create(data);
  }

  async update(id: string, data: UpdateCategory) {
    await this.getById(id);
    await CategoryModel.update(data, {
      where: {
        id,
      },
    });
    return await CategoryModel.findByPk(id);
  }

  async delete(id: string) {
    const category = await this.getById(id);
    await category.destroy();
    return category;
  }
}
