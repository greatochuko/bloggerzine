import React from "react";
import styles from "@/styles/MainArea.module.css";
import Image from "next/image";
import Link from "next/link";
import CategoryList from "./CategoryList";
import convertToUrl from "@/utils/convertToUrl";
import BlogpostSection from "./BlogpostSection";
import { BlogpostType } from "@/lib/types";
import { categories } from "@/lib/data";

export default function MainArea({
  popularPosts,
  featuredPosts,
}: {
  popularPosts: BlogpostType[];
  featuredPosts: BlogpostType[];
}) {
  return (
    <div className={styles["main-area"]}>
      <div className={styles["highlights"]}>
        <BlogpostSection blogposts={popularPosts} title="Popular Posts" />
      </div>
      <section className={styles["side"]}>
        <div>
          <h2 className={`category-title ${styles["section-heading"]}`}>
            Trending Topics
          </h2>
          <CategoryList categories={categories.slice(0, 6)} />
        </div>
        <div>
          <h2 className={`category-title ${styles["section-heading"]}`}>
            Featured Posts
          </h2>
          <div className={styles["featured-posts"]}>
            <ul>
              {featuredPosts.map((featuredPost) => (
                <li key={featuredPost.id}>
                  <Link
                    href={`/blog/${convertToUrl(featuredPost.title)}_${
                      featuredPost.id
                    }`}
                    className={styles["featured-post"]}
                  >
                    <div className={styles["image-container"]}>
                      <Image
                        src={featuredPost.thumbnail || ""}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 640px) 25vw, 15vw"
                      ></Image>
                    </div>
                    <div className={styles["post-details"]}>
                      <h3>{featuredPost.title}</h3>
                      <p>
                        {new Date(featuredPost.createdAt)
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
