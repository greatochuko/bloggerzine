import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import BlogGrid from "@/components/BlogGrid";
import CategoryList from "@/components/CategoryList";
import { Metadata } from "next";
import { categories } from "@/components/Category";
import { getBlogpostByCategory } from "@/services/blogServices";
import CustomImage from "@/components/CustomImage";

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

export default async function CategoryPage({
  params: { categoryName },
}: {
  params: { categoryName: string };
}) {
  const category = categories.find(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (!category) notFound();

  const categoryPosts = await getBlogpostByCategory(categoryName);

  const otherCategories = categories
    .filter((c) => c.name.toLowerCase() !== category.name.toLowerCase())
    .slice(0, 6);

  return (
    <div className={styles["category-page"]}>
      <div className={styles["category-banner"]}>
        <CustomImage
          src={category.imageUrl || ""}
          alt={category.name}
          fill
          sizes="90vw"
        ></CustomImage>

        <div className={styles["category-info"]}>
          <h1 style={{ backgroundColor: category.color }}>{category.name}</h1>
          <p>
            {categoryPosts.length} post{categoryPosts.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>
      <div className={styles["category-page-main"]}>
        <BlogGrid blogposts={categoryPosts} showPaginator />
        <div className={styles["other-categories"]}>
          <h2>Other Categories</h2>
          <CategoryList categories={otherCategories} />
        </div>
      </div>
    </div>
  );
}
