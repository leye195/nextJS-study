import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import data from "lib/data";
import { StoredUserType } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.cookie;

      if (!accessToken) {
        res.statusCode = 400;
        return res.send("access token이 존재하지 않습니다");
      }

      const userId = jwt.verify(
        accessToken,
        process.env.NEXT_PUBLIC_JWT_SECRET!,
      );

      const user = data.user.find({ id: +userId });

      if (!user) {
        res.statusCode = 404;
        return res.send("해당 유저가 존재하지 않습니다");
      }

      const userWithoutPassword: Omit<StoredUserType, "password"> = user;

      res.statusCode = 200;
      return res.send(userWithoutPassword);
    } catch (err) {
      res.statusCode = 500;
      return res.end();
    }
  }

  res.statusCode = 405;
  return res.end();
};
