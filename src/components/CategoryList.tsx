import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/CategoryList.module.css";
import { type Category } from "./Category";

export default function CategoryList({
  categories,
}: {
  categories: Category[];
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
            sizes="(max-width: 640px) 100vw, 25vw"
          ></Image>
          <p>{category.name}</p>
        </Link>
      ))}
      <Link href={"/categories"}>View all categories</Link>
    </div>
  );
}
