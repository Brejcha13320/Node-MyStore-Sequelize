import * as boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt-adapter";
import { Role, User, UserEntity, UserModel } from "../../domain";

export class AuthMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization)
      return res
        .status(401)
        .json({ authorization: false, error: "Not token provided" });

    if (!authorization.startsWith("Bearer "))
      return res
        .status(401)
        .json({ authorization: false, error: "Invalid Bearer token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{
        id: string;
        role: Role;
      }>(token);
      if (!payload)
        return res
          .status(401)
          .json({ authorization: false, error: "Invalid token" });

      const user = (await UserModel.findOne({
        where: {
          id: payload.id,
        },
      })) as unknown as User;

      if (!user)
        return res.status(401).json({
          authorization: false,
          error: "Invalid token - user not found",
        });

      req.body.user = UserEntity.fromObject(user);
      next();
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ authorization: false, error: "Internal Server Error" });
    }
  }
}
