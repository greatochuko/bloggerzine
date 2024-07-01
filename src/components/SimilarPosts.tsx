"use client";
import React, { useEffect, useRef, useState } from "react";
import { Blogpost } from "./Hero";
import styles from "@/styles/SimilarPosts.module.css";
import Blog from "./Blog";

export default function SimilarPosts({ blogposts }: { blogposts: Blogpost[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    function changeWidth() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", changeWidth);
    return () => window.removeEventListener("resize", changeWidth);
  }, []);

  const postPerView = screenWidth > 992 ? 3 : screenWidth > 640 ? 2 : 1;
  const padding = screenWidth > 992 ? 0.33 : screenWidth > 640 ? 0.5 : 0;

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
        <svg
          height={30}
          width={30}
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
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.2071 6.29289C15.5976 6.68342 15.5976 7.31658 15.2071 7.70711L10.9142 12L15.2071 16.2929C15.5976 16.6834 15.5976 17.3166 15.2071 17.7071C14.8166 18.0976 14.1834 18.0976 13.7929 17.7071L8.79289 12.7071C8.40237 12.3166 8.40237 11.6834 8.79289 11.2929L13.7929 6.29289C14.1834 5.90237 14.8166 5.90237 15.2071 6.29289Z"
              fill="#fff"
            ></path>{" "}
          </g>
        </svg>
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
        <svg
          height={30}
          width={30}
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
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.79289 6.29289C9.18342 5.90237 9.81658 5.90237 10.2071 6.29289L15.2071 11.2929C15.5976 11.6834 15.5976 12.3166 15.2071 12.7071L10.2071 17.7071C9.81658 18.0976 9.18342 18.0976 8.79289 17.7071C8.40237 17.3166 8.40237 16.6834 8.79289 16.2929L13.0858 12L8.79289 7.70711C8.40237 7.31658 8.40237 6.68342 8.79289 6.29289Z"
              fill="#fff"
            ></path>{" "}
          </g>
        </svg>
      </button>
    </div>
  );
}
