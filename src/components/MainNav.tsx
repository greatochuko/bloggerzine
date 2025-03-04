import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/MainNav.module.css";
import NavUser from "./NavUser";
import Image from "next/image";
import logo from "../../public/logo.png";
import { MenuIcon } from "lucide-react";
import { navLinks } from "@/lib/data";
import { UserType } from "@/lib/types";

export default function MainNav({
  user,
  openMobileNav,
}: {
  user: UserType | null;
  openMobileNav: () => void;
}) {
  const pathname = usePathname();

  function isInRoute(href: string) {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <div className={styles["header-container"]}>
      <button className={styles["menu-btn"]} onClick={openMobileNav}>
        <MenuIcon />
      </button>

      <Link href={"/"} className={styles["logo"]}>
        <Image src={logo} alt="Bloggerzine"></Image>
        Bloggerzine
      </Link>

      <ul className={styles["nav-links"]}>
        {navLinks.map((navLink) => (
          <li key={navLink.name}>
            <Link
              href={navLink.href}
              className={isInRoute(navLink.href) ? styles["active"] : ""}
            >
              {navLink.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles["right-container"]}>
        {user ? (
          <NavUser user={user} />
        ) : (
          <div className={styles["auth-links"]}>
            <Link
              href={"/login"}
              className={pathname.includes("/login") ? styles["active"] : ""}
            >
              Login
            </Link>
            <Link
              href={"/signup"}
              className={pathname.includes("/signup") ? styles["active"] : ""}
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
