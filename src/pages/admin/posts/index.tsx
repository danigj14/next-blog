import { Button } from "@/core/components";
import { prisma } from "@/core/db";
import useNotifications from "@/core/hooks/useNotifications";
import AdminLayout from "@/features/admin/components/AdminLayout";
import useDeletePostMutation from "@/features/posts/hooks/useDeletePostMutation";
import {
  faFileCirclePlus,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface AdminPostsProps {
  initialPosts: Post[];
}

export const getServerSideProps: GetServerSideProps<
  AdminPostsProps
> = async () => {
  const posts = await prisma.post.findMany({ orderBy: { createDate: "desc" } });

  return {
    props: { initialPosts: posts },
  };
};

export default function AdminPosts({ initialPosts }: AdminPostsProps) {
  const [posts, setPosts] = useState(initialPosts);
  const deletePostMutation = useDeletePostMutation();
  const notifications = useNotifications();

  const handleDelete = (postId: string) => {
    deletePostMutation.mutate(postId, {
      onSuccess: () => {
        notifications.showNotification({
          message: "Post was successfully deleted.",
        });
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post.id !== postId)
        );
      },
    });
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl pb-4">Manage Blog Posts</h1>
      <p className="pb-4">
        This section allows you to create, edit and remove your blog posts.
      </p>
      <div className="flex pb-4">
        <Button href="/admin/posts/create">
          <FontAwesomeIcon icon={faFileCirclePlus} className="pr-4" />
          Create New Post
        </Button>
      </div>
      <table className="table-fixed border">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="py-4 pl-4">Title</th>
            <th className="w-1/12 text-center">Date</th>
            <th className="w-2/12"></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostsTableItem
              key={post.id}
              post={post}
              onDelete={() => handleDelete(post.id)}
            />
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

function PostsTableItem({
  post,
  onDelete = () => {},
}: {
  post: Post;
  onDelete: () => void;
}) {
  return (
    <tr className="even:bg-gray-100">
      <td className="py-4 pl-4">{post.title}</td>
      <td className="text-center">
        {format(post.createDate, "dd / MM / yyyy")}
      </td>
      <td className="pr-4 text-right text-xs">
        <Button className="mr-2" href={`/admin/posts/${post.id}`}>
          <FontAwesomeIcon icon={faPencil} className="pr-2" />
          Edit
        </Button>
        <Button color="red" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} className="pr-2" />
          Delete
        </Button>
      </td>
    </tr>
  );
}
