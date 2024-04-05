import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export class ValidatorSchema {
  static valid(schema: Schema, property: "body" | "params" | "query") {
    return (req: Request, res: Response, next: NextFunction) => {
      const data = req[property];
      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        return res.status(400).json({ error: "Schema Error", message: error });
      }
      next();
    };
  }
}
