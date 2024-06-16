import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogGrid from "@/components/BlogGrid";
import CategoryList from "@/components/CategoryList";
import { Metadata } from "next";
import { categories } from "../page";
import { getBlogpostByCategory, getBlogposts } from "@/services/blogServices";

export function generateMetadata({
  params: { categoryName },
}: {
  params: { categoryName: string };
}): Metadata {
  const category = categories.find((c) => c.name === categoryName);
  if (!category)
    return {
      title: "Category",
    };

  return {
    title: category?.name[0].toUpperCase() + category?.name.slice(1),
  };
}

export default function CategoryPage({
  params: { categoryName },
}: {
  params: { categoryName: string };
}) {
  const category = categories.find(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (!category) notFound();

  const blogposts = getBlogposts();
  const categoryPosts = getBlogpostByCategory(categoryName);

  const filteredPosts = blogposts.filter(
    (post) => post.category.toLowerCase() === category.name.toLowerCase()
  );

  const otherCategories = categories
    .filter((c) => c.name.toLowerCase() !== category.name.toLowerCase())
    .slice(0, 5);

  return (
    <div className={styles["category-page"]}>
      <div className={styles["category-banner"]}>
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
        ></Image>

        <div className={styles["category-info"]}>
          <h1 style={{ backgroundColor: category.color }}>{category.name}</h1>
          <p>{categoryPosts.length} posts</p>
        </div>
      </div>
      <div className={styles["category-page-main"]}>
        <BlogGrid blogposts={filteredPosts} showPaginator />
        <div className={styles["other-categories"]}>
          <h2>Other Categories</h2>
          <CategoryList categories={otherCategories} />
        </div>
      </div>
    </div>
  );
}
