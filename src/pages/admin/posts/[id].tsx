import { prisma } from "@/core/db";
import useNotifications from "@/core/hooks/useNotifications";
import AdminLayout from "@/features/admin/components/AdminLayout";
import PostForm from "@/features/admin/components/PostForm";
import useCreatePostMutation from "@/features/posts/hooks/useCreatePostMutation";
import { PostCreateParams } from "@/features/posts/types";
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
  //TODO CHANGE TO EDITPOSTMUTATION
  const createPostMutation = useCreatePostMutation();
  const { push } = useRouter();
  const notifications = useNotifications();

  const showSuccessNotification = () => {
    notifications.showNotification({
      message: "The post has been successfully edited.",
    });
  };

  const onSubmit = (params: PostCreateParams) => {
    createPostMutation.mutate(params, {
      onSuccess: () => {
        push("/admin/posts");
        showSuccessNotification();
      },
    });
  };

  return (
    <AdminLayout>
      <PostForm heading="Edit Post" initialValues={post} onSubmit={onSubmit} onDiscard={() => {}} />
    </AdminLayout>
  );
}
