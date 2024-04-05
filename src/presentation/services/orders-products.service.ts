import * as boom from "@hapi/boom";
import { CreateOrder, UpdateOrder, OrderProductModel } from "../../domain";

export class OrdersProductsService {
  async getAll() {
    return await OrderProductModel.findAll();
  }

  async getById(id: string) {
    const order = await OrderProductModel.findByPk(id);
    if (!order) throw boom.notFound("El id de la order-producto no existe");
    return order;
  }

  async create(data: CreateOrder) {
    return await OrderProductModel.create(data);
  }

  async update(id: string, data: UpdateOrder) {
    await this.getById(id);
    await OrderProductModel.update(data, {
      where: {
        id,
      },
    });
    return await OrderProductModel.findByPk(id);
  }

  async delete(id: string) {
    const order = await this.getById(id);
    await order.destroy();
    return order;
  }
}
