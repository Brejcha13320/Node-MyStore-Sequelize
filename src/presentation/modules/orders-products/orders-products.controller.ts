import { Request, Response } from "express";
import { HandleError } from "../../../domain";
import { OrdersProductsService } from "../../services";

export class OrdersProductsController {
  ordersProductsService = new OrdersProductsService();

  getAll = (req: Request, res: Response) => {
    this.ordersProductsService
      .getAll()
      .then((ordersProducts) => res.status(201).json(ordersProducts))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.ordersProductsService
      .getById(id)
      .then((orderProduct) => res.status(201).json(orderProduct))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response) => {
    this.ordersProductsService
      .create(req.body)
      .then((orderProduct) => res.status(201).json(orderProduct))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    this.ordersProductsService
      .update(id, req.body)
      .then((orderProduct) => res.status(201).json(orderProduct))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.ordersProductsService
      .delete(id)
      .then((orderProduct) => res.status(201).json(orderProduct))
      .catch((error) => HandleError.error(error, res));
  };
}
