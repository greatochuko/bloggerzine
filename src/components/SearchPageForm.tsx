"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "@/styles/SearchPageForm.module.css";
import { SearchIcon } from "lucide-react";

export default function SearchPageForm({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(searchQuery);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?query=${query.split(" ").join("-")}`);
  }
  return (
    <form onSubmit={handleSearch} className={styles["search-page-form"]}>
      <div className={styles["search-icon"]}>
        <SearchIcon width={20} height={20} />
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
