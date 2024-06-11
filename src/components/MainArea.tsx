import React from "react";
import styles from "@/styles/MainArea.module.css";
import { BlogPost } from "./Hero";
import Blog from "./Blog";

export default function MainArea({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <div className={styles["main-area"]}>
      <div className={styles["highlights"]}>
        <h2>Today&apos;s top highlights</h2>
        <div className={styles["blog-grid"]}>
          {blogPosts.map((blogpost) => (
            <Blog key={blogpost.id} blog={blogpost} />
          ))}
        </div>
      </div>
      <div className={styles["side"]}>Side</div>
    </div>
  );
}
