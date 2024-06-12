import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/CategoryList.module.css";

export type Category = {
  name: string;
  imageUrl: string;
};

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className={styles["category-list"]}>
      {categories.map((category) => (
        <Link
          href={`/category/${category.name}`}
          className={styles["category"]}
          key={category.name}
        >
          <Image src={category.imageUrl} alt={category.name} fill></Image>
          <p>{category.name}</p>
        </Link>
      ))}
      <Link href={"/categories"}>View all categories</Link>
    </div>
  );
}
