import React from "react";
import styles from "@/styles/CategoryPage.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/app/page";
import BlogGrid from "@/components/BlogGrid";
import CategoryList from "@/components/CategoryList";
import { Metadata } from "next";
import { categories } from "../page";

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

  const blogposts = blogPosts.filter(
    (post) => post.category.toLowerCase() === category.name.toLowerCase()
  );

  const otherCategories = categories
    .filter((c) => c.name.toLowerCase() !== category.name.toLowerCase())
    .slice(0, 5);

  return (
    <div className={styles["category-page"]}>
      <div className={styles["category-banner"]}>
        <Image src={category.imageUrl} alt={category.name} fill></Image>

        <div className={styles["category-info"]}>
          <h1 style={{ backgroundColor: category.color }}>{category.name}</h1>
          <p>14 posts</p>
        </div>
      </div>
      <div className={styles["category-page-main"]}>
        <BlogGrid blogposts={blogposts} showPaginator />
        <div className={styles["other-categories"]}>
          <h2>Other Categories</h2>
          <CategoryList categories={otherCategories} />
        </div>
      </div>
    </div>
  );
}
