import React from "react";
import styles from "@/styles/Blog.module.css";
import { BlogpostType } from "./Hero";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import CustomImage from "./CustomImage";
import { formatDate } from "@/lib/utils";

export default function Blog({ blogpost }: { blogpost: BlogpostType }) {
  return (
    <div className={styles["blog"]}>
      <div className={styles["image-container"]}>
        <CustomImage
          src={blogpost.thumbnail || ""}
          alt={blogpost.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        ></CustomImage>
      </div>
      <div className={styles["metadata"]}>
        <span>{formatDate(blogpost.createdAt)}</span>
        <Link
          href={`/categories/${blogpost.category}`}
          className="category-badge"
        >
          {blogpost.category}
        </Link>
      </div>
      <Link
        href={`/blog/${convertToUrl(blogpost.title)}_${blogpost.id}`}
        className={styles["blog-title"]}
      >
        {blogpost.title}
      </Link>
      <div className={styles["user"]}>
        <div className={styles["image-container"]}>
          <CustomImage
            src={blogpost.author.imageUrl}
            alt={`${blogpost.author.firstname}'s profile picture`}
            sizes="320px"
          />
        </div>
        <p>
          {blogpost.author.firstname} {blogpost.author.lastname}
        </p>
      </div>
    </div>
  );
}
