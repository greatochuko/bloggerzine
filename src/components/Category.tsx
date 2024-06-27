import React from "react";
import styles from "@/styles/Category.module.css";
import Image from "next/image";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import { Blogpost } from "./Hero";

export type Category = {
  name: string;
  imageUrl: string;
  color: string;
  description: string;
};

export default function Category({
  category,
  categoryPosts,
}: {
  category: Category;
  categoryPosts: Blogpost[];
}) {
  return (
    <div className={styles["category"]}>
      <div className={styles["title"]}>
        <div className={styles["image-container"]}>
          <Image
            src={category.imageUrl || ""}
            alt={category.name}
            fill
            sizes="600px"
          ></Image>
        </div>
        <h2>{category.name}</h2>
      </div>
      <div className={styles["description"]}>
        <p>{category.description}</p>

        <div className={styles["stats"]}>
          <p>
            {categoryPosts.length}
            <span>Posts</span>
          </p>
          <p>
            {categoryPosts.reduce((acc, curr) => acc + curr.views, 0)}
            <span>Views</span>
          </p>
        </div>
      </div>
      <div>
        <Link href={`/categories/${convertToUrl(category.name)}`}>
          View Posts
        </Link>
      </div>
    </div>
  );
}
