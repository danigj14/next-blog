import { prisma } from "@/core/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      return handlePut(req, res);
    case "DELETE":
      return handleDelete(req, res);
  }

  return res.status(501).end();
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) return res.status(401).end();

  const { id } = req.query;
  const { title, description, content } = req.body;

  if (id && title && description && content) {
    const updatedPost = await prisma.post.update({
      where: { id: String(id) },
      data: {
        title,
        description,
        content,
      },
    });

    return res.status(200).json(updatedPost);
  }

  return res.status(400).end();
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) return res.status(401).end();

  const { id } = req.query;

  if (id) {
    const deletedPost = await prisma.post.delete({
      where: { id: String(id) },
    });

    return res.status(200).json(deletedPost);
  }

  return res.status(400).end();
}
