import SearchPageForm from "@/components/SearchPageForm";
import React from "react";
import styles from "@/styles/SearchPage.module.css";
import { Metadata } from "next";

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
  searchParams: { query: string };
}) {
  console.log(searchParams);

  return (
    <div>
      <div className={styles["heading"]}>
        <SearchPageForm searchQuery={searchParams.query} />
        <h1>Search results for "{searchParams.query}"</h1>
      </div>
    </div>
  );
}
