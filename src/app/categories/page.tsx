import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Category from "@/components/Category";
import { getBlogposts } from "@/services/blogServices";
import { Blogpost } from "@/components/Hero";

export const categories = [
  {
    name: "Technology",
    imageUrl: "/tech.jpg",
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

export default async function CategoryPage() {
  const blogposts: Blogpost[] = await getBlogposts();

  return (
    <div className={styles["categories-page"]}>
      <div className={styles["header"]}>
        <h1>Categories</h1>
        <p>
          <Link href={"/"}>
            <svg
              height={16}
              width={16}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>{" "}
                <path
                  d="M15 18H9"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
            Home
          </Link>{" "}
          / categories
        </p>
      </div>

      <div className={styles["categories-list"]}>
        {categories.map((category) => (
          <Category
            category={category}
            key={category.name}
            categoryPosts={blogposts.filter(
              (post) =>
                post.category.toLowerCase() === category.name.toLowerCase()
            )}
          />
        ))}
      </div>
    </div>
  );
}
