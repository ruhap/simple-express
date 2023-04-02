import z from "zod";
import { NextFunction, Request, Response, Router } from "express";

type RouteOptions<InputType, OutputType> = {
  input: z.Schema<InputType>;
  output: z.Schema<OutputType>;
  procedure: (input: InputType) => OutputType | Promise<OutputType>;
};

export const createRoute = <InputType, OutputType>(
  method: "get" | "post" | "put" | "delete",
  path: string,
  { input, output, procedure }: RouteOptions<InputType, OutputType>
) => {
  const router = Router();

  router[method](path, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inputSchema = input.safeParse(req.body);
      if (!inputSchema.success) {
        throw new Error(inputSchema.error.message);
      }

      const result = await procedure(inputSchema.data);

      const outputSchema = output.safeParse(result);
      if (!outputSchema.success) {
        throw new Error(outputSchema.error.message);
      }

      res.json(outputSchema.data);
    } catch (error) {
      if (error instanceof Error) {
        next(error.message);
      }
    }
  });

  return router;
};
