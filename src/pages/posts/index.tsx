import { Input } from "@/core/components";
import { prisma } from "@/core/db";
import Layout from "@/features/blog/components/Layout";
import PostListItem from "@/features/posts/components/PostListItem";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
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
      <Head>
        <title>Post List | NextBlog</title>
      </Head>
      <div className="py-4 font-bold border-b border-gray-300 flex flex-col md:flex-row gap-4 items-start justify-between md:items-center">
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
        <p className="py-4">
          {search
            ? "Couldn't find any post with your search criteria"
            : "There are no posts available!"}
        </p>
      )}
    </Layout>
  );
}
