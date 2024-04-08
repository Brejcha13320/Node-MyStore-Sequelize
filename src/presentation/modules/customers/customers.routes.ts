import { Router } from "express";
import {
  ValidatorSchema,
  createCustomerSchema,
  updateCustomerSchema,
} from "../../../domain";
import { CustomersController } from "./customers.controller";
import { AuthMiddleware } from "../../middlewares";

export class CustomersRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new CustomersController();

    //Middlewares Para Todas las Rutas
    router.use([AuthMiddleware.validateToken]);

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
