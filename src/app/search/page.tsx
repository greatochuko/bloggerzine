import SearchPageForm from "@/components/SearchPageForm";
import React, { Suspense } from "react";
import styles from "./page.module.css";
import { Metadata } from "next";
import { blogPosts } from "../page";
import Paginator from "@/components/Paginator";
import LoadingIndicator from "@/components/LoadingIndicator";
import SearchResults from "@/components/SearchResults";

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
  const postPerPage = 8;
  const searchResults = blogPosts
    .filter((blog) =>
      blog.title
        .toLowerCase()
        .includes(searchParams.query.split("-").join(" ").toLowerCase())
    )
    .slice((currentPage - 1) * postPerPage, currentPage * postPerPage);

  return (
    <div className={styles["search-page"]}>
      <div className={styles["heading"]}>
        <SearchPageForm searchQuery={searchParams.query.split("-").join(" ")} />
        <h1>Search results for "{searchParams.query.split("-").join(" ")}"</h1>
      </div>
      <Suspense fallback={<LoadingIndicator />} key={searchParams.query}>
        <SearchResults searchResults={searchResults} />
      </Suspense>
      <Paginator
        numPages={Math.ceil(searchResults.length / postPerPage) || 1}
      />
    </div>
  );
}
