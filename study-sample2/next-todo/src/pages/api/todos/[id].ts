import data from "lib/data";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      const id = Number(req.query.id);
      const todo = data.todo.exist({ id });

      if (!todo) {
        res.statusCode = 404;
        res.end();
      }

      const todos = await data.todo.getList();
      const changedTodos = todos.map((todo) => {
        return todo.id === id ? { ...todo, checked: !todo.checked } : todo;
      });

      data.todo.write(changedTodos);
      res.statusCode = 200;
      return res.end();
    } catch (e) {
      res.statusCode = 500;
      res.send(e);
    }
  }

  if (req.method === "DELETE") {
    try {
      const todoId = Number(req.query.id);
      const todo = data.todo.exist({ id: todoId });
      if (!todo) {
        res.statusCode = 400;
        res.end();
      }

      const todos = data.todo.getList();
      const filteredTodos = todos.filter((todo) => todo.id !== todoId);
      data.todo.write(filteredTodos);
      res.statusCode = 200;
      res.end();
    } catch (e) {
      res.statusCode = 500;
      res.send(e);
    }
  }

  res.statusCode = 405;
  return res.end();
};
