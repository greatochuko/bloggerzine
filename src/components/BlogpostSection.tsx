import React from "react";
import { BlogpostType } from "@/lib/types";
import styles from "@/styles/BlogpostSection.module.css";
import Link from "next/link";
import Blog from "./Blog";

export default function BlogpostSection({
  title,
  blogposts,
}: {
  title: string;
  blogposts: BlogpostType[];
}) {
  return (
    <div className={styles["popular-posts-container"]}>
      <div className={styles["header"]}>
        <h2 className="category-title">{title}</h2>
        <Link href={"/blog"}>View all posts</Link>
      </div>
      <div className={styles["popular-posts"]}>
        {blogposts.map((blogpost) => (
          <Blog blogpost={blogpost} key={blogpost.id} />
        ))}
      </div>
    </div>
  );
}
