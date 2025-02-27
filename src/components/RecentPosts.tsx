import React from "react";
import styles from "@/styles/RecentPosts.module.css";
import { BlogpostType } from "./Hero";
import Image from "next/image";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import { createAuthorUrl } from "@/utils/createAuthorUrl";

export default function RecentPosts({
  blogposts,
}: {
  blogposts: BlogpostType[];
}) {
  return (
    <div className={styles["recent-posts-container"]}>
      <h2 className="category-title">Recent Posts</h2>
      <div className={styles["recent-posts"]}>
        {blogposts.map((blogpost) => (
          <div key={blogpost.id} className={styles["blog"]}>
            <Link
              href={`/blog/${convertToUrl(blogpost.title)}_${blogpost.id}`}
              className={styles["image-container"]}
            >
              <Image
                src={blogpost.thumbnail}
                alt={blogpost.title}
                fill
                sizes="(max-width: 640px) 90vw, 45vw"
              />
            </Link>
            <div className={styles["text"]}>
              <div className={styles["metadata"]}>
                <Link
                  href={`/author/${createAuthorUrl(blogpost.author)}`}
                  className={styles["author"]}
                >
                  {blogpost.author.firstname} {blogpost.author.lastname}
                </Link>{" "}
                &middot;{" "}
                {new Date(blogpost.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <Link
                href={`/blog/${convertToUrl(blogpost.title)}_${blogpost.id}`}
                className={styles["title"]}
              >
                {blogpost.title}
              </Link>
              <Link
                href={`/categories/${blogpost.category}`}
                className={styles["category"]}
              >
                {blogpost.category}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
