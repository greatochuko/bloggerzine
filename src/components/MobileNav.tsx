"use client";

import React from "react";
import styles from "@/styles/MobileNav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Overlay from "./Overlay";
import { navLinks } from "./MainNav";
import { useUserContext } from "@/context/UserContext";
import convertToUrl from "@/utils/convertToUrl";

export default function MobileNav({
  closeMobileNav,
  isOpen,
}: {
  closeMobileNav: () => void;
  isOpen: boolean;
}) {
  const pathname = usePathname();

  const { user } = useUserContext();

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
          {!user ? (
            <>
              <Link
                href={"/login"}
                className={styles["login"]}
                onClick={closeMobileNav}
              >
                Login
              </Link>
              <Link
                href={"/signup"}
                className={styles["signup"]}
                onClick={closeMobileNav}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/authors/${convertToUrl(user.user_metadata.username)}`}
                className={styles["profile"]}
                onClick={closeMobileNav}
              >
                Profile
              </Link>
              <Link
                href={`/dashboard`}
                className={styles["profile"]}
                onClick={closeMobileNav}
              >
                Dashboard
              </Link>
            </>
          )}
        </div>
        <p className={styles["copyright"]}>
          &copy; {new Date().getFullYear()} Bloggerzine
        </p>
      </div>
    </Overlay>
  );
}
