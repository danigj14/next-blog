import { prisma } from "@/core/db";
import Layout from "@/features/blog/components/Layout";
import TagList from "@/features/posts/components/TagList";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import DOMPurify from "isomorphic-dompurify";
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
      <h1 className="mt-12 text-3xl font-bold">{post.title}</h1>
      {post.tags.length > 0 && <div className="py-2"><TagList tags={post.tags} /></div>}
      <p className="text-md italic mt-1 pb-4">
        Published {format(post.createDate, "dd MMMM yyyy")}
      </p>
      <div
        className="pt-4 border-t border-gray-300 prose min-w-full"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked.parse(post.content)),
        }}
      ></div>
    </Layout>
  );
}
