import { Request, Response } from "express";
import { HandleError } from "../../../domain";
import { CustomersService } from "../../services";

export class CustomersController {
  customersService = new CustomersService();

  getAll = (req: Request, res: Response) => {
    this.customersService
      .getAll()
      .then((customers) => res.status(201).json(customers))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.customersService
      .getById(id)
      .then((customer) => res.status(201).json(customer))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response) => {
    this.customersService
      .create(req.body)
      .then((customer) => res.status(201).json(customer))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    this.customersService
      .update(id, req.body)
      .then((customer) => res.status(201).json(customer))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.customersService
      .delete(id)
      .then((customer) => res.status(201).json(customer))
      .catch((error) => HandleError.error(error, res));
  };
}
