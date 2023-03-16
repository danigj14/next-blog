import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Post, PostCreateParams } from "../types";

export default function useCreatePostMutation() {
  return useMutation<Post, unknown, PostCreateParams>({
    mutationFn: async (post) => await axios.post("/api/posts", post),
  });
}
