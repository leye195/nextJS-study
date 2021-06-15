import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, firstName, lastName, password, birthday } = req.body;

    if (!email || !firstName || !lastName || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    return res.end();
  }

  res.statusCode = 405;
  return res.end();
};
