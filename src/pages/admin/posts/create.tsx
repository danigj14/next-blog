import AdminLayout from "@/features/admin/components/AdminLayout";
import PostForm from "@/features/admin/components/PostForm";
import useCreatePostMutation from "@/features/posts/hooks/useCreatePostMutation";
import { PostCreateParams } from "@/features/posts/types";
import { useRouter } from "next/router";

export default function AdminCreatePost() {
  const createPostMutation = useCreatePostMutation();
  const { push } = useRouter();

  const onSubmit = (params: PostCreateParams) => {
    createPostMutation.mutate(params, {
      onSuccess: () => push("/admin/posts"),
    });
  };

  return (
    <AdminLayout>
      <PostForm onSubmit={onSubmit} />
    </AdminLayout>
  );
}
