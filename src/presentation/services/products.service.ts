import * as boom from "@hapi/boom";
import { CreateProduct, UpdateProduct, ProductModel } from "../../domain";
import { Op } from "sequelize";

export class ProductsService {
  async getAll(query: any) {
    const options: any = {
      include: ["category"],
      where: {},
    };

    const { limit, offset } = query;
    if (limit ?? offset) {
      options.limit = Number(limit);
      options.offset = Number(offset);
    }

    return await ProductModel.findAll(options);
  }

  async getById(id: string) {
    const product = await ProductModel.findByPk(id, {
      include: ["category"],
    });
    if (!product) throw boom.notFound("El id del producto no existe");
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
