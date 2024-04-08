import { Router } from "express";
import {
  ValidatorSchema,
  createUserSchema,
  updateUserSchema,
} from "../../../domain";
import { UsersController } from "./users.controller";

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new UsersController();

    // Definir las rutas
    router.get("/", controller.getAll);

    router.get("/:id", controller.getById);

    router.post(
      "/",
      [ValidatorSchema.valid(createUserSchema, "body")],
      controller.create,
    );

    router.patch(
      "/:id",
      [ValidatorSchema.valid(updateUserSchema, "body")],
      controller.update,
    );

    router.delete("/:id", controller.delete);

    return router;
  }
}
