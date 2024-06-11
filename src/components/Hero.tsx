import React from "react";
import styles from "@/styles/Hero.module.css";
import Image from "next/image";
import Link from "next/link";
import BlogMetaData from "./BlogMetaData";

export type BlogPost = {
  id: number;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  author: { name: string; imageUrl: string };
  lastModified: string;
};

const categoryColors = {
  technology: "#d83939",
  lifestyle: "#9d2dda",
  travel: "#dcad38",
  business: "#54a1d4",
  sports: "#54d481",
};

export default function Hero({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <div className={styles["hero"]}>
      {blogPosts.map((blogpost) => (
        <div key={blogpost.id}>
          <div className={styles["overlay"]}>
            <p
              className={styles["category"]}
              style={{
                backgroundColor:
                  categoryColors[
                    blogpost.category as keyof typeof categoryColors
                  ],
              }}
            >
              {blogpost.category}
            </p>
            <Link
              href={`/blog/${blogpost.id}`}
              className={styles["blog-title"]}
            >
              {blogpost.title}
            </Link>
            <BlogMetaData blog={blogpost} />
          </div>
          <Image src={blogpost.imageUrl} fill alt={blogpost.title}></Image>
        </div>
      ))}
    </div>
  );
}
