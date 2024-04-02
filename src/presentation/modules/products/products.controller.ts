import { Request, Response } from "express";
import { HandleError } from "../../../domain";
import { ProductService } from "../../services";

export class ProductsController {
  productService = new ProductService();

  getAll = (req: Request, res: Response) => {
    this.productService
      .getAll()
      .then((prdocuts) => res.status(201).json(prdocuts))
      .catch((error) => HandleError.error(error, res));
  };
}
