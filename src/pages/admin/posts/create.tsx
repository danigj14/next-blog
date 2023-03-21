import useNotifications from "@/core/hooks/useNotifications";
import AdminLayout from "@/features/admin/components/AdminLayout";
import PostForm from "@/features/admin/components/PostForm";
import useCreatePostMutation from "@/features/posts/hooks/useCreatePostMutation";
import { PostCreateParams } from "@/features/posts/types";
import { useRouter } from "next/router";

export default function AdminCreatePost() {
  const createPostMutation = useCreatePostMutation();
  const { push } = useRouter();
  const notifications = useNotifications();

  const showSuccessNotification = () => {
    notifications.showNotification({
      message: "The post has been successfully created.",
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
      <PostForm
        heading="Create New Post"
        onSubmit={onSubmit}
        onDiscard={() => push("/admin/posts")}
      />
    </AdminLayout>
  );
}
