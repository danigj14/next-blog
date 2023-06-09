import { Post } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type PostUpdateParams = Pick<Post, "id"> & Partial<Omit<Post, "id">>;

export default function useUpdatePostMutation() {
  return useMutation<Post, unknown, PostUpdateParams>((postUpdateParams) =>
    axios
      .put(`/api/posts/${postUpdateParams.id}`, postUpdateParams)
      .then((result) => result.data)
  );
}
