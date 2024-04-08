import * as boom from "@hapi/boom";
import { CreateUser, UpdateUser, UserEntity, UserModel } from "../../domain";
import { bcryptAdapter } from "../../config";

export class UsersService {
  async getAll() {
    return await UserModel.findAll({
      include: ["customer"],
    });
  }

  async getById(id: string) {
    const user = await UserModel.findByPk(id, {
      include: ["customer"],
    });
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
    await this.getByEmail(data.email);

    //Encriptar Password
    const passwordEncripted = bcryptAdapter.hash(data.password);

    const createUser: CreateUser = {
      ...data,
      password: passwordEncripted,
    };

    const user = await UserModel.create(createUser);
    const { password, ...userEntity } = UserEntity.fromObject(user);
    return userEntity;
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
