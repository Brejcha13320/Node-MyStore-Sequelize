import { Request, Response } from "express";
import { HandleError } from "../../../domain";
import { UsersService } from "../../services";

export class UsersController {
  usersService = new UsersService();

  getAll = (req: Request, res: Response) => {
    this.usersService
      .getAll()
      .then((users) => res.status(201).json(users))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.usersService
      .getById(id)
      .then((user) => res.status(201).json(user))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response) => {
    this.usersService
      .create(req.body)
      .then((user) => res.status(201).json(user))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    this.usersService
      .update(id, req.body)
      .then((user) => res.status(201).json(user))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.usersService
      .delete(id)
      .then((user) => res.status(201).json(user))
      .catch((error) => HandleError.error(error, res));
  };
}
