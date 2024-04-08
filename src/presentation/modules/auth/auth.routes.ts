import { Router } from "express";
import { ValidatorSchema, loginUserSchema } from "../../../domain";
import { AuthController } from "./auth.controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new AuthController();

    // Definir las rutas
    router.post(
      "/login",
      [ValidatorSchema.valid(loginUserSchema, "body")],
      controller.login,
    );

    return router;
  }
}
