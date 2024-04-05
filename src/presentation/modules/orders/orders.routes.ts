import { Router } from "express";
import {
  ValidatorSchema,
  createOrderSchema,
  updateOrderSchema,
} from "../../../domain";
import { OrdersController } from "./orders.controller";

export class OrdersRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new OrdersController();

    // Definir las rutas
    router.get("/", controller.getAll);

    router.get("/:id", controller.getById);

    router.post(
      "/",
      [ValidatorSchema.valid(createOrderSchema, "body")],
      controller.create,
    );

    router.patch(
      "/:id",
      [ValidatorSchema.valid(updateOrderSchema, "body")],
      controller.update,
    );

    router.delete("/:id", controller.delete);

    return router;
  }
}
