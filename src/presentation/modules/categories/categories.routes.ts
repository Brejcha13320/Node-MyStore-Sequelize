import { Router } from "express";
import {
  ValidatorSchema,
  createCategorySchema,
  updateCategorySchema,
} from "../../../domain";
import { CategoriesController } from "./categories.controller";

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new CategoriesController();

    // Definir las rutas
    router.get("/", controller.getAll);

    router.get("/:id", controller.getById);

    router.post(
      "/",
      [ValidatorSchema.valid(createCategorySchema, "body")],
      controller.create,
    );

    router.patch(
      "/:id",
      [ValidatorSchema.valid(updateCategorySchema, "body")],
      controller.update,
    );

    router.delete("/:id", controller.delete);

    return router;
  }
}
