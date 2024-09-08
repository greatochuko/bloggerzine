import React from "react";
import styles from "@/styles/MainArea.module.css";
import { BlogpostType } from "./Hero";
import Image from "next/image";
import Link from "next/link";
import BlogGrid from "./BlogGrid";
import CategoryList from "./CategoryList";
import { categories } from "./Category";
import convertToUrl from "@/utils/convertToUrl";

export default function MainArea({
  topPosts,
  recentPosts,
}: {
  topPosts: BlogpostType[];
  recentPosts: BlogpostType[];
}) {
  return (
    <div className={styles["main-area"]}>
      <div className={styles["highlights"]}>
        <h2>Top highlights</h2>
        <BlogGrid blogposts={topPosts} />
      </div>
      <section className={styles["side"]}>
        <div>
          <h2 className={styles["section-heading"]}>Trending Topics</h2>
          <CategoryList categories={categories.slice(0, 6)} />
        </div>
        <div>
          <h2 className={styles["section-heading"]}>Recent Posts</h2>
          <div className={styles["recent-posts"]}>
            <ul>
              {recentPosts.map((recentPost) => (
                <li key={recentPost.id}>
                  <Link
                    href={`/blog/${convertToUrl(recentPost.title)}_${
                      recentPost.id
                    }`}
                    className={styles["recent-post"]}
                  >
                    <div className={styles["image-container"]}>
                      <Image
                        src={recentPost.thumbnail || ""}
                        alt={recentPost.title}
                        fill
                        sizes="(max-width: 640px) 25vw, 15vw"
                      ></Image>
                    </div>
                    <div className={styles["post-details"]}>
                      <h3>{recentPost.title}</h3>
                      <p>
                        {new Date(recentPost.createdAt)
                          .toDateString()
                          .split(" ")
                          .slice(1)
                          .join(" ")}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={"/blog"}>View all Blogposts</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
