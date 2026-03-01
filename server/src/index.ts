import express from "express";
import type { Express, Request, Response } from "express";
import { prisma } from "./lib/prisma";

const app: Express = express();
const PORT = 8080;

app.use(express.json());

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

app.listen(PORT, () => console.log("server is running"));
