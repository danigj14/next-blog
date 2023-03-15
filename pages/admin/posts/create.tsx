import AdminLayout from "@/components/admin/AdminLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import useCreatePostMutation from "@/lib/hooks/useCreatePostMutation";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { marked } from "marked";
import { useState } from "react";

export default function AdminCreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const createPostMutation = useCreatePostMutation();

  const createPost = () => {
    createPostMutation.mutate({ title, description, content });
  };

  return (
    <AdminLayout>
      <div className="flex pb-4 gap-4">
        <h1 className="text-3xl">Create New Post</h1>
        <Button color="green" className="ml-auto" onClick={() => createPost()}>
          <FontAwesomeIcon icon={faCheck} className="pr-4" />
          Save Post
        </Button>
        <Button color="red">
          <FontAwesomeIcon icon={faBan} className="pr-4" />
          Discard
        </Button>
      </div>
      <form className="flex-grow flex flex-col gap-2">
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
                __html: marked.parse(content || "New Post Content Preview"),
              }}
            />
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
