import { Button, Input, TextArea } from "@/core/components";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "@prisma/client";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { useForm } from "react-hook-form";

type PostFormData = Omit<Post, "id" | "tags"> & {
  tags: string;
};

interface PostFormProps {
  heading: string;
  initialValues?: Omit<Post, "id">;
  onSubmit: (params: Omit<Post, "id">) => void;
  onDiscard: () => void;
}

export default function PostForm({
  heading,
  initialValues,
  onSubmit = () => {},
  onDiscard = () => {},
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: initialValues?.title,
      description: initialValues?.description,
      tags: initialValues?.tags?.join(", "),
      content: initialValues?.content,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({ ...data, tags: data.tags.split(", ") })
      )}
      className="flex flex-col flex-grow"
    >
      <div className="flex pb-4 gap-4">
        <h1 className="text-3xl">{heading}</h1>
        <Button color="green" className="ml-auto" type="submit">
          <FontAwesomeIcon icon={faCheck} className="pr-2" />
          Save Post
        </Button>
        <Button color="red" type="button" onClick={onDiscard}>
          <FontAwesomeIcon icon={faBan} className="pr-2" />
          Discard
        </Button>
      </div>
      <div className="flex-grow flex flex-col gap-2">
        <Input
          {...register("title")}
          placeholder="New Post Title"
          required
        />
        <Input
          {...register("description")}
          placeholder="New Post Description"
          required
        />
        <Input
          {...register("tags")}
          placeholder="Tags (Separate by Comma, eg: 'programming, javascript, react')"
        />
        <div className="flex-grow flex gap-4">
          <TextArea
            {...register("content")}
            className="flex-1 resize-none overflow-auto"
            placeholder="New Post Content (Markdown Syntax)"
            required
          />
          <div className="flex-1 min-h-full h-0 py-2 px-4 border border-gray-300 rounded-lg overflow-auto">
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  marked.parse(watch("content") || "New Post Content (Preview)")
                ),
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
