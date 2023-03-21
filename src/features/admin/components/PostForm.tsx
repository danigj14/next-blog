import { Button, Input, TextArea } from "@/core/components";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { marked } from "marked";
import { FormEventHandler, useState } from "react";

interface PostFormParams {
  title: string;
  description: string;
  content: string;
}

interface PostFormProps {
  heading: string;
  initialValues?: PostFormParams;
  onSubmit: (params: PostFormParams) => void;
  onDiscard: () => void;
}

export default function PostForm({
  heading,
  initialValues,
  onSubmit = () => {},
  onDiscard = () => {},
}: PostFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [content, setContent] = useState(initialValues?.content || "");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit({ title, description, content });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
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
          placeholder="New Post Title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <Input
          placeholder="New Post Description"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <div className="flex-grow flex gap-4">
          <TextArea
            className="flex-1 resize-none overflow-auto"
            placeholder="New Post Content (Markdown Syntax)"
            onChange={(event) => setContent(event.target.value)}
            value={content}
          />
          <div className="flex-1 min-h-full h-0 py-2 px-4 border border-gray-300 rounded-lg overflow-auto">
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: marked.parse(content || "New Post Content (Preview)"),
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
