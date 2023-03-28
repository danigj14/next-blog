import { Button } from "@/core/components";

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {tags.map((tag) => (
        <Button
          key={tag}
          color="green"
          className="py-1 px-2"
          href={`/tags/${tag}`}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
