import { Router } from "express";
import {
  ValidatorSchema,
  createOrderProductSchema,
  updateOrderProductSchema,
} from "../../../domain";
import { OrdersProductsController } from "./orders-products.controller";

export class OrdersProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new OrdersProductsController();

    // Definir las rutas
    router.get("/", controller.getAll);

    router.get("/:id", controller.getById);

    router.post(
      "/",
      [ValidatorSchema.valid(createOrderProductSchema, "body")],
      controller.create,
    );

    router.patch(
      "/:id",
      [ValidatorSchema.valid(updateOrderProductSchema, "body")],
      controller.update,
    );

    router.delete("/:id", controller.delete);

    return router;
  }
}
