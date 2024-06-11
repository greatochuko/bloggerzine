import React from "react";
import styles from "@/styles/MainArea.module.css";
import { BlogPost } from "./Hero";
import Blog from "./Blog";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "tech", imageUrl: "/tech.jpg" },
  { name: "business", imageUrl: "/business.jpg" },
  { name: "travel", imageUrl: "/travel.jpg" },
  { name: "lifestyle", imageUrl: "/lifestyle.jpg" },
  { name: "sports", imageUrl: "/sports.jpg" },
];

export default function MainArea({
  topPosts,
  recentPosts,
}: {
  topPosts: BlogPost[];
  recentPosts: BlogPost[];
}) {
  return (
    <div className={styles["main-area"]}>
      <div className={styles["highlights"]}>
        <h2>Today&apos;s top highlights</h2>
        <div className={styles["blog-grid"]}>
          {topPosts.map((topPost) => (
            <Blog key={topPost.id} blog={topPost} />
          ))}
        </div>
      </div>
      <section className={styles["side"]}>
        <div>
          <h2 className={styles["section-heading"]}>Trending Topics</h2>
          <div className={styles["categories"]}>
            {categories.map((category) => (
              <Link
                href={`/categories/${category.name}`}
                className={styles["category"]}
                key={category.name}
              >
                <Image src={category.imageUrl} alt={category.name} fill></Image>
                <p>{category.name}</p>
              </Link>
            ))}
            <Link href={"/categories"}>View all categories</Link>
          </div>
        </div>
        <div>
          <h2 className={styles["section-heading"]}>Recent Posts</h2>
          <div className={styles["recent-posts"]}>
            {recentPosts.map((recentPost) => (
              <div className={styles["recent-post"]} key={recentPost.id}>
                <div className={styles["image-container"]}>
                  <Image
                    src={recentPost.imageUrl}
                    alt={recentPost.title}
                    fill
                  ></Image>
                </div>
                <div className={styles["post-details"]}>
                  <h3>{recentPost.title}</h3>
                  <p>{recentPost.lastModified}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
