import { prisma } from "@/core/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
  }

  return res.status(501).end();
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const posts = await prisma.post.findMany({ orderBy: { createDate: "desc" } });

  return res.status(200).json(posts);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) return res.status(401).end();

  const { title, description, content, tags } = req.body;

  if (title && description && content && tags) {
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        content,
        createDate: new Date(),
        tags
      },
    });

    return res.status(201).json(newPost);
  }

  return res.status(400).end();
}
