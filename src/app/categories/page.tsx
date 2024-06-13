import React from "react";
import styles from "@/styles/CategoriesPage.module.css";
import Image from "next/image";
import Link from "next/link";

export const categories = [
  {
    name: "Technology",
    imageUrl: "/tech.jpg",
    color: "#d83939",
  },
  {
    name: "Health",
    imageUrl: "/health.jpg",
    color: "#3a7d44",
  },
  {
    name: "Travel",
    imageUrl: "/travel.jpg",
    color: "#1a73e8",
  },
  {
    name: "Food",
    imageUrl: "/food.jpg",
    color: "#f39c12",
  },
  {
    name: "Fashion",
    imageUrl: "/fashion.jpg",
    color: "#9b59b6",
  },
  {
    name: "Finance",
    imageUrl: "/finance.jpg",
    color: "#54a1d4",
  },
  {
    name: "Education",
    imageUrl: "/education.jpg",
    color: "#27ae60",
  },
  {
    name: "Lifestyle",
    imageUrl: "/lifestyle.jpg",
    color: "#e73cab",
  },
  {
    name: "Photography",
    imageUrl: "/photography.jpg",
    color: "#7a44ad",
  },
  {
    name: "Sports",
    imageUrl: "/sports.jpg",
    color: "#2980b9",
  },
];

export default function CategoryPage() {
  return (
    <div className={styles["categories-page"]}>
      <h1>Categories</h1>

      <div className={styles["categories-list"]}>
        {categories.map((category) => (
          <Link
            href={`/categories/${category.name}`}
            key={category.name}
            className={styles["category"]}
          >
            <Image src={category.imageUrl} alt={category.name} fill></Image>
            <div className={styles["overlay"]}>
              <h2>{category.name}</h2>
              <p style={{ backgroundColor: category.color }}>14 posts</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
