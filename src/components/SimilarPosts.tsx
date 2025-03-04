"use client";
import React, { useEffect, useState } from "react";
import { BlogpostType } from "@/lib/types";
import styles from "@/styles/SimilarPosts.module.css";
import Blog from "./Blog";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function SimilarPosts({
  blogposts,
}: {
  blogposts: BlogpostType[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    function changeWidth() {
      setScreenWidth(window.innerWidth);
    }
    if (!domLoaded) {
      changeWidth();
      setDomLoaded(true);
    }
    window.addEventListener("resize", changeWidth);
    return () => window.removeEventListener("resize", changeWidth);
  }, [domLoaded, setDomLoaded]);

  const postPerView = screenWidth > 992 ? 3 : screenWidth > 640 ? 2 : 1;
  const padding = screenWidth > 992 ? 0.33 : screenWidth > 640 ? 0.5 : 1;

  function nextSlide() {
    if (currentIndex >= blogposts.length - postPerView) return;
    setCurrentIndex((curr) => curr + 1);
  }
  function prevSlide() {
    if (currentIndex <= 0) return;
    setCurrentIndex((curr) => curr - 1);
  }

  return (
    <div className={styles["similar-posts"]}>
      <h2>Related Posts</h2>
      <button
        className={styles["left-btn"]}
        onClick={prevSlide}
        disabled={currentIndex <= 0}
      >
        <ChevronLeftIcon
          width={24}
          height={24}
          color="white"
          strokeWidth={2.5}
        />
      </button>
      <div
        className={styles["carousel"]}
        style={{
          transform: `translateX(calc(${
            ((currentIndex * 100) / postPerView) * -1
          }% - ${currentIndex * padding}rem))`,
        }}
      >
        {blogposts.map((blogpost) => (
          <Blog blogpost={blogpost} key={blogpost.id} />
        ))}
      </div>
      <button
        className={styles["right-btn"]}
        onClick={nextSlide}
        disabled={currentIndex >= blogposts.length - postPerView}
      >
        <ChevronRightIcon
          width={24}
          height={24}
          color="white"
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
}
