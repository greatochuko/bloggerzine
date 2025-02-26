"use client";

import React from "react";
import styles from "@/styles/Hero.module.css";
import { UserType } from "@/services/userServices";
import convertToUrl from "@/utils/convertToUrl";
import { useRouter } from "next/navigation";

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

export default function Hero() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query") as string;
    if (!query || query.trim() === "") return;

    router.push(`/search?query=${convertToUrl(query)}`);
  };

  return (
    <div className={styles["hero"]}>
      <h1>Bloggerzine: Write, Share, Discover</h1>
      <p>
        Easily search and explore blog posts on any topic, connecting you with
        the content that matters most.
      </p>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search anything..." name="query" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
