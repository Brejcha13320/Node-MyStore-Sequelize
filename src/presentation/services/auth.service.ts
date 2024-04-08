import * as boom from "@hapi/boom";
import { LoginUser, User, UserEntity, UserModel } from "../../domain";
import { bcryptAdapter } from "../../config";
import { JwtAdapter } from "../../config/jwt-adapter";

export class AuthService {
  async login(data: LoginUser) {
    const user = (await UserModel.findOne({
      where: {
        email: data.email,
      },
    })) as unknown as User;

    if (!user) throw boom.badRequest("Invalid credentials");

    const isMatching = bcryptAdapter.compare(data.password, user.password);

    if (!isMatching) throw boom.badRequest("Invalid credentials");

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = (await JwtAdapter.generateToken(
      { id: user.id, role: user.role },
      "6h",
    )) as string;

    if (!token) throw boom.badRequest("Error while creating JWT");

    return { user: userEntity, token };
  }
}
