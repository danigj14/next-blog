import { prisma } from "@/core/db";
import Layout from "@/features/blog/components/Layout";
import PostListItem from "@/features/posts/components/PostListItem";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import me from "/public/images/me.jpeg";

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
      <header className="my-12 w-full flex flex-col md:flex-row items-center gap-8 justify-center">
        <Image className="w-32 rounded-full" src={me} alt="logo" />
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl mb-4 font-bold">My Personal Blog</h1>
          <p>
            Welcome to my personal blog. A place where I share all kind of
            thoughts about pretty much anything that interests me!
          </p>
        </div>
      </header>
      <div className="flex flex-col">
        <h1 className="py-4 text-3xl font-bold border-b border-gray-300">
          Latest Posts
        </h1>
        {posts.length ? (
          posts.map((post) => <PostListItem key={post.id} post={post} />)
        ) : (
          <p>There are no posts available!</p>
        )}
        <Link className="px-2 mt-8 text-xl w-fill w-fit hover:text-gray-500" href="/posts">
          Navigate all Blog Posts <FontAwesomeIcon icon={faArrowRightLong} className="pl-1" />
        </Link>
      </div>
    </Layout>
  );
}