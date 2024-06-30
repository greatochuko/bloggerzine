import React from "react";
import styles from "@/styles/Category.module.css";
import Image from "next/image";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import { Blogpost } from "./Hero";

export const categories: CategoryType[] = [
  {
    name: "Technology",
    imageUrl: "/technology.jpg",
    color: "#d83939",
    description:
      "Explore the latest in tech! From AI and gadgets to cybersecurity and blockchain.",
  },
  {
    name: "Health",
    imageUrl: "/health.jpg",
    color: "#3a7d44",
    description:
      "Explore the latest in health! From fitness to mental well-being and medical advancements.",
  },
  {
    name: "Travel",
    imageUrl: "/travel.jpg",
    color: "#1a73e8",
    description:
      "Stay updated with trends, tips, and reviews in the ever-evolving travel world.",
  },
  {
    name: "Food",
    imageUrl: "/food.jpg",
    color: "#f39c12",
    description:
      "Discover the world of food! From recipes and culinary trends to restaurant reviews and cooking tips.",
  },
  {
    name: "Fashion",
    imageUrl: "/fashion.jpg",
    color: "#9b59b6",
    description:
      "Dive into the world of fashion! From runway trends and style guides to fashion tips and designer insights.",
  },
  {
    name: "Finance",
    imageUrl: "/finance.jpg",
    color: "#54a1d4",
    description:
      "Explore finance insights! From investment strategies to personal finance tips and economic news",
  },
  {
    name: "Education",
    imageUrl: "/education.jpg",
    color: "#27ae60",
    description:
      "Discover educational insights! From learning trends to academic resources and career advice",
  },
  {
    name: "Lifestyle",
    imageUrl: "/lifestyle.jpg",
    color: "#e73cab",
    description:
      "Explore lifestyle trends! From productivity hacks to travel guides and home decor ideas.",
  },
  {
    name: "Photography",
    imageUrl: "/photography.jpg",
    color: "#7a44ad",
    description:
      "Dive into photography! From techniques and gear reviews to composition tips",
  },
  {
    name: "Sports",
    imageUrl: "/sports.jpg",
    color: "#2980b9",
    description:
      "Explore the world of sports! From game analyses and athlete interviews to sports news",
  },
];

export type CategoryType = {
  name: string;
  imageUrl: string;
  color: string;
  description: string;
};

export default function Category({
  category,
  categoryPosts,
}: {
  category: CategoryType;
  categoryPosts: Blogpost[];
}) {
  return (
    <div className={styles["category"]}>
      <div className={styles["title"]}>
        <div className={styles["image-container"]}>
          <Image
            src={category.imageUrl || ""}
            alt={category.name}
            fill
            sizes="600px"
          ></Image>
        </div>
        <h2>{category.name}</h2>
      </div>
      <div className={styles["description"]}>
        <p>{category.description}</p>

        <div className={styles["stats"]}>
          <p>
            {categoryPosts.length}
            <span>Posts</span>
          </p>
          <p>
            {categoryPosts.reduce((acc, curr) => acc + curr.views, 0)}
            <span>Views</span>
          </p>
        </div>
      </div>
      <div>
        <Link href={`/categories/${convertToUrl(category.name)}`}>
          View Posts
        </Link>
      </div>
    </div>
  );
}
