import SearchPageForm from "@/components/SearchPageForm";
import React from "react";
import styles from "@/styles/SearchPage.module.css";
import { Metadata } from "next";
import { blogPosts } from "../page";
import SearchBlog from "@/components/SearchBlog";
import Paginator from "@/components/Paginator";

export function generateMetadata({
  searchParams,
}: {
  searchParams: { query: string };
}): Metadata {
  return {
    title: `Search results for "${searchParams.query}"`,
  };
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query: string; page: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const searchResults = blogPosts.slice((currentPage - 1) * 8, currentPage * 8);

  return (
    <div className={styles["search-page"]}>
      <div className={styles["heading"]}>
        <SearchPageForm searchQuery={searchParams.query} />
        <h1>Search results for "{searchParams.query}"</h1>
      </div>
      <div className={styles["search-results"]}>
        {searchResults.map((blogpost) => (
          <SearchBlog blog={blogpost} key={blogpost.id} />
        ))}
      </div>
      <Paginator numPages={blogPosts.length} />
    </div>
  );
}
