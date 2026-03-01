import express from "express";
import type { Express, Request, Response } from "express";
import { prisma } from "./lib/prisma";

const app: Express = express();
const PORT = 8080;

const allTodos = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
};
app.get("/allTodo", async (req: Request, res: Response) => {
  const todos = await allTodos();
  return res.json(todos);
});

app.listen(PORT, () => console.log("server is running"));
