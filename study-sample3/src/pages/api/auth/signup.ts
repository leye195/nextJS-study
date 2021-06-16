import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StoredUserType } from "types/user";
import data from "lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, firstName, lastName, password, birthday } = req.body;

    if (!email || !firstName || !lastName || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    const userExist = data.user.exist({ email });

    if (userExist) {
      res.statusCode = 409;
      res.send("이미 가입된 이메일 입니다");
    }

    const users = data.user.getUserList();
    let userId;

    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users.length + 1;
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const newUser: StoredUserType = {
      id: userId,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      birthday,
      profileImage: "/static/image/user/default_user_profile_image.png",
    };
    const token = jwt.sign(
      String(newUser.id),
      process.env.NEXT_PUBLIC_JWT_SECRET!,
    );

    data.user.write([...users, newUser]);
    res.setHeader(
      "Set-Cookie",
      `access_token=${encodeURI(token)}; path=/; expires=${encodeURI(
        new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toString(),
      )}; httponly`,
    );

    const newUserWithoutPassword: Partial<
      Pick<StoredUserType, "password">
    > = newUser;
    delete newUserWithoutPassword.password;
    res.statusCode = 200;
    return res.send(newUserWithoutPassword);
  }

  res.statusCode = 405;
  return res.end();
};
