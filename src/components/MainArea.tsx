import React from "react";
import styles from "@/styles/MainArea.module.css";
import { BlogPost } from "./Hero";
import Image from "next/image";
import Link from "next/link";
import BlogGrid from "./BlogGrid";
import CategoryList from "./CategoryList";
import Paginator from "./Paginator";
import { categories } from "@/app/categories/page";

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
        <h2>Top highlights</h2>
        <BlogGrid blogposts={topPosts} />
        <button className={styles["load-more-btn"]}>Load More</button>
      </div>
      <section className={styles["side"]}>
        <div>
          <h2 className={styles["section-heading"]}>Trending Topics</h2>
          <CategoryList categories={categories} />
        </div>
        <div>
          <h2 className={styles["section-heading"]}>Recent Posts</h2>
          <div className={styles["recent-posts"]}>
            {recentPosts.map((recentPost) => (
              <Link
                href={`/blog/${recentPost.id}`}
                className={styles["recent-post"]}
                key={recentPost.id}
              >
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
