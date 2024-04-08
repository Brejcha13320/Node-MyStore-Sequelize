import { Router } from "express";
import {
  ValidatorSchema,
  createProductSchema,
  queryProductSchema,
  updateProductSchema,
} from "../../../domain";
import { ProductsController } from "./products.controller";
import { AuthMiddleware } from "../../middlewares";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new ProductsController();

    //Middlewares Para Todas las Rutas
    router.use([AuthMiddleware.validateToken]);

    // Definir las rutas
    router.get(
      "/",
      [ValidatorSchema.valid(queryProductSchema, "query")],
      controller.getAll,
    );

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
