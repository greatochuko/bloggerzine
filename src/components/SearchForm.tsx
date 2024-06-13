import React, { useState } from "react";
import styles from "@/styles/SearchForm.module.css";
import { useRouter } from "next/navigation";

export default function SearchForm({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    console.log(`searching for ${query}`);
    router.push(`/search?query=${query}`);
    close();
  }

  return (
    <div className={`${styles["search-form"]} ${show ? styles["show"] : ""}`}>
      <button className={styles["close-btn"]} onClick={close}>
        <svg
          viewBox="0 0 1024 1024"
          height={30}
          width={30}
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#000000"
              d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
            ></path>
          </g>
        </svg>
      </button>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
