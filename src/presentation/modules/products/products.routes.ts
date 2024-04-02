import { Router } from "express";
import { ProductsController } from "./products.controller";
import { ValidatorSchema, createUserSchema } from "../../../domain";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new ProductsController();

    // Definir las rutas
    router.get("/", controller.getAll);
    router.post(
      "/",
      [ValidatorSchema.valid(createUserSchema, "body")],
      controller.getAll,
    );

    return router;
  }
}
