import { Router } from "express";
import { UsersRoutes } from "./modules/users/users.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //Definir Rutas
    router.use("/api/users", UsersRoutes.routes);

    return router;
  }
}
