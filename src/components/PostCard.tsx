import React from "react";
import styles from "@/styles/PostCard.module.css";
import { type BlogPost } from "./Hero";
import Image from "next/image";
import { categories } from "@/app/categories/page";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";

export default function PostCard({ blogpost }: { blogpost: BlogPost }) {
  return (
    <Link
      href={`/blog/${convertToUrl(blogpost.title)}-${blogpost.id}`}
      className={styles["post-card"]}
    >
      <Image
        src={blogpost.imageUrl}
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
          by {blogpost.author.name} {blogpost.lastModified}
        </p>
      </div>
    </Link>
  );
}
