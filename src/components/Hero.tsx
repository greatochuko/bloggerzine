import React from "react";
import styles from "@/styles/Hero.module.css";
import Image from "next/image";
import Link from "next/link";
import BlogMetaData from "./BlogMetaData";
import { categories } from "@/app/categories/page";
import convertToUrl from "@/utils/convertToUrl";

export type BlogPost = {
  id: number;
  views: number;
  status: "published" | "draft";
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  author: { name: string; imageUrl: string; id: number; bio: string };
  dateCreated: string;
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
              href={`/blog/${convertToUrl(blogpost.title)}-${blogpost.id}`}
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
