import React from "react";
import { BlogPost } from "./Hero";
import styles from "@/styles/SearchResults.module.css";
import SearchBlog from "./SearchBlog";
import { searchBlog } from "@/services/blogServices";
import Paginator from "./Paginator";

export default async function SearchResults({
  query,
  page,
}: {
  query: string;
  page: string;
}) {
  const currentPage = Number(page) || 1;
  const postPerPage = 8;
  const searchResults = await searchBlog(query);

  const paginatedResults = searchResults.slice(
    (currentPage - 1) * postPerPage,
    currentPage * postPerPage
  );

  return (
    <>
      {searchResults.length ? (
        <div className={styles["search-results"]}>
          {paginatedResults.map((blogpost) => (
            <SearchBlog blog={blogpost} key={blogpost.id} />
          ))}
        </div>
      ) : (
        <div className={styles["no-results"]}>
          <h2>No results found</h2>
          <p>No Articles match your search</p>
        </div>
      )}
      <Paginator
        numPages={Math.ceil(searchResults.length / postPerPage) || 1}
      />
    </>
  );
}
