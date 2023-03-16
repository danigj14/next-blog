import { Button } from "@/core/components";
import AdminLayout from "@/features/admin/components/AdminLayout";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminPosts() {
  return (
    <AdminLayout>
      <h1 className="text-3xl pb-4">Manage Blog Posts</h1>
      <p className="pb-4">
        This section allows you to create, edit and remove your blog posts.
      </p>
      <div className="flex flex-col">
        <div className="flex">
          <Button href="/admin/posts/create">
            <FontAwesomeIcon icon={faFileCirclePlus} className="pr-4" />
            Create New Post
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
