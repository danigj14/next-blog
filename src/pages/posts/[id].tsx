import { prisma } from "@/core/db";
import Layout from "@/features/blog/components/Layout";
import { Post } from "@prisma/client";
import { marked } from "marked";
import { GetServerSideProps } from "next";

interface PostProps {
  post: Post;
}

export const getServerSideProps: GetServerSideProps<PostProps> = async (
  context
) => {
  const { id } = context.params!;

  const post = await prisma.post.findUnique({ where: { id: String(id) } });

  if (!post) return { redirect: { destination: "/", permanent: false } };

  return { props: { post } };
};

export default function PostPage({ post }: PostProps) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold px-2">{post.title}</h1>
      <div
        className="px-2 pt-8 prose min-w-full"
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
      ></div>
    </Layout>
  );
}
