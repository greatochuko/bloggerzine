import React from "react";
import styles from "@/styles/SearchBlog.module.css";
import Image from "next/image";
import { type BlogPost } from "./Hero";
import BlogMetaData from "./BlogMetaData";
import Link from "next/link";

export default function Blog({ blog }: { blog: BlogPost }) {
  return (
    <div className={styles["blog"]}>
      <div className={styles["image-container"]}>
        <Image src={blog.imageUrl} alt={blog.title} fill></Image>
      </div>
      <Link href={`/blog/${blog.id}`} className={styles["blog-title"]}>
        {blog.title}
      </Link>
      <p>{blog.content.slice(0, 150)}...</p>
      <BlogMetaData blog={blog} />
    </div>
  );
}
