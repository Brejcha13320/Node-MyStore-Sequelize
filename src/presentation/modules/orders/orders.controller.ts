import { Request, Response } from "express";
import { HandleError } from "../../../domain";
import { OrdersService } from "../../services/orders.service";

export class OrdersController {
  ordersService = new OrdersService();

  getAll = (req: Request, res: Response) => {
    this.ordersService
      .getAll()
      .then((orders) => res.status(201).json(orders))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.ordersService
      .getById(id)
      .then((order) => res.status(201).json(order))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response) => {
    this.ordersService
      .create(req.body)
      .then((order) => res.status(201).json(order))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    this.ordersService
      .update(id, req.body)
      .then((order) => res.status(201).json(order))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.ordersService
      .delete(id)
      .then((order) => res.status(201).json(order))
      .catch((error) => HandleError.error(error, res));
  };
}
