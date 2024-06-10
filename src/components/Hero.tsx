import React from "react";
import styles from "@/styles/Hero.module.css";
import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
};

export default function Hero({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <div className={styles["hero"]}>
      {blogPosts.map((blogPost) => (
        <Link href={"#"} key={blogPost.id}>
          <div className={styles["overlay"]}>
            <p>{blogPost.category}</p>
            <h3>{blogPost.title}</h3>
          </div>
          <Image src={blogPost.imageUrl} fill alt={blogPost.title}></Image>
        </Link>
      ))}
    </div>
  );
}
