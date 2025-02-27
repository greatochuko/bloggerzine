import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/MainNav.module.css";
import NavUser from "./NavUser";
import { UserType } from "@/services/userServices";
import Image from "next/image";
import logo from "../../public/logo.png";
import { MenuIcon } from "lucide-react";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blogposts", href: "/blog" },
  { name: "Categories", href: "/categories" },
  // { name: "Technology", href: "/categories/technology" },
  // { name: "Finance", href: "/categories/finance" },
  // { name: "Travel", href: "/categories/travel" },
  // { name: "Lifestyle", href: "/categories/lifestyle" },
];

export default function MainNav({
  user,
  openMobileNav,
}: {
  user: UserType | null;
  openMobileNav: () => void;
}) {
  const pathname = usePathname();

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
              className={pathname === navLink.href ? styles["active"] : ""}
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
