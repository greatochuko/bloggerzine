import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/CategoryList.module.css";
import { type CategoryType } from "./Category";

export default function CategoryList({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <div className={styles["category-list"]}>
      {categories.map((category) => (
        <Link
          href={`/categories/${category.name.toLowerCase()}`}
          className={styles["category"]}
          key={category.name}
        >
          <Image
            src={category.imageUrl || ""}
            alt={category.name}
            fill
            sizes="90vw"
          ></Image>
          <p>{category.name}</p>
        </Link>
      ))}
      <Link href={"/categories"}>View all categories</Link>
    </div>
  );
}
