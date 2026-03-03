import express from "express";
import type { Express, Request, Response } from "express";
import { prisma } from "./lib/prisma";
import cors from "cors";

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/allTodo", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
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
app.put("/editTodo/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, isCompleted } = req.body as {
    title: string;
    isCompleted?: boolean;
  };
  const editTodos = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      isCompleted: Boolean(isCompleted),
    },
  });
  return res.json(editTodos);
});
app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleteTodos = await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  return res.json(deleteTodos);
});

app.listen(PORT, () => console.log("server is running"));
