import React from "react";
import styles from "@/styles/Category.module.css";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import { BlogpostType } from "@/lib/types";
import CustomImage from "./CustomImage";
import { CategoryType } from "@/lib/types";

export default function Category({
  category,
  categoryPosts,
}: {
  category: CategoryType;
  categoryPosts: BlogpostType[];
}) {
  const categoryViews = categoryPosts.reduce(
    (acc, curr) => acc + curr.views,
    0
  );

  return (
    <div className={styles["category"]}>
      <div className={styles["title"]}>
        <div className={styles["image-container"]}>
          <CustomImage
            src={category.imageUrl || ""}
            alt={category.name}
            fill
            sizes="600px"
          ></CustomImage>
        </div>
        <h2>{category.name}</h2>
      </div>
      <div className={styles["description"]}>
        <p>{category.description}</p>

        <div className={styles["stats"]}>
          <p>
            {categoryPosts.length}
            <span>Post{categoryPosts.length === 1 ? "" : "s"}</span>
          </p>
          <p>
            {categoryViews}
            <span>View{categoryViews === 1 ? "" : "s"}</span>
          </p>
        </div>
      </div>
      <div className={styles["link-container"]}>
        <Link
          className={styles["view-posts-link"]}
          href={`/categories/${convertToUrl(category.name)}`}
        >
          View Posts
        </Link>
      </div>
    </div>
  );
}
