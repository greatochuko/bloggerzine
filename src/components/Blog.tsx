import React from "react";
import styles from "@/styles/Blog.module.css";
import Image from "next/image";
import { type Blogpost } from "./Hero";
import BlogMetaData from "./BlogMetaData";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";

export default function Blog({ blogpost }: { blogpost: Blogpost }) {
  return (
    <div className={styles["blog"]}>
      <div className={styles["image-container"]}>
        <Image
          src={blogpost.thumbnail || ""}
          alt={blogpost.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        ></Image>
      </div>
      <Link
        href={`/blog/${convertToUrl(blogpost.title)}-${blogpost.id}`}
        className={styles["blog-title"]}
      >
        {blogpost.title}
      </Link>
      <BlogMetaData blog={blogpost} />
    </div>
  );
}
