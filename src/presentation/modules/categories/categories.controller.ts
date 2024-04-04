import { Request, Response } from "express";
import { HandleError } from "../../../domain";
import { CategoriesService } from "../../services/categories.service";

export class CategoriesController {
  categoriesService = new CategoriesService();

  getAll = (req: Request, res: Response) => {
    this.categoriesService
      .getAll()
      .then((categories) => res.status(201).json(categories))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.categoriesService
      .getById(id)
      .then((category) => res.status(201).json(category))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response) => {
    this.categoriesService
      .create(req.body)
      .then((category) => res.status(201).json(category))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    this.categoriesService
      .update(id, req.body)
      .then((category) => res.status(201).json(category))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.categoriesService
      .delete(id)
      .then((category) => res.status(201).json(category))
      .catch((error) => HandleError.error(error, res));
  };
}
