import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 8080;

app.get("/allTodo", (req: Request, res: Response) => {
  return res.send("Todos");
});

app.listen(PORT, () => console.log("server is running"));
