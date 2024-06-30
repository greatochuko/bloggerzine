import React from "react";
import styles from "@/styles/Hero.module.css";
import Image from "next/image";
import Link from "next/link";
import BlogMetaData from "./BlogMetaData";
import { categories } from "./Category";
import { User } from "@/services/userServices";
import { createAuthorUrl } from "@/utils/createAuthorUrl";
import convertToUrl from "@/utils/convertToUrl";

export type Blogpost = {
  id: string;
  _id: string;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  author: User;
  tags: string;
  views: number;
  likes: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
};

export default function Hero({ blogposts }: { blogposts: Blogpost[] }) {
  return (
    <div className={styles["hero"]}>
      {blogposts.map((blogpost) => (
        <div key={blogpost._id}>
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
              href={`/blog/${convertToUrl(blogpost.title)}_${blogpost._id}`}
              className={styles["blog-title"]}
            >
              {blogpost.title}
            </Link>
            <BlogMetaData blog={blogpost} />
          </div>
          <Image
            src={blogpost.thumbnail || ""}
            fill
            alt={blogpost.title}
            sizes="(max-width: 1024px) 90vw, 50vw"
          ></Image>
        </div>
      ))}
    </div>
  );
}
