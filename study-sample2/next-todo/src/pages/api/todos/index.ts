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

  res.statusCode = 405;
  return res.end();
};
