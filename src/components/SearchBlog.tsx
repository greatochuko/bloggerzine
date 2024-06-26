import React from "react";
import styles from "@/styles/SearchBlog.module.css";
import Image from "next/image";
import { type Blogpost } from "./Hero";
import BlogMetaData from "./BlogMetaData";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";

export default function SearchBlog({ blog }: { blog: Blogpost }) {
  return (
    <Link
      href={`/blog/${convertToUrl(blog.title)}-${blog.id}`}
      className={styles["search-blog"]}
    >
      <div className={styles["image-container"]}>
        <Image
          src={blog.thumbnail || ""}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
        ></Image>
      </div>
      <h3 className={styles["blog-title"]}>{blog.title}</h3>
      <p>
        {blog.author.firstname} {blog.author.lastname}
        <span>&#183;</span>
        {new Date(blog.dateCreated)
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" ")}
      </p>
    </Link>
  );
}
