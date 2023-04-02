import express from "express";
import { todoRoutes } from "./todo";
import { exampleRoutes } from "./example";

export const routes = express.Router();

routes.use(todoRoutes.getAll, todoRoutes.getOne, todoRoutes.create, todoRoutes.delete);
routes.use(exampleRoutes.hello);
