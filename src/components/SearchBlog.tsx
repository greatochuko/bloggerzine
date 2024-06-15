import React from "react";
import styles from "@/styles/SearchBlog.module.css";
import Image from "next/image";
import { type BlogPost } from "./Hero";
import BlogMetaData from "./BlogMetaData";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";

export default function SearchBlog({ blog }: { blog: BlogPost }) {
  return (
    <Link
      href={`/blog/${convertToUrl(blog.title)}-${blog.id}`}
      className={styles["search-blog"]}
    >
      <div className={styles["image-container"]}>
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
        ></Image>
      </div>
      <h3 className={styles["blog-title"]}>{blog.title}</h3>
      <p>
        {blog.author.name}
        <span>&#183;</span>
        {blog.lastModified}
      </p>
    </Link>
  );
}
