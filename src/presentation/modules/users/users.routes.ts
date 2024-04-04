import { Router } from "express";
import {
  ValidatorSchema,
  createCustomerSchema,
  updateCustomerSchema,
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
      [ValidatorSchema.valid(createCustomerSchema, "body")],
      controller.create,
    );

    router.patch(
      "/:id",
      [ValidatorSchema.valid(updateCustomerSchema, "body")],
      controller.update,
    );

    router.delete("/:id", controller.delete);

    return router;
  }
}
