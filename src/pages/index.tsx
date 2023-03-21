import { prisma } from "@/core/db";
import Layout from "@/features/blog/components/Layout";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface HomeProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const posts = await prisma.post.findMany({ orderBy: { createDate: "desc" } });

  return {
    props: { posts },
  };
};

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <h1 className="pb-2 pl-2 text-3xl font-bold border-b border-gray-300">
        Latest Posts
      </h1>
      {posts.length ? (
        posts.map((post) => <PostListItem key={post.id} post={post} />)
      ) : (
        <p>There are no posts available!</p>
      )}
    </Layout>
  );
}

function PostListItem({ post }: { post: Post }) {
  return (
    <div className="px-2 py-2 border-b border-gray-300">
      <div className="flex justify-between gap-10 items-center pr-12">
        <Link className="hover:text-gray-500" href={`/posts/${post.id}`}>
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </Link>
        <p className="text-md italic">
          {format(post.createDate, "dd MMMM yyyy")}
        </p>
      </div>
      <p className="py-4">{post.description}</p>
      <Link className="hover:text-gray-500" href={`/posts/${post.id}`}>
        Read More <FontAwesomeIcon icon={faArrowRightLong} className="pl-1" />
      </Link>
    </div>
  );
}
