import { Button } from "@/core/components";
import AdminLayout from "@/features/admin/components/AdminLayout";
import {
  faArrowRightFromBracket,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Head>
        <title>Admin Panel | NextBlog</title>
      </Head>
      <h1 className="text-3xl pb-4">Blog Admin Panel</h1>
      <p className="pb-8">
        Welcome to the blog admin panel. You can manage your blog from here!
      </p>
      <h2 className="text-2xl pb-4">Admin Panel Shortcuts</h2>
      <div className="w-full flex gap-4">
        <Button href="/admin/posts">
          <FontAwesomeIcon icon={faFileLines} className="pr-2" />
          Manage Posts
        </Button>
        <Button color="green" href="/">
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="pr-2" />
          Go Back to Blog
        </Button>
      </div>
    </AdminLayout>
  );
}
