import express from "express";
import type { Express, Request, Response } from "express";
import { prisma } from "./lib/prisma";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
const allTodos = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
};
app.get("/allTodo", async (req: Request, res: Response) => {
  const todos = await allTodos();
  return res.json(todos);
});
app.post("/createTodo", async (req: Request, res: Response) => {
  const { title, isCompleted } = req.body as {
    title: string;
    isCompleted?: boolean;
  };
  const createTodos = await prisma.todo.create({
    data: {
      title: title,
      isCompleted: Boolean(isCompleted),
    },
  });
  return res.json(createTodos);
});

app.listen(PORT, () => console.log("server is running"));
