import * as boom from "@hapi/boom";
import { CreateOrder, UpdateOrder, OrderModel } from "../../domain";

export class OrdersService {
  async getAll() {
    return await OrderModel.findAll({
      include: [
        {
          association: "customer",
          include: ["user"],
        },
        "items",
      ],
    });
  }

  async getById(id: string) {
    const order = await OrderModel.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"],
        },
        "items",
      ],
    });
    if (!order) throw boom.notFound("El id de la orden no existe");
    return order;
  }

  async create(data: CreateOrder) {
    return await OrderModel.create(data);
  }

  async update(id: string, data: UpdateOrder) {
    await this.getById(id);
    await OrderModel.update(data, {
      where: {
        id,
      },
    });
    return await OrderModel.findByPk(id);
  }

  async delete(id: string) {
    const order = await this.getById(id);
    await order.destroy();
    return order;
  }
}
