import { prisma } from "@/core/db";
import useNotifications from "@/core/hooks/useNotifications";
import AdminLayout from "@/features/admin/components/AdminLayout";
import PostForm from "@/features/admin/components/PostForm";
import useUpdatePostMutation from "@/features/posts/hooks/useUpdatePostMutation";
import { Post } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<
  AdminEditPostProps
> = async ({ params }) => {
  const id = params?.id;

  if (!id) {
    return {
      redirect: { destination: "/admin/posts", permanent: false },
    };
  }

  const post = await prisma.post.findUnique({ where: { id: String(id) } });

  if (!post) {
    return {
      redirect: { destination: "/admin/posts", permanent: false },
    };
  }

  return {
    props: { post },
  };
};

interface AdminEditPostProps {
  post: Post;
}

export default function AdminEditPost({ post }: AdminEditPostProps) {
  const updatePostMutation = useUpdatePostMutation();
  const { push } = useRouter();
  const notifications = useNotifications();

  const showSuccessNotification = () => {
    notifications.showNotification({
      message: "The post has been successfully edited.",
    });
  };

  const onSubmit = (params: Omit<Post, "id">) => {
    updatePostMutation.mutate(
      { id: post.id, ...params },
      {
        onSuccess: () => {
          push("/admin/posts");
          showSuccessNotification();
        },
      }
    );
  };

  return (
    <AdminLayout>
      <PostForm
        heading="Edit Post"
        initialValues={post}
        onSubmit={onSubmit}
        onDiscard={() => push("/admin/posts")}
      />
    </AdminLayout>
  );
}
