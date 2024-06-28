import SearchPageForm from "@/components/SearchPageForm";
import React, { Suspense } from "react";
import styles from "./page.module.css";
import { Metadata } from "next";
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

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string; page: string };
}) {
  const searchQuery = searchParams.query || "";

  return (
    <div className={styles["search-page"]}>
      <div className={styles["heading"]}>
        <SearchPageForm searchQuery={searchQuery.split("-").join(" ")} />
        <h1>Search results for &ldquo;{searchQuery.split("-").join(" ")}&rdquo;</h1>
      </div>
      <Suspense fallback={<LoadingIndicator />} key={searchQuery}>
        <SearchResults query={searchQuery} page={searchParams.page} />
      </Suspense>
    </div>
  );
}
