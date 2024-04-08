import { NextFunction, Request, Response } from "express";
import { Role } from "../../domain";

export class ValidRoleMiddleware {
  static validateRole(roles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { role } = req.body.user;

      if (!roles.includes(role)) {
        /**
         * TODO: Validacion de Roles
         * Si el Rol del Usuario que hace la petición, no esta
         * en los roles permitidos genera un error
         */
        return res.status(403).json({
          success: false,
          error: `El usuario no tiene permisos para solicitar la informacion. Role: ${role}, ValidRoles: ${roles}`,
        });
      }

      next();
    };
  }
}
