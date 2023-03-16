import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface PostCreateArgs {
  title: string;
  description: string;
  content: string;
}

export default function useCreatePostMutation() {
  return useMutation({
    mutationFn: async (post: PostCreateArgs) =>
      await axios.post("/api/posts", post),
  });
}
