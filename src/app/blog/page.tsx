import Link from "next/link";
import React from "react";
import styles from "./page.module.css";
import Paginator from "@/components/Paginator";
import { getBlogposts } from "@/services/blogServices";
import { HouseIcon } from "lucide-react";
import Blog from "@/components/Blog";

export const metadata = {
  title: "Blogposts",
};

export default async function page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const blogposts = await getBlogposts();
  const filteredPosts = blogposts.slice((currentPage - 1) * 8, currentPage * 8);

  return (
    <div className={styles["blog-list-page"]}>
      <div className={styles["header"]}>
        <h1>All Posts</h1>
        <p>
          <Link href={"/"}>
            <HouseIcon width={16} height={16} />
            Home
          </Link>{" "}
          / Blog
        </p>
      </div>
      <div className={styles["blog-list"]}>
        {filteredPosts.map((blogpost) => (
          <Blog blogpost={blogpost} key={blogpost.id} />
        ))}
      </div>
      <Paginator numPages={Math.ceil(blogposts.length / 8) || 1} />
    </div>
  );
}
