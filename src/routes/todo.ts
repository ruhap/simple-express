import { Router } from "express";
import z from "zod";
import { createRoute } from "../createRoute";
import { prisma } from "../lib/prisma";

export const todoSchema = z.object({ id: z.string(), text: z.string(), value: z.boolean() });
export type Todo = z.infer<typeof todoSchema>;

export const todoRoutes = {
  getAll: createRoute("get", "/todos/getAll", {
    output: z.array(z.object({ id: z.string(), text: z.string(), value: z.boolean() })),
    procedure: async () => {
      const todos = await prisma.todo.findMany({});
      return todos;
    },
  }),

  getOne: createRoute("post", "/todos/getOne", {
    input: z.object({ id: z.string() }),
    output: z.object({ id: z.string(), text: z.string(), value: z.boolean() }),
    procedure: async (input) => {
      const todo = await prisma.todo.findFirst({
        where: {
          id: input.id,
        },
      });
      return todo;
    },
  }),

  create: createRoute("post", "/todos/create", {
    input: z.object({ text: z.string(), value: z.boolean() }),
    output: z.object({ id: z.string(), text: z.string(), value: z.boolean() }),
    procedure: async (input) => {
      const todo = await prisma.todo.create({
        data: {
          ...input,
        },
      });

      return todo;
    },
  }),

  update: createRoute("put", "/todos/update", {
    input: z.object({ id: z.string(), text: z.string(), value: z.boolean() }),
    output: z.object({ id: z.string(), text: z.string(), value: z.boolean() }),
    procedure: async (input) => {
      const todo = await prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });

      return todo;
    },
  }),

  delete: createRoute("delete", "/todos/delete", {
    input: z.object({ id: z.string() }),
    output: z.object({ id: z.string(), text: z.string(), value: z.boolean() }),
    procedure: async (input) => {
      const todo = await prisma.todo.delete({
        where: {
          id: input.id,
        },
      });

      return todo;
    },
  }),
};
