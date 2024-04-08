import { Request, Response } from "express";
import { HandleError } from "../../../domain";
import { AuthService } from "../../services";

export class AuthController {
  authService = new AuthService();

  login = (req: Request, res: Response) => {
    this.authService
      .login(req.body)
      .then((user) => res.status(201).json(user))
      .catch((error) => HandleError.error(error, res));
  };
}
