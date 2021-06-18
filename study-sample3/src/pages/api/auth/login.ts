import { NextApiRequest, NextApiResponse } from "next";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import data from "lib/data";
import { StoredUserType } from "types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.statusCode = 400;
        return res.send("필수 데이터가 없습니다.");
      }

      const user = data.user.find({ email });

      if (!user) {
        res.statusCode = 404;
        return res.send("해당 이메일의 유저가 없습니다.");
      }

      const passwordMatched = bycrypt.compareSync(password, user.password);

      if (!passwordMatched) {
        res.statusCode = 403;
        return res.send("비밀번호가 일치하지 않습니다.");
      }

      const token = jwt.sign(
        String(user.id),
        process.env.NEXT_PUBLIC_JWT_SECRET!,
      );

      res.setHeader(
        "Set-Cookie",
        `access_token=${encodeURI(token)}; path=/; expires=${encodeURI(
          new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toString(),
        )}; httponly`,
      );

      const userWithoutPassword: Omit<StoredUserType, "password"> = user;

      res.statusCode = 200;
      res.send(userWithoutPassword);
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      return res.send(err);
    }
  }

  res.statusCode = 405;
  return res.end();
};
