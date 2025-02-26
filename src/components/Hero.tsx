"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Hero.module.css";
import Image from "next/image";
import { UserType } from "@/services/userServices";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";

export type BlogpostType = {
  id: string;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  author: UserType;
  tags: string;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
};

export default function Hero({ blogposts }: { blogposts: BlogpostType[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex >= 2) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex]);

  const selectedBlog = blogposts[currentIndex];

  return (
    <div className={styles["hero"]}>
      {blogposts.map((blogpost, index) => (
        <div
          key={blogpost.id}
          className={[
            styles["blogpost"],
            currentIndex === index ? styles["show"] : "",
          ].join(" ")}
        >
          <Image
            src={blogpost.thumbnail}
            alt={blogpost.title}
            fill
            sizes="90vw"
          />
          <div className={styles["overlay"]}>
            <p>{selectedBlog.category}</p>
            <Link href={`/blog/${convertToUrl(blogpost.title)}_${blogpost.id}`}>
              {selectedBlog.title}
            </Link>
            <div className={styles["user"]}>
              <Image
                src={selectedBlog.author.imageUrl}
                alt={`${selectedBlog.author.firstname}'s profile picture`}
                width={44}
                height={44}
              />
              <div className={styles["details"]}>
                <h4>
                  {selectedBlog.author.firstname} {selectedBlog.author.lastname}
                </h4>
                <p>
                  {new Date(selectedBlog.createdAt).toDateString()} &middot;{" "}
                  {selectedBlog.views} Reads
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={styles["indicators"]}>
        {new Array(3).fill("").map((_, index) => (
          <div
            key={index}
            className={currentIndex === index ? styles["active"] : ""}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
