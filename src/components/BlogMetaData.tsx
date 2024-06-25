import React from "react";
import { type BlogPost } from "./Hero";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/BlogMetaData.module.css";
import convertToUrl from "@/utils/convertToUrl";
import { createAuthorUrl } from "@/utils/createAuthorUrl";

export default function BlogMetaData({ blog }: { blog: BlogPost }) {
  return (
    <div className={styles["blog-meta-data"]}>
      <Link
        href={`/authors/${createAuthorUrl(blog.author)}`}
        className={styles["author"]}
      >
        <div className={styles["image-container"]}>
          <Image
            src={blog.author.user_metadata.imageUrl}
            fill
            alt={
              blog.author.user_metadata.firstname +
              " " +
              blog.author.user_metadata.lastname
            }
            sizes="(max-width: 640px) 10vw, 6vw"
          ></Image>
        </div>
        <p>
          <span>by </span>
          {blog.author.user_metadata.firstname +
            " " +
            blog.author.user_metadata.lastname}
        </p>
      </Link>
      <div className={styles["date"]}>
        {new Date(blog.dateCreated)
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" ")}
      </div>
      <div className={styles["read-time"]}>5 min read</div>
    </div>
  );
}
