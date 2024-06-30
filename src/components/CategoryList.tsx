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
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              href={`/categories/${category.name.toLowerCase()}`}
              className={styles["category"]}
            >
              <Image
                src={category.imageUrl || ""}
                alt={category.name}
                fill
                sizes="90vw"
              ></Image>
              <p>{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={"/categories"}>View all categories</Link>
    </div>
  );
}
