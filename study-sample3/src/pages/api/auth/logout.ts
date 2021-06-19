import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      res.setHeader("Set-Cookie", "access_token=; path=/; expires=; httponly");
      res.statusCode = 204;
      return res.end();
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      return res.send(err.message);
    }
  }

  res.statusCode = 405;
  return res.end();
};
