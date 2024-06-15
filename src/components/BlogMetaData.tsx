import React from "react";
import { type BlogPost } from "./Hero";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/BlogMetaData.module.css";
import convertToUrl from "@/utils/convertToUrl";

export default function BlogMetaData({ blog }: { blog: BlogPost }) {
  return (
    <div className={styles["blog-meta-data"]}>
      <Link
        href={`/authors/${convertToUrl(blog.author.name)}-${blog.author.id}`}
        className={styles["author"]}
      >
        <div className={styles["image-container"]}>
          <Image
            src={blog.author.imageUrl}
            fill
            alt={blog.author.name}
            sizes="(max-width: 640px) 10vw, 6vw"
          ></Image>
        </div>
        <p>
          <span>by </span>
          {blog.author.name}
        </p>
      </Link>
      <div className={styles["date"]}>{blog.lastModified}</div>
      <div className={styles["read-time"]}>5 min read</div>
    </div>
  );
}
