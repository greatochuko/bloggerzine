"use client";

import React, { useState } from "react";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Tech", href: "#" },
  { name: "Gadgets", href: "#" },
  { name: "Lifestyle", href: "#" },
  { name: "Sports", href: "#" },
];

export default function Header() {
  const pathname = usePathname();
  const [showSearchForm, setShowSearchForm] = useState(true);

  return (
    <div className={styles.header}>
      <div className={styles["header-container"]}>
        <p className={styles["logo"]}>Bloggerzine</p>
        <ul className={styles["nav-links"]}>
          {navLinks.map((navLink) => (
            <li key={navLink.name}>
              <Link
                href={navLink.href}
                className={
                  pathname.startsWith(navLink.href) ? styles["active"] : ""
                }
              >
                {navLink.name}
              </Link>
            </li>
          ))}
          <button
            className={styles["search-btn"]}
            onClick={() => setShowSearchForm((curr) => !curr)}
          >
            <svg
              viewBox="0 -0.5 25 25"
              height={28}
              width={28}
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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M17.029 16.5295L19.5 19.0005"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <form
            className={`${styles["search-form"]} ${
              showSearchForm ? styles["visible"] : ""
            }`}
          >
            <input type="text" />
            <button type="submit">Search</button>
          </form>
        </ul>
        <div className={styles["auth-links"]}>
          <Link href={"/login"} className={styles["login"]}>
            Login
          </Link>
          <Link href={"/register"} className={styles["register"]}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
