import { Button } from "@/core/components";
import { prisma } from "@/core/db";
import AdminLayout from "@/features/admin/components/AdminLayout";
import {
  faFileCirclePlus,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { GetServerSideProps } from "next";

interface AdminPostsProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<
  AdminPostsProps
> = async () => {
  const posts = await prisma.post.findMany({ orderBy: { createDate: "desc" } });

  return {
    props: { posts },
  };
};

export default function AdminPosts({ posts }: AdminPostsProps) {
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
            <PostsTableItem key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

function PostsTableItem({ post }: { post: Post }) {
  return (
    <tr className="even:bg-gray-100">
      <td className="py-4 pl-4">{post.title}</td>
      <td className="text-center">
        {format(post.createDate, "dd / MM / yyyy")}
      </td>
      <td className="pr-4 text-right text-xs">
        <Button className="mr-2">
          <FontAwesomeIcon icon={faPencil} className="pr-2" />
          Edit
        </Button>
        <Button color="red">
          <FontAwesomeIcon icon={faTrash} className="pr-2" />
          Delete
        </Button>
      </td>
    </tr>
  );
}
