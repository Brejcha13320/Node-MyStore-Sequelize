import * as boom from "@hapi/boom";
import { CreateCustomer, UpdateCustomer, CustomerModel } from "../../domain";

export class CustomersService {
  async getAll() {
    return await CustomerModel.findAll({
      include: ["user", "orders"],
    });
  }

  async getById(id: string) {
    const customer = await CustomerModel.findByPk(id, {
      include: ["user", "orders"],
    });
    if (!customer) throw boom.notFound("El id de customer no existe");
    return customer;
  }

  async create(data: CreateCustomer) {
    return await CustomerModel.create(data);
  }

  async update(id: string, data: UpdateCustomer) {
    await this.getById(id);
    await CustomerModel.update(data, {
      where: {
        id,
      },
    });
    return await CustomerModel.findByPk(id);
  }

  async delete(id: string) {
    const customer = await this.getById(id);
    await customer.destroy();
    return customer;
  }
}
