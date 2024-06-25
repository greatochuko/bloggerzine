"use client";
import React from "react";
import { Blogpost } from "./Hero";
import Blog from "./Blog";
import styles from "@/styles/BlogGrid.module.css";
import Paginator from "./Paginator";
import { useSearchParams } from "next/navigation";

export default function BlogGrid({
  blogposts,
  showPaginator,
}: {
  blogposts: Blogpost[];
  showPaginator?: boolean;
}) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const filteredPosts = blogposts.slice(
    (currentPage - 1) * 8,
    (currentPage - 1) * 8 + 8
  );

  return (
    <div className={styles["blog-grid"]}>
      {filteredPosts.map((blogpost) => (
        <Blog key={blogpost.id} blogpost={blogpost} />
      ))}
      {showPaginator ? (
        <Paginator numPages={Math.ceil(blogposts.length / 8) || 1} />
      ) : null}
    </div>
  );
}
