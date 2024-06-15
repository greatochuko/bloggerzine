import React from "react";
import { BlogPost } from "./Hero";
import styles from "@/styles/SearchResults.module.css";
import SearchBlog from "./SearchBlog";

export default async function SearchResults({
  searchResults,
}: {
  searchResults: BlogPost[];
}) {
  await new Promise((res) => setTimeout(res, 3000));

  return searchResults.length ? (
    <div className={styles["search-results"]}>
      {searchResults.map((blogpost) => (
        <SearchBlog blog={blogpost} key={blogpost.id} />
      ))}
    </div>
  ) : (
    <div className={styles["no-results"]}>
      <h2>No results found</h2>
      <p>No Articles match your search</p>
    </div>
  );
}
