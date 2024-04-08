import { Router } from "express";
import {
  ValidatorSchema,
  createCategorySchema,
  updateCategorySchema,
} from "../../../domain";
import { CategoriesController } from "./categories.controller";
import { AuthMiddleware, ValidRoleMiddleware } from "../../middlewares";

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new CategoriesController();

    //Middlewares Para Todas las Rutas
    router.use([AuthMiddleware.validateToken]);

    // Definir las rutas
    router.get(
      "/",
      [ValidRoleMiddleware.validateRole(["admin", "seller", "customer"])],
      controller.getAll,
    );

    router.get(
      "/:id",
      [ValidRoleMiddleware.validateRole(["admin", "seller", "customer"])],
      controller.getById,
    );

    router.post(
      "/",
      [
        ValidRoleMiddleware.validateRole(["admin"]),
        ValidatorSchema.valid(createCategorySchema, "body"),
      ],
      controller.create,
    );

    router.patch(
      "/:id",
      [
        ValidRoleMiddleware.validateRole(["admin", "seller"]),
        ValidatorSchema.valid(updateCategorySchema, "body"),
      ],
      controller.update,
    );

    router.delete(
      "/:id",
      [ValidRoleMiddleware.validateRole(["admin", "seller"])],
      controller.delete,
    );

    return router;
  }
}
