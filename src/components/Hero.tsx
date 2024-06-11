import React from "react";
import styles from "@/styles/Hero.module.css";
import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  id: number;
  title: string;
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
      {blogPosts.map((blogPost) => (
        <div key={blogPost.id}>
          <div className={styles["overlay"]}>
            <p
              className={styles["category"]}
              style={{
                backgroundColor:
                  categoryColors[
                    blogPost.category as keyof typeof categoryColors
                  ],
              }}
            >
              {blogPost.category}
            </p>
            <Link
              href={`/blog/${blogPost.id}`}
              className={styles["blog-title"]}
            >
              {blogPost.title}
            </Link>
            <div className={styles["details"]}>
              <Link href={"#"} className={styles["author"]}>
                <div>
                  <Image
                    src={blogPost.author.imageUrl}
                    fill
                    alt={blogPost.author.name}
                  ></Image>
                </div>
                <p>
                  <span>by </span>
                  {blogPost.author.name}
                </p>
              </Link>
              <div className={styles["date"]}>{blogPost.lastModified}</div>
              <div className={styles["read-time"]}>5 min read</div>
            </div>
          </div>
          <Image src={blogPost.imageUrl} fill alt={blogPost.title}></Image>
        </div>
      ))}
    </div>
  );
}
