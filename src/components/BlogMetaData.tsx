import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/BlogMetaData.module.css";
import { createAuthorUrl } from "@/utils/createAuthorUrl";
import { BlogpostType } from "@/lib/types";

export default function BlogMetaData({ blog }: { blog: BlogpostType }) {
  return (
    <div className={styles["blog-meta-data"]}>
      <Link href={createAuthorUrl(blog.author)} className={styles["author"]}>
        <div className={styles["image-container"]}>
          <Image
            src={blog.author.imageUrl || ""}
            fill
            alt={blog.author.firstname + " " + blog.author.lastname}
            sizes="(max-width: 640px) 10vw, 6vw"
          ></Image>
        </div>
        <p>
          <span>by </span>
          {blog.author.firstname}
        </p>
      </Link>
      <div className={styles["date"]}>
        {new Date(blog.createdAt).toDateString().split(" ").slice(1).join(" ")}
      </div>
      <div className={styles["read-time"]}>5 min read</div>
    </div>
  );
}
