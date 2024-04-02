import { Response } from "express";
import { ValidationError } from "sequelize";

export class HandleError {
  static error(error: unknown | any, res: Response) {
    console.log(`${error}`);

    if (error instanceof ValidationError) {
      return res.status(409).json({
        error: error.name,
        message: error.errors,
        statusCode: 409,
      });
    }

    if ((error as any).isBoom) {
      const { output } = error;
      return res.status(output.statusCode).json(output.payload);
    }

    return res
      .status(500)
      .json({
        error: "Internal Servicer error",
        message: error,
        statusCode: 500,
      });
  }
}
