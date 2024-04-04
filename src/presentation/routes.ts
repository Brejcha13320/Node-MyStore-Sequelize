import { Router } from "express";
import { UsersRoutes } from "./modules/users/users.routes";
import { CustomersRoutes } from "./modules/customers/customers.routes";
import { CategoriesRoutes } from "./modules/categories/categories.routes";
import { ProductsRoutes } from "./modules/products/products.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //Definir Rutas
    router.use("/api/users", UsersRoutes.routes);
    router.use("/api/customers", CustomersRoutes.routes);
    router.use("/api/categories", CategoriesRoutes.routes);
    router.use("/api/products", ProductsRoutes.routes);

    return router;
  }
}
