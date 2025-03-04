"use client";
import React, { useState } from "react";
import styles from "@/styles/Header.module.css";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { UserType } from "@/lib/types";

export default function Header({ user }: { user: UserType | null }) {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <header className={`${styles.header} `}>
      <MainNav openMobileNav={() => setMobileNav(true)} user={user} />
      <MobileNav
        user={user}
        isOpen={mobileNav}
        closeMobileNav={() => setMobileNav(false)}
      />
    </header>
  );
}
