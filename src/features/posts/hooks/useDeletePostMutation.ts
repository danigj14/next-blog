import { Post } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useDeletePostMutation() {
  return useMutation<Post, unknown, string>((postId) =>
    axios.delete(`/api/posts/${postId}`).then((result) => result.data)
  );
}
