"use client";

import React from "react";
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
