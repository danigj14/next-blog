import { Button } from "@/core/components";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import TagList from "./TagList";

export default function PostListItem({ post }: { post: Post }) {
  return (
    <div className="py-4 border-b border-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pr-12">
        <div>
          <Link className="hover:text-gray-500" href={`/posts/${post.id}`}>
            <h1 className="text-xl md:text-2xl font-bold">{post.title}</h1>
          </Link>
          {post.tags.length > 0 && (
            <div className="pt-2">
              <TagList tags={post.tags} />
            </div>
          )}
        </div>
        <p className="text-md italic">
          {format(post.createDate, "dd MMMM yyyy")}
        </p>
      </div>
      <p className="py-4">{post.description}</p>
      <Link
        className="hover:text-gray-500 font-bold"
        href={`/posts/${post.id}`}
      >
        Read More <FontAwesomeIcon icon={faArrowRightLong} className="pl-1" />
      </Link>
    </div>
  );
}
