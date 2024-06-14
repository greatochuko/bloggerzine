import React from "react";
import styles from "@/styles/Blog.module.css";
import Image from "next/image";
import { type BlogPost } from "./Hero";
import BlogMetaData from "./BlogMetaData";
import Link from "next/link";

export default function Blog({ blogpost }: { blogpost: BlogPost }) {
  return (
    <div className={styles["blog"]}>
      <div className={styles["image-container"]}>
        <Image
          src={blogpost.imageUrl}
          alt={blogpost.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        ></Image>
      </div>
      <Link
        href={`/blog/${blogpost.title.split(" ").join("-").toLowerCase()}-${
          blogpost.id
        }`}
        className={styles["blog-title"]}
      >
        {blogpost.title}
      </Link>
      <p>{blogpost.content.slice(0, 150)}...</p>
      <BlogMetaData blog={blogpost} />
    </div>
  );
}
