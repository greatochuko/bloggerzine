import React from "react";
import { BlogPost } from "./Hero";
import Blog from "./Blog";
import styles from "@/styles/BlogGrid.module.css";

export default function BlogGrid({ blogposts }: { blogposts: BlogPost[] }) {
  return (
    <div className={styles["blog-grid"]}>
      {blogposts.map((blogpost) => (
        <Blog key={blogpost.id} blog={blogpost} />
      ))}
    </div>
  );
}
