import React from "react";
import { BlogpostType } from "@/components/Hero";
import { getBlogposts } from "@/services/blogServices";
import styles from "./page.module.css";
import Link from "next/link";
import Category, { categories } from "@/components/Category";
import { HouseIcon } from "lucide-react";

export default async function CategoryPage() {
  const blogposts: BlogpostType[] = await getBlogposts();

  return (
    <div className={styles["categories-page"]}>
      <div className={styles["header"]}>
        <h1>Categories</h1>
        <p>
          <Link href={"/"}>
            <HouseIcon width={16} height={16} />
            Home
          </Link>{" "}
          / categories
        </p>
      </div>

      <div className={styles["categories-list"]}>
        {categories.map((category) => (
          <Category
            category={category}
            key={category.name}
            categoryPosts={blogposts.filter(
              (post) =>
                post.category.toLowerCase() === category.name.toLowerCase()
            )}
          />
        ))}
      </div>
    </div>
  );
}
