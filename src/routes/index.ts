import express from "express";
import { todoRoutes } from "./todo";

export const routes = express.Router();

routes.use(todoRoutes.getAll, todoRoutes.getOne, todoRoutes.create, todoRoutes.delete);
