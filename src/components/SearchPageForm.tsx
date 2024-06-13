"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "@/styles/SearchPageForm.module.css";

export default function SearchPageForm({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(searchQuery);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    console.log(`searching for ${query}`);
    router.push(`/search?query=${query}`);
    close();
  }
  return (
    <form onSubmit={handleSearch} className={styles["search-page-form"]}>
      <div className={styles["search-icon"]}>
        <svg
          height={20}
          width={20}
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
              d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
