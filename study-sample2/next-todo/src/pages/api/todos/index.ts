import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { TodoType } from "types/todo";
import data from "lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const todos = data.todo.getList();
      res.statusCode = 200;
      return res.send(todos);
    } catch (err) {
      res.statusCode = 500;
      res.send(err);
    }
  }

  if (req.method === "POST") {
    const { text, color } = req.body;
    if (!text || !color) {
      res.statusCode = 400;
      return res.send("text 혹은 color가 없습니ㅏ");
    }
    const todos = data.todo.getList();
    let todoId: number;

    if (todos.length > 0) {
      todoId = todos[todos.length - 1].id + 1;
    } else {
      todoId = 1;
    }

    const newTodo = {
      id: todoId,
      text,
      color,
      checked: false,
    };

    data.todo.write([...todos, newTodo]);
    res.statusCode = 200;
    res.end();
  }

  res.statusCode = 405;
  return res.end();
};
