import * as boom from "@hapi/boom";
import { CreateUser, UpdateUser, UserModel } from "../../domain";

export class UsersService {
  async getAll() {
    return await UserModel.findAll();
  }

  async getById(id: string) {
    const user = await UserModel.findByPk(id);
    if (!user) throw boom.notFound("El id del usuario no existe");
    return user;
  }

  async getByEmail(email: string) {
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (user) throw boom.conflict("El email del usuario ya existe");
    return user;
  }

  async create(data: CreateUser) {
    //await this.getByEmail(data.email);
    return await UserModel.create(data);
  }

  async update(id: string, data: UpdateUser) {
    await this.getById(id);
    await UserModel.update(data, {
      where: {
        id,
      },
    });
    return await UserModel.findByPk(id);
  }

  async delete(id: string) {
    const user = await this.getById(id);
    await user.destroy();
    return user;
  }
}
