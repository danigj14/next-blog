import { prisma } from "@/core/db";
import useNotifications from "@/core/hooks/useNotifications";
import AdminLayout from "@/features/admin/components/AdminLayout";
import PostForm, { PostFormData } from "@/features/admin/components/PostForm";
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
  //TODO CHANGE TO EDITPOSTMUTATION
  const updatePostMutation = useUpdatePostMutation();
  const { push } = useRouter();
  const notifications = useNotifications();

  const showSuccessNotification = () => {
    notifications.showNotification({
      message: "The post has been successfully edited.",
    });
  };

  const onSubmit = (params: PostFormData) => {
    updatePostMutation.mutate(
      { id: post.id, ...params, tags: params.tags.split(", ") },
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
        initialValues={{ ...post, tags: post.tags.join(", ") }}
        onSubmit={onSubmit}
        onDiscard={() => push("/admin/posts")}
      />
    </AdminLayout>
  );
}
