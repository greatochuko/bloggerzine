import React from "react";
import styles from "@/styles/PostCard.module.css";
import Image from "next/image";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import { BlogpostType } from "@/lib/types";
import { categories } from "@/lib/data";

export default function PostCard({ blogpost }: { blogpost: BlogpostType }) {
  return (
    <Link
      href={`/blog/${convertToUrl(blogpost.title)}_${blogpost.id}`}
      className={styles["post-card"]}
    >
      <Image
        src={blogpost.thumbnail || ""}
        alt={blogpost.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 992px) 50vw, 33vw"
      ></Image>
      <div className={styles["overlay"]}>
        <p
          className={styles["blog-category"]}
          style={{
            backgroundColor: categories.find(
              (cat) =>
                cat.name.toLowerCase() === blogpost.category.toLowerCase()
            )?.color,
          }}
        >
          {blogpost.category}
        </p>
        <h2>{blogpost.title}</h2>
        <p>
          by {blogpost.author.firstname} {blogpost.author.firstname}{" "}
          {new Date(blogpost.createdAt)
            .toDateString()
            .split(" ")
            .slice(1)
            .join(" ")}
        </p>
      </div>
    </Link>
  );
}
