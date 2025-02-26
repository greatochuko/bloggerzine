import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/MainNav.module.css";
import SearchForm from "./SearchForm";
import NavUser from "./NavUser";
import { UserType } from "@/services/userServices";
import Image from "next/image";
import logo from "../../public/logo.png";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Technology", href: "/categories/technology" },
  { name: "Finance", href: "/categories/finance" },
  { name: "Travel", href: "/categories/travel" },
  { name: "Lifestyle", href: "/categories/lifestyle" },
];

export default function MainNav({
  user,
  openMobileNav,
}: {
  user: UserType | null;
  openMobileNav: () => void;
}) {
  const pathname = usePathname();
  const [showSearchForm, setShowSearchForm] = useState(false);

  return (
    <div className={styles["header-container"]}>
      <button className={styles["menu-btn"]} onClick={openMobileNav}>
        <svg
          viewBox="0 0 24 24"
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
            <line
              x1="5"
              y1="7"
              x2="19"
              y2="7"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></line>
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></line>
            <line
              x1="5"
              y1="17"
              x2="19"
              y2="17"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></line>
          </g>
        </svg>
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
        {/* <button
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
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M17.029 16.5295L19.5 19.0005"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </button> */}

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

        <SearchForm
          show={showSearchForm}
          close={() => setShowSearchForm(false)}
        />
      </div>
    </div>
  );
}
