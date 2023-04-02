import { Router } from "express";
import z from "zod";
import { createRoute } from "../createRoute";

export const exampleRoutes = {
  hello: Router().post(
    "/example/hello",
    createRoute({
      input: z.object({}),
      output: z.object({ message: z.string() }),
      procedure: () => {
        return { message: "Hello World" };
      },
    })
  ),
};
