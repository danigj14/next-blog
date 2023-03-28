import { Post } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useCreatePostMutation() {
  return useMutation<Post, unknown, Omit<Post, "id">>((postCreateParams) =>
    axios.post("/api/posts", postCreateParams).then((result) => result.data)
  );
}
