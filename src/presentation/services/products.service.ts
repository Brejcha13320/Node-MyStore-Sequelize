import * as boom from "@hapi/boom";
import { CreateProduct, UpdateProduct, ProductModel } from "../../domain";

export class ProductsService {
  async getAll() {
    return await ProductModel.findAll({
      include: ["category"],
    });
  }

  async getById(id: string) {
    const product = await ProductModel.findByPk(id, {
      include: ["category"],
    });
    if (!product) throw boom.notFound("El id del usuario no existe");
    return product;
  }

  async create(data: CreateProduct) {
    return await ProductModel.create(data);
  }

  async update(id: string, data: UpdateProduct) {
    await this.getById(id);
    await ProductModel.update(data, {
      where: {
        id,
      },
    });
    return await ProductModel.findByPk(id);
  }

  async delete(id: string) {
    const product = await this.getById(id);
    await product.destroy();
    return product;
  }
}
