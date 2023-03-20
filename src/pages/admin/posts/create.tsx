import { Button, Input, TextArea } from "@/core/components";
import AdminLayout from "@/features/admin/components/AdminLayout";
import PostForm from "@/features/admin/components/PostForm";
import useCreatePostMutation from "@/features/posts/hooks/useCreatePostMutation";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { marked } from "marked";
import { useState } from "react";

export default function AdminCreatePost() {
  const createPostMutation = useCreatePostMutation();

  return (
    <AdminLayout>
      <PostForm onSubmit={(params) => createPostMutation.mutate(params)} />
    </AdminLayout>
  );
}
