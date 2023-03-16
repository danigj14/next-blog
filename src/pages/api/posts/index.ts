import { prisma } from "@/core/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const title = req.body.title;
    const description = req.body.description;
    const content = req.body.content;

    if (title && description && content) {
      const newPost = await prisma.post.create({
        data: {
          title,
          description,
          content,
          createDate: new Date(),
        },
      });

      return res.status(201).json(newPost);
    }

    return res.status(500).end();
  }

  return res.end();
}
