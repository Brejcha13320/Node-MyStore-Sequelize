import { Role } from "../interfaces/users.interface";
import * as boom from "@hapi/boom";

export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: Role,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const roles: Role[] = ["customer", "admin", "seller"];
    const { id, email, password, role, createdAt, updatedAt } = object;

    if (!id) throw boom.badRequest("Missing id");
    if (!id) throw boom.badRequest("Missing id");
    if (!email) throw boom.badRequest("Missing email");
    if (!password) throw boom.badRequest("Missing password");
    if (!role) throw boom.badRequest("Missing rol");
    if (!roles.includes(role)) throw boom.badRequest("Rol is not valid");
    if (!createdAt) throw boom.badRequest("Missing createdAt");
    if (!updatedAt) throw boom.badRequest("Missing updatedAt");

    return new UserEntity(id, email, password, role, createdAt, updatedAt);
  }
}
