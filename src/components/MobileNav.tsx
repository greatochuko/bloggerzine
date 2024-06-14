"use client";

import React from "react";
import styles from "@/styles/MobileNav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Overlay from "./Overlay";
import { navLinks } from "./MainNav";

export default function MobileNav({
  closeMobileNav,
  isOpen,
}: {
  closeMobileNav: () => void;
  isOpen: boolean;
}) {
  const pathname = usePathname();

  return (
    <Overlay closeOverlay={closeMobileNav} isOpen={isOpen}>
      <div
        className={`${styles["mobile-nav"]} ${isOpen ? styles["open"] : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Link href={"/"} className="logo">
          Bloggerzine
        </Link>
        <p className={styles["subtitle"]}>
          Welcome to our next-generation blog, your ultimate destination for the
          latest news and captivating stories!
        </p>
        <ul className={styles["mobile-nav-links"]}>
          {navLinks.map((navLink) => (
            <li key={navLink.name} onClick={closeMobileNav}>
              <Link
                href={navLink.href}
                className={pathname === navLink.href ? styles["active"] : ""}
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
          <Link href={"/signup"} className={styles["signup"]}>
            Signup
          </Link>
        </div>
        <p className={styles["copyright"]}>
          &copy; {new Date().getFullYear()} Bloggerzine
        </p>
      </div>
    </Overlay>
  );
}
