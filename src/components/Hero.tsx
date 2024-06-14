import React from "react";
import styles from "@/styles/Hero.module.css";
import Image from "next/image";
import Link from "next/link";
import BlogMetaData from "./BlogMetaData";
import { categories } from "@/app/categories/page";

export type BlogPost = {
  id: number;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  author: { name: string; imageUrl: string };
  lastModified: string;
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
                backgroundColor: categories.find(
                  (cat) =>
                    cat.name.toLowerCase() === blogpost.category.toLowerCase()
                )?.color,
              }}
            >
              {blogpost.category}
            </p>
            <Link
              href={`/blog/${blogpost.title
                .split(" ")
                .join("-")
                .toLowerCase()}-${blogpost.id}`}
              className={styles["blog-title"]}
            >
              {blogpost.title}
            </Link>
            <BlogMetaData blog={blogpost} />
          </div>
          <Image
            src={blogpost.imageUrl}
            fill
            alt={blogpost.title}
            sizes="(max-width: 1024px) 90vw, 50vw"
          ></Image>
        </div>
      ))}
    </div>
  );
}
