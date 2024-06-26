import { Request, Response } from "express";
import { HandleError } from "../../../domain";
import { ProductsService } from "../../services";

export class ProductsController {
  productsService = new ProductsService();

  getAll = (req: Request, res: Response) => {
    this.productsService
      .getAll(req.query)
      .then((products) => res.status(201).json(products))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.productsService
      .getById(id)
      .then((product) => res.status(201).json(product))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response) => {
    this.productsService
      .create(req.body)
      .then((product) => res.status(201).json(product))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    this.productsService
      .update(id, req.body)
      .then((product) => res.status(201).json(product))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.productsService
      .delete(id)
      .then((product) => res.status(201).json(product))
      .catch((error) => HandleError.error(error, res));
  };
}
