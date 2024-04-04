import { Router } from "express";
import {
  ValidatorSchema,
  createProductSchema,
  updateProductSchema,
} from "../../../domain";
import { ProductsController } from "./products.controller";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new ProductsController();

    // Definir las rutas
    router.get("/", controller.getAll);

    router.get("/:id", controller.getById);

    router.post(
      "/",
      [ValidatorSchema.valid(createProductSchema, "body")],
      controller.create,
    );

    router.patch(
      "/:id",
      [ValidatorSchema.valid(updateProductSchema, "body")],
      controller.update,
    );

    router.delete("/:id", controller.delete);

    return router;
  }
}
