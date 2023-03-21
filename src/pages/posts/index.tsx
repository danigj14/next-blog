import { Input } from "@/core/components";
import { prisma } from "@/core/db";
import Layout from "@/features/blog/components/Layout";
import {
  faArrowRightLong,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";

interface PostsProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<PostsProps> = async () => {
  const posts = await prisma.post.findMany({ orderBy: { createDate: "desc" } });

  return {
    props: { posts },
  };
};

export default function Home({ posts }: PostsProps) {
  const [search, setSearch] = useState("");

  const filteredPosts = search
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.description.toLowerCase().includes(search)
      )
    : posts;

  return (
    <Layout>
      <div className="py-4 px-2 font-bold border-b border-gray-300 flex justify-between items-center">
        <h1 className="text-3xl">All Blog Posts</h1>
        <div className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <FontAwesomeIcon
              className="text-gray-400"
              icon={faMagnifyingGlass}
            />
          </span>
          <Input
            className="pl-10"
            placeholder="Search Posts"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      {filteredPosts.length ? (
        filteredPosts.map((post) => <PostListItem key={post.id} post={post} />)
      ) : (
        <p className="px-2 py-4">
          {search
            ? "Couldn't find any post with your search criteria"
            : "There are no posts available!"}
        </p>
      )}
    </Layout>
  );
}

function PostListItem({ post }: { post: Post }) {
  return (
    <div className="px-2 py-4 border-b border-gray-300">
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
