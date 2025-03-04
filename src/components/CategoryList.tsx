import Link from "next/link";
import React from "react";
import styles from "@/styles/CategoryList.module.css";
import CustomImage from "./CustomImage";
import { CategoryType } from "@/lib/types";

export default function CategoryList({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <div className={styles["category-list"]}>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              href={`/categories/${category.name.toLowerCase()}`}
              className={styles["category"]}
            >
              <CustomImage
                src={category.imageUrl || ""}
                alt={category.name}
                fill
                sizes="90vw"
              ></CustomImage>
              <p>{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={"/categories"}>View all categories</Link>
    </div>
  );
}
